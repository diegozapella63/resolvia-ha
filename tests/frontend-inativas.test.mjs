// Inativos no fim, recolhidos (the rule of every app of the family): the lists turned off wait at the end under
// Inativas (n), the thin line of the other apps (the arrow before the name, as Ocultos (n) in the CronologIA);
// a tap opens it and another closes it. Used by Mais › Listas and by the tab Listas (rv_inactive.py sees them drawn).
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { html, nothing } from "../frontend/vendor/lit-all.min.js";
import { render, text, click, labels } from "./_lit.mjs";
import { offFold } from "../frontend/src/offfold.js";
import { ICONS } from "../frontend/src/icons.js";

const fold = (host, key, things, label) => offFold(host, key, things, (l) => html`<div class="row inact">${l.name}</div>`, label);
// the drawing of the arrow of the line (the first thing in it)
const arrow = (v) => v.values.find((x) => x && x.strings && /<svg/.test(x.strings[0])).values[0].values[0];
const LISTS = [{ id: "todo.casa", name: "Casa" }, { id: "todo.compras", name: "Compras" }];

describe("Inativas (n)", () => {
  it("folded at first: only the line, with the arrow to the right before the name and how many", () => {
    const host = { _folds: {} };
    const v = fold(host, "mais-listas", LISTS);
    assert.equal(text(v), "Inativas (2)");
    const h = render(v).html;
    assert.match(h, /<button class="inact-head " data-fold="mais-listas" aria-expanded="false"/);
    assert.match(h, /aria-expanded="false"[^>]*>\s*<svg[^>]*>.*?<\/svg><span class="label">Inativas <span class="count">\(2\)<\/span><\/span>\s*<\/button>/s, "the arrow first, then Nome (n)");
    assert.doesNotMatch(h, /class="tile|class="row inact-head|chev"/, "a thin line: no tile, not a row of the list");
    assert.equal(arrow(v), ICONS["chevron-right"], "folded: the arrow points to the right");
  });

  it("a tap opens it (the arrow turns down and the lists come below); another closes; each place keeps its own", () => {
    const host = { _folds: {} };
    click(fold(host, "mais-listas", LISTS), "Inativas (2)");
    assert.deepEqual(host._folds, { "mais-listas": true });
    const open = fold(host, "mais-listas", LISTS);
    assert.equal(text(open), "Inativas (2) Casa Compras");
    assert.match(render(open).html, /<button class="inact-head open" data-fold="mais-listas" aria-expanded="true"/);
    assert.equal(arrow(open), ICONS["chevron-down"], "open: the arrow points down");
    assert.equal(text(fold(host, "listas", LISTS)), "Inativas (2)", "the tab Listas has its own");
    click(open, "Inativas (2)");
    assert.deepEqual(host._folds, { "mais-listas": false });
  });

  it("nothing off: no line; another name when asked", () => {
    assert.equal(fold({ _folds: {} }, "mais-listas", []), nothing);
    assert.deepEqual(labels(fold({ _folds: {} }, "x", [LISTS[0]], "Arquivadas")), ["Arquivadas (1)"]);
  });
});
