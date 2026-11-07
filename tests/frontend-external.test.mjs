// frontend/src/external.js: Serviço externo on the tasks (who from outside does it).
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, click, fire, labels, fakeHass, hostOf } from "./_lit.mjs";
import { ExternalMixin } from "../frontend/src/external.js";
import { F } from "../frontend/src/util.js";
import { nothing, html } from "../frontend/vendor/lit-all.min.js";

const Panel = hostOf(ExternalMixin);
const panel = (ext = { "todo.casa": { "trocar resistencia": "Eletricista", "consertar portao": true } }, answers = {}) => {
  const p = new Panel(fakeHass(answers));
  p._ext = ext;
  p.hass.resolvia = {};
  p._form = {};
  return p;
};

describe("external: reading it", () => {
  it("by the folded task name: who, true, or null", () => {
    const p = panel();
    assert.equal(p._externalOf("todo.casa", "Trocar Resistência"), "Eletricista");
    assert.equal(p._externalOf("todo.casa", "consertar  portão"), true);
    assert.equal(p._externalOf("todo.casa", "Lavar"), null);
    assert.equal(p._externalOf("todo.outra", "Trocar resistência"), null);
    assert.equal(panel(null)._externalOf("todo.casa", "x"), null);
  });
  it("as words for Buscar and the AI", () => {
    const p = panel();
    assert.equal(p._externalText("todo.casa", "Trocar resistência"), "Serviço externo Eletricista");
    assert.equal(p._externalText("todo.casa", "Consertar portão"), "Serviço externo");
    assert.equal(p._externalText("todo.casa", "Lavar"), "");
  });
  it("the tag: who, or Serviço externo", () => {
    const p = panel();
    assert.equal(text(p._renderExternalTag("todo.casa", { summary: "Trocar resistência" })), "Eletricista");
    assert.equal(text(p._renderExternalTag("todo.casa", { summary: "Consertar portão" })), "Serviço externo");
    assert.equal(text(p._renderExternalTag("todo.casa", { summary: "Lavar" })), "");
  });
  it("loads from the server; outside the app, nothing", async () => {
    const p = panel({}, { "resolvia/external/get": { ext: { "todo.casa": { a: true } } } });
    await p._loadExternal();
    assert.deepEqual(p._ext, { "todo.casa": { a: true } });
    const q = panel({}, { "resolvia/external/get": new Error("x") });
    await q._loadExternal();
    assert.deepEqual(q._ext, {});
    const r = panel();
    delete r.hass.resolvia;
    await r._loadExternal();
    assert.equal(r.hass.calls.length, 0);
  });
});

describe("external: the item sheet (Quem faz)", () => {
  it("Nós mesmos by default; Serviço externo opens who, optional", () => {
    const p = panel();
    let f = p._renderExternalField(p._form);
    assert.deepEqual(labels(f), ["Nós mesmos", "Serviço externo"]);
    assert.doesNotMatch(text(f), /Quem\?/);
    click(f, "Serviço externo");
    assert.equal(p._form.ext, true);
    f = p._renderExternalField(p._form);
    fire(f, "Quem vai fazer", "input", { target: { value: "  Eletricista   João " } });
    assert.equal(p._form.ext, "Eletricista João");
    click(p._renderExternalField(p._form), "Nós mesmos");
    assert.equal(p._form.ext, null);
  });
  it("not on a plain list without dates and notes (shopping), unless the task already has one", () => {
    const p = panel();
    p._form = { ext: null };
    assert.equal(p._renderExternalField(p._form, F.CREATE | F.UPDATE | F.DELETE | F.MOVE), nothing);
    assert.deepEqual(labels(p._renderExternalField(p._form, F.CREATE | F.DUE_DATETIME)), ["Nós mesmos", "Serviço externo"]);
    assert.deepEqual(labels(p._renderExternalField(p._form, F.CREATE | F.DESCRIPTION)), ["Nós mesmos", "Serviço externo"]);
    p._form = { ext: "Loja" };
    assert.deepEqual(labels(p._renderExternalField(p._form, F.CREATE)), ["Nós mesmos", "Serviço externo"], "already set: it can still be cleared");
  });
  it("saving: only when it changed, or the task was renamed; who is cleaned", async () => {
    const p = panel({}, { "resolvia/external/set": (m) => ({ ext: { [m.entity_id]: m.value ? { x: m.value } : {} } }) });
    await p._saveTaskExternal("todo.casa", "Trocar", { ext: null, extOrig: null });
    assert.equal(p.hass.calls.length, 0, "nothing changed");
    await p._saveTaskExternal("todo.casa", "Trocar", { ext: "  Eletricista ", extOrig: null });
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/external/set", entity_id: "todo.casa", summary: "Trocar", value: "Eletricista" });
    await p._saveTaskExternal("todo.casa", "Trocar 2", { ext: true, extOrig: true }, "Trocar");
    assert.deepEqual(p.hass.calls[1], { type: "resolvia/external/set", entity_id: "todo.casa", summary: "Trocar 2", value: true, previous_summary: "Trocar" });
    await p._saveTaskExternal("todo.casa", "Trocar 2", { ext: null, extOrig: true });
    assert.equal(p.hass.calls[2].value, null);
  });
  it("a failure to save becomes a toast", async () => {
    const p = panel({}, { "resolvia/external/set": new Error("") });
    await p._setTaskExternal("todo.casa", "x", true);
    assert.deepEqual(p.toasts, ["Não consegui guardar quem faz"]);
  });
});

describe("external: Mais › Configurações › Opções › Quem faz › Serviços externos", () => {
  const sw = (on, label, ev) => html`<input type="checkbox" .checked=${on} @change=${ev} aria-label=${label} />`;
  it("on by default: Quem faz in each task", () => {
    const p = panel();
    assert.equal(p._extOn(), true);
    assert.equal(text(p._renderExternalOption(sw)), "Quem faz Serviços externos Quem faz em cada tarefa: vocês ou alguém de fora.");
  });
  it("off: no Quem faz, no tag, nothing for Buscar or the AI; what is kept stays (and comes back on)", () => {
    const p = panel();
    p._app_ = { ext_off: true };
    assert.equal(p._extOn(), false);
    assert.equal(text(p._renderExternalOption(sw)), "Quem faz Serviços externos Desligado.");
    assert.equal(p._externalOf("todo.casa", "Trocar resistência"), null);
    assert.equal(p._externalText("todo.casa", "Trocar resistência"), "");
    assert.equal(text(p._renderExternalTag("todo.casa", { summary: "Trocar resistência" })), "");
    p._form = { ext: null };
    assert.equal(p._renderExternalField(p._form, F.CREATE | F.DUE_DATE | F.DESCRIPTION), nothing);
    p._form = { ext: "Eletricista" };
    assert.equal(p._renderExternalField(p._form, F.CREATE | F.DUE_DATE | F.DESCRIPTION), nothing, "not even when the task has one");
    assert.equal(p._externalRaw("todo.casa", "Trocar resistência"), "Eletricista", "kept: a move or a rename takes it along");
    p._app_ = {};
    assert.equal(p._externalOf("todo.casa", "Trocar resistência"), "Eletricista", "back on: as it was");
  });
  it("off: a task opened and saved without changes doesn't touch what is kept; renamed, it goes along", async () => {
    const p = panel({}, { "resolvia/external/set": (m) => ({ ext: { [m.entity_id]: { y: m.value } } }) });
    p._app_ = { ext_off: true };
    await p._saveTaskExternal("todo.casa", "Trocar", { ext: "Eletricista", extOrig: "Eletricista" });
    assert.equal(p.hass.calls.length, 0);
    await p._saveTaskExternal("todo.casa", "Trocar 2", { ext: "Eletricista", extOrig: "Eletricista" }, "Trocar");
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/external/set", entity_id: "todo.casa", summary: "Trocar 2", value: "Eletricista", previous_summary: "Trocar" });
  });
  it("the switch saves ext_off (true when off, null back on)", async () => {
    const p = panel();
    await fire(p._renderExternalOption(sw), "Serviços externos", "change", { target: { checked: false } });
    await fire(p._renderExternalOption(sw), "Serviços externos", "change", { target: { checked: true } });
    assert.deepEqual(p.prefs, [{ ext_off: true }, { ext_off: null }]);
  });
});
