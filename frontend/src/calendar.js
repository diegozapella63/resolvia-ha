// Outra data in the look of the app: the month opens under the choices of the date (the Prazo here), in place of the
// date window of the phone (a rule of every app of the family: no native window). ‹ and › change the month; a tap on
// the name of the month shows the months of the year (for a date far away); a tap on a day picks it. Pure helpers
// (tested) and renderCalendar(). The same file in the ResolvIA and in the CronologIA (tools/iguais.py); the GerencIA
// has the same field in its app.js (campoData), the model being this one.
import { html, nothing } from "../vendor/lit-all.min.js";

export const MONTH_NAMES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
/** Sunday first, as the calendars in Brazil. */
export const WEEK_INITIALS = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEK_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export const MONTH_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const pad = (n) => String(n).padStart(2, "0");
const ymd = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const ofDate = (d) => ymd(d.getFullYear(), d.getMonth() + 1, d.getDate());
const plus = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/**
 * The shortcuts of a date field, [{label, date}]: "futuro" (a deadline, a due date): Hoje, Amanhã, Sábado (when it is not
 * tomorrow) and Próx. semana (the next Monday, when it is not tomorrow); "passado" (a date up to today): Hoje and Ontem;
 * "livre" (either way): Hoje, Ontem and Amanhã. The same as atalhosData in the app.js of the GerencIA.
 */
export function quickPicks(kind = "futuro", now = new Date()) {
  const h = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (kind === "passado") return [{ label: "Hoje", date: ofDate(h) }, { label: "Ontem", date: ofDate(plus(h, -1)) }];
  if (kind === "livre") return [{ label: "Hoje", date: ofDate(h) }, { label: "Ontem", date: ofDate(plus(h, -1)) }, { label: "Amanhã", date: ofDate(plus(h, 1)) }];
  const dow = h.getDay();
  const toSat = (6 - dow + 7) % 7 || 7;
  const toMon = (1 - dow + 7) % 7 || 7;
  const picks = [{ label: "Hoje", date: ofDate(h) }, { label: "Amanhã", date: ofDate(plus(h, 1)) }];
  if (toSat > 1) picks.push({ label: "Sábado", date: ofDate(plus(h, toSat)) });
  if (toMon > 1) picks.push({ label: "Próx. semana", date: ofDate(plus(h, toMon)) });
  return picks;
}

/** "2026-11" of a date "2026-11-09" (or of today). */
export function monthOf(dateStr, now = new Date()) {
  if (/^\d{4}-\d{2}/.test(dateStr || "")) return dateStr.slice(0, 7);
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
}

/** The month n months after (or before) "2026-11". */
export function shiftMonth(ym, n) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

/** "Novembro de 2026". */
export function monthTitle(ym) {
  const [y, m] = ym.split("-").map(Number);
  const name = MONTH_NAMES[m - 1];
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} de ${y}`;
}

/** "segunda, 9 de novembro de 2026": what a screen reader says for a day. */
export function longDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${WEEK_NAMES[new Date(y, m - 1, d).getDay()]}, ${d} de ${MONTH_NAMES[m - 1]} de ${y}`;
}

/** The days of the month in weeks from Sunday (or from weekStart: 1 is Monday): null before the 1st and after the last
 * day (whole weeks). */
export function monthCells(ym, weekStart = 0) {
  const [y, m] = ym.split("-").map(Number);
  const first = (new Date(y, m - 1, 1).getDay() - weekStart + 7) % 7;
  const days = new Date(y, m, 0).getDate();
  const cells = Array.from({ length: first }, () => null);
  for (let d = 1; d <= days; d++) cells.push(ymd(y, m, d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

/**
 * The month: {icon, month: "2026-11", value: the chosen "2026-11-20" or null, today: "2026-11-09", onPick(date),
 * onMonth(month), min, max (the days out of them can not be picked), weekStart (0 Sunday, 1 Monday), months (true: the
 * months of the year in place of the days) and onMonths(on) (with it, a tap on the name of the month shows the months)}.
 */
export function renderCalendar({ icon, month, value, today, onPick, onMonth, min = "", max = "", weekStart = 0, months = false, onMonths = null }) {
  const [y] = month.split("-").map(Number);
  const inside = (d) => (!min || d >= min) && (!max || d <= max);
  const nav = (n, label, can) =>
    html`<button type="button" class="icon-btn cal-nav" aria-label=${label} ?disabled=${!can} @click=${() => onMonth(shiftMonth(month, n))}>${icon(n < 0 ? "chevron-left" : "chevron-right")}</button>`;
  if (months && onMonths) {
    const canMonth = (k) => (!max || `${y}-${pad(k + 1)}-01` <= max) && (!min || ymd(y, k + 1, new Date(y, k + 1, 0).getDate()) >= min);
    return html`<div class="cal" role="group" aria-label="Escolher o mês">
      <div class="cal-head">
        ${nav(-12, "Ano anterior", !min || Number(min.slice(0, 4)) < y)}
        <button type="button" class="cal-title" aria-label="Voltar aos dias" @click=${() => onMonths(false)}>${y}</button>
        ${nav(12, "Próximo ano", !max || Number(max.slice(0, 4)) > y)}
      </div>
      <div class="cal-months">
        ${MONTH_SHORT.map((t, k) => {
          const ym = `${y}-${pad(k + 1)}`;
          const on = !!value && value.slice(0, 7) === ym;
          return html`<button type="button" class="cal-month ${on ? "on" : ""} ${today && today.slice(0, 7) === ym ? "today" : ""}" aria-pressed=${on ? "true" : "false"} ?disabled=${!canMonth(k)} @click=${() => (onMonth(ym), onMonths(false))}>${t}</button>`;
        })}
      </div>
    </div>`;
  }
  const before = shiftMonth(month, -1);
  const lastBefore = `${before}-${pad(new Date(Number(before.slice(0, 4)), Number(before.slice(5, 7)), 0).getDate())}`;
  const firstAfter = `${shiftMonth(month, 1)}-01`;
  return html`<div class="cal" role="group" aria-label="Escolher a data">
    <div class="cal-head" data-month=${month}>
      ${nav(-1, "Mês anterior", !min || lastBefore >= min)}
      ${onMonths
        ? html`<button type="button" class="cal-title" aria-live="polite" aria-label=${`${monthTitle(month)}: escolher o mês`} @click=${() => onMonths(true)}>${monthTitle(month)}</button>`
        : html`<b class="cal-title" aria-live="polite">${monthTitle(month)}</b>`}
      ${nav(1, "Próximo mês", !max || firstAfter <= max)}
    </div>
    <div class="cal-grid">
      ${WEEK_INITIALS.map((_, i) => html`<span class="cal-wd" aria-hidden="true">${WEEK_INITIALS[(i + weekStart) % 7]}</span>`)}
      ${monthCells(month, weekStart).map((d) =>
        d
          ? html`<button type="button" class="cal-day ${d === value ? "on" : ""} ${d === today ? "today" : ""}" data-d=${d} aria-pressed=${d === value ? "true" : "false"} aria-current=${d === today ? "date" : nothing} aria-label=${longDate(d)} ?disabled=${!inside(d)} @click=${() => onPick(d)}>${Number(d.slice(8))}</button>`
          : html`<span class="cal-gap"></span>`,
      )}
    </div>
  </div>`;
}

export const calendarStyles = `
  .cal {
    margin-top: 2px;
    padding: 8px 8px 10px;
    border-radius: 18px;
    border: 1.5px solid var(--rv-line-strong);
    background: var(--rv-bg);
  }
  .cal-head {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  .cal-title {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--rv-text);
  }
  button.cal-title:hover {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal .cal-nav:disabled,
  .cal-day:disabled,
  .cal-month:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .cal-months {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    padding: 4px 2px 2px;
  }
  .cal-month {
    min-height: 44px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    color: var(--rv-text);
  }
  .cal-month:hover:not(:disabled):not(.on) {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal-month.today {
    box-shadow: inset 0 0 0 1.5px var(--rv-accent);
    color: var(--rv-accent-ink);
    font-weight: 600;
  }
  .cal-month.on {
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 700;
    box-shadow: none;
  }
  .cal .cal-nav {
    width: 40px;
    height: 40px;
    margin: 0;
    display: grid;
    place-items: center;
    flex: none;
    color: var(--rv-text-2);
  }
  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    row-gap: 2px;
  }
  .cal-wd {
    padding: 4px 0 6px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--rv-muted);
  }
  .cal-day {
    justify-self: center;
    width: min(100%, 42px);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
    color: var(--rv-text);
  }
  .cal-day:hover:not(:disabled) {
    background: color-mix(in srgb, var(--rv-text) 7%, transparent);
  }
  .cal-day.today {
    box-shadow: inset 0 0 0 1.5px var(--rv-accent);
    color: var(--rv-accent-ink);
    font-weight: 600;
  }
  .cal-day.on {
    background: var(--rv-accent);
    color: var(--rv-on-accent);
    font-weight: 700;
    box-shadow: none;
  }
`;
