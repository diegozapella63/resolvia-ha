// 2.66.0: an icon in everything (the family rule): the label of each field of a window, the title of each window
// (also the confirmations, by what the button does) and the button that confirms; Últimas chamadas with its icon
// and how many. Read from the source, like the pickers of the CronologIA: a new field without an icon fails here.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { render } from "./_lit.mjs";
import { usagePanel } from "../frontend/src/usage-panel.js";

const SRC = new URL("../frontend/src/", import.meta.url);
const files = readdirSync(SRC).filter((f) => f.endsWith(".js") && f !== "styles.js" && f !== "selectsheet.js");
const src = Object.fromEntries(files.map((f) => [f, readFileSync(new URL(f, SRC), "utf8")]));

describe("ícones em tudo", () => {
  it("every label of a field starts with its icon", () => {
    const bad = [];
    for (const [f, s] of Object.entries(src)) for (const m of s.matchAll(/<span class="flabel">(.{0,40})/g)) if (!m[1].startsWith("${icon(")) bad.push(`${f}: ${m[1]}`);
    assert.deepEqual(bad, []);
    assert.ok(Object.values(src).join("").match(/<span class="flabel">\$\{icon\(/g).length >= 25, "the labels are there");
  });
  it("every title of a window starts with its icon", () => {
    const bad = [];
    for (const [f, s] of Object.entries(src)) for (const m of s.matchAll(/<h3 class="display">(.{0,160})/g)) if (!m[1].startsWith("${icon(") || !m[1].includes('"sh-ic")')) bad.push(`${f}: ${m[1]}`);
    assert.deepEqual(bad, []);
  });
  it("a confirmation: the icon of what it does, on the title and on the button", () => {
    const s = src["resolvia-panel.js"];
    const body = s.slice(s.indexOf("export const confirmIc"), s.indexOf("\n", s.indexOf("export const confirmIc") + 60));
    const confirmIc = new Function(`return ${body.replace("export const confirmIc =", "").trim().replace(/;$/, "")}`)();
    assert.equal(confirmIc("Apagar tudo"), "trash");
    assert.equal(confirmIc("Restaurar"), "archive-restore");
    assert.equal(confirmIc("Importar"), "upload");
    assert.equal(confirmIc("Limpar"), "brush-cleaning");
    assert.equal(confirmIc("Outra coisa"), "circle-alert");
    assert.match(s, /<h3 class="display">\$\{icon\(ic, "sh-ic"\)\}\$\{f\.title\}<\/h3>/);
    assert.match(s, /\$\{icon\(ic\)\}\$\{f\.label\}<\/button>/);
  });
  it("Últimas chamadas: the icon, how many, the arrow", () => {
    const u = { hoje: { chamadas: 1 }, semana: { chamadas: 1 }, mes: { chamadas: 1 }, dias: [], ultimas: [{ tipo: "fotos", ia: "", segundos: 1, tokens: 10, quando: new Date().toISOString() }] };
    const html = render(usagePanel({ u, head: "" })).html;
    assert.match(html, /<summary><svg class="uso-ic"[^>]*>.*?<\/svg><span>Últimas chamadas \(1\)<\/span><svg class="uso-chev"/s);
    assert.match(render(usagePanel({ u: { ...u, ultimas: [] }, head: "" })).html, /<span>Últimas chamadas<\/span>/, "none: no count");
  });
});

describe("seções que contraem", () => {
  it("each card with a heading folds, kept on the device by its id, its card or its title", () => {
    const s = src["resolvia-panel.js"];
    assert.match(s, /const FOLD_KEY = "resolvia-fechadas";/);
    assert.match(s, /this\._applyFolds\(\);/, "after each render");
    const body = s.slice(s.indexOf("export const foldKeyOf"), s.indexOf("};", s.indexOf("export const foldKeyOf")) + 2);
    const foldKeyOf = new Function(`return ${body.replace("export const foldKeyOf =", "").trim().replace(/;$/, "")}`)();
    const card = (id, data, title) => ({ id, dataset: data ? { card: data } : {}, querySelector: () => (title ? { textContent: ` ${title} ` } : null) });
    assert.equal(foldKeyOf(card("falar", "", "Falar")), "falar");
    assert.equal(foldKeyOf(card("", "today", "Hoje")), "today");
    assert.equal(foldKeyOf(card("", "", "Por lista")), "Por lista");
    assert.equal(foldKeyOf(card("", "", "")), "");
    assert.equal(foldKeyOf(null), "");
  });
});
