# ResolvIA 2.20.1: the choices of the item forms (Prazo, Repetir, Lista) are buttons of the same width, like the EconomIA.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, urllib.request, urllib.error
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvc-data", f"{SP}/rvc-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rvc_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvc_app.log", "w"), stderr=subprocess.STDOUT)
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
async def widths(loc):
    bs = [await loc.nth(i).bounding_box() for i in range(await loc.count())]
    return [round(b["width"]) for b in bs], [round(b["x"]) for b in bs]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1500)
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(700)
        sh = pg.locator(".sheet")
        rows = sh.locator(".chip-row.grid")
        n = await rows.count()
        check(n >= 2, f"Adicionar: the choices are grids ({n})")
        for i in range(n):
            w, x = await widths(rows.nth(i).locator(".pick"))
            check(len(set(w)) == 1 and len(set(x)) <= 3, f"row {i}: buttons of the same width ({w})")
        await pg.screenshot(path=f"{SP}/shots/rvc-add.png", full_page=True)
        await sh.locator(".icon-btn[aria-label='Fechar']").first.click(); await pg.wait_for_timeout(400)
        # Editar item: Lista (mover)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(600)
        await pg.locator(".item .it-body").first.click(); await pg.wait_for_timeout(700)
        lst = sh.locator(".chip-row.grid").last
        w, x = await widths(lst.locator(".pick.list"))
        check(len(w) >= 2 and len(set(w)) == 1, f"Editar: Lista (mover) buttons of the same width ({w})")
        await pg.screenshot(path=f"{SP}/shots/rvc-edit.png")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
