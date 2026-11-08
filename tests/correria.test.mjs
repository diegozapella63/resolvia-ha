// lib/correria.js: the key of the CorrerIA, the file share/resolvia/correria.json and who used it last.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Correria, sameKey, firstIp, localIso, ROTA } from "../resolvia/rootfs/app/lib/correria.js";
import { tmpDir, fakeLog, local } from "./_helpers.mjs";

const NETS = { lo: [{ family: "IPv4", internal: true, address: "127.0.0.1" }], eth0: [{ family: "IPv6", internal: false, address: "fe80::1" }, { family: "IPv4", internal: false, address: "172.30.33.7" }] };

function make({ on = true, url = "", nets = () => NETS } = {}) {
  const dir = tmpDir();
  const state = { on };
  const log = fakeLog();
  const c = new Correria({ dataDir: path.join(dir, "data"), shareDir: path.join(dir, "share"), port: 8099, version: "9.9.9", log, enabled: () => state.on, url, host: () => "a0d7b954-resolvia", nets });
  return { c, dir, state, log, file: path.join(dir, "share", "resolvia", "correria.json"), keyFile: path.join(dir, "data", "correria.key") };
}
const mode = (f) => fs.statSync(f).mode & 0o777;

describe("correria: helpers", () => {
  it("localIso is the local time without a zone", () => assert.equal(localIso(local(2026, 11, 8, 9, 41, 5)), "2026-11-08T09:41:05"));
  it("sameKey compares in constant time; anything else is no", () => {
    assert.equal(sameKey("abc", "abc"), true);
    assert.equal(sameKey("abd", "abc"), false);
    assert.equal(sameKey("abcd", "abc"), false);
    assert.equal(sameKey(undefined, "abc"), false);
    assert.equal(sameKey("abc", ""), false);
    assert.equal(sameKey("abc", null), false);
  });
  it("firstIp: the first IPv4 that is not the loopback", () => {
    assert.equal(firstIp(NETS), "172.30.33.7");
    assert.equal(firstIp({ lo: NETS.lo, x: undefined }), null);
    assert.equal(firstIp(null), null);
  });
});

describe("correria: the key and the file", () => {
  it("the key is made once (32 random bytes), kept only for the owner and read again", () => {
    const { c, keyFile, dir } = make();
    const k = c.chave();
    assert.match(k, /^[A-Za-z0-9_-]{43}$/);
    assert.equal(mode(keyFile), 0o600);
    assert.equal(c.chave(), k);
    const again = new Correria({ dataDir: path.join(dir, "data"), shareDir: dir, port: 1, version: "1", log: fakeLog() });
    assert.equal(again.chave(), k);
    fs.writeFileSync(keyFile, "curta");
    const short = new Correria({ dataDir: path.join(dir, "data"), shareDir: dir, port: 1, version: "1", log: fakeLog() });
    assert.notEqual(short.chave(), "curta");
  });
  it("on: the file of the contract, atomic and only for the owner; off: it goes away", () => {
    const { c, file, state } = make();
    assert.equal(c.publicar(), true);
    const j = JSON.parse(fs.readFileSync(file, "utf8"));
    assert.deepEqual({ ...j, gravado_em: "x" }, {
      app: "resolvia",
      nome: "ResolvIA",
      assunto: "listas de tarefas da casa: o que fazer, prazos, compras, repetição e pontos",
      url: "http://a0d7b954-resolvia:8099",
      ip_url: "http://172.30.33.7:8099",
      chave: c.chave(),
      versao: "9.9.9",
      ferramentas: ROTA,
      gravado_em: "x",
    });
    assert.match(j.gravado_em, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    assert.equal(mode(file), 0o600);
    assert.deepEqual(fs.readdirSync(path.dirname(file)), ["correria.json"], "no temp file left");
    state.on = false;
    assert.equal(c.publicar(), false);
    assert.equal(fs.existsSync(file), false);
    assert.equal(c.publicar(), false, "already gone");
  });
  it("the address: the one given (development), or the name of the machine (no spare without an address)", () => {
    assert.deepEqual(make({ url: "http://127.0.0.1:9000/" }).c.endereco(), { url: "http://127.0.0.1:9000", ip_url: null });
    assert.deepEqual(make({ nets: () => ({}) }).c.endereco(), { url: "http://a0d7b954-resolvia:8099", ip_url: null });
  });
  it("a share folder it cannot write: warned once, and again after it worked", () => {
    const { c, dir, log } = make();
    fs.mkdirSync(path.join(dir, "share"), { recursive: true });
    fs.writeFileSync(path.join(dir, "share", "resolvia"), "a file in the way");
    assert.equal(c.publicar(), false);
    assert.equal(c.publicar(), false);
    assert.equal(log.of("warn").length, 1);
    assert.match(log.of("warn")[0], /CorrerIA: não consegui gravar/);
    fs.rmSync(path.join(dir, "share", "resolvia"));
    assert.equal(c.publicar(), true);
    assert.equal(c.warned, false);
  });
});

describe("correria: who may use it", () => {
  it("only on, with Bearer and this key", () => {
    const { c, state } = make();
    const k = c.chave();
    assert.equal(c.autorizado({ authorization: `Bearer ${k}` }), true);
    assert.equal(c.autorizado({ authorization: `Bearer ${k}x` }), false);
    assert.equal(c.autorizado({ authorization: `Basic ${k}` }), false);
    assert.equal(c.autorizado({}), false);
    assert.equal(c.autorizado(null), false);
    state.on = false;
    assert.equal(c.autorizado({ authorization: `Bearer ${k}` }), false);
  });
  it("the last use is kept (who and which tool) and read again on start", () => {
    const { c, dir } = make();
    assert.equal(c.ultimo, null);
    c.usado("  Claude  ", "resumo");
    assert.deepEqual({ ...c.ultimo, em: "x" }, { cliente: "Claude", em: "x", nome: "resumo" });
    c.usado("", null);
    assert.equal(c.ultimo.cliente, "CorrerIA");
    assert.equal(c.ultimo.nome, "");
    const again = new Correria({ dataDir: path.join(dir, "data"), shareDir: dir, port: 1, version: "1", log: fakeLog() });
    assert.deepEqual(again.ultimo, c.ultimo);
    fs.writeFileSync(path.join(dir, "data", "correria_uso.json"), JSON.stringify({ cliente: 3 }));
    assert.equal(new Correria({ dataDir: path.join(dir, "data"), shareDir: dir, port: 1, version: "1", log: fakeLog() }).ultimo, null);
    fs.writeFileSync(path.join(dir, "data", "correria_uso.json"), JSON.stringify({ cliente: "Gemini", em: "2026-11-08T10:00:00" }));
    assert.deepEqual(new Correria({ dataDir: path.join(dir, "data"), shareDir: dir, port: 1, version: "1", log: fakeLog() }).ultimo, { cliente: "Gemini", em: "2026-11-08T10:00:00", nome: "" });
  });
  it("a data folder it cannot write only loses the last use", () => {
    const { c, dir } = make();
    fs.mkdirSync(path.join(dir, "data", "correria_uso.json"), { recursive: true });
    c.usado("WhatsApp", "tarefas");
    assert.equal(c.ultimo.cliente, "WhatsApp");
  });
});
