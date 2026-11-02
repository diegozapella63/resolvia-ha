# Touch swipes for Playwright: dispatches touchstart/touchend on an element inside the app's shadow root.
SWIPE_JS = """([host, sel, x0, y0, x1, y1]) => {
  const root = document.querySelector(host);
  const r = root ? root.renderRoot || root.shadowRoot || document : document;
  const el = (r.querySelector ? r.querySelector(sel) : null) || document.querySelector(sel);
  if (!el) return 'no element';
  const mk = (x, y) => new Touch({ identifier: 1, target: el, clientX: x, clientY: y, pageX: x, pageY: y });
  const t0 = mk(x0, y0), t1 = mk(x1, y1);
  el.dispatchEvent(new TouchEvent('touchstart', { touches: [t0], targetTouches: [t0], changedTouches: [t0], bubbles: true, composed: true }));
  el.dispatchEvent(new TouchEvent('touchend', { touches: [], targetTouches: [], changedTouches: [t1], bubbles: true, composed: true }));
  return 'ok';
}"""
async def swipe(pg, host, sel, x0, y0, x1, y1, wait=700):
    r = await pg.evaluate(SWIPE_JS, [host, sel, x0, y0, x1, y1])
    await pg.wait_for_timeout(wait)
    return r
