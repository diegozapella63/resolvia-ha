// A tiny fake of Home Assistant's websocket API, enough to develop and test
// ResolvIA without a real Home Assistant.
//   node dev/fake-ha.mjs            (listens on ws://127.0.0.1:8123/api/websocket, token "dev")
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { acceptUpgrade } from "../resolvia/rootfs/app/lib/ws.js";

const PORT = Number(process.env.FAKE_HA_PORT || 8123);
const TOKEN = process.env.FAKE_HA_TOKEN || "dev";
// The app writes photos here (same folder Home Assistant sees as /media).
const MEDIA_DIR = process.env.FAKE_MEDIA_DIR || process.env.MEDIA_DIR || "./.data/media";
const WITH_AI = process.env.FAKE_HA_NO_AI !== "1";
const aiCalls = [];
const firedEvents = [];
const F = { CREATE: 1, DELETE: 2, UPDATE: 4, MOVE: 8, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };

let seq = 1;
const it = (summary, extra = {}) => ({ uid: `u${seq++}`, summary, status: "needs_action", ...extra });
const done = (summary) => it(summary, { status: "completed" });
const pad = (n) => String(n).padStart(2, "0");
const day = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const since = (daysAgo, h, m) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const lists = {
  "todo.notas_e_rotinas_do_alexa_shopping_list": {
    name: "Notas e Rotinas do Alexa Shopping list",
    device: "dev_alexa",
    en: "Shopping list",
    features: F.CREATE | F.DELETE | F.UPDATE,
    items: [it("Café"), it("Leite"), done("Arroz")],
  },
  "todo.notas_e_rotinas_do_alexa_to_do_list": {
    name: "Notas e Rotinas do Alexa To-do list",
    device: "dev_alexa",
    en: "To-do list",
    features: F.CREATE | F.DELETE | F.UPDATE,
    items: [it("Configurar modo claro e escuro em tudo"), it("Ver sobre: https://www.home-assistant.io/integrations/todo/")],
  },
  // Like the "Análise dos Dispositivos" integration: it fills the due field
  // with the time the problem started and doesn't let you set a due date.
  "todo.analise_dos_dispositivos_problem_list": {
    name: "Análise dos Dispositivos Problem List",
    device: "dev_analise",
    en: "Problem List",
    features: F.CREATE | F.DELETE | F.UPDATE,
    items: [
      it("Luz do Banheiro: unavailable", { due: since(1, 19, 59), description: "Unavailable since yesterday at 7:59 PM." }),
      it("TV da Sala: never reported", { due: since(60, 21, 48) }),
    ],
  },
  "todo.casa": {
    name: "Casa",
    device: null,
    en: "Casa",
    features: 127,
    items: [it("Passar pano na casa"), it("Pagar conta de luz", { due: day(-1) }), it("Trocar filtro do ar", { due: day(0) })],
  },
};
const devices = [
  { id: "dev_alexa", name: "Notas e Rotinas do Alexa", name_by_user: null },
  { id: "dev_other", name: "Lâmpada da sala", name_by_user: null },
  { id: "dev_analise", name: "Análise dos Dispositivos", name_by_user: null },
];

const conns = new Set();
const stateOf = (id) => {
  const l = lists[id];
  return {
    entity_id: id,
    state: String(l.items.filter((i) => i.status !== "completed").length),
    attributes: { friendly_name: l.name, supported_features: l.features },
    last_changed: new Date().toISOString(),
  };
};

/** Delivers an event to the apps subscribed to it (subscribe_events with event_type). */
function fireBus(eventType, data) {
  for (const c of conns) for (const [sid, sub] of c.subs) if (sub.type === "bus" && sub.event_type === eventType) c.event(sid, { event_type: eventType, data, origin: "LOCAL", time_fired: new Date().toISOString() });
}

function changed(id) {
  for (const c of conns) {
    for (const [sid, sub] of c.subs) {
      if (sub.type === "todo" && sub.entity_id === id) c.event(sid, { items: lists[id].items.map((i) => ({ ...i })) });
      if (sub.type === "state") c.event(sid, { event_type: "state_changed", data: { entity_id: id, new_state: stateOf(id) } });
    }
  }
}

function fail(code, message) {
  const e = new Error(message);
  e.code = code;
  throw e;
}

function callService(msg) {
  const ids = [].concat((msg.target && msg.target.entity_id) || []);
  if (msg.domain !== "todo") fail("not_found", "Service not found");
  const data = msg.service_data || {};
  for (const id of ids) {
    const l = lists[id];
    if (!l) fail("not_found", "Entity not found");
    const find = (k) => l.items.find((i) => i.uid === k || i.summary === k);
    const fields = (item) => {
      if ("due_date" in data) {
        if (!(l.features & F.DUE_DATE)) fail("service_validation_error", "due_date not supported");
        item.due = data.due_date || undefined;
      }
      if ("due_datetime" in data) {
        if (!(l.features & F.DUE_DATETIME)) fail("service_validation_error", "due_datetime not supported");
        item.due = data.due_datetime ? new Date(data.due_datetime.replace(" ", "T")).toISOString() : undefined;
      }
      if ("description" in data) item.description = data.description || undefined;
    };
    if (msg.service === "add_item") {
      const item = { uid: `u${seq++}`, summary: data.item, status: "needs_action" };
      fields(item);
      l.items.push(item);
    } else if (msg.service === "update_item") {
      const item = find(data.item);
      if (!item) fail("service_validation_error", "Item not found");
      if (data.rename) item.summary = data.rename;
      if (data.status) item.status = data.status;
      fields(item);
    } else if (msg.service === "remove_item") {
      const keys = [].concat(data.item);
      l.items = l.items.filter((i) => !keys.includes(i.uid));
    } else if (msg.service === "remove_completed_items") {
      l.items = l.items.filter((i) => i.status !== "completed");
    } else fail("not_found", "Service not found");
    changed(id);
  }
  return { context: { id: "ctx" } };
}

// Pretend AI: checks the attachments exist where Home Assistant would look for them.
function fakeAI(msg) {
  if (!WITH_AI) fail("not_found", "Service not found");
  if (!msg.return_response) fail("service_validation_error", "return_response required");
  const d = msg.service_data || {};
  if (!d.structure || !d.structure.items) fail("service_validation_error", "structure missing");
  const files = (d.attachments || []).map((a) => {
    const prefix = "media-source://media_source/local/";
    if (!a.media_content_id.startsWith(prefix)) fail("service_validation_error", "bad media id");
    const p = path.join(MEDIA_DIR, a.media_content_id.slice(prefix.length));
    if (!fs.existsSync(p)) fail("service_validation_error", `attachment not found: ${p}`);
    return { path: p, bytes: fs.statSync(p).size, type: a.media_content_type };
  });
  if (files.length && d.entity_id === "ai_task.ollama_ai_task") fail("home_assistant_error", "This entity does not support attachments");
  aiCalls.push({ entity_id: d.entity_id, files });
  console.log("fake AI call", JSON.stringify({ entity_id: d.entity_id, files }));
  let items;
  if (d.task_name === "ResolvIA: sugerir") {
    // Sugestões › Pedir à IA: the first 3 items that aren't shopping, with a reason
    const rows = ((d.instructions || "").split('"""')[1] || "").split("\n").filter((r) => /^\d+ \|/.test(r) && !r.includes("(compras)"));
    items = rows.slice(0, 3).map((r, k) => `${r.split(" | ")[0]} | Motivo de teste ${k + 1}`);
    if (process.env.FAKE_AI_SUGGEST_BAD) items = ["não sei"];
  } else if (files.length) {
    // Alternate answers so "add more photos" can be tested.
    const photoCalls = aiCalls.filter((c) => c.files.length).length;
    items = photoCalls % 2 ? ["Leite integral (2 caixas)", "Ovos (1 dúzia)", "Pão francês"] : ["Café 500 g", "Ovos (1 dúzia)", "Detergente"];
  }
  else {
    const m = (d.instructions || "").split('"""')[1] || "";
    items = m.split(/[\n,]|\se\s/).map((x) => x.replace(/^.*?:\s*/, "").trim()).filter(Boolean);
  }
  return { context: { id: "ctx" }, response: { conversation_id: "c1", data: { items } } };
}

class Conn {
  constructor(ws) {
    this.ws = ws;
    this.auth = false;
    this.subs = new Map();
    ws.on("message", (t) => this.onMessage(JSON.parse(t)));
    ws.on("close", () => conns.delete(this));
    this.send({ type: "auth_required", ha_version: "2026.10.2" });
  }
  send(o) {
    this.ws.send(JSON.stringify(o));
  }
  event(id, event) {
    this.send({ id, type: "event", event });
  }
  onMessage(msg) {
    if (!this.auth) {
      if (msg.type === "auth" && msg.access_token === TOKEN) {
        this.auth = true;
        conns.add(this);
        return this.send({ type: "auth_ok", ha_version: "2026.10.2" });
      }
      this.send({ type: "auth_invalid", message: "Invalid access token" });
      return this.ws.close();
    }
    const ok = (result = null) => this.send({ id: msg.id, type: "result", success: true, result });
    try {
      switch (msg.type) {
        case "get_states":
          return ok([
            ...Object.keys(lists).map(stateOf),
            { entity_id: "light.sala", state: "on", attributes: {} },
            ...(WITH_AI
              ? [
                  { entity_id: "ai_task.google_ai_task", state: "unknown", attributes: { friendly_name: "Google AI Task", supported_features: 3 } },
                  // A text-only AI (no attachments), like many local models.
                  { entity_id: "ai_task.ollama_ai_task", state: "unknown", attributes: { friendly_name: "Ollama AI Task", supported_features: 1 } },
                ]
              : []),
          ]);
        // Falar: the Assist pipelines (FAKE_NO_STT=1: none, like a Home Assistant without voice)
        case "assist_pipeline/pipeline/list":
          return ok(process.env.FAKE_NO_STT ? { pipelines: [], preferred_pipeline: null } : { pipelines: [{ id: "p1", name: "Home Assistant", language: "pt", stt_engine: "stt.home_assistant_cloud", stt_language: "pt-BR" }], preferred_pipeline: "p1" });
        case "ai_task/preferences/get":
          return ok({ gen_data_entity_id: WITH_AI ? "ai_task.google_ai_task" : null });
        case "get_config":
          return ok({ time_zone: "America/Sao_Paulo", version: "2026.10.2" });
        case "config/entity_registry/list_for_display":
          return ok({
            entity_categories: {},
            entities: [
              ...Object.entries(lists).map(([ei, l]) => ({ ei, pl: "x", ...(l.device ? { di: l.device, hn: true } : {}), en: l.en })),
              { ei: "light.sala", pl: "hue", di: "dev_other" },
            ],
          });
        case "config/device_registry/list":
          return ok(devices);
        case "subscribe_events":
          this.subs.set(msg.id, !msg.event_type || msg.event_type === "state_changed" ? { type: "state" } : { type: "bus", event_type: msg.event_type });
          return ok();
        case "todo/item/subscribe":
          if (!lists[msg.entity_id]) fail("invalid_entity_id", "not found");
          this.subs.set(msg.id, { type: "todo", entity_id: msg.entity_id });
          ok();
          return this.event(msg.id, { items: lists[msg.entity_id].items.map((i) => ({ ...i })) });
        case "unsubscribe_events":
          if (!this.subs.delete(msg.subscription)) fail("not_found", "Subscription not found.");
          return ok();
        case "todo/item/list":
          return ok({ items: lists[msg.entity_id].items });
        case "todo/item/move": {
          const l = lists[msg.entity_id];
          const idx = l.items.findIndex((i) => i.uid === msg.uid);
          const [item] = l.items.splice(idx, 1);
          const prev = msg.previous_uid ? l.items.findIndex((i) => i.uid === msg.previous_uid) : -1;
          l.items.splice(prev + 1, 0, item);
          changed(msg.entity_id);
          return ok();
        }
        case "call_service":
          if (msg.domain === "ai_task") return ok(fakeAI(msg));
          return ok(callService(msg));
        case "fire_event":
          if (typeof msg.event_type !== "string" || !msg.event_type) fail("invalid_format", "event_type required");
          firedEvents.push({ event_type: msg.event_type, data: msg.event_data || {}, at: new Date().toISOString() });
          console.log("fired", msg.event_type, JSON.stringify(msg.event_data || {}));
          fireBus(msg.event_type, msg.event_data || {});
          return ok({ context: { id: "ctx" } });
        default:
          fail("unknown_command", `Unknown command ${msg.type}`);
      }
    } catch (err) {
      this.send({ id: msg.id, type: "result", success: false, error: { code: err.code || "error", message: err.message } });
    }
  }
}

// Test helper: GET /dev/events lists the events the app fired (fire_event).
const restStates = new Map();
const server = http.createServer((req, res) => {
  if (req.url === "/dev/events") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(firedEvents));
  }
  // Falar: speech-to-text like Home Assistant's REST API (the transcript is FAKE_STT_TEXT)
  const stt = req.url.match(/^\/api\/stt\/(stt\.[a-z0-9_]+)$/);
  if (stt && req.method === "POST") {
    let bytes = 0;
    req.on("data", (c) => (bytes += c.length));
    req.on("end", () => {
      const head = String(req.headers["x-speech-content"] || "");
      console.log("stt", stt[1], bytes, head);
      if (!/format=wav/.test(head) || !/sample_rate=16000/.test(head) || !/language=pt-BR/.test(head)) return res.writeHead(415).end("Unsupported");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ text: process.env.FAKE_STT_TEXT || "Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador", result: "success" }));
    });
    return;
  }
  // REST: POST/GET /api/states/<entity> (the sensors the app publishes)
  const st = req.url.match(/^\/api\/states\/([a-z_]+\.[a-z0-9_]+)$/);
  if (st) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        const b = JSON.parse(body || "{}");
        restStates.set(st[1], { entity_id: st[1], state: String(b.state), attributes: b.attributes || {}, last_changed: new Date().toISOString() });
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(restStates.get(st[1])));
      });
      return;
    }
    const v = restStates.get(st[1]);
    res.writeHead(v ? 200 : 404, { "content-type": "application/json" });
    return res.end(JSON.stringify(v || { message: "Entity not found." }));
  }
  // POST /dev/fire {event_type, data}: an event from another app (the CronologIA, an automation)
  if (req.url === "/dev/fire" && req.method === "POST") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const b = JSON.parse(body || "{}");
      fireBus(b.event_type, b.data || {});
      res.writeHead(200, { "content-type": "application/json" });
      res.end("{}");
    });
    return;
  }
  res.writeHead(404).end();
});
server.on("upgrade", (req, socket, head) => {
  const ws = acceptUpgrade(req, socket, head);
  if (ws) new Conn(ws);
});
server.listen(PORT, () => console.log(`fake Home Assistant on ws://127.0.0.1:${PORT}/api/websocket (token "${TOKEN}")`));
