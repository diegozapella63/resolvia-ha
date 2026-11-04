// Cômodos e equipamentos: each task can say where in the house it is done and
// which item it is about, with the rooms and items of the InventarIA (the
// inventory app of the same family). Turned on in Mais › Configurações › Integrações › InventarIA;
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

/** A link as the server keeps it: one id, or a list of ids (several items, several rooms). */
const asIds = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const sameIds = (a, b) => asIds(a).join("|") === asIds(b).join("|");

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

    /** The item ids of a task ([] when none). */
    _equipIdsOf(listId, summary) {
      if (!this._equipsOn()) return [];
      const map = this._rooms.emap && this._rooms.emap[listId];
      return asIds(map && map[taskKey(summary)]).filter((id) => this._equipOf(id));
    }

    /** The first item id of a task (or null). */
    _equipIdOf(listId, summary) {
      return this._equipIdsOf(listId, summary)[0] || null;
    }

    /** The rooms of some items (each once, in their order). */
    _roomsOfEquips(ids) {
      const rooms = asIds(ids).map((id) => (this._equipOf(id) || {}).comodo).filter((c) => c && this._roomList().some((r) => r.id === c));
      return [...new Set(rooms)];
    }

    /** Sets the items of a task (an id, a list of ids; null or [] removes); its room comes from them. */
    async _setTaskEquip(listId, summary, equips, previous = null) {
      if (!this._equipsOn()) return;
      try {
        this._rooms = await this.hass.callWS({ type: "resolvia/equips/set", entity_id: listId, summary, equips: asIds(equips), ...(previous != null ? { previous_summary: previous } : {}) });
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar o equipamento");
      }
    }

    /** The items of a task as tags: one (its name cut short); several, the first one and "+N" (one line). */
    _renderEquipTag(listId, item) {
      const es = this._equipIdsOf(listId, item.summary).map((id) => this._equipOf(id));
      if (!es.length) return nothing;
      return html`<span class="tag room" title=${es[0].nome}>${icon("package")}${clip(es[0].nome, 26)}</span>${es.length > 1 ? html`<span class="tag room" title=${es.slice(1).map((e) => e.nome).join(", ")}>+${es.length - 1}</span>` : nothing}`;
    }

    /** The items for the picker: with the name of their room. */
    _equipItems() {
      return this._equipList().map((i) => ({ id: i.id, nome: i.nome, zona: i.zona, roomId: i.comodo, roomName: this._roomName(i.comodo) || "" }));
    }

    /**
     * Item sheet: Equipamentos (when on), one or several, searched among the items of the room chosen
     * above (the others apart). With items, the room is theirs (one or several) and is locked.
     */
    _renderEquipField(f) {
      if (!this._equipsOn()) return nothing;
      const ids = f.equips || [];
      // with every room (Todos), the search is the whole house
      const room = this._roomsOn() ? (ids.length ? this._roomsOfEquips(ids)[0] || null : this._allRooms(this._pickedRooms(f)) ? null : f.room) : null;
      return html`<div class="field">
        <span class="flabel">${ids.length > 1 ? "Equipamentos" : "Equipamento"}</span>
        ${renderEquipPicker({
          lit: { html, nothing },
          icon,
          items: this._equipItems(),
          room,
          roomName: room ? this._roomName(room) || "" : "",
          value: ids,
          query: f.equipQ || "",
          more: !!f.equipMore,
          adding: !!f.equipAdding,
          autofocus: !!f.equipAdding,
          onQuery: (q) => this._setForm({ equipQ: q, equipMore: false }),
          onMore: () => this._setForm({ equipMore: true }),
          onAdd: () => this._setForm({ equipAdding: true, equipQ: "", equipMore: false }),
          onPick: (id) => this._setForm({ equips: [...ids, id], equipQ: "", equipMore: false, equipAdding: false }),
          onRemove: (id) => {
            const next = ids.filter((x) => x !== id);
            // the last one out: the room is free again, starting from the one it had
            const back = this._roomsOfEquips(ids);
            this._setForm({ equips: next, ...(!next.length && this._roomsOn() ? { room: back[0] || f.room || null, rooms: back.length ? back : f.room ? [f.room] : [] } : {}) });
          },
        })}
      </div>`;
    }

    /** The rooms a form saves: those of its items (locked), or the one chosen. */
    _formRooms(f) {
      if (!this._roomsOn()) return [];
      const ids = this._equipsOn() ? f.equips || [] : [];
      return ids.length ? this._roomsOfEquips(ids) : this._pickedRooms(f);
    }

    /** The rooms chosen in a form without items: several (f.rooms), or the one of before (f.room). */
    _pickedRooms(f) {
      const list = Array.isArray(f.rooms) ? f.rooms : f.room ? [f.room] : [];
      return list.filter((id) => this._roomList().some((c) => c.id === id));
    }

    /** Saves the room and the items of a task when they changed (or the task was renamed). */
    async _saveTaskPlace(listId, summary, f, previous = null) {
      const rooms = this._formRooms(f);
      const equips = this._equipsOn() ? f.equips || [] : [];
      if (!sameIds(rooms, f.roomsOrig || []) || (previous && (f.roomsOrig || []).length)) await this._setTaskRoom(listId, summary, rooms, previous);
      if (!sameIds(equips, f.equipsOrig || []) || (previous && (f.equipsOrig || []).length)) await this._setTaskEquip(listId, summary, equips, previous);
    }

    /** Where a task is, as text for Buscar: its rooms, its items (and their zones); each can be left out. */
    _placeText(listId, summary, { rooms = true, equips = true } = {}) {
      const rs = rooms ? this._roomIdsOf(listId, summary).map((id) => this._roomName(id)) : [];
      const es = equips ? this._equipIdsOf(listId, summary).map((id) => this._equipOf(id)) : [];
      return [...rs, ...es.flatMap((e) => [e.nome, e.zona || ""])].filter(Boolean).join(" ");
    }

    /** The room ids of a task ([] when none; several when its items are in several rooms). */
    _roomIdsOf(listId, summary) {
      if (!this._roomsOn()) return [];
      const map = this._rooms.map && this._rooms.map[listId];
      return asIds(map && map[taskKey(summary)]).filter((id) => this._roomList().some((c) => c.id === id));
    }

    /** The (first) room id of a task, or null. */
    _roomIdOf(listId, summary) {
      return this._roomIdsOf(listId, summary)[0] || null;
    }

    _roomName(id) {
      const c = this._roomList().find((x) => x.id === id);
      return c ? c.nome : null;
    }

    /** Every room of the house (2 or more) is in ids? (Todos: a task of the whole house.) */
    _allRooms(ids) {
      const list = this._roomList();
      return list.length > 1 && list.every((c) => (ids || []).includes(c.id));
    }

    /** Sets the room(s) of a task (an id or a list; null or [] removes it); `previous` is the old name after a rename. */
    async _setTaskRoom(listId, summary, room, previous = null) {
      if (!this._roomsOn()) return;
      try {
        this._rooms = await this.hass.callWS({ type: "resolvia/rooms/set", entity_id: listId, summary, rooms: asIds(room), ...(previous != null ? { previous_summary: previous } : {}) });
        this.requestUpdate();
      } catch (err) {
        this._showToast(err.message || "Não consegui guardar o cômodo");
      }
    }

    _renderRoomTag(listId, item) {
      // several items: no rooms (the first item and +N say enough)
      if (this._equipIdsOf(listId, item.summary).length > 1) return nothing;
      const ids = this._roomIdsOf(listId, item.summary);
      // every room of the house: one tag
      if (this._allRooms(ids)) return html`<span class="tag room" title=${ids.map((id) => this._roomName(id)).join(", ")}>${icon("house")}Todos os cômodos</span>`;
      return ids.length ? html`${ids.map((id) => html`<span class="tag room">${icon("door-open")}${clip(this._roomName(id), 22)}</span>`)}` : nothing;
    }

    /** Item sheet: Cômodo (when on). With equipment, the rooms are those of the items, locked. */
    _renderRoomField(f) {
      if (!this._roomsOn()) return nothing;
      const locked = this._equipsOn() && (f.equips || []).length > 0;
      const rooms = locked ? this._roomsOfEquips(f.equips) : this._pickedRooms(f);
      // without items, several rooms (a task of the whole house floor, say): each one turns on and off
      const toggle = (id) => {
        const next = rooms.includes(id) ? rooms.filter((x) => x !== id) : [...rooms, id];
        this._setForm({ rooms: next, room: next[0] || null });
      };
      // Todos: every room of the house (a task of the whole house); tapped again, none
      const allIds = this._roomList().map((c) => c.id);
      const all = !locked && this._allRooms(rooms);
      return html`<div class="field">
        <span class="flabel">${rooms.length > 1 ? "Cômodos" : "Cômodo"}</span>
        <div class="chip-row grid ${locked ? "locked" : ""}">
          <button class="pick ${!rooms.length ? "on" : ""}" ?disabled=${locked} @click=${() => this._setForm({ room: null, rooms: [] })}>Nenhum</button>
          ${allIds.length > 1
            ? html`<button class="pick room all-rooms ${all ? "on" : ""}" aria-pressed=${all ? "true" : "false"} ?disabled=${locked} @click=${() => this._setForm(all ? { room: null, rooms: [] } : { rooms: allIds, room: allIds[0] })}>${icon("house")}<span>Todos</span></button>`
            : nothing}
          ${this._roomList().map((c) => html`<button class="pick room ${rooms.includes(c.id) ? "on" : ""}" aria-pressed=${rooms.includes(c.id) ? "true" : "false"} ?disabled=${locked} @click=${() => toggle(c.id)}>${icon("door-open")}<span>${clip(c.nome, 22)}</span></button>`)}
        </div>
        ${locked ? html`<span class="field-hint">${icon("lock")}<span>Vem ${f.equips.length > 1 ? "dos equipamentos" : "do equipamento"}.</span></span>` : nothing}
      </div>`;
    }

    /** Mais › Configurações › Integrações › InventarIA: cômodos and equipamentos. */
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
