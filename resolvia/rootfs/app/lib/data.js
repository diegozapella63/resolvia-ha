// Dados: exports (JSON, CSV, ZIP), backups in the share folder, imports and
// the list of automatic versions, the same set the other apps offer.
// The items live in the Home Assistant to-do lists; the files carry a copy of
// them next to the app's own data (list names, colors, repeating tasks).
import fs from "node:fs";
import path from "node:path";
import { makeZip, readZip } from "./zip.js";

const pad = (n) => String(n).padStart(2, "0");
const BACKUP_RE = /^resolvia-[\w-]+\.zip$/;
export const VERSION_RE = /^resolvia-(\d{8})-(\d{6})-?([\w-]*)\.json$/;

export const fileStamp = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
const dateTime = (ms) => {
  const d = new Date(ms);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const dueText = (due) => {
  if (!due) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return `${due.slice(8, 10)}/${due.slice(5, 7)}/${due.slice(0, 4)}`;
  const t = Date.parse(due);
  return Number.isFinite(t) ? dateTime(t) : due;
};
const csvCell = (v) => {
  const s = String(v == null ? "" : v);
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Everything: the app data plus every list with its items. */
export function snapshot(store, lists, version) {
  return {
    app_name: "ResolvIA",
    app_version: version,
    exported_at: new Date().toISOString(),
    prefs: store.data.prefs,
    rules: store.data.rules,
    lists: lists.map((l) => ({
      entity_id: l.entity_id,
      name: l.name,
      ...(l.ha_name && l.ha_name !== l.name ? { ha_name: l.ha_name } : {}),
      items: l.items.map((i) => {
        const o = { uid: i.uid, summary: i.summary, status: i.status };
        if (i.due) o.due = i.due;
        if (i.description) o.description = i.description;
        return o;
      }),
    })),
  };
}

const ruleOf = (snap, entityId, item) => Object.values(snap.rules || {}).find((r) => r.entity_id === entityId && (r.uid === item.uid || (!r.uid && r.match === item.summary)));

/** For Excel: ";" separated, with BOM, one row per item. */
export function toCSV(snap) {
  const rows = [["Lista", "Item", "Situação", "Prazo", "Notas", "Repete"]];
  for (const l of snap.lists) {
    for (const i of l.items) {
      const r = ruleOf(snap, l.entity_id, i);
      rows.push([l.name, i.summary, i.status === "completed" ? "concluído" : "pendente", dueText(i.due), i.description || "", r ? `${r.days} ${r.days === 1 ? "dia" : "dias"} depois de concluir` : ""]);
    }
  }
  return Buffer.from("﻿" + rows.map((r) => r.map(csvCell).join(";")).join("\r\n") + "\r\n", "utf8");
}

/** One text file per list, as a checklist. */
function listText(l) {
  const line = (i) => `- [${i.status === "completed" ? "x" : " "}] ${i.summary}${i.due ? ` (prazo ${dueText(i.due)})` : ""}${i.description ? `\n      ${i.description.replace(/\n/g, "\n      ")}` : ""}`;
  return `# ${l.name}\n\n${l.items.map(line).join("\n")}\n`;
}

const safeName = (name) =>
  (name || "Lista")
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60) || "Lista";

export function backupZip(snap, version) {
  const files = [
    { name: "resolvia.json", data: JSON.stringify(snap, null, 1) },
    { name: "resolvia.csv", data: toCSV(snap) },
  ];
  const used = new Set();
  for (const l of snap.lists) {
    let base = safeName(l.name);
    for (let n = 2; used.has(base.toLowerCase()); n++) base = `${safeName(l.name)} ${n}`;
    used.add(base.toLowerCase());
    files.push({ name: `listas/${base}.md`, data: listText(l) });
  }
  files.push({
    name: "LEIA-ME.txt",
    data:
      `Backup do ResolvIA ${version} criado em ${dateTime(Date.now())}.\n` +
      "resolvia.json tem tudo: as listas com os itens (prazo, notas, concluídos), os nomes, cores e ícones\n" +
      "das listas e as tarefas que se repetem; resolvia.csv abre no Excel; a pasta listas tem um arquivo de texto por lista.\n" +
      "Para restaurar: Mais > Dados > Importar backup, e escolha este .zip. Os itens que faltarem voltam para as listas.\n",
  });
  return makeZip(files);
}

/** A .zip backup or a .json file -> the raw snapshot. */
export function parseImport(buf, fileName = "") {
  let text;
  const isZip = buf.length > 3 && buf[0] === 0x50 && buf[1] === 0x4b;
  if (isZip || /\.zip$/i.test(fileName)) {
    const entries = readZip(buf).filter((e) => !e.name.startsWith("__MACOSX/") && !path.basename(e.name).startsWith("._"));
    const entry = entries.find((e) => path.basename(e.name) === "resolvia.json") || entries.find((e) => /\.json$/i.test(e.name));
    if (!entry) throw Object.assign(new Error("O .zip não tem o arquivo resolvia.json."), { code: "invalid_format" });
    text = entry.data.toString("utf8");
  } else {
    text = buf.toString("utf8");
  }
  let raw;
  try {
    raw = JSON.parse(text.replace(/^﻿/, ""));
  } catch (e) {
    throw Object.assign(new Error("O arquivo não é um backup do ResolvIA (.zip) nem um .json válido."), { code: "invalid_format" });
  }
  if (!raw || typeof raw !== "object" || !("prefs" in raw || "lists" in raw || "rules" in raw)) {
    throw Object.assign(new Error("Esse .json não é do ResolvIA."), { code: "invalid_format" });
  }
  return raw;
}

// ------------------------------------------------------------------ share folder

export class Backups {
  constructor({ dir, folderLabel = "share/resolvia" }) {
    this.dir = dir;
    this.folderLabel = folderLabel;
  }

  available() {
    try {
      fs.mkdirSync(this.dir, { recursive: true });
      fs.accessSync(this.dir, fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  list() {
    if (!this.available()) return { available: false, folder: this.folderLabel, backups: [] };
    const backups = fs
      .readdirSync(this.dir)
      .filter((f) => BACKUP_RE.test(f))
      .map((name) => {
        const st = fs.statSync(path.join(this.dir, name));
        return { name, size: st.size, date: st.mtimeMs };
      })
      .sort((a, b) => b.date - a.date);
    return { available: true, folder: this.folderLabel, backups };
  }

  save(zip) {
    if (!this.available()) throw Object.assign(new Error("A pasta share não está disponível para o app."), { code: "no_share" });
    let name = `resolvia-${fileStamp()}.zip`;
    for (let n = 2; fs.existsSync(path.join(this.dir, name)); n++) name = `resolvia-${fileStamp()}-${n}.zip`;
    fs.writeFileSync(path.join(this.dir, name), zip);
    return { name, folder: this.folderLabel };
  }

  read(name) {
    if (!BACKUP_RE.test(name || "")) throw Object.assign(new Error("Backup inválido."), { code: "invalid_format" });
    const full = path.join(this.dir, name);
    if (!fs.existsSync(full)) throw Object.assign(new Error("Esse backup não existe mais."), { code: "not_found" });
    return parseImport(fs.readFileSync(full), name);
  }
}

// ------------------------------------------------------------------ versions

export function listVersions(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const name of fs.readdirSync(dir).sort().reverse()) {
    const m = VERSION_RE.exec(name);
    if (!m) continue;
    try {
      const d = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      const [, ymd, hms, reason] = m;
      const at = new Date(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8), +hms.slice(0, 2), +hms.slice(2, 4), +hms.slice(4, 6)).getTime();
      out.push({ name, when: at, reason: reason || "auto", lists: Object.keys((d.prefs && d.prefs.lists) || {}).length, rules: Object.keys(d.rules || {}).length });
    } catch (e) {
      /* skip broken file */
    }
  }
  return out;
}

export function readVersion(dir, name) {
  if (!VERSION_RE.test(name || "")) throw Object.assign(new Error("Versão inválida."), { code: "invalid_format" });
  const full = path.join(dir, name);
  if (!fs.existsSync(full)) throw Object.assign(new Error("Essa versão não existe mais."), { code: "not_found" });
  return JSON.parse(fs.readFileSync(full, "utf8"));
}
