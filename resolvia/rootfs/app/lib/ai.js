// Reads items out of a pasted message or photos (handwritten/printed lists,
// screenshots). Uses Home Assistant's own AI (AI Task) when configured;
// otherwise a Gemini API key from the app options.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const GEN_DATA = 1;
const ATTACHMENTS = 2;
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
  constructor({ ha, log, mediaDir, optionsFile, geminiUrl }) {
    this.ha = ha;
    this.log = log;
    this.mediaDir = mediaDir;
    this.optionsFile = optionsFile;
    this.geminiUrl = geminiUrl || "https://generativelanguage.googleapis.com";
  }

  options() {
    try {
      return JSON.parse(fs.readFileSync(this.optionsFile, "utf8")) || {};
    } catch (e) {
      return {};
    }
  }

  mediaWritable() {
    try {
      fs.mkdirSync(path.join(this.mediaDir, "resolvia"), { recursive: true });
      fs.accessSync(path.join(this.mediaDir, "resolvia"), fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  async haEntities() {
    try {
      const states = await this.ha.send({ type: "get_states" }, 15000);
      return states
        .filter((s) => s.entity_id.startsWith("ai_task.") && s.state !== "unavailable")
        .map((s) => ({ entity_id: s.entity_id, features: Number(s.attributes.supported_features) || 0 }))
        .filter((e) => e.features & GEN_DATA);
    } catch (e) {
      return [];
    }
  }

  async pickEntity(needImages) {
    const entities = await this.haEntities();
    const ok = entities.filter((e) => !needImages || e.features & ATTACHMENTS);
    if (!ok.length) return null;
    try {
      const prefs = await this.ha.send({ type: "ai_task/preferences/get" }, 10000);
      const pref = prefs && prefs.gen_data_entity_id;
      if (pref && ok.some((e) => e.entity_id === pref)) return pref;
    } catch (e) {
      /* older Home Assistant */
    }
    return ok[0].entity_id;
  }

  /** What the UI can offer. */
  async status() {
    const entities = await this.haEntities();
    const gemini = Boolean((this.options().gemini_api_key || "").trim());
    const haImages = entities.some((e) => e.features & ATTACHMENTS) && this.mediaWritable();
    if (entities.length) {
      return { available: true, provider: "ha", text: true, images: haImages || gemini };
    }
    if (gemini) return { available: true, provider: "gemini", text: true, images: true };
    return { available: false, provider: null, text: false, images: false };
  }

  async extract({ text, images, listName }) {
    images = Array.isArray(images) ? images.slice(0, 6) : [];
    text = typeof text === "string" ? text.trim() : "";
    if (!text && !images.length) return { items: [], provider: null };
    const prompt = instructions({ text, images: images.length, listName });

    const entity = await this.pickEntity(images.length > 0);
    const canHA = entity && (!images.length || this.mediaWritable());
    if (canHA) {
      try {
        return { items: await this._viaHA(entity, prompt, images), provider: `ha:${entity}` };
      } catch (err) {
        this.log.warn(`AI Task falhou (${err.message})${this.options().gemini_api_key ? ", tentando o Gemini" : ""}`);
        if (!this.options().gemini_api_key) throw err;
      }
    }
    if ((this.options().gemini_api_key || "").trim()) {
      return { items: await this._viaGemini(prompt, images), provider: "gemini" };
    }
    const err = new Error(
      images.length
        ? "Nenhuma IA que leia fotos está configurada. Configure o AI Task no Home Assistant ou uma chave do Gemini nas opções do app."
        : "Nenhuma IA configurada.",
    );
    err.code = "no_ai";
    throw err;
  }

  async _viaHA(entityId, prompt, images) {
    const files = [];
    try {
      const attachments = [];
      for (const img of images) {
        const ext = img.mime === "image/png" ? "png" : img.mime === "image/webp" ? "webp" : "jpg";
        const name = `import-${crypto.randomBytes(6).toString("hex")}.${ext}`;
        const full = path.join(this.mediaDir, "resolvia", name);
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, Buffer.from(img.data, "base64"));
        files.push(full);
        attachments.push({ media_content_id: `media-source://media_source/local/resolvia/${name}`, media_content_type: img.mime || "image/jpeg" });
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

  async _viaGemini(prompt, images) {
    const opts = this.options();
    const model = (opts.gemini_model || "gemini-flash-latest").trim();
    const parts = [{ text: prompt }];
    for (const img of images) parts.push({ inline_data: { mime_type: img.mime || "image/jpeg", data: img.data } });
    const res = await fetch(`${this.geminiUrl}/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": opts.gemini_api_key.trim() },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: { items: { type: "ARRAY", items: { type: "STRING" } } },
            required: ["items"],
          },
        },
      }),
      signal: AbortSignal.timeout(90000),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Gemini ${res.status}: ${(body.error && body.error.message) || res.statusText}`);
    }
    const textOut = ((body.candidates && body.candidates[0] && body.candidates[0].content && body.candidates[0].content.parts) || [])
      .map((p) => p.text || "")
      .join("");
    let parsed;
    try {
      parsed = JSON.parse(textOut);
    } catch (e) {
      parsed = textOut;
    }
    return cleanItems(parsed);
  }
}
