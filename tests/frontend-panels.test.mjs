// frontend/src: usage-panel.js (Uso da IA), look.js (Aparência), swipe.js (arrastar para trocar de aba)
// and datapanel.js (Mais › Dados).
import "./_lit.mjs";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { html } from "../frontend/vendor/lit-all.min.js";
import { text, click, labels, controls, render, fakeHass, hostOf } from "./_lit.mjs";
import { usagePanel, kTokens, usageStyles } from "../frontend/src/usage-panel.js";
import { themePicker, colorPicker, lookStyles } from "../frontend/src/look.js";
import { swipeStart, swipeEnd, slideIn } from "../frontend/src/swipe.js";
import { DataMixin } from "../frontend/src/datapanel.js";
import { local } from "./_helpers.mjs";

const NOW = local(2026, 11, 2, 15, 30); // a Monday
const icon = (n) => html`<i data-icon=${n}></i>`;

// ------------------------------------------------------------------ usage-panel.js

describe("usage panel", () => {
  beforeEach(() => mock.timers.enable({ apis: ["Date"], now: NOW }));
  afterEach(() => mock.timers.reset());
  const days = [
    { dia: "2026-10-27", chamadas: 0 },
    { dia: "2026-10-28", chamadas: 4, erros: 1 },
    { dia: "2026-10-29", chamadas: 2, cota: 2 },
    { dia: "2026-10-30", chamadas: 0 },
    { dia: "2026-10-31", chamadas: 1 },
    { dia: "2026-11-01", chamadas: 0 },
    { dia: "2026-11-02", chamadas: 8 },
  ];
  const U = (over = {}) => ({
    hoje: { chamadas: 8, tokens: 950 },
    semana: { chamadas: 15, tokens: 12345, erros: 1, tipos: { fotos: 3, mensagem: 10, outra: 2 }, ias: { "ai_task.google_ai_task": 15 } },
    mes: { chamadas: 40, tokens: 50000, cota: 2, ias: {} },
    dias: days,
    ultimas: [
      { tipo: "fotos", ia: "ai_task.google_ai_task", resultado: "ok", segundos: 3.25, tokens: 1500, imagens: 2, quando: "2026-11-02T14:05:00-03:00" },
      { tipo: "mensagem", ia: "ai_task.meu_ollama", resultado: "cota", segundos: 0.4, tokens: 0, quando: "2026-10-30T09:07:00-03:00" },
      { tipo: "sugestao", ia: "", resultado: "formato", segundos: 1, tokens: 800, imagens: 1, quando: "não é data" },
    ],
    ...over,
  });
  it("kTokens: up to 999 as is, then in thousands with a comma", () => {
    assert.deepEqual([0, 849.6, 999, 1000, 1250, 12345, undefined].map(kTokens), ["0", "850", "999", "1 mil", "1,3 mil", "12,3 mil", "0"]);
  });
  it("loading while there is no summary", () => {
    assert.equal(text(usagePanel({ u: null, head: html`<h2>Uso</h2>` })), "Uso Carregando…");
    assert.equal(text(usagePanel({ u: {}, head: "" })), "Carregando…");
  });
  it("today, 7 days and the month: tokens, errors or the quota", () => {
    const t = text(usagePanel({ u: U(), head: "", app: "ResolvIA" }));
    assert.match(t, /^Hoje 8 ≈ 950 tokens 7 dias 15 1 com erro Este mês 40 2 vezes sem cota/);
  });
  it("a bar per day, today chosen; tapping another says that day", () => {
    let picked = null;
    const v = usagePanel({ u: U(), onDay: (d) => (picked = d), head: "" });
    assert.deepEqual(labels(v), ["ter: 0 chamadas", "qua: 4 chamadas", "qui: 2 chamadas", "sex: 0 chamadas", "sáb: 1 chamada", "dom: 0 chamadas", "hoje: 8 chamadas"]);
    const bars = controls(v);
    assert.match(bars[6].attrs, /aria-pressed="true"/);
    assert.match(bars[6].attrs, /class="uso-bar today"/);
    assert.match(render(v).html, /<i style="height:50%"><\/i>/, "4 of 8 calls: half the height");
    assert.match(render(v).html, /<i style="height:0%"><\/i>/);
    assert.match(text(v), /Hoje: 8 chamadas\./);
    click(v, "qua: 4 chamadas");
    assert.equal(picked, "2026-10-28");
    assert.match(text(usagePanel({ u: U(), day: "2026-10-28", head: "" })), /qua, 28\/10: 4 chamadas, 1 com erro\./);
    assert.match(text(usagePanel({ u: U(), day: "2026-10-29", head: "" })), /qui, 29\/10: 2 chamadas, 2 sem cota\./);
  });
  it("the kinds, most used first (unknown kinds by their key)", () => {
    assert.match(text(usagePanel({ u: U(), head: "" })), /Mensagens 10 Fotos 3 outra 2/);
    assert.doesNotMatch(render(usagePanel({ u: U({ semana: { chamadas: 0 } }), head: "" })).html, /uso-kinds/, "no kinds this week: no row");
  });
  it("the last calls: kind, AI (friendly name or from the id), result, seconds, tokens, images, when", () => {
    const t = text(usagePanel({ u: U(), head: "", names: { "ai_task.google_ai_task": "Google AI Task" } }));
    assert.match(t, /Fotos Google AI Task 3,3 s · ≈ 1,5 mil tokens · 2 imagens · hoje 14:05/);
    assert.match(t, /Mensagens meu ollama sem cota 0,4 s · ≈ 0 tokens · 30\/10 09:07/);
    assert.match(t, /Sugestões padrão do Home Assistant resposta fora do formato 1 s · ≈ 800 tokens · 1 imagem ·/);
    assert.match(text(usagePanel({ u: U({ ultimas: [] }), head: "" })), /Nenhuma chamada ainda\./);
  });
  it("where to see the exact use: the provider of the AI in use", () => {
    const note = (using, ias = {}) => text(usagePanel({ u: U({ semana: { chamadas: 0, ias }, mes: { chamadas: 0 } }), head: "", using })).split("Últimas chamadas")[1];
    assert.match(note("ai_task.google_generative_ai"), /Google Cloud Console/);
    assert.match(note("", { "ai_task.openai_ai_task": 1 }), /platform\.openai\.com\/usage/);
    assert.match(note("ai_task.claude"), /Claude Console/);
    assert.match(note("ai_task.ollama"), /O consumo exato fica no painel do provedor da IA\./);
  });
  it("the styles are plain CSS", () => {
    assert.match(usageStyles, /\.uso-tiles \{/);
    assert.match(lookStyles, /\.tag-swatches \{/);
  });
});

// ------------------------------------------------------------------ look.js

describe("look: Aparência", () => {
  it("three themes, the chosen one marked; a tap says which", () => {
    let got = null;
    const v = themePicker({ theme: "dark", onTheme: (k) => (got = k), icon });
    assert.deepEqual(labels(v), ["Automático", "Claro", "Escuro"]);
    const c = controls(v);
    assert.deepEqual(c.map((x) => /aria-checked="true"/.test(x.attrs)), [false, false, true]);
    assert.match(c[2].attrs, /class="on"/);
    click(v, "Claro");
    assert.equal(got, "light");
    assert.match(render(v).html, /data-icon="smartphone".*data-icon="sun".*data-icon="moon"/s);
  });
  it("the colors as tags with their names; the chosen one checked", () => {
    let got = null;
    const palette = [
      { id: "vermelho", label: "Vermelho", fill: "#FF5A4F" },
      { id: "azul", label: "Azul", fill: "#2D8CFF" },
    ];
    const v = colorPicker({ palette, value: "azul", onPick: (id) => (got = id) });
    assert.deepEqual(labels(v), ["Vermelho", "Azul"]);
    const c = controls(v);
    assert.match(c[0].attrs, /style="--a:#FF5A4F"/);
    assert.match(c[1].attrs, /class="tsw on"/);
    assert.match(c[1].attrs, /aria-checked="true"/);
    click(v, "Vermelho");
    assert.equal(got, "vermelho");
  });
});

// ------------------------------------------------------------------ swipe.js

describe("swipe", () => {
  class El {
    constructor(matches = false, overflow = "visible", sw = 0, cw = 0) {
      Object.assign(this, { m: matches, st: { overflowX: overflow }, scrollWidth: sw, clientWidth: cw });
    }
    matches() {
      return this.m;
    }
  }
  const root = {};
  const touch = (x, y, path = []) => ({ touches: [{ clientX: x, clientY: y }], composedPath: () => [...path, root], currentTarget: root });
  beforeEach(() => {
    globalThis.Element = El;
    globalThis.getComputedStyle = (el) => el.st;
    globalThis.window.innerWidth = 390;
    globalThis.window.matchMedia = () => ({ matches: false });
    mock.timers.enable({ apis: ["Date"], now: 1000000 });
  });
  afterEach(() => {
    mock.timers.reset();
    delete globalThis.window.matchMedia;
  });
  it("starts with one finger away from the edges, on the phone", () => {
    assert.deepEqual(swipeStart(touch(200, 300)), { x: 200, y: 300, at: 1000000 });
    assert.equal(swipeStart({ touches: [{}, {}] }), null, "two fingers: zoom");
    assert.equal(swipeStart({}), null);
    assert.equal(swipeStart(touch(10, 300)), null, "left edge: the menu of the Home Assistant");
    assert.equal(swipeStart(touch(380, 300)), null, "right edge: Voltar of the phone");
    window.matchMedia = (q) => ({ matches: /min-width: 1000px/.test(q) });
    assert.equal(swipeStart(touch(200, 300)), null, "the computer has the side bar");
  });
  it("not on fields, the grip, data-noswipe, what was asked to skip, or a row that scrolls sideways", () => {
    assert.equal(swipeStart(touch(200, 300, [new El(true)])), null);
    assert.equal(swipeStart(touch(200, 300, [new El(false, "auto", 800, 390)])), null);
    assert.ok(swipeStart(touch(200, 300, [new El(false, "auto", 391, 390)])), "2 px of scroll don't count");
    assert.ok(swipeStart(touch(200, 300, [new El(false, "hidden", 800, 390), { not: "an element" }])));
    let asked = "";
    const el = new El();
    el.matches = (sel) => ((asked = sel), false);
    swipeStart(touch(200, 300, [el]), ".mes-grid");
    assert.match(asked, /input, textarea, select, \[contenteditable\], \.grip, \[data-noswipe\], \.mes-grid$/);
  });
  it("ends: 70 px sideways, mostly sideways, in under 0.8 s", () => {
    const s = { x: 200, y: 300, at: 1000000 };
    const end = (x, y) => swipeEnd({ changedTouches: [{ clientX: x, clientY: y }] }, s);
    assert.equal(end(100, 310), 1, "to the left: the next tab");
    assert.equal(end(290, 300), -1);
    assert.equal(end(150, 300), 0, "50 px is not a swipe");
    assert.equal(end(100, 360), 0, "too diagonal");
    assert.equal(swipeEnd({ changedTouches: [] }, s), 0);
    assert.equal(swipeEnd({ changedTouches: [{ clientX: 0, clientY: 300 }] }, null), 0);
    mock.timers.tick(900);
    assert.equal(end(100, 300), 0, "too slow");
  });
  it("slideIn: the new page comes from the side of the finger (unless motion is reduced)", async () => {
    const anims = [];
    const page = { animate: (k, o) => anims.push([k, o]) };
    const host = { _view: () => ({ name: "lista" }), updateComplete: Promise.resolve(), renderRoot: { querySelector: () => page } };
    await slideIn(host, "lista", 1);
    await slideIn(host, "lista", -1);
    assert.deepEqual(anims.map(([k]) => k[0].transform), ["translateX(40px)", "translateX(-40px)"]);
    assert.equal(anims[0][1].duration, 280);
    window.matchMedia = (q) => ({ matches: /reduce/.test(q) });
    await slideIn(host, "lista", 1);
    assert.equal(anims.length, 2);
    await slideIn({ ...host, renderRoot: { querySelector: () => null } }, "lista", 1);
  });
});

// ------------------------------------------------------------------ datapanel.js

describe("data panel: Mais › Dados", () => {
  class Base extends hostOf(DataMixin) {
    constructor(api) {
      super(fakeHass());
      this.hass.resolvia = api === undefined ? {} : { data: api };
      this.loaded = 0;
      this.input = { value: "x", clicks: 0, click() { this.clicks++; } };
      this.renderRoot = { querySelector: (s) => (s === "#rv-data-import" ? this.input : null) };
    }
    async _loadPrefs() {
      this.loaded++;
    }
  }
  const api = (over = {}) => ({
    calls: [],
    url: (fmt) => `/api/export/${fmt}`,
    backups: async () => ({ available: true, backups: [{ name: "resolvia-2026-11-01.zip", date: local(2026, 11, 1, 9, 5).getTime(), size: 2 * 1048576 + 300000 }, { name: "pequeno.zip", date: local(2026, 10, 30, 22, 0).getTime(), size: 300 }] }),
    createBackup: async () => ({ folder: "share/resolvia", name: "resolvia-novo.zip" }),
    import: async () => ({ added: 2, rules: 1, missing: ["todo.velha"], unsupported: 1, failed: 0 }),
    restoreBackup: async () => ({ added: 0, rules: 3 }),
    versions: async () => [{ name: "v1", when: local(2026, 11, 2, 8, 0).getTime(), lists: 2, rules: 1, reason: "antes-de-importar" }, { name: "v2", when: local(2026, 11, 1, 8, 0).getTime(), lists: 1, rules: 0, reason: "x" }],
    restoreVersion: async () => ({}),
    ...over,
  });
  const P = (a = api()) => new Base(a);

  it("outside the app: no panel", () => {
    assert.equal(text(new Base(undefined)._renderDataPanel()), "");
    assert.equal(new Base(undefined)._data(), null);
  });
  it("date and time in Brazilian format", () => assert.equal(P()._dateTime(local(2026, 3, 4, 5, 6).getTime()), "04/03/2026 às 05:06"));
  it("exports, backups (size in MB or KB), import and versions", async () => {
    const p = P();
    await p._loadBackups();
    const t = text(p._renderDataPanel());
    assert.match(t, /Planilha \(CSV\).*Baixar CSV.*Baixar JSON.*Baixar ZIP/);
    assert.match(t, /01\/11\/2026 às 09:05 2,3 MB · resolvia-2026-11-01\.zip Restaurar 30\/10\/2026 às 22:00 1 KB · pequeno\.zip Restaurar/);
    assert.match(t, /Escolher arquivo.*Ver versões/);
    assert.deepEqual([...render(p._renderDataPanel()).html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]), ["/api/export/csv", "/api/export/json", "/api/export/zip"]);
  });
  it("in the preview (no file urls) a download says so instead", () => {
    const p = P(api({ url: () => "" }));
    let prevented = false;
    click(p._renderDataPanel(), /Baixar CSV/, { preventDefault: () => (prevented = true) });
    assert.equal(prevented, true);
    assert.deepEqual(p.toasts, ["Na prévia os arquivos não são baixados."]);
    const q = P();
    let prev2 = false;
    click(q._renderDataPanel(), /Baixar JSON/, { preventDefault: () => (prev2 = true) });
    assert.equal(prev2, false, "in the app the link downloads");
  });
  it("no share folder: Criar backup off, and says why", async () => {
    const p = P(api({ backups: async () => ({ available: false, backups: [] }) }));
    await p._loadBackups();
    const v = p._renderDataPanel();
    assert.match(text(v), /A pasta share não está disponível para o app\./);
    assert.match(controls(v).find((c) => /Criar backup/.test(c.text)).attrs, /disabled/);
    const q = P(api({ backups: async () => Promise.reject(new Error("sem share")) }));
    await q._loadBackups();
    assert.deepEqual(q._backups, { available: false, error: "sem share", backups: [] });
  });
  it("Criar backup: Criando…, then where it went; an error says it", async () => {
    const p = P();
    const run = click(p._renderDataPanel(), /Criar backup/);
    assert.match(text(p._renderDataPanel()), /Criando…/);
    await run;
    assert.deepEqual(p.toasts, ["Backup salvo em share/resolvia/resolvia-novo.zip"]);
    assert.deepEqual([p.haptics, p._dataBusy], [["success"], null]);
    const q = P(api({ createBackup: async () => Promise.reject(new Error("disco cheio")) }));
    await q._createBackup();
    assert.deepEqual(q.toasts, ["Não consegui criar o backup. disco cheio"]);
  });
  it("Escolher arquivo opens the picker (cleared, so the same file can be chosen again)", () => {
    const p = P();
    click(p._renderDataPanel(), /Escolher arquivo/);
    assert.deepEqual([p.input.value, p.input.clicks], ["", 1]);
    const q = P();
    q.renderRoot = { querySelector: () => null };
    q._pickDataImport();
  });
  it("importing asks first, then says what came back", async () => {
    const p = P();
    const target = { files: [{ name: "resolvia-backup.zip" }], value: "c:/x" };
    p._onDataImport({ target });
    assert.equal(target.value, "");
    assert.equal(p._sheet, "confirm");
    assert.match(p._form.text, /passam a ser os de “resolvia-backup\.zip”/);
    await p._form.run();
    assert.deepEqual(p.toasts, ["Importando…", "Importado: 2 itens voltaram para as listas, 1 repetição. Lista não encontrada: todo.velha. 1 item ficou de fora (a lista não aceita itens novos)"]);
    assert.equal(p.loaded, 1);
    P()._onDataImport({ target: { files: [], value: "" } });
  });
  it("an import that fails says why", async () => {
    const p = P(api({ import: async () => Promise.reject(new Error("arquivo inválido")) }));
    p._onDataImport({ target: { files: [{ name: "x.json" }] } });
    await p._form.run();
    assert.equal(p.toasts.at(-1), "Não consegui importar. arquivo inválido");
  });
  it("the line of what came back covers every case", () => {
    const p = P();
    assert.equal(p._restoredText({ added: 0, rules: 0 }, "Importado"), "Importado: nenhum item faltava nas listas, 0 repetições");
    assert.equal(p._restoredText({ added: 1, rules: 2 }, "X"), "X: 1 item voltou para as listas, 2 repetições");
    assert.equal(p._restoredText({ rules: 1 }, "X"), "X: 1 repetição");
    assert.equal(p._restoredText({ rules: 0, missing: ["a", "b"], unsupported: 2, failed: 3 }, "X"), "X: 0 repetições. Listas não encontradas: a, b. 2 itens ficaram de fora (a lista não aceita itens novos). 3 itens falharam");
  });
  it("restoring a backup asks first, then says what came back; an error shows", async () => {
    const p = P();
    p._confirmRestoreBackup({ name: "b.zip", date: local(2026, 11, 1, 9, 5).getTime() });
    assert.match(p._form.text, /os do backup de 01\/11\/2026 às 09:05/);
    await p._form.run();
    assert.deepEqual(p.toasts, ["Restaurando…", "Backup restaurado: nenhum item faltava nas listas, 3 repetições"]);
    const q = P(api({ restoreBackup: async () => Promise.reject(new Error("backup corrompido")) }));
    q._confirmRestoreBackup({ name: "b.zip", date: 0 });
    await q._form.run();
    assert.equal(q.toasts.at(-1), "backup corrompido");
  });
  it("versions: loading, the list with why each was kept, restore", async () => {
    const p = P();
    const loading = p._openVersions();
    assert.match(text(p._renderVersions()), /Versões anteriores Carregando…/);
    await loading;
    const v = p._renderVersions();
    assert.match(text(v), /02\/11\/2026 às 08:00 2 listas personalizadas · 1 repetição · antes de importar Restaurar 01\/11\/2026 às 08:00 1 lista personalizada · 0 repetições · automática Restaurar/);
    p._confirmRestoreVersion({ name: "v1", when: local(2026, 11, 2, 8, 0).getTime() });
    assert.match(p._form.text, /voltam a ser os de 02\/11\/2026 às 08:00\. Os itens das listas não mudam\./);
    await p._form.run();
    assert.deepEqual([p.toasts.at(-1), p.loaded], ["Versão restaurada", 1]);
  });
  it("versions: none yet, an error, and a restore that fails", async () => {
    const p = P(api({ versions: async () => [] }));
    await p._openVersions();
    assert.match(text(p._renderVersions()), /Ainda não há versões anteriores\./);
    const q = P(api({ versions: async () => Promise.reject(new Error("sem dados")) }));
    await q._openVersions();
    assert.match(text(q._renderVersions()), /sem dados/);
    const r = P(api({ restoreVersion: async () => Promise.reject(new Error("não deu")) }));
    r._confirmRestoreVersion({ name: "v", when: 0 });
    await r._form.run();
    assert.equal(r.toasts.at(-1), "não deu");
  });
  it("the list of versions arriving after the sheet closed is dropped", async () => {
    let done;
    const p = P(api({ versions: () => new Promise((r) => (done = r)) }));
    const run = p._openVersions();
    p._sheet = null;
    p._form = { other: 1 };
    done([{ name: "v" }]);
    await run;
    assert.deepEqual(p._form, { other: 1 });
  });
});
