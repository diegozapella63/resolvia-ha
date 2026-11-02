import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { snapshot, toCSV, backupZip, parseImport, Backups, listVersions, readVersion, fileStamp, VERSION_RE } from "../resolvia/rootfs/app/lib/data.js";
import { makeZip, readZip } from "../resolvia/rootfs/app/lib/zip.js";
import { Store } from "../resolvia/rootfs/app/lib/store.js";
import { tmpDir, fakeLog, local } from "./_helpers.mjs";

const NOW = Date.UTC(2026, 10, 2, 12, 30, 0); // 09:30 in São Paulo

function sampleStore() {
  return {
    data: {
      prefs: { lists: { "todo.casa": { name: "Casa", color: "rosa" } }, app: { rooms_on: true, equips_on: true } },
      rules: {
        r1: { id: "r1", entity_id: "todo.casa", uid: "u1", match: null, summary: "Regar", days: 1 },
        r2: { id: "r2", entity_id: "todo.casa", uid: null, match: "Varrer a sala", summary: "Varrer a sala", days: 7 },
        r3: { id: "r3", entity_id: "todo.outra", uid: "u2", match: null, summary: "Pão", days: 2 },
      },
      points: { "todo.casa": { regar: 10, "lavar a louca": 5 } },
      rooms: { "todo.casa": { "lavar a louca": "cozinha" } },
      equips: { "todo.casa": { "lavar a louca": "pia_1" } },
    },
  };
}

const LISTS = [
  {
    entity_id: "todo.casa",
    name: "Casa",
    ha_name: "Casa",
    items: [
      { uid: "u1", summary: "Regar", status: "needs_action", due: "2026-11-03", extra: "x" },
      { uid: "u2", summary: "Lavar a Louça", status: "completed", description: "Com detergente; e esponja" },
      { uid: "u3", summary: "Varrer a sala", status: "needs_action", due: "2026-11-02T21:00:00Z" },
      { uid: "u4", summary: 'Comprar "pão"', status: "needs_action" },
    ],
  },
  { entity_id: "todo.outra", name: "Mercado", ha_name: "Shopping list", items: [{ uid: "u2", summary: "Pão", status: "needs_action" }] },
];

describe("snapshot", () => {
  it("has the app data, rooms and equipment, and each list with its items", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const snap = snapshot(sampleStore(), LISTS, "2.30.0");
    assert.equal(snap.app_name, "ResolvIA");
    assert.equal(snap.app_version, "2.30.0");
    assert.equal(snap.exported_at, "2026-11-02T12:30:00.000Z");
    assert.deepEqual(snap.rooms, { "todo.casa": { "lavar a louca": "cozinha" } });
    assert.deepEqual(snap.equips, { "todo.casa": { "lavar a louca": "pia_1" } });
    assert.deepEqual(snap.points, sampleStore().data.points);
    assert.deepEqual(snap.lists[0].items[0], { uid: "u1", summary: "Regar", status: "needs_action", due: "2026-11-03" }, "only the known fields");
    assert.deepEqual(snap.lists[0].items[1], { uid: "u2", summary: "Lavar a Louça", status: "completed", description: "Com detergente; e esponja" });
    assert.equal("ha_name" in snap.lists[0], false, "same name as in Home Assistant: not repeated");
    assert.equal(snap.lists[1].ha_name, "Shopping list");
  });

  it("works with a store from before rooms and equipment", () => {
    const store = sampleStore();
    delete store.data.rooms;
    delete store.data.equips;
    const snap = snapshot(store, [], "x");
    assert.deepEqual([snap.rooms, snap.equips, snap.lists], [{}, {}, []]);
  });
});

describe("toCSV", () => {
  const rows = (buf) => buf.toString("utf8").replace(/^﻿/, "").split("\r\n");

  it("starts with a BOM, uses ';' and CRLF, one row per item", () => {
    const buf = toCSV(snapshot(sampleStore(), LISTS, "x"));
    assert.equal(buf.subarray(0, 3).toString("hex"), "efbbbf");
    const r = rows(buf);
    assert.equal(r[0], "Lista;Item;Situação;Prazo;Notas;Repete;Pontos");
    assert.equal(r.length, 1 + 5 + 1, "header, 5 items, and the final empty line");
    assert.equal(r.at(-1), "");
  });

  it("writes status, deadline, notes, repetition and points of each item", () => {
    const r = rows(toCSV(snapshot(sampleStore(), LISTS, "x")));
    assert.equal(r[1], "Casa;Regar;pendente;03/11/2026;;1 dia depois de concluir;10");
    assert.equal(r[2], 'Casa;Lavar a Louça;concluído;;"Com detergente; e esponja";;5', "points by the folded name; ';' quoted");
    assert.equal(r[3], "Casa;Varrer a sala;pendente;02/11/2026 18:00;;7 dias depois de concluir;", "local time; a rule by name");
    assert.equal(r[4], 'Casa;"Comprar ""pão""";pendente;;;;', "quotes doubled");
    assert.equal(r[5], "Mercado;Pão;pendente;;;2 dias depois de concluir;", "the rule of that list only");
  });

  it("quotes line breaks and keeps an unreadable deadline as it is", () => {
    const snap = { lists: [{ name: "L", entity_id: "todo.l", items: [{ summary: "a\nb", status: "needs_action", due: "amanhã" }] }] };
    assert.equal(rows(toCSV(snap))[1], 'L;"a\nb";pendente;amanhã;;;'.replace("\n", "\n"));
  });
});

describe("backupZip", () => {
  it("has the JSON, the CSV, one checklist per list and a read-me", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const snap = snapshot(sampleStore(), LISTS, "2.30.0");
    const files = readZip(backupZip(snap, "2.30.0"));
    assert.deepEqual(files.map((f) => f.name), ["resolvia.json", "resolvia.csv", "listas/Casa.md", "listas/Mercado.md", "LEIA-ME.txt"]);
    const get = (n) => files.find((f) => f.name === n).data.toString("utf8");
    assert.deepEqual(JSON.parse(get("resolvia.json")), JSON.parse(JSON.stringify(snap)));
    assert.ok(get("resolvia.csv").startsWith("﻿Lista;Item"));
    assert.equal(get("listas/Casa.md"), "# Casa\n\n- [ ] Regar (prazo 03/11/2026)\n- [x] Lavar a Louça\n      Com detergente; e esponja\n- [ ] Varrer a sala (prazo 02/11/2026 18:00)\n- [ ] Comprar \"pão\"\n");
    assert.match(get("LEIA-ME.txt"), /^Backup do ResolvIA 2\.30\.0 criado em 02\/11\/2026 09:30\.\n/);
  });

  it("indents every line of multi-line notes", () => {
    const snap = { lists: [{ name: "L", items: [{ summary: "a", status: "needs_action", description: "um\ndois" }] }] };
    const md = readZip(backupZip(snap, "x")).find((f) => f.name === "listas/L.md").data.toString();
    assert.equal(md, "# L\n\n- [ ] a\n      um\n      dois\n");
  });

  it("makes safe and distinct file names", () => {
    const names = ["Casa/Praia: 2?", "casa/praia: 2?", "CASA/PRAIA: 2?", "", "   ", "a".repeat(80), "Tab\there"];
    const snap = { lists: names.map((name) => ({ name, items: [] })) };
    const files = readZip(backupZip(snap, "x")).map((f) => f.name).filter((n) => n.startsWith("listas/"));
    assert.deepEqual(files, [
      "listas/Casa-Praia- 2-.md",
      "listas/casa-praia- 2- 2.md",
      "listas/CASA-PRAIA- 2- 3.md",
      "listas/Lista.md",
      "listas/Lista 2.md",
      `listas/${"a".repeat(60)}.md`,
      "listas/Tab-here.md",
    ]);
  });
});

describe("parseImport", () => {
  const snap = { app_name: "ResolvIA", prefs: { lists: {} }, rules: {}, lists: [], rooms: { "todo.casa": { a: "sala" } } };

  it("round trip: a backup .zip gives back the snapshot", () => {
    assert.deepEqual(parseImport(backupZip(snap, "x"), "resolvia-2026.zip"), snap);
    assert.deepEqual(parseImport(backupZip(snap, "x")), snap, "found by its first bytes, without a name");
  });

  it("reads a .json, with or without BOM", () => {
    assert.deepEqual(parseImport(Buffer.from(JSON.stringify(snap)), "a.json"), snap);
    assert.deepEqual(parseImport(Buffer.from("﻿" + JSON.stringify(snap))), snap);
  });

  it("finds resolvia.json inside a folder, skipping macOS leftovers", () => {
    const zip = makeZip([
      { name: "__MACOSX/backup/resolvia.json", data: "{bad" },
      { name: "backup/._resolvia.json", data: "{bad" },
      { name: "backup/outro.json", data: JSON.stringify({ prefs: { app: { x: 1 } } }) },
      { name: "backup/resolvia.json", data: JSON.stringify(snap) },
    ]);
    assert.deepEqual(parseImport(zip, "Backup.ZIP"), snap);
  });

  it("falls back to any .json in the zip", () => {
    const zip = makeZip([{ name: "export.json", data: JSON.stringify({ rules: [] }) }]);
    assert.deepEqual(parseImport(zip), { rules: [] });
  });

  it("explains what is wrong with the file", () => {
    assert.throws(() => parseImport(makeZip([{ name: "a.txt", data: "x" }])), { code: "invalid_format", message: /não tem o arquivo resolvia\.json/ });
    assert.throws(() => parseImport(Buffer.from("{nope")), { code: "invalid_format", message: /nem um \.json válido/ });
    for (const raw of ["[]", "3", "null", '{"foo":1}', '"x"']) {
      assert.throws(() => parseImport(Buffer.from(raw)), { code: "invalid_format", message: /não é do ResolvIA/ }, raw);
    }
    assert.throws(() => parseImport(Buffer.from("not a zip"), "x.zip"), /não é um \.zip/);
  });

  it("accepts any file with prefs, lists or rules", () => {
    for (const raw of [{ prefs: {} }, { lists: [] }, { rules: {} }]) assert.deepEqual(parseImport(Buffer.from(JSON.stringify(raw))), raw);
  });
});

describe("Backups in the share folder", () => {
  const zip = () => backupZip({ prefs: { app: {} }, lists: [], rules: {} }, "x");

  it("saves with the date and time in the name, never overwriting", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const dir = path.join(tmpDir("resolvia-share-"), "resolvia");
    const b = new Backups({ dir });
    assert.deepEqual(b.save(zip()), { name: "resolvia-2026-11-02-0930.zip", folder: "share/resolvia" });
    assert.equal(b.save(zip()).name, "resolvia-2026-11-02-0930-2.zip");
    assert.equal(b.save(zip()).name, "resolvia-2026-11-02-0930-3.zip");
    assert.equal(fs.readdirSync(dir).length, 3);
  });

  it("lists only backups, newest first, with size", () => {
    const dir = tmpDir("resolvia-share-");
    const b = new Backups({ dir, folderLabel: "share/x" });
    for (const [name, at] of [["resolvia-a.zip", 1000], ["resolvia-b.zip", 3000], ["resolvia-c.zip", 2000], ["outro.zip", 9000], ["resolvia-x.json", 9000], ["resolvia-.zip", 9000]]) {
      fs.writeFileSync(path.join(dir, name), "12345");
      fs.utimesSync(path.join(dir, name), at, at);
    }
    const out = b.list();
    assert.equal(out.available, true);
    assert.equal(out.folder, "share/x");
    assert.deepEqual(out.backups.map((x) => x.name), ["resolvia-b.zip", "resolvia-c.zip", "resolvia-a.zip"]);
    assert.equal(out.backups[0].size, 5);
    assert.equal(out.backups[0].date, 3000 * 1000);
  });

  it("reads a backup back, refusing names outside the folder", () => {
    const dir = tmpDir("resolvia-share-");
    const b = new Backups({ dir });
    const snap = { prefs: { app: { accent: "rosa" } }, lists: [], rules: {} };
    fs.writeFileSync(path.join(dir, "resolvia-teste.zip"), backupZip(snap, "x"));
    assert.deepEqual(b.read("resolvia-teste.zip"), snap);
    for (const name of ["../resolvia-teste.zip", "resolvia-../../etc.zip", "outro.zip", "", null, undefined]) {
      assert.throws(() => b.read(name), { code: "invalid_format" }, String(name));
    }
    assert.throws(() => b.read("resolvia-sumiu.zip"), { code: "not_found" });
  });

  it("says when the share folder is not available", () => {
    const blocker = path.join(tmpDir(), "share-is-a-file");
    fs.writeFileSync(blocker, "x");
    const b = new Backups({ dir: path.join(blocker, "resolvia") });
    assert.equal(b.available(), false);
    assert.deepEqual(b.list(), { available: false, folder: "share/resolvia", backups: [] });
    assert.throws(() => b.save(zip()), { code: "no_share" });
  });

  it("fileStamp is local date and time to the minute", () => {
    assert.equal(fileStamp(local(2026, 1, 5, 7, 8, 59)), "2026-01-05-0708");
  });
});

describe("Versões anteriores", () => {
  const write = (dir, name, obj) => fs.writeFileSync(path.join(dir, name), typeof obj === "string" ? obj : JSON.stringify(obj));

  it("lists the copies newest first, with when, why and how much", () => {
    const dir = tmpDir("resolvia-versoes-");
    write(dir, "resolvia-20261102-093000-auto.json", { prefs: { lists: { "todo.a": {}, "todo.b": {} } }, rules: { r: {} } });
    write(dir, "resolvia-20261102-101500-antes-de-importar.json", { prefs: {}, rules: {} });
    write(dir, "resolvia-20261101-235959.json", {});
    write(dir, "resolvia-20261103-000000-quebrado.json", "{broken");
    write(dir, "outro.json", {});
    write(dir, "resolvia-2026-auto.json", {});
    assert.deepEqual(listVersions(dir), [
      { name: "resolvia-20261102-101500-antes-de-importar.json", when: local(2026, 11, 2, 10, 15, 0).getTime(), reason: "antes-de-importar", lists: 0, rules: 0 },
      { name: "resolvia-20261102-093000-auto.json", when: local(2026, 11, 2, 9, 30, 0).getTime(), reason: "auto", lists: 2, rules: 1 },
      { name: "resolvia-20261101-235959.json", when: local(2026, 11, 1, 23, 59, 59).getTime(), reason: "auto", lists: 0, rules: 0 },
    ]);
  });

  it(
    "copies made in the same second are listed newest first",
    (t) => {
      t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: local(2026, 11, 2, 9, 30, 0).getTime() });
      const store = new Store(tmpDir("resolvia-data-"), fakeLog());
      store.flush();
      store.version("antes-de-restaurar", true);
      t.mock.timers.tick(300);
      store.version("antes-de-importar", true);
      assert.deepEqual(listVersions(store.versionsDir).map((v) => v.reason), ["antes-de-importar", "antes-de-restaurar"]);
    },
  );

  it("no folder: no versions", () => {
    assert.deepEqual(listVersions(path.join(tmpDir(), "nada")), []);
  });

  it("reads a version, refusing other names", () => {
    const dir = tmpDir("resolvia-versoes-");
    write(dir, "resolvia-20261102-093000-auto.json", { prefs: { app: { accent: "azul" } } });
    assert.deepEqual(readVersion(dir, "resolvia-20261102-093000-auto.json"), { prefs: { app: { accent: "azul" } } });
    for (const name of ["../resolvia.json", "resolvia-20261102-093000-../../x.json", "x.json", null]) assert.throws(() => readVersion(dir, name), { code: "invalid_format" });
    assert.throws(() => readVersion(dir, "resolvia-20261102-093001-auto.json"), { code: "not_found" });
  });

  it("the copies the Store makes are the ones listed (same name format)", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: local(2026, 11, 2, 9, 30, 0).getTime() });
    const dir = tmpDir("resolvia-data-");
    const store = new Store(dir, fakeLog());
    store.setListPrefs("todo.casa", { name: "Casa" });
    store.flush();
    const name = store.version("antes-de-restaurar", true);
    assert.match(name, VERSION_RE);
    const [v] = listVersions(store.versionsDir);
    assert.deepEqual(v, { name, when: local(2026, 11, 2, 9, 30, 0).getTime(), reason: "antes-de-restaurar", lists: 1, rules: 0 });
    assert.deepEqual(readVersion(store.versionsDir, name).prefs.lists, { "todo.casa": { name: "Casa" } });
  });
});
