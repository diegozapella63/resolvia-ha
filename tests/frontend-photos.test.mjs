// frontend/src/photos.js (2.81.0): the photos of a task: read, shown, added, taken out, saved.
import "./_lit.mjs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { text, click, labels, fakeHass, hostOf, controls } from "./_lit.mjs";
import { PhotosMixin, MAX_PHOTOS } from "../frontend/src/photos.js";

const A = "0123456789abcdef.jpg";
const B = "fedcba9876543210.jpg";
const Panel = hostOf(PhotosMixin);
const panel = (photos = { "todo.casa": { "trocar o chuveiro": [A, B] } }, answers = {}) => {
  const p = new Panel(fakeHass(answers));
  p._photos = photos;
  p.hass.resolvia = { photoUrl: (f) => `api/photo/${f}` };
  p._form = {};
  return p;
};

describe("photos: reading them", () => {
  it("by the folded name of the task; only files of the app", () => {
    const p = panel({ "todo.casa": { "trocar o chuveiro": [A, "../x", B, 3] } });
    assert.deepEqual(p._photosOf("todo.casa", "Trocar o  Chuveiro"), [A, B]);
    assert.deepEqual(p._photosOf("todo.casa", "Lavar"), []);
    assert.deepEqual(panel(null)._photosOf("todo.casa", "x"), []);
    assert.equal(p._photoUrl(A), `api/photo/${A}`);
    assert.equal(p._photoUrl("blob:abc"), "blob:abc", "the preview: a photo only of this screen");
  });
  it("the tag on the task: how many", () => {
    const p = panel();
    assert.equal(text(p._renderPhotoTag("todo.casa", { summary: "Trocar o chuveiro" })), "2");
    assert.equal(text(p._renderPhotoTag("todo.casa", { summary: "Lavar" })), "");
  });
  it("loads from the server; outside the app, nothing", async () => {
    const p = panel({}, { "resolvia/photos/get": { photos: { "todo.casa": { lavar: [A] } } } });
    await p._loadPhotos();
    assert.deepEqual(p._photosOf("todo.casa", "Lavar"), [A]);
    const q = panel({ "todo.casa": { lavar: [B] } }, { "resolvia/photos/get": new Error("fora") });
    await q._loadPhotos();
    assert.deepEqual(q._photosOf("todo.casa", "Lavar"), [B], "an error keeps what was there");
    const r = panel();
    r.hass.resolvia = null;
    await r._loadPhotos();
    assert.equal(r.hass.calls.length, 0);
  });
});

describe("photos: the field of the item sheet", () => {
  it("Tirar foto and Escolher fotos, the photos with Abrir and Tirar, and the count in the title", () => {
    const p = panel();
    p._form = { photos: [A, B] };
    const f = p._renderPhotosField(p._form);
    assert.match(text(f), /^Fotos \(2\) Tirar foto Escolher fotos/);
    assert.deepEqual(labels(f).slice(0, 2), ["Tirar foto", "Escolher fotos"]);
    const arias = controls(f).map((c) => c.aria).filter(Boolean);
    assert.deepEqual(arias, ["Abrir a foto 1", "Tirar a foto 1", "Abrir a foto 2", "Tirar a foto 2"]);
    click(f, "Tirar a foto 1");
    assert.deepEqual(p._form.photos, [B]);
    click(p._renderPhotosField({ photos: [A] }), "Abrir a foto 1");
    assert.equal(p._photoView, A);
    assert.match(text(p._renderPhotoView()), /^$/);
    click(p._renderPhotoView(), "Fechar");
    assert.equal(p._photoView, null);
    assert.equal(text(p._renderPhotoView()), "");
    assert.equal(text(p._renderPhotosField({ mirrored: true })), "", "not on a task of the CronologIA");
    assert.match(text(p._renderPhotosField({})), /^Fotos Tirar foto Escolher fotos$/);
    const full = controls(p._renderPhotosField({ photos: Array.from({ length: MAX_PHOTOS }, (_, i) => `${String(i).repeat(16)}.jpg`) })).filter((c) => /disabled/.test(c.attrs));
    assert.equal(full.length, 2, "with six, no more");
  });
  it("saves when they changed or the task was renamed", async () => {
    const p = panel({}, { "resolvia/photos/set": (m) => ({ photos: { [m.entity_id]: { x: m.photos } } }) });
    await p._saveTaskPhotos("todo.casa", "x", { photos: [A], photosOrig: [A] });
    assert.equal(p.hass.calls.length, 0, "the same: nothing sent");
    await p._saveTaskPhotos("todo.casa", "x", { photos: [A, B], photosOrig: [A] });
    assert.deepEqual(p.hass.calls.pop(), { type: "resolvia/photos/set", entity_id: "todo.casa", summary: "x", photos: [A, B] });
    assert.deepEqual(p._photosOf("todo.casa", "x"), [A, B]);
    await p._saveTaskPhotos("todo.casa", "novo", { photos: [A], photosOrig: [A] }, "x");
    assert.deepEqual(p.hass.calls.pop(), { type: "resolvia/photos/set", entity_id: "todo.casa", summary: "novo", photos: [A], previous_summary: "x" });
    const q = panel({}, { "resolvia/photos/set": new Error("sem espaço") });
    await q._setTaskPhotos("todo.casa", "x", [A]);
    assert.deepEqual(q.toasts, ["sem espaço"]);
  });
  it("adding: no file, the limit, and a photo that doesn't open", async () => {
    const p = panel();
    p._form = { photos: [] };
    await p._addPhotos({ target: { files: [], value: "x" } });
    assert.deepEqual(p._form.photos, []);
    p._form = { photos: Array.from({ length: MAX_PHOTOS }, (_, i) => `${String(i).repeat(16)}.jpg`) };
    await p._addPhotos({ target: { files: [{ type: "image/jpeg" }], value: "" } });
    assert.deepEqual(p.toasts, [`No máximo ${MAX_PHOTOS} fotos por tarefa`]);
    // outside a browser there is no URL.createObjectURL of a file: the error is said, and the form is left as it was
    p._form = { photos: [] };
    p.toasts.length = 0;
    await p._addPhotos({ target: { files: [{ type: "image/jpeg" }], value: "" } });
    assert.equal(p.toasts.length, 1);
    assert.deepEqual([p._form.photos, p._form.photosBusy], [[], 0]);
  });
});

describe("photos: sending (the browser parts imitated)", () => {
  it("each photo is made small (1600 px, JPEG), sent, and joins the form; the preview keeps it on the screen", async () => {
    const { shrinkPhoto } = await import("../frontend/src/photos.js");
    const drawn = [];
    const old = { Image: globalThis.Image, document: globalThis.document, create: URL.createObjectURL, revoke: URL.revokeObjectURL };
    let fail = false;
    globalThis.Image = class {
      set src(v) {
        this.naturalWidth = 3200;
        this.naturalHeight = 1600;
        queueMicrotask(() => (fail === true ? this.onerror() : this.onload()));
      }
    };
    globalThis.document = {
      createElement: () => ({
        getContext: () => ({ fillRect() {}, drawImage: (...a) => drawn.push(a.slice(1)) }),
        toBlob(cb, type, q) {
          cb(fail === "blob" ? null : { type, q, w: this.width, h: this.height });
        },
      }),
    };
    URL.createObjectURL = (b) => `blob:${b.w || "file"}`;
    URL.revokeObjectURL = () => {};
    try {
      const blob = await shrinkPhoto({ type: "image/png" });
      assert.deepEqual([blob.type, blob.q, blob.w, blob.h], ["image/jpeg", 0.82, 1600, 800], "half the size: 1600 on the longer side");
      assert.deepEqual(drawn[0], [0, 0, 1600, 800]);
      const sent = [];
      const p = panel();
      p.hass.resolvia.uploadPhoto = async (b) => (sent.push(b), A);
      p._form = { photos: [] };
      await p._addPhotos({ target: { files: [{ type: "image/jpeg" }, { type: "application/pdf" }], value: "x" } });
      assert.equal(sent.length, 1, "only the picture");
      assert.deepEqual([p._form.photos, p._form.photosBusy], [[A], 0]);
      // more than fit: the first ones, and it says so
      p._form = { photos: Array.from({ length: MAX_PHOTOS - 1 }, (_, i) => `${String(i).repeat(16)}.jpg`) };
      p.hass.resolvia.uploadPhoto = async () => B;
      await p._addPhotos({ target: { files: [{ type: "image/jpeg" }, { type: "image/jpeg" }], value: "" } });
      assert.equal(p._form.photos.length, MAX_PHOTOS);
      assert.deepEqual(p.toasts, [`No máximo ${MAX_PHOTOS} fotos por tarefa`]);
      // the preview (no server): the photo stays on the screen
      const q = panel();
      q.hass.resolvia = {};
      q._form = { photos: [] };
      await q._addPhotos({ target: { files: [{ type: "image/jpeg" }], value: "" } });
      assert.deepEqual(q._form.photos, ["blob:1600"]);
      assert.equal(q._photoUrl("x"), "");
      // a photo that doesn't open, and one the browser can't turn into JPEG
      fail = true;
      await assert.rejects(shrinkPhoto({}), /Não consegui abrir a foto/);
      fail = "blob";
      await assert.rejects(shrinkPhoto({}), /Não consegui preparar a foto/);
      // the button opens the chooser
      let clicked = 0;
      p.renderRoot = { querySelector: (s) => (s === "#rv-task-cam" ? { click: () => clicked++ } : null) };
      p._pickPhoto("rv-task-cam");
      p._pickPhoto("rv-outro");
      assert.equal(clicked, 1);
    } finally {
      globalThis.Image = old.Image;
      globalThis.document = old.document;
      URL.createObjectURL = old.create;
      URL.revokeObjectURL = old.revoke;
    }
  });
});
