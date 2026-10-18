// "Repeat N days after completion".
// Watches every to-do list; when an item with a rule gets completed, it is
// scheduled to come back (status needs_action) at the start of the day N days
// later. If the completed item was deleted meanwhile, it is created again.
import crypto from "node:crypto";
import { EventEmitter } from "node:events";

const F = { CREATE: 1, DELETE: 2, UPDATE: 4, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const has = (features, flag) => ((features || 0) & flag) === flag;
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const RETRY_MS = 5 * 60 * 1000;

export class Recurring extends EventEmitter {
  constructor({ ha, store, log, states, dayMs = 0, now = () => Date.now() }) {
    super();
    this.ha = ha;
    this.store = store;
    this.log = log;
    this.states = states; // Map entity_id -> state object
    this.dayMs = dayMs; // test hook: a "day" of this many ms, no rounding
    this.now = now;
    this.items = new Map(); // entity_id -> items
    this.busy = new Set();
  }

  get rules() {
    return this.store.rules;
  }

  rulesFor(entityId) {
    return Object.values(this.rules).filter((r) => r.entity_id === entityId);
  }

  publicRules() {
    return Object.values(this.rules).map(({ retry_at, ...r }) => r);
  }

  reopenTime(fromMs, days) {
    if (this.dayMs) return fromMs + days * this.dayMs;
    const d = new Date(fromMs);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, 0, 0, 0, 0).getTime();
  }

  _unavailable(entityId) {
    const st = this.states.get(entityId);
    return !st || st.state === "unavailable" || st.state === "unknown";
  }

  _changed() {
    this.store.save();
    this.emit("change");
  }

  /** Called with the full item list every time a to-do list changes. */
  process(entityId, items) {
    this.items.set(entityId, items);
    let changed = false;
    const rules = this.rulesFor(entityId);
    const used = new Set(rules.filter((r) => r.uid).map((r) => r.uid));
    for (const rule of rules) {
      let item = rule.uid ? items.find((i) => i.uid === rule.uid) : null;
      if (!item && rule.match) {
        item = items.find((i) => i.status === "needs_action" && i.summary === rule.match && !used.has(i.uid));
        if (item) {
          rule.uid = item.uid;
          rule.match = null;
          used.add(item.uid);
          changed = true;
        }
      }
      if (!item) {
        if (rule.match || rule.completed_at || this._unavailable(entityId)) continue;
        // Deleted while still pending: the user doesn't want it anymore.
        delete this.rules[rule.id];
        this.log.info(`Repetição removida (item apagado): "${rule.summary}"`);
        changed = true;
        continue;
      }
      if (item.summary !== rule.summary || (item.description || null) !== (rule.description || null)) {
        rule.summary = item.summary;
        rule.description = item.description || null;
        changed = true;
      }
      if (item.status === "completed" && !rule.completed_at) {
        const now = this.now();
        rule.completed_at = now;
        rule.reopen_at = this.reopenTime(now, rule.days);
        rule.due_time = item.due && item.due.length > 10 ? item.due : rule.due_time || null;
        this.log.info(`"${rule.summary}" concluído, volta em ${new Date(rule.reopen_at).toLocaleString("pt-BR")}`);
        changed = true;
      } else if (item.status === "needs_action" && rule.completed_at) {
        rule.completed_at = null;
        rule.reopen_at = null;
        delete rule.retry_at;
        changed = true;
      }
    }
    if (changed) this._changed();
    this.tick();
  }

  /** Create, change or remove a rule. Without uid the rule binds to the next pending item with that summary. */
  setRule({ entity_id, uid, summary, days }) {
    if (typeof entity_id !== "string" || !entity_id.startsWith("todo.")) throw new Error("Not a to-do entity");
    const n = days == null ? 0 : Number(days);
    if (!Number.isInteger(n) || n < 0 || n > 365) throw new Error("days must be between 1 and 365");
    if (!uid && (typeof summary !== "string" || !summary.trim())) throw new Error("uid or summary required");
    const existing = Object.values(this.rules).find(
      (r) => r.entity_id === entity_id && (uid ? r.uid === uid : r.match === summary),
    );
    if (!n) {
      if (existing) {
        delete this.rules[existing.id];
        this._changed();
      }
      return null;
    }
    if (existing) {
      existing.days = n;
      if (existing.completed_at) existing.reopen_at = this.reopenTime(existing.completed_at, n);
      this._changed();
      this.tick();
      return existing;
    }
    const rule = {
      id: crypto.randomBytes(6).toString("hex"),
      entity_id,
      uid: uid || null,
      match: uid ? null : summary,
      summary: summary || "",
      description: null,
      days: n,
      completed_at: null,
      reopen_at: null,
      created_at: this.now(),
    };
    this.rules[rule.id] = rule;
    this._changed();
    const items = this.items.get(entity_id);
    if (items) this.process(entity_id, items);
    return rule;
  }

  start() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), this.dayMs ? 500 : 30000);
  }

  stop() {
    clearInterval(this.timer);
  }

  tick() {
    const now = this.now();
    for (const rule of Object.values(this.rules)) {
      if (!rule.reopen_at || rule.reopen_at > now) continue;
      if (rule.retry_at && rule.retry_at > now) continue;
      if (this.busy.has(rule.id)) continue;
      this.busy.add(rule.id);
      this._reopen(rule).finally(() => this.busy.delete(rule.id));
    }
  }

  _dueFields(features, item, rule) {
    const today = ymd(new Date(this.now()));
    const timed = (item && item.due && item.due.length > 10 && item.due) || rule.due_time;
    if (timed && has(features, F.DUE_DATETIME)) {
      const t = new Date(timed);
      return { due_datetime: `${today} ${pad(t.getHours())}:${pad(t.getMinutes())}:00` };
    }
    if (has(features, F.DUE_DATE)) return { due_date: today };
    return {};
  }

  async _reopen(rule) {
    const st = this.states.get(rule.entity_id);
    if (!this.ha.ready || !st || this._unavailable(rule.entity_id)) {
      rule.retry_at = this.now() + RETRY_MS;
      return;
    }
    const features = st.attributes.supported_features || 0;
    const items = this.items.get(rule.entity_id) || [];
    const item = rule.uid ? items.find((i) => i.uid === rule.uid) : null;
    const call = (service, data) =>
      this.ha.send({ type: "call_service", domain: "todo", service, service_data: data, target: { entity_id: rule.entity_id } });
    try {
      if (item && item.status === "needs_action") {
        // Already back (someone unchecked it).
      } else if (item && has(features, F.UPDATE)) {
        await call("update_item", { item: rule.uid, status: "needs_action", ...this._dueFields(features, item, rule) });
      } else if (has(features, F.CREATE)) {
        const data = { item: rule.summary, ...this._dueFields(features, item, rule) };
        if (rule.description && has(features, F.DESCRIPTION)) data.description = rule.description;
        if (item && has(features, F.DELETE)) await call("remove_item", { item: [rule.uid] });
        await call("add_item", data);
        rule.uid = null;
        rule.match = rule.summary;
      } else {
        this.log.warn(`A lista ${rule.entity_id} não permite reabrir "${rule.summary}"`);
      }
      rule.completed_at = null;
      rule.reopen_at = null;
      delete rule.retry_at;
      this.log.info(`De volta: "${rule.summary}" (${rule.entity_id})`);
      this._changed();
    } catch (err) {
      rule.retry_at = this.now() + RETRY_MS;
      this.log.warn(`Não consegui reabrir "${rule.summary}": ${err.message}. Tento de novo em 5 min.`);
      this.store.save();
    }
  }
}
