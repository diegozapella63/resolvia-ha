// 2.58.0: Prazo no ResolvIA. A list whose integration takes no date (here the Alexa Shopping list of the fake Home
// Assistant: create, delete, update) gets deadlines kept by the app, by the name of the task: the screen sees the date
// features on, the date never reaches Home Assistant (which refuses it), the items come with it, a rename takes it
// along, a task done loses it, and the other apps keep writing to Home Assistant only what it takes.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Stack, waitFor, items } from "./_harness.mjs";

const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const CASA = "todo.casa";
const svc = (service, service_data, entity_id = SHOP) => ({ domain: "todo", service, service_data, target: { entity_id } });

let stack;
let c;
before(async () => {
  stack = await new Stack().start();
  c = await stack.client({ "x-remote-user-id": "user-ana", "x-remote-user-display-name": "Ana Souza" });
});
after(() => stack && stack.stop());

const byName = async (summary) => (await items(c, SHOP)).find((i) => i.summary === summary);
// what the app saved (it writes a moment after a change)
const saved = () => {
  try {
    return JSON.parse(fs.readFileSync(path.join(stack.dirs.data, "resolvia.json"), "utf8")).dues || {};
  } catch {
    return {};
  }
};
const savedIs = (want, what) => waitFor(() => JSON.stringify(saved()[SHOP]) === JSON.stringify(want), { what });

describe("Prazo no ResolvIA: the lists that take no date", () => {
  it("the screen sees the date features on, only in those lists", async () => {
    const b = await c.call("resolvia/bootstrap");
    const shop = b.states[SHOP].attributes;
    assert.equal(shop.supported_features & 48, 48, "date and time");
    assert.equal(shop.resolvia_prazo, true);
    assert.equal(b.states[CASA].attributes.resolvia_prazo, undefined, "a list with dates of its own: as it is");
    assert.equal(b.states[CASA].attributes.supported_features, 127);
  });

  it("a new task with a deadline: Home Assistant gets it without the date, the app keeps it", async () => {
    const sub = await c.subscribe("todo/item/subscribe", { entity_id: SHOP });
    await c.call("call_service", svc("add_item", { item: "Pilhas AA", due_date: "2026-12-01" }));
    const it = await waitFor(() => byName("Pilhas AA"), { what: "the new item" });
    assert.equal(it.due, "2026-12-01", "the item comes with the deadline of the app");
    await savedIs({ "pilhas aa": "2026-12-01" }, "saved by the app");
    await waitFor(() => sub.events.some((e) => (e.items || []).some((i) => i.summary === "Pilhas AA" && i.due === "2026-12-01")), { what: "the screen sees it" });
    assert.deepEqual(stack.presence().prazos_app, { [SHOP]: { "pilhas aa": "2026-12-01" } }, "for the CronologIA");
    assert.ok(stack.presence().sem_prazo.includes(SHOP), "the other apps still write to Home Assistant only what it takes");
    assert.equal(stack.presence().listas.find((l) => l.id === SHOP).prazo, false);
  });

  it("only the date changes (no call to Home Assistant), with a time; a rename takes it along", async () => {
    const it = await byName("Pilhas AA");
    await c.call("call_service", svc("update_item", { item: it.uid, due_datetime: "2026-12-02 15:00:00" }));
    assert.equal((await byName("Pilhas AA")).due, "2026-12-02T15:00:00");
    await c.call("call_service", svc("update_item", { item: it.uid, rename: "Pilhas AAA" }));
    await waitFor(async () => (await byName("Pilhas AAA")) && true, { what: "renamed" });
    assert.equal((await byName("Pilhas AAA")).due, "2026-12-02T15:00:00");
    await savedIs({ "pilhas aaa": "2026-12-02T15:00:00" }, "saved with the new name");
    await c.call("call_service", svc("update_item", { item: it.uid, due_date: null }));
    assert.equal((await byName("Pilhas AAA")).due, undefined, "Sem prazo");
    await c.call("call_service", svc("update_item", { item: it.uid, due_date: "2026-12-05" }));
    assert.equal((await byName("Pilhas AAA")).due, "2026-12-05");
  });

  it("a task done loses its deadline (coming back, it has none)", async () => {
    const it = await byName("Pilhas AAA");
    await c.call("call_service", svc("update_item", { item: it.uid, status: "completed" }));
    await waitFor(() => !saved()[SHOP], { what: "the deadline goes" });
    assert.equal((await byName("Pilhas AAA")).due, undefined);
    await c.call("call_service", svc("update_item", { item: it.uid, status: "needs_action" }));
    assert.equal((await byName("Pilhas AAA")).due, undefined);
    await waitFor(() => JSON.stringify(stack.presence().prazos_app) === "{}", { what: "out of the file" });
  });

  it("a list with dates of its own keeps writing them in Home Assistant", async () => {
    await c.call("call_service", svc("add_item", { item: "Trocar a lâmpada", due_date: "2026-12-03" }, CASA));
    assert.equal((await items(c, CASA)).find((i) => i.summary === "Trocar a lâmpada").due, "2026-12-03");
    assert.equal(saved()[CASA], undefined);
  });

  it("the deadlines go with Começar do zero and survive a restart", async () => {
    await c.call("call_service", svc("add_item", { item: "Detergente", due_date: "2026-12-10" }));
    await stack.restartApp();
    c = await stack.client({ "x-remote-user-id": "user-ana" });
    assert.equal((await waitFor(() => byName("Detergente"), { what: "after the restart" })).due, "2026-12-10");
    const out = await c.call("resolvia/data/erase", { confirm: true });
    assert.equal(out.dues, 1);
    assert.equal((await byName("Detergente")).due, undefined);
  });
});
