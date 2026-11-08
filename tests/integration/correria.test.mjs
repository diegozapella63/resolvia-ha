// CorrerIA (the WhatsApp, the Claude and the Gemini): the switch writes share/resolvia/correria.json with its own key,
// and /api/integracao/ferramentas lists and runs the tools against the simulated Home Assistant (the to-do lists),
// with the points of the scoreboard of the CronologIA going to the person who is talking.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Stack, waitFor, items, rawPost, APP_VERSION } from "./_harness.mjs";

const ROUTE = "/api/integracao/ferramentas";
const CASA = "todo.casa";
const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const ANA = { id: "person.ana", nome: "Ana" };
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const inDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return ymd(d);
};

let stack;
let c;
const file = () => path.join(stack.dirs.share, "resolvia", "correria.json");
const conn = () => JSON.parse(fs.readFileSync(file(), "utf8"));
const auth = (key = conn().chave) => ({ authorization: `Bearer ${key}`, "x-app": "CorrerIA" });
const list = (key) => fetch(`${stack.appUrl}${ROUTE}`, { headers: auth(key) });
async function call(nome, argumentos = {}, { pessoa = ANA, cliente = "Claude", key, raw } = {}) {
  const res = await fetch(`${stack.appUrl}${ROUTE}`, { method: "POST", headers: { ...auth(key), "content-type": "application/json" }, body: raw ?? JSON.stringify({ nome, argumentos, pessoa, cliente }) });
  return { status: res.status, body: await res.json() };
}
const ok = async (nome, args, opts) => {
  const r = await call(nome, args, opts);
  assert.equal(r.status, 200, JSON.stringify(r.body));
  return r.body.texto;
};
const events = () => stack.firedEvents("cronologia_pontos");

before(async () => {
  stack = new Stack({ appEnv: { RESOLVIA_URL_INTERNA: "http://resolvia.local:8099/" } });
  stack.writeShare("cronologia/integracao.json", {
    app: "CronologIA",
    versao: "1.60.0",
    gravado_em: new Date().toISOString(),
    placar: { ativo: true, periodo: "semana", participantes: ["Ana", "Beto"], usuarios: { "u-ana": "Ana" } },
  });
  await stack.start();
  c = await stack.client();
});
after(() => stack && stack.stop());

describe("CorrerIA off (the default)", () => {
  it("no file, and the route refuses any key", async () => {
    assert.deepEqual(await c.call("resolvia/correria/get"), { on: false, ultimo: null });
    assert.equal(fs.existsSync(file()), false);
    const res = await fetch(`${stack.appUrl}${ROUTE}`, { headers: { authorization: "Bearer qualquer" } });
    assert.equal(res.status, 401);
    assert.deepEqual(await res.json(), { erro: "Chave inválida ou CorrerIA desligado no ResolvIA." });
    assert.equal((await call("resumo", {}, { key: "qualquer" })).status, 401);
  });
});

describe("CorrerIA on", () => {
  before(() => c.call("resolvia/prefs/set_app", { prefs: { correria_on: true, points_on: true } }));

  it("writes the file of the contract (600) with its own key, kept in /data/correria.key (600)", async () => {
    const j = await waitFor(() => fs.existsSync(file()) && conn(), { what: "correria.json" });
    assert.deepEqual(Object.keys(j), ["app", "nome", "assunto", "url", "ip_url", "chave", "versao", "ferramentas", "gravado_em"]);
    assert.deepEqual([j.app, j.nome, j.url, j.ip_url, j.versao, j.ferramentas], ["resolvia", "ResolvIA", "http://resolvia.local:8099", null, APP_VERSION, ROUTE]);
    assert.equal(fs.statSync(file()).mode & 0o777, 0o600);
    const keyFile = path.join(stack.dirs.data, "correria.key");
    assert.equal(fs.readFileSync(keyFile, "utf8"), j.chave);
    assert.equal(fs.statSync(keyFile).mode & 0o777, 0o600);
    assert.ok(j.chave.length >= 43);
  });

  it("lists the tools with the instructions; a wrong or missing key is 401; other methods 405", async () => {
    const res = await list();
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.versao, APP_VERSION);
    assert.match(body.instrucoes, /^ResolvIA: .*resolvia_resumo/);
    assert.deepEqual(body.ferramentas.map((t) => t.nome), ["resumo", "tarefas", "pontos", "criar_tarefa", "editar_tarefa", "concluir_tarefa", "apagar_tarefa"]);
    assert.ok(body.ferramentas.every((t) => t.titulo && t.descricao && t.entrada.type === "object" && typeof t.grava === "boolean" && typeof t.apaga === "boolean"));
    assert.equal((await list("errada")).status, 401);
    assert.equal((await fetch(`${stack.appUrl}${ROUTE}`)).status, 401);
    const put = await fetch(`${stack.appUrl}${ROUTE}`, { method: "PUT", headers: auth() });
    assert.deepEqual([put.status, await put.json()], [405, { erro: "Use GET ou POST." }]);
  });

  it("resumo: today, the lists and what is late", async () => {
    const r = JSON.parse(await ok("resumo"));
    assert.equal(r.hoje, inDays(0));
    assert.deepEqual(r.listas.map((l) => l.nome), ["Casa", "Problem List", "Shopping list", "To-do list"]);
    assert.deepEqual(r.atrasadas.map((t) => t.texto), ["Pagar conta de luz"]);
    assert.match(r.atrasadas[0].id, /^todo\.casa:u\d+$/);
    assert.deepEqual(r.placar, { participantes: ["Ana", "Beto"], voce: "Ana" });
  });

  it("criar_tarefa adds it to the list of Home Assistant, with the deadline and the points (the repetition only once it is on)", async () => {
    const off = await call("criar_tarefa", { lista: "Casa", texto: "Comprar pilhas", repetir_dias: 7 });
    assert.deepEqual(off, { status: 400, body: { erro: "Repetir depois de concluir está desligado no ResolvIA." } });
    await c.call("resolvia/prefs/set_app", { prefs: { repeat_on: true } });
    const txt = await ok("criar_tarefa", { lista: "casa", texto: "Comprar pilhas", prazo: "amanhã", pontos: 10, repetir_dias: 7 });
    const m = /^Criada em Casa: Comprar pilhas · prazo (\S+) · repete toda semana · 10 pontos\. id: (todo\.casa:u\d+)$/.exec(txt);
    assert.ok(m, txt);
    assert.equal(m[1], inDays(1));
    const item = (await items(c, CASA)).find((i) => i.summary === "Comprar pilhas");
    assert.equal(`todo.casa:${item.uid}`, m[2]);
    assert.equal(item.due, inDays(1));
    assert.equal((await c.call("resolvia/points/get")).points[CASA]["comprar pilhas"], 10);
    const sub = await c.subscribe("resolvia/recurring/subscribe");
    const { rules } = await waitFor(() => sub.events[0], { what: "the rules" });
    assert.ok(rules.some((r) => r.entity_id === CASA && r.uid === item.uid && r.days === 7));
    // the CronologIA learns the points of the new task
    await waitFor(() => stack.presence().pontos[CASA] && stack.presence().pontos[CASA]["comprar pilhas"] === 10, { what: "points in integracao.json" });
    assert.ok(stack.app.lines.some((l) => /CorrerIA: Claude \(Ana\) criar_tarefa → Criada em Casa: Comprar pilhas/.test(l)));
  });

  it("concluir_tarefa: done in Home Assistant, the points go to the person talking; concluida false undoes it", async () => {
    const before = (await events()).length;
    assert.equal(await ok("concluir_tarefa", { id: "Comprar pilhas" }), `Concluída: Comprar pilhas (Casa). +10 pontos para Ana. Repete toda semana: volta sozinha em ${inDays(7)}.`);
    assert.equal((await items(c, CASA)).find((i) => i.summary === "Comprar pilhas").status, "completed");
    const got = await waitFor(async () => ((await events()).length > before ? (await events()).at(-1).data : null), { what: "points event" });
    assert.deepEqual({ ...got, chave: "k" }, { acao: "somar", chave: "k", quem: "Ana", pontos: 10, titulo: "Comprar pilhas", origem: "ResolvIA" });
    assert.match(got.chave, /^resolvia\|todo\.casa\|u\d+\|\d{4}-\d{2}-\d{2}$/);
    assert.equal(await ok("concluir_tarefa", { id: "Comprar pilhas", concluida: false }), "Voltou para pendente: Comprar pilhas (Casa). Os pontos de hoje saíram.");
    assert.deepEqual((await events()).at(-1).data, { acao: "desfazer", chave: got.chave, origem: "ResolvIA" });
    assert.equal((await items(c, CASA)).find((i) => i.summary === "Comprar pilhas").status, "needs_action");
    // someone the scoreboard does not know (by the user or the name) is asked who did it
    const who = await call("concluir_tarefa", { id: "Comprar pilhas" }, { pessoa: { id: "person.beto", nome: "Bia" } });
    assert.equal(who.status, 400);
    assert.match(who.body.erro, /vale 10 pontos no placar: diga quem fez em quem \(Ana, Beto\)/);
  });

  it("editar_tarefa renames it in Home Assistant (the points go along); tarefas, repeticoes and pontos see it", async () => {
    const txt = await ok("editar_tarefa", { id: "Comprar pilhas", texto: "Comprar pilhas AA", prazo: "" });
    assert.match(txt, /^Alterada em Casa: Comprar pilhas AA · repete toda semana · 10 pontos\. Antes: Comprar pilhas · prazo \S+ · repete toda semana · 10 pontos\. id: todo\.casa:u\d+$/);
    const item = (await items(c, CASA)).find((i) => i.summary === "Comprar pilhas AA");
    assert.equal(item.due, undefined);
    assert.deepEqual((await c.call("resolvia/points/get")).points[CASA], { "comprar pilhas aa": 10 });
    const t = JSON.parse(await ok("tarefas", { lista: "todo.casa", busca: "pilhas" }));
    assert.deepEqual(t, { encontradas: 1, mostrando: 1, tarefas: [{ id: `todo.casa:${item.uid}`, lista: "Casa", texto: "Comprar pilhas AA", situacao: "pendente", repete: "toda semana", pontos: 10 }] });
    const r = JSON.parse(await ok("repeticoes"));
    assert.deepEqual(r.repeticoes, [{ lista: "Casa", texto: "Comprar pilhas AA", repete: "toda semana", dias: 7, id: `todo.casa:${item.uid}`, situacao: "pendente" }]);
    const p = JSON.parse(await ok("pontos", {}, { pessoa: { id: "person.beto", nome: "Beto" } }));
    assert.deepEqual(p.placar, { participantes: ["Ana", "Beto"], fecha: "toda semana", voce: "Beto" });
    assert.deepEqual(p.tarefas, [{ id: `todo.casa:${item.uid}`, lista: "Casa", texto: "Comprar pilhas AA", pontos: 10, situacao: "pendente" }]);
  });

  it("moves a task to another list, and apagar_tarefa deletes it (with its repetition)", async () => {
    assert.match(await ok("editar_tarefa", { id: "Café", mover_para: "Casa" }), /^Movida de Shopping list para Casa: Café\. id: todo\.casa:u\d+$/);
    assert.ok(!(await items(c, SHOP)).some((i) => i.summary === "Café"));
    assert.ok((await items(c, CASA)).some((i) => i.summary === "Café"));
    assert.equal(await ok("apagar_tarefa", { id: "Comprar pilhas AA", lista: "Casa" }), "Apagada: Comprar pilhas AA (Casa). Não se repete mais.");
    assert.ok(!(await items(c, CASA)).some((i) => i.summary === "Comprar pilhas AA"));
    assert.deepEqual(JSON.parse(await ok("repeticoes")).repeticoes, []);
  });

  it("several at once, one per line; without a person or a client", async () => {
    const txt = await ok("criar_tarefa", { lista: "Shopping", texto: "Pão\nManteiga" }, { pessoa: null, cliente: "" });
    assert.match(txt, /^Criadas 2 tarefas em Shopping list: Pão \(id todo\.notas_e_rotinas_do_alexa_shopping_list:u\d+\), Manteiga \(id .+\)\.$/);
    assert.ok(stack.app.lines.some((l) => /CorrerIA: CorrerIA criar_tarefa → Criadas 2 tarefas/.test(l)));
  });

  it("400 says what is accepted; 404 for a tool it does not have; a body that is not JSON or too big", async () => {
    assert.deepEqual(await call("tarefas", { lista: "Garagem" }), { status: 400, body: { erro: "Lista não encontrada: Garagem. As listas: Casa (todo.casa), Problem List (todo.analise_dos_dispositivos_problem_list), Shopping list (todo.notas_e_rotinas_do_alexa_shopping_list), To-do list (todo.notas_e_rotinas_do_alexa_to_do_list)." } });
    assert.deepEqual(await call("criar_tarefa", { lista: "Casa", texto: "x", prazo: "31/02/2026" }), { status: 400, body: { erro: "Data inválida: 31/02/2026. Use AAAA-MM-DD (ou hoje, amanhã)." } });
    assert.deepEqual(await call("voar"), { status: 404, body: { erro: "Ferramenta desconhecida: voar." } });
    assert.deepEqual(await call("", {}, { raw: "{não é json" }), { status: 400, body: { erro: "JSON inválido." } });
    assert.deepEqual(await call("", {}, { raw: "null" }), { status: 400, body: { erro: "JSON inválido." } });
    assert.match(await rawPost(stack, ROUTE, 300 * 1024, auth()), /^HTTP 413 \{"erro":"Pedido grande demais."\}$/);
  });

  it("the card knows who used it last", async () => {
    await ok("resumo", {}, { cliente: "Gemini" });
    const st = await c.call("resolvia/correria/get");
    assert.equal(st.on, true);
    assert.deepEqual({ ...st.ultimo, em: "x" }, { cliente: "Gemini", em: "x", nome: "resumo" });
    assert.match(st.ultimo.em, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
  });

  it("off: the file goes away and the key stops working; on again, the same key", async () => {
    const key = conn().chave;
    await c.call("resolvia/prefs/set_app", { prefs: { correria_on: null } });
    assert.equal(fs.existsSync(file()), false);
    assert.equal((await list(key)).status, 401);
    await c.call("resolvia/prefs/set_app", { prefs: { correria_on: true } });
    assert.equal(conn().chave, key);
    assert.equal((await list(key)).status, 200);
  });

  it("a backup restored with the CorrerIA off turns it off (the file goes away)", async () => {
    const snap = await (await fetch(`${stack.appUrl}/api/export/json`)).json();
    snap.prefs.app.correria_on = false;
    const res = await fetch(`${stack.appUrl}/api/import`, { method: "POST", body: JSON.stringify(snap), headers: { "x-file-name": "resolvia.json" } });
    assert.equal(res.status, 200);
    assert.equal(fs.existsSync(file()), false);
    assert.equal((await c.call("resolvia/correria/get")).on, false);
  });
});

describe("CorrerIA in production (no dev mode)", () => {
  let prod;
  before(async () => {
    prod = new Stack({ dev: false, fakeEnv: { FAKE_FAIL: "call_service" } });
    // turned on before (the WebSocket only answers the ingress here)
    fs.writeFileSync(path.join(prod.dirs.data, "resolvia.json"), JSON.stringify({ prefs: { lists: {}, app: { correria_on: true } } }));
    await prod.start();
  });
  after(() => prod && prod.stop());

  it("answers the other apps (not the ingress) only on its route, with the key; Home Assistant failing is a 502", async () => {
    const j = JSON.parse(fs.readFileSync(path.join(prod.dirs.share, "resolvia", "correria.json"), "utf8"));
    assert.match(j.url, /^http:\/\/[^/]+:\d+$/);
    assert.equal((await fetch(`${prod.appUrl}/`)).status, 403);
    const h = { authorization: `Bearer ${j.chave}` };
    assert.equal((await fetch(`${prod.appUrl}${ROUTE}`, { headers: h })).status, 200);
    assert.equal((await fetch(`${prod.appUrl}${ROUTE}`, { headers: { authorization: "Bearer outra" } })).status, 401);
    const res = await fetch(`${prod.appUrl}${ROUTE}`, { method: "POST", headers: h, body: JSON.stringify({ nome: "criar_tarefa", argumentos: { lista: "Casa", texto: "Teste" } }) });
    assert.equal(res.status, 502);
    assert.match((await res.json()).erro, /^O Home Assistant não respondeu: /);
  });
});
