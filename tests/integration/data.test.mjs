// Dados: exports (JSON, CSV, ZIP), backups in share/resolvia, restore, versions and
// import, through the real server. The items live in the fake Home Assistant.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Stack, waitFor, items, rawPost, APP_VERSION } from "./_harness.mjs";
import { readZip } from "../../resolvia/rootfs/app/lib/zip.js";

const CASA = "todo.casa";
const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const svc = (service, service_data, entity_id = CASA) => ({ domain: "todo", service, service_data, target: { entity_id } });
const STAMP = /^attachment; filename="resolvia-\d{4}-\d{2}-\d{2}-\d{4}\.(json|csv|zip)"$/;

let stack;
let c;
before(async () => {
  stack = await new Stack().start();
  c = await stack.client();
  // what a family would have set
  await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { name: "Minha Casa", color: "menta", icon: "house" } });
  await c.call("resolvia/prefs/set_app", { prefs: { points_on: true, rooms_on: true, equips_on: true, accent: "rosa" } });
  await c.call("resolvia/points/set", { entity_id: CASA, summary: "Passar pano na casa", points: 10 });
  await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "Passar pano na casa", room: "sala" });
  await c.call("resolvia/equips/set", { entity_id: CASA, summary: "Passar pano na casa", equip: "mop_1" });
  const task = (await items(c, CASA)).find((i) => i.summary === "Passar pano na casa");
  await c.call("resolvia/recurring/set", { entity_id: CASA, uid: task.uid, summary: task.summary, days: 7 });
  await c.call("call_service", svc("add_item", { item: "Consertar a porta", description: "Dobradiça; parafuso", due_date: "2026-12-10" }));
});
after(() => stack && stack.stop());

const get = (url) => fetch(`${stack.appUrl}${url}`);
const importFile = async (body, name, { raw = false } = {}) => {
  const res = await fetch(`${stack.appUrl}/api/import`, { method: "POST", body, headers: name ? { "x-file-name": raw ? name : encodeURIComponent(name) } : {} });
  return { status: res.status, body: await res.json() };
};

describe("exports", () => {
  let snap;

  it("JSON: everything, with each list and its items", async () => {
    const res = await get("/api/export/json");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-disposition"), STAMP);
    assert.equal(res.headers.get("cache-control"), "no-store");
    snap = await res.json();
    assert.equal(snap.app_name, "ResolvIA");
    assert.equal(snap.app_version, APP_VERSION);
    assert.deepEqual(snap.prefs.lists[CASA], { name: "Minha Casa", color: "menta", icon: "house" });
    assert.deepEqual(snap.points, { [CASA]: { "passar pano na casa": 10 } });
    assert.deepEqual(snap.rooms, { [CASA]: { "passar pano na casa": "sala" } });
    assert.deepEqual(snap.equips, { [CASA]: { "passar pano na casa": "mop_1" } });
    assert.equal(Object.values(snap.rules).length, 1);
    assert.equal(snap.lists.length, 4);
    const casa = snap.lists.find((l) => l.entity_id === CASA);
    assert.equal(casa.name, "Minha Casa");
    assert.equal(casa.ha_name, "Casa");
    assert.deepEqual(casa.items.find((i) => i.summary === "Consertar a porta"), { uid: casa.items.find((i) => i.summary === "Consertar a porta").uid, summary: "Consertar a porta", status: "needs_action", due: "2026-12-10", description: "Dobradiça; parafuso" });
    assert.deepEqual(snap.lists.map((l) => l.name), [...snap.lists.map((l) => l.name)].sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true })), "sorted by name");
  });

  it("CSV: one row per item, for Excel", async () => {
    const res = await get("/api/export/csv");
    assert.match(res.headers.get("content-type"), /text\/csv/);
    assert.match(res.headers.get("content-disposition"), STAMP);
    const text = Buffer.from(await res.arrayBuffer()).toString("utf8");
    assert.ok(text.startsWith("﻿Lista;Item;Situação;Prazo;Notas;Repete;Pontos\r\n"));
    assert.match(text, /\r\nMinha Casa;Passar pano na casa;pendente;;;7 dias depois de concluir;10\r\n/);
    assert.match(text, /\r\nMinha Casa;Consertar a porta;pendente;10\/12\/2026;"Dobradiça; parafuso";;\r\n/);
    assert.match(text, /;Arroz;concluído;/);
  });

  it("ZIP: the JSON, the CSV, a checklist per list and a read-me", async () => {
    const res = await get("/api/export/zip");
    assert.equal(res.headers.get("content-type"), "application/zip");
    const files = readZip(Buffer.from(await res.arrayBuffer()));
    const names = files.map((f) => f.name);
    assert.deepEqual(names.slice(0, 2), ["resolvia.json", "resolvia.csv"]);
    assert.ok(names.includes("listas/Minha Casa.md"));
    assert.equal(names.at(-1), "LEIA-ME.txt");
    const md = files.find((f) => f.name === "listas/Minha Casa.md").data.toString();
    assert.match(md, /^# Minha Casa\n\n/);
    assert.match(md, /- \[ \] Consertar a porta \(prazo 10\/12\/2026\)\n {6}Dobradiça; parafuso/);
    const json = JSON.parse(files[0].data.toString());
    assert.deepEqual(json.rooms, snap.rooms);
  });

  it("other formats are not served", async () => {
    assert.equal((await get("/api/export/xml")).status, 404);
    assert.equal((await fetch(`${stack.appUrl}/api/export/json`, { method: "POST" })).status, 404);
  });
});

describe("backups in share/resolvia and restore", () => {
  let backup;

  it("creates a backup in the share folder and lists it", async () => {
    backup = await c.call("resolvia/backups/create");
    assert.match(backup.name, /^resolvia-\d{4}-\d{2}-\d{2}-\d{4}\.zip$/);
    assert.equal(backup.folder, "share/resolvia");
    assert.ok(fs.existsSync(path.join(stack.dirs.share, "resolvia", backup.name)));
    const second = await c.call("resolvia/backups/create");
    assert.notEqual(second.name, backup.name, "a second backup in the same minute does not overwrite");
    const list = await c.call("resolvia/backups/list");
    assert.equal(list.available, true);
    assert.deepEqual(list.backups.map((b) => b.name).sort(), [backup.name, second.name].sort());
    assert.ok(list.backups.every((b) => b.size > 500));
  });

  it("restoring brings back the app data and the pending item that was deleted", async () => {
    // things change after the backup
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { color: "azul" } });
    await c.call("resolvia/points/set", { entity_id: CASA, summary: "Passar pano na casa", points: 0 });
    await c.call("resolvia/rooms/set", { entity_id: CASA, summary: "Passar pano na casa", room: null });
    const task = (await items(c, CASA)).find((i) => i.summary === "Passar pano na casa");
    await c.call("call_service", svc("remove_item", { item: [task.uid] }));
    await stack.app.waitLine(/Repetição removida \(item apagado\): "Passar pano na casa"/);

    const out = await c.call("resolvia/backups/restore", { name: backup.name });
    assert.deepEqual(out, { lists: 1, rules: 1, added: 1, unsupported: 0, failed: 0, missing: [], moved: 0 });
    assert.equal((await c.call("resolvia/prefs/get")).lists[CASA].color, "menta");
    assert.equal((await c.call("resolvia/points/get")).points[CASA]["passar pano na casa"], 10);
    const r = await c.call("resolvia/rooms/get");
    assert.equal(r.map[CASA]["passar pano na casa"], "sala");
    assert.equal(r.emap[CASA]["passar pano na casa"], "mop_1");
    const back = await waitFor(async () => (await items(c, CASA)).find((i) => i.summary === "Passar pano na casa"), { what: "item re-added" });
    assert.notEqual(back.uid, task.uid, "a new item");
    // the repetition binds to the new item
    const rules = await c.subscribe("resolvia/recurring/subscribe");
    await waitFor(() => rules.events.length && rules.events.at(-1).rules[0]?.uid === back.uid, { what: "rule bound to the new item" });
    assert.equal(rules.events.at(-1).rules[0].days, 7);
  });

  it("restoring again adds nothing twice", async () => {
    const out = await c.call("resolvia/backups/restore", { name: backup.name });
    assert.equal(out.added, 0);
    assert.equal((await items(c, CASA)).filter((i) => i.summary === "Passar pano na casa").length, 1);
  });

  it("refuses names that are not backups, and ones that are gone", async () => {
    await assert.rejects(c.call("resolvia/backups/restore", { name: "../data/resolvia.json" }), { code: "invalid_format" });
    await assert.rejects(c.call("resolvia/backups/restore", { name: "resolvia-nao-existe.zip" }), { code: "not_found" });
  });
});

describe("versions (Versões anteriores)", () => {
  it("each restore keeps a copy of what was there; restoring a version brings back only the app data", async () => {
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { color: "ouro" } });
    const backup = (await c.call("resolvia/backups/list")).backups[0].name;
    await c.call("resolvia/backups/restore", { name: backup });
    assert.equal((await c.call("resolvia/prefs/get")).lists[CASA].color, "menta");
    const versions = await c.call("resolvia/versions/list");
    assert.ok(versions.length >= 1 && versions.length <= 3, `${versions.length} versions (only the 3 newest are kept)`);
    const v = versions[0];
    assert.equal(v.reason, "antes-de-restaurar");
    assert.ok(Math.abs(Date.now() - v.when) < 120_000);
    assert.equal(v.lists, 1);
    const itemsBefore = (await items(c, CASA)).length;
    const out = await c.call("resolvia/versions/restore", { name: v.name });
    assert.equal(out.added, 0);
    assert.equal((await c.call("resolvia/prefs/get")).lists[CASA].color, "ouro", "the color from before the restore");
    assert.equal((await items(c, CASA)).length, itemsBefore, "versions do not touch the items");
    await assert.rejects(c.call("resolvia/versions/restore", { name: "../resolvia.json" }), { code: "invalid_format" });
    await assert.rejects(c.call("resolvia/versions/restore", { name: "resolvia-20000101-000000-auto.json" }), { code: "not_found" });
  });
});

describe("Começar do zero (2.53.0)", () => {
  it("the data of the tasks go, the settings and the items stay, with a copy in Versões anteriores that brings them back", async () => {
    // besides what the family set (points, room, equipment and the repetition of Passar pano), who does another one
    await c.call("resolvia/external/set", { entity_id: CASA, summary: "Trocar filtro do ar", value: "Técnico" });
    const sub = await c.subscribe("resolvia/recurring/subscribe");
    const before = { prefs: await c.call("resolvia/prefs/get"), items: (await items(c, CASA)).length };
    const out = await c.call("resolvia/data/erase");
    assert.ok(out.rules >= 1 && out.points >= 1 && out.rooms >= 1 && out.equips >= 1 && out.ext >= 1, JSON.stringify(out));
    assert.deepEqual((await c.call("resolvia/points/get")).points[CASA] || {}, {});
    assert.deepEqual((await c.call("resolvia/external/get")).ext, {});
    await waitFor(() => sub.events.length && sub.events.at(-1).rules.length === 0, { what: "the screens see no repetitions" });
    assert.deepEqual(await c.call("resolvia/prefs/get"), before.prefs, "the settings stay");
    assert.equal((await items(c, CASA)).length, before.items, "the items stay in Home Assistant");
    const v = (await c.call("resolvia/versions/list"))[0];
    assert.equal(v.reason, "antes-de-apagar");
    await c.call("resolvia/versions/restore", { name: v.name });
    assert.equal((await c.call("resolvia/external/get")).ext[CASA]["trocar filtro do ar"], "Técnico", "the copy brings them back");
  });
});

describe("import (Importar backup)", () => {
  it("a backup .zip from another Home Assistant finds the lists by name and moves rooms, equipment and points", async () => {
    const exported = await (await get("/api/export/json")).json();
    // the same family on another Home Assistant: other entity ids
    const moved = (id) => (id === CASA ? "todo.casa_antiga" : id);
    const file = {
      ...exported,
      prefs: { ...exported.prefs, lists: Object.fromEntries(Object.entries(exported.prefs.lists).map(([k, v]) => [moved(k), { ...v, color: "lilas" }])) },
      points: { "todo.casa_antiga": { "passar pano na casa": 30 } },
      rooms: { "todo.casa_antiga": { "passar pano na casa": "cozinha" } },
      equips: { "todo.casa_antiga": { "passar pano na casa": "vassoura_1" } },
      rules: Object.fromEntries(Object.entries(exported.rules).map(([k, r]) => [k, { ...r, entity_id: moved(r.entity_id) }])),
      lists: exported.lists.map((l) => ({ ...l, entity_id: moved(l.entity_id), items: l.entity_id === CASA ? [...l.items, { uid: "x1", summary: "Trocar o chuveiro", status: "needs_action" }] : l.items })),
    };
    const { makeZip } = await import("../../resolvia/rootfs/app/lib/zip.js");
    const zip = makeZip([{ name: "Backup ResolvIA/resolvia.json", data: JSON.stringify(file) }]);
    const out = await importFile(zip, "Backup da família.zip");
    assert.equal(out.status, 200, JSON.stringify(out.body));
    assert.deepEqual(out.body, { lists: 1, rules: 1, added: 1, unsupported: 0, failed: 0, missing: [], moved: 1 });
    assert.equal((await c.call("resolvia/prefs/get")).lists[CASA].color, "lilas");
    assert.equal((await c.call("resolvia/points/get")).points[CASA]["passar pano na casa"], 30);
    const r = await c.call("resolvia/rooms/get");
    assert.deepEqual([r.map[CASA]["passar pano na casa"], r.emap[CASA]["passar pano na casa"]], ["cozinha", "vassoura_1"]);
    assert.ok((await items(c, CASA)).some((i) => i.summary === "Trocar o chuveiro"));
    const versions = await c.call("resolvia/versions/list");
    assert.ok(versions.some((v) => v.reason === "antes-de-importar"), JSON.stringify(versions.map((v) => v.name)));
  });

  it("a plain .json works too; a list that does not exist here is reported", async () => {
    const out = await importFile(JSON.stringify({ prefs: { app: { accent: "azul" } }, lists: [{ entity_id: "todo.trabalho", name: "Trabalho", items: [{ summary: "Relatório", status: "needs_action" }] }] }), "resolvia.json");
    assert.equal(out.status, 200);
    assert.deepEqual(out.body.missing, ["Trabalho"]);
    assert.equal(out.body.added, 0);
    assert.equal((await c.call("resolvia/prefs/get")).app.accent, "azul");
  });

  it("files that are not backups are refused with a reason, changing nothing", async () => {
    const before = await c.call("resolvia/prefs/get");
    let r = await importFile("isso não é json", "notas.txt");
    assert.deepEqual([r.status, r.body.code], [400, "invalid_format"]);
    r = await importFile(JSON.stringify({ foo: 1 }), "x.json");
    assert.deepEqual([r.status, r.body.code, r.body.error], [400, "invalid_format", "Esse .json não é do ResolvIA."]);
    r = await importFile("PK not really", "backup.zip");
    assert.equal(r.status, 400);
    assert.match(r.body.error, /\.zip/);
    r = await importFile("{}", "%E0%A4%A", { raw: true });
    assert.deepEqual([r.status, r.body.code], [400, "invalid_format"]);
    assert.deepEqual(await c.call("resolvia/prefs/get"), before);
  });

  it("a file name header that cannot be decoded is ignored (the content decides)", async () => {
    const r = await importFile(JSON.stringify({ prefs: { app: { accent: "coral" } } }), "%E0%A4%A.json", { raw: true });
    assert.equal(r.status, 200);
    assert.equal((await c.call("resolvia/prefs/get")).app.accent, "coral");
  });

  it(
    "a file over 30 MB is refused with 413 'Arquivo grande demais' (every time)",
    async () => {
      const got = [];
      for (let i = 0; i < 4; i++) got.push(await rawPost(stack, "/api/import", 31 * 1024 * 1024, { "x-file-name": "grande.zip" }));
      assert.deepEqual(got, Array(4).fill('HTTP 413 {"error":"Arquivo grande demais"}'));
    },
  );
});

describe("without a usable share folder", () => {
  let other;
  let oc;
  before(async () => {
    other = new Stack();
    other.writeShare("resolvia", "a file where the app's folder should be");
    await other.start();
    oc = await other.client();
  });
  after(() => other && other.stop());

  it("backups say the folder is not available; the integration file warns once", async () => {
    assert.deepEqual(await oc.call("resolvia/backups/list"), { available: false, folder: "share/resolvia", backups: [] });
    await assert.rejects(oc.call("resolvia/backups/create"), { code: "no_share" });
    await oc.call("resolvia/prefs/set_app", { prefs: { due_off: true } });
    await oc.call("resolvia/prefs/set_app", { prefs: { due_off: false } });
    await other.app.waitLine(/Não consegui gravar share\/resolvia\/integracao\.json/);
    assert.equal(other.app.count(/Não consegui gravar share\/resolvia\/integracao\.json/), 1, "not repeated on every change");
    const res = await fetch(`${other.appUrl}/api/export/json`);
    assert.equal(res.status, 200, "the downloads still work");
  });
});

describe("Mais › Relatório de pendências (2.45.0)", () => {
  it("the page of the server: the marked lists, the tasks with what is on, in the theme and color of the app", async () => {
    // the restore tests above put the data back: set what this one needs
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { name: "Minha Casa" } });
    await c.call("resolvia/prefs/set_app", { prefs: { points_on: true } });
    await c.call("resolvia/points/set", { entity_id: CASA, summary: "Passar pano na casa", points: 10 });
    const task = (await items(c, CASA)).find((i) => i.summary === "Passar pano na casa");
    await c.call("resolvia/recurring/set", { entity_id: CASA, uid: task.uid, summary: task.summary, days: 7 });
    const res = await get("/relatorio?tema=claro&cor=%23ff5a4f");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type"), /^text\/html/);
    assert.equal(res.headers.get("cache-control"), "no-store");
    const html = await res.text();
    assert.match(html, /<html lang="pt-BR" data-theme="light">/);
    assert.match(html, /--a:#ff5a4f/);
    assert.match(html, /<h1>Relatório de pendências<\/h1>/);
    assert.match(html, /<span>Minha Casa<\/span>/, "the name given in the ResolvIA");
    assert.match(html, /Passar pano na casa<small>repete toda semana[^<]*<\/small>/);
    assert.match(html, /\+10 pontos/);
    assert.match(html, /Consertar a porta/);
  });
  it("Baixar PDF (2.45.1): the same report as a file to download, the app Home Assistant opens it", async () => {
    const res = await get(`/relatorio.pdf?lista=${CASA}&cor=%23ff5a4f`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "application/pdf");
    assert.match(res.headers.get("content-disposition"), /^attachment; filename="pendencias-casa-\d{4}-\d{2}-\d{2}\.pdf"$/);
    const pdf = Buffer.from(await res.arrayBuffer()).toString("latin1");
    assert.ok(pdf.startsWith("%PDF-1.4") && pdf.trimEnd().endsWith("%%EOF"));
    assert.ok(pdf.includes("(Relat\\363rio de pend\\352ncias) Tj") && pdf.includes("(Minha Casa) Tj") && pdf.includes("(Passar pano na casa) Tj"));
    assert.ok(pdf.includes("1 0.353 0.31 rg"), "the color of the app");
  });
  it("one list: ?lista=", async () => {
    const html = await (await get(`/relatorio?lista=${CASA}`)).text();
    assert.match(html, /O que falta fazer na lista Minha Casa/);
    assert.equal((html.match(/<section>/g) || []).length, 1);
  });
  it("2.47.0: the lists with the names of the app (without the device in front), the charts and the mark of CorrerIA Code", async () => {
    const html = await (await get("/relatorio")).text();
    assert.match(html, /<span>Shopping list<\/span>/, "Notas e Rotinas do Alexa Shopping list, as in the app");
    assert.doesNotMatch(html, /<span>Notas e Rotinas do Alexa Shopping list<\/span>/);
    assert.match(html, /<section class="g"><h3>Por lista<\/h3>/);
    assert.match(html, /<b class="nome">Correr<i>IA<\/i> Code<\/b><small>desenvolvimento de softwares<\/small>/);
    const pdf = Buffer.from(await (await get("/relatorio.pdf")).arrayBuffer()).toString("latin1");
    assert.ok(pdf.includes("(Por lista) Tj") && pdf.includes("(DESENVOLVIMENTO DE SOFTWARES) Tj"));
  });
  it("2.46.0: a hidden list is not offered nor shown; the box opens in the look of the app", async () => {
    await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { hidden: true } });
    try {
      const html = await (await get(`/relatorio?lista=${CASA}`)).text();
      assert.doesNotMatch(html, /Minha Casa/, "neither in the box nor as the chosen list");
      assert.match(html, /<option value="" selected>Todas as listas marcadas<\/option>/);
      assert.match(html, /<script src="selectsheet.js"><\/script>/);
    } finally {
      await c.call("resolvia/prefs/set_list", { entity_id: CASA, prefs: { hidden: null } });
    }
    const js = await get("/selectsheet.js");
    assert.equal(js.status, 200);
    assert.match(js.headers.get("content-type"), /^text\/javascript/);
    assert.match(await js.text(), /__selectSheet/);
  });
});
