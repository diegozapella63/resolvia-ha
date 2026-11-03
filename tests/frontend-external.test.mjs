// frontend/src/external.js: Serviço externo on the tasks (who from outside does it).
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, click, fire, labels, fakeHass, hostOf } from "./_lit.mjs";
import { ExternalMixin } from "../frontend/src/external.js";

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
