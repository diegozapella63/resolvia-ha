// frontend/src/correria.js: Mais › Configurações › Integrações › CorrerIA (the switch and the last use).
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, fire, labels, fakeHass, hostOf } from "./_lit.mjs";
import { CorreriaMixin, lastUse } from "../frontend/src/correria.js";
import { local } from "./_helpers.mjs";
import { nothing } from "../frontend/vendor/lit-all.min.js";

const Panel = hostOf(CorreriaMixin);
const NOW = local(2026, 11, 8, 15, 0);

describe("CorrerIA: the last use", () => {
  it("today, yesterday or the day; nothing without a use", () => {
    assert.equal(lastUse({ cliente: "Claude", em: "2026-11-08T09:41:00" }, NOW), "Claude usou hoje às 09:41.");
    assert.equal(lastUse({ cliente: "Gemini", em: "2026-11-07T22:05:00" }, NOW), "Gemini usou ontem às 22:05.");
    assert.equal(lastUse({ cliente: "WhatsApp", em: "2026-10-30T08:00:00" }, NOW), "WhatsApp usou em 30/10 às 08:00.");
    assert.equal(lastUse(null, NOW), "");
    assert.equal(lastUse({ cliente: "Claude", em: "quando?" }, NOW), "");
    assert.match(lastUse({ cliente: "Claude", em: "2026-11-08T09:41:00" }), /^Claude usou .* às 09:41\.$/);
  });
});

describe("CorrerIA: the card", () => {
  it("off (the default): the switch, nothing else", () => {
    const p = new Panel(fakeHass());
    const view = p._renderCorreriaPanel();
    assert.equal(text(view), "CorrerIA O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini. Usar com o CorrerIA Desligado.");
    assert.deepEqual(labels(view, "change"), ["Usar com o CorrerIA"]);
  });
  it("on, never used: says to connect in the app CorrerIA", () => {
    const p = new Panel(fakeHass());
    p._app_.correria_on = true;
    p._correria = { on: true, ultimo: null };
    assert.match(text(p._renderCorreriaPanel()), /Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas\. Nenhum uso ainda Conecte no app CorrerIA\.$/);
  });
  it("on and used: who and when", () => {
    const p = new Panel(fakeHass());
    p._app_.correria_on = true;
    const em = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    p._correria = { on: true, ultimo: { cliente: "Claude", em: `${em.getFullYear()}-${pad(em.getMonth() + 1)}-${pad(em.getDate())}T09:41:00`, nome: "resumo" } };
    assert.match(text(p._renderCorreriaPanel()), /Claude usou hoje às 09:41\.$/);
  });
  it("the switch saves correria_on and reads the state again; off removes it", async () => {
    const hass = fakeHass({ "resolvia/correria/get": { on: true, ultimo: null } });
    const p = new Panel(hass);
    await fire(p._renderCorreriaPanel(), "Usar com o CorrerIA", "change", { target: { checked: true } });
    assert.deepEqual(p.prefs, [{ correria_on: true }]);
    assert.deepEqual(p._correria, { on: true, ultimo: null });
    assert.deepEqual(p.haptics, ["light"]);
    await fire(p._renderCorreriaPanel(), "Usar com o CorrerIA", "change", { target: { checked: false } });
    assert.deepEqual(p.prefs.at(-1), { correria_on: null });
  });
  it("an error leaves no state; without the server of the app (the preview of old), no card and no call", async () => {
    const p = new Panel(fakeHass({ "resolvia/correria/get": new Error("caiu") }));
    p._correria = { on: true };
    await p._loadCorreria();
    assert.equal(p._correria, null);
    const bare = new Panel({ ...fakeHass(), resolvia: undefined });
    assert.equal(bare._renderCorreriaPanel(), nothing);
    await bare._loadCorreria();
    assert.equal(bare.hass.calls.length, 0);
    const none = new Panel(null);
    await none._loadCorreria();
  });
});
