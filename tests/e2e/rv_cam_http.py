# ResolvIA 2.25.1: Digitalizar without camera access (http://): says why, instead of opening the gallery.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvc-data", f"{SP}/rvc-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(1.2)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        # like http://192.168.x.x: no camera for the page
        await ctx.add_init_script("Object.defineProperty(navigator, 'mediaDevices', { value: undefined, configurable: true }); Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true }); Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });")
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel")
        await a.evaluate("(el) => el._openImport(null, 'pick')"); await pg.wait_for_timeout(400)
        tile = a.locator(".sheet .imp-tile", has_text="Digitalizar")
        check("Precisa de https" in await tile.inner_text() and "no-cam" in (await tile.get_attribute("class")), "the tile says it needs https before the tap")
        check("Em http a câmera não abre aqui" in await a.locator(".sheet").inner_text(), "and the help line explains")
        await a.locator(".sheet").screenshot(path=f"{SP}/shots/rvc-tiles.png")
        chooser = []
        pg.on("filechooser", lambda fc: chooser.append(fc))
        await a.locator(".sheet .imp-tile", has_text="Digitalizar").click(); await pg.wait_for_timeout(700)
        check(not chooser, "the gallery does not open by itself")
        msg = await a.locator(".cam .cam-msg").inner_text() if await a.locator(".cam .cam-msg").count() else ""
        check("endereço seguro (https)" in msg and "Escolher foto" in msg, f"says why, with Escolher foto ({msg[:90]!r})")
        await pg.screenshot(path=f"{SP}/shots/rvc-http.png")
        async with pg.expect_file_chooser() as fc:
            await a.locator(".cam .cam-msg .btn", has_text="Escolher foto").click()
        check(await fc.value is not None, "Escolher foto opens the picker")
        check(await a.locator(".cam").count() == 0 and "Importar itens" in await a.locator(".sheet").inner_text(), "and the camera screen closes")
        # Falar over http: says it, too
        await a.evaluate("(el) => el._closeSheet()"); await pg.wait_for_timeout(300)
        await a.evaluate("(el) => el._openImport(null, 'voice')"); await pg.wait_for_timeout(1200)
        st = await a.locator(".sheet").inner_text()
        check("endereço seguro (https)" in st and "nem pelo app do Home Assistant" in st, f"Falar over http explains it ({st[:120]!r})")
        # Colar over http: no button (it could only say "toque e segure")
        await a.evaluate("(el) => el._closeSheet()"); await pg.wait_for_timeout(300)
        await a.evaluate("(el) => el._openImport(null, 'text')"); await pg.wait_for_timeout(500)
        acts = await a.locator(".sheet .sheet-actions .btn").all_inner_texts()
        check(await a.locator(".sheet textarea").count() == 1 and not any(t.strip() == "Colar" for t in acts), f"http: no Colar button ({acts})")
        # over https: the button is there
        ctx2 = await b.new_context(viewport={"width": 390, "height": 844}, permissions=["clipboard-read", "clipboard-write"])
        pg2 = await ctx2.new_page(); await pg2.goto("http://127.0.0.1:8099/"); await pg2.wait_for_timeout(1800)
        a2 = pg2.locator("resolvia-panel")
        await a2.evaluate("(el) => el._openImport(null, 'text')"); await pg2.wait_for_timeout(500)
        await pg2.evaluate("() => navigator.clipboard.writeText('leite, ovos')")
        btn = a2.locator(".sheet .sheet-actions .btn", has_text="Colar")
        check(await btn.count() == 1, "https: Colar is there")
        await btn.click(); await pg2.wait_for_timeout(400)
        check(await a2.locator(".sheet textarea").evaluate("(t) => t.value") == "leite, ovos", "and pastes what was copied")
        await ctx2.close()
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
