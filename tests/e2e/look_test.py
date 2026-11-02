# CronologIA 1.14.0 / ResolvIA 2.12.0: Mais › Aparência like the InventarIA.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
async def run(app):
    repo = _os.environ["E2E_" + app.upper()]
    data = f"{SP}/look-{app}"; shutil.rmtree(data, ignore_errors=True); os.makedirs(f"{data}/media"); os.makedirs(f"{data}/share")
    token = "dev" if app == "cronologia" else "test"
    fake = subprocess.Popen(["node", f"{repo}/dev/fake-ha.mjs"], env=dict(os.environ, TZ="America/Sao_Paulo", FAKE_MEDIA_DIR=f"{data}/media", FAKE_HA_TOKEN=token, FAKE_HA_PORT="8123"), stdout=open(f"{data}/fake.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(0.6)
    aenv = dict(os.environ, TZ="America/Sao_Paulo", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN=token, DATA_DIR=data, MEDIA_DIR=f"{data}/media", SHARE_DIR=f"{data}/share", PORT="8099")
    aenv["CRONOLOGIA_DEV" if app == "cronologia" else "RESOLVIA_DEV"] = "1"
    srv = subprocess.Popen(["node", f"{repo}/{app}/rootfs/app/server.js"], env=aenv, stdout=open(f"{data}/app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    name = "CronologIA" if app == "cronologia" else "ResolvIA"
    stored = (lambda: json.load(open(f"{data}/cronologia.json"))["app"]) if app == "cronologia" else (lambda: json.load(open(f"{data}/resolvia.json"))["prefs"]["app"])
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            for scheme in ("dark", "light"):
                pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme=scheme)
                errs = []
                pg.on("pageerror", lambda e: errs.append(str(e)))
                await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
                root = pg.locator("cronologia-app") if app == "cronologia" else pg
                await root.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
                await root.locator(".more-tabs button", has_text="Aparência").click(); await pg.wait_for_timeout(500)
                heads = [h.strip() for h in await root.locator(".mais-head h2").all_inner_texts()]
                if scheme == "dark":
                    check(heads == ["Tema", "Cor do app"], f"{name}: Aparência headings ({heads})")
                    labels = [t.strip() for t in await root.locator(".seg.themes button").all_inner_texts()]
                    check(labels == ["Automático", "Claro", "Escuro"] and await root.locator(".seg.themes button.on", has_text="Automático").count() == 1, f"{name}: theme buttons, Automático chosen")
                    n = await root.locator(".tag-swatches .tsw").count()
                    check(n == (12 if app == "cronologia" else 10) and await root.locator(".tsw.on").count() == 1, f"{name}: {n} tag swatches, one chosen")
                    await root.locator(".tsw", has_text="Azul").click(); await pg.wait_for_timeout(600)
                    check(stored().get("accent") == "azul" and await root.locator(".tsw.on", has_text="Azul").count() == 1, f"{name}: picking Azul saves it")
                    await root.locator(".seg.themes button", has_text="Claro").click(); await pg.wait_for_timeout(300)
                    dark_attr = await (pg.locator("cronologia-app") if app == "cronologia" else pg.locator("resolvia-panel")).evaluate("(el) => el.hasAttribute('dark')")
                    check(not dark_attr and await root.locator(".seg.themes button.on", has_text="Claro").count() == 1, f"{name}: Claro turns the light theme on")
                    await root.locator(".seg.themes button", has_text="Automático").click(); await pg.wait_for_timeout(300)
                await root.locator(".more-tabs").scroll_into_view_if_needed()
                await pg.screenshot(path=f"{SP}/shots/look-{app}-{scheme}.png")
                if app == "cronologia" and scheme == "dark":
                    await root.locator(".more-tabs button", has_text="Opções").click(); await pg.wait_for_timeout(500)
                    oh = [h.strip() for h in await root.locator(".mais-head h2").all_inner_texts()]
                    check(oh == ["Novo", "Semana"], f"CronologIA: Opções tab with Novo and Semana ({oh})")
                    await root.locator(".week-seg button", has_text="Segunda").click(); await pg.wait_for_timeout(500)
                    check(stored().get("week_start") == 1, "CronologIA: week start saved from Opções")
                    await pg.screenshot(path=f"{SP}/shots/look-cronologia-opcoes.png")
                check(not errs, f"{name} ({scheme}): no page errors {errs}")
                await pg.close()
            await b.close()
    finally:
        srv.kill(); fake.kill(); time.sleep(0.4)
for app in [a for a in ("cronologia", "resolvia") if a in _os.environ.get("E2E_APPS", "cronologia resolvia").split() and _os.environ.get("E2E_" + a.upper())]:
    asyncio.run(run(app))
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
