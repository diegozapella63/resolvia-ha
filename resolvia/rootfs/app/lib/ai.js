// Reads items out of a pasted message or photos (handwritten/printed lists,
// screenshots). Like the other apps (InventarIA, GerencIA, EconomIA), it only
// uses the AI configured in Home Assistant (ai_task.generate_data) and keeps
// no API key: the person picks which AI in Mais > Leitura por IA.
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

export class AI {
  /** `selected()` returns the entity chosen in the app ("" = Home Assistant's default). */
  constructor({ ha, log, mediaDir, selected }) {
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
    return { items: await this._viaHA(entity.id, prompt, images), provider: entity.name, entity: entity.id };
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
