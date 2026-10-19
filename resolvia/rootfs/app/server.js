// ResolvIA app server.
// - Serves the UI through Home Assistant ingress.
// - Relays ONLY to-do commands from the UI to Home Assistant (Supervisor token).
// - Keeps list customization and recurring rules in /data.
// - Reopens recurring tasks N days after they are completed.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { acceptUpgrade } from "./lib/ws.js";
import { HAClient } from "./lib/ha.js";
import { Store } from "./lib/store.js";
import { Recurring } from "./lib/recurring.js";
import { AI } from "./lib/ai.js";

const VERSION = "2.4.0";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const WWW = path.join(HERE, "www");
const DEV = process.env.RESOLVIA_DEV === "1";
const PORT = Number(process.env.PORT || 8099);
const HA_URL = process.env.HA_WS_URL || "ws://supervisor/core/websocket";
const TOKEN = process.env.SUPERVISOR_TOKEN || process.env.HA_TOKEN || "";
const DATA_DIR = process.env.DATA_DIR || "/data";
const DAY_MS = DEV ? Number(process.env.RESOLVIA_DAY_MS || 0) : 0;
const INGRESS_IPS = new Set(["172.30.32.2"]);
const MEDIA_DIR = process.env.MEDIA_DIR || "/media";
const MAX_UPLOAD = 30 * 1024 * 1024;
const SERVICES = new Set(["add_item", "update_item", "remove_item", "remove_completed_items"]);

const stamp = () => new Date().toISOString().replace("T", " ").slice(0, 19);
const log = {
  info: (m) => console.log(`${stamp()} INFO ${m}`),
  warn: (m) => console.warn(`${stamp()} WARNING ${m}`),
  error: (m) => console.error(`${stamp()} ERROR ${m}`),
};

if (!TOKEN) {
  log.error("No SUPERVISOR_TOKEN. Is homeassistant_api enabled for this app?");
}

const store = new Store(DATA_DIR, log);
const ha = new HAClient(HA_URL, TOKEN, log);
const todoStates = new Map();
const recurring = new Recurring({ ha, store, log, states: todoStates, dayMs: DAY_MS });
const ai = new AI({ ha, log, mediaDir: MEDIA_DIR, selected: () => store.prefs.app.ai_entity || "" });
const itemSubs = new Map(); // entity_id -> subscription (for the recurring engine)
const listWatchers = new Set(); // {session, id}
const ruleWatchers = new Set(); // {session, id}
let registryCache = null;

const isTodo = (id) => typeof id === "string" && /^todo\.[a-z0-9_]+$/.test(id);

// ------------------------------------------------------------------ Home Assistant side

function setTodoState(entityId, state) {
  if (state) todoStates.set(entityId, state);
  else todoStates.delete(entityId);
  for (const w of listWatchers) w.session.event(w.id, { entity_id: entityId, new_state: state || null });
}

function syncItemSubs() {
  for (const id of todoStates.keys()) {
    if (itemSubs.has(id)) continue;
    const sub = ha.subscribe(
      { type: "todo/item/subscribe", entity_id: id },
      (ev) => recurring.process(id, (ev && ev.items) || []),
      (err) => {
        log.warn(`Não consegui acompanhar ${id}: ${err.message}`);
        itemSubs.delete(id);
      },
    );
    itemSubs.set(id, sub);
  }
  for (const [id, sub] of itemSubs) {
    if (!todoStates.has(id)) {
      sub.unsubscribe();
      itemSubs.delete(id);
      recurring.items.delete(id);
    }
  }
}

async function loadStates() {
  const states = await ha.send({ type: "get_states" });
  const seen = new Set();
  for (const st of states) {
    if (!isTodo(st.entity_id)) continue;
    seen.add(st.entity_id);
    if (todoStates.get(st.entity_id) !== st) setTodoState(st.entity_id, st);
  }
  for (const id of [...todoStates.keys()]) if (!seen.has(id)) setTodoState(id, null);
  syncItemSubs();
}

ha.subscribe({ type: "subscribe_events", event_type: "state_changed" }, (ev) => {
  const id = ev && ev.data && ev.data.entity_id;
  if (!isTodo(id)) return;
  setTodoState(id, ev.data.new_state);
  syncItemSubs();
});

ha.on("ready", async () => {
  registryCache = null;
  try {
    const config = await ha.send({ type: "get_config" });
    if (config && config.time_zone && process.env.TZ !== config.time_zone) {
      process.env.TZ = config.time_zone;
      log.info(`Fuso horário: ${config.time_zone}`);
    }
  } catch (err) {
    log.warn(`get_config falhou: ${err.message}`);
  }
  try {
    await loadStates();
    log.info(`${todoStates.size} listas de tarefas encontradas`);
  } catch (err) {
    log.error(`Não consegui ler as listas: ${err.message}`);
  }
});

async function registry() {
  if (registryCache && Date.now() - registryCache.at < 15000) return registryCache;
  const entities = {};
  const devices = {};
  try {
    const [ents, devs] = await Promise.all([
      ha.send({ type: "config/entity_registry/list_for_display" }),
      ha.send({ type: "config/device_registry/list" }),
    ]);
    const need = new Set();
    for (const e of (ents && ents.entities) || []) {
      if (!isTodo(e.ei)) continue;
      entities[e.ei] = { entity_id: e.ei, device_id: e.di || null, name: e.en || null };
      if (e.di) need.add(e.di);
    }
    for (const d of devs || []) {
      if (need.has(d.id)) devices[d.id] = { id: d.id, name: d.name, name_by_user: d.name_by_user || null };
    }
  } catch (err) {
    log.warn(`Registro de entidades indisponível: ${err.message}`);
  }
  registryCache = { at: Date.now(), entities, devices };
  return registryCache;
}

recurring.on("change", () => {
  const rules = recurring.publicRules();
  for (const w of ruleWatchers) w.session.event(w.id, { rules });
});

// ------------------------------------------------------------------ browser side

class Session {
  constructor(ws, headers) {
    this.ws = ws;
    this.subs = new Map(); // client subscription id -> {unsubscribe}
    this.user = {
      id: headers["x-remote-user-id"] || null,
      name: headers["x-remote-user-display-name"] || headers["x-remote-user-name"] || "",
    };
    ws.on("message", (text) => this.onMessage(text));
    ws.on("close", () => this.dispose());
  }

  send(obj) {
    this.ws.send(JSON.stringify(obj));
  }
  result(id, result = null) {
    this.send({ id, type: "result", success: true, result });
  }
  error(id, code, message) {
    this.send({ id, type: "result", success: false, error: { code, message } });
  }
  event(id, event) {
    this.send({ id, type: "event", event });
  }

  dispose() {
    for (const [, sub] of this.subs) sub.unsubscribe();
    this.subs.clear();
    for (const set of [listWatchers, ruleWatchers]) for (const w of set) if (w.session === this) set.delete(w);
  }

  watch(set, id) {
    const w = { session: this, id };
    set.add(w);
    this.subs.set(id, { unsubscribe: () => set.delete(w) });
  }

  async onMessage(text) {
    let msg;
    try {
      msg = JSON.parse(text);
    } catch (e) {
      return;
    }
    const { id, type } = msg || {};
    if (!Number.isInteger(id)) return;
    try {
      await this.handle(id, type, msg);
    } catch (err) {
      this.error(id, err.code || "failed", err.message || String(err));
    }
  }

  async handle(id, type, msg) {
    switch (type) {
      case "ping":
        return this.send({ id, type: "pong" });

      case "resolvia/bootstrap": {
        await ha.whenReady();
        if (!todoStates.size) await loadStates().catch(() => {});
        const [reg, aiStatus] = await Promise.all([registry(), ai.status().catch((err) => ({ ready: false, images: false, entities: [], reason: err.message }))]);
        return this.result(id, {
          version: VERSION,
          ai: aiStatus,
          user: this.user,
          time_zone: process.env.TZ || null,
          states: Object.fromEntries(todoStates),
          entities: reg.entities,
          devices: reg.devices,
        });
      }

      case "resolvia/ai/status":
        return this.result(id, await ai.status());

      case "resolvia/subscribe_lists":
        this.watch(listWatchers, id);
        return this.result(id);

      case "resolvia/recurring/subscribe":
        this.watch(ruleWatchers, id);
        this.result(id);
        return this.event(id, { rules: recurring.publicRules() });

      case "resolvia/recurring/set": {
        const rule = recurring.setRule({ entity_id: msg.entity_id, uid: msg.uid, summary: msg.summary, days: msg.days });
        return this.result(id, rule);
      }

      case "resolvia/prefs/get":
        return this.result(id, store.prefs);
      case "resolvia/prefs/set_list":
        return this.result(id, store.setListPrefs(msg.entity_id, msg.prefs));
      case "resolvia/prefs/set_app":
        return this.result(id, store.setAppPrefs(msg.prefs));

      case "todo/item/subscribe": {
        if (!isTodo(msg.entity_id)) return this.error(id, "invalid_format", "Not a to-do entity");
        const sub = ha.subscribe(
          { type: "todo/item/subscribe", entity_id: msg.entity_id },
          (ev) => this.event(id, ev),
          () => this.subs.delete(id),
        );
        this.subs.set(id, sub);
        await sub.ready;
        return this.result(id);
      }

      case "unsubscribe_events": {
        const sub = this.subs.get(msg.subscription);
        if (!sub) return this.error(id, "not_found", "Subscription not found.");
        sub.unsubscribe();
        this.subs.delete(msg.subscription);
        return this.result(id);
      }

      case "todo/item/list":
        if (!isTodo(msg.entity_id)) return this.error(id, "invalid_format", "Not a to-do entity");
        return this.result(id, await ha.send({ type, entity_id: msg.entity_id }));

      case "todo/item/move": {
        if (!isTodo(msg.entity_id)) return this.error(id, "invalid_format", "Not a to-do entity");
        const out = { type, entity_id: msg.entity_id, uid: String(msg.uid) };
        if (msg.previous_uid) out.previous_uid = String(msg.previous_uid);
        return this.result(id, await ha.send(out));
      }

      case "call_service": {
        const target = msg.target || {};
        const ids = [].concat(target.entity_id || []);
        if (msg.domain !== "todo" || !SERVICES.has(msg.service) || !ids.length || !ids.every(isTodo)) {
          return this.error(id, "unauthorized", "ResolvIA only manages to-do lists");
        }
        const result = await ha.send({
          type,
          domain: "todo",
          service: msg.service,
          service_data: msg.service_data || {},
          target: { entity_id: ids },
        });
        return this.result(id, result);
      }

      default:
        return this.error(id, "unknown_command", `Unknown command ${type}`);
    }
  }
}

// ------------------------------------------------------------------ HTTP

const FILES = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/resolvia.js": ["resolvia.js", "text/javascript; charset=utf-8"],
};

function allowed(req) {
  if (DEV) return true;
  const ip = (req.socket.remoteAddress || "").replace(/^::ffff:/, "");
  return INGRESS_IPS.has(ip);
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

/** POST /api/extract {text?, images?: [{data(base64), mime}], list_name?} -> {items, provider} */
function handleExtract(req, res) {
  const chunks = [];
  let size = 0;
  let aborted = false;
  req.on("data", (c) => {
    size += c.length;
    if (size > MAX_UPLOAD) {
      aborted = true;
      sendJson(res, 413, { error: "Arquivo grande demais" });
      req.destroy();
      return;
    }
    chunks.push(c);
  });
  req.on("end", async () => {
    if (aborted) return;
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch (e) {
      return sendJson(res, 400, { error: "JSON inválido" });
    }
    const started = Date.now();
    try {
      const out = await ai.extract({ text: body.text, images: body.images, listName: body.list_name });
      log.info(`Importação: ${out.items.length} itens via ${out.provider} em ${((Date.now() - started) / 1000).toFixed(1)}s`);
      sendJson(res, 200, out);
    } catch (err) {
      log.warn(`Importação falhou: ${err.message}`);
      const setup = ["no_ai", "no_vision", "gone", "unavailable", "no_media"].includes(err.code);
      sendJson(res, setup ? 409 : 502, { error: err.message, code: err.code || "failed" });
    }
  });
}

const server = http.createServer((req, res) => {
  if (!allowed(req)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/extract" && req.method === "POST") return handleExtract(req, res);
  const font = url.pathname.match(/^\/fonts\/([a-z0-9-]+\.woff2)$/);
  const file = font ? [`fonts/${font[1]}`, "font/woff2", true] : FILES[url.pathname];
  if (!file || (req.method !== "GET" && req.method !== "HEAD")) {
    res.writeHead(404).end("Not found");
    return;
  }
  const full = path.join(WWW, file[0]);
  fs.stat(full, (err, st) => {
    if (err) {
      res.writeHead(404).end("Not found");
      return;
    }
    const etag = `"${st.size.toString(16)}-${st.mtimeMs.toString(16)}"`;
    const headers = {
      "Content-Type": file[1],
      "Cache-Control": file[2] ? "public, max-age=604800" : "no-cache",
      ETag: etag,
      "X-Content-Type-Options": "nosniff",
    };
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers).end();
      return;
    }
    res.writeHead(200, { ...headers, "Content-Length": st.size });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(full).pipe(res);
  });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = new URL(req.url, "http://x").pathname;
  if (!allowed(req) || pathname !== "/ws") {
    socket.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
    return;
  }
  const ws = acceptUpgrade(req, socket, head);
  if (ws) new Session(ws, req.headers);
});

server.listen(PORT, () => log.info(`ResolvIA ${VERSION} ouvindo na porta ${PORT}${DEV ? " (modo dev)" : ""}`));
ha.start();
recurring.start();

const shutdown = () => {
  log.info("Encerrando…");
  store.flush();
  recurring.stop();
  ha.stop();
  server.close();
  setTimeout(() => process.exit(0), 300);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
