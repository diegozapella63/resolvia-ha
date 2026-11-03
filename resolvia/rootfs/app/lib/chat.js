// Conversa com a IA (the chat beside the microphone): the person talks about the screen they are on,
// their lists, or anything else. The answer can carry actions (add or complete items), which the
// screen shows as cards and only does after a tap. The AI is the one Home Assistant gives the app
// (ai_task.generate_data), so there is no memory on its side: the conversation goes in every call.

const WEEKDAY = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MONTH = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const MAX_TURNS = 16;
const MAX_LISTS = 40;
const MAX_ITEMS = 250;
export const MAX_ACTIONS = 10;

const fold = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
const oneLine = (v, max) => String(v == null ? "" : v).replace(/[\r\n|]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
const text = (v, max) => String(v == null ? "" : v).replace(/\r/g, "").trim().slice(0, max);
// a real day of the calendar (2026-02-30 is not)
const isDate = (s) => {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const t = new Date(y, m - 1, d);
  return t.getFullYear() === y && t.getMonth() === m - 1 && t.getDate() === d;
};

export const CHAT_STRUCTURE = {
  resposta: {
    description: "A resposta para a pessoa, em português do Brasil: curta, direta, sem palavras em inglês e sem markdown.",
    required: true,
    selector: { text: { multiline: true } },
  },
  acoes: {
    description:
      'Só quando a pessoa pede para mexer nas listas: uma ação por elemento, "adicionar | nome da lista | item | prazo AAAA-MM-DD ou vazio" ou "concluir | nome da lista | item exatamente como está na lista". Vazio quando não há o que fazer.',
    required: false,
    selector: { text: { multiple: true } },
  },
};

/**
 * What the screen sends, checked: {messages: [{role: "user"|"ia", text}], context: {tela, listas: [{id,
 * nome, adicionar, itens: [{texto, prazo?, atrasado?, pontos?, comodo?, equipamento?, externo?}]}]}}.
 * The last message is the person's.
 */
export function cleanChat(raw) {
  const r = raw && typeof raw === "object" ? raw : {};
  const messages = (Array.isArray(r.messages) ? r.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "ia") && typeof m.text === "string" && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, text: text(m.text, 2000) }));
  const c = r.context && typeof r.context === "object" ? r.context : {};
  let budget = MAX_ITEMS;
  const listas = [];
  for (const l of Array.isArray(c.listas) ? c.listas.slice(0, MAX_LISTS) : []) {
    if (!l || typeof l.id !== "string" || !/^todo\.[a-z0-9_]+$/.test(l.id)) continue;
    const itens = [];
    for (const i of Array.isArray(l.itens) ? l.itens : []) {
      if (budget <= 0) break;
      const t = oneLine(i && i.texto, 160);
      if (!t) continue;
      budget--;
      itens.push({
        texto: t,
        prazo: isDate(i.prazo) ? i.prazo : null,
        atrasado: i.atrasado === true,
        pontos: Number.isFinite(i.pontos) && i.pontos > 0 ? Math.min(Math.round(i.pontos), 999) : 0,
        comodo: oneLine(i.comodo, 80),
        equipamento: oneLine(i.equipamento, 120),
        externo: oneLine(i.externo, 60),
      });
    }
    listas.push({ id: l.id, nome: oneLine(l.nome, 60) || l.id, adicionar: l.adicionar !== false, prazos: l.prazos === true, itens, pendentes: Number.isFinite(l.pendentes) ? Math.max(0, Math.round(l.pendentes)) : itens.length });
  }
  return { messages, context: { tela: oneLine(c.tela, 160), listas } };
}

const whenText = (now) => `${WEEKDAY[now.getDay()]}, ${now.getDate()} de ${MONTH[now.getMonth()]} de ${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** The instructions for one turn: who the AI is, today, the screen, the lists and the conversation so far. */
export function chatInstructions({ messages, context }, now = new Date()) {
  const lists = context.listas.length
    ? context.listas
        .map((l) => {
          const rows = l.itens.map((i) => {
            const extra = [i.prazo ? `prazo ${i.prazo}${i.atrasado ? " (atrasado)" : ""}` : "", i.pontos ? `${i.pontos} pontos` : "", i.comodo ? `cômodo: ${i.comodo}` : "", i.equipamento ? `equipamento: ${i.equipamento}` : "", i.externo ? `serviço externo: ${i.externo}` : ""].filter(Boolean);
            return `  - ${i.texto}${extra.length ? ` (${extra.join("; ")})` : ""}`;
          });
          const more = l.pendentes > l.itens.length ? `  - … e mais ${l.pendentes - l.itens.length}` : "";
          return [`• ${l.nome}${l.adicionar ? "" : " (não aceita itens novos)"}: ${l.pendentes ? `${l.pendentes} pendentes` : "nada pendente"}`, ...rows, more].filter(Boolean).join("\n");
        })
        .join("\n")
    : "(nenhuma lista)";
  const talk = messages.map((m) => `${m.role === "user" ? "Pessoa" : "Você"}: ${m.text}`).join("\n");
  return [
    "Você é a IA do ResolvIA, o app das listas de tarefas da casa no Home Assistant. Converse em português do Brasil, de forma curta e direta, sem palavras em inglês e sem markdown.",
    "A pessoa pode perguntar sobre as listas e a tela em que está, ou sobre qualquer outro assunto: responda das duas formas. Sobre as listas, use só os dados abaixo; não invente itens.",
    `Hoje é ${whenText(now)} (${ymd(now)}).`,
    context.tela ? `A pessoa está na tela: ${context.tela}.` : "",
    "Listas e itens pendentes:",
    lists,
    'Quando a pessoa pedir para adicionar ou concluir itens, escreva em "acoes" uma linha por item ("adicionar | lista | item | prazo" ou "concluir | lista | item") e, na resposta, diga o que vai fazer: ela confirma na tela antes. Sem pedido, deixe "acoes" vazio.',
    "Conversa até agora (responda à última fala da pessoa):",
    talk,
  ]
    .filter(Boolean)
    .join("\n");
}

/** The list of a name the AI wrote (the name or the id; accents and case ignored). */
function findList(lists, name) {
  const n = fold(name);
  if (!n) return null;
  return lists.find((l) => fold(l.nome) === n || l.id === name.trim()) || lists.find((l) => fold(l.nome).startsWith(n) || n.startsWith(fold(l.nome))) || null;
}

/**
 * The actions of an answer, checked against the lists the screen sent: [{tipo: "adicionar", lista, nome,
 * item, prazo} | {tipo: "concluir", lista, nome, item}]. A list that is not there, an item to complete
 * that is not in it, or one that is repeated are left out.
 */
export function parseChatActions(raw, context) {
  const lines = Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split("\n") : [];
  const out = [];
  const seen = new Set();
  for (const line of lines) {
    if (out.length >= MAX_ACTIONS) break;
    const parts = String(line || "").split("|").map((p) => p.trim());
    const tipo = fold(parts[0]);
    if (parts.length < 3) continue;
    const l = findList(context.listas, parts[1]);
    if (!l) continue;
    if (tipo.startsWith("adicion")) {
      const item = oneLine(parts[2], 255);
      if (!item || !l.adicionar) continue;
      const prazo = isDate(parts[3]) && l.prazos ? parts[3] : null;
      const k = `a|${l.id}|${fold(item)}`;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ tipo: "adicionar", lista: l.id, nome: l.nome, item: item.charAt(0).toUpperCase() + item.slice(1), prazo });
    } else if (tipo.startsWith("conclu")) {
      const it = l.itens.find((i) => fold(i.texto) === fold(parts[2]));
      if (!it) continue;
      const k = `c|${l.id}|${fold(it.texto)}`;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ tipo: "concluir", lista: l.id, nome: l.nome, item: it.texto });
    }
  }
  return out;
}

/** The text of the answer (the AI sometimes sends the whole thing as one string). */
export function replyOf(data) {
  if (data == null) return "";
  if (typeof data === "string") return text(data, 4000);
  if (typeof data.resposta === "string") return text(data.resposta, 4000);
  return "";
}
