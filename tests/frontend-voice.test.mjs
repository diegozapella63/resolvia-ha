import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { Recorder, micError, VOICE_RATE, VOICE_MAX_S } from "../frontend/src/voice.js";

const savedNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
const hadWindow = "window" in globalThis;
afterEach(() => {
  if (savedNavigator) Object.defineProperty(globalThis, "navigator", savedNavigator);
  if (!hadWindow) delete globalThis.window;
});

/** A recorder that already "heard" these samples at this rate. */
function heard(rate, ...chunks) {
  const r = new Recorder(null);
  r.rate = rate;
  for (const c of chunks) {
    r.chunks.push(Float32Array.from(c));
    r.length += c.length;
  }
  return r;
}

describe("Recorder.stop: 16-bit PCM at 16 kHz", () => {
  it("converts samples, clipping to the 16-bit range", () => {
    const out = heard(16000, [0, 0.5, -0.5, 1, -1, 2, -2]).stop();
    assert.ok(out instanceof Int16Array);
    assert.deepEqual([...out], [0, 16383, -16384, 32767, -32768, 32767, -32768]);
  });

  it("joins the chunks in order and empties them", () => {
    const r = heard(16000, [0.25, 0.25], [-0.25], [1]);
    assert.deepEqual([...r.stop()], [8191, 8191, -8192, 32767]);
    assert.deepEqual(r.chunks, []);
  });

  it("averages windows when the browser recorded at 48 kHz", () => {
    const out = heard(48000, [0.3, 0.6, 0.9, -1, -1, -1, 0, 0, 0.3, 0.9]).stop();
    assert.equal(out.length, 3, "10 samples / 3, rounded down");
    assert.deepEqual([...out], [Math.trunc(0.6 * 0x7fff), -32768, Math.trunc(0.1 * 0x7fff)]);
  });

  it("one second at 44.1 kHz becomes one second at 16 kHz", () => {
    const sine = Array.from({ length: 44100 }, (_, i) => Math.sin(i / 10));
    const r = heard(44100, sine);
    assert.equal(r.seconds(), 1);
    const out = r.stop();
    assert.equal(out.length, VOICE_RATE);
    assert.ok(out.every((v) => v >= -32768 && v <= 32767));
  });

  it("nothing heard: an empty result; cancel() forgets everything", () => {
    assert.equal(new Recorder().stop().length, 0);
    const r = heard(16000, [1, 1, 1]);
    r.cancel();
    assert.equal(r.length, 0);
    assert.equal(r.seconds(), 0);
    assert.equal(r.stop().length, 0);
  });

  it("the limits match the server's (2 minutes at 16 kHz)", () => {
    assert.equal(VOICE_RATE, 16000);
    assert.equal(VOICE_MAX_S, 120);
  });
});

describe("Recorder.start", () => {
  it("without a microphone API: NoApi", async () => {
    Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true });
    await assert.rejects(new Recorder().start(), { name: "NoApi" });
  });

  it("records from the microphone, with the level, and releases everything on stop", async () => {
    const stopped = [];
    const stream = { getTracks: () => [{ stop: () => stopped.push("track") }] };
    Object.defineProperty(globalThis, "navigator", { value: { mediaDevices: { getUserMedia: async (c) => ((globalThis.__constraints = c), stream) } }, configurable: true });
    let node;
    class AC {
      constructor(opts) {
        if (opts && opts.sampleRate) throw new Error("rate not supported");
        this.sampleRate = 48000;
        this.state = "suspended";
        this.destination = {};
      }
      async resume() {
        this.state = "running";
      }
      async close() {
        this.state = "closed";
        stopped.push("ctx");
      }
      createMediaStreamSource() {
        return { connect: () => {}, disconnect: () => stopped.push("src") };
      }
      createScriptProcessor() {
        node = { connect: () => {}, disconnect: () => stopped.push("node") };
        return node;
      }
    }
    globalThis.window = { AudioContext: AC };
    const levels = [];
    const r = new Recorder((l) => levels.push(l));
    await r.start();
    assert.deepEqual(globalThis.__constraints, { audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    assert.equal(r.rate, 48000, "a browser that only records at its own rate");
    assert.equal(r.ctx.state, "running");
    const block = new Float32Array(4800).fill(0.1);
    node.onaudioprocess({ inputBuffer: { getChannelData: () => block } });
    node.onaudioprocess({ inputBuffer: { getChannelData: () => new Float32Array(4800) } });
    assert.equal(r.seconds(), 0.2);
    assert.equal(levels.length, 2);
    assert.ok(Math.abs(levels[0] - 0.5) < 1e-6, `level ${levels[0]}`);
    assert.equal(levels[1], 0);
    const pcm = r.stop();
    assert.equal(pcm.length, 3200);
    assert.deepEqual(stopped.sort(), ["ctx", "node", "src", "track"]);
    assert.equal(node.onaudioprocess, null);
  });

  it("cancel() still frees the microphone when the audio graph is already gone (disconnect throws)", async () => {
    const stopped = [];
    const stream = { getTracks: () => [{ stop: () => stopped.push("track") }] };
    Object.defineProperty(globalThis, "navigator", { value: { mediaDevices: { getUserMedia: async () => stream } }, configurable: true });
    class AC {
      constructor() {
        this.sampleRate = 16000;
        this.state = "running";
        this.destination = {};
      }
      async resume() {}
      async close() {
        this.state = "closed";
        stopped.push("ctx");
      }
      createMediaStreamSource() {
        return { connect: () => {}, disconnect: () => { throw new Error("InvalidAccessError"); } };
      }
      createScriptProcessor() {
        return { connect: () => {}, disconnect: () => {} };
      }
    }
    globalThis.window = { AudioContext: AC };
    const r = new Recorder();
    await r.start();
    r.cancel();
    assert.deepEqual(stopped.sort(), ["ctx", "track"], "the track and the audio context are still released");
    assert.deepEqual([r.stream, r.node, r.src, r.seconds()], [null, null, null, 0]);
    r.cancel();
    assert.deepEqual(stopped.sort(), ["ctx", "track"], "a second cancel does nothing more");
  });
});

describe("micError: why the microphone did not open", () => {
  it("one message for each browser error", () => {
    assert.match(micError({ name: "NotAllowedError" }), /bloqueado/);
    assert.match(micError({ name: "SecurityError" }), /bloqueado/);
    assert.match(micError({ name: "NotFoundError" }), /Não achei um microfone/);
    assert.match(micError({ name: "OverconstrainedError" }), /Não achei um microfone/);
    assert.match(micError({ name: "NotReadableError" }), /outro app/);
    assert.equal(micError({ name: "AbortError", message: "x" }), "Não consegui abrir o microfone (x).");
    assert.equal(micError(null), "Não consegui abrir o microfone (erro).");
  });

  it("no API: explains https when the page is not secure", () => {
    globalThis.window = { isSecureContext: false };
    assert.match(micError({ name: "NoApi" }), /endereço seguro \(https\)/);
    globalThis.window = { isSecureContext: true };
    assert.equal(micError({ name: "NoApi" }), "Este navegador não deixa usar o microfone aqui.");
  });
});
