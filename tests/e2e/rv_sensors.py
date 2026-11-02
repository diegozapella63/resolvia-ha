# ResolvIA 2.20.0: Sensores no Home Assistant only when turned on (off by default); off removes it.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil, urllib.request, urllib.error
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvs-data", f"{SP}/rvs-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
def req(method, entity, body=None):
    r = urllib.request.Request(f"http://127.0.0.1:8123/api/states/{entity}", data=json.dumps(body).encode() if body else None, method=method, headers={"authorization": "Bearer test", "content-type": "application/json"})
    try: return json.loads(urllib.request.urlopen(r).read() or b"null")
    except urllib.error.HTTPError as e: return e.code
def has(e): return isinstance(req("GET", e), dict)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
req("POST", "sensor.resolvia_ia_hoje", {"state": "2", "attributes": {}})
check(has("sensor.resolvia_ia_hoje"), "an old sensor is there before the app starts")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvs_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
def extract():
    r = urllib.request.Request("http://127.0.0.1:8099/api/extract", data=json.dumps({"text": "leite, ovos"}).encode(), method="POST", headers={"content-type": "application/json"})
    try: urllib.request.urlopen(r).read()
    except Exception: pass
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(2000)
        await wait_for(lambda: not has("sensor.resolvia_ia_hoje"), "off by default: the old sensor is removed")
        extract(); await asyncio.sleep(1.5)
        check(not has("sensor.resolvia_ia_hoje"), "an AI call does not create it")
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(500)
        panel = pg.locator("#sensores")
        check(await panel.count() == 1, "Integrações: Sensores no Home Assistant")
        uso = " ".join(await pg.locator(".uso-note").all_inner_texts())
        check("sensor.resolvia_ia_hoje" not in uso and "ligue" not in uso, "sensors off: Uso da IA does not talk about the sensor")
        sw = panel.locator("input[aria-label='Criar sensores']")
        check(not await sw.is_checked(), "off")
        await sw.check()
        await wait_for(lambda: json.load(open(f"{DATA}/resolvia.json"))["prefs"]["app"].get("sensors_on") is True, "on: saved")
        await wait_for(lambda: has("sensor.resolvia_ia_hoje"), "on: the sensor is created")
        check(await panel.locator(".sensor-row").count() == 1, "and listed")
        await sw.uncheck()
        await wait_for(lambda: not has("sensor.resolvia_ia_hoje"), "off: the sensor is removed")
        extract(); await asyncio.sleep(1.5)
        check(not has("sensor.resolvia_ia_hoje"), "and AI calls do not bring it back")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
