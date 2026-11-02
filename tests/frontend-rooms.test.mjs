// frontend/src/rooms.js: Cômodos e equipamentos of the InventarIA on the tasks.
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, click, fire, labels, fakeHass, hostOf } from "./_lit.mjs";
import { RoomsMixin, taskKey } from "../frontend/src/rooms.js";
import { taskKey as serverKey } from "../resolvia/rootfs/app/lib/store.js";

const Panel = hostOf(RoomsMixin);
const ROOMS = () => ({
  on: true,
  equips_on: true,
  encontrado: true,
  comodos: [
    { id: "cozinha", nome: "Cozinha" },
    { id: "quarto", nome: "Quarto de hóspedes com um nome bem comprido" },
  ],
  itens: [
    { id: "geladeira", nome: "Geladeira", zona: "Bancada", comodo: "cozinha" },
    { id: "ar", nome: "Ar-condicionado", zona: "", comodo: "quarto" },
    { id: "escada", nome: "Escada", comodo: "" },
  ],
  map: { "todo.casa": { "limpar geladeira": "cozinha", "sumiu": "porao" } },
  emap: { "todo.casa": { "limpar geladeira": "geladeira", "velho": "fogao" } },
});
const panel = (r = ROOMS(), answers = {}) => {
  const p = new Panel(fakeHass(answers));
  p._rooms = r;
  p.hass.resolvia = {};
  return p;
};

describe("rooms: the key of a task", () => {
  it("is the same as the server's (accents, case, spaces, 255 chars)", () => {
    for (const s of ["  Limpar   GELADEIRA ", "Ação", "", null, "x".repeat(300)]) assert.equal(taskKey(s), serverKey(s));
    assert.equal(taskKey("  Limpar   GELADEIRA "), "limpar geladeira");
  });
});

describe("rooms: what is on", () => {
  it("rooms on only with the switch on and rooms from the InventarIA", () => {
    assert.equal(panel()._roomsOn(), true);
    assert.equal(panel({ ...ROOMS(), on: false })._roomsOn(), false);
    assert.equal(panel({ ...ROOMS(), comodos: [] })._roomsOn(), false);
    assert.equal(panel(null)._roomsOn(), false);
    assert.deepEqual(panel(null)._roomList(), []);
  });
  it("equipments on only with their switch and items", () => {
    assert.equal(panel()._equipsOn(), true);
    assert.equal(panel({ ...ROOMS(), equips_on: false })._equipsOn(), false);
    assert.equal(panel({ ...ROOMS(), itens: [] })._equipsOn(), false);
    assert.deepEqual(panel(null)._equipList(), []);
  });
  it("the room and the item of a task, by its name; gone ones are ignored", () => {
    const p = panel();
    assert.equal(p._roomIdOf("todo.casa", "Limpar Geladeira"), "cozinha");
    assert.equal(p._roomIdOf("todo.casa", "Sumiu"), null, "a room deleted in the InventarIA");
    assert.equal(p._roomIdOf("todo.outra", "Limpar Geladeira"), null);
    assert.equal(p._equipIdOf("todo.casa", "limpar geladeira"), "geladeira");
    assert.equal(p._equipIdOf("todo.casa", "velho"), null, "an item deleted in the InventarIA");
    assert.equal(panel({ ...ROOMS(), on: false })._roomIdOf("todo.casa", "Limpar Geladeira"), null);
    assert.equal(panel({ ...ROOMS(), equips_on: false })._equipIdOf("todo.casa", "Limpar Geladeira"), null);
    assert.equal(p._roomName("quarto"), "Quarto de hóspedes com um nome bem comprido");
    assert.equal(p._roomName("nada"), null);
    assert.equal(p._equipOf(null), null);
  });
  it("the place as text for Buscar: room, item and zone, each optional", () => {
    const p = panel();
    assert.equal(p._placeText("todo.casa", "Limpar geladeira"), "Cozinha Geladeira Bancada");
    assert.equal(p._placeText("todo.casa", "Limpar geladeira", { rooms: false }), "Geladeira Bancada");
    assert.equal(p._placeText("todo.casa", "Limpar geladeira", { equips: false }), "Cozinha");
    assert.equal(p._placeText("todo.casa", "outra"), "");
  });
  it("the items for the picker carry the name of their room", () => {
    assert.deepEqual(panel()._equipItems()[0], { id: "geladeira", nome: "Geladeira", zona: "Bancada", roomId: "cozinha", roomName: "Cozinha" });
    assert.equal(panel()._equipItems()[2].roomName, "");
  });
});

describe("rooms: saving", () => {
  it("_loadRooms keeps what it had when the server fails; outside the app asks nothing", async () => {
    const p = panel(ROOMS(), { "resolvia/rooms/get": new Error("x") });
    await p._loadRooms();
    assert.equal(p._rooms.on, true);
    const q = panel(null, { "resolvia/rooms/get": new Error("x") });
    await q._loadRooms();
    assert.equal(q._rooms, null);
    const r = panel(null);
    delete r.hass.resolvia;
    await r._loadRooms();
    assert.equal(r.hass.calls.length, 0);
  });
  it("_setTaskRoom and _setTaskEquip: null removes, the old name goes after a rename, errors become toasts", async () => {
    const p = panel(ROOMS(), { "resolvia/rooms/set": ROOMS(), "resolvia/equips/set": new Error("") });
    await p._setTaskRoom("todo.casa", "Limpar", "cozinha");
    await p._setTaskRoom("todo.casa", "Limpar 2", "", "Limpar");
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/rooms/set", entity_id: "todo.casa", summary: "Limpar", room: "cozinha" });
    assert.deepEqual(p.hass.calls[1], { type: "resolvia/rooms/set", entity_id: "todo.casa", summary: "Limpar 2", room: null, previous_summary: "Limpar" });
    await p._setTaskEquip("todo.casa", "Limpar", "geladeira");
    assert.deepEqual(p.toasts, ["Não consegui guardar o equipamento"]);
    const off = panel({ ...ROOMS(), on: false, equips_on: false });
    await off._setTaskRoom("todo.casa", "x", "cozinha");
    await off._setTaskEquip("todo.casa", "x", "geladeira");
    assert.equal(off.hass.calls.length, 0, "off: nothing saved");
  });
  it("a room that fails to save says the reason the server gave", async () => {
    const p = panel(ROOMS(), { "resolvia/rooms/set": new Error("Cômodo inválido") });
    await p._setTaskRoom("todo.casa", "x", "cozinha");
    assert.deepEqual(p.toasts, ["Cômodo inválido"]);
  });
});

describe("rooms: on the screen", () => {
  it("the tags clip long names", () => {
    const p = panel({ ...ROOMS(), map: { "todo.casa": { a: "quarto" } }, emap: { "todo.casa": { a: "ar" } } });
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "A" })), "Quarto de hóspedes co…");
    assert.equal(text(p._renderEquipTag("todo.casa", { summary: "A" })), "Ar-condicionado");
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "B" })), "");
  });
  it("Cômodo: Nenhum and one chip per room; the same room again takes it out", () => {
    const p = panel();
    p._form = { room: null, equip: null };
    let f = p._renderRoomField(p._form);
    assert.deepEqual(labels(f), ["Nenhum", "Cozinha", "Quarto de hóspedes co…"]);
    click(f, "Cozinha");
    assert.equal(p._form.room, "cozinha");
    click(p._renderRoomField(p._form), "Cozinha");
    assert.equal(p._form.room, null);
  });
  it("another room drops an equipment of the old one", () => {
    const p = panel();
    p._form = { room: "cozinha", equip: "geladeira" };
    click(p._renderRoomField(p._form), "Quarto de hóspedes co…");
    assert.deepEqual([p._form.room, p._form.equip], ["quarto", null]);
    p._form = { room: "cozinha", equip: "geladeira" };
    click(p._renderRoomField(p._form), "Nenhum");
    assert.deepEqual([p._form.room, p._form.equip], [null, "geladeira"], "Nenhum keeps the equipment");
  });
  it("rooms off: no field", () => assert.equal(text(panel({ ...ROOMS(), on: false })._renderRoomField({})), ""));
  it("Equipamento: picking one sets its room (when rooms are on)", () => {
    const p = panel();
    p._form = { room: null, equip: null, equipQ: "gela" };
    const f = p._renderEquipField(p._form);
    assert.match(text(f), /Equipamento/);
    click(f, /Geladeira/);
    assert.deepEqual([p._form.equip, p._form.room, p._form.equipQ], ["geladeira", "cozinha", ""]);
    const q = panel({ ...ROOMS(), on: false });
    q._form = { equipQ: "gela" };
    click(q._renderEquipField(q._form), /Geladeira/);
    assert.equal(q._form.room, undefined, "rooms off: the room is not set");
    assert.equal(text(panel({ ...ROOMS(), equips_on: false })._renderEquipField({})), "");
  });
});

describe("rooms: Mais › Integrações › InventarIA", () => {
  it("outside the app: nothing", () => {
    const p = panel();
    p.hass.resolvia = null;
    assert.equal(text(p._renderRoomsPanel()), "");
  });
  it("both off: two switches saying Desligado, no state", () => {
    const t = text(panel()._renderRoomsPanel());
    assert.match(t, /Usar cômodos Desligado\. Usar equipamentos Desligado\./);
    assert.doesNotMatch(t, /Verificar de novo/);
  });
  it("on: what came from the InventarIA, or why nothing came", () => {
    const p = panel();
    p._app_ = { rooms_on: true, equips_on: true };
    assert.match(text(p._renderRoomsPanel()), /2 cômodos · 3 equipamentos Cozinha, Quarto de hóspedes com um nome bem comprido Verificar de novo/);
    const none = panel({ comodos: [], itens: [], encontrado: false });
    none._app_ = { rooms_on: true };
    assert.match(text(none._renderRoomsPanel()), /InventarIA não encontrado Instale ou atualize o InventarIA \(1\.15\.0 ou mais nova\)/);
    const empty = panel({ comodos: [], itens: [], encontrado: true });
    empty._app_ = { equips_on: true };
    assert.match(text(empty._renderRoomsPanel()), /Nada cadastrado Cadastre os cômodos e os itens no InventarIA\./);
    const err = panel({ ...ROOMS(), erro: "O InventarIA não respondeu." });
    err._app_ = { rooms_on: true };
    assert.match(text(err._renderRoomsPanel()), /2 cômodos O InventarIA não respondeu\./);
    const busy = panel();
    busy._app_ = { rooms_on: true };
    busy._roomsBusy = true;
    assert.match(text(busy._renderRoomsPanel()), /Verificando…/);
  });
  it("the switches save the choice (null when off) and check the InventarIA again", async () => {
    const p = panel(ROOMS(), { "resolvia/rooms/refresh": ROOMS() });
    const v = p._renderRoomsPanel();
    await fire(v, "Usar cômodos", "change", { target: { checked: true } });
    await fire(v, "Usar equipamentos", "change", { target: { checked: false } });
    assert.deepEqual(p.prefs, [{ rooms_on: true }, { equips_on: null }]);
    assert.deepEqual(p.hass.calls.map((c) => c.type), ["resolvia/rooms/refresh", "resolvia/rooms/refresh"]);
    assert.equal(p._roomsBusy, false);
  });
  it("Verificar de novo asks the InventarIA again", async () => {
    const p = panel(ROOMS(), { "resolvia/rooms/refresh": { ...ROOMS(), comodos: [{ id: "sala", nome: "Sala" }] } });
    p._app_ = { rooms_on: true };
    await click(p._renderRoomsPanel(), "Verificar de novo");
    assert.equal(p._roomList()[0].nome, "Sala");
  });
});
