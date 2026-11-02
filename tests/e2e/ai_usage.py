# CronologIA 1.14.0 / ResolvIA 2.12.0: Mais › Integrações › Uso da IA (like the EconomIA).
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil, urllib.request, base64
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
IMG = base64.b64encode(open(f"{FIX}/lista.jpg", "rb").read()).decode()
def extract(body):
    req = urllib.request.Request("http://127.0.0.1:8099/api/extract", data=json.dumps(body).encode(), method="POST", headers={"content-type": "application/json"})
    return json.loads(urllib.request.urlopen(req, timeout=60).read())
def sensor(entity, token):
    req = urllib.request.Request(f"http://127.0.0.1:8123/api/states/{entity}", headers={"authorization": f"Bearer {token}"})
    return json.loads(urllib.request.urlopen(req).read())

async def run(app):
    repo = _os.environ["E2E_" + app.upper()]
    data = f"{SP}/use-{app}"; shutil.rmtree(data, ignore_errors=True); os.makedirs(f"{data}/media"); os.makedirs(f"{data}/share")
    # the sensor only with Mais › Integrações › Sensores no Home Assistant on (off by default since CronologIA 1.25 / ResolvIA 2.20)
    json.dump({"app": {"sensors_on": True}} if app == "cronologia" else {"prefs": {"app": {"sensors_on": True}}}, open(f"{data}/{app}.json", "w"))
    token = "dev" if app == "cronologia" else "test"
    fenv = dict(os.environ, TZ="America/Sao_Paulo", FAKE_MEDIA_DIR=f"{data}/media", FAKE_HA_TOKEN=token, FAKE_HA_PORT="8123")
    fake = subprocess.Popen(["node", f"{repo}/dev/fake-ha.mjs"], env=fenv, stdout=open(f"{data}/fake.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(0.6)
    aenv = dict(os.environ, TZ="America/Sao_Paulo", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN=token, DATA_DIR=data, MEDIA_DIR=f"{data}/media", SHARE_DIR=f"{data}/share", PORT="8099")
    aenv["CRONOLOGIA_DEV" if app == "cronologia" else "RESOLVIA_DEV"] = "1"
    srv = subprocess.Popen(["node", f"{repo}/{app}/rootfs/app/server.js"], env=aenv, stdout=open(f"{data}/app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    name = "CronologIA" if app == "cronologia" else "ResolvIA"
    try:
        extract({"text": "Dentista amanhã às 10h e reunião sexta às 14h" if app == "cronologia" else "leite, ovos e café"})
        extract({"text": "Aniversário da Ana dia 30" if app == "cronologia" else "arroz e feijão"})
        extract({"images": [{"mime": "image/jpeg", "data": IMG}]})
        u = json.load(open(f"{data}/uso_ia.json"))
        today = max(u["dias"])
        d = u["dias"][today]
        check(d["chamadas"] == 3 and d["tipos"] == {"mensagem": 2, "fotos": 1} and d["imagens"] == 1 and d["tokens"] > 50, f"{name}: 3 calls counted (2 mensagem, 1 fotos, ≈{d['tokens']} tokens)")
        check(len(u["ultimas"]) == 3 and u["ultimas"][0]["tipo"] == "fotos" and u["ultimas"][0]["resultado"] == "ok", f"{name}: last calls, newest first")
        time.sleep(0.6)
        s = sensor(f"sensor.{app}_ia_hoje", token)
        check(s["state"] in ("3", 3) and s["attributes"]["por_tipo"] == {"mensagem": 2, "fotos": 1} and s["attributes"]["friendly_name"] == f"{name}: chamadas de IA hoje", f"{name}: sensor.{app}_ia_hoje published")
        async with async_playwright() as p:
            b = await p.chromium.launch()
            pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
            root = pg.locator("cronologia-app") if app == "cronologia" else pg
            await root.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
            await root.locator(".more-tabs button", has_text="Integrações").click(); await pg.wait_for_timeout(900)
            panel = root.locator("#uso-ia")
            await panel.wait_for(timeout=8000)
            tiles = [t.replace("\n", " ") for t in await panel.locator(".uso-tile").all_inner_texts()]
            check(len(tiles) == 3 and tiles[0].upper().startswith("HOJE 3") and "tokens" in tiles[0], f"{name}: tiles ({tiles})")
            check(await panel.locator(".uso-bar").count() == 7 and await panel.locator(".uso-days span").last.inner_text() == "hoje", f"{name}: 7 bars, the last one today")
            check("Hoje: 3 chamadas." in await panel.locator(".uso-cap").inner_text(), f"{name}: caption for today")
            await panel.locator(".uso-bar").first.click(); await pg.wait_for_timeout(200)
            check("0 chamadas" in await panel.locator(".uso-cap").inner_text(), f"{name}: tapping a bar shows that day")
            kinds = await panel.locator(".uso-kinds").inner_text()
            check("Mensagens 2" in kinds.replace("\n", " ") and "Fotos 1" in kinds.replace("\n", " "), f"{name}: kinds of call ({kinds.strip()})")
            await panel.locator(".uso-last summary").click(); await pg.wait_for_timeout(200)
            check(await panel.locator(".uso-last li").count() == 3 and "Google AI Task" in await panel.locator(".uso-last li").first.inner_text(), f"{name}: last calls listed")
            note = await panel.inner_text()
            check("Google Cloud Console" in note and f"sensor.{app}_ia_hoje" not in note, f"{name}: provider link (Gemini); the sensor is in Sensores, not here")
            sens = await pg.locator("#sensores").inner_text() if await pg.locator("#sensores").count() else ""
            check(f"sensor.{app}_ia_hoje" in sens and "com erros, cota e tokens" in sens, f"{name}: Sensores explains the AI sensor")
            await panel.scroll_into_view_if_needed()
            await pg.screenshot(path=f"{SP}/shots/use-{app}.png")
            # AI off: the panel goes away
            await root.locator("input[aria-label='Usar IA']").uncheck(); await pg.wait_for_timeout(800)
            check(await root.locator("#uso-ia").count() == 0, f"{name}: with Usar IA off the panel is hidden")
            if app == "resolvia":
                await root.locator(".tab", has_text="Buscar").click(); await pg.wait_for_timeout(400)
                st = await root.locator(".page").first.inner_text()
                check("acentos" not in st and "Em " in st, "ResolvIA: Buscar without the accents note")
            check(not errs, f"{name}: no page errors {errs}")
            await b.close()
    finally:
        srv.kill(); fake.kill(); time.sleep(0.4)

for app in [a for a in ("cronologia", "resolvia") if a in _os.environ.get("E2E_APPS", "cronologia resolvia").split() and _os.environ.get("E2E_" + a.upper())]:
    asyncio.run(run(app))
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
