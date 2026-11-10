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
import { pendencias, reportHtml, reportPdf, pdfName, listLooks } from "./lib/report.js";
import { Recurring } from "./lib/recurring.js";
import { AI } from "./lib/ai.js";
import { AiUsage } from "./lib/usage.js";
import { Ages } from "./lib/ages.js";
import { Restore } from "./lib/restore.js";
import { Placar } from "./lib/placar.js";
import { Inventario } from "./lib/inventario.js";
import { Voice, readRaw, MAX_VOICE_BYTES } from "./lib/voice.js";
import { snapshot, toCSV, backupZip, parseImport, Backups, listVersions, readVersion, fileStamp } from "./lib/data.js";
import { DueAlert } from "./lib/duealert.js";
import { Correria, ROTA as ROTA_CORRERIA } from "./lib/correria.js";
import { Ferramentas, INSTRUCOES } from "./lib/ferramentas.js";
import { VERSION } from "./lib/version.js"; // from resolvia/config.yaml, by the build

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
/** Mais > Configurações > Opções > Repetição: the automatic repetition is on (unset: on when there are rules, so nothing stops after an update). */
const repeatOn = () => {
  const v = store.prefs.app.repeat_on;
  return v === undefined ? Object.keys(store.rules || {}).length > 0 : v === true;
};
const recurring = new Recurring({ ha, store, log, states: todoStates, dayMs: DAY_MS, enabled: repeatOn });
const restore = new Restore({ ha, store, recurring, states: todoStates, log });
const backups = new Backups({ dir: path.join(SHARE_DIR, "resolvia") });
const placar = new Placar({ shareDir: SHARE_DIR });
// Cômodos do InventarIA (Mais › Configurações › Integrações; off by default): a room for each task
const roomsOn = () => store.prefs.app.rooms_on === true;
// … and the equipment (Mais › Configurações › Integrações › InventarIA › Usar equipamentos; off by default): an item for each task
const equipsOn = () => store.prefs.app.equips_on === true;
const inventario = new Inventario({ shareDir: SHARE_DIR, log, enabled: roomsOn, items: equipsOn, onChange: () => publishPresence() });
/** What the screens need: what is on, the rooms and items of the InventarIA, and the room and item of each task. */
function roomsState() {
  return { on: roomsOn(), equips_on: equipsOn(), ...inventario.state, map: roomsOn() ? store.rooms : {}, emap: equipsOn() ? store.equips : {} };
}

/**
 * With equipment, the room of a task is the room of its items (one or several; the screens lock it);
 * without equipment, it stays as chosen.
 */
function roomsFromEquips(entityId, summary) {
  if (!roomsOn() || !equipsOn()) return;
  const ids = store.equipsFor(entityId, summary);
  if (!ids.length) return;
  const rooms = [...new Set(ids.map((id) => (inventario.state.itens.find((i) => i.id === id) || {}).comodo).filter(Boolean))];
  if (rooms.length) store.setRoom(entityId, summary, rooms);
}

const pad2 = (n) => String(n).padStart(2, "0");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

/** Points to the CronologIA scoreboard (it listens to this event). */
async function sendPoints(data) {
  await ha.send({ type: "fire_event", event_type: "cronologia_pontos", event_data: { ...data, origem: "ResolvIA" } });
}

/**
 * What completing (done) or reopening a task means for the scoreboard, without doing it: {points: 0[, reason]} (nothing
 * to give), {ask: true, points, participantes} (who did it?), {key, who, points, participantes, mirrored?} (to give) or
 * {undo: key}. msg: {entity_id, uid, summary, done, quem?, userId?} (quem: a name of the scoreboard; userId: the user of
 * Home Assistant, as in its usuarios). A wrong quem throws invalid_format.
 */
function pointsPlan(msg) {
  const uid = String(msg.uid).slice(0, 300).replace(/\|/g, "");
  const wrong = () => Object.assign(new Error("Essa pessoa não está no placar"), { code: "invalid_format" });
  // a maintenance or routine of the CronologIA: it marks it done itself; we only say who (or undo)
  const esp = placar.mirrored(msg.entity_id, msg.uid);
  if (esp) {
    const key = `espelho|${msg.entity_id}|${uid}`;
    if (!msg.done) return { undo: key };
    const pe = placar.read();
    // Recompensas off here: the CronologIA still marks it done, with no one's points
    if (!store.prefs.app.points_on || !esp.pontos || !pe || !pe.ativo) return { points: 0 };
    const who = msg.quem ? placar.participant(String(msg.quem)) : pe.usuarios[msg.userId] || null;
    if (msg.quem && !who) throw wrong();
    if (!who) return { ask: true, points: esp.pontos, participantes: pe.participantes };
    return { key, who, points: esp.pontos, participantes: pe.participantes, mirrored: true };
  }
  const n = store.prefs.app.points_on ? store.pointsFor(msg.entity_id, String(msg.summary || "")) : 0;
  if (!n) return { points: 0 };
  const key = `resolvia|${msg.entity_id}|${uid}|${today()}`;
  if (!msg.done) return { undo: key };
  const p = placar.read();
  if (!p || !p.ativo) return { points: 0, reason: "placar" };
  const who = msg.quem ? placar.participant(String(msg.quem)) : p.usuarios[msg.userId] || null;
  if (msg.quem && !who) throw wrong();
  if (!who) return { ask: true, points: n, participantes: p.participantes };
  return { key, who, points: n, participantes: p.participantes };
}

/** Completing or reopening a task, for the scoreboard of the CronologIA (the screen and the CorrerIA): see pointsPlan. */
async function pointsDone(msg) {
  const plan = pointsPlan(msg);
  if (plan.undo) {
    await sendPoints({ acao: "desfazer", chave: plan.undo });
    return { points: 0, key: plan.undo };
  }
  if (!plan.who) return plan;
  const { mirrored, ...out } = plan;
  await sendPoints({ acao: "somar", chave: plan.key, quem: plan.who, pontos: plan.points, titulo: String(msg.summary || "Tarefa").slice(0, 120) });
  log.info(`+${plan.points} para ${plan.who}: ${msg.summary}${mirrored ? " (CronologIA)" : ""}`);
  return out;
}

/** Mais > Configurações > Integrações > Recompensas, and the points of each task. */
function pointsState(userId) {
  const p = placar.read();
  return { on: !!store.prefs.app.points_on, points: store.points, placar: placar.view(userId), espelho: (p && p.espelho) || {} };
}
/** Import or restore, then tell the other apps about the lists again. */
async function restoreAll(raw, reason, opts) {
  const out = await restore.run(raw, reason, opts);
  publishPresence();
  correria.publicar(); // the switch of the CorrerIA may have come with the backup
  return out;
}
const HA_REST = process.env.HA_REST_URL || "http://supervisor/core/api";
// Falar: the speech-to-text of Home Assistant (Assist)
const voice = new Voice({ ha, rest: HA_REST, token: TOKEN, log, pick: () => store.prefs.app.voice_engine || "" });
const usage = new AiUsage({ dir: DATA_DIR, sensor: "sensor.resolvia_ia_hoje", label: "ResolvIA", rest: HA_REST, token: TOKEN, log, enabled: () => store.prefs.app.sensors_on === true });
const ai = new AI({ ha, log, mediaDir: MEDIA_DIR, selected: () => store.prefs.app.ai_entity || "", usage, external: () => store.prefs.app.ext_off !== true });
const itemSubs = new Map(); // entity_id -> subscription (for the recurring engine and the ages)
// Mais › Configurações › Opções › Prazos › Avisar o que vence hoje: the lists as the screens show them (name, deadlines on or not)
const dueLists = () => {
  const out = new Map();
  for (const [id, st] of todoStates) {
    if (!st || st.state === "unavailable" || st.state === "unknown") continue;
    const prefs = (store.prefs.lists || {})[id] || {};
    out.set(id, { name: prefs.name || (st.attributes && st.attributes.friendly_name) || id, features: Number((st.attributes && st.attributes.supported_features) || 0), prefs });
  }
  return out;
};
// it goes to each person of Home Assistant, on the phones tied to them there
const dueAlert = new DueAlert({ ha, store, lists: dueLists, items: recurring.items, log });

// Mais › Configurações › Integrações › CorrerIA (off by default; it does not need Usar IA): the WhatsApp, the Claude and
// the Gemini read and change the lists through the tools (lib/ferramentas.js), with the key of share/resolvia/correria.json
const correriaOn = () => store.prefs.app.correria_on === true;
const correria = new Correria({ dataDir: DATA_DIR, shareDir: SHARE_DIR, port: PORT, version: VERSION, log, enabled: correriaOn, url: process.env.RESOLVIA_URL_INTERNA || "" });
/** The lists for the tools, in the order of the app, with the names and what each one takes. */
async function toolLists() {
  const looks = await lookOfLists();
  const dueOn = store.prefs.app.due_off !== true;
  const rows = [...todoStates].map(([id, st]) => {
    const prefs = store.prefs.lists[id] || {};
    const features = Number(st.attributes.supported_features) || 0;
    return { id, name: looks.get(id).name, features, hidden: !!prefs.hidden, owner: prefs.owner || "", unavailable: st.state === "unavailable" || st.state === "unknown", due: dueOn && !datesInfo(prefs, features) };
  });
  const order = [...looks.keys()];
  return rows.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
/** The user of Home Assistant of a person ({id: "person.ana"}), for who is who in the scoreboard. */
async function userOf(pessoa) {
  const id = String((pessoa && pessoa.id) || "");
  if (!/^person\.[a-z0-9_]+$/.test(id)) return null;
  const st = (await ha.send({ type: "get_states" })).find((s) => s.entity_id === id);
  return (st && st.attributes.user_id) || null;
}
const ferramentas = new Ferramentas({
  lists: toolLists,
  items: async (id) => (await ha.send({ type: "todo/item/list", entity_id: id })).items,
  call: (service, data, entityId) => ha.send({ type: "call_service", domain: "todo", service, service_data: data, target: { entity_id: [entityId] } }),
  store,
  recurring,
  placar,
  inventario,
  on: () => ({ due: store.prefs.app.due_off !== true, repeat: repeatOn(), points: !!store.prefs.app.points_on, rooms: roomsOn(), equips: equipsOn(), ext: store.prefs.app.ext_off !== true }),
  userOf,
  pointsPlan,
  pointsDone,
  roomsFromEquips,
  changed: () => publishPresence(),
  now: () => Date.now(),
});

/** The people who can own a list: the persons of Home Assistant and the participants of the scoreboard. */
async function peopleNames() {
  const states = await ha.send({ type: "get_states" });
  const names = (states || []).filter((st) => /^person\.[a-z0-9_]+$/.test(st.entity_id || "")).map((st) => (st.attributes && st.attributes.friendly_name) || st.entity_id.slice(7));
  const p = placar.read();
  const fold = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const out = [];
  for (const n of [...names, ...((p && p.participantes) || [])]) if (n && !out.some((x) => fold(x) === fold(n))) out.push(n);
  return out.sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/** The owners the CronologIA had before 1.53.0 (its De quem é), taken once. */
function adoptOwners() {
  if (store.data.owners_adopted) return;
  const p = placar.read();
  if (!p || !p.donos) return;
  const n = store.adoptOwners(p.donos);
  if (n) {
    log.info(`De quem é: ${n} lista(s) com dono vieram da CronologIA`);
    publishPresence();
  }
}
// Sugestões: since when each pending item is on its list, and the last suggestion of the AI
const ages = new Ages({ dir: DATA_DIR, log });
// the last pick of the AI (Sugestões › Comece por aqui), kept on disk so it survives a restart or an update
const SUGGEST_FILE = path.join(DATA_DIR, "sugestao_ia.json");
let lastSuggest = null;
try {
  const raw = JSON.parse(fs.readFileSync(SUGGEST_FILE, "utf8"));
  if (raw && Number.isFinite(raw.at) && Array.isArray(raw.picks)) lastSuggest = { at: raw.at, picks: raw.picks.filter((p) => p && typeof p.key === "string").slice(0, 10), provider: raw.provider || null };
} catch (e) {
  /* none yet */
}
function saveSuggest() {
  try {
    if (lastSuggest) fs.writeFileSync(SUGGEST_FILE, JSON.stringify(lastSuggest));
    else fs.rmSync(SUGGEST_FILE, { force: true });
  } catch (err) {
    log.warn(`Sugestão da IA: ${err.message}`);
  }
}
// a pick running: whoever opens Sugestões meanwhile sees "Pensando…" and gets the same answer
let suggestRun = null;
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
      (ev) => {
        const items = (ev && ev.items) || [];
        const st = todoStates.get(id);
        if (st && st.state !== "unavailable" && st.state !== "unknown") ages.track(id, items);
        recurring.process(id, items);
      },
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

// The CronologIA created a task with a room and/or an equipment (Novo › Tarefa): {entity_id, tarefa, comodo?, equipamento?}
ha.subscribe({ type: "subscribe_events", event_type: "resolvia_comodo" }, (ev) => {
  const d = (ev && ev.data) || {};
  if (!isTodo(d.entity_id) || !d.tarefa) return;
  try {
    // comodo: an id or, with several rooms, a list (CronologIA 1.49)
    if (roomsOn() && "comodo" in d) store.setRoom(d.entity_id, String(d.tarefa), Array.isArray(d.comodo) ? d.comodo.map(String) : d.comodo ? String(d.comodo) : null);
    // one item ("pia_1") or several (["pia_1", "fogao_1"]); "" or [] removes
    if (equipsOn() && "equipamento" in d) {
      store.setEquip(d.entity_id, String(d.tarefa), Array.isArray(d.equipamento) ? d.equipamento.map(String) : d.equipamento ? String(d.equipamento) : null);
      roomsFromEquips(d.entity_id, String(d.tarefa));
    }
    publishPresence();
  } catch (err) {
    log.warn(`Cômodo vindo do ${d.origem || "CronologIA"}: ${err.message}`);
  }
});

// The CronologIA brought these tasks over as routines (Trazer do ResolvIA) and deleted them from
// the list: forget their repetition (or a done one would be created again) and their points.
ha.subscribe({ type: "subscribe_events", event_type: "resolvia_esquecer" }, (ev) => {
  const d = (ev && ev.data) || {};
  if (!isTodo(d.entity_id)) return;
  const uids = new Set((Array.isArray(d.uids) ? d.uids : []).map(String));
  const names = (Array.isArray(d.tarefas) ? d.tarefas : []).map((x) => String(x || "")).filter(Boolean).slice(0, 500);
  let rules = 0;
  for (const r of Object.values(store.rules || {})) {
    if (r.entity_id !== d.entity_id) continue;
    if (!((r.uid && uids.has(r.uid)) || (!r.uid && names.includes(r.match || r.summary)))) continue;
    try {
      recurring.setRule({ entity_id: r.entity_id, uid: r.uid || undefined, summary: r.match || r.summary, days: 0 });
      rules++;
    } catch (err) {
      log.warn(`Não consegui tirar a repetição de "${r.summary}": ${err.message}`);
    }
  }
  // what this app kept about them goes too: points, room and equipment
  for (const name of names) {
    try {
      store.setPoints(d.entity_id, name, 0);
    } catch (e) {
      /* no points for it */
    }
    try {
      store.setRoom(d.entity_id, name, null);
      store.setEquip(d.entity_id, name, null);
      store.setExternal(d.entity_id, name, null);
    } catch (e) {
      /* no room or equipment for it */
    }
  }
  publishPresence();
  log.info(`Levadas para o ${d.origem || "CronologIA"}: ${names.length} tarefas de ${d.entity_id}${rules ? ` (${rules} repetições tiradas)` : ""}`);
});

let sensorsCleaned = false;
ha.on("ready", async () => {
  registryCache = null;
  // Sensores no Home Assistant off (the default): the one left by an older version goes away, once
  if (!sensorsCleaned && store.prefs.app.sensors_on !== true) {
    sensorsCleaned = true;
    usage.remove().catch(() => {});
  }
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
    inventario.start();
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
    // (a screen that closed while the AI was thinking: the socket ignores it)
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

      case "resolvia/voice/status":
        return this.result(id, await voice.status({ fresh: !!msg.fresh }));

      case "resolvia/ai/status":
        return this.result(id, await ai.status());

      // Mais › Configurações › Integrações › Uso da IA
      case "resolvia/ai/usage":
        return this.result(id, usage.summary());

      // Sugestões (when Mais › Configurações › Opções › Controlar prazos is off)
      case "resolvia/suggest/get":
        return this.result(id, { ages: ages.all(), ai: lastSuggest, busy: !!suggestRun });

      case "resolvia/ai/suggest": {
        if (store.prefs.app.ai_off) return this.error(id, "ai_off", "A IA está desligada em Mais › Configurações › Integrações");
        if (!suggestRun) {
          suggestRun = ai
            .suggest(msg.items)
            .then((out) => {
              lastSuggest = { at: Date.now(), picks: out.picks, provider: out.provider };
              saveSuggest();
              return lastSuggest;
            })
            .finally(() => {
              suggestRun = null;
            });
        }
        return this.result(id, await suggestRun);
      }

      // Conversa (the chat beside the microphone): one turn -> {reply, actions, provider}
      case "resolvia/ai/chat": {
        if (store.prefs.app.ai_off) return this.error(id, "ai_off", "A IA está desligada em Mais › Configurações › Integrações");
        return this.result(id, await ai.chat({ messages: msg.messages, context: msg.context }));
      }

      // Comece por aqui › Voltar ao automático
      case "resolvia/ai/suggest/clear":
        lastSuggest = null;
        saveSuggest();
        return this.result(id, null);

      case "resolvia/subscribe_lists":
        this.watch(listWatchers, id);
        return this.result(id);

      case "resolvia/recurring/subscribe":
        this.watch(ruleWatchers, id);
        this.result(id);
        return this.event(id, { rules: recurring.publicRules() });

      case "resolvia/recurring/clear": {
        const n = recurring.clearAll();
        log.info(`Repetições apagadas: ${n}`);
        publishPresence();
        return this.result(id, { removed: n });
      }

      case "resolvia/recurring/set": {
        const rule = recurring.setRule({ entity_id: msg.entity_id, uid: msg.uid, summary: msg.summary, days: msg.days });
        return this.result(id, rule);
      }

      case "resolvia/prefs/get":
        return this.result(id, store.prefs);
      // Avisar o que vence hoje: who gets it (each person; phone: has one tied in Home Assistant; me: the one using the app), and Testar on mine
      case "resolvia/due_alert/people":
        return this.result(id, (await dueAlert.recipients()).map((r) => ({ id: r.id, name: r.name, phone: r.phones.length > 0, me: !!(this.user.id && r.user_id === this.user.id) })));
      // De quem é (Personalizar): the people of the house and those of the scoreboard of the CronologIA
      case "resolvia/people":
        return this.result(id, await peopleNames());
      case "resolvia/due_alert/test":
        return this.result(id, await dueAlert.test(this.user.id));
      case "resolvia/prefs/set_list": {
        const prefs = store.setListPrefs(msg.entity_id, msg.prefs);
        if ("dates_info" in (msg.prefs || {}) || "owner" in (msg.prefs || {})) publishPresence();
        return this.result(id, prefs);
      }
      case "resolvia/prefs/set_app": {
        const prefs = store.setAppPrefs(msg.prefs);
        if ("points_on" in (msg.prefs || {}) || "due_off" in (msg.prefs || {})) publishPresence();
        if ("rooms_on" in (msg.prefs || {}) || "equips_on" in (msg.prefs || {})) inventario.refresh().then(() => publishPresence()).catch(() => {});
        // Sensores no Home Assistant: on creates the sensor now, off removes it
        if ("sensors_on" in (msg.prefs || {})) (store.prefs.app.sensors_on === true ? usage.publish() : usage.remove()).catch(() => {});
        if ("repeat_on" in (msg.prefs || {})) {
          // back on: completed items with a rule start counting now; off: nothing comes back
          for (const [eid, items] of recurring.items) recurring.process(eid, items);
          publishPresence();
        }
        // CorrerIA: on writes share/resolvia/correria.json, off removes it (and the key stops working)
        if ("correria_on" in (msg.prefs || {})) correria.publicar();
        return this.result(id, prefs);
      }

      // Mais › Configurações › Integrações › CorrerIA: on, and who used it last ({cliente, em, nome})
      case "resolvia/correria/get":
        return this.result(id, { on: correriaOn(), ultimo: correria.ultimo });

      // ---- Recompensas: points per task, given to the CronologIA scoreboard
      // ---- Cômodos do InventarIA
      case "resolvia/rooms/get":
        return this.result(id, roomsState());

      case "resolvia/rooms/refresh":
        await inventario.refresh();
        return this.result(id, roomsState());

      case "resolvia/equips/set": {
        if (!equipsOn()) return this.error(id, "equips_off", "Os equipamentos estão desligados em Mais › Configurações › Integrações.");
        // equips: the list of items of the task ([] removes); equip: one item (older screens)
        const value = Array.isArray(msg.equips) ? msg.equips.map(String) : msg.equip ? String(msg.equip) : null;
        store.setEquip(msg.entity_id, String(msg.summary || ""), value, msg.previous_summary == null ? null : String(msg.previous_summary));
        roomsFromEquips(msg.entity_id, String(msg.summary || ""));
        publishPresence();
        return this.result(id, roomsState());
      }

      case "resolvia/rooms/set": {
        if (!roomsOn()) return this.error(id, "rooms_off", "Os cômodos estão desligados em Mais › Configurações › Integrações.");
        // rooms: the list (several when the items of the task are in several rooms); room: one (older screens)
        const rooms = Array.isArray(msg.rooms) ? msg.rooms.map(String) : msg.room ? String(msg.room) : null;
        store.setRoom(msg.entity_id, String(msg.summary || ""), rooms, msg.previous_summary == null ? null : String(msg.previous_summary));
        publishPresence();
        return this.result(id, roomsState());
      }

      // ---- Serviço externo: tasks done by someone from outside ({ext: {todo.x: {task key: true | "who"}}})
      case "resolvia/external/get":
        return this.result(id, { ext: store.external });

      case "resolvia/external/set": {
        store.setExternal(msg.entity_id, String(msg.summary || ""), msg.value == null ? null : msg.value, msg.previous_summary == null ? null : String(msg.previous_summary));
        return this.result(id, { ext: store.external });
      }

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
      case "resolvia/points/done":
        if (!isTodo(msg.entity_id) || typeof msg.uid !== "string" || !msg.uid) return this.error(id, "invalid_format", "Tarefa inválida");
        return this.result(id, await pointsDone({ ...msg, userId: this.user.id }));

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

      // Começar do zero: the data of the tasks go, the settings and the items stay (a copy in Versões anteriores)
      case "resolvia/data/erase": {
        const out = store.erase();
        log.info(`Começar do zero: ${out.rules} repetições, ${out.points} pontos, ${out.rooms} cômodos, ${out.equips} equipamentos e ${out.ext} serviços externos apagados`);
        recurring.emit("change");
        publishPresence();
        return this.result(id, out);
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
  "/selectsheet.js": ["selectsheet.js", "text/javascript; charset=utf-8"],
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
    // too big: stop keeping it, but read to the end so the answer (413) reaches the browser
    // (closing mid-upload made it see a broken connection); far too big: close
    if (aborted) {
      if (size > MAX_UPLOAD * 4) req.destroy();
      return;
    }
    if (size > MAX_UPLOAD) {
      aborted = true;
      chunks.length = 0;
      return;
    }
    chunks.push(c);
  });
  req.on("end", async () => {
    if (aborted) return sendJson(res, 413, { error: "Arquivo grande demais" });
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
    // too big: stop keeping it, but read to the end so the answer (413) reaches the browser
    // (closing mid-upload made it see a broken connection); far too big: close
    if (aborted) {
      if (size > MAX_UPLOAD * 4) req.destroy();
      return;
    }
    if (size > MAX_UPLOAD) {
      aborted = true;
      chunks.length = 0;
      return;
    }
    chunks.push(c);
  });
  req.on("end", async () => {
    if (aborted) return sendJson(res, 413, { error: "Arquivo grande demais" });
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch (e) {
      return sendJson(res, 400, { error: "JSON inválido" });
    }
    if (store.prefs.app.ai_off) return sendJson(res, 409, { error: "A IA está desligada em Mais › Configurações › Integrações", code: "ai_off" });
    const started = Date.now();
    try {
      const rooms = roomsOn() ? inventario.state.comodos.map((c) => ({ id: c.id, name: c.nome })) : [];
      const equips = equipsOn() ? inventario.state.itens.map((i) => ({ id: i.id, name: inventario.itemLabel(i) })) : [];
      const out = await ai.extract({ text: body.text, images: body.images, listName: body.list_name, lists: body.lists, rooms, equips });
      log.info(`Importação: ${out.items.length} itens via ${out.provider} em ${((Date.now() - started) / 1000).toFixed(1)}s`);
      sendJson(res, 200, out);
    } catch (err) {
      log.warn(`Importação falhou: ${err.message}`);
      const setup = ["no_ai", "no_vision", "gone", "unavailable", "no_media"].includes(err.code);
      sendJson(res, setup ? 409 : 502, { error: err.message, code: err.code || "failed" });
    }
  });
}

/** POST /api/voice (raw PCM, 16 kHz, 16-bit, mono) -> {text, engine}: Falar, through the speech-to-text of Home Assistant */
async function handleVoice(req, res) {
  const started = Date.now();
  try {
    const pcm = await readRaw(req, MAX_VOICE_BYTES + 1024);
    const out = await voice.text(pcm);
    log.info(`Falar: ${(pcm.length / 32000).toFixed(1)}s de áudio, texto em ${((Date.now() - started) / 1000).toFixed(1)}s (${out.engine})`);
    sendJson(res, 200, out);
  } catch (err) {
    log.warn(`Falar: ${err.message}`);
    sendJson(res, err.code === "too_big" ? 413 : err.code === "no_stt" ? 409 : err.code === "invalid_format" || err.code === "not_understood" ? 422 : 502, { error: err.message, code: err.code || "failed" });
  }
}

// the devices of the lists (for their names and colors as in the app), read again every 5 minutes
let registries = { at: 0, entities: [], devices: [] };
async function lookOfLists() {
  if (Date.now() - registries.at > 5 * 60000) {
    try {
      const [ents, devs] = await Promise.all([ha.send({ type: "config/entity_registry/list_for_display" }), ha.send({ type: "config/device_registry/list" })]);
      registries = { at: Date.now(), entities: (ents && ents.entities) || [], devices: Array.isArray(devs) ? devs : [] };
    } catch {
      registries = { at: Date.now(), entities: [], devices: [] };
    }
  }
  return listLooks({ states: todoStates, entities: registries.entities, devices: registries.devices, prefs: store.prefs.lists || {} });
}

/**
 * Mais › Relatório de pendências: the open tasks of the marked lists (or of ?lista=), to see, print or save as
 * PDF; tema and cor: the ones of the app. Only what is on: deadlines, repeat, points, rooms, equipment, externo.
 * The lists with the names and the colors of the app (the charts).
 */
async function handleReport(url, res, pdf = false) {
  const app = store.prefs.app;
  const looks = await lookOfLists();
  const lists = [...dueLists()]
    .map(([id, l]) => ({ id, name: (looks.get(id) || {}).name || l.name, color: (looks.get(id) || {}).color || "", owner: l.prefs.owner || "", hidden: !!l.prefs.hidden, due: app.due_off !== true && !datesInfo(l.prefs, l.features) }))
    .sort((a, b) => Number(a.hidden) - Number(b.hidden) || a.name.localeCompare(b.name, "pt-BR"));
  const rules = Object.values(store.rules || {});
  const repeatOn = app.repeat_on === undefined ? rules.length > 0 : app.repeat_on === true;
  const itemName = (id) => (inventario.state.itens.find((i) => i.id === id) || {}).nome || "";
  const extra = (listId, i) => {
    const rule = repeatOn ? rules.find((r) => r.entity_id === listId && ((r.uid && r.uid === i.uid) || (!r.uid && r.match === i.summary))) : null;
    return {
      repeat: rule ? rule.days : 0,
      points: app.points_on ? store.pointsFor(listId, i.summary) : 0,
      rooms: roomsOn() ? store.roomsFor(listId, i.summary).map((id) => inventario.nameOf(id)).filter(Boolean) : [],
      equips: equipsOn() ? store.equipsFor(listId, i.summary).map(itemName).filter(Boolean) : [],
      external: app.ext_off !== true ? store.externalFor(listId, i.summary) : null,
    };
  };
  const rep = pendencias({ lists, items: recurring.items, pick: url.searchParams.get("lista") || "", now: Date.now(), extra });
  if (pdf) {
    // Baixar PDF: the app Home Assistant on the phone downloads it and opens it (to print or share)
    const file = reportPdf(rep, { cor: url.searchParams.get("cor") });
    res.writeHead(200, { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${pdfName(rep)}"`, "Cache-Control": "no-store", "Content-Length": file.length, "X-Content-Type-Options": "nosniff" });
    return res.end(file);
  }
  const tema = url.searchParams.get("tema");
  const body = Buffer.from(reportHtml(rep, { tema: tema === "claro" || tema === "escuro" ? tema : null, cor: url.searchParams.get("cor") }), "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Content-Length": body.length, "X-Content-Type-Options": "nosniff" });
  res.end(body);
}

/**
 * The CorrerIA (the WhatsApp, the Claude and the Gemini), from the internal network of the apps, with the key of
 * share/resolvia/correria.json: GET lists the tools, POST {nome, argumentos, pessoa, cliente} runs one -> {texto}
 * (400 {erro}: a wrong argument, saying what is accepted; 404: no such tool). Off or a wrong key: 401.
 */
async function handleTools(req, res) {
  if (!correria.autorizado(req.headers)) return sendJson(res, 401, { erro: "Chave inválida ou CorrerIA desligado no ResolvIA." });
  if (req.method === "GET") return sendJson(res, 200, { versao: VERSION, instrucoes: INSTRUCOES, ferramentas: ferramentas.lista() });
  if (req.method !== "POST") return sendJson(res, 405, { erro: "Use GET ou POST." });
  let body;
  try {
    const raw = await readRaw(req, 256 * 1024);
    body = JSON.parse(raw.toString("utf8"));
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch (err) {
    return sendJson(res, err.code === "too_big" ? 413 : 400, { erro: err.code === "too_big" ? "Pedido grande demais." : "JSON inválido." });
  }
  const nome = String(body.nome || "");
  const pessoa = body.pessoa && typeof body.pessoa === "object" ? body.pessoa : null;
  const cliente = String(body.cliente || "CorrerIA").slice(0, 40);
  try {
    await ha.whenReady();
    const texto = await ferramentas.chamar(nome, body.argumentos, { pessoa });
    correria.usado(cliente, nome);
    if (ferramentas.lista().some((t) => t.nome === nome && t.grava)) log.info(`CorrerIA: ${cliente}${pessoa && pessoa.nome ? ` (${String(pessoa.nome).slice(0, 40)})` : ""} ${nome} → ${texto.split("\n")[0].slice(0, 160)}`);
    return sendJson(res, 200, { texto });
  } catch (err) {
    if (err.status === 400 || err.status === 404) return sendJson(res, err.status, { erro: err.message });
    log.warn(`CorrerIA: ${nome}: ${err.message}`);
    return sendJson(res, 502, { erro: `O Home Assistant não respondeu: ${err.message}` });
  }
}

const server = http.createServer((req, res) => {
  // the CorrerIA comes from another app (not the ingress): its key says who it is
  if (new URL(req.url, "http://x").pathname === ROTA_CORRERIA) return handleTools(req, res);
  if (!allowed(req)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/extract" && req.method === "POST") return handleExtract(req, res);
  if (url.pathname === "/api/voice" && req.method === "POST") return handleVoice(req, res);
  const exp = url.pathname.match(/^\/api\/export\/(json|csv|zip)$/);
  if (exp && req.method === "GET") return handleData(exp[1], res);
  if (url.pathname === "/api/import" && req.method === "POST") return handleImport(req, res);
  if ((url.pathname === "/relatorio" || url.pathname === "/relatorio.pdf") && req.method === "GET") {
    return handleReport(url, res, url.pathname.endsWith(".pdf")).catch((err) => {
      log.warn(`Relatório: ${err.message}`);
      if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" }).end("Não deu para montar o relatório.");
    });
  }
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
    // prazos: Mais › Configurações › Opções › Controlar prazos (false: the CronologIA doesn't offer a deadline for new tasks either)
    const prazos = !store.prefs.app.due_off;
    // comodos: the rooms of the InventarIA and the room of each task, so the CronologIA shows and asks for them too
    const comodos = roomsOn() && inventario.state.comodos.length ? { lista: inventario.state.comodos.map((c) => ({ id: c.id, nome: c.nome })), tarefas: store.rooms } : null;
    // equipamentos: the items of the InventarIA (with their room) and the item of each task
    const equipamentos = equipsOn() && inventario.state.itens.length ? { lista: inventario.state.itens.map((i) => ({ id: i.id, nome: i.nome, comodo: inventario.nameOf(i.comodo) || "" })), tarefas: store.equips } : null;
    // donos: whose each list is (De quem é, 2.42.0+): the CronologIA shows it only to that person
    const donos = store.owners;
    fs.writeFileSync(tmp, JSON.stringify({ app: "ResolvIA", versao: VERSION, gravado_em: new Date().toISOString(), prazos, sem_prazo: semPrazo, pontos, repete, donos, ...(comodos ? { comodos } : {}), ...(equipamentos ? { equipamentos } : {}) }, null, 1));
    fs.renameSync(tmp, path.join(dir, "integracao.json"));
    publishWarned = false;
  } catch (err) {
    if (!publishWarned) log.warn(`Não consegui gravar share/resolvia/integracao.json: ${err.message}`);
    publishWarned = true;
  }
}
publishPresence();
setInterval(publishPresence, 15 * 60 * 1000);
// CorrerIA: the file is written again at the start and every 15 minutes while on (the address may change); off, a file
// left from before goes away
correria.publicar();
setInterval(() => correria.publicar(), 15 * 60 * 1000);
// the owners of the lists of the CronologIA (before 1.53.0), taken once it publishes them
// (every minute until then; afterwards it returns at once)
setTimeout(adoptOwners, 3000);
setInterval(adoptOwners, 60 * 1000);
// Avisar o que vence hoje: checked every minute (it goes once a day, at the chosen time)
// (RESOLVIA_ALERT_MS, in development only: the tests check sooner)
const ALERT_EVERY = (DEV && Number(process.env.RESOLVIA_ALERT_MS)) || 60 * 1000;
setInterval(() => dueAlert.tick().catch((err) => log.warn(`Aviso de prazos: ${err.message}`)), ALERT_EVERY);

server.listen(PORT, () => log.info(`ResolvIA ${VERSION} ouvindo na porta ${PORT}${DEV ? " (modo dev)" : ""}`));
ha.start();
recurring.start();

const shutdown = () => {
  log.info("Encerrando…");
  store.flush();
  ages.flush();
  recurring.stop();
  ha.stop();
  server.close();
  setTimeout(() => process.exit(0), 300);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
