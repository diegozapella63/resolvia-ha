// frontend/src/points.js: Recompensas (tasks worth points in the CronologIA scoreboard).
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, click, fire, labels, controls, fakeHass, hostOf } from "./_lit.mjs";
import { PointsMixin, POINT_PICKS, stripMark, markOf } from "../frontend/src/points.js";

const Panel = hostOf(PointsMixin);
const PLACAR = { ativo: true, participantes: ["Ana", "Beto"], periodo: "quinzena", versao: "1.37.2", eu: "Ana" };
const pts = (over = {}) => ({ on: true, placar: PLACAR, points: { "todo.casa": { "lavar louca": 10, "tirar o lixo": 5 } }, espelho: { "todo.casa": { u9: { pontos: 30, tipo: "rotina" } } }, ...over });
const panel = (p = pts(), answers = {}) => {
  const x = new Panel(fakeHass(answers));
  x._pts = p;
  return x;
};
const LIST = { id: "todo.casa", name: "Casa" };

describe("points: marks of the CronologIA", () => {
  it("stripMark takes the [cr:xxxxxxxx] out of the notes, at the end or in the middle", () => {
    assert.equal(stripMark("Trocar filtro [cr:0a1b2c3d]"), "Trocar filtro");
    assert.equal(stripMark("a [cr:0a1b2c3d] b"), "a b");
    assert.equal(stripMark("sem marca [cr:XYZ]"), "sem marca [cr:XYZ]");
    assert.equal(stripMark(null), "");
  });
  it("markOf finds the mark (or nothing)", () => {
    assert.equal(markOf("x [cr:deadbeef]"), "[cr:deadbeef]");
    assert.equal(markOf("x"), "");
    assert.equal(markOf(undefined), "");
  });
  it("the picks are 5, 10, 20, 30, 50", () => assert.deepEqual(POINT_PICKS, [5, 10, 20, 30, 50]));
});

describe("points: what a task is worth", () => {
  it("active only with points on and the scoreboard on", () => {
    assert.equal(panel()._ptsActive(), true);
    assert.equal(panel(pts({ on: false }))._ptsActive(), false);
    assert.equal(panel(pts({ placar: { ...PLACAR, ativo: false } }))._ptsActive(), false);
    assert.equal(panel(pts({ placar: null }))._ptsActive(), false);
    assert.equal(panel(null)._ptsActive(), false);
  });
  it("the raw points are found by the folded name (accents, case, spaces)", () => {
    const p = panel();
    assert.equal(p._rawPoints("todo.casa", "  Lavar   LOUÇA "), 10);
    assert.equal(p._rawPoints("todo.casa", "outra"), 0);
    assert.equal(p._rawPoints("todo.outra", "Lavar louça"), 0);
    assert.equal(panel(pts({ on: false }))._rawPoints("todo.casa", "Lavar louça"), 10, "even with points off");
  });
  it("a task of the CronologIA brings its own points (only while the scoreboard is on)", () => {
    assert.deepEqual(panel()._mirrored("todo.casa", "u9"), { pontos: 30, tipo: "rotina" });
    assert.equal(panel()._mirrored("todo.casa", null), null);
    assert.equal(panel()._pointsOf("todo.casa", "qualquer", "u9"), 30);
    assert.equal(panel(pts({ placar: { ...PLACAR, ativo: false } }))._pointsOf("todo.casa", "qualquer", "u9"), 0);
    assert.equal(panel()._pointsOf("todo.casa", "Lavar louça", "u1"), 10);
    assert.equal(panel(pts({ on: false }))._pointsOf("todo.casa", "Lavar louça"), 0);
  });
});

describe("points: saving", () => {
  it("_loadPoints asks the server; an error leaves no points", async () => {
    const p = panel(null, { "resolvia/points/get": pts() });
    await p._loadPoints();
    assert.equal(p._pts.on, true);
    const q = panel(pts(), { "resolvia/points/get": new Error("x") });
    await q._loadPoints();
    assert.equal(q._pts, null);
    const r = panel(null);
    delete r.hass.resolvia;
    await r._loadPoints();
    assert.equal(r.hass.calls.length, 0, "outside the app: nothing to ask");
  });
  it("_setTaskPoints sends the old name only after a rename; an error becomes a toast", async () => {
    const p = panel(pts(), { "resolvia/points/set": (m) => ({ ...pts(), echo: m }) });
    await p._setTaskPoints("todo.casa", "Lavar louça", 20);
    await p._setTaskPoints("todo.casa", "Louça", 0, "Lavar louça");
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/points/set", entity_id: "todo.casa", summary: "Lavar louça", points: 20 });
    assert.deepEqual(p.hass.calls[1], { type: "resolvia/points/set", entity_id: "todo.casa", summary: "Louça", points: 0, previous_summary: "Lavar louça" });
    const q = panel(pts(), { "resolvia/points/set": new Error("sem rede") });
    await q._setTaskPoints("todo.casa", "x", 5);
    assert.deepEqual(q.toasts, ["Não consegui salvar os pontos: sem rede"]);
  });
  it("_setPointsOn saves true or null (the default), reloads and vibrates", async () => {
    const p = panel(pts(), { "resolvia/points/get": pts({ on: false }) });
    await p._setPointsOn(false);
    await p._setPointsOn(true);
    assert.deepEqual(p.prefs, [{ points_on: null }, { points_on: true }]);
    assert.equal(p.hass.calls.filter((c) => c.type === "resolvia/points/get").length, 2);
    assert.deepEqual(p.haptics, ["light", "light"]);
  });
});

describe("points: completing a task", () => {
  const item = { uid: "u1", summary: "Lavar louça" };
  it("an error keeps the usual toast and its Desfazer, saying the points didn't go", async () => {
    const p = panel(pts(), { "resolvia/points/done": new Error("offline") });
    const undo = { label: "Desfazer", run() {} };
    await p._givePoints(LIST, item, "Resolvido: Lavar louça", undo);
    assert.deepEqual(p.toasts, ["Resolvido: Lavar louça · os pontos não foram: offline"]);
    assert.equal(p.undos[0], undo);
  });
  it("no points: just the usual toast", async () => {
    const p = panel(pts(), { "resolvia/points/done": { points: 0 } });
    await p._givePoints(LIST, item, "Resolvido: x", null);
    assert.deepEqual(p.toasts, ["Resolvido: x"]);
  });
  it("with points: who did it, and Foi <the other> when there are two", async () => {
    const p = panel(pts(), { "resolvia/points/done": { points: 10, who: "Ana", key: "k1", participantes: ["Ana", "Beto"] }, "resolvia/points/reassign": {} });
    await p._givePoints(LIST, item, "Resolvido: x", null);
    assert.deepEqual(p.toasts, ["Resolvido por Ana · +10"]);
    assert.equal(p.undos[0].label, "Foi Beto");
    await p.undos[0].run();
    assert.deepEqual(p.hass.calls.at(-1), { type: "resolvia/points/reassign", key: "k1", quem: "Beto" });
    assert.equal(p.toasts.at(-1), "Pontos para Beto");
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/points/done", entity_id: "todo.casa", uid: "u1", summary: "Lavar louça", done: true });
  });
  it("a reassign that fails says why", async () => {
    const p = panel(pts(), { "resolvia/points/done": { points: 10, who: "Ana", key: "k1", participantes: ["Ana", "Beto"] }, "resolvia/points/reassign": new Error("não deu") });
    await p._givePoints(LIST, item, "Resolvido: x", null);
    await p.undos[0].run();
    assert.equal(p.toasts.at(-1), "não deu");
  });
  it("three in the scoreboard: the usual Desfazer instead of Foi …", async () => {
    const undo = { label: "Desfazer" };
    const p = panel(pts(), { "resolvia/points/done": { points: 5, who: "Ana", participantes: ["Ana", "Beto", "Caio"] } });
    await p._givePoints(LIST, item, "Resolvido: x", undo);
    assert.equal(p.undos[0], undo);
  });
  it("this user isn't in the scoreboard: Quem fez? and then the points go to who was picked", async () => {
    let n = 0;
    const p = panel(pts(), { "resolvia/points/done": (m) => (n++ ? { points: 10, who: m.quem, participantes: [m.quem] } : { ask: true, points: 10, participantes: ["Ana", "Beto"] }) });
    await p._givePoints(LIST, item, "Resolvido: x", null);
    assert.equal(p._sheet, "who");
    assert.equal(p._form.points, 10);
    const sheet = p._renderWhoSheet();
    assert.match(text(sheet), /Quem fez\? .*Lavar louça · \+10 pontos/);
    assert.deepEqual(labels(sheet), ["Fechar", "A Ana", "B Beto", "Ninguém do placar (sem pontos)"]);
    click(sheet, "B Beto");
    await new Promise((r) => setImmediate(r));
    assert.equal(p._sheet, null);
    assert.equal(p.hass.calls[1].quem, "Beto");
    assert.equal(p.toasts.at(-1), "Resolvido por Beto · +10");
  });
  it("Ninguém do placar: no points, the usual toast", async () => {
    const p = panel(pts(), { "resolvia/points/done": { ask: true, points: 10, participantes: ["Ana"] } });
    await p._givePoints(LIST, item, "Resolvido: x", null);
    click(p._renderWhoSheet(), "Ninguém do placar (sem pontos)");
    assert.deepEqual(p.toasts, ["Resolvido: x"]);
    assert.equal(p.hass.calls.length, 1);
  });
  it("_takePoints undoes today's points only when the task is worth something", async () => {
    const p = panel();
    p._takePoints(LIST, { uid: "u2", summary: "Sem pontos" });
    p._takePoints(LIST, { uid: "u1", summary: "Lavar louça" });
    p._takePoints(LIST, { uid: "u9", summary: "do CronologIA" });
    assert.deepEqual(p.hass.calls.map((c) => [c.summary, c.done]), [["Lavar louça", false], ["do CronologIA", false]]);
    const off = panel(pts({ on: false }));
    off._takePoints(LIST, { uid: "u1", summary: "Lavar louça" });
    assert.equal(off.hass.calls.length, 0, "points off: nothing to take");
  });
});

describe("points: on the screen", () => {
  it("the tag shows +N only when the task gives points now", () => {
    assert.equal(text(panel()._renderPointsTag("todo.casa", { summary: "Lavar louça" })), "+10");
    assert.equal(text(panel()._renderPointsTag("todo.casa", { summary: "x" })), "");
    assert.equal(text(panel(pts({ on: false }))._renderPointsTag("todo.casa", { summary: "Lavar louça" })), "");
  });
  it("the item sheet field: hidden for tasks of the CronologIA and with points off", () => {
    assert.equal(text(panel()._renderPointsField({ mirrored: true })), "");
    assert.equal(text(panel(pts({ on: false }))._renderPointsField({})), "");
  });
  it("the item sheet field: picks, Outro and what the points do", () => {
    const p = panel();
    p._form = { points: 0 };
    let f = p._renderPointsField(p._form);
    assert.deepEqual(labels(f), ["Sem pontos", "+5", "+10", "+20", "+30", "+50", "Outro"]);
    assert.doesNotMatch(text(f), /Quem concluir/);
    click(f, "+20");
    assert.equal(p._form.points, 20);
    f = p._renderPointsField(p._form);
    assert.match(text(f), /Quem concluir ganha 20 pontos no placar do CronologIA \(Ana × Beto\)\./);
    click(f, "Outro");
    assert.deepEqual([p._form.points, p._form.pointsCustom], [20, true]);
    f = p._renderPointsField(p._form);
    fire(f, "", "input", { target: { value: "5000" } });
    assert.equal(p._form.points, 1000, "at most 1000");
    fire(p._renderPointsField(p._form), "", "input", { target: { value: "abc" } });
    assert.equal(p._form.points, 0);
  });
  it("Outro with nothing set starts at 15; a value not among the picks shows as Outro", () => {
    const p = panel();
    p._form = { points: 0 };
    click(p._renderPointsField(p._form), "Outro");
    assert.equal(p._form.points, 15);
    const outro = controls(p._renderPointsField({ points: 7 })).find((c) => c.text === "Outro");
    assert.match(outro.attrs, /class="pick on"/);
  });
  it("the hint follows the scoreboard: off, or the integration off in the CronologIA", () => {
    assert.match(text(panel(pts({ placar: { ...PLACAR, ativo: false } }))._renderPointsField({ points: 5 })), /O placar do CronologIA está desligado\./);
    assert.match(text(panel(pts({ placar: { desligado: true } }))._renderPointsField({ points: 5 })), /A integração com o ResolvIA está desligada no CronologIA\./);
  });
});

describe("points: Mais › Integrações › Recompensas", () => {
  it("nothing loaded: nothing", () => assert.equal(text(panel(null)._renderRewardsPanel()), ""));
  it("off: Desligado, and the switch turns it on", async () => {
    const p = panel(pts({ on: false }), { "resolvia/points/get": pts() });
    const v = p._renderRewardsPanel();
    assert.match(text(v), /Usar recompensas Desligado\./);
    assert.doesNotMatch(text(v), /Conectado/);
    await fire(v, "Usar recompensas", "change", { target: { checked: true } });
    assert.deepEqual(p.prefs, [{ points_on: true }]);
  });
  it("on: how many tasks are worth points, and the state of the scoreboard", () => {
    assert.match(text(panel()._renderRewardsPanel()), /2 tarefas valem pontos\. Conectado ao placar do CronologIA 1\.37\.2 Ana × Beto · fecha a cada 15 dias\. Neste usuário, os pontos vão para Ana\./);
    assert.match(text(panel(pts({ points: {} }))._renderRewardsPanel()), /Abra um item e escolha “Pontos para quem concluir”\./);
    assert.match(text(panel(pts({ points: { a: { x: 1 } }, placar: { ...PLACAR, eu: null, periodo: "?" } }))._renderRewardsPanel()), /1 tarefa vale pontos\..*fecha toda semana\. Este usuário do Home Assistant não está no placar/);
    assert.match(text(panel(pts({ placar: null }))._renderRewardsPanel()), /CronologIA não encontrado/);
    assert.match(text(panel(pts({ placar: { desligado: true, versao: "1.30" } }))._renderRewardsPanel()), /Integração desligada no CronologIA 1\.30/);
    assert.match(text(panel(pts({ placar: { ativo: false, versao: "" } }))._renderRewardsPanel()), /Placar desligado no CronologIA Ligue o placar/);
  });
});
