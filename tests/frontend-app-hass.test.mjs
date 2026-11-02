// frontend/src/app-hass.js: the hass-like object over the app's own websocket (inside the Home Assistant app),
// with reconnection, queued messages, subscriptions and the fetch calls (Falar, IA, Dados).
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

class FakeWS {
  static all = [];
  constructor(url) {
    this.url = url;
    this.sent = [];
    FakeWS.all.push(this);
  }
  send(t) {
    this.sent.push(JSON.parse(t));
  }
  open() {
    this.onopen();
  }
  reply(o) {
    this.onmessage({ data: typeof o === "string" ? o : JSON.stringify(o) });
  }
  ok(id, result) {
    this.reply({ type: "result", id, success: true, result });
  }
  drop() {
    this.onclose();
  }
  last(type) {
    return [...this.sent].reverse().find((m) => m.type === type);
  }
}
globalThis.window = globalThis;
globalThis.location = { href: "https://casa.example/api/hassio_ingress/abc/", protocol: "https:" };
globalThis.WebSocket = FakeWS;
const { createAppHass, appEnv } = await import("../frontend/src/app-hass.js");

const BOOT = { version: "2.30.2", states: { "todo.casa": { state: "2" } }, entities: { e: 1 }, devices: { d: 1 }, user: { name: "Ana" }, ai: { ready: true, images: true, entities: [] } };
async function start(boot = BOOT) {
  const changes = [];
  const pr = createAppHass((h) => changes.push(h));
  const ws = FakeWS.all.at(-1);
  ws.open();
  ws.ok(ws.last("resolvia/bootstrap").id, boot);
  const hass = await pr;
  return { hass, ws, changes, last: () => changes.at(-1) || hass };
}

beforeEach(() => {
  FakeWS.all = [];
  window.parent = window;
  mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
});
afterEach(() => {
  mock.timers.reset();
  delete globalThis.fetch;
});

describe("app-hass: connecting", () => {
  it("opens ws(s) next to the page and builds hass from the bootstrap", async () => {
    const { hass, ws } = await start();
    assert.equal(ws.url, "wss://casa.example/api/hassio_ingress/abc/ws");
    assert.deepEqual(hass.states, BOOT.states);
    assert.deepEqual([hass.version, hass.user.name, hass.user.is_admin, hass.language, hass.connected], ["2.30.2", "Ana", true, "pt-BR", true]);
    assert.equal(hass.resolvia.ai.ready, true);
    assert.equal(hass.themes.darkMode, false);
    assert.equal(ws.last("resolvia/subscribe_lists").type, "resolvia/subscribe_lists");
  });
  it("http: ws://; an empty bootstrap gives empty maps and the AI off", async () => {
    location.protocol = "http:";
    const { hass, ws } = await start({ version: "1" });
    location.protocol = "https:";
    assert.match(ws.url, /^ws:\/\//);
    assert.deepEqual([hass.states, hass.entities, hass.devices, hass.user.name], [{}, {}, {}, ""]);
    assert.deepEqual(hass.resolvia.ai, { ready: false, images: false, entities: [] });
  });
  it("messages sent before the socket opens wait and go in order", async () => {
    const pr = createAppHass(() => {});
    const ws = FakeWS.all.at(-1);
    assert.equal(ws.sent.length, 0);
    ws.open();
    assert.equal(ws.sent[0].type, "resolvia/bootstrap");
    ws.ok(ws.sent[0].id, BOOT);
    await pr;
  });
});

describe("app-hass: calls", () => {
  it("callWS resolves with the result; a failure rejects with the message and code", async () => {
    const { hass, ws } = await start();
    const a = hass.callWS({ type: "resolvia/points/get" });
    ws.ok(ws.last("resolvia/points/get").id, { on: true });
    assert.deepEqual(await a, { on: true });
    const b = hass.callWS({ type: "x" });
    ws.reply({ type: "result", id: ws.last("x").id, success: false, error: { code: "not_found", message: "Lista não encontrada" } });
    await assert.rejects(b, (e) => e.message === "Lista não encontrada" && e.code === "not_found");
    const c = hass.callWS({ type: "y" });
    ws.reply({ type: "result", id: ws.last("y").id, success: false });
    await assert.rejects(c, /Falhou/);
  });
  it("callService becomes call_service with the data and the target", async () => {
    const { hass, ws } = await start();
    const p = hass.callService("todo", "add_item", { item: "leite" }, { entity_id: "todo.casa" });
    const m = ws.last("call_service");
    assert.deepEqual({ ...m, id: 0 }, { type: "call_service", domain: "todo", service: "add_item", service_data: { item: "leite" }, target: { entity_id: "todo.casa" }, id: 0 });
    ws.ok(m.id, null);
    await p;
    hass.callService("todo", "x");
    assert.deepEqual(ws.last("call_service").service_data, {});
  });
  it("garbage and answers to nobody are ignored", async () => {
    const { ws } = await start();
    ws.reply("not json {");
    ws.reply({ type: "result", id: 999, success: true });
    ws.reply({ type: "event", id: 999, event: {} });
  });
  it("the resolvia helpers ask the right messages", async () => {
    const { hass, ws } = await start();
    hass.resolvia.aiStatus();
    hass.resolvia.voiceStatus();
    hass.resolvia.voiceStatus(true);
    hass.resolvia.data.versions();
    hass.resolvia.data.restoreVersion("v1");
    hass.resolvia.data.backups();
    hass.resolvia.data.createBackup();
    hass.resolvia.data.restoreBackup("b.zip");
    assert.deepEqual(ws.sent.slice(2).map(({ id, ...m }) => m), [
      { type: "resolvia/ai/status" },
      { type: "resolvia/voice/status" },
      { type: "resolvia/voice/status", fresh: true },
      { type: "resolvia/versions/list" },
      { type: "resolvia/versions/restore", name: "v1" },
      { type: "resolvia/backups/list" },
      { type: "resolvia/backups/create" },
      { type: "resolvia/backups/restore", name: "b.zip" },
    ]);
    assert.equal(hass.resolvia.data.url("csv"), "https://casa.example/api/hassio_ingress/abc/api/export/csv");
  });
});

describe("app-hass: the list states", () => {
  it("events add, change and remove lists, and each change reaches the panel", async () => {
    const { ws, changes, last } = await start();
    const sub = ws.last("resolvia/subscribe_lists");
    ws.ok(sub.id, null);
    ws.reply({ type: "event", id: sub.id, event: { entity_id: "todo.mercado", new_state: { state: "1" } } });
    ws.reply({ type: "event", id: sub.id, event: { entity_id: "todo.casa", new_state: null } });
    assert.deepEqual(Object.keys(last().states), ["todo.mercado"]);
    assert.equal(changes.length, 2);
  });
});

describe("app-hass: reconnecting", () => {
  it("a drop rejects what was waiting, marks offline, and retries after 1 s, 2 s, 4 s… up to 15 s", async () => {
    const { hass, ws, last } = await start();
    const waiting = hass.callWS({ type: "lento" });
    ws.drop();
    await assert.rejects(waiting, (e) => e.code === "disconnected" && e.message === "Sem conexão com o ResolvIA");
    assert.equal(last().connected, false);
    assert.equal(FakeWS.all.length, 1);
    mock.timers.tick(999);
    assert.equal(FakeWS.all.length, 1);
    mock.timers.tick(1);
    assert.equal(FakeWS.all.length, 2);
    // failing again (never opened): 2 s, 4 s, 8 s, 15 s, 15 s
    const waits = [];
    for (let k = 0; k < 5; k++) {
      const n = FakeWS.all.length;
      FakeWS.all.at(-1).drop();
      let t = 0;
      while (FakeWS.all.length === n) {
        mock.timers.tick(500);
        t += 500;
      }
      waits.push(t);
    }
    assert.deepEqual(waits, [2000, 4000, 8000, 15000, 15000]);
  });
  it("back online: sends what was queued, subscribes again, reloads the lists and resets the wait", async () => {
    const { hass, ws, last } = await start();
    const sub = ws.last("resolvia/subscribe_lists");
    ws.ok(sub.id, null);
    ws.drop();
    const queued = hass.callWS({ type: "na-fila" });
    mock.timers.tick(1000);
    const ws2 = FakeWS.all.at(-1);
    ws2.open();
    assert.deepEqual(ws2.sent.map((m) => m.type), ["resolvia/subscribe_lists", "na-fila", "resolvia/bootstrap"]);
    assert.equal(last().connected, true);
    ws2.ok(ws2.last("na-fila").id, "ok");
    assert.equal(await queued, "ok");
    ws2.ok(ws2.last("resolvia/bootstrap").id, { ...BOOT, states: { "todo.nova": {} } });
    await new Promise((r) => setImmediate(r));
    assert.deepEqual(Object.keys(last().states), ["todo.nova"]);
    // the subscription works on the new socket
    const sub2 = ws2.last("resolvia/subscribe_lists");
    ws2.reply({ type: "event", id: sub2.id, event: { entity_id: "todo.x", new_state: { state: "0" } } });
    assert.ok("todo.x" in last().states);
    // and the wait starts again from 1 s
    ws2.drop();
    mock.timers.tick(1000);
    assert.equal(FakeWS.all.length, 3);
  });
  it("a reload that fails after reconnecting waits for the next one", async () => {
    const { ws, last } = await start();
    ws.drop();
    mock.timers.tick(1000);
    const ws2 = FakeWS.all.at(-1);
    ws2.open();
    ws2.reply({ type: "result", id: ws2.last("resolvia/bootstrap").id, success: false, error: { message: "x" } });
    await new Promise((r) => setImmediate(r));
    assert.deepEqual(last().states, BOOT.states);
  });
});

describe("app-hass: subscriptions", () => {
  it("unsubscribing stops the events and tells the server", async () => {
    const { hass, ws } = await start();
    const got = [];
    const p = hass.connection.subscribeMessage((e) => got.push(e), { type: "resolvia/subscribe_x" });
    const m = ws.last("resolvia/subscribe_x");
    ws.ok(m.id, null);
    const unsub = await p;
    ws.reply({ type: "event", id: m.id, event: 1 });
    await unsub();
    ws.reply({ type: "event", id: m.id, event: 2 });
    assert.deepEqual(got, [1]);
    assert.deepEqual({ ...ws.last("unsubscribe_events"), id: 0 }, { type: "unsubscribe_events", subscription: m.id, id: 0 });
  });
  it("a subscription the server refuses rejects; one made while offline starts when online", async () => {
    const { hass, ws } = await start();
    const p = hass.connection.subscribeMessage(() => {}, { type: "resolvia/nope" });
    ws.reply({ type: "result", id: ws.last("resolvia/nope").id, success: false, error: { message: "Proibido" } });
    await assert.rejects(p, /Proibido/);
    ws.drop();
    const q = hass.connection.subscribeMessage(() => {}, { type: "resolvia/later" });
    mock.timers.tick(1000);
    const ws2 = FakeWS.all.at(-1);
    ws2.open();
    ws2.ok(ws2.last("resolvia/later").id, null);
    const unsub = await q;
    ws2.drop();
    await unsub(); // offline: nothing to tell
  });
});

describe("app-hass: fetch calls", () => {
  const reply = (status, body) => async (url, opts) => {
    reply.last = { url: String(url), opts };
    return { ok: status < 400, status, json: async () => (body === undefined ? Promise.reject(new Error("no json")) : body) };
  };
  it("voiceText posts the audio bytes; an error carries the code", async () => {
    const { hass } = await start();
    globalThis.fetch = reply(200, { text: "comprar leite" });
    const pcm = new Int16Array([1, 2, 3, 4]).subarray(1, 3);
    assert.deepEqual(await hass.resolvia.voiceText(pcm), { text: "comprar leite" });
    assert.equal(reply.last.url, "https://casa.example/api/hassio_ingress/abc/api/voice");
    assert.equal(reply.last.opts.body.byteLength, 4, "only the samples of the view");
    globalThis.fetch = reply(503, { error: "Sem STT", code: "no_stt" });
    await assert.rejects(hass.resolvia.voiceText(pcm), (e) => e.message === "Sem STT" && e.code === "no_stt");
    globalThis.fetch = reply(500);
    await assert.rejects(hass.resolvia.voiceText(pcm), /Erro 500/);
  });
  it("extract posts JSON; errors become Error with the code", async () => {
    const { hass } = await start();
    globalThis.fetch = reply(200, { items: [] });
    await hass.resolvia.extract({ text: "a, b" });
    assert.equal(reply.last.opts.body, JSON.stringify({ text: "a, b" }));
    globalThis.fetch = reply(429, { error: "Sem cota", code: "quota" });
    await assert.rejects(hass.resolvia.extract({}), (e) => e.code === "quota");
    globalThis.fetch = reply(502);
    await assert.rejects(hass.resolvia.extract({}), /Erro 502/);
  });
  it("import sends the file with its name", async () => {
    const { hass } = await start();
    globalThis.fetch = reply(200, { added: 1 });
    const file = { name: "cópia de segurança.zip" };
    assert.deepEqual(await hass.resolvia.data.import(file), { added: 1 });
    assert.equal(reply.last.opts.headers["x-file-name"], encodeURIComponent("cópia de segurança.zip"));
    assert.equal(reply.last.opts.body, file);
    globalThis.fetch = reply(400, { error: "Arquivo inválido" });
    await assert.rejects(hass.resolvia.data.import({}), /Arquivo inválido/);
    globalThis.fetch = reply(413);
    await assert.rejects(hass.resolvia.data.import({}), /Erro 413/);
  });
});

describe("app-hass: inside the Home Assistant", () => {
  const parent = (over = {}) => {
    const p = { events: [], pushed: [], document: { querySelector: () => ({ hass: { user: { name: "Beto", is_admin: false }, themes: { darkMode: true } } }) }, history: { pushState: (...a) => p.pushed.push(a) }, dispatchEvent: (e) => p.events.push(e), CustomEvent: class { constructor(type, o) { this.type = type; this.detail = o.detail; } }, ...over };
    return p;
  };
  it("the user and the dark mode come from the Home Assistant around", async () => {
    window.parent = parent();
    const { hass } = await start();
    assert.deepEqual([hass.user.name, hass.user.is_admin, hass.themes.darkMode], ["Beto", false, true]);
  });
  it("the dark mode follows the Home Assistant (checked every 1.5 s)", async () => {
    const p = parent();
    window.parent = p;
    const { last } = await start();
    p.document.querySelector = () => ({ hass: { themes: { darkMode: false } } });
    mock.timers.tick(1500);
    assert.equal(last().themes.darkMode, false);
  });
  it("another origin (no access): falls back to the bootstrap user", async () => {
    window.parent = { get document() { throw new Error("cross-origin"); } };
    const { hass } = await start();
    assert.deepEqual([hass.user.name, hass.user.is_admin], ["Ana", true]);
  });
  it("appEnv: no top bar inside the Home Assistant; haptics and navigation go to it", () => {
    const p = parent();
    window.parent = p;
    const env = appEnv();
    assert.equal(env.topbar, false);
    env.haptic("success");
    env.openInHA("/cronologia");
    assert.deepEqual(p.events.map((e) => [e.type, e.detail]), [["haptic", "success"], ["location-changed", { replace: false }]]);
    assert.deepEqual(p.pushed, [[null, "", "/cronologia"]]);
  });
  it("appEnv alone (a browser tab): top bar, no haptics, links open on top", () => {
    window.parent = window;
    const opened = [];
    window.open = (...a) => opened.push(a);
    const env = appEnv();
    assert.equal(env.topbar, true);
    env.haptic("light");
    env.openInHA("/config");
    assert.deepEqual(opened, [["/config", "_top"]]);
    window.parent = { dispatchEvent() { throw new Error("cross-origin"); }, get document() { throw new Error("x"); } };
    appEnv().haptic("x");
    appEnv().openInHA("/y");
    assert.equal(opened.length, 2);
  });
});
