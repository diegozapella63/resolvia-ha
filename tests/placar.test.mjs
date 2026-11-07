import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Placar } from "../resolvia/rootfs/app/lib/placar.js";
import { tmpDir } from "./_helpers.mjs";

const NOW = Date.UTC(2026, 10, 2, 15, 0, 0);
const HOUR = 3_600_000;

function file(over = {}) {
  return {
    app: "CronologIA",
    versao: "1.40.0",
    gravado_em: new Date(NOW - 10 * 60_000).toISOString(),
    placar: { ativo: true, periodo: "quinzena", participantes: ["Ana", "José", "  ", 3, "P".repeat(50)], usuarios: { "user-ana": "Ana", "user-jose": "José", "user-x": "Fulano", "user-y": 7 } },
    espelho: {
      "todo.casa": { "uid-1": { pontos: 10, tipo: "rotina" }, "uid-2": { pontos: 5000, tipo: "outro" }, "uid-3": { pontos: -3 }, "uid-4": "x", ["u".repeat(400)]: { pontos: "7" } },
      "light.x": { a: { pontos: 1 } },
      "todo.Bad": { a: { pontos: 1 } },
    },
    ...over,
  };
}

function placar(content) {
  const dir = tmpDir("resolvia-share-");
  const write = (c) => {
    fs.mkdirSync(path.join(dir, "cronologia"), { recursive: true });
    fs.writeFileSync(path.join(dir, "cronologia", "integracao.json"), typeof c === "string" ? c : JSON.stringify(c));
  };
  if (content !== null) write(content);
  return { p: new Placar({ shareDir: dir }), write };
}

describe("Placar.read: the CronologIA scoreboard", () => {
  it("reads and cleans a fresh file", () => {
    const v = placar(file()).p.read(NOW);
    assert.deepEqual(v.participantes, ["Ana", "José", "P".repeat(40)]);
    assert.deepEqual(v.usuarios, { "user-ana": "Ana", "user-jose": "José" });
    assert.deepEqual(v.espelho, {
      "todo.casa": { "uid-1": { pontos: 10, tipo: "rotina" }, "uid-2": { pontos: 1000, tipo: "manutencao" }, "uid-3": { pontos: 0, tipo: "manutencao" }, ["u".repeat(300)]: { pontos: 7, tipo: "manutencao" } },
    });
    assert.deepEqual([v.versao, v.ativo, v.desligado, v.periodo], ["1.40.0", true, false, "quinzena"]);
  });

  it("donos_listas (1.53.0+): whose each list was there; none before", () => {
    assert.deepEqual(placar(file({ donos_listas: { "todo.casa": "Ana" } })).p.read(NOW).donos, { "todo.casa": "Ana" });
    assert.equal(placar(file()).p.read(NOW).donos, null);
    assert.equal(placar(file({ donos_listas: ["x"] })).p.read(NOW).donos, null);
  });

  it("celulares (1.53.1+): the phone of each person, only mobile apps", () => {
    assert.deepEqual(placar(file({ celulares: { Ana: "mobile_app_pixel_8", " Beto ": "mobile_app_galaxy", Cida: "notify.x", "": "mobile_app_y" } })).p.read(NOW).celulares, { Ana: "mobile_app_pixel_8", Beto: "mobile_app_galaxy" });
    assert.deepEqual(placar(file()).p.read(NOW).celulares, {});
  });

  it("no CronologIA: no file, broken file, another app, or a file older than 2 hours", () => {
    assert.equal(placar(null).p.read(NOW), null);
    assert.equal(placar("{broken").p.read(NOW), null);
    assert.equal(placar(file({ app: "EconomIA" })).p.read(NOW), null);
    assert.equal(placar(file({ gravado_em: "ontem" })).p.read(NOW), null);
    assert.equal(placar(file({ gravado_em: new Date(NOW - 2 * HOUR).toISOString() })).p.read(NOW), null);
    assert.ok(placar(file({ gravado_em: new Date(NOW - 2 * HOUR + 1000).toISOString() })).p.read(NOW));
  });

  it("active only with participants and the scoreboard on", () => {
    assert.equal(placar(file({ placar: { ativo: true, participantes: [] } })).p.read(NOW).ativo, false);
    assert.equal(placar(file({ placar: { ativo: false, participantes: ["Ana"] } })).p.read(NOW).ativo, false);
    const bare = placar(file({ placar: null, espelho: null, versao: undefined })).p.read(NOW);
    assert.deepEqual(bare, { versao: "", ativo: false, desligado: false, periodo: "semana", participantes: [], usuarios: {}, espelho: {}, donos: null, celulares: {} });
  });

  it("the CronologIA turned the ResolvIA off: no points and nothing mirrored", () => {
    const v = placar(file({ resolvia: false })).p.read(NOW);
    assert.equal(v.desligado, true);
    assert.equal(v.ativo, false);
    assert.deepEqual(v.espelho, {});
    assert.deepEqual(v.participantes, ["Ana", "José", "P".repeat(40)], "the people are still shown");
  });

  it("keeps what it read for 15 seconds", () => {
    const { p, write } = placar(file());
    assert.equal(p.read(NOW).periodo, "quinzena");
    write(file({ placar: { ativo: true, periodo: "mes", participantes: ["Ana"] } }));
    assert.equal(p.read(NOW + 14_999).periodo, "quinzena");
    assert.equal(p.read(NOW + 15_000).periodo, "mes");
  });

  it("caches 'no CronologIA' too, then notices it once installed", () => {
    const { p, write } = placar(null);
    assert.equal(p.read(NOW), null);
    write(file());
    assert.equal(p.read(NOW + 1000), null);
    assert.ok(p.read(NOW + 16_000));
  });
});

describe("Placar helpers (use the current time)", () => {
  it("view: the scoreboard without the user map and the mirror, plus who I am", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const { p } = placar(file());
    const v = p.view("user-jose");
    assert.equal(v.eu, "José");
    assert.equal("usuarios" in v, false);
    assert.equal("espelho" in v, false);
    assert.equal("donos" in v, false);
    assert.equal("celulares" in v, false);
    assert.equal(p.view("user-x").eu, null);
    assert.equal(p.view(null).eu, null);
    assert.equal(placar(null).p.view("user-ana"), null);
  });

  it("participant: finds a person ignoring case and accents", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const { p } = placar(file());
    assert.equal(p.participant("jose"), "José");
    assert.equal(p.participant("  ANA "), "Ana");
    assert.equal(p.participant("Maria"), null);
    assert.equal(p.participant(""), null);
    assert.equal(placar(file({ placar: { ativo: false, participantes: ["Ana"] } })).p.participant("Ana"), null, "scoreboard off");
  });

  it("mirrored: a task the CronologIA keeps here", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    const { p } = placar(file());
    assert.deepEqual(p.mirrored("todo.casa", "uid-1"), { pontos: 10, tipo: "rotina" });
    assert.equal(p.mirrored("todo.casa", "nada"), null);
    assert.equal(p.mirrored("todo.outra", "uid-1"), null);
    assert.equal(placar(null).p.mirrored("todo.casa", "uid-1"), null);
  });
});
