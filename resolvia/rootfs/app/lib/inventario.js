// Cômodos do InventarIA (o app de inventário da mesma família), quando ele está
// instalado no mesmo Home Assistant. O InventarIA (1.14.0+) deixa em
// /share/inventario/integracao.json o endereço dele na rede interna dos apps e
// uma chave; aqui só lemos esse arquivo e chamamos /api/integracao/comodos.
import fs from "node:fs";
import path from "node:path";

const coded = (code, message) => Object.assign(new Error(message), { code });
const EVERY_MS = 10 * 60 * 1000;

export class Inventario {
  /** enabled(): Mais › Integrações › InventarIA › cômodos on; items(): equipamentos on (both off by default). */
  constructor({ shareDir, log, enabled = () => false, items = () => false, onChange = () => {} }) {
    this.file = path.join(shareDir, "inventario", "integracao.json");
    this.log = log;
    this.enabled = enabled;
    this.items = items;
    this.onChange = onChange;
    this.state = { encontrado: false, comodos: [], itens: [], erro: null, versao: null, at: null };
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
        if (!res.ok) throw Object.assign(new Error(out.error || `O InventarIA respondeu ${res.status}`), { code: "inventario_error", http: true, status: res.status });
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
      if (!this.enabled() && !this.items()) {
        this.state = { encontrado: !!this.info(), comodos: [], itens: [], erro: null, versao: null, at: null };
      } else if (!this.info()) {
        this.state = { encontrado: false, comodos: [], itens: [], erro: null, versao: null, at: null };
      } else {
        try {
          // the rooms always come (the equipment is grouped by them)
          const out = await this.request("/api/integracao/comodos");
          const comodos = (Array.isArray(out.comodos) ? out.comodos : [])
            .filter((c) => c && typeof c.id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(c.id))
            .slice(0, 80)
            .map((c) => ({ id: c.id, nome: String(c.nome || c.id).slice(0, 60), itens: Number(c.itens) || 0 }));
          let itens = [];
          let erro = null;
          if (this.items()) {
            try {
              const got = await this.request("/api/integracao/itens");
              itens = (Array.isArray(got.itens) ? got.itens : [])
                .filter((i) => i && typeof i.id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(i.id) && i.nome)
                .slice(0, 2000)
                .map((i) => ({ id: i.id, nome: String(i.nome).slice(0, 120), comodo: typeof i.comodo === "string" ? i.comodo : "", zona: String(i.zona || "").slice(0, 60) }));
            } catch (err) {
              // an InventarIA 1.14.0 has the rooms but not the items
              erro = err.status === 404 ? "Para os equipamentos, atualize o InventarIA (1.15.0 ou mais nova)." : err.message;
              itens = this.state.itens || [];
            }
          }
          this.state = { encontrado: true, comodos, itens, erro, versao: out.versao || null, at: new Date().toISOString() };
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

  /** "Geladeira (Cozinha)": an item with its room, for the AI and the pickers. */
  itemLabel(i) {
    const room = this.nameOf(i.comodo);
    return room ? `${i.nome} (${room})` : i.nome;
  }

  /** The name of a room id (or null). */
  nameOf(id) {
    const c = this.state.comodos.find((x) => x.id === id);
    return c ? c.nome : null;
  }
}
