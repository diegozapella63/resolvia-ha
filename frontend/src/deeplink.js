// A notification opens the app on a tab: ?aba=<tab> on the address of the app or of the page around it
// (the frame of Home Assistant). Read once and taken out, so Voltar and a reload don't open it again.
// (prazos: the alert of Prazos, which opens Sugestões since 2.48.0; listas: the tab Listas)
// 2.86.0: buscar, with &comodo=<the name of a room>: the Buscar grouped by room, with that room open (a round of the CorrerIA
// opens the tasks of the room it is in); openRoom() gives the name, once.
export const TABS_OPEN = { prazos: "/prazos", listas: "/minhas-listas", buscar: "/buscar" };

let room = "";
/** The room of the last link that opened the app (?aba=buscar&comodo=), once. */
export function openRoom() {
  const r = room;
  room = "";
  return r;
}

/** The path to open (e.g. "/prazos") or null. */
export function openTab(win = typeof window === "undefined" ? null : window, tabs = TABS_OPEN) {
  const take = (w) => {
    const u = new URL(w.location.href);
    const p = tabs[u.searchParams.get("aba")];
    if (!p) return null;
    room = p === "/buscar" ? String(u.searchParams.get("comodo") || "").trim().slice(0, 80) : "";
    u.searchParams.delete("aba");
    u.searchParams.delete("comodo");
    w.history.replaceState(w.history.state, "", u.href);
    return p;
  };
  if (!win) return null;
  try {
    const own = take(win);
    if (own) return own;
    if (win.parent && win.parent !== win) return take(win.parent);
  } catch (e) {
    // another origin around the app: nothing to read
  }
  return null;
}

/**
 * 2.86.1: inside the Home Assistant (2026.2 or newer), the panel of the app (/app/<slug>/<the rest>) passes the rest of the
 * address by message, at the start and whenever it changes, also to a screen that was already open (the ?aba= is only
 * read when the screen loads). onPath gets each new rest once ("" is the app itself). Returns the function that stops.
 */
export function watchHaPath(onPath, win = typeof window === "undefined" ? null : window) {
  if (!win || !win.parent || win.parent === win) return () => {};
  let seen = null;
  const on = (e) => {
    if (e.source !== win.parent || !e.data || e.data.type !== "home-assistant/properties") return;
    const p = String((e.data.route && e.data.route.path) || "").replace(/\/+$/, "");
    if (p === seen) return;
    seen = p;
    if (p) onPath(p);
  };
  win.addEventListener("message", on);
  try {
    win.parent.postMessage({ type: "home-assistant/subscribe-properties" }, "*");
  } catch (e) {
    /* outside the Home Assistant */
  }
  return () => win.removeEventListener("message", on);
}

/** The screen of a rest of address: /buscar, /buscar/comodo/<name> (the Buscar on a room), /minhas-listas; or null. */
export function haLink(p) {
  const m = /^\/buscar(?:\/comodo\/(.+))?$/.exec(p || "");
  if (m) {
    let room = m[1] || "";
    try {
      room = decodeURIComponent(room);
    } catch (e) {
      /* as it came */
    }
    return { path: "/buscar", room: room.trim().slice(0, 80) };
  }
  return p === "/minhas-listas" ? { path: p, room: "" } : null;
}
