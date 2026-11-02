// Cômodos e equipamentos do InventarIA: a stub InventarIA (local HTTP server) found
// through share/inventario/integracao.json, the links of each task, the event of the
// CronologIA, the integration file and the AI reading with rooms and equipment.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor } from "./_harness.mjs";
import { httpServer, json } from "../_helpers.mjs";

const CASA = "todo.casa";
const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const KEY = "chave-do-inventaria";
const COMODOS = [
  { id: "cozinha", nome: "Cozinha", itens: 3 },
  { id: "banheiro", nome: "Banheiro", itens: 1 },
  { id: "quarto", nome: "Quarto", itens: 2 },
];
const ITENS = [
  { id: "pia_1", nome: "Pia", comodo: "cozinha", zona: "Bancada" },
  { id: "geladeira_1", nome: "Geladeira", comodo: "cozinha" },
  { id: "chuveiro_1", nome: "Chuveiro", comodo: "banheiro", zona: "Box" },
  { id: "ar_1", nome: "Ar-condicionado", comodo: "quarto" },
];

let stack;
let inv;
let c;
let mode = "ok"; // ok | old (no items route) | down
before(async () => {
  inv = await httpServer((req, res) => {
    if (req.headers.authorization !== `Bearer ${KEY}`) return json(res, 401, { error: "Chave inválida" });
    if (mode === "down") return json(res, 503, { error: "InventarIA reiniciando" });
    if (req.url === "/api/integracao/comodos") return json(res, 200, { versao: "1.15.0", comodos: COMODOS });
    if (req.url === "/api/integracao/itens" && mode === "ok") return json(res, 200, { itens: ITENS });
    json(res, 404, { error: "Not found" });
  });
  stack = new Stack();
  stack.writeShare("inventario/integracao.json", { url: inv.url, chave: KEY, versao: "1.15.0" });
  await stack.start();
  c = await stack.client();
});
after(async () => {
  if (stack) await stack.stop();
  if (inv) await inv.close();
});

const rooms = () => c.call("resolvia/rooms/get");
const extract = async (body) => {
  const res = await fetch(`${stack.appUrl}/api/extract`, { method: "POST", body: JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};

describe("off (the default)", () => {
  it("says the InventarIA is there, reads nothing, refuses links", async () => {
    const r = await rooms();
    assert.deepEqual(r, { on: false, equips_on: false, encontrado: true, comodos: [], itens: [], erro: null, versao: null, at: null, map: {}, emap: {} });
    assert.equal(inv.requests.length, 0, "nothing asked while off");
    await assert.rejects(c.call("resolvia/rooms/set", { entity_id: CASA, summary: "x", room: "cozinha" }), { code: "rooms_off" });
    await assert.rejects(c.call("resolvia/equips/set", { entity_id: CASA, summary: "x", equip: "pia_1" }), { code: "equips_off" });
  });
});

describe("rooms", () => {
  it("turning them on reads the rooms with the key", async () => {
    await c.call("resolvia/prefs/set_app", { prefs: { rooms_on: true } });
    const r = await waitFor(async () => {
      const x = await rooms();
      return x.comodos.length ? x : null;
    }, { what: "rooms read" });
    assert.equal(r.on, true);
    assert.deepEqual(r.comodos, COMODOS);
    assert.equal(r.versao, "1.15.0");
    assert.deepEqual(r.itens, []);
    assert.equal(inv.requests.at(-1).headers["x-app"], "ResolvIA");
    assert.ok(!inv.requests.some((q) => q.url === "/api/integracao/itens"), "no items while the equipment is off");
  });

  it("sets, renames and clears the room of a task (by its folded name)", async () => {
    let r = await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "Trocar filtro do ar", room: "quarto" });
    assert.deepEqual(r.map, { [CASA]: { "trocar filtro do ar": "quarto" } });
    r = await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "Trocar o filtro do Ar", room: "quarto", previous_summary: "Trocar filtro do ar" });
    assert.deepEqual(r.map, { [CASA]: { "trocar o filtro do ar": "quarto" } });
    await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "Lavar a louça", room: "cozinha" });
    r = await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "LAVAR A LOUCA", room: null });
    assert.deepEqual(r.map, { [CASA]: { "trocar o filtro do ar": "quarto" } });
    await assert.rejects(c.call("resolvia/rooms/set", { entity_id: CASA, summary: "x", room: "sala de estar" }), { message: "Cômodo inválido" });
    await assert.rejects(c.call("resolvia/rooms/set", { entity_id: CASA, summary: "", room: "sala" }), { message: "Task name required" });
  });

  it("the integration file shares the rooms and the room of each task", async () => {
    const p = await waitFor(() => stack.presence().comodos, { what: "comodos in the file" });
    assert.deepEqual(p.lista, COMODOS.map(({ id, nome }) => ({ id, nome })));
    assert.deepEqual(p.tarefas, { [CASA]: { "trocar o filtro do ar": "quarto" } });
  });
});

describe("equipment", () => {
  it("turning it on also reads the items", async () => {
    await c.call("resolvia/prefs/set_app", { prefs: { equips_on: true } });
    const r = await waitFor(async () => {
      const x = await rooms();
      return x.itens.length ? x : null;
    }, { what: "items read" });
    assert.equal(r.equips_on, true);
    assert.deepEqual(r.itens, [
      { id: "pia_1", nome: "Pia", comodo: "cozinha", zona: "Bancada" },
      { id: "geladeira_1", nome: "Geladeira", comodo: "cozinha", zona: "" },
      { id: "chuveiro_1", nome: "Chuveiro", comodo: "banheiro", zona: "Box" },
      { id: "ar_1", nome: "Ar-condicionado", comodo: "quarto", zona: "" },
    ]);
  });

  it("sets and renames the equipment of a task, apart from its room", async () => {
    let r = await c.call("resolvia/equips/set", { entity_id: CASA, summary: "Trocar o filtro do ar", equip: "ar_1" });
    assert.deepEqual(r.emap, { [CASA]: { "trocar o filtro do ar": "ar_1" } });
    r = await c.call("resolvia/equips/set", { entity_id: CASA, summary: "Limpar o filtro do ar", equip: "ar_1", previous_summary: "Trocar o filtro do ar" });
    assert.deepEqual(r.emap, { [CASA]: { "limpar o filtro do ar": "ar_1" } });
    assert.deepEqual(r.map, { [CASA]: { "trocar o filtro do ar": "quarto" } }, "the room is a separate link");
    await assert.rejects(c.call("resolvia/equips/set", { entity_id: CASA, summary: "x", equip: "a b" }), { message: "Equipamento inválido" });
  });

  it("the integration file lists the items with their room name", async () => {
    const p = await waitFor(() => stack.presence().equipamentos, { what: "equipamentos in the file" });
    assert.deepEqual(p.lista, [
      { id: "pia_1", nome: "Pia", comodo: "Cozinha" },
      { id: "geladeira_1", nome: "Geladeira", comodo: "Cozinha" },
      { id: "chuveiro_1", nome: "Chuveiro", comodo: "Banheiro" },
      { id: "ar_1", nome: "Ar-condicionado", comodo: "Quarto" },
    ]);
    assert.deepEqual(p.tarefas, { [CASA]: { "limpar o filtro do ar": "ar_1" } });
  });
});

describe("the CronologIA creates a task with a room and an equipment (resolvia_comodo)", () => {
  it("keeps both links", async () => {
    await stack.fire("resolvia_comodo", { entity_id: CASA, tarefa: "Desentupir a pia", comodo: "cozinha", equipamento: "pia_1", origem: "CronologIA" });
    const r = await waitFor(async () => {
      const x = await rooms();
      return x.map[CASA]["desentupir a pia"] ? x : null;
    }, { what: "room from the event" });
    assert.equal(r.map[CASA]["desentupir a pia"], "cozinha");
    assert.equal(r.emap[CASA]["desentupir a pia"], "pia_1");
  });

  it("an empty room or equipment removes the link; a missing field leaves it", async () => {
    await stack.fire("resolvia_comodo", { entity_id: CASA, tarefa: "Desentupir a pia", comodo: "" });
    const r = await waitFor(async () => {
      const x = await rooms();
      return !x.map[CASA]["desentupir a pia"] ? x : null;
    }, { what: "room removed" });
    assert.equal(r.emap[CASA]["desentupir a pia"], "pia_1", "no 'equipamento' field: kept");
  });

  it("ignores events of other entities or without a task, and logs invalid ids", async () => {
    await stack.fire("resolvia_comodo", { entity_id: "light.sala", tarefa: "x", comodo: "cozinha" });
    await stack.fire("resolvia_comodo", { entity_id: CASA, comodo: "cozinha" });
    await stack.fire("resolvia_comodo", { entity_id: CASA, tarefa: "Algo", comodo: "não vale", origem: "Teste" });
    await stack.app.waitLine(/Cômodo vindo do Teste: Cômodo inválido/);
    const r = await rooms();
    assert.equal(r.map["light.sala"], undefined);
    assert.equal(r.map[CASA].algo, undefined);
  });

  it("taken over by the CronologIA (resolvia_esquecer): the room and the equipment go too", async () => {
    await stack.fire("resolvia_comodo", { entity_id: CASA, tarefa: "Limpar o ralo", comodo: "cozinha", equipamento: "pia_1", origem: "CronologIA" });
    await waitFor(async () => ((await rooms()).emap[CASA] || {})["limpar o ralo"], { what: "links of the new task" });
    await stack.fire("resolvia_esquecer", { entity_id: CASA, uids: [], tarefas: ["Limpar o ralo"], origem: "CronologIA" });
    const r = await waitFor(async () => {
      const x = await rooms();
      return !(x.map[CASA] || {})["limpar o ralo"] && !(x.emap[CASA] || {})["limpar o ralo"] ? x : null;
    }, { what: "links removed" });
    assert.equal((r.map[CASA] || {})["limpar o ralo"], undefined);
    assert.equal((r.emap[CASA] || {})["limpar o ralo"], undefined);
  });
});

describe("AI reading with lists, rooms and equipment", () => {
  it("each item comes with its list, room and equipment (as ids)", async () => {
    const { status, body } = await extract({
      text: "Desentupir a pia\nTrocar a resistência do chuveiro\nComprar leite",
      list_name: "Casa",
      lists: [
        { id: CASA, name: "Casa" },
        { id: SHOP, name: "Shopping list" },
        { id: "light.x", name: "Não é lista" },
      ],
    });
    assert.equal(status, 200);
    assert.deepEqual(body.items, ["Desentupir a pia", "Trocar a resistência do chuveiro", "Comprar leite"]);
    assert.deepEqual(body.lists, [CASA, CASA, SHOP]);
    assert.deepEqual(body.rooms, ["cozinha", null, null]);
    assert.deepEqual(body.equips, ["pia_1", "chuveiro_1", null]);
    assert.equal(body.provider, "Google AI Task");
    assert.equal(body.entity, "ai_task.google_ai_task");
  });

  it("without rooms and equipment turned on, the answer has neither", async () => {
    await c.call("resolvia/prefs/set_app", { prefs: { rooms_on: false, equips_on: false } });
    const { body } = await extract({ text: "Desentupir a pia", lists: [{ id: CASA, name: "Casa" }] });
    assert.deepEqual(body.items, ["Desentupir a pia"]);
    assert.equal("rooms" in body, false);
    assert.equal("equips" in body, false);
  });

  it("turned off, the links are hidden but kept; back on, they return", async () => {
    let r = await rooms();
    assert.deepEqual([r.map, r.emap], [{}, {}]);
    await waitFor(() => !stack.presence().comodos && !stack.presence().equipamentos, { what: "file without rooms" });
    await c.call("resolvia/prefs/set_app", { prefs: { rooms_on: true, equips_on: true } });
    r = await waitFor(async () => {
      const x = await rooms();
      return x.itens.length ? x : null;
    }, { what: "back on" });
    assert.equal(r.map[CASA]["trocar o filtro do ar"], "quarto");
    assert.equal(r.emap[CASA]["limpar o filtro do ar"], "ar_1");
  });
});

describe("InventarIA problems", () => {
  it("an InventarIA 1.14 (no items route) asks for an update, keeping what was read", async () => {
    mode = "old";
    const r = await c.call("resolvia/rooms/refresh");
    assert.equal(r.erro, "Para os equipamentos, atualize o InventarIA (1.15.0 ou mais nova).");
    assert.equal(r.itens.length, 4);
    assert.equal(r.comodos.length, 3);
  });

  it("an InventarIA that is down keeps the rooms and says why", async () => {
    mode = "down";
    const r = await c.call("resolvia/rooms/refresh");
    assert.equal(r.erro, "InventarIA reiniciando");
    assert.equal(r.encontrado, true);
    assert.equal(r.comodos.length, 3);
    await stack.app.waitLine(/InventarIA: InventarIA reiniciando/);
    mode = "ok";
    assert.equal((await c.call("resolvia/rooms/refresh")).erro, null);
  });

  it("the links survive a restart", async () => {
    await stack.restartApp();
    c = await stack.client();
    const r = await waitFor(async () => {
      const x = await rooms();
      return x.comodos.length ? x : null;
    }, { what: "rooms after restart" });
    assert.equal(r.map[CASA]["trocar o filtro do ar"], "quarto");
    assert.equal(r.emap[CASA]["limpar o filtro do ar"], "ar_1");
  });
});
