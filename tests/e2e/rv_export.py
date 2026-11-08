# ResolvIA 2.18.3: Mais › Dados › Exportar like the InventarIA: one bordered line per file, with its explanation.
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
DATA, SHARE = f"{SP}/rvx-data", f"{SP}/rvx-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rvx_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvx_app.log", "w"), stderr=subprocess.STDOUT)
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
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", accept_downloads=True)
        pg = await ctx.new_page()
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1200)
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(600)
        panel = pg.locator("#dados .panel").first
        rows = panel.locator(".opts > li")
        check(await rows.count() == 3, "Exportar: three lines")
        titles = [t.strip() for t in await rows.locator(".ot b").all_inner_texts()]
        check(titles == ["Planilha (CSV)", "Dados completos (JSON)", "Tudo (ZIP)"], f"CSV, JSON and ZIP, like the InventarIA ({titles})")
        texts = [t.strip() for t in await rows.locator(".ot span").all_inner_texts()]
        check(len(texts) == 3 and all(len(t) > 20 for t in texts), "each line explains its file")
        btns = [t.strip() for t in await rows.locator("a.btn").all_inner_texts()]
        check(btns == ["Baixar CSV", "Baixar JSON", "Baixar ZIP"], f"a button on each line ({btns})")
        borders = [await rows.nth(i).evaluate("e => getComputedStyle(e).borderBottomWidth + ' ' + getComputedStyle(e).borderBottomStyle") for i in range(3)]
        check(all(x == "1px solid" for x in borders), f"a border on each line ({borders})")
        boxes = [await rows.nth(i).locator("a.btn").bounding_box() for i in range(3)]
        tb = [await rows.nth(i).locator(".ot").bounding_box() for i in range(3)]
        check(all(bb["y"] >= t["y"] + t["height"] - 1 and abs(bb["x"] - t["x"]) < 2 for bb, t in zip(boxes, tb)) and len({round(bb["width"]) for bb in boxes}) == 1, "phone: each button under its text, all the same width, lined up")
        await panel.screenshot(path=f"{SP}/shots/rvx-export.png")
        async with pg.expect_download() as dl:
            await rows.nth(0).locator("a.btn").click()
        d = await dl.value
        check(d.suggested_filename.endswith(".csv"), f"Baixar CSV downloads the CSV ({d.suggested_filename})")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
