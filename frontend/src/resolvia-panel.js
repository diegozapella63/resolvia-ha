import {
  LitElement,
  html,
  nothing,
  repeat,
  unsafeSVG,
} from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { ensureFonts } from "./fonts.js";
import { styles } from "./styles.js";
import { DataMixin } from "./datapanel.js";
import { PointsMixin } from "./points.js";
import {
  F,
  has,
  PALETTE,
  colorById,
  autoColor,
  colorVars,
  hexToRgba,
  fold,
  foldKeepLength,
  plural,
  clip,
  listMeta,
  guessIcon,
  LIST_ICONS,
  parseDue,
  dueInfo,
  quickDates,
  shortDate,
  greeting,
  splitLinks,
  ymd,
  parseListText,
  prepareImage,
} from "./util.js";

const VERSION = "2.8.1";
const THEME_KEY = "resolvia.theme";
const LOCAL_PREFS_KEY = "resolvia.prefs";
const LAST_LIST_KEY = "resolvia.lastList";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* private mode etc. */
    }
  },
};

const isDone = (item) => item.status === "completed";
const REPEAT_PICKS = [
  { days: 1, label: "Todo dia" },
  { days: 2, label: "2 dias" },
  { days: 3, label: "3 dias" },
  { days: 7, label: "1 semana" },
  { days: 14, label: "2 semanas" },
  { days: 30, label: "1 mês" },
];
const keyOf = (item) => item.uid || item.summary;

class ResolviaPanel extends PointsMixin(DataMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    route: { attribute: false },
    panel: { attribute: false },
    _items: { state: true },
    _prefs: { state: true },
    _path: { state: true },
    _sheet: { state: true },
    _form: { state: true },
    _toast: { state: true },
    _query: { state: true },
    _searchDone: { state: true },
    _theme: { state: true },
    _doneOpen: { state: true },
    _rules: { state: true },
    _cam: { state: true },
    _rulesOk: { state: true },
    _pts: { state: true },
    _aiState: { state: true },
    env: { attribute: false },
  };

  static styles = styles;

  constructor() {
    super();
    this._items = new Map();
    this._subs = new Map();
    this._polling = new Set();
    this._recent = new Map();
    this._prefs = { lists: {}, app: {} };
    this._prefsLoaded = false;
    this._prefsRemote = false;
    this._path = "";
    this._sheet = null;
    this._form = null;
    this._toast = null;
    this._query = "";
    this._searchDone = false;
    this._theme = store.get(THEME_KEY, "auto");
    this._doneOpen = {};
    this._lastTodoStates = null;
    this._L = [];
    this._rules = [];
    this._cam = null;
    this._rulesOk = false;
    this._rulesUnsub = null;
    this._aiState = null;
    this._aiAt = 0;
    this.env = null;
    this._onPopState = this._onPopState.bind(this);
    this._onResize = this._checkHeight.bind(this);
    this._mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    this._onScheme = () => this.requestUpdate();
  }

  // ------------------------------------------------------------ lifecycle

  connectedCallback() {
    super.connectedCallback();
    ensureFonts();
    window.addEventListener("popstate", this._onPopState);
    window.addEventListener("resize", this._onResize);
    if (this._mql && this._mql.addEventListener) this._mql.addEventListener("change", this._onScheme);
    if (this.hass) this._syncSubscriptions();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onPopState);
    window.removeEventListener("resize", this._onResize);
    if (this._mql && this._mql.removeEventListener) this._mql.removeEventListener("change", this._onScheme);
    for (const [, unsub] of this._subs) this._unsub(unsub);
    this._subs.clear();
    for (const [, t] of this._recent) clearTimeout(t);
    this._recent.clear();
    clearTimeout(this._toastTimer);
    this._stopStream();
    if (this._rulesUnsub) this._rulesUnsub.then((f) => f && f()).catch(() => {});
    this._rulesUnsub = null;
  }

  shouldUpdate(changed) {
    if (changed.size !== 1 || !changed.has("hass")) return true;
    const old = changed.get("hass");
    if (!old || !this.hass) return true;
    // hass changes on every state change in the house; only re-render for ours.
    if (old.themes !== this.hass.themes || old.entities !== this.hass.entities || old.devices !== this.hass.devices || old.user !== this.hass.user || old.connected !== this.hass.connected) return true;
    const ids = Object.keys(this.hass.states).filter((id) => id.startsWith("todo."));
    const oldIds = Object.keys(old.states).filter((id) => id.startsWith("todo."));
    if (ids.length !== oldIds.length) return true;
    return ids.some((id) => old.states[id] !== this.hass.states[id]);
  }

  willUpdate(changed) {
    if (changed.has("route") && this.route) {
      this._path = this.route.path || "";
    }
    if (changed.has("hass") && this.hass) {
      if (!this._prefsLoaded) {
        this._prefsLoaded = true;
        this._loadPrefs();
        this._loadPoints();
      }
      if (!this._rulesUnsub && this.isConnected) this._subscribeRules();
      this._syncSubscriptions();
      this._refreshPolled(changed.get("hass"));
    }
    this._dark = this._isDark();
    this._L = this.hass ? this._computeLists() : [];
  }

  updated(changed) {
    this.toggleAttribute("dark", this._dark);
    if (changed.has("_path") && this._view().name === "more") {
      const tab = this._view().tab;
      if (tab === "integracoes") {
        this._refreshAi(false);
        this._loadPoints();
      }
      if (tab === "dados") this._loadBackups();
    }
    if (changed.has("_path") && this._view().name === "search") {
      const input = this.renderRoot.querySelector(".search-box input");
      if (input) input.focus({ preventScroll: true });
    }
  }

  firstUpdated() {
    this._checkHeight();
  }

  _checkHeight() {
    // If the panel's container doesn't give us a height, size to the viewport.
    if (this.hasAttribute("vh")) return;
    const h = this.getBoundingClientRect().height;
    if (h > window.innerHeight + 4 || h < 100) this.setAttribute("vh", "");
  }

  _isDark() {
    if (this._theme === "dark") return true;
    if (this._theme === "light") return false;
    if (this.hass && this.hass.themes && typeof this.hass.themes.darkMode === "boolean") return this.hass.themes.darkMode;
    return !!(this._mql && this._mql.matches);
  }

  // ------------------------------------------------------------ data

  _todoIds() {
    return Object.keys(this.hass.states).filter((id) => id.startsWith("todo."));
  }

  _syncSubscriptions() {
    if (!this.hass || !this.hass.connection || !this.isConnected) return;
    const ids = this._todoIds();
    for (const id of ids) {
      if (!this._subs.has(id)) this._subscribe(id);
    }
    for (const [id, unsub] of [...this._subs]) {
      if (!ids.includes(id)) {
        this._unsub(unsub);
        this._subs.delete(id);
        this._polling.delete(id);
        const next = new Map(this._items);
        next.delete(id);
        this._items = next;
      }
    }
  }

  _subscribe(id) {
    const p = this.hass.connection
      .subscribeMessage((msg) => this._setItems(id, (msg && msg.items) || []), {
        type: "todo/item/subscribe",
        entity_id: id,
      })
      .catch(() => {
        // Older/odd integrations: fall back to fetching on state change.
        this._polling.add(id);
        this._fetchItems(id);
        return null;
      });
    this._subs.set(id, p);
  }

  _unsub(promise) {
    Promise.resolve(promise)
      .then((fn) => typeof fn === "function" && fn())
      .catch(() => {});
  }

  async _fetchItems(id) {
    try {
      const res = await this.hass.callWS({ type: "todo/item/list", entity_id: id });
      this._setItems(id, (res && res.items) || []);
    } catch (e) {
      this._setItems(id, this._items.get(id) || []);
    }
  }

  _refreshPolled(oldHass) {
    if (!oldHass || !this._polling.size) return;
    for (const id of this._polling) {
      if (oldHass.states[id] !== this.hass.states[id]) this._fetchItems(id);
    }
  }

  _setItems(id, items) {
    const next = new Map(this._items);
    next.set(id, items);
    this._items = next;
  }

  _patchItem(listId, key, changes) {
    const items = this._items.get(listId);
    if (!items) return;
    this._setItems(
      listId,
      items.map((i) => (keyOf(i) === key ? { ...i, ...changes } : i)),
    );
  }

  _computeLists() {
    const prefs = (this._prefs && this._prefs.lists) || {};
    const ids = this._todoIds();
    const rows = ids.map((id) => {
      const st = this.hass.states[id];
      const meta = listMeta(this.hass, id);
      return { id, st, meta };
    });
    rows.sort(
      (a, b) =>
        (a.meta.group || "").localeCompare(b.meta.group || "", "pt-BR") ||
        a.meta.name.localeCompare(b.meta.name, "pt-BR"),
    );
    return rows.map(({ id, st, meta }, index) => {
      const p = prefs[id] || {};
      const items = this._items.get(id);
      const pendingItems = items ? items.filter((i) => !isDone(i)) : null;
      const pending = pendingItems ? pendingItems.length : Number(st.state) || 0;
      const done = items ? items.length - pendingItems.length : 0;
      const color = colorById(p.color) || autoColor(index);
      const features = st.attributes.supported_features || 0;
      const canDue = has(features, F.DUE_DATE) || has(features, F.DUE_DATETIME);
      // A deadline is only what you set: a list that doesn't let you set one gets
      // its dates from the integration ("unavailable since…"), shown as information.
      // Lists that do accept deadlines can turn them off (Personalizar).
      const datesInfo = !canDue || p.dates_info === true;
      const dues = pendingItems && !datesInfo ? pendingItems.map((i) => dueInfo(i.due)).filter(Boolean) : [];
      return {
        id,
        name: p.name || meta.name,
        origName: meta.name,
        group: meta.group,
        color,
        colorId: p.color || null,
        icon: p.icon || guessIcon(`${meta.name} ${meta.group || ""} ${id}`),
        iconPref: p.icon || null,
        hidden: !!p.hidden,
        features,
        canDue,
        datesInfo,
        hasDates: !!(items && items.some((i) => i.due)),
        unavailable: st.state === "unavailable" || st.state === "unknown",
        items,
        pending,
        done,
        late: dues.filter((d) => d.overdue).length,
        today: dues.filter((d) => !d.overdue && d.diff === 0).length,
      };
    });
  }

  _list(id) {
    return this._L.find((l) => l.id === id);
  }

  _visible() {
    return this._L.filter((l) => !l.hidden);
  }

  _app(key, fallback) {
    const v = this._prefs && this._prefs.app ? this._prefs.app[key] : undefined;
    return v === undefined ? fallback : v;
  }

  _accent() {
    return colorById(this._app("accent", "vermelho")) || PALETTE[0];
  }

  // ------------------------------------------------------------ prefs

  async _loadPrefs() {
    try {
      const res = await this.hass.callWS({ type: "resolvia/prefs/get" });
      this._prefs = { lists: res.lists || {}, app: res.app || {} };
      this._prefsRemote = true;
    } catch (e) {
      // Integration's websocket not available (e.g. preview): keep it local.
      this._prefs = store.get(LOCAL_PREFS_KEY, { lists: {}, app: {} });
      this._prefsRemote = false;
    }
  }

  async _saveListPrefs(id, changes) {
    const lists = { ...this._prefs.lists };
    const merged = { ...(lists[id] || {}) };
    for (const [k, v] of Object.entries(changes)) {
      if (v === null || v === "") delete merged[k];
      else merged[k] = v;
    }
    if (Object.keys(merged).length) lists[id] = merged;
    else delete lists[id];
    this._prefs = { ...this._prefs, lists };
    if (this._prefsRemote) {
      try {
        const res = await this.hass.callWS({ type: "resolvia/prefs/set_list", entity_id: id, prefs: changes });
        this._prefs = { lists: res.lists || {}, app: res.app || {} };
      } catch (e) {
        this._showToast("Não consegui salvar a personalização");
      }
    } else store.set(LOCAL_PREFS_KEY, this._prefs);
  }

  async _saveAppPrefs(changes) {
    const app = { ...this._prefs.app };
    for (const [k, v] of Object.entries(changes)) {
      if (v === null || v === "") delete app[k];
      else app[k] = v;
    }
    this._prefs = { ...this._prefs, app };
    if (this._prefsRemote) {
      try {
        const res = await this.hass.callWS({ type: "resolvia/prefs/set_app", prefs: changes });
        this._prefs = { lists: res.lists || {}, app: res.app || {} };
      } catch (e) {
        this._showToast("Não consegui salvar a preferência");
      }
    } else store.set(LOCAL_PREFS_KEY, this._prefs);
  }

  _setTheme(theme) {
    this._theme = theme;
    store.set(THEME_KEY, theme);
  }

  // ------------------------------------------------------------ navigation

  _inHA() {
    return !!this.route;
  }

  _view() {
    const p = (this._path || "").replace(/\/+$/, "");
    let m;
    if ((m = p.match(/^\/lista\/(todo\.[^/]+)$/))) return { name: "list", id: decodeURIComponent(m[1]) };
    if (p === "/prazos") return { name: "due" };
    if (p === "/buscar") return { name: "search" };
    if ((m = p.match(/^\/mais(?:\/(repeticoes|integracoes|ia|dados|aparencia))?$/))) return { name: "more", tab: m[1] === "ia" ? "integracoes" : m[1] || "listas" };
    return { name: "home" };
  }

  _go(path, replace = false) {
    if (this._sheet) this._closeSheet(true);
    const depth = ((history.state && history.state.rvDepth) || 0) + (replace ? 0 : 1);
    if (this._inHA()) {
      const url = `/${(this.panel && this.panel.url_path) || "resolvia"}${path}`;
      if (replace) history.replaceState({ rvDepth: depth }, "", url);
      else history.pushState({ rvDepth: depth }, "", url);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace } }));
    } else {
      if (replace) history.replaceState({ rvDepth: depth, rvPath: path }, "");
      else history.pushState({ rvDepth: depth, rvPath: path }, "");
      this._path = path;
    }
    const main = this.renderRoot && this.renderRoot.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "instant" });
  }

  _back() {
    if (history.state && history.state.rvDepth > 0) history.back();
    else this._go("", true);
  }

  _goTab(path) {
    const view = this._view().name;
    if (path === "") {
      if (view === "home") {
        const main = this.renderRoot.querySelector("main");
        if (main) main.scrollTo({ top: 0 });
        return;
      }
      this._back();
      return;
    }
    // Switching between tabs replaces the entry so Back always returns home.
    this._go(path, view !== "home" && view !== "list");
  }

  _onPopState() {
    if (this._cam && !(history.state && history.state.rvCam)) this._closeCamera(true);
    if (this._sheet && !(history.state && history.state.rvSheet)) {
      this._sheet = null;
      this._form = null;
    }
    if (!this._inHA()) this._path = (history.state && history.state.rvPath) || "";
  }

  _openSheet(sheet, form = null) {
    const wasOpen = !!this._sheet;
    this._sheet = sheet;
    this._form = form;
    if (!wasOpen) {
      try {
        history.pushState({ ...(history.state || {}), rvSheet: true }, "");
      } catch (e) {
        /* ignore */
      }
    }
  }

  _closeSheet(silent = false) {
    if (!this._sheet) return;
    this._sheet = null;
    this._form = null;
    if (history.state && history.state.rvSheet) {
      if (silent) history.replaceState({ ...history.state, rvSheet: false }, "");
      else history.back();
    }
  }

  _goAiSettings() {
    this._closeSheet(true);
    this._go("/mais/integracoes");
    this.updateComplete.then(() => {
      const el = this.renderRoot.querySelector("#leitura-ia");
      if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  _toggleMenu() {
    this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  _openInHA(path) {
    this._closeSheet(true);
    if (this.env && this.env.openInHA) return this.env.openInHA(path);
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  // ------------------------------------------------------------ feedback

  _haptic(type) {
    if (this.env && this.env.haptic) return this.env.haptic(type);
    window.dispatchEvent(new CustomEvent("haptic", { detail: type }));
  }

  // ------------------------------------------------------------ recurring

  _subscribeRules() {
    if (!this.hass || !this.hass.connection) return;
    this._rulesUnsub = this.hass.connection
      .subscribeMessage((ev) => (this._rules = (ev && ev.rules) || []), { type: "resolvia/recurring/subscribe" })
      .then((unsub) => {
        this._rulesOk = true;
        return unsub;
      })
      .catch(() => {
        this._rulesOk = false;
        return null;
      });
  }

  _ruleFor(listId, item) {
    if (!item) return null;
    return (
      this._rules.find((r) => r.entity_id === listId && r.uid && r.uid === item.uid) ||
      (item.status !== "completed" && this._rules.find((r) => r.entity_id === listId && !r.uid && r.match === item.summary)) ||
      null
    );
  }

  _everyLabel(days) {
    if (days === 1) return "todo dia";
    if (days === 7) return "toda semana";
    if (days === 14) return "a cada 2 semanas";
    if (days === 30) return "todo mês";
    return `a cada ${days} dias`;
  }

  _returnLabel(ms) {
    const d = new Date(ms);
    const info = dueInfo(ymd(d));
    if (!info) return "";
    if (info.diff <= 0) return "hoje";
    if (info.diff === 1) return "amanhã";
    if (info.diff < 7) return info.text.toLowerCase();
    return info.text;
  }

  _reopenAt(days, from = Date.now()) {
    const d = new Date(from);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days).getTime();
  }

  _setRule(entityId, { uid, summary, days }) {
    if (!this._rulesOk) return Promise.resolve();
    return this.hass
      .callWS({ type: "resolvia/recurring/set", entity_id: entityId, uid: uid || undefined, summary, days: days || null })
      .catch(() => this._showToast("Não consegui salvar a repetição"));
  }

  _showToast(text, action = null) {
    clearTimeout(this._toastTimer);
    this._toast = { text, action, id: Date.now() };
    this._toastTimer = setTimeout(() => (this._toast = null), action ? 4500 : Math.min(8000, Math.max(2600, text.length * 55)));
  }

  async _call(service, data, entityId) {
    try {
      await this.hass.callService("todo", service, data, { entity_id: entityId });
      return true;
    } catch (err) {
      // Home Assistant already shows its own error toast for failed actions.
      // eslint-disable-next-line no-console
      console.error("ResolvIA:", service, err);
      if (!this._inHA()) this._showToast((err && err.message) || "Algo deu errado");
      return false;
    }
  }

  // ------------------------------------------------------------ actions

  async _toggle(list, item) {
    if (!has(list.features, F.UPDATE)) return;
    const key = keyOf(item);
    const completing = !isDone(item);
    const status = completing ? "completed" : "needs_action";
    this._haptic(completing ? "success" : "light");
    if (completing) {
      clearTimeout(this._recent.get(key));
      this._recent.set(
        key,
        setTimeout(() => {
          this._recent.delete(key);
          this.requestUpdate();
        }, 950),
      );
    } else {
      clearTimeout(this._recent.get(key));
      this._recent.delete(key);
    }
    this._patchItem(list.id, key, { status });
    const ok = await this._call("update_item", { item: key, status }, list.id);
    if (!ok) {
      this._patchItem(list.id, key, { status: item.status });
      return;
    }
    const points = this._pointsOf(list.id, item.summary);
    if (completing) {
      const rule = this._ruleFor(list.id, item);
      const back = rule ? ` · volta ${this._returnLabel(this._reopenAt(rule.days))}` : "";
      const undo = {
        label: "Desfazer",
        run: () => {
          this._patchItem(list.id, key, { status: "needs_action" });
          this._call("update_item", { item: key, status: "needs_action" }, list.id);
          if (points) this._takePoints(list, item);
        },
      };
      if (points) this._givePoints(list, item, `Resolvido: ${clip(item.summary, 18)}`, undo);
      else this._showToast(`Resolvido: ${clip(item.summary, rule ? 22 : 30)}${back}`, undo);
    } else if (points) this._takePoints(list, item);
  }

  _quickAdd(ev, list) {
    ev.preventDefault();
    const input = ev.currentTarget.querySelector("input");
    this._addLines(list, [input.value], input);
  }

  _onQuickPaste(ev, list) {
    // Pasting several lines adds one item per line.
    const text = ev.clipboardData && ev.clipboardData.getData("text");
    if (text && /\n/.test(text.trim())) {
      ev.preventDefault();
      this._addLines(list, text.split(/\r?\n/), ev.currentTarget);
    }
  }

  async _addLines(list, rawLines, input) {
    const lines = rawLines.map((s) => s.trim()).filter(Boolean);
    if (!lines.length) return;
    const before = input.value;
    input.value = "";
    input.focus();
    this._haptic("light");
    for (const line of lines) {
      const ok = await this._call("add_item", { item: line }, list.id);
      if (!ok) {
        input.value = before || line;
        return;
      }
    }
    if (lines.length > 1) this._showToast(`${lines.length} itens adicionados`);
  }

  _dueFields(list, date, time, clearing) {
    const f = list.features;
    if (!date) {
      if (!clearing) return {};
      if (has(f, F.DUE_DATE)) return { due_date: null };
      if (has(f, F.DUE_DATETIME)) return { due_datetime: null };
      return {};
    }
    if (time && has(f, F.DUE_DATETIME)) return { due_datetime: `${date} ${time}:00` };
    if (has(f, F.DUE_DATE)) return { due_date: date };
    if (has(f, F.DUE_DATETIME)) return { due_datetime: `${date} ${time || "09:00"}:00` };
    return {};
  }

  async _addFull(list, { summary, description, date, time }) {
    const data = { item: summary, ...this._dueFields(list, date, time, false) };
    if (description && has(list.features, F.DESCRIPTION)) data.description = description;
    return this._call("add_item", data, list.id);
  }

  _openAdd(listId) {
    const candidates = this._visible().filter((l) => has(l.features, F.CREATE) && !l.unavailable);
    const last = store.get(LAST_LIST_KEY, null);
    const target =
      (listId && this._list(listId) && has(this._list(listId).features, F.CREATE) && listId) ||
      (candidates.find((l) => l.id === last) && last) ||
      (candidates[0] && candidates[0].id);
    if (!target) {
      this._showToast("Nenhuma lista aceita itens novos");
      return;
    }
    this._openSheet("item", {
      mode: "add",
      listId: target,
      target,
      summary: "",
      description: "",
      date: null,
      time: null,
      repeat: 0,
      repeatOrig: 0,
      repeatCustom: false,
    });
    this.updateComplete.then(() => {
      const ta = this.renderRoot.querySelector(".sheet textarea");
      if (ta) ta.focus();
    });
  }

  // ------------------------------------------------------------ import (message / photos / scan)

  _aiInfo() {
    return this._aiState || (this.hass && this.hass.resolvia && this.hass.resolvia.ai) || { ready: false, images: false, entities: [] };
  }

  /** Mais › Leitura por IA: which AI Home Assistant gives the app, and if it is ready. */
  async _refreshAi(force = true) {
    const r = this.hass && this.hass.resolvia;
    if (!r || !r.aiStatus) return;
    if (!force && Date.now() - this._aiAt < 60000) return;
    this._aiChecking = true;
    this.requestUpdate();
    try {
      this._aiState = await r.aiStatus();
    } catch (err) {
      this._aiState = { ...this._aiInfo(), ready: false, images: false, reason: err.message };
    }
    this._aiAt = Date.now();
    this._aiChecking = false;
    this.requestUpdate();
  }

  async _chooseAi(id) {
    await this._saveAppPrefs({ ai_entity: id || null });
    await this._refreshAi();
    this._showToast("IA do app atualizada");
  }

  _canImport() {
    return !!(this.hass && this.hass.resolvia && this.hass.resolvia.extract);
  }

  _importTarget(listId) {
    const ok = (id) => {
      const l = id && this._list(id);
      return l && has(l.features, F.CREATE) && !l.unavailable ? id : null;
    };
    const candidates = this._visible().filter((l) => has(l.features, F.CREATE) && !l.unavailable);
    return ok(listId) || ok(store.get(LAST_LIST_KEY, null)) || (candidates[0] && candidates[0].id) || null;
  }

  /** start: "pick" | "text" | "photos" | "scan". Photos/scan open the file chooser right away. */
  _openImport(listId, start = "pick") {
    const target = this._importTarget(listId);
    if (!target) {
      this._showToast("Nenhuma lista aceita itens novos");
      return;
    }
    this._releaseImages();
    this._importToken = 0;
    this._openSheet("import", {
      target,
      step: start === "text" ? "text" : "pick",
      text: "",
      images: [],
      items: [],
      provider: null,
      error: null,
      note: null,
    });
    if (start === "photos") this._pickFiles("photos");
    if (start === "scan") this._openCamera();
    if (start === "text") this._focusImportText();
  }

  _focusImportText() {
    this.updateComplete.then(() => {
      const ta = this.renderRoot.querySelector(".sheet textarea");
      if (ta) ta.focus();
    });
  }

  _pickFiles(kind) {
    const input = this.renderRoot.querySelector(kind === "scan" ? "#rv-scan" : "#rv-photos");
    if (!input) return;
    input.value = "";
    input.click();
  }

  _releaseImages() {
    const f = this._form;
    if (f && f.images) for (const img of f.images) if (img.url) URL.revokeObjectURL(img.url);
  }

  /**
   * The Home Assistant Android app (2026.10.x and older) drops selections made
   * with `multiple` and ignores `capture`, so it gets one photo at a time and
   * our own camera screen instead.
   */
  _isHaAndroid() {
    return /Home Assistant\//.test(navigator.userAgent) && /Android/.test(navigator.userAgent);
  }

  async _onFiles(ev) {
    const files = [...(ev.target.files || [])].filter((f) => !f.type || f.type.startsWith("image/")).slice(0, 6);
    ev.target.value = "";
    if (!files.length) return;
    if (this._sheet !== "import") this._openImport(null, "pick");
    const appending = this._form.step === "review";
    this._setForm({ step: "loading", error: null, loadingText: "Preparando as fotos…", prevStep: appending ? "review" : "pick" });
    const images = [];
    for (const file of files) images.push(await prepareImage(file));
    this._readImages(images, appending);
  }

  /** Send photos to the AI. With `appending`, items found are added to the ones under review. */
  _readImages(images, appending) {
    if (this._sheet !== "import" || !images.length) return;
    const all = appending ? [...(this._form.images || []), ...images] : (this._releaseImages(), images);
    this._setForm({
      step: "loading",
      images: all,
      prevStep: appending ? "review" : "pick",
      loadingText: images.length > 1 ? `Lendo ${images.length} fotos com IA…` : "Lendo a foto com IA…",
    });
    this._runExtract({ images, appending });
  }

  async _runExtract({ text, images, appending = false }) {
    const token = (this._importToken = Date.now());
    const target = this._list(this._form.target);
    const live = () => token === this._importToken && this._sheet === "import";
    const keep = appending ? this._form.items || [] : [];
    const merge = (found) => {
      const seen = new Set(keep.map((i) => i.text.trim().toLowerCase()));
      return [...keep, ...found.filter((t) => !seen.has(t.trim().toLowerCase())).map((t) => ({ text: t, on: true }))];
    };
    try {
      const res = await this.hass.resolvia.extract({
        text,
        images: images ? images.map(({ data, mime }) => ({ data, mime })) : undefined,
        list_name: target ? target.name : undefined,
      });
      if (!live()) return;
      const found = res.items || [];
      if (!found.length) {
        const msg = text ? "Não encontrei itens nessa mensagem." : "Não consegui achar itens nessa foto. Tente mais de perto e com boa luz.";
        if (appending) this._setForm({ step: "review", note: msg });
        else this._setForm({ step: text ? "text" : "pick", error: msg });
        return;
      }
      this._haptic("success");
      this._setForm({ step: "review", items: merge(found), provider: res.provider || null, note: null, error: null });
    } catch (err) {
      if (!live()) return;
      if (text) {
        const local = parseListText(text);
        if (local.length) {
          this._setForm({
            step: "review",
            items: merge(local),
            provider: "local",
            note: "A IA não respondeu, então separei por linhas e vírgulas.",
          });
          return;
        }
      }
      if (appending) this._setForm({ step: "review", note: err.message || "Algo deu errado" });
      else this._setForm({ step: text ? "text" : "pick", error: err.message || "Algo deu errado" });
    }
  }

  // ------------------------------------------------------------ camera ("Digitalizar com IA")

  async _openCamera() {
    const md = navigator.mediaDevices;
    if (!md || !md.getUserMedia) {
      this._pickFiles("scan");
      return;
    }
    const appending = !!(this._form && this._form.step === "review");
    this._cam = { status: "starting", shots: [], torch: false, torchOk: false, appending, flash: 0 };
    try {
      history.pushState({ ...(history.state || {}), rvCam: true }, "");
    } catch (e) {
      /* ignore */
    }
    try {
      const stream = await md.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1440 } },
      });
      if (!this._cam) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      this._stream = stream;
      const track = stream.getVideoTracks()[0];
      const caps = track && track.getCapabilities ? track.getCapabilities() : {};
      this._cam = { ...this._cam, status: "live", torchOk: !!caps.torch };
      await this.updateComplete;
      const video = this.renderRoot.querySelector(".cam video");
      if (video) {
        video.srcObject = stream;
        video.play().catch(() => {});
      }
    } catch (err) {
      if (!this._cam) return;
      const denied = err && (err.name === "NotAllowedError" || err.name === "SecurityError");
      this._cam = {
        ...this._cam,
        status: "error",
        error: denied
          ? "Sem permissão para usar a câmera. Libere a câmera para o app do Home Assistant nas configurações do celular, ou escolha uma foto."
          : "Não consegui abrir a câmera. Você pode escolher uma foto da galeria.",
      };
    }
  }

  _stopStream() {
    if (this._stream) this._stream.getTracks().forEach((t) => t.stop());
    this._stream = null;
  }

  _closeCamera(fromHistory = false) {
    if (!this._cam) return;
    this._stopStream();
    const shots = this._cam.shots || [];
    if (!this._cam.used) for (const s of shots) URL.revokeObjectURL(s.url);
    this._cam = null;
    if (!fromHistory && history.state && history.state.rvCam) history.back();
  }

  async _toggleTorch() {
    const track = this._stream && this._stream.getVideoTracks()[0];
    if (!track) return;
    const on = !this._cam.torch;
    try {
      await track.applyConstraints({ advanced: [{ torch: on }] });
      this._cam = { ...this._cam, torch: on };
    } catch (e) {
      this._cam = { ...this._cam, torchOk: false };
    }
  }

  async _shoot() {
    const video = this.renderRoot.querySelector(".cam video");
    if (!video || !video.videoWidth || !this._cam || this._cam.shots.length >= 6) return;
    const max = 1800;
    const scale = Math.min(1, max / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
    if (!blob || !this._cam) return;
    const shot = await prepareImage(blob, max);
    this._haptic("light");
    this._cam = { ...this._cam, shots: [...this._cam.shots, shot], flash: Date.now() };
  }

  _useShots() {
    if (!this._cam || !this._cam.shots.length) return;
    const shots = this._cam.shots;
    const appending = this._cam.appending;
    this._cam = { ...this._cam, used: true };
    this._closeCamera();
    if (this._sheet !== "import") this._openImport(null, "pick");
    this._readImages(shots, appending && this._form.step === "review");
  }

  _cameraFallback() {
    const appending = this._cam && this._cam.appending;
    this._closeCamera();
    if (appending && this._form) this._setForm({ step: "review" });
    this._pickFiles("scan");
  }

  _renderCamera() {
    const c = this._cam;
    if (!c) return nothing;
    const n = c.shots.length;
    return html`
      <div class="cam" role="dialog" aria-label="Digitalizar com IA">
        <video playsinline muted autoplay></video>
        ${c.flash ? html`<div class="cam-flash" .key=${c.flash}></div>` : nothing}
        <div class="cam-top">
          <button class="cam-btn" aria-label="Fechar" @click=${() => this._closeCamera()}>${icon("x")}</button>
          <span class="cam-title">Digitalizar com IA</span>
          ${c.torchOk
            ? html`<button class="cam-btn ${c.torch ? "on" : ""}" aria-label="Lanterna" @click=${() => this._toggleTorch()}>${icon("zap")}</button>`
            : html`<span class="cam-btn ghost"></span>`}
        </div>
        ${c.status === "error"
          ? html`<div class="cam-msg">
              ${icon("camera")}
              <p>${c.error}</p>
              <button class="btn primary" @click=${() => this._cameraFallback()}>${icon("images")}Escolher foto</button>
            </div>`
          : html`<div class="cam-frame"><i></i><i></i><i></i><i></i></div>
              <p class="cam-hint">${c.status === "starting" ? "Abrindo a câmera…" : n ? `${plural(n, "página", "páginas")}. Fotografe outra ou toque em Pronto.` : "Enquadre a lista e toque no botão"}</p>`}
        <div class="cam-bottom">
          <div class="cam-shots">${c.shots.slice(-3).map((s) => html`<img src=${s.url} alt="" />`)}${n > 3 ? html`<span>+${n - 3}</span>` : nothing}</div>
          <button class="cam-shutter" aria-label="Fotografar" ?disabled=${c.status !== "live" || n >= 6} @click=${() => this._shoot()}><span></span></button>
          <button class="cam-done" ?disabled=${!n} @click=${() => this._useShots()}>Pronto${n ? ` (${n})` : ""}</button>
        </div>
      </div>
    `;
  }

  _readText() {
    const text = (this._form.text || "").trim();
    if (!text) {
      this._focusImportText();
      return;
    }
    if (this._aiInfo().ready) {
      this._setForm({ step: "loading", error: null, note: null, loadingText: "Separando os itens com IA…" });
      this._runExtract({ text });
      return;
    }
    const items = parseListText(text);
    if (items.length) this._setForm({ step: "review", items: items.map((t) => ({ text: t, on: true })), provider: "local", error: null });
    else this._setForm({ error: "Não encontrei itens nesse texto." });
  }

  async _pasteClipboard() {
    try {
      const t = await navigator.clipboard.readText();
      if (!t) throw new Error("empty");
      this._setForm({ text: t, error: null });
    } catch (e) {
      this._focusImportText();
      this._showToast("Toque e segure no campo para colar");
    }
  }

  _setImportItem(i, changes) {
    const items = this._form.items.slice();
    items[i] = { ...items[i], ...changes };
    this._setForm({ items });
  }

  async _importAdd() {
    const f = this._form;
    const target = this._list(f.target);
    const items = f.items.filter((i) => i.on && i.text.trim());
    if (!target || !items.length) return;
    store.set(LAST_LIST_KEY, target.id);
    this._releaseImages();
    this._closeSheet();
    this._haptic("success");
    let n = 0;
    for (const it of items) {
      if (await this._call("add_item", { item: it.text.trim() }, target.id)) n++;
      else break;
    }
    if (n) this._showToast(`${plural(n, "item adicionado", "itens adicionados")} em ${clip(target.name, 24)}`);
  }

  _openEdit(list, item) {
    const due = parseDue(item.due);
    const rule = this._ruleFor(list.id, item);
    const days = rule ? rule.days : 0;
    this._openSheet("item", {
      mode: "edit",
      listId: list.id,
      key: keyOf(item),
      target: list.id,
      summary: item.summary || "",
      description: item.description || "",
      date: due ? due.date : null,
      time: due ? due.time : null,
      repeat: days,
      repeatOrig: days,
      repeatCustom: !!days && !REPEAT_PICKS.some((p) => p.days === days),
      points: this._rawPoints(list.id, item.summary),
      pointsOrig: this._rawPoints(list.id, item.summary),
    });
    this._loadPoints();
  }

  _setForm(changes) {
    this._form = { ...this._form, ...changes };
  }

  async _saveItem() {
    const f = this._form;
    const summary = (f.summary || "").trim();
    if (!summary) {
      const ta = this.renderRoot.querySelector(".sheet textarea");
      if (ta) ta.focus();
      return;
    }
    const description = (f.description || "").trim();
    const target = this._list(f.target);

    if (f.mode === "add") {
      if (!target) return;
      store.set(LAST_LIST_KEY, target.id);
      this._closeSheet();
      this._haptic("light");
      const ok = await this._addFull(target, { summary, description, date: f.date, time: f.time });
      if (ok && f.repeat) await this._setRule(target.id, { summary, days: f.repeat });
      if (ok && f.points) await this._setTaskPoints(target.id, summary, f.points);
      if (ok && this._view().id !== target.id) this._showToast(`Adicionado em ${clip(target.name, 28)}`);
      return;
    }

    const list = this._list(f.listId);
    const item = list && list.items && list.items.find((i) => keyOf(i) === f.key);
    if (!list || !item) {
      this._closeSheet();
      return;
    }

    if (target && target.id !== list.id) {
      this._closeSheet();
      const ok = await this._addFull(target, { summary, description, date: f.date, time: f.time });
      if (ok) {
        if (f.repeat) await this._setRule(target.id, { summary, days: f.repeat });
        if (f.repeatOrig) await this._setRule(list.id, { uid: item.uid, summary: item.summary, days: null });
        if (f.points) await this._setTaskPoints(target.id, summary, f.points);
        if (f.pointsOrig) await this._setTaskPoints(list.id, item.summary, 0);
        await this._call("remove_item", { item: [f.key] }, list.id);
        this._showToast(`Movido para ${clip(target.name, 28)}`);
      }
      return;
    }

    const data = { item: f.key };
    if (summary !== item.summary) data.rename = summary;
    if (has(list.features, F.DESCRIPTION) && description !== (item.description || "")) {
      data.description = description || null;
    }
    const before = parseDue(item.due);
    const changedDue = (before ? before.date : null) !== (f.date || null) || (before ? before.time : null) !== (f.time || null);
    if (changedDue) Object.assign(data, this._dueFields(list, f.date, f.time, true));
    this._closeSheet();
    if ((f.points || 0) !== (f.pointsOrig || 0) || (f.pointsOrig && summary !== item.summary)) {
      await this._setTaskPoints(list.id, summary, f.points || 0, summary !== item.summary ? item.summary : null);
    }
    if ((f.repeat || 0) !== (f.repeatOrig || 0)) {
      await this._setRule(list.id, { uid: item.uid, summary, days: f.repeat });
      if (f.repeat) this._showToast(`Repete ${this._everyLabel(f.repeat)} depois de concluir`);
    }
    if (Object.keys(data).length > 1) {
      if (data.rename) this._patchItem(list.id, f.key, { summary });
      await this._call("update_item", data, list.id);
    }
  }

  async _deleteItem() {
    const f = this._form;
    const list = this._list(f.listId);
    const item = list && list.items && list.items.find((i) => keyOf(i) === f.key);
    this._closeSheet();
    if (!list || !item) return;
    this._setItems(
      list.id,
      list.items.filter((i) => keyOf(i) !== f.key),
    );
    this._haptic("warning");
    const ok = await this._call("remove_item", { item: [f.key] }, list.id);
    if (!ok) {
      this._setItems(list.id, list.items);
      return;
    }
    const due = parseDue(item.due);
    this._showToast("Item excluído", {
      label: "Desfazer",
      run: () =>
        this._addFull(list, {
          summary: item.summary,
          description: item.description,
          date: due ? due.date : null,
          time: due ? due.time : null,
        }),
    });
  }

  _confirmClearDone(list) {
    this._openSheet("confirm", {
      title: "Limpar concluídos?",
      text: `${plural(list.done, "item concluído vai", "itens concluídos vão")} ser apagado${list.done === 1 ? "" : "s"} de “${list.name}”.`,
      label: "Limpar",
      run: async () => {
        this._closeSheet();
        this._haptic("warning");
        if (await this._call("remove_completed_items", {}, list.id)) this._showToast("Concluídos apagados");
      },
    });
  }

  _openCustomize(list) {
    this._openSheet("customize", {
      listId: list.id,
      name: list.name === list.origName ? "" : list.name,
      color: list.colorId,
      icon: list.iconPref,
      hidden: list.hidden,
      deadlines: !list.datesInfo,
    });
  }

  async _saveCustomize() {
    const f = this._form;
    const l = this._list(f.listId);
    this._closeSheet();
    await this._saveListPrefs(f.listId, {
      name: (f.name || "").trim() || null,
      color: f.color || null,
      icon: f.icon || null,
      hidden: f.hidden ? true : null,
      dates_info: l && l.canDue && !f.deadlines ? true : null,
    });
  }

  // ------------------------------------------------------------ drag to reorder

  _dragStart(ev, list, item) {
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    ev.preventDefault();
    const handle = ev.currentTarget;
    const row = handle.closest(".item");
    const container = row.parentElement;
    const rows = [...container.querySelectorAll(":scope > .item[data-drag]")];
    const index = rows.indexOf(row);
    if (index < 0) return;
    const scroller = this.renderRoot.querySelector("main");
    const rects = rows.map((r) => r.getBoundingClientRect());
    const startScroll = scroller.scrollTop;
    const mids = rects.map((r) => r.top + r.height / 2 + startScroll);
    const height = rects[index].height;
    const st = { y: ev.clientY, target: index, raf: 0, lastY: ev.clientY };
    try {
      handle.setPointerCapture(ev.pointerId);
    } catch (e) {
      /* ignore */
    }
    row.classList.add("dragging");
    rows.forEach((r, i) => i !== index && r.classList.add("shifting"));
    this._haptic("selection");

    const layout = () => {
      const delta = st.lastY - st.y + (scroller.scrollTop - startScroll);
      row.style.transform = `translateY(${delta}px)`;
      const center = mids[index] + delta;
      let t = 0;
      for (let i = 0; i < rows.length; i++) if (i !== index && mids[i] < center) t++;
      if (t !== st.target) {
        st.target = t;
        this._haptic("selection");
      }
      rows.forEach((r, i) => {
        if (i === index) return;
        let shift = 0;
        if (index < t && i > index && i <= t) shift = -height;
        if (t < index && i >= t && i < index) shift = height;
        r.style.transform = shift ? `translateY(${shift}px)` : "";
      });
    };
    const autoScroll = () => {
      const box = scroller.getBoundingClientRect();
      const edge = 70;
      let dy = 0;
      if (st.lastY < box.top + edge) dy = -Math.ceil((box.top + edge - st.lastY) / 6);
      else if (st.lastY > box.bottom - edge) dy = Math.ceil((st.lastY - (box.bottom - edge)) / 6);
      if (dy) {
        scroller.scrollTop += dy;
        layout();
      }
      st.raf = requestAnimationFrame(autoScroll);
    };
    st.raf = requestAnimationFrame(autoScroll);

    const move = (e) => {
      st.lastY = e.clientY;
      layout();
    };
    const end = () => {
      cancelAnimationFrame(st.raf);
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      rows.forEach((r) => {
        r.classList.remove("shifting", "dragging");
        r.style.transform = "";
      });
      if (st.target !== index) this._commitMove(list, item, rows.map((r) => r.dataset.key), index, st.target);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  async _commitMove(list, item, keys, from, to) {
    const order = keys.slice();
    const [moved] = order.splice(from, 1);
    order.splice(to, 0, moved);
    const previous = to === 0 ? undefined : order[to - 1];
    // Optimistic reorder of the full list (completed items keep their spots).
    const items = list.items.slice();
    const curIdx = items.findIndex((i) => keyOf(i) === moved);
    const [obj] = items.splice(curIdx, 1);
    const prevIdx = previous ? items.findIndex((i) => keyOf(i) === previous) : -1;
    items.splice(prevIdx + 1, 0, obj);
    this._setItems(list.id, items);
    const msg = { type: "todo/item/move", entity_id: list.id, uid: moved };
    if (previous) msg.previous_uid = previous;
    try {
      await this.hass.callWS(msg);
    } catch (e) {
      this._setItems(list.id, list.items);
      this._showToast("Não deu para reordenar esta lista");
    }
  }

  // ------------------------------------------------------------ render

  render() {
    if (!this.hass) return nothing;
    const dark = this._dark;
    const accent = this._accent();
    const view = this._view();
    const viewList = view.name === "list" ? this._list(view.id) : null;
    const local = viewList ? viewList.color : accent;
    const style =
      `--rv-accent:${local.fill};--rv-accent-ink:${dark ? local.fill : local.ink};` +
      `--rv-accent-soft:${hexToRgba(local.fill, dark ? 0.18 : 0.14)};--rv-accent-ink-light:${local.ink};`;
    let page;
    if (view.name === "list") page = this._renderList(view.id);
    else if (view.name === "due") page = this._renderDue();
    else if (view.name === "search") page = this._renderSearch();
    else if (view.name === "more") page = this._renderMore();
    else page = this._renderHome();

    return html`
      <div class="root" style=${style}>
        <div class="app">
          ${!this.env || this.env.topbar
            ? html`<header class="topbar">
                <button class="icon-btn" @click=${this._toggleMenu} aria-label="Menu">${icon("menu")}</button>
                <div class="title">${(this.panel && this.panel.title) || "ResolvIA"}</div>
              </header>`
            : nothing}
          ${this.hass.connected === false
            ? html`<div class="offline">${icon("wifi-off")}<span>Sem conexão com o Home Assistant. Reconectando…</span></div>`
            : nothing}
          <main>${page}</main>
          ${this._renderNav(view)}
        </div>
        ${this._renderSheet()} ${this._renderToast()} ${this._renderCamera()}
        ${this._canImport()
          ? html`<input id="rv-photos" class="sr" type="file" accept="image/*" ?multiple=${!this._isHaAndroid()} tabindex="-1" aria-hidden="true" @change=${(e) => this._onFiles(e)} />
              <input id="rv-scan" class="sr" type="file" accept="image/*" capture="environment" tabindex="-1" aria-hidden="true" @change=${(e) => this._onFiles(e)} />`
          : nothing}
      </div>
    `;
  }

  _renderNav(view) {
    const lateCount = this._visible().reduce((n, l) => n + l.late + l.today, 0);
    const tab = (name, path, label, ic, badge = 0) => html`
      <button class="tab ${view.name === name || (name === "home" && view.name === "list") ? "on" : ""}" @click=${() => this._goTab(path)} aria-label=${label}>
        ${icon(ic)}<span>${label}</span>
        ${badge ? html`<span class="badge">${badge > 99 ? "99+" : badge}</span>` : nothing}
      </button>
    `;
    return html`
      <nav>
        <div class="tabs">
          ${tab("home", "", "Listas", "list-checks")} ${tab("search", "/buscar", "Buscar", "search")}
          <button class="tab fab" @click=${() => this._openAdd(view.name === "list" ? view.id : null)} aria-label="Adicionar item">
            <span class="pill">${icon("plus")}</span><span>Adicionar</span>
          </button>
          ${tab("due", "/prazos", "Prazos", "calendar-clock", lateCount)} ${tab("more", "/mais", "Mais", "sliders-horizontal")}
        </div>
      </nav>
    `;
  }

  // ---------- page header (same pattern as EconomIA / InventarIA)

  _renderPageHead(title, status) {
    const name = ((this.hass.user && this.hass.user.name) || "").trim().split(/\s+/)[0];
    const offline = this.hass.connected === false;
    const st = offline ? { text: "Reconectando ao Home Assistant…", tone: "off" } : status;
    return html`<header class="brand-head">
      <p class="eyebrow"><span class="brand">Resolv<span>IA</span></span>${name ? ` · Olá, ${name}` : ""}</p>
      <h1 class="page-title">${title}</h1>
      ${st ? html`<p class="status"><span class="dot ${st.tone || ""}" aria-hidden="true"></span><span>${st.text}</span></p>` : nothing}
    </header>`;
  }

  // ---------- home

  _renderHome() {
    const lists = this._visible();
    const hiddenCount = this._L.length - lists.length;
    const pending = lists.reduce((n, l) => n + l.pending, 0);
    const late = lists.reduce((n, l) => n + l.late, 0);
    const today = lists.reduce((n, l) => n + l.today, 0);
    const withPending = lists.filter((l) => l.pending > 0).length;
    const subBits = [];
    if (pending) subBits.push(`em ${plural(withPending, "lista", "listas")}`);
    if (today) subBits.push(`${today} pra hoje`);
    if (late) subBits.push(`${plural(late, "atrasado", "atrasados")}`);

    const groupBy = this._app("group_by_device", true);
    const groups = [];
    if (groupBy) {
      for (const l of lists) {
        const g = l.group || "";
        let grp = groups.find((x) => x.name === g);
        if (!grp) groups.push((grp = { name: g, lists: [] }));
        grp.lists.push(l);
      }
      groups.sort((a, b) => (a.name ? 1 : 0) - (b.name ? 1 : 0));
    } else groups.push({ name: null, lists });

    return html`
      <section class="page">
        ${this._renderPageHead("Minhas listas", {
          text: `${plural(lists.length, "lista", "listas")} · ao vivo com o Home Assistant`,
        })}

        <div class="hero">
          <div class="rings">${Array.from({ length: 9 }, () => html`<span class="ring"></span>`)}</div>
          <div class="hero-card">
            <div class="hero-kicker">${greeting(this.hass.user && this.hass.user.name)}</div>
            ${pending
              ? html`<div class="hero-big">${pending}<small>${pending === 1 ? "pendente" : "pendentes"}</small></div>
                  <div class="hero-sub">${subBits.join(" · ")}</div>`
              : html`<div class="hero-big">Tudo<small>resolvido</small></div>
                  <div class="hero-sub">Nenhum item pendente. Aproveita.</div>
                  <div class="stamp">RESOLVIDO</div>`}
            <div class="hero-fold"></div>
          </div>
        </div>

        ${this._L.length === 0
          ? html`<div class="panel">
              <div class="empty">
                <div class="em-icon">${icon("clipboard-list")}</div>
                <h3>Nenhuma lista ainda</h3>
                <p>Crie uma lista em Configurações › Dispositivos e serviços › Adicionar integração › “Lista de tarefas local”.</p>
              </div>
            </div>`
          : html`
              ${groups.map(
                (g) => html`
                  <div class="panel">
                    ${groupBy && (g.name || groups.length > 1) ? html`<div class="overline">${g.name || "Listas"}</div>` : nothing}
                    ${g.lists.map((l) => this._renderListCard(l, !groupBy))}
                  </div>
                `,
              )}
            `}
        ${hiddenCount
          ? html`<button class="text-btn" style="display:block;margin:-4px auto 10px" @click=${() => this._go("/mais")}>${plural(hiddenCount, "lista oculta", "listas ocultas")} · ver em Mais</button>`
          : nothing}
        ${this.hass.user && this.hass.user.is_admin
          ? html`<button class="pick ghost" style="margin:4px auto 0;display:flex" @click=${() => this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
              ${icon("list-plus")}<span>Nova lista</span>
            </button>`
          : nothing}
      </section>
    `;
  }

  _renderListCard(l, showGroup) {
    const total = l.pending + l.done;
    const pct = total ? Math.round((l.done / total) * 100) : 0;
    const meta = [];
    if (l.unavailable) meta.push(html`<span>Indisponível</span>`);
    else if (!l.items) meta.push(html`<span>Carregando…</span>`);
    else {
      meta.push(html`<span>${l.pending ? plural(l.pending, "pendente", "pendentes") : "Tudo resolvido"}${l.done ? ` · ${l.done} ${l.done === 1 ? "feito" : "feitos"}` : ""}</span>`);
      if (l.late) meta.push(html`<span class="tag late">${icon("circle-alert")}${l.late}</span>`);
      else if (l.today) meta.push(html`<span class="tag today">${icon("clock")}${l.today} hoje</span>`);
    }
    return html`
      <button class="list-card ${l.unavailable ? "off" : ""}" style=${colorVars(l.color, this._dark)} @click=${() => this._go(`/lista/${l.id}`)}>
        <span class="tile">${icon(l.icon)}</span>
        <span class="lc-main">
          <span class="lc-title">${l.name}</span>
          <span class="lc-meta">${showGroup && l.group ? html`<span>${l.group} ·</span>` : nothing}${meta}</span>
          ${total ? html`<span class="bar"><i style="width:${pct}%"></i></span>` : nothing}
        </span>
        <span class="lc-num ${l.pending ? "" : "zero"}">${l.pending || icon("circle-check")}</span>
      </button>
    `;
  }

  // ---------- list detail

  _renderList(id) {
    const l = this._list(id);
    if (!l) {
      return html`<section class="page">
        <div class="panel">
          <div class="empty">
            <div class="em-icon">${icon("circle-alert")}</div>
            <h3>Lista não encontrada</h3>
            <p>Ela pode ter sido removida ou renomeada no Home Assistant.</p>
          </div>
        </div>
        <button class="btn outline" style="width:100%" @click=${() => this._go("", true)}>Voltar para o início</button>
      </section>`;
    }
    const canCreate = has(l.features, F.CREATE) && !l.unavailable;
    const canUpdate = has(l.features, F.UPDATE);
    const canMove = has(l.features, F.MOVE);
    const canDelete = has(l.features, F.DELETE);
    const items = l.items;
    const pending = items ? items.filter((i) => !isDone(i) || this._recent.has(keyOf(i))) : [];
    const done = items ? items.filter((i) => isDone(i) && !this._recent.has(keyOf(i))) : [];
    const total = items ? items.length : 0;
    const doneOpen = this._doneOpen[id] !== undefined ? this._doneOpen[id] : this._app("show_done", false);

    return html`
      <section class="page" style=${colorVars(l.color, this._dark)}>
        <div class="detail-head">
          <button class="icon-btn" @click=${() => this._back()} aria-label="Voltar">${icon("chevron-left")}</button>
          <div class="dh-text">
            ${l.group ? html`<div class="overline">${l.group}</div>` : nothing}
            <h1 class="display">${l.name}</h1>
          </div>
          <button class="icon-btn" @click=${() => this._openSheet("listmenu", { listId: l.id })} aria-label="Opções da lista">${icon("ellipsis")}</button>
        </div>

        ${total
          ? html`<div class="progress">
              <span>${l.done} de ${total} resolvidos</span>
              <span class="bar"><i style="width:${Math.round((l.done / total) * 100)}%"></i></span>
            </div>`
          : nothing}
        ${canCreate
          ? html`<div class="quick">
              <form @submit=${(e) => this._quickAdd(e, l)}>
                <input type="text" enterkeyhint="done" autocomplete="off" placeholder="Adicionar item…" aria-label="Novo item" @paste=${(e) => this._onQuickPaste(e, l)} />
                ${this._canImport()
                  ? html`<button class="imp-btn" type="button" aria-label="Importar de mensagem ou foto" @click=${() => this._openImport(l.id)}>${icon("scan-text")}</button>`
                  : nothing}
                <button class="add-btn" type="submit" aria-label="Adicionar">${icon("plus")}</button>
              </form>
            </div>`
          : nothing}
        ${l.unavailable
          ? html`<div class="panel"><div class="empty"><div class="em-icon">${icon("circle-alert")}</div><h3>Lista indisponível</h3><p>O Home Assistant não está conseguindo falar com a integração desta lista agora.</p></div></div>`
          : !items
            ? html`<div class="panel">${[70, 52, 84].map((w) => html`<div class="skeleton" style="width:${w}%"></div>`)}</div>`
            : pending.length
              ? html`<div class="panel items">
                  ${repeat(pending, keyOf, (i) => this._renderItem(l, i, { draggable: canMove && canUpdate && !isDone(i) }))}
                </div>`
              : html`<div class="panel">
                  <div class="empty">
                    ${total
                      ? html`<div class="big-stamp">RESOLVIDO</div>
                          <h3>Nada pendente</h3>
                          <p>Tudo nesta lista foi feito.</p>`
                      : html`<div class="em-icon">${icon(l.icon)}</div>
                          <h3>Lista vazia</h3>
                          <p>${canCreate ? "Escreva acima e toque em + para adicionar o primeiro item." : "Esta lista não aceita itens novos por aqui."}</p>`}
                  </div>
                </div>`}
        ${done.length
          ? html`
              <div class="done-head">
                <button class="done-toggle ${doneOpen ? "open" : ""}" @click=${() => (this._doneOpen = { ...this._doneOpen, [id]: !doneOpen })} aria-expanded=${doneOpen ? "true" : "false"}>
                  Concluídos <span class="count">· ${done.length}</span>${icon("chevron-down")}
                </button>
                ${canDelete ? html`<button class="text-btn" @click=${() => this._confirmClearDone(l)}>Limpar</button>` : nothing}
              </div>
              ${doneOpen ? html`<div class="panel items">${repeat(done, keyOf, (i) => this._renderItem(l, i))}</div>` : nothing}
            `
          : nothing}
        ${!canUpdate && items && items.length
          ? html`<p class="foot">Esta lista é só leitura: a integração dela não permite editar itens.</p>`
          : nothing}
      </section>
    `;
  }

  _renderText(text, query) {
    return splitLinks(text).map((seg) =>
      seg.url
        ? html`<a class="lnk" href=${seg.url} target="_blank" rel="noopener noreferrer" @click=${(e) => e.stopPropagation()} title=${seg.url}>${icon(seg.icon)}<span>${seg.label}</span></a>`
        : this._highlight(seg.text, query),
    );
  }

  _highlight(text, query) {
    if (!query) return text;
    const hay = foldKeepLength(text);
    const needle = fold(query);
    if (!needle) return text;
    const out = [];
    let from = 0;
    let at;
    while ((at = hay.indexOf(needle, from)) !== -1) {
      if (at > from) out.push(text.slice(from, at));
      out.push(html`<mark>${text.slice(at, at + needle.length)}</mark>`);
      from = at + needle.length;
    }
    if (from < text.length) out.push(text.slice(from));
    return out;
  }

  _renderItem(l, item, opts = {}) {
    const done = isDone(item);
    const due = !done && dueInfo(item.due);
    const canUpdate = has(l.features, F.UPDATE);
    const rule = this._ruleFor(l.id, item);
    const rep = rule
      ? done && rule.reopen_at
        ? html`<span class="tag rep">${icon("repeat")}volta ${this._returnLabel(rule.reopen_at)}</span>`
        : html`<span class="tag rep">${icon("repeat")}${this._everyLabel(rule.days)}</span>`
      : nothing;
    return html`
      <div class="item ${done ? "done" : ""}" data-key=${keyOf(item)} ?data-drag=${opts.draggable} style=${opts.showList ? colorVars(l.color, this._dark) : ""}>
        <button class="check ${done ? "on" : ""}" role="checkbox" aria-checked=${done ? "true" : "false"} aria-label=${done ? "Marcar como pendente" : "Marcar como resolvido"} ?disabled=${!canUpdate} @click=${() => this._toggle(l, item)}>
          ${icon("check")}
        </button>
        <div class="it-body" @click=${() => canUpdate && this._openEdit(l, item)}>
          <div class="it-text">${this._renderText(item.summary || "", opts.query)}</div>
          ${item.description ? html`<div class="it-desc">${this._renderText(item.description, opts.query)}</div>` : nothing}
          ${due || opts.showList || rule || this._pointsOf(l.id, item.summary)
            ? html`<div class="chips">
                ${opts.showList ? html`<span class="tag list">${icon(l.icon)}${clip(l.name, 24)}</span>` : nothing}
                ${due
                  ? l.datesInfo
                    ? html`<span class="tag info" title="Data da integração, não é prazo">${icon("clock-fading")}${due.text}</span>`
                    : html`<span class="tag ${due.tone === "late" ? "late" : due.tone === "today" ? "today" : ""}">${icon(due.time ? "clock" : "calendar")}${due.text}</span>`
                  : nothing}
                ${rep} ${this._renderPointsTag(l.id, item)}
              </div>`
            : nothing}
        </div>
        ${opts.draggable
          ? html`<button class="grip" aria-label="Arrastar para reordenar" @pointerdown=${(e) => this._dragStart(e, l, item)} @click=${(e) => e.preventDefault()}>${icon("grip-vertical")}</button>`
          : nothing}
      </div>
    `;
  }

  // ---------- due

  _renderDue() {
    const lists = this._visible();
    const supportsDue = lists.some((l) => has(l.features, F.DUE_DATE) || has(l.features, F.DUE_DATETIME));
    const rows = [];
    for (const l of lists) {
      if (l.datesInfo) continue; // dates from the integration, not deadlines
      for (const i of l.items || []) {
        if (isDone(i) && !this._recent.has(keyOf(i))) continue;
        const d = dueInfo(i.due);
        if (d) rows.push({ l, i, d });
      }
    }
    rows.sort((a, b) => a.d.at - b.d.at);
    const buckets = [
      { title: "Atrasados", test: (d) => d.overdue },
      { title: "Hoje", test: (d) => d.diff === 0 },
      { title: "Amanhã", test: (d) => d.diff === 1 },
      { title: "Próximos 7 dias", test: (d) => d.diff > 1 && d.diff < 7 },
      { title: "Mais adiante", test: () => true },
    ];
    const used = new Set();
    const groups = buckets
      .map((b) => {
        const list = rows.filter((r) => !used.has(r) && b.test(r.d));
        list.forEach((r) => used.add(r));
        return { ...b, rows: list };
      })
      .filter((g) => g.rows.length);

    // Recurring tasks waiting to come back.
    const coming = this._rules
      .filter((r) => r.reopen_at)
      .map((r) => {
        const l = this._list(r.entity_id);
        const item = l && l.items && r.uid ? l.items.find((i) => i.uid === r.uid) : null;
        return { r, l, item };
      })
      .filter((x) => x.l && !x.l.hidden)
      .sort((a, b) => a.r.reopen_at - b.r.reopen_at);
    const comingPanel = coming.length
      ? html`<div class="panel items">
          <div class="overline">Voltam sozinhas · ${coming.length}</div>
          ${repeat(
            coming,
            (x) => x.r.id,
            (x) =>
              x.item
                ? this._renderItem(x.l, x.item, { showList: true })
                : html`<div class="item done" style=${colorVars(x.l.color, this._dark)}>
                    <span class="check on">${icon("repeat")}</span>
                    <div class="it-body" @click=${() => this._go(`/lista/${x.l.id}`)}>
                      <div class="it-text">${x.r.summary}</div>
                      <div class="chips">
                        <span class="tag list">${icon(x.l.icon)}${clip(x.l.name, 24)}</span>
                        <span class="tag rep">${icon("repeat")}volta ${this._returnLabel(x.r.reopen_at)}</span>
                      </div>
                    </div>
                  </div>`,
          )}
        </div>`
      : nothing;

    return html`
      <section class="page">
        ${this._renderPageHead("Prazos", (() => {
          const late = rows.filter((r) => r.d.overdue).length;
          const today = rows.filter((r) => !r.d.overdue && r.d.diff === 0).length;
          const bits = [];
          if (late) bits.push(plural(late, "atrasado", "atrasados"));
          if (today) bits.push(`${today} para hoje`);
          if (coming.length) bits.push(`${coming.length} ${coming.length === 1 ? "volta" : "voltam"} sozinha${coming.length === 1 ? "" : "s"}`);
          return { text: bits.length ? bits.join(" · ") : "Nada atrasado", tone: late ? "late" : "" };
        })())}
        ${groups.length || coming.length
          ? [groups.map(
              (g) => html`
                <div class="panel items">
                  <div class="overline" style=${g.title === "Atrasados" ? "color:var(--rv-late)" : ""}>${g.title} · ${g.rows.length}</div>
                  ${repeat(g.rows, (r) => r.l.id + keyOf(r.i), (r) => this._renderItem(r.l, r.i, { showList: true }))}
                </div>
              `,
            ), comingPanel]
          : html`<div class="panel">
              <div class="empty">
                <div class="em-icon">${icon("calendar-days")}</div>
                ${supportsDue
                  ? html`<h3>Nada com prazo</h3>
                      <p>Quando um item tiver data, ele aparece aqui. Toque num item para definir um prazo.</p>`
                  : html`<h3>Sem prazos por aqui</h3>
                      <p>Suas listas atuais não aceitam datas. Listas locais (“Lista de tarefas local”), Google Tasks e CalDAV aceitam.</p>`}
              </div>
            </div>`}
      </section>
    `;
  }

  // ---------- search

  _renderSearch() {
    const q = this._query.trim();
    const needle = fold(q);
    const results = [];
    let count = 0;
    if (needle) {
      for (const l of this._L) {
        const hits = (l.items || []).filter(
          (i) => (this._searchDone || !isDone(i)) && (fold(i.summary).includes(needle) || fold(i.description).includes(needle)),
        );
        if (hits.length) {
          hits.sort((a, b) => Number(isDone(a)) - Number(isDone(b)));
          results.push({ l, hits });
          count += hits.length;
        }
      }
    }
    return html`
      <section class="page">
        ${this._renderPageHead("Buscar", { text: `Em ${plural(this._L.length, "lista", "listas")} · acentos não importam` })}
        <label class="search-box">
          ${icon("search")}
          <input type="search" placeholder="Buscar em todas as listas" .value=${this._query} @input=${(e) => (this._query = e.target.value)} autofocus enterkeyhint="search" aria-label="Buscar" />
          ${this._query ? html`<button class="icon-btn" style="width:40px;height:40px" @click=${() => (this._query = "")} aria-label="Limpar">${icon("x")}</button>` : nothing}
        </label>
        <div class="filters">
          <button class="pick ${this._searchDone ? "on" : ""}" @click=${() => (this._searchDone = !this._searchDone)}>${icon("circle-check")}<span>Incluir concluídos</span></button>
        </div>
        ${!needle
          ? html`<p class="page-sub" style="margin-top:0">Procure por qualquer palavra, em todas as listas.</p>`
          : results.length
            ? html`<p class="page-sub" style="margin-top:0">${plural(count, "resultado", "resultados")}</p>
                ${results.map(
                  ({ l, hits }) => html`
                    <div class="panel items" style=${colorVars(l.color, this._dark)}>
                      <div class="overline">${l.name}${l.group ? ` · ${l.group}` : ""}</div>
                      ${repeat(hits, keyOf, (i) => this._renderItem(l, i, { query: q }))}
                    </div>
                  `,
                )}`
            : html`<div class="panel"><div class="empty"><div class="em-icon">${icon("search")}</div><h3>Nada encontrado</h3><p>Nenhum item com “${clip(q, 30)}”.</p></div></div>`}
      </section>
    `;
  }

  // ---------- more / settings

  /**
   * Mais is split in tabs at the top, like the CronologIA: /mais (Listas),
   * /mais/repeticoes, /mais/integracoes (Recompensas, IA), /mais/dados, /mais/aparencia. Switching tabs
   * replaces the history entry, so Back leaves Mais.
   */
  _moreTabs() {
    return [
      ["listas", "Listas", "list-checks"],
      ...(this._rulesOk ? [["repeticoes", "Repetições", "repeat"]] : []),
      ...(this.hass.resolvia ? [["integracoes", "Integrações", "blocks"]] : []),
      ...(this._data() ? [["dados", "Dados", "archive"]] : []),
      ["aparencia", "Aparência", "palette"],
    ];
  }

  _renderMore() {
    const tabs = this._moreTabs();
    const want = this._view().tab;
    const tab = tabs.some((t) => t[0] === want) ? want : "listas";
    const go = (k) => {
      if (k === tab) return;
      this._haptic("light");
      this._go(k === "listas" ? "/mais" : `/mais/${k}`, true);
    };
    let body;
    let status = { text: `ResolvIA ${VERSION}${this._prefsRemote ? " · personalizações sincronizadas" : ""}` };
    if (tab === "repeticoes") body = this._renderRulesTab();
    else if (tab === "integracoes") body = html`${this._renderRewardsPanel()} ${this._renderAiPanel()}`;
    else if (tab === "dados") body = this._renderDataPanel();
    else if (tab === "aparencia") body = this._renderAppearanceTab();
    else {
      body = this._renderListsTab();
      const hidden = this._L.filter((l) => l.hidden).length;
      status = { text: this._L.length ? `${plural(this._L.length, "lista", "listas")}${hidden ? ` · ${plural(hidden, "oculta", "ocultas")}` : ""}` : "Nenhuma lista ainda" };
    }
    return html`
      <section class="page">
        ${this._renderPageHead("Mais", status)}
        <div class="seg compact more-tabs" role="tablist" aria-label="Seções">
          ${tabs.map(([k, label, ic]) => html`<button class=${tab === k ? "on" : ""} role="tab" aria-selected=${tab === k ? "true" : "false"} @click=${() => go(k)}>${icon(ic)}<span>${label}</span></button>`)}
        </div>
        <div role="tabpanel" aria-label=${tabs.find((t) => t[0] === tab)[1]}>${body}</div>
        <p class="foot"><b>ResolvIA</b><br />v${VERSION} · usa as listas nativas do Home Assistant.<br />${this._prefsRemote ? "Personalizações sincronizadas entre aparelhos." : "Personalizações salvas neste aparelho."}</p>
      </section>
    `;
  }

  /** Mais › Listas: name, color, icon and show/hide of each list; new lists. */
  _renderListsTab() {
    const sw = (on, label, ev) => html`<label class="switch"><input type="checkbox" role="switch" .checked=${on} @change=${ev} aria-label=${label} /><span class="track"></span></label>`;
    return html`
        <div class="panel">
          <div class="overline">Listas</div>
          ${this._L.length
            ? this._L.map(
                (l) => html`
                  <div class="row" style=${colorVars(l.color, this._dark)}>
                    <button class="tile" @click=${() => this._openCustomize(l)} aria-label="Personalizar ${l.name}">${icon(l.icon)}</button>
                    <button class="grow" style="text-align:left" @click=${() => this._openCustomize(l)}>
                      <div class="label">${l.name}</div>
                      <div class="hint">${l.group || l.id}</div>
                    </button>
                    ${sw(!l.hidden, `Mostrar ${l.name}`, (e) => this._saveListPrefs(l.id, { hidden: e.target.checked ? null : true }))}
                  </div>
                `,
              )
            : html`<div class="row"><div class="hint">Nenhuma lista encontrada.</div></div>`}
        </div>

        ${this.hass.user && this.hass.user.is_admin
          ? html`<div class="panel">
              <button class="row" @click=${() => this._openInHA("/config/integrations/dashboard/add?domain=local_todo")}>
                <span class="tile" style=${colorVars(this._accent(), this._dark)}>${icon("list-plus")}</span>
                <span class="grow"><div class="label">Criar nova lista</div><div class="hint">Lista de tarefas local do Home Assistant</div></span>
                ${icon("chevron-right")}
              </button>
              <button class="row" @click=${() => this._openInHA("/todo")}>
                <span class="tile" style=${colorVars(PALETTE[9], this._dark)}>${icon("external-link")}</span>
                <span class="grow"><div class="label">Abrir listas padrão do HA</div><div class="hint">A tela original de tarefas</div></span>
                ${icon("chevron-right")}
              </button>
            </div>`
          : nothing}

    `;
  }

  /** Mais › Repetições: the tasks that come back by themselves. */
  _renderRulesTab() {
    return html`<div class="panel">
              <div class="overline">Tarefas que se repetem</div>
              ${this._rules.length
                ? this._rules.map((r) => {
                    const l = this._list(r.entity_id);
                    if (!l) return nothing;
                    return html`<div class="row" style=${colorVars(l.color, this._dark)}>
                      <span class="tile">${icon("repeat")}</span>
                      <button class="grow" style="text-align:left" @click=${() => this._go(`/lista/${l.id}`)}>
                        <div class="label">${r.summary || r.match}</div>
                        <div class="hint">${l.name} · ${this._everyLabel(r.days)}${r.reopen_at ? ` · volta ${this._returnLabel(r.reopen_at)}` : ""}</div>
                      </button>
                      <button class="icon-btn" style="color:var(--rv-muted)" aria-label="Parar de repetir" @click=${() => this._setRule(r.entity_id, { uid: r.uid, summary: r.match || r.summary, days: null })}>${icon("x")}</button>
                    </div>`;
                  })
                : html`<div class="row"><div class="hint" style="white-space:normal">Nenhuma ainda. Abra um item e escolha “Repetir depois de concluir” — ex.: passar pano 3 dias depois de feito.</div></div>`}
            </div>`;
  }

  /** Mais › Aparência: theme, color and how the lists show. */
  _renderAppearanceTab() {
    const accent = this._app("accent", "vermelho");
    const sw = (on, label, ev) => html`<label class="switch"><input type="checkbox" role="switch" .checked=${on} @change=${ev} aria-label=${label} /><span class="track"></span></label>`;
    return html`
        <div class="panel">
          <div class="overline">Aparência</div>
          <div class="row col">
            <div class="label">Tema</div>
            <div class="seg" role="radiogroup" aria-label="Tema">
              ${[
                ["auto", "Automático", "sun-moon"],
                ["light", "Claro", "sun"],
                ["dark", "Escuro", "moon"],
              ].map(([k, label, ic]) => html`<button class=${this._theme === k ? "on" : ""} role="radio" aria-checked=${this._theme === k ? "true" : "false"} @click=${() => this._setTheme(k)}>${icon(ic)}${label}</button>`)}
            </div>
            <div class="hint" style="white-space:normal">${this._theme === "auto" ? "Segue o modo claro/escuro do Home Assistant." : "Vale só para este aparelho."}</div>
          </div>
          <div class="row col">
            <div class="label">Cor do app</div>
            <div class="swatches">
              ${PALETTE.map(
                (c) => html`<button class="sw ${accent === c.id ? "on" : ""}" style="--c:${c.fill}" aria-label=${c.label} @click=${() => this._saveAppPrefs({ accent: c.id === "vermelho" ? null : c.id })}>${accent === c.id ? icon("check") : nothing}</button>`,
              )}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="overline">Exibição</div>
          <div class="row">
            <div class="grow"><div class="label">Agrupar por dispositivo</div><div class="hint">Ex.: as listas da Alexa juntas</div></div>
            ${sw(this._app("group_by_device", true), "Agrupar por dispositivo", (e) => this._saveAppPrefs({ group_by_device: e.target.checked }))}
          </div>
          <div class="row">
            <div class="grow"><div class="label">Concluídos abertos</div><div class="hint">Mostra os concluídos sem precisar tocar</div></div>
            ${sw(this._app("show_done", false), "Concluídos abertos", (e) => this._saveAppPrefs({ show_done: e.target.checked }))}
          </div>
        </div>

    `;
  }

  _renderAiPanel() {
    if (!this.hass.resolvia) return nothing;
    const ai = this._aiInfo();
    const ents = ai.entities || [];
    const sel = this._app("ai_entity", "");
    const tone = this._aiChecking ? "off" : ai.ready && ai.images ? "ok" : ai.ready ? "warn" : "bad";
    const title = this._aiChecking ? "Verificando…" : ai.ready && ai.images ? "Pronta para ler fotos" : ai.ready ? "Só lê mensagens" : "Não configurada";
    let detail = "";
    if (ai.ready && ai.using) {
      detail = `Usando ${ai.using.name}${sel ? "" : " (a IA padrão do Home Assistant)"}.`;
      if (ai.photos) detail += ` Para fotos, ${ai.photos.name}.`;
    }
    if (ai.reason) detail = `${detail} ${ai.reason}`.trim();
    return html`<div class="panel" id="leitura-ia">
      <div class="overline">Leitura por IA</div>
      <p class="panel-lead">Separa os itens de mensagens coladas, prints e fotos de listas em papel. Usa a integração de IA configurada no Home Assistant (Anthropic Claude, OpenAI, Google Gemini ou um modelo local pelo Ollama); o app não guarda nenhuma chave.</p>
      <div class="ai-state ${tone}"><span class="dot"></span><div><b>${title}</b>${detail ? html`<span>${detail}</span>` : nothing}</div></div>
      ${ents.length || sel
        ? html`<label class="field" style="margin:14px 0 0">
            <span class="flabel">IA usada pelo app</span>
            <select class="select" aria-label="IA usada pelo app" @change=${(e) => this._chooseAi(e.target.value)}>
              <option value="" ?selected=${!sel}>Padrão do Home Assistant</option>
              ${ents.map((e) => html`<option value=${e.id} ?selected=${e.id === sel}>${e.name}${e.images ? "" : " (só texto)"}${e.available ? "" : " (indisponível)"}</option>`)}
              ${sel && !ents.some((e) => e.id === sel) ? html`<option value=${sel} selected>${sel} (não encontrada)</option>` : nothing}
            </select>
            <span class="field-hint">${icon("sparkles")}<span>“Padrão do Home Assistant” usa a IA preferida definida em Configurações › Sistema › Geral.</span></span>
          </label>`
        : nothing}
      <div class="ai-actions"><button class="btn outline" ?disabled=${this._aiChecking} @click=${() => this._refreshAi()}>${icon("rotate-ccw")}Verificar de novo</button></div>
      ${ai.ready && ai.images
        ? nothing
        : html`<div class="steps-box">
            <b>Como configurar</b>
            <ol class="steps">
              <li>No Home Assistant, abra Configurações › Dispositivos e serviços › Adicionar integração.</li>
              <li>Escolha a IA: Anthropic (Claude), OpenAI, Google Gemini ou Ollama (modelo local, de graça). Cole a chave de API quando pedir.</li>
              <li>Na integração, adicione uma tarefa de IA (AI Task). Para ler fotos, use um modelo que entenda imagens.</li>
              <li>Volte aqui e escolha essa IA na lista.</li>
            </ol>
          </div>`}
    </div>`;
  }

  // ---------- sheets

  _renderSheet() {
    if (!this._sheet) return nothing;
    let body = nothing;
    if (this._sheet === "item") body = this._renderItemSheet();
    else if (this._sheet === "listmenu") body = this._renderListMenu();
    else if (this._sheet === "customize") body = this._renderCustomize();
    else if (this._sheet === "confirm") body = this._renderConfirm();
    else if (this._sheet === "import") body = this._renderImportSheet();
    else if (this._sheet === "versions") body = this._renderVersions();
    else if (this._sheet === "who") body = this._renderWhoSheet();
    return html`
      <div class="scrim" @click=${() => this._closeSheet()}></div>
      <div class="sheet" role="dialog" aria-modal="true" style=${this._sheetStyle()} @keydown=${(e) => e.key === "Escape" && this._closeSheet()}>
        <div class="grab"></div>
        ${body}
      </div>
    `;
  }

  _sheetStyle() {
    const f = this._form || {};
    const l = this._list(f.target || f.listId);
    const c = this._sheet === "customize" ? colorById(f.color) || (l && l.color) : l && l.color;
    if (!c) return "";
    return `--rv-accent:${c.fill};--rv-accent-ink:${this._dark ? c.fill : c.ink};--rv-accent-soft:${hexToRgba(c.fill, this._dark ? 0.18 : 0.14)};${colorVars(c, this._dark)}`;
  }

  _renderItemSheet() {
    const f = this._form;
    const src = this._list(f.listId);
    const target = this._list(f.target) || src;
    if (!src || !target) return nothing;
    const feat = target.features;
    const canDesc = has(feat, F.DESCRIPTION);
    const canDate = has(feat, F.DUE_DATE) || has(feat, F.DUE_DATETIME);
    const canTime = has(feat, F.DUE_DATETIME);
    const canDelete = f.mode === "edit" && has(src.features, F.DELETE);
    const quick = quickDates();
    const isQuick = quick.some((q) => q.date === f.date);
    const targets =
      f.mode === "add"
        ? this._L.filter((l) => has(l.features, F.CREATE) && !l.unavailable && (!l.hidden || l.id === f.target))
        : has(src.features, F.DELETE)
          ? this._L.filter((l) => has(l.features, F.CREATE) && !l.unavailable && (!l.hidden || l.id === src.id))
          : [];
    const openPicker = (sel) => {
      const input = this.renderRoot.querySelector(sel);
      if (!input) return;
      try {
        input.showPicker();
      } catch (e) {
        input.focus();
        input.click();
      }
    };
    return html`
      <div class="sheet-head">
        <h3 class="display">${f.mode === "add" ? "Novo item" : "Editar item"}</h3>
        <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
      </div>
      ${f.mode === "add" && this._canImport()
        ? html`<div class="imp-strip">
            <button @click=${() => this._openImport(f.target, "text")}>${icon("clipboard-paste")}<span>Colar mensagem</span></button>
            <button @click=${() => this._openImport(f.target, "photos")}>${icon("images")}<span>Escolher fotos</span></button>
            <button @click=${() => this._openImport(f.target, "scan")}>${icon("scan-text")}<span>Digitalizar com IA</span></button>
          </div>`
        : nothing}
      <label class="field">
        <span class="flabel">Item</span>
        <textarea rows="2" .value=${f.summary} @input=${(e) => this._setForm({ summary: e.target.value })} @keydown=${(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), this._saveItem())} placeholder="O que precisa ser resolvido?"></textarea>
      </label>
      ${canDesc
        ? html`<label class="field">
            <span class="flabel">Notas</span>
            <textarea rows="3" .value=${f.description} @input=${(e) => this._setForm({ description: e.target.value })} placeholder="Detalhes, links…"></textarea>
          </label>`
        : nothing}
      ${canDate
        ? html`<div class="field">
            <span class="flabel">Prazo</span>
            <div class="chip-row">
              ${quick.map((q) => html`<button class="pick ${f.date === q.date ? "on" : ""}" @click=${() => this._setForm({ date: f.date === q.date ? null : q.date })}>${q.label}</button>`)}
              <button class="pick ${f.date && !isQuick ? "on" : ""}" @click=${() => openPicker("#rv-date")}>
                ${icon("calendar")}<span>${f.date && !isQuick ? shortDate(f.date) : "Outra data"}</span>
                <input id="rv-date" class="hidden-input" type="date" tabindex="-1" .value=${f.date || ""} @change=${(e) => this._setForm({ date: e.target.value || null })} />
              </button>
              ${f.date ? html`<button class="pick ghost" @click=${() => this._setForm({ date: null, time: null })}>${icon("x")}<span>Sem prazo</span></button>` : nothing}
            </div>
            ${canTime && f.date
              ? html`<div class="time-row">
                  <span class="tl">Horário</span>
                  <input type="time" .value=${f.time || ""} @change=${(e) => this._setForm({ time: e.target.value || null })} />
                  ${f.time ? html`<button class="text-btn" @click=${() => this._setForm({ time: null })}>Dia todo</button>` : nothing}
                </div>`
              : nothing}
          </div>`
        : nothing}
      ${this._rulesOk && (has(feat, F.UPDATE) || has(feat, F.CREATE))
        ? html`<div class="field">
            <span class="flabel">Repetir depois de concluir</span>
            <div class="chip-row">
              <button class="pick ${!f.repeat ? "on" : ""}" @click=${() => this._setForm({ repeat: 0, repeatCustom: false })}>Não</button>
              ${REPEAT_PICKS.map(
                (p) => html`<button class="pick ${f.repeat === p.days && !f.repeatCustom ? "on" : ""}" @click=${() => this._setForm({ repeat: p.days, repeatCustom: false })}>${p.label}</button>`,
              )}
              <button class="pick ${f.repeatCustom ? "on" : ""}" @click=${() => this._setForm({ repeatCustom: true, repeat: f.repeat || 4 })}>${icon("repeat")}<span>Outro</span></button>
            </div>
            ${f.repeatCustom
              ? html`<div class="time-row">
                  <span class="tl">A cada</span>
                  <input type="number" inputmode="numeric" min="1" max="365" class="num" .value=${String(f.repeat || "")} @input=${(e) => this._setForm({ repeat: Math.max(0, Math.min(365, parseInt(e.target.value, 10) || 0)) })} />
                  <span class="tl">dias</span>
                </div>`
              : nothing}
            ${f.repeat
              ? html`<div class="field-hint">${icon("repeat")}<span>Quando você concluir, volta sozinha ${f.repeat === 1 ? "no dia seguinte" : `em ${f.repeat} dias`} (no começo do dia).</span></div>`
              : nothing}
          </div>`
        : nothing}
      ${this._renderPointsField(f)}
      ${targets.length > 1
        ? html`<div class="field">
            <span class="flabel">${f.mode === "add" ? "Lista" : "Lista (mover)"}</span>
            <div class="chip-row">
              ${targets.map((t) => html`<button class="pick list ${f.target === t.id ? "on" : ""}" style=${colorVars(t.color, this._dark)} @click=${() => this._setForm({ target: t.id })}><span class="dot"></span><span>${clip(t.name, 26)}</span></button>`)}
            </div>
          </div>`
        : nothing}
      <div class="sheet-actions">
        ${canDelete ? html`<button class="btn danger" @click=${() => this._deleteItem()} aria-label="Excluir">${icon("trash")}</button>` : nothing}
        <button class="btn primary" @click=${() => this._saveItem()}>${f.mode === "add" ? "Adicionar" : f.target !== f.listId ? "Mover" : "Salvar"}</button>
      </div>
    `;
  }

  _renderImportSheet() {
    const f = this._form;
    const ai = this._aiInfo();
    const head = (title, back) => html`<div class="sheet-head">
      ${back ? html`<button class="icon-btn back" @click=${back} aria-label="Voltar">${icon("chevron-left")}</button>` : nothing}
      <h3 class="display">${title}</h3>
      <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
    </div>`;
    const toPick = () => {
      this._importToken = 0;
      this._setForm({ step: "pick", error: null, note: null });
    };
    const error = f.error ? html`<div class="imp-error">${icon("circle-alert")}<span>${f.error}</span></div>` : nothing;
    const thumbs = f.images && f.images.length ? html`<div class="thumbs">${f.images.map((img) => html`<img src=${img.url} alt="" />`)}</div>` : nothing;

    if (f.step === "text") {
      return html`
        ${head("Colar mensagem", toPick)}
        <label class="field">
          <span class="flabel">Mensagem</span>
          <textarea rows="7" .value=${f.text} placeholder="Cole aqui a mensagem do WhatsApp, e-mail ou anotação…" @input=${(e) => this._setForm({ text: e.target.value, error: null })}></textarea>
        </label>
        ${error}
        <div class="sheet-actions">
          <button class="btn outline" @click=${() => this._pasteClipboard()}>${icon("clipboard-paste")}Colar</button>
          <button class="btn primary" ?disabled=${!(f.text || "").trim()} @click=${() => this._readText()}>${ai.ready ? icon("sparkles") : nothing}Separar itens</button>
        </div>
        <p class="sheet-note">${ai.ready ? `${ai.using.name} separa os itens, mesmo de mensagens corridas.` : "Sem IA configurada: separo por linhas, vírgulas e “e”."}</p>
      `;
    }

    if (f.step === "loading") {
      return html`
        ${head("Lendo…")}
        ${thumbs}
        <div class="imp-loading">
          <span class="spin">${icon("loader-circle")}</span>
          <span>${f.loadingText || "Lendo…"}</span>
        </div>
        <div class="sheet-actions"><button class="btn outline" @click=${() => (f.prevStep === "review" ? ((this._importToken = 0), this._setForm({ step: "review" })) : toPick())}>Cancelar</button></div>
      `;
    }

    if (f.step === "review") {
      const target = this._list(f.target);
      const chosen = f.items.filter((i) => i.on && i.text.trim()).length;
      const targets = this._L.filter((l) => has(l.features, F.CREATE) && !l.unavailable && (!l.hidden || l.id === f.target));
      const from =
        f.provider === "local" ? "separados por linha" : f.provider ? `lidos por ${f.provider}` : "";
      return html`
        ${head("Revisar itens", toPick)}
        ${thumbs}
        <p class="sheet-note top">${plural(f.items.length, "item encontrado", "itens encontrados")}${from ? ` · ${from}` : ""}. Toque no texto para corrigir.</p>
        ${f.note ? html`<div class="imp-error soft">${icon("sparkles")}<span>${f.note}</span></div>` : nothing}
        <div class="imp-list">
          ${f.items.map(
            (it, i) => html`<div class="imp-row ${it.on ? "" : "off"}">
              <button class="check ${it.on ? "on" : ""}" role="checkbox" aria-checked=${it.on ? "true" : "false"} aria-label="Incluir" @click=${() => this._setImportItem(i, { on: !it.on })}>${icon("check")}</button>
              <input type="text" .value=${it.text} aria-label="Item" @input=${(e) => this._setImportItem(i, { text: e.target.value })} />
              <button class="icon-btn mini" aria-label="Remover" @click=${() => this._setForm({ items: f.items.filter((_, j) => j !== i) })}>${icon("x")}</button>
            </div>`,
          )}
          <button class="pick ghost add-row" @click=${() => {
            this._setForm({ items: [...f.items, { text: "", on: true }] });
            this.updateComplete.then(() => {
              const rows = this.renderRoot.querySelectorAll(".imp-row input");
              if (rows.length) rows[rows.length - 1].focus();
            });
          }}>${icon("plus")}<span>Adicionar linha</span></button>
        </div>
        ${ai.images
          ? html`<div class="more-row">
              <button class="pick" @click=${() => this._pickFiles("photos")}>${icon("images")}<span>Mais fotos</span></button>
              <button class="pick" @click=${() => this._openCamera()}>${icon("scan-text")}<span>Digitalizar mais</span></button>
            </div>`
          : nothing}
        ${targets.length > 1
          ? html`<div class="field">
              <span class="flabel">Adicionar em</span>
              <div class="chip-row">
                ${targets.map((t) => html`<button class="pick list ${f.target === t.id ? "on" : ""}" style=${colorVars(t.color, this._dark)} @click=${() => this._setForm({ target: t.id })}><span class="dot"></span><span>${clip(t.name, 26)}</span></button>`)}
              </div>
            </div>`
          : nothing}
        <div class="sheet-actions">
          <button class="btn primary" ?disabled=${!chosen} @click=${() => this._importAdd()}>
            ${chosen ? `Adicionar ${plural(chosen, "item", "itens")}` : "Nenhum item marcado"}${target && targets.length <= 1 ? ` em ${clip(target.name, 18)}` : ""}
          </button>
        </div>
      `;
    }

    // pick
    return html`
      ${head("Importar itens")}
      <p class="sheet-note top">Traga uma lista pronta de uma mensagem ou de uma foto. ${ai.ready ? "A IA separa os itens e você revisa antes de adicionar." : ""}</p>
      <div class="imp-options">
        <button class="imp-opt" @click=${() => (this._setForm({ step: "text", error: null }), this._focusImportText())}>
          <span class="imp-ic">${icon("message-square-text")}</span>
          <span class="imp-tx"><b>Colar mensagem</b><small>WhatsApp, e-mail, anotação</small></span>
          ${icon("chevron-right")}
        </button>
        <button class="imp-opt" ?disabled=${!ai.images} @click=${() => this._pickFiles("photos")}>
          <span class="imp-ic">${icon("images")}</span>
          <span class="imp-tx"><b>Escolher fotos</b><small>${this._isHaAndroid() ? "Prints e fotos da galeria, uma por vez" : "Prints e fotos da galeria (até 6)"}</small></span>
          ${icon("chevron-right")}
        </button>
        <button class="imp-opt" ?disabled=${!ai.images} @click=${() => this._openCamera()}>
          <span class="imp-ic">${icon("scan-text")}</span>
          <span class="imp-tx"><b>Digitalizar com IA</b><small>Tire uma foto de uma lista em papel</small></span>
          ${icon("chevron-right")}
        </button>
      </div>
      ${!ai.images
        ? html`<div class="imp-error soft">${icon("sparkles")}<span>${ai.reason || "Para ler fotos, o Home Assistant precisa de uma integração de IA com tarefa de IA que entenda imagens."}
            <button class="text-btn inline" @click=${() => this._goAiSettings()}>Ver Leitura por IA</button></span></div>`
        : nothing}
      ${error}
    `;
  }

  _renderListMenu() {
    const l = this._list(this._form.listId);
    if (!l) return nothing;
    return html`
      <div class="sheet-head">
        <h3 class="display">${l.name}</h3>
        <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
      </div>
      <button class="menu-row" @click=${() => this._openCustomize(l)}>${icon("palette")}Personalizar<span class="sub">${l.canDue ? "nome, cor, ícone, prazos" : "nome, cor, ícone"}</span></button>
      <button class="menu-row" @click=${() => (this._closeSheet(), this._saveListPrefs(l.id, { hidden: l.hidden ? null : true }))}>${icon(l.hidden ? "eye" : "eye-off")}${l.hidden ? "Mostrar no início" : "Ocultar do início"}</button>
      ${this.hass.user && this.hass.user.is_admin
        ? html`<button class="menu-row" @click=${() => this._openInHA(`/todo?entity_id=${l.id}`)}>${icon("external-link")}Abrir na tela padrão do HA</button>`
        : nothing}
      ${has(l.features, F.DELETE) && l.done
        ? html`<button class="menu-row danger" @click=${() => this._confirmClearDone(l)}>${icon("brush-cleaning")}Limpar concluídos<span class="sub">${l.done}</span></button>`
        : nothing}
    `;
  }

  _renderCustomize() {
    const f = this._form;
    const l = this._list(f.listId);
    if (!l) return nothing;
    const color = colorById(f.color) || l.color;
    const ic = f.icon || guessIcon(`${l.origName} ${l.group || ""} ${l.id}`);
    return html`
      <div class="sheet-head">
        <h3 class="display">Personalizar</h3>
        <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
      </div>
      <div class="preview-tile" style=${colorVars(color, this._dark)}>
        <span class="tile">${icon(ic)}</span>
        <span class="lc-main"><span class="lc-title">${(f.name || "").trim() || l.origName}</span><span class="lc-meta">${l.group || l.id}</span></span>
      </div>
      <label class="field">
        <span class="flabel">Nome</span>
        <input type="text" .value=${f.name} placeholder=${l.origName} @input=${(e) => this._setForm({ name: e.target.value })} />
      </label>
      <div class="field">
        <span class="flabel">Cor</span>
        <div class="swatches">
          ${PALETTE.map(
            (c) => html`<button class="sw ${color.id === c.id ? "on" : ""}" style="--c:${c.fill}" aria-label=${c.label} @click=${() => this._setForm({ color: c.id })}>${color.id === c.id ? icon("check") : nothing}</button>`,
          )}
        </div>
      </div>
      <div class="field">
        <span class="flabel">Ícone</span>
        <div class="icon-grid" style=${colorVars(color, this._dark)}>
          ${LIST_ICONS.map((n) => html`<button class="ig ${ic === n ? "on" : ""}" aria-label=${n} @click=${() => this._setForm({ icon: n })}>${icon(n)}</button>`)}
        </div>
      </div>
      <div class="row" style="border:0;padding-top:0">
        <div class="grow"><div class="label">Mostrar no início</div></div>
        <label class="switch"><input type="checkbox" role="switch" .checked=${!f.hidden} @change=${(e) => this._setForm({ hidden: !e.target.checked })} aria-label="Mostrar no início" /><span class="track"></span></label>
      </div>
      ${l.canDue
        ? html`<div class="row" style="border:0;padding-top:0">
            <div class="grow">
              <div class="label">Prazos</div>
              <div class="hint" style="white-space:normal">${f.deadlines ? "O prazo que você define fica vermelho quando vence e entra em Prazos." : "As datas aparecem só como informação: não ficam vermelhas nem entram em Prazos."}</div>
            </div>
            <label class="switch"><input type="checkbox" role="switch" .checked=${f.deadlines} @change=${(e) => this._setForm({ deadlines: e.target.checked })} aria-label="Prazos" /><span class="track"></span></label>
          </div>`
        : l.hasDates
          ? html`<p class="sheet-note with-icon">${icon("info")}<span>Esta lista não deixa definir prazo. As datas dos itens vêm da integração (ex.: desde quando um aparelho está fora do ar) e aparecem só como informação, sem ficar vermelhas nem entrar em Prazos.</span></p>`
          : nothing}
      <div class="sheet-actions">
        <button class="btn outline" @click=${() => this._setForm({ name: "", color: null, icon: null, hidden: false, deadlines: l.canDue })}>${icon("rotate-ccw")}Padrão</button>
        <button class="btn primary" @click=${() => this._saveCustomize()}>Salvar</button>
      </div>
    `;
  }

  _renderConfirm() {
    const f = this._form;
    return html`
      <div class="sheet-head"><h3 class="display">${f.title}</h3></div>
      <p class="confirm-text">${f.text}</p>
      <div class="sheet-actions">
        <button class="btn outline" @click=${() => this._closeSheet()}>Cancelar</button>
        <button class="btn primary" @click=${() => f.run()}>${f.label}</button>
      </div>
    `;
  }

  _renderToast() {
    if (!this._toast) return nothing;
    const t = this._toast;
    return html`<div class="toast ${this._sheet ? "has-sheet" : ""}" role="status">
      <span>${t.text}</span>
      ${t.action
        ? html`<button @click=${() => {
            this._toast = null;
            t.action.run();
          }}>${t.action.label}</button>`
        : nothing}
    </div>`;
  }
}

if (!customElements.get("resolvia-panel")) customElements.define("resolvia-panel", ResolviaPanel);

export { ResolviaPanel };
