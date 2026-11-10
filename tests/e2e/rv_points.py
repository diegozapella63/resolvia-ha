# ResolvIA 2.8.0: tasks worth points in the CronologIA scoreboard.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, datetime, urllib.request
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvp-data", f"{SP}/rvp-share"
for d in (DATA, SHARE):
    shutil.rmtree(d, ignore_errors=True)
os.makedirs(f"{SHARE}/cronologia")
now_z = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
json.dump({"app": "CronologIA", "versao": "1.6.0", "gravado_em": now_z, "placar": {"ativo": True, "periodo": "semana", "participantes": ["Davi", "Aurora"], "usuarios": {"u-davi": "Davi", "u-aurora": "Aurora"}}}, open(f"{SHARE}/cronologia/integracao.json", "w"))
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rvp_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
procs = {}
def start_app(user=None):
    if "app" in procs:
        procs["app"].terminate(); procs["app"].wait()
    e = dict(appenv, **({"RESOLVIA_DEV_USER_ID": user} if user else {}))
    procs["app"] = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=e, stdout=open(f"{SP}/rvp_app.log", "a"), stderr=subprocess.STDOUT)
    time.sleep(1.0)
start_app("u-davi")
URL = "http://127.0.0.1:8099/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def events(): return [e for e in json.loads(urllib.request.urlopen("http://127.0.0.1:8123/dev/events").read()) if e["event_type"] == "cronologia_pontos"]
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def presence(): return json.load(open(f"{SHARE}/resolvia/integracao.json"))
today = datetime.date.today().isoformat()
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
        ctxA = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark")
        ctxB = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark")
        A = await ctxA.new_page(); B = await ctxB.new_page()
        errs = []
        for pg in (A, B): pg.on("pageerror", lambda e: errs.append(str(e)))
        await A.goto(LISTAS); await A.wait_for_timeout(1500)
        # Mais › Integrações
        await A.locator(".tab", has_text="Mais").click(); await A.wait_for_timeout(400)
        await A.locator(".more-row", has_text="Configurações").click(); await A.wait_for_timeout(400)
        tabs = [t.strip() for t in await A.locator(".more-tabs button").all_inner_texts()]
        check(tabs == ["Integrações", "Dados", "Aparência", "Opções"], f"Integrações tab in place of IA, in Configurações ({tabs})")
        await A.get_by_role("tab", name="Integrações", exact=True).click(); await A.wait_for_timeout(600)
        rp = await A.locator("#recompensas").inner_text()
        check("Usar recompensas" in rp and "Conectado" not in rp and "Desligado" in rp, "Recompensas starts off: only the switch (ResolvIA 2.13.0)")
        check(await A.locator("#leitura-ia").count() == 1, "IA do Home Assistant in the same tab")
        sw = A.locator("#recompensas .switch input")
        check(not await sw.is_checked(), "points start off")
        await sw.check(); await A.wait_for_timeout(700)
        rp = await A.locator("#recompensas").inner_text()
        check("Conectado ao placar do CronologIA 1.6.0" in rp and "Davi × Aurora" in rp and "os pontos vão para Davi" in rp, "on: Recompensas shows the CronologIA scoreboard and who you are")
        await sw.uncheck(); await A.wait_for_timeout(700)
        await A.screenshot(path=f"{SP}/shots/rvp-integracoes.png")
        # off: no field in the item sheet
        await A.goto(LISTAS); await A.wait_for_timeout(1000)
        await A.locator(".list-card", has_text="Casa").click(); await A.wait_for_timeout(500)
        await A.locator(".items .item .it-body", has_text="Passar pano").click(); await A.wait_for_timeout(300)
        check(await A.locator(".sheet .flabel", has_text="Pontos").count() == 0, "no points field while off")
        await A.locator(".sheet .icon-btn[aria-label=Fechar]").click(); await A.wait_for_timeout(300)
        # turn on
        await A.locator(".tab", has_text="Mais").click(); await A.wait_for_timeout(300)
        await A.locator(".more-row", has_text="Configurações").click(); await A.wait_for_timeout(400)
        await A.get_by_role("tab", name="Integrações", exact=True).click(); await A.wait_for_timeout(400)
        await A.locator("#recompensas .switch input").check(); await A.wait_for_timeout(700)
        check(stored()["prefs"]["app"].get("points_on") is True, "switch saved")
        await wait_for(lambda: presence().get("pontos") == {}, "ResolvIA tells the CronologIA (no points yet)")
        # set +10 on Passar pano
        await A.goto(LISTAS); await A.wait_for_timeout(1000)
        await A.locator(".list-card", has_text="Casa").click(); await A.wait_for_timeout(500)
        await A.locator(".items .item .it-body", has_text="Passar pano").click(); await A.wait_for_timeout(400)
        check(await A.locator(".sheet .flabel", has_text="Pontos para quem concluir").count() == 1, "points field in the item sheet")
        await A.locator(".sheet .pick", has_text="+10").click(); await A.wait_for_timeout(150)
        await A.screenshot(path=f"{SP}/shots/rvp-sheet.png")
        await A.locator(".sheet .btn.primary").click(); await A.wait_for_timeout(700)
        check(stored()["points"] == {"todo.casa": {"passar pano na casa": 10}}, f"points saved ({stored().get('points')})")
        check(presence()["pontos"] == {"todo.casa": {"passar pano na casa": 10}}, "and published for the CronologIA")
        row = A.locator(".items .item", has_text="Passar pano")
        check((await row.locator(".tag.pts").inner_text()).strip() == "+10", "+10 chip on the task")
        # complete as Davi
        await row.locator(".check").click()
        await wait_for(lambda: any(e["data"].get("acao") == "somar" and e["data"].get("quem") == "Davi" and e["data"].get("pontos") == 10 and e["data"]["chave"].startswith("resolvia|todo.casa|") and e["data"]["chave"].endswith(today) for e in events()), "completing sends +10 for Davi to the CronologIA")
        toast = await A.locator(".toast").inner_text()
        check("Resolvido por Davi · +10" in toast and "Foi Aurora" in toast, f"toast ({toast.strip()})")
        await A.screenshot(path=f"{SP}/shots/rvp-toast.png")
        await A.locator(".toast button", has_text="Foi Aurora").click()
        await wait_for(lambda: any(e["data"].get("acao") == "trocar" and e["data"].get("quem") == "Aurora" for e in events()), "Foi Aurora moves the points")
        # reopen
        await A.locator(".done-toggle").click(); await A.wait_for_timeout(300)
        await A.locator(".items .item.done", has_text="Passar pano").locator(".check").click()
        await wait_for(lambda: any(e["data"].get("acao") == "desfazer" for e in events()), "reopening takes the points back")
        # unknown user: asks who (the app again, now without a known Home Assistant user)
        start_app(None)
        await B.goto(LISTAS); await B.wait_for_timeout(1500)
        await B.locator(".list-card", has_text="Casa").click(); await B.wait_for_timeout(500)
        await B.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await B.wait_for_timeout(700)
        check("Quem fez?" in await B.locator(".sheet").inner_text(), "unknown user: asks who did it")
        await B.screenshot(path=f"{SP}/shots/rvp-who.png")
        n0 = len(events())
        await B.locator(".sheet .who-btn", has_text="Aurora").click()
        await wait_for(lambda: any(e["data"].get("acao") == "somar" and e["data"].get("quem") == "Aurora" for e in events()[n0:]), "the chosen person gets the points")
        # rename keeps the points
        start_app("u-davi")
        await A.goto(LISTAS); await A.wait_for_timeout(1000)
        await A.locator(".list-card", has_text="Casa").click(); await A.wait_for_timeout(500)
        await A.locator(".items .item .it-body", has_text="Trocar filtro").click(); await A.wait_for_timeout(400)
        await A.locator(".sheet .pick", has_text="+20").click()
        await A.locator(".sheet textarea").first.fill("Trocar filtro do ar da sala")
        await A.locator(".sheet .btn.primary").click(); await A.wait_for_timeout(800)
        check(stored()["points"]["todo.casa"].get("trocar filtro do ar da sala") == 20, "points set together with a rename")
        await A.locator(".items .item .it-body", has_text="Trocar filtro do ar da sala").click(); await A.wait_for_timeout(400)
        await A.locator(".sheet textarea").first.fill("Trocar filtro do ar")
        await A.locator(".sheet .btn.primary").click(); await A.wait_for_timeout(800)
        pts = stored()["points"]["todo.casa"]
        check(pts.get("trocar filtro do ar") == 20 and "trocar filtro do ar da sala" not in pts, f"rename moves the points ({pts})")
        # new item with points
        await A.locator(".tab.fab").click(); await A.wait_for_timeout(300)
        await A.locator(".sheet textarea").first.fill("Lavar a louça")
        await A.locator(".sheet").get_by_role("button", name="+5", exact=True).click()
        await A.locator(".sheet .btn.primary").click(); await A.wait_for_timeout(900)
        check(stored()["points"]["todo.casa"].get("lavar a louca") == 5, "points on a new item")
        # Dados: the points go in the export
        snap = json.loads(urllib.request.urlopen(URL + "api/export/json").read())
        check(snap.get("points", {}).get("todo.casa", {}).get("lavar a louca") == 5, "points in the JSON export")
        # off again: nothing sent
        await A.locator(".tab", has_text="Mais").click(); await A.wait_for_timeout(300)
        await A.locator(".more-row", has_text="Configurações").click(); await A.wait_for_timeout(400)
        await A.get_by_role("tab", name="Integrações", exact=True).click(); await A.wait_for_timeout(400)
        await A.locator("#recompensas .switch input").uncheck(); await A.wait_for_timeout(700)
        check(presence()["pontos"] == {}, "off: nothing published")
        await A.goto(LISTAS); await A.wait_for_timeout(1000)
        await A.locator(".list-card", has_text="Casa").click(); await A.wait_for_timeout(500)
        check(await A.locator(".tag.pts").count() == 0, "off: no chips")
        n0 = len(events())
        await A.locator(".items .item:not(.done)", has_text="Lavar a louça").locator(".check").click(); await A.wait_for_timeout(1000)
        check(len(events()) == n0, "off: completing sends nothing")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    procs["app"].terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
