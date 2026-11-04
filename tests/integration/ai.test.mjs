// Leitura por IA (message and photos), Sugestões com IA (kept across restarts), Uso da IA
// and its sensor, against the fake AI of dev/fake-ha.mjs.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Stack, waitFor, rawPost } from "./_harness.mjs";

const CASA = "todo.casa";
const SHOP = "todo.notas_e_rotinas_do_alexa_shopping_list";
const GOOGLE = "ai_task.google_ai_task";
const OLLAMA = "ai_task.ollama_ai_task";

const extract = async (stack, body, raw = false) => {
  const res = await fetch(`${stack.appUrl}/api/extract`, { method: "POST", body: raw ? body : JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};
/** Time for the fake's stdout to catch up before asserting that nothing more was logged. */
const settle = () => new Promise((r) => setTimeout(r, 150));
const SUGGEST_ITEMS = [
  { key: `${CASA}|u8`, lista: "Casa", texto: "Passar pano na casa", dias: 10, pontos: 5 },
  { key: `${SHOP}|u1`, lista: "Shopping list", texto: "Café", dias: 1, compras: true },
  { key: `${CASA}|u9`, lista: "Casa", texto: "Pagar conta de luz", dias: 2, comodo: "Sala" },
  { key: `${CASA}|u10`, lista: "Casa", texto: "Trocar filtro do ar", dias: 0, equipamento: "Ar-condicionado (Quarto)" },
  { key: "light.x|1", lista: "x", texto: "inválido" },
];

describe("with the fake AI", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack().start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  describe("status", () => {
    it("Home Assistant's preferred AI reads messages and photos", async () => {
      const s = await c.call("resolvia/ai/status");
      assert.deepEqual(s, {
        ready: true,
        images: true,
        selected: "",
        using: { id: GOOGLE, name: "Google AI Task" },
        entities: [
          { id: GOOGLE, name: "Google AI Task", images: true, available: true },
          { id: OLLAMA, name: "Ollama AI Task", images: false, available: true },
        ],
        reason: null,
      });
    });

    it("choosing a text-only AI: messages with it, no photos", async () => {
      await c.call("resolvia/prefs/set_app", { prefs: { ai_entity: OLLAMA } });
      const s = await c.call("resolvia/ai/status");
      assert.deepEqual([s.ready, s.images, s.selected, s.using.id], [true, false, OLLAMA, OLLAMA]);
      assert.match(s.reason, /Ollama AI Task não lê fotos/);
      const photo = await extract(stack, { images: [{ data: Buffer.from("x").toString("base64"), mime: "image/jpeg" }] });
      assert.equal(photo.status, 409);
      assert.equal(photo.body.code, "no_vision");
      const text = await extract(stack, { text: "pilhas" });
      assert.equal(text.status, 200);
      assert.equal(text.body.entity, OLLAMA);
      await c.call("resolvia/prefs/set_app", { prefs: { ai_entity: null } });
    });
  });

  describe("reading a message", () => {
    it("splits the items, cleans them, and picks a list for each one", async () => {
      const { status, body } = await extract(stack, { text: "leite, trocar a lâmpada e ovos", list_name: "Casa", lists: [{ id: CASA, name: "Casa" }, { id: SHOP, name: "Shopping list" }] });
      assert.equal(status, 200);
      assert.deepEqual(body.items, ["Leite", "Trocar a lâmpada", "Ovos"]);
      assert.deepEqual(body.lists, [SHOP, CASA, SHOP]);
      assert.equal(body.provider, "Google AI Task");
    });

    it("one list: no list choice asked", async () => {
      const { body } = await extract(stack, { text: "pilhas\npilhas\nfita", lists: [{ id: CASA, name: "Casa" }] });
      assert.deepEqual(body.items, ["Pilhas", "Fita"]);
      assert.deepEqual(body.lists, [null, null]);
    });

    it("an empty message asks nothing", async () => {
      const lines = stack.fake.count(/fake AI call/);
      assert.deepEqual((await extract(stack, { text: "   " })).body, { items: [], provider: null });
      await settle();
      assert.equal(stack.fake.count(/fake AI call/), lines);
    });

    it("refuses a body that is not JSON", async () => {
      assert.deepEqual(await extract(stack, "{nope", true), { status: 400, body: { error: "JSON inválido" } });
    });

    it("photos over 30 MB are refused with 413 'Arquivo grande demais', without asking the AI (every time)", async () => {
      const lines = stack.fake.count(/fake AI call/);
      const got = [];
      for (let i = 0; i < 3; i++) got.push(await rawPost(stack, "/api/extract", 31 * 1024 * 1024, { "content-type": "application/json" }));
      assert.deepEqual(got, Array(3).fill('HTTP 413 {"error":"Arquivo grande demais"}'));
      await settle();
      assert.equal(stack.fake.count(/fake AI call/), lines);
    });

    it("far too big (over 120 MB): the upload is cut, and the app keeps working", async () => {
      const got = await rawPost(stack, "/api/extract", 125 * 1024 * 1024, { "content-type": "application/json" });
      assert.match(got, /^ERROR |^HTTP 413/);
      assert.equal(await c.call("ping"), "pong");
    });
  });

  describe("reading photos", () => {
    it("the photos go to the media folder for the AI, and are gone after", async () => {
      const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4]).toString("base64");
      const { status, body } = await extract(stack, { images: [{ data: jpeg, mime: "image/jpeg" }, { data: jpeg, mime: "image/png" }] });
      assert.equal(status, 200);
      assert.deepEqual(body.items, ["Leite integral (2 caixas)", "Ovos (1 dúzia)", "Pão francês"]);
      // (the fake logs each AI call on its stdout, which may arrive after the answer)
      const call = await waitFor(() => stack.fake.lines.filter((l) => l.startsWith("fake AI call") && !l.includes('"files":[]')).at(-1), { what: "photo call line" });
      const files = JSON.parse(call.slice("fake AI call ".length)).files;
      assert.equal(files.length, 2);
      assert.ok(files.every((f) => f.path.startsWith(path.join(stack.dirs.media, "resolvia", "ia-temp")) && f.bytes === 8));
      assert.match(files[1].path, /\.png$/);
      await waitFor(() => fs.readdirSync(path.join(stack.dirs.media, "resolvia", "ia-temp")).length === 0, { what: "photos removed" });
    });
  });

  describe("suggestions", () => {
    let first;

    it("the AI picks what to do now; shopping is left out; the reasons come back by item", async () => {
      first = await c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS });
      assert.deepEqual(first.picks, [
        { key: `${CASA}|u8`, motivo: "Motivo de teste 1" },
        { key: `${CASA}|u9`, motivo: "Motivo de teste 2" },
        { key: `${CASA}|u10`, motivo: "Motivo de teste 3" },
      ]);
      assert.equal(first.provider, "Google AI Task");
      assert.ok(Math.abs(Date.now() - first.at) < 60_000);
    });

    it("two screens asking at the same time share one AI call ('Pensando…' while it runs)", async () => {
      const before = stack.fake.count(/fake AI call/);
      const other = await stack.client();
      // Home Assistant frozen: the first run cannot finish before the second request is in
      stack.fake.child.kill("SIGSTOP");
      let a;
      let b;
      try {
        a = c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS });
        b = other.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS });
        // each connection answers in order: busy here means its suggest request was taken
        assert.equal((await c.call("resolvia/suggest/get")).busy, true);
        assert.equal((await other.call("resolvia/suggest/get")).busy, true);
      } finally {
        stack.fake.child.kill("SIGCONT");
      }
      const [ra, rb] = await Promise.all([a, b]);
      assert.deepEqual(ra, rb);
      await waitFor(() => stack.fake.count(/fake AI call/) >= before + 1, { what: "the AI call line" });
      await settle();
      assert.equal(stack.fake.count(/fake AI call/), before + 1);
      assert.equal((await c.call("resolvia/suggest/get")).busy, false);
      first = ra;
    });

    it("suggest/get gives the last pick and since when each item is on its list", async () => {
      const g = await c.call("resolvia/suggest/get");
      assert.deepEqual(g.ai, first);
      assert.equal(g.busy, false);
      assert.deepEqual(Object.keys(g.ages[CASA]).sort(), ["u10", "u8", "u9"]);
      assert.deepEqual(Object.keys(g.ages[SHOP]).sort(), ["u1", "u2"], "completed items do not count");
      assert.ok(Object.values(g.ages[CASA]).every((t) => Math.abs(Date.now() - t) < 120_000));
    });

    it("the pick survives a restart of the app", async () => {
      await stack.restartApp();
      c = await stack.client();
      assert.deepEqual((await c.call("resolvia/suggest/get")).ai, first);
    });

    it("'Voltar ao automático' clears it, also on disk", async () => {
      assert.equal(await c.call("resolvia/ai/suggest/clear"), null);
      assert.equal((await c.call("resolvia/suggest/get")).ai, null);
      assert.equal(fs.existsSync(path.join(stack.dirs.data, "sugestao_ia.json")), false);
      await stack.restartApp();
      c = await stack.client();
      assert.equal((await c.call("resolvia/suggest/get")).ai, null);
    });

    it("no valid items: the AI is not asked", async () => {
      const before = stack.fake.count(/fake AI call/);
      const out = await c.call("resolvia/ai/suggest", { items: [{ key: "x", texto: "y" }] });
      assert.deepEqual([out.picks, out.provider], [[], null]);
      await settle();
      assert.equal(stack.fake.count(/fake AI call/), before);
      await c.call("resolvia/ai/suggest/clear");
    });
  });

  describe("usage of the AI and its sensor", () => {
    it("counts every call by kind and AI", async () => {
      const u = await c.call("resolvia/ai/usage");
      // 3 messages + 1 photo read + 2 suggestions (the two screens shared one); the refused photo never reached the AI
      // (the 7-day totals: a fresh data folder, and no flake when the test runs across midnight)
      assert.equal(u.semana.chamadas, 6);
      assert.deepEqual(u.semana.tipos, { mensagem: 3, fotos: 1, sugestao: 2 });
      assert.deepEqual(u.semana.ias, { [OLLAMA]: 1, [GOOGLE]: 5 });
      assert.equal(u.semana.imagens, 2);
      assert.ok(u.semana.tokens > 0);
      assert.equal(u.semana.erros, 0);
      assert.equal(u.sensor, "sensor.resolvia_ia_hoje");
      assert.equal(u.sensor_on, false);
      assert.equal(u.ultimas[0].ia, GOOGLE);
    });

    it("'Sensores no Home Assistant' on publishes sensor.resolvia_ia_hoje; off removes it", async () => {
      const sensor = () => fetch(`${stack.haUrl}/api/states/sensor.resolvia_ia_hoje`);
      assert.equal((await sensor()).status, 404, "off by default");
      await c.call("resolvia/prefs/set_app", { prefs: { sensors_on: true } });
      const st = await waitFor(async () => {
        const r = await sensor();
        return r.status === 200 ? r.json() : null;
      }, { what: "sensor published" });
      const calls = (await c.call("resolvia/ai/usage")).hoje.chamadas;
      assert.equal(st.state, String(calls));
      assert.equal(st.attributes.friendly_name, "ResolvIA: chamadas de IA hoje");
      assert.equal(st.attributes.unit_of_measurement, "chamadas");
      assert.equal((await c.call("resolvia/ai/usage")).sensor_on, true);
      await c.call("resolvia/prefs/set_app", { prefs: { sensors_on: false } });
      await waitFor(async () => (await sensor()).status === 404, { what: "sensor removed" });
    });
  });

  describe("Conversa (resolvia/ai/chat)", () => {
    const context = {
      tela: 'a lista "Casa"',
      listas: [{ id: "todo.casa", nome: "Casa", adicionar: true, prazos: true, pendentes: 2, itens: [{ texto: "Passar pano na casa" }, { texto: "Pagar conta de luz", prazo: "2026-11-01", atrasado: true }] }],
    };
    it("answers the last thing the person said, knowing the screen and the lists", async () => {
      const out = await c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "O que está atrasado?" }], context });
      assert.equal(out.reply, "Atrasados: Pagar conta de luz.");
      assert.deepEqual(out.actions, []);
      assert.ok(out.provider);
      const other = await c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "oi" }, { role: "ia", text: "Olá" }, { role: "user", text: "tudo bem?" }], context });
      assert.match(other.reply, /tudo bem\?.*tela: a lista "Casa"/);
    });
    it("actions come checked against the lists (unknown items to complete are left out)", async () => {
      const add = await c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "adiciona pilhas e lâmpada na lista Casa" }], context });
      assert.deepEqual(add.actions.map((x) => [x.tipo, x.lista, x.item]), [["adicionar", "todo.casa", "Pilhas"], ["adicionar", "todo.casa", "Lâmpada"]]);
      const done = await c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "conclui passar pano na casa em Casa" }], context });
      assert.deepEqual(done.actions, [{ tipo: "concluir", lista: "todo.casa", nome: "Casa", item: "Passar pano na casa" }]);
      const none = await c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "conclui lavar o carro em Casa" }], context });
      assert.deepEqual(none.actions, []);
    });
    it("needs something from the person; counted in Uso da IA as conversa", async () => {
      await assert.rejects(c.call("resolvia/ai/chat", { messages: [], context }), { code: "invalid_format" });
      const usage = await c.call("resolvia/ai/usage");
      assert.ok(JSON.stringify(usage).includes("conversa"));
    });
  });

  describe("'Usar IA' off", () => {
    it("refuses the chat", async () => {
      await c.call("resolvia/prefs/set_app", { prefs: { ai_off: true } });
      await assert.rejects(c.call("resolvia/ai/chat", { messages: [{ role: "user", text: "oi" }], context: {} }), { code: "ai_off" });
      await c.call("resolvia/prefs/set_app", { prefs: { ai_off: false } });
    });
    it("refuses reading and suggestions", async () => {
      await c.call("resolvia/prefs/set_app", { prefs: { ai_off: true } });
      assert.deepEqual(await extract(stack, { text: "leite" }), { status: 409, body: { error: "A IA está desligada em Mais › Configurações › Integrações", code: "ai_off" } });
      await assert.rejects(c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS }), { code: "ai_off" });
      await c.call("resolvia/prefs/set_app", { prefs: { ai_off: false } });
      assert.equal((await extract(stack, { text: "leite" })).status, 200);
    });
  });
});

describe("an AI that answers out of format", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack({ fakeEnv: { FAKE_AI_SUGGEST_BAD: "1" } }).start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("the suggestion fails with 'formato', counted as an error, and keeps no pick", async () => {
    await assert.rejects(c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS }), { code: "formato", message: /não devolveu sugestões no formato esperado/ });
    const u = await c.call("resolvia/ai/usage");
    assert.deepEqual([u.semana.chamadas, u.semana.erros, u.ultimas[0].resultado], [1, 1, "formato"]);
    assert.equal((await c.call("resolvia/suggest/get")).ai, null);
  });
});

describe("a data folder that refuses the AI's pick", () => {
  let stack;
  let c;
  before(async () => {
    stack = new Stack();
    // where the pick is kept there is a folder: it cannot be read nor written
    fs.mkdirSync(path.join(stack.dirs.data, "sugestao_ia.json"));
    await stack.start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("the pick still comes back and is kept while the app runs; the log says why it was not saved", async () => {
    const out = await c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS });
    assert.equal(out.picks.length, 3);
    await stack.app.waitLine(/WARNING Sugestão da IA: .*EISDIR/);
    assert.deepEqual((await c.call("resolvia/suggest/get")).ai.picks, out.picks);
  });
});

describe("a Home Assistant without AI", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack({ fakeEnv: { FAKE_HA_NO_AI: "1" } }).start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("status explains; reading answers 409 no_ai", async () => {
    const s = await c.call("resolvia/ai/status");
    assert.equal(s.ready, false);
    assert.match(s.reason, /Nenhuma IA configurada/);
    const r = await extract(stack, { text: "leite" });
    assert.equal(r.status, 409);
    assert.equal(r.body.code, "no_ai");
    await assert.rejects(c.call("resolvia/ai/suggest", { items: SUGGEST_ITEMS }), { code: "no_ai" });
  });
});
