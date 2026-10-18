// A small fake of the parts of `hass` the panel uses, for the preview page.
// Mirrors Home Assistant's validation so feature checks behave the same.
import { F, has, ymd, addDays, parseListText } from "../src/util.js";

let uidSeq = 1000;
const uid = () => `u${uidSeq++}`;

export function createMockHass(onChange) {
  const now = new Date();
  const d = (n) => ymd(addDays(now, n));
  const dt = (n, h, m = 0) => {
    const x = addDays(now, n);
    x.setHours(h, m, 0, 0);
    return x.toISOString();
  };
  const it = (summary, extra = {}) => ({ uid: uid(), summary, status: "needs_action", ...extra });
  const done = (summary) => it(summary, { status: "completed" });

  const lists = {
    "todo.analise_dos_dispositivos_hacs_update_available": {
      name: "Análise dos Dispositivos HACS Update Available",
      device: "dev_analise",
      features: F.CREATE | F.DELETE | F.UPDATE,
      items: [it("Mushroom 5.1.0 disponível"), it("Bubble Card 3.1.2 disponível"), done("card-mod 4.0.1")],
    },
    "todo.analise_dos_dispositivos_problem_list": {
      name: "Análise dos Dispositivos Problem List",
      device: "dev_analise",
      features: F.CREATE | F.DELETE | F.UPDATE,
      items: [
        it("Sensor da porta da garagem indisponível"),
        it("Bateria baixa: sensor do quarto (8%)"),
      ],
    },
    "todo.notas_e_rotinas_do_alexa_shopping_list": {
      name: "Notas e Rotinas do Alexa Shopping list",
      device: "dev_alexa",
      features: F.CREATE | F.DELETE | F.UPDATE,
      items: [it("Café"), it("Leite"), it("Pão de forma"), it("Detergente"), done("Arroz")],
    },
    "todo.notas_e_rotinas_do_alexa_to_do_list": {
      name: "Notas e Rotinas do Alexa To-do list",
      device: "dev_alexa",
      features: F.CREATE | F.DELETE | F.UPDATE,
      items: [
        it("Calibrar sensor de presença da sala"),
        it("Revisar automação da irrigação"),
        it("Ver automações com spark gemini"),
        it("Configurar modo claro e escuro em tudo"),
        it("Ver homeassistant. no notebook diego do grupo"),
        it("Conf ha mcp os dois"),
        it("Configurar universal control"),
        it("Configurar browsermod no monitor da sala"),
        it("Aplicar pasta notebook diego"),
        it("Aplicar pasta notebook alexa"),
        it("Ver sobre: https://github.com/exemplo/ha-custom-sidebar"),
        it("Ver sobre: https://www.home-assistant.io/integrations/todo/"),
        it("Ver sobre: https://caspan.com/2024/12/home-assistant-dashboard-ideas/"),
        it("Ver sobre: https://github.com/outro-dev/lovelace-card"),
        done("Instalar HACS no servidor novo"),
        done("Backup antes do update"),
      ],
    },
    "todo.casa": {
      name: "Casa",
      device: null,
      features: 127,
      items: [
        it("Pagar conta de luz", { due: d(-2), description: "Vence todo dia 16. Débito automático caiu?" }),
        it("Trocar filtro do ar-condicionado", { due: d(0) }),
        it("Levar o carro na revisão", { due: dt(3, 9) }),
        it("Comprar lâmpadas da varanda", { description: "E27, 9W, branca quente — 4 unidades" }),
        it("Consertar a torneira do tanque", { due: d(9) }),
        it("Passar pano na casa"),
        it("Trocar roupa de cama"),
        done("Regar as plantas da varanda"),
        done("Limpar calhas"),
      ],
    },
  };

  const devices = {
    dev_analise: { id: "dev_analise", name: "Análise dos Dispositivos", name_by_user: null },
    dev_alexa: { id: "dev_alexa", name: "Notas e Rotinas do Alexa", name_by_user: null },
  };

  const subs = new Map(); // entity_id -> Set(callback)
  const prefs = { lists: {}, app: {} };

  // Recurring rules, like the app backend keeps them.
  const startOfDayPlus = (ms, days) => {
    const x = new Date(ms);
    return new Date(x.getFullYear(), x.getMonth(), x.getDate() + days).getTime();
  };
  const findUid = (id, summary) => lists[id].items.find((i) => i.summary === summary).uid;
  let ruleSeq = 1;
  const rules = [];
  const addRule = (id, summary, days, completedAgoDays = null) => {
    const r = { id: `r${ruleSeq++}`, entity_id: id, uid: findUid(id, summary), match: null, summary, days, completed_at: null, reopen_at: null };
    if (completedAgoDays != null) {
      r.completed_at = Date.now() - completedAgoDays * 86400000;
      r.reopen_at = startOfDayPlus(r.completed_at, days);
    }
    rules.push(r);
  };
  addRule("todo.casa", "Passar pano na casa", 3);
  addRule("todo.casa", "Trocar roupa de cama", 7);
  addRule("todo.casa", "Regar as plantas da varanda", 2, 1);
  const ruleSubs = new Set();
  const emitRules = () => {
    for (const cb of ruleSubs) setTimeout(() => cb({ rules: rules.map((r) => ({ ...r })) }), 30);
  };
  const syncRules = (id) => {
    for (const r of rules.filter((x) => x.entity_id === id)) {
      if (!r.uid && r.match) {
        const it = lists[id].items.find((i) => i.summary === r.match && i.status === "needs_action");
        if (it) Object.assign(r, { uid: it.uid, match: null });
      }
      const it = lists[id].items.find((i) => i.uid === r.uid);
      if (!it) continue;
      r.summary = it.summary;
      if (it.status === "completed" && !r.completed_at) {
        r.completed_at = Date.now();
        r.reopen_at = startOfDayPlus(r.completed_at, r.days);
      } else if (it.status === "needs_action" && r.completed_at) {
        r.completed_at = null;
        r.reopen_at = null;
      }
    }
    emitRules();
  };

  const clone = (items) => items.map((i) => ({ ...i }));

  function buildStates() {
    const states = {};
    for (const [id, l] of Object.entries(lists)) {
      states[id] = {
        entity_id: id,
        state: String(l.items.filter((i) => i.status !== "completed").length),
        attributes: { friendly_name: l.name, supported_features: l.features },
      };
    }
    return states;
  }

  const entities = {};
  for (const [id, l] of Object.entries(lists)) entities[id] = { entity_id: id, device_id: l.device, name: null };

  let hass;
  const emit = (id) => {
    const set = subs.get(id);
    if (set) for (const cb of set) setTimeout(() => cb({ items: clone(lists[id].items) }), 60);
    const prev = hass.states;
    const next = buildStates();
    for (const k of Object.keys(next)) if (k !== id && prev[k] && prev[k].state === next[k].state) next[k] = prev[k];
    hass = { ...hass, states: next };
    onChange(hass);
  };

  const fail = (msg) => {
    const e = new Error(msg);
    e.code = "service_validation_error";
    throw e;
  };
  const find = (l, key) => l.items.find((i) => i.uid === key || i.summary === key);
  const applyFields = (l, item, data) => {
    if ("due_date" in data) {
      if (!has(l.features, F.DUE_DATE)) fail("due_date não suportado");
      item.due = data.due_date || undefined;
    }
    if ("due_datetime" in data) {
      if (!has(l.features, F.DUE_DATETIME)) fail("due_datetime não suportado");
      item.due = data.due_datetime ? new Date(data.due_datetime.replace(" ", "T")).toISOString() : undefined;
    }
    if ("description" in data) {
      if (!has(l.features, F.DESCRIPTION)) fail("description não suportado");
      item.description = data.description || undefined;
    }
    if ("due_date" in data && "due_datetime" in data) fail("só um prazo por vez");
  };

  hass = {
    states: buildStates(),
    entities,
    devices,
    user: { name: "Diego Zapella", is_admin: true },
    themes: { darkMode: true },
    language: "pt-BR",
    // Simulated photo/message reading (the real app uses Home Assistant's AI).
    resolvia: {
      ai: { available: true, provider: "ha", text: true, images: true },
      async extract({ text, images }) {
        await new Promise((r) => setTimeout(r, images ? 1800 : 900));
        if (images && images.length) {
          return {
            provider: "ha:ai_task.google_ai_task",
            items: ["Leite integral (2 caixas)", "Ovos (1 dúzia)", "Pão francês", "Café 500 g", "Detergente", "Papel toalha"],
          };
        }
        return { provider: "ha:ai_task.google_ai_task", items: parseListText(text) };
      },
    },
    async callService(domain, service, data, target) {
      await new Promise((r) => setTimeout(r, 80));
      const id = target.entity_id;
      const l = lists[id];
      if (!l) fail("lista não existe");
      if (service === "add_item") {
        if (!has(l.features, F.CREATE)) fail("não suporta criar");
        const item = { uid: uid(), summary: data.item, status: "needs_action" };
        applyFields(l, item, data);
        l.items.push(item);
      } else if (service === "update_item") {
        if (!has(l.features, F.UPDATE)) fail("não suporta editar");
        const item = find(l, data.item);
        if (!item) fail("item não encontrado");
        if (data.rename) item.summary = data.rename;
        if (data.status) item.status = data.status;
        applyFields(l, item, data);
      } else if (service === "remove_item") {
        if (!has(l.features, F.DELETE)) fail("não suporta excluir");
        const keys = [].concat(data.item);
        l.items = l.items.filter((i) => !keys.includes(i.uid));
      } else if (service === "remove_completed_items") {
        l.items = l.items.filter((i) => i.status !== "completed");
      }
      syncRules(id);
      emit(id);
    },
    async callWS(msg) {
      await new Promise((r) => setTimeout(r, 40));
      if (msg.type === "todo/item/list") return { items: clone(lists[msg.entity_id].items) };
      if (msg.type === "todo/item/move") {
        const l = lists[msg.entity_id];
        if (!has(l.features, F.MOVE)) fail("não suporta mover");
        const idx = l.items.findIndex((i) => i.uid === msg.uid);
        const [item] = l.items.splice(idx, 1);
        const prev = msg.previous_uid ? l.items.findIndex((i) => i.uid === msg.previous_uid) : -1;
        l.items.splice(prev + 1, 0, item);
        emit(msg.entity_id);
        return null;
      }
      if (msg.type === "resolvia/recurring/set") {
        const i = rules.findIndex((r) => r.entity_id === msg.entity_id && (msg.uid ? r.uid === msg.uid : r.match === msg.summary));
        if (!msg.days) {
          if (i >= 0) rules.splice(i, 1);
        } else if (i >= 0) rules[i].days = msg.days;
        else rules.push({ id: `r${ruleSeq++}`, entity_id: msg.entity_id, uid: msg.uid || null, match: msg.uid ? null : msg.summary, summary: msg.summary, days: msg.days, completed_at: null, reopen_at: null });
        syncRules(msg.entity_id);
        return null;
      }
      if (msg.type === "resolvia/prefs/get") return JSON.parse(JSON.stringify(prefs));
      if (msg.type === "resolvia/prefs/set_list") {
        const cur = { ...(prefs.lists[msg.entity_id] || {}) };
        for (const [k, v] of Object.entries(msg.prefs)) v == null || v === "" ? delete cur[k] : (cur[k] = v);
        if (Object.keys(cur).length) prefs.lists[msg.entity_id] = cur;
        else delete prefs.lists[msg.entity_id];
        return JSON.parse(JSON.stringify(prefs));
      }
      if (msg.type === "resolvia/prefs/set_app") {
        for (const [k, v] of Object.entries(msg.prefs)) v == null || v === "" ? delete prefs.app[k] : (prefs.app[k] = v);
        return JSON.parse(JSON.stringify(prefs));
      }
      throw new Error(`unknown command ${msg.type}`);
    },
    connection: {
      subscribeMessage(cb, msg) {
        if (msg.type === "resolvia/recurring/subscribe") {
          ruleSubs.add(cb);
          emitRules();
          return Promise.resolve(() => ruleSubs.delete(cb));
        }
        if (msg.type !== "todo/item/subscribe") return Promise.reject(new Error("unknown"));
        const set = subs.get(msg.entity_id) || new Set();
        set.add(cb);
        subs.set(msg.entity_id, set);
        setTimeout(() => cb({ items: clone(lists[msg.entity_id].items) }), 150);
        return Promise.resolve(() => set.delete(cb));
      },
    },
  };
  return hass;
}
