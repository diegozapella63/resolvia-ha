// Sensores no Home Assistant (2.64.0): atrasados, vence hoje e compras (lib/sensors.js).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sensorStates, isShopping, TaskSensors, SENSOR_IDS } from "../resolvia/rootfs/app/lib/sensors.js";

const NOW = new Date(2026, 10, 6, 8, 30); // Fri 6/11/2026 08:30, local
const F_DUE = 16;
const L = (name, extra = {}) => ({ name, features: F_DUE | 1, prefs: {}, ...extra });
const item = (summary, due, status = "needs_action") => ({ uid: summary, summary, due, status });

const LISTS = new Map([
  ["todo.casa", L("Casa")],
  ["todo.mercado", L("Mercado")],
  ["todo.shopping_list", L("Shopping list")],
  ["todo.escondida", L("Escondida", { prefs: { hidden: true } })],
  ["todo.info", L("Problemas", { features: 0 })],
  ["todo.feira_fina", L("Coisas", { prefs: { icon: "shopping-cart" } })],
  ["todo.compras_velhas", L("Compras velhas", { prefs: { icon: "house" } })],
]);
const ITEMS = new Map([
  ["todo.casa", [item("Pagar a luz", "2026-11-04"), item("Trocar o filtro", "2026-11-06T15:00:00"), item("Varrer", "2026-11-06"), item("Feito", "2026-11-01", "completed"), item("Sem prazo")]],
  ["todo.mercado", [item("Leite"), item("Pão", "2026-11-05"), item("Ovos", null, "completed")]],
  ["todo.shopping_list", [item("Pilhas")]],
  ["todo.escondida", [item("Escondido", "2026-11-01")]],
  ["todo.info", [item("Aparelho fora do ar", "2026-10-01")]],
  ["todo.feira_fina", [item("Alface")]],
  ["todo.compras_velhas", [item("Algo")]],
]);

describe("sensors: what they say", () => {
  it("a shopping list: the icon chosen, or the name", () => {
    assert.equal(isShopping("todo.mercado", L("Mercado")), true);
    assert.equal(isShopping("todo.x", L("Coisas", { prefs: { icon: "shopping-cart" } })), true);
    assert.equal(isShopping("todo.compras", L("Compras", { prefs: { icon: "house" } })), false, "the icon chosen wins");
    assert.equal(isShopping("todo.casa", L("Casa")), false);
  });
  it("atrasados and vence hoje: the visible lists with deadlines; the dates that are information stay out", () => {
    const s = sensorStates(LISTS, ITEMS, { now: NOW });
    const late = s["sensor.resolvia_atrasados"];
    assert.equal(late.state, 2);
    assert.deepEqual(late.attributes.tarefas, [{ tarefa: "Pagar a luz", lista: "Casa", prazo: "2026-11-04" }, { tarefa: "Pão", lista: "Mercado", prazo: "2026-11-05" }]);
    assert.equal(late.attributes.unit_of_measurement, "tarefas");
    const today = s["sensor.resolvia_vence_hoje"];
    assert.equal(today.state, 2);
    assert.deepEqual(today.attributes.tarefas, [{ tarefa: "Trocar o filtro", lista: "Casa", horario: "15:00" }, { tarefa: "Varrer", lista: "Casa", horario: null }]);
  });
  it("compras: on with something to buy in a shopping list, the items in the attributes", () => {
    const c = sensorStates(LISTS, ITEMS, { now: NOW })["binary_sensor.resolvia_compras"];
    assert.equal(c.state, "on");
    assert.deepEqual(c.attributes.listas, ["Mercado", "Shopping list", "Coisas"]);
    assert.deepEqual(c.attributes.itens.map((i) => i.item), ["Leite", "Pão", "Pilhas", "Alface"]);
    assert.equal(c.attributes.quantidade, 4);
    const none = sensorStates(new Map([["todo.mercado", L("Mercado")]]), new Map([["todo.mercado", [item("Ovos", null, "completed")]]]), { now: NOW })["binary_sensor.resolvia_compras"];
    assert.deepEqual([none.state, none.attributes.icon], ["off", "mdi:cart-outline"]);
  });
  it("Controlar prazos off: nothing late or due (the shopping stays)", () => {
    const s = sensorStates(LISTS, ITEMS, { now: NOW, dueOn: false });
    assert.deepEqual([s["sensor.resolvia_atrasados"].state, s["sensor.resolvia_vence_hoje"].state, s["binary_sensor.resolvia_compras"].state], [0, 0, "on"]);
  });
});

describe("sensors: publishing", () => {
  const fakeFetch = (calls, ok = true) => async (url, opts) => {
    calls.push([opts.method, url.split("/states/")[1], opts.body ? JSON.parse(opts.body).state : null]);
    if (!ok) throw new Error("offline");
    return { ok: true, status: 200 };
  };
  const make = (over = {}) => {
    const warns = [];
    const s = new TaskSensors({ rest: "http://ha/api", token: "t", log: { warn: (m) => warns.push(m) }, enabled: () => true, lists: () => LISTS, items: ITEMS, dueOn: () => true, ...over });
    return { s, warns };
  };
  it("sends the three, then only what changed; off: nothing; remove: the three go", async () => {
    const calls = [];
    const orig = globalThis.fetch;
    globalThis.fetch = fakeFetch(calls);
    try {
      const { s } = make();
      await s.publish(NOW);
      assert.deepEqual(calls.map((c) => c.slice(0, 2)), SENSOR_IDS.map((id) => ["POST", id]));
      await s.publish(NOW);
      assert.equal(calls.length, 3, "nothing changed: nothing sent");
      ITEMS.get("todo.casa").push(item("Nova", "2026-11-06"));
      await s.publish(NOW);
      assert.deepEqual(calls.slice(3).map((c) => [c[1], c[2]]), [["sensor.resolvia_vence_hoje", 3]]);
      ITEMS.get("todo.casa").pop();
      await s.remove();
      assert.deepEqual(calls.slice(-3).map((c) => c.slice(0, 2)), SENSOR_IDS.map((id) => ["DELETE", id]));
      const off = make({ enabled: () => false }).s;
      const n = calls.length;
      await off.publish(NOW);
      off.schedule();
      assert.equal(calls.length, n, "Sensores off: nothing");
    } finally {
      globalThis.fetch = orig;
    }
  });
  it("offline: one warning, and it tries again next time", async () => {
    const calls = [];
    const orig = globalThis.fetch;
    globalThis.fetch = fakeFetch(calls, false);
    try {
      const { s, warns } = make();
      await s.publish(NOW);
      await s.publish(NOW);
      assert.equal(warns.length, 1);
      assert.equal(calls.length, 6, "nothing was kept as sent");
    } finally {
      globalThis.fetch = orig;
    }
  });
  it("schedule: one publish a second after a change", async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const { s } = make();
    let n = 0;
    s.publish = async () => n++;
    s.schedule();
    s.schedule();
    t.mock.timers.tick(1000);
    assert.equal(n, 1);
  });
});
