# ResolvIA 2.57.0: Mais › Configurações › Opções › Atalho no celular. The path of the panel (/app/<slug>) with Copiar,
# and the steps of the Home Assistant app (Gerenciar atalhos › Atalho fixado › Painel). Outside Home Assistant there is
# no path and no card (RESOLVIA_HOST plays the hostname of the add-on here).
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, subprocess, os, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rva-data", f"{SP}/rva-share"
os.makedirs(f"{SP}/shots", exist_ok=True)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def start(host):
    for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
    env = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
    env.pop("RESOLVIA_HOST", None)
    if host: env["RESOLVIA_HOST"] = host
    pr = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=env, stdout=open(f"{SP}/rva_app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    return pr
async def opcoes(pg):
    await pg.locator("nav .tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
    await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
    await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(500)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = None
async def main():
    global app
    async with async_playwright() as p:
        b = await p.chromium.launch()
        app = start("a1b2c3d4-resolvia")
        for scheme, w in (("dark", 390), ("light", 320)):
            ctx = await b.new_context(viewport={"width": w, "height": 844}, device_scale_factor=2, color_scheme=scheme)
            await ctx.grant_permissions(["clipboard-read", "clipboard-write"], origin="http://127.0.0.1:8099")
            pg = await ctx.new_page()
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1300)
            await opcoes(pg)
            card = pg.locator("resolvia-panel .panel.shortcut")
            check(await card.count() == 1, f"{w} px: Atalho no celular in Opções")
            txt = " ".join((await card.inner_text()).split())
            check("Atalho no celular" in txt and "abre o ResolvIA direto" in txt and "Configurações › Aplicativo complementar › Gerenciar atalhos" in txt
                  and "Atalho fixado" in txt and "Painel" in txt, f"{w} px: the steps of the Home Assistant app ({txt[:160]})")
            check(await card.locator("#rv-atalho").input_value() == "/app/a1b2c3d4_resolvia", f"{w} px: the path of the panel")
            await card.scroll_into_view_if_needed()
            box_i, box_b = await card.locator("#rv-atalho").bounding_box(), await card.get_by_role("button", name="Copiar").bounding_box()
            check(box_b["y"] > box_i["y"] + box_i["height"] - 1 and abs(box_b["width"] - box_i["width"]) < 2 and box_b["x"] + box_b["width"] <= w, f"{w} px: Copiar under the path, as wide, inside the screen")
            check(await card.locator("#rv-atalho").evaluate("(e) => e.scrollWidth <= e.clientWidth"), f"{w} px: the whole path in sight (not cut)")
            check(await pg.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"{w} px: nothing wider than the screen")
            await card.get_by_role("button", name="Copiar").click(); await pg.wait_for_timeout(300)
            check(await pg.evaluate("navigator.clipboard.readText()") == "/app/a1b2c3d4_resolvia", f"{w} px: Copiar puts the path in the clipboard")
            await card.screenshot(path=f"{SP}/shots/rv-atalho-{w}-{scheme}.png")
            check(not errs, f"no page errors {errs}")
            await ctx.close()
        app.terminate(); app.wait()
        # outside Home Assistant: no card
        app = start(None)
        pg = await b.new_page(viewport={"width": 390, "height": 844})
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1300)
        await opcoes(pg)
        check(await pg.locator("resolvia-panel .panel.shortcut").count() == (1 if _os.uname().nodename.endswith("-resolvia") else 0), "outside Home Assistant: no Atalho no celular")
        await b.close()
try:
    asyncio.run(main())
finally:
    if app: app.terminate()
    fake.terminate()
print(f"{passed} checks passed" + (f", FAILED: {failed}" if failed else ""))
