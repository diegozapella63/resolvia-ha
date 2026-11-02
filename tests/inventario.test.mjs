import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Inventario } from "../resolvia/rootfs/app/lib/inventario.js";
import { tmpDir, fakeLog, httpServer, closedPort, json } from "./_helpers.mjs";

const KEY = "chave-secreta-123";
const COMODOS = [
  { id: "cozinha", nome: "Cozinha", itens: 4 },
  { id: "banho-1", nome: "Banheiro social", itens: "2" },
  { id: "bad id", nome: "Inválido" },
  { id: 7, nome: "Número" },
  { id: "sem_nome" },
  null,
  { id: "longo", nome: "L".repeat(80), itens: "x" },
];
const ITENS = [
  { id: "geladeira", nome: "Geladeira", comodo: "cozinha", zona: "Bancada" },
  { id: "chuveiro", nome: "Chuveiro", comodo: "banho-1" },
  { id: "solto", nome: "Furadeira", comodo: null, zona: null },
  { id: "sem-nome", nome: "" },
  { id: "x/y", nome: "Barra" },
  { id: "grande", nome: "N".repeat(200), comodo: "cozinha", zona: "Z".repeat(100) },
];

/** The InventarIA: answers what `routes` says; counts the calls. */
let srv;
let routes;
before(async () => {
  srv = await httpServer((req, res) => {
    if (req.headers.authorization !== `Bearer ${KEY}`) return json(res, 401, { error: "Chave inválida" });
    const r = routes[req.url];
    if (!r) return json(res, 404, { error: "não existe" });
    const [status, body] = typeof r === "function" ? r() : r;
    if (typeof body === "string") {
      res.writeHead(status, { "content-type": "text/plain" });
      return res.end(body);
    }
    json(res, status, body);
  });
});
after(() => srv.close());

function share(info) {
  const dir = tmpDir("resolvia-share-");
  if (info !== null) {
    fs.mkdirSync(path.join(dir, "inventario"), { recursive: true });
    fs.writeFileSync(path.join(dir, "inventario", "integracao.json"), typeof info === "string" ? info : JSON.stringify(info));
  }
  return dir;
}

function inv({ info = { url: srv.url, chave: KEY, versao: "1.15.0" }, rooms = true, items = false, r = {} } = {}) {
  routes = { "/api/integracao/comodos": [200, { versao: "1.15.0", comodos: COMODOS }], "/api/integracao/itens": [200, { itens: ITENS }], ...r };
  const log = fakeLog();
  let changes = 0;
  const flags = { rooms, items };
  const i = new Inventario({ shareDir: share(info), log, enabled: () => flags.rooms, items: () => flags.items, onChange: () => changes++ });
  return { i, log, flags, changes: () => changes };
}
const calls = () => srv.requests.map((r) => r.url);
const reset = () => (srv.requests.length = 0);

describe("Inventario.info: the connection file", () => {
  it("reads url and key from share/inventario/integracao.json", () => {
    const { i } = inv({ info: { url: "http://inventario:8097", ip_url: "http://172.30.33.5:8097", chave: "k", versao: "1.15.0" } });
    assert.deepEqual(i.info(), { url: "http://inventario:8097", ip_url: "http://172.30.33.5:8097", chave: "k", versao: "1.15.0" });
    assert.equal(i.file.endsWith(path.join("inventario", "integracao.json")), true);
  });

  it("is null without the file, with a broken file, or without url or key", () => {
    for (const info of [null, "{broken", "null", { url: "http://x" }, { chave: "k" }, { url: "", chave: "k" }]) {
      assert.equal(inv({ info }).i.info(), null, JSON.stringify(info));
    }
  });
});

describe("Inventario.refresh", () => {
  it("both switches off: only says whether the InventarIA is installed, calls nothing", async () => {
    reset();
    const on = inv({ rooms: false, items: false });
    assert.deepEqual(await on.i.refresh(), { encontrado: true, comodos: [], itens: [], erro: null, versao: null, at: null });
    const off = inv({ info: null, rooms: false, items: false });
    assert.equal((await off.i.refresh()).encontrado, false);
    assert.deepEqual(calls(), []);
  });

  it("on but not installed: not found, no error", async () => {
    const { i } = inv({ info: null });
    assert.deepEqual(await i.refresh(), { encontrado: false, comodos: [], itens: [], erro: null, versao: null, at: null });
  });

  it("reads the rooms with the key, cleaning what came", async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: Date.UTC(2026, 10, 2, 12, 0, 0) });
    reset();
    const { i } = inv();
    const st = await i.refresh();
    assert.deepEqual(st, {
      encontrado: true,
      comodos: [
        { id: "cozinha", nome: "Cozinha", itens: 4 },
        { id: "banho-1", nome: "Banheiro social", itens: 2 },
        { id: "sem_nome", nome: "sem_nome", itens: 0 },
        { id: "longo", nome: "L".repeat(60), itens: 0 },
      ],
      itens: [],
      erro: null,
      versao: "1.15.0",
      at: "2026-11-02T12:00:00.000Z",
    });
    assert.deepEqual(calls(), ["/api/integracao/comodos"], "no items while the equipment is off");
    const req = srv.requests[0];
    assert.equal(req.headers.authorization, `Bearer ${KEY}`);
    assert.equal(req.headers["x-app"], "ResolvIA");
    assert.equal(req.method, "GET");
  });

  it("with the equipment on, also reads the items (even with the rooms off)", async () => {
    reset();
    const { i } = inv({ rooms: false, items: true });
    const st = await i.refresh();
    assert.deepEqual(calls(), ["/api/integracao/comodos", "/api/integracao/itens"]);
    assert.deepEqual(st.itens, [
      { id: "geladeira", nome: "Geladeira", comodo: "cozinha", zona: "Bancada" },
      { id: "chuveiro", nome: "Chuveiro", comodo: "banho-1", zona: "" },
      { id: "solto", nome: "Furadeira", comodo: "", zona: "" },
      { id: "grande", nome: "N".repeat(120), comodo: "cozinha", zona: "Z".repeat(60) },
    ]);
    assert.equal(st.comodos.length, 4, "the rooms come too: the equipment is grouped by them");
    assert.equal(st.erro, null);
  });

  it("an InventarIA without the items route (404) asks for 1.15.0, keeping the items read before", async () => {
    const s = inv({ items: true });
    await s.i.refresh();
    assert.equal(s.i.state.itens.length, 4);
    routes["/api/integracao/itens"] = [404, { error: "Not found" }];
    const st = await s.i.refresh();
    assert.equal(st.erro, "Para os equipamentos, atualize o InventarIA (1.15.0 ou mais nova).");
    assert.equal(st.itens.length, 4);
    assert.equal(st.comodos.length, 4);
    const fresh = inv({ items: true, r: { "/api/integracao/itens": [404, {}] } });
    assert.deepEqual((await fresh.i.refresh()).itens, []);
  });

  it("other errors of the items route are shown as they came", async () => {
    const { i } = inv({ items: true, r: { "/api/integracao/itens": [500, { error: "Banco ocupado" }] } });
    const st = await i.refresh();
    assert.equal(st.erro, "Banco ocupado");
    assert.equal(st.encontrado, true);
    const plain = inv({ items: true, r: { "/api/integracao/itens": [503, "Service Unavailable"] } });
    assert.equal((await plain.i.refresh()).erro, "O InventarIA respondeu 503");
  });

  it("a failure keeps the rooms read before (a restart of the InventarIA does not empty the tasks), and warns once", async () => {
    const s = inv();
    await s.i.refresh();
    routes["/api/integracao/comodos"] = [500, { error: "Reiniciando" }];
    const st = await s.i.refresh();
    assert.equal(st.erro, "Reiniciando");
    assert.equal(st.encontrado, true);
    assert.equal(st.comodos.length, 4);
    await s.i.refresh();
    assert.deepEqual(s.log.of("warn"), ["InventarIA: Reiniciando"], "the same error is logged once");
    routes["/api/integracao/comodos"] = [200, { comodos: [{ id: "sala", nome: "Sala" }] }];
    const ok = await s.i.refresh();
    assert.equal(ok.erro, null);
    assert.equal(ok.versao, null);
    assert.deepEqual(ok.comodos, [{ id: "sala", nome: "Sala", itens: 0 }]);
    routes["/api/integracao/comodos"] = [500, { error: "Reiniciando" }];
    await s.i.refresh();
    assert.equal(s.log.of("warn").length, 2, "after a success, the error is logged again");
  });

  it("a wrong key is an error of the InventarIA", async () => {
    const { i } = inv({ info: { url: srv.url, chave: "errada" } });
    assert.equal((await i.refresh()).erro, "Chave inválida");
  });

  it("tries ip_url when url does not answer", async () => {
    reset();
    const dead = await closedPort();
    const { i } = inv({ info: { url: `http://127.0.0.1:${dead}`, ip_url: srv.url, chave: KEY } });
    const st = await i.refresh();
    assert.equal(st.erro, null);
    assert.equal(st.comodos.length, 4);
    assert.deepEqual(calls(), ["/api/integracao/comodos"]);
  });

  it("does not try ip_url when url answered with an error", async () => {
    reset();
    const other = await httpServer((req, res) => json(res, 403, { error: "Proibido" }));
    try {
      const { i } = inv({ info: { url: other.url, ip_url: srv.url, chave: KEY } });
      assert.equal((await i.refresh()).erro, "Proibido");
      assert.deepEqual(calls(), [], "the second address was not called");
    } finally {
      await other.close();
    }
  });

  it("neither address answers: the network error is kept", async () => {
    const dead = await closedPort();
    const { i } = inv({ info: { url: `http://127.0.0.1:${dead}`, ip_url: `http://127.0.0.1:${dead}`, chave: KEY } });
    const st = await i.refresh();
    assert.equal(st.encontrado, true);
    assert.ok(st.erro, "some error message");
    assert.deepEqual(st.comodos, []);
  });

  it("a non-JSON success counts as no rooms", async () => {
    const { i } = inv({ r: { "/api/integracao/comodos": [200, "ok"] } });
    const st = await i.refresh();
    assert.deepEqual(st.comodos, []);
    assert.equal(st.erro, null);
  });

  it("calls onChange when the state changed, not when it stayed the same", async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: Date.UTC(2026, 10, 2, 12, 0, 0) });
    const s = inv();
    await s.i.refresh();
    assert.equal(s.changes(), 1);
    await s.i.refresh();
    assert.equal(s.changes(), 1, "same data at the same time: no change");
    routes["/api/integracao/comodos"] = [200, { comodos: [{ id: "sala", nome: "Sala" }] }];
    await s.i.refresh();
    assert.equal(s.changes(), 2);
    s.flags.rooms = false;
    await s.i.refresh();
    assert.equal(s.changes(), 3, "turning off empties the state");
  });

  it("refreshes running at the same time share one request", async () => {
    reset();
    const { i } = inv();
    const [a, b] = [i.refresh(), i.refresh()];
    assert.equal(a, b);
    await a;
    assert.equal(srv.requests.length, 1);
    assert.equal(i.busy, null);
    await i.refresh();
    assert.equal(srv.requests.length, 2, "a later refresh asks again");
  });

  it("request() without the file fails with no_inventario", async () => {
    const { i } = inv({ info: null });
    await assert.rejects(i.request("/api/integracao/comodos"), { code: "no_inventario", message: /1\.14\.0/ });
  });

  it("start() refreshes now and every 10 minutes", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    const { i } = inv();
    const refresh = t.mock.method(i, "refresh", () => Promise.resolve());
    i.start();
    assert.equal(refresh.mock.callCount(), 1);
    t.mock.timers.tick(10 * 60 * 1000);
    assert.equal(refresh.mock.callCount(), 2);
    clearInterval(i.timer);
  });
});

describe("Inventario labels", () => {
  it("names an item with its room, for the AI and the pickers", async () => {
    const { i } = inv({ items: true });
    await i.refresh();
    assert.equal(i.nameOf("cozinha"), "Cozinha");
    assert.equal(i.nameOf("nada"), null);
    assert.equal(i.itemLabel(i.state.itens[0]), "Geladeira (Cozinha)");
    assert.equal(i.itemLabel(i.state.itens[2]), "Furadeira", "an item without a room");
    assert.equal(i.itemLabel({ nome: "Fantasma", comodo: "sumiu" }), "Fantasma");
  });
});
