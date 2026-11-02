// Integration harness: the repo's fake Home Assistant (dev/fake-ha.mjs) and the real
// app server (resolvia/rootfs/app/server.js) as child processes, on free ports, with
// their own temp folders. Not a test file (the runner only picks *.test.mjs).
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SERVER = path.join(ROOT, "resolvia", "rootfs", "app", "server.js");
/** The version of the add-on (config.yaml), so a version bump does not break the tests. */
export const APP_VERSION = /^version:\s*"([^"]+)"/m.exec(fs.readFileSync(path.join(ROOT, "resolvia", "config.yaml"), "utf8"))[1];
const FAKE_HA = path.join(ROOT, "dev", "fake-ha.mjs");
const TOKEN = "integration-token";

export async function freePort() {
  const s = net.createServer();
  await new Promise((r) => s.listen(0, "127.0.0.1", r));
  const { port } = s.address();
  await new Promise((r) => s.close(r));
  return port;
}

/** Waits until fn() returns something truthy (polling), or fails with `what`. */
export async function waitFor(fn, { timeout = 10_000, every = 50, what = "condition" } = {}) {
  const until = Date.now() + timeout;
  let last;
  for (;;) {
    try {
      last = await fn();
      if (last) return last;
    } catch (e) {
      last = e;
    }
    if (Date.now() > until) throw new Error(`timed out waiting for ${what} (last: ${last instanceof Error ? last.message : JSON.stringify(last)})`);
    await new Promise((r) => setTimeout(r, every));
  }
}

class Proc {
  constructor(name, file, env) {
    this.name = name;
    this.lines = [];
    this.waiters = [];
    this.child = spawn(process.execPath, [file], { env, cwd: env.__CWD || ROOT, stdio: ["ignore", "pipe", "pipe"] });
    this.exited = new Promise((r) => this.child.on("exit", (code, signal) => r({ code, signal })));
    let buf = "";
    const onData = (chunk) => {
      buf += chunk;
      const parts = buf.split("\n");
      buf = parts.pop();
      for (const line of parts) {
        this.lines.push(line);
        for (const w of [...this.waiters]) if (w.re.test(line)) w.resolve(line);
      }
    };
    this.child.stdout.setEncoding("utf8").on("data", onData);
    this.child.stderr.setEncoding("utf8").on("data", onData);
  }

  /** Resolves with the first line (already printed or to come) matching re. */
  waitLine(re, timeout = 15_000) {
    const seen = this.lines.find((l) => re.test(l));
    if (seen) return Promise.resolve(seen);
    return new Promise((resolve, reject) => {
      const w = { re, resolve: (l) => (clearTimeout(timer), this.waiters.splice(this.waiters.indexOf(w), 1), resolve(l)) };
      const timer = setTimeout(() => reject(new Error(`${this.name}: no line matching ${re} in ${timeout} ms.\n${this.lines.slice(-30).join("\n")}`)), timeout);
      this.waiters.push(w);
      this.exited.then(({ code }) => reject(new Error(`${this.name} exited (${code}) before ${re}.\n${this.lines.slice(-30).join("\n")}`)));
    });
  }

  count(re) {
    return this.lines.filter((l) => re.test(l)).length;
  }

  async stop() {
    if (this.child.exitCode !== null || this.child.signalCode) return;
    this.child.kill("SIGTERM");
    const t = setTimeout(() => this.child.kill("SIGKILL"), 3000);
    await this.exited;
    clearTimeout(t);
  }
}

/** A connection to the app's WebSocket API, like the panel's. */
export class Client {
  constructor(url, headers = {}) {
    this.url = url;
    this.headers = headers;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  open() {
    this.ws = new WebSocket(this.url, { headers: this.headers });
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "event") {
        const l = this.listeners.get(msg.id);
        if (l) l.push(msg.event);
        return;
      }
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      if (msg.type === "pong") p.resolve("pong");
      else if (msg.success) p.resolve(msg.result);
      else p.reject(Object.assign(new Error(msg.error.message), { code: msg.error.code }));
    };
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve(this);
      this.ws.onerror = () => reject(new Error(`could not open ${this.url}`));
    });
  }

  /** Sends a command; resolves with its result, rejects with {code, message}. */
  call(type, payload = {}, { id } = {}) {
    const n = id ?? this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(n, { resolve, reject });
      this.ws.send(JSON.stringify({ ...payload, type, id: n }));
    });
  }

  /** Subscribes (the result arrives first); returns {id, events}: the events received so far. */
  async subscribe(type, payload = {}) {
    const id = this.nextId++;
    const events = [];
    this.listeners.set(id, events);
    await this.call(type, payload, { id });
    return { id, events };
  }

  close() {
    try {
      this.ws.close();
    } catch (e) {
      /* already closed */
    }
  }
}

/**
 * The whole stack. opts: {fakeEnv, appEnv, dev (default true), waitLists (default true: start() waits
 * until the app has read the lists; false for a Home Assistant that refuses it)}
 * Exposes: dirs (data, share, media), haUrl, appUrl, app/fake processes, client(), restartApp(), restartFake(), stop().
 */
export class Stack {
  constructor({ fakeEnv = {}, appEnv = {}, dev = true, waitLists = true } = {}) {
    this.fakeEnv = fakeEnv;
    this.appEnv = appEnv;
    this.dev = dev;
    this.waitLists = waitLists;
    this.root = fs.mkdtempSync(path.join(os.tmpdir(), "resolvia-int-"));
    this.dirs = { data: path.join(this.root, "data"), share: path.join(this.root, "share"), media: path.join(this.root, "media") };
    for (const d of Object.values(this.dirs)) fs.mkdirSync(d, { recursive: true });
    this.clients = [];
  }

  baseEnv() {
    const env = { ...process.env };
    for (const k of ["SUPERVISOR_TOKEN", "HA_TOKEN", "HA_WS_URL", "HA_REST_URL", "DATA_DIR", "SHARE_DIR", "MEDIA_DIR", "PORT", "RESOLVIA_DEV", "RESOLVIA_DAY_MS", "RESOLVIA_DEV_USER_ID", "FAKE_HA_PORT", "FAKE_HA_TOKEN", "FAKE_MEDIA_DIR", "FAKE_HA_NO_AI", "FAKE_NO_STT", "FAKE_STT_TEXT", "FAKE_AI_SUGGEST_BAD", "NODE_TEST_CONTEXT"]) delete env[k];
    env.TZ = "America/Sao_Paulo";
    return env;
  }

  async start() {
    this.haPort = await freePort();
    this.appPort = await freePort();
    this.haUrl = `http://127.0.0.1:${this.haPort}`;
    this.appUrl = `http://127.0.0.1:${this.appPort}`;
    await this.startFake();
    await this.startApp();
    return this;
  }

  async startFake() {
    this.fake = new Proc("fake-ha", FAKE_HA, { ...this.baseEnv(), FAKE_HA_PORT: String(this.haPort), FAKE_HA_TOKEN: TOKEN, FAKE_MEDIA_DIR: this.dirs.media, __CWD: this.root, ...this.fakeEnv });
    await this.fake.waitLine(/fake Home Assistant on/);
  }

  /** Home Assistant restarts (the fake starts again with its first lists), on the same port. pause: ms it stays down. */
  async restartFake(pause = 0) {
    await this.fake.stop();
    if (pause) await new Promise((r) => setTimeout(r, pause));
    await this.startFake();
  }

  async startApp() {
    const env = {
      ...this.baseEnv(),
      PORT: String(this.appPort),
      HA_WS_URL: `ws://127.0.0.1:${this.haPort}/api/websocket`,
      HA_REST_URL: `${this.haUrl}/api`,
      HA_TOKEN: TOKEN,
      DATA_DIR: this.dirs.data,
      SHARE_DIR: this.dirs.share,
      MEDIA_DIR: this.dirs.media,
      ...(this.dev ? { RESOLVIA_DEV: "1" } : {}),
      ...this.appEnv,
    };
    this.app = new Proc("app", SERVER, env);
    await this.app.waitLine(/ouvindo na porta/);
    if (this.waitLists) await this.app.waitLine(/listas de tarefas encontradas/);
  }

  /** Stops the app (SIGTERM: it saves what it has) and starts it again on the same folders and port. */
  async restartApp() {
    for (const c of this.clients.splice(0)) c.close();
    await this.app.stop();
    await this.startApp();
  }

  async client(headers = {}) {
    const c = await new Client(`ws://127.0.0.1:${this.appPort}/ws`, headers).open();
    this.clients.push(c);
    return c;
  }

  /** An event on Home Assistant's bus, as another app (the CronologIA) would fire it. */
  async fire(event_type, data) {
    const res = await fetch(`${this.haUrl}/dev/fire`, { method: "POST", body: JSON.stringify({ event_type, data }) });
    assert200(res);
  }

  /** A list created in Home Assistant ({entity_id, name, features, items: [summary], no_subscribe}). */
  async addList(list) {
    assert200(await fetch(`${this.haUrl}/dev/list`, { method: "POST", body: JSON.stringify(list) }));
  }

  /** A list removed from Home Assistant. */
  async removeList(entityId) {
    assert200(await fetch(`${this.haUrl}/dev/list/${entityId}`, { method: "DELETE" }));
  }

  /** The events the app fired on Home Assistant's bus. */
  async firedEvents(type) {
    const all = await (await fetch(`${this.haUrl}/dev/events`)).json();
    return type ? all.filter((e) => e.event_type === type) : all;
  }

  /** share/resolvia/integracao.json as the app last wrote it. */
  presence() {
    return JSON.parse(fs.readFileSync(path.join(this.dirs.share, "resolvia", "integracao.json"), "utf8"));
  }

  /** Writes a file in the share folder (the other apps' integration files). */
  writeShare(rel, obj) {
    const full = path.join(this.dirs.share, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, typeof obj === "string" ? obj : JSON.stringify(obj));
  }

  async stop() {
    for (const c of this.clients.splice(0)) c.close();
    await Promise.all([this.app && this.app.stop(), this.fake && this.fake.stop()]);
    fs.rmSync(this.root, { recursive: true, force: true });
  }
}

function assert200(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/** Every item of a list, through the app (as the panel reads them). */
export async function items(client, entity_id) {
  return (await client.call("todo/item/list", { entity_id })).items;
}

/**
 * POSTs `size` bytes with node:http (streamed), and says what came back:
 * "HTTP <status> <body>" or "ERROR <code>" when the connection was cut.
 */
export function rawPost(stack, urlPath, size, headers = {}) {
  return new Promise((resolve) => {
    const req = http.request({ host: "127.0.0.1", port: stack.appPort, path: urlPath, method: "POST", headers: { "content-length": size, ...headers } }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(`HTTP ${res.statusCode} ${body}`));
      res.on("error", (e) => resolve(`ERROR ${e.code || e.message}`));
    });
    req.on("error", (e) => resolve(`ERROR ${e.code || e.message}`));
    const chunk = Buffer.alloc(64 * 1024, 1);
    let sent = 0;
    const pump = () => {
      while (sent < size) {
        const n = Math.min(chunk.length, size - sent);
        sent += n;
        if (!req.write(chunk.subarray(0, n))) return req.once("drain", pump);
      }
      req.end();
    };
    pump();
  });
}
