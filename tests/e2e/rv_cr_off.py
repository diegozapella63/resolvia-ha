# ResolvIA 2.15.0: the CronologIA turned its ResolvIA integration off; prazos published for the CronologIA.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, datetime
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvo-data", f"{SP}/rvo-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(f"{SHARE}/cronologia")
now_z = datetime.datetime.now(datetime.timezone.utc).isoformat()
json.dump({"app": "CronologIA", "versao": "1.16.0", "gravado_em": now_z, "resolvia": False,
           "placar": {"ativo": True, "periodo": "semana", "participantes": ["Diego", "Andressa"], "usuarios": {"u-diego": "Diego"}},
           "espelho": {"todo.casa": {"u8": {"pontos": 10, "tipo": "rotina"}}}}, open(f"{SHARE}/cronologia/integracao.json", "w"))
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-diego", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvo_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def presence(): return json.load(open(f"{SHARE}/resolvia/integracao.json"))
WS1 = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, ...m})); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.type === 'result') { ws.close(); res(r); } }; })"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1300)
        check(presence().get("prazos") is True, "presence: prazos on by default")
        await pg.evaluate(WS1, {"type": "resolvia/prefs/set_app", "prefs": {"points_on": True, "due_off": True}})
        await pg.wait_for_timeout(500)
        check(presence().get("prazos") is False, "presence: prazos off right after the switch")
        st = (await pg.evaluate(WS1, {"type": "resolvia/points/get"}))["result"]
        check(st["placar"]["desligado"] is True and st["placar"]["ativo"] is False and st["espelho"] == {}, "placar: desligado, inactive, nothing mirrored")
        await pg.reload(); await pg.wait_for_timeout(1300)
        await pg.locator("nav .tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(600)
        rp = await pg.locator("#recompensas").inner_text()
        check("Integração desligada no CronologIA" in rp and "Usar a integração" in rp, "Recompensas says the integration is off in the CronologIA")
        await pg.evaluate(WS1, {"type": "resolvia/points/set", "entity_id": "todo.casa", "summary": "Passar pano na casa", "points": 10})
        r = (await pg.evaluate(WS1, {"type": "resolvia/points/done", "entity_id": "todo.casa", "uid": "u8", "summary": "Passar pano na casa", "done": True}))
        print("done:", r)
        check(r.get("success") and (r.get("result") or {}).get("points", 0) == 0 and not (r.get("result") or {}).get("ask"), "completing gives no points")
        await pg.evaluate(WS1, {"type": "resolvia/prefs/set_app", "prefs": {"due_off": None}})
        await pg.wait_for_timeout(500)
        check(presence().get("prazos") is True, "presence: prazos back on")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" + (f", FAILED: {failed}" if failed else ""))
