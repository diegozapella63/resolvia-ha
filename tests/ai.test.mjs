import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { AI, matchExact, matchList, cleanItems, cleanItemsWithLists, cleanSuggestItems, suggestInstructions, parseSuggestions } from "../resolvia/rootfs/app/lib/ai.js";
import { tmpDir, fakeLog, local, flushPromises } from "./_helpers.mjs";

const LISTS = [
  { id: "todo.compras", name: "Compras" },
  { id: "todo.casa", name: "Casa" },
  { id: "todo.joao", name: "João" },
];
const ROOMS = [
  { id: "cozinha", name: "Cozinha" },
  { id: "banh_social", name: "Banheiro social" },
  { id: "quarto", name: "Quarto" },
];
const EQUIPS = [
  { id: "ar_1", name: "Ar-condicionado (Quarto)" },
  { id: "armario_1", name: "Armário (Quarto)" },
  { id: "geladeira_1", name: "Geladeira (Cozinha)" },
  { id: "chuveiro_1", name: "Chuveiro" },
];

describe("matchExact (equipment)", () => {
  it("matches the same label, ignoring case, accents and outer spaces", () => {
    assert.equal(matchExact("geladeira (cozinha)", EQUIPS), "geladeira_1");
    assert.equal(matchExact("  ARMARIO (QUARTO) ", EQUIPS), "armario_1");
  });

  it("matches the name without the room in parentheses", () => {
    assert.equal(matchExact("Geladeira", EQUIPS), "geladeira_1");
    assert.equal(matchExact("ar-condicionado", EQUIPS), "ar_1");
    assert.equal(matchExact("Chuveiro", EQUIPS), "chuveiro_1");
  });

  it("never matches loosely ('Ar' is not 'Armário' nor 'Ar-condicionado')", () => {
    assert.equal(matchExact("Ar", EQUIPS), null);
    assert.equal(matchExact("Geladeira da cozinha", EQUIPS), null);
    assert.equal(matchExact("Quarto", EQUIPS), null);
  });

  it("prefers a full-label match over a match without the room", () => {
    const list = [
      { id: "a", name: "TV (Sala)" },
      { id: "b", name: "TV" },
    ];
    assert.equal(matchExact("TV", list), "b");
    assert.equal(matchExact("TV (Sala)", list), "a");
  });

  it("only strips the last parentheses", () => {
    assert.equal(matchExact("Ar (split) da sala", [{ id: "x", name: "Ar (split) da sala (Sala)" }]), "x");
  });

  it("returns null for empty answers or no equipment", () => {
    for (const v of ["", "   ", null, undefined]) assert.equal(matchExact(v, EQUIPS), null);
    assert.equal(matchExact("Geladeira", []), null);
    assert.equal(matchExact("Geladeira", undefined), null);
  });
});

describe("matchList (lists and rooms)", () => {
  it("matches the same name, folded", () => {
    assert.equal(matchList("compras", LISTS), "todo.compras");
    assert.equal(matchList("JOAO", LISTS), "todo.joao");
  });

  it("matches a name that contains the other one, either way", () => {
    assert.equal(matchList("Lista de compras", LISTS), "todo.compras");
    assert.equal(matchList("Banheiro", ROOMS), "banh_social");
  });

  it("prefers the exact name over a containing one", () => {
    const lists = [
      { id: "todo.compras_mes", name: "Compras do mês" },
      { id: "todo.compras", name: "Compras" },
    ];
    assert.equal(matchList("compras", lists), "todo.compras");
    assert.equal(matchList("compras do mes", lists), "todo.compras_mes");
  });

  it("returns null for unknown or empty names", () => {
    assert.equal(matchList("Trabalho", LISTS), null);
    for (const v of ["", " ", null, undefined]) assert.equal(matchList(v, LISTS), null);
    assert.equal(matchList("Casa", []), null);
    assert.equal(matchList("Casa", null), null);
  });
});

describe("cleanItems", () => {
  it("trims, drops bullets, numbering and checkboxes, capitalizes the first letter", () => {
    assert.deepEqual(cleanItems(["- leite", "* pão", "• café", "1. arroz", "2) feijão", "[ ] sal", "[x] açúcar", "— ovos", "  óleo  "]), ["Leite", "Pão", "Café", "Arroz", "Feijão", "Sal", "Açúcar", "Ovos", "Óleo"]);
  });

  it("keeps the rest of the text as written, including quantities", () => {
    assert.deepEqual(cleanItems(["leite integral (2 caixas)", "10 ovos", "iPhone carregador"]), ["Leite integral (2 caixas)", "10 ovos", "IPhone carregador"]);
  });

  it(
    "keeps a quantity with a decimal or thousands point at the start ('1.5 kg', '1.000 folhas')",
    () => {
      assert.deepEqual(cleanItems(["1.5 kg de carne", "1.000 folhas de sulfite"]), ["1.5 kg de carne", "1.000 folhas de sulfite"]);
    },
  );

  it("drops duplicates (case-insensitive, keeps the first) and empty lines", () => {
    assert.deepEqual(cleanItems(["Leite", "leite", "LEITE ", "", "  ", "-", "Pão"]), ["Leite", "Pão"]);
  });

  it("accepts a text (one item per line), {items}, and objects with summary/item/name/text", () => {
    assert.deepEqual(cleanItems("leite\r\npão\n\ncafé"), ["Leite", "Pão", "Café"]);
    assert.deepEqual(cleanItems({ items: ["a", "b"] }), ["A", "B"]);
    assert.deepEqual(cleanItems([{ summary: "um" }, { item: "dois" }, { name: "três" }, { text: "quatro" }, { other: "x" }, 5, null, true]), ["Um", "Dois", "Três", "Quatro"]);
  });

  it("returns [] for anything else", () => {
    for (const v of [null, undefined, 5, {}, { items: "x" }]) assert.deepEqual(cleanItems(v), []);
  });

  it("limits each item to 255 characters and the answer to 150 items", () => {
    assert.equal(cleanItems(["x".repeat(400)])[0].length, 255);
    const many = cleanItems(Array.from({ length: 200 }, (_, i) => `item ${i}`));
    assert.equal(many.length, 150);
    assert.equal(many[149], "Item 149");
  });
});

describe("cleanItemsWithLists", () => {
  it("maps the AI's list, room and equipment of each item to ids", () => {
    const out = cleanItemsWithLists(
      {
        items: ["Comprar leite", "Consertar a pia", "Trocar o filtro do ar", "Ligar para o João"],
        listas: ["Compras", "casa", "Casa", "João"],
        comodos: ["", "Cozinha", "quarto", ""],
        equipamentos: ["", "", "Ar-condicionado", ""],
      },
      LISTS,
      ROOMS,
      EQUIPS,
    );
    assert.deepEqual(out, {
      items: ["Comprar leite", "Consertar a pia", "Trocar o filtro do ar", "Ligar para o João"],
      lists: ["todo.compras", "todo.casa", "todo.casa", "todo.joao"],
      rooms: [null, "cozinha", "quarto", null],
      equips: [null, null, "ar_1", null],
    });
  });

  it("unknown names become null; rooms match loosely, equipment never does", () => {
    const out = cleanItemsWithLists({ items: ["a", "b"], listas: ["Trabalho", 7], comodos: ["Banheiro", "Garagem"], equipamentos: ["Ar", "Geladeira"] }, LISTS, ROOMS, EQUIPS);
    assert.deepEqual(out.lists, [null, null]);
    assert.deepEqual(out.rooms, ["banh_social", null]);
    assert.deepEqual(out.equips, [null, "geladeira_1"]);
  });

  it("keeps each answer aligned with its item when items are dropped (empty or repeated)", () => {
    const out = cleanItemsWithLists(
      { items: ["Leite", "", "leite", "Limpar a pia", "  "], listas: ["Compras", "Casa", "Casa", "Casa", "Compras"], comodos: ["", "Quarto", "Quarto", "Cozinha", ""], equipamentos: ["Geladeira", "", "", "", ""] },
      LISTS,
      ROOMS,
      EQUIPS,
    );
    assert.deepEqual(out.items, ["Leite", "Limpar a pia"]);
    assert.deepEqual(out.lists, ["todo.compras", "todo.casa"]);
    assert.deepEqual(out.rooms, [null, "cozinha"]);
    assert.deepEqual(out.equips, ["geladeira_1", null]);
  });

  it("missing or short answer arrays give null for the rest", () => {
    const out = cleanItemsWithLists({ items: ["A", "B", "C"], listas: ["Casa"], comodos: "Cozinha" }, LISTS, ROOMS, EQUIPS);
    assert.deepEqual(out.lists, ["todo.casa", null, null]);
    assert.deepEqual(out.rooms, [null, null, null]);
    assert.deepEqual(out.equips, [null, null, null]);
  });

  it("accepts a plain array or text (no lists chosen)", () => {
    assert.deepEqual(cleanItemsWithLists(["- leite", "pão"], LISTS), { items: ["Leite", "Pão"], lists: [null, null], rooms: [null, null], equips: [null, null] });
    assert.deepEqual(cleanItemsWithLists({ items: "leite\npão", listas: ["Compras", "Compras"] }, LISTS).lists, ["todo.compras", "todo.compras"]);
  });

  it("anything else gives empty answers", () => {
    for (const v of [null, undefined, 3, { listas: ["Casa"] }]) assert.deepEqual(cleanItemsWithLists(v, LISTS, ROOMS, EQUIPS), { items: [], lists: [], rooms: [], equips: [] });
  });

  it("stops at 150 items, with as many answers", () => {
    const items = Array.from({ length: 160 }, (_, i) => `Item ${i}`);
    const out = cleanItemsWithLists({ items, listas: items.map(() => "Casa") }, LISTS);
    assert.equal(out.items.length, 150);
    assert.equal(out.lists.length, 150);
    assert.equal(out.rooms.length, 150);
  });
});

describe("cleanSuggestItems", () => {
  const ok = { key: "todo.casa|u1", lista: "Casa", texto: "Varrer", dias: 3, pontos: 10, repete: 7, compras: false, comodo: "Sala", equipamento: "Aspirador (Sala)", externo: "Diarista" };

  it("keeps the known fields of a valid item", () => {
    assert.deepEqual(cleanSuggestItems([ok]), [ok]);
  });

  it("rejects items without a valid key or text", () => {
    const bad = [{ ...ok, key: "light.x|u1" }, { ...ok, key: "todo.casa" }, { ...ok, key: "todo.casa|" }, { ...ok, key: 5 }, { ...ok, texto: "  " }, { ...ok, texto: null }, null, "x"];
    assert.deepEqual(cleanSuggestItems(bad), []);
    assert.deepEqual(cleanSuggestItems("nope"), []);
  });

  it("puts every text on one line, without | or quotes, within limits", () => {
    const [i] = cleanSuggestItems([{ ...ok, texto: 'Comprar "pão" |\n hoje', lista: "L".repeat(80), comodo: "C\r\nozinha", equipamento: "E".repeat(200) }]);
    assert.equal(i.texto, "Comprar pão hoje");
    assert.equal(i.lista.length, 60);
    assert.equal(i.comodo, "C ozinha");
    assert.equal(i.equipamento.length, 120);
    assert.equal(cleanSuggestItems([{ ...ok, texto: "t".repeat(200) }])[0].texto.length, 140);
  });

  it("clamps the numbers and only accepts compras === true", () => {
    const [i] = cleanSuggestItems([{ ...ok, dias: 99999.4, pontos: 5000, repete: 999, compras: "true" }]);
    assert.deepEqual([i.dias, i.pontos, i.repete, i.compras], [9999, 999, 365, false]);
    const [j] = cleanSuggestItems([{ ...ok, dias: -1, pontos: -5, repete: "7", compras: true, comodo: undefined, equipamento: null }]);
    assert.deepEqual([j.dias, j.pontos, j.repete, j.compras, j.comodo, j.equipamento], [null, 0, 0, true, "", ""]);
    assert.equal(cleanSuggestItems([{ ...ok, dias: 2.6 }])[0].dias, 3);
  });

  it("takes at most 150 items", () => {
    assert.equal(cleanSuggestItems(Array.from({ length: 200 }, (_, n) => ({ ...ok, key: `todo.casa|u${n}` }))).length, 150);
  });
});

describe("suggestInstructions", () => {
  const items = cleanSuggestItems([
    { key: "todo.casa|1", lista: "Casa", texto: "Varrer a sala", dias: 0, pontos: 10, repete: 7, comodo: "Sala" },
    { key: "todo.casa|2", lista: "Casa", texto: "Trocar o filtro", dias: 1, equipamento: "Ar-condicionado (Quarto)" },
    { key: "todo.mercado|3", lista: "Mercado", texto: "Leite", dias: 12, compras: true },
    { key: "todo.casa|4", lista: "Casa", texto: "Pintar a porta" },
  ]);

  it("says the date and time in Portuguese", () => {
    const p = suggestInstructions(items, local(2026, 11, 2, 9, 5));
    assert.match(p, /Agora é segunda-feira, 2 de novembro, 09:05\./);
    assert.match(suggestInstructions(items, local(2027, 2, 28, 23, 59)), /Agora é domingo, 28 de fevereiro, 23:59\./);
    assert.match(suggestInstructions(items, local(2026, 3, 14, 0, 0)), /Agora é sábado, 14 de março, 00:00\./);
  });

  it("writes one row per item with only the columns it has", () => {
    const p = suggestInstructions(items, local(2026, 11, 2, 9, 5));
    const rows = p.split('"""')[1].trim().split("\n");
    assert.deepEqual(rows, [
      "1 | Casa | Varrer a sala | entrou hoje | 10 pontos | repete a cada 7 dias | cômodo: Sala",
      "2 | Casa | Trocar o filtro | 1 dia na lista | equipamento: Ar-condicionado (Quarto)",
      "3 | Mercado (compras) | Leite | 12 dias na lista",
      "4 | Casa | Pintar a porta | idade desconhecida",
    ]);
  });

  it("names the room and equipment columns, asks for a short Portuguese-only reason", () => {
    const p = suggestInstructions(items, local(2026, 11, 2, 9, 5));
    assert.match(p, /número \| lista \| item \| há quanto tempo está na lista \| pontos \| repetição \| cômodo \| equipamento/);
    assert.match(p, /até 100 caracteres/);
    assert.match(p, /todo em português do Brasil \(sem palavras em inglês\)/);
    assert.match(p, /"número \| motivo"/);
    assert.match(p, /Não invente itens nem números/);
  });

  it("only suggests grouping by room when some item has a room", () => {
    assert.match(suggestInstructions(items, local(2026, 11, 2)), /Itens do mesmo cômodo podem ser feitos de uma vez/);
    const noRooms = items.map((i) => ({ ...i, comodo: "" }));
    assert.doesNotMatch(suggestInstructions(noRooms, local(2026, 11, 2)), /mesmo cômodo/);
  });
});

describe("parseSuggestions", () => {
  it("reads 'number | reason' lines in several spellings", () => {
    assert.deepEqual(parseSuggestions(["3 | está parado há 2 semanas", "#1: rápido", "item 2 - vale pontos", " 4) fecha a lista", "5. combina com hoje"], 5), [
      { n: 3, motivo: "Está parado há 2 semanas" },
      { n: 1, motivo: "Rápido" },
      { n: 2, motivo: "Vale pontos" },
      { n: 4, motivo: "Fecha a lista" },
      { n: 5, motivo: "Combina com hoje" },
    ]);
  });

  it("accepts objects, {items} and a text", () => {
    assert.deepEqual(parseSuggestions([{ numero: 2, motivo: "a" }, { n: "1", reason: "b" }, { id: 3 }], 3), [
      { n: 2, motivo: "A" },
      { n: 1, motivo: "B" },
      { n: 3, motivo: "" },
    ]);
    assert.deepEqual(parseSuggestions({ items: ["1 | x"] }, 1), [{ n: 1, motivo: "X" }]);
    assert.deepEqual(parseSuggestions("1 | x\n2 | y", 2), [
      { n: 1, motivo: "X" },
      { n: 2, motivo: "Y" },
    ]);
  });

  it("drops numbers out of range, repeats and lines without a number", () => {
    assert.deepEqual(parseSuggestions(["0 | a", "4 | b", "2 | c", "2 | d", "sem número", "| e", 7, null], 3), [{ n: 2, motivo: "C" }]);
  });

  it("stops at 5, keeps the reason on one line within 120 characters", () => {
    const out = parseSuggestions(Array.from({ length: 8 }, (_, i) => `${i + 1} | motivo`), 8);
    assert.equal(out.length, 5);
    const [long] = parseSuggestions([`1 | ${"m".repeat(200)}`], 1);
    assert.equal(long.motivo.length, 120);
    assert.equal(parseSuggestions([{ numero: 1, motivo: 'linha\num | "dois"' }], 1)[0].motivo, "Linha um dois");
    assert.equal(parseSuggestions(["1 | - motivo"], 1)[0].motivo, "Motivo");
  });

  it("returns [] for anything else", () => {
    for (const v of [null, undefined, 3, {}]) assert.deepEqual(parseSuggestions(v, 3), []);
  });
});

// ---------------------------------------------------------------- the AI class, with a fake Home Assistant

const AI_STATES = [
  { entity_id: "ai_task.ollama", state: "unknown", attributes: { friendly_name: "Ollama", supported_features: 1 } },
  { entity_id: "ai_task.google", state: "unknown", attributes: { friendly_name: "Google AI", supported_features: 3 } },
  { entity_id: "ai_task.zeta", state: "unavailable", attributes: { friendly_name: "Zeta", supported_features: 3 } },
  { entity_id: "ai_task.no_data", state: "unknown", attributes: { friendly_name: "Só anexos", supported_features: 2 } },
  { entity_id: "todo.casa", state: "2", attributes: { friendly_name: "Casa" } },
];

function fakeHA({ states = AI_STATES, preferred = null, prefsFail = false, answer = (d) => ({ items: [] }), ready = true } = {}) {
  const calls = [];
  const ha = {
    ready,
    calls,
    async send(msg) {
      calls.push(msg);
      if (msg.type === "get_states") {
        if (states instanceof Error) throw states;
        return states;
      }
      if (msg.type === "ai_task/preferences/get") {
        if (prefsFail) throw new Error("unknown command");
        return { gen_data_entity_id: preferred };
      }
      if (msg.type === "call_service") {
        const data = await answer(msg.service_data);
        return { context: {}, response: { data } };
      }
      throw new Error(`unexpected ${msg.type}`);
    },
  };
  return ha;
}

function newAI({ selected = "", usage = null, mediaDir = tmpDir("resolvia-media-"), ...ha } = {}) {
  const fake = fakeHA(ha);
  return { ai: new AI({ ha: fake, log: fakeLog(), mediaDir, selected: () => selected, usage }), ha: fake, mediaDir };
}

const serviceCall = (ha) => ha.calls.find((c) => c.type === "call_service");

describe("AI: which AI reads", () => {
  it("lists the AI tasks that generate data, photo readers first, then by name", async () => {
    const { ai } = newAI();
    assert.deepEqual(
      (await ai.entities()).map((e) => [e.id, e.images, e.available]),
      [
        ["ai_task.google", true, true],
        ["ai_task.zeta", true, false],
        ["ai_task.ollama", false, true],
      ],
    );
  });

  it("uses Home Assistant's preferred AI by default, else the first one that can do the job", async () => {
    assert.equal((await newAI({ preferred: "ai_task.ollama" }).ai.resolve(false)).id, "ai_task.ollama");
    assert.equal((await newAI({ preferred: "ai_task.ollama" }).ai.resolve(true)).id, "ai_task.google", "Ollama does not read photos");
    assert.equal((await newAI({ preferred: "ai_task.zeta" }).ai.resolve(false)).id, "ai_task.google", "the preferred one is unavailable");
    assert.equal((await newAI({ prefsFail: true }).ai.resolve(false)).id, "ai_task.google", "older Home Assistant without preferences");
  });

  it("uses the AI chosen in the app, with clear errors when it cannot", async () => {
    assert.equal((await newAI({ selected: "ai_task.ollama" }).ai.resolve(false)).id, "ai_task.ollama");
    await assert.rejects(newAI({ selected: "ai_task.ollama" }).ai.resolve(true), { code: "no_vision", message: /Ollama não lê fotos/ });
    await assert.rejects(newAI({ selected: "ai_task.zeta" }).ai.resolve(false), { code: "unavailable", message: /Zeta está indisponível/ });
    await assert.rejects(newAI({ selected: "ai_task.gone" }).ai.resolve(false), { code: "gone" });
  });

  it("explains when there is no AI, none that reads photos, or none available", async () => {
    await assert.rejects(newAI({ states: [] }).ai.resolve(false), { code: "no_ai" });
    const textOnly = [AI_STATES[0]];
    await assert.rejects(newAI({ states: textOnly }).ai.resolve(true), { code: "no_vision" });
    const down = [{ ...AI_STATES[0], state: "unavailable" }];
    await assert.rejects(newAI({ states: down }).ai.resolve(false), { code: "unavailable" });
  });

  it("status() says what is used for messages and for photos", async () => {
    const st = await newAI({ preferred: "ai_task.ollama" }).ai.status();
    assert.equal(st.ready, true);
    assert.equal(st.images, true);
    assert.deepEqual(st.using, { id: "ai_task.ollama", name: "Ollama" });
    assert.deepEqual(st.photos, { id: "ai_task.google", name: "Google AI" });
    assert.equal(st.entities.length, 3);
    assert.deepEqual(Object.keys(st.entities[0]).sort(), ["available", "id", "images", "name"]);
  });

  it("status() with only a text AI: ready for messages, says why photos are off", async () => {
    const st = await newAI({ states: [AI_STATES[0]] }).ai.status();
    assert.deepEqual([st.ready, st.images, st.using.id, "photos" in st], [true, false, "ai_task.ollama", false]);
    assert.match(st.reason, /Nenhuma IA do Home Assistant lê fotos/);
  });

  it("status() explains a disconnected or failing Home Assistant, and a missing media folder", async () => {
    assert.match((await newAI({ ready: false }).ai.status()).reason, /Sem conexão/);
    assert.match((await newAI({ states: new Error("boom") }).ai.status()).reason, /Não deu para consultar o Home Assistant: boom/);
    const blocked = path.join(tmpDir(), "media-is-a-file");
    fs.writeFileSync(blocked, "x");
    const st = await newAI({ mediaDir: blocked }).ai.status();
    assert.equal(st.ready, true);
    assert.equal(st.images, false);
    assert.match(st.reason, /pasta media/);
    const none = await newAI({ states: [] }).ai.status();
    assert.equal(none.ready, false);
    assert.match(none.reason, /Nenhuma IA/);
  });
});

describe("AI.extract: what is asked", () => {
  it("does nothing for an empty message", async () => {
    const { ai, ha } = newAI();
    assert.deepEqual(await ai.extract({ text: "   " }), { items: [], provider: null });
    assert.deepEqual(await ai.extract({}), { items: [], provider: null });
    assert.equal(ha.calls.length, 0);
  });

  it("refuses when Home Assistant is not connected", async () => {
    await assert.rejects(newAI({ ready: false }).ai.extract({ text: "leite" }), { code: "no_ai" });
  });

  it("with one list: only the items field, and the list named in the prompt", async () => {
    const { ai, ha } = newAI({ answer: () => ({ items: ["leite"] }) });
    const out = await ai.extract({ text: "leite", listName: "Compras", lists: [LISTS[0]] });
    const d = serviceCall(ha).service_data;
    assert.equal(d.task_name, "ResolvIA: ler lista");
    assert.equal(d.entity_id, "ai_task.google");
    assert.deepEqual(Object.keys(d.structure), ["items"]);
    assert.equal(d.structure.items.required, true);
    assert.match(d.instructions, /A lista de destino se chama "Compras"\./);
    assert.match(d.instructions, /Você recebe uma mensagem/);
    assert.match(d.instructions, /Mensagem:\n"""\nleite\n"""/);
    assert.equal(d.attachments, undefined);
    assert.deepEqual(out, { items: ["Leite"], lists: [null], rooms: undefined, equips: undefined, provider: "Google AI", entity: "ai_task.google" });
  });

  it("with several lists, rooms and equipment: one field each, naming the options", async () => {
    const { ai, ha } = newAI({ answer: () => ({ items: ["Consertar a pia"], listas: ["Casa"], comodos: ["Cozinha"], equipamentos: [""] }) });
    const out = await ai.extract({ text: "consertar a pia", listName: "Casa", lists: LISTS, rooms: ROOMS, equips: EQUIPS });
    const { structure: s, instructions: p } = serviceCall(ha).service_data;
    assert.deepEqual(Object.keys(s), ["items", "listas", "comodos", "equipamentos"]);
    assert.match(s.listas.description, /um destes: Compras; Casa; João\. Na dúvida, "Casa"\./);
    assert.match(s.comodos.description, /um destes: Cozinha; Banheiro social; Quarto\. Use ""/);
    assert.match(s.equipamentos.description, /um destes: Ar-condicionado \(Quarto\); Armário \(Quarto\); Geladeira \(Cozinha\); Chuveiro\. Use ""/);
    for (const f of ["listas", "comodos", "equipamentos"]) assert.equal(s[f].required, false);
    assert.match(p, /Listas que existem: "Compras", "Casa", "João"\./);
    assert.match(p, /Quando nenhuma combinar, use "Casa"\./);
    assert.match(p, /Cômodos da casa: "Cozinha", "Banheiro social", "Quarto"\./);
    assert.match(p, /Equipamentos e móveis da casa: "Ar-condicionado \(Quarto\)"/);
    assert.deepEqual(out.lists, ["todo.casa"]);
    assert.deepEqual(out.rooms, ["cozinha"]);
    assert.deepEqual(out.equips, [null]);
  });

  it("without a default list, no 'Na dúvida' hint", async () => {
    const { ai, ha } = newAI();
    await ai.extract({ text: "x", lists: LISTS });
    const d = serviceCall(ha).service_data;
    assert.doesNotMatch(d.structure.listas.description, /Na dúvida/);
    assert.doesNotMatch(d.instructions, /Quando nenhuma combinar/);
  });

  it("cleans what the app sends: valid lists (max 20), rooms (max 60), equipment (max 300), text up to 20000", async () => {
    const { ai, ha } = newAI();
    const lists = [{ id: "light.x", name: "Luz" }, { id: "todo.ok", name: "N".repeat(100) }, { id: "todo.noname" }, null, ...Array.from({ length: 30 }, (_, i) => ({ id: `todo.l${i}`, name: `L${i}` }))];
    const rooms = [{ id: 5, name: "x" }, { id: "r0", name: "" }, ...Array.from({ length: 70 }, (_, i) => ({ id: `r${i + 1}`, name: `Cômodo ${i + 1}${"!".repeat(70)}` }))];
    const equips = Array.from({ length: 320 }, (_, i) => ({ id: `e${i}`, name: `Equip ${i}` }));
    await ai.extract({ text: "y".repeat(25000), lists, rooms, equips });
    const { structure: s, instructions: p } = serviceCall(ha).service_data;
    const names = (desc) => desc.split("um destes: ")[1].split(/\. (Na dúvida|Use)/)[0].replace(/\.$/, "").split("; ");
    const listNames = names(s.listas.description);
    assert.equal(listNames.length, 20);
    assert.equal(listNames[0], "N".repeat(80));
    assert.ok(!listNames.includes("Luz"));
    const roomNames = names(s.comodos.description);
    assert.equal(roomNames.length, 60);
    assert.ok(roomNames.every((n) => n.length <= 60));
    assert.equal(names(s.equipamentos.description).length, 300);
    assert.equal(p.split('"""')[1].trim().length, 20000);
  });

  it("only lists with more than one option get the listas field", async () => {
    const { ai, ha } = newAI();
    await ai.extract({ text: "x", lists: [LISTS[0]], rooms: [], equips: [] });
    assert.deepEqual(Object.keys(serviceCall(ha).service_data.structure), ["items"]);
  });
});

// the photos go in the background (fs.rm): wait until the folder is empty (up to 2 s, the tests run in parallel)
async function emptied(dir) {
  for (let i = 0; i < 100 && fs.readdirSync(dir).length; i++) await new Promise((r) => setTimeout(r, 20));
  return fs.readdirSync(dir);
}

describe("AI.extract: photos", () => {
  it("writes the photos where Home Assistant reads them, sends them as attachments and removes them after", async () => {
    let seen = [];
    const { ai, ha, mediaDir } = newAI({
      answer: (d) => {
        seen = d.attachments.map((a) => {
          const rel = a.media_content_id.replace("media-source://media_source/local/", "");
          return { rel, type: a.media_content_type, exists: fs.existsSync(path.join(mediaDir, rel)), bytes: fs.readFileSync(path.join(mediaDir, rel)) };
        });
        return { items: ["Leite"] };
      },
    });
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    const out = await ai.extract({
      images: [
        { mime: "image/png", data: png.toString("base64") },
        { mime: "image/webp", data: "AA==" },
        { data: "AQ==" },
      ],
    });
    assert.deepEqual(out.items, ["Leite"]);
    assert.equal(seen.length, 3);
    assert.match(seen[0].rel, /^resolvia\/ia-temp\/foto-[0-9a-f]{12}\.png$/);
    assert.match(seen[1].rel, /\.webp$/);
    assert.match(seen[2].rel, /\.jpg$/);
    assert.deepEqual(seen.map((s) => s.type), ["image/png", "image/webp", "image/jpeg"]);
    assert.ok(seen.every((s) => s.exists));
    assert.deepEqual(seen[0].bytes, png);
    assert.match(serviceCall(ha).service_data.instructions, /Você recebe fotos/);
    await flushPromises();
    assert.deepEqual(await emptied(path.join(mediaDir, "resolvia", "ia-temp")), [], "the photos are gone");
  });

  it("sends at most 6 photos and says 'uma foto' for one", async () => {
    const { ai, ha } = newAI();
    await ai.extract({ images: Array.from({ length: 9 }, () => ({ mime: "image/jpeg", data: "AA==" })) });
    assert.equal(serviceCall(ha).service_data.attachments.length, 6);
    const one = newAI();
    await one.ai.extract({ images: [{ mime: "image/jpeg", data: "AA==" }] });
    assert.match(serviceCall(one.ha).service_data.instructions, /Você recebe uma foto/);
  });

  it("refuses photos when the media folder is not writable, and when no AI reads photos", async () => {
    const blocked = path.join(tmpDir(), "file");
    fs.writeFileSync(blocked, "x");
    await assert.rejects(newAI({ mediaDir: blocked }).ai.extract({ images: [{ data: "AA==" }] }), { code: "no_media" });
    await assert.rejects(newAI({ states: [AI_STATES[0]] }).ai.extract({ images: [{ data: "AA==" }] }), { code: "no_vision" });
  });

  it("removes the photos even when the AI fails", async () => {
    const { ai, mediaDir } = newAI({
      answer: () => {
        throw new Error("model overloaded");
      },
    });
    await assert.rejects(ai.extract({ images: [{ data: "AA==" }] }), /model overloaded/);
    assert.deepEqual(await emptied(path.join(mediaDir, "resolvia", "ia-temp")), []);
  });
});

describe("AI: usage is counted", () => {
  const usage = () => {
    const rec = [];
    return { rec, record: (r) => rec.push(r) };
  };

  it("records a message read, with sizes and result", async () => {
    const u = usage();
    const { ai, ha } = newAI({ usage: u, answer: () => ({ items: ["Leite", "Pão"] }) });
    await ai.extract({ text: "leite e pão" });
    assert.equal(u.rec.length, 1);
    const r = u.rec[0];
    assert.equal(r.kind, "mensagem");
    assert.equal(r.entity, "ai_task.google");
    assert.equal(r.input, serviceCall(ha).service_data.instructions.length);
    assert.equal(r.output, JSON.stringify(["Leite", "Pão"]).length);
    assert.equal(r.images, 0);
    assert.equal(r.result, "ok");
    assert.ok(r.seconds >= 0);
  });

  it("records photos and failures by kind of failure", async () => {
    const u = usage();
    const { ai } = newAI({
      usage: u,
      answer: () => {
        throw Object.assign(new Error("Resource exhausted (429)"), { code: "home_assistant_error" });
      },
    });
    await assert.rejects(ai.extract({ images: [{ data: "AA==" }, { data: "AA==" }] }));
    assert.deepEqual([u.rec[0].kind, u.rec[0].images, u.rec[0].result, u.rec[0].output], ["fotos", 2, "cota", 0]);
  });
});

describe("AI.suggest", () => {
  const items = [
    { key: "todo.casa|u1", lista: "Casa", texto: "Varrer", dias: 3 },
    { key: "todo.casa|u2", lista: "Casa", texto: "Lavar", dias: 1 },
    { key: "todo.mercado|u3", lista: "Mercado", texto: "Leite", compras: true },
  ];

  it("asks the AI and maps its numbers back to the items", async () => {
    const { ai, ha } = newAI({ answer: () => ({ items: ["2 | é rápido", "1 | parado há dias", "9 | inventado"] }) });
    const out = await ai.suggest(items);
    assert.deepEqual(out, {
      picks: [
        { key: "todo.casa|u2", motivo: "É rápido" },
        { key: "todo.casa|u1", motivo: "Parado há dias" },
      ],
      provider: "Google AI",
    });
    const d = serviceCall(ha).service_data;
    assert.equal(d.task_name, "ResolvIA: sugerir");
    assert.deepEqual(Object.keys(d.structure), ["items"]);
    assert.match(d.instructions, /3 \| Mercado \(compras\) \| Leite \| idade desconhecida/);
  });

  it("Serviços externos off: the AI is not told who from outside does a task (Sugerir com IA and Conversa)", async () => {
    const ext = [{ key: "todo.casa|u1", lista: "Casa", texto: "Trocar resistência", dias: 3, externo: "Eletricista" }, ...items];
    let on = false;
    const fake = fakeHA({ answer: () => ({ items: ["1 | chame já"], resposta: "ok", acoes: [] }) });
    const ai = new AI({ ha: fake, log: fakeLog(), mediaDir: tmpDir("resolvia-media-"), selected: () => "", external: () => on });
    await ai.suggest(ext);
    const context = { tela: "Início", listas: [{ id: "todo.casa", nome: "Casa", itens: [{ texto: "Trocar resistência", externo: "Eletricista" }] }] };
    await ai.chat({ messages: [{ role: "user", text: "oi" }], context });
    let prompts = fake.calls.filter((c) => c.type === "call_service").map((c) => c.service_data.instructions);
    assert.equal(prompts.length, 2);
    for (const p of prompts) assert.doesNotMatch(p, /Eletricista|serviço externo/i);
    assert.match(prompts[0], /1 \| Casa \| Trocar resistência \| 3 dias na lista/);
    on = true;
    fake.calls.length = 0;
    await ai.suggest(ext);
    await ai.chat({ messages: [{ role: "user", text: "oi" }], context });
    prompts = fake.calls.filter((c) => c.type === "call_service").map((c) => c.service_data.instructions);
    for (const p of prompts) assert.match(p, /serviço externo: Eletricista/);
    assert.equal(newAI().ai.external(), true, "on unless said otherwise");
  });

  it("does nothing without items", async () => {
    const { ai, ha } = newAI();
    assert.deepEqual(await ai.suggest([]), { picks: [], provider: null });
    assert.deepEqual(await ai.suggest([{ key: "bad" }]), { picks: [], provider: null });
    assert.equal(ha.calls.length, 0);
  });

  it("fails clearly when the answer has no valid pick, and counts it as 'formato'", async () => {
    const rec = [];
    const { ai } = newAI({ usage: { record: (r) => rec.push(r) }, answer: () => ({ items: ["não sei"] }) });
    await assert.rejects(ai.suggest(items), { code: "formato" });
    assert.equal(rec[0].kind, "sugestao");
    assert.equal(rec[0].result, "formato");
  });

  it("refuses when Home Assistant is not connected", async () => {
    await assert.rejects(newAI({ ready: false }).ai.suggest(items), { code: "no_ai" });
  });
});
