// frontend/src/chat.js, the window of the Conversa (the same file and the same test in the ResolvIA, the CronologIA and the MemorIA):
// the messages and the cards of what the AI proposes, the 6 ready questions and the 20 models of Editar perguntas
// (kept on the device), the clip and its files, the microphone and Enviar, and chatFiles (photos to JPG, a PDF alone).
import "./_lit.mjs";
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { render, text, click, fire, labels } from "./_lit.mjs";
import { renderChat, chatFiles, chatQuestions, CHAT_MAX_FILES } from "../frontend/src/chat.js";

const { html, nothing } = await import("../frontend/vendor/lit-all.min.js");
const icon = (n) => html`<svg data-ic=${n}></svg>`;

// localStorage of the device, in memory
const store = new Map();
globalThis.localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };

const SEIS = ["Por onde eu começo hoje?", "O que está atrasado?", "O que vence esta semana?", "Quantas tarefas eu tenho?", "Qual lista tem mais pendências?", "Adiciona leite na lista de compras"];
const MODELOS = Array.from({ length: 20 }, (_, i) => `Modelo ${i + 1}?`);

/** A chat on screen: the props, what each callback got, and draw() to render it again (as onRedraw asks). */
function chat(over = {}) {
  const got = { sent: [], mic: 0, micCancel: 0, actions: [], all: [], cleared: 0, closed: 0, drafts: [], attach: [], removed: [], redraws: 0 };
  const props = {
    lit: { html, nothing }, icon, app: "teste", messages: [], draft: "", busy: false, error: "", voice: null, examples: SEIS, models: MODELOS, files: [],
    onDraft: (t) => got.drafts.push(t), onSend: (t) => got.sent.push(t), onMic: () => got.mic++, onMicCancel: () => got.micCancel++, onAction: (k, j) => got.actions.push([k, j]),
    onAll: (k) => got.all.push(k), onClear: () => got.cleared++, onClose: () => got.closed++, onAttach: (k) => got.attach.push(k),
    onFileRemove: (i) => got.removed.push(i), onRedraw: () => got.redraws++, ...over,
  };
  return { props, got, draw: (more = {}) => renderChat(Object.assign(props, more)) };
}

// the panel state lives in the module (one chat per page): each test starts it closed
const closeAll = () => {
  const c = chat({ messages: [{ role: "user", text: "x" }] });
  let v = c.draw();
  if (labels(v).includes("Cancelar")) click(v, "Cancelar");
  for (let n = 0; n < 3; n++) {
    v = c.draw();
    const q = render(v).html;
    if (/chat-qbtn on/.test(q)) click(v, "Perguntas prontas");
    else if (/chat-clip on/.test(q)) click(v, "Anexar");
    else break;
  }
};

describe("chat: the window", () => {
  beforeEach(() => {
    store.clear();
    closeAll();
  });

  it("empty: the 6 ready questions, a tap asks; Editar perguntas only with an app", () => {
    const c = chat();
    const v = c.draw();
    for (const q of SEIS) assert.ok(text(v).includes(q), q);
    click(v, "O que está atrasado?");
    assert.deepEqual(c.got.sent, ["O que está atrasado?"]);
    assert.ok(labels(v).includes("Editar perguntas"));
    assert.ok(!labels(chat({ app: "" }).draw()).includes("Editar perguntas"), "without an app, nowhere to keep them");
    assert.ok(!labels(v).includes("Nova conversa"), "nothing to start again");
  });

  it("Editar perguntas: take one out, add one, the 20 models (a tap puts it), Pronto keeps it, Padrão brings the app's back", () => {
    const c = chat();
    click(c.draw(), "Editar perguntas");
    let v = c.draw();
    assert.match(text(v), /Mais perguntas \(20\)/);
    assert.equal((render(v).html.match(/aria-label="Pôr “/g) || []).length, 20);
    click(v, "Tirar “O que está atrasado?”");
    click(c.draw(), "Pôr “Modelo 3?”");
    v = c.draw();
    assert.match(text(v), /Mais perguntas \(19\)/, "the model put leaves the models");
    // a new one, by Adicionar
    fire(v, "Nova pergunta", "input", { target: { value: "Quanto falta na lista Casa?" } });
    click(c.draw(), "Adicionar");
    click(c.draw(), "Pronto");
    const saved = JSON.parse(store.get("teste-perguntas"));
    assert.deepEqual(saved, [...SEIS.filter((q) => q !== "O que está atrasado?"), "Modelo 3?", "Quanto falta na lista Casa?"]);
    assert.deepEqual(chatQuestions("teste", SEIS), saved, "the device keeps them");
    v = c.draw();
    assert.ok(text(v).includes("Modelo 3?") && !text(v).includes("O que está atrasado?"), "the screen shows them");
    click(v, "Editar perguntas");
    click(c.draw(), "Padrão");
    click(c.draw(), "Pronto");
    assert.equal(store.has("teste-perguntas"), false, "Padrão: the app's again (they follow the screen)");
  });

  it("Editar perguntas: Perguntas prontas and Mais perguntas close by the title (both open at first), and the device keeps it", () => {
    store.delete("teste-perguntas-fechadas");
    const c = chat();
    click(c.draw(), "Editar perguntas");
    let v = c.draw();
    assert.match(render(v).html, /data-dobra="prontas" aria-expanded="true"/);
    assert.match(render(v).html, /data-dobra="mais" aria-expanded="true"/);
    click(v, "Mais perguntas (20)");
    v = c.draw();
    assert.equal((render(v).html.match(/aria-label="Pôr “/g) || []).length, 0, "closed: no models");
    assert.ok(labels(v).includes("Tirar “O que está atrasado?”"), "the ready ones stay");
    click(v, "Perguntas prontas (6)");
    v = c.draw();
    assert.ok(!labels(v).some((l) => /^Tirar /.test(l)) && !labels(v).includes("Adicionar"), "both closed");
    assert.ok(labels(v).includes("Pronto") && labels(v).includes("Padrão"), "Pronto and Padrão stay");
    assert.match(render(v).html, /data-dobra="prontas" aria-expanded="false"/);
    assert.deepEqual(JSON.parse(store.get("teste-perguntas-fechadas")).sort(), ["mais", "prontas"], "kept on the device");
    click(v, "Pronto");
    click(c.draw(), "Editar perguntas");
    v = c.draw();
    assert.match(render(v).html, /data-dobra="mais" aria-expanded="false"/, "opening again: still closed");
    click(v, "Perguntas prontas (6)");
    click(c.draw(), "Mais perguntas (20)");
    v = c.draw();
    assert.equal((render(v).html.match(/aria-label="Pôr “/g) || []).length, 20);
    assert.deepEqual(JSON.parse(store.get("teste-perguntas-fechadas")), []);
    store.delete("teste-perguntas-fechadas");
    click(v, "Pronto");
  });

  it("Editar perguntas: a tap on a question changes it; Pronto keeps it as it is, and one left empty goes away", () => {
    const c = chat();
    click(c.draw(), "Editar perguntas");
    let v = c.draw();
    fire(v, "Mudar “O que está atrasado?”", "input", { target: { value: "O que está atrasado na Casa?" } });
    fire(v, "Mudar “Quantas tarefas eu tenho?”", "input", { target: { value: "   " } });
    let blurred = 0;
    let stopped = 0;
    fire(c.draw(), "Mudar “O que vence esta semana?”", "keydown", { key: "Enter", preventDefault: () => stopped++, target: { blur: () => blurred++ } });
    assert.deepEqual([stopped, blurred], [1, 1], "Enter: no new line, just done");
    fire(c.draw(), "Mudar “O que vence esta semana?”", "keydown", { key: "a", target: {} });
    click(c.draw(), "Pronto");
    assert.deepEqual(JSON.parse(store.get("teste-perguntas")), ["Por onde eu começo hoje?", "O que está atrasado na Casa?", "O que vence esta semana?", "Qual lista tem mais pendências?", "Adiciona leite na lista de compras"]);
    assert.ok(text(c.draw()).includes("O que está atrasado na Casa?"), "the screen shows it");
    store.delete("teste-perguntas");
  });

  it("without the device's storage, the titles still close (only for now)", () => {
    const real = globalThis.localStorage;
    globalThis.localStorage = { getItem: () => { throw new Error("privado"); }, setItem: () => { throw new Error("privado"); }, removeItem: () => {} };
    try {
      const c = chat();
      click(c.draw(), "Editar perguntas");
      click(c.draw(), "Mais perguntas (20)");
      assert.match(render(c.draw()).html, /data-dobra="mais" aria-expanded="true"/, "nothing kept: open again");
      click(c.draw(), "Pronto");
    } finally {
      globalThis.localStorage = real;
    }
  });

  it("Enter in Nova pergunta adds it; a list equal to the app's is not kept; Pronto takes a typed one too", () => {
    const c = chat();
    click(c.draw(), "Editar perguntas");
    fire(c.draw(), "Nova pergunta", "input", { target: { value: "Uma pergunta nova" } });
    fire(c.draw(), "Nova pergunta", "keydown", { key: "Enter", target: { closest: () => null } });
    assert.ok(labels(c.draw(), "input").includes("Mudar “Uma pergunta nova”"));
    fire(c.draw(), "Tirar “Uma pergunta nova”", "click");
    click(c.draw(), "Pronto");
    assert.equal(store.has("teste-perguntas"), false, "the same as the app's");
    click(c.draw(), "Editar perguntas");
    fire(c.draw(), "Nova pergunta", "input", { target: { value: "Digitada sem Adicionar" } });
    click(c.draw(), "Pronto");
    assert.equal(JSON.parse(store.get("teste-perguntas")).at(-1), "Digitada sem Adicionar");
    store.set("teste-perguntas", "não é JSON");
    assert.deepEqual(chatQuestions("teste", SEIS), SEIS, "a broken saved list: the app's");
  });

  it("the messages, the cards: Fazer, Tentar de novo, Feito and Fazer todas", () => {
    const messages = [
      { role: "user", text: "lança", anexos: ["Foto 1.jpg"] },
      { role: "ia", text: "Posso fazer:", actions: [
        { label: "Concluir A", state: "todo" }, { label: "Concluir B", state: "failed", note: "Não deu." },
        { label: "Concluir C", state: "done" }, { label: "Concluir D", state: "doing" }] },
    ];
    const c = chat({ messages });
    const v = c.draw();
    assert.match(text(v), /Foto 1\.jpg/);
    assert.match(text(v), /Concluir C Feito/);
    assert.match(text(v), /Não deu\./);
    click(v, "Fazer");
    click(v, "Tentar de novo");
    click(v, "Fazer todas (2)");
    assert.deepEqual(c.got.actions, [[1, 0], [1, 1]]);
    assert.deepEqual(c.got.all, [1]);
    click(v, "Nova conversa");
    click(v, "Fechar");
    assert.deepEqual([c.got.cleared, c.got.closed], [1, 1]);
  });

  it("thinking and the error", () => {
    const v = chat({ messages: [{ role: "user", text: "oi" }], busy: true, error: "A IA não respondeu." }).draw();
    assert.match(render(v).html, /chat-bubble typing/);
    assert.match(text(v), /A IA não respondeu\./);
  });

  it("with messages: the sparkles shows the questions over the box, and the same button closes them", () => {
    const c = chat({ messages: [{ role: "user", text: "oi" }] });
    let v = c.draw();
    assert.doesNotMatch(render(v).html, /chat-quick/);
    click(v, "Perguntas prontas");
    v = c.draw();
    assert.match(render(v).html, /chat-quick/);
    click(v, "Por onde eu começo hoje?");
    assert.deepEqual(c.got.sent, ["Por onde eu começo hoje?"]);
    assert.doesNotMatch(render(c.draw()).html, /chat-quick/, "asked: the panel closes");
  });

  it("on the phone (the on-screen keyboard), Enter is a new line and the button sends; with a real keyboard, Enter sends", () => {
    const antes = globalThis.matchMedia;
    try {
      globalThis.matchMedia = (q) => ({ matches: q === "(hover: none) and (pointer: coarse)" });
      const c = chat({});
      const v = c.draw({ draft: "Quanto falta?" });
      assert.match(render(v).html, /enterkeyhint="enter"/);
      let parou = 0;
      fire(v, "Mensagem para a IA", "keydown", { key: "Enter", preventDefault: () => parou++ });
      assert.deepEqual([c.got.sent, parou], [[], 0], "the Enter is left alone: the box gets the new line");
      fire(v, /^$/, "submit");
      assert.deepEqual(c.got.sent, ["Quanto falta?"], "the button sends");
      globalThis.matchMedia = () => ({ matches: false });
      const d = chat({});
      const w = d.draw({ draft: "E amanhã?" });
      assert.match(render(w).html, /enterkeyhint="send"/);
      fire(w, "Mensagem para a IA", "keydown", { key: "Enter", preventDefault: () => parou++ });
      assert.deepEqual([d.got.sent, parou], [["E amanhã?"], 1]);
    } finally {
      globalThis.matchMedia = antes;
    }
  });

  it("the round button: the microphone with the box empty, Enviar with text or a file; Enter sends, Shift+Enter does not", () => {
    const voice = { ready: true, on: false, starting: false };
    const c = chat({ voice });
    let v = c.draw();
    assert.ok(labels(v).includes("Falar"));
    click(v, "Falar");
    assert.equal(c.got.mic, 1);
    v = c.draw({ voice: { ready: true, on: true } });
    assert.ok(labels(v).includes("Pronto: enviar o que falei"));
    assert.match(render(v).html, /placeholder="Ouvindo…"/);
    assert.ok(!labels(v).includes("Anexar"), "listening: no clip");
    // listening, Cancelar in the place of the clip: the app stops the microphone and nothing is sent
    assert.ok(labels(v).includes("Cancelar: não enviar o que falei"));
    click(v, "Cancelar: não enviar o que falei");
    assert.deepEqual([c.got.micCancel, c.got.mic, c.got.sent], [1, 1, []]);
    assert.ok(!labels(c.draw({ voice })).includes("Cancelar: não enviar o que falei"), "not listening: no Cancelar");
    assert.ok(!labels(renderChat({ ...c.props, voice: { ready: true, on: true }, onMicCancel: undefined })).includes("Cancelar: não enviar o que falei"), "an app without the cancel: no button");
    v = c.draw({ voice, draft: "Quanto falta?" });
    assert.ok(!labels(v).includes("Falar"));
    fire(v, "Mensagem para a IA", "keydown", { key: "Enter", shiftKey: true });
    assert.deepEqual(c.got.sent, []);
    fire(v, "Mensagem para a IA", "keydown", { key: "Enter" });
    fire(v, "Mensagem para a IA", "input", { target: { value: "x" } });
    fire(v, /^$/, "submit");
    assert.deepEqual(c.got.sent, ["Quanto falta?", "Quanto falta?"]);
    assert.deepEqual(c.got.drafts, ["x"]);
    fire(c.draw({ draft: "  ", files: [] }), /^$/, "submit");
    fire(c.draw({ draft: "oi", busy: true }), /^$/, "submit");
    assert.equal(c.got.sent.length, 2, "nothing to send, or busy: nothing goes");
  });

  it("the clip: Tirar foto, Escolher fotos, Escolher arquivo; the files to send, each one with its Tirar", () => {
    const c = chat();
    click(c.draw(), "Anexar");
    let v = c.draw();
    assert.deepEqual(labels(v).filter((l) => /Tirar foto|Escolher/.test(l)), ["Tirar foto", "Escolher fotos", "Escolher arquivo"]);
    click(v, "Escolher arquivo");
    assert.deepEqual(c.got.attach, ["arquivo"]);
    assert.doesNotMatch(render(c.draw()).html, /chat-menu/, "chosen: the menu closes");
    v = c.draw({ files: [{ nome: "Foto 1.jpg", pdf: false, url: "blob:1" }, { nome: "conta.pdf", pdf: true, url: "" }] });
    assert.match(render(v).html, /<img src="blob:1"/);
    click(v, "Tirar conta.pdf");
    assert.deepEqual(c.got.removed, [1]);
    fire(v, /^$/, "submit");
    assert.deepEqual(c.got.sent, [""], "only the files: they go");
    assert.ok(!labels(chat({ onAttach: null }).draw()).includes("Anexar"), "without onAttach, no clip");
  });
});

describe("chatFiles: what goes to the AI", () => {
  class FR {
    readAsDataURL(b) {
      this.result = `data:${b.type || "image/jpeg"};base64,QUJD`;
      queueMicrotask(() => this.onload());
    }
  }
  beforeEach(() => {
    globalThis.FileReader = FR;
    globalThis.URL.createObjectURL = () => "blob:foto";
    globalThis.createImageBitmap = async (f) => {
      if (f.name === "quebrada.jpg") throw new Error("não abre");
      return { width: 3200, height: 1600, close() {} };
    };
    globalThis.document.createElement = () => ({ width: 0, height: 0, getContext: () => ({ fillRect() {}, drawImage() {}, set fillStyle(v) {} }), toBlob: (ok) => ok(new Blob(["x"], { type: "image/jpeg" })) });
  });
  const file = (name, type, size = 10) => {
    const b = new Blob(["x"], { type });
    Object.defineProperty(b, "name", { value: name });
    Object.defineProperty(b, "size", { value: size });
    return b;
  };

  it("a photo becomes a JPG of up to 1600 px; a PDF goes alone; the others are explained", async () => {
    const a = await chatFiles([file("casa.png", "image/png")]);
    assert.deepEqual(a.files.map((f) => [f.nome, f.pdf, f.mime, f.data, f.url]), [["casa.png", false, "image/jpeg", "QUJD", "blob:foto"]]);
    assert.equal(a.error, "");
    const b = await chatFiles([file("conta.pdf", "application/pdf")], a.files);
    assert.deepEqual(b.files.map((f) => [f.nome, f.pdf]), [["conta.pdf", true]], "a PDF goes alone");
    const c = await chatFiles([file("outra.jpg", "image/jpeg")], b.files);
    assert.deepEqual(c.files.map((f) => f.nome), ["outra.jpg"], "a photo after a PDF: the PDF leaves");
    assert.equal((await chatFiles([file("planilha.xlsx", "application/vnd.ms-excel")])).error, "Escolha uma foto ou um PDF.");
    assert.equal((await chatFiles([file("enorme.pdf", "application/pdf", 16 * 1024 * 1024)])).error, "Arquivo grande demais (até 15 MB).");
    assert.equal((await chatFiles([file("quebrada.jpg", "image/jpeg")])).error, "Não deu para abrir esta foto. Use JPG ou PNG.");
    const cheio = Array.from({ length: CHAT_MAX_FILES }, (_, i) => ({ nome: `Foto ${i}.jpg`, pdf: false }));
    const d = await chatFiles([file("mais.jpg", "image/jpeg")], cheio);
    assert.equal(d.error, `Até ${CHAT_MAX_FILES} arquivos por mensagem.`);
    assert.equal(d.files.length, CHAT_MAX_FILES);
  });
});
