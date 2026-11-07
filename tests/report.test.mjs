// Mais › Relatório de pendências (2.45.0): the open tasks of the marked lists (or of the chosen one), with their
// deadlines and what is on, and the page with a header (the app, the report, when, which lists).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pendencias, reportHtml, dueText } from "../resolvia/rootfs/app/lib/report.js";

const NOW = new Date(2026, 10, 7, 17, 0).getTime();
const LISTS = [
  { id: "todo.casa", name: "Casa", owner: "Ana", hidden: false, due: true },
  { id: "todo.mercado", name: "Mercado", owner: "", hidden: false, due: false },
  { id: "todo.velha", name: "Velha", owner: "", hidden: true, due: true },
];
const ITEMS = new Map([
  ["todo.casa", [
    { uid: "a", summary: "Trocar filtro", status: "needs_action", due: "2026-11-04" },
    { uid: "b", summary: "Pagar <luz>", status: "needs_action", due: "2026-11-07" },
    { uid: "c", summary: "Lavar carro", status: "needs_action" },
    { uid: "d", summary: "Feito já", status: "completed", due: "2026-11-01" },
    { uid: "e", summary: "Dentista", status: "needs_action", due: "2026-11-09T14:30:00-03:00" },
  ]],
  ["todo.mercado", [{ uid: "m", summary: "Leite", status: "needs_action", due: "2026-11-01" }]],
  ["todo.velha", [{ uid: "v", summary: "Antiga", status: "needs_action" }]],
]);

describe("Relatório de pendências", () => {
  it("dueText: late, today, tomorrow, a day; with the time", () => {
    assert.deepEqual(dueText("2026-11-04", NOW), { text: "Atrasada há 3 dias", late: true, days: -3 });
    assert.equal(dueText("2026-11-06", NOW).text, "Atrasada desde ontem");
    assert.deepEqual(dueText("2026-11-07", NOW), { text: "Hoje", late: false, days: 0 });
    assert.equal(dueText("2026-11-08", NOW).text, "Amanhã");
    assert.equal(dueText("2026-11-14", NOW).text, "sáb, 14 nov");
    assert.equal(dueText("2026-11-07T09:00:00", NOW).text, "Atrasada (hoje às 09:00)");
  });
  it("all the marked lists: open tasks, late first, without a deadline last; the counts", () => {
    const rep = pendencias({ lists: LISTS, items: ITEMS, now: NOW });
    assert.deepEqual(rep.sections.map((s) => s.name), ["Casa", "Mercado"], "not the hidden one");
    assert.deepEqual(rep.sections[0].rows.map((r) => r.title), ["Trocar filtro", "Pagar <luz>", "Dentista", "Lavar carro"]);
    assert.equal(rep.sections[1].rows[0].due, null, "a list whose dates are not deadlines: none");
    assert.deepEqual([rep.total, rep.late, rep.today, rep.undated], [5, 1, 1, 2]);
    assert.equal(rep.sections[0].late, 1);
  });
  it("the chosen list, even a hidden one; an unknown one: all the marked", () => {
    assert.deepEqual(pendencias({ lists: LISTS, items: ITEMS, pick: "todo.velha", now: NOW }).sections.map((s) => s.name), ["Velha"]);
    const rep = pendencias({ lists: LISTS, items: ITEMS, pick: "todo.nada", now: NOW });
    assert.deepEqual([rep.pick, rep.sections.length], ["", 2]);
  });
  it("what is on: repeat, points, rooms, equipment, serviço externo", () => {
    const extra = (l, i) => (i.uid === "a" ? { repeat: 30, points: 10, rooms: ["Cozinha"], equips: ["Geladeira"], external: "Encanador" } : {});
    const r = pendencias({ lists: LISTS, items: ITEMS, now: NOW, extra }).sections[0].rows[0];
    assert.deepEqual([r.tags, r.points], [["repete todo mês", "serviço externo: Encanador", "Cozinha", "Geladeira"], 10]);
  });
  it("the page: a header with the app, the report, when and which lists; the choice of list; escaped", () => {
    const html = reportHtml(pendencias({ lists: LISTS, items: ITEMS, now: NOW }), { tema: "escuro", cor: "#ff5a4f", casa: "Casa da Ana" });
    assert.match(html, /<html lang="pt-BR" data-theme="dark">/);
    assert.match(html, /<span class="wm">Resolv<b>IA<\/b><\/span> · listas de tarefas · Casa da Ana/);
    assert.match(html, /<h1>Relatório de pendências<\/h1><p>O que falta fazer nas 2 listas marcadas · 07\/11\/2026 às 17:00<\/p>/);
    assert.match(html, /<option value="" selected>Todas as listas marcadas<\/option><option value="todo.casa">Casa<\/option>.*<option value="todo.velha">Velha \(oculta\)<\/option>/);
    assert.match(html, /Pagar &lt;luz&gt;/);
    assert.match(html, /de Ana · 4 pendentes · 1 atrasada/);
    assert.match(html, /Imprimir ou salvar PDF/);
    assert.match(html, /@media print\{[^}]*\} \.barra\{display:none\}/, "on paper: no buttons, always light");
    assert.doesNotMatch(html, /<script/i);
  });
  it("one list chosen: says which; a bad color: the default", () => {
    const html = reportHtml(pendencias({ lists: LISTS, items: ITEMS, pick: "todo.mercado", now: NOW }), { cor: "red;}" });
    assert.match(html, /O que falta fazer na lista Mercado/);
    assert.match(html, /--a:#ff8a65/);
    assert.match(html, /<option value="todo.mercado" selected>/);
  });
});
