// Conversa (the chat beside the microphone): what the screen sends, the instructions and the actions.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanChat, chatInstructions, parseChatActions, replyOf, CHAT_STRUCTURE, MAX_ACTIONS } from "../resolvia/rootfs/app/lib/chat.js";

const ctx = () => ({
  tela: 'a lista "Casa"',
  listas: [
    { id: "todo.casa", nome: "Casa", adicionar: true, prazos: true, pendentes: 3, itens: [{ texto: "Passar pano na casa" }, { texto: "Pagar conta de luz", prazo: "2026-11-01", atrasado: true, pontos: 10 }, { texto: "Trocar filtro do ar", comodo: "Sala", equipamento: "Ar-condicionado" }] },
    { id: "todo.shopping_list", nome: "Lista de compras", adicionar: true, prazos: false, pendentes: 1, itens: [{ texto: "Pão" }] },
    { id: "todo.avisos", nome: "Avisos do condomínio", adicionar: false, itens: [{ texto: "Assembleia" }] },
  ],
});
const NOW = new Date(2026, 10, 2, 9, 30);

describe("cleanChat", () => {
  it("keeps the last 16 turns of the person and the AI, without empty ones", () => {
    const messages = [{ role: "system", text: "x" }, { role: "user", text: "  " }, ...Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? "ia" : "user", text: `m${i}` }))];
    const c = cleanChat({ messages, context: ctx() });
    assert.equal(c.messages.length, 16);
    assert.equal(c.messages[15].text, "m19");
    assert.ok(c.messages.every((m) => m.role === "user" || m.role === "ia"));
  });
  it("checks the lists: valid ids only, item texts on one line, dates as AAAA-MM-DD, no negative points", () => {
    const c = cleanChat({ messages: [{ role: "user", text: "oi" }], context: { tela: "x\ny", listas: [{ id: "light.x", itens: [] }, { id: "todo.a", nome: "A", itens: [{ texto: "a|b\nc", prazo: "amanhã", pontos: -2 }, { texto: "" }] }] } });
    assert.equal(c.context.tela, "x y");
    assert.equal(c.context.listas.length, 1);
    assert.deepEqual(c.context.listas[0].itens, [{ texto: "a b c", prazo: null, atrasado: false, pontos: 0, comodo: "", equipamento: "", externo: "" }]);
  });
  it("at most 250 items in all", () => {
    const listas = Array.from({ length: 5 }, (_, n) => ({ id: `todo.l${n}`, nome: `L${n}`, itens: Array.from({ length: 80 }, (_, i) => ({ texto: `i${i}` })) }));
    const c = cleanChat({ messages: [], context: { listas } });
    assert.equal(c.context.listas.reduce((s, l) => s + l.itens.length, 0), 250);
  });
  it("tolerates nothing at all", () => {
    assert.deepEqual(cleanChat(null), { messages: [], context: { tela: "", listas: [] } });
  });
});

describe("chatInstructions", () => {
  const p = chatInstructions(cleanChat({ messages: [{ role: "user", text: "O que está atrasado?" }, { role: "ia", text: "A conta de luz." }, { role: "user", text: "E hoje?" }], context: ctx() }), NOW);
  it("in Portuguese, today with the weekday, the screen", () => {
    assert.match(p, /português do Brasil/);
    assert.match(p, /segunda-feira, 2 de novembro de 2026, 09:30 \(2026-11-02\)/);
    assert.match(p, /A pessoa está na tela: a lista "Casa"\./);
  });
  it("the lists with their items: date (late), points, room and equipment; one that takes no new items says so", () => {
    assert.match(p, /• Casa: 3 pendentes/);
    assert.match(p, /- Pagar conta de luz \(prazo 2026-11-01 \(atrasado\); 10 pontos\)/);
    assert.match(p, /- Trocar filtro do ar \(cômodo: Sala; equipamento: Ar-condicionado\)/);
    assert.match(p, /• Avisos do condomínio \(não aceita itens novos\)/);
  });
  it("the conversation, ending with the person's last words", () => {
    assert.match(p, /Pessoa: O que está atrasado\?\nVocê: A conta de luz\.\nPessoa: E hoje\?$/);
  });
  it("more items than were sent: says how many more", () => {
    const c = ctx();
    c.listas[0].pendentes = 50;
    assert.match(chatInstructions(cleanChat({ messages: [{ role: "user", text: "x" }], context: c }), NOW), /… e mais 47/);
  });
});

describe("parseChatActions", () => {
  const c = cleanChat({ messages: [], context: ctx() }).context;
  it("adicionar: a day that does not exist (30/02) goes without a date", () => {
    const a = parseChatActions(["adicionar | Casa | pilhas | 2026-02-30", "adicionar | Casa | lâmpada | 2026-02-28"], cleanChat({ context: ctx() }).context);
    assert.deepEqual(a.map((x) => x.prazo), [null, "2026-02-28"]);
  });
  it("adicionar: the list by name (accents and case ignored), the item capitalized, a date only where the list takes dates", () => {
    assert.deepEqual(parseChatActions(["adicionar | casa | comprar pilhas | 2026-11-05", "Adicionar | LISTA DE COMPRAS | leite | 2026-11-05"], c), [
      { tipo: "adicionar", lista: "todo.casa", nome: "Casa", item: "Comprar pilhas", prazo: "2026-11-05" },
      { tipo: "adicionar", lista: "todo.shopping_list", nome: "Lista de compras", item: "Leite", prazo: null },
    ]);
  });
  it("concluir: only an item that is in the list, written as it is there", () => {
    assert.deepEqual(parseChatActions(["concluir | Casa | passar PANO na casa", "concluir | Casa | lavar o carro"], c), [{ tipo: "concluir", lista: "todo.casa", nome: "Casa", item: "Passar pano na casa" }]);
  });
  it("leaves out unknown lists, lists that take no items, repeats, bad dates and other verbs", () => {
    const out = parseChatActions(["adicionar | Garagem | x |", "adicionar | Avisos do condomínio | x |", "adicionar | Casa | Pilhas |", "adicionar | casa | pilhas | 31/12", "apagar | Casa | Passar pano na casa", "lixo"], c);
    assert.deepEqual(out, [{ tipo: "adicionar", lista: "todo.casa", nome: "Casa", item: "Pilhas", prazo: null }]);
  });
  it(`at most ${MAX_ACTIONS}; a single string with lines also works`, () => {
    assert.equal(parseChatActions(Array.from({ length: 15 }, (_, i) => `adicionar | Casa | item ${i}`), c).length, MAX_ACTIONS);
    assert.equal(parseChatActions("adicionar | Casa | a\nadicionar | Casa | b", c).length, 2);
    assert.deepEqual(parseChatActions(null, c), []);
  });
});

describe("replyOf and the structure", () => {
  it("the answer from the structure or a plain string", () => {
    assert.equal(replyOf({ resposta: " Oi! " }), "Oi!");
    assert.equal(replyOf("Oi"), "Oi");
    assert.equal(replyOf({}), "");
    assert.equal(replyOf(null), "");
  });
  it("asks for an answer (text) and optional actions (several lines)", () => {
    assert.equal(CHAT_STRUCTURE.resposta.required, true);
    assert.deepEqual(CHAT_STRUCTURE.acoes.selector, { text: { multiple: true } });
  });
});
