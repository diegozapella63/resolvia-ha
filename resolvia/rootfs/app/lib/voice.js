/**
 * Falar: what you say goes to the speech-to-text of Home Assistant and comes back as text,
 * which the AI then reads like a pasted message. The engine is the one of the preferred Assist
 * pipeline (Configurações › Assistentes de voz; with Home Assistant Cloud, stt.home_assistant_cloud),
 * with its language; without a pipeline, the first stt.* entity.
 *
 * The audio comes from the app as raw PCM, 16 kHz, 16-bit, mono (what Assist sends too).
 */
import http from "node:http";
import https from "node:https";

const coded = (code, message) => Object.assign(new Error(message), { code });

/**
 * POST with the header names exactly as written. The Supervisor's proxy (http://supervisor/core/api)
 * only passes on "X-Speech-Content" spelled like that, and fetch() sends header names in lower case.
 */
function postRaw(url, headers, body, timeoutMs) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === "https:" ? https : http;
    const req = lib.request(u, { method: "POST", headers: { ...headers, "Content-Length": body.length }, timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString("utf8") }));
      res.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new Error("tempo esgotado")));
    req.on("error", reject);
    req.end(body);
  });
}

export const VOICE_RATE = 16000;
const MIN_BYTES = VOICE_RATE * 2 * 0.4; // under 0.4 s: nothing was said
export const MAX_VOICE_BYTES = VOICE_RATE * 2 * 125; // a bit over 2 minutes

export class Voice {
  /** @param {{ha: {send: Function}, rest: string, token: string, log: object}} o */
  constructor({ ha, rest, token, log }) {
    this.ha = ha;
    this.rest = rest;
    this.token = token;
    this.log = log;
    this.cache = null;
  }

  /** {engine, language, name} of the speech-to-text to use, or null. Kept a minute. */
  async engine() {
    if (this.cache && Date.now() - this.cache.at < 60000) return this.cache.value;
    let value = null;
    try {
      const r = await this.ha.send({ type: "assist_pipeline/pipeline/list" });
      const list = (r && r.pipelines) || [];
      const p = list.find((x) => x.id === r.preferred_pipeline && x.stt_engine) || list.find((x) => x.stt_engine);
      if (p) value = { engine: p.stt_engine, language: p.stt_language || p.language || "pt-BR", name: p.name || "" };
    } catch (err) {
      this.log.warn(`Assistentes de voz: ${err.message}`);
    }
    if (!value) {
      try {
        const res = await fetch(`${this.rest}/states`, { headers: { authorization: `Bearer ${this.token}` }, signal: AbortSignal.timeout(15000) });
        const states = res.ok ? await res.json() : [];
        const s = states.find((x) => /^stt\./.test(x.entity_id));
        if (s) value = { engine: s.entity_id, language: "pt-BR", name: (s.attributes && s.attributes.friendly_name) || s.entity_id };
      } catch (err) {
        this.log.warn(`Fala para texto: ${err.message}`);
      }
    }
    this.cache = { at: Date.now(), value };
    return value;
  }

  /** What the screens need: whether Falar works and with what. */
  async status() {
    const e = await this.engine();
    if (!e) return { ready: false, reason: "Para falar, o Home Assistant precisa de um assistente de voz com fala para texto (Configurações › Assistentes de voz; com o Home Assistant Cloud ele já vem pronto)." };
    return { ready: true, engine: e.engine, language: e.language, name: e.name };
  }

  /** Raw PCM (16 kHz, 16-bit, mono) to text. */
  async text(pcm) {
    if (!pcm || pcm.length < MIN_BYTES) throw coded("invalid_format", "Não ouvi nada. Toque no microfone e fale.");
    if (pcm.length > MAX_VOICE_BYTES) throw coded("invalid_format", "Fale até 2 minutos de cada vez.");
    const e = await this.engine();
    if (!e) throw coded("no_stt", (await this.status()).reason);
    const res = await postRaw(
      `${this.rest}/stt/${encodeURIComponent(e.engine)}`,
      {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/octet-stream",
        "X-Speech-Content": `format=wav; codec=pcm; sample_rate=${VOICE_RATE}; bit_rate=16; channel=1; language=${e.language}`,
      },
      pcm,
      90000,
    );
    if (res.status < 200 || res.status >= 300) {
      this.cache = null;
      const detail = res.text.slice(0, 200);
      this.log.warn(`Fala para texto (${e.engine}): ${res.status} ${detail}`);
      throw coded("failed", res.status === 415 || res.status === 400 ? `A fala para texto não aceitou o áudio (${detail || res.status}).` : `A fala para texto do Home Assistant falhou (${res.status}${detail ? `: ${detail}` : ""}).`);
    }
    let j = {};
    try {
      j = JSON.parse(res.text);
    } catch (err) {
      /* not JSON */
    }
    const text = String(j.text || "").trim();
    if (j.result !== "success" || !text) throw coded("not_understood", "Não entendi. Tente de novo, mais perto do microfone.");
    return { text, engine: e.engine, name: e.name };
  }
}

/** Reads a raw body up to `max` bytes. */
export function readRaw(req, max) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > max) {
        reject(coded("too_big", "Fale até 2 minutos de cada vez."));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
