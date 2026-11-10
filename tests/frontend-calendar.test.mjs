// frontend/src/calendar.js: Outra data in the look of the app (2.52.0), in place of the date window of the phone.
// Also the rule of the family for the boxes: no native window (date, time, datalist) anywhere in the screens.
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { html } from "../frontend/vendor/lit-all.min.js";
import { text, click, labels, controls } from "./_lit.mjs";
import { monthOf, shiftMonth, monthTitle, longDate, monthCells, renderCalendar, WEEK_INITIALS, calendarStyles, quickPicks, MONTH_SHORT } from "../frontend/src/calendar.js";
import { timeSlots } from "../frontend/src/util.js";
import { FRONT, local } from "./_helpers.mjs";

const icon = (n) => html`<i data-icon=${n}></i>`;

describe("calendar helpers", () => {
  it("monthOf: the month of a date, or of today", () => {
    assert.equal(monthOf("2026-11-20"), "2026-11");
    assert.equal(monthOf(null, local(2027, 1, 5)), "2027-01");
    assert.equal(monthOf("", local(2026, 12, 31)), "2026-12");
  });
  it("shiftMonth: across the years, both ways", () => {
    assert.equal(shiftMonth("2026-11", 1), "2026-12");
    assert.equal(shiftMonth("2026-12", 1), "2027-01");
    assert.equal(shiftMonth("2026-01", -1), "2025-12");
    assert.equal(shiftMonth("2026-03", -14), "2025-01");
  });
  it("the title and the name of a day, in Portuguese", () => {
    assert.equal(monthTitle("2026-11"), "Novembro de 2026");
    assert.equal(monthTitle("2027-03"), "Março de 2027");
    assert.equal(longDate("2026-11-09"), "segunda, 9 de novembro de 2026");
    assert.equal(longDate("2027-01-03"), "domingo, 3 de janeiro de 2027");
  });
  it("monthCells: whole weeks from Sunday, blanks before the 1st and after the last day", () => {
    const nov = monthCells("2026-11"); // 1 Nov 2026 is a Sunday
    assert.equal(nov[0], "2026-11-01");
    assert.equal(nov.length % 7, 0);
    assert.equal(nov.filter(Boolean).length, 30);
    assert.equal(nov.at(-1), null);
    const feb = monthCells("2027-02"); // 1 Feb 2027 is a Monday; 28 days
    assert.deepEqual(feb.slice(0, 2), [null, "2027-02-01"]);
    assert.equal(feb.filter(Boolean).length, 28);
    assert.equal(feb.length, 35);
    assert.equal(monthCells("2028-02").filter(Boolean).length, 29, "leap year");
    assert.deepEqual(WEEK_INITIALS, ["D", "S", "T", "Q", "Q", "S", "S"]);
  });
});

describe("renderCalendar", () => {
  const view = (over = {}) => {
    const got = { pick: null, month: null };
    const v = renderCalendar({ icon, month: "2026-11", value: "2026-11-20", today: "2026-11-09", onPick: (d) => (got.pick = d), onMonth: (m) => (got.month = m), ...over });
    return { v, got };
  };
  it("the month, the week days and the days", () => {
    const { v } = view();
    assert.match(text(v), /^Novembro de 2026 D S T Q Q S S 1 2 3 4 5 6 7 8 9 10 .* 29 30$/);
  });
  it("today has its ring, the chosen day is marked, each day says its full date", () => {
    const { v } = view();
    const days = controls(v).filter((c) => /cal-day/.test(c.attrs));
    assert.equal(days.length, 30);
    const today = days.find((c) => c.text === "9");
    assert.match(today.attrs, /class="cal-day {2}today"/);
    assert.match(today.attrs, /aria-current="date"/);
    assert.match(today.attrs, /aria-label="segunda, 9 de novembro de 2026"/);
    const on = days.filter((c) => /aria-pressed="true"/.test(c.attrs));
    assert.deepEqual(on.map((c) => c.text), ["20"]);
    assert.match(on[0].attrs, /class="cal-day on /);
  });
  it("a tap on a day picks it; ‹ and › change the month", () => {
    const { v, got } = view();
    click(v, "segunda, 23 de novembro de 2026");
    assert.equal(got.pick, "2026-11-23");
    click(v, "Próximo mês");
    assert.equal(got.month, "2026-12");
    click(v, "Mês anterior");
    assert.equal(got.month, "2026-10");
    assert.deepEqual(labels(v).slice(0, 2), ["Mês anterior", "Próximo mês"]);
  });
  it("another month: no day chosen nor today in it", () => {
    const { v } = view({ month: "2027-01" });
    assert.match(text(v), /^Janeiro de 2027 /);
    assert.equal(controls(v).filter((c) => /aria-pressed="true"|aria-current="date"/.test(c.attrs)).length, 0);
  });
  it("a tap on the name of the month shows the months of the year, and a month goes back to its days", () => {
    const got = { months: null, month: null };
    const days = renderCalendar({ icon, month: "2026-11", value: "2026-11-20", today: "2026-11-09", onPick: () => {}, onMonth: (m) => (got.month = m), onMonths: (on) => (got.months = on) });
    assert.deepEqual(labels(days).slice(0, 3), ["Mês anterior", "Novembro de 2026", "Próximo mês"]);
    click(days, "Novembro de 2026: escolher o mês");
    assert.equal(got.months, true);
    const months = renderCalendar({ icon, month: "2026-11", value: "2026-11-20", today: "2026-11-09", onPick: () => {}, onMonth: (m) => (got.month = m), months: true, onMonths: (on) => (got.months = on) });
    assert.match(text(months), /^2026 jan fev mar abr mai jun jul ago set out nov dez$/);
    assert.deepEqual(MONTH_SHORT.length, 12);
    const on = controls(months).filter((c) => /aria-pressed="true"/.test(c.attrs));
    assert.deepEqual(on.map((c) => c.text), ["nov"], "the month of the date");
    click(months, "Próximo ano");
    assert.equal(got.month, "2027-11");
    click(months, "Ano anterior");
    assert.equal(got.month, "2025-11");
    got.months = null;
    controls(months).find((c) => c.text === "mai").on.click({});
    assert.deepEqual([got.month, got.months], ["2026-05", false]);
  });
  it("min and max: the days out of them can not be picked, nor the months beyond them", () => {
    const v = renderCalendar({ icon, month: "2026-11", value: null, today: "2026-11-09", onPick: () => {}, onMonth: () => {}, max: "2026-11-09" });
    const days = controls(v).filter((c) => /cal-day/.test(c.attrs));
    assert.equal(days.filter((c) => / disabled/.test(c.attrs)).length, 21, "10 to 30 November");
    assert.match(controls(v).find((c) => c.aria === "Próximo mês").attrs, / disabled/);
    assert.doesNotMatch(controls(v).find((c) => c.aria === "Mês anterior").attrs, / disabled/);
    const w = renderCalendar({ icon, month: "2026-11", value: null, today: "2026-11-09", onPick: () => {}, onMonth: () => {}, min: "2026-11-05", months: true, onMonths: () => {} });
    assert.equal(controls(w).filter((c) => /cal-month/.test(c.attrs) && / disabled/.test(c.attrs)).length, 10, "January to October 2026");
    assert.match(controls(w).find((c) => c.aria === "Ano anterior").attrs, / disabled/);
  });
  it("the week from Monday (weekStart 1), when the app is set so", () => {
    assert.match(text(renderCalendar({ icon, month: "2026-11", value: null, today: "", onPick: () => {}, onMonth: () => {}, weekStart: 1 })), /^Novembro de 2026 S T Q Q S S D +1 2 3 /);
    assert.equal(monthCells("2026-11", 1).indexOf("2026-11-01"), 6, "1 Nov 2026, a Sunday, at the end of the first week");
  });
  it("quickPicks: the shortcuts of each kind of date", () => {
    const mon = local(2026, 11, 2);
    assert.deepEqual(quickPicks("futuro", mon).map((p) => `${p.label} ${p.date}`), ["Hoje 2026-11-02", "Amanhã 2026-11-03", "Sábado 2026-11-07", "Próx. semana 2026-11-09"]);
    assert.deepEqual(quickPicks("futuro", local(2026, 11, 6)).map((p) => p.label), ["Hoje", "Amanhã", "Próx. semana"], "on Friday, Saturday is tomorrow");
    assert.deepEqual(quickPicks("futuro", local(2026, 11, 8)).map((p) => p.label), ["Hoje", "Amanhã", "Sábado"], "on Sunday, the next week is tomorrow");
    assert.deepEqual(quickPicks("passado", mon).map((p) => `${p.label} ${p.date}`), ["Hoje 2026-11-02", "Ontem 2026-11-01"]);
    assert.deepEqual(quickPicks("livre", mon).map((p) => p.label), ["Hoje", "Ontem", "Amanhã"]);
    assert.deepEqual(quickPicks(undefined, mon).map((p) => p.label), ["Hoje", "Amanhã", "Sábado", "Próx. semana"]);
    assert.ok(quickPicks().length >= 3, "today, by default");
  });
  it("styles in the colors of the app", () => {
    assert.match(calendarStyles, /\.cal-day\.on \{[^}]*var\(--rv-accent\)/);
    assert.match(calendarStyles, /\.cal-day\.today \{[^}]*var\(--rv-accent\)/);
  });
});

describe("timeSlots: the times of a box, from half to half an hour", () => {
  it("48 times, 24 hours, no AM/PM", () => {
    const t = timeSlots();
    assert.equal(t.length, 48);
    assert.deepEqual([t[0], t[1], t[16], t[47]], ["00:00", "00:30", "08:00", "23:30"]);
    assert.ok(t.every((x) => /^\d{2}:\d{2}$/.test(x)));
  });
  it("a time out of the step (from before) goes in its place; one of them or nonsense changes nothing", () => {
    const t = timeSlots("07:15");
    assert.equal(t.length, 49);
    assert.deepEqual(t.slice(14, 17), ["07:00", "07:15", "07:30"]);
    assert.equal(timeSlots("08:00").length, 48);
    assert.equal(timeSlots("25:00").length, 48);
    assert.equal(timeSlots("8:00").length, 48);
    assert.equal(timeSlots(null).length, 48);
  });
});

describe("no window of the phone in the screens (a rule of the family)", () => {
  const files = fs.readdirSync(FRONT).filter((f) => f.endsWith(".js") && f !== "selectsheet.js");
  const src = Object.fromEntries(files.map((f) => [f, fs.readFileSync(path.join(FRONT, f), "utf8")]));
  it("no date, time or datalist field", () => {
    for (const [f, s] of Object.entries(src)) {
      assert.doesNotMatch(s, /type=["'](date|time|datetime-local|month|week)["']/, f);
      assert.doesNotMatch(s, /<datalist|\slist=["$]/, f);
      assert.doesNotMatch(s, /showPicker\(/, f);
    }
  });
  it("selectsheet.js loads first, and the boxes of the panel (Shadow DOM) never get the tap", () => {
    assert.match(src["app-main.js"].split("\n").find((l) => l.startsWith("import")), /selectsheet\.js/);
    assert.match(src["styles.js"], /select:not\(\[multiple\]\) \{\s*pointer-events: none;/);
    // and they use the font of the app (the sheet takes it from the box)
    assert.match(src["styles.js"], /input,\s*textarea,\s*select \{\s*font: inherit;/);
  });
});
