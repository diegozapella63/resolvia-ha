// Outra data in the look of the app: the month opens under the choices of Prazo, in place of the date window of
// the phone (a rule of every app of the family: no native window). ‹ and › change the month; a tap on a day picks
// it. Pure helpers (tested) and renderCalendar(), drawn into <resolvia-panel> (the item sheet and Alterar).
import { html, nothing } from "../vendor/lit-all.min.js";

export const MONTH_NAMES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
/** Sunday first, as the calendars in Brazil. */
export const WEEK_INITIALS = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEK_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const pad = (n) => String(n).padStart(2, "0");
const ymd = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

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

/** The days of the month in weeks from Sunday: null before the 1st and after the last day (whole weeks). */
export function monthCells(ym) {
  const [y, m] = ym.split("-").map(Number);
  const first = new Date(y, m - 1, 1).getDay();
  const days = new Date(y, m, 0).getDate();
  const cells = Array.from({ length: first }, () => null);
  for (let d = 1; d <= days; d++) cells.push(ymd(y, m, d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

/**
 * The month: {icon, month: "2026-11", value: the chosen "2026-11-20" or null, today: "2026-11-09",
 * onPick(date), onMonth(month)}.
 */
export function renderCalendar({ icon, month, value, today, onPick, onMonth }) {
  return html`<div class="cal" role="group" aria-label="Escolher a data">
    <div class="cal-head">
      <button type="button" class="icon-btn cal-nav" aria-label="Mês anterior" @click=${() => onMonth(shiftMonth(month, -1))}>${icon("chevron-left")}</button>
      <b class="cal-title" aria-live="polite">${monthTitle(month)}</b>
      <button type="button" class="icon-btn cal-nav" aria-label="Próximo mês" @click=${() => onMonth(shiftMonth(month, 1))}>${icon("chevron-right")}</button>
    </div>
    <div class="cal-grid">
      ${WEEK_INITIALS.map((w) => html`<span class="cal-wd" aria-hidden="true">${w}</span>`)}
      ${monthCells(month).map((d) =>
        d
          ? html`<button type="button" class="cal-day ${d === value ? "on" : ""} ${d === today ? "today" : ""}" aria-pressed=${d === value ? "true" : "false"} aria-current=${d === today ? "date" : nothing} aria-label=${longDate(d)} @click=${() => onPick(d)}>${Number(d.slice(8))}</button>`
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
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .cal .cal-nav {
    width: 40px;
    height: 40px;
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
  .cal-day:hover {
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
