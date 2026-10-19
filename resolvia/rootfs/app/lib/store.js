// Persistent state in /data/resolvia.json: list customization + recurring rules.
import fs from "node:fs";
import path from "node:path";

const LIST_FIELDS = { name: ["string", 80], color: ["string", 24], icon: ["string", 40], hidden: ["boolean"] };
const APP_FIELDS = {
  accent: ["string", 24],
  group_by_device: ["boolean"],
  show_done: ["boolean"],
  list_order: ["list", 200],
  // "" / null = the AI Home Assistant prefers (Mais > Leitura por IA).
  ai_entity: ["string", 80],
};

export class Store {
  constructor(dir, log) {
    this.file = path.join(dir, "resolvia.json");
    this.log = log;
    this.data = { version: 1, prefs: { lists: {}, app: {} }, rules: {} };
    this.timer = null;
    fs.mkdirSync(dir, { recursive: true });
    try {
      const raw = JSON.parse(fs.readFileSync(this.file, "utf8"));
      if (raw && typeof raw === "object") {
        if (raw.prefs && typeof raw.prefs === "object") {
          this.data.prefs.lists = raw.prefs.lists && typeof raw.prefs.lists === "object" ? raw.prefs.lists : {};
          this.data.prefs.app = raw.prefs.app && typeof raw.prefs.app === "object" ? raw.prefs.app : {};
        }
        if (raw.rules && typeof raw.rules === "object") this.data.rules = raw.rules;
      }
    } catch (err) {
      if (err.code !== "ENOENT") this.log.warn(`Could not read ${this.file}: ${err.message}`);
    }
  }

  get prefs() {
    return this.data.prefs;
  }

  get rules() {
    return this.data.rules;
  }

  save() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 400);
  }

  flush() {
    clearTimeout(this.timer);
    this.timer = null;
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
