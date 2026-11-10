import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Store, normalize, taskKey, datesInfo } from "../resolvia/rootfs/app/lib/store.js";
import { tmpDir, fakeLog, local } from "./_helpers.mjs";

const EMPTY = { version: 1, prefs: { lists: {}, app: {} }, rules: {}, points: {}, rooms: {}, equips: {}, ext: {}, dues: {} };

/** A store in a fresh temp dir, with its timers and clock under the test's control. */
function newStore(t, { now = local(2026, 11, 2, 9, 0, 0), file } = {}) {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: now.getTime() });
  const dir = tmpDir("resolvia-store-");
  if (file !== undefined) fs.writeFileSync(path.join(dir, "resolvia.json"), typeof file === "string" ? file : JSON.stringify(file));
  const log = fakeLog();
  const store = new Store(dir, log);
  return { store, dir, log, onDisk: () => JSON.parse(fs.readFileSync(path.join(dir, "resolvia.json"), "utf8")), versions: () => (fs.existsSync(path.join(dir, "versoes")) ? fs.readdirSync(path.join(dir, "versoes")).sort() : []) };
}

describe("taskKey", () => {
  it("folds accents and case, collapses and trims spaces", () => {
    assert.equal(taskKey("  Lavar   a\tLOUÇA \n"), "lavar a louca");
    assert.equal(taskKey("Pão de Açúcar"), "pao de acucar");
    assert.equal(taskKey("Ação Já"), "acao ja");
  });

  it("treats a decomposed (NFD) name the same as the composed one", () => {
    assert.equal(taskKey("Pão"), taskKey("Pão"));
  });

  it("returns '' for empty values and stringifies others", () => {
    assert.equal(taskKey(null), "");
    assert.equal(taskKey(undefined), "");
    assert.equal(taskKey(""), "");
    assert.equal(taskKey("   "), "");
    assert.equal(taskKey(42), "42");
  });

  it("is limited to 255 characters, counted after trimming", () => {
    assert.equal(taskKey("x".repeat(300)).length, 255);
    assert.equal(taskKey("   " + "y".repeat(300)), "y".repeat(255));
  });

  it("is idempotent", () => {
    for (const s of ["Trocar o filtro do AR", "  Café   com  leite ", "Ç"]) assert.equal(taskKey(taskKey(s)), taskKey(s));
  });
});

describe("datesInfo", () => {
  it("is true for a list that cannot set due dates", () => {
    assert.equal(datesInfo(undefined, 0), true);
    assert.equal(datesInfo(null, undefined), true);
    assert.equal(datesInfo({}, 1 | 2 | 4 | 8 | 64), true);
  });

  it("is false when the list accepts a due date or a due datetime", () => {
    assert.equal(datesInfo({}, 16), false);
    assert.equal(datesInfo({}, 32), false);
    assert.equal(datesInfo(undefined, 127), false);
  });

  it("is true when the user marked the dates as information (only the boolean true counts)", () => {
    assert.equal(datesInfo({ dates_info: true }, 127), true);
    assert.equal(datesInfo({ dates_info: "true" }, 127), false);
    assert.equal(datesInfo({ dates_info: false }, 127), false);
  });
});

describe("normalize", () => {
  it("returns an empty skeleton for anything that is not an object", () => {
    for (const raw of [null, undefined, 3, "x", [], [{ prefs: {} }]]) assert.deepEqual(normalize(raw), EMPTY);
    assert.deepEqual(normalize({}), EMPTY);
  });

  it("(own file) keeps list prefs of valid to-do ids as they are, drops the rest", () => {
    const d = normalize({ prefs: { lists: { "todo.casa": { name: "Casa", extra: 1 }, "todo.Casa": { name: "x" }, "light.sala": { name: "y" }, "todo.bad": "nope" } } });
    assert.deepEqual(d.prefs.lists, { "todo.casa": { name: "Casa", extra: 1 } });
  });

  it("(own file) keeps app prefs and rules as stored", () => {
    const d = normalize({ prefs: { app: { accent: "rosa", future_field: 1 } }, rules: { a: { entity_id: "todo.x", days: 2 }, b: "broken" } });
    assert.deepEqual(d.prefs.app, { accent: "rosa", future_field: 1 });
    assert.deepEqual(d.rules, { a: { entity_id: "todo.x", days: 2 } });
  });

  describe("strict (imports and restores)", () => {
    it("cleans list prefs to the known fields and limits", () => {
      const d = normalize(
        { prefs: { lists: { "todo.a": { name: "  Mercado  ", color: "rosa", icon: "shopping-cart", hidden: 1, dates_info: 0, junk: "x" }, "todo.b": { name: "n".repeat(100) } } } },
        true,
      );
      assert.deepEqual(d.prefs.lists["todo.a"], { name: "Mercado", color: "rosa", icon: "shopping-cart", hidden: true, dates_info: false });
      assert.equal(d.prefs.lists["todo.b"].name.length, 80);
    });

    it("drops a list whose prefs end up empty, and a list with a broken field", () => {
      const d = normalize({ prefs: { lists: { "todo.empty": { name: "", color: null, junk: 1 }, "todo.broken": { name: 5, color: "rosa" }, "todo.ok": { color: "azul" } } } }, true);
      assert.deepEqual(d.prefs.lists, { "todo.ok": { color: "azul" } });
    });

    it("cleans app prefs field by field (a broken field does not lose the others)", () => {
      const d = normalize(
        {
          prefs: {
            app: {
              accent: "menta",
              show_done: "yes",
              list_order: ["todo.a", "todo.b"],
              group_by_device: false,
              rooms_on: true,
              equips_on: 1,
              points_on: true,
              accent_extra: "x",
              voice_engine: "stt.faster_whisper",
              ai_entity: "ai_task.google_ai_task",
              due_off: true,
              repeat_on: false,
              sensors_on: false,
              ai_off: false,
            },
          },
        },
        true,
      );
      assert.deepEqual(d.prefs.app, {
        accent: "menta",
        show_done: true,
        list_order: ["todo.a", "todo.b"],
        group_by_device: false,
        rooms_on: true,
        equips_on: true,
        points_on: true,
        voice_engine: "stt.faster_whisper",
        ai_entity: "ai_task.google_ai_task",
        due_off: true,
        repeat_on: false,
        sensors_on: false,
        ai_off: false,
      });
    });

    it("skips app fields of the wrong type and invalid entity ids", () => {
      const d = normalize({ prefs: { app: { accent: 7, list_order: "todo.a", rooms_on: true, ai_entity: "conversation.x", voice_engine: "STT Cloud!" } } }, true);
      assert.deepEqual(d.prefs.app, { rooms_on: true });
    });

    it("limits list_order to 200 entries of 255 characters", () => {
      const d = normalize({ prefs: { app: { list_order: Array.from({ length: 250 }, (_, i) => `todo.l${i}${"z".repeat(300)}`) } } }, true);
      assert.equal(d.prefs.app.list_order.length, 200);
      assert.ok(d.prefs.app.list_order.every((x) => x.length === 255));
    });

    it("drops empty strings and nulls from the app prefs", () => {
      const d = normalize({ prefs: { app: { accent: "", ai_entity: null, voice_engine: "   " } } }, true);
      assert.deepEqual(d.prefs.app, {});
    });
  });

  describe("strict rules", () => {
    const base = { entity_id: "todo.casa", summary: "Regar as plantas", days: 3 };

    it("keeps a valid rule with only the known fields", (t) => {
      t.mock.timers.enable({ apis: ["Date"], now: 1_700_000_000_000 });
      const d = normalize({ rules: { r1: { ...base, uid: "u1", description: "Na varanda", junk: 1, retry_at: 5, created_at: 123 } } }, true);
      assert.deepEqual(d.rules, {
        r1: { id: "r1", entity_id: "todo.casa", uid: "u1", match: null, summary: "Regar as plantas", description: "Na varanda", days: 3, completed_at: null, reopen_at: null, due_time: null, created_at: 123 },
      });
    });

    it("binds by name (match) when there is no uid, and fills created_at with now", (t) => {
      t.mock.timers.enable({ apis: ["Date"], now: 1_700_000_000_000 });
      const d = normalize({ rules: { r1: base } }, true);
      assert.equal(d.rules.r1.uid, null);
      assert.equal(d.rules.r1.match, "Regar as plantas");
      assert.equal(d.rules.r1.created_at, 1_700_000_000_000);
    });

    it("takes the summary from match when the summary is missing", () => {
      const d = normalize({ rules: { r1: { entity_id: "todo.casa", match: "Varrer", days: 1 } } }, true);
      assert.equal(d.rules.r1.summary, "Varrer");
      assert.equal(d.rules.r1.match, "Varrer");
    });

    it("accepts days as a numeric string, rejects out-of-range or fractional days", () => {
      assert.equal(normalize({ rules: { r: { ...base, days: "7" } } }, true).rules.r.days, 7);
      for (const days of [0, -1, 366, 1.5, "x", null, undefined]) {
        assert.deepEqual(normalize({ rules: { r: { ...base, days } } }, true).rules, {}, `days=${days}`);
      }
      assert.equal(normalize({ rules: { r: { ...base, days: 365 } } }, true).rules.r.days, 365);
    });

    it("rejects rules of invalid lists or without any name", () => {
      for (const r of [{ ...base, entity_id: "light.sala" }, { ...base, entity_id: "todo.Casa" }, { ...base, entity_id: 5 }, { ...base, summary: "   " }, "rule", null]) {
        assert.deepEqual(normalize({ rules: { r: r } }, true).rules, {});
      }
    });

    it("keeps reopen_at only for a completed rule", () => {
      const done = normalize({ rules: { r: { ...base, uid: "u", completed_at: 100, reopen_at: 200 } } }, true).rules.r;
      assert.equal(done.reopen_at, 200);
      const pending = normalize({ rules: { r: { ...base, uid: "u", completed_at: null, reopen_at: 200 } } }, true).rules.r;
      assert.equal(pending.reopen_at, null);
      assert.equal(normalize({ rules: { r: { ...base, completed_at: "100", reopen_at: 200 } } }, true).rules.r.completed_at, null);
    });

    it("limits the summary to 255 and the description to 4000 characters", () => {
      const r = normalize({ rules: { r: { ...base, summary: "s".repeat(300), description: "d".repeat(5000) } } }, true).rules.r;
      assert.equal(r.summary.length, 255);
      assert.equal(r.match.length, 255);
      assert.equal(r.description.length, 4000);
    });

    it("gives a new id to a rule with an unsafe id; the first of two equal ids wins", () => {
      const d = normalize({ rules: [{ ...base, id: "../../etc" }, { ...base, id: "dup", summary: "Primeira" }, { ...base, id: "dup", summary: "Segunda" }] }, true);
      const ids = Object.keys(d.rules);
      assert.equal(ids.length, 2);
      assert.equal(d.rules.dup.summary, "Primeira");
      const other = ids.find((i) => i !== "dup");
      assert.match(other, /^[0-9a-f]{12}$/);
      assert.equal(d.rules[other].id, other);
    });

    it("reads rules given as an array (id inside) or as an object (id as key)", () => {
      assert.ok(normalize({ rules: [{ ...base, id: "abc" }] }, true).rules.abc);
      assert.ok(normalize({ rules: { xyz: base } }, true).rules.xyz);
    });
  });

  describe("points, rooms and equipment (always checked)", () => {
    for (const strict of [false, true]) {
      it(`points: folded keys, whole numbers from 1 to 1000 (strict=${strict})`, () => {
        const d = normalize({ points: { "todo.casa": { "Lavar Louça": 10, "Varrer ": "5", "Zero": 0, "Big": 1001, "Neg": -3, "Frac": 2.6, "Txt": "dez", "": 4 }, "todo.Bad": { a: 1 }, "todo.x": "no" } }, strict);
        assert.deepEqual(d.points, { "todo.casa": { "lavar louca": 10, varrer: 5, frac: 3 } });
      });

      it(`rooms and equips: folded keys, ids of the InventarIA only (strict=${strict})`, () => {
        const raw = { "todo.casa": { "Limpar o Fogão": "cozinha_1", "Bad id": "a b", "Num": 5, "Long": "x".repeat(65), "Ok-dash": "A-b_9" }, "sensor.x": { a: "b" } };
        const d = normalize({ rooms: raw, equips: raw }, strict);
        const want = { "todo.casa": { "limpar o fogao": "cozinha_1", "ok-dash": "A-b_9" } };
        assert.deepEqual(d.rooms, want);
        assert.deepEqual(d.equips, want);
      });
    }

    it("rooms and equips: several ids per task (2.31): a list, each once, at most 10; one stays a plain id", () => {
      const raw = { "todo.casa": { Dois: ["pia_1", "ar_1", "pia_1"], Um: ["pia_1"], Nada: [], Ruim: ["a b", 5], Meio: ["ok_1", "a b"], Muitos: Array.from({ length: 12 }, (_, i) => `i${i}`) } };
      const d = normalize({ rooms: raw, equips: raw });
      const want = { "todo.casa": { dois: ["pia_1", "ar_1"], um: "pia_1", meio: "ok_1", muitos: Array.from({ length: 10 }, (_, i) => `i${i}`) } };
      assert.deepEqual(d.equips, want);
      assert.deepEqual(d.rooms, want);
    });

    it("drops a list whose every entry is invalid", () => {
      assert.deepEqual(normalize({ rooms: { "todo.casa": { a: "" } }, points: { "todo.casa": { a: 0 } } }).rooms, {});
      assert.deepEqual(normalize({ points: { "todo.casa": { a: 0 } } }).points, {});
    });

    it("two names that fold to the same key keep the last value", () => {
      const d = normalize({ points: { "todo.casa": { "Lavar Louça": 10, "lavar louca": 20 } } });
      assert.deepEqual(d.points, { "todo.casa": { "lavar louca": 20 } });
    });
  });
});

describe("Store: loading", () => {
  it("starts empty when there is no file, without complaining", (t) => {
    const { store, log } = newStore(t);
    assert.deepEqual(store.data, EMPTY);
    assert.deepEqual(log.lines, []);
  });

  it("creates its directory", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const dir = path.join(tmpDir(), "nested", "data");
    new Store(dir, fakeLog());
    assert.ok(fs.statSync(dir).isDirectory());
  });

  it("warns about an unreadable file and starts empty", (t) => {
    const { store, log } = newStore(t, { file: "{not json" });
    assert.deepEqual(store.data, EMPTY);
    assert.equal(log.of("warn").length, 1);
    assert.match(log.of("warn")[0], /Could not read/);
  });

  it("loads and normalizes the saved file (an old file without rooms/equips gets empty maps)", (t) => {
    const { store } = newStore(t, { file: { prefs: { lists: { "todo.casa": { name: "Casa" } }, app: { rooms_on: true } }, points: { "todo.casa": { "Varrer": 5 } } } });
    assert.equal(store.prefs.lists["todo.casa"].name, "Casa");
    assert.equal(store.prefs.app.rooms_on, true);
    assert.equal(store.pointsFor("todo.casa", "VARRER"), 5);
    assert.deepEqual(store.rooms, {});
    assert.deepEqual(store.equips, {});
  });

  it("rooms/equips getters tolerate data without those maps", (t) => {
    const { store } = newStore(t);
    delete store.data.rooms;
    delete store.data.equips;
    assert.deepEqual(store.rooms, {});
    assert.deepEqual(store.equips, {});
    assert.equal(store.roomFor("todo.casa", "x"), null);
  });
});

describe("Store: points", () => {
  it("sets and reads points by the folded task name", (t) => {
    const { store } = newStore(t);
    const all = store.setPoints("todo.casa", "Lavar a Louça", 10);
    assert.deepEqual(all, { "todo.casa": { "lavar a louca": 10 } });
    assert.equal(store.pointsFor("todo.casa", "  lavar A LOUCA "), 10);
    assert.equal(store.pointsFor("todo.outra", "Lavar a Louça"), 0);
    assert.equal(store.pointsFor("todo.casa", "Outra"), 0);
  });

  it("rounds, accepts numeric strings, and 0 / empty removes", (t) => {
    const { store } = newStore(t);
    store.setPoints("todo.casa", "A", "15");
    store.setPoints("todo.casa", "B", 2.6);
    assert.equal(store.pointsFor("todo.casa", "a"), 15);
    assert.equal(store.pointsFor("todo.casa", "b"), 3);
    store.setPoints("todo.casa", "A", 0);
    store.setPoints("todo.casa", "B", null);
    assert.deepEqual(store.points, {}, "the list entry goes away with its last task");
  });

  it("refuses points outside 0..1000, other entities and nameless tasks", (t) => {
    const { store } = newStore(t);
    assert.throws(() => store.setPoints("todo.casa", "A", 1001), /entre 0 e 1000/);
    assert.throws(() => store.setPoints("todo.casa", "A", -1), /entre 0 e 1000/);
    assert.throws(() => store.setPoints("light.sala", "A", 1), /Not a to-do entity/);
    assert.throws(() => store.setPoints("todo.Casa", "A", 1), /Not a to-do entity/);
    assert.throws(() => store.setPoints(null, "A", 1), /Not a to-do entity/);
    assert.throws(() => store.setPoints("todo.casa", "   ", 1), /Task name required/);
    assert.equal(store.setPoints("todo.casa", "A", 1000)["todo.casa"].a, 1000);
  });

  it("moves the points when the task is renamed (previous)", (t) => {
    const { store } = newStore(t);
    store.setPoints("todo.casa", "Varrer", 5);
    store.setPoints("todo.casa", "Varrer a sala", 5, "Varrer");
    assert.deepEqual(store.points, { "todo.casa": { "varrer a sala": 5 } });
  });

  it("a rename that only changes case or accents keeps the points", (t) => {
    const { store } = newStore(t);
    store.setPoints("todo.casa", "Varrer", 5);
    store.setPoints("todo.casa", "VARRER", 7, "Varrer");
    assert.deepEqual(store.points, { "todo.casa": { varrer: 7 } });
  });

  it("does not mutate the map it returned before", (t) => {
    const { store } = newStore(t);
    const first = store.setPoints("todo.casa", "A", 1);
    store.setPoints("todo.casa", "B", 2);
    assert.deepEqual(first, { "todo.casa": { a: 1 } });
  });

  it("keeps the points of other lists apart", (t) => {
    const { store } = newStore(t);
    store.setPoints("todo.casa", "Varrer", 5);
    store.setPoints("todo.mercado", "Varrer", 9);
    store.setPoints("todo.casa", "Varrer", 0);
    assert.deepEqual(store.points, { "todo.mercado": { varrer: 9 } });
  });
});

describe("Store: Serviço externo", () => {
  it("true or who (cleaned, up to 60 characters), by the folded name; null or false removes", (t) => {
    const { store, onDisk } = newStore(t);
    store.setExternal("todo.casa", "Trocar a Resistência", "  Eletricista   João  ");
    store.setExternal("todo.casa", "Consertar portão", true);
    assert.equal(store.externalFor("todo.casa", "trocar a resistencia"), "Eletricista João");
    assert.equal(store.externalFor("todo.casa", "Consertar Portão"), true);
    assert.equal(store.externalFor("todo.casa", "Lavar"), null);
    store.setExternal("todo.casa", "x", "y".repeat(80));
    assert.equal(store.externalFor("todo.casa", "x").length, 60);
    store.setExternal("todo.casa", "x", false);
    store.setExternal("todo.casa", "Consertar portão", null);
    store.setExternal("todo.casa", "Trocar a resistência", "   ");
    assert.deepEqual(store.external, {}, "an empty who removes too; the list entry goes with the last one");
    store.flush();
    assert.deepEqual(onDisk().ext, {});
  });
  it("a rename moves it; bad lists or names are refused", (t) => {
    const { store } = newStore(t);
    store.setExternal("todo.casa", "Trocar", "Eletricista");
    store.setExternal("todo.casa", "Trocar a resistência", "Eletricista", "Trocar");
    assert.deepEqual(store.external, { "todo.casa": { "trocar a resistencia": "Eletricista" } });
    assert.throws(() => store.setExternal("light.x", "a", true), /Not a to-do entity/);
    assert.throws(() => store.setExternal("todo.casa", "  ", true), /Task name required/);
  });
  it("normalize keeps only true or who for valid lists", () => {
    const d = normalize({ ext: { "todo.casa": { "A": true, "B": " Diarista ", "C": "", "D": 5, "E": false }, "light.x": { a: true }, "todo.y": "no" } });
    assert.deepEqual(d.ext, { "todo.casa": { a: true, b: "Diarista" } });
  });
});

describe("Store: rooms and equipment", () => {
  it("sets a room and finds it by the folded name", (t) => {
    const { store } = newStore(t);
    const all = store.setRoom("todo.casa", "Limpar o Fogão", "cozinha");
    assert.deepEqual(all, { "todo.casa": { "limpar o fogao": "cozinha" } });
    assert.equal(store.roomFor("todo.casa", "limpar o fogao"), "cozinha");
    assert.equal(store.roomFor("todo.casa", "Outra"), null);
    assert.equal(store.roomFor("todo.outra", "Limpar o Fogão"), null);
  });

  it("null or '' removes the room, and the list entry with the last one", (t) => {
    const { store } = newStore(t);
    store.setRoom("todo.casa", "A", "sala");
    store.setRoom("todo.casa", "B", "quarto");
    store.setRoom("todo.casa", "A", null);
    assert.deepEqual(store.rooms, { "todo.casa": { b: "quarto" } });
    store.setRoom("todo.casa", "B", "");
    assert.deepEqual(store.rooms, {});
  });

  it("moves the room when the task is renamed, and can change it at the same time", (t) => {
    const { store } = newStore(t);
    store.setRoom("todo.casa", "Limpar pia", "cozinha");
    store.setRoom("todo.casa", "Limpar a pia do banheiro", "banheiro", "Limpar pia");
    assert.deepEqual(store.rooms, { "todo.casa": { "limpar a pia do banheiro": "banheiro" } });
  });

  it("a rename with no room clears both names", (t) => {
    const { store } = newStore(t);
    store.setRoom("todo.casa", "Velho", "sala");
    store.setRoom("todo.casa", "Novo", "sala");
    store.setRoom("todo.casa", "Novo", null, "Velho");
    assert.deepEqual(store.rooms, {});
  });

  it("refuses ids that are not InventarIA ids, with a message for each kind", (t) => {
    const { store } = newStore(t);
    assert.throws(() => store.setRoom("todo.casa", "A", "sala de estar"), /Cômodo inválido/);
    assert.throws(() => store.setRoom("todo.casa", "A", "x".repeat(65)), /Cômodo inválido/);
    assert.throws(() => store.setEquip("todo.casa", "A", "../etc"), /Equipamento inválido/);
    assert.throws(() => store.setRoom("sensor.x", "A", "sala"), /Not a to-do entity/);
    assert.throws(() => store.setEquip("todo.casa", "", "geladeira"), /Task name required/);
    assert.deepEqual(store.rooms, {});
    assert.deepEqual(store.equips, {});
  });

  it("keeps rooms and equipment independent", (t) => {
    const { store } = newStore(t);
    store.setRoom("todo.casa", "Trocar filtro", "cozinha");
    store.setEquip("todo.casa", "Trocar filtro", "purificador_1");
    store.setRoom("todo.casa", "Trocar filtro", null);
    assert.deepEqual(store.rooms, {});
    assert.deepEqual(store.equips, { "todo.casa": { "trocar filtro": "purificador_1" } });
  });

  it("moves the equipment on rename", (t) => {
    const { store } = newStore(t);
    store.setEquip("todo.casa", "Trocar filtro", "ar_1");
    store.setEquip("todo.casa", "Trocar o filtro do ar", "ar_1", "Trocar filtro");
    assert.deepEqual(store.equips, { "todo.casa": { "trocar o filtro do ar": "ar_1" } });
  });

  it("survives a restart (flush + new Store)", (t) => {
    const { store, dir } = newStore(t);
    store.setRoom("todo.casa", "Limpar o Fogão", "cozinha");
    store.setEquip("todo.casa", "Limpar o Fogão", "fogao_1");
    store.setPoints("todo.casa", "Limpar o Fogão", 20);
    store.flush();
    const again = new Store(dir, fakeLog());
    assert.equal(again.roomFor("todo.casa", "LIMPAR O FOGAO"), "cozinha");
    assert.deepEqual(again.equips, { "todo.casa": { "limpar o fogao": "fogao_1" } });
    assert.equal(again.pointsFor("todo.casa", "limpar o fogão"), 20);
  });
});

describe("Store: list and app prefs", () => {
  it("merges list prefs; null or '' removes a field; empty prefs remove the list", (t) => {
    const { store } = newStore(t);
    store.setListPrefs("todo.casa", { name: " Casa ", color: "rosa" });
    assert.deepEqual(store.prefs.lists["todo.casa"], { name: "Casa", color: "rosa" });
    store.setListPrefs("todo.casa", { color: null, hidden: true });
    assert.deepEqual(store.prefs.lists["todo.casa"], { name: "Casa", hidden: true });
    store.setListPrefs("todo.casa", { name: "", hidden: null });
    assert.equal("todo.casa" in store.prefs.lists, false);
  });

  it("ignores unknown fields and rejects wrong types", (t) => {
    const { store } = newStore(t);
    store.setListPrefs("todo.casa", { name: "Casa", dono: "x" });
    assert.deepEqual(store.prefs.lists["todo.casa"], { name: "Casa" });
    assert.throws(() => store.setListPrefs("todo.casa", { name: 3 }), /name must be text/);
    assert.throws(() => store.setListPrefs("todo.casa", "x"), /prefs must be an object/);
    assert.throws(() => store.setListPrefs("todo.casa", ["x"]), /prefs must be an object/);
    assert.throws(() => store.setListPrefs("light.sala", { name: "x" }), /Not a to-do entity/);
    assert.throws(() => store.setListPrefs("todo." + "x".repeat(260), { name: "x" }), /Not a to-do entity/);
  });

  it("stops at 500 customized lists, but still updates the existing ones", (t) => {
    const { store } = newStore(t);
    for (let i = 0; i < 500; i++) store.setListPrefs(`todo.l${i}`, { hidden: true });
    assert.throws(() => store.setListPrefs("todo.one_more", { hidden: true }), /Too many lists/);
    store.setListPrefs("todo.l7", { name: "Sete" });
    assert.equal(store.prefs.lists["todo.l7"].name, "Sete");
  });

  it("app prefs: rooms_on, equips_on and the voice engine", (t) => {
    const { store } = newStore(t);
    store.setAppPrefs({ rooms_on: true, equips_on: true, voice_engine: "stt.home_assistant_cloud" });
    assert.deepEqual(store.prefs.app, { rooms_on: true, equips_on: true, voice_engine: "stt.home_assistant_cloud" });
    store.setAppPrefs({ equips_on: false, voice_engine: null });
    assert.deepEqual(store.prefs.app, { rooms_on: true, equips_on: false });
  });

  it("app prefs: Serviços externos and Notas (on by default; true turns them off, null back on), the kept tasks stay", (t) => {
    const { store } = newStore(t);
    store.setExternal("todo.casa", "Trocar resistência", "Eletricista");
    store.setAppPrefs({ ext_off: true, notes_off: true });
    assert.deepEqual(store.prefs.app, { ext_off: true, notes_off: true });
    assert.equal(store.externalFor("todo.casa", "trocar resistencia"), "Eletricista", "turning it off keeps who does each task");
    store.setAppPrefs({ ext_off: "sim", notes_off: 1 });
    assert.deepEqual(store.prefs.app, { ext_off: true, notes_off: true }, "only booleans");
    store.setAppPrefs({ ext_off: null, notes_off: null });
    assert.deepEqual(store.prefs.app, {});
  });

  it("2.60.0: app prefs: Agora › Ordem dos cards, each person their order (short ids, no repeats; empty or null = unset)", (t) => {
    const { store } = newStore(t);
    store.setAppPrefs({ now_order: { "u-ana": ["start", "late", "start"], "u-beto": [], "u-caio": ["Bad Id"], "": ["shopping"] } });
    assert.deepEqual(store.prefs.app, { now_order: { "u-ana": ["start", "late"], "": ["shopping"] } });
    assert.throws(() => store.setAppPrefs({ now_order: ["late"] }), /now_order must be an object/);
    store.setAppPrefs({ now_order: { "u-beto": [] } });
    assert.deepEqual(store.prefs.app, {}, "nothing left: unset");
    store.setAppPrefs({ now_order: { "u-ana": ["late"] } });
    store.setAppPrefs({ now_order: null });
    assert.deepEqual(store.prefs.app, {});
  });

  it("app prefs: Cor do dia (on by default; false turns it off, null back on)", (t) => {
    const { store } = newStore(t);
    store.setAppPrefs({ accent: "azul", accent_daily: false });
    assert.deepEqual(store.prefs.app, { accent: "azul", accent_daily: false });
    store.setAppPrefs({ accent_daily: null });
    assert.deepEqual(store.prefs.app, { accent: "azul" });
  });

  it("app prefs: an invalid AI or voice engine falls back to the default (removed)", (t) => {
    const { store } = newStore(t);
    store.setAppPrefs({ ai_entity: "ai_task.google_ai_task", voice_engine: "stt.faster_whisper" });
    store.setAppPrefs({ ai_entity: "conversation.openai", voice_engine: "STT Bad" });
    assert.equal("ai_entity" in store.prefs.app, false);
    assert.equal("voice_engine" in store.prefs.app, false);
  });

  it("app prefs: list_order must be a list of text", (t) => {
    const { store } = newStore(t);
    store.setAppPrefs({ list_order: ["todo.b", "todo.a"] });
    assert.deepEqual(store.prefs.app.list_order, ["todo.b", "todo.a"]);
    assert.throws(() => store.setAppPrefs({ list_order: ["todo.a", 3] }), /list of text/);
    assert.throws(() => store.setAppPrefs({ list_order: "todo.a" }), /list of text/);
  });

  it("Store.clean keeps null (meaning: remove) and coerces booleans", () => {
    assert.deepEqual(Store.clean({ hidden: null, dates_info: "x", name: null }, { hidden: ["boolean"], dates_info: ["boolean"], name: ["string", 5] }), { hidden: null, dates_info: true, name: null });
    assert.deepEqual(Store.clean({ name: "  abcdefgh " }, { name: ["string", 5] }), { name: "abcde" });
  });

  it("Store.merge removes null and '' but keeps false and 0", () => {
    assert.deepEqual(Store.merge({ a: 1, b: 2, c: 3 }, { a: null, b: "", d: false, e: 0 }), { c: 3, d: false, e: 0 });
  });
});

describe("Store: saving and versions", () => {
  it("saves 400 ms after the last change (debounced), atomically", (t) => {
    const { store, dir } = newStore(t);
    const flush = t.mock.method(store, "flush");
    store.setPoints("todo.casa", "A", 1);
    t.mock.timers.tick(300);
    store.setPoints("todo.casa", "B", 2);
    t.mock.timers.tick(399);
    assert.equal(flush.mock.callCount(), 0);
    t.mock.timers.tick(1);
    assert.equal(flush.mock.callCount(), 1);
    const disk = JSON.parse(fs.readFileSync(path.join(dir, "resolvia.json"), "utf8"));
    assert.deepEqual(disk.points, { "todo.casa": { a: 1, b: 2 } });
    assert.equal(fs.existsSync(path.join(dir, "resolvia.json.tmp")), false);
  });

  it("the first save makes no version (nothing on disk yet); later saves keep a copy at most every 10 minutes", (t) => {
    const { store, versions, dir } = newStore(t, { now: local(2026, 11, 2, 9, 0, 0) });
    store.setPoints("todo.casa", "A", 1);
    store.flush();
    assert.deepEqual(versions(), []);
    t.mock.timers.tick(60_000);
    store.setPoints("todo.casa", "B", 2);
    store.flush();
    assert.deepEqual(versions(), ["resolvia-20261102-090100000-auto.json"]);
    // the copy is the file as it was before this save
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, "versoes", versions()[0]), "utf8")).points, { "todo.casa": { a: 1 } });
    t.mock.timers.tick(9 * 60_000);
    store.flush();
    assert.equal(versions().length, 1, "less than 10 minutes since the last copy");
    t.mock.timers.tick(60_000);
    store.flush();
    assert.deepEqual(versions(), ["resolvia-20261102-090100000-auto.json", "resolvia-20261102-091100000-auto.json"]);
  });

  it("version names use the local time (TZ) and the reason", (t) => {
    const { store, versions } = newStore(t, { now: new Date(Date.UTC(2026, 0, 1, 2, 3, 4)) });
    store.flush();
    assert.equal(store.version("teste", true), "resolvia-20251231-230304000-teste.json");
    assert.deepEqual(versions(), ["resolvia-20251231-230304000-teste.json"]);
  });

  it("keeps only the 3 newest versions and leaves other files alone", (t) => {
    const { store, versions, dir } = newStore(t, { now: local(2026, 11, 2, 8, 0, 0) });
    store.flush();
    fs.mkdirSync(path.join(dir, "versoes"), { recursive: true });
    fs.writeFileSync(path.join(dir, "versoes", "LEIA.txt"), "x");
    for (let i = 0; i < 5; i++) {
      t.mock.timers.tick(1000);
      store.version("manual", true);
    }
    assert.deepEqual(versions(), ["LEIA.txt", "resolvia-20261102-080003000-manual.json", "resolvia-20261102-080004000-manual.json", "resolvia-20261102-080005000-manual.json"]);
  });

  it(
    "two safety copies in the same second do not overwrite each other (a double-clicked 'Restaurar')",
    (t) => {
      const { store, dir, versions } = newStore(t, { now: local(2026, 11, 2, 10, 0, 0) });
      store.setListPrefs("todo.casa", { name: "Original" });
      store.flush();
      store.replaceAll({ prefs: { lists: { "todo.casa": { name: "Do backup" } } } }, "antes-de-restaurar");
      t.mock.timers.tick(200);
      store.replaceAll({ prefs: { lists: { "todo.casa": { name: "Do backup" } } } }, "antes-de-restaurar");
      const names = versions();
      assert.equal(names.length, 2, names.join(", "));
      const contents = names.map((n) => JSON.parse(fs.readFileSync(path.join(dir, "versoes", n), "utf8")).prefs.lists["todo.casa"].name);
      assert.ok(contents.includes("Original"), "the copy of the original data survives");
    },
  );

  it("two copies in the very same millisecond: the second one is named a millisecond later, none is lost", (t) => {
    const { store, versions } = newStore(t, { now: local(2026, 11, 2, 10, 0, 0) });
    store.flush();
    assert.equal(store.version("antes-de-restaurar", true), "resolvia-20261102-100000000-antes-de-restaurar.json");
    assert.equal(store.version("antes-de-restaurar", true), "resolvia-20261102-100000001-antes-de-restaurar.json");
    assert.equal(store.version("antes-de-restaurar", true), "resolvia-20261102-100000002-antes-de-restaurar.json");
    assert.equal(versions().length, 3);
  });

  it("version() without a file returns null", (t) => {
    const { store } = newStore(t);
    assert.equal(store.version("x", true), null);
  });

  it("logs (and survives) a version that cannot be written", (t) => {
    const { store, dir, log } = newStore(t);
    store.flush();
    fs.writeFileSync(path.join(dir, "versoes"), "a file where the folder should be");
    assert.equal(store.version("x", true), null);
    assert.match(log.of("warn")[0], /Não consegui guardar uma versão/);
  });

  it("logs (and survives) a file that cannot be saved", (t) => {
    const { store, dir, log } = newStore(t);
    fs.mkdirSync(path.join(dir, "resolvia.json.tmp"));
    store.flush();
    assert.equal(log.of("error").length, 1);
    assert.match(log.of("error")[0], /Could not save/);
  });

  it("replaceAll: keeps a copy of what was there (pending changes included) and saves the cleaned data", (t) => {
    const { store, versions, dir, onDisk } = newStore(t, { now: local(2026, 11, 2, 10, 0, 0) });
    store.setPoints("todo.casa", "A", 1);
    store.flush();
    store.setRoom("todo.casa", "A", "sala"); // still waiting for the 400 ms
    const out = store.replaceAll({ prefs: { lists: { "todo.novo": { name: " Novo ", junk: 1 } } }, rooms: { "todo.novo": { "Tarefa X": "quarto" } }, equips: { "todo.novo": { "Tarefa X": "cama_1" } } }, "antes-de-importar");
    assert.deepEqual(out.prefs.lists, { "todo.novo": { name: "Novo" } });
    assert.deepEqual(versions(), ["resolvia-20261102-100000000-antes-de-importar.json"]);
    const before = JSON.parse(fs.readFileSync(path.join(dir, "versoes", versions()[0]), "utf8"));
    assert.deepEqual(before.rooms, { "todo.casa": { a: "sala" } }, "the copy has the change that was not saved yet");
    const disk = onDisk();
    assert.deepEqual(disk.points, {});
    assert.deepEqual(disk.rooms, { "todo.novo": { "tarefa x": "quarto" } });
    assert.deepEqual(disk.equips, { "todo.novo": { "tarefa x": "cama_1" } });
    assert.equal(store.timer, null);
  });

  it("replaceAll on a fresh install works without a previous file", (t) => {
    const { store, versions, onDisk } = newStore(t);
    store.replaceAll({ points: { "todo.casa": { X: 3 } } }, "antes-de-restaurar");
    assert.deepEqual(versions(), []);
    assert.deepEqual(onDisk().points, { "todo.casa": { x: 3 } });
  });

  it("trimVersions without a versions folder does nothing", (t) => {
    const { store } = newStore(t);
    assert.doesNotThrow(() => store.trimVersions());
  });
});

describe("Store: Começar do zero (2.53.0)", () => {
  it("what the app keeps of the tasks goes; the settings stay; a copy first, in Versões anteriores", (t) => {
    const { store, onDisk, versions, dir } = newStore(t, { now: local(2026, 11, 9, 10, 0, 0) });
    store.setListPrefs("todo.casa", { name: "Casa da Ana", color: "menta" });
    store.setAppPrefs({ accent: "rosa", points_on: true });
    store.setPoints("todo.casa", "Lavar a louça", 10);
    store.setPoints("todo.casa", "Varrer", 5);
    store.setRoom("todo.casa", "Varrer", "sala");
    store.setEquip("todo.casa", "Trocar filtro", ["filtro_1"]);
    store.setExternal("todo.casa", "Pintar a parede", "Pintor");
    store.data.rules.r1 = { id: "r1", entity_id: "todo.casa", summary: "Varrer", days: 7 };
    store.flush();
    const out = store.erase();
    assert.deepEqual(out, { rules: 1, points: 2, rooms: 1, equips: 1, ext: 1, dues: 0 });
    const d = onDisk();
    assert.deepEqual([d.rules, d.points, d.rooms, d.equips, d.ext], [{}, {}, {}, {}, {}]);
    assert.equal(d.prefs.lists["todo.casa"].name, "Casa da Ana");
    assert.equal(d.prefs.app.accent, "rosa");
    assert.deepEqual([store.rules, store.points], [{}, {}]);
    const v = versions();
    assert.deepEqual(v, ["resolvia-20261109-100000000-antes-de-apagar.json"]);
    const copy = JSON.parse(fs.readFileSync(path.join(dir, "versoes", v[0]), "utf8"));
    assert.equal(copy.points["todo.casa"]["lavar a louca"], 10, "the copy has what was erased");
    assert.deepEqual(store.erase(), { rules: 0, points: 0, rooms: 0, equips: 0, ext: 0, dues: 0 }, "nothing more to erase");
  });
});

describe("Store: the deadlines of the app (2.58.0, the lists that take no date)", () => {
  it("by the name of the task; a rename takes it along; a task no longer open loses it; checked on loading", () => {
    const store = new Store(tmpDir(), fakeLog());
    const L = "todo.notas_e_rotinas_do_alexa_shopping_list";
    assert.equal(store.setDue(L, "  Pilhas AA ", "2026-12-01"), "2026-12-01");
    assert.equal(store.dueFor(L, "pilhas aa"), "2026-12-01");
    assert.equal(store.setDue(L, "Pilhas AA", "2026-12-02 15:00:00"), "2026-12-02T15:00:00", "with a time");
    store.renameDue(L, "Pilhas AA", "Pilhas AAA");
    assert.deepEqual(store.dues[L], { "pilhas aaa": "2026-12-02T15:00:00" });
    store.setDue(L, "Detergente", "2026-12-10");
    assert.equal(store.dropDues(L, new Set(["detergente"])), 1, "Pilhas AAA is done");
    assert.deepEqual(store.dues[L], { detergente: "2026-12-10" });
    assert.equal(store.dropDues(L, new Set(["detergente"])), 0);
    assert.equal(store.dropDues("todo.outra", new Set()), 0);
    assert.equal(store.setDue(L, "Detergente", null), null);
    assert.deepEqual(store.dues, {}, "the last one gone: the list goes too");
    store.setDue(L, "Sabão", "nada");
    assert.deepEqual(store.dues, {}, "not a date: nothing");
    assert.throws(() => store.setDue("light.x", "Sabão", "2026-12-01"), /to-do/);
    assert.throws(() => store.setDue(L, "  ", "2026-12-01"), /name/);
    assert.deepEqual(normalize({ dues: { [L]: { "Sabão  em pó": "2026-12-01", x: "2026-02-31x", y: 3 }, "light.x": { a: "2026-12-01" }, "todo.z": "x" } }).dues, { [L]: { "sabao em po": "2026-12-01" } });
  });
});
