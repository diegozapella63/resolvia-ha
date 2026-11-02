// Falar: the speech-to-text of Home Assistant (fake REST /api/stt), the engine
// choice and its language, and the whole path voice -> text -> items.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Stack, rawPost } from "./_harness.mjs";

const SPOKEN = "Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador";
const pcm = (seconds) => Buffer.alloc(Math.round(16000 * 2 * seconds), 7);
const post = async (stack, url, body) => {
  const res = await fetch(`${stack.appUrl}${url}`, { method: "POST", body, headers: { "content-type": "application/octet-stream" } });
  return { status: res.status, body: await res.json() };
};

describe("with the voice assistant of Home Assistant Cloud", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack().start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("automatic: the engine of the preferred assistant, in pt-BR", async () => {
    const s = await c.call("resolvia/voice/status");
    assert.deepEqual(s, {
      ready: true,
      engine: "stt.home_assistant_cloud",
      language: "pt-BR",
      name: "Home Assistant Cloud",
      chosen: false,
      selected: "",
      missing: false,
      options: [
        { id: "stt.home_assistant_cloud", name: "Home Assistant Cloud" },
        { id: "stt.faster_whisper", name: "faster-whisper" },
      ],
      auto: { engine: "stt.home_assistant_cloud", name: "Home Assistant Cloud" },
    });
  });

  it("speaks: the audio becomes text (the fake checks the X-Speech-Content header, as the Supervisor does)", async () => {
    const r = await post(stack, "/api/voice", pcm(1.5));
    assert.deepEqual(r, { status: 200, body: { text: SPOKEN, engine: "stt.home_assistant_cloud", name: "Home Assistant Cloud" } });
    const line = await stack.fake.waitLine(/^stt stt\.home_assistant_cloud/);
    assert.equal(line, `stt stt.home_assistant_cloud ${48000} format=wav; codec=pcm; sample_rate=16000; bit_rate=16; channel=1; language=pt-BR`);
  });

  it("the text then becomes items, like a pasted message", async () => {
    const res = await fetch(`${stack.appUrl}/api/extract`, { method: "POST", body: JSON.stringify({ text: SPOKEN }) });
    assert.deepEqual((await res.json()).items, ["Comprar pilhas", "Trocar a lâmpada da sala", "Ligar para o encanador"]);
  });

  it("another engine chosen in the app is asked in the Portuguese it names ('pt')", async () => {
    await c.call("resolvia/prefs/set_app", { prefs: { voice_engine: "stt.faster_whisper" } });
    const s = await c.call("resolvia/voice/status", { fresh: true });
    assert.deepEqual([s.engine, s.language, s.name, s.chosen, s.selected], ["stt.faster_whisper", "pt", "faster-whisper", true, "stt.faster_whisper"]);
    const r = await post(stack, "/api/voice", pcm(1));
    assert.equal(r.status, 200);
    assert.equal(r.body.engine, "stt.faster_whisper");
    assert.match(await stack.fake.waitLine(/^stt stt\.faster_whisper/), /language=pt$/);
  });

  it("a chosen engine that is gone: the automatic one is used and the screen says so", async () => {
    await c.call("resolvia/prefs/set_app", { prefs: { voice_engine: "stt.removido" } });
    const s = await c.call("resolvia/voice/status", { fresh: true });
    assert.deepEqual([s.ready, s.missing, s.engine, s.chosen], [true, true, "stt.home_assistant_cloud", false]);
    await c.call("resolvia/prefs/set_app", { prefs: { voice_engine: null } });
  });

  it("too short, or over 2 minutes of audio (within the upload limit), is 422", async () => {
    const short = await post(stack, "/api/voice", pcm(0.3));
    assert.equal(short.status, 422);
    assert.equal(short.body.code, "invalid_format");
    assert.match(short.body.error, /Não ouvi nada/);
    const almost = await post(stack, "/api/voice", Buffer.alloc(16000 * 2 * 125 + 1));
    assert.equal(almost.status, 422);
    assert.match(almost.body.error, /Fale até 2 minutos/);
  });

  it(
    "a body over the upload limit gets the 413 'Fale até 2 minutos' answer",
    async () => {
      const r = await rawPost(stack, "/api/voice", 16000 * 2 * 125 + 1024 + 1);
      assert.equal(r, 'HTTP 413 {"error":"Fale até 2 minutos de cada vez.","code":"too_big"}');
    },
  );
});

describe("a Home Assistant without speech-to-text", () => {
  let stack;
  let c;
  before(async () => {
    stack = await new Stack({ fakeEnv: { FAKE_NO_STT: "1" } }).start();
    c = await stack.client();
  });
  after(() => stack && stack.stop());

  it("status explains, and speaking answers 409 no_stt", async () => {
    const s = await c.call("resolvia/voice/status");
    assert.equal(s.ready, false);
    assert.match(s.reason, /assistente de voz com fala para texto/);
    assert.deepEqual(s.options, []);
    const r = await post(stack, "/api/voice", pcm(1));
    assert.equal(r.status, 409);
    assert.equal(r.body.code, "no_stt");
  });
});
