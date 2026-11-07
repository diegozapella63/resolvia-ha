// Persistent state in /data/resolvia.json: list customization + recurring rules.
// A copy of the file goes to /data/versoes at most every 10 minutes of use
// (Mais > Configurações > Dados > Versões anteriores), and before every import or restore.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const VERSION_EVERY = 10 * 60 * 1000;
const MAX_VERSIONS = 3; // Versões anteriores: only the 3 newest copies are kept
const pad = (n) => String(n).padStart(2, "0");
// to the millisecond: two copies in the same second (a double Restaurar) keep both
const stamp = (d = new Date()) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${String(d.getMilliseconds()).padStart(3, "0")}`;

/** The order of the safety copies: by when they were made ("resolvia-YYYYMMDD-HHMMSS[mmm]-motivo.json"), not by the name. */
export const versionKey = (name) => {
  const m = /^resolvia-(\d{8})-(\d{6})(\d{3})?/.exec(name || "");
  return m ? `${m[1]}${m[2]}${m[3] || "000"}` : "";
};
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const str = (v, max) => (typeof v === "string" && v.trim() ? v.slice(0, max) : null);
const num = (v) => (Number.isFinite(v) ? v : null);

// A deadline is only what the user sets. A list that doesn't let you set a due
// date gets its dates from the integration (e.g. "unavailable since"): they are
// always information, never deadlines. dates_info: true also turns off the
// deadlines of a list that does accept them.
const LIST_FIELDS = { name: ["string", 80], color: ["string", 24], icon: ["string", 40], hidden: ["boolean"], dates_info: ["boolean"] };

const F_DUE = 16 | 32; // TodoListEntityFeature.SET_DUE_DATE | SET_DUE_DATETIME

/** Whether the dates of a list are only information (see dates_info). */
export function datesInfo(prefs, features) {
  return ((features || 0) & F_DUE) === 0 || !!(prefs && prefs.dates_info === true);
}
const APP_FIELDS = {
  accent: ["string", 24],
  // Mais › Configurações › Aparência › Cor do dia: on unless false
  accent_daily: ["boolean"],
  group_by_device: ["boolean"],
  show_done: ["boolean"],
  list_order: ["list", 200],
  // "" / null = the AI Home Assistant prefers (Mais > Configurações > Integrações > Leitura por IA).
  ai_entity: ["string", 80],
  // Mais > Configurações > Integrações > Falar: the speech-to-text (stt.* or an engine of a voice assistant); null = the voice assistant's
  voice_engine: ["string", 80],
  // Mais > Configurações > Integrações > Recompensas: tasks can be worth points in the CronologIA scoreboard.
  points_on: ["boolean"],
  // Mais > Configurações > Opções > Repetição: "Repetir depois de concluir" on (true) or off (false); unset = on when there are rules
  repeat_on: ["boolean"],
  // Mais > Configurações > Integrações > Usar IA: true = off (no import from messages and photos)
  ai_off: ["boolean"],
  // Mais > Configurações > Opções > Controlar prazos: true = off (no Prazos tab, no deadline field; Sugestões instead)
  due_off: ["boolean"],
  // … › Avisar o que vence hoje: true = on (off unless turned on), at due_alert_time ("HH:MM"), to the phones in due_alert_to
  due_alert: ["boolean"],
  due_alert_time: ["string", 5],
  due_alert_to: ["list", 20],
  // Mais > Configurações > Integrações > Sensores no Home Assistant: true = on (off unless turned on)
  sensors_on: ["boolean"],
  // Mais > Configurações > Integrações > Cômodos do InventarIA: true = each task can have a room (off unless turned on)
  rooms_on: ["boolean"],
  // Mais > Configurações > Integrações > InventarIA › Usar equipamentos: each task can point to an item of the InventarIA
  equips_on: ["boolean"],
};

/** Avisar o que vence hoje: a time "HH:MM" and phones notify.mobile_app_*; anything else is dropped. */
function checkAlert(p) {
  if (typeof p.due_alert_time === "string" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(p.due_alert_time)) p.due_alert_time = null;
  if (Array.isArray(p.due_alert_to)) p.due_alert_to = [...new Set(p.due_alert_to.filter((t) => /^mobile_app_[a-z0-9_]+$/.test(t)))];
}

/** A repeating task from a file (import, restore): only the known fields, sane values. */
function cleanRule(r, id) {
  if (!isObj(r) || typeof r.entity_id !== "string" || !/^todo\.[a-z0-9_]+$/.test(r.entity_id)) return null;
  const days = Number(r.days);
  if (!Number.isInteger(days) || days < 1 || days > 365) return null;
  const summary = str(r.summary, 255) || str(r.match, 255);
  if (!summary) return null;
  return {
    id: typeof id === "string" && /^[\w-]{1,40}$/.test(id) ? id : crypto.randomBytes(6).toString("hex"),
    entity_id: r.entity_id,
    uid: str(r.uid, 255),
    match: str(r.uid, 255) ? null : str(r.match, 255) || summary,
    summary,
    description: str(r.description, 4000),
    days,
    completed_at: num(r.completed_at),
    reopen_at: num(r.completed_at) ? num(r.reopen_at) : null,
    due_time: str(r.due_time, 40),
    created_at: num(r.created_at) || Date.now(),
  };
}

/** How a task is known for its points: the name, folded (same as the CronologIA). */
export const taskKey = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 255);

/** {todo.x: {task key: points}}, checked. */
function cleanPoints(raw) {
  const out = {};
  if (!isObj(raw)) return out;
  for (const [id, map] of Object.entries(raw)) {
    if (!/^todo\.[a-z0-9_]+$/.test(id) || !isObj(map)) continue;
    for (const [k, v] of Object.entries(map)) {
      const n = Math.round(Number(v));
      const key = taskKey(k);
      if (!key || !(n >= 1 && n <= 1000)) continue;
      (out[id] || (out[id] = {}))[key] = n;
    }
  }
  return out;
}

/** {todo.x: {task key: room id of the InventarIA}}, checked. */
const LINK_ID = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_LINKS = 10;

/** The rooms or items of a task: an id (one) or a list of ids (several), checked; [] when none. */
export function linkIds(v) {
  const all = Array.isArray(v) ? v : v == null || v === "" ? [] : [v];
  return [...new Set(all.filter((x) => typeof x === "string" && LINK_ID.test(x)))].slice(0, MAX_LINKS);
}
export const equipIds = linkIds;

/** How the links of a task are kept: one id as a plain string (as before 2.31), several as a list. */
const linkValue = (ids) => (ids.length === 1 ? ids[0] : ids);

/**
 * {todo.x: {task key: id | [ids]}}: the room(s) and the item(s) of the InventarIA of each task
 * (several items can be in several rooms).
 */
function cleanLinks(raw) {
  const out = {};
  if (!isObj(raw)) return out;
  for (const [id, map] of Object.entries(raw)) {
    if (!/^todo\.[a-z0-9_]+$/.test(id) || !isObj(map)) continue;
    for (const [k, v] of Object.entries(map)) {
      const key = taskKey(k);
      const ids = linkIds(v);
      if (!key || !ids.length) continue;
      (out[id] || (out[id] = {}))[key] = linkValue(ids);
    }
  }
  return out;
}

/** Serviço externo: who will do a task that is not for the house ("Eletricista"), true when not said; null when it is not one. */
export function externalValue(v) {
  if (v === true) return true;
  if (typeof v !== "string") return null;
  const s = v.replace(/\s+/g, " ").trim().slice(0, 60);
  return s || null;
}

/** {todo.x: {task key: true | "who"}}: the tasks done by someone from outside (a professional, a store). */
function cleanExternal(raw) {
  const out = {};
  if (!isObj(raw)) return out;
  for (const [id, map] of Object.entries(raw)) {
    if (!/^todo\.[a-z0-9_]+$/.test(id) || !isObj(map)) continue;
    for (const [k, v] of Object.entries(map)) {
      const key = taskKey(k);
      const val = externalValue(v);
      if (!key || val == null) continue;
      (out[id] || (out[id] = {}))[key] = val;
    }
  }
  return out;
}

/** The file contents, checked. Strict (imports) also validates every preference. */
export function normalize(raw, strict = false) {
  const data = { version: 1, prefs: { lists: {}, app: {} }, rules: {}, points: {}, rooms: {}, equips: {}, ext: {} };
  if (!isObj(raw)) return data;
  if (isObj(raw.prefs)) {
    if (isObj(raw.prefs.lists)) {
      for (const [id, p] of Object.entries(raw.prefs.lists)) {
        if (!/^todo\.[a-z0-9_]+$/.test(id) || !isObj(p)) continue;
        if (!strict) data.prefs.lists[id] = p;
        else {
          try {
            const clean = Store.merge({}, Store.clean(p, LIST_FIELDS));
            if (Object.keys(clean).length) data.prefs.lists[id] = clean;
          } catch (e) {
            /* skip a broken list */
          }
        }
      }
    }
    if (isObj(raw.prefs.app)) {
      if (!strict) data.prefs.app = raw.prefs.app;
      else {
        const app = {};
        for (const [k, v] of Object.entries(raw.prefs.app)) {
          try {
            Object.assign(app, Store.clean({ [k]: v }, APP_FIELDS));
          } catch (e) {
            /* skip a broken field */
          }
        }
        if (app.ai_entity && !/^ai_task\.[a-z0-9_]+$/.test(app.ai_entity)) delete app.ai_entity;
        if (app.voice_engine && !/^[a-z0-9_.]+$/.test(app.voice_engine)) delete app.voice_engine;
        checkAlert(app);
        data.prefs.app = Store.merge({}, app);
      }
    }
  }
  const rules = Array.isArray(raw.rules) ? raw.rules.map((r) => [r && r.id, r]) : isObj(raw.rules) ? Object.entries(raw.rules) : [];
  for (const [id, r] of rules) {
    if (!strict) {
      if (isObj(r)) data.rules[id] = r;
      continue;
    }
    const clean = cleanRule(r, id);
    if (clean && !data.rules[clean.id]) data.rules[clean.id] = clean;
  }
  data.points = cleanPoints(raw.points);
  data.rooms = cleanLinks(raw.rooms); // {todo.x: {task key: room id | [room ids]}}
  data.ext = cleanExternal(raw.ext); // {todo.x: {task key: true | "who"}}: Serviço externo
  data.equips = cleanLinks(raw.equips); // {todo.x: {task key: item id | [item ids] of the InventarIA}}
  // the day each daily alert went out ({prazos: "YYYY-MM-DD"}), so it goes once a day even after a restart
  if (isObj(raw.alerts) && typeof raw.alerts.prazos === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.alerts.prazos)) data.alerts = { prazos: raw.alerts.prazos };
  return data;
}

export class Store {
  constructor(dir, log) {
    this.file = path.join(dir, "resolvia.json");
    this.versionsDir = path.join(dir, "versoes");
    this.log = log;
    this.data = normalize(null);
    this.timer = null;
    this.lastVersion = 0;
    fs.mkdirSync(dir, { recursive: true });
    try {
      this.data = normalize(JSON.parse(fs.readFileSync(this.file, "utf8")));
    } catch (err) {
      if (err.code !== "ENOENT") this.log.warn(`Could not read ${this.file}: ${err.message}`);
    }
  }

  /** Swaps everything for `raw` (import, restore), keeping a copy of what was there. */
  replaceAll(raw, reason) {
    const next = normalize(raw, true);
    if (this.timer) this.flush({ version: false });
    this.version(reason, true);
    this.data = next;
    this.flush({ version: false });
    return this.data;
  }

  /** Keeps only the newest MAX_VERSIONS copies in /data/versoes. */
  trimVersions() {
    try {
      const all = fs
        .readdirSync(this.versionsDir)
        .filter((f) => /^resolvia-.*\.json$/.test(f))
        .sort((a, b) => versionKey(a).localeCompare(versionKey(b)) || a.localeCompare(b));
      for (const old of all.slice(0, Math.max(0, all.length - MAX_VERSIONS))) fs.rmSync(path.join(this.versionsDir, old), { force: true });
    } catch (e) {
      /* no versions yet */
    }
  }

  /** Copies the file as it is now to /data/versoes (at most every 10 min unless forced). */
  version(reason = "auto", force = false) {
    if (!force && Date.now() - this.lastVersion < VERSION_EVERY) return null;
    if (!fs.existsSync(this.file)) return null;
    try {
      fs.mkdirSync(this.versionsDir, { recursive: true });
      let at = new Date();
      let name = `resolvia-${stamp(at)}-${reason}.json`;
      while (fs.existsSync(path.join(this.versionsDir, name))) {
        at = new Date(at.getTime() + 1);
        name = `resolvia-${stamp(at)}-${reason}.json`;
      }
      fs.copyFileSync(this.file, path.join(this.versionsDir, name));
      this.lastVersion = Date.now();
      this.trimVersions();
      return name;
    } catch (err) {
      this.log.warn(`Não consegui guardar uma versão: ${err.message}`);
      return null;
    }
  }

  get prefs() {
    return this.data.prefs;
  }

  get rules() {
    return this.data.rules;
  }

  get points() {
    return this.data.points;
  }

  get external() {
    return this.data.ext || {};
  }

  /** Serviço externo of a task: true, the name of who does it, or null. */
  externalFor(entityId, summary) {
    const map = this.external[entityId];
    return (map && map[taskKey(summary)]) || null;
  }

  /** Sets (true or "who") or clears (null/false) the Serviço externo of a task; `previous` is the old name after a rename. */
  setExternal(entityId, summary, value, previous = null) {
    if (typeof entityId !== "string" || !/^todo\.[a-z0-9_]+$/.test(entityId)) throw new Error("Not a to-do entity");
    const key = taskKey(summary);
    if (!key) throw new Error("Task name required");
    const val = value === false ? null : externalValue(value);
    const cur = this.data.ext || {};
    const map = { ...(cur[entityId] || {}) };
    if (previous != null && taskKey(previous) !== key) delete map[taskKey(previous)];
    if (val != null) map[key] = val;
    else delete map[key];
    const all = { ...cur };
    if (Object.keys(map).length) all[entityId] = map;
    else delete all[entityId];
    this.data.ext = all;
    this.save();
    return all;
  }

  get rooms() {
    return this.data.rooms || {};
  }

  get equips() {
    return this.data.equips || {};
  }

  /** Sets the items of a task (an InventarIA item id or a list of them; null or [] removes). */
  setEquip(entityId, summary, equip, previous = null) {
    return this._setLink("equips", entityId, summary, equip, previous);
  }

  /** The items of a task (InventarIA ids), [] when none. */
  equipsFor(entityId, summary) {
    const map = this.equips[entityId];
    return linkIds(map && map[taskKey(summary)]);
  }

  /** The rooms of a task (InventarIA ids), [] when none (several when its items are in several rooms). */
  roomsFor(entityId, summary) {
    const map = this.rooms[entityId];
    return linkIds(map && map[taskKey(summary)]);
  }

  /** The room of a task (an InventarIA room id; the first one when several), or null. */
  roomFor(entityId, summary) {
    return this.roomsFor(entityId, summary)[0] || null;
  }

  /** Sets the room(s) of a task (an id or a list; null or [] removes); `previous` is the old name after a rename. */
  setRoom(entityId, summary, room, previous = null) {
    return this._setLink("rooms", entityId, summary, room, previous);
  }

  /** rooms / equips: {todo.x: {task key: id}}, by the name of the task (like the points). */
  _setLink(field, entityId, summary, value, previous = null) {
    if (typeof entityId !== "string" || !/^todo\.[a-z0-9_]+$/.test(entityId)) throw new Error("Not a to-do entity");
    const key = taskKey(summary);
    if (!key) throw new Error("Task name required");
    const bad = field === "rooms" ? "Cômodo inválido" : "Equipamento inválido";
    if (Array.isArray(value)) {
      if (value.some((x) => !LINK_ID.test(String(x)))) throw new Error(bad);
      const ids = linkIds(value);
      value = ids.length ? linkValue(ids) : null;
    } else if (value != null && value !== "" && !LINK_ID.test(String(value))) throw new Error(bad);
    const cur = this.data[field] || {};
    const map = { ...(cur[entityId] || {}) };
    if (previous != null && taskKey(previous) !== key) delete map[taskKey(previous)];
    if (Array.isArray(value) ? value.length : value) map[key] = Array.isArray(value) ? value : String(value);
    else delete map[key];
    const all = { ...cur };
    if (Object.keys(map).length) all[entityId] = map;
    else delete all[entityId];
    this.data[field] = all;
    this.save();
    return all;
  }

  /** Points a task is worth (0: none). */
  pointsFor(entityId, summary) {
    const map = this.data.points[entityId];
    return (map && map[taskKey(summary)]) || 0;
  }

  /** Sets the points of a task (0 removes); `previous` is the old name after a rename. */
  setPoints(entityId, summary, points, previous = null) {
    if (typeof entityId !== "string" || !/^todo\.[a-z0-9_]+$/.test(entityId)) throw new Error("Not a to-do entity");
    const key = taskKey(summary);
    if (!key) throw new Error("Task name required");
    const n = Math.round(Number(points) || 0);
    if (n < 0 || n > 1000) throw new Error("Pontos entre 0 e 1000");
    const map = { ...(this.data.points[entityId] || {}) };
    if (previous != null && taskKey(previous) !== key) delete map[taskKey(previous)];
    if (n) map[key] = n;
    else delete map[key];
    const all = { ...this.data.points };
    if (Object.keys(map).length) all[entityId] = map;
    else delete all[entityId];
    this.data.points = all;
    this.save();
    return all;
  }

  save() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 400);
  }

  flush({ version = true } = {}) {
    clearTimeout(this.timer);
    this.timer = null;
    if (version) this.version("auto");
    const tmp = `${this.file}.tmp`;
    try {
      fs.writeFileSync(tmp, JSON.stringify(this.data, null, 1));
      fs.renameSync(tmp, this.file);
    } catch (err) {
      this.log.error(`Could not save ${this.file}: ${err.message}`);
    }
  }

  static clean(raw, fields) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("prefs must be an object");
    const out = {};
    for (const [key, value] of Object.entries(raw)) {
      const spec = fields[key];
      if (!spec) continue;
      if (value === null) {
        out[key] = null;
        continue;
      }
      const [type, limit] = spec;
      if (type === "boolean") out[key] = Boolean(value);
      else if (type === "string") {
        if (typeof value !== "string") throw new Error(`${key} must be text`);
        out[key] = value.trim().slice(0, limit);
      } else if (type === "list") {
        if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) throw new Error(`${key} must be a list of text`);
        out[key] = value.slice(0, limit).map((v) => v.slice(0, 255));
      }
    }
    return out;
  }

  static merge(target, changes) {
    const merged = { ...target };
    for (const [k, v] of Object.entries(changes)) {
      if (v === null || v === "") delete merged[k];
      else merged[k] = v;
    }
    return merged;
  }

  setListPrefs(entityId, changes) {
    if (typeof entityId !== "string" || !entityId.startsWith("todo.") || entityId.length > 255) {
      throw new Error("Not a to-do entity");
    }
    const clean = Store.clean(changes, LIST_FIELDS);
    const lists = { ...this.data.prefs.lists };
    const merged = Store.merge(lists[entityId] || {}, clean);
    if (Object.keys(merged).length) {
      if (!lists[entityId] && Object.keys(lists).length >= 500) throw new Error("Too many lists");
      lists[entityId] = merged;
    } else delete lists[entityId];
    this.data.prefs.lists = lists;
    this.save();
    return this.data.prefs;
  }

  /** The day a daily alert last went out ("YYYY-MM-DD" or null). */
  alertSent(key) {
    return (this.data.alerts && this.data.alerts[key]) || null;
  }

  markAlert(key, day) {
    this.data.alerts = { ...(this.data.alerts || {}), [key]: day };
    this.save();
  }

  setAppPrefs(changes) {
    const clean = Store.clean(changes, APP_FIELDS);
    if ("ai_entity" in clean && clean.ai_entity !== null && !/^ai_task\.[a-z0-9_]+$/.test(clean.ai_entity)) clean.ai_entity = null;
    if ("voice_engine" in clean && clean.voice_engine !== null && !/^[a-z0-9_.]+$/.test(clean.voice_engine)) clean.voice_engine = null;
    checkAlert(clean);
    this.data.prefs.app = Store.merge(this.data.prefs.app, clean);
    this.save();
    return this.data.prefs;
  }
}
