// Sensores no Home Assistant (2.64.0), for dashboards and automations, with Mais › Configurações › Integrações ›
// Sensores on (the same switch of sensor.resolvia_ia_hoje):
// - sensor.resolvia_atrasados: how many tasks are late, the tasks in the attributes (the Alexa says it when you get home);
// - sensor.resolvia_vence_hoje: how many are due today, with the time of each;
// - binary_sensor.resolvia_compras: on while a shopping list has something to buy, the items in the attributes (at the
//   zone of the market, the list on the phone).
// The same lists as the screens: the hidden ones and the ones whose dates are only information stay out; with
// Controlar prazos off, nothing is late or due. Published when the items change (once a second at most) and every 15
// minutes (the day turns); nothing is sent when nothing changed.
import { dueParts, ymd, fold } from "./duealert.js";
import { datesInfo } from "./store.js";

const MAX = 30;
export const SENSOR_IDS = ["sensor.resolvia_atrasados", "sensor.resolvia_vence_hoje", "binary_sensor.resolvia_compras"];
const SHOP_RE = /shopping|compra|mercado|supermerc|feira/;

/** A shopping list: the icon chosen in Personalizar, or the name (the same rule of the screen). */
export function isShopping(id, l) {
  const icon = l && l.prefs && l.prefs.icon;
  return icon ? icon === "shopping-cart" : SHOP_RE.test(fold(`${(l && l.name) || ""} ${id}`));
}

/**
 * What the sensors say. lists: Map entity_id -> {name, features, prefs}; items: Map entity_id -> items (with the
 * deadlines of the app); dueOn: Controlar prazos.
 */
export function sensorStates(lists, items, { now = new Date(), dueOn = true } = {}) {
  const today = ymd(now);
  const late = [];
  const due = [];
  const shop = [];
  const shopLists = new Set();
  for (const [id, l] of lists) {
    if (!l || (l.prefs && l.prefs.hidden)) continue;
    const pending = (items.get(id) || []).filter((i) => i && i.status !== "completed" && i.summary);
    if (isShopping(id, l)) {
      for (const i of pending) {
        shop.push({ item: String(i.summary).trim(), lista: l.name });
        shopLists.add(l.name);
      }
    }
    if (!dueOn || datesInfo(l.prefs, l.features)) continue;
    for (const i of pending) {
      const p = dueParts(i.due);
      if (!p) continue;
      const t = { tarefa: String(i.summary).trim(), lista: l.name };
      if (p.day < today) late.push({ ...t, prazo: p.day });
      else if (p.day === today) due.push({ ...t, horario: p.time || null });
    }
  }
  late.sort((a, b) => a.prazo.localeCompare(b.prazo) || a.tarefa.localeCompare(b.tarefa, "pt-BR"));
  due.sort((a, b) => (a.horario || "99").localeCompare(b.horario || "99") || a.tarefa.localeCompare(b.tarefa, "pt-BR"));
  return {
    "sensor.resolvia_atrasados": {
      state: late.length,
      attributes: { friendly_name: "ResolvIA: atrasados", icon: "mdi:alert-circle-outline", unit_of_measurement: "tarefas", tarefas: late.slice(0, MAX) },
    },
    "sensor.resolvia_vence_hoje": {
      state: due.length,
      attributes: { friendly_name: "ResolvIA: vence hoje", icon: "mdi:calendar-today", unit_of_measurement: "tarefas", tarefas: due.slice(0, MAX) },
    },
    "binary_sensor.resolvia_compras": {
      state: shop.length ? "on" : "off",
      attributes: { friendly_name: "ResolvIA: compras", icon: shop.length ? "mdi:cart" : "mdi:cart-outline", quantidade: shop.length, listas: [...shopLists], itens: shop.slice(0, MAX) },
    },
  };
}

export class TaskSensors {
  /** {rest, token, log, enabled: () => bool, lists: () => Map, items: Map, dueOn: () => bool} */
  constructor({ rest, token, log, enabled, lists, items, dueOn }) {
    Object.assign(this, { rest, token, log, enabled, lists, items, dueOn });
    this.last = {};
    this.timer = null;
    this.warned = false;
  }

  /** After a change of the items: once a second at most. */
  schedule() {
    if (this.timer || !this.enabled()) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.publish().catch(() => {});
    }, 1000);
  }

  async publish(now = new Date()) {
    if (!this.rest || !this.token || !this.enabled()) return;
    const states = sensorStates(this.lists(), this.items, { now, dueOn: this.dueOn() });
    for (const [id, body] of Object.entries(states)) {
      const sig = JSON.stringify(body);
      if (this.last[id] === sig) continue;
      try {
        const res = await fetch(`${this.rest}/states/${id}`, {
          method: "POST",
          headers: { authorization: `Bearer ${this.token}`, "content-type": "application/json" },
          body: sig,
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.last[id] = sig;
        this.warned = false;
      } catch (err) {
        if (!this.warned) this.log.warn(`Sensor ${id}: ${err.message}`);
        this.warned = true;
      }
    }
  }

  /** Sensores off: they go away from Home Assistant. */
  async remove() {
    this.last = {};
    if (!this.rest || !this.token) return;
    for (const id of SENSOR_IDS) {
      try {
        await fetch(`${this.rest}/states/${id}`, { method: "DELETE", headers: { authorization: `Bearer ${this.token}` }, signal: AbortSignal.timeout(10000) });
      } catch (err) {
        /* offline: it goes with the next restart of Home Assistant */
      }
    }
  }
}
