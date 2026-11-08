// CorrerIA (the WhatsApp contact of CorrerIA Code, and the MCP server the Claude and the Gemini connect to): with
// Mais › Configurações › Integrações › CorrerIA on (off by default), this app writes share/resolvia/correria.json
// (where it answers and its own key, kept in /data/correria.key) and answers on /api/integracao/ferramentas with
// "Authorization: Bearer <key>". Off: the file goes away and the key stops working. The same contract as the other
// apps of the family (the GerencIA, the CronologIA): see the AGENTS.md of the CorrerIA.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

export const ROTA = "/api/integracao/ferramentas";
const pad = (n) => String(n).padStart(2, "0");
/** "2026-11-08T09:41:00": the local time, as the other apps write it. */
export const localIso = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/** The same key? Compared in constant time (the hashes have the same length, whatever was sent). */
export function sameKey(given, key) {
  if (typeof given !== "string" || typeof key !== "string" || !key) return false;
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(key).digest();
  return crypto.timingSafeEqual(a, b);
}

/** The first IPv4 address of this machine that is not the loopback (the internal network of the apps), or null. */
export function firstIp(nets) {
  for (const list of Object.values(nets || {})) {
    const a = (list || []).find((x) => x.family === "IPv4" && !x.internal);
    if (a) return a.address;
  }
  return null;
}

/** The last use kept on disk, checked ({cliente, em, nome}), or null. */
function readUse(file) {
  try {
    const u = JSON.parse(fs.readFileSync(file, "utf8"));
    if (typeof u.cliente === "string" && typeof u.em === "string") return { cliente: u.cliente, em: u.em, nome: String(u.nome || "") };
  } catch {
    /* never used */
  }
  return null;
}

export class Correria {
  /**
   * enabled(): the switch is on. url: the address the other apps use (RESOLVIA_URL_INTERNA in development; none: the
   * name of this machine and the port). host and nets: os.hostname and os.networkInterfaces (the tests swap them).
   */
  constructor({ dataDir, shareDir, port, version, log, enabled = () => false, url = "", host = os.hostname, nets = os.networkInterfaces }) {
    this.keyFile = path.join(dataDir, "correria.key");
    this.useFile = path.join(dataDir, "correria_uso.json");
    this.file = path.join(shareDir, "resolvia", "correria.json");
    this.port = port;
    this.version = version;
    this.log = log;
    this.enabled = enabled;
    this.url = url;
    this.host = host;
    this.nets = nets;
    this.key = null;
    this.warned = false;
    this.ultimo = readUse(this.useFile);
  }

  /** The key of this connection (32 random bytes, urlsafe), made once and kept in /data/correria.key (600). */
  chave() {
    if (this.key) return this.key;
    let k = "";
    try {
      k = fs.readFileSync(this.keyFile, "utf8").trim();
    } catch {
      /* none yet */
    }
    if (k.length < 32) {
      k = crypto.randomBytes(32).toString("base64url");
      fs.mkdirSync(path.dirname(this.keyFile), { recursive: true });
      fs.writeFileSync(this.keyFile, k, { mode: 0o600 });
      fs.chmodSync(this.keyFile, 0o600);
    }
    this.key = k;
    return k;
  }

  /** {url, ip_url}: by the name of this app on the internal network of the apps and, as a spare, by its address. */
  endereco() {
    if (this.url) return { url: this.url.replace(/\/+$/, ""), ip_url: null };
    const ip = firstIp(this.nets());
    return { url: `http://${this.host()}:${this.port}`, ip_url: ip ? `http://${ip}:${this.port}` : null };
  }

  /** Writes (on) or removes (off) share/resolvia/correria.json, atomically and only for the owner (600). True when written. */
  publicar() {
    try {
      if (!this.enabled()) {
        fs.rmSync(this.file, { force: true });
        return false;
      }
      const body = {
        app: "resolvia",
        nome: "ResolvIA",
        assunto: "listas de tarefas da casa: o que fazer, prazos, compras, repetição e pontos",
        ...this.endereco(),
        chave: this.chave(),
        versao: this.version,
        ferramentas: ROTA,
        gravado_em: localIso(),
      };
      fs.mkdirSync(path.dirname(this.file), { recursive: true });
      const tmp = path.join(path.dirname(this.file), ".correria.json.tmp");
      fs.writeFileSync(tmp, JSON.stringify(body, null, 1), { mode: 0o600 });
      fs.chmodSync(tmp, 0o600);
      fs.renameSync(tmp, this.file);
      this.warned = false;
      return true;
    } catch (err) {
      if (!this.warned) this.log.warn(`CorrerIA: não consegui gravar ${this.file}: ${err.message}`);
      this.warned = true;
      return false;
    }
  }

  /** On, and the header carries this key ("Bearer <key>"). */
  autorizado(headers) {
    if (!this.enabled()) return false;
    const h = String((headers && headers.authorization) || "");
    return h.startsWith("Bearer ") && sameKey(h.slice(7).trim(), this.chave());
  }

  /** Who used it last (Claude, Gemini, WhatsApp…) and which tool, for the card: {cliente, em, nome}. */
  usado(cliente, nome) {
    const who = String(cliente || "").replace(/\s+/g, " ").trim().slice(0, 40);
    this.ultimo = { cliente: who || "CorrerIA", em: localIso(), nome: String(nome || "").slice(0, 40) };
    try {
      fs.mkdirSync(path.dirname(this.useFile), { recursive: true });
      fs.writeFileSync(this.useFile, JSON.stringify(this.ultimo));
    } catch {
      /* only the card misses it */
    }
  }
}
