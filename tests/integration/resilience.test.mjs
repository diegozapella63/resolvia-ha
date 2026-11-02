// When parts of Home Assistant fail (FAKE_FAIL in the fake), the app still starts, serves the lists and says what failed.
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor } from "./_harness.mjs";

const stacks = [];
after(() => Promise.all(stacks.map((s) => s.stop())));
const up = async (fails) => {
  const s = await new Stack({ fakeEnv: { FAKE_FAIL: fails } }).start();
  stacks.push(s);
  return s;
};

describe("resilience: Home Assistant failing", () => {
  it("get_config failing: logs it and still finds the lists", async () => {
    const s = await up("get_config");
    assert.ok(s.app.lines.some((l) => /WARNING get_config falhou: Falha simulada em get_config/.test(l)));
    assert.ok(s.app.lines.some((l) => /4 listas de tarefas encontradas/.test(l)));
    const c = await s.client();
    const boot = await c.call("resolvia/bootstrap");
    assert.equal(Object.keys(boot.states).length, 4);
  });

  it("the entity registry failing: the bootstrap answers without names of devices, and says why in the log", async () => {
    const s = await up("config/entity_registry/list_for_display");
    const c = await s.client();
    const boot = await c.call("resolvia/bootstrap");
    assert.deepEqual([boot.entities, boot.devices], [{}, {}]);
    assert.equal(Object.keys(boot.states).length, 4, "the lists are still there");
    await waitFor(() => s.app.lines.some((l) => /Registro de entidades indisponível: Falha simulada/.test(l)), { what: "the registry warning" });
  });

  it("following the items failing: each list says so, and the lists still load", async () => {
    const s = await up("todo/item/subscribe");
    await waitFor(() => s.app.count(/Não consegui acompanhar todo\.\w+: Falha simulada/) === 4, { what: "a warning per list" });
    const c = await s.client();
    const boot = await c.call("resolvia/bootstrap");
    assert.equal(Object.keys(boot.states).length, 4);
  });

  it("reading the items on demand failing: the export still has every item (from the live subscription)", async () => {
    const s = await up("todo/item/list");
    const res = await fetch(`${s.appUrl}/api/export/json`);
    assert.equal(res.status, 200);
    const snap = await res.json();
    const lists = snap.lists || snap.listas || [];
    assert.equal(lists.length, 4);
    assert.ok(lists.some((l) => (l.items || []).length > 0), "the items came along");
  });
});
