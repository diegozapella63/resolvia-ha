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
    assert.deepEqual(p.hass.calls[0], { type: "resolvia/rooms/set", entity_id: "todo.casa", summary: "Limpar", rooms: ["cozinha"] });
    assert.deepEqual(p.hass.calls[1], { type: "resolvia/rooms/set", entity_id: "todo.casa", summary: "Limpar 2", rooms: [], previous_summary: "Limpar" });
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
    assert.deepEqual(labels(f), ["Nenhum", "Todos", "Cozinha", "Quarto de hóspedes co…"]);
    click(f, "Cozinha");
    assert.equal(p._form.room, "cozinha");
    click(p._renderRoomField(p._form), "Cozinha");
    assert.equal(p._form.room, null);
  });
  it("without equipment, several rooms (2.39.2): each chip turns on and off, Nenhum clears", () => {
    const p = panel();
    p._form = { room: null, equips: [] };
    click(p._renderRoomField(p._form), "Cozinha");
    click(p._renderRoomField(p._form), /Quarto/);
    assert.deepEqual([p._form.rooms, p._form.room], [["cozinha", "quarto"], "cozinha"]);
    assert.deepEqual(p._formRooms(p._form), ["cozinha", "quarto"]);
    assert.match(text(p._renderRoomField(p._form)), /Cômodos/);
    click(p._renderRoomField(p._form), "Cozinha");
    assert.deepEqual([p._form.rooms, p._form.room], [["quarto"], "quarto"]);
    click(p._renderRoomField(p._form), "Nenhum");
    assert.deepEqual([p._form.rooms, p._form.room, p._formRooms(p._form)], [[], null, []]);
  });
  // the class of the button Todos ("on" when lit), found in the template
  const todosOn = (v) => {
    const find = (x) => {
      if (!x || typeof x !== "object") return null;
      if (Array.isArray(x)) return x.map(find).find((y) => y != null) ?? null;
      if (x.strings && x.strings[0].includes("all-rooms")) return x.values[0];
      return find(x.values);
    };
    return find(v) === "on";
  };
  it("Todos (2.40): every room of the house; again, none; the tag is one, Todos os cômodos", () => {
    const p = panel({ ...ROOMS(), map: { "todo.casa": { a: ["cozinha", "quarto"], b: ["quarto"] } } });
    p._form = { room: null, equips: [] };
    click(p._renderRoomField(p._form), "Todos");
    assert.deepEqual([p._form.rooms, p._form.room], [["cozinha", "quarto"], "cozinha"]);
    assert.equal(p._allRooms(p._form.rooms), true);
    assert.equal(todosOn(p._renderRoomField(p._form)), true, "Todos lit");
    assert.match(JSON.stringify(p._renderEquipField(p._form)), /Buscar equipamento…/, "the equipment search is the whole house");
    click(p._renderRoomField(p._form), "Todos");
    assert.deepEqual([p._form.rooms, p._form.room], [[], null]);
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "A" })), "Todos os cômodos");
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "B" })), "Quarto de hóspedes co…");
    p._form = { room: null, equips: ["geladeira", "ar"] };
    assert.equal(todosOn(p._renderRoomField(p._form)), false, "locked by the equipments: Todos stays off");
  });
  it("with equipment the room is locked: the rooms of the items, marked, and the chips do nothing", () => {
    const p = panel();
    p._form = { room: null, equips: ["geladeira", "ar"] };
    const f = p._renderRoomField(p._form);
    assert.match(text(f), /Cômodos/);
    assert.match(text(f), /Vem dos equipamentos\./);
    const on = (f.values || []).flat(Infinity);
    assert.ok(/chip-row grid locked/.test(f.strings.join("")) || /locked/.test(JSON.stringify(on)), "the chips are locked");
    assert.deepEqual(p._formRooms(p._form), ["cozinha", "quarto"]);
    p._form = { room: "quarto", equips: [] };
    assert.deepEqual(p._formRooms(p._form), ["quarto"], "without equipment: the room chosen");
  });
  it("rooms off: no field", () => assert.equal(text(panel({ ...ROOMS(), on: false })._renderRoomField({})), ""));
  it("Equipamento: picking adds to the list; the room comes from the items (when rooms are on)", () => {
    const p = panel();
    p._form = { room: null, equips: [], equipQ: "gela" };
    const f = p._renderEquipField(p._form);
    assert.match(text(f), /Equipamento/);
    click(f, /Geladeira/);
    assert.deepEqual([p._form.equips, p._form.equipQ, p._form.equipAdding], [["geladeira"], "", false]);
    assert.deepEqual(p._formRooms(p._form), ["cozinha"]);
    p._form = { ...p._form, equipAdding: true, equipQ: "ar" };
    click(p._renderEquipField(p._form), /Ar-condicionado/);
    assert.deepEqual(p._form.equips, ["geladeira", "ar"]);
    assert.match(text(p._renderEquipField(p._form)), /Equipamentos/);
    const q = panel({ ...ROOMS(), on: false });
    q._form = { equipQ: "gela", equips: [] };
    click(q._renderEquipField(q._form), /Geladeira/);
    assert.deepEqual(q._formRooms(q._form), [], "rooms off: no room");
    assert.equal(text(panel({ ...ROOMS(), equips_on: false })._renderEquipField({})), "");
  });
  it("taking the last item out frees the room, starting from the one it had", () => {
    const p = panel();
    p._form = { room: null, equips: ["ar"] };
    p._renderEquipField(p._form);
    const tpl = p._renderEquipField(p._form);
    click(tpl, /Tirar Ar-condicionado/);
    assert.deepEqual([p._form.equips, p._form.room], [[], "quarto"]);
  });
  it("2.51.1: more than one room (not all of them), one tag, Vários cômodos, with the names in the title", () => {
    const r = ROOMS();
    r.comodos.push({ id: "sala", nome: "Sala" });
    const p = panel({ ...r, map: { "todo.casa": { a: ["cozinha", "sala"], b: ["sala"] } } });
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "A" })), "Vários cômodos");
    assert.match(JSON.stringify(p._renderRoomTag("todo.casa", { summary: "A" }).values), /Cozinha, Sala/);
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "B" })), "Sala", "one room: its name");
  });
  it("several items: one tag, Vários equipamentos (2.51.1), no rooms; Buscar still finds them all", () => {
    const p = panel({ ...ROOMS(), map: { "todo.casa": { a: ["cozinha", "quarto"] } }, emap: { "todo.casa": { a: ["geladeira", "ar", "escada"] } } });
    assert.equal(text(p._renderRoomTag("todo.casa", { summary: "A" })), "");
    assert.equal(text(p._renderEquipTag("todo.casa", { summary: "A" })).replace(/\s+/g, " ").trim(), "Vários equipamentos");
    assert.match(p._placeText("todo.casa", "A"), /Cozinha.*Quarto.*Geladeira.*Ar-condicionado.*Escada/);
  });
});

describe("rooms: Mais › Configurações › Integrações › InventarIA", () => {
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
  it("on: the AI suggests the room and the equipment only with Usar IA on", () => {
    const p = panel();
    p._app_ = { rooms_on: true, equips_on: true };
    assert.match(text(p._renderRoomsPanel()), /Usar cômodos Cada tarefa pode ter um cômodo, e a IA sugere qual\. Usar equipamentos Cada tarefa pode ser de um equipamento ou móvel, e a IA sugere qual\./);
    p._app_.ai_off = true;
    const t = text(p._renderRoomsPanel());
    assert.match(t, /Usar cômodos Cada tarefa pode ter um cômodo\. Usar equipamentos Cada tarefa pode ser de um equipamento ou móvel\./);
    assert.doesNotMatch(t, /a IA sugere/);
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
