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
