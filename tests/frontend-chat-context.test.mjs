// frontend/src/chat-panel.js: what goes to the AI of the Conversa is what the screen shows (2.74.0, after the AI of the
// InventarIA answered with values different from the screen's): the visible lists (the open one first, even hidden), the
// pending items only, no due dates in a list whose dates are information, and no room, equipment, points or external service
// when their option is off.
import "./_lit.mjs";
import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { fakeHass, hostOf, click, labels } from "./_lit.mjs";
import { Recorder, micError, VOICE_MAX_S } from "../frontend/src/voice.js";
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

describe("chat: what is kept, the window and the clip", () => {
  const store = () => {
    const kept = {};
    globalThis.sessionStorage = { getItem: (k) => (k in kept ? kept[k] : null), setItem: (k, v) => (kept[k] = v) };
    return kept;
  };

  it("the conversation is kept in this tab (the last 30 messages) and comes back; private mode does not break", () => {
    const kept = store();
    const p = panel();
    p._setChat({ messages: Array.from({ length: 34 }, (_, i) => ({ role: "user", text: `m${i}` })) });
    const saved = JSON.parse(kept["resolvia-conversa"]);
    assert.deepEqual([saved.length, saved[0].text, saved[29].text], [30, "m4", "m33"]);
    p._setChat({ draft: "oi" });
    assert.equal(JSON.parse(kept["resolvia-conversa"]).length, 30, "only the messages are kept, when they change");
    assert.deepEqual(panel()._chatState().messages.map((m) => m.text).slice(0, 2), ["m4", "m5"], "another opening of the app in this tab: the same conversation");
    kept["resolvia-conversa"] = '{"não":"lista"}';
    assert.deepEqual(panel()._chatState().messages, [], "something else kept there: an empty conversation");
    globalThis.sessionStorage = { getItem() { throw new Error("private"); }, setItem() { throw new Error("private"); } };
    const q = panel();
    assert.deepEqual(q._chatState().messages, []);
    assert.doesNotThrow(() => q._setChat({ messages: [{ role: "user", text: "oi" }] }));
    assert.equal(q._chatState().messages.length, 1);
    store();
  });

  it("the button opens the window; on a computer (a mouse) the box takes the focus, on a phone the keyboard stays down", async () => {
    store();
    const p = panel();
    p.updateComplete = Promise.resolve();
    const ta = { focused: 0, focus() { this.focused++; } };
    p.renderRoot = { querySelector: (q) => (q === ".chat-input textarea" ? ta : null) };
    globalThis.window.matchMedia = (q) => ({ matches: /pointer: fine/.test(q) });
    try {
      click(p._renderChatBtn(), "Conversar com a IA");
      await p.updateComplete;
      assert.deepEqual([p._sheet, p._chatScroll, ta.focused], ["chat", true, 1]);
      globalThis.window.matchMedia = () => ({ matches: false });
      p._openChat();
      await p.updateComplete;
      assert.equal(ta.focused, 1, "a phone: no focus");
      p.renderRoot = { querySelector: () => null };
      p._openChat(); // the box is not drawn yet: no error
      await p.updateComplete;
    } finally {
      delete globalThis.window.matchMedia;
    }
    p._openChat();
    await p.updateComplete;
    assert.equal(ta.focused, 1);
  });

  it("the clip: Tirar foto opens the camera of the app; Escolher fotos, the gallery (one at a time in the Home Assistant app on Android); Escolher arquivo, a photo or a PDF", () => {
    store();
    const doc = globalThis.document;
    const made = [];
    globalThis.document = {
      ...doc,
      createElement: (tag) => {
        const el = { tag, style: {}, files: [], clicked: 0, removed: 0, on: {}, addEventListener(t, fn) { this.on[t] = fn; }, click() { this.clicked++; }, remove() { this.removed++; } };
        made.push(el);
        return el;
      },
      body: { appended: [], appendChild(el) { this.appended.push(el); } },
    };
    try {
      const mk = (android = false) => Object.assign(panel(), { _isHaAndroid: () => android, cams: [], _openCamera(o) { this.cams.push(o); } });
      const p = mk();
      p._chatAttach("camera");
      assert.deepEqual(p.cams, [{ chat: true }]);
      const added = [];
      p._chatAddFiles = (l) => added.push(l);
      p._chatAttach("fotos");
      const inp = made[0];
      assert.deepEqual([inp.tag, inp.type, inp.accept, inp.multiple, inp.style.display, inp.clicked], ["input", "file", "image/*", true, "none", 1]);
      assert.deepEqual(globalThis.document.body.appended, [inp]);
      inp.files = [{ name: "a.jpg" }, { name: "b.jpg" }];
      inp.on.change();
      assert.deepEqual([inp.removed, added], [1, [[{ name: "a.jpg" }, { name: "b.jpg" }]]]);
      mk(true)._chatAttach("fotos");
      assert.equal(made[1].multiple, false, "the Home Assistant app on Android drops what multiple chose");
      p._chatAttach("arquivo");
      assert.deepEqual([made[2].accept, made[2].multiple], ["image/*,application/pdf", false]);
      made[2].files = null;
      made[2].on.change();
      assert.deepEqual([made[2].removed, added.length], [1, 1], "nothing chosen: the field leaves the page and nothing is added");
    } finally {
      globalThis.document = doc;
    }
  });

  it("the files chosen go to the conversation, with what could not be read said; the X of a file takes it out", async () => {
    store();
    const p = panel();
    p._setChat({ files: [{ nome: "nota.pdf", pdf: true }] });
    await p._chatAddFiles([{ name: "planilha.xlsx", type: "application/vnd.ms-excel", size: 10 }]);
    assert.deepEqual(p._chatState().files.map((f) => f.nome), ["nota.pdf"]);
    assert.match(p._chatState().error, /PDF/i);
    assert.equal(p._chatScroll, true);
    p._voice = null;
    p._isHaAndroid = () => false;
    click(p._renderChatSheet(), "Tirar nota.pdf");
    assert.deepEqual(p._chatState().files, []);
    assert.ok(labels(p._renderChatSheet()).includes("Anexar"));
  });
});

describe("chat: starting to listen", () => {
  it("the microphone opens (starting, then on) and stops alone at the limit; blocked, it says why", async () => {
    globalThis.sessionStorage = { getItem: () => null, setItem() {} };
    const start = Recorder.prototype.start;
    const cancel = Recorder.prototype.cancel;
    const cancelled = [];
    Recorder.prototype.cancel = function () { cancelled.push(this); };
    const seen = [];
    Recorder.prototype.start = async function () { seen.push(this); };
    mock.timers.enable({ apis: ["setTimeout"] });
    try {
      const p = panel();
      p.hass = fakeHass({});
      p.hass.resolvia.voiceText = async () => ({ text: "" });
      const going = p._chatMic();
      assert.equal(p._chatState().rec, "starting");
      await p._chatMic(); // a second tap while it opens: nothing
      await going;
      assert.deepEqual([p._chatState().rec, p._chatRec === seen[0], seen.length], ["on", true, 1]);
      // at the limit of a recording, it finishes by itself (as a tap on Pronto)
      let auto = 0;
      p._chatRec = { stop: () => (auto++, new Int16Array(10)) };
      mock.timers.tick(VOICE_MAX_S * 1000);
      assert.equal(auto, 1);
      // the person left while the microphone was opening: this recorder is dropped
      const q = panel();
      Recorder.prototype.start = async function () { q._chatRec = null; };
      await q._chatMic();
      assert.equal(cancelled.length, 1);
      assert.notEqual(q._chatState().rec, "on");
      // the browser says no: the reason, in words
      const r = panel();
      Recorder.prototype.start = async () => { throw Object.assign(new Error("x"), { name: "NotAllowedError" }); };
      await r._chatMic();
      assert.deepEqual([r._chatState().rec, r._chatRec, r._chatState().error], [null, null, micError({ name: "NotAllowedError" })]);
      assert.equal(cancelled.length, 2);
    } finally {
      mock.timers.reset();
      Recorder.prototype.start = start;
      Recorder.prototype.cancel = cancel;
    }
  });
});
