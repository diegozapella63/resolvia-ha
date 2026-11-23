// Memória da IA (2.89.0): os comandos da tela com o servidor de verdade. Uma memória só, da casa, na pasta share.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Stack } from "./_harness.mjs";

let stack;
let c;
let SHARE;
before(async () => {
  stack = new Stack();
  await stack.start();
  SHARE = stack.dirs.share;
  c = await stack.client();
});
after(() => stack && stack.stop());

describe("Memória da IA", () => {
  it("a tela lê, guarda e apaga; fica na pasta share da casa, para todos os apps", async () => {
    assert.deepEqual(await c.call("resolvia/memoria_ia/get"), { lista: [], max: 60 });
    const r = await c.call("resolvia/memoria_ia/add", { texto: "  O café é   sempre o da marca azul " });
    assert.deepEqual(r.lista.map((x) => [x.texto, x.app]), [["O café é sempre o da marca azul", "ResolvIA"]]);
    const arq = path.join(SHARE, "familia", "memoria_ia.json");
    assert.equal(JSON.parse(fs.readFileSync(arq, "utf8")).lista[0].texto, "O café é sempre o da marca azul");
    await assert.rejects(c.call("resolvia/memoria_ia/add", { texto: " a " }), (e) => e.code === "invalid_format" && e.message === "Escreva o que é para lembrar.");
    // outro app da casa escreve no mesmo arquivo: aparece aqui
    const v = JSON.parse(fs.readFileSync(arq, "utf8"));
    v.lista.push({ id: "i1", texto: "A feira é no sábado", em: "2026-11-02T09:30:00-0300", app: "InventarIA" });
    fs.writeFileSync(arq, JSON.stringify(v));
    assert.deepEqual((await c.call("resolvia/memoria_ia/get")).lista.map((x) => x.app), ["ResolvIA", "InventarIA"]);
    assert.deepEqual((await c.call("resolvia/memoria_ia/del", { frase: r.lista[0].id })).lista.map((x) => x.texto), ["A feira é no sábado"]);
  });
});
