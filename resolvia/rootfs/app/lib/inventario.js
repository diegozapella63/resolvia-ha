// Cômodos do InventarIA (o app de inventário da mesma família), quando ele está
// instalado no mesmo Home Assistant. O InventarIA (1.14.0+) deixa em
// /share/inventario/integracao.json o endereço dele na rede interna dos apps e
// uma chave; aqui só lemos esse arquivo e chamamos /api/integracao/comodos.
import fs from "node:fs";
import path from "node:path";

const coded = (code, message) => Object.assign(new Error(message), { code });
const EVERY_MS = 10 * 60 * 1000;

export class Inventario {
  /** enabled(): Mais › Integrações › Cômodos do InventarIA (off by default). */
  constructor({ shareDir, log, enabled = () => false, onChange = () => {} }) {
    this.file = path.join(shareDir, "inventario", "integracao.json");
    this.log = log;
    this.enabled = enabled;
    this.onChange = onChange;
    this.state = { encontrado: false, comodos: [], erro: null, versao: null, at: null };
    this.busy = null;
    this.timer = null;
    this.lastLog = "";
  }

  /** The connection file, or null when the InventarIA is not installed (or is older than 1.14.0). */
  info() {
    try {
      const j = JSON.parse(fs.readFileSync(this.file, "utf8"));
      return j && j.url && j.chave ? j : null;
    } catch (err) {
      return null;
    }
  }

  async request(route) {
    const info = this.info();
    if (!info) throw coded("no_inventario", "InventarIA não encontrado neste Home Assistant (precisa da versão 1.14.0 ou mais nova).");
    let last;
    for (const base of [info.url, info.ip_url].filter(Boolean)) {
      try {
        const res = await fetch(`${base}${route}`, { headers: { authorization: `Bearer ${info.chave}`, "x-app": "ResolvIA" }, signal: AbortSignal.timeout(15000) });
        const out = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(out.error || `O InventarIA respondeu ${res.status}`), { code: "inventario_error", http: true });
        return out;
      } catch (err) {
        last = err;
        if (err.http) break; // it answered: no point trying the other address
      }
    }
    throw last;
  }

  /** Reads the rooms again; tells the screens when something changed. */
  refresh() {
    if (this.busy) return this.busy;
    this.busy = (async () => {
      const before = JSON.stringify(this.state);
      if (!this.enabled()) {
        this.state = { encontrado: !!this.info(), comodos: [], erro: null, versao: null, at: null };
      } else if (!this.info()) {
        this.state = { encontrado: false, comodos: [], erro: null, versao: null, at: null };
      } else {
        try {
          const out = await this.request("/api/integracao/comodos");
          const comodos = (Array.isArray(out.comodos) ? out.comodos : [])
            .filter((c) => c && typeof c.id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(c.id))
            .slice(0, 80)
            .map((c) => ({ id: c.id, nome: String(c.nome || c.id).slice(0, 60), itens: Number(c.itens) || 0 }));
          this.state = { encontrado: true, comodos, erro: null, versao: out.versao || null, at: new Date().toISOString() };
          this.lastLog = "";
        } catch (err) {
          // keep the rooms read before: a restart of the InventarIA should not empty the tasks
          this.state = { ...this.state, encontrado: true, erro: err.message };
          if (this.lastLog !== err.message) this.log.warn(`InventarIA: ${err.message}`);
          this.lastLog = err.message;
        }
      }
      if (JSON.stringify(this.state) !== before) this.onChange();
      return this.state;
    })().finally(() => {
      this.busy = null;
    });
    return this.busy;
  }

  start() {
    this.refresh().catch(() => {});
    clearInterval(this.timer);
    this.timer = setInterval(() => this.refresh().catch(() => {}), EVERY_MS);
  }

  /** The name of a room id (or null). */
  nameOf(id) {
    const c = this.state.comodos.find((x) => x.id === id);
    return c ? c.nome : null;
  }
}
