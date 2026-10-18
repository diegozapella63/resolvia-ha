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
  aiCalls.push({ entity_id: d.entity_id, files });
  console.log("fake AI call", JSON.stringify({ entity_id: d.entity_id, files }));
  let items;
  if (files.length) {
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
            ...(WITH_AI ? [{ entity_id: "ai_task.google_ai_task", state: "unknown", attributes: { supported_features: 3 } }] : []),
          ]);
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
          this.subs.set(msg.id, { type: "state" });
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
        default:
          fail("unknown_command", `Unknown command ${msg.type}`);
      }
    } catch (err) {
      this.send({ id: msg.id, type: "result", success: false, error: { code: err.code || "error", message: err.message } });
    }
  }
}

const server = http.createServer((req, res) => res.writeHead(404).end());
server.on("upgrade", (req, socket, head) => {
  const ws = acceptUpgrade(req, socket, head);
  if (ws) new Conn(ws);
});
server.listen(PORT, () => console.log(`fake Home Assistant on ws://127.0.0.1:${PORT}/api/websocket (token "${TOKEN}")`));
