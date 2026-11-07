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
  it("off unless turned on; never with Controlar prazos off; 08:00 by default; only phones", () => {
    assert.deepEqual(alertSettings({}), { on: false, time: "08:00", to: [] });
    assert.deepEqual(alertSettings({ due_alert: true, due_alert_time: "19:30", due_alert_to: ["mobile_app_pixel_8", "persistent_notification"] }), { on: true, time: "19:30", to: ["mobile_app_pixel_8"] });
    assert.equal(alertSettings({ due_alert: true, due_off: true }).on, false);
    assert.equal(alertSettings({ due_alert: true, due_alert_time: "25:00" }).time, "08:00");
  });
  it("the link of the alert: the app on Prazos (only inside Home Assistant)", () => {
    assert.equal(ingressUrl("a1b2c3d4-resolvia"), "/hassio/ingress/a1b2c3d4_resolvia");
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

describe("DueAlert", () => {
  const make = (app, items = new Map([["todo.casa", [item("Trocar filtro", "2026-11-06")]]])) => {
    const calls = [];
    const sent = {};
    const store = { prefs: { app }, alertSent: (k) => sent[k] || null, markAlert: (k, d) => (sent[k] = d) };
    const ha = {
      ready: true,
      send: async (m) => {
        calls.push(m);
        if (m.type === "get_states") return [{ entity_id: "person.ana", attributes: { friendly_name: "Ana", device_trackers: ["device_tracker.pixel_8"] } }, { entity_id: "todo.casa" }];
        if (m.type === "get_services") return { notify: { mobile_app_pixel_8: {}, mobile_app_tablet: {}, persistent_notification: {} } };
        if (m.service === "mobile_app_quebrado") throw new Error("offline");
        return {};
      },
    };
    const log = { info() {}, warn() {} };
    const da = new DueAlert({ ha, store, lists: () => new Map([["todo.casa", L("Casa")]]), items, log });
    return { da, calls, sent, ha, notes: () => calls.filter((c) => c.domain === "notify") };
  };
  const at = (h, m) => new Date(2026, 10, 6, h, m);

  it("phones: the mobile apps, with whose they are", async () => {
    const { da } = make({});
    assert.deepEqual(await da.phones(), [
      { id: "mobile_app_pixel_8", name: "Pixel 8", owner: "Ana" },
      { id: "mobile_app_tablet", name: "Tablet", owner: null },
    ]);
  });

  it("at the time (up to 2 h after), once a day, to each phone chosen", async () => {
    const { da, notes, sent } = make({ due_alert: true, due_alert_time: "08:00", due_alert_to: ["mobile_app_pixel_8", "mobile_app_tablet"] });
    assert.equal(await da.tick(at(7, 59)), false, "before the time");
    assert.equal(await da.tick(at(10, 1)), false, "more than 2 h after");
    assert.equal(notes().length, 0);
    assert.equal(await da.tick(at(8, 0)), true);
    assert.deepEqual(notes().map((n) => n.service), ["mobile_app_pixel_8", "mobile_app_tablet"]);
    assert.equal(notes()[0].service_data.title, "📅 Vence hoje");
    assert.equal(notes()[0].service_data.message, "• Trocar filtro");
    assert.equal(notes()[0].service_data.data.tag, "resolvia-prazos");
    assert.equal(sent.prazos, ymd(at(8, 0)));
    assert.equal(await da.tick(at(8, 1)), false, "once a day");
    assert.equal(notes().length, 2);
  });

  it("nothing due today, off, no phone or Home Assistant away: nothing goes", async () => {
    const empty = make({ due_alert: true, due_alert_to: ["mobile_app_pixel_8"] }, new Map());
    assert.equal(await empty.da.tick(at(8, 5)), false);
    assert.equal(empty.notes().length, 0);
    const off = make({ due_alert_to: ["mobile_app_pixel_8"] });
    assert.equal(await off.da.tick(at(8, 5)), false);
    const nobody = make({ due_alert: true, due_alert_to: [] });
    assert.equal(await nobody.da.tick(at(8, 5)), false);
    const away = make({ due_alert: true, due_alert_to: ["mobile_app_pixel_8"] });
    away.ha.ready = false;
    assert.equal(await away.da.tick(at(8, 5)), false);
    assert.equal(away.sent.prazos, undefined, "tried again when it is back");
  });

  it("Testar: now, to the phones given; nothing due: says so; a phone that fails doesn't stop the others", async () => {
    const { da, notes } = make({});
    assert.deepEqual(await da.test(["mobile_app_quebrado", "mobile_app_pixel_8"], at(20, 0)), { sent: 1, today: 1 });
    assert.equal(notes().at(-1).service_data.data.tag, "resolvia-prazos-teste");
    await assert.rejects(da.test([]), /Escolha um celular/);
    await assert.rejects(da.test(["notify.x"]), /Escolha um celular/);
    await assert.rejects(da.test(["mobile_app_quebrado"]), /não entregou/);
    const none = make({}, new Map());
    await none.da.test(["mobile_app_pixel_8"], at(20, 0));
    assert.match(none.notes()[0].service_data.message, /Nada vence hoje/);
  });
});
