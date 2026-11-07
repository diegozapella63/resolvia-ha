// Opções › Prazos › Avisar o que vence hoje (2.41.0): what is due today, the text, the settings, the daily tick.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dueParts, dueToday, dueText, alertSettings, ingressUrl, DueAlert, ymd } from "../resolvia/rootfs/app/lib/duealert.js";
import { Store, normalize } from "../resolvia/rootfs/app/lib/store.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const NOW = new Date(2026, 10, 6, 8, 30); // Fri 6/11/2026 08:30, local
const F_DUE = 16;
const L = (name, extra = {}) => ({ name, features: F_DUE | 1, prefs: {}, ...extra });
const item = (summary, due, status = "needs_action") => ({ uid: summary, summary, due, status });

describe("dueParts", () => {
  it("a day, or a local day and time from a date-time", () => {
    assert.deepEqual(dueParts("2026-11-06"), { day: "2026-11-06", time: null });
    const d = new Date(2026, 10, 6, 15, 5);
    assert.deepEqual(dueParts(d.toISOString()), { day: "2026-11-06", time: "15:05" });
    assert.equal(dueParts(""), null);
    assert.equal(dueParts("amanhã"), null);
    assert.equal(dueParts(undefined), null);
  });
});

describe("dueToday", () => {
  const lists = new Map([
    ["todo.casa", L("Casa")],
    ["todo.escondida", L("Escondida", { prefs: { hidden: true } })],
    ["todo.info", L("Problemas", { features: 0 })],
    ["todo.desligada", L("Desligada", { prefs: { dates_info: true } })],
  ]);
  const items = new Map([
    ["todo.casa", [item("Trocar filtro", "2026-11-06"), item("Pagar luz", new Date(2026, 10, 6, 15, 0).toISOString()), item("Feita", "2026-11-06", "completed"), item("Atrasada", "2026-11-04"), item("Amanhã", "2026-11-07"), item("Sem prazo")]],
    ["todo.escondida", [item("Oculta", "2026-11-06")]],
    ["todo.info", [item("Indisponível desde", "2026-11-06")]],
    ["todo.desligada", [item("Data informativa", "2026-11-06")]],
  ]);
  it("only the pending ones of today, of the lists shown with deadlines on; the timed first; the late ones counted", () => {
    const d = dueToday(lists, items, NOW);
    assert.deepEqual(d.today.map((t) => [t.summary, t.time, t.listName]), [["Pagar luz", "15:00", "Casa"], ["Trocar filtro", null, "Casa"]]);
    assert.equal(d.late, 1);
  });
  it("nothing: empty", () => {
    assert.deepEqual(dueToday(new Map(), new Map(), NOW), { today: [], late: 0 });
  });
});

describe("dueText", () => {
  it("one: Vence hoje; several: how many, a line each, the time; the late ones at the end", () => {
    assert.deepEqual(dueText({ today: [{ summary: "Trocar filtro", time: null }], late: 0 }), { title: "📅 Vence hoje", message: "• Trocar filtro" });
    const t = dueText({ today: [{ summary: "Pagar luz", time: "15:00" }, { summary: "Trocar filtro", time: null }], late: 2 });
    assert.equal(t.title, "📅 Vencem hoje: 2");
    assert.equal(t.message, "• Pagar luz às 15:00\n• Trocar filtro\nE 2 atrasados.");
    assert.match(dueText({ today: [{ summary: "A" }], late: 1 }).message, /E 1 atrasado\.$/);
  });
  it("up to 5 lines, then e mais N", () => {
    const today = Array.from({ length: 7 }, (_, i) => ({ summary: `T${i}`, time: null }));
    const lines = dueText({ today, late: 0 }).message.split("\n");
    assert.equal(lines.length, 6);
    assert.equal(lines.at(-1), "e mais 2");
  });
});

describe("alertSettings", () => {
  it("off unless turned on; never with Controlar prazos off; 08:00 by default", () => {
    assert.deepEqual(alertSettings({}), { on: false, time: "08:00" });
    assert.deepEqual(alertSettings({ due_alert: true, due_alert_time: "19:30", due_alert_to: ["mobile_app_pixel_8"] }), { on: true, time: "19:30" });
    assert.equal(alertSettings({ due_alert: true, due_off: true }).on, false);
    assert.equal(alertSettings({ due_alert: true, due_alert_time: "25:00" }).time, "08:00");
  });
  it("the link of the alert: the app on Prazos (only inside Home Assistant)", () => {
    assert.equal(ingressUrl("a1b2c3d4-resolvia"), "/app/a1b2c3d4_resolvia", "the app panel since HA 2026.2");
    assert.equal(ingressUrl("my-laptop"), null);
  });
});

describe("store: the preferences of the alert", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rv-alert-"));
  const store = new Store(dir, { warn() {}, error() {}, info() {} });
  it("a bad time and anything that isn't a phone are dropped", () => {
    store.setAppPrefs({ due_alert: true, due_alert_time: "7h", due_alert_to: ["mobile_app_pixel_8", "mobile_app_pixel_8", "notify.x", "persistent_notification"] });
    assert.equal(store.prefs.app.due_alert, true);
    assert.equal(store.prefs.app.due_alert_time, undefined);
    assert.deepEqual(store.prefs.app.due_alert_to, ["mobile_app_pixel_8"]);
    store.setAppPrefs({ due_alert_time: "07:15" });
    assert.equal(store.prefs.app.due_alert_time, "07:15");
  });
  it("the day it went out is kept (and comes back from the file); an import checks it", () => {
    store.markAlert("prazos", "2026-11-06");
    assert.equal(store.alertSent("prazos"), "2026-11-06");
    store.flush({ version: false });
    assert.equal(new Store(dir, { warn() {}, error() {}, info() {} }).alertSent("prazos"), "2026-11-06");
    assert.equal(normalize({ alerts: { prazos: "ontem" } }).alerts, undefined);
    assert.deepEqual(normalize({ prefs: { app: { due_alert_time: "99:99", due_alert_to: ["x"] } } }, true).prefs.app, { due_alert_to: [] });
    fs.rmSync(dir, { recursive: true, force: true });
  });
});

// The house of the tests: Ana (her phone tied to her in Home Assistant), Beto (his phone chosen in the
// CronologIA's Avisos, not the old one tied to him), Cida (no phone) and Duda (only in the CronologIA, with a phone).
const HOUSE = [
  { entity_id: "person.ana", attributes: { friendly_name: "Ana", user_id: "u-ana", device_trackers: ["device_tracker.pixel_8"] } },
  { entity_id: "person.beto", attributes: { friendly_name: "Beto", user_id: "u-beto", device_trackers: ["device_tracker.velho"] } },
  { entity_id: "person.cida", attributes: { friendly_name: "Cida", user_id: "u-cida", device_trackers: [] } },
  { entity_id: "todo.casa" },
];
const PHONES = { mobile_app_pixel_8: {}, mobile_app_velho: {}, mobile_app_galaxy: {}, mobile_app_duda: {}, mobile_app_tablet: {}, persistent_notification: {} };
function house(app, { items = new Map([["todo.casa", [item("Trocar filtro", "2026-11-06")]]]), lists = () => new Map([["todo.casa", L("Casa")]]), chosen = { Beto: "mobile_app_galaxy", Duda: "mobile_app_duda", Ana: "mobile_app_sumiu" }, fail = null } = {}) {
  const calls = [];
  const sent = {};
  const store = { prefs: { app }, alertSent: (k) => sent[k] || null, markAlert: (k, d) => (sent[k] = d) };
  const ha = {
    ready: true,
    send: async (m) => {
      calls.push(m);
      if (m.type === "get_states") return HOUSE;
      if (m.type === "get_services") return { notify: PHONES };
      if (m.service === fail) throw new Error("offline");
      return {};
    },
  };
  const da = new DueAlert({ ha, store, lists, items, log: { info() {}, warn() {} }, chosen: () => chosen });
  return { da, calls, sent, ha, notes: () => calls.filter((c) => c.domain === "notify") };
}
const at = (h, m) => new Date(2026, 10, 6, h, m);

describe("DueAlert", () => {
  it("recipients: each person with the phone of Avisos (CronologIA), else the one tied to them; the people only of the CronologIA too", async () => {
    const { da } = house({});
    assert.deepEqual(await da.recipients(), [
      { name: "Ana", user_id: "u-ana", phone: "mobile_app_pixel_8", phoneName: "Pixel 8" },
      { name: "Beto", user_id: "u-beto", phone: "mobile_app_galaxy", phoneName: "Galaxy" },
      { name: "Cida", user_id: "u-cida", phone: null, phoneName: null },
      { name: "Duda", user_id: null, phone: "mobile_app_duda", phoneName: "Duda" },
    ]);
    const plain = house({}, { chosen: null });
    assert.deepEqual((await plain.da.recipients()).map((r) => [r.name, r.phone]), [["Ana", "mobile_app_pixel_8"], ["Beto", "mobile_app_velho"], ["Cida", null]], "no CronologIA: the phones tied to the people");
  });

  it("at the time (up to 2 h after), once a day, to every person with a phone (the list is everyone's)", async () => {
    const { da, notes, sent } = house({ due_alert: true, due_alert_time: "08:00" });
    assert.equal(await da.tick(at(7, 59)), false, "before the time");
    assert.equal(await da.tick(at(10, 1)), false, "more than 2 h after");
    assert.equal(notes().length, 0);
    assert.equal(await da.tick(at(8, 0)), true);
    assert.deepEqual(notes().map((n) => n.service).sort(), ["mobile_app_duda", "mobile_app_galaxy", "mobile_app_pixel_8"], "not the tablet nor the old phone of Beto");
    assert.equal(notes()[0].service_data.title, "📅 Vence hoje");
    assert.equal(notes()[0].service_data.message, "• Trocar filtro");
    assert.equal(notes()[0].service_data.data.tag, "resolvia-prazos");
    assert.equal(sent.prazos, ymd(at(8, 0)));
    assert.equal(await da.tick(at(8, 1)), false, "once a day");
    assert.equal(notes().length, 3);
  });

  it("nothing due today, off, or Home Assistant away: nothing goes", async () => {
    const empty = house({ due_alert: true }, { items: new Map() });
    assert.equal(await empty.da.tick(at(8, 5)), false);
    assert.equal(empty.notes().length, 0);
    const off = house({});
    assert.equal(await off.da.tick(at(8, 5)), false);
    const away = house({ due_alert: true });
    away.ha.ready = false;
    assert.equal(await away.da.tick(at(8, 5)), false);
    assert.equal(away.sent.prazos, undefined, "tried again when it is back");
  });

  it("Testar: on the phone of the one using the app; nothing due: says so; not a person or no phone: says why", async () => {
    const { da, notes } = house({});
    assert.deepEqual(await da.test("u-beto", at(20, 0)), { sent: 1, today: 1, phone: "Galaxy" });
    assert.equal(notes().at(-1).service, "mobile_app_galaxy");
    assert.equal(notes().at(-1).service_data.data.tag, "resolvia-prazos-teste");
    await assert.rejects(da.test(null), /não é uma pessoa da casa/);
    await assert.rejects(da.test("u-visita"), /não é uma pessoa da casa/);
    await assert.rejects(da.test("u-cida"), /Sem celular para Cida/);
    const broken = house({}, { fail: "mobile_app_pixel_8" });
    await assert.rejects(broken.da.test("u-ana"), /não entregou/);
    const none = house({}, { items: new Map() });
    await none.da.test("u-ana", at(20, 0));
    assert.match(none.notes()[0].service_data.message, /Nada vence hoje/);
  });
});

describe("De quem é (2.42.0): the alert of a list with an owner goes only to that person's phone", () => {
  const lists = () =>
    new Map([
      ["todo.casa", L("Casa")],
      ["todo.ana", L("Da Ana", { prefs: { owner: "Ana" } })],
      ["todo.beto", L("Do Beto", { prefs: { owner: "Beto" } })],
    ]);
  const items = new Map([
    ["todo.casa", [item("Lixo", "2026-11-06")]],
    ["todo.ana", [item("Dentista", "2026-11-06"), item("Atrasada da Ana", "2026-11-01")]],
    ["todo.beto", [item("Revisão do carro", "2026-11-06")]],
  ]);
  it("dueToday with whom: theirs and everyone's; a phone of nobody: everyone's only; without whom: all", () => {
    const names = (whom) => dueToday(lists(), items, NOW, whom).today.map((t) => t.summary);
    assert.deepEqual(names("ana"), ["Dentista", "Lixo"], "the name, without minding case or accents");
    assert.deepEqual(names("Beto"), ["Lixo", "Revisão do carro"]);
    assert.deepEqual(names(null), ["Lixo"]);
    assert.deepEqual(names(undefined), ["Dentista", "Lixo", "Revisão do carro"]);
    assert.equal(dueToday(lists(), items, NOW, "Beto").late, 0, "the late ones of Ana don't count for Beto");
  });

  it("tick and Testar: each person gets their lists and everyone's; a phone of two people gets both", async () => {
    const { da, notes } = house({ due_alert: true }, { lists, items, chosen: { Beto: "mobile_app_galaxy", Duda: "mobile_app_pixel_8" } });
    assert.equal(await da.tick(new Date(2026, 10, 6, 8, 0)), true);
    const by = Object.fromEntries(notes().map((c) => [c.service, c.service_data.message]));
    assert.deepEqual(by, {
      mobile_app_pixel_8: "• Dentista\n• Lixo\nE 1 atrasado.",
      mobile_app_galaxy: "• Lixo\n• Revisão do carro",
    }, "Ana and Duda share the Pixel: one alert, with what is theirs");
    assert.deepEqual(await da.test("u-beto", new Date(2026, 10, 6, 20, 0)), { sent: 1, today: 2, phone: "Galaxy" });
    assert.match(notes().at(-1).service_data.message, /Revisão do carro/);
  });

  it("store: the owners, and the ones of the CronologIA taken once (only where there is none here)", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rv-own-"));
    const st = new Store(dir, { warn() {}, error() {}, info() {} });
    st.setListPrefs("todo.ana", { owner: "  Ana " });
    st.setListPrefs("todo.casa", { color: "azul" });
    assert.deepEqual(st.owners, { "todo.ana": "Ana" });
    assert.equal(st.adoptOwners({ "todo.ana": "Beto", "todo.trabalho": "Beto", "light.x": "Ana", "todo.y": "" }), 1);
    assert.deepEqual(st.owners, { "todo.ana": "Ana", "todo.trabalho": "Beto" });
    st.setListPrefs("todo.trabalho", { owner: null });
    assert.equal(st.adoptOwners({ "todo.trabalho": "Beto" }), 0, "once: made everyone's, it stays so");
    assert.deepEqual(st.owners, { "todo.ana": "Ana" });
    st.flush({ version: false });
    assert.equal(new Store(dir, { warn() {}, error() {}, info() {} }).adoptOwners({ "todo.z": "Ana" }), 0, "remembered after a restart");
    assert.equal(st.adoptOwners(null), 0);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
