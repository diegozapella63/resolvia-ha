// Serviço externo: a task done by someone from outside the house (an electrician, a technician, a
// store), with who it is when said. Kept by the server by the name of the task, like the points;
// shown as a tag on the task, asked in the item sheet (Quem faz), found by Buscar, known by the AI.
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { clip } from "./util.js";
import { taskKey } from "./rooms.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

/** What the server keeps: true, the name of who does it, or nothing. */
const clean = (v) => (v === true ? true : typeof v === "string" && v.trim() ? v.replace(/\s+/g, " ").trim().slice(0, 60) : null);

export const ExternalMixin = (Base) =>
  class extends Base {
    async _loadExternal() {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._ext = (await this.hass.callWS({ type: "resolvia/external/get" })).ext || {};
      } catch (e) {
        this._ext = this._ext || {};
      }
      this.requestUpdate();
    }

    /** Serviço externo of a task: true, "who", or null. */
    _externalOf(listId, summary) {
      const map = this._ext && this._ext[listId];
      return clean(map && map[taskKey(summary)]);
    }

    /** As words: "Serviço externo · Eletricista" (for Buscar and the AI). */
    _externalText(listId, summary) {
      const e = this._externalOf(listId, summary);
      return e ? (e === true ? "Serviço externo" : `Serviço externo ${e}`) : "";
    }

    /** Sets (true or "who") or clears (null) the Serviço externo of a task; `previous` is the old name after a rename. */
    async _setTaskExternal(listId, summary, value, previous = null) {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._ext = (await this.hass.callWS({ type: "resolvia/external/set", entity_id: listId, summary, value: clean(value), ...(previous != null ? { previous_summary: previous } : {}) })).ext || {};
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar quem faz");
      }
    }

    /** Saves it from the item sheet when it changed (or the task was renamed). */
    async _saveTaskExternal(listId, summary, f, previous = null) {
      const now = clean(f.ext);
      const before = clean(f.extOrig);
      if (now !== before || (previous && before)) await this._setTaskExternal(listId, summary, now, previous);
    }

    _renderExternalTag(listId, item) {
      const e = this._externalOf(listId, item.summary);
      return e ? html`<span class="tag ext">${icon("hard-hat")}${e === true ? "Serviço externo" : clip(e, 26)}</span>` : nothing;
    }

    /** Item sheet: Quem faz (the house, or a Serviço externo, with who when said). */
    _renderExternalField(f) {
      const e = clean(f.ext);
      return html`<div class="field">
        <span class="flabel">Quem faz</span>
        <div class="chip-row ext-row">
          <button class="pick ${!e ? "on" : ""}" @click=${() => this._setForm({ ext: null })}>${icon("house")}<span>Nós mesmos</span></button>
          <button class="pick ${e ? "on" : ""}" @click=${() => this._setForm({ ext: e || true })}>${icon("hard-hat")}<span>Serviço externo</span></button>
        </div>
        ${e
          ? html`<input type="text" class="ext-who" maxlength="60" .value=${e === true ? "" : e} placeholder="Quem? Eletricista, assistência técnica…" aria-label="Quem vai fazer"
              @input=${(ev) => this._setForm({ ext: clean(ev.target.value) || true })} />`
          : nothing}
      </div>`;
    }
  };
