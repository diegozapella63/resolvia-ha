// Cômodos e equipamentos: each task can say where in the house it is done and
// which item it is about, with the rooms and items of the InventarIA (the
// inventory app of the same family). Turned on in Mais › Integrações › InventarIA;
// the server reads them and keeps the room and the item of each task (by its name,
// like the points), and shares them with the CronologIA.
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { plural, clip } from "./util.js";
import { renderEquipPicker } from "./equip-picker.js";

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

    /** Usar equipamentos on, and the InventarIA gave the items. */
    _equipsOn() {
      const r = this._rooms;
      return !!(r && r.equips_on && r.itens && r.itens.length);
    }

    _equipList() {
      return (this._rooms && this._rooms.itens) || [];
    }

    _equipOf(id) {
      return id ? this._equipList().find((x) => x.id === id) || null : null;
    }

    /** The item id of a task (or null). */
    _equipIdOf(listId, summary) {
      if (!this._equipsOn()) return null;
      const map = this._rooms.emap && this._rooms.emap[listId];
      const id = map && map[taskKey(summary)];
      return this._equipOf(id) ? id : null;
    }

    async _setTaskEquip(listId, summary, equip, previous = null) {
      if (!this._equipsOn()) return;
      try {
        this._rooms = await this.hass.callWS({ type: "resolvia/equips/set", entity_id: listId, summary, equip: equip || null, ...(previous != null ? { previous_summary: previous } : {}) });
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar o equipamento");
      }
    }

    _renderEquipTag(listId, item) {
      const e = this._equipOf(this._equipIdOf(listId, item.summary));
      return e ? html`<span class="tag room">${icon("package")}${clip(e.nome, 26)}</span>` : nothing;
    }

    /** The items for the picker: with the name of their room. */
    _equipItems() {
      return this._equipList().map((i) => ({ id: i.id, nome: i.nome, zona: i.zona, roomId: i.comodo, roomName: this._roomName(i.comodo) || "" }));
    }

    /** Item sheet: Equipamento (when on), searched among the items of the room chosen above. Picking one sets its room. */
    _renderEquipField(f) {
      if (!this._equipsOn()) return nothing;
      const room = this._roomsOn() ? f.room : null;
      return html`<div class="field">
        <span class="flabel">Equipamento</span>
        ${renderEquipPicker({
          lit: { html, nothing },
          icon,
          items: this._equipItems(),
          room,
          roomName: room ? this._roomName(room) || "" : "",
          value: f.equip,
          query: f.equipQ || "",
          more: !!f.equipMore,
          onQuery: (q) => this._setForm({ equipQ: q, equipMore: false }),
          onMore: () => this._setForm({ equipMore: true }),
          onPick: (id) => {
            const e = this._equipOf(id);
            const changes = { equip: id || null, equipQ: "", equipMore: false };
            if (e && e.comodo && this._roomsOn() && this._roomList().some((c) => c.id === e.comodo)) changes.room = e.comodo;
            this._setForm(changes);
          },
        })}
      </div>`;
    }

    /** Where a task is, as text for Buscar: its room, its item (and the item's zone); each can be left out. */
    _placeText(listId, summary, { rooms = true, equips = true } = {}) {
      const room = rooms ? this._roomIdOf(listId, summary) : null;
      const e = equips ? this._equipOf(this._equipIdOf(listId, summary)) : null;
      return [room ? this._roomName(room) : "", e ? e.nome : "", e && e.zona ? e.zona : ""].filter(Boolean).join(" ");
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
      // another room: an equipment of the old one doesn't fit any more
      const pick = (id) => {
        const room = f.room === id ? null : id;
        const e = this._equipOf(f.equip);
        this._setForm({ room, ...(e && room && e.comodo !== room ? { equip: null } : {}) });
      };
      return html`<div class="field">
        <span class="flabel">Cômodo</span>
        <div class="chip-row grid">
          <button class="pick ${!f.room ? "on" : ""}" @click=${() => this._setForm({ room: null })}>Nenhum</button>
          ${this._roomList().map((c) => html`<button class="pick room ${f.room === c.id ? "on" : ""}" @click=${() => pick(c.id)}>${icon("door-open")}<span>${clip(c.nome, 22)}</span></button>`)}
        </div>
      </div>`;
    }

    /** Mais › Integrações › InventarIA: cômodos and equipamentos. */
    _renderRoomsPanel() {
      if (!this.hass.resolvia) return nothing;
      const r = this._rooms || {};
      const on = this._app("rooms_on", false) === true;
      const eon = this._app("equips_on", false) === true;
      const nr = (r.comodos || []).length;
      const ne = (r.itens || []).length;
      const sw = (label, value, hint, change) => html`<div class="row switch-row">
        <div class="grow"><div class="label">${label}</div><div class="hint" style="white-space:normal">${value ? hint : "Desligado."}</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${value} @change=${(e) => change(e.target.checked)} aria-label=${label} /><span class="track"></span></label>
      </div>`;
      let state = nothing;
      if (on || eon) {
        const got = [on && nr ? plural(nr, "cômodo", "cômodos") : "", eon && ne ? plural(ne, "equipamento", "equipamentos") : ""].filter(Boolean).join(" · ");
        const tone = this._roomsBusy ? "off" : got ? (r.erro ? "warn" : "ok") : "bad";
        const title = this._roomsBusy ? "Verificando…" : got || (r.encontrado ? "Nada cadastrado" : "InventarIA não encontrado");
        const detail = this._roomsBusy
          ? ""
          : r.erro || (got ? (on && nr ? r.comodos.map((c) => c.nome).join(", ") : "") : r.encontrado ? "Cadastre os cômodos e os itens no InventarIA." : "Instale ou atualize o InventarIA (1.15.0 ou mais nova) neste Home Assistant.");
        state = html`<div class="ai-state ${tone}"><span class="dot"></span><div><b>${title}</b>${detail ? html`<span>${detail}</span>` : nothing}</div></div>
          <div class="ai-actions"><button class="btn outline" ?disabled=${this._roomsBusy} @click=${() => this._refreshRooms()}>${icon("rotate-ccw")}Verificar de novo</button></div>`;
      }
      return html`<div class="panel" id="comodos">
        ${this._secHead("house", "InventarIA", "Para ligar uma tarefa a um cômodo ou a um equipamento da casa.")}
        ${sw("Usar cômodos", on, "Cada tarefa pode ter um cômodo, e a IA sugere qual.", (v) => this._toggleRooms(v))}
        ${sw("Usar equipamentos", eon, "Cada tarefa pode ser de um equipamento ou móvel, e a IA sugere qual.", (v) => this._toggleEquips(v))}
        ${state}
      </div>`;
    }

    async _toggleEquips(on) {
      await this._saveAppPrefs({ equips_on: on ? true : null });
      await this._refreshRooms();
    }

    async _toggleRooms(on) {
      await this._saveAppPrefs({ rooms_on: on ? true : null });
      await this._refreshRooms();
    }

    async _refreshRooms() {
      this._roomsBusy = true;
      this.requestUpdate();
      await this._loadRooms("resolvia/rooms/refresh");
      this._roomsBusy = false;
      this.requestUpdate();
    }
  };
