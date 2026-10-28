// Persistent state in /data/resolvia.json: list customization + recurring rules.
// A copy of the file goes to /data/versoes at most every 10 minutes of use
// (Mais > Dados > Versões anteriores), and before every import or restore.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const VERSION_EVERY = 10 * 60 * 1000;
const MAX_VERSIONS = 3; // Versões anteriores: only the 3 newest copies are kept
const pad = (n) => String(n).padStart(2, "0");
const stamp = (d = new Date()) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
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
  group_by_device: ["boolean"],
  show_done: ["boolean"],
  list_order: ["list", 200],
  // "" / null = the AI Home Assistant prefers (Mais > Leitura por IA).
  ai_entity: ["string", 80],
  // Mais > Integrações > Recompensas: tasks can be worth points in the CronologIA scoreboard.
  points_on: ["boolean"],
  // Mais > Repetições: "Repetir depois de concluir" on (true) or off (false); unset = on when there are rules
  repeat_on: ["boolean"],
  // Mais > Integrações > Usar IA: true = off (no import from messages and photos)
  ai_off: ["boolean"],
  // Mais > Opções > Controlar prazos: true = off (no Prazos tab, no deadline field; Sugestões instead)
  due_off: ["boolean"],
  // Mais > Integrações > Sensores no Home Assistant: true = on (off unless turned on)
  sensors_on: ["boolean"],
};

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

/** The file contents, checked. Strict (imports) also validates every preference. */
export function normalize(raw, strict = false) {
  const data = { version: 1, prefs: { lists: {}, app: {} }, rules: {}, points: {} };
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
      const all = fs.readdirSync(this.versionsDir).filter((f) => /^resolvia-.*\.json$/.test(f)).sort();
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
      const name = `resolvia-${stamp()}-${reason}.json`;
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

  setAppPrefs(changes) {
    const clean = Store.clean(changes, APP_FIELDS);
    if ("ai_entity" in clean && clean.ai_entity !== null && !/^ai_task\.[a-z0-9_]+$/.test(clean.ai_entity)) clean.ai_entity = null;
    this.data.prefs.app = Store.merge(this.data.prefs.app, clean);
    this.save();
    return this.data.prefs;
  }
}
