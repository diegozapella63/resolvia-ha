// Mais › Configurações › Opções › Prazos › Avisar o que vence hoje: once a day, at the chosen time, the
// phones chosen get what is due today (the lists shown, with deadlines on). Nothing due today: no alert.
// A list with an owner (Personalizar › De quem é) only goes to that person's phone; a phone of nobody
// (a tablet) gets only the lists of everyone.
// Tapping it opens the app on Prazos (?aba=prazos on the page around the app).
import os from "node:os";
import { datesInfo } from "./store.js";

const pad = (n) => String(n).padStart(2, "0");
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
export const PHONE_RE = /^mobile_app_[a-z0-9_]+$/;
export const DEFAULT_TIME = "08:00";
const WINDOW_MS = 2 * 3600 * 1000; // sent up to 2 h after the time (the app was off at the time)
const MAX_LINES = 5;
const coded = (code, message) => Object.assign(new Error(message), { code });
export const fold = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** The list goes to this person? (no owner: everyone's; whom undefined: anyone's, without looking.) */
export const listFor = (prefs, whom) => whom === undefined || !(prefs && prefs.owner) || (!!whom && fold(prefs.owner) === fold(whom));

/** Address of this app in Home Assistant, for the alert's "open": /app/<slug> since HA 2026.2 (the old
 * /hassio/ingress/<slug> now opens the default dashboard). Hostname a1b2c3d4-resolvia -> /app/a1b2c3d4_resolvia. */
export function ingressUrl(host = os.hostname()) {
  return /^[a-z0-9]+-resolvia$/.test(host) ? `/app/${host.replace("-", "_")}` : null;
}

/** The local day and time of a due date of Home Assistant ("2026-11-06" or "2026-11-06T15:00:00-03:00"). */
export function dueParts(due) {
  if (typeof due !== "string" || !due) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return { day: due, time: null };
  const d = new Date(due);
  if (!Number.isFinite(d.getTime())) return null;
  return { day: ymd(d), time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

/**
 * What is due today and how many are late, from the items of each list.
 * lists: Map entity_id -> {name, features, prefs}; items: Map entity_id -> items of Home Assistant.
 * Hidden lists and lists whose dates are only information are left out; with whom (the person of a phone,
 * or null for a phone of nobody), the lists of other people too.
 */
export function dueToday(lists, items, now = new Date(), whom = undefined) {
  const today = ymd(now);
  const out = [];
  let late = 0;
  for (const [id, l] of lists) {
    if (!l || (l.prefs && l.prefs.hidden) || datesInfo(l.prefs, l.features) || !listFor(l.prefs, whom)) continue;
    for (const i of items.get(id) || []) {
      if (!i || i.status === "completed" || !i.summary) continue;
      const p = dueParts(i.due);
      if (!p) continue;
      if (p.day === today) out.push({ list: id, listName: l.name, summary: String(i.summary).trim(), time: p.time });
      else if (p.day < today) late++;
    }
  }
  // the timed ones first, by the time; then the rest, by the name
  out.sort((a, b) => (a.time || "99").localeCompare(b.time || "99") || a.summary.localeCompare(b.summary, "pt-BR"));
  return { today: out, late };
}

/** The text: "Vence hoje" and one line per task (up to 5, then "e mais N"); the late ones at the end. */
export function dueText({ today, late }) {
  const lines = today.slice(0, MAX_LINES).map((t) => `• ${t.summary}${t.time ? ` às ${t.time}` : ""}`);
  if (today.length > MAX_LINES) lines.push(`e mais ${today.length - MAX_LINES}`);
  if (late) lines.push(late === 1 ? "E 1 atrasado." : `E ${late} atrasados.`);
  const n = today.length;
  return { title: n === 1 ? "📅 Vence hoje" : `📅 Vencem hoje: ${n}`, message: lines.join("\n") };
}

/** The settings as kept in the preferences, checked: on, the time and the phones. */
export function alertSettings(app = {}) {
  return {
    on: app.due_alert === true && app.due_off !== true,
    time: TIME_RE.test(app.due_alert_time || "") ? app.due_alert_time : DEFAULT_TIME,
    to: Array.isArray(app.due_alert_to) ? app.due_alert_to.filter((t) => PHONE_RE.test(t)) : [],
  };
}

export class DueAlert {
  /** lists(): Map entity_id -> {name, features, prefs}; items: Map entity_id -> items. */
  constructor({ ha, store, lists, items, log }) {
    this.ha = ha;
    this.store = store;
    this.lists = lists;
    this.items = items;
    this.log = log;
  }

  /** The phones with the app Home Assistant (notify.mobile_app_*), with the person whose phone it is. */
  async phones() {
    const [states, services] = await Promise.all([this.ha.send({ type: "get_states" }), this.ha.send({ type: "get_services" })]);
    const ids = Object.keys((services && services.notify) || {}).filter((s) => PHONE_RE.test(s));
    const owners = new Map();
    for (const st of states || []) {
      if (!/^person\./.test(st.entity_id || "")) continue;
      const a = st.attributes || {};
      for (const t of Array.isArray(a.device_trackers) ? a.device_trackers : []) owners.set(`mobile_app_${String(t).replace(/^device_tracker\./, "")}`, a.friendly_name || st.entity_id.slice(7));
    }
    const nice = (id) => id.replace(/^mobile_app_/, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return ids.sort().map((id) => ({ id, name: nice(id), owner: owners.get(id) || null }));
  }

  noteData(tag) {
    const base = ingressUrl();
    const url = base ? `${base}?aba=prazos` : null;
    return { tag, group: "resolvia-prazos", channel: "Prazos", ...(url ? { url, clickAction: url } : {}) };
  }

  async send(targets, { title, message }, tag) {
    let sent = 0;
    for (const target of targets) {
      await this.ha
        .send({ type: "call_service", domain: "notify", service: target, service_data: { title, message, data: this.noteData(tag) } })
        .then(() => {
          sent++;
          this.log.info(`Aviso de prazos para ${target}`);
        })
        .catch((err) => this.log.warn(`Aviso de prazos para ${target}: ${err.message}`));
    }
    return sent;
  }

  /** Each phone with what is due today for its person: [{target, due}]. */
  async perPhone(targets, now) {
    let owners = new Map();
    try {
      owners = new Map((await this.phones()).map((p) => [p.id, p.owner]));
    } catch (err) {
      this.log.warn(`Aviso de prazos: não consegui ver de quem é cada celular (${err.message})`);
    }
    const lists = this.lists();
    return targets.map((target) => ({ target, due: dueToday(lists, this.items, now, owners.get(target) || null) }));
  }

  /** Every minute: at the time (up to 2 h after), once a day, to each phone what is due today for its person. */
  async tick(now = new Date()) {
    const s = alertSettings(this.store.prefs.app);
    if (!s.on || !s.to.length || !this.ha.ready) return false;
    const [h, m] = s.time.split(":").map(Number);
    const at = new Date(now);
    at.setHours(h, m, 0, 0);
    if (now < at || now - at > WINDOW_MS) return false;
    const day = ymd(now);
    if (this.store.alertSent("prazos") === day) return false;
    // just started: the items of the lists aren't here yet (tried again in a minute)
    if (!this.items.size) return false;
    this.store.markAlert("prazos", day);
    let sent = false;
    for (const { target, due } of await this.perPhone(s.to, now)) {
      if (!due.today.length) continue;
      await this.send([target], dueText(due), "resolvia-prazos");
      sent = true;
    }
    return sent;
  }

  /** Testar: the alert of today now, to the chosen phones (or "nothing due today"). */
  async test(targets, now = new Date()) {
    const to = (Array.isArray(targets) ? targets : []).filter((t) => PHONE_RE.test(t));
    if (!to.length) throw coded("invalid_format", "Escolha um celular");
    let sent = 0;
    let today = 0;
    for (const { target, due } of await this.perPhone(to, now)) {
      const text = due.today.length ? dueText(due) : { title: "📅 Prazos", message: "Nada vence hoje. Quando vencer, o aviso vem assim." };
      sent += await this.send([target], text, "resolvia-prazos-teste");
      today = Math.max(today, due.today.length);
    }
    if (!sent) throw coded("send_failed", "O Home Assistant não entregou o aviso");
    return { sent, today };
  }
}
