// ResolvIA app server.
// - Serves the UI through Home Assistant ingress.
// - Relays ONLY to-do commands from the UI to Home Assistant (Supervisor token).
// - Keeps list customization and recurring rules in /data.
// - Reopens recurring tasks N days after they are completed.
// - Dados: exports (JSON, CSV, ZIP), backups in share/resolvia, imports, versions.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { acceptUpgrade } from "./lib/ws.js";
import { HAClient } from "./lib/ha.js";
import { Store, datesInfo } from "./lib/store.js";
import { Recurring } from "./lib/recurring.js";
import { AI } from "./lib/ai.js";
import { Restore } from "./lib/restore.js";
import { Placar } from "./lib/placar.js";
import { snapshot, toCSV, backupZip, parseImport, Backups, listVersions, readVersion, fileStamp } from "./lib/data.js";

const VERSION = "2.10.1";
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
const SHARE_DIR = process.env.SHARE_DIR || "/share";
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
store.trimVersions(); // Versões anteriores: only the 3 newest (older installs kept up to 60)
const ha = new HAClient(HA_URL, TOKEN, log);
const todoStates = new Map();
/** Mais > Repetições: the automatic repetition is on (unset: on when there are rules, so nothing stops after an update). */
const repeatOn = () => {
  const v = store.prefs.app.repeat_on;
  return v === undefined ? Object.keys(store.rules || {}).length > 0 : v === true;
};
const recurring = new Recurring({ ha, store, log, states: todoStates, dayMs: DAY_MS, enabled: repeatOn });
const restore = new Restore({ ha, store, recurring, states: todoStates, log });
const backups = new Backups({ dir: path.join(SHARE_DIR, "resolvia") });
const placar = new Placar({ shareDir: SHARE_DIR });
const pad2 = (n) => String(n).padStart(2, "0");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

/** Points to the CronologIA scoreboard (it listens to this event). */
async function sendPoints(data) {
  await ha.send({ type: "fire_event", event_type: "cronologia_pontos", event_data: { ...data, origem: "ResolvIA" } });
}

/** Mais > Integrações > Recompensas, and the points of each task. */
function pointsState(userId) {
  const p = placar.read();
  return { on: !!store.prefs.app.points_on, points: store.points, placar: placar.view(userId), espelho: (p && p.espelho) || {} };
}
/** Import or restore, then tell the other apps about the lists again. */
async function restoreAll(raw, reason, opts) {
  const out = await restore.run(raw, reason, opts);
  publishPresence();
  return out;
}
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
    publishPresence();
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
  if (JSON.stringify(repeatMap()) !== lastRepeat) publishPresence();
});

/** repete: how often each task comes back ({list: {uid: days}}), so the CronologIA can put the daily ones first. */
function repeatMap() {
  const out = {};
  if (!repeatOn()) return out; // paused: nothing repeats
  for (const r of Object.values(store.rules || {})) {
    if (!r || !r.uid || !(r.days > 0) || !isTodo(r.entity_id)) continue;
    (out[r.entity_id] ||= {})[r.uid] = r.days;
  }
  return out;
}
let lastRepeat = "";

// ------------------------------------------------------------------ browser side

class Session {
  constructor(ws, headers) {
    this.ws = ws;
    this.subs = new Map(); // client subscription id -> {unsubscribe}
    this.user = {
      // RESOLVIA_DEV_USER_ID: test hook (dev mode only) for the Home Assistant user behind ingress
      id: headers["x-remote-user-id"] || (DEV && process.env.RESOLVIA_DEV_USER_ID) || null,
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
      case "resolvia/prefs/set_list": {
        const prefs = store.setListPrefs(msg.entity_id, msg.prefs);
        if ("dates_info" in (msg.prefs || {})) publishPresence();
        return this.result(id, prefs);
      }
      case "resolvia/prefs/set_app": {
        const prefs = store.setAppPrefs(msg.prefs);
        if ("points_on" in (msg.prefs || {})) publishPresence();
        if ("repeat_on" in (msg.prefs || {})) {
          // back on: completed items with a rule start counting now; off: nothing comes back
          for (const [eid, items] of recurring.items) recurring.process(eid, items);
          publishPresence();
        }
        return this.result(id, prefs);
      }

      // ---- Recompensas: points per task, given to the CronologIA scoreboard
      case "resolvia/points/get":
        return this.result(id, pointsState(this.user.id));

      case "resolvia/points/set": {
        store.setPoints(msg.entity_id, String(msg.summary || ""), msg.points, msg.previous_summary == null ? null : String(msg.previous_summary));
        publishPresence();
        return this.result(id, pointsState(this.user.id));
      }

      /**
       * A task was completed (or reopened) here. {entity_id, uid, summary, done, quem?}
       * -> {points: 0} | {ask: true, points, participantes} | {key, who, points, participantes}
       */
      case "resolvia/points/done": {
        if (!isTodo(msg.entity_id) || typeof msg.uid !== "string" || !msg.uid) return this.error(id, "invalid_format", "Tarefa inválida");
        // a maintenance or routine of the CronologIA: it marks it done itself; we only say who (or undo)
        const esp = placar.mirrored(msg.entity_id, msg.uid);
        if (esp) {
          const ekey = `espelho|${msg.entity_id}|${msg.uid.slice(0, 300).replace(/\|/g, "")}`;
          if (!msg.done) {
            await sendPoints({ acao: "desfazer", chave: ekey });
            return this.result(id, { points: 0, key: ekey });
          }
          const pe = placar.read();
          if (!esp.pontos || !pe || !pe.ativo) return this.result(id, { points: 0 });
          const whoE = msg.quem ? placar.participant(String(msg.quem)) : pe.usuarios[this.user.id] || null;
          if (msg.quem && !whoE) return this.error(id, "invalid_format", "Essa pessoa não está no placar");
          if (!whoE) return this.result(id, { ask: true, points: esp.pontos, participantes: pe.participantes });
          await sendPoints({ acao: "somar", chave: ekey, quem: whoE, pontos: esp.pontos, titulo: String(msg.summary || "Tarefa").slice(0, 120) });
          log.info(`+${esp.pontos} para ${whoE}: ${msg.summary} (CronologIA)`);
          return this.result(id, { key: ekey, who: whoE, points: esp.pontos, participantes: pe.participantes });
        }
        const n = store.prefs.app.points_on ? store.pointsFor(msg.entity_id, String(msg.summary || "")) : 0;
        if (!n) return this.result(id, { points: 0 });
        const key = `resolvia|${msg.entity_id}|${msg.uid.slice(0, 300).replace(/\|/g, "")}|${today()}`;
        if (!msg.done) {
          await sendPoints({ acao: "desfazer", chave: key });
          return this.result(id, { points: 0, key });
        }
        const p = placar.read();
        if (!p || !p.ativo) return this.result(id, { points: 0, reason: "placar" });
        const who = msg.quem ? placar.participant(String(msg.quem)) : p.usuarios[this.user.id] || null;
        if (msg.quem && !who) return this.error(id, "invalid_format", "Essa pessoa não está no placar");
        if (!who) return this.result(id, { ask: true, points: n, participantes: p.participantes });
        await sendPoints({ acao: "somar", chave: key, quem: who, pontos: n, titulo: String(msg.summary || "Tarefa").slice(0, 120) });
        log.info(`+${n} para ${who}: ${msg.summary}`);
        return this.result(id, { key, who, points: n, participantes: p.participantes });
      }

      case "resolvia/points/reassign": {
        const who = placar.participant(String(msg.quem || ""));
        if (!who || !/^(resolvia|espelho)\|todo\.[a-z0-9_]+\|/.test(String(msg.key || ""))) return this.error(id, "invalid_format", "Essa pessoa não está no placar");
        await sendPoints({ acao: "trocar", chave: String(msg.key), quem: who });
        return this.result(id, { who });
      }

      // ---- Dados: versions, backups in share/resolvia
      case "resolvia/versions/list":
        return this.result(id, listVersions(store.versionsDir));

      case "resolvia/versions/restore": {
        const raw = readVersion(store.versionsDir, String(msg.name || ""));
        return this.result(id, await restoreAll(raw, "antes-de-restaurar", { items: false }));
      }

      case "resolvia/backups/list":
        return this.result(id, backups.list());

      case "resolvia/backups/create": {
        await ha.whenReady();
        const snap = snapshot(store, await restore.lists(), VERSION);
        const out = backups.save(backupZip(snap, VERSION));
        log.info(`Backup criado em ${out.folder}/${out.name} (${snap.lists.length} listas)`);
        return this.result(id, out);
      }

      case "resolvia/backups/restore": {
        await ha.whenReady();
        const raw = backups.read(String(msg.name || ""));
        return this.result(id, await restoreAll(raw, "antes-de-restaurar"));
      }

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

function download(res, body, type, name) {
  res.writeHead(200, { "Content-Type": type, "Content-Length": body.length, "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" });
  res.end(body);
}

/** GET /api/export/json | csv | zip */
async function handleData(fmt, res) {
  const name = `resolvia-${fileStamp()}`;
  try {
    await ha.whenReady();
    const snap = snapshot(store, await restore.lists(), VERSION);
    if (fmt === "json") return download(res, Buffer.from(JSON.stringify(snap, null, 1)), "application/json; charset=utf-8", `${name}.json`);
    if (fmt === "csv") return download(res, toCSV(snap), "text/csv; charset=utf-8", `${name}.csv`);
    return download(res, backupZip(snap, VERSION), "application/zip", `${name}.zip`);
  } catch (err) {
    sendJson(res, 502, { error: err.message });
  }
}

/** POST /api/import (body = the .zip or .json file, header x-file-name). */
function handleImport(req, res) {
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
    let name = "";
    try {
      name = decodeURIComponent(req.headers["x-file-name"] || "");
    } catch (e) {
      /* keep empty */
    }
    try {
      const raw = parseImport(Buffer.concat(chunks), name);
      await ha.whenReady();
      sendJson(res, 200, await restoreAll(raw, "antes-de-importar"));
    } catch (err) {
      log.warn(`Importação falhou: ${err.message}`);
      sendJson(res, 400, { error: err.message, code: err.code || "failed" });
    }
  });
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
    if (store.prefs.app.ai_off) return sendJson(res, 409, { error: "A IA está desligada em Mais › Integrações", code: "ai_off" });
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
  const exp = url.pathname.match(/^\/api\/export\/(json|csv|zip)$/);
  if (exp && req.method === "GET") return handleData(exp[1], res);
  if (url.pathname === "/api/import" && req.method === "POST") return handleImport(req, res);
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

/**
 * Lets the other apps of the family (CronologIA) know the ResolvIA runs here:
 * share/resolvia/integracao.json, rewritten every 15 minutes and when a list
 * changes. No key: they read the lists from Home Assistant itself.
 * sem_prazo: lists whose dates are information, not deadlines (so the
 * CronologIA doesn't show them as overdue tasks either).
 */
let publishWarned = false;
function publishPresence() {
  try {
    const dir = path.join(SHARE_DIR, "resolvia");
    fs.mkdirSync(dir, { recursive: true });
    const tmp = path.join(dir, ".integracao.json.tmp");
    const semPrazo = [...todoStates].filter(([id, st]) => datesInfo(store.prefs.lists[id], st && st.attributes && st.attributes.supported_features)).map(([id]) => id);
    // pontos: what each task is worth, so the CronologIA gives the same points when a task is concluded there
    const pontos = store.prefs.app.points_on ? store.points : {};
    const repete = repeatMap();
    lastRepeat = JSON.stringify(repete);
    fs.writeFileSync(tmp, JSON.stringify({ app: "ResolvIA", versao: VERSION, gravado_em: new Date().toISOString(), sem_prazo: semPrazo, pontos, repete }, null, 1));
    fs.renameSync(tmp, path.join(dir, "integracao.json"));
    publishWarned = false;
  } catch (err) {
    if (!publishWarned) log.warn(`Não consegui gravar share/resolvia/integracao.json: ${err.message}`);
    publishWarned = true;
  }
}
publishPresence();
setInterval(publishPresence, 15 * 60 * 1000);

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
