# ResolvIA 2.9.0: tasks kept by the CronologIA (Levar para o ResolvIA).
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
DATA, SHARE = f"{SP}/rvm-data", f"{SP}/rvm-share"
for d in (DATA, SHARE):
    shutil.rmtree(d, ignore_errors=True)
os.makedirs(f"{SHARE}/cronologia")
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rvm_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
# the uid of "Passar pano na casa" straight from the fake Home Assistant
js = """const ws = new WebSocket('ws://127.0.0.1:8123/api/websocket'); ws.onmessage = (e) => { const m = JSON.parse(e.data);
 if (m.type === 'auth_required') ws.send(JSON.stringify({type:'auth', access_token:'test'}));
 else if (m.type === 'auth_ok') ws.send(JSON.stringify({id:1, type:'todo/item/list', entity_id:'todo.casa'}));
 else if (m.id === 1) { console.log(JSON.stringify(m.result.items)); ws.close(); } };"""
items = json.loads(subprocess.check_output(["node", "-e", js]).decode())
pano = next(i for i in items if i["summary"] == "Passar pano na casa")
now_z = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
json.dump({"app": "CronologIA", "versao": "1.10.0", "gravado_em": now_z, "placar": {"ativo": True, "periodo": "semana", "participantes": ["Diego", "Andressa"], "usuarios": {"u-diego": "Diego"}}, "espelho": {"todo.casa": {pano["uid"]: {"pontos": 10, "tipo": "rotina"}}}}, open(f"{SHARE}/cronologia/integracao.json", "w"))
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-diego", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rvm_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = "http://127.0.0.1:8099/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def events(): return [e for e in json.loads(urllib.request.urlopen("http://127.0.0.1:8123/dev/events").read()) if e["event_type"] == "cronologia_pontos"]
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if (await fn()) if asyncio.iscoroutinefunction(fn) else fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
KEY = f"espelho|todo.casa|{pano['uid']}"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        # the CronologIA writes the marker in the notes
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)
        await pg.evaluate("""(uid) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'call_service', domain: 'todo', service: 'update_item', service_data: {item: uid, description: 'Rotina da casa do CronologIA · +10 pontos [cr:1a2b3c4d]'}, target: {entity_id: 'todo.casa'}})); ws.onmessage = () => { ws.close(); res(); }; })""", pano["uid"])
        # Recompensas off: no points promised anywhere (the CronologIA marks it done, with no one's points) (2.44.0)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(700)
        row = pg.locator(".items .item", has_text="Passar pano")
        check(await row.locator(".tag.pts").count() == 0, "Recompensas off: no points on the task")
        await row.locator(".it-body").click(); await pg.wait_for_timeout(400)
        sheet = await pg.locator(".sheet").inner_text()
        check("Vem do CronologIA: concluir aqui marca como feito lá. Para editar" in sheet and "(10 pontos)" not in sheet and await pg.locator(".sheet .ro-tags .tag.pts").count() == 0, f"Recompensas off: the sheet promises no points ({sheet!r})")
        await pg.screenshot(path=f"{SP}/shots/rvm-sheet-off.png")
        await pg.locator(".sheet .btn.primary", has_text="Fechar").click(); await pg.wait_for_timeout(400)
        # Recompensas on (ResolvIA 2.13.0: off by default, and then no points at all)
        await pg.evaluate("""() => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'resolvia/prefs/set_app', prefs: {points_on: true}})); ws.onmessage = () => { ws.close(); res(); }; })""")
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(700)
        row = pg.locator(".items .item", has_text="Passar pano")
        check((await row.locator(".tag.pts").inner_text()).strip() == "+10", "CronologIA task shows its points (Recompensas on)")
        desc = await row.locator(".it-desc").inner_text()
        check("[cr:" not in desc and "Rotina da casa do CronologIA" in desc, f"marker hidden in the notes ({desc})")
        await row.locator(".it-body").click(); await pg.wait_for_timeout(400)
        sheet = await pg.locator(".sheet").inner_text()
        check("Vem do CronologIA" in sheet and "(10 pontos)" in sheet and "ROTINA DA CASA" in sheet.upper(), "read-only sheet explains it comes from the CronologIA")
        check(await pg.locator(".sheet textarea").count() == 0 and await pg.locator(".sheet .flabel", has_text="Repetir").count() == 0 and await pg.locator(".sheet .flabel", has_text="Pontos para quem concluir").count() == 0, "nothing to edit there (name, notes, date, repeat, points)")
        ro = await pg.locator(".sheet .ro-item").inner_text()
        check("Passar pano na casa" in ro and "+10" in ro and "[cr:" not in ro and "Rotina da casa do CronologIA" in ro, f"shows name, points and notes without the marker")
        check(await pg.locator(".sheet .btn.danger").count() == 1, "can still be deleted")
        await pg.screenshot(path=f"{SP}/shots/rvm-sheet.png")
        await pg.locator(".sheet .btn.primary", has_text="Fechar").click(); await pg.wait_for_timeout(500)
        after = next(i for i in json.loads(subprocess.check_output(["node", "-e", js]).decode()) if i["uid"] == pano["uid"])
        check(after.get("description", "").endswith("[cr:1a2b3c4d]"), "closing leaves the item as it was")
        # complete: Diego (this user) gets the points through the CronologIA
        await row.locator(".check").click()
        await wait_for(lambda: any(e["data"].get("acao") == "somar" and e["data"].get("chave") == KEY and e["data"].get("quem") == "Diego" and e["data"].get("pontos") == 10 for e in events()), "completing tells the CronologIA who did it (espelho key)")
        toast = await pg.locator(".toast").inner_text()
        check("Resolvido por Diego · +10" in toast and "Foi Andressa" in toast, f"toast ({toast.strip()})")
        await pg.locator(".toast button", has_text="Foi Andressa").click()
        await wait_for(lambda: any(e["data"].get("acao") == "trocar" and e["data"].get("chave") == KEY and e["data"].get("quem") == "Andressa" for e in events()), "Foi Andressa goes to the CronologIA")
        # reopen: the CronologIA undoes
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(300)
        await pg.locator(".items .item.done", has_text="Passar pano").locator(".check").click()
        await wait_for(lambda: any(e["data"].get("acao") == "desfazer" and e["data"].get("chave") == KEY for e in events()), "reopening tells the CronologIA to undo")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
