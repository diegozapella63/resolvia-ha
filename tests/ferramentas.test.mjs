// lib/ferramentas.js: the tools of the CorrerIA (the WhatsApp, the Claude and the Gemini) over lists in memory,
// with the real Store, Recurring, Placar and Inventario. The routes and the real Home Assistant (simulated) are in
// tests/integration/correria.test.mjs.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Ferramentas, toolList, parseDate, parseTime, INSTRUCOES, ErroFerramenta, FerramentaDesconhecida } from "../resolvia/rootfs/app/lib/ferramentas.js";
import { Store } from "../resolvia/rootfs/app/lib/store.js";
import { Recurring } from "../resolvia/rootfs/app/lib/recurring.js";
import { Placar } from "../resolvia/rootfs/app/lib/placar.js";
import { Inventario } from "../resolvia/rootfs/app/lib/inventario.js";
import { tmpDir, fakeLog, local } from "./_helpers.mjs";

const F = { CREATE: 1, DELETE: 2, UPDATE: 4, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const ALL = 127;
const NOW = local(2026, 11, 8, 10, 0); // a Sunday
const ON = { due: true, repeat: true, points: true, rooms: true, equips: true, ext: true };
const OFF = { due: false, repeat: false, points: false, rooms: false, equips: false, ext: false };

const it_ = (summary, extra = {}) => ({ summary, status: "needs_action", ...extra });

function baseLists() {
  return [
    {
      id: "todo.casa",
      name: "Casa",
      features: ALL,
      owner: "Ana",
      items: [
        it_("Pagar conta de luz", { uid: "u1", due: "2026-11-07" }),
        it_("Trocar filtro do ar", { uid: "u2", due: "2026-11-08", description: "Modelo X [cr:0a1b2c3d]" }),
        it_("Regar as plantas", { uid: "u3", due: "2026-11-10" }),
        it_("Limpar a calha", { uid: "u4", due: "2026-11-30" }),
        it_("Passar pano", { uid: "u5" }),
        it_("Lavar o carro", { uid: "u6", status: "completed" }),
        it_("Consulta", { uid: "u7", due: "2026-11-08T15:00:00.000Z" }),
        it_("Rotina da manhã", { uid: "cr1" }),
        it_("   ", { uid: "u8" }),
      ],
    },
    { id: "todo.mercado", name: "Lista de compras", features: F.CREATE | F.DELETE | F.UPDATE, items: [it_("Leite", { uid: "m1" }), it_("Café", { uid: "m2" })] },
    { id: "todo.google", name: "Google Tasks", features: F.CREATE | F.DELETE | F.UPDATE | F.DUE_DATE | F.DESCRIPTION, items: [it_("Renovar passaporte", { uid: "g1", due: "2026-11-12" })] },
    { id: "todo.avisos", name: "Avisos do condomínio", features: 0, items: [it_("Assembleia", { uid: "a1" })] },
    { id: "todo.chamados", name: "Chamados", features: F.DELETE, items: [it_("Ligar para o síndico", { uid: "c1" })] },
    { id: "todo.velha", name: "Lista velha", features: ALL, hidden: true, items: [it_("Leite", { uid: "v1", due: "2026-11-01" })] },
    { id: "todo.problemas", name: "Problemas", features: ALL, datesInfo: true, items: [it_("Luz do banheiro", { uid: "p1", due: "2026-11-01" })] },
    { id: "todo.caldav", name: "CalDAV", features: ALL, unavailable: true, items: [] },
  ];
}

/** The tools over lists in memory. opts: {on, lists, placar (the file of the CronologIA), mangle (add_item keeps another name), broken (a list id whose items fail)}. */
function setup({ on = ON, lists = baseLists(), placar = null, mangle = false, broken = null, users = { "person.ana": "u-ana" }, comodos = null } = {}) {
  const dir = tmpDir();
  const log = fakeLog();
  const store = new Store(path.join(dir, "data"), log);
  const share = path.join(dir, "share");
  if (placar) {
    fs.mkdirSync(path.join(share, "cronologia"), { recursive: true });
    fs.writeFileSync(path.join(share, "cronologia", "integracao.json"), JSON.stringify({ app: "CronologIA", versao: "1.60.0", gravado_em: new Date().toISOString(), ...placar }));
  }
  const pl = new Placar({ shareDir: share });
  const inv = new Inventario({ shareDir: share, log });
  inv.state = {
    encontrado: true,
    comodos: [
      { id: "cozinha", nome: "Cozinha" },
      { id: "sala", nome: "Sala de estar" },
      { id: "quarto", nome: "Quarto" },
    ],
    itens: [
      { id: "geladeira_1", nome: "Geladeira", comodo: "cozinha" },
      { id: "ar_1", nome: "Ar-condicionado", comodo: "sala" },
      { id: "ar_2", nome: "Ar-condicionado", comodo: "quarto" },
      { id: "tv_1", nome: "TV", comodo: "" },
    ],
  };
  if (comodos) inv.state.comodos = comodos;
  const calls = [];
  const done = [];
  let seq = 100;
  const byId = new Map(lists.map((l) => [l.id, l]));
  const ha = { ready: true, send: async () => ({}) };
  const recurring = new Recurring({ ha, store, log, states: new Map(), now: () => NOW.getTime() });
  const plan = (msg) => {
    const p = pl.read();
    const esp = pl.mirrored(msg.entity_id, msg.uid);
    const n = esp ? esp.pontos : on.points ? store.pointsFor(msg.entity_id, msg.summary) : 0;
    if (!n) return { points: 0 };
    if (!msg.done) return { undo: "k" };
    if (!p || !p.ativo) return { points: 0 };
    const who = msg.quem ? pl.participant(msg.quem) : p.usuarios[msg.userId] || null;
    if (msg.quem && !who) throw Object.assign(new Error("Essa pessoa não está no placar"), { code: "invalid_format" });
    if (!who) return { ask: true, points: n, participantes: p.participantes };
    return { key: "k", who, points: n, participantes: p.participantes };
  };
  let changed = 0;
  const tools = new Ferramentas({
    lists: async () => lists.map(({ items, datesInfo, ...l }) => ({ hidden: false, owner: "", unavailable: false, ...l, due: on.due && !datesInfo && !!(l.features & (F.DUE_DATE | F.DUE_DATETIME)) })),
    items: async (id) => {
      if (id === broken) throw new Error("caiu");
      return structuredClone(byId.get(id).items);
    },
    call: async (service, data, entityId) => {
      calls.push({ service, data, entityId });
      const l = byId.get(entityId);
      const find = (k) => l.items.find((i) => i.uid === k || i.summary === k);
      const fields = (item) => {
        if ("due_date" in data) item.due = data.due_date || undefined;
        if ("due_datetime" in data) item.due = data.due_datetime ? new Date(data.due_datetime.replace(" ", "T")).toISOString() : undefined;
        if ("description" in data) item.description = data.description || undefined;
      };
      if (service === "add_item") {
        const item = { uid: `n${seq++}`, summary: mangle ? data.item.toUpperCase() : data.item, status: "needs_action" };
        fields(item);
        l.items.push(item);
      } else if (service === "update_item") {
        const item = find(data.item);
        if (data.rename) item.summary = data.rename;
        if (data.status) item.status = data.status;
        fields(item);
      } else if (service === "remove_item") l.items = l.items.filter((i) => !data.item.includes(i.uid));
      return {};
    },
    store,
    recurring,
    placar: pl,
    inventario: inv,
    on: () => on,
    userOf: async (p) => users[p.id] || null,
    pointsPlan: plan,
    pointsDone: async (msg) => {
      done.push(msg);
      const r = plan(msg);
      return r.who ? r : { points: 0 };
    },
    roomsFromEquips: (list, summary) => {
      const rooms = [...new Set(store.equipsFor(list, summary).map((id) => inv.state.itens.find((i) => i.id === id).comodo).filter(Boolean))];
      if (rooms.length) store.setRoom(list, summary, rooms);
    },
    changed: () => changed++,
    now: () => NOW.getTime(),
  });
  const run = async (nome, args, opts) => tools.chamar(nome, args, opts);
  const read = async (nome, args, opts) => JSON.parse(await run(nome, args, opts));
  const fails = async (nome, args, re, opts) => {
    await assert.rejects(run(nome, args, opts), (e) => {
      assert.ok(e instanceof ErroFerramenta, `${e.constructor.name}: ${e.message}`);
      assert.equal(e.status, 400);
      assert.match(e.message, re);
      return true;
    });
  };
  const item = (listId, summary) => byId.get(listId).items.find((i) => i.summary === summary);
  return { tools, run, read, fails, calls, done, store, recurring, lists, byId, item, changed: () => changed };
}

const PLACAR = { placar: { ativo: true, periodo: "quinzena", participantes: ["Ana", "Beto"], usuarios: { "u-ana": "Ana" } }, espelho: { "todo.casa": { cr1: { pontos: 7, tipo: "rotina" } } } };

describe("ferramentas: the list", () => {
  it("everything on: 8 tools, the reads first, apagar marked", () => {
    const t = toolList(ON);
    assert.deepEqual(t.map((x) => x.nome), ["resumo", "tarefas", "repeticoes", "pontos", "criar_tarefa", "editar_tarefa", "concluir_tarefa", "apagar_tarefa"]);
    for (const x of t) {
      assert.match(x.nome, /^[a-z0-9_]{1,40}$/);
      assert.ok(x.titulo && x.descricao);
      assert.equal(x.entrada.type, "object");
      assert.equal(x.entrada.additionalProperties, false);
      assert.equal(typeof x.grava, "boolean");
      assert.equal(x.apaga, x.nome === "apagar_tarefa");
      assert.equal(x.grava, !["resumo", "tarefas", "repeticoes", "pontos"].includes(x.nome));
    }
    assert.deepEqual(Object.keys(t[4].entrada.properties), ["lista", "texto", "prazo", "horario", "notas", "repetir_dias", "pontos", "comodos", "equipamentos", "externo"]);
    assert.deepEqual(t[4].entrada.required, ["lista", "texto"]);
    assert.ok("quem" in t[6].entrada.properties);
    assert.ok("quando" in t[1].entrada.properties && "comodo" in t[1].entrada.properties);
    assert.match(INSTRUCOES, /resolvia_resumo/);
  });
  it("only what is on: no points, no repetition, no rooms", () => {
    const t = toolList(OFF);
    assert.deepEqual(t.map((x) => x.nome), ["resumo", "tarefas", "criar_tarefa", "editar_tarefa", "concluir_tarefa", "apagar_tarefa"]);
    assert.deepEqual(Object.keys(t[2].entrada.properties), ["lista", "texto", "notas"]);
    assert.deepEqual(Object.keys(t[3].entrada.properties), ["id", "lista", "texto", "notas", "mover_para"]);
    assert.deepEqual(Object.keys(t[4].entrada.properties), ["id", "lista", "concluida"]);
    assert.deepEqual(Object.keys(t[1].entrada.properties), ["lista", "busca", "situacao", "limite"]);
    assert.equal(setup({ on: OFF }).tools.lista().length, 6);
  });
  it("an unknown tool is a 404; arguments that are not an object count as none", async () => {
    const s = setup();
    await assert.rejects(s.run("voar", {}), (e) => e instanceof FerramentaDesconhecida && e.status === 404 && e.message === "Ferramenta desconhecida: voar.");
    await assert.rejects(s.run(undefined, {}), FerramentaDesconhecida);
    assert.equal(JSON.parse(await s.run("resumo", ["x"])).hoje, "2026-11-08");
    assert.equal(JSON.parse(await s.run("tarefas", null)).encontradas, 13);
  });
});

describe("ferramentas: dates and times", () => {
  it("dates: words, ISO and the Brazilian way; a day that does not exist is refused", () => {
    assert.equal(parseDate("hoje", NOW), "2026-11-08");
    assert.equal(parseDate("Amanhã", NOW), "2026-11-09");
    assert.equal(parseDate("ontem", NOW), "2026-11-07");
    assert.equal(parseDate("depois de amanhã", NOW), "2026-11-10");
    assert.equal(parseDate("2026-12-1", NOW), "2026-12-01");
    assert.equal(parseDate("9/11/2027", NOW), "2027-11-09");
    assert.equal(parseDate("25/12", NOW), "2026-12-25");
    assert.equal(parseDate("hoje"), parseDate("hoje", new Date()));
    for (const bad of ["31/02/2026", "2026-13-01", "semana que vem", "", null]) assert.throws(() => parseDate(bad, NOW), /Data inválida: .*Use AAAA-MM-DD/);
  });
  it("times: 14:30, 9h, 14h30, 9", () => {
    assert.equal(parseTime("14:30"), "14:30");
    assert.equal(parseTime("9h"), "09:00");
    assert.equal(parseTime("14h30"), "14:30");
    assert.equal(parseTime(" 7 "), "07:00");
    for (const bad of ["25:00", "12:61", "meio-dia"]) assert.throws(() => parseTime(bad), /Horário inválido: .*HH:MM/);
  });
});

describe("ferramentas: resumo", () => {
  it("the lists, what is late, today and in 7 days (marked, available lists), and what is on", async () => {
    const s = setup({ placar: PLACAR });
    const r = await s.read("resumo", {}, { pessoa: { id: "person.ana", nome: "Ana" } });
    assert.equal(r.hoje, "2026-11-08");
    assert.equal(r.dia_da_semana, "domingo");
    const casa = r.listas.find((l) => l.id === "todo.casa");
    assert.deepEqual(casa, { id: "todo.casa", nome: "Casa", pendentes: 7, de: "Ana", aceita: "adicionar, concluir e editar, apagar, prazo, horário, notas", atrasadas: 1, vencem_hoje: 2 });
    assert.equal(r.listas.find((l) => l.id === "todo.avisos").aceita, "só leitura");
    assert.equal(r.listas.find((l) => l.id === "todo.velha").oculta, true);
    assert.equal(r.listas.find((l) => l.id === "todo.velha").atrasadas, undefined, "a hidden list is not counted");
    assert.equal(r.listas.find((l) => l.id === "todo.caldav").indisponivel, true);
    assert.equal(r.listas.find((l) => l.id === "todo.problemas").datas, "informação, não prazo");
    assert.deepEqual(r.atrasadas.map((t) => t.id), ["todo.casa:u1"]);
    assert.deepEqual(r.vencem_hoje.map((t) => t.texto), ["Trocar filtro do ar", "Consulta"]);
    assert.equal(r.vencem_hoje[1].prazo, "2026-11-08 12:00");
    assert.deepEqual(r.proximos_7_dias.map((t) => t.id), ["todo.casa:u3", "todo.google:g1"]);
    assert.equal(r.sem_prazo, 7);
    assert.equal(r.ligado, "prazos, repetição, pontos, cômodos, equipamentos, serviços externos");
    assert.deepEqual(r.placar, { participantes: ["Ana", "Beto"], voce: "Ana" });
    assert.deepEqual(r.comodos, ["Cozinha", "Sala de estar", "Quarto"]);
  });
  it("more than 50 late: the first 50 and the total; without the CronologIA, no scoreboard", async () => {
    const lists = baseLists();
    for (let k = 0; k < 55; k++) lists[0].items.push(it_(`Atrasada ${k}`, { uid: `x${k}`, due: "2026-11-01" }));
    const r = await setup({ lists }).read("resumo", {});
    assert.equal(r.atrasadas.length, 50);
    assert.equal(r.atrasadas_total, 56);
    assert.equal(r.vencem_hoje_total, undefined);
    assert.match(r.placar, /desligado ou sem CronologIA/);
  });
  it("everything off: no deadlines (the pending ones counted), nothing else", async () => {
    const r = await setup({ on: OFF }).read("resumo", {});
    assert.equal(r.atrasadas, undefined);
    assert.equal(r.pendentes_sem_prazo, 13);
    assert.equal(r.ligado, "nada além das listas");
    assert.equal(r.placar, undefined);
    assert.equal(r.comodos, undefined);
    assert.equal(r.listas.find((l) => l.id === "todo.casa").aceita, "adicionar, concluir e editar, apagar, notas");
  });
  it("a list whose items do not come is shown empty", async () => {
    const r = await setup({ broken: "todo.mercado" }).read("resumo", {});
    assert.equal(r.listas.find((l) => l.id === "todo.mercado").pendentes, 0);
  });
});

describe("ferramentas: tarefas", () => {
  it("the pending ones of the marked lists, late first; each with its id and what the app keeps", async () => {
    const s = setup({ placar: PLACAR });
    s.store.setPoints("todo.casa", "Regar as plantas", 10);
    s.store.setRoom("todo.casa", "Regar as plantas", ["sala", "sumiu"]);
    s.store.setEquip("todo.casa", "Regar as plantas", ["geladeira_1"]);
    s.store.setExternal("todo.casa", "Limpar a calha", "Calheiro");
    s.store.setExternal("todo.casa", "Passar pano", true);
    s.recurring.setRule({ entity_id: "todo.casa", uid: "u3", summary: "Regar as plantas", days: 7 });
    const r = await s.read("tarefas", {});
    assert.equal(r.encontradas, 13);
    const info = r.tarefas.find((t) => t.id === "todo.problemas:p1");
    assert.deepEqual([info.data, info.prazo, info.atrasada], ["2026-11-01", undefined, undefined], "dates as information: data, not prazo");
    assert.deepEqual(r.tarefas[0], { id: "todo.casa:u1", lista: "Casa", texto: "Pagar conta de luz", situacao: "pendente", prazo: "2026-11-07", atrasada: true });
    const regar = r.tarefas.find((t) => t.id === "todo.casa:u3");
    assert.deepEqual(regar, { id: "todo.casa:u3", lista: "Casa", texto: "Regar as plantas", situacao: "pendente", prazo: "2026-11-10", repete: "toda semana", pontos: 10, comodos: ["Sala de estar"], equipamentos: ["Geladeira"] });
    assert.equal(r.tarefas.find((t) => t.id === "todo.casa:u2").notas, "Modelo X");
    assert.equal(r.tarefas.find((t) => t.id === "todo.casa:u4").externo, "Calheiro");
    assert.equal(r.tarefas.find((t) => t.id === "todo.casa:u5").externo, "sim");
    assert.deepEqual(r.tarefas.find((t) => t.id === "todo.casa:cr1"), { id: "todo.casa:cr1", lista: "Casa", texto: "Rotina da manhã", situacao: "pendente", cronologia: "rotina (vem do CronologIA)", pontos: 7 });
    assert.ok(!r.tarefas.some((t) => t.lista === "Lista velha"), "a hidden list only by its name");
  });
  it("by list, text (in the notes too), deadline, situation and room; with a limit", async () => {
    const s = setup();
    s.store.setRoom("todo.casa", "Passar pano", "cozinha");
    const ids = async (args) => (await s.read("tarefas", args)).tarefas.map((t) => t.id);
    assert.deepEqual(await ids({ lista: "lista velha" }), ["todo.velha:v1"]);
    assert.deepEqual(await ids({ busca: "modelo x" }), ["todo.casa:u2"]);
    assert.deepEqual(await ids({ lista: "Casa", quando: "atrasadas" }), ["todo.casa:u1"]);
    assert.deepEqual(await ids({ lista: "Casa", quando: "hoje" }), ["todo.casa:u2", "todo.casa:u7"]);
    assert.deepEqual(await ids({ quando: "proximos_7_dias" }), ["todo.casa:u2", "todo.casa:u7", "todo.casa:u3", "todo.google:g1"]);
    assert.deepEqual(await ids({ lista: "todo.casa", quando: "sem_prazo" }), ["todo.casa:u5", "todo.casa:cr1"]);
    assert.equal((await ids({ lista: "todo.casa", quando: "com_prazo" })).length, 5);
    assert.deepEqual(await ids({ situacao: "concluidas" }), ["todo.casa:u6"]);
    assert.equal((await ids({ lista: "casa", situacao: "todas" })).length, 8);
    assert.deepEqual(await ids({ comodo: "cozinha" }), ["todo.casa:u5"]);
    const r = await s.read("tarefas", { limite: 2 });
    assert.deepEqual([r.encontradas, r.mostrando, r.tarefas.length], [13, 2, 2]);
  });
  it("what is off or wrong is refused, saying what is accepted", async () => {
    const s = setup({ on: OFF });
    await s.fails("tarefas", { quando: "hoje" }, /Controlar prazos está desligado/);
    await s.fails("tarefas", { comodo: "Cozinha" }, /Usar cômodos está desligado/);
    await setup().fails("tarefas", { quando: "amanha" }, /quando: atrasadas, hoje/);
    await setup().fails("tarefas", { comodo: "Garagem" }, /Cômodo não encontrado: Garagem. Os cômodos: Cozinha, Sala de estar, Quarto/);
    await setup().fails("tarefas", { lista: "Compras e mais" }, /Lista não encontrada: Compras e mais. As listas: Casa \(todo.casa\), Lista de compras \(todo.mercado\)/);
  });
});

describe("ferramentas: repeticoes and pontos", () => {
  it("the repeating tasks: every how many days, pending or when they come back", async () => {
    const s = setup();
    s.recurring.setRule({ entity_id: "todo.casa", uid: "u3", summary: "Regar as plantas", days: 3 });
    s.recurring.setRule({ entity_id: "todo.casa", summary: "Passar pano", days: 1 });
    s.recurring.setRule({ entity_id: "todo.mercado", uid: "sumiu", summary: "Pão", days: 30 });
    const lavar = s.recurring.setRule({ entity_id: "todo.casa", uid: "u6", summary: "Lavar o carro", days: 14 });
    lavar.completed_at = NOW.getTime();
    lavar.reopen_at = local(2026, 11, 22).getTime();
    const r = await s.read("repeticoes", {});
    assert.equal(r.total, 4);
    assert.deepEqual(r.repeticoes, [
      { lista: "Casa", texto: "Regar as plantas", repete: "a cada 3 dias", dias: 3, id: "todo.casa:u3", situacao: "pendente" },
      { lista: "Casa", texto: "Passar pano", repete: "todo dia", dias: 1, id: "todo.casa:u5", situacao: "pendente" },
      { lista: "Casa", texto: "Lavar o carro", repete: "a cada 2 semanas", dias: 14, id: "todo.casa:u6", situacao: "concluída, volta em 2026-11-22" },
      { lista: "Lista de compras", texto: "Pão", repete: "todo mês", dias: 30, situacao: "pendente" },
    ]);
    await setup({ on: OFF }).fails("repeticoes", {}, /Repetir depois de concluir está desligado/);
  });
  it("the scoreboard and what each task is worth (the tasks of the CronologIA too)", async () => {
    const s = setup({ placar: PLACAR });
    s.store.setPoints("todo.casa", "Pagar conta de luz", 20);
    s.store.setPoints("todo.casa", "Tarefa que saiu", 5);
    const r = await s.read("pontos", {}, { pessoa: { id: "person.beto", nome: "beto" } });
    assert.deepEqual(r.placar, { participantes: ["Ana", "Beto"], fecha: "a cada 15 dias", voce: "Beto" });
    assert.deepEqual(r.tarefas, [
      { id: "todo.casa:u1", lista: "Casa", texto: "Pagar conta de luz", pontos: 20, situacao: "pendente" },
      { id: "todo.casa:cr1", lista: "Casa", texto: "Rotina da manhã", pontos: 7, situacao: "pendente", cronologia: true },
      { lista: "Casa", texto: "tarefa que saiu", pontos: 5, situacao: "fora da lista agora" },
    ]);
  });
  it("the scoreboard off, taken over or missing; a closing period it does not know; no person", async () => {
    const off = await setup({ placar: { placar: { ativo: false, participantes: ["Ana"] } } }).read("pontos", {});
    assert.match(off.placar, /^Placar desligado no CronologIA: /);
    const gone = await setup({ placar: { resolvia: false, placar: { ativo: true, participantes: ["Ana"] } } }).read("pontos", {});
    assert.match(gone.placar, /a integração com o ResolvIA está desligada lá/);
    assert.match((await setup().read("pontos", {})).placar, /^CronologIA não encontrado/);
    const odd = await setup({ placar: { placar: { ativo: true, periodo: "ano", participantes: ["Ana"], usuarios: {} } } }).read("pontos", {}, { pessoa: { id: "person.zeca", nome: "Zeca" } });
    assert.deepEqual(odd.placar, { participantes: ["Ana"], fecha: "toda semana", voce: null });
    assert.equal((await setup({ placar: PLACAR }).read("pontos", {})).placar.voce, null);
    await setup({ on: OFF }).fails("pontos", {}, /Usar recompensas está desligado/);
  });
});

describe("ferramentas: criar_tarefa", () => {
  it("creates with deadline, time, notes, repetition, points, rooms, equipment and who does it; returns the id", async () => {
    const s = setup();
    const txt = await s.run("criar_tarefa", { lista: "casa", texto: "Trocar a lâmpada", prazo: "amanhã", horario: "18h", notas: "LED", repetir_dias: 30, pontos: 15, comodos: "Cozinha, quarto", equipamentos: ["TV"], externo: "Eletricista" });
    assert.equal(txt, "Criada em Casa: Trocar a lâmpada · prazo 2026-11-09 18:00 · repete todo mês · 15 pontos · Cozinha · Quarto · TV · serviço externo: Eletricista. id: todo.casa:n100");
    assert.deepEqual(s.calls.at(-1), { service: "add_item", data: { item: "Trocar a lâmpada", due_datetime: "2026-11-09 18:00:00", description: "LED" }, entityId: "todo.casa" });
    const rule = Object.values(s.store.rules).find((r) => r.summary === "Trocar a lâmpada");
    assert.deepEqual([rule.uid, rule.days], ["n100", 30]);
    assert.equal(s.store.pointsFor("todo.casa", "trocar a LAMPADA"), 15);
    assert.equal(s.changed(), 1);
  });
  it("several at once, one per line (a date only list takes the day); a pending twin is pointed out", async () => {
    const s = setup();
    const txt = await s.run("criar_tarefa", { lista: "todo.google", texto: "Pagar IPVA\nRenovar passaporte\n\nPagar IPVA", prazo: "30/11/2026", externo: "sim" });
    assert.equal(txt, "Criadas 2 tarefas em Google Tasks (prazo 2026-11-30 · serviço externo): Pagar IPVA (id todo.google:n100), Renovar passaporte (id todo.google:n101).\nAtenção: já havia uma tarefa pendente igual (Renovar passaporte, id todo.google:g1). Se foi engano, apague uma delas.");
    assert.deepEqual(s.calls[0].data, { item: "Pagar IPVA", due_date: "2026-11-30" });
    await s.run("criar_tarefa", { lista: "Google", texto: "Pagar IPVA\nRenovar passaporte" });
    const twice = await s.run("criar_tarefa", { lista: "Google", texto: "Pagar IPVA\nRenovar passaporte" });
    assert.match(twice, /já havia tarefas pendentes iguais \(Pagar IPVA, id todo.google:n100; Renovar passaporte, id todo.google:g1\)/);
  });
  it("comodos 'todos' are every room; an item by its name with the room; without an id when Home Assistant changed the name", async () => {
    const s = setup({ mangle: true });
    assert.equal(await s.run("criar_tarefa", { lista: "casa", texto: "Tirar o pó", comodos: ["todos"] }), "Criada em Casa: Tirar o pó · Cozinha · Sala de estar · Quarto.");
    assert.equal(await s.run("criar_tarefa", { lista: "casa", texto: "Limpar filtro\nVer gás", equipamentos: ["Ar-condicionado (Quarto)"] }), "Criadas 2 tarefas em Casa (Quarto · Ar-condicionado): Limpar filtro, Ver gás.");
    assert.deepEqual(s.store.equipsFor("todo.casa", "Ver gás"), ["ar_2"]);
    assert.deepEqual(s.store.roomsFor("todo.casa", "Ver gás"), ["quarto"], "the room comes from the item");
  });
  it("refuses what the list or the app does not take, before adding anything", async () => {
    const s = setup();
    await s.fails("criar_tarefa", { texto: "x" }, /Falta a lista. As listas: Casa \(todo.casa\)/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: " \n " }, /Falta o texto da tarefa/);
    await s.fails("criar_tarefa", { lista: "CalDAV", texto: "x" }, /A lista CalDAV está indisponível/);
    await s.fails("criar_tarefa", { lista: "Chamados", texto: "x" }, /A lista Chamados não deixa criar tarefas/);
    await s.fails("criar_tarefa", { lista: "Lista de compras", texto: "x", prazo: "hoje" }, /A lista Lista de compras não aceita prazo/);
    await s.fails("criar_tarefa", { lista: "Google Tasks", texto: "x", prazo: "hoje", horario: "10:00" }, /não aceita horário, só a data/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", horario: "10:00" }, /Diga também o prazo/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", prazo: "32/11" }, /Data inválida/);
    await s.fails("criar_tarefa", { lista: "Lista de compras", texto: "x", notas: "y" }, /não aceita notas/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", repetir_dias: 0 }, /repetir_dias: de 1 a 365/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", pontos: 1001 }, /pontos: de 0 a 1000/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", comodos: ["Garagem"] }, /Cômodo não encontrado: Garagem/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", comodos: ["a"] }, /Cômodo não encontrado: a/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", equipamentos: ["Ar-condicionado"] }, /Mais de um equipamento com esse nome: Ar-condicionado \(Sala de estar\); Ar-condicionado \(Quarto\)/);
    await s.fails("criar_tarefa", { lista: "Casa", texto: "x", equipamentos: ["Fogão"] }, /Equipamento não encontrado: Fogão/);
    assert.equal(s.calls.length, 0);
    const off = setup({ on: OFF });
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", prazo: "hoje" }, /Controlar prazos está desligado no ResolvIA/);
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", repetir_dias: 7 }, /Repetir depois de concluir está desligado/);
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", pontos: 5 }, /Usar recompensas está desligado/);
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", comodos: ["Sala"] }, /Usar cômodos está desligado/);
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", equipamentos: ["TV"] }, /Usar equipamentos está desligado/);
    await off.fails("criar_tarefa", { lista: "Casa", texto: "x", externo: "Pintor" }, /Serviços externos está desligado/);
    // empty values of what is off are as if nothing came
    assert.match(await off.run("criar_tarefa", { lista: "Casa", texto: "Varrer", pontos: 0, comodos: [], prazo: "", externo: null }), /^Criada em Casa: Varrer\. id: todo.casa:n100$/);
  });
});

describe("ferramentas: editar_tarefa", () => {
  it("renames (points, rooms, equipment and who does it go along) and changes the deadline", async () => {
    const s = setup();
    s.store.setPoints("todo.casa", "Regar as plantas", 10);
    s.store.setRoom("todo.casa", "Regar as plantas", "sala");
    s.store.setEquip("todo.casa", "Regar as plantas", "tv_1");
    s.store.setExternal("todo.casa", "Regar as plantas", "Jardineiro");
    const txt = await s.run("editar_tarefa", { id: "todo.casa:u3", texto: "Regar o jardim", prazo: "2026-11-11", horario: "7:30" });
    assert.equal(txt, "Alterada em Casa: Regar o jardim · prazo 2026-11-11 07:30 · 10 pontos · Sala de estar · TV · serviço externo: Jardineiro. Antes: Regar as plantas · prazo 2026-11-10 · 10 pontos · Sala de estar · TV · serviço externo: Jardineiro. id: todo.casa:u3");
    assert.deepEqual(s.calls[0].data, { item: "u3", rename: "Regar o jardim", due_datetime: "2026-11-11 07:30:00" });
    assert.equal(s.store.pointsFor("todo.casa", "Regar as plantas"), 0);
    assert.equal(s.store.pointsFor("todo.casa", "Regar o jardim"), 10);
    assert.deepEqual(s.store.roomsFor("todo.casa", "Regar o jardim"), ["sala"]);
    assert.equal(s.store.externalFor("todo.casa", "Regar o jardim"), "Jardineiro");
  });
  it("with rooms and equipment off, a rename leaves them where they are (as the screen does)", async () => {
    const s = setup({ on: { ...ON, rooms: false, equips: false } });
    s.store.setRoom("todo.casa", "Passar pano", "sala");
    await s.run("editar_tarefa", { id: "Passar pano", texto: "Passar pano na casa" });
    assert.deepEqual(s.store.roomsFor("todo.casa", "Passar pano"), ["sala"]);
    assert.deepEqual(s.store.roomsFor("todo.casa", "Passar pano na casa"), []);
  });
  it("notes keep the mark of the CronologIA; the deadline and the time can be cleared", async () => {
    const s = setup();
    await s.run("editar_tarefa", { id: "todo.casa:u2", notas: "Modelo Y" });
    assert.equal(s.item("todo.casa", "Trocar filtro do ar").description, "Modelo Y [cr:0a1b2c3d]");
    await s.run("editar_tarefa", { id: "todo.casa:u2", notas: "" });
    assert.equal(s.item("todo.casa", "Trocar filtro do ar").description, "[cr:0a1b2c3d]");
    await s.run("editar_tarefa", { id: "Passar pano", notas: "Com cera" });
    await s.run("editar_tarefa", { id: "Passar pano", notas: "" });
    assert.equal(s.item("todo.casa", "Passar pano").description, undefined);
    assert.match(await s.run("editar_tarefa", { id: "Consulta", horario: "dia todo" }), /^Alterada em Casa: Consulta · prazo 2026-11-08\. Antes: Consulta · prazo 2026-11-08 12:00\./);
    assert.match(await s.run("editar_tarefa", { id: "Consulta", horario: "16:00" }), /prazo 2026-11-08 16:00\./);
    assert.match(await s.run("editar_tarefa", { id: "Pagar conta de luz", prazo: "sem prazo" }), /^Alterada em Casa: Pagar conta de luz\. Antes: Pagar conta de luz · prazo 2026-11-07\./);
    assert.equal(s.item("todo.casa", "Pagar conta de luz").due, undefined);
    assert.deepEqual(s.calls.at(-1).data, { item: "u1", due_date: null });
  });
  it("repetition, points, rooms and who does it on their own (no change in Home Assistant)", async () => {
    const s = setup();
    await s.run("editar_tarefa", { id: "Passar pano", repetir_dias: 7, pontos: 5, comodos: ["Sala"], externo: "sim" });
    assert.equal(s.calls.length, 0);
    assert.equal(Object.values(s.store.rules)[0].days, 7);
    assert.equal(s.store.externalFor("todo.casa", "Passar pano"), true);
    await s.run("editar_tarefa", { id: "Passar pano", repetir_dias: 7 });
    await s.run("editar_tarefa", { id: "Passar pano", repetir_dias: 0, pontos: 0, comodos: [], externo: "" });
    assert.deepEqual([Object.keys(s.store.rules).length, s.store.pointsFor("todo.casa", "Passar pano"), s.store.externalFor("todo.casa", "Passar pano")], [0, 0, null]);
    // a list that only lets delete: what the app keeps can change, not the task in Home Assistant
    assert.match(await s.run("editar_tarefa", { id: "Ligar para o síndico", pontos: 3 }), /3 pontos/);
    await s.fails("editar_tarefa", { id: "Ligar para o síndico", texto: "Ligar já" }, /A lista Chamados não deixa editar tarefas/);
    await s.fails("editar_tarefa", { id: "Ligar para o síndico", repetir_dias: 3 }, /A lista Chamados não deixa repetir/);
  });
  it("moves to another list with what it has; what does not fit there is said", async () => {
    const s = setup();
    s.store.setPoints("todo.casa", "Regar as plantas", 10);
    s.store.setRoom("todo.casa", "Regar as plantas", "sala");
    s.store.setEquip("todo.casa", "Regar as plantas", "tv_1");
    s.store.setExternal("todo.casa", "Regar as plantas", true);
    s.recurring.setRule({ entity_id: "todo.casa", uid: "u3", summary: "Regar as plantas", days: 3 });
    s.byId.get("todo.casa").items[2].description = "Com adubo";
    const txt = await s.run("editar_tarefa", { id: "todo.casa:u3", mover_para: "compras" });
    assert.equal(txt, "Movida de Casa para Lista de compras: Regar as plantas · repete a cada 3 dias · 10 pontos · Sala de estar · TV · serviço externo. id: todo.mercado:n100\nA lista Lista de compras não aceita o prazo nem as notas: ficou de fora.");
    assert.deepEqual(s.calls.map((c) => [c.service, c.entityId]), [["add_item", "todo.mercado"], ["remove_item", "todo.casa"]]);
    assert.deepEqual(s.calls[0].data, { item: "Regar as plantas" });
    assert.equal(s.store.pointsFor("todo.casa", "Regar as plantas"), 0);
    assert.deepEqual(s.store.roomsFor("todo.casa", "Regar as plantas"), []);
    assert.equal(s.store.externalFor("todo.casa", "Regar as plantas"), null);
    assert.deepEqual(Object.values(s.store.rules).map((r) => [r.entity_id, r.uid, r.days]), [["todo.mercado", "n100", 3]]);
  });
  it("moves with a new name and deadline to a list that takes them; refuses lists that do not let", async () => {
    const s = setup({ mangle: true });
    assert.equal(await s.run("editar_tarefa", { id: "Leite", lista: "compras", mover_para: "todo.casa", texto: "Leite em pó", prazo: "hoje", notas: "2 latas" }), "Movida de Lista de compras para Casa: Leite em pó.");
    assert.deepEqual(s.calls[0].data, { item: "Leite em pó", due_date: "2026-11-08", description: "2 latas" });
    await s.fails("editar_tarefa", { id: "Assembleia", mover_para: "Casa" }, /A lista Avisos do condomínio não deixa tirar tarefas/);
    await s.fails("editar_tarefa", { id: "Ligar para o síndico", mover_para: "Avisos" }, /A lista Avisos do condomínio não deixa receber tarefas/);
    await s.fails("editar_tarefa", { id: "Café", mover_para: "Lugar nenhum" }, /Lista de destino não encontrada: Lugar nenhum/);
  });
  it("a task of the CronologIA is edited there; nothing to change is refused, saying what can", async () => {
    const s = setup({ placar: PLACAR });
    await s.fails("editar_tarefa", { id: "todo.casa:cr1", texto: "x" }, /Rotina da manhã vem do CronologIA: para editar, use o CronologIA/);
    await s.fails("editar_tarefa", { id: "Passar pano" }, /Diga o que muda: texto, prazo, horario, notas, repetir_dias, pontos, comodos, equipamentos, externo, mover_para\./);
    await setup({ on: OFF }).fails("editar_tarefa", { id: "Passar pano", lista: "Casa" }, /Diga o que muda: texto, notas, mover_para\./);
  });
});

describe("ferramentas: finding a task", () => {
  it("by its id, by its name (whole or a part), the pending one first; the list narrows it", async () => {
    const s = setup();
    assert.match(await s.run("apagar_tarefa", { id: "todo.mercado:m2" }), /^Apagada: Café \(Lista de compras\)\.$/);
    assert.match(await s.run("concluir_tarefa", { id: "conta de luz" }), /^Concluída: Pagar conta de luz \(Casa\)\./);
    s.byId.get("todo.casa").items.push(it_("Lavar o carro", { uid: "u9" }));
    assert.match(await s.run("concluir_tarefa", { id: "lavar o carro" }), /^Concluída: Lavar o carro/);
    assert.equal(s.calls.at(-1).data.item, "u9", "the pending one");
    await s.fails("concluir_tarefa", { id: "Leite" }, /Mais de uma tarefa com esse nome: Leite \(Lista de compras, id todo.mercado:m1\); Leite \(Lista velha, id todo.velha:v1\)\. Use o id\./);
    assert.match(await s.run("concluir_tarefa", { id: "Leite", lista: "Lista velha" }), /^Concluída: Leite \(Lista velha\)/);
    await s.fails("concluir_tarefa", { id: "a" }, /Mais de uma tarefa/);
    await s.fails("concluir_tarefa", { id: "Voar" }, /Tarefa não encontrada: Voar\. Busque com resolvia_tarefas\./);
    await s.fails("concluir_tarefa", { id: "todo.casa:zz" }, /Tarefa não encontrada: todo.casa:zz/);
    await s.fails("concluir_tarefa", { id: "todo.sumiu:u1" }, /Tarefa não encontrada: todo.sumiu:u1/);
    await s.fails("concluir_tarefa", { id: " " }, /Falta o id da tarefa/);
    await s.fails("concluir_tarefa", { id: "x", lista: "" }, /Tarefa não encontrada: x/);
  });
  it("a list is found by its id, its name or the only one with that part; no lists at all is said", async () => {
    const s = setup();
    await s.fails("tarefas", { lista: "  " }, /Tarefa|Lista não encontrada: \(vazio\)/);
    const none = setup({ lists: [] });
    await none.fails("criar_tarefa", { lista: "Casa", texto: "x" }, /Lista não encontrada: Casa\. As listas: nenhuma\./);
    await none.fails("criar_tarefa", { texto: "x" }, /Falta a lista\. As listas: nenhuma\./);
  });
});

describe("ferramentas: concluir_tarefa", () => {
  it("done by the person who is talking (their user in the scoreboard): the points go to them", async () => {
    const s = setup({ placar: PLACAR });
    s.store.setPoints("todo.casa", "Passar pano", 10);
    s.recurring.setRule({ entity_id: "todo.casa", uid: "u5", summary: "Passar pano", days: 7 });
    const txt = await s.run("concluir_tarefa", { id: "Passar pano" }, { pessoa: { id: "person.ana", nome: "Ana" } });
    assert.equal(txt, "Concluída: Passar pano (Casa). +10 pontos para Ana. Repete toda semana: volta sozinha em 2026-11-15.");
    assert.deepEqual(s.calls[0].data, { item: "u5", status: "completed" });
    assert.deepEqual(s.done[0], { entity_id: "todo.casa", uid: "u5", summary: "Passar pano", done: true, quem: "Ana" });
    assert.equal(await s.run("concluir_tarefa", { id: "Passar pano" }), "Já estava concluída: Passar pano (Casa).");
  });
  it("by the name of the person, or by someone else (quem); nobody: no points; someone not in it is refused", async () => {
    const s = setup({ placar: PLACAR });
    for (const t of ["Regar as plantas", "Limpar a calha", "Pagar conta de luz", "Consulta"]) s.store.setPoints("todo.casa", t, 5);
    assert.match(await s.run("concluir_tarefa", { id: "Regar as plantas" }, { pessoa: { id: "person.zeca", nome: "beto" } }), /\+5 pontos para Beto\./);
    assert.match(await s.run("concluir_tarefa", { id: "Limpar a calha", quem: "BETO" }, { pessoa: { id: "person.ana", nome: "Ana" } }), /\+5 pontos para Beto\./);
    assert.equal(await s.run("concluir_tarefa", { id: "Pagar conta de luz", quem: "ninguém" }), "Concluída: Pagar conta de luz (Casa).");
    await s.fails("concluir_tarefa", { id: "Consulta", quem: "Carla" }, /Essa pessoa não está no placar: Carla\. No placar: Ana, Beto\./);
    await s.fails("concluir_tarefa", { id: "Consulta" }, /Consulta vale 5 pontos no placar: diga quem fez em quem \(Ana, Beto\), ou quem "ninguém"/);
    await s.fails("concluir_tarefa", { id: "Consulta" }, /diga quem fez/, { pessoa: { id: "person.zeca", nome: "Zeca" } });
    assert.equal(s.item("todo.casa", "Consulta").status, "needs_action", "nothing done before knowing who");
  });
  it("a task of the CronologIA; with the points off, none (and no question)", async () => {
    const s = setup({ placar: PLACAR });
    assert.equal(await s.run("concluir_tarefa", { id: "todo.casa:cr1" }, { pessoa: { id: "person.ana" } }), "Concluída: Rotina da manhã (Casa). +7 pontos para Ana. Vem do CronologIA: fica feita lá também.");
    const off = setup({ placar: PLACAR, on: { ...ON, points: false } });
    off.store.setPoints("todo.casa", "Consulta", 5);
    assert.equal(await off.run("concluir_tarefa", { id: "Consulta" }), "Concluída: Consulta (Casa).");
    assert.equal(off.done.length, 0);
  });
  it("concluida false undoes it: back to pending, and the points of today come off", async () => {
    const s = setup({ placar: PLACAR });
    s.store.setPoints("todo.casa", "Lavar o carro", 10);
    assert.equal(await s.run("concluir_tarefa", { id: "Lavar o carro", concluida: false }), "Voltou para pendente: Lavar o carro (Casa). Os pontos de hoje saíram.");
    assert.deepEqual(s.done.at(-1), { entity_id: "todo.casa", uid: "u6", summary: "Lavar o carro", done: false });
    assert.equal(await s.run("concluir_tarefa", { id: "Lavar o carro", concluida: "false" }), "Já estava pendente: Lavar o carro (Casa).");
    await s.run("concluir_tarefa", { id: "Passar pano" });
    assert.equal(await s.run("concluir_tarefa", { id: "Passar pano", concluida: false }), "Voltou para pendente: Passar pano (Casa).");
    // a task of the CronologIA undone with the points off: it is told (it undoes its own), with no word on points
    const off = setup({ placar: PLACAR, on: { ...ON, points: false } });
    off.byId.get("todo.casa").items[7].status = "completed";
    assert.equal(await off.run("concluir_tarefa", { id: "todo.casa:cr1", concluida: false }), "Voltou para pendente: Rotina da manhã (Casa).");
    assert.equal(off.done.length, 1);
  });
  it("a list that does not let complete is said", async () => {
    await setup().fails("concluir_tarefa", { id: "Assembleia" }, /A lista Avisos do condomínio não deixa concluir tarefas/);
  });
});

describe("ferramentas: apagar_tarefa", () => {
  it("deletes it, and its repetition (so a done one does not come back)", async () => {
    const s = setup();
    const rule = s.recurring.setRule({ entity_id: "todo.casa", uid: "u6", summary: "Lavar o carro", days: 7 });
    rule.completed_at = NOW.getTime();
    assert.equal(await s.run("apagar_tarefa", { id: "todo.casa:u6" }), "Apagada: Lavar o carro (Casa). Não se repete mais.");
    assert.deepEqual(s.calls[0], { service: "remove_item", data: { item: ["u6"] }, entityId: "todo.casa" });
    assert.equal(Object.keys(s.store.rules).length, 0);
    await s.fails("apagar_tarefa", { id: "Assembleia" }, /A lista Avisos do condomínio não deixa apagar tarefas/);
  });
});

describe("ferramentas: the corners", () => {
  it("a list with date and time only (no day alone), a deadline Home Assistant cannot read, a list without deadlines", async () => {
    const lists = [
      { id: "todo.agenda", name: "Agenda", features: F.CREATE | F.UPDATE | F.DELETE | F.DUE_DATETIME, items: [it_("Dentista", { uid: "d1", due: "2026-11-09T12:00:00.000Z" }), it_("Estranha", { uid: "d2", due: "nunca" })] },
      { id: "todo.info", name: "Avisos", features: F.CREATE | F.UPDATE | F.DELETE, items: [it_("Sem sinal", { uid: "i1", due: "2026-11-01" })] },
    ];
    const s = setup({ lists });
    const r = await s.read("tarefas", { lista: "Agenda" });
    assert.deepEqual(r.tarefas.map((t) => [t.texto, t.prazo]), [["Dentista", "2026-11-09 09:00"], ["Estranha", undefined]]);
    await s.run("editar_tarefa", { id: "Dentista", prazo: "" });
    assert.deepEqual(s.calls.at(-1).data, { item: "d1", due_datetime: null });
    await s.run("criar_tarefa", { lista: "Agenda", texto: "Reunião", prazo: "amanhã" });
    assert.deepEqual(s.calls.at(-1).data, { item: "Reunião", due_datetime: "2026-11-09 09:00:00" });
    const before = s.calls.length;
    await s.run("editar_tarefa", { id: "Sem sinal", prazo: "" });
    assert.equal(s.calls.length, before, "nothing to clear where there are no deadlines");
  });
  it("a maintenance of the CronologIA; a completed repeating task says when it comes back; an item gone from the InventarIA", async () => {
    const s = setup({ placar: { ...PLACAR, espelho: { "todo.casa": { u4: { pontos: 0, tipo: "manutencao" } } } } });
    const rule = s.recurring.setRule({ entity_id: "todo.casa", uid: "u6", summary: "Lavar o carro", days: 7 });
    rule.reopen_at = local(2026, 11, 15).getTime();
    s.store.setEquip("todo.casa", "Lavar o carro", ["tv_1", "sumiu"]);
    s.store.setPoints("todo.casa", "Lavar o carro", 4);
    const done = (await s.read("tarefas", { situacao: "concluidas" })).tarefas[0];
    assert.deepEqual([done.repete, done.volta_em, done.equipamentos], ["toda semana", "2026-11-15", ["TV"]]);
    assert.equal((await s.read("tarefas", { busca: "calha" })).tarefas[0].cronologia, "manutenção (vem do CronologIA)");
    assert.deepEqual((await s.read("pontos", {})).tarefas, [{ id: "todo.casa:u6", lista: "Casa", texto: "Lavar o carro", pontos: 4, situacao: "concluída" }]);
  });
  it("no rooms in the InventarIA; a repetition out of range on edit; a list whose dates are information", async () => {
    await setup({ comodos: [] }).fails("criar_tarefa", { lista: "Casa", texto: "x", comodos: ["Sala"] }, /Cômodo não encontrado: Sala\. Os cômodos: nenhum \(veja o InventarIA\)\./);
    const s = setup();
    await s.fails("editar_tarefa", { id: "Passar pano", repetir_dias: 400 }, /repetir_dias: de 0 a 365\./);
    assert.match(await s.run("editar_tarefa", { id: "Luz do banheiro", texto: "Luz do banheiro queimada" }), /Antes: Luz do banheiro · prazo 2026-11-01\./);
    await s.fails("criar_tarefa", { lista: "Casa" }, /Falta o texto da tarefa/);
    assert.equal(await s.run("criar_tarefa", { lista: "Casa", texto: "Varrer\nLavar" }), "Criadas 2 tarefas em Casa: Varrer (id todo.casa:n100), Lavar (id todo.casa:n101).");
  });
  it("moving with a new repetition and who does it; a repetition not yet tied to a task goes with it", async () => {
    const s = setup();
    s.recurring.setRule({ entity_id: "todo.casa", summary: "Passar pano", days: 2 });
    await s.run("editar_tarefa", { id: "Passar pano", mover_para: "Google", repetir_dias: 5, externo: "Diarista" });
    assert.deepEqual(Object.values(s.store.rules).map((r) => [r.entity_id, r.days]), [["todo.google", 5]]);
    assert.equal(s.store.externalFor("todo.google", "Passar pano"), "Diarista");
    s.recurring.setRule({ entity_id: "todo.casa", summary: "Limpar a calha", days: 9 });
    assert.equal(await s.run("apagar_tarefa", { id: "Limpar a calha" }), "Apagada: Limpar a calha (Casa). Não se repete mais.");
    assert.equal(Object.values(s.store.rules).length, 1);
  });
  it("with the repetition off, completing says nothing about coming back", async () => {
    const s = setup({ on: OFF });
    s.recurring.setRule({ entity_id: "todo.casa", uid: "u5", summary: "Passar pano", days: 7 });
    assert.equal(await s.run("concluir_tarefa", { id: "Passar pano" }), "Concluída: Passar pano (Casa).");
  });
});
