// frontend/src/suggest.js: Agora (Sugestões up to 2.59: what to resolve now), Comece por aqui (automatic or by the AI)
// and Ordem dos cards (2.60.0).
import "./_lit.mjs";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { text, click, labels, controls, fakeHass, hostOf } from "./_lit.mjs";
import { html } from "../frontend/vendor/lit-all.min.js";
import { SuggestMixin, ageText, NOW_CARDS, nowOrder } from "../frontend/src/suggest.js";
import { PointsMixin } from "../frontend/src/points.js";
import { RoomsMixin } from "../frontend/src/rooms.js";
import { ExternalMixin } from "../frontend/src/external.js";
import { F, colorById } from "../frontend/src/util.js";
import { local } from "./_helpers.mjs";

const NOW = local(2026, 11, 2, 10);
const DAY = 86400000;
const ago = (d) => NOW.getTime() - d * DAY;
const ymd = (d) => {
  const x = new Date(NOW.getTime() + d * DAY);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};
const RW = F.CREATE | F.UPDATE | F.DELETE;
const list = (id, items, over = {}) => ({ id, name: id.replace("todo.", ""), icon: "list", color: colorById("vermelho"), features: RW, canDue: true, items: items.map((x, k) => (typeof x === "string" ? { uid: `${id}-${k}`, summary: x, status: "needs_action" } : { uid: `${id}-${k}`, status: "needs_action", ...x })), ...over });

class Base extends hostOf(PointsMixin, RoomsMixin, ExternalMixin) {
  constructor(lists, answers = {}) {
    super(fakeHass(answers));
    this.hass.resolvia = {};
    this.lists = lists;
    this._recent = new Set();
    this.rules = {};
    this.aiOn = false;
    this.ai = { ready: true };
  }
  _visible() {
    return this.lists.filter((l) => !l.hidden);
  }
  _list(id) {
    return this.lists.find((l) => l.id === id);
  }
  _ruleFor(listId, item) {
    return this.rules[`${listId}|${item.uid}`] || null;
  }
  _aiOn() {
    return this.aiOn;
  }
  _aiInfo() {
    return this.ai;
  }
  _renderItem(l, i, o) {
    return html`<div class="it">${i.summary} (${o.why})</div>`;
  }
  _renderPageHead(title, o) {
    return html`<h1>${title}</h1><p>${o.text}</p>`;
  }
  _go(path) {
    this.went = path;
  }
  // the groups of what is due come from the panel (resolvia-panel.js › _dueSections)
  _dueSections() {
    return this.due || { cards: {}, coming: "", comingN: 0, rows: [], late: 0, today: 0 };
  }
}
const Panel = SuggestMixin(Base);
const top = (p) => p._suggestions().top.map((r) => `${r.i.summary}: ${r.why}`);

beforeEach(() => mock.timers.enable({ apis: ["Date", "setTimeout"], now: NOW }));
afterEach(() => mock.timers.reset());

describe("suggest: ageText", () => {
  it("days, then weeks, months and years", () => {
    assert.deepEqual([1, 13, 14, 59, 60, 729, 730, 1500].map(ageText), ["1 dia", "13 dias", "2 semanas", "8 semanas", "2 meses", "24 meses", "2 anos", "4 anos"]);
  });
});

describe("suggest: which lists count", () => {
  it("only visible, available lists that can be changed; completed items don't count", () => {
    const p = new Panel([
      list("todo.a", ["x", { summary: "feito", status: "completed" }]),
      list("todo.b", ["y"], { unavailable: true }),
      list("todo.c", ["z"], { features: F.CREATE }),
      list("todo.d", ["w"], { hidden: true }),
      list("todo.e", [{ summary: "só feitos", status: "completed" }]),
      { id: "todo.f", name: "f", features: RW },
    ]);
    const s = p._suggestions();
    assert.deepEqual([s.pending, s.lists], [1, 1]);
    assert.deepEqual(s.top.map((r) => r.i.summary), ["x"]);
  });
  it("shopping lists go apart, the fullest first, with the oldest item", () => {
    const p = new Panel([list("todo.mercado", ["leite", "ovos", "pão"], { icon: "shopping-cart" }), list("todo.feira", ["alface"], { icon: "shopping-cart" }), list("todo.casa", ["varrer"])]);
    p._ages = { "todo.mercado": { "todo.mercado-0": ago(20), "todo.mercado-1": ago(2) } };
    const s = p._suggestions();
    assert.deepEqual(s.shopping.map((x) => [x.l.id, x.n, x.oldest]), [["todo.mercado", 3, 20], ["todo.feira", 1, null]]);
    assert.deepEqual(s.top.map((r) => r.i.summary), ["varrer"]);
    assert.equal(s.pending, 5);
  });
});

describe("suggest: the reasons", () => {
  it("age (from 3 days), the last of a list, 2 to go", () => {
    const p = new Panel([list("todo.a", ["velho", "novo", "c", "d"]), list("todo.b", ["sozinho"]), list("todo.c", ["um", "dois"])]);
    p._ages = { "todo.a": { "todo.a-0": ago(16), "todo.a-1": ago(2) } };
    assert.deepEqual(top(p), ["sozinho: É o último da lista", "velho: Na lista há 2 semanas", "um: Faltam 2 para zerar a lista", "dois: Faltam 2 para zerar a lista", "novo: 2º da lista"]);
  });
  it("points, Voltou para fazer and dates someone set", () => {
    const p = new Panel([list("todo.a", ["a1", "Lavar louça", "repete", { summary: "atrasado", due: ymd(-2) }, { summary: "hoje", due: ymd(0) }, { summary: "amanhã", due: ymd(1) }])]);
    p._pts = { on: true, placar: { ativo: true }, points: { "todo.a": { "lavar louca": 20 } } };
    p.rules["todo.a|todo.a-2"] = { days: 7 };
    // the two strongest of the list first (at most 2 per list), then the rest of the top in order of strength
    assert.deepEqual(top(p), ["atrasado: A data já passou", "Lavar louça: Vale pontos", "hoje: Tem data para hoje", "repete: Voltou para fazer", "a1: Primeiro da lista"]);
  });
  it("tasks of the CronologIA say so (rotina atrasada, manutenção para hoje)", () => {
    const p = new Panel([list("todo.a", [{ summary: "r", due: ymd(-1) }, { summary: "m", due: ymd(0) }, "x", "y"])]);
    p._pts = { on: false, espelho: { "todo.a": { "todo.a-0": { tipo: "rotina", pontos: 5 }, "todo.a-1": { tipo: "manutencao", pontos: 0 } } } };
    assert.deepEqual(top(p).slice(0, 2), ["r: Rotina do CronologIA atrasada", "m: Manutenção do CronologIA para hoje"]);
  });
  it("a list without deadlines: the date is since when (Assim há …)", () => {
    const p = new Panel([list("todo.quebrados", [{ summary: "torneira", due: ymd(-21) }, "b", "c"], { canDue: false })]);
    assert.equal(p._ageOf(p.lists[0], p.lists[0].items[0]), 21);
    assert.equal(top(p)[0], "torneira: Assim há 3 semanas");
  });
  it("unknown ages: null, and the order of the list fills the top", () => {
    const p = new Panel([list("todo.a", ["primeiro", "segundo", "terceiro"])]);
    assert.equal(p._ageOf(p.lists[0], p.lists[0].items[0]), null);
    assert.deepEqual(top(p), ["primeiro: Primeiro da lista", "segundo: 2º da lista", "terceiro: 3º da lista"]);
  });
  it("at most 5, at most 2 of a list while other lists have reasons", () => {
    const lists = [list("todo.a", ["a1", "a2", "a3", "a4"]), list("todo.b", ["b1", "b2", "b3"]), list("todo.c", ["c1", "c2", "c3"])];
    const p = new Panel(lists);
    p._ages = Object.fromEntries(lists.map((l) => [l.id, Object.fromEntries(l.items.map((i) => [i.uid, ago(30)]))]));
    const t = p._suggestions().top.map((r) => r.l.id);
    assert.equal(t.length, 5);
    assert.ok(["todo.a", "todo.b", "todo.c"].every((id) => t.filter((x) => x === id).length <= 2));
  });
});

describe("suggest: the AI", () => {
  const lists = () => [list("todo.casa", ["Trocar lâmpada", { summary: "feito", status: "completed" }, { summary: "sem uid", uid: "" }]), list("todo.mercado", ["leite"], { icon: "shopping-cart" })];
  it("Sugerir com IA sends the pending items with what the app knows about them", async () => {
    const p = new Panel(lists(), { "resolvia/ai/suggest": { picks: [{ key: "todo.casa|todo.casa-0", motivo: "Rápido" }] } });
    p._ages = { "todo.casa": { "todo.casa-0": ago(10) } };
    p.rules["todo.casa|todo.casa-0"] = { days: 30 };
    p._ext = { "todo.casa": { "trocar lampada": "Eletricista" } };
    await p._askAi();
    const m = p.hass.calls[0];
    assert.equal(m.type, "resolvia/ai/suggest");
    assert.deepEqual(m.items, [
      { key: "todo.casa|todo.casa-0", lista: "casa", texto: "Trocar lâmpada", dias: 10, pontos: 0, repete: 30, compras: false, comodo: "", equipamento: "", externo: "Eletricista" },
      { key: "todo.mercado|todo.mercado-0", lista: "mercado", texto: "leite", dias: null, pontos: 0, repete: 0, compras: true, comodo: "", equipamento: "", externo: "" },
    ]);
    assert.deepEqual([p._aiBusy, p._aiAsking, p.haptics], [false, false, ["light"]]);
    assert.deepEqual(p._aiRows().map((r) => [r.i.summary, r.why, r.ai]), [["Trocar lâmpada", "Rápido", true]]);
    // Serviços externos off: the AI isn't told who from outside does it
    p._app_ = { ext_off: true };
    await p._askAi();
    assert.equal(p.hass.calls[1].items[0].externo, "");
  });
  it("at most 150 items; nothing pending, or already thinking: nothing is asked", async () => {
    const many = new Panel([list("todo.a", Array.from({ length: 200 }, (_, k) => `t${k}`))], { "resolvia/ai/suggest": { picks: [] } });
    await many._askAi();
    assert.equal(many.hass.calls[0].items.length, 150);
    const none = new Panel([list("todo.a", [{ summary: "x", status: "completed" }])]);
    await none._askAi();
    const busy = new Panel(lists());
    busy._aiBusy = true;
    await busy._askAi();
    assert.equal(none.hass.calls.length + busy.hass.calls.length, 0);
  });
  it("an AI that fails says why (or a default)", async () => {
    const p = new Panel(lists(), { "resolvia/ai/suggest": new Error("Sem cota") });
    await p._askAi();
    assert.equal(p._aiErr, "Sem cota");
    const q = new Panel(lists(), { "resolvia/ai/suggest": () => Promise.reject(null) });
    await q._askAi();
    assert.equal(q._aiErr, "Não consegui falar com a IA.");
  });
  it("the picks: gone lists and items are left out; a resolved one stays only while recent", () => {
    const p = new Panel([...lists(), list("todo.oculta", ["x"], { hidden: true })]);
    p.lists[0].items[1].uid = "done1";
    p._aiPick = { picks: [{ key: "todo.casa|todo.casa-0" }, { key: "todo.casa|done1" }, { key: "todo.sumiu|x" }, { key: "todo.casa|nada" }, { key: "todo.oculta|todo.oculta-0" }] };
    assert.deepEqual(p._aiRows().map((r) => [r.i.summary, r.why]), [["Trocar lâmpada", "Escolhido pela IA"]]);
    p._recent.add("done1");
    assert.deepEqual(p._aiRows().map((r) => r.i.summary), ["Trocar lâmpada", "feito"]);
  });
  it("Voltar ao automático forgets the pick, even if the server doesn't answer", async () => {
    const p = new Panel(lists(), { "resolvia/ai/suggest/clear": new Error("x") });
    p._aiPick = { picks: [] };
    p._aiErr = "velho";
    await p._clearAi();
    assert.deepEqual([p._aiPick, p._aiErr, p.hass.calls[0].type], [null, null, "resolvia/ai/suggest/clear"]);
  });
  it("_loadSuggest: ages and the pick from the server; while it thinks, asks again in 3 s", async () => {
    let n = 0;
    const p = new Panel(lists(), { "resolvia/suggest/get": () => (n++ ? { ages: { a: 1 }, ai: { picks: [] }, busy: false } : { ages: {}, ai: null, busy: true }) });
    await p._loadSuggest();
    assert.equal(p._aiBusy, true);
    mock.timers.tick(3000);
    await new Promise((r) => setImmediate(r));
    assert.equal(n, 2);
    assert.deepEqual([p._ages, p._aiPick, p._aiBusy], [{ a: 1 }, { picks: [] }, false]);
  });
  it("_loadSuggest keeps the old ages when it fails, and keeps a pick being asked", async () => {
    const p = new Panel(lists(), { "resolvia/suggest/get": new Error("x") });
    await p._loadSuggest();
    assert.deepEqual(p._ages, {});
    const q = new Panel(lists(), { "resolvia/suggest/get": { ages: {}, ai: { picks: ["velho"] } } });
    q._aiAsking = true;
    q._aiPick = "novo";
    await q._loadSuggest();
    assert.deepEqual([q._aiPick, q._aiBusy], ["novo", true]);
  });
});

describe("suggest: the page", () => {
  it("nothing pending: Tudo em dia (Agora since 2.60.0), without Ordem dos cards", () => {
    const t = text(new Panel([list("todo.a", [])])._renderSuggest());
    assert.equal(t, "Agora Nada pendente Tudo em dia");
  });
  it("Comece por aqui with the reasons, and Compras with the oldest item; a shopping list opens", () => {
    const p = new Panel([list("todo.casa", ["Varrer", "Lavar"]), list("todo.mercado", ["leite", "ovos"], { icon: "shopping-cart" }), list("todo.feira", ["alface"], { icon: "shopping-cart" })]);
    p._ages = { "todo.mercado": { "todo.mercado-0": ago(15) } };
    const v = p._renderSuggest();
    const t = text(v);
    assert.match(t, /Agora 5 pendentes em 3 listas Comece por aqui 2 Varrer \(Faltam 2 para zerar a lista\) Lavar \(Faltam 2 para zerar a lista\)/);
    assert.match(t, /Compras 2 mercado O mais antigo está há 2 semanas 2 feira 1 item para comprar 1 Ordem dos cards$/);
    click(v, /^feira/);
    assert.equal(p.went, "/lista/todo.feira");
    assert.doesNotMatch(t, /Sugerir com IA/, "AI off: no button");
  });
  const dated = () => {
    const p = new Panel([list("todo.casa", [{ summary: "Pagar luz", due: ymd(-1) }, "Varrer", "Lavar", { summary: "Consertar", due: ymd(3) }])]);
    const items = p.lists[0].items;
    p.due = {
      cards: { late: html`<div>Atrasados 1</div>`, week: html`<div>Próximos 7 dias 1</div>` },
      coming: html`<div>Voltam sozinhas 1</div>`,
      comingN: 1,
      rows: [{ l: p.lists[0], i: items[0] }, { l: p.lists[0], i: items[3] }],
      late: 1,
      today: 0,
    };
    return p;
  };
  it("2.48.0: the start of the app: late and today first, then Comece por aqui (without them), then the rest of what is due", () => {
    const t = text(dated()._renderSuggest());
    assert.match(t, /^Agora 4 pendentes em 1 lista · 1 atrasado Atrasados 1 Comece por aqui 2 Varrer .* Lavar .* Próximos 7 dias 1 Voltam sozinhas 1 Ordem dos cards$/);
    assert.doesNotMatch(t, /Comece por aqui.*Pagar luz/, "a late one is not repeated in Comece por aqui");
  });
  it("2.48.0: nothing pending but a task that comes back by itself: it shows", () => {
    const p = new Panel([list("todo.a", [])]);
    p.due = { cards: {}, coming: html`<div>Voltam sozinhas 1</div>`, comingN: 1, rows: [], late: 0, today: 0 };
    assert.match(text(p._renderSuggest()), /Agora Nada pendente Voltam sozinhas 1 Ordem dos cards$/);
  });
  it("2.60.0: nowOrder: every card, without repeats or unknowns; one missing goes after the one before it by default", () => {
    assert.deepEqual(nowOrder(null), NOW_CARDS);
    assert.deepEqual(nowOrder(["shopping", "x", "shopping", "late"]), ["shopping", "late", "today", "start", "tomorrow", "week", "later", "coming"]);
    assert.deepEqual(nowOrder(["coming", "start"]), ["late", "today", "coming", "shopping", "start", "tomorrow", "week", "later"]);
  });
  it("2.60.0: Ordem dos cards: each person their order; Subir, Descer and Voltar à ordem de sempre", () => {
    const p = dated();
    p.hass.user = { id: "u-ana", name: "Ana" };
    p._repeatOn = () => true;
    const v = p._renderSuggest();
    click(v, /^Ordem dos cards$/);
    assert.equal(p._sheet, "cards");
    let sheet = p._renderCardsSheet();
    let t = text(sheet);
    assert.match(t, /^Ordem dos cards A ordem da Agora, só para você\. Atrasados Hoje Sem nada agora Comece por aqui Amanhã Sem nada agora Próximos 7 dias Mais adiante Sem nada agora Voltam sozinhas Compras Sem nada agora$/);
    assert.match(controls(sheet).find((c) => c.aria === "Subir Atrasados").attrs, /disabled/, "the first can't go up");
    assert.match(controls(sheet).find((c) => c.aria === "Descer Compras").attrs, /disabled/, "the last can't go down");
    click(sheet, "Subir Comece por aqui");
    assert.deepEqual(p.prefs.at(-1), { now_order: { "u-ana": ["late", "start", "today", "tomorrow", "week", "later", "coming", "shopping"] } });
    click(p._renderCardsSheet(), "Descer Atrasados");
    assert.deepEqual(p._nowOrder().slice(0, 3), ["start", "late", "today"]);
    assert.match(text(p._renderSuggest()), /^Agora .* Comece por aqui 2 .* Atrasados 1 Próximos 7 dias 1 Voltam sozinhas 1 Ordem dos cards$/);
    // another person: the order of always
    p.hass.user = { id: "u-beto", name: "Beto" };
    assert.deepEqual(p._nowOrder(), NOW_CARDS);
    p.hass.user = { id: "u-ana", name: "Ana" };
    sheet = p._renderCardsSheet();
    click(sheet, /Voltar à ordem de sempre/);
    assert.deepEqual(p.prefs.at(-1), { now_order: null });
    assert.doesNotMatch(text(p._renderCardsSheet()), /Voltar à ordem de sempre/);
  });
  it("2.60.0: Ordem dos cards with Controlar prazos off: the cards of the deadlines say so", () => {
    const p = new Panel([list("todo.casa", ["Varrer"])]);
    p._app_.due_off = true;
    p._renderSuggest();
    const t = text(p._renderCardsSheet());
    assert.match(t, /Atrasados Controlar prazos desligado Hoje Controlar prazos desligado Comece por aqui Amanhã/);
    assert.match(t, /Voltam sozinhas Controlar prazos desligado Compras Sem nada agora$/);
  });
  it("with the AI on: Sugerir com IA (off while the AI isn't ready, saying why)", () => {
    const p = new Panel([list("todo.casa", ["Varrer"])]);
    p.aiOn = true;
    p.ai = { ready: false, reason: "Nenhuma IA configurada." };
    const v = p._renderStart(p._suggestions());
    assert.match(text(v), /Nenhuma IA configurada\. Sugerir com IA/);
    assert.match(controls(v).find((c) => c.text === "Sugerir com IA").attrs, /disabled/);
  });
  it("picked by the AI: Escolhidos pela IA, Sugerir de novo and Voltar ao automático", async () => {
    const p = new Panel([list("todo.casa", ["Varrer", "Lavar"])], { "resolvia/ai/suggest/clear": {} });
    p.aiOn = true;
    p._aiPick = { picks: [{ key: "todo.casa|todo.casa-1", motivo: "Leva 5 minutos" }] };
    const v = p._renderStart(p._suggestions());
    assert.match(text(v), /Comece por aqui 1 Escolhidos pela IA\. Lavar \(Leva 5 minutos\)/);
    assert.deepEqual(labels(v), ["Sugerir de novo", "Voltar ao automático"]);
    await click(v, "Voltar ao automático");
    assert.equal(p._aiPick, null);
  });
  it("everything the AI picked was resolved: says so, and shows the automatic one", () => {
    const p = new Panel([list("todo.casa", ["Varrer"])]);
    p.aiOn = true;
    p._aiPick = { picks: [{ key: "todo.casa|sumiu" }] };
    assert.match(text(p._renderStart(p._suggestions())), /Varrer \(É o último da lista\) Tudo o que a IA sugeriu foi resolvido\./);
  });
  it("thinking: Pensando… (disabled); an error shows under the list", () => {
    const p = new Panel([list("todo.casa", ["Varrer"])]);
    p.aiOn = true;
    p._aiBusy = true;
    p._aiErr = "Sem cota";
    const v = p._renderStart(p._suggestions());
    assert.match(text(v), /Sem cota Pensando…/);
    assert.match(controls(v).find((c) => c.text === "Pensando…").attrs, /disabled/);
  });
});
