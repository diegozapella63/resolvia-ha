// Recompensas: points per task, the CronologIA scoreboard read from
// share/cronologia/integracao.json, and the cronologia_pontos events the app fires.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, waitFor } from "./_harness.mjs";

const CASA = "todo.casa";
const MIRRORED = "cr-uid-0001";

let stack;
let ana;
let stranger;
before(async () => {
  stack = new Stack();
  // written before the app starts: the app keeps what it read for 15 s
  stack.writeShare("cronologia/integracao.json", {
    app: "CronologIA",
    versao: "1.40.0",
    gravado_em: new Date().toISOString(),
    placar: { ativo: true, periodo: "semana", participantes: ["Ana", "José"], usuarios: { "user-ana": "Ana" } },
    espelho: { [CASA]: { [MIRRORED]: { pontos: 7, tipo: "rotina" } } },
  });
  await stack.start();
  ana = await stack.client({ "x-remote-user-id": "user-ana", "x-remote-user-name": "ana" });
  stranger = await stack.client({ "x-remote-user-id": "user-visita" });
});
after(() => stack && stack.stop());

const events = () => stack.firedEvents("cronologia_pontos");
const lastEvent = async (n) => (await waitFor(async () => ((await events()).length >= n ? events() : null), { what: `${n} events` })).at(-1).data;

describe("points off (the default)", () => {
  it("shows the scoreboard and who I am, but gives no points", async () => {
    const p = await ana.call("resolvia/points/get");
    assert.equal(p.on, false);
    assert.deepEqual(p.points, {});
    assert.deepEqual(p.placar, { versao: "1.40.0", ativo: true, desligado: false, periodo: "semana", participantes: ["Ana", "José"], eu: "Ana" });
    assert.deepEqual(p.espelho, { [CASA]: { [MIRRORED]: { pontos: 7, tipo: "rotina" } } });
    assert.equal((await stranger.call("resolvia/points/get")).placar.eu, null);
    await ana.call("resolvia/points/set", { entity_id: CASA, summary: "Pagar conta de luz", points: 20 });
    assert.deepEqual(await ana.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: true }), { points: 0 });
    assert.equal((await events()).length, 0);
  });
});

describe("points on", () => {
  before(() => ana.call("resolvia/prefs/set_app", { prefs: { points_on: true } }));

  it("a task done by someone in the scoreboard gives its points to them", async () => {
    const out = await ana.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: true });
    assert.match(out.key, /^resolvia\|todo\.casa\|u9\|\d{4}-\d{2}-\d{2}$/);
    assert.deepEqual({ ...out, key: "k" }, { key: "k", who: "Ana", points: 20, participantes: ["Ana", "José"] });
    assert.deepEqual(await lastEvent(1), { acao: "somar", chave: out.key, quem: "Ana", pontos: 20, titulo: "Pagar conta de luz", origem: "ResolvIA" });
  });

  it("unchecking takes them back", async () => {
    const out = await ana.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: false });
    assert.equal(out.points, 0);
    assert.deepEqual(await lastEvent(2), { acao: "desfazer", chave: out.key, origem: "ResolvIA" });
  });

  it("someone not in the scoreboard is asked who did it; then names a person (any case and accents)", async () => {
    assert.deepEqual(await stranger.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: true }), { ask: true, points: 20, participantes: ["Ana", "José"] });
    const out = await stranger.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: true, quem: "jose" });
    assert.equal(out.who, "José");
    assert.equal((await lastEvent(3)).quem, "José");
    await assert.rejects(stranger.call("resolvia/points/done", { entity_id: CASA, uid: "u9", summary: "Pagar conta de luz", done: true, quem: "Maria" }), { code: "invalid_format", message: "Essa pessoa não está no placar" });
  });

  it("the points can go to someone else afterwards", async () => {
    const key = (await (await events()).at(-1)).data.chave;
    assert.deepEqual(await ana.call("resolvia/points/reassign", { key, quem: "ANA" }), { who: "Ana" });
    assert.deepEqual(await lastEvent(4), { acao: "trocar", chave: key, quem: "Ana", origem: "ResolvIA" });
    await assert.rejects(ana.call("resolvia/points/reassign", { key: "outra|coisa", quem: "Ana" }), { code: "invalid_format" });
    await assert.rejects(ana.call("resolvia/points/reassign", { key, quem: "Ninguém" }), { code: "invalid_format" });
  });

  it("a task the CronologIA keeps here gives the points it says (espelho key, no date)", async () => {
    const out = await ana.call("resolvia/points/done", { entity_id: CASA, uid: MIRRORED, summary: "Rotina da manhã", done: true });
    assert.deepEqual(out, { key: `espelho|${CASA}|${MIRRORED}`, who: "Ana", points: 7, participantes: ["Ana", "José"] });
    assert.deepEqual(await lastEvent(5), { acao: "somar", chave: out.key, quem: "Ana", pontos: 7, titulo: "Rotina da manhã", origem: "ResolvIA" });
    assert.deepEqual(await ana.call("resolvia/points/done", { entity_id: CASA, uid: MIRRORED, done: false }), { points: 0, key: out.key });
    assert.equal((await lastEvent(6)).acao, "desfazer");
    assert.deepEqual(await stranger.call("resolvia/points/done", { entity_id: CASA, uid: MIRRORED, summary: "Rotina", done: true }), { ask: true, points: 7, participantes: ["Ana", "José"] });
  });

  it("a task without points gives nothing and fires nothing", async () => {
    const n = (await events()).length;
    assert.deepEqual(await ana.call("resolvia/points/done", { entity_id: CASA, uid: "u8", summary: "Passar pano na casa", done: true }), { points: 0 });
    assert.equal((await events()).length, n);
  });

  it("the points follow the folded name of the task", async () => {
    const out = await ana.call("resolvia/points/done", { entity_id: CASA, uid: "u99", summary: "PAGAR CONTA DE LUZ", done: true });
    assert.equal(out.points, 20);
  });

  it("a '|' in the uid cannot break the key", async () => {
    const out = await ana.call("resolvia/points/done", { entity_id: CASA, uid: "a|b|c", summary: "Pagar conta de luz", done: true });
    assert.match(out.key, /^resolvia\|todo\.casa\|abc\|\d{4}-\d{2}-\d{2}$/);
  });

  it("refuses tasks of other entities or without uid, and invalid points", async () => {
    await assert.rejects(ana.call("resolvia/points/done", { entity_id: "light.x", uid: "u1", done: true }), { code: "invalid_format" });
    await assert.rejects(ana.call("resolvia/points/done", { entity_id: CASA, uid: "", done: true }), { code: "invalid_format" });
    await assert.rejects(ana.call("resolvia/points/done", { entity_id: CASA, done: true }), { code: "invalid_format" });
    await assert.rejects(ana.call("resolvia/points/set", { entity_id: CASA, summary: "x", points: 5000 }), { message: "Pontos entre 0 e 1000" });
  });

  it("renaming a task moves its points", async () => {
    const p = await ana.call("resolvia/points/set", { entity_id: CASA, summary: "Pagar a conta de luz", points: 20, previous_summary: "Pagar conta de luz" });
    assert.deepEqual(p.points, { [CASA]: { "pagar a conta de luz": 20 } });
    await waitFor(() => (stack.presence().pontos[CASA] || {})["pagar a conta de luz"] === 20, { what: "points in the file" });
  });
});
