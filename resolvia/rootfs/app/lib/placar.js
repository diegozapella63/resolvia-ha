// The CronologIA scoreboard (Recompensas), read from share/cronologia/integracao.json.
// The CronologIA rewrites that file when the scoreboard or the people change and
// every 15 minutes; an old file means it was stopped or removed. Points go back
// to it as the cronologia_pontos event.
import fs from "node:fs";
import path from "node:path";

const FRESH_MS = 2 * 3600 * 1000;
const fold = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export class Placar {
  constructor({ shareDir }) {
    this.file = path.join(shareDir, "cronologia", "integracao.json");
    this.cache = null;
  }

  /**
   * {versao, ativo, desligado, periodo, participantes, usuarios, espelho} or null (no CronologIA).
   * desligado: the CronologIA turned its ResolvIA integration off (1.16.0+), so no points and nothing kept here.
   */
  read(now = Date.now()) {
    if (this.cache && now - this.cache.at < 15000) return this.cache.value;
    let value = null;
    try {
      const j = JSON.parse(fs.readFileSync(this.file, "utf8"));
      const t = Date.parse(j && j.gravado_em);
      if (j && j.app === "CronologIA" && Number.isFinite(t) && now - t < FRESH_MS) {
        const p = (j.placar && typeof j.placar === "object") ? j.placar : {};
        const participantes = Array.isArray(p.participantes) ? p.participantes.filter((x) => typeof x === "string" && x.trim()).map((x) => x.slice(0, 40)) : [];
        const usuarios = {};
        for (const [u, who] of Object.entries(p.usuarios && typeof p.usuarios === "object" ? p.usuarios : {})) if (typeof who === "string" && participantes.includes(who)) usuarios[u] = who;
        // espelho: the maintenance and routines the CronologIA keeps as tasks here ({list: {uid: {pontos, tipo}}})
        const espelho = {};
        for (const [list, map] of Object.entries(j.espelho && typeof j.espelho === "object" ? j.espelho : {})) {
          if (!/^todo\.[a-z0-9_]+$/.test(list) || !map || typeof map !== "object") continue;
          for (const [uid, v] of Object.entries(map)) {
            if (!v || typeof v !== "object") continue;
            (espelho[list] || (espelho[list] = {}))[String(uid).slice(0, 300)] = { pontos: Math.max(0, Math.min(1000, Math.round(Number(v.pontos) || 0))), tipo: v.tipo === "rotina" ? "rotina" : "manutencao" };
          }
        }
        const desligado = j.resolvia === false;
        value = { versao: String(j.versao || "").slice(0, 20), ativo: !desligado && !!p.ativo && participantes.length > 0, desligado, periodo: String(p.periodo || "semana"), participantes, usuarios, espelho: desligado ? {} : espelho };
      }
    } catch (e) {
      /* no CronologIA here */
    }
    this.cache = { at: now, value };
    return value;
  }

  /** A task the CronologIA keeps here (a maintenance or a routine), or null. */
  mirrored(list, uid) {
    const p = this.read();
    return (p && p.espelho[list] && p.espelho[list][uid]) || null;
  }

  /** What the screen needs: the scoreboard and who this user is in it. */
  view(userId) {
    const p = this.read();
    if (!p) return null;
    const { usuarios, espelho, ...rest } = p;
    return { ...rest, eu: (userId && usuarios[userId]) || null };
  }

  /** A participant by name (any case/accents), or null. */
  participant(name) {
    const p = this.read();
    if (!p || !p.ativo || !name) return null;
    return p.participantes.find((x) => fold(x) === fold(name)) || null;
  }
}
