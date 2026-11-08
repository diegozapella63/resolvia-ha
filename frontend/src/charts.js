// Mais › Gráficos: where the pending items are. By list (always); by room and by equipment only with
// Usar cômodos and Usar equipamentos on; by deadline with Controlar prazos on; and who does it
// (Nós mesmos × Serviço externo) when some task is done by someone from outside.
// Drawn by hand like the Divisão of the GerencIA (a split bar on top, then a row per part with its bar)
// and the Uso da IA: no chart library. summarize() counts (pure, tested); ChartsMixin draws it into
// <resolvia-panel>. A tap on a list opens it; on a room, an equipment or Serviço externo, Buscar with
// the word; on a deadline, Prazos.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { plural, colorVars, dueInfo, fold } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

/** Rows shown before "+N"; it only folds when that hides two or more. */
export const TOP = 6;

/** The parts of Por prazo, in order (like the groups of Prazos). */
export const DUE_PARTS = [
  { key: "late", label: "Atrasados", icon: "circle-alert" },
  { key: "today", label: "Hoje", icon: "clock" },
  { key: "week", label: "Próximos 7 dias", icon: "calendar-days" },
  { key: "later", label: "Mais adiante", icon: "calendar" },
  { key: "none", label: "Sem prazo", icon: "calendar-off" },
];

const isDone = (i) => i.status === "completed";

/** Most first; ties keep the order given (Mais › Listas, the InventarIA); the ones at zero go out. */
export function rank(rows) {
  return rows
    .map((r, k) => [r, k])
    .filter(([r]) => r.n > 0)
    .sort((a, b) => b[0].n - a[0].n || a[1] - b[1])
    .map(([r]) => r);
}

/** The first `top` rows and, folded, how many more and their pending (nothing folded when open). */
export function foldTop(rows, open = false, top = TOP) {
  if (open || rows.length <= top + 1) return { shown: rows, more: 0, moreN: 0 };
  const rest = rows.slice(top);
  return { shown: rows.slice(0, top), more: rest.length, moreN: rest.reduce((n, r) => n + r.n, 0) };
}

/** The part of Por prazo of a pending item: late, today, week (the next 7 days), later or none. */
export function dueKey(due, now = new Date()) {
  const d = dueInfo(due, now);
  if (!d) return "none";
  if (d.overdue) return "late";
  if (d.diff === 0) return "today";
  return d.diff < 7 ? "week" : "later";
}

/** 0–100, at least 1 when there is something (a sliver of bar, "1%"). */
const share = (n, of) => (n && of ? Math.max(1, Math.round((n / of) * 100)) : 0);

/**
 * The pending items of the lists on screen (the hidden ones are not passed in), counted:
 * lists [{id, name, color, icon, items, pending, noDue}]; due: Controlar prazos on;
 * rooms [{id, nome}] / equips [{id, nome, comodo, room}] (null when off); roomsOf, equipsOf and extOf
 * read a task (listId, summary). A task with several equipments counts for each one, and for each of
 * their rooms (once per room). Returns {pending, lists, rooms, equips, due, ext}: null for a chart that
 * is off or has nothing to show.
 */
export function summarize({ lists = [], due = true, rooms = null, equips = null, roomsOf = () => [], equipsOf = () => [], extOf = () => null, now = new Date() } = {}) {
  const roomIds = new Set((rooms || []).map((r) => r.id));
  const equipById = new Map((equips || []).map((e) => [e.id, e]));
  const perRoom = new Map();
  const perEquip = new Map();
  const who = new Map();
  const parts = Object.fromEntries(DUE_PARTS.map((p) => [p.key, 0]));
  const add = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  let pending = 0;
  let noRoom = 0;
  let noEquip = 0;
  let house = 0;
  let ext = 0;
  let dated = false;
  const perList = lists.map((l) => {
    const open = (l.items || []).filter((i) => !isDone(i));
    const n = l.items ? open.length : Number(l.pending) || 0;
    pending += n;
    const withDue = due && !l.noDue;
    if (withDue && open.length) dated = true;
    for (const i of open) {
      const es = equips ? [...new Set(equipsOf(l.id, i.summary))].filter((id) => equipById.has(id)) : [];
      if (equips) {
        if (es.length) es.forEach((id) => add(perEquip, id));
        else noEquip++;
      }
      if (rooms) {
        const rs = new Set([...roomsOf(l.id, i.summary), ...es.map((id) => equipById.get(id).comodo)].filter((id) => roomIds.has(id)));
        if (rs.size) rs.forEach((id) => add(perRoom, id));
        else noRoom++;
      }
      const e = extOf(l.id, i.summary);
      if (!e) house++;
      else {
        ext++;
        if (typeof e === "string") {
          const w = who.get(fold(e)) || { name: e, n: 0 };
          w.n++;
          who.set(fold(e), w);
        }
      }
      if (withDue) parts[dueKey(i.due, now)]++;
    }
    return { id: l.id, name: l.name, color: l.color, icon: l.icon, n };
  });
  return {
    pending,
    lists: rank(perList),
    rooms: rooms ? { rows: rank(rooms.map((r) => ({ id: r.id, name: r.nome, n: perRoom.get(r.id) || 0 }))), none: noRoom } : null,
    equips: equips ? { rows: rank(equips.map((e) => ({ id: e.id, name: e.nome, room: e.room || "", n: perEquip.get(e.id) || 0 }))), none: noEquip } : null,
    due: dated ? DUE_PARTS.map((p) => ({ ...p, n: parts[p.key] })).filter((p) => p.n) : null,
    ext: ext ? { house, ext, who: rank([...who.values()]) } : null,
  };
}

/** "lista", "lista e prazo", "lista, cômodo e prazo". */
const joinWords = (w) => (w.length > 1 ? `${w.slice(0, -1).join(", ")} e ${w[w.length - 1]}` : w[0]);

export const ChartsMixin = (Base) =>
  class extends Base {
    /** What the charts are of (the line of the menu Mais, and what the Conversa is told). */
    _chartsLine() {
      return `Pendências por ${joinWords(["lista", this._roomsOn() && "cômodo", this._equipsOn() && "equipamento", this._dueOn() && "prazo"].filter(Boolean))}.`;
    }

    _chartsData(now = new Date()) {
      const roomsOn = this._roomsOn();
      return summarize({
        lists: this._visible(),
        due: this._dueOn(),
        rooms: roomsOn ? this._roomList() : null,
        equips: this._equipsOn() ? this._equipList().map((e) => ({ ...e, room: (roomsOn && this._roomName(e.comodo)) || "" })) : null,
        roomsOf: (l, s) => this._roomIdsOf(l, s),
        equipsOf: (l, s) => this._equipIdsOf(l, s),
        extOf: (l, s) => this._externalOf(l, s),
        now,
      });
    }

    /** A room, an equipment or Serviço externo: Buscar with the word, the pending ones, found by it. */
    _chartsSearch(word, by) {
      this._haptic("light");
      this._query = word;
      this._searchDone = false;
      if (by === "rooms") this._searchRooms = true;
      if (by === "equips") this._searchEquips = true;
      if (by === "ext") this._searchExt = true;
      this._go("/buscar");
    }

    _chartsOpen(key) {
      return !!(this._chartsFolds && this._chartsFolds[key]);
    }

    _chartsToggle(key) {
      this._chartsFolds = { ...(this._chartsFolds || {}), [key]: !this._chartsOpen(key) };
      this.requestUpdate();
    }

    /** A chart: the icon in the soft square and its title, like the sections of Mais. */
    _gPanel(key, ic, title, body) {
      return html`<div class="panel g-panel" id="g-${key}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${icon(ic)}</span><h2>${title}</h2></div>
        ${body}
      </div>`;
    }

    /** The whole split in parts, by size (no text: the rows below carry the names and numbers). */
    _gSplit(label, parts) {
      if (parts.length < 2) return nothing;
      return html`<div class="g-split" role="img" aria-label="${label}: ${parts.map((p) => `${p.name} ${p.n}`).join(", ")}">
        ${parts.map((p) => html`<i class=${p.cls || ""} style="flex:${p.n} 1 0;${p.style || ""}" title="${p.name}: ${p.n}"></i>`)}
      </div>`;
    }

    /** A row: its tile (optional), the name (and a word beside it), the number (and the share) and its bar. */
    _gRow({ name, sub = "", n, max, pct = null, tile = "", cls = "", style = "", go = null, label = "" }) {
      const body = html`${tile ? html`<span class="g-tile">${icon(tile)}</span>` : nothing}
        <span class="g-name"><b>${name}</b>${sub ? html`<small>${sub}</small>` : nothing}</span>
        <span class="g-n">${n}</span>
        <span class="g-bar"><i style="width:${share(n, max)}%"></i></span>
        ${pct != null ? html`<span class="g-pct">${pct}%</span>` : nothing}`;
      const c = `g-row ${tile ? "" : "bare"} ${pct != null ? "with-pct" : ""} ${cls}`;
      return go ? html`<button class=${c} style=${style} aria-label=${label || name} @click=${go}>${body}</button>` : html`<div class=${c} style=${style}>${body}</div>`;
    }

    /** "+3 listas" under the first rows (opens the others), and "Ver menos" when open. */
    _gMore(key, rows, f, unit) {
      if (rows.length <= TOP + 1) return nothing;
      const open = this._chartsOpen(key);
      return html`<button class="g-more ${open ? "open" : ""}" aria-expanded=${open ? "true" : "false"} @click=${() => this._chartsToggle(key)}>
        <span class="g-more-t">${open ? "Ver menos" : `+${plural(f.more, unit[0], unit[1])}`}</span>${open ? nothing : html`<span class="g-n">${f.moreN}</span>`}${icon("chevron-down", "chev")}
      </button>`;
    }

    _gLists(rows) {
      const f = foldTop(rows, this._chartsOpen("lists"));
      const tone = (l) => colorVars(l.color, this._dark);
      const split = [...f.shown.map((l) => ({ name: l.name, n: l.n, style: tone(l) })), ...(f.more ? [{ name: `+${plural(f.more, "lista", "listas")}`, n: f.moreN, cls: "k-rest" }] : [])];
      return this._gPanel(
        "listas",
        "list-checks",
        "Por lista",
        html`${this._gSplit("Pendentes por lista", split)}
          ${f.shown.map((l) => this._gRow({ name: l.name, n: l.n, max: rows[0].n, tile: l.icon, style: tone(l), go: () => this._go(`/lista/${l.id}`), label: `${l.name}: ${plural(l.n, "pendente", "pendentes")}` }))}
          ${this._gMore("lists", rows, f, ["lista", "listas"])}`,
      );
    }

    /** Por cômodo and Por equipamento: the most pending first (a task in two counts in both); a tap searches it. */
    _gPlaces(key, ic, title, data, words) {
      const [none, empty, unit] = words;
      if (!data.rows.length) return this._gPanel(key, ic, title, html`<p class="panel-lead g-empty">${empty}</p>`);
      const f = foldTop(data.rows, this._chartsOpen(key));
      return this._gPanel(
        key,
        ic,
        title,
        html`${f.shown.map((r) => this._gRow({ name: r.name, sub: r.room || "", n: r.n, max: data.rows[0].n, go: () => this._chartsSearch(r.name, key), label: `${r.name}: ${plural(r.n, "pendente", "pendentes")}` }))}
          ${this._gMore(key, data.rows, f, unit)}
          ${data.none ? html`<p class="g-foot">${none}: <b>${data.none}</b></p>` : nothing}`,
      );
    }

    /** Por prazo: the parts of the lists with deadlines, in the colors of Prazos (late red, today amber, the rest grey). */
    _gDue(parts) {
      const total = parts.reduce((n, p) => n + p.n, 0);
      const max = Math.max(...parts.map((p) => p.n));
      return this._gPanel(
        "prazos",
        "calendar-clock",
        "Por prazo",
        html`${this._gSplit("Pendentes por prazo", parts.map((p) => ({ name: p.label, n: p.n, cls: `k-${p.key}` })))}
          ${parts.map((p) =>
            this._gRow({ name: p.label, n: p.n, max, pct: share(p.n, total), tile: p.icon, cls: `k-${p.key}`, go: p.key === "none" ? null : () => this._go(""), label: `${p.label}: ${plural(p.n, "pendente", "pendentes")}` }),
          )}`,
      );
    }

    /** Quem faz: Nós mesmos × Serviço externo (with who, when said); Serviço externo opens Buscar with it. */
    _gWho(x) {
      const total = x.house + x.ext;
      // who: the one with the most, and how many others ("Eletricista +1")
      const names = x.who.length ? x.who[0].name + (x.who.length > 1 ? ` +${x.who.length - 1}` : "") : "";
      const parts = [
        { key: "house", name: "Nós mesmos", n: x.house, icon: "house" },
        { key: "ext", name: "Serviço externo", n: x.ext, icon: "hard-hat", sub: names, go: () => this._chartsSearch("Serviço externo", "ext") },
      ].filter((p) => p.n);
      return this._gPanel(
        "quem",
        "hard-hat",
        "Quem faz",
        html`${this._gSplit("Quem faz", parts.map((p) => ({ name: p.name, n: p.n, cls: `k-${p.key}` })))}
          ${parts.map((p) => this._gRow({ name: p.name, sub: p.sub, n: p.n, max: Math.max(x.house, x.ext), pct: share(p.n, total), tile: p.icon, cls: `k-${p.key}`, go: p.go, label: `${p.name}: ${plural(p.n, "pendente", "pendentes")}` }))}`,
      );
    }

    /** Mais › Gráficos. */
    _renderCharts() {
      const s = this._chartsData();
      const status = { text: s.pending ? `${plural(s.pending, "pendente", "pendentes")} em ${plural(s.lists.length, "lista", "listas")}` : "Nada pendente" };
      return html`<section class="page">
        ${this._renderPageHead("Gráficos", status, true)}
        ${s.pending
          ? html`<div class="g-grid">
              ${this._gLists(s.lists)}
              ${s.rooms ? this._gPlaces("rooms", "door-open", "Por cômodo", s.rooms, ["Sem cômodo", "Nenhuma pendência com cômodo.", ["cômodo", "cômodos"]]) : nothing}
              ${s.equips ? this._gPlaces("equips", "package", "Por equipamento", s.equips, ["Sem equipamento", "Nenhuma pendência com equipamento.", ["equipamento", "equipamentos"]]) : nothing}
              ${s.due ? this._gDue(s.due) : nothing}
              ${s.ext ? this._gWho(s.ext) : nothing}
            </div>`
          : html`<div class="panel">
              <div class="empty">
                <div class="em-icon">${icon("chart-bar")}</div>
                <h3>Tudo resolvido</h3>
                <p>Nenhum item pendente nas listas.</p>
              </div>
            </div>`}
      </section>`;
    }
  };

export const chartStyles = `
  .g-panel { padding-bottom: 12px; }
  .g-split { display: flex; gap: 2px; height: 12px; margin: 0 0 12px; }
  .g-split i { display: block; min-width: 4px; background: var(--c, var(--rv-accent)); }
  .g-split i:first-child { border-radius: 6px 0 0 6px; }
  .g-split i:last-child { border-radius: 0 6px 6px 0; }
  .g-split i:only-child { border-radius: 6px; }
  .g-row { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; grid-template-rows: auto auto; column-gap: 12px; row-gap: 7px; align-items: center;
    width: calc(100% + 16px); margin: 0 -8px; padding: 9px 8px; border-radius: 12px; text-align: left; color: var(--rv-text); }
  .g-row.bare { grid-template-columns: minmax(0, 1fr) auto; }
  .g-tile { grid-row: 1 / 3; width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center; background: var(--cs, var(--rv-surface-2)); color: var(--ci, var(--rv-text-2)); }
  .g-tile .i { width: 18px; height: 18px; }
  /* the word beside the name (the room of an equipment, who does it) shows whole or not at all: it wraps to a hidden line */
  .g-name { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 8px; min-width: 0; height: 20px; overflow: hidden; }
  .g-name b { flex: 0 1 auto; max-width: 100%; min-width: 0; font-size: 15.5px; font-weight: 600; line-height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .g-name small { flex: none; font-size: 13px; line-height: 20px; color: var(--rv-muted); white-space: nowrap; }
  .g-n { font-family: var(--rv-display); font-size: 20px; font-weight: 600; line-height: 1; text-align: right; font-variant-numeric: tabular-nums; }
  .g-bar { grid-column: 2 / -1; height: 8px; border-radius: 4px; background: var(--rv-surface-2); overflow: hidden; }
  .g-row.bare .g-bar { grid-column: 1 / -1; }
  .g-row.with-pct .g-bar { grid-column: 2 / 3; }
  .g-row.bare.with-pct .g-bar { grid-column: 1 / 2; }
  .g-bar i { display: block; height: 100%; border-radius: 4px; background: var(--c, var(--rv-accent)); }
  .g-pct { font-size: 12.5px; line-height: 1; color: var(--rv-muted); text-align: right; font-variant-numeric: tabular-nums; }
  button.g-row:active { background: var(--rv-surface-2); }
  button.g-row:active .g-bar { background: var(--rv-surface); }
  .g-more { display: flex; align-items: center; gap: 10px; width: calc(100% + 16px); min-height: 44px; margin: 0 -8px; padding: 8px; border-radius: 12px; color: var(--rv-accent-ink); font-size: 14.5px; font-weight: 600; }
  .g-more-t { flex: 1; text-align: left; }
  .g-more .g-n { color: var(--rv-muted); font-size: 18px; }
  .g-more .chev { width: 18px; height: 18px; color: var(--rv-muted); transition: transform 0.2s; }
  .g-more.open .chev { transform: rotate(180deg); }
  .g-more:active { background: var(--rv-surface-2); }
  .g-foot { margin: 4px 0 6px; font-size: 13.5px; color: var(--rv-muted); }
  .g-foot b { color: var(--rv-text); font-weight: 600; font-variant-numeric: tabular-nums; }
  .g-empty { margin: 0 0 8px; }
  /* the colors of Prazos (late red, today amber), then greys going quiet; never the accent (the Cor do dia can be red) */
  :host { --g-today: #f59e0b; --g-week: #7b6d6e; --g-later: #ab9c9d; --g-none: #d9cbc8; }
  :host([dark]) { --g-today: var(--rv-today); --g-week: #a59798; --g-later: #7d7071; --g-none: #594d4e; }
  .k-rest { --c: var(--g-later); }
  .k-late { --c: var(--rv-late); --cs: var(--rv-late-soft); --ci: var(--rv-late); }
  .k-today { --c: var(--g-today); --cs: var(--rv-today-soft); --ci: var(--rv-today); }
  .k-week { --c: var(--g-week); }
  .k-later { --c: var(--g-later); }
  .k-none { --c: var(--g-none); --ci: var(--rv-muted); }
  .k-house { --c: var(--g-later); }
  .k-ext { --c: var(--rv-ext); --cs: var(--rv-ext-soft); --ci: var(--rv-ext); }
  @media (hover: hover) {
    button.g-row:hover, .g-more:hover { background: var(--rv-surface-2); }
    button.g-row:hover .g-bar { background: var(--rv-surface); }
  }
  @media (min-width: 1000px) {
    /* two columns, each chart whole in one of them (no holes under a short one) */
    .g-grid { column-count: 2; column-gap: 48px; }
    .g-grid > .g-panel { break-inside: avoid; display: flow-root; }
  }
`;
