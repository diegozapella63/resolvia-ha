// Mais › Relatório de pendências: the open tasks of the lists, to see, print or save as PDF (like the report of
// the GerencIA). All the marked lists (the ones on the start screen) or the one chosen on the page; each task with
// its deadline (late in red), and what is on in the app: repeat, points, rooms, equipment, Serviço externo.
// The page has Baixar PDF (2.45.1): the app Home Assistant on the phone doesn't print a page, a PDF it opens.
import { Pdf, wrap, textWidth } from "./pdf.js";

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
 * What is pending. lists: [{id, name, owner, hidden, due}] (due: its dates are deadlines), all of them;
 * items: Map list id -> HA items; pick: a list id, or "" for all the marked ones; extra(listId, item):
 * {repeat, points, rooms, equips, external}, only what is on.
 */
export function pendencias({ lists = [], items = new Map(), pick = "", now = Date.now(), extra = () => ({}) }) {
  const chosen = pick && lists.some((l) => l.id === pick) ? lists.filter((l) => l.id === pick) : lists.filter((l) => !l.hidden);
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
      rows.push({ title: String(i.summary).trim(), due: d, at: d ? dueMs(i.due) : Infinity, tags, points: x.points || 0 });
      if (!d) undated++;
      else if (d.late) late++;
      else if (d.days === 0) today++;
    }
    // late first, then by deadline, the ones without one last (by name)
    rows.sort((a, b) => a.at - b.at || a.title.localeCompare(b.title, "pt-BR", { numeric: true }));
    sections.push({ id: l.id, name: l.name, owner: l.owner || "", rows, late: rows.filter((r) => r.due && r.due.late).length });
  }
  const total = sections.reduce((n, s) => n + s.rows.length, 0);
  return { at: now, pick: chosen.length === 1 && pick ? pick : "", lists, sections, total, late, today, undated, dueOn: lists.some((l) => l.due) };
}

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
 * The page (HTML): a header with the app, what the report is, when and which lists; the choice of the lists
 * and Baixar PDF (not on paper); a section per list. tema: "claro" | "escuro" (the one of the app; none: the one of the device);
 * cor: the color of the app (#rrggbb). On paper it is always light.
 */
export function reportHtml(rep, { tema = null, cor = "#ff8a65", casa = "" } = {}) {
  // the PDF of what is on screen (the same list), in the color of the app
  const pdfHref = `relatorio.pdf?${new URLSearchParams({ ...(rep.pick ? { lista: rep.pick } : {}), cor: /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65" })}`;
  const attr = tema === "claro" ? ' data-theme="light"' : tema === "escuro" ? ' data-theme="dark"' : "";
  const accent = /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65";
  const d = new Date(rep.at);
  const when = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const marked = rep.lists.filter((l) => !l.hidden);
  const which = rep.pick ? `na lista ${rep.sections[0].name}` : marked.length === rep.lists.length ? "em todas as listas" : marked.length === 1 ? `na lista ${marked[0].name}` : `nas ${marked.length} listas marcadas`;
  const options = [`<option value=""${rep.pick ? "" : " selected"}>Todas as listas marcadas</option>`]
    .concat(rep.lists.map((l) => `<option value="${esc(l.id)}"${rep.pick === l.id ? " selected" : ""}>${esc(l.name)}${l.hidden ? " (oculta)" : ""}</option>`))
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
  const claro = "--bg:#f6f7f9;--card:#fff;--fg:#141a22;--mut:#5b6573;--linha:#e3e7ec;--linha2:#eef1f4;--borda:#d6dbe2;--late:#d92d20;--pts:#b7791f";
  const escuro = "--bg:#0f1318;--card:#161c23;--fg:#e8edf3;--mut:#9aa6b4;--linha:#2a3340;--linha2:#1f2732;--borda:#334051;--late:#ff6b5e;--pts:#f5c451";
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
.barra select{grid-column:1/-1;text-align:left;font-size:15px;padding:10px 14px}
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
.rodape{color:var(--mut);font-size:12px;margin-top:22px;text-align:center}
@media print{:root,:root[data-theme],:root:not([data-theme="light"]){${claro};--bg:#fff;color-scheme:light} .barra{display:none} body{padding:0} section{break-inside:avoid-page} .cab,section,.resumo div{border-color:#d6dbe2}}
</style></head><body><main>
<div class="barra">
<select aria-label="Listas" onchange="var u=new window.URL(window.location.href);if(this.value)u.searchParams.set('lista',this.value);else u.searchParams.delete('lista');location.replace(u.href)">${options}</select>
<a href="./" onclick="if(history.length>1){history.back();return false}">Voltar</a><a class="pdf" href="${esc(pdfHref)}" download="${esc(pdfName(rep))}">Baixar PDF</a>
</div>
<header class="cab">${ICON(accent)}<div><div class="app"><span class="wm">Resolv<b>IA</b></span> · listas de tarefas${casa ? ` · ${esc(casa)}` : ""}</div><h1>Relatório de pendências</h1><p>O que falta fazer ${esc(which)} · ${when}</p></div></header>
${rep.total ? `<div class="resumo">${tiles}</div>` : ""}
${rep.sections.length ? rep.sections.map(section).join("") : `<p class="vazio">Nenhuma lista marcada.</p>`}
<p class="rodape">ResolvIA · relatório gerado em ${when}</p>
</main></body></html>`;
}

/** The name of the PDF: pendencias-2026-11-07.pdf (pendencias-casa-2026-11-07.pdf for one list). */
export function pdfName(rep) {
  const d = new Date(rep.at);
  const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const list = rep.pick ? String(rep.pick).replace(/^todo\./, "").replace(/[^a-z0-9_]+/gi, "").replace(/_/g, "-").slice(0, 40) : "";
  return `pendencias-${list ? `${list}-` : ""}${day}.pdf`;
}

/**
 * The report as a PDF (A4, always light): the same header (the icon and the name of the app, the house, what it
 * is, when and which lists), the counts and a part per list, a page after another; at the foot, the page.
 */
export function reportPdf(rep, { cor = "#ff8a65", casa = "" } = {}) {
  const A = /^#[0-9a-f]{6}$/i.test(cor || "") ? cor : "#ff8a65";
  const C = { fg: "#141a22", mut: "#5b6573", line: "#e3e7ec", line2: "#eef1f4", box: "#d6dbe2", late: "#d92d20", pts: "#b7791f", card: "#f6f7f9" };
  const pdf = new Pdf({ title: "Relatório de pendências · ResolvIA" });
  const M = 40;
  const W = pdf.W - 2 * M;
  const BOTTOM = pdf.H - 52;
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
    pdf.text(tx + w1 + w2 + 6, y + 24, `· listas de tarefas${casa ? ` · ${casa}` : ""}`, { size: 10, color: C.mut });
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

  // the foot of each page
  const total = pdf.pages.length;
  pdf.pages.forEach((ops, i) => {
    pdf.ops = ops;
    pdf.text(pdf.W / 2, pdf.H - 28, `ResolvIA · relatório gerado em ${when}${total > 1 ? ` · página ${i + 1} de ${total}` : ""}`, { size: 8, color: C.mut, align: "center" });
  });
  return pdf.build();
}
