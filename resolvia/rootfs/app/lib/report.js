// Mais › Relatório de pendências: the open tasks of the lists, to see, print or save as PDF (like the report of
// the GerencIA). All the marked lists (the ones on the start screen) or the one chosen on the page; each task with
// its deadline (late in red), and what is on in the app: repeat, points, rooms, equipment, Serviço externo.
// The page has Baixar PDF (2.45.1): the app Home Assistant on the phone doesn't print a page, a PDF it opens.
// 2.47.0: the charts of Mais › Gráficos (by list, by deadline, by room, by equipment, who does it), on the page and in
// the PDF, and at the end the mark of CorrerIA Code as in Mais › Sobre; the header without the name of the house.
import { Pdf, wrap, textWidth } from "./pdf.js";

// The colors of the lists, the same as frontend/src/util.js (PALETTE and AUTO_COLORS): a list without a chosen
// color takes the warm ones in turn, in the order of the app (by device, then by name).
const PALETTE = {
  vermelho: "#FF5A4F", coral: "#FF8A65", laranja: "#FFA23E", ouro: "#F2C14E", verde: "#8BD45F", menta: "#4ED3A6",
  turquesa: "#3CCBDA", azul: "#62B5FF", indigo: "#8F9BFF", lilas: "#B99BFF", rosa: "#FF77A9", grafite: "#B5B9C2",
  // saved before 2.53.0, out of the palette now: the nearest one (as colorById in the app)
  framboesa: "#FF77A9",
};
const AUTO_COLORS = ["vermelho", "coral", "rosa", "laranja", "lilas", "ouro"];

/**
 * The name and the color of each list as the app shows them (listMeta and _computeLists in the app): the name without
 * the device in front ("Notas e Rotinas do Alexa Shopping list" → "Shopping list"), the color chosen or the one of its
 * turn. states: Map id -> state (all the todo of Home Assistant); entities: [{ei, di}] (list_for_display);
 * devices: [{id, name, name_by_user}]; prefs: the prefs of the lists. Returns Map id -> {name, color}.
 */
export function listLooks({ states = new Map(), entities = [], devices = [], prefs = {} } = {}) {
  const devById = new Map((devices || []).map((d) => [d.id, d]));
  const devOf = new Map((entities || []).filter((e) => e && e.di).map((e) => [e.ei, devById.get(e.di)]));
  const rows = [...states.keys()]
    .filter((id) => id.startsWith("todo."))
    .map((id) => {
      const st = states.get(id) || {};
      const friendly = (st.attributes && st.attributes.friendly_name) || id.split(".")[1].replace(/_/g, " ");
      const dev = devOf.get(id);
      const devName = dev ? dev.name_by_user || dev.name : "";
      let name = friendly;
      if (devName && friendly.toLowerCase().startsWith(`${devName.toLowerCase()} `)) name = friendly.slice(devName.length + 1);
      return { id, name: name.charAt(0).toUpperCase() + name.slice(1), group: devName || "" };
    })
    .sort((a, b) => a.group.localeCompare(b.group, "pt-BR") || a.name.localeCompare(b.name, "pt-BR"));
  return new Map(
    rows.map((l, k) => {
      const p = prefs[l.id] || {};
      return [l.id, { name: p.name || l.name, color: PALETTE[p.color] || PALETTE[AUTO_COLORS[k % AUTO_COLORS.length]] }];
    }),
  );
}

const DAY = 86400000;
const pad = (n) => String(n).padStart(2, "0");
const WEEK = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
/** The time of a deadline: a day (local midnight) or a moment. */
const dueMs = (due) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(due || "");
  return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : Date.parse(due);
};

/** "Atrasada há 3 dias", "Hoje", "Amanhã", "sex, 14 nov" (+ the time when it has one). */
export function dueText(due, now) {
  const at = dueMs(due);
  if (!Number.isFinite(at)) return { text: "", late: false };
  const d = new Date(at);
  const days = Math.round((dayStart(d) - dayStart(new Date(now))) / DAY);
  const timed = String(due).length > 10;
  const time = timed ? ` às ${pad(d.getHours())}:${pad(d.getMinutes())}` : "";
  const late = timed ? at < now : days < 0;
  if (late) return { text: days < 0 ? (days === -1 ? "Atrasada desde ontem" : `Atrasada há ${-days} dias`) : `Atrasada (hoje${time})`, late: true, days };
  if (days === 0) return { text: `Hoje${time}`, late: false, days };
  if (days === 1) return { text: `Amanhã${time}`, late: false, days };
  return { text: `${WEEK[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}${d.getFullYear() !== new Date(now).getFullYear() ? ` ${d.getFullYear()}` : ""}${time}`, late: false, days };
}

const every = (days) => (days === 1 ? "todo dia" : days === 7 ? "toda semana" : days === 14 ? "a cada 2 semanas" : days === 30 ? "todo mês" : `a cada ${days} dias`);

/**
 * What is pending. lists: [{id, name, owner, hidden, due, color}] (due: its dates are deadlines), all of them;
 * items: Map list id -> HA items; pick: a marked list id (a hidden one is not offered), or "" for all the marked ones; extra(listId, item):
 * {repeat, points, rooms, equips, external}, only what is on.
 */
export function pendencias({ lists = [], items = new Map(), pick = "", now = Date.now(), extra = () => ({}) }) {
  const marked = lists.filter((l) => !l.hidden);
  const chosen = pick && marked.some((l) => l.id === pick) ? marked.filter((l) => l.id === pick) : marked;
  const sections = [];
  let late = 0;
  let today = 0;
  let undated = 0;
  for (const l of chosen) {
    const rows = [];
    for (const i of items.get(l.id) || []) {
      if (!i || i.status === "completed" || !String(i.summary || "").trim()) continue;
      const d = l.due && i.due ? dueText(i.due, now) : null;
      const x = extra(l.id, i) || {};
      const tags = [x.repeat ? `repete ${every(x.repeat)}` : "", x.external ? (x.external === true ? "serviço externo" : `serviço externo: ${x.external}`) : "", ...(x.rooms || []), ...(x.equips || [])].filter(Boolean);
      rows.push({
        title: String(i.summary).trim(), due: d, at: d ? dueMs(i.due) : Infinity, tags, points: x.points || 0,
        rooms: x.rooms || [], equips: x.equips || [], external: x.external || null,
        // its part in Por prazo: the same as the counts above (a list whose dates are no deadlines: sem prazo)
        part: !d ? "none" : d.late ? "late" : d.days === 0 ? "today" : d.days < 7 ? "week" : "later",
      });
      if (!d) undated++;
      else if (d.late) late++;
      else if (d.days === 0) today++;
    }
    // late first, then by deadline, the ones without one last (by name)
    rows.sort((a, b) => a.at - b.at || a.title.localeCompare(b.title, "pt-BR", { numeric: true }));
    sections.push({ id: l.id, name: l.name, owner: l.owner || "", color: l.color || "", due: !!l.due, rows, late: rows.filter((r) => r.due && r.due.late).length });
  }
  const total = sections.reduce((n, s) => n + s.rows.length, 0);
  return { at: now, pick: chosen.length === 1 && pick ? pick : "", lists, sections, total, late, today, undated, dueOn: lists.some((l) => l.due) };
}

/** The parts of Por prazo, in order (the groups of Prazos and of Mais › Gráficos). */
export const DUE_PARTS = [
  ["late", "Atrasadas"],
  ["today", "Hoje"],
  ["week", "Próximos 7 dias"],
  ["later", "Mais adiante"],
  ["none", "Sem prazo"],
];
/** Rows shown before "+N" (as in Mais › Gráficos); it only folds when that hides two or more. */
const TOP = 6;
/** Most first; ties keep the order given; the ones at zero go out. */
const rank = (rows) =>
  rows
    .map((r, k) => [r, k])
    .filter(([r]) => r.n > 0)
    .sort((a, b) => b[0].n - a[0].n || a[1] - b[1])
    .map(([r]) => r);
/** The first rows and, folded, how many more and their pending. */
export const foldTop = (rows) => (rows.length <= TOP + 1 ? { shown: rows, more: 0, moreN: 0 } : { shown: rows.slice(0, TOP), more: rows.length - TOP, moreN: rows.slice(TOP).reduce((n, r) => n + r.n, 0) });
/** 0–100, at least 1 when there is something. */
const share = (n, of) => (n && of ? Math.max(1, Math.round((n / of) * 100)) : 0);

/**
 * The charts of the report, the same as Mais › Gráficos, of what is in it: by list (two or more lists with something),
 * by deadline (with Controlar prazos on and two parts or more; the same parts as the counts above: a task of a list
 * whose dates are no deadlines is sem prazo), by room and by equipment (when some task has one; a task in two
 * counts in both), who does it (when some task is a Serviço externo). Returns {lists, due, rooms, equips, who}, each
 * a chart {title, rows: [{name, n, sub?, key?, color?}], max, total, pct, split (the whole split on top, not in the
 * places, like the app), none?, unit} or null.
 */
export function graficos(rep) {
  const rows = rep.sections.flatMap((s) => s.rows);
  const total = rows.length;
  if (!total) return { lists: null, due: null, rooms: null, equips: null, who: null };
  const lists = rank(rep.sections.map((s) => ({ name: s.name, n: s.rows.length, color: s.color })));
  const parts = Object.fromEntries(DUE_PARTS.map(([k]) => [k, 0]));
  for (const r of rows) parts[r.part]++;
  const due = DUE_PARTS.map(([key, name]) => ({ key, name, n: parts[key] })).filter((p) => p.n);
  const places = (get) => {
    const m = new Map();
    let none = 0;
    for (const r of rows) {
      const xs = [...new Set(get(r))];
      if (!xs.length) none++;
      for (const x of xs) m.set(x, (m.get(x) || 0) + 1);
    }
    return { rows: rank([...m].map(([name, n]) => ({ name, n }))), none };
  };
  const chart = (title, rs, extra = {}) => ({ title, rows: rs, max: Math.max(0, ...rs.map((x) => x.n)), total: rs.reduce((n, x) => n + x.n, 0), pct: false, split: true, ...extra });
  const ext = rows.filter((r) => r.external);
  const who = rank(ext.filter((r) => typeof r.external === "string").reduce((acc, r) => {
    const k = r.external.trim().toLowerCase();
    const w = acc.find((x) => x.k === k);
    if (w) w.n++;
    else acc.push({ k, name: r.external.trim(), n: 1 });
    return acc;
  }, []));
  const rooms = rows.some((r) => r.rooms.length) ? places((r) => r.rooms) : null;
  const equips = rows.some((r) => r.equips.length) ? places((r) => r.equips) : null;
  return {
    lists: lists.length > 1 ? chart("Por lista", lists, { unit: ["lista", "listas"] }) : null,
    due: rep.dueOn && due.length > 1 ? chart("Por prazo", due, { pct: true }) : null,
    rooms: rooms ? chart("Por cômodo", rooms.rows, { none: rooms.none, noneLabel: "Sem cômodo", unit: ["cômodo", "cômodos"], split: false }) : null,
    equips: equips ? chart("Por equipamento", equips.rows, { none: equips.none, noneLabel: "Sem equipamento", unit: ["equipamento", "equipamentos"], split: false }) : null,
    who: ext.length
      ? chart("Quem faz", [
          { key: "house", name: "Nós mesmos", n: total - ext.length },
          { key: "ext", name: "Serviço externo", n: ext.length, sub: who.length ? who[0].name + (who.length > 1 ? ` +${who.length - 1}` : "") : "" },
        ].filter((p) => p.n), { pct: true })
      : null,
  };
}

/** The charts in order. */
const chartList = (g) => [g.lists, g.due, g.rooms, g.equips, g.who].filter(Boolean);

/** The lightning of CorrerIA Code (Lucide zap), in a box of 24. */
const ZAP = [[13, 2], [3, 14], [12, 14], [11, 22], [21, 10], [12, 10]];

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** The icon of the app (the block with the check), in the color of the app. */
const ICON = (cor) => `<svg class="ic" viewBox="0 0 32 32" aria-hidden="true">
<path d="M8 6h16a5 5 0 0 1 5 5v12.5L22.5 30H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="${cor}"/>
<path d="M3 14.2h26M3 19h26M3 23.8h19" stroke="#000" stroke-opacity=".13" stroke-width="1"/>
<path d="M22.5 30v-4.6a1.9 1.9 0 0 1 1.9-1.9H29z" fill="#000" fill-opacity=".28"/>
<path d="M9.6 18.6l4.3 4.3 8.6-9" fill="none" stroke="#2a1614" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 2.8v6.4M16 2.8v6.4M22.5 2.8v6.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`;

/**
 * Baixar PDF (2.47.1): the page is in the frame of the app in Home Assistant, and the app Home Assistant on Android
 * only downloads what the page of Home Assistant itself asks for (a frame's link does nothing there). So the link goes
 * to the top page, as Home Assistant downloads its backups: a link there with download, clicked. The same origin
 * (ingress) lets it; without it (another origin, no frame), the link downloads as always.
 */
export const BAIXAR =
  "try{var d=window.top.document,a=d.createElement('a');a.href=this.href;a.download=this.getAttribute('download')||'';a.target='_blank';a.style.display='none';" +
  "d.body.appendChild(a);a.dispatchEvent(new MouseEvent('click'));d.body.removeChild(a);var b=this;b.textContent='Baixando…';" +
  "setTimeout(function(){b.textContent='Baixar PDF'},4000);return false}catch(e){return true}";

/** The colors of the parts of the charts (lists bring their own): late red, today amber, then greys going quiet. */
const PART = { late: "var(--late)", today: "var(--today)", week: "var(--g1)", later: "var(--g2)", none: "var(--g3)", house: "var(--g2)", ext: "var(--ext)", rest: "var(--g2)" };
const partColor = (x) => x.color || PART[x.key] || "var(--a)";

/** A chart of the page: the whole split in parts, then a row per part (name, number, bar; the share in Por prazo). */
function chartHtml(c) {
  const f = foldTop(c.rows);
  const split = [...f.shown, ...(f.more ? [{ key: "rest", name: `+${plural(f.more, c.unit[0], c.unit[1])}`, n: f.moreN }] : [])];
  const bar = c.split && split.length > 1 ? `<div class="split" role="img" aria-label="${esc(c.title)}: ${esc(split.map((x) => `${x.name} ${x.n}`).join(", "))}">${split.map((x) => `<i style="flex:${x.n} 1 0;background:${partColor(x)}"></i>`).join("")}</div>` : "";
  const rows = f.shown
    .map((x) => `<div class="gl${c.pct ? " pct" : ""}"><span class="nm"><b>${esc(x.name)}</b>${x.sub ? `<small>${esc(x.sub)}</small>` : ""}</span><span class="v">${x.n}</span>` +
      `<span class="bar"><i style="width:${share(x.n, c.max)}%;background:${partColor(x)}"></i></span>${c.pct ? `<span class="p">${share(x.n, c.total)}%</span>` : ""}</div>`)
    .join("");
  const more = f.more ? `<p class="gpe">+${plural(f.more, c.unit[0], c.unit[1])}: <b>${f.moreN}</b></p>` : "";
  const none = c.none ? `<p class="gpe">${esc(c.noneLabel)}: <b>${c.none}</b></p>` : "";
  return `<section class="g"><h3>${esc(c.title)}</h3>${bar}${rows}${more}${none}</section>`;
}

/** The mark of CorrerIA Code (as in Mais › Sobre): the lightning in the tilted square, the name and what it does. */
const MARCA = `<footer class="marca"><span class="raio" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M${ZAP.map((p) => p.join(" ")).join("L")}Z"/></svg></span>` +
  `<span><b class="nome">Correr<i>IA</i> Code</b><small>desenvolvimento de softwares</small></span></footer>`;

/**
 * The page (HTML): a header with the app, what the report is, when and which lists; the choice of the lists
 * and Baixar PDF (not on paper); the counts, the charts and a section per list; at the end, the mark of CorrerIA
 * Code. tema: "claro" | "escuro" (the one of the app; none: the one of the device); cor: the color of the app
 * (#rrggbb). On paper it is always light.
 */
export function reportHtml(rep, { tema = null, cor = "#ff8a65" } = {}) {
  // the PDF of what is on screen (the same list), in the color of the app
  const pdfHref = `relatorio.pdf?${new URLSearchParams({ ...(rep.pick ? { lista: rep.pick } : {}), cor: /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65" })}`;
  const attr = tema === "claro" ? ' data-theme="light"' : tema === "escuro" ? ' data-theme="dark"' : "";
  const accent = /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65";
  const d = new Date(rep.at);
  const when = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const marked = rep.lists.filter((l) => !l.hidden);
  const which = rep.pick ? `na lista ${rep.sections[0].name}` : marked.length === rep.lists.length ? "em todas as listas" : marked.length === 1 ? `na lista ${marked[0].name}` : `nas ${marked.length} listas marcadas`;
  const options = [`<option value=""${rep.pick ? "" : " selected"}>Todas as listas marcadas</option>`]
    .concat(marked.map((l) => `<option value="${esc(l.id)}"${rep.pick === l.id ? " selected" : ""}>${esc(l.name)}</option>`))
    .join("");
  const tiles = [
    ["Pendentes", rep.total, ""],
    ...(rep.dueOn ? [["Atrasadas", rep.late, rep.late ? "late" : ""], ["Para hoje", rep.today, ""]] : []),
    ["Sem prazo", rep.undated, ""],
  ]
    .map(([t, n, c]) => `<div class="${c}"><span>${t}</span><b>${n}</b></div>`)
    .join("");
  const section = (s) => {
    const rows = s.rows
      .map(
        (r) => `<tr><td class="ck" aria-hidden="true"></td><td>${esc(r.title)}${r.tags.length ? `<small>${esc(r.tags.join(" · "))}</small>` : ""}</td>` +
          `<td class="n${r.due && r.due.late ? " late" : ""}">${r.due ? esc(r.due.text) : "<span class=mut>sem prazo</span>"}${r.points ? `<small class="pts">+${r.points} pontos</small>` : ""}</td></tr>`,
      )
      .join("");
    const sub = [s.owner ? `de ${s.owner}` : "", plural(s.rows.length, "pendente", "pendentes"), s.late ? `${s.late} ${s.late === 1 ? "atrasada" : "atrasadas"}` : ""].filter(Boolean).join(" · ");
    return `<section><h2><span>${esc(s.name)}</span><small>${esc(sub)}</small></h2>${s.rows.length ? `<table><tbody>${rows}</tbody></table>` : `<p class="vazio">Nada pendente nesta lista.</p>`}</section>`;
  };
  const claro = "--bg:#f6f7f9;--card:#fff;--fg:#141a22;--mut:#5b6573;--linha:#e3e7ec;--linha2:#eef1f4;--borda:#d6dbe2;--late:#d92d20;--pts:#b7791f;--today:#f59e0b;--ext:#4f46e5;--g1:#7b8590;--g2:#aab3bd;--g3:#d5dbe2";
  const escuro = "--bg:#0f1318;--card:#161c23;--fg:#e8edf3;--mut:#9aa6b4;--linha:#2a3340;--linha2:#1f2732;--borda:#334051;--late:#ff6b5e;--pts:#f5c451;--today:#ffb547;--ext:#a5b4fc;--g1:#9aa6b4;--g2:#66727f;--g3:#3a4552";
  const charts = chartList(graficos(rep));
  return `<!doctype html><html lang="pt-BR"${attr}><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Relatório de pendências · ResolvIA</title>
<style>
@font-face{font-family:Barlow;font-weight:400;src:url(fonts/barlow-400.woff2) format("woff2")}
@font-face{font-family:Barlow;font-weight:600;src:url(fonts/barlow-600.woff2) format("woff2")}
@font-face{font-family:"Barlow Condensed";font-weight:700;src:url(fonts/barlow-condensed-700.woff2) format("woff2")}
:root{--a:${accent};${claro};color-scheme:light}
:root[data-theme="dark"]{${escuro};color-scheme:dark}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${escuro};color-scheme:dark}}
*{box-sizing:border-box}
body{font:15px/1.45 Barlow,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--fg);background:var(--bg);margin:0;padding:20px 16px 48px}
main{max-width:860px;margin:0 auto}
.barra{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.barra a,.barra button,.barra select{font:inherit;font-size:14px;font-weight:600;min-height:44px;padding:8px 10px;border-radius:12px;border:1px solid var(--borda);background:var(--card);color:var(--fg);text-decoration:none;cursor:pointer;text-align:center}
.barra a{display:flex;align-items:center;justify-content:center;line-height:1.2}
/* the box closed like the boxes of the app: its own arrow, never the one of the phone (it opens in selectsheet.js) */
.barra select{grid-column:1/-1;text-align:left;font-size:15px;padding:10px 40px 10px 14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-appearance:none;appearance:none;background-image:linear-gradient(45deg,transparent 50%,var(--mut) 50%),linear-gradient(135deg,var(--mut) 50%,transparent 50%);background-position:calc(100% - 20px) 52%,calc(100% - 14px) 52%;background-size:6px 6px;background-repeat:no-repeat}
.barra .pdf{background:var(--a);border-color:transparent;color:#1a1210}
.cab{display:flex;gap:14px;align-items:center;background:var(--card);border:1px solid var(--linha);border-left:6px solid var(--a);border-radius:16px;padding:16px 18px;margin-bottom:14px}
.cab .ic{width:52px;height:52px;flex:none;color:var(--fg)}
.cab .app{font:600 13.5px/1.2 Barlow,sans-serif;color:var(--mut)}
.cab .app .wm{font:700 19px/1 "Barlow Condensed",Barlow,sans-serif;color:var(--fg);letter-spacing:.01em}
.cab .app .wm b{color:var(--a)}
.cab h1{font:700 30px/1.05 "Barlow Condensed",Barlow,sans-serif;margin:4px 0 4px;letter-spacing:-.01em}
.cab p{margin:0;color:var(--mut);font-size:13.5px}
.resumo{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-bottom:6px}
.resumo div{background:var(--card);border:1px solid var(--linha);border-radius:12px;padding:10px 12px}
.resumo b{display:block;font:700 26px/1.1 "Barlow Condensed",Barlow,sans-serif}
.resumo .late b{color:var(--late)}
.resumo span{color:var(--mut);font-size:13px}
section{background:var(--card);border:1px solid var(--linha);border-radius:16px;padding:6px 16px 10px;margin-top:14px}
h2{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:4px 12px;border-bottom:2px solid var(--a);padding:8px 0 6px;margin:0 0 4px}
h2 span{font:700 20px/1.2 "Barlow Condensed",Barlow,sans-serif}
h2 small{color:var(--mut);font-size:13px;font-weight:400}
table{width:100%;border-collapse:collapse;font-size:14.5px}
td{padding:9px 6px;border-bottom:1px solid var(--linha2);vertical-align:top}
tr:last-child td{border-bottom:0}
td small{display:block;color:var(--mut);font-size:12.5px}
.ck{width:26px;padding-right:0}
.ck::before{content:"";display:block;width:16px;height:16px;margin-top:2px;border:2px solid var(--borda);border-radius:5px}
.n{text-align:right;white-space:nowrap;font-size:13.5px}
.n.late{color:var(--late);font-weight:600}
.pts{color:var(--pts)!important;font-weight:600}
.mut,.vazio{color:var(--mut)}
.vazio{margin:10px 0}
.graficos{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:14px;margin-top:14px;align-items:start}
.graficos section{margin:0;padding:12px 16px}
.g h3{font:700 20px/1.2 "Barlow Condensed",Barlow,sans-serif;margin:2px 0 10px}
.split{display:flex;gap:2px;height:10px;margin:0 0 8px}
.split i{display:block;min-width:4px}
.split i:first-child{border-radius:5px 0 0 5px}
.split i:last-child{border-radius:0 5px 5px 0}
.gl{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:12px;row-gap:6px;align-items:center;padding:7px 0}
.nm{display:flex;align-items:baseline;gap:8px;min-width:0;overflow:hidden}
.nm b{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nm small{color:var(--mut);font-size:12.5px;white-space:nowrap}
.v{font:700 19px/1 "Barlow Condensed",Barlow,sans-serif;text-align:right;font-variant-numeric:tabular-nums}
.bar{grid-column:1/-1;height:7px;border-radius:4px;background:var(--linha2);overflow:hidden}
.gl.pct .bar{grid-column:1/2}
.bar i{display:block;height:100%;border-radius:4px}
.p{font-size:12px;line-height:1;color:var(--mut);text-align:right;font-variant-numeric:tabular-nums}
.gpe{margin:6px 0 2px;font-size:13px;color:var(--mut)}
.gpe b{color:var(--fg);font-weight:600}
.marca{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:28px;padding-top:20px;border-top:1px solid var(--linha)}
.raio{display:grid;place-items:center;width:34px;height:34px;flex:none;border-radius:11px;background:var(--a);transform:rotate(-8deg);box-shadow:0 8px 18px -10px var(--a)}
.raio svg{width:19px;height:19px;fill:#1a1210}
.marca .nome{display:block;font:700 20px/1 "Barlow Condensed",Barlow,sans-serif;color:var(--fg)}
.marca .nome i{font-style:normal;color:var(--a)}
.marca small{display:block;margin-top:4px;color:var(--mut);font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
@media print{:root,:root[data-theme],:root:not([data-theme="light"]){${claro};--bg:#fff;color-scheme:light} .barra{display:none} body{padding:0} section,.marca{break-inside:avoid-page} .cab,section,.resumo div{border-color:#d6dbe2} .raio{box-shadow:none}}
</style><script src="selectsheet.js"></script></head><body><main>
<div class="barra">
<select aria-label="Listas" onchange="var u=new window.URL(window.location.href);if(this.value)u.searchParams.set('lista',this.value);else u.searchParams.delete('lista');location.replace(u.href)">${options}</select>
<a href="./" onclick="if(history.length>1){history.back();return false}">Voltar</a><a class="pdf" href="${esc(pdfHref)}" download="${esc(pdfName(rep))}" onclick="${BAIXAR}">Baixar PDF</a>
</div>
<header class="cab">${ICON(accent)}<div><div class="app"><span class="wm">Resolv<b>IA</b></span> · listas de tarefas</div><h1>Relatório de pendências</h1><p>O que falta fazer ${esc(which)} · ${when}</p></div></header>
${rep.total ? `<div class="resumo">${tiles}</div>` : ""}
${charts.length ? `<div class="graficos">${charts.map(chartHtml).join("")}</div>` : ""}
${rep.sections.length ? rep.sections.map(section).join("") : `<p class="vazio">Nenhuma lista marcada.</p>`}
${MARCA}
</main></body></html>`;
}

/** The name of the PDF: pendencias-2026-11-07.pdf (pendencias-casa-2026-11-07.pdf for one list). */
export function pdfName(rep) {
  const d = new Date(rep.at);
  const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const list = rep.pick ? String(rep.pick).replace(/^todo\./, "").replace(/[^a-z0-9_]+/gi, "").replace(/_/g, "-").slice(0, 40) : "";
  return `pendencias-${list ? `${list}-` : ""}${day}.pdf`;
}

/** A square of side s with round corners (r), turned by deg around its center (cx, cy): points for Pdf.path. */
function tiltedSquare(cx, cy, s, r, deg) {
  const a = (deg * Math.PI) / 180;
  const h = s / 2 - r;
  const pts = [];
  for (const [ox, oy, start] of [[h, h, 0], [-h, h, 90], [-h, -h, 180], [h, -h, 270]]) {
    for (let k = 0; k <= 6; k++) {
      const t = ((start + k * 15) * Math.PI) / 180;
      pts.push([ox + r * Math.cos(t), oy + r * Math.sin(t)]);
    }
  }
  return pts.map(([x, y]) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]);
}

/**
 * The report as a PDF (A4, always light): the same header (the icon and the name of the app, what it is, when and
 * which lists), the counts, the charts two by two and a part per list, a page after another; at the foot of each
 * page, the mark of CorrerIA Code and the page.
 */
export function reportPdf(rep, { cor = "#ff8a65" } = {}) {
  const A = /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65";
  const C = { fg: "#141a22", mut: "#5b6573", line: "#e3e7ec", line2: "#eef1f4", box: "#d6dbe2", late: "#d92d20", pts: "#b7791f", card: "#f6f7f9" };
  const PARTS = { late: C.late, today: "#f59e0b", week: "#7b8590", later: "#aab3bd", none: "#d5dbe2", house: "#aab3bd", ext: "#4f46e5", rest: "#aab3bd" };
  const pdf = new Pdf({ title: "Relatório de pendências · ResolvIA" });
  const M = 40;
  const W = pdf.W - 2 * M;
  const BOTTOM = pdf.H - 64; // the foot: a line and the mark of CorrerIA Code
  const d = new Date(rep.at);
  const when = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const marked = rep.lists.filter((l) => !l.hidden);
  const which = rep.pick ? `na lista ${rep.sections[0].name}` : marked.length === rep.lists.length ? "em todas as listas" : marked.length === 1 ? `na lista ${marked[0].name}` : `nas ${marked.length} listas marcadas`;
  let y = M;

  // the icon of the app: the block with the check and the rings
  const icon = (x, top, s) => {
    const u = s / 32;
    const P = (px, py) => [x + px * u, top + py * u];
    pdf.path([P(8, 6), P(24, 6), P(29, 11), P(29, 23.5), P(22.5, 30), P(8, 30), P(3, 25), P(3, 11)], { fill: A, close: true });
    pdf.path([P(22.5, 30), P(22.5, 25.4), P(24.4, 23.5), P(29, 23.5)], { fill: "#c9c9c9", close: true });
    pdf.path([P(9.6, 18.6), P(13.9, 22.9), P(22.5, 13.9)], { stroke: "#2a1614", width: 2.9 * u, round: true });
    for (const rx of [9.5, 16, 22.5]) pdf.line(...P(rx, 2.8), ...P(rx, 9.2), { color: C.fg, width: 2.1 * u, cap: 1 });
  };

  // the header
  const head = () => {
    const h = 88;
    pdf.rect(M, y, W, h, { fill: C.card, stroke: C.line, r: 10 });
    pdf.rect(M, y, 5, h, { fill: A });
    icon(M + 18, y + 18, 52);
    const tx = M + 84;
    pdf.text(tx, y + 24, "Resolv", { size: 15, bold: true, color: C.fg });
    const w1 = textWidth("Resolv", 15, true);
    pdf.text(tx + w1, y + 24, "IA", { size: 15, bold: true, color: A });
    const w2 = textWidth("IA", 15, true);
    pdf.text(tx + w1 + w2 + 6, y + 24, "· listas de tarefas", { size: 10, color: C.mut });
    pdf.text(tx, y + 52, "Relatório de pendências", { size: 22, bold: true, color: C.fg });
    pdf.text(tx, y + 72, `O que falta fazer ${which} · ${when}`, { size: 10, color: C.mut });
    y += h + 14;
  };
  head();

  // the counts
  if (rep.total) {
    const tiles = [["Pendentes", rep.total, C.fg], ...(rep.dueOn ? [["Atrasadas", rep.late, rep.late ? C.late : C.fg], ["Para hoje", rep.today, C.fg]] : []), ["Sem prazo", rep.undated, C.fg]];
    const gap = 10;
    const tw = (W - gap * (tiles.length - 1)) / tiles.length;
    tiles.forEach(([label, num, color], i) => {
      const x = M + i * (tw + gap);
      pdf.rect(x, y, tw, 50, { stroke: C.line, r: 8 });
      pdf.text(x + 12, y + 18, label, { size: 9, color: C.mut });
      pdf.text(x + 12, y + 40, String(num), { size: 18, bold: true, color });
    });
    y += 64;
  }

  const newPage = () => {
    pdf.addPage();
    y = M;
    pdf.text(M, y + 10, "Relatório de pendências · ResolvIA", { size: 9, color: C.mut });
    y += 26;
  };

  // the charts, two by two, each in a card: the split, then a row per part (name, number, bar; the share in Por prazo)
  const ROW = 24;
  const chartH = (c) => {
    const f = foldTop(c.rows);
    return 34 + (c.split && f.shown.length + (f.more ? 1 : 0) > 1 ? 16 : 0) + f.shown.length * ROW + (f.more ? 15 : 0) + (c.none ? 15 : 0) + 4;
  };
  const drawChart = (c, x, top, w, h) => {
    const f = foldTop(c.rows);
    pdf.rect(x, top, w, h, { stroke: C.line, r: 8 });
    const ix = x + 12;
    const iw = w - 24;
    pdf.text(ix, top + 20, c.title, { size: 12.5, bold: true, color: C.fg });
    let cy = top + 30;
    const split = [...f.shown, ...(f.more ? [{ key: "rest", n: f.moreN }] : [])];
    if (c.split && split.length > 1) {
      const sum = split.reduce((n, p) => n + p.n, 0);
      const gap = 1.5;
      const room = iw - gap * (split.length - 1);
      let sx = ix;
      split.forEach((p) => {
        const pw = Math.max(3, (p.n / sum) * room);
        pdf.rect(sx, cy, pw, 7, { fill: p.color || PARTS[p.key] || A, r: 1.5 });
        sx += pw + gap;
      });
      cy += 16;
    }
    for (const p of f.shown) {
      const pctW = c.pct ? 30 : 0;
      const label = wrap(p.name, iw - 40, 10)[0] || "";
      pdf.text(ix, cy + 10, label, { size: 10, color: C.fg });
      if (p.sub) pdf.text(ix + textWidth(label, 10) + 6, cy + 10, p.sub, { size: 8.5, color: C.mut });
      pdf.text(ix + iw, cy + 10, String(p.n), { size: 11, bold: true, color: C.fg, align: "right" });
      pdf.rect(ix, cy + 15, iw - pctW, 4, { fill: C.line2, r: 2 });
      pdf.rect(ix, cy + 15, Math.max(2, ((iw - pctW) * share(p.n, c.max)) / 100), 4, { fill: p.color || PARTS[p.key] || A, r: 2 });
      if (c.pct) pdf.text(ix + iw, cy + 19.5, `${share(p.n, c.total)}%`, { size: 7.5, color: C.mut, align: "right" });
      cy += ROW;
    }
    if (f.more) {
      pdf.text(ix, cy + 9, `+${plural(f.more, c.unit[0], c.unit[1])}: ${f.moreN}`, { size: 9, color: C.mut });
      cy += 15;
    }
    if (c.none) pdf.text(ix, cy + 9, `${c.noneLabel}: ${c.none}`, { size: 9, color: C.mut });
  };
  const charts = chartList(graficos(rep));
  for (let k = 0; k < charts.length; k += 2) {
    const pair = charts.slice(k, k + 2);
    const h = Math.max(...pair.map(chartH));
    if (y + h > BOTTOM) newPage();
    const cw = (W - 12) / 2;
    pair.forEach((c, i) => drawChart(c, M + i * (cw + 12), y, cw, h));
    y += h + 12;
  }
  if (charts.length) y += 6;
  const sectionHead = (s, cont = false) => {
    const meta = [s.owner ? `de ${s.owner}` : "", plural(s.rows.length, "pendente", "pendentes"), s.late ? `${s.late} ${s.late === 1 ? "atrasada" : "atrasadas"}` : ""].filter(Boolean).join(" · ");
    pdf.text(M, y + 14, `${s.name}${cont ? " (continuação)" : ""}`, { size: 14, bold: true, color: C.fg });
    pdf.text(M + W, y + 14, meta, { size: 9, color: C.mut, align: "right" });
    pdf.line(M, y + 21, M + W, y + 21, { color: A, width: 1.5 });
    y += 30;
  };

  const DUE_W = 120;
  for (const s of rep.sections) {
    if (y + 60 > BOTTOM) newPage();
    sectionHead(s);
    if (!s.rows.length) {
      pdf.text(M, y + 10, "Nada pendente nesta lista.", { size: 10, color: C.mut });
      y += 26;
      continue;
    }
    s.rows.forEach((r, i) => {
      const lines = wrap(r.title, W - 22 - DUE_W, 11);
      const tags = r.tags.length ? wrap(r.tags.join(" · "), W - 22 - DUE_W, 8.5) : [];
      const h = 8 + lines.length * 14 + tags.length * 11 + 6;
      if (y + h > BOTTOM) {
        newPage();
        sectionHead(s, true);
      }
      pdf.rect(M + 2, y + 7, 9, 9, { stroke: C.box, width: 1, r: 2 });
      lines.forEach((t, k) => pdf.text(M + 20, y + 15 + k * 14, t, { size: 11, color: C.fg }));
      tags.forEach((t, k) => pdf.text(M + 20, y + 15 + lines.length * 14 - 2 + k * 11, t, { size: 8.5, color: C.mut }));
      if (r.due) pdf.text(M + W, y + 15, r.due.text, { size: 9.5, bold: r.due.late, color: r.due.late ? C.late : C.fg, align: "right" });
      else pdf.text(M + W, y + 15, "sem prazo", { size: 9.5, color: C.mut, align: "right" });
      if (r.points) pdf.text(M + W, y + 27, `+${r.points} pontos`, { size: 8.5, bold: true, color: C.pts, align: "right" });
      y += h;
      if (i < s.rows.length - 1) pdf.line(M + 20, y, M + W, y, { color: C.line2 });
    });
    y += 16;
  }
  if (!rep.sections.length) pdf.text(M, y + 10, "Nenhuma lista marcada.", { size: 11, color: C.mut });

  // the foot of each page: the mark of CorrerIA Code (as in Mais › Sobre) and, with more than one, the page
  const total = pdf.pages.length;
  const what = "DESENVOLVIMENTO DE SOFTWARES";
  const nameW = textWidth("Correr", 10.5, true) + textWidth("IA", 10.5, true) + textWidth(" Code", 10.5, true);
  const blockW = 16 + 8 + Math.max(nameW, textWidth(what, 6, true, 0.9));
  pdf.pages.forEach((ops, i) => {
    pdf.ops = ops;
    const fy = pdf.H - 34;
    pdf.line(M, fy - 16, M + W, fy - 16, { color: C.line });
    const bx = pdf.W / 2 - blockW / 2;
    pdf.path(tiltedSquare(bx + 8, fy + 1, 16, 4, -8), { fill: A, close: true });
    pdf.path(ZAP.map(([zx, zy]) => [(zx - 12) * 0.46, (zy - 12) * 0.46]).map(([zx, zy]) => {
      const a = (-8 * Math.PI) / 180;
      return [bx + 8 + zx * Math.cos(a) - zy * Math.sin(a), fy + 1 + zx * Math.sin(a) + zy * Math.cos(a)];
    }), { fill: "#1a1210", close: true });
    const tx = bx + 24;
    pdf.text(tx, fy, "Correr", { size: 10.5, bold: true, color: C.fg });
    pdf.text(tx + textWidth("Correr", 10.5, true), fy, "IA", { size: 10.5, bold: true, color: A });
    pdf.text(tx + textWidth("CorrerIA", 10.5, true), fy, " Code", { size: 10.5, bold: true, color: C.fg });
    pdf.text(tx, fy + 9, what, { size: 6, bold: true, color: C.mut, spacing: 0.9 });
    if (total > 1) pdf.text(M + W, fy + 4, `página ${i + 1} de ${total}`, { size: 8, color: C.mut, align: "right" });
  });
  return pdf.build();
}
