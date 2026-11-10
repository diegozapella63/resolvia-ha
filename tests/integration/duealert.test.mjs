// Opções › Prazos › Avisar o que vence hoje: each person of the house gets, at the time chosen (checked every
// 200 ms here), once a day, what is due today on their lists and on everyone's (2.44.1: on the phones tied to
// each person in Home Assistant; the app looks at the person, never at a device).
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor } from "./_harness.mjs";

let stack;
let ana;
let visita;
const notes = async () => (await fetch(`${stack.haUrl}/dev/notifications`)).json();
before(async () => {
  stack = new Stack({ appEnv: { RESOLVIA_ALERT_MS: "200" } });
  // the CronologIA: whose each list was there before 1.53.0 (taken here once); a phone from there is not looked at
  stack.writeShare("cronologia/integracao.json", {
    app: "CronologIA",
    versao: "1.53.1",
    gravado_em: new Date().toISOString(),
    placar: { ativo: true, participantes: ["Ana", "Cida"] },
    donos_listas: { "todo.google_tasks": "Ana" },
    celulares: { Cida: "mobile_app_galaxy_s23" },
  });
  await stack.start();
  ana = await stack.client({ "x-remote-user-id": "u-ana" });
  visita = await stack.client({ "x-remote-user-id": "u-visita" });
});
after(() => stack && stack.stop());

describe("Avisar o que vence hoje", () => {
  it("who gets it: each person of Home Assistant and whether a phone is tied to them; me marked; no device names", async () => {
    assert.deepEqual(await ana.call("resolvia/due_alert/people"), [
      { id: "person.ana", name: "Ana", phone: true, me: true },
      { id: "person.beto", name: "Beto", phone: true, me: false },
    ]);
  });

  it("2.54.0: Quem recebe is kept with the app (only persons); null goes back to everyone", async () => {
    const p = await ana.call("resolvia/prefs/set_app", { prefs: { due_alert_people: ["person.beto", "notify.x"] } });
    assert.deepEqual(p.app.due_alert_people, ["person.beto"]);
    assert.equal((await ana.call("resolvia/prefs/set_app", { prefs: { due_alert_people: null } })).app.due_alert_people, undefined);
  });

  it("Testar: what is due today, now, on my phone; someone who isn't a person of the house: why not", async () => {
    const res = await ana.call("resolvia/due_alert/test");
    assert.deepEqual(res, { sent: 1, today: 1 });
    const n = (await notes()).at(-1);
    assert.equal(n.service, "mobile_app_pixel_8");
    assert.equal(n.title, "📅 Vence hoje");
    assert.match(n.message, /^• Trocar filtro do ar\nE 1 atrasado\.$/);
    assert.equal(n.data.tag, "resolvia-prazos-teste");
    await assert.rejects(visita.call("resolvia/due_alert/test"), /não é uma pessoa da casa/);
  });

  it("on, at the time: once, to each person on their phone (not to a phone chosen in the CronologIA)", async () => {
    const before = (await notes()).length;
    const d = new Date();
    const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    await ana.call("resolvia/prefs/set_app", { prefs: { due_alert: true, due_alert_time: hm } });
    const got = await waitFor(async () => {
      const all = (await notes()).slice(before);
      return all.length >= 2 ? all : null;
    }, { what: "the daily alert" });
    assert.deepEqual(got.map((n) => n.service).sort(), ["mobile_app_galaxy_s23", "mobile_app_pixel_8"]);
    assert.equal(got[0].data.tag, "resolvia-prazos");
    await new Promise((r) => setTimeout(r, 800));
    assert.equal((await notes()).length, before + 2, "once a day");
  });
});

describe("De quem é (2.42.0)", () => {
  it("the people: the persons of Home Assistant and the participants of the scoreboard", async () => {
    assert.deepEqual(await ana.call("resolvia/people"), ["Ana", "Beto", "Cida"]);
  });

  it("the owners of the CronologIA came once, and go out in share/resolvia/integracao.json", async () => {
    const prefs = await waitFor(async () => {
      const p = await ana.call("resolvia/prefs/get");
      return p.lists["todo.google_tasks"] && p.lists["todo.google_tasks"].owner ? p : null;
    }, { what: "the owner taken from the CronologIA" });
    assert.equal(prefs.lists["todo.google_tasks"].owner, "Ana");
    await waitFor(() => (stack.presence().donos || {})["todo.google_tasks"] === "Ana", { what: "donos published" });
  });

  it("a list of Beto: Ana's Testar no longer has it", async () => {
    await ana.call("resolvia/prefs/set_list", { entity_id: "todo.casa", prefs: { owner: "Beto" } });
    assert.deepEqual(stack.presence().donos, { "todo.google_tasks": "Ana", "todo.casa": "Beto" });
    const n0 = (await notes()).length;
    assert.equal((await ana.call("resolvia/due_alert/test")).today, 0);
    assert.match((await notes()).slice(n0)[0].message, /Nada vence hoje/);
    await ana.call("resolvia/prefs/set_list", { entity_id: "todo.casa", prefs: { owner: null } });
    assert.deepEqual(stack.presence().donos, { "todo.google_tasks": "Ana" });
  });
});
