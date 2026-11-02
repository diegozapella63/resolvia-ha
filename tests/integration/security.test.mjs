// Outside the dev mode, only Home Assistant's ingress (172.30.32.2) may talk to the app.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { Stack, rawPost } from "./_harness.mjs";

let stack;
before(async () => {
  stack = await new Stack({ dev: false, appEnv: { RESOLVIA_DAY_MS: "100", RESOLVIA_DEV_USER_ID: "intruso" } }).start();
});
after(() => stack && stack.stop());

describe("production mode (no RESOLVIA_DEV)", () => {
  it("refuses HTTP from anywhere but the ingress", async () => {
    for (const [method, url] of [["GET", "/"], ["GET", "/resolvia.js"], ["GET", "/api/export/json"], ["GET", "/fonts/barlow-400.woff2"]]) {
      const res = await fetch(`${stack.appUrl}${url}`, { method });
      assert.equal(res.status, 403, `${method} ${url}`);
      assert.equal(await res.text(), "Forbidden");
    }
    assert.match(await rawPost(stack, "/api/import", 10), /^HTTP 403 Forbidden/);
    assert.match(await rawPost(stack, "/api/extract", 10), /^HTTP 403 Forbidden/);
    assert.match(await rawPost(stack, "/api/voice", 10), /^HTTP 403 Forbidden/);
  });

  it("refuses the WebSocket from anywhere but the ingress", async () => {
    const ws = new WebSocket(`ws://127.0.0.1:${stack.appPort}/ws`);
    const result = await new Promise((r) => {
      ws.onopen = () => r("open");
      ws.onerror = () => r("refused");
    });
    assert.equal(result, "refused");
  });

  it("still works for Home Assistant: connects, reads the lists and writes the integration file", async () => {
    assert.ok(stack.app.lines.some((l) => /4 listas de tarefas encontradas/.test(l)));
    assert.ok(!stack.app.lines.some((l) => /modo dev/.test(l)));
    const p = JSON.parse(fs.readFileSync(`${stack.dirs.share}/resolvia/integracao.json`, "utf8"));
    assert.equal(p.app, "ResolvIA");
  });
});
