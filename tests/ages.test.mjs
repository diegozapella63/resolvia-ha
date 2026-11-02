import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Ages } from "../resolvia/rootfs/app/lib/ages.js";
import { tmpDir, fakeLog } from "./_helpers.mjs";

const T0 = Date.UTC(2026, 10, 1, 12, 0, 0);
const DAY = 86_400_000;
const pending = (uid, summary = uid) => ({ uid, summary, status: "needs_action" });

function ages(t, file) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const dir = tmpDir("resolvia-ages-");
  if (file !== undefined) fs.writeFileSync(path.join(dir, "idades.json"), typeof file === "string" ? file : JSON.stringify(file));
  const log = fakeLog();
  return { a: new Ages({ dir, log }), dir, log, disk: () => JSON.parse(fs.readFileSync(path.join(dir, "idades.json"), "utf8")) };
}

describe("Ages: since when each pending item is on its list", () => {
  it("notes the first time it sees each pending item", (t) => {
    const { a } = ages(t);
    a.track("todo.casa", [pending("u1"), pending("u2")], T0);
    a.track("todo.casa", [pending("u1"), pending("u2"), pending("u3")], T0 + DAY);
    assert.deepEqual(a.all(), { "todo.casa": { u1: T0, u2: T0, u3: T0 + DAY } });
  });

  it("forgets completed and removed items; one that comes back counts again from then", (t) => {
    const { a } = ages(t);
    a.track("todo.casa", [pending("u1"), pending("u2")], T0);
    a.track("todo.casa", [{ ...pending("u1"), status: "completed" }, pending("u2")], T0 + DAY);
    assert.deepEqual(a.all(), { "todo.casa": { u2: T0 } });
    a.track("todo.casa", [pending("u1"), pending("u2")], T0 + 5 * DAY);
    assert.deepEqual(a.all(), { "todo.casa": { u1: T0 + 5 * DAY, u2: T0 } });
  });

  it("drops the list when nothing is pending, and ignores items without uid", (t) => {
    const { a } = ages(t);
    a.track("todo.casa", [pending("u1")], T0);
    a.track("todo.casa", [null, { summary: "sem uid", status: "needs_action" }], T0 + DAY);
    assert.deepEqual(a.all(), {});
    a.track("todo.casa", undefined, T0);
    assert.deepEqual(a.all(), {});
  });

  it("keeps lists apart", (t) => {
    const { a } = ages(t);
    a.track("todo.a", [pending("x")], T0);
    a.track("todo.b", [pending("x")], T0 + DAY);
    a.track("todo.a", [], T0 + 2 * DAY);
    assert.deepEqual(a.all(), { "todo.b": { x: T0 + DAY } });
  });

  it("saves 2 s after the last change, and not at all when nothing changed", (t) => {
    const { a, dir, disk } = ages(t);
    const flush = t.mock.method(a, "flush");
    a.track("todo.casa", [pending("u1")], T0);
    t.mock.timers.tick(1999);
    assert.equal(flush.mock.callCount(), 0);
    t.mock.timers.tick(1);
    assert.equal(flush.mock.callCount(), 1);
    assert.deepEqual(disk(), { versao: 1, itens: { "todo.casa": { u1: T0 } } });
    a.track("todo.casa", [pending("u1")], T0 + DAY);
    t.mock.timers.tick(5000);
    assert.equal(flush.mock.callCount(), 1, "the same items: nothing to save");
    assert.equal(fs.existsSync(path.join(dir, "idades.json.tmp")), false);
  });

  it("reads the file back on start, cleaning what is not valid", (t) => {
    const { a } = ages(t, { versao: 1, itens: { "todo.casa": { u1: T0, u2: "ontem", u3: null, u4: Infinity }, "light.x": { u: 1 }, "todo.Bad": { u: 1 }, "todo.vazio": 5 } });
    assert.deepEqual(a.all(), { "todo.casa": { u1: T0 } });
    a.track("todo.casa", [pending("u1")], T0 + 10 * DAY);
    assert.deepEqual(a.all(), { "todo.casa": { u1: T0 } }, "the first sighting survives a restart");
  });

  it("starts empty with a broken or odd file", (t) => {
    for (const file of ["{broken", "[]", '{"itens": 5}', "null"]) {
      t.mock.timers.reset();
      assert.deepEqual(ages(t, file).a.all(), {}, file);
    }
  });

  it("warns when it cannot write", (t) => {
    const { a, dir, log } = ages(t);
    fs.mkdirSync(path.join(dir, "idades.json.tmp"));
    a.track("todo.casa", [pending("u1")], T0);
    a.flush();
    assert.match(log.of("warn")[0], /Não consegui gravar/);
  });
});
