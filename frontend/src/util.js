// Pure helpers: features, palette, dates, links, names.

export const F = {
  CREATE: 1,
  DELETE: 2,
  UPDATE: 4,
  MOVE: 8,
  DUE_DATE: 16,
  DUE_DATETIME: 32,
  DESCRIPTION: 64,
};

export const has = (features, flag) => ((features || 0) & flag) === flag;

// Red-leaning palette. `fill` is used for solid surfaces (dark text on top),
// `ink` is a darker shade for text/icons on light backgrounds.
export const PALETTE = [
  { id: "vermelho", label: "Vermelho", fill: "#FF5A4F", ink: "#C42A1F" },
  { id: "coral", label: "Coral", fill: "#FF8A65", ink: "#C2410C" },
  { id: "rosa", label: "Rosa", fill: "#FF77A9", ink: "#BE185D" },
  { id: "framboesa", label: "Framboesa", fill: "#E8508A", ink: "#A3124F" },
  { id: "laranja", label: "Laranja", fill: "#FFA23E", ink: "#B45309" },
  { id: "ouro", label: "Ouro", fill: "#F2C14E", ink: "#8A6100" },
  { id: "lilas", label: "Lilás", fill: "#B99BFF", ink: "#6D3FD6" },
  { id: "azul", label: "Azul", fill: "#62B5FF", ink: "#0B67A8" },
  { id: "menta", label: "Menta", fill: "#4ED3A6", ink: "#0E7A57" },
  { id: "grafite", label: "Grafite", fill: "#B9ADAE", ink: "#5E5253" },
];
// Lists without a chosen color cycle through the warm ones.
const AUTO_COLORS = ["vermelho", "coral", "rosa", "laranja", "framboesa", "ouro"];

export const colorById = (id) => PALETTE.find((c) => c.id === id);
export const autoColor = (index) => colorById(AUTO_COLORS[index % AUTO_COLORS.length]);

export function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export function colorVars(color, dark, prefix = "c") {
  return `--${prefix}:${color.fill};--${prefix}i:${dark ? color.fill : color.ink};--${prefix}s:${hexToRgba(color.fill, dark ? 0.17 : 0.15)};`;
}

// ---------- text ----------

export const fold = (s) =>
  (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

// Same length as the input, so indexes map back to the original string.
export const foldKeepLength = (s) =>
  Array.from(s || "", (ch) => {
    const f = ch.normalize("NFD")[0] || ch;
    return f.toLowerCase().length === 1 ? f.toLowerCase() : ch;
  }).join("");

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

export const clip = (s, n = 38) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

// ---------- lists ----------

export function listMeta(hass, entityId) {
  const st = hass.states[entityId];
  const friendly = (st && st.attributes && st.attributes.friendly_name) || entityId.split(".")[1].replace(/_/g, " ");
  const ent = hass.entities && hass.entities[entityId];
  const dev = ent && ent.device_id && hass.devices ? hass.devices[ent.device_id] : undefined;
  const devName = dev ? dev.name_by_user || dev.name : undefined;
  let name = friendly;
  let group = devName || null;
  if (devName && friendly.toLowerCase().startsWith(devName.toLowerCase() + " ")) {
    name = friendly.slice(devName.length + 1);
  }
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return { name, group };
}

const ICON_RULES = [
  [/shopping|compra|mercado|supermerc|feira/, "shopping-cart"],
  [/problem|erro|alerta|falha/, "triangle-alert"],
  [/update|atualiza/, "download"],
  [/hacs|addon|add-on|integra/, "package"],
  [/casa|home|lar\b/, "house"],
  [/conserto|manuten|reparo|obra/, "wrench"],
  [/trabalho|work|job|cliente/, "briefcase"],
  [/estudo|curso|faculdade|escola/, "graduation-cap"],
  [/leitura|livro|book/, "book-open"],
  [/viagem|trip|travel|ferias|férias/, "plane"],
  [/remedio|remédio|saude|saúde|farmacia/, "pill"],
  [/treino|academia|gym|exerc/, "dumbbell"],
  [/presente|gift|aniversar/, "gift"],
  [/ideia|idea/, "lightbulb"],
  [/receita|comida|jantar|almoço|almoco/, "utensils"],
  [/jardim|planta|horta/, "flower-2"],
  [/carro|auto/, "car"],
  [/pet|cachorro|dog/, "dog"],
  [/gato|cat\b/, "cat"],
  [/filme|serie|série|tv/, "tv"],
  [/jogo|game/, "gamepad-2"],
  [/conta|financ|dinheiro|pagar/, "wallet"],
];

export function guessIcon(text) {
  const t = fold(text);
  for (const [re, icon] of ICON_RULES) if (re.test(t)) return icon;
  return "list-checks";
}

export const LIST_ICONS = [
  "list-checks", "shopping-cart", "house", "wrench", "package", "download",
  "triangle-alert", "briefcase", "graduation-cap", "book-open", "lightbulb", "star",
  "heart", "gift", "plane", "pill", "dumbbell", "utensils", "flower-2", "car",
  "dog", "cat", "tv", "gamepad-2", "headphones", "wallet", "baby", "cpu",
  "monitor", "sparkles", "flame", "zap",
];

// ---------- dates ----------

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const pad = (n) => String(n).padStart(2, "0");
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export function fromYmd(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, n) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
}

/** Normalize an item's `due` (date or ISO datetime) into local parts. */
export function parseDue(due) {
  if (!due) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) {
    const d = fromYmd(due);
    return { date: due, time: null, at: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59) };
  }
  const at = new Date(due);
  if (isNaN(at)) return null;
  return { date: ymd(at), time: hm(at), at };
}

export function dayDiff(dateStr, now = new Date()) {
  const a = fromYmd(dateStr);
  const b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((a - b) / 86400000);
}

export function shortDate(dateStr, now = new Date()) {
  const d = fromYmd(dateStr);
  const base = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  return d.getFullYear() === now.getFullYear() ? base : `${base} ${d.getFullYear()}`;
}

/** Human label + tone for a due value. */
export function dueInfo(due, now = new Date()) {
  const p = parseDue(due);
  if (!p) return null;
  const diff = dayDiff(p.date, now);
  const overdue = p.at < now;
  let text;
  if (diff === 0) text = "Hoje";
  else if (diff === 1) text = "Amanhã";
  else if (diff === -1) text = "Ontem";
  else if (diff > 1 && diff < 7) text = WEEKDAYS[fromYmd(p.date).getDay()];
  else text = shortDate(p.date, now);
  if (p.time) text += `, ${p.time}`;
  const tone = overdue ? "late" : diff === 0 ? "today" : diff <= 2 ? "soon" : "later";
  return { ...p, diff, overdue, text, tone };
}

export function quickDates(now = new Date()) {
  const dow = now.getDay();
  const toSat = (6 - dow + 7) % 7 || 7;
  const toMon = (1 - dow + 7) % 7 || 7;
  const picks = [
    { label: "Hoje", date: ymd(now) },
    { label: "Amanhã", date: ymd(addDays(now, 1)) },
  ];
  if (toSat > 1) picks.push({ label: "Sábado", date: ymd(addDays(now, toSat)) });
  if (toMon > 1) picks.push({ label: "Próx. semana", date: ymd(addDays(now, toMon)) });
  return picks;
}

export function greeting(name, now = new Date()) {
  const h = now.getHours();
  const hello = h >= 5 && h < 12 ? "Bom dia" : h >= 12 && h < 18 ? "Boa tarde" : "Boa noite";
  const first = (name || "").trim().split(/\s+/)[0];
  return first ? `${hello}, ${first}` : hello;
}

// ---------- links ----------

const URL_RE = /\bhttps?:\/\/[^\s<>"'`]+/gi;

export function prettyUrl(url) {
  let u;
  try {
    u = new URL(url);
  } catch (e) {
    return { label: url, icon: "link" };
  }
  const host = u.hostname.replace(/^www\./, "");
  const parts = u.pathname.split("/").filter(Boolean);
  if (host === "github.com" && parts.length >= 2) {
    return { label: `${parts[0]}/${parts[1]}`, icon: "git-fork" };
  }
  let last = parts.length ? parts[parts.length - 1] : "";
  try {
    last = decodeURIComponent(last);
  } catch (e) {
    /* keep raw */
  }
  last = last.replace(/\.(html?|php|aspx?)$/i, "").replace(/[-_+]+/g, " ").trim();
  if (last && last.length > 2 && !/^\d+$/.test(last)) {
    return { label: `${host} › ${last}`, icon: "link" };
  }
  return { label: host, icon: "link" };
}

/** Split text into plain and link segments. */
export function splitLinks(text) {
  const out = [];
  let last = 0;
  const s = text || "";
  for (const m of s.matchAll(URL_RE)) {
    let url = m[0];
    const trail = url.match(/[.,;:!?)\]}]+$/);
    if (trail) url = url.slice(0, -trail[0].length);
    if (m.index > last) out.push({ text: s.slice(last, m.index) });
    out.push({ url, ...prettyUrl(url) });
    last = m.index + url.length;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}

// ---------- import (no AI) ----------

const BULLET = /^(\s*([-*•·▪◦‣–—>]|\d{1,3}[.)-]|\[[ xX✓✔]?\]|[☐☑✅✔️🔲🔳⬜]))+\s*/u;
// WhatsApp exports: "[18/10/26, 20:15] Fulano: texto" or "18/10/2026 20:15 - Fulano: texto"
const CHAT_PREFIX = /^\[?\d{1,2}[/.]\d{1,2}(?:[/.]\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s*/;

/** Split a pasted message into items without AI. */
export function parseListText(text) {
  let lines = (text || "")
    .split(/\r?\n/)
    .map((l) => l.replace(CHAT_PREFIX, "").trim())
    .filter(Boolean);
  if (lines.length === 1 && /[,;]|\se\s/i.test(lines[0])) {
    const one = lines[0].replace(/^[^:,;]{0,40}:\s*/, ""); // "compra: leite, ovos e pão"
    lines = one.split(/\s*[,;]\s*|\s+e\s+/i);
  }
  const seen = new Set();
  const out = [];
  for (let l of lines) {
    if (/^\s*(?:[-*•]\s*)?(?:\[[xX✓✔]\]|[☑✅✔])/u.test(l)) continue; // already done
    l = l.replace(BULLET, "").replace(/[.;,]+$/, "").trim();
    if (!l || l.length < 2 || /^~.*~$/.test(l)) continue; // skip empty and ~struck~ lines
    l = l.charAt(0).toUpperCase() + l.slice(1);
    const k = l.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(l.slice(0, 255));
  }
  return out;
}

/** Shrink a photo before upload (keeps text readable, saves bandwidth). */
export async function prepareImage(file, max = 1800) {
  const toBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] || "");
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
    if (bmp.close) bmp.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
    return { mime: "image/jpeg", data: await toBase64(blob), url: URL.createObjectURL(blob) };
  } catch (e) {
    return { mime: file.type || "image/jpeg", data: await toBase64(file), url: URL.createObjectURL(file) };
  }
}
