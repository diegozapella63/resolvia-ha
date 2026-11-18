// frontend/src/chat-panel.js: what goes to the AI of the Conversa is what the screen shows (2.74.0, after the AI of the
// InventarIA answered with values different from the screen's): the visible lists (the open one first, even hidden), the
// pending items only, no due dates in a list whose dates are information, and no room, equipment, points or external service
// when their option is off.
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fakeHass, hostOf } from "./_lit.mjs";
import { ChatMixin } from "../frontend/src/chat-panel.js";
import { F } from "../frontend/src/util.js";

const CASA = { id: "todo.casa", name: "Casa", features: F.CREATE | F.DUE_DATE, items: [
  { uid: "1", summary: "Pagar a luz", status: "needs_action", due: "2020-01-05" },
  { uid: "2", summary: "Trocar o filtro", status: "needs_action" },
  { uid: "3", summary: "Lavar a louça", status: "completed" },
] };
const MERCADO = { id: "todo.mercado", name: "Mercado", features: F.CREATE, items: [{ uid: "4", summary: "Leite", status: "needs_action" }] };
const OCULTA = { id: "todo.oculta", name: "Oculta", features: F.CREATE, hidden: true, items: [{ uid: "5", summary: "Segredo", status: "needs_action" }] };

const Panel = hostOf(ChatMixin);
const panel = ({ view = { name: "home" }, app = {}, on = {}, noDue = false } = {}) => {
  const p = new Panel(fakeHass());
  Object.assign(p._app_, app);
  const all = [noDue ? { ...CASA, noDue: true } : CASA, MERCADO, OCULTA];
  p._view = () => view;
  p._visible = () => all.filter((l) => !l.hidden);
  p._list = (id) => all.find((l) => l.id === id) || null;
  // the options, as the mixins of rooms, points and external services read them (each one off returns nothing)
  p._pointsOf = (_l, s) => (on.points && s === "Pagar a luz" ? 10 : 0);
  p._roomIdsOf = (_l, s) => (on.rooms && s === "Pagar a luz" ? ["sala"] : []);
  p._roomName = () => "Sala";
  p._equipIdsOf = (_l, s) => (on.equips && s === "Trocar o filtro" ? ["ar"] : []);
  p._equipOf = () => ({ nome: "Ar-condicionado" });
  p._externalOf = (_l, s) => (on.ext && s === "Trocar o filtro" ? "Técnico" : null);
  return p;
};

describe("chat context: the same as the screen", () => {
  it("the visible lists, the pending items only, with the count", () => {
    const c = panel()._chatContext();
    assert.deepEqual(c.listas.map((l) => l.nome), ["Casa", "Mercado"], "no hidden list");
    const casa = c.listas[0];
    assert.equal(casa.pendentes, 2);
    assert.deepEqual(casa.itens.map((i) => i.texto), ["Pagar a luz", "Trocar o filtro"], "no done item");
  });
  it("the open list first, also a hidden one", () => {
    const c = panel({ view: { name: "list", id: "todo.oculta" } })._chatContext();
    assert.deepEqual(c.listas.map((l) => l.nome), ["Oculta", "Casa", "Mercado"]);
    assert.match(c.tela, /a lista "Oculta"/);
  });
  it("Controlar prazos on: the due date and late", () => {
    const i = panel()._chatContext().listas[0].itens[0];
    assert.equal(i.prazo, "2020-01-05");
    assert.equal(i.atrasado, true);
    assert.equal(panel()._chatContext().listas[0].prazos, true);
  });
  it("a list with its dates as information (Personalizar, or Controlar prazos off, as _computeLists marks): no due date, nothing late", () => {
    const c = panel({ noDue: true })._chatContext();
    const i = c.listas[0].itens[0];
    assert.equal(i.prazo, null);
    assert.equal(i.atrasado, false);
    assert.equal(c.listas[0].prazos, false);
  });
  it("room, equipment, points and external service only with their option on", () => {
    const off = panel()._chatContext().listas[0].itens;
    assert.deepEqual(off.map((i) => [i.pontos, i.comodo, i.equipamento, i.externo]), [[0, "", "", ""], [0, "", "", ""]]);
    const on = panel({ on: { points: true, rooms: true, equips: true, ext: true } })._chatContext().listas[0].itens;
    assert.deepEqual(on.map((i) => [i.pontos, i.comodo, i.equipamento, i.externo]), [[10, "Sala", "", ""], [0, "", "Ar-condicionado", "Técnico"]]);
  });
});
