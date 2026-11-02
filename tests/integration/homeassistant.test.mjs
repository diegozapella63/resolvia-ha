// The Home Assistant side: lists created and removed while the app runs, an integration
// without item subscriptions, Home Assistant restarting, and a Home Assistant that refuses
// commands or the token. Through the real server against the fake Home Assistant.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor, items } from "./_harness.mjs";

const CASA = "todo.casa";
const svc = (service, service_data, entity_id = CASA) => ({ domain: "todo", service, service_data, target: { entity_id } });

describe("lists created and removed in Home Assistant", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack().start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("a new list reaches the screens right away, with its items", async () => {
    const sub = await c.subscribe("resolvia/subscribe_lists");
    await stack.addList({ entity_id: "todo.viagem", name: "Viagem", features: 127, items: ["Passaporte", "Protetor solar"] });
    const ev = await waitFor(() => sub.events.find((e) => e.entity_id === "todo.viagem"), { what: "the new list" });
    assert.equal(ev.new_state.attributes.friendly_name, "Viagem");
    assert.equal(ev.new_state.state, "2");
    const b = await c.call("resolvia/bootstrap");
    assert.ok(b.states["todo.viagem"], "in the bootstrap of a screen opened now");
    assert.deepEqual((await items(c, "todo.viagem")).map((i) => i.summary), ["Passaporte", "Protetor solar"]);
    await c.call("unsubscribe_events", { subscription: sub.id });
  });

  it("the app follows the new list (a repetition there comes back)", async () => {
    const task = (await items(c, "todo.viagem")).find((i) => i.summary === "Passaporte");
    const rules = await c.subscribe("resolvia/recurring/subscribe");
    const rule = await c.call("resolvia/recurring/set", { entity_id: "todo.viagem", uid: task.uid, summary: task.summary, days: 2 });
    await c.call("call_service", svc("update_item", { item: task.uid, status: "completed" }, "todo.viagem"));
    await waitFor(() => rules.events.at(-1).rules.find((r) => r.id === rule.id).reopen_at, { what: "the completion seen by the app" });
    await c.call("resolvia/recurring/set", { entity_id: "todo.viagem", uid: task.uid, summary: task.summary, days: 0 });
  });

  it("a removed list leaves the screens (its state becomes null) and the bootstrap", async () => {
    const sub = await c.subscribe("resolvia/subscribe_lists");
    await stack.removeList("todo.viagem");
    const ev = await waitFor(() => sub.events.find((e) => e.entity_id === "todo.viagem"), { what: "the list gone" });
    assert.equal(ev.new_state, null);
    const b = await c.call("resolvia/bootstrap");
    assert.equal(b.states["todo.viagem"], undefined);
    assert.ok(b.states[CASA], "the others stay");
    // an item the app still had in mind for it: a command for it gets Home Assistant's refusal, the app keeps working
    await assert.rejects(c.call("call_service", svc("add_item", { item: "x" }, "todo.viagem")), { code: "not_found" });
    assert.equal(await c.call("ping"), "pong");
  });

  it("an integration without item subscriptions: the app says so, and the items can still be read", async () => {
    await stack.addList({ entity_id: "todo.antiga", name: "Antiga", features: 7, items: ["Item velho"], no_subscribe: true });
    await stack.app.waitLine(/Não consegui acompanhar todo\.antiga: This entity does not support item subscriptions/);
    await assert.rejects(c.call("todo/item/subscribe", { entity_id: "todo.antiga" }), { code: "not_supported" });
    assert.deepEqual((await items(c, "todo.antiga")).map((i) => i.summary), ["Item velho"]);
    await c.call("call_service", svc("add_item", { item: "Item novo" }, "todo.antiga"));
    assert.deepEqual((await items(c, "todo.antiga")).map((i) => i.summary), ["Item velho", "Item novo"]);
  });
});

describe("Home Assistant restarts", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack().start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("the screens' item subscriptions come back with Home Assistant's items", async () => {
    const sub = await c.subscribe("todo/item/subscribe", { entity_id: CASA });
    await waitFor(() => sub.events.length >= 1, { what: "first items" });
    await c.call("call_service", svc("add_item", { item: "Só antes do reinício" }));
    await waitFor(() => sub.events.at(-1).items.some((i) => i.summary === "Só antes do reinício"), { what: "the added item" });
    const drops = stack.app.count(/Disconnected from Home Assistant/);
    await stack.restartFake();
    await waitFor(() => stack.app.count(/Disconnected from Home Assistant/) > drops, { what: "the app sees the restart" });
    // the fake starts again with its first items: the screen gets them without subscribing again
    await waitFor(() => !sub.events.at(-1).items.some((i) => i.summary === "Só antes do reinício"), { what: "Home Assistant's items after the restart", timeout: 15_000 });
    await c.call("call_service", svc("add_item", { item: "Depois do reinício" }));
    await waitFor(() => sub.events.at(-1).items.some((i) => i.summary === "Depois do reinício"), { what: "changes after the restart" });
  });

  it("a command sent while Home Assistant is down is carried out when it is back", async () => {
    const drops = stack.app.count(/Disconnected from Home Assistant/);
    await stack.fake.stop();
    await waitFor(() => stack.app.count(/Disconnected from Home Assistant/) > drops, { what: "the app sees Home Assistant go" });
    let done = false;
    const pending = c.call("call_service", svc("add_item", { item: "Feito durante a queda" })).then((r) => ((done = true), r));
    await new Promise((r) => setTimeout(r, 300));
    assert.equal(done, false, "waits for Home Assistant");
    await stack.startFake();
    await pending;
    assert.ok((await items(c, CASA)).some((i) => i.summary === "Feito durante a queda"));
  });

  it("the lists are read again after the restart (bootstrap of a new screen)", async () => {
    const lines = stack.app.count(/listas de tarefas encontradas/);
    await stack.restartFake(200);
    await waitFor(() => stack.app.count(/listas de tarefas encontradas/) > lines, { what: "lists read again", timeout: 15_000 });
    const other = await stack.client();
    const b = await other.call("resolvia/bootstrap");
    assert.equal(Object.keys(b.states).length, 4);
  });
});

describe("a Home Assistant that refuses some commands", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack({ fakeEnv: { FAKE_HA_FAIL: "get_config,config/entity_registry/list_for_display" } }).start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("without get_config: says so and keeps going with its own time zone", async () => {
    await stack.app.waitLine(/get_config falhou: get_config failed/);
    assert.equal(stack.app.count(/Fuso horário:/), 0);
  });

  it("without the entity registry: the lists still come, without names or devices", async () => {
    const b = await c.call("resolvia/bootstrap");
    await stack.app.waitLine(/Registro de entidades indisponível: config\/entity_registry\/list_for_display failed/);
    assert.equal(Object.keys(b.states).length, 4);
    assert.deepEqual([b.entities, b.devices], [{}, {}]);
    assert.equal(b.states[CASA].attributes.friendly_name, "Casa", "the screen still has the name of each list");
  });
});

describe("a Home Assistant that does not give the states", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack({ fakeEnv: { FAKE_HA_FAIL: "get_states" }, waitLists: false }).start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("says it could not read the lists; a screen still opens, with none", async () => {
    await stack.app.waitLine(/Não consegui ler as listas: get_states failed/);
    const b = await c.call("resolvia/bootstrap");
    assert.deepEqual(b.states, {});
    assert.equal(b.version.length > 0, true);
  });
});

describe("without a token", () => {
  let stack;
  before(async () => {
    stack = await new Stack({ appEnv: { HA_TOKEN: "" }, waitLists: false }).start();
  });
  after(() => stack && stack.stop());

  it("says so, Home Assistant refuses it, and the page is still served", async () => {
    await stack.app.waitLine(/ERROR No SUPERVISOR_TOKEN/);
    await stack.app.waitLine(/Home Assistant rejected the token/);
    const res = await fetch(`${stack.appUrl}/`);
    assert.equal(res.status, 200);
    await res.text();
    assert.equal(stack.app.count(/listas de tarefas encontradas/), 0);
  });
});
