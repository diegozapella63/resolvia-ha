// The small exported helpers of the screens: ages (Sugestões), tokens (Uso da IA), the
// CronologIA marker (points.js), the app icon, the swipe between tabs and prepareImage.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// lit (vendor/lit-all.min.js) touches the DOM when it loads: just enough of it for Node
globalThis.HTMLElement ??= class {};
globalThis.customElements ??= { define() {}, get() {} };
globalThis.document ??= { createTreeWalker: () => ({}) };
globalThis.window ??= { litDisableBundleWarning: true };
const { ageText } = await import("../frontend/src/suggest.js");
const { kTokens } = await import("../frontend/src/usage-panel.js");
const { stripMark, markOf, POINT_PICKS } = await import("../frontend/src/points.js");
const { appIcon } = await import("../frontend/src/appicon.js");
const { swipeStart, swipeEnd, slideIn } = await import("../frontend/src/swipe.js");
const { prepareImage } = await import("../frontend/src/util.js");

describe("ageText: how long an item is on its list (Sugestões)", () => {
  it("days up to 13, then weeks, months and years", () => {
    assert.deepEqual([0, 1, 2, 13].map(ageText), ["0 dias", "1 dia", "2 dias", "13 dias"]);
    assert.deepEqual([14, 20, 21, 59].map(ageText), ["2 semanas", "2 semanas", "3 semanas", "8 semanas"]);
    assert.deepEqual([60, 89, 90, 364, 729].map(ageText), ["2 meses", "2 meses", "3 meses", "12 meses", "24 meses"]);
    assert.deepEqual([730, 1094, 1095].map(ageText), ["2 anos", "2 anos", "3 anos"]);
  });
});

describe("kTokens: estimated tokens (Uso da IA)", () => {
  it("below a thousand as it is, then 'mil' with one decimal and a comma", () => {
    assert.deepEqual([0, 7, 850, 999].map(kTokens), ["0", "7", "850", "999"]);
    assert.deepEqual([1000, 1234, 12_345, 250_000].map(kTokens), ["1 mil", "1,2 mil", "12,3 mil", "250 mil"]);
  });

  it("rounds a fraction, and nothing counts as 0", () => {
    assert.equal(kTokens(12.6), "13");
    assert.equal(kTokens(undefined), "0");
    assert.equal(kTokens(null), "0");
  });
});

describe("the CronologIA marker in the notes ([cr:…])", () => {
  const MARK = "[cr:0a1b2c3d]";

  it("stripMark hides it, at the end or in the middle", () => {
    assert.equal(stripMark(`Trocar o filtro ${MARK}`), "Trocar o filtro");
    assert.equal(stripMark(MARK), "");
    assert.equal(stripMark(`Antes ${MARK} depois`), "Antes depois");
    assert.equal(stripMark(`Linha 1\nLinha 2 ${MARK}  `), "Linha 1\nLinha 2");
  });

  it("only the CronologIA's own shape: 8 lowercase hex digits", () => {
    for (const s of ["[cr:0A1B2C3D]", "[cr:0a1b2c3]", "[cr:0a1b2c3dd]", "[cr:zzzzzzzz]", "cr:0a1b2c3d"]) {
      assert.equal(stripMark(`Nota ${s}`), `Nota ${s}`, s);
      assert.equal(markOf(`Nota ${s}`), "", s);
    }
  });

  it("markOf gives the marker (to keep it when the notes are edited)", () => {
    assert.equal(markOf(`Trocar o filtro ${MARK}`), MARK);
    assert.equal(markOf(`${MARK} e mais`), MARK);
  });

  it("no notes: empty text, no marker", () => {
    for (const v of [undefined, null, ""]) {
      assert.equal(stripMark(v), "");
      assert.equal(markOf(v), "");
    }
  });
});

describe("Pontos para quem concluir", () => {
  it("offers +5, +10, +20, +30 and +50 (and another value)", () => {
    assert.deepEqual(POINT_PICKS, [5, 10, 20, 30, 50]);
  });
});

describe("appIcon", () => {
  it("the add-on's icon in the color of Mais › Configurações › Aparência, with the rings in the text color", () => {
    const svg = appIcon().strings.join("");
    assert.match(svg, /^<svg class="app-ic" viewBox="0 0 32 32" aria-hidden="true">/);
    assert.match(svg, /fill="var\(--rv-accent\)"/);
    assert.match(svg, /stroke="currentColor"/);
    assert.equal(appIcon().values.length, 0, "nothing variable in it");
  });
});

describe("swipe between tabs", () => {
  let desk = false;
  let reduce = false;
  const savedWindow = globalThis.window;
  before(() => {
    globalThis.window = { innerWidth: 400, matchMedia: (q) => ({ matches: q.includes("min-width") ? desk : q.includes("reduced-motion") ? reduce : false }) };
    globalThis.Element = class {
      constructor({ sel = [], style = {}, scrollWidth = 100, clientWidth = 100 } = {}) {
        Object.assign(this, { sel, style, scrollWidth, clientWidth });
      }
      matches(stop) {
        return this.sel.some((s) => stop.split(", ").includes(s));
      }
    };
    globalThis.getComputedStyle = (el) => ({ overflowX: "visible", ...el.style });
  });
  after(() => {
    globalThis.window = savedWindow;
    delete globalThis.Element;
    delete globalThis.getComputedStyle;
  });
  const host = {};
  const touchAt = (x, y, path = [], fingers = 1) => ({ touches: Array(fingers).fill({ clientX: x, clientY: y }), currentTarget: host, composedPath: () => [...path, host, "document"] });
  const end = (x, y) => ({ changedTouches: [{ clientX: x, clientY: y }] });

  it("swipeStart: where the finger went down", () => {
    desk = false;
    const s = swipeStart(touchAt(200, 300, [new Element(), "text node"]));
    assert.deepEqual([s.x, s.y], [200, 300]);
    assert.ok(Math.abs(s.at - Date.now()) < 1000);
  });

  it("not with two fingers, not on the computer, not at the edges (Voltar of the phone, menu of Home Assistant)", () => {
    assert.equal(swipeStart(touchAt(200, 300, [], 2)), null);
    assert.equal(swipeStart({ currentTarget: host, composedPath: () => [] }), null);
    desk = true;
    assert.equal(swipeStart(touchAt(200, 300)), null);
    desk = false;
    assert.equal(swipeStart(touchAt(23, 300)), null);
    assert.equal(swipeStart(touchAt(377, 300)), null);
    assert.ok(swipeStart(touchAt(24, 300)));
    assert.ok(swipeStart(touchAt(376, 300)));
  });

  it("not on what already moves sideways: fields, the reorder grip, [data-noswipe], a row that scrolls", () => {
    for (const sel of ["input", "textarea", "select", "[contenteditable]", ".grip", "[data-noswipe]"]) {
      assert.equal(swipeStart(touchAt(200, 300, [new Element({ sel: [sel] })])), null, sel);
    }
    const scrolls = new Element({ style: { overflowX: "auto" }, scrollWidth: 600, clientWidth: 360 });
    assert.equal(swipeStart(touchAt(200, 300, [new Element(), scrolls])), null, "inside a row that scrolls");
    const fits = new Element({ style: { overflowX: "auto" }, scrollWidth: 361, clientWidth: 360 });
    assert.ok(swipeStart(touchAt(200, 300, [fits])), "a scrolling row that has nothing to scroll");
    assert.ok(swipeStart(touchAt(200, 300, [new Element({ style: { overflowX: "scroll" }, scrollWidth: 362, clientWidth: 360 })])), "within the 2 px of rounding");
  });

  it("an extra selector to leave out, and nothing above the panel counts", () => {
    assert.equal(swipeStart(touchAt(200, 300, [new Element({ sel: [".month"] })]), ".month"), null);
    assert.ok(swipeStart(touchAt(200, 300, [new Element({ sel: [".month"] })])));
    const outside = { touches: [{ clientX: 200, clientY: 300 }], currentTarget: host, composedPath: () => [host, new Element({ sel: ["input"] })] };
    assert.ok(swipeStart(outside), "elements after the panel itself are not looked at");
  });

  it("swipeEnd: to the left is the next tab, to the right the previous", () => {
    const s = { x: 200, y: 300, at: Date.now() };
    assert.equal(swipeEnd(end(120, 310), s), 1);
    assert.equal(swipeEnd(end(280, 290), s), -1);
  });

  it("swipeEnd: short, mostly vertical, slow or without a start is not a swipe", () => {
    const s = { x: 200, y: 300, at: Date.now() };
    assert.equal(swipeEnd(end(131, 300), s), 0, "less than 70 px");
    assert.equal(swipeEnd(end(130, 300), s), 1, "70 px is enough");
    assert.equal(swipeEnd(end(100, 351), s), 0, "the sideways move must be twice the vertical one");
    assert.equal(swipeEnd(end(100, 350), s), 1);
    assert.equal(swipeEnd(end(100, 300), { ...s, at: Date.now() - 801 }), 0, "slower than 0.8 s");
    assert.equal(swipeEnd(end(100, 300), null), 0);
    assert.equal(swipeEnd({ changedTouches: [] }, s), 0);
    assert.equal(swipeEnd({}, s), 0);
  });

  it("slideIn: the new page comes in from the side the finger went, once the view has changed", async () => {
    const anims = [];
    const page = { animate: (frames, opts) => anims.push({ frames, opts }) };
    let name = "home";
    const h = { _view: () => ({ name }), updateComplete: Promise.resolve(), renderRoot: { querySelector: (sel) => (sel.includes(".page") ? page : null) } };
    setTimeout(() => (name = "search"), 20);
    await slideIn(h, "search", 1);
    assert.equal(anims.length, 1);
    assert.equal(anims[0].frames[0].transform, "translateX(40px)");
    assert.deepEqual(anims[0].frames[1], { opacity: 1, transform: "none" });
    assert.equal(anims[0].opts.duration, 280);
    await slideIn(h, "search", -1);
    assert.equal(anims[1].frames[0].transform, "translateX(-40px)");
  });

  it("slideIn: no animation with reduced motion, or without a page", async () => {
    const anims = [];
    const page = { animate: () => anims.push(1) };
    const h = { _view: () => ({ name: "more" }), updateComplete: Promise.resolve(), renderRoot: { querySelector: () => page } };
    reduce = true;
    await slideIn(h, "more", 1);
    reduce = false;
    assert.equal(anims.length, 0);
    await slideIn({ ...h, renderRoot: { querySelector: () => null } }, "more", 1);
    await slideIn({ ...h, renderRoot: { querySelector: () => ({}) } }, "more", 1);
    assert.equal(anims.length, 0);
  });
});

describe("prepareImage: a photo made smaller before the upload", () => {
  const saved = {};
  let canvas;
  let bitmap;
  before(() => {
    for (const k of ["createImageBitmap", "document", "FileReader"]) saved[k] = globalThis[k];
    globalThis.document = {
      createElement: (tag) => {
        assert.equal(tag, "canvas");
        canvas = { width: 0, height: 0, drawn: null, blobArgs: null, getContext: () => ({ drawImage: (...a) => (canvas.drawn = a) }), toBlob: (cb, type, q) => ((canvas.blobArgs = [type, q]), cb(new Blob(["jpeg-bytes"], { type }))) };
        return canvas;
      },
    };
    // like the browser's FileReader: a data: URL with the bytes in base64
    globalThis.FileReader = class {
      readAsDataURL(blob) {
        blob.arrayBuffer().then((b) => {
          this.result = `data:${blob.type};base64,${Buffer.from(b).toString("base64")}`;
          this.onload();
        });
      }
    };
  });
  after(() => {
    for (const [k, v] of Object.entries(saved)) globalThis[k] = v;
  });
  const b64 = (s) => Buffer.from(s).toString("base64");
  const photo = (w, h) => {
    globalThis.createImageBitmap = async (file, opts) => {
      assert.deepEqual(opts, { imageOrientation: "from-image" }, "turned the way the camera held it");
      bitmap = { width: w, height: h, closed: false, close() { this.closed = true; } };
      return bitmap;
    };
    return new Blob(["original-bytes"], { type: "image/png" });
  };

  it("a big landscape photo: at most 1800 px on the long side, as JPEG", async () => {
    const out = await prepareImage(photo(3600, 1200));
    assert.deepEqual([canvas.width, canvas.height], [1800, 600]);
    assert.deepEqual(canvas.drawn, [bitmap, 0, 0, 1800, 600]);
    assert.deepEqual(canvas.blobArgs, ["image/jpeg", 0.86]);
    assert.equal(bitmap.closed, true, "the bitmap is released");
    assert.equal(out.mime, "image/jpeg");
    assert.equal(out.data, b64("jpeg-bytes"));
    assert.match(out.url, /^blob:/);
  });

  it("a portrait photo with another limit; a small one is not enlarged", async () => {
    await prepareImage(photo(1200, 3600), 900);
    assert.deepEqual([canvas.width, canvas.height], [300, 900]);
    await prepareImage(photo(800, 600));
    assert.deepEqual([canvas.width, canvas.height], [800, 600]);
  });

  it("a photo the browser cannot open (HEIC…): sent as it is", async () => {
    globalThis.createImageBitmap = async () => {
      throw new Error("The source image could not be decoded.");
    };
    const out = await prepareImage(new Blob(["heic-bytes"], { type: "image/heic" }));
    assert.deepEqual([out.mime, out.data], ["image/heic", b64("heic-bytes")]);
    assert.match(out.url, /^blob:/);
    const untyped = await prepareImage(new Blob(["raw"]));
    assert.equal(untyped.mime, "image/jpeg", "no type: JPEG");
  });
});
