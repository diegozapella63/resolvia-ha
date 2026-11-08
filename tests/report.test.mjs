// Mais › Relatório de pendências (2.45.0): the open tasks of the marked lists (or of the chosen one), with their
// deadlines and what is on, and the page with a header (the app, the report, when, which lists).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pendencias, reportHtml, dueText, reportPdf, pdfName, graficos, listLooks, BAIXAR } from "../resolvia/rootfs/app/lib/report.js";
import { Pdf, winAnsi, textWidth, wrap, rgb } from "../resolvia/rootfs/app/lib/pdf.js";

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
  it("the chosen list; a hidden or unknown one: all the marked", () => {
    assert.deepEqual(pendencias({ lists: LISTS, items: ITEMS, pick: "todo.casa", now: NOW }).sections.map((s) => s.name), ["Casa"]);
    for (const pick of ["todo.velha", "todo.nada"]) {
      const rep = pendencias({ lists: LISTS, items: ITEMS, pick, now: NOW });
      assert.deepEqual([rep.pick, rep.sections.length], ["", 2], pick);
    }
  });
  it("what is on: repeat, points, rooms, equipment, serviço externo", () => {
    const extra = (l, i) => (i.uid === "a" ? { repeat: 30, points: 10, rooms: ["Cozinha"], equips: ["Geladeira"], external: "Encanador" } : {});
    const r = pendencias({ lists: LISTS, items: ITEMS, now: NOW, extra }).sections[0].rows[0];
    assert.deepEqual([r.tags, r.points], [["repete todo mês", "serviço externo: Encanador", "Cozinha", "Geladeira"], 10]);
  });
  it("the page: a header with the app, the report, when and which lists; the choice of list; escaped", () => {
    const html = reportHtml(pendencias({ lists: LISTS, items: ITEMS, now: NOW }), { tema: "escuro", cor: "#ff5a4f" });
    assert.match(html, /<html lang="pt-BR" data-theme="dark">/);
    assert.match(html, /<span class="wm">Resolv<b>IA<\/b><\/span> · listas de tarefas<\/div>/, "the app and what it is, nothing repeated (2.47: no name of the house)");
    assert.match(html, /<h1>Relatório de pendências<\/h1><p>O que falta fazer nas 2 listas marcadas · 07\/11\/2026 às 17:00<\/p>/);
    assert.match(html, /<option value="" selected>Todas as listas marcadas<\/option><option value="todo.casa">Casa<\/option>/);
    assert.doesNotMatch(html, /todo\.velha|Velha/, "a hidden list is not offered");
    assert.match(html, /Pagar &lt;luz&gt;/);
    assert.match(html, /de Ana · 4 pendentes · 1 atrasada/);
    assert.match(html, /<a class="pdf" href="relatorio.pdf\?cor=%23ff5a4f" download="pendencias-2026-11-07.pdf" onclick="[^"]+">Baixar PDF<\/a>/, "a PDF to download: the app Home Assistant doesn't print a page");
    // 2.47.1: the download goes through the top page (the app Home Assistant on Android only downloads from there)
    assert.ok(html.includes(`onclick="${BAIXAR}"`) && BAIXAR.startsWith("try{var d=window.top.document") && !BAIXAR.includes('"'));
    assert.doesNotMatch(html, /window\.print/);
    assert.match(html, /@media print\{[^}]*\} \.barra\{display:none\}/, "on paper: no buttons, always light");
    assert.deepEqual(html.match(/<script[^>]*>/gi), ['<script src="selectsheet.js">'], "only the box of choice in the look of the app (2.46)");
    // 2.47: the charts of Mais › Gráficos, then the lists; at the end the mark of CorrerIA Code (as in Mais › Sobre)
    assert.match(html, /<div class="graficos"><section class="g"><h3>Por lista<\/h3>.*<section class="g"><h3>Por prazo<\/h3>/s);
    assert.ok(html.indexOf('class="graficos"') < html.indexOf("<section><h2>"), "the charts before the lists");
    assert.match(html, /<footer class="marca"><span class="raio" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13 2L3 14L12 14L11 22L21 10L12 10Z"\/><\/svg><\/span><span><b class="nome">Correr<i>IA<\/i> Code<\/b><small>desenvolvimento de softwares<\/small><\/span><\/footer>/);
    assert.doesNotMatch(html, /relatório gerado em/, "the time only in the header");
    assert.ok(html.trimEnd().endsWith("</footer>\n</main></body></html>"), "the mark is the last thing");
  });
  it("one list chosen: says which; a bad color: the default", () => {
    const html = reportHtml(pendencias({ lists: LISTS, items: ITEMS, pick: "todo.mercado", now: NOW }), { cor: "red;}" });
    assert.match(html, /O que falta fazer na lista Mercado/);
    assert.match(html, /--a:#ff8a65/);
    assert.match(html, /<option value="todo.mercado" selected>/);
    assert.match(html, /href="relatorio.pdf\?lista=todo.mercado&amp;cor=%23ff8a65" download="pendencias-mercado-2026-11-07.pdf"/);
  });
});

describe("the PDF (2.45.1)", () => {
  it("text in WinAnsi (the accents of Portuguese), widths and lines that fit", () => {
    assert.deepEqual([...winAnsi("ação·€—x😀")], [0x61, 0xe7, 0xe3, 0x6f, 0xb7, 0x80, 0x97, 0x78, 0x3f]);
    assert.equal(textWidth("Olá", 10), 15.56);
    assert.equal(textWidth("Olá", 10, true) > textWidth("Olá", 10), true);
    assert.deepEqual(wrap("Estudo completo home assistant", 80, 11), ["Estudo", "completo home", "assistant"]);
    assert.ok(wrap("x".repeat(80), 50, 11).every((l) => textWidth(l, 11) <= 50), "a long word is cut");
    assert.equal(rgb("#ff8a65"), "1 0.541 0.396");
  });
  it("a valid file: the objects where the table says", () => {
    const b = new Pdf({ title: "Teste (ação)" }).text(40, 40, "Olá (1) \\ fim", { bold: true }).rect(40, 60, 100, 20, { fill: "#ff8a65", r: 6 }).build();
    const s = b.toString("latin1");
    assert.ok(s.startsWith("%PDF-1.4"));
    assert.ok(s.endsWith("%%EOF\n"));
    const at = s.indexOf("\nxref\n") + 1;
    const offs = [...s.slice(at).matchAll(/^(\d{10}) 00000 n $/gm)].map((m) => +m[1]);
    assert.ok(offs.length >= 5);
    offs.forEach((o, i) => assert.equal(s.slice(o, o + `${i + 1} 0 obj`.length), `${i + 1} 0 obj`));
    assert.equal(+/startxref\n(\d+)/.exec(s)[1], at);
    assert.ok(s.includes("(Ol\\341 \\(1\\) \\\\ fim) Tj"), "escaped, the accents in octal");
  });
  it("the report: the header, the counts, the lists; a page after another, numbered", () => {
    const rep = pendencias({ lists: LISTS, items: ITEMS, now: NOW });
    const s = reportPdf(rep, { cor: "#ff5a4f" }).toString("latin1");
    const has = (t) => assert.ok(s.includes(t), t);
    has("(Relat\\363rio de pend\\352ncias) Tj");
    has("(\\267 listas de tarefas) Tj");
    // 2.47: the charts and, at the foot, the mark of CorrerIA Code
    has("(Por lista) Tj");
    has("(Por prazo) Tj");
    has("(Correr) Tj");
    has("(IA) Tj");
    has("( Code) Tj");
    has("0.9 Tc");
    has("(DESENVOLVIMENTO DE SOFTWARES) Tj");
    assert.ok(!s.includes("relat\\363rio gerado em"), "the time only in the header");
    has("(O que falta fazer nas 2 listas marcadas \\267 07/11/2026 \\340s 17:00) Tj");
    has("(Atrasada h\\341 3 dias) Tj");
    has("(Pagar <luz>) Tj");
    has("/Count 1 >>");
    const many = new Map([["todo.casa", Array.from({ length: 80 }, (_, i) => ({ uid: `t${i}`, summary: `Tarefa ${i}`, status: "needs_action" }))]]);
    const big = reportPdf(pendencias({ lists: LISTS.slice(0, 1), items: many, now: NOW })).toString("latin1");
    const pages = +/\/Count (\d+) >>/.exec(big)[1];
    assert.ok(pages >= 3, `pages: ${pages}`);
    assert.ok(big.includes(`p\\341gina ${pages} de ${pages}`));
    assert.ok(big.includes("(Casa \\(continua\\347\\343o\\)) Tj"), "the list goes on, saying so");
  });
  it("the name of the file", () => {
    assert.equal(pdfName(pendencias({ lists: LISTS, items: ITEMS, now: NOW })), "pendencias-2026-11-07.pdf");
    assert.equal(pdfName(pendencias({ lists: LISTS, items: ITEMS, now: NOW, pick: "todo.casa" })), "pendencias-casa-2026-11-07.pdf");
  });
});

describe("Gráficos no relatório (2.47.0)", () => {
  const EXTRA = (l, i) =>
    ({
      a: { rooms: ["Cozinha", "Área"], equips: ["Geladeira"], external: "Encanador" },
      b: { rooms: ["Cozinha"], external: true },
      e: { external: "Dentista" },
    })[i.uid] || {};
  it("by list, by deadline (only the lists with deadlines), the shares", () => {
    const g = graficos(pendencias({ lists: LISTS, items: ITEMS, now: NOW }));
    assert.deepEqual(g.lists.rows.map((x) => [x.name, x.n]), [["Casa", 4], ["Mercado", 1]]);
    assert.deepEqual(g.due.rows.map((x) => [x.key, x.name, x.n]), [["late", "Atrasadas", 1], ["today", "Hoje", 1], ["week", "Próximos 7 dias", 1], ["none", "Sem prazo", 2]], "Leite (Mercado: dates are no deadlines) is sem prazo, as in the counts");
    assert.equal(g.due.pct, true);
    assert.equal(g.due.total, 5);
    const off = LISTS.map((l) => ({ ...l, due: false }));
    assert.equal(graficos(pendencias({ lists: off, items: ITEMS, now: NOW })).due, null, "Controlar prazos off: no Por prazo");
    assert.deepEqual([g.rooms, g.equips, g.who], [null, null, null], "nothing with rooms, equipment or Serviço externo: no chart");
  });
  it("one list: no Por lista; nothing pending: no charts", () => {
    assert.equal(graficos(pendencias({ lists: LISTS, items: ITEMS, now: NOW, pick: "todo.casa" })).lists, null);
    assert.deepEqual(Object.values(graficos(pendencias({ lists: LISTS, items: new Map(), now: NOW }))), [null, null, null, null, null]);
  });
  it("by room and equipment (a task in two counts in both; the ones without), who does it", () => {
    const g = graficos(pendencias({ lists: LISTS, items: ITEMS, now: NOW, extra: EXTRA }));
    assert.deepEqual(g.rooms.rows.map((x) => [x.name, x.n]), [["Cozinha", 2], ["Área", 1]]);
    assert.deepEqual([g.rooms.none, g.rooms.noneLabel], [3, "Sem cômodo"]);
    assert.deepEqual(g.equips.rows.map((x) => [x.name, x.n]), [["Geladeira", 1]]);
    assert.deepEqual(g.who.rows.map((x) => [x.key, x.n, x.sub || ""]), [["house", 2, ""], ["ext", 3, "Encanador +1"]]);
  });
  it("many lists: the first six and +N", () => {
    const lists = Array.from({ length: 9 }, (_, k) => ({ id: `todo.l${k}`, name: `L${k}`, hidden: false, due: false, color: "#62B5FF" }));
    const items = new Map(lists.map((l, k) => [l.id, Array.from({ length: 9 - k }, (_, j) => ({ uid: `${k}-${j}`, summary: `T${j}`, status: "needs_action" }))]));
    const rep = pendencias({ lists, items, now: NOW });
    const html = reportHtml(rep, {});
    assert.equal((html.match(/<div class="gl">/g) || []).length, 6);
    assert.match(html, /<p class="gpe">\+3 listas: <b>6<\/b><\/p>/);
    assert.match(html, /background:#62B5FF/, "the color of the list");
    assert.ok(reportPdf(rep).toString("latin1").includes("(+3 listas: 6) Tj"));
  });
  it("listLooks: the names and colors of the lists as in the app", () => {
    const st = (n) => ({ attributes: { friendly_name: n } });
    const states = new Map([
      ["todo.shopping_list", st("Notas e Rotinas do Alexa Shopping list")],
      ["todo.to_do_list", st("Notas e Rotinas do Alexa To-do list")],
      ["todo.casa", st("Casa")],
      ["todo.mercado", st("mercado")],
      ["sensor.x", st("x")],
    ]);
    const looks = listLooks({
      states,
      entities: [{ ei: "todo.shopping_list", di: "d1" }, { ei: "todo.to_do_list", di: "d1" }],
      devices: [{ id: "d1", name: "Notas e Rotinas do Alexa", name_by_user: null }],
      prefs: { "todo.mercado": { name: "Feira", color: "menta" } },
    });
    // the order of the app: without device first (""), then by device, by name; the colors in turn
    assert.deepEqual([...looks].map(([id, l]) => [id, l.name, l.color]), [
      ["todo.casa", "Casa", "#FF5A4F"],
      ["todo.mercado", "Feira", "#4ED3A6"],
      ["todo.shopping_list", "Shopping list", "#FF77A9"],
      ["todo.to_do_list", "To-do list", "#FFA23E"],
    ]);
  });
});
