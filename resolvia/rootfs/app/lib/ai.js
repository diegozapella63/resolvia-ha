// Reads items out of a pasted message or photos (handwritten/printed lists,
// screenshots). Like the other apps (InventarIA, GerencIA, EconomIA), it only
// uses the AI configured in Home Assistant (ai_task.generate_data) and keeps
// no API key: the person picks which AI in Mais > Leitura por IA.
import { resultOf } from "./usage.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const GEN_DATA = 1;
const ATTACHMENTS = 2;
// Photos wait here (inside /media, Home Assistant's "local" media source) only
// while the AI reads them.
const TMP_REL = "resolvia/ia-temp";

const coded = (code, message) => Object.assign(new Error(message), { code });
const MAX_ITEMS = 150;

const STRUCTURE = {
  items: {
    description: "Cada item ou tarefa encontrado, um por elemento, em português do Brasil.",
    required: true,
    selector: { text: { multiple: true } },
  },
};

function instructions({ text, images, listName }) {
  const source = images ? (images > 1 ? "fotos" : "uma foto") : "uma mensagem";
  return [
    `Você recebe ${source} com uma lista de compras ou de tarefas (pode ser manuscrita, impressa, print de conversa ou mensagem de WhatsApp).`,
    "Extraia cada item ou tarefa separadamente, na ordem em que aparecem.",
    "Regras:",
    "- Um item por elemento, curto e claro, em português do Brasil, começando com letra maiúscula.",
    '- Mantenha quantidades, marcas e detalhes úteis no próprio item (ex.: "Leite integral (2 caixas)").',
    "- Ignore saudações, assinaturas, horários e nomes de quem mandou a mensagem, comentários soltos, preços e totais.",
    "- Ignore itens riscados ou marcados como já feitos.",
    "- Não invente itens. Se não houver nenhum item, devolva a lista vazia.",
    listName ? `A lista de destino se chama "${listName}".` : "",
    text ? `\nMensagem:\n"""\n${text.slice(0, 20000)}\n"""` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function cleanItems(raw) {
  let list = raw;
  if (typeof list === "string") list = list.split(/\r?\n/);
  if (list && !Array.isArray(list) && Array.isArray(list.items)) list = list.items;
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const out = [];
  for (let v of list) {
    if (v && typeof v === "object") v = v.summary || v.item || v.name || v.text || "";
    if (typeof v !== "string") continue;
    let s = v.trim().replace(/^([-*•·▪◦‣–—]|\d+[.)]|\[[ xX✓]?\])\s*/, "").trim();
    if (!s) continue;
    s = s.slice(0, 255);
    s = s.charAt(0).toUpperCase() + s.slice(1);
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
    if (out.length >= MAX_ITEMS) break;
  }
  return out;
}

// Sugestões › Pedir à IA: which pending items to resolve now, and why.
const SUGGEST_STRUCTURE = {
  items: {
    description: 'Até 5 itens escolhidos, um por elemento, no formato "número | motivo curto".',
    required: true,
    selector: { text: { multiple: true } },
  },
};
const WEEKDAY = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MONTH = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const oneLine = (v, max) => String(v == null ? "" : v).replace(/[\r\n|"]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/** The items the app sends (already only the visible, pending ones): {key, lista, texto, dias, pontos, repete, compras}. */
export function cleanSuggestItems(raw) {
  const out = [];
  for (const i of Array.isArray(raw) ? raw.slice(0, 150) : []) {
    if (!i || typeof i.key !== "string" || !/^todo\.[a-z0-9_]+\|.{1,200}$/.test(i.key)) continue;
    const texto = oneLine(i.texto, 140);
    if (!texto) continue;
    out.push({
      key: i.key,
      lista: oneLine(i.lista, 60),
      texto,
      dias: Number.isFinite(i.dias) && i.dias >= 0 ? Math.min(Math.round(i.dias), 9999) : null,
      pontos: Number.isFinite(i.pontos) && i.pontos > 0 ? Math.min(Math.round(i.pontos), 999) : 0,
      repete: Number.isFinite(i.repete) && i.repete > 0 ? Math.min(Math.round(i.repete), 365) : 0,
      compras: i.compras === true,
    });
  }
  return out;
}

export function suggestInstructions(items, now = new Date()) {
  const when = `${WEEKDAY[now.getDay()]}, ${now.getDate()} de ${MONTH[now.getMonth()]}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const rows = items.map((i, n) =>
    [
      n + 1,
      i.lista + (i.compras ? " (compras)" : ""),
      i.texto,
      i.dias == null ? "idade desconhecida" : i.dias === 0 ? "entrou hoje" : `${i.dias} ${i.dias === 1 ? "dia" : "dias"} na lista`,
      i.pontos ? `${i.pontos} pontos` : "",
      i.repete ? `repete a cada ${i.repete} dias` : "",
    ]
      .filter((x) => x !== "")
      .join(" | "),
  );
  return [
    "Você ajuda uma família a decidir o que resolver agora nas listas de tarefas da casa.",
    `Agora é ${when}.`,
    "Abaixo estão os itens pendentes, um por linha: número | lista | item | há quanto tempo está na lista | pontos | repetição.",
    "Escolha até 5 itens que valem a pena resolver agora. Dê preferência ao que está parado há muito tempo, ao que é rápido de fazer, ao que fecha uma lista, ao que vale pontos e ao que combina com o dia e a hora.",
    "Itens de listas de compras só entram se a lista estiver cheia ou parada há muito tempo; nesse caso escolha um deles e diga para ir às compras.",
    'Responda um elemento por item escolhido, no formato "número | motivo". O motivo é curto (até 70 caracteres), em português do Brasil, fala com a família e não repete o texto do item.',
    "Não invente itens nem números.",
    `\nItens:\n"""\n${rows.join("\n")}\n"""`,
  ].join("\n");
}

/** "3 | Está parado há 2 semanas" -> {n: 3, motivo}; up to 5, no repeats. */
export function parseSuggestions(raw, count) {
  let list = raw;
  if (list && !Array.isArray(list) && Array.isArray(list.items)) list = list.items;
  if (typeof list === "string") list = list.split(/\r?\n/);
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const v of list) {
    let n = null;
    let motivo = "";
    if (v && typeof v === "object") {
      n = Number(v.numero ?? v.n ?? v.id);
      motivo = String(v.motivo || v.reason || "");
    } else if (typeof v === "string") {
      const m = v.match(/^\s*(?:item\s*)?#?(\d{1,3})\s*[|:.)\-–—]\s*(.*)$/i);
      if (m) {
        n = Number(m[1]);
        motivo = m[2];
      }
    }
    if (!Number.isInteger(n) || n < 1 || n > count || seen.has(n)) continue;
    seen.add(n);
    motivo = oneLine(motivo, 120).replace(/^[-–—:]\s*/, "");
    out.push({ n, motivo: motivo ? motivo.charAt(0).toUpperCase() + motivo.slice(1) : "" });
    if (out.length >= 5) break;
  }
  return out;
}

export class AI {
  /** `selected()` returns the entity chosen in the app ("" = Home Assistant's default). */
  constructor({ ha, log, mediaDir, selected, usage = null }) {
    this.usage = usage; // Uso da IA: every call to ai_task.generate_data is counted
    this.ha = ha;
    this.log = log;
    this.mediaDir = mediaDir;
    this.selected = selected || (() => "");
  }

  tmpDir() {
    return path.join(this.mediaDir, TMP_REL);
  }

  mediaWritable() {
    try {
      fs.mkdirSync(this.tmpDir(), { recursive: true });
      fs.accessSync(this.tmpDir(), fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  /** AI Task entities that generate data, the ones that read photos first. */
  async entities() {
    const states = await this.ha.send({ type: "get_states" }, 15000);
    return states
      .filter((s) => s.entity_id.startsWith("ai_task."))
      .map((s) => {
        const features = Number(s.attributes.supported_features) || 0;
        return {
          id: s.entity_id,
          name: s.attributes.friendly_name || s.entity_id,
          images: Boolean(features & ATTACHMENTS),
          available: s.state !== "unavailable",
          features,
        };
      })
      .filter((e) => e.features & GEN_DATA)
      .sort((a, b) => Number(b.images) - Number(a.images) || a.name.localeCompare(b.name, "pt-BR"));
  }

  async preferred() {
    try {
      const prefs = await this.ha.send({ type: "ai_task/preferences/get" }, 10000);
      return (prefs && prefs.gen_data_entity_id) || null;
    } catch (e) {
      return null; // older Home Assistant
    }
  }

  /**
   * Which entity reads a message (images=false) or photos (images=true).
   * With "Padrão do Home Assistant", the preferred AI of Home Assistant, or the
   * first one that can do the job.
   */
  async resolve(needImages, list) {
    const ents = list || (await this.entities());
    const sel = this.selected();
    if (!ents.length) throw coded("no_ai", "Nenhuma IA configurada no Home Assistant (integração com tarefa de IA).");
    if (sel) {
      const e = ents.find((x) => x.id === sel);
      if (!e) throw coded("gone", "A IA escolhida não está mais no Home Assistant. Escolha outra em Mais › Leitura por IA.");
      if (!e.available) throw coded("unavailable", `${e.name} está indisponível no Home Assistant.`);
      if (needImages && !e.images) throw coded("no_vision", `${e.name} não lê fotos. Escolha outra IA em Mais › Leitura por IA.`);
      return e;
    }
    const ok = ents.filter((e) => e.available && (!needImages || e.images));
    if (!ok.length) {
      throw needImages
        ? coded("no_vision", "Nenhuma IA do Home Assistant lê fotos. Use um modelo que entenda imagens.")
        : coded("unavailable", "As IAs do Home Assistant estão indisponíveis.");
    }
    const pref = await this.preferred();
    return ok.find((e) => e.id === pref) || ok[0];
  }

  /** For Mais › Leitura por IA (and to enable the photo buttons). */
  async status() {
    const sel = this.selected();
    const base = { ready: false, images: false, selected: sel, using: null, entities: [], reason: null };
    if (!this.ha.ready) return { ...base, reason: "Sem conexão com o Home Assistant." };
    let ents;
    try {
      ents = await this.entities();
    } catch (err) {
      return { ...base, reason: `Não deu para consultar o Home Assistant: ${err.message}` };
    }
    const out = { ...base, entities: ents.map(({ id, name, images, available }) => ({ id, name, images, available })) };
    let text;
    try {
      text = await this.resolve(false, ents);
    } catch (err) {
      return { ...out, reason: err.message };
    }
    out.ready = true;
    out.using = { id: text.id, name: text.name };
    try {
      const photo = await this.resolve(true, ents);
      out.images = this.mediaWritable();
      if (!out.images) out.reason = "A pasta media do Home Assistant não está disponível para o app.";
      else if (photo.id !== text.id) out.photos = { id: photo.id, name: photo.name };
    } catch (err) {
      out.reason = err.message;
    }
    return out;
  }

  async extract({ text, images, listName }) {
    images = Array.isArray(images) ? images.slice(0, 6) : [];
    text = typeof text === "string" ? text.trim() : "";
    if (!text && !images.length) return { items: [], provider: null };
    if (!this.ha.ready) throw coded("no_ai", "Sem conexão com o Home Assistant.");
    const entity = await this.resolve(images.length > 0);
    if (images.length && !this.mediaWritable()) throw coded("no_media", "A pasta media do Home Assistant não está disponível para o app.");
    const prompt = instructions({ text, images: images.length, listName: typeof listName === "string" ? listName.slice(0, 120) : "" });
    const started = Date.now();
    let items = null;
    let failure = null;
    try {
      items = await this._viaHA(entity.id, prompt, images);
      return { items, provider: entity.name, entity: entity.id };
    } catch (err) {
      failure = err;
      throw err;
    } finally {
      if (this.usage) {
        let output = 0;
        try {
          output = items == null ? 0 : JSON.stringify(items).length;
        } catch (e) {
          /* not serializable */
        }
        this.usage.record({ kind: images.length ? "fotos" : "mensagem", entity: entity.id, input: prompt.length, output, images: images.length, seconds: (Date.now() - started) / 1000, result: resultOf(failure) });
      }
    }
  }

  /** Sugestões › Pedir à IA. Returns [{key, motivo}] for up to 5 of the items. */
  async suggest(rawItems) {
    const items = cleanSuggestItems(rawItems);
    if (!items.length) return { picks: [], provider: null };
    if (!this.ha.ready) throw coded("no_ai", "Sem conexão com o Home Assistant.");
    const entity = await this.resolve(false);
    const prompt = suggestInstructions(items);
    const started = Date.now();
    let out = null;
    let failure = null;
    try {
      const res = await this.ha.send(
        {
          type: "call_service",
          domain: "ai_task",
          service: "generate_data",
          service_data: { task_name: "ResolvIA: sugerir", instructions: prompt, structure: SUGGEST_STRUCTURE, entity_id: entity.id },
          return_response: true,
        },
        120000,
      );
      out = res && res.response ? res.response.data : null;
      const picks = parseSuggestions(out, items.length).map((p) => ({ key: items[p.n - 1].key, motivo: p.motivo }));
      if (!picks.length) throw coded("formato", "A IA não devolveu sugestões no formato esperado. Tente de novo.");
      return { picks, provider: entity.name };
    } catch (err) {
      failure = err;
      throw err;
    } finally {
      if (this.usage) {
        let output = 0;
        try {
          output = out == null ? 0 : JSON.stringify(out).length;
        } catch (e) {
          /* not serializable */
        }
        this.usage.record({ kind: "sugestao", entity: entity.id, input: prompt.length, output, images: 0, seconds: (Date.now() - started) / 1000, result: resultOf(failure) });
      }
    }
  }

  async _viaHA(entityId, prompt, images) {
    const files = [];
    try {
      const attachments = [];
      for (const img of images) {
        const ext = img.mime === "image/png" ? "png" : img.mime === "image/webp" ? "webp" : "jpg";
        const name = `foto-${crypto.randomBytes(6).toString("hex")}.${ext}`;
        const full = path.join(this.tmpDir(), name);
        fs.writeFileSync(full, Buffer.from(img.data, "base64"));
        files.push(full);
        attachments.push({ media_content_id: `media-source://media_source/local/${TMP_REL}/${name}`, media_content_type: img.mime || "image/jpeg" });
      }
      const data = { task_name: "ResolvIA: ler lista", instructions: prompt, structure: STRUCTURE, entity_id: entityId };
      if (attachments.length) data.attachments = attachments;
      const res = await this.ha.send(
        { type: "call_service", domain: "ai_task", service: "generate_data", service_data: data, return_response: true },
        120000,
      );
      const out = res && res.response ? res.response.data : null;
      return cleanItems(out);
    } finally {
      for (const f of files) fs.rm(f, { force: true }, () => {});
    }
  }
}
