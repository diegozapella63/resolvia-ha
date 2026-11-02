import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import { Restore } from "../resolvia/rootfs/app/lib/restore.js";
import { Store } from "../resolvia/rootfs/app/lib/store.js";
import { snapshot, backupZip, parseImport } from "../resolvia/rootfs/app/lib/data.js";
import { tmpDir, fakeLog, local } from "./_helpers.mjs";

const F = { CREATE: 1, DELETE: 2, UPDATE: 4, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const st = (name, features = 127, state = "1") => ({ state, attributes: { friendly_name: name, supported_features: features } });

/**
 * A restore over a real Store (temp dir, clock frozen), a fake Home Assistant
 * (items per list, add_item recorded) and a fake recurring engine.
 */
const clocked = new WeakSet();
function setup(t, { states = { "todo.casa": st("Casa"), "todo.mercado": st("Mercado", F.CREATE) }, items = {}, live = {}, prefs = null, failAdd = () => false, listFails = false } = {}) {
  if (!clocked.has(t)) t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: local(2026, 11, 2, 9, 0).getTime() });
  clocked.add(t);
  const dir = tmpDir("resolvia-restore-");
  const log = fakeLog();
  const store = new Store(dir, log);
  if (prefs) for (const [id, p] of Object.entries(prefs)) store.setListPrefs(id, p);
  store.flush();
  const calls = [];
  const ha = {
    async send(msg) {
      calls.push(msg);
      if (msg.type === "todo/item/list") {
        if (listFails) throw new Error("offline");
        return { items: items[msg.entity_id] || [] };
      }
      if (msg.type === "call_service" && failAdd(msg.service_data)) throw new Error("recusado");
      return {};
    },
  };
  const recurring = new EventEmitter();
  recurring.items = new Map(Object.entries(live));
  recurring.processed = [];
  recurring.process = (id, list) => recurring.processed.push([id, list.length]);
  let changes = 0;
  recurring.on("change", () => changes++);
  const r = new Restore({ ha, store, recurring, states: new Map(Object.entries(states)), log });
  const adds = () => calls.filter((c) => c.service === "add_item").map((c) => [c.target.entity_id, c.service_data]);
  return { r, store, ha, calls, adds, recurring, log, dir, changes: () => changes };
}

const item = (summary, o = {}) => ({ uid: `f-${summary}`, summary, status: "needs_action", ...o });

describe("Restore.mapLists: which list here receives each list of the file", () => {
  it("same entity id first, then the same name (folded)", (t) => {
    const { r } = setup(t, { states: { "todo.casa": st("Casa"), "todo.analise": st("Análise dos Dispositivos") } });
    const { map, missing } = r.mapLists(
      [
        { entity_id: "todo.casa", name: "Outro nome" },
        { entity_id: "todo.velha", name: "ANALISE DOS   DISPOSITIVOS" },
        { entity_id: "todo.sumiu", name: "Trabalho" },
      ],
      {},
    );
    assert.deepEqual([...map], [
      ["todo.casa", "todo.casa"],
      ["todo.velha", "todo.analise"],
    ]);
    assert.deepEqual(missing, ["Trabalho"]);
  });

  it("matches the name given here in the app, and the Home Assistant / custom name in the file", (t) => {
    const { r } = setup(t, { states: { "todo.a": st("Shopping list"), "todo.b": st("To-do list"), "todo.c": st("Lista C") }, prefs: { "todo.a": { name: "Mercado" } } });
    const { map } = r.mapLists(
      [
        { entity_id: "todo.x", name: "Mercado" },
        { entity_id: "todo.y", name: "Tarefas", ha_name: "To-do list" },
        { entity_id: "todo.z", name: "Sem igual" },
      ],
      { lists: { "todo.z": { name: "Lista C" } } },
    );
    assert.deepEqual(Object.fromEntries(map), { "todo.x": "todo.a", "todo.y": "todo.b", "todo.z": "todo.c" });
  });

  it("two lists of the file with the same name go to different lists when there are two here", (t) => {
    const { r } = setup(t, { states: { "todo.casa": st("Casa"), "todo.casa_2": st("Casa") } });
    const { map } = r.mapLists([{ entity_id: "todo.x", name: "Casa" }, { entity_id: "todo.y", name: "Casa" }, { entity_id: "todo.z", name: "Casa" }], {});
    assert.deepEqual(Object.fromEntries(map), { "todo.x": "todo.casa", "todo.y": "todo.casa_2", "todo.z": "todo.casa" });
  });

  it("an id that exists here is never taken by a list matched by name", (t) => {
    const { r } = setup(t, { states: { "todo.casa": st("Casa"), "todo.outra": st("Outra") } });
    const { map } = r.mapLists([{ entity_id: "todo.velha", name: "Casa" }, { entity_id: "todo.casa", name: "Casa" }], {});
    assert.equal(map.get("todo.casa"), "todo.casa");
    assert.equal(map.get("todo.velha"), "todo.casa", "only candidate, even if used");
  });

  it("names a missing list by name, Home Assistant name or id", (t) => {
    const { r } = setup(t, { states: {} });
    assert.deepEqual(r.mapLists([{ entity_id: "todo.a", name: "A" }, { entity_id: "todo.b", ha_name: "B" }, { entity_id: "todo.c" }], {}).missing, ["A", "B", "todo.c"]);
  });
});

describe("Restore.run: the app data", () => {
  it("replaces prefs, rules, points, rooms and equipment, keeping a copy of what was there", async (t) => {
    const { r, store, dir } = setup(t);
    store.setPoints("todo.casa", "Antiga", 3);
    store.flush();
    const raw = {
      prefs: { lists: { "todo.casa": { name: "Minha Casa", color: "azul" } }, app: { rooms_on: true, equips_on: true, list_order: ["todo.mercado", "todo.casa"] } },
      rules: { r1: { id: "r1", entity_id: "todo.casa", uid: null, match: "Regar", summary: "Regar", days: 2 } },
      points: { "todo.casa": { "Lavar a Louça": 5 } },
      rooms: { "todo.casa": { "Lavar a Louça": "cozinha" } },
      equips: { "todo.casa": { "Lavar a Louça": "pia_1" } },
      lists: [{ entity_id: "todo.casa", name: "Casa", items: [] }],
    };
    const out = await r.run(raw, "antes-de-importar");
    assert.deepEqual(store.prefs.lists, { "todo.casa": { name: "Minha Casa", color: "azul" } });
    assert.deepEqual(store.prefs.app, { rooms_on: true, equips_on: true, list_order: ["todo.mercado", "todo.casa"] });
    assert.deepEqual(store.points, { "todo.casa": { "lavar a louca": 5 } });
    assert.deepEqual(store.rooms, { "todo.casa": { "lavar a louca": "cozinha" } });
    assert.deepEqual(store.equips, { "todo.casa": { "lavar a louca": "pia_1" } });
    assert.equal(store.rules.r1.match, "Regar");
    assert.deepEqual(out, { lists: 1, rules: 1, added: 0, unsupported: 0, failed: 0, missing: [], moved: 0 });
    const copy = "resolvia-20261102-090000000-antes-de-importar.json";
    assert.ok(fs.readdirSync(path.join(dir, "versoes")).includes(copy));
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, "versoes", copy), "utf8")).points, { "todo.casa": { antiga: 3 } });
  });

  it("moves everything to the lists found by name (another Home Assistant)", async (t) => {
    const { r, store } = setup(t);
    const raw = {
      prefs: { lists: { "todo.casa_velha": { color: "rosa" }, "todo.sumiu": { color: "azul" } }, app: { list_order: ["todo.casa_velha", "todo.mercado_velho", "todo.casa_velha", "todo.sumiu"] } },
      rules: [{ id: "r1", entity_id: "todo.casa_velha", uid: "old-uid", summary: "Regar", days: 3 }],
      points: { "todo.casa_velha": { regar: 10 } },
      rooms: { "todo.casa_velha": { regar: "varanda" }, "todo.sumiu": { x: "sala" } },
      equips: { "todo.mercado_velho": { leite: "geladeira" } },
      lists: [
        { entity_id: "todo.casa_velha", name: "Casa", items: [] },
        { entity_id: "todo.mercado_velho", name: "Supermercado", ha_name: "Mercado", items: [] },
        { entity_id: "todo.sumiu", name: "Trabalho", items: [] },
      ],
    };
    const out = await r.run(raw, "antes-de-importar");
    assert.deepEqual(store.prefs.lists, { "todo.casa": { color: "rosa" }, "todo.sumiu": { color: "azul" } });
    assert.deepEqual(store.prefs.app.list_order, ["todo.casa", "todo.mercado", "todo.sumiu"]);
    assert.deepEqual(store.points, { "todo.casa": { regar: 10 } });
    assert.deepEqual(store.rooms, { "todo.casa": { regar: "varanda" }, "todo.sumiu": { x: "sala" } });
    assert.deepEqual(store.equips, { "todo.mercado": { leite: "geladeira" } });
    assert.equal(store.rules.r1.entity_id, "todo.casa");
    assert.deepEqual([out.moved, out.missing], [2, ["Trabalho"]]);
  });

  it("a list order with something that is not an id is dropped as a whole (strict import)", async (t) => {
    const { r, store } = setup(t);
    await r.run({ prefs: { app: { list_order: ["todo.casa", 5], accent: "rosa" } } }, "x");
    assert.deepEqual(store.prefs.app, { accent: "rosa" });
  });

  it("when two lists of the file land on the same list, the one with that very id wins", async (t) => {
    const { r, store } = setup(t);
    await r.run(
      {
        prefs: { lists: { "todo.outra_casa": { color: "rosa" }, "todo.casa": { color: "azul" } } },
        rooms: { "todo.outra_casa": { a: "sala" }, "todo.casa": { a: "cozinha" } },
        lists: [{ entity_id: "todo.outra_casa", name: "Casa" }, { entity_id: "todo.casa", name: "Casa" }],
      },
      "x",
    );
    assert.deepEqual(store.prefs.lists["todo.casa"], { color: "azul" });
    assert.deepEqual(store.rooms["todo.casa"], { a: "cozinha" });
  });

  it("repeating tasks whose item is not here bind again by name", async (t) => {
    const { r, store } = setup(t, { items: { "todo.casa": [{ uid: "here", summary: "Varrer", status: "needs_action" }] } });
    await r.run(
      {
        rules: {
          a: { id: "a", entity_id: "todo.casa", uid: "here", summary: "Varrer", days: 1 },
          b: { id: "b", entity_id: "todo.casa", uid: "gone", summary: "Regar", days: 2 },
          c: { id: "c", entity_id: "todo.casa", uid: "gone2", summary: "Lavar", days: 3, completed_at: 5, reopen_at: 9 },
        },
      },
      "x",
    );
    assert.deepEqual([store.rules.a.uid, store.rules.a.match], ["here", null]);
    assert.deepEqual([store.rules.b.uid, store.rules.b.match], [null, "Regar"]);
    assert.equal(store.rules.c.uid, "gone2", "a completed one is created again when it comes back");
  });

  it("tells the screens and re-checks the repetitions of every list", async (t) => {
    const { r, recurring, changes } = setup(t, { live: { "todo.casa": [item("a"), item("b")] } });
    await r.run({ prefs: {} }, "x", { items: false });
    assert.equal(changes(), 1);
    assert.deepEqual(recurring.processed, [["todo.casa", 2]]);
  });
});

describe("Restore.run: the items", () => {
  it("adds the pending items that are missing, once, with what each list supports", async (t) => {
    const { r, adds } = setup(t, {
      states: { "todo.casa": st("Casa", 127), "todo.mercado": st("Mercado", F.CREATE | F.DUE_DATE) },
      items: { "todo.casa": [{ uid: "f-Já tem", summary: "outra coisa", status: "needs_action" }, { uid: "zz", summary: "VARRER  A SALA", status: "completed" }] },
    });
    const out = await r.run(
      {
        lists: [
          {
            entity_id: "todo.casa",
            name: "Casa",
            items: [
              item("Já tem"),
              item("Varrer a sala"),
              item("Regar", { due: "2026-11-05" }),
              item("Consulta", { due: "2026-11-05T13:30:00Z", description: "Levar exames" }),
              item("Pronto", { status: "completed" }),
              item("  Espaços  "),
              item("Duplicada"),
              item("duplicada", { uid: "outro" }),
              { summary: "  " },
              { summary: 5 },
              "lixo",
            ],
          },
          { entity_id: "todo.mercado", name: "Mercado", items: [item("Leite", { due: "2026-11-05T13:30:00Z", description: "Integral" })] },
        ],
      },
      "x",
    );
    assert.deepEqual(adds(), [
      ["todo.casa", { item: "Regar", due_date: "2026-11-05" }],
      ["todo.casa", { item: "Consulta", due_datetime: "2026-11-05 10:30:00", description: "Levar exames" }],
      ["todo.casa", { item: "Espaços" }],
      ["todo.casa", { item: "Duplicada" }],
      ["todo.mercado", { item: "Leite", due_date: "2026-11-05" }],
    ]);
    assert.deepEqual([out.added, out.unsupported, out.failed], [5, 0, 0]);
  });

  it("deadlines a list cannot take are left out", async (t) => {
    const { r, adds } = setup(t, { states: { "todo.a": st("A", F.CREATE | F.DUE_DATETIME), "todo.b": st("B", F.CREATE) } });
    await r.run(
      {
        lists: [
          { entity_id: "todo.a", name: "A", items: [item("Só data", { due: "2026-11-05" }), item("Hora", { due: "2026-11-05T23:59:00-03:00" }), item("Lixo", { due: "amanhã" })] },
          { entity_id: "todo.b", name: "B", items: [item("Com hora", { due: "2026-11-05T10:00:00Z" }), item("Nota", { description: "x" })] },
        ],
      },
      "x",
    );
    assert.deepEqual(adds(), [
      ["todo.a", { item: "Só data" }],
      ["todo.a", { item: "Hora", due_datetime: "2026-11-05 23:59:00" }],
      ["todo.a", { item: "Lixo" }],
      ["todo.b", { item: "Com hora" }],
      ["todo.b", { item: "Nota" }],
    ]);
  });

  it("counts what could not be added: lists that don't accept new items, unavailable lists, refusals", async (t) => {
    const { r, adds, log } = setup(t, {
      states: { "todo.alexa": st("Alexa", 0), "todo.off": st("Off", 127, "unavailable"), "todo.casa": st("Casa") },
      failAdd: (d) => d.item === "Recusado",
    });
    const out = await r.run(
      {
        lists: [
          { entity_id: "todo.alexa", name: "Alexa", items: [item("A1"), item("A2")] },
          { entity_id: "todo.off", name: "Off", items: [item("O1")] },
          { entity_id: "todo.casa", name: "Casa", items: [item("Recusado"), item("Aceito")] },
          { entity_id: "todo.longe", name: "Longe", items: [item("Nenhum lugar")] },
        ],
      },
      "x",
    );
    assert.deepEqual([out.added, out.unsupported, out.failed, out.missing], [1, 3, 1, ["Longe"]]);
    assert.deepEqual(adds().map(([, d]) => d.item), ["Recusado", "Aceito"]);
    assert.match(log.of("warn")[0], /Não consegui repor "Recusado" em todo\.casa: recusado/);
  });

  it("long names and notes are cut to what Home Assistant takes", async (t) => {
    const { r, adds } = setup(t);
    await r.run({ lists: [{ entity_id: "todo.casa", name: "Casa", items: [item("n".repeat(300), { description: "d".repeat(5000) })] }] }, "x");
    const [[, d]] = adds();
    assert.equal(d.item.length, 255);
    assert.equal(d.description.length, 4000);
  });

  it("with items: false (automatic versions), only the app data comes back", async (t) => {
    const { r, adds } = setup(t);
    const out = await r.run({ lists: [{ entity_id: "todo.casa", name: "Casa", items: [item("X")] }] }, "antes-de-restaurar", { items: false });
    assert.deepEqual(adds(), []);
    assert.equal(out.added, 0);
  });

  it("uses the items the app already follows, without asking Home Assistant", async (t) => {
    const { r, calls, adds } = setup(t, { live: { "todo.casa": [{ uid: "1", summary: "Regar", status: "needs_action" }] } });
    await r.run({ lists: [{ entity_id: "todo.casa", name: "Casa", items: [item("Regar"), item("Novo")] }] }, "x");
    assert.equal(calls.filter((c) => c.type === "todo/item/list").length, 0);
    assert.deepEqual(adds().map(([, d]) => d.item), ["Novo"]);
  });

  it("a list Home Assistant cannot read counts as empty", async (t) => {
    const { r, adds } = setup(t, { listFails: true });
    await r.run({ lists: [{ entity_id: "todo.casa", name: "Casa", items: [item("Regar")] }] }, "x");
    assert.deepEqual(adds().map(([, d]) => d.item), ["Regar"]);
  });

  it("tolerates a file with odd lists", async (t) => {
    const { r } = setup(t);
    const out = await r.run({ lists: [null, "x", { name: "sem id" }, { entity_id: "todo.casa", name: "Casa", items: "nope" }], prefs: [], rules: "x" }, "x");
    assert.deepEqual([out.added, out.rules, out.lists], [0, 0, 0]);
  });
});

describe("Restore.lists (for the exports)", () => {
  it("every list here with its items, by name in Portuguese order with numbers", async (t) => {
    const { r } = setup(t, {
      states: { "todo.l10": st("Lista 10"), "todo.l2": st("Lista 2"), "todo.agua": st("Água"), "todo.b": st("Banco"), "todo.raw": { state: "0" } },
      prefs: { "todo.b": { name: "Contas" } },
      items: { "todo.l2": [item("x")] },
      live: { "todo.agua": [item("y"), item("z")] },
    });
    const out = await r.lists();
    assert.deepEqual(out.map((l) => [l.entity_id, l.name, l.ha_name, l.items.length]), [
      ["todo.agua", "Água", "Água", 2],
      ["todo.b", "Contas", "Banco", 0],
      ["todo.l2", "Lista 2", "Lista 2", 1],
      ["todo.l10", "Lista 10", "Lista 10", 0],
      ["todo.raw", "todo.raw", "todo.raw", 0],
    ]);
  });
});

describe("backup round trip: export here, restore on another Home Assistant", () => {
  it("brings back names, colors, repetitions, points, rooms, equipment and the pending items", async (t) => {
    // here: the store with everything set
    const a = setup(t, { states: { "todo.casa": st("Casa") } });
    a.store.setListPrefs("todo.casa", { name: "Minha Casa", color: "menta" });
    a.store.setAppPrefs({ rooms_on: true, equips_on: true, points_on: true });
    a.store.setPoints("todo.casa", "Limpar o Fogão", 15);
    a.store.setRoom("todo.casa", "Limpar o Fogão", "cozinha");
    a.store.setEquip("todo.casa", "Limpar o Fogão", "fogao_1");
    a.store.data.rules.r1 = { id: "r1", entity_id: "todo.casa", uid: "u1", match: null, summary: "Limpar o Fogão", description: null, days: 7, completed_at: null, reopen_at: null, created_at: 1 };
    const lists = [{ entity_id: "todo.casa", name: "Minha Casa", ha_name: "Casa", items: [{ uid: "u1", summary: "Limpar o Fogão", status: "needs_action", due: "2026-11-10" }, { uid: "u2", summary: "Feito", status: "completed" }] }];
    const zip = backupZip(snapshot(a.store, lists, "2.30.0"), "2.30.0");

    // there: a new install, the same list under another id
    const b = setup(t, { states: { "todo.casa_nova": st("Casa", F.CREATE | F.DUE_DATE) } });
    const out = await b.r.run(parseImport(zip, "resolvia-2026-11-02-0900.zip"), "antes-de-importar");
    assert.deepEqual(out, { lists: 1, rules: 1, added: 1, unsupported: 0, failed: 0, missing: [], moved: 1 });
    assert.deepEqual(b.store.prefs.lists, { "todo.casa_nova": { name: "Minha Casa", color: "menta" } });
    assert.deepEqual(b.store.prefs.app, { rooms_on: true, equips_on: true, points_on: true });
    assert.equal(b.store.pointsFor("todo.casa_nova", "limpar o fogao"), 15);
    assert.equal(b.store.roomFor("todo.casa_nova", "Limpar o Fogão"), "cozinha");
    assert.deepEqual(b.store.equips, { "todo.casa_nova": { "limpar o fogao": "fogao_1" } });
    assert.deepEqual([b.store.rules.r1.entity_id, b.store.rules.r1.uid, b.store.rules.r1.match], ["todo.casa_nova", null, "Limpar o Fogão"]);
    assert.deepEqual(b.adds(), [["todo.casa_nova", { item: "Limpar o Fogão", due_date: "2026-11-10" }]]);

    // and the store on disk says the same after a restart
    b.store.flush();
    const again = new Store(b.dir, fakeLog());
    assert.equal(again.roomFor("todo.casa_nova", "limpar o fogão"), "cozinha");
  });
});
