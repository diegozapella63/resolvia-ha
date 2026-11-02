// Lists, items, subscriptions, preferences, repetitions and the integration file,
// through the real server against the fake Home Assistant.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor, items, APP_VERSION } from "./_harness.mjs";

const CASA = "todo.casa";
const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const TODO = "todo.notas_e_rotinas_do_alexa_to_do_list";
const PROBLEMS = "todo.analise_dos_dispositivos_problem_list";
const svc = (service, service_data, entity_id = CASA) => ({ domain: "todo", service, service_data, target: { entity_id } });

let stack;
let c;
before(async () => {
  // a "day" of 400 ms for the repetitions (test hook of the dev mode)
  // started in UTC: the app must switch to Home Assistant's time zone (get_config)
  stack = await new Stack({ appEnv: { RESOLVIA_DAY_MS: "400", TZ: "UTC" } }).start();
  c = await stack.client({ "x-remote-user-id": "user-ana", "x-remote-user-display-name": "Ana Souza" });
});
after(() => stack && stack.stop());

const byName = async (entity, summary) => (await items(c, entity)).find((i) => i.summary === summary);

describe("connection and bootstrap", () => {
  it("answers ping", async () => {
    assert.equal(await c.call("ping"), "pong");
  });

  it("bootstrap: version, user, time zone, the to-do lists and their devices", async () => {
    const b = await c.call("resolvia/bootstrap");
    assert.equal(b.version, APP_VERSION);
    assert.deepEqual(b.user, { id: "user-ana", name: "Ana Souza" });
    assert.equal(b.time_zone, "America/Sao_Paulo", "Home Assistant's time zone, not the process's UTC");
    await stack.app.waitLine(/Fuso horário: America\/Sao_Paulo/);
    assert.deepEqual(Object.keys(b.states).sort(), [PROBLEMS, CASA, SHOP, TODO].sort());
    assert.equal(b.states[CASA].attributes.supported_features, 127);
    assert.deepEqual(b.entities[SHOP], { entity_id: SHOP, device_id: "dev_alexa", name: "Shopping list" });
    assert.equal(b.entities["light.sala"], undefined, "only to-do entities");
    assert.deepEqual(Object.keys(b.devices).sort(), ["dev_alexa", "dev_analise"], "only the devices of to-do lists");
    assert.equal(b.ai.ready, true);
  });

  it("unknown commands and bad entity ids are refused", async () => {
    await assert.rejects(c.call("resolvia/nope"), { code: "unknown_command" });
    await assert.rejects(c.call("todo/item/list", { entity_id: "light.sala" }), { code: "invalid_format" });
    await assert.rejects(c.call("todo/item/subscribe", { entity_id: "todo.Bad" }), { code: "invalid_format" });
    await assert.rejects(c.call("todo/item/move", { entity_id: "sensor.x", uid: "u1" }), { code: "invalid_format" });
  });

  it("a list Home Assistant does not know: its refusal comes back", async () => {
    await assert.rejects(c.call("todo/item/subscribe", { entity_id: "todo.nao_existe" }), { code: "invalid_entity_id" });
  });

  it("messages without a numeric id, or not JSON, are ignored (the connection keeps working)", async () => {
    c.ws.send("not json");
    c.ws.send(JSON.stringify({ type: "ping" }));
    c.ws.send(JSON.stringify({ type: "ping", id: "7" }));
    assert.equal(await c.call("ping"), "pong");
  });
});

describe("items through Home Assistant", () => {
  it("adds, completes, renames and removes an item", async () => {
    await c.call("call_service", svc("add_item", { item: "Comprar lâmpadas", due_date: "2026-12-01", description: "LED" }));
    let it1 = await byName(CASA, "Comprar lâmpadas");
    assert.deepEqual([it1.status, it1.due, it1.description], ["needs_action", "2026-12-01", "LED"]);
    await c.call("call_service", svc("update_item", { item: it1.uid, status: "completed", rename: "Comprar lâmpadas LED" }));
    it1 = await byName(CASA, "Comprar lâmpadas LED");
    assert.equal(it1.status, "completed");
    await c.call("call_service", svc("remove_item", { item: [it1.uid] }));
    assert.equal(await byName(CASA, "Comprar lâmpadas LED"), undefined);
  });

  it("Home Assistant's errors come back as they are", async () => {
    await assert.rejects(c.call("call_service", svc("update_item", { item: "não existe", status: "completed" })), { code: "service_validation_error", message: "Item not found" });
    await assert.rejects(c.call("call_service", svc("add_item", { item: "x", due_date: "2026-12-01" }, SHOP)), { code: "service_validation_error" });
  });

  it("only manages to-do lists, with the four item services", async () => {
    const refused = [
      { domain: "light", service: "turn_on", target: { entity_id: "light.sala" } },
      { domain: "todo", service: "get_items", target: { entity_id: CASA } },
      { domain: "todo", service: "add_item", target: { entity_id: ["todo.casa", "light.sala"] } },
      { domain: "todo", service: "add_item", target: {} },
      { domain: "todo", service: "add_item" },
    ];
    for (const msg of refused) await assert.rejects(c.call("call_service", { ...msg, service_data: { item: "x" } }), { code: "unauthorized" }, JSON.stringify(msg));
  });

  it("moves an item", async () => {
    const before = await items(c, TODO);
    await c.call("todo/item/move", { entity_id: TODO, uid: before[1].uid });
    const after = await items(c, TODO);
    assert.deepEqual(after.map((i) => i.uid), [before[1].uid, before[0].uid]);
  });

  it("item subscriptions: the current items, then every change, until unsubscribed", async () => {
    const sub = await c.subscribe("todo/item/subscribe", { entity_id: SHOP });
    await waitFor(() => sub.events.length >= 1, { what: "first items event" });
    assert.ok(sub.events[0].items.some((i) => i.summary === "Café"));
    await c.call("call_service", svc("add_item", { item: "Manteiga" }, SHOP));
    await waitFor(() => sub.events.some((e) => e.items.some((i) => i.summary === "Manteiga")), { what: "change event" });
    await c.call("unsubscribe_events", { subscription: sub.id });
    const n = sub.events.length;
    await c.call("call_service", svc("add_item", { item: "Queijo" }, SHOP));
    await byName(SHOP, "Queijo");
    await new Promise((r) => setTimeout(r, 150));
    assert.equal(sub.events.length, n, "no events after unsubscribing");
    await assert.rejects(c.call("unsubscribe_events", { subscription: 9999 }), { code: "not_found" });
  });

  it("list subscription: the new state of a list when it changes", async () => {
    const sub = await c.subscribe("resolvia/subscribe_lists");
    await c.call("call_service", svc("add_item", { item: "Ovos" }, SHOP));
    const ev = await waitFor(() => sub.events.find((e) => e.entity_id === SHOP), { what: "list state event" });
    assert.equal(ev.new_state.entity_id, SHOP);
    assert.match(ev.new_state.state, /^\d+$/);
    await c.call("unsubscribe_events", { subscription: sub.id });
  });
});

describe("preferences", () => {
  it("list and app preferences are kept and checked", async () => {
    let p = await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { name: " Minha Casa ", color: "menta", junk: 1 } });
    assert.deepEqual(p.lists[CASA], { name: "Minha Casa", color: "menta" });
    p = await c.call("resolvia/prefs/set_app", { prefs: { accent: "azul", ai_entity: "conversation.x", voice_engine: "stt.faster_whisper" } });
    assert.deepEqual(p.app, { accent: "azul", voice_engine: "stt.faster_whisper" });
    assert.deepEqual((await c.call("resolvia/prefs/get")).lists[CASA], { name: "Minha Casa", color: "menta" });
    await assert.rejects(c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { name: 5 } }), { message: "name must be text" });
    await assert.rejects(c.call("resolvia/prefs/set_list", { entity_id: "light.x", prefs: {} }), { message: "Not a to-do entity" });
    await c.call("resolvia/prefs/set_app", { prefs: { voice_engine: null } });
  });

  it("survive a restart of the app", async () => {
    await stack.restartApp();
    c = await stack.client({ "x-remote-user-id": "user-ana" });
    const p = await c.call("resolvia/prefs/get");
    assert.deepEqual(p.lists[CASA], { name: "Minha Casa", color: "menta" });
    assert.equal(p.app.accent, "azul");
  });
});

describe("the integration file (share/resolvia/integracao.json)", () => {
  it("lists without due dates are 'sem prazo'; deadlines on by default; no points while off", async () => {
    const p = await waitFor(() => stack.presence(), { what: "integracao.json" });
    assert.equal(p.app, "ResolvIA");
    assert.equal(p.versao, APP_VERSION);
    assert.ok(Date.now() - Date.parse(p.gravado_em) < 60_000);
    assert.deepEqual(p.sem_prazo.sort(), [PROBLEMS, SHOP, TODO].sort());
    assert.equal(p.prazos, true);
    assert.deepEqual(p.pontos, {});
    assert.equal("comodos" in p, false);
    assert.equal("equipamentos" in p, false);
  });

  it("follows 'dates are information', 'Controlar prazos' and the points", async () => {
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { dates_info: true } });
    await waitFor(() => stack.presence().sem_prazo.includes(CASA), { what: "casa sem prazo" });
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { dates_info: null } });
    await waitFor(() => !stack.presence().sem_prazo.includes(CASA), { what: "casa com prazo" });
    await c.call("resolvia/prefs/set_app", { prefs: { due_off: true } });
    await waitFor(() => stack.presence().prazos === false, { what: "prazos off" });
    await c.call("resolvia/prefs/set_app", { prefs: { due_off: false, points_on: true } });
    await c.call("resolvia/points/set", { entity_id: CASA, summary: "Passar pano na casa", points: 10 });
    await waitFor(() => stack.presence().pontos[CASA], { what: "points in the file" });
    assert.deepEqual(stack.presence().pontos, { [CASA]: { "passar pano na casa": 10 } });
    assert.equal(stack.presence().prazos, true);
  });
});

describe("repetitions", () => {
  it("a completed task with a rule comes back the next 'day', due today, and the file says how often it repeats", async () => {
    const task = await byName(CASA, "Passar pano na casa");
    const rules = await c.subscribe("resolvia/recurring/subscribe");
    await waitFor(() => rules.events.length >= 1, { what: "initial rules" });
    const rule = await c.call("resolvia/recurring/set", { entity_id: CASA, uid: task.uid, summary: task.summary, days: 1 });
    assert.equal(rule.days, 1);
    await waitFor(() => (stack.presence().repete[CASA] || {})[task.uid] === 1, { what: "repete in the file" });
    await c.call("call_service", svc("update_item", { item: task.uid, status: "completed" }));
    await waitFor(() => rules.events.some((e) => e.rules.some((r) => r.id === rule.id && r.reopen_at)), { what: "scheduled comeback" });
    const back = await waitFor(async () => {
      const i = await byName(CASA, "Passar pano na casa");
      return i && i.status === "needs_action" && i.due ? i : null;
    }, { what: "the task back" });
    assert.match(back.due, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(back.uid, task.uid, "the same item, unchecked");
    await waitFor(() => rules.events.at(-1).rules.find((r) => r.id === rule.id).reopen_at === null, { what: "rule reset" });
    await stack.app.waitLine(/De volta: "Passar pano na casa" \(todo\.casa\)/);
  });

  it("completed items cleared before their time: created again, and the new item's completion counts too", async () => {
    await c.call("call_service", svc("add_item", { item: "Lavar o quintal" }));
    const t1 = await byName(CASA, "Lavar o quintal");
    const rules = await c.subscribe("resolvia/recurring/subscribe");
    const rule = await c.call("resolvia/recurring/set", { entity_id: CASA, uid: t1.uid, summary: t1.summary, days: 1 });
    const ruleNow = () => rules.events.at(-1).rules.find((r) => r.id === rule.id);
    await c.call("call_service", svc("update_item", { item: t1.uid, status: "completed" }));
    await c.call("call_service", svc("remove_completed_items", {}));
    assert.equal(await byName(CASA, "Lavar o quintal"), undefined, "cleared");
    const t2 = await waitFor(async () => {
      const i = await byName(CASA, "Lavar o quintal");
      return i && i.status === "needs_action" ? i : null;
    }, { what: "created again" });
    assert.notEqual(t2.uid, t1.uid);
    // Home Assistant sends the new item before it answers add_item: the rule binds to it anyway
    await waitFor(() => ruleNow().uid === t2.uid, { what: "rule bound to the new item" });
    await c.call("call_service", svc("update_item", { item: t2.uid, status: "completed" }));
    await waitFor(() => ruleNow().reopen_at, { what: "the new item scheduled" });
    await waitFor(async () => (await byName(CASA, "Lavar o quintal")).status === "needs_action", { what: "back again" });
    await c.call("resolvia/recurring/set", { entity_id: CASA, uid: t2.uid, summary: t2.summary, days: 0 });
    await c.call("unsubscribe_events", { subscription: rules.id });
  });

  it("validation of rules", async () => {
    await assert.rejects(c.call("resolvia/recurring/set", { entity_id: CASA, uid: "x", days: 400 }), { message: /between 1 and 365/ });
    await assert.rejects(c.call("resolvia/recurring/set", { entity_id: "light.x", uid: "x", days: 2 }), { message: /Not a to-do entity/ });
  });

  it("the CronologIA takes tasks over (resolvia_esquecer): their repetition and points go", async () => {
    const task = await byName(CASA, "Passar pano na casa");
    assert.equal((await c.call("resolvia/points/get")).points[CASA]["passar pano na casa"], 10);
    await stack.fire("resolvia_esquecer", { entity_id: CASA, uids: [task.uid], tarefas: ["Passar pano na casa"], origem: "CronologIA" });
    await stack.app.waitLine(/Levadas para o CronologIA: 1 tarefas de todo\.casa \(1 repetições tiradas\)/);
    assert.deepEqual((await c.call("resolvia/points/get")).points, {});
    const rules = await c.subscribe("resolvia/recurring/subscribe");
    await waitFor(() => rules.events.length, { what: "rules" });
    assert.deepEqual(rules.events[0].rules, []);
    await waitFor(() => !stack.presence().repete[CASA], { what: "repete cleared" });
  });

  it("an item deleted while pending deletes its rule; recurring/clear removes them all", async () => {
    await c.call("call_service", svc("add_item", { item: "Regar a horta" }));
    const t1 = await byName(CASA, "Regar a horta");
    await c.call("resolvia/recurring/set", { entity_id: CASA, uid: t1.uid, summary: t1.summary, days: 3 });
    await c.call("call_service", svc("remove_item", { item: [t1.uid] }));
    await stack.app.waitLine(/Repetição removida \(item apagado\): "Regar a horta"/);
    await c.call("resolvia/recurring/set", { entity_id: CASA, summary: "Pagar conta de luz", days: 30 });
    assert.deepEqual(await c.call("resolvia/recurring/clear"), { removed: 1 });
  });
});

describe("static files", () => {
  it("serves the page with an ETag, and 304 when unchanged", async () => {
    const res = await fetch(`${stack.appUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type"), /text\/html/);
    assert.equal(res.headers.get("cache-control"), "no-cache");
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    const etag = res.headers.get("etag");
    assert.match(etag, /^"[0-9a-f]+-[0-9a-f.]+"$/);
    assert.match(await res.text(), /<html/i);
    const again = await fetch(`${stack.appUrl}/index.html`, { headers: { "if-none-match": etag } });
    assert.equal(again.status, 304);
    const head = await fetch(`${stack.appUrl}/resolvia.js`, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.match(head.headers.get("content-type"), /javascript/);
    assert.ok(Number(head.headers.get("content-length")) > 1000);
  });

  it("fonts are cached for a week; anything else is 404", async () => {
    const font = await fetch(`${stack.appUrl}/fonts/barlow-400.woff2`);
    assert.equal(font.status, 200);
    assert.equal(font.headers.get("content-type"), "font/woff2");
    assert.equal(font.headers.get("cache-control"), "public, max-age=604800");
    await font.arrayBuffer();
    for (const [method, url] of [["GET", "/fonts/nope.woff2"], ["GET", "/fonts/..%2Fserver.js"], ["GET", "/server.js"], ["GET", "/lib/store.js"], ["POST", "/"], ["DELETE", "/index.html"]]) {
      const r = await fetch(`${stack.appUrl}${url}`, { method });
      assert.equal(r.status, 404, `${method} ${url}`);
      await r.arrayBuffer();
    }
  });

  it("the WebSocket only answers at /ws", async () => {
    const ws = new WebSocket(`ws://127.0.0.1:${stack.appPort}/other`);
    const result = await new Promise((r) => {
      ws.onopen = () => r("open");
      ws.onerror = () => r("refused");
    });
    assert.equal(result, "refused");
  });
});
