// A notification opens the app on a tab: ?aba=<tab> on the address of the app or of the page around it
// (the frame of Home Assistant). Read once and taken out, so Voltar and a reload don't open it again.
export const TABS_OPEN = { prazos: "/prazos" };

/** The path to open (e.g. "/prazos") or null. */
export function openTab(win = typeof window === "undefined" ? null : window, tabs = TABS_OPEN) {
  const take = (w) => {
    const u = new URL(w.location.href);
    const p = tabs[u.searchParams.get("aba")];
    if (!p) return null;
    u.searchParams.delete("aba");
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
