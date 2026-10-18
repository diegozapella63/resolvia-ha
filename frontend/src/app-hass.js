// Builds a `hass`-like object on top of the app's own websocket (/ws),
// so the same panel component runs inside the Home Assistant app (ingress).

class AppConnection {
  constructor(url, onStatus) {
    this.url = url;
    this.onStatus = onStatus;
    this.nextId = 1;
    this.pending = new Map();
    this.subs = new Set();
    this.byId = new Map();
    this.queue = [];
    this.open = false;
    this.everOpened = false;
    this.backoff = 1000;
    this.reconnectHandlers = [];
    this._connect();
  }

  _connect() {
    const ws = new WebSocket(this.url);
    this.ws = ws;
    ws.onopen = () => {
      this.open = true;
      this.backoff = 1000;
      const again = this.everOpened;
      this.everOpened = true;
      for (const sub of this.subs) this._startSub(sub);
      for (const q of this.queue.splice(0)) ws.send(q);
      if (this.onStatus) this.onStatus(true);
      if (again) for (const f of this.reconnectHandlers) f();
    };
    ws.onmessage = (ev) => {
      let msg;
      try {
        msg = JSON.parse(ev.data);
      } catch (e) {
        return;
      }
      if (msg.type === "result") {
        const p = this.pending.get(msg.id);
        if (!p) return;
        this.pending.delete(msg.id);
        if (msg.success) p.resolve(msg.result);
        else {
          const err = new Error((msg.error && msg.error.message) || "Falhou");
          err.code = msg.error && msg.error.code;
          p.reject(err);
        }
      } else if (msg.type === "event") {
        const sub = this.byId.get(msg.id);
        if (sub) sub.cb(msg.event);
      }
    };
    ws.onclose = () => {
      const was = this.open;
      this.open = false;
      this.byId.clear();
      for (const [, p] of this.pending) {
        const err = new Error("Sem conexão com o ResolvIA");
        err.code = "disconnected";
        p.reject(err);
      }
      this.pending.clear();
      if (was && this.onStatus) this.onStatus(false);
      setTimeout(() => this._connect(), this.backoff);
      this.backoff = Math.min(this.backoff * 2, 15000);
    };
  }

  onReconnect(fn) {
    this.reconnectHandlers.push(fn);
  }

  _send(obj) {
    const text = JSON.stringify(obj);
    if (this.open) this.ws.send(text);
    else this.queue.push(text);
  }

  sendMessagePromise(msg) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this._send({ ...msg, id });
    });
  }

  subscribeMessage(cb, msg) {
    const sub = { cb, msg, id: null, first: null };
    this.subs.add(sub);
    const ready = new Promise((resolve, reject) => {
      sub.first = { resolve, reject };
    });
    if (this.open) this._startSub(sub);
    return ready.then(() => async () => {
      this.subs.delete(sub);
      if (sub.id != null) {
        this.byId.delete(sub.id);
        if (this.open) this.sendMessagePromise({ type: "unsubscribe_events", subscription: sub.id }).catch(() => {});
      }
    });
  }

  _startSub(sub) {
    const id = this.nextId++;
    sub.id = id;
    this.byId.set(id, sub);
    this.pending.set(id, {
      resolve: () => {
        if (sub.first) sub.first.resolve();
        sub.first = null;
      },
      reject: (err) => {
        if (err.code === "disconnected") return; // retried after reconnect
        this.byId.delete(id);
        this.subs.delete(sub);
        if (sub.first) sub.first.reject(err);
        sub.first = null;
      },
    });
    this.ws.send(JSON.stringify({ ...sub.msg, id }));
  }
}

/** The Home Assistant frontend around us (same origin under ingress), if reachable. */
function parentHass() {
  try {
    if (window.parent === window) return null;
    const el = window.parent.document.querySelector("home-assistant");
    return (el && el.hass) || null;
  } catch (e) {
    return null;
  }
}

const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function detectDark() {
  const p = parentHass();
  if (p && p.themes && typeof p.themes.darkMode === "boolean") return p.themes.darkMode;
  return !!(mql && mql.matches);
}

export function appEnv() {
  const embedded = window.parent !== window;
  return {
    topbar: !embedded,
    haptic(type) {
      try {
        const p = window.parent;
        if (p !== window) p.dispatchEvent(new p.CustomEvent("haptic", { detail: type }));
      } catch (e) {
        /* not same origin */
      }
    },
    openInHA(path) {
      try {
        const p = window.parent;
        if (p !== window && p.document) {
          p.history.pushState(null, "", path);
          p.dispatchEvent(new p.CustomEvent("location-changed", { detail: { replace: false } }));
          return;
        }
      } catch (e) {
        /* fall through */
      }
      window.open(path, "_top");
    },
  };
}

export async function createAppHass(onChange) {
  const url = new URL("ws", location.href);
  url.protocol = location.protocol === "https:" ? "wss:" : "ws:";
  let hass = null;
  const update = (patch) => {
    hass = { ...hass, ...patch };
    onChange(hass);
  };
  const conn = new AppConnection(url.href, (up) => hass && update({ connected: up }));
  const boot = await conn.sendMessagePromise({ type: "resolvia/bootstrap" });
  const p = parentHass();
  hass = {
    states: boot.states || {},
    entities: boot.entities || {},
    devices: boot.devices || {},
    user: {
      name: (p && p.user && p.user.name) || (boot.user && boot.user.name) || "",
      is_admin: p && p.user ? !!p.user.is_admin : true,
    },
    themes: { darkMode: detectDark() },
    language: "pt-BR",
    connected: true,
    version: boot.version,
    connection: conn,
    callWS: (msg) => conn.sendMessagePromise(msg),
    callService: (domain, service, data, target) =>
      conn.sendMessagePromise({ type: "call_service", domain, service, service_data: data || {}, target }),
  };

  conn.subscribeMessage(
    (ev) => {
      const states = { ...hass.states };
      if (ev.new_state) states[ev.entity_id] = ev.new_state;
      else delete states[ev.entity_id];
      update({ states });
    },
    { type: "resolvia/subscribe_lists" },
  );
  conn.onReconnect(async () => {
    try {
      const b = await conn.sendMessagePromise({ type: "resolvia/bootstrap" });
      update({ states: b.states || {}, entities: b.entities || {}, devices: b.devices || {} });
    } catch (e) {
      /* next reconnect */
    }
  });

  const syncTheme = () => {
    const d = detectDark();
    if (hass && d !== hass.themes.darkMode) update({ themes: { ...hass.themes, darkMode: d } });
  };
  setInterval(syncTheme, 1500);
  if (mql && mql.addEventListener) mql.addEventListener("change", syncTheme);
  return hass;
}
