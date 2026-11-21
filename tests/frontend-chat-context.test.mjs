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
const { nothing } = await import("../frontend/vendor/lit-all.min.js");

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

describe("chat: who uses and whose (2.75.0)", () => {
  it("the person of the login (the one of the placar first), whose each list is, the notes, the repetition and the done items", () => {
    const p = panel();
    p.hass.user = { name: "Beto Exemplo" };
    p._pts = { placar: { eu: "Beto" } };
    p._ruleFor = (listId, item) => (item.summary === "Trocar o filtro" ? { days: 30 } : null);
    CASA.owner = "Ana";
    CASA.items[1].description = "o do\n  ar da sala";
    try {
      const c = p._chatContext();
      assert.equal(c.eu, "Beto");
      const casa = c.listas[0];
      assert.equal(casa.de, "Ana");
      assert.equal(casa.concluidas, 1);
      assert.deepEqual(casa.concluidas_itens, ["Lavar a louça"]);
      assert.deepEqual(casa.itens.map((i) => [i.texto, i.notas, i.repete]), [["Pagar a luz", "", ""], ["Trocar o filtro", "o do ar da sala", "volta 30 dias depois de concluída"]]);
      p._pts = null;
      assert.equal(p._chatContext().eu, "Beto Exemplo", "without the placar: the name of the login");
    } finally {
      delete CASA.owner;
      delete CASA.items[1].description;
    }
  });
});

describe("chat: the ready questions (2.75.0)", () => {
  it("6 at hand and 20 more models, none twice, with the options on or off", () => {
    for (const on of [{}, { points: true, rooms: true, equips: true, ext: true }]) {
      for (const view of [{ name: "home" }, { name: "list", id: "todo.casa" }]) {
        const p = panel({ on, view });
        p._ptsActive = () => !!on.points;
        p._roomsOn = () => !!on.rooms;
        p._equipsOn = () => !!on.equips;
        p._extOn = () => !!on.ext;
        p._repeatOn = () => !!on.ext;
        const at = p._chatExamples(), more = p._chatModels();
        assert.equal(at.length, 6, JSON.stringify([on, view]));
        assert.equal(more.length, 20, JSON.stringify([on, view]));
        assert.equal(new Set([...at, ...more]).size, 26);
        if (view.name === "list") assert.equal(at[0], "O que é mais urgente em Casa?");
      }
    }
    const off = panel();
    off._app_.due_off = true;
    const all = [...off._chatExamples(), ...off._chatModels()].join("\n");
    assert.doesNotMatch(all, /atrasad|vence|prazo|pontos|cômodo|cozinha|equipamento|alguém de fora|repetem/, "each one only with its option on");
  });
});

describe("chat: sending and the cards", () => {
  const withHass = (answers, over = {}) => {
    const p = panel(over);
    p.hass = fakeHass(answers);
    globalThis.sessionStorage ??= { getItem: () => null, setItem() {} };
    return p;
  };

  it("sends the conversation and the context; the answer comes with its cards", async () => {
    const p = withHass({ "resolvia/ai/chat": () => ({ reply: "Posso:", actions: [{ tipo: "adicionar", lista: "todo.mercado", nome: "Mercado", item: "Café", prazo: "2026-11-20" }, { tipo: "concluir", lista: "todo.casa", nome: "Casa", item: "Pagar a luz" }] }) });
    await p._chatSend("põe café no mercado");
    const msg = p.hass.calls[0];
    assert.equal(msg.type, "resolvia/ai/chat");
    assert.deepEqual(msg.messages, [{ role: "user", text: "põe café no mercado" }]);
    assert.ok(msg.context.listas.length);
    const ia = p._chatState().messages[1];
    assert.deepEqual(ia.actions.map((a) => [a.label, a.icon, a.state]), [['Adicionar "Café" em Mercado · prazo 20/11', "plus", "todo"], ['Concluir "Pagar a luz" em Casa', "check", "todo"]]);
    assert.equal(p._chatState().busy, false);
  });

  it("with files, by POST; a failure gives the files back, to send again", async () => {
    const p = withHass({});
    const sent = [];
    p.hass.resolvia.chat = async (b) => (sent.push(b), { reply: "Li a foto." });
    p._setChat({ files: [{ nome: "Foto 1.jpg", data: "QUJD", mime: "image/jpeg", url: "" }] });
    await p._chatSend("o que é isto?");
    assert.deepEqual(sent[0].files, [{ data: "QUJD", mime: "image/jpeg", nome: "Foto 1.jpg" }]);
    assert.deepEqual(p._chatState().messages[0].anexos, ["Foto 1.jpg"]);
    const q = withHass({});
    q.hass.resolvia.chat = async () => { throw new Error("A IA está fora do ar."); };
    q._setChat({ files: [{ nome: "Foto 1.jpg", data: "x", mime: "image/jpeg", url: "" }] });
    await q._chatSend("e isto?");
    assert.equal(q._chatState().error, "A IA está fora do ar.");
    assert.equal(q._chatState().files.length, 1, "the files come back");
    assert.equal(q._chatState().messages.length, 0, "and the message leaves");
    const r = withHass({ "resolvia/ai/chat": new Error("") });
    await r._chatSend("oi");
    assert.equal(r._chatState().error, "A IA não respondeu. Tente de novo.");
  });

  it("a card adds the item with its date, or completes it; a list gone or an item done says why; Fazer todas", async () => {
    const p = withHass({});
    const done = [];
    p._addFull = async (l, f) => (done.push(["add", l.id, f.summary, f.date]), true);
    p._toggle = async (l, i) => done.push(["toggle", l.id, i.summary]);
    p._setChat({ messages: [{ role: "ia", text: "", actions: [
      { tipo: "adicionar", lista: "todo.mercado", item: "Café", prazo: "2026-11-20", state: "todo" },
      { tipo: "concluir", lista: "todo.casa", item: "pagar a LUZ", state: "todo" },
      { tipo: "concluir", lista: "todo.casa", item: "Lavar a louça", state: "todo" },
      { tipo: "adicionar", lista: "todo.sumiu", item: "X", state: "todo" },
      { tipo: "adicionar", lista: "todo.mercado", item: "Pão", state: "done" },
    ] }] });
    await p._chatDoAll(0);
    assert.deepEqual(done, [["add", "todo.mercado", "Café", "2026-11-20"], ["toggle", "todo.casa", "Pagar a luz"]]);
    assert.deepEqual(p._chatState().messages[0].actions.map((a) => [a.state, a.note || ""]), [
      ["done", ""], ["done", ""], ["failed", "Esse item não está mais pendente."], ["failed", "Lista não encontrada."], ["done", ""]]);
    await p._chatDo(0, 0);
    assert.equal(done.length, 2, "a card done is not done twice");
    await p._chatDo(5, 0);
  });

  it("the camera's photos join the files (up to 4) and open the chat; the button only with Usar IA on", () => {
    const p = withHass({});
    p._openChat = () => (p._sheet = "chat");
    p._chatAddShots([{ data: "a", url: "u1" }, { data: "b", url: "u2" }]);
    assert.deepEqual(p._chatState().files.map((f) => f.nome), ["Foto 1.jpg", "Foto 2.jpg"]);
    assert.equal(p._sheet, "chat");
    p._chatAddShots([1, 2, 3].map((n) => ({ data: String(n) })));
    assert.equal(p._chatState().files.length, 4);
    assert.notEqual(p._renderChatBtn(), nothing);
    p._app_.ai_off = true;
    assert.equal(p._renderChatBtn(), nothing);
  });

  it("the sheet: the window of the Conversa with the 6 questions; the microphone stops when it closes", () => {
    const p = withHass({});
    p._voice = { ready: true };
    p._isHaAndroid = () => false;
    const v = p._renderChatSheet();
    assert.ok(v && v.strings, "a template");
    p._chatRec = { cancel() { this.cancelled = true; } };
    const rec = p._chatRec;
    p._chat = { ...p._chatState(), rec: "on" };
    p._chatStop();
    assert.equal(rec.cancelled, true);
    assert.equal(p._chatState().rec, null);
    p._chatScroll = true;
    p._sheet = "chat";
    const log = { scrollTop: 0, scrollHeight: 900 };
    p.renderRoot = { querySelector: () => log };
    p._chatAfterRender();
    assert.equal(log.scrollTop, 900);
  });

  it("the microphone: Pronto sends what was understood; too short or a failure says so", async () => {
    const p = withHass({ "resolvia/ai/chat": () => ({ reply: "ok" }) });
    p.hass.resolvia.voiceText = async () => ({ text: "o que vence hoje" });
    p._chatRec = { stop: () => new Int16Array(16000) };
    p._chat = { ...p._chatState(), rec: "on" };
    await p._chatMic();
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(p._chatState().messages[0].text, "o que vence hoje");
    p._chatRec = { stop: () => new Int16Array(10) };
    p._chat = { ...p._chatState(), rec: "on" };
    await p._chatMic();
    assert.equal(p._chatState().error, "Não ouvi nada. Toque no microfone e fale.");
    p.hass.resolvia.voiceText = async () => { throw new Error("Sem fala para texto."); };
    p._chatRec = { stop: () => new Int16Array(16000) };
    p._chat = { ...p._chatState(), rec: "on" };
    await p._chatMic();
    assert.equal(p._chatState().error, "Sem fala para texto.");
    p._chatRec = null;
    p._chat = { ...p._chatState(), rec: "on" };
    await p._chatMic();
    assert.equal(p._chatState().rec, null);
  });

  it("Cancelar while listening: the microphone stops, nothing is transcribed or sent", async () => {
    const p = withHass({ "resolvia/ai/chat": () => ({ reply: "ok" }) });
    let heard = 0;
    p.hass.resolvia.voiceText = async () => (heard++, { text: "não era para ir" });
    const rec = { cancel() { this.cancelled = true; }, stop: () => new Int16Array(16000) };
    p._chatRec = rec;
    p._chat = { ...p._chatState(), rec: "on", error: "antes" };
    p._chatMicCancel();
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(rec.cancelled, true);
    assert.deepEqual([p._chatRec, p._chatState().rec, p._chatState().error, heard, p._chatState().messages.length], [null, null, "", 0, 0]);
    p._chatMicCancel(); // twice, or with nothing listening: nothing happens
    assert.equal(p._chatState().rec, null);
  });
});
