// Cômodos: each task can say where in the house it is done, with the rooms of the
// InventarIA (the inventory app of the same family). Turned on in Mais ›
// Integrações; the server reads the rooms and keeps the room of each task (by its
// name, like the points), and shares both with the CronologIA.
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { plural, clip } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

/** How a task is known for its room: the name, folded (same as the server and the CronologIA). */
export const taskKey = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 255);

export const RoomsMixin = (Base) =>
  class extends Base {
    async _loadRooms(type = "resolvia/rooms/get") {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._rooms = await this.hass.callWS({ type });
      } catch (e) {
        this._rooms = this._rooms || null;
      }
      this.requestUpdate();
    }

    /** On, and the InventarIA gave the rooms: tasks show and take a room. */
    _roomsOn() {
      const r = this._rooms;
      return !!(r && r.on && r.comodos && r.comodos.length);
    }

    _roomList() {
      return (this._rooms && this._rooms.comodos) || [];
    }

    /** The room id of a task (or null). */
    _roomIdOf(listId, summary) {
      if (!this._roomsOn()) return null;
      const map = this._rooms.map && this._rooms.map[listId];
      const id = map && map[taskKey(summary)];
      return id && this._roomList().some((c) => c.id === id) ? id : null;
    }

    _roomName(id) {
      const c = this._roomList().find((x) => x.id === id);
      return c ? c.nome : null;
    }

    /** Sets the room of a task (null removes it); `previous` is the old name after a rename. */
    async _setTaskRoom(listId, summary, room, previous = null) {
      if (!this._roomsOn()) return;
      try {
        this._rooms = await this.hass.callWS({ type: "resolvia/rooms/set", entity_id: listId, summary, room: room || null, ...(previous != null ? { previous_summary: previous } : {}) });
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar o cômodo");
      }
    }

    _renderRoomTag(listId, item) {
      const id = this._roomIdOf(listId, item.summary);
      return id ? html`<span class="tag room">${icon("door-open")}${clip(this._roomName(id), 22)}</span>` : nothing;
    }

    /** Item sheet: Cômodo (when on). */
    _renderRoomField(f) {
      if (!this._roomsOn()) return nothing;
      const pick = (id) => this._setForm({ room: f.room === id ? null : id });
      return html`<div class="field">
        <span class="flabel">Cômodo</span>
        <div class="chip-row grid">
          <button class="pick ${!f.room ? "on" : ""}" @click=${() => this._setForm({ room: null })}>Nenhum</button>
          ${this._roomList().map((c) => html`<button class="pick room ${f.room === c.id ? "on" : ""}" @click=${() => pick(c.id)}>${icon("door-open")}<span>${clip(c.nome, 22)}</span></button>`)}
        </div>
      </div>`;
    }

    /** Mais › Integrações › Cômodos do InventarIA. */
    _renderRoomsPanel() {
      if (!this.hass.resolvia) return nothing;
      const r = this._rooms || {};
      const on = this._app("rooms_on", false) === true;
      const n = (r.comodos || []).length;
      const sw = html`<div class="row switch-row">
        <div class="grow"><div class="label">Usar cômodos</div><div class="hint" style="white-space:normal">${on ? "Cada tarefa pode ter um cômodo, e a IA sugere qual." : "Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${on} @change=${(e) => this._toggleRooms(e.target.checked)} aria-label="Usar cômodos" /><span class="track"></span></label>
      </div>`;
      let state = nothing;
      if (on) {
        const tone = this._roomsBusy ? "off" : n ? (r.erro ? "warn" : "ok") : "bad";
        const title = this._roomsBusy ? "Verificando…" : n ? plural(n, "cômodo", "cômodos") : r.encontrado ? "Sem cômodos" : "InventarIA não encontrado";
        const detail = this._roomsBusy
          ? ""
          : n
            ? r.comodos.map((c) => c.nome).join(", ")
            : r.erro || (r.encontrado ? "Cadastre os cômodos no InventarIA." : "Instale ou atualize o InventarIA (1.14.0 ou mais nova) neste Home Assistant.");
        state = html`<div class="ai-state ${tone}"><span class="dot"></span><div><b>${title}</b>${detail ? html`<span>${detail}</span>` : nothing}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${() => this._refreshRooms()}>${icon("rotate-ccw")}Verificar de novo</button></div>`;
      }
      return html`<div class="panel" id="comodos">
        ${this._secHead("house", "Cômodos do InventarIA", "Para ligar uma tarefa a um cômodo da casa.")}
        ${sw} ${state}
      </div>`;
    }

    async _toggleRooms(on) {
      await this._saveAppPrefs({ rooms_on: on ? true : null });
      if (on) await this._refreshRooms();
      else await this._loadRooms();
    }

    async _refreshRooms() {
      this._roomsBusy = true;
      this.requestUpdate();
      await this._loadRooms("resolvia/rooms/refresh");
      this._roomsBusy = false;
      this.requestUpdate();
    }
  };
