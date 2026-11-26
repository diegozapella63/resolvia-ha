// 2.81.0: fotos numa tarefa. No Novo item e no Editar item, Tirar foto (a câmera do celular) e Escolher fotos (a
// galeria): até 6 por tarefa. A tela diminui cada foto (1600 px, JPEG) antes de mandar; o servidor guarda o arquivo em
// /data/fotos e, como os pontos e o cômodo, lembra de qual tarefa é pelo nome dela. Na lista, a tarefa mostra quantas
// fotos tem; um toque na foto abre ela grande. Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { taskKey } from "./rooms.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["circle"])}</svg>`;

export const MAX_PHOTOS = 6;
const FILE_RE = /^[a-f0-9]{16}\.jpg$/;
const clean = (v) => (Array.isArray(v) ? v.filter((f) => typeof f === "string" && (FILE_RE.test(f) || f.startsWith("blob:"))) : []).slice(0, MAX_PHOTOS);
const same = (a, b) => a.length === b.length && a.every((f, i) => f === b[i]);

/** A photo made small for sending: at most 1600 px on its longer side, JPEG. Resolves to a Blob. */
export async function shrinkPhoto(file, max = 1600, quality = 0.82) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, no) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = () => no(new Error("Não consegui abrir a foto."));
      i.src = url;
    });
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight, 1));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * k));
    c.height = Math.max(1, Math.round(img.naturalHeight * k));
    const x = c.getContext("2d");
    x.fillStyle = "#fff";
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((ok, no) => c.toBlob((b) => (b ? ok(b) : no(new Error("Não consegui preparar a foto."))), "image/jpeg", quality));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export const PhotosMixin = (Base) =>
  class extends Base {
    async _loadPhotos() {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._photos = (await this.hass.callWS({ type: "resolvia/photos/get" })).photos || {};
      } catch (e) {
        this._photos = this._photos || {};
      }
      this.requestUpdate();
    }

    /** The photos of a task (file names). */
    _photosOf(listId, summary) {
      const map = this._photos && this._photos[listId];
      return clean(map && map[taskKey(summary)]);
    }

    /** Where a photo is (a file of the server, or one only of this screen, in the preview). */
    _photoUrl(file) {
      if (String(file).startsWith("blob:")) return file;
      const api = this.hass && this.hass.resolvia;
      return api && api.photoUrl ? api.photoUrl(file) : "";
    }

    async _setTaskPhotos(listId, summary, files, previous = null) {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._photos = (await this.hass.callWS({ type: "resolvia/photos/set", entity_id: listId, summary, photos: clean(files), ...(previous != null ? { previous_summary: previous } : {}) })).photos || {};
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar as fotos");
      }
    }

    /** Saves them from the item sheet when they changed (or the task was renamed). */
    async _saveTaskPhotos(listId, summary, f, previous = null) {
      const now = clean(f.photos);
      const before = clean(f.photosOrig);
      if (!same(now, before) || (previous && before.length)) await this._setTaskPhotos(listId, summary, now, previous);
    }

    /** The files chosen (from the camera or the gallery) into the form: made small, sent, shown. */
    async _addPhotos(e) {
      const input = e.target;
      const files = [...(input.files || [])];
      input.value = "";
      return this._addPhotoFiles(files);
    }

    async _addPhotoFiles(list) {
      const files = [...(list || [])].filter((x) => /^image\//.test(x.type || "image/"));
      const f = this._form;
      if (!f || !files.length) return;
      const room = MAX_PHOTOS - clean(f.photos).length;
      if (room <= 0) return this._showToast(`No máximo ${MAX_PHOTOS} fotos por tarefa`);
      const api = this.hass && this.hass.resolvia;
      this._setForm({ photosBusy: (f.photosBusy || 0) + Math.min(room, files.length) });
      for (const file of files.slice(0, room)) {
        try {
          const blob = await shrinkPhoto(file);
          const name = api && api.uploadPhoto ? await api.uploadPhoto(blob) : URL.createObjectURL(blob);
          if (this._form) this._setForm({ photos: [...clean(this._form.photos), name].slice(0, MAX_PHOTOS) });
        } catch (err) {
          this._showToast(err.message || "Não consegui guardar a foto");
        }
        if (this._form) this._setForm({ photosBusy: Math.max(0, (this._form.photosBusy || 1) - 1) });
      }
      if (files.length > room) this._showToast(`No máximo ${MAX_PHOTOS} fotos por tarefa`);
    }

    /**
     * 2.94.0 (o dono: "Tirar foto não funciona (abre a galeria) e Escolher fotos abre, escolho a foto, mas nada acontece"):
     * o app do Home Assistant no Android ignora o capture e perde o que se escolhe com multiple. Tirar foto abre a câmera
     * do app (a do Digitalizar com IA); sem ela (http), o seletor do celular com a câmera.
     */
    _taskPhotoCamera() {
      if (this._camOk && this._camOk()) return this._openCamera({ fotos: true });
      return this._taskPhotoInput(true);
    }

    /** The chooser, made on the spot in the document (like the clip of the Conversa); one at a time in the Android app. */
    _taskPhotoInput(camera = false) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      if (camera) input.setAttribute("capture", "environment");
      else input.multiple = !(this._isHaAndroid && this._isHaAndroid());
      input.style.display = "none";
      input.addEventListener("change", () => {
        const list = [...(input.files || [])];
        input.remove();
        this._addPhotoFiles(list);
      });
      document.body.appendChild(input);
      input.click();
    }

    /** The photos of the camera (Pronto): they join the task, like the chosen ones. */
    async _addTaskShots(shots) {
      const files = [];
      for (const s of shots || []) {
        try {
          files.push(await (await fetch(s.url)).blob());
        } catch (e) {
          /* a shot that is gone */
        }
        if (s.url) URL.revokeObjectURL(s.url);
      }
      return this._addPhotoFiles(files);
    }

    /** On the task in a list: how many photos it has. */
    _renderPhotoTag(listId, item) {
      const n = this._photosOf(listId, item.summary).length;
      return n ? html`<span class="tag fotos" title="${n === 1 ? "1 foto" : `${n} fotos`}">${icon("camera")}${n}</span>` : nothing;
    }

    /** Item sheet: Fotos, with Tirar foto and Escolher fotos; a tap on a photo opens it. */
    _renderPhotosField(f, { inline = false } = {}) {
      if (f.mirrored) return nothing;
      const list = clean(f.photos);
      const full = list.length + (f.photosBusy || 0) >= MAX_PHOTOS;
      const grid =
        list.length || f.photosBusy
          ? html`<div class="photo-grid">
              ${list.map(
                (file, i) => html`<div class="photo">
                  <button class="photo-open" @click=${() => (this._photoView = file)} aria-label="Abrir a foto ${i + 1}"><img src=${this._photoUrl(file)} alt="Foto ${i + 1}" loading="lazy" /></button>
                  <button class="photo-x" @click=${() => this._setForm({ photos: list.filter((x) => x !== file) })} aria-label="Tirar a foto ${i + 1}">${icon("x")}</button>
                </div>`,
              )}
              ${Array.from({ length: f.photosBusy || 0 }, () => html`<div class="photo busy" aria-label="Enviando">${icon("loader-circle", "ai-spin")}</div>`)}
            </div>`
          : nothing;
      // 2.83.0: in Novo item, inside the block at the top (Fotos e mensagens), as a second row of tiles: only to keep the
      // photo with the task, without the AI reading it
      if (inline) {
        return html`<div class="imp-sub photos-sub">Anexar na tarefa${list.length ? html` <span class="count">(${list.length})</span>` : nothing}</div>
          <div class="imp-tiles photo-tiles">
            <button type="button" class="imp-tile" ?disabled=${full} @click=${() => this._taskPhotoCamera()}>${icon("camera")}<span>Tirar foto</span></button>
            <button type="button" class="imp-tile" ?disabled=${full} @click=${() => this._taskPhotoInput()}>${icon("images")}<span>Escolher fotos</span></button>
          </div>
          ${grid}`;
      }
      return html`<div class="field photos-field">
        <span class="flabel">${icon("camera", "lbl-ic")}Fotos${list.length ? html` <span class="count">(${list.length})</span>` : nothing}</span>
        <div class="chip-row grid photo-acts">
          <button class="pick" ?disabled=${full} @click=${() => this._taskPhotoCamera()}>${icon("camera")}<span>Tirar foto</span></button>
          <button class="pick" ?disabled=${full} @click=${() => this._taskPhotoInput()}>${icon("images")}<span>Escolher fotos</span></button>
        </div>
        ${grid}
      </div>`;
    }

    /** A photo opened big, over everything; a tap (or Fechar) closes it. */
    _renderPhotoView() {
      const file = this._photoView;
      if (!file) return nothing;
      const close = () => (this._photoView = null);
      return html`<div class="photo-view" role="dialog" aria-label="Foto" @click=${close}>
        <img src=${this._photoUrl(file)} alt="Foto da tarefa" />
        <button class="icon-btn photo-close" @click=${close} aria-label="Fechar">${icon("x")}</button>
      </div>`;
    }
  };
