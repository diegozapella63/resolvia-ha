// Opções › Prazos › Avisar o que vence hoje (2.41.0): the phones of Home Assistant, Testar, and the alert
// at the time chosen (checked every 200 ms here), once a day, with what is due today on the shown lists.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor } from "./_harness.mjs";

let stack;
let c;
const notes = async () => (await fetch(`${stack.haUrl}/dev/notifications`)).json();
before(async () => {
  stack = new Stack({ appEnv: { RESOLVIA_ALERT_MS: "200" } });
  await stack.start();
  c = await stack.client();
});
after(() => stack && stack.stop());

describe("Avisar o que vence hoje", () => {
  it("the phones: the mobile apps of Home Assistant, with whose they are", async () => {
    assert.deepEqual(await c.call("resolvia/phones"), [
      { id: "mobile_app_galaxy_s23", name: "Galaxy S23", owner: "Beto" },
      { id: "mobile_app_pixel_8", name: "Pixel 8", owner: "Ana" },
    ]);
  });

  it("Testar: what is due today, now, to the phone chosen", async () => {
    const res = await c.call("resolvia/due_alert/test", { targets: ["mobile_app_pixel_8"] });
    assert.equal(res.sent, 1);
    const n = (await notes()).at(-1);
    assert.equal(n.service, "mobile_app_pixel_8");
    assert.equal(n.title, "📅 Vence hoje");
    assert.match(n.message, /^• Trocar filtro do ar\nE 1 atrasado\.$/);
    assert.equal(n.data.tag, "resolvia-prazos-teste");
    await assert.rejects(c.call("resolvia/due_alert/test", { targets: [] }), /Escolha um celular/);
  });

  it("on, at the time: once, to each phone chosen; off: nothing", async () => {
    const before = (await notes()).length;
    const d = new Date();
    const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    await c.call("resolvia/prefs/set_app", { prefs: { due_alert: true, due_alert_time: hm, due_alert_to: ["mobile_app_pixel_8", "mobile_app_galaxy_s23"] } });
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
