// The tools of the ResolvIA for the CorrerIA (the WhatsApp, the Claude and the Gemini): read the lists and change
// them. The CorrerIA lists them (GET /api/integracao/ferramentas) and calls one (POST {nome, argumentos, pessoa,
// cliente}); the answer is a text for the AI. No AI here: who thinks is the AI of the CorrerIA, the Claude or the Gemini.
// The writes do what the screen does (frontend/src/resolvia-panel.js: _saveItem, _toggle, _deleteItem) with the same
// functions of the server: the to-do actions of Home Assistant, the rules of Recurring and what the Store keeps by
// the name of the task (points, rooms, equipment, Serviço externo). The tools follow what is on in the app: without
// points, no points; without rooms, no rooms (the same as the screens).
import { taskKey, externalValue } from "./store.js";
import { dueText } from "./report.js";

const F = { CREATE: 1, DELETE: 2, UPDATE: 4, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const has = (features, flag) => ((features || 0) & flag) === flag;
const MAX_LIMIT = 500;
const MAX_SHOW = 50; // in each part of the resumo
const WEEKDAY = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fold = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
const line = (v, max = 255) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const json = (v) => JSON.stringify(v);
// the CronologIA marks the tasks it keeps here with "[cr:<tag>]" in the notes (points.js on the screen)
const MARK = /\s*\[cr:[0-9a-f]{8}\]/g;
const stripMark = (s) => String(s || "").replace(MARK, "").trim();
const markOf = (s) => (/\[cr:[0-9a-f]{8}\]/.exec(String(s || "")) || [""])[0];
const keyOf = (item) => item.uid || item.summary;
const every = (days) => (days === 1 ? "todo dia" : days === 7 ? "toda semana" : days === 14 ? "a cada 2 semanas" : days === 30 ? "todo mês" : `a cada ${days} dias`);
const NOBODY = new Set(["ninguem", "ninguem do placar", "nenhum", "sem pontos"]);
const empty = (v) => v === undefined || v === null || v === "" || v === 0 || v === false || (Array.isArray(v) && !v.length);
// what editar_tarefa can change
const EDITS = ["texto", "prazo", "horario", "notas", "repetir_dias", "pontos", "comodos", "equipamentos", "externo", "mover_para"];

export const INSTRUCOES =
  "ResolvIA: as listas de tarefas da casa no Home Assistant (afazeres, compras, manutenção), com prazos, repetição e pontos. " +
  "Datas AAAA-MM-DD (ou hoje, amanhã) e horários HH:MM. Comece por resolvia_resumo: os ids das listas (todo.…) e das tarefas " +
  "(todo.…:…) servem nas outras ferramentas. Antes de gravar, diga à pessoa o que vai ser feito.";

/** A wrong argument (400): the message says what is accepted, so the AI can try again. */
export class ErroFerramenta extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/** A tool that does not exist (404). */
export class FerramentaDesconhecida extends Error {
  constructor(nome) {
    super(`Ferramenta desconhecida: ${line(nome, 60)}.`);
    this.status = 404;
  }
}

const err = (m) => new ErroFerramenta(m);

// ------------------------------------------------------------------ the list

const obj = (props, required = []) => ({ type: "object", properties: props, required, additionalProperties: false });
const DATA = { type: "string", description: "AAAA-MM-DD, hoje ou amanhã." };
const ID = { type: "string", description: "O id da tarefa (todo.lista:…, de resolvia_resumo ou resolvia_tarefas) ou o nome dela." };
const LISTA = { type: "string", description: "O id da lista (todo.…) ou o nome dela." };

/** What can be set on a task, by what is on in the app (on: {due, repeat, points, rooms, equips, ext}). */
function taskProps(on, edit) {
  const p = {
    texto: { type: "string", description: edit ? "O nome novo." : "O nome da tarefa, curto, como a pessoa escreveria. Várias de uma vez: uma por linha." },
  };
  if (on.due) {
    p.prazo = edit ? { type: "string", description: "AAAA-MM-DD, hoje ou amanhã; vazio tira o prazo." } : DATA;
    p.horario = { type: "string", description: edit ? "HH:MM; vazio deixa o dia todo." : "HH:MM (sem horário: o dia todo)." };
  }
  p.notas = { type: "string", description: edit ? "Detalhes; vazio apaga." : "Detalhes, links." };
  if (on.repeat) p.repetir_dias = { type: "integer", minimum: edit ? 0 : 1, maximum: 365, description: `Volta sozinha N dias depois de concluída (1 todo dia, 7 toda semana, 30 todo mês)${edit ? "; 0 para de repetir" : ""}.` };
  if (on.points) p.pontos = { type: "integer", minimum: 0, maximum: 1000, description: `Pontos no placar do CronologIA para quem concluir${edit ? "; 0 tira" : ""}.` };
  if (on.rooms) p.comodos = { type: "array", items: { type: "string" }, description: `Os cômodos (nome ou id, do InventarIA)${edit ? "; [] tira" : ""}.` };
  if (on.equips) p.equipamentos = { type: "array", items: { type: "string" }, description: `Os equipamentos ou móveis (nome, do InventarIA); o cômodo vem deles${edit ? "; [] tira" : ""}.` };
  if (on.ext) p.externo = { type: "string", description: `Serviço externo: quem faz, de fora da casa (ex.: Eletricista); "sim" sem dizer quem${edit ? '; vazio tira' : ""}.` };
  return p;
}

/** The tools, by what is on in the app now. */
export function toolList(on) {
  const tools = [
    {
      nome: "resumo",
      titulo: "Resumo das listas",
      descricao:
        "Visão geral de hoje: cada lista (id, pendentes, o que ela aceita), o que está atrasado, vence hoje e nos próximos 7 dias (com os ids das tarefas)" +
        `${on.points ? ", o placar" : ""}${on.rooms ? ", os cômodos" : ""} e o que está ligado no app. Comece por aqui.`,
      entrada: obj({}),
      grava: false,
    },
    {
      nome: "tarefas",
      titulo: "Buscar tarefas",
      descricao:
        "As tarefas de uma lista ou de todas (as listas ocultas só pelo nome ou id), com prazo, notas" +
        `${on.repeat ? ", repetição" : ""}${on.points ? ", pontos" : ""}${on.rooms ? ", cômodos" : ""}${on.equips ? ", equipamentos" : ""} e o id. Sem nada, as pendentes de todas as listas.`,
      entrada: obj({
        lista: LISTA,
        busca: { type: "string", description: "Parte do nome ou das notas." },
        ...(on.due ? { quando: { type: "string", enum: ["atrasadas", "hoje", "proximos_7_dias", "sem_prazo", "com_prazo"], description: "Pelo prazo." } } : {}),
        situacao: { type: "string", enum: ["pendentes", "concluidas", "todas"], description: "Padrão: pendentes." },
        ...(on.rooms ? { comodo: { type: "string", description: "Só as de um cômodo (nome ou id)." } } : {}),
        limite: { type: "integer", minimum: 1, maximum: MAX_LIMIT, description: "Padrão: 200." },
      }),
      grava: false,
    },
  ];
  if (on.repeat) tools.push({ nome: "repeticoes", titulo: "Tarefas que se repetem", descricao: "As tarefas que voltam sozinhas depois de concluídas: de quanto em quanto tempo e quando voltam.", entrada: obj({}), grava: false });
  if (on.points) tools.push({ nome: "pontos", titulo: "Pontos e placar", descricao: "Quem está no placar do CronologIA, quando ele fecha e quanto vale cada tarefa.", entrada: obj({}), grava: false });
  tools.push(
    {
      nome: "criar_tarefa",
      titulo: "Criar tarefa",
      descricao: "Cria uma tarefa (ou várias, uma por linha em texto) numa lista. Um item de compra também é uma tarefa (na lista de compras).",
      entrada: obj({ lista: LISTA, ...taskProps(on, false) }, ["lista", "texto"]),
      grava: true,
    },
    {
      nome: "editar_tarefa",
      titulo: "Editar tarefa",
      descricao: "Muda uma tarefa (só o que vier) ou a move para outra lista (mover_para).",
      entrada: obj({ id: ID, lista: { ...LISTA, description: "A lista da tarefa, se o id for o nome." }, ...taskProps(on, true), mover_para: { ...LISTA, description: "Move para esta lista (id ou nome)." } }, ["id"]),
      grava: true,
    },
    {
      nome: "concluir_tarefa",
      titulo: "Concluir tarefa",
      descricao:
        `Marca uma tarefa como feita${on.points ? " (os pontos vão para quem fez)" : ""}${on.repeat ? "; uma tarefa que se repete volta sozinha depois" : ""}. Com concluida false, desfaz (volta para pendente${on.points ? " e os pontos de hoje saem" : ""}).`,
      entrada: obj(
        {
          id: ID,
          lista: { ...LISTA, description: "A lista da tarefa, se o id for o nome." },
          ...(on.points ? { quem: { type: "string", description: "Quem fez, se não foi quem está falando (um nome do placar; ninguém: sem pontos)." } } : {}),
          concluida: { type: "boolean", description: "Padrão: true." },
        },
        ["id"],
      ),
      grava: true,
    },
    {
      nome: "apagar_tarefa",
      titulo: "Apagar tarefa",
      descricao: "Apaga uma tarefa da lista (e a repetição dela, se tiver). Para marcar como feita, use resolvia_concluir_tarefa.",
      entrada: obj({ id: ID, lista: { ...LISTA, description: "A lista da tarefa, se o id for o nome." } }, ["id"]),
      grava: true,
      apaga: true,
    },
  );
  return tools.map((t) => ({ ...t, apaga: !!t.apaga }));
}

// ------------------------------------------------------------------ dates

/** A real day of the calendar? */
function realDay(y, m, d) {
  const t = new Date(y, m - 1, d);
  return t.getFullYear() === y && t.getMonth() === m - 1 && t.getDate() === d;
}

/** "AAAA-MM-DD" from what the AI wrote: 2026-11-09, 09/11/2026, 09/11, hoje, amanhã, ontem. */
export function parseDate(v, now = new Date()) {
  const s = fold(v);
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const rel = { hoje: 0, amanha: 1, ontem: -1, "depois de amanha": 2 }[s];
  if (rel !== undefined) return ymd(new Date(base.getFullYear(), base.getMonth(), base.getDate() + rel));
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  let y, mo, d;
  if (m) [y, mo, d] = [+m[1], +m[2], +m[3]];
  else if ((m = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/.exec(s))) [y, mo, d] = [m[3] ? +m[3] : base.getFullYear(), +m[2], +m[1]];
  if (!y || !realDay(y, mo, d)) throw err(`Data inválida: ${line(v, 40)}. Use AAAA-MM-DD (ou hoje, amanhã).`);
  return `${y}-${pad(mo)}-${pad(d)}`;
}

/** "HH:MM" from 14:30, 9:00, 9h, 14h30. */
export function parseTime(v) {
  const m = /^(\d{1,2})(?:[:h](\d{2})?)?$/.exec(fold(v).replace(/\s/g, ""));
  if (!m || +m[1] > 23 || (m[2] && +m[2] > 59)) throw err(`Horário inválido: ${line(v, 20)}. Use HH:MM.`);
  return `${pad(+m[1])}:${m[2] || "00"}`;
}

/** The due of an item in local parts: {date, time} (time null for a whole day), or null. */
function dueParts(due) {
  if (!due) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return { date: due, time: null };
  const at = new Date(due);
  if (Number.isNaN(at.getTime())) return null;
  return { date: ymd(at), time: `${pad(at.getHours())}:${pad(at.getMinutes())}` };
}

/** The fields of a to-do action for a deadline (the same as _dueFields on the screen). */
function dueFields(features, date, time, clearing) {
  if (!date) {
    if (!clearing) return {};
    if (has(features, F.DUE_DATE)) return { due_date: null };
    if (has(features, F.DUE_DATETIME)) return { due_datetime: null };
    return {};
  }
  if (time && has(features, F.DUE_DATETIME)) return { due_datetime: `${date} ${time}:00` };
  if (has(features, F.DUE_DATE)) return { due_date: date };
  if (has(features, F.DUE_DATETIME)) return { due_datetime: `${date} ${time || "09:00"}:00` };
  return {};
}

// ------------------------------------------------------------------ the tools

export class Ferramentas {
  /**
   * ctx: {lists() → [{id, name, features, hidden, owner, unavailable, due}] in the order of the app, items(id) → the
   * items of a list (fresh), call(service, data, entityId) → a to-do action of Home Assistant, store, recurring,
   * placar, inventario, on() → {due, repeat, points, rooms, equips, ext}, userOf(pessoa) → the user id of Home Assistant
   * of that person, pointsPlan(msg) and pointsDone(msg) (the same as resolvia/points/done), roomsFromEquips(list,
   * summary), changed() (tells the CronologIA), now() → ms}.
   */
  constructor(ctx) {
    this.c = ctx;
  }

  lista() {
    return toolList(this.c.on());
  }

  /** Runs a tool and returns the text for the AI. Throws ErroFerramenta (400) or FerramentaDesconhecida (404). */
  async chamar(nome, argumentos, { pessoa = null } = {}) {
    const a = argumentos && typeof argumentos === "object" && !Array.isArray(argumentos) ? argumentos : {};
    const on = this.c.on();
    const run = {
      resumo: () => this.resumo(on, pessoa),
      tarefas: () => this.tarefas(a, on),
      repeticoes: () => this.repeticoes(on),
      pontos: () => this.pontos(on, pessoa),
      criar_tarefa: () => this.criar(a, on),
      editar_tarefa: () => this.editar(a, on),
      concluir_tarefa: () => this.concluir(a, on, pessoa),
      apagar_tarefa: () => this.apagar(a),
    }[String(nome || "")];
    if (!run) throw new FerramentaDesconhecida(nome);
    return run();
  }

  // ---------------------------------------------------------------- helpers

  now() {
    return new Date(this.c.now());
  }

  async lists() {
    return this.c.lists();
  }

  /** A list by its id or its name (accents and case ignored; the start of the name when only one starts so). */
  findList(lists, v, what = "Lista") {
    const s = line(v, 120);
    const n = fold(s);
    const found = lists.find((l) => l.id === s) || lists.find((l) => fold(l.name) === n) || (n ? lists.filter((l) => fold(l.name).includes(n)) : []);
    if (found && !Array.isArray(found)) return found;
    if (found.length === 1) return found[0];
    throw err(`${what} não encontrada: ${s || "(vazio)"}. As listas: ${lists.map((l) => `${l.name} (${l.id})`).join(", ") || "nenhuma"}.`);
  }

  /** The items of a list ([] when it does not answer). */
  async items(list) {
    if (list.unavailable) return [];
    try {
      return await this.c.items(list.id);
    } catch {
      return [];
    }
  }

  /** The repeat rule of an item (by its uid, or by the name of a pending one not yet bound), or null. */
  ruleOf(listId, item) {
    return Object.values(this.c.store.rules).find((r) => r.entity_id === listId && (r.uid ? r.uid === item.uid : item.status !== "completed" && r.match === item.summary)) || null;
  }

  /**
   * A task by its id ("todo.casa:u3") or its name (in the list given, or in all of them; the pending one first).
   * Returns {list, item}.
   */
  async findTask(lists, a) {
    const id = line(a.id, 600);
    if (!id) throw err("Falta o id da tarefa.");
    const m = /^(todo\.[a-z0-9_]+):(.+)$/.exec(id);
    if (m) {
      const list = lists.find((l) => l.id === m[1]);
      const item = list && (await this.items(list)).find((i) => keyOf(i) === m[2]);
      if (!item) throw err(`Tarefa não encontrada: ${id}. Busque com resolvia_tarefas.`);
      return { list, item };
    }
    const where = a.lista ? [this.findList(lists, a.lista)] : lists.filter((l) => !l.unavailable);
    const n = taskKey(id);
    const all = [];
    for (const list of where) for (const item of await this.items(list)) all.push({ list, item });
    const same = all.filter((x) => taskKey(x.item.summary) === n);
    let hit = same.length ? same : all.filter((x) => taskKey(x.item.summary).includes(n));
    if (hit.length > 1) {
      const pending = hit.filter((x) => x.item.status !== "completed");
      if (pending.length) hit = pending;
    }
    if (hit.length === 1) return hit[0];
    if (!hit.length) throw err(`Tarefa não encontrada: ${id}. Busque com resolvia_tarefas.`);
    throw err(`Mais de uma tarefa com esse nome: ${hit.slice(0, 10).map((x) => `${x.item.summary} (${x.list.name}, id ${x.list.id}:${keyOf(x.item)})`).join("; ")}. Use o id.`);
  }

  /** A task as the AI reads it: id, list, name, situation, deadline and what is on in the app. */
  view(list, item, on, now = this.now()) {
    const out = { id: `${list.id}:${keyOf(item)}`, lista: list.name, texto: line(item.summary, 255), situacao: item.status === "completed" ? "concluída" : "pendente" };
    const due = dueParts(item.due);
    if (due) {
      const when = due.time ? `${due.date} ${due.time}` : due.date;
      if (list.due) {
        out.prazo = when;
        if (item.status !== "completed" && dueText(item.due, now.getTime()).late) out.atrasada = true;
      } else out.data = when; // the dates of this list are information, not deadlines
    }
    const notes = stripMark(item.description);
    if (notes) out.notas = notes.slice(0, 300);
    const st = this.c.store;
    const mirrored = this.c.placar.mirrored(list.id, item.uid);
    if (mirrored) out.cronologia = mirrored.tipo === "rotina" ? "rotina (vem do CronologIA)" : "manutenção (vem do CronologIA)";
    const rule = on.repeat ? this.ruleOf(list.id, item) : null;
    if (rule) {
      out.repete = every(rule.days);
      if (rule.reopen_at) out.volta_em = ymd(new Date(rule.reopen_at));
    }
    const pts = on.points ? (mirrored ? mirrored.pontos : st.pointsFor(list.id, item.summary)) : 0;
    if (pts) out.pontos = pts;
    if (on.rooms) {
      const rooms = st.roomsFor(list.id, item.summary).map((id) => this.c.inventario.nameOf(id)).filter(Boolean);
      if (rooms.length) out.comodos = rooms;
    }
    if (on.equips) {
      const eq = st.equipsFor(list.id, item.summary).map((id) => (this.c.inventario.state.itens.find((i) => i.id === id) || {}).nome).filter(Boolean);
      if (eq.length) out.equipamentos = eq;
    }
    const ext = on.ext ? st.externalFor(list.id, item.summary) : null;
    if (ext) out.externo = ext === true ? "sim" : ext;
    return out;
  }

  /** The rooms of the InventarIA from names or ids ("todos": every room). */
  roomIds(v) {
    const all = this.c.inventario.state.comodos;
    const names = this.asList(v);
    if (names.length === 1 && fold(names[0]) === "todos") return all.map((c) => c.id);
    return names.map((s) => {
      const n = fold(s);
      const c = all.find((x) => x.id === s) || all.find((x) => fold(x.nome) === n) || all.filter((x) => fold(x.nome).includes(n));
      if (c && !Array.isArray(c)) return c.id;
      if (n && c.length === 1) return c[0].id;
      throw err(`Cômodo não encontrado: ${line(s, 60)}. Os cômodos: ${all.map((x) => x.nome).join(", ") || "nenhum (veja o InventarIA)"}.`);
    });
  }

  /** The items of the InventarIA from names ("Geladeira" or "Geladeira (Cozinha)") or ids. */
  equipIds(v) {
    const inv = this.c.inventario;
    const all = inv.state.itens;
    return this.asList(v).map((s) => {
      const n = fold(s);
      const exact = all.filter((x) => x.id === s || fold(inv.itemLabel(x)) === n);
      const same = exact.length ? exact : all.filter((x) => fold(x.nome) === n);
      const hit = same.length ? same : all.filter((x) => n && fold(inv.itemLabel(x)).includes(n));
      if (hit.length === 1) return hit[0].id;
      if (hit.length > 1) throw err(`Mais de um equipamento com esse nome: ${hit.slice(0, 15).map((x) => inv.itemLabel(x)).join("; ")}. Diga qual, com o cômodo entre parênteses.`);
      throw err(`Equipamento não encontrado: ${line(s, 60)}. Use o nome como está no InventarIA (ex.: Geladeira (Cozinha)).`);
    });
  }

  /** A list of names from an array or a text with commas. */
  asList(v) {
    const arr = Array.isArray(v) ? v : String(v).split(",");
    return [...new Set(arr.map((x) => line(x, 120)).filter(Boolean))].slice(0, 10);
  }

  /** What the person said about a task, checked against the list and what is on (before anything is done). */
  fields(a, on, list, { edit = false, item = null } = {}) {
    const f = {};
    // something for what is off in the app: refused (an empty value is as if nothing came)
    const off = (k, why) => {
      if (!empty(a[k])) throw err(`${why} desligado no ResolvIA.`);
    };
    if (on.due) {
      if (a.prazo !== undefined && a.prazo !== null) {
        const clear = edit && ["", "sem", "sem prazo", "nenhum"].includes(fold(a.prazo));
        if (!clear && !has(list.features, F.DUE_DATE) && !has(list.features, F.DUE_DATETIME)) throw err(`A lista ${list.name} não aceita prazo.`);
        f.date = clear ? null : parseDate(a.prazo, this.now());
      }
      if (a.horario !== undefined && a.horario !== null) {
        f.time = fold(a.horario) === "" || fold(a.horario) === "dia todo" ? null : parseTime(a.horario);
        if (f.time && !has(list.features, F.DUE_DATETIME)) throw err(`A lista ${list.name} não aceita horário, só a data.`);
        const date = "date" in f ? f.date : (dueParts(item && item.due) || {}).date;
        if (f.time && !date) throw err("Diga também o prazo (o horário é do dia do prazo).");
      }
    } else off("prazo", "Controlar prazos está"), off("horario", "Controlar prazos está");
    if (a.notas !== undefined && a.notas !== null) {
      if (!has(list.features, F.DESCRIPTION)) throw err(`A lista ${list.name} não aceita notas.`);
      f.notes = String(a.notas).replace(/\r/g, "").trim().slice(0, 4000);
    }
    if (on.repeat) {
      if (a.repetir_dias !== undefined && a.repetir_dias !== null) {
        const n = Number(a.repetir_dias);
        if (!Number.isInteger(n) || n < (edit ? 0 : 1) || n > 365) throw err(`repetir_dias: de ${edit ? 0 : 1} a 365.`);
        if (n && !has(list.features, F.UPDATE) && !has(list.features, F.CREATE)) throw err(`A lista ${list.name} não deixa repetir.`);
        f.repeat = n;
      }
    } else off("repetir_dias", "Repetir depois de concluir está");
    if (on.points) {
      if (a.pontos !== undefined && a.pontos !== null) {
        const n = Number(a.pontos);
        if (!Number.isInteger(n) || n < 0 || n > 1000) throw err("pontos: de 0 a 1000.");
        f.points = n;
      }
    } else off("pontos", "Usar recompensas está");
    if (on.rooms) {
      if (a.comodos !== undefined && a.comodos !== null) f.rooms = this.roomIds(a.comodos);
    } else off("comodos", "Usar cômodos está");
    if (on.equips) {
      if (a.equipamentos !== undefined && a.equipamentos !== null) f.equips = this.equipIds(a.equipamentos);
    } else off("equipamentos", "Usar equipamentos está");
    if (on.ext) {
      if (a.externo !== undefined && a.externo !== null) f.ext = ["sim", "true"].includes(fold(a.externo)) ? true : externalValue(String(a.externo));
    } else off("externo", "Serviços externos está");
    return f;
  }

  /** The new items of a list after an add (by uid, in order), matched to the names added. */
  async newItems(list, before, names) {
    const fresh = (await this.items(list)).filter((i) => !before.has(keyOf(i)));
    return names.map((name) => {
      const k = fresh.findIndex((i) => i.summary === name);
      return k >= 0 ? fresh.splice(k, 1)[0] : null;
    });
  }

  /** What the app keeps for a task (repeat, points, rooms, equipment, Serviço externo), as the screen saves it. */
  saveExtras(list, summary, uid, f, previous = null) {
    const st = this.c.store;
    if (f.repeat) this.c.recurring.setRule({ entity_id: list.id, uid, summary, days: f.repeat });
    if (f.points !== undefined) st.setPoints(list.id, summary, f.points, previous);
    if (f.rooms !== undefined) st.setRoom(list.id, summary, f.rooms, previous);
    if (f.equips !== undefined) {
      st.setEquip(list.id, summary, f.equips, previous);
      this.c.roomsFromEquips(list.id, summary);
    }
    if (f.ext !== undefined) st.setExternal(list.id, summary, f.ext, previous);
  }

  /** The extras as words, for the confirmation ("prazo 2026-11-09 · repete toda semana · 10 pontos"). */
  extrasText(list, item, on) {
    const v = this.view(list, item, on);
    return [
      v.prazo || v.data ? `prazo ${v.prazo || v.data}` : "",
      v.repete ? `repete ${v.repete}` : "",
      v.pontos ? `${v.pontos} pontos` : "",
      ...(v.comodos || []),
      ...(v.equipamentos || []),
      v.externo ? (v.externo === "sim" ? "serviço externo" : `serviço externo: ${v.externo}`) : "",
    ].filter(Boolean);
  }

  writable(list, flag, what) {
    if (list.unavailable) throw err(`A lista ${list.name} está indisponível no Home Assistant agora.`);
    if (!has(list.features, flag)) throw err(`A lista ${list.name} não deixa ${what}.`);
  }

  // ---------------------------------------------------------------- reading

  async resumo(on, pessoa) {
    const now = this.now();
    const lists = await this.lists();
    const parts = { atrasadas: [], vencem_hoje: [], proximos_7_dias: [] };
    let undated = 0;
    const rows = [];
    for (const l of lists) {
      const items = await this.items(l);
      const pending = items.filter((i) => i.status !== "completed" && String(i.summary).trim());
      const accepts = [has(l.features, F.CREATE) && "adicionar", has(l.features, F.UPDATE) && "concluir e editar", has(l.features, F.DELETE) && "apagar", on.due && (has(l.features, F.DUE_DATE) || has(l.features, F.DUE_DATETIME)) && "prazo", on.due && has(l.features, F.DUE_DATETIME) && "horário", has(l.features, F.DESCRIPTION) && "notas"].filter(Boolean);
      const row = { id: l.id, nome: l.name, pendentes: pending.length };
      if (l.unavailable) row.indisponivel = true;
      if (l.hidden) row.oculta = true;
      if (l.owner) row.de = l.owner;
      if (on.due && !l.due && l.features & (F.DUE_DATE | F.DUE_DATETIME)) row.datas = "informação, não prazo";
      row.aceita = accepts.join(", ") || "só leitura";
      if (!l.hidden && !l.unavailable) {
        let late = 0;
        let today = 0;
        for (const i of pending) {
          const d = on.due && l.due && i.due ? dueText(i.due, now.getTime()) : null;
          if (!d) {
            undated++;
            continue;
          }
          const part = d.late ? "atrasadas" : d.days === 0 ? "vencem_hoje" : d.days < 7 ? "proximos_7_dias" : null;
          if (d.late) late++;
          else if (d.days === 0) today++;
          if (part) parts[part].push({ at: Date.parse(i.due.length > 10 ? i.due : `${i.due}T00:00:00`), v: this.view(l, i, on, now) });
        }
        if (late) row.atrasadas = late;
        if (today) row.vencem_hoje = today;
      }
      rows.push(row);
    }
    const out = { hoje: ymd(now), dia_da_semana: WEEKDAY[now.getDay()], listas: rows };
    if (on.due) {
      for (const [k, list] of Object.entries(parts)) {
        list.sort((a, b) => a.at - b.at);
        out[k] = list.slice(0, MAX_SHOW).map((x) => x.v);
        if (list.length > MAX_SHOW) out[`${k}_total`] = list.length;
      }
      out.sem_prazo = undated;
    } else out.pendentes_sem_prazo = undated;
    out.ligado = [on.due && "prazos", on.repeat && "repetição", on.points && "pontos", on.rooms && "cômodos", on.equips && "equipamentos", on.ext && "serviços externos"].filter(Boolean).join(", ") || "nada além das listas";
    if (on.points) {
      const p = this.c.placar.read();
      out.placar = p && p.ativo ? { participantes: p.participantes, voce: await this.whoIs(pessoa) } : "desligado ou sem CronologIA: as tarefas não dão pontos agora";
    }
    if (on.rooms) out.comodos = this.c.inventario.state.comodos.map((c) => c.nome);
    return json(out);
  }

  async tarefas(a, on) {
    const now = this.now();
    const lists = await this.lists();
    const pick = a.lista ? [this.findList(lists, a.lista)] : lists.filter((l) => !l.hidden && !l.unavailable);
    const sit = a.situacao === "concluidas" || a.situacao === "todas" ? a.situacao : "pendentes";
    if (a.quando && !on.due) throw err("Controlar prazos está desligado no ResolvIA.");
    const quando = a.quando ? String(a.quando) : "";
    if (quando && !["atrasadas", "hoje", "proximos_7_dias", "sem_prazo", "com_prazo"].includes(quando)) throw err("quando: atrasadas, hoje, proximos_7_dias, sem_prazo ou com_prazo.");
    if (a.comodo && !on.rooms) throw err("Usar cômodos está desligado no ResolvIA.");
    const room = a.comodo ? this.roomIds(a.comodo)[0] : null;
    const busca = fold(a.busca);
    const limite = Math.max(1, Math.min(MAX_LIMIT, Math.round(Number(a.limite)) || 200));
    const found = [];
    for (const l of pick) {
      for (const i of await this.items(l)) {
        if (!String(i.summary).trim()) continue;
        const done = i.status === "completed";
        if ((sit === "pendentes" && done) || (sit === "concluidas" && !done)) continue;
        if (busca && !fold(i.summary).includes(busca) && !fold(stripMark(i.description)).includes(busca)) continue;
        if (room && !this.c.store.roomsFor(l.id, i.summary).includes(room)) continue;
        const d = l.due && i.due ? dueText(i.due, now.getTime()) : null;
        if (quando) {
          const ok = { atrasadas: d && d.late && !done, hoje: d && !d.late && d.days === 0, proximos_7_dias: d && !d.late && d.days >= 0 && d.days < 7, sem_prazo: !d, com_prazo: !!d }[quando];
          if (!ok) continue;
        }
        found.push({ done, at: d ? Date.parse(i.due.length > 10 ? i.due : `${i.due}T00:00:00`) : Infinity, v: this.view(l, i, on, now) });
      }
    }
    // the pending ones first (late first, then by deadline; the ones without a deadline in the order of their list)
    found.sort((x, y) => Number(x.done) - Number(y.done) || x.at - y.at);
    return json({ encontradas: found.length, mostrando: Math.min(limite, found.length), tarefas: found.slice(0, limite).map((x) => x.v) });
  }

  async repeticoes(on) {
    if (!on.repeat) throw err("Repetir depois de concluir está desligado no ResolvIA.");
    const lists = await this.lists();
    const out = [];
    for (const l of lists) {
      const rules = Object.values(this.c.store.rules).filter((r) => r.entity_id === l.id);
      if (!rules.length) continue;
      const items = await this.items(l);
      for (const r of rules) {
        const item = items.find((i) => (r.uid ? i.uid === r.uid : i.status !== "completed" && i.summary === r.match));
        const row = { lista: l.name, texto: r.summary, repete: every(r.days), dias: r.days };
        if (item) row.id = `${l.id}:${keyOf(item)}`;
        row.situacao = r.reopen_at ? `concluída, volta em ${ymd(new Date(r.reopen_at))}` : "pendente";
        out.push(row);
      }
    }
    return json({ repeticoes: out, total: out.length });
  }

  async pontos(on, pessoa) {
    if (!on.points) throw err("Usar recompensas está desligado no ResolvIA.");
    const p = this.c.placar.read();
    const period = { semana: "toda semana", quinzena: "a cada 15 dias", mes: "todo mês" };
    const placar = !p
      ? "CronologIA não encontrado: as tarefas não dão pontos agora."
      : !p.ativo
        ? `Placar desligado no CronologIA${p.desligado ? " (a integração com o ResolvIA está desligada lá)" : ""}: as tarefas não dão pontos agora.`
        : { participantes: p.participantes, fecha: period[p.periodo] || "toda semana", voce: await this.whoIs(pessoa) };
    const lists = await this.lists();
    const tasks = [];
    for (const l of lists) {
      const map = this.c.store.points[l.id] || {};
      const items = Object.keys(map).length || (p && p.espelho[l.id]) ? await this.items(l) : [];
      const seen = new Set();
      for (const i of items) {
        const mirrored = this.c.placar.mirrored(l.id, i.uid);
        const n = mirrored ? mirrored.pontos : map[taskKey(i.summary)];
        if (!n) continue;
        seen.add(taskKey(i.summary));
        tasks.push({ id: `${l.id}:${keyOf(i)}`, lista: l.name, texto: i.summary, pontos: n, situacao: i.status === "completed" ? "concluída" : "pendente", ...(mirrored ? { cronologia: true } : {}) });
      }
      // worth points but not in the list now (the name is kept: it gives them when it comes back)
      for (const [k, n] of Object.entries(map)) if (!seen.has(k)) tasks.push({ lista: l.name, texto: k, pontos: n, situacao: "fora da lista agora" });
    }
    return json({ placar, tarefas: tasks });
  }

  /** The name of a person in the scoreboard (by their user of Home Assistant, or by the name), or null. */
  async whoIs(pessoa) {
    const p = this.c.placar.read();
    if (!p || !pessoa || typeof pessoa !== "object") return null;
    const user = await this.c.userOf(pessoa);
    return (user && p.usuarios[user]) || this.c.placar.participant(line(pessoa.nome, 40)) || null;
  }

  // ---------------------------------------------------------------- writing

  async criar(a, on) {
    const lists = await this.lists();
    if (!line(a.lista)) throw err(`Falta a lista. As listas: ${lists.map((l) => `${l.name} (${l.id})`).join(", ") || "nenhuma"}.`);
    const list = this.findList(lists, a.lista);
    this.writable(list, F.CREATE, "criar tarefas");
    const names = [...new Set(String(a.texto ?? "").split(/\r?\n/).map((s) => line(s)).filter(Boolean))].slice(0, 50);
    if (!names.length) throw err("Falta o texto da tarefa.");
    const f = this.fields(a, on, list);
    const items = await this.items(list);
    const before = new Set(items.map(keyOf));
    const twins = names.map((n) => items.find((i) => i.status !== "completed" && taskKey(i.summary) === taskKey(n))).filter(Boolean);
    const data = dueFields(list.features, f.date, f.time, false);
    if (f.notes) data.description = f.notes;
    for (const name of names) await this.c.call("add_item", { item: name, ...data }, list.id);
    const made = await this.newItems(list, before, names);
    names.forEach((name, k) => this.saveExtras(list, name, made[k] && made[k].uid, f));
    this.c.changed();
    const shown = names.map((name, k) => made[k] || { summary: name, status: "needs_action" });
    let txt;
    if (names.length === 1) {
      const extras = this.extrasText(list, shown[0], on);
      txt = `Criada em ${list.name}: ${names[0]}${extras.length ? ` · ${extras.join(" · ")}` : ""}.${made[0] ? ` id: ${list.id}:${keyOf(made[0])}` : ""}`;
    } else {
      const extras = this.extrasText(list, shown[0], on);
      txt = `Criadas ${names.length} tarefas em ${list.name}${extras.length ? ` (${extras.join(" · ")})` : ""}: ${names.map((n, k) => (made[k] ? `${n} (id ${list.id}:${keyOf(made[k])})` : n)).join(", ")}.`;
    }
    if (twins.length) txt += `\nAtenção: já havia ${twins.length === 1 ? "uma tarefa pendente igual" : "tarefas pendentes iguais"} (${twins.map((t) => `${t.summary}, id ${list.id}:${keyOf(t)}`).join("; ")}). Se foi engano, apague uma delas.`;
    return txt;
  }

  async editar(a, on) {
    const lists = await this.lists();
    const { list, item } = await this.findTask(lists, a);
    if (this.c.placar.mirrored(list.id, item.uid)) throw err(`${item.summary} vem do CronologIA: para editar, use o CronologIA. Aqui dá para concluir ou apagar.`);
    if (!EDITS.some((k) => a[k] !== undefined && a[k] !== null)) {
      const can = Object.keys(toolList(on).find((t) => t.nome === "editar_tarefa").entrada.properties).filter((k) => k !== "id" && k !== "lista");
      throw err(`Diga o que muda: ${can.join(", ")}.`);
    }
    const target = a.mover_para ? this.findList(lists, a.mover_para, "Lista de destino") : list;
    const f = this.fields(a, on, target, { edit: true, item });
    const summary = line(a.texto) || item.summary;
    const due = dueParts(item.due) || {};
    const date = "date" in f ? f.date : due.date;
    const time = date ? ("time" in f ? f.time : due.time) : null;
    const notes = f.notes !== undefined ? f.notes : stripMark(item.description);
    const st = this.c.store;
    const rule = this.ruleOf(list.id, item);
    // what the app keeps by the name of the task: it goes along with a rename or a move (as on the screen; rooms and
    // equipment only while they are on)
    const had = {
      points: st.pointsFor(list.id, item.summary),
      rooms: on.rooms ? st.roomsFor(list.id, item.summary) : undefined,
      equips: on.equips ? st.equipsFor(list.id, item.summary) : undefined,
      ext: st.externalFor(list.id, item.summary),
    };
    const was = this.extrasText(list, item, on);
    if (target.id !== list.id) {
      this.writable(list, F.DELETE, "tirar tarefas (para mover)");
      this.writable(target, F.CREATE, "receber tarefas");
      const dropped = [];
      if (date && !has(target.features, F.DUE_DATE) && !has(target.features, F.DUE_DATETIME)) dropped.push("o prazo");
      if (notes && !has(target.features, F.DESCRIPTION)) dropped.push("as notas");
      const beforeIds = new Set((await this.items(target)).map(keyOf));
      const data = { item: summary, ...dueFields(target.features, date, time, false) };
      if (notes && has(target.features, F.DESCRIPTION)) data.description = notes;
      await this.c.call("add_item", data, target.id);
      const [made] = await this.newItems(target, beforeIds, [summary]);
      this.saveExtras(target, summary, made && made.uid, {
        repeat: f.repeat !== undefined ? f.repeat : rule ? rule.days : 0,
        points: f.points ?? had.points,
        rooms: f.rooms ?? had.rooms,
        equips: f.equips ?? had.equips,
        ext: f.ext !== undefined ? f.ext : had.ext,
      });
      // what the task had here goes away with it
      if (rule) this.c.recurring.setRule({ entity_id: list.id, uid: rule.uid, summary: rule.match || rule.summary, days: 0 });
      this.saveExtras(list, item.summary, null, { points: 0, rooms: had.rooms && [], equips: had.equips && [], ext: null });
      await this.c.call("remove_item", { item: [keyOf(item)] }, list.id);
      this.c.changed();
      const now = this.extrasText(target, made || { summary, status: "needs_action" }, on);
      return `Movida de ${list.name} para ${target.name}: ${summary}${now.length ? ` · ${now.join(" · ")}` : ""}.${made ? ` id: ${target.id}:${keyOf(made)}` : ""}${dropped.length ? `\nA lista ${target.name} não aceita ${dropped.join(" nem ")}: ficou de fora.` : ""}`;
    }
    const data = { item: keyOf(item) };
    if (summary !== item.summary) data.rename = summary;
    if (notes !== stripMark(item.description)) data.description = [notes, markOf(item.description)].filter(Boolean).join(" ") || null;
    if ((due.date || null) !== (date || null) || (due.time || null) !== (time || null)) Object.assign(data, dueFields(list.features, date, time, true));
    if (Object.keys(data).length > 1) {
      this.writable(list, F.UPDATE, "editar tarefas");
      await this.c.call("update_item", data, list.id);
    }
    const prev = data.rename ? item.summary : null;
    this.saveExtras(list, summary, item.uid, { ...(prev ? had : {}), ...f, repeat: undefined }, prev);
    if (f.repeat !== undefined && f.repeat !== (rule ? rule.days : 0)) this.c.recurring.setRule({ entity_id: list.id, uid: item.uid, summary, days: f.repeat || null });
    this.c.changed();
    const now = this.extrasText(list, { ...item, summary, due: date ? (time ? `${date}T${time}:00` : date) : undefined }, on);
    return `Alterada em ${list.name}: ${summary}${now.length ? ` · ${now.join(" · ")}` : ""}. Antes: ${[item.summary, ...was].join(" · ")}. id: ${list.id}:${keyOf(item)}`;
  }

  async concluir(a, on, pessoa) {
    const lists = await this.lists();
    const { list, item } = await this.findTask(lists, a);
    const done = a.concluida !== false && fold(a.concluida) !== "false";
    this.writable(list, F.UPDATE, "concluir tarefas");
    const isDone = item.status === "completed";
    if (done === isDone) return `${done ? "Já estava concluída" : "Já estava pendente"}: ${item.summary} (${list.name}).`;
    const msg = { entity_id: list.id, uid: String(keyOf(item)), summary: item.summary };
    const mirrored = this.c.placar.mirrored(list.id, item.uid);
    let plan = { points: 0 };
    if (done && on.points) {
      const quem = line(a.quem, 40);
      if (quem && !NOBODY.has(fold(quem))) {
        try {
          plan = this.c.pointsPlan({ ...msg, done: true, quem });
        } catch {
          const p = this.c.placar.read();
          throw err(`Essa pessoa não está no placar: ${quem}. No placar: ${p.participantes.join(", ")}.`);
        }
      } else if (!quem) {
        plan = this.c.pointsPlan({ ...msg, done: true, userId: pessoa ? await this.c.userOf(pessoa) : null });
        const byName = plan.ask && pessoa && this.c.placar.participant(line(pessoa.nome, 40));
        if (byName) plan = this.c.pointsPlan({ ...msg, done: true, quem: byName });
        if (plan.ask) throw err(`${item.summary} vale ${plan.points} pontos no placar: diga quem fez em quem (${plan.participantes.join(", ")}), ou quem "ninguém" para concluir sem pontos.`);
      }
    }
    await this.c.call("update_item", { item: keyOf(item), status: done ? "completed" : "needs_action" }, list.id);
    const tail = [];
    if (done) {
      if (plan.who) {
        const r = await this.c.pointsDone({ ...msg, done: true, quem: plan.who });
        if (r.points) tail.push(`+${r.points} pontos para ${r.who}.`);
      }
      const rule = on.repeat ? this.ruleOf(list.id, item) : null;
      if (rule) tail.push(`Repete ${every(rule.days)}: volta sozinha em ${ymd(new Date(this.c.recurring.reopenTime(this.c.now(), rule.days)))}.`);
      if (mirrored) tail.push("Vem do CronologIA: fica feita lá também.");
      return `Concluída: ${item.summary} (${list.name}).${tail.length ? ` ${tail.join(" ")}` : ""}`;
    }
    if (mirrored || (on.points && this.c.store.pointsFor(list.id, item.summary))) {
      await this.c.pointsDone({ ...msg, done: false });
      if (on.points) tail.push("Os pontos de hoje saíram.");
    }
    return `Voltou para pendente: ${item.summary} (${list.name}).${tail.length ? ` ${tail.join(" ")}` : ""}`;
  }

  async apagar(a) {
    const lists = await this.lists();
    const { list, item } = await this.findTask(lists, a);
    this.writable(list, F.DELETE, "apagar tarefas");
    const rule = this.ruleOf(list.id, item);
    await this.c.call("remove_item", { item: [keyOf(item)] }, list.id);
    if (rule) this.c.recurring.setRule({ entity_id: list.id, uid: rule.uid, summary: rule.match || rule.summary, days: 0 });
    this.c.changed();
    return `Apagada: ${item.summary} (${list.name}).${rule ? " Não se repete mais." : ""}`;
  }
}
