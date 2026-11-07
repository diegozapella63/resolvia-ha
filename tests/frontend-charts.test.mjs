// frontend/src/charts.js: Mais › Gráficos (where the pending items are: by list, room, equipment, deadline, who does it).
import "./_lit.mjs";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { html } from "../frontend/vendor/lit-all.min.js";
import { text, click, labels, render, fakeHass, hostOf } from "./_lit.mjs";
import { ChartsMixin, chartStyles, summarize, rank, foldTop, dueKey, DUE_PARTS, TOP } from "../frontend/src/charts.js";
import { RoomsMixin } from "../frontend/src/rooms.js";
import { ExternalMixin } from "../frontend/src/external.js";
import { colorById } from "../frontend/src/util.js";
import { local } from "./_helpers.mjs";

const NOW = local(2026, 11, 4, 15, 0); // a Wednesday afternoon
const ymd = (d) => {
  const x = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};
const item = (summary, extra = {}) => ({ uid: summary, summary, status: "needs_action", ...extra });
const done = (summary) => item(summary, { status: "completed" });
const list = (id, items, over = {}) => ({ id, name: id.replace("todo.", ""), icon: "house", color: colorById("azul"), items, pending: 0, noDue: false, ...over });

const ROOMS = [
  { id: "cozinha", nome: "Cozinha" },
  { id: "sala", nome: "Sala" },
  { id: "banheiro", nome: "Banheiro" },
];
const EQUIPS = [
  { id: "geladeira", nome: "Geladeira", comodo: "cozinha" },
  { id: "fogao", nome: "Fogão", comodo: "cozinha" },
  { id: "ar", nome: "Ar-condicionado", comodo: "sala" },
  { id: "chuveiro", nome: "Chuveiro", comodo: "banheiro" },
];

describe("charts: counting", () => {
  it("rank: the most first, ties in the order given, none at zero", () => {
    const rows = [
      { k: "a", n: 1 },
      { k: "b", n: 3 },
      { k: "c", n: 0 },
      { k: "d", n: 1 },
      { k: "e", n: 3 },
    ];
    assert.deepEqual(rank(rows).map((r) => r.k), ["b", "e", "a", "d"]);
    assert.deepEqual(rank([]), []);
  });
  it("foldTop: the first 6 and the rest folded, only when that hides two or more; open shows all", () => {
    const rows = (n) => Array.from({ length: n }, (_, k) => ({ n: 10 - k }));
    assert.equal(TOP, 6);
    assert.deepEqual(foldTop(rows(7)), { shown: rows(7), more: 0, moreN: 0 }, "7: all (a “+1” would hide just one)");
    const f = foldTop(rows(9));
    assert.equal(f.shown.length, 6);
    assert.equal(f.more, 3);
    assert.equal(f.moreN, 4 + 3 + 2);
    assert.equal(foldTop(rows(9), true).shown.length, 9);
    assert.equal(foldTop(rows(5), false, 2).more, 3);
  });
  it("dueKey: late, today, the next 7 days, later, none (like Prazos)", () => {
    assert.equal(dueKey(null, NOW), "none");
    assert.equal(dueKey("nada", NOW), "none");
    assert.equal(dueKey(ymd(-1), NOW), "late");
    assert.equal(dueKey(new Date(NOW.getTime() - 3600000).toISOString(), NOW), "late", "earlier today, with a time: late");
    assert.equal(dueKey(ymd(0), NOW), "today");
    assert.equal(dueKey(new Date(NOW.getTime() + 3600000).toISOString(), NOW), "today");
    assert.equal(dueKey(ymd(1), NOW), "week");
    assert.equal(dueKey(ymd(6), NOW), "week");
    assert.equal(dueKey(ymd(7), NOW), "later");
    assert.equal(typeof dueKey(ymd(0)), "string", "now by default");
    assert.deepEqual(DUE_PARTS.map((p) => p.label), ["Atrasados", "Hoje", "Próximos 7 dias", "Mais adiante", "Sem prazo"]);
  });

  it("by list: only what is not completed; a list not loaded yet counts what Home Assistant says", () => {
    const s = summarize({
      lists: [list("todo.casa", [item("a"), done("b"), item("c")]), list("todo.vazia", [done("x")]), list("todo.longe", null, { pending: "4" }), list("todo.zero", null)],
      now: NOW,
    });
    assert.equal(s.pending, 6);
    assert.deepEqual(s.lists.map((l) => [l.id, l.n]), [["todo.longe", 4], ["todo.casa", 2]], "the most first; the ones with nothing out");
    assert.equal(s.lists[1].name, "casa");
    assert.equal(s.lists[1].icon, "house");
    assert.deepEqual(s.lists[1].color, colorById("azul"));
    assert.deepEqual(summarize(), { pending: 0, lists: [], rooms: null, equips: null, due: null, ext: null });
  });

  it("rooms and equipments: null when off", () => {
    const s = summarize({ lists: [list("todo.casa", [item("a")])], roomsOf: () => ["cozinha"], equipsOf: () => ["geladeira"], now: NOW });
    assert.equal(s.rooms, null);
    assert.equal(s.equips, null);
  });

  it("a task with two equipments counts for both, and for both of their rooms (once each)", () => {
    const rooms = { "limpar a pia": ["cozinha"], "trocar lampada": ["sala", "sala"], "sumiu": ["porao"] };
    const equips = { "limpar o filtro": ["ar", "geladeira"], "limpar a geladeira": ["geladeira", "fogao"], "velho": ["apagado"], "chuveiro": ["chuveiro"] };
    const key = (s) => s.toLowerCase();
    const s = summarize({
      lists: [list("todo.casa", [item("Limpar o filtro"), item("Limpar a geladeira"), item("Limpar a pia"), item("Trocar lampada"), item("Sumiu"), item("Velho"), item("Nada"), done("Chuveiro")])],
      rooms: ROOMS,
      equips: EQUIPS.map((e) => ({ ...e, room: ROOMS.find((r) => r.id === e.comodo).nome })),
      roomsOf: (l, sm) => rooms[key(sm)] || [],
      equipsOf: (l, sm) => equips[key(sm)] || [],
      now: NOW,
    });
    assert.deepEqual(s.rooms.rows.map((r) => [r.name, r.n]), [["Cozinha", 3], ["Sala", 2]], "Cozinha: filtro, geladeira (two items there, once), pia; Sala: filtro, lâmpada (twice in the list, once)");
    assert.equal(s.rooms.none, 3, "a deleted room, a deleted item and nothing: no room (the completed one is out)");
    assert.deepEqual(s.equips.rows.map((r) => [r.name, r.n, r.room]), [["Geladeira", 2, "Cozinha"], ["Fogão", 1, "Cozinha"], ["Ar-condicionado", 1, "Sala"]], "ties in the order of the InventarIA; Chuveiro (only completed) out");
    assert.equal(s.equips.none, 5);
    assert.equal(s.rooms.rows[0].id, "cozinha");
  });

  it("with the equipments off, the room is only the task's own; an equipment without a room", () => {
    const s = summarize({ lists: [list("todo.casa", [item("a")])], rooms: ROOMS, roomsOf: () => [], equipsOf: () => ["geladeira"], now: NOW });
    assert.deepEqual(s.rooms.rows, []);
    assert.equal(s.rooms.none, 1);
    const e = summarize({ lists: [list("todo.casa", [item("a")])], equips: [{ id: "x", nome: "X" }], equipsOf: () => ["x"], now: NOW });
    assert.deepEqual(e.equips.rows, [{ id: "x", name: "X", room: "", n: 1 }]);
  });

  it("by deadline: the lists with deadlines only; null with Controlar prazos off or nothing open in them", () => {
    const lists = [
      list("todo.casa", [item("late", { due: ymd(-2) }), item("today", { due: ymd(0) }), item("week", { due: ymd(3) }), item("later", { due: ymd(30) }), item("none"), item("none2"), done("old", { due: ymd(-9) })]),
      list("todo.problemas", [item("unavailable since", { due: ymd(-60) })], { noDue: true }),
    ];
    const s = summarize({ lists, now: NOW });
    assert.deepEqual(s.due.map((p) => [p.key, p.n]), [["late", 1], ["today", 1], ["week", 1], ["later", 1], ["none", 2]]);
    assert.equal(s.due[0].label, "Atrasados");
    assert.equal(s.due[0].icon, "circle-alert");
    assert.equal(summarize({ lists, due: false, now: NOW }).due, null, "Controlar prazos off");
    assert.equal(summarize({ lists: [lists[1]], now: NOW }).due, null, "only dates of the integration");
    assert.equal(summarize({ lists: [list("todo.casa", [done("x")])], now: NOW }).due, null, "nothing open");
    assert.deepEqual(summarize({ lists: [list("todo.casa", [item("a", { due: ymd(0) })])], now: NOW }).due.map((p) => p.key), ["today"], "the parts at zero go out");
  });

  it("who does it: Nós mesmos × Serviço externo, the names together whatever the case; null when nobody from outside", () => {
    const ext = { a: "Eletricista", b: "eletricista", c: true, d: "Encanador" };
    const s = summarize({ lists: [list("todo.casa", [item("a"), item("b"), item("c"), item("d"), item("e"), done("d")])], extOf: (l, sm) => ext[sm] || null, now: NOW });
    assert.deepEqual(s.ext, { house: 1, ext: 4, who: [{ name: "Eletricista", n: 2 }, { name: "Encanador", n: 1 }] });
    assert.equal(summarize({ lists: [list("todo.casa", [item("a")])], now: NOW }).ext, null);
  });
});

// ------------------------------------------------------------------ the screen

class Panel extends hostOf(RoomsMixin, ExternalMixin, ChartsMixin) {
  constructor(lists, { rooms = null, ext = {}, due = true } = {}) {
    super(fakeHass());
    this.hass.resolvia = {};
    this.lists = lists;
    this._rooms = rooms;
    this._ext = ext;
    this.due = due;
    this._dark = false;
    this.went = [];
  }
  _visible() {
    return this.lists.filter((l) => !l.hidden);
  }
  _dueOn() {
    return this.due;
  }
  _go(p) {
    this.went.push(p);
  }
  _renderPageHead(title, status, up) {
    return html`<header><h1>${title}</h1><p class="status">${status.text}</p>${up ? "‹ Mais" : ""}</header>`;
  }
}
const ROOMS_STATE = (over = {}) => ({
  on: true,
  equips_on: true,
  encontrado: true,
  comodos: ROOMS,
  itens: EQUIPS,
  map: { "todo.casa": { "limpar o filtro": ["sala", "cozinha"], "consertar a pia": "cozinha" } },
  emap: { "todo.casa": { "limpar o filtro": ["ar", "geladeira"], "limpar a geladeira": "geladeira" } },
  ...over,
});
const LISTS = () => [
  list("todo.casa", [item("Limpar o filtro", { due: ymd(-1) }), item("Limpar a geladeira", { due: ymd(0) }), item("Consertar a pia"), item("Chamar o eletricista", { due: ymd(2) }), done("Feito")], { name: "Casa" }),
  list("todo.compras", [item("Pão"), item("Leite")], { name: "Compras", icon: "shopping-cart", color: colorById("menta"), noDue: true }),
  list("todo.oculta", [item("x"), item("y"), item("z")], { name: "Oculta", hidden: true }),
];
const sections = (p) => [...render(p._renderCharts()).html.matchAll(/<h2>([^<]+)<\/h2>/g)].map((m) => m[1]);

describe("charts: the screen", () => {
  beforeEach(() => mock.timers.enable({ apis: ["Date"], now: NOW }));
  afterEach(() => mock.timers.reset());

  it("the line of the menu says what is on", () => {
    assert.equal(new Panel([], { rooms: ROOMS_STATE() })._chartsLine(), "Pendências por lista, cômodo, equipamento e prazo.");
    assert.equal(new Panel([], { rooms: ROOMS_STATE({ on: false }) })._chartsLine(), "Pendências por lista, equipamento e prazo.");
    assert.equal(new Panel([], { rooms: ROOMS_STATE({ equips_on: false }), due: false })._chartsLine(), "Pendências por lista e cômodo.");
    assert.equal(new Panel([], { due: false })._chartsLine(), "Pendências por lista.");
  });

  it("everything on: by list, room, equipment, deadline and who; the hidden list is not counted", () => {
    const p = new Panel(LISTS(), { rooms: ROOMS_STATE(), ext: { "todo.casa": { "chamar o eletricista": "Eletricista", "consertar a pia": true } } });
    assert.deepEqual(sections(p), ["Por lista", "Por cômodo", "Por equipamento", "Por prazo", "Quem faz"]);
    const t = text(p._renderCharts());
    assert.match(t, /^Gráficos 6 pendentes em 2 listas ‹ Mais/);
    assert.match(t, /Por lista Casa 4 Compras 2 Por cômodo/, "Oculta is not there");
    assert.match(t, /Por cômodo Cozinha 3 Sala 1 Sem cômodo: 3/, "the kitchen: the filter (two rooms), the fridge (from its item) and the sink");
    assert.match(t, /Por equipamento Geladeira Cozinha 2 Ar-condicionado Sala 1 Sem equipamento: 4/);
    assert.match(t, /Por prazo Atrasados 1 25% Hoje 1 25% Próximos 7 dias 1 25% Sem prazo 1 25% Quem faz/, "only the list with deadlines");
    assert.match(t, /Quem faz Nós mesmos 4 67% Serviço externo Eletricista 2 33%$/);
    const h = render(p._renderCharts()).html;
    assert.match(h, /aria-label="Pendentes por lista: Casa 4, Compras 2"/, "the split bar says what it shows");
    assert.match(h, /title="Casa: 4"/);
    assert.match(h, /class="g-row\s+with-pct k-late"/, "late in its color, with its share");
    assert.doesNotMatch(h, /g-more/, "two lists: nothing folded");
  });

  it("the room beside an equipment only with Usar cômodos on; no chart of what is off", () => {
    const p = new Panel(LISTS(), { rooms: ROOMS_STATE({ on: false }), due: false });
    assert.deepEqual(sections(p), ["Por lista", "Por equipamento"]);
    assert.match(text(p._renderCharts()), /Por equipamento Geladeira 2 Ar-condicionado 1 Sem equipamento: 4$/);
    const q = new Panel(LISTS(), { rooms: ROOMS_STATE({ equips_on: false }) });
    assert.deepEqual(sections(q), ["Por lista", "Por cômodo", "Por prazo"]);
    assert.match(text(q._renderCharts()), /Por cômodo Cozinha 2 Sala 1 Sem cômodo: 4/, "without equipments: the rooms of the tasks only");
    assert.deepEqual(sections(new Panel(LISTS(), { rooms: ROOMS_STATE({ itens: [], comodos: [] }) })), ["Por lista", "Por prazo"], "on, but nothing came from the InventarIA");
  });

  it("a room on with nothing in it: a short line", () => {
    const p = new Panel([list("todo.casa", [item("a")])], { rooms: ROOMS_STATE({ map: {}, emap: {} }), due: false });
    const t = text(p._renderCharts());
    assert.match(t, /Por cômodo Nenhuma pendência com cômodo\. Por equipamento Nenhuma pendência com equipamento\.$/);
    assert.deepEqual(sections(p), ["Por lista", "Por cômodo", "Por equipamento"]);
    assert.doesNotMatch(render(p._renderCharts()).html, /g-split/, "one list: no split bar");
  });

  it("nothing pending: Tudo resolvido", () => {
    const p = new Panel([list("todo.casa", [done("a")]), list("todo.oculta", [item("b")], { hidden: true })]);
    assert.equal(text(p._renderCharts()), "Gráficos Nada pendente ‹ Mais Tudo resolvido Nenhum item pendente nas listas.");
    assert.deepEqual(sections(p), []);
  });

  it("a tap: a list opens it; a room, an equipment or Serviço externo, Buscar with the word; a deadline, Prazos", () => {
    const p = new Panel(LISTS(), { rooms: ROOMS_STATE(), ext: { "todo.casa": { "consertar a pia": "Encanador" } } });
    p._searchDone = true;
    p._searchRooms = p._searchEquips = p._searchExt = false;
    click(p._renderCharts(), "Casa: 4 pendentes");
    assert.deepEqual(p.went, ["/lista/todo.casa"]);
    click(p._renderCharts(), "Cozinha: 3 pendentes");
    assert.deepEqual([p._query, p._searchDone, p._searchRooms, p._searchEquips, p.went[1]], ["Cozinha", false, true, false, "/buscar"]);
    click(p._renderCharts(), "Geladeira: 2 pendentes");
    assert.deepEqual([p._query, p._searchEquips, p._searchExt], ["Geladeira", true, false]);
    click(p._renderCharts(), "Serviço externo: 1 pendente");
    assert.deepEqual([p._query, p._searchExt], ["Serviço externo", true]);
    click(p._renderCharts(), "Atrasados: 1 pendente");
    assert.equal(p.went.at(-1), "/prazos");
    assert.deepEqual(p.haptics, ["light", "light", "light"]);
    const tappable = labels(p._renderCharts());
    assert.ok(!tappable.some((l) => /^Sem prazo|^Nós mesmos/.test(l)), `Sem prazo and Nós mesmos open nothing (${tappable})`);
  });

  it("many lists: the 6 with the most, “+3 listas” with their pending, and Ver menos", () => {
    const lists = Array.from({ length: 9 }, (_, k) => list(`todo.l${k}`, Array.from({ length: 9 - k }, (_, j) => item(`i${j}`)), { name: `Lista ${k}`, noDue: true }));
    const p = new Panel(lists);
    let t = text(p._renderCharts());
    assert.match(t, /Lista 5 4 \+3 listas 6$/, "3 + 2 + 1 folded");
    assert.doesNotMatch(t, /Lista 6/);
    let h = render(p._renderCharts()).html;
    assert.equal((h.match(/<i class="[^"]*" style="flex:/g) || []).length, 7, "the split bar: 6 lists and the rest");
    assert.match(h, /aria-expanded="false"/);
    click(p._renderCharts(), "+3 listas 6");
    t = text(p._renderCharts());
    assert.match(t, /Lista 8 1 Ver menos$/);
    h = render(p._renderCharts()).html;
    assert.match(h, /g-more open" aria-expanded="true"/);
    assert.equal((h.match(/<i class="[^"]*" style="flex:/g) || []).length, 9);
    click(p._renderCharts(), "Ver menos");
    assert.match(text(p._renderCharts()), /\+3 listas 6$/);
    assert.ok(p.updates >= 2);
  });

  it("many rooms fold too", () => {
    const comodos = Array.from({ length: 8 }, (_, k) => ({ id: `c${k}`, nome: `Cômodo ${k}` }));
    const map = { "todo.casa": Object.fromEntries(comodos.map((c, k) => [`t${k}`, c.id])) };
    const p = new Panel([list("todo.casa", comodos.map((c, k) => item(`t${k}`)), { noDue: true })], { rooms: ROOMS_STATE({ comodos, map, equips_on: false }) });
    assert.match(text(p._renderCharts()), /Cômodo 5 1 \+2 cômodos 2$/);
  });

  it("who does it: only from outside (no split bar), and how many others besides the first name", () => {
    const ext = { "todo.casa": { a: "Pintor", b: "Pintor", c: "Eletricista", d: "Encanador", e: true } };
    const p = new Panel([list("todo.casa", ["a", "b", "c", "d", "e"].map((s) => item(s)), { noDue: true })], { ext });
    assert.match(text(p._renderCharts()), /Quem faz Serviço externo Pintor \+2 5 100%$/);
    assert.doesNotMatch(render(p._renderCharts()).html.split('id="g-quem"')[1], /g-split/);
    const q = new Panel([list("todo.casa", [item("a"), item("b")], { noDue: true })], { ext: { "todo.casa": { a: true } } });
    assert.match(text(q._renderCharts()), /Quem faz Nós mesmos 1 50% Serviço externo 1 50%$/, "no name: nothing beside it");
    q._app_ = { ext_off: true };
    assert.doesNotMatch(text(q._renderCharts()), /Quem faz|Serviço externo/, "Serviços externos off: no Quem faz");
  });

  it("the bars: the biggest full, the others in proportion, a sliver for very little", () => {
    const p = new Panel([list("todo.a", Array.from({ length: 300 }, (_, k) => item(`a${k}`)), { noDue: true }), list("todo.b", [item("b")], { noDue: true })]);
    const h = render(p._renderCharts()).html;
    assert.deepEqual([...h.matchAll(/class="g-bar"><i style="width:(\d+)%"/g)].map((m) => +m[1]), [100, 1]);
    assert.match(h, /style="--c:#62B5FF;--ci:#0B67A8;--cs:/, "each list in its color");
    p._dark = true;
    assert.match(render(p._renderCharts()).html, /--ci:#62B5FF;/, "dark: the bright one");
  });

  it("the styles: the colors of Prazos, light and dark, and two columns on the computer", () => {
    assert.match(chartStyles, /\.k-late \{ --c: var\(--rv-late\)/);
    assert.match(chartStyles, /:host\(\[dark\]\) \{ --g-today/);
    assert.match(chartStyles, /@media \(min-width: 1000px\)[\s\S]*column-count: 2/);
    for (const k of ["week", "later", "none", "house", "rest"]) assert.doesNotMatch(chartStyles.match(new RegExp(`\\.k-${k} \\{[^}]*\\}`))[0], /accent/, `${k}: not the accent (the Cor do dia can be red)`);
  });
});
