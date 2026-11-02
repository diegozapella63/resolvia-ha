// Lit templates without a browser (not a test file: the runner only picks *.test.mjs).
//
// Import this BEFORE any frontend module that uses Lit: it gives Node the few DOM names the
// Lit bundle touches when it loads. Then render(view) turns an html`` result into a string
// (event handlers become data-on-<event>="n"), text() reads it like a person, and
// click(view, label) finds the button (or input) with that text and runs its handler.
globalThis.window ??= globalThis;
globalThis.HTMLElement ??= class {};
globalThis.customElements ??= { define() {}, get() {} };
globalThis.document ??= { createTreeWalker: () => ({}), createComment: () => ({}), createElement: () => ({ content: {} }), importNode: () => ({}) };

// the bundle says, once, that it is the all-in-one build: quiet while it loads
const warn = console.warn;
console.warn = () => {};
const { nothing, noChange } = await import("../frontend/vendor/lit-all.min.js").finally(() => (console.warn = warn));

const isTpl = (v) => v && typeof v === "object" && "_$litType$" in v;
const isDir = (v) => v && typeof v === "object" && "_$litDirective$" in v;
const escAttr = (s) => String(s).replace(/"/g, "&quot;");

/** {html, fns}: the markup of a view and the handlers it binds, by index. */
export function render(view) {
  const fns = [];
  const out = (x) => {
    if (x == null || x === false || x === true || x === nothing || x === noChange) return "";
    if (Array.isArray(x)) return x.map(out).join("");
    if (typeof x === "function") return "";
    if (isTpl(x)) {
      let s = "";
      x.strings.forEach((str, i) => {
        s += str;
        if (i >= x.values.length) return;
        const v = x.values[i];
        // inside a tag (an attribute) or between tags (content)?
        if (s.lastIndexOf("<") > s.lastIndexOf(">")) {
          // @event=${fn}, .prop=${v} and ?bool=${v} take the whole attribute (quotes included)
          const b = /([@.?])([\w-]+)=(["']?)$/.exec(s);
          if (b) {
            s = s.slice(0, b.index);
            if (b[3] && x.strings[i + 1].startsWith(b[3])) x.strings[i + 1] = x.strings[i + 1].slice(1); // a copy (see below)
            if (b[1] === "@") {
              fns.push(v);
              s += `data-on-${b[2]}="${fns.length - 1}"`;
            } else if (b[1] === ".") s += `${b[2]}="${escAttr(v ?? "")}"`;
            else if (v) s += b[2];
          } else {
            const val = v == null || v === nothing ? "" : isDir(v) ? out(v) : escAttr(v);
            s += s.endsWith("=") ? `"${val}"` : val; // attr=${v} without quotes
          }
        } else s += out(v);
      });
      return s;
    }
    if (isDir(x)) {
      const vals = x.values || [];
      const last = vals[vals.length - 1];
      // repeat(items, key, template) or repeat(items, template)
      if (vals.length >= 2 && vals[0] && typeof vals[0][Symbol.iterator] === "function" && typeof last === "function") return [...vals[0]].map((it, k) => out(last(it, k))).join("");
      // unsafeSVG / unsafeHTML: the icons; a mark is enough
      if (typeof vals[0] === "string") return "<svg/>";
      // classMap / styleMap
      if (vals[0] && typeof vals[0] === "object") return Object.entries(vals[0]).filter(([, on]) => on).map(([k]) => k).join(" ");
      return "";
    }
    return String(x);
  };
  // the strings of a template are shared between renders: work on copies
  const copy = (x) => {
    if (Array.isArray(x)) return x.map(copy);
    if (isTpl(x)) return { ...x, strings: [...x.strings], values: x.values.map(copy) };
    return x;
  };
  return { html: out(copy(view)), fns };
}

/** What a person reads: no tags, one space between words. */
export const text = (view) =>
  (typeof view === "string" ? view : render(view).html)
    .replace(/<svg[^>]*\/>|<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<\/?(mark|em|strong|u|wbr)\b[^>]*>/g, "") // inside a word: <mark>, the found part of a search
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .replace(/ ([.,;:!?)])(?=\s|$)/g, "$1") // "<b>8 chamadas</b>." reads "8 chamadas." (but ".ics" stays)
    .trim();

/** The elements with a handler: [{tag, attrs, text, on: {click: fn}}]. */
export function controls(view) {
  const { html, fns } = render(view);
  const found = [];
  const re = /<(\w[\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [whole, tag, attrs] = m;
    if (!/data-on-/.test(attrs)) continue;
    const on = {};
    for (const h of attrs.matchAll(/data-on-([\w-]+)="(\d+)"/g)) on[h[1]] = fns[+h[2]];
    // the content up to the closing tag (buttons and labels don't nest themselves)
    const end = html.indexOf(`</${tag}>`, m.index + whole.length);
    const inner = end > 0 ? html.slice(m.index + whole.length, end) : "";
    const aria = /aria-label="([^"]*)"/.exec(attrs);
    found.push({ tag, attrs, text: text(inner) || (aria ? aria[1] : ""), aria: aria ? aria[1] : "", on });
  }
  return found;
}

const matches = (c, label) => (label instanceof RegExp ? label.test(c.text) || label.test(c.aria) : c.text === label || c.aria === label);

/** Runs the handler of the control with that text (or aria-label). Throws when there isn't exactly one. */
export function fire(view, label, event = "click", ev = {}) {
  const hit = controls(view).filter((c) => c.on[event] && matches(c, label));
  if (hit.length !== 1) throw new Error(`${hit.length} controles “${label}” com ${event}: ${controls(view).map((c) => c.text || c.aria).join(" | ")}`);
  return hit[0].on[event]({ preventDefault() {}, stopPropagation() {}, target: {}, ...ev });
}
export const click = (view, label, ev) => fire(view, label, "click", ev);

/** Labels of the controls that answer to an event, in order. */
export const labels = (view, event = "click") => controls(view).filter((c) => c.on[event]).map((c) => c.text || c.aria);

// ------------------------------------------------------------------ a host for the mixins of <resolvia-panel>

const { html } = await import("../frontend/vendor/lit-all.min.js");

/** hass with callWS answering by message type (a value, a function of the message, or an Error to throw). */
export function fakeHass(answers = {}) {
  const calls = [];
  return {
    calls,
    resolvia: {},
    async callWS(msg) {
      calls.push(msg);
      const a = answers[msg.type];
      if (a instanceof Error) throw a;
      return typeof a === "function" ? a(msg) : a;
    },
  };
}

/** What the panel gives its mixins, remembering toasts, sheets, haptics and saved prefs. */
export class Host {
  constructor(hass = fakeHass()) {
    this.hass = hass;
    this.toasts = [];
    this.undos = [];
    this.haptics = [];
    this.sheets = [];
    this.prefs = [];
    this.updates = 0;
    this._form = {};
    this._sheet = null;
    this._app_ = {};
  }
  requestUpdate() {
    this.updates++;
  }
  _showToast(t, undo) {
    this.toasts.push(t);
    this.undos.push(undo || null);
  }
  _haptic(t) {
    this.haptics.push(t);
  }
  _openSheet(name, form) {
    this._sheet = name;
    this._form = form;
    this.sheets.push(name);
  }
  _closeSheet() {
    this._sheet = null;
  }
  _setForm(p) {
    this._form = { ...this._form, ...p };
  }
  async _saveAppPrefs(p) {
    this.prefs.push(p);
    Object.assign(this._app_, p);
  }
  _app(k, d) {
    return k in this._app_ && this._app_[k] != null ? this._app_[k] : d;
  }
  _secHead(ic, title, sub) {
    return html`<div class="sec-head"><h2>${title}</h2>${sub ? html`<p>${sub}</p>` : ""}</div>`;
  }
}

/** A class of the mixins on top of Host (and of the extra methods). */
export const hostOf = (...mixins) => mixins.reduce((B, M) => M(B), Host);
