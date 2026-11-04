# ResolvIA 2.21.0: a swipe to the side changes the tab (Listas, Buscar, Prazos, Mais); in a list, to the right goes back (2.37: on a screen of Mais, back to the menu); the app icon by the name.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, urllib.request, urllib.error
from playwright.async_api import async_playwright
import sys
sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from swipe_lib import swipe
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvw-data", f"{SP}/rvw-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rvw_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvw_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def extract():
    try:
        urllib.request.urlopen(urllib.request.Request("http://127.0.0.1:8099/api/extract", data=json.dumps({"text": "leite, ovos"}).encode(), method="POST", headers={"content-type": "application/json"}))
        return 200
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}").get("code")
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if (await fn()) if asyncio.iscoroutinefunction(fn) else fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
H = "resolvia-panel"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True, is_mobile=True)
        pg = await ctx.new_page()
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
        view = lambda: pg.evaluate("() => document.querySelector('resolvia-panel')._view().name")
        ic = pg.locator(".brand-head .eyebrow .brand .app-ic")
        check(await ic.count() == 1 and await ic.is_visible(), "the app icon by the name")
        await pg.locator(".brand-head").first.screenshot(path=f"{SP}/shots/rvw-icon.png")
        check(await view() == "home", "starts on Listas")
        await swipe(pg, H, "main .page", 300, 520, 110, 520)
        check(await view() == "search", "finger to the left: Buscar")
        await swipe(pg, H, "main .page", 300, 520, 110, 520)
        check(await view() in ("due", "suggest"), f"again: Prazos ({await view()})")
        await swipe(pg, H, "main .page", 300, 300, 110, 300)
        check(await view() == "more", "again: Mais")
        await swipe(pg, H, "main .page", 300, 300, 110, 300)
        check(await view() == "more", "Mais is the last tab: to the left, nothing")
        # a screen of Mais (ResolvIA 2.37): to the right goes back to the menu; to the left nothing
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(500)
        check(await view() == "config", "Mais › Configurações")
        await swipe(pg, H, "main .page", 300, 520, 110, 520)
        check(await view() == "config", "in Configurações, to the left: stays")
        await swipe(pg, H, "main .page", 110, 520, 300, 520)
        check(await view() == "more", "in Configurações, to the right: back to the menu")
        await pg.locator(".more-row", has_text="Listas").click(); await pg.wait_for_timeout(500)
        await swipe(pg, H, "main .page", 110, 520, 300, 520)
        check(await view() == "more", "in Mais › Listas, to the right: back to the menu")
        await swipe(pg, H, "main .page", 110, 420, 300, 420)
        check(await view() in ("due", "suggest"), "finger to the right: back")
        for _ in range(3): await swipe(pg, H, "main .page", 110, 420, 300, 420)
        check(await view() == "home", "back to Listas, and it stays there")
        # inside a list: to the right goes back to the lists; to the left nothing
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(700)
        check(await view() == "list", "a list")
        await swipe(pg, H, "main .page", 300, 520, 110, 520)
        check(await view() == "list", "in a list, to the left: stays")
        await swipe(pg, H, ".quick input", 110, 160, 300, 160)
        check(await view() == "list", "on the field to add: no")
        await swipe(pg, H, ".item .grip", 300, 300, 110, 300)
        check(await view() == "list", "on the grip to reorder: no")
        await swipe(pg, H, "main .page", 110, 520, 300, 520)
        check(await view() == "home", "in a list, to the right: back to the lists")
        await pg.set_viewport_size({"width": 1200, "height": 800}); await pg.wait_for_timeout(500)
        await swipe(pg, H, "main .page", 700, 420, 400, 420)
        check(await view() == "home", "computer: no swipes")
        check(await pg.locator("aside.side .side-brand .app-ic").is_visible(), "computer: the icon on the sidebar")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
