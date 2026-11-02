import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Recurring } from "../resolvia/rootfs/app/lib/recurring.js";
import { fakeLog, local, flushPromises } from "./_helpers.mjs";

const F = { CREATE: 1, DELETE: 2, UPDATE: 4, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const ALL = 127;
const MIN = 60_000;

/** A Recurring over a fake store / Home Assistant, with a clock the test moves. */
function setup({ rules = {}, features = ALL, state = "2", ready = true, now = local(2026, 11, 2, 10, 0), enabled = true, fail = null, dayMs = 0 } = {}) {
  const clock = { t: now.getTime() };
  const calls = [];
  const store = { rules, saves: 0, save() { this.saves++; } };
  const ha = {
    ready,
    async send(msg) {
      calls.push(msg);
      if (fail) throw fail();
      return {};
    },
  };
  const states = new Map();
  if (state !== null) states.set("todo.casa", { entity_id: "todo.casa", state, attributes: { supported_features: features } });
  const log = fakeLog();
  const rec = new Recurring({ ha, store, log, states, now: () => clock.t, enabled: () => (typeof enabled === "function" ? enabled() : enabled), dayMs });
  let changes = 0;
  rec.on("change", () => changes++);
  return { rec, store, ha, calls, states, log, clock, changes: () => changes };
}

const rule = (o = {}) => ({ id: "r1", entity_id: "todo.casa", uid: "u1", match: null, summary: "Regar as plantas", description: null, days: 3, completed_at: null, reopen_at: null, created_at: 0, ...o });
const item = (o = {}) => ({ uid: "u1", summary: "Regar as plantas", status: "needs_action", ...o });

describe("reopenTime: the start of the day N days later (local time)", () => {
  const { rec } = setup();
  const at = (y, mo, d, h, mi, days) => new Date(rec.reopenTime(local(y, mo, d, h, mi).getTime(), days));
  const same = (got, y, mo, d) => assert.deepEqual(got, local(y, mo, d, 0, 0, 0, 0), `${got.toString()}`);

  it("the next day at midnight, whatever the time of completion", () => {
    same(at(2026, 11, 2, 15, 30, 1), 2026, 11, 3);
    same(at(2026, 11, 2, 0, 0, 1), 2026, 11, 3);
    same(at(2026, 11, 2, 23, 59, 1), 2026, 11, 3);
  });

  it("across month ends", () => {
    same(at(2027, 1, 31, 10, 0, 1), 2027, 2, 1);
    same(at(2027, 1, 31, 10, 0, 30), 2027, 3, 2);
    same(at(2026, 4, 30, 8, 0, 1), 2026, 5, 1);
    same(at(2026, 8, 31, 8, 0, 31), 2026, 10, 1);
  });

  it("across leap days", () => {
    same(at(2028, 2, 28, 23, 59, 1), 2028, 2, 29);
    same(at(2028, 2, 28, 12, 0, 2), 2028, 3, 1);
    same(at(2027, 2, 28, 12, 0, 1), 2027, 3, 1);
    same(at(2028, 1, 31, 12, 0, 30), 2028, 3, 1);
    same(at(2027, 3, 1, 12, 0, 365), 2028, 2, 29);
    same(at(2028, 3, 1, 12, 0, 365), 2029, 3, 1);
  });

  it("across the year end", () => {
    same(at(2026, 12, 31, 18, 0, 1), 2027, 1, 1);
    same(at(2026, 12, 25, 18, 0, 10), 2027, 1, 4);
  });

  it("every 7 days comes back on the same weekday", () => {
    for (let d = 1; d <= 7; d++) {
      const done = local(2026, 11, d, 14, 0);
      const back = at(2026, 11, d, 14, 0, 7);
      assert.equal(back.getDay(), done.getDay());
      assert.equal(back.getHours(), 0);
    }
    assert.equal(at(2026, 11, 2, 14, 0, 14).getDay(), 1, "Monday + 14 days is a Monday");
  });

  it("on a historical daylight-saving day without midnight, still lands on that day", () => {
    // Brazil, 2018-11-04: clocks went from 00:00 straight to 01:00 in São Paulo
    const back = at(2018, 11, 3, 10, 0, 1);
    assert.equal(back.getDate(), 4);
    assert.equal(back.getMonth(), 10);
  });

  it("with the test hook (dayMs), a day is exactly dayMs, no rounding", () => {
    const { rec: fast } = setup({ dayMs: 500 });
    assert.equal(fast.reopenTime(1000, 3), 2500);
  });
});

describe("process: following the items of a list", () => {
  it("binds a rule known by name to the next pending item with that name", () => {
    const r = rule({ uid: null, match: "Regar as plantas" });
    const { rec, store, changes } = setup({ rules: { r1: r } });
    rec.process("todo.casa", [item({ uid: "done", status: "completed" }), item({ uid: "u9" })]);
    assert.equal(r.uid, "u9");
    assert.equal(r.match, null);
    assert.equal(store.saves, 1);
    assert.equal(changes(), 1);
  });

  it("two rules with the same name bind to two different items", () => {
    const a = rule({ id: "a", uid: null, match: "Regar" });
    const b = rule({ id: "b", uid: null, match: "Regar" });
    const { rec } = setup({ rules: { a, b } });
    rec.process("todo.casa", [item({ uid: "x", summary: "Regar" }), item({ uid: "y", summary: "Regar" })]);
    assert.deepEqual([a.uid, b.uid], ["x", "y"]);
  });

  it("never takes an item that another rule already owns", () => {
    const owner = rule({ id: "own", uid: "x", summary: "Regar" });
    const byName = rule({ id: "name", uid: null, match: "Regar" });
    const { rec } = setup({ rules: { own: owner, name: byName } });
    rec.process("todo.casa", [item({ uid: "x", summary: "Regar" })]);
    assert.equal(byName.uid, null);
    assert.equal(byName.match, "Regar");
  });

  it("ignores items of other lists", () => {
    const r = rule({ uid: null, match: "Regar as plantas" });
    const { rec } = setup({ rules: { r1: r } });
    rec.process("todo.outra", [item({ uid: "z" })]);
    assert.equal(r.uid, null);
  });

  it("a completed item schedules the comeback for the start of the day N days later", () => {
    const r = rule({ days: 3 });
    const { rec, clock } = setup({ rules: { r1: r }, now: local(2026, 11, 2, 15, 40) });
    rec.process("todo.casa", [item({ status: "completed" })]);
    assert.equal(r.completed_at, clock.t);
    assert.equal(r.reopen_at, local(2026, 11, 5).getTime());
    assert.equal(r.due_time, null);
  });

  it("keeps the time of a timed deadline for the comeback (a date-only deadline keeps the old one)", () => {
    const r = rule();
    const { rec } = setup({ rules: { r1: r } });
    rec.process("todo.casa", [item({ status: "completed", due: "2026-11-02T18:30:00-03:00" })]);
    assert.equal(r.due_time, "2026-11-02T18:30:00-03:00");
    const r2 = rule({ due_time: "2026-10-01T07:00:00-03:00" });
    const s2 = setup({ rules: { r1: r2 } });
    s2.rec.process("todo.casa", [item({ status: "completed", due: "2026-11-02" })]);
    assert.equal(r2.due_time, "2026-10-01T07:00:00-03:00");
  });

  it("does not schedule anything while the repetition is paused", () => {
    const r = rule();
    const { rec } = setup({ rules: { r1: r }, enabled: false });
    rec.process("todo.casa", [item({ status: "completed" })]);
    assert.equal(r.completed_at, null);
    assert.equal(r.reopen_at, null);
  });

  it("an item unchecked by hand cancels the comeback", () => {
    const r = rule({ completed_at: 1, reopen_at: 2, retry_at: 3 });
    const { rec } = setup({ rules: { r1: r } });
    rec.process("todo.casa", [item()]);
    assert.deepEqual([r.completed_at, r.reopen_at, "retry_at" in r], [null, null, false]);
  });

  it("an item deleted while pending deletes its rule", () => {
    const r = rule();
    const { rec, store, log } = setup({ rules: { r1: r } });
    rec.process("todo.casa", []);
    assert.deepEqual(store.rules, {});
    assert.match(log.of("info")[0], /Repetição removida \(item apagado\): "Regar as plantas"/);
  });

  it("keeps the rule when the item is missing for a good reason", () => {
    for (const [why, opts, r] of [
      ["completed and deleted: it will be created again", {}, rule({ completed_at: 5, reopen_at: 10 })],
      ["not bound yet", {}, rule({ uid: null, match: "Regar as plantas" })],
      ["list unavailable", { state: "unavailable" }, rule()],
      ["list unknown", { state: "unknown" }, rule()],
      ["list not loaded", { state: null }, rule()],
    ]) {
      const { rec, store } = setup({ rules: { r1: r }, ...opts });
      rec.process("todo.casa", []);
      assert.ok(store.rules.r1, why);
    }
  });

  it("follows a rename or a new description of the item", () => {
    const r = rule();
    const { rec, store } = setup({ rules: { r1: r } });
    rec.process("todo.casa", [item({ summary: "Regar as plantas da varanda", description: "Com adubo" })]);
    assert.equal(r.summary, "Regar as plantas da varanda");
    assert.equal(r.description, "Com adubo");
    assert.equal(store.saves, 1);
  });

  it("saves nothing when nothing changed (an empty description equals none)", () => {
    const r = rule();
    const { rec, store, changes } = setup({ rules: { r1: r } });
    rec.process("todo.casa", [item({ description: "" })]);
    assert.equal(store.saves, 0);
    assert.equal(changes(), 0);
  });

  it("remembers the items of each list", () => {
    const { rec } = setup();
    const items = [item()];
    rec.process("todo.casa", items);
    assert.equal(rec.items.get("todo.casa"), items);
  });
});

describe("setRule", () => {
  it("validates the list, the days and the task", () => {
    const { rec } = setup();
    assert.throws(() => rec.setRule({ entity_id: "light.x", uid: "u1", days: 1 }), /Not a to-do entity/);
    for (const days of [-1, 366, 1.5, "x"]) assert.throws(() => rec.setRule({ entity_id: "todo.casa", uid: "u1", days }), /between 1 and 365/);
    assert.throws(() => rec.setRule({ entity_id: "todo.casa", summary: "  ", days: 2 }), /uid or summary required/);
    assert.throws(() => rec.setRule({ entity_id: "todo.casa", days: 2 }), /uid or summary required/);
  });

  it("creates a rule bound to an item", () => {
    const { rec, store, clock, changes } = setup();
    const r = rec.setRule({ entity_id: "todo.casa", uid: "u1", summary: "Regar", days: "7" });
    assert.match(r.id, /^[0-9a-f]{12}$/);
    assert.deepEqual({ ...r, id: "x" }, { id: "x", entity_id: "todo.casa", uid: "u1", match: null, summary: "Regar", description: null, days: 7, completed_at: null, reopen_at: null, created_at: clock.t });
    assert.equal(store.rules[r.id], r);
    assert.equal(changes(), 1);
  });

  it("a rule by name binds right away when the list's items are known", () => {
    const { rec } = setup();
    rec.process("todo.casa", [item({ uid: "u5", summary: "Varrer" })]);
    const r = rec.setRule({ entity_id: "todo.casa", summary: "Varrer", days: 2 });
    assert.equal(r.uid, "u5");
    assert.equal(r.match, null);
  });

  it("changing the days of a completed task moves its comeback", () => {
    const done = local(2026, 11, 2, 9, 0).getTime();
    const r = rule({ completed_at: done, reopen_at: local(2026, 11, 5).getTime() });
    const { rec } = setup({ rules: { r1: r } });
    const out = rec.setRule({ entity_id: "todo.casa", uid: "u1", days: 10 });
    assert.equal(out, r);
    assert.equal(r.days, 10);
    assert.equal(r.reopen_at, local(2026, 11, 12).getTime());
  });

  it("finds an unbound rule by its name", () => {
    const r = rule({ uid: null, match: "Regar" });
    const { rec } = setup({ rules: { r1: r } });
    assert.equal(rec.setRule({ entity_id: "todo.casa", summary: "Regar", days: 5 }), r);
    assert.equal(r.days, 5);
  });

  it("0 or no days removes the rule (and is fine when there is none)", () => {
    const { rec, store, changes } = setup({ rules: { r1: rule() } });
    assert.equal(rec.setRule({ entity_id: "todo.casa", uid: "u1", days: 0 }), null);
    assert.deepEqual(store.rules, {});
    assert.equal(rec.setRule({ entity_id: "todo.casa", uid: "u1", days: null }), null);
    assert.equal(changes(), 1);
  });
});

describe("clearAll and publicRules", () => {
  it("clearAll deletes every rule and says how many", () => {
    const { rec, store, changes } = setup({ rules: { a: rule({ id: "a" }), b: rule({ id: "b" }) } });
    assert.equal(rec.clearAll(), 2);
    assert.deepEqual(store.rules, {});
    assert.equal(changes(), 1);
    assert.equal(rec.clearAll(), 0);
    assert.equal(changes(), 1, "nothing to clear: no change event");
  });

  it("publicRules hides the internal retry time", () => {
    const { rec } = setup({ rules: { r1: rule({ retry_at: 99 }) } });
    assert.deepEqual(rec.publicRules(), [rule()]);
  });

  it("rulesFor only gives the rules of that list", () => {
    const { rec } = setup({ rules: { a: rule({ id: "a" }), b: rule({ id: "b", entity_id: "todo.outra" }) } });
    assert.deepEqual(rec.rulesFor("todo.outra").map((r) => r.id), ["b"]);
  });
});

describe("tick: bringing tasks back", () => {
  const due = local(2026, 11, 5).getTime();
  const completed = (o = {}) => rule({ completed_at: local(2026, 11, 2, 9).getTime(), reopen_at: due, ...o });

  it("does nothing before the time", async () => {
    const { rec, calls } = setup({ rules: { r1: completed() }, now: new Date(due - 1) });
    rec.tick();
    await flushPromises();
    assert.equal(calls.length, 0);
  });

  it("unchecks the item with today's date when the list has dates", async () => {
    const r = completed();
    const { rec, calls, changes } = setup({ rules: { r1: r }, now: new Date(due + 5 * MIN), features: F.UPDATE | F.DUE_DATE });
    rec.items.set("todo.casa", [item({ status: "completed" })]);
    rec.tick();
    await flushPromises();
    assert.deepEqual(calls, [{ type: "call_service", domain: "todo", service: "update_item", service_data: { item: "u1", status: "needs_action", due_date: "2026-11-05" }, target: { entity_id: "todo.casa" } }]);
    assert.deepEqual([r.completed_at, r.reopen_at], [null, null]);
    assert.equal(changes(), 1);
  });

  it("keeps the time of day of a timed deadline", async () => {
    const r = completed({ due_time: "2026-11-02T21:30:00Z" });
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due + MIN), features: F.UPDATE | F.DUE_DATETIME });
    rec.items.set("todo.casa", [item({ status: "completed" })]);
    rec.tick();
    await flushPromises();
    assert.deepEqual(calls[0].service_data, { item: "u1", status: "needs_action", due_datetime: "2026-11-05 18:30:00" });
  });

  it("the item's own timed deadline wins over the remembered one", async () => {
    const r = completed({ due_time: "2026-11-02T10:00:00-03:00" });
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due + MIN), features: F.UPDATE | F.DUE_DATETIME | F.DUE_DATE });
    rec.items.set("todo.casa", [item({ status: "completed", due: "2026-11-02T07:15:00-03:00" })]);
    rec.tick();
    await flushPromises();
    assert.equal(calls[0].service_data.due_datetime, "2026-11-05 07:15:00");
  });

  it("without date features, only the status changes", async () => {
    const { rec, calls } = setup({ rules: { r1: completed({ due_time: "2026-11-02T10:00:00-03:00" }) }, now: new Date(due), features: F.UPDATE });
    rec.items.set("todo.casa", [item({ status: "completed" })]);
    rec.tick();
    await flushPromises();
    assert.deepEqual(calls[0].service_data, { item: "u1", status: "needs_action" });
  });

  it("creates the item again when it was deleted, and binds by name to the new one", async () => {
    const r = completed({ description: "Com adubo" });
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due), features: F.CREATE | F.DESCRIPTION | F.DUE_DATE });
    rec.items.set("todo.casa", []);
    rec.tick();
    await flushPromises();
    assert.deepEqual(calls.map((c) => [c.service, c.service_data]), [["add_item", { item: "Regar as plantas", due_date: "2026-11-05", description: "Com adubo" }]]);
    assert.deepEqual([r.uid, r.match], [null, "Regar as plantas"]);
    // the new item shows up: the rule binds to it
    rec.process("todo.casa", [item({ uid: "new" })]);
    assert.equal(r.uid, "new");
  });

  it("a list that can't update replaces the completed item (remove + add)", async () => {
    const r = completed();
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due), features: F.CREATE | F.DELETE });
    rec.items.set("todo.casa", [item({ status: "completed" })]);
    rec.tick();
    await flushPromises();
    await flushPromises();
    assert.deepEqual(calls.map((c) => [c.service, c.service_data]), [
      ["remove_item", { item: ["u1"] }],
      ["add_item", { item: "Regar as plantas" }],
    ]);
  });

  it("an item already unchecked by someone needs no call", async () => {
    const r = completed();
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due) });
    rec.items.set("todo.casa", [item()]);
    rec.tick();
    await flushPromises();
    assert.equal(calls.length, 0);
    assert.equal(r.reopen_at, null);
  });

  it("a list that allows nothing: warns and stops trying", async () => {
    const r = completed();
    const { rec, calls, log } = setup({ rules: { r1: r }, now: new Date(due), features: 0 });
    rec.items.set("todo.casa", []);
    rec.tick();
    await flushPromises();
    assert.equal(calls.length, 0);
    assert.match(log.of("warn")[0], /não permite reabrir/);
    assert.equal(r.reopen_at, null);
  });

  it("waits 5 minutes when Home Assistant or the list is not there", async () => {
    for (const opts of [{ ready: false }, { state: "unavailable" }, { state: null }]) {
      const r = completed();
      const { rec, calls, clock } = setup({ rules: { r1: r }, now: new Date(due), ...opts });
      rec.tick();
      await flushPromises();
      assert.equal(calls.length, 0);
      assert.equal(r.retry_at, clock.t + 5 * MIN);
      assert.equal(r.reopen_at, due, "still scheduled");
    }
  });

  it("tries again 5 minutes after a failure, and only then", async () => {
    let failing = true;
    const r = completed();
    const s = setup({ rules: { r1: r }, now: new Date(due), fail: () => (failing ? new Error("HA busy") : null) });
    s.ha.send = async (msg) => {
      s.calls.push(msg);
      if (failing) throw new Error("HA busy");
    };
    s.rec.items.set("todo.casa", [item({ status: "completed" })]);
    s.rec.tick();
    await flushPromises();
    assert.equal(r.retry_at, due + 5 * MIN);
    assert.equal(s.store.saves, 1);
    assert.match(s.log.of("warn")[0], /Não consegui reabrir "Regar as plantas": HA busy/);
    s.clock.t = due + 4 * MIN;
    s.rec.tick();
    await flushPromises();
    assert.equal(s.calls.length, 1, "not before the retry time");
    failing = false;
    s.clock.t = due + 5 * MIN;
    s.rec.tick();
    await flushPromises();
    assert.equal(s.calls.length, 2);
    assert.equal(r.reopen_at, null);
    assert.equal("retry_at" in r, false);
  });

  it("does not reopen the same rule twice while a call is running", async () => {
    let release;
    const r = completed();
    const s = setup({ rules: { r1: r }, now: new Date(due) });
    s.ha.send = (msg) => {
      s.calls.push(msg);
      return new Promise((res) => (release = res));
    };
    s.rec.items.set("todo.casa", [item({ status: "completed" })]);
    s.rec.tick();
    s.rec.tick();
    await flushPromises();
    assert.equal(s.calls.length, 1);
    release();
    await flushPromises();
    assert.equal(s.rec.busy.size, 0);
  });

  it("nothing comes back while the repetition is paused", async () => {
    const r = completed();
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due), enabled: false });
    rec.tick();
    await flushPromises();
    assert.equal(calls.length, 0);
    assert.equal(r.reopen_at, due);
  });

  it("process() checks right away (a list update after the due time reopens at once)", async () => {
    const r = completed();
    const { rec, calls } = setup({ rules: { r1: r }, now: new Date(due + MIN) });
    rec.process("todo.casa", [item({ status: "completed" })]);
    await flushPromises();
    assert.equal(calls.length, 1);
  });

  it("start() checks every 30 s (every 500 ms in the test mode) until stop()", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    const { rec } = setup();
    const tick = t.mock.method(rec, "tick", () => {});
    rec.start();
    t.mock.timers.tick(29_999);
    assert.equal(tick.mock.callCount(), 0);
    t.mock.timers.tick(1);
    assert.equal(tick.mock.callCount(), 1);
    rec.stop();
    t.mock.timers.tick(60_000);
    assert.equal(tick.mock.callCount(), 1);
    const fast = setup({ dayMs: 100 }).rec;
    const tick2 = t.mock.method(fast, "tick", () => {});
    fast.start();
    t.mock.timers.tick(1000);
    assert.equal(tick2.mock.callCount(), 2);
    fast.stop();
  });

  it("end to end with the test hook: complete, wait N 'days', the item is back", async () => {
    const s = setup({ dayMs: 1000, now: new Date(0) });
    const r = s.rec.setRule({ entity_id: "todo.casa", uid: "u1", summary: "Regar as plantas", days: 2 });
    s.rec.process("todo.casa", [item({ status: "completed" })]);
    assert.equal(r.reopen_at, 2000);
    s.clock.t = 1999;
    s.rec.tick();
    await flushPromises();
    assert.equal(s.calls.length, 0);
    s.clock.t = 2000;
    s.rec.tick();
    await flushPromises();
    assert.equal(s.calls[0].service, "update_item");
    assert.equal(s.calls[0].service_data.due_date, "1969-12-31", "today, in São Paulo, at epoch + 2 s");
  });
});
