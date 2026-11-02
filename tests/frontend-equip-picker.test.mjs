import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { searchEquips, renderEquipPicker } from "../frontend/src/equip-picker.js";

const ITEMS = [
  { id: "geladeira", nome: "Geladeira", zona: "Bancada", roomId: "cozinha", roomName: "Cozinha" },
  { id: "fogao", nome: "Fogão", zona: "", roomId: "cozinha", roomName: "Cozinha" },
  { id: "filtro", nome: "Filtro de água", zona: "Pia", roomId: "cozinha", roomName: "Cozinha" },
  { id: "ar_quarto", nome: "Ar-condicionado", zona: "Parede", roomId: "quarto", roomName: "Quarto" },
  { id: "armario", nome: "Armário", zona: "Closet", roomId: "quarto", roomName: "Quarto" },
  { id: "aquecedor", nome: "Aquecedor de água", zona: "Área externa", roomId: "servico", roomName: "Área de serviço" },
  { id: "chuveiro", nome: "Chuveiro", roomId: "banheiro", roomName: "Banheiro" },
  { id: "solto", nome: "Escada", zona: "", roomId: "", roomName: "" },
];
const ids = (list) => list.map((i) => i.id);

describe("searchEquips", () => {
  it("no room and no search: nothing listed (the picker asks to choose)", () => {
    assert.deepEqual(searchEquips(ITEMS), { inRoom: [], others: [] });
    assert.deepEqual(searchEquips(ITEMS, { query: "   " }), { inRoom: [], others: [] });
  });

  it("a room without a search: its items in alphabetical order (pt-BR), nothing else", () => {
    const r = searchEquips(ITEMS, { room: "cozinha" });
    assert.deepEqual(ids(r.inRoom), ["filtro", "fogao", "geladeira"]);
    assert.deepEqual(r.others, []);
  });

  it("a search ignores accents and case, on the name, the zone and the room", () => {
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "AGUA" }).others), ["aquecedor", "filtro"]);
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "fogao" }).others), ["fogao"]);
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "closet" }).others), ["armario"]);
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "servico" }).others), ["aquecedor"]);
  });

  it("every word must be found (in any of the fields)", () => {
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "agua pia" }).others), ["filtro"]);
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "agua  cozinha" }).others), ["filtro"]);
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "agua quarto" }).others), []);
  });

  it("ranks names that start with the search, then names that have it, then zone/room matches", () => {
    const items = [
      { id: "z", nome: "Lâmpada", zona: "Ar livre", roomId: "x" },
      { id: "b", nome: "Purificador de ar", roomId: "x" },
      { id: "a2", nome: "Armário", roomId: "x" },
      { id: "a1", nome: "Ar-condicionado", roomId: "x" },
    ];
    assert.deepEqual(ids(searchEquips(items, { query: "ar" }).others), ["a1", "a2", "b", "z"]);
  });

  it("with a room, its matches come first and the rest apart", () => {
    const r = searchEquips(ITEMS, { room: "quarto", query: "ar" });
    assert.deepEqual(ids(r.inRoom), ["ar_quarto", "armario"]);
    assert.deepEqual(ids(r.others), ["aquecedor"], "found by its zone 'Área externa' / room 'Área de serviço'");
    const r2 = searchEquips(ITEMS, { room: "cozinha", query: "agua" });
    assert.deepEqual(ids(r2.inRoom), ["filtro"]);
    assert.deepEqual(ids(r2.others), ["aquecedor"]);
  });

  it("an item without zone or room still matches by name", () => {
    assert.deepEqual(ids(searchEquips(ITEMS, { query: "esc" }).others), ["solto"]);
  });

  it("does not change the items given", () => {
    const copy = JSON.parse(JSON.stringify(ITEMS));
    searchEquips(ITEMS, { room: "cozinha", query: "a" });
    assert.deepEqual(ITEMS, copy);
  });
});

// ---------------------------------------------------------------- the picker, with a fake lit

const NOTHING = Symbol("nothing");
const html = (strings, ...values) => ({ strings, values });
const lit = { html, nothing: NOTHING };
const icon = (name) => `[${name}]`;

/** The template as text (event handlers left out). */
function text(v) {
  if (v === NOTHING || v == null || v === false || typeof v === "function") return "";
  if (Array.isArray(v)) return v.map(text).join("");
  if (typeof v === "object" && v.strings) return v.strings.reduce((out, s, i) => out + s + (i < v.values.length ? text(v.values[i]) : ""), "");
  return String(v);
}

/** Every event handler in the template, in order. */
function handlers(v, out = []) {
  if (typeof v === "function") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => handlers(x, out));
  else if (v && typeof v === "object" && v.values) v.values.forEach((x) => handlers(x, out));
  return out;
}

function picker(opts) {
  const calls = { pick: [], query: [], more: 0 };
  const tpl = renderEquipPicker({ lit, icon, items: ITEMS, onPick: (id) => calls.pick.push(id), onQuery: (q) => calls.query.push(q), onMore: () => calls.more++, ...opts });
  const t = text(tpl).replace(/\s+/g, " ");
  return { tpl, t, calls, rows: (t.match(/class="eq-row"/g) || []).length };
}

describe("renderEquipPicker", () => {
  it("the chosen item becomes a card with zone and room, and × removes it", () => {
    const { tpl, t, calls } = picker({ value: "geladeira" });
    assert.match(t, /<b>Geladeira<\/b><small>Bancada · Cozinha<\/small>/);
    assert.match(t, /aria-label="Tirar o equipamento"/);
    handlers(tpl)[0]();
    assert.deepEqual(calls.pick, [null]);
    assert.match(picker({ value: "solto" }).t, /<small>Sem cômodo<\/small>/);
  });

  it("an unknown chosen id shows the search instead", () => {
    assert.match(picker({ value: "sumiu" }).t, /eq-search/);
  });

  it("no room, no search: asks to choose, counting the items", () => {
    const { t, rows } = picker({});
    assert.equal(rows, 0);
    assert.match(t, /Escolha o cômodo ou busque entre 8 equipamentos\./);
    assert.match(t, /placeholder=Buscar equipamento…|placeholder=\s*Buscar equipamento…/);
    assert.match(picker({ items: [ITEMS[0]] }).t, /entre 1 equipamento\./);
  });

  it("a room: its items, the search placeholder names it", () => {
    const { t, rows } = picker({ room: "cozinha", roomName: "Cozinha" });
    assert.equal(rows, 3);
    assert.match(t, /Buscar em Cozinha…/);
    assert.doesNotMatch(t, /Em outros cômodos/);
    assert.doesNotMatch(t, /eq-hint/);
  });

  it("a room without items says so", () => {
    assert.match(picker({ room: "garagem", roomName: "Garagem" }).t, /Nenhum equipamento em Garagem\. Busque nos outros cômodos\./);
  });

  it("a search with a room shows the others apart, with their room", () => {
    const { t } = picker({ room: "quarto", roomName: "Quarto", query: "ar" });
    assert.match(t, /Em outros cômodos/);
    assert.match(t, /<small>Área externa · Área de serviço<\/small>/);
    const inRoomPart = t.split("Em outros cômodos")[0];
    assert.match(inRoomPart, /<small>Parede<\/small>/, "items of the room do not repeat the room");
  });

  it("a search without a room lists the matches with their room, no 'other rooms' heading", () => {
    const { t } = picker({ query: "agua" });
    assert.doesNotMatch(t, /Em outros cômodos/);
    assert.match(t, /<small>Pia · Cozinha<\/small>/);
  });

  it("nothing found", () => {
    assert.match(picker({ query: "xyz" }).t, /Nada com “xyz”\./);
  });

  it("highlights the first search word, ignoring accents and case", () => {
    const { t } = picker({ query: "geLA" });
    assert.match(t, /<mark>Gela<\/mark>deira/);
    assert.match(picker({ query: "fogao" }).t, /<mark>Fogão<\/mark>/);
    assert.match(picker({ query: "agua" }).t, /Filtro de <mark>água<\/mark>/);
    assert.match(picker({ query: "pia" }).t, /<b>Filtro de água<\/b>/, "found by zone: nothing to mark in the name");
  });

  it(
    "highlights the right letters after an emoji in the name",
    () => {
      const items = [{ id: "g", nome: "🧊 Geladeira", roomId: "c", roomName: "Cozinha" }];
      assert.match(picker({ items, query: "gela" }).t, /🧊 <mark>Gela<\/mark>deira/);
    },
  );

  it("shows 6 rows, then 'Mostrar mais N'; with more, up to 40", () => {
    const many = Array.from({ length: 50 }, (_, i) => ({ id: `e${i}`, nome: `Equip ${String(i).padStart(2, "0")}`, roomId: i < 4 ? "sala" : "outro", roomName: i < 4 ? "Sala" : "Outro" }));
    const few = picker({ items: many, room: "sala", roomName: "Sala", query: "equip" });
    assert.equal(few.rows, 6, "4 of the room + 2 others");
    assert.match(few.t, /Mostrar mais 44/);
    const more = picker({ items: many, room: "sala", roomName: "Sala", query: "equip", more: true });
    assert.equal(more.rows, 40);
    assert.match(more.t, /Mostrar mais 10/);
    handlers(more.tpl).find((f) => f.length === 0 && /onMore/.test(f.toString()))();
    assert.equal(more.calls.more, 1);
    const all = picker({ items: many.slice(0, 5), room: "sala", roomName: "Sala", query: "equip" });
    assert.doesNotMatch(all.t, /Mostrar mais/);
  });

  it("typing calls onQuery, a row calls onPick with its id", () => {
    const { tpl, calls } = picker({ room: "cozinha", roomName: "Cozinha" });
    const hs = handlers(tpl);
    hs.find((f) => /onQuery/.test(f.toString()))({ target: { value: "gel" } });
    assert.deepEqual(calls.query, ["gel"]);
    for (const f of hs.filter((f) => /onPick\(i\.id\)/.test(f.toString()))) f();
    assert.deepEqual(calls.pick, ["filtro", "fogao", "geladeira"]);
  });
});
