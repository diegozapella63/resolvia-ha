# ResolvIA 2.18.0: Falar (the microphone at the top right: Home Assistant transcribes, the items are separated).
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, re
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvv-data", f"{SP}/rvv-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
def start(extra=None):
    f = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", **(extra or {})), stdout=open(f"{SP}/rvv_fake.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(0.6)
    a = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvv_app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    return [f, a]
procs = start()
def fake_log(): return open(f"{SP}/rvv_fake.log").read()
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if (await fn()) if asyncio.iscoroutinefunction(fn) else fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def main():
    global procs
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, permissions=["microphone"])
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        mic = a.locator(".mic-top:not(.chat-top):visible")
        check(await mic.count() == 1, "Listas: the microphone at the top right")
        box = await mic.bounding_box()
        check(box and box["x"] > 300, f"on the right ({box})")
        # inside a list: the microphone adds there
        await a.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(700)
        lm = a.locator(".detail-head .mic-top:not(.chat-top)")
        check(await lm.count() == 1, "a list: the microphone next to the options")
        await lm.click(); await pg.wait_for_timeout(1500)
        st = await sheet.inner_text()
        check("Ouvindo" in st and "Vai para Casa" in st, f"Ouvindo, into Casa ({st[:80]!r})")
        await pg.screenshot(path=f"{SP}/shots/rvv-listening.png")
        await pg.wait_for_timeout(1200)
        await sheet.locator(".btn.primary", has_text="Pronto").click()
        await wait_for(lambda: re.search(r"stt stt\.home_assistant_cloud \d+ format=wav; codec=pcm; sample_rate=16000; bit_rate=16; channel=1; language=pt-BR", fake_log()), "the audio goes to the speech-to-text of Home Assistant")
        async def review(): return "Revisar itens" in await sheet.inner_text()
        await wait_for(review, "the items to check")
        st = await sheet.inner_text()
        check("“Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador”" in st, "what was heard is shown")
        rows = [t.strip() for t in await sheet.locator(".imp-row .imp-text").evaluate_all("(els) => els.map((e) => e.value)")]
        print("ITEMS:", rows)
        check(len(rows) == 3 and any("pilhas" in r for r in rows) and any("encanador" in r for r in rows), f"3 items separated ({rows})")
        await pg.screenshot(path=f"{SP}/shots/rvv-review.png")
        dests = await sheet.locator(".imp-row").evaluate_all("(els) => els.map((e) => [e.querySelector('.imp-text').value, (e.querySelector('.imp-dest .dname') || {}).textContent || ''])")
        check(any("pilhas" in t and "Shopping" in d for t, d in dests) and any("encanador" in t and d == "Casa" for t, d in dests), f"the AI picks the list of each item ({dests})")
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1500)
        page = await a.locator(".page").first.inner_text()
        check("encanador" in page and "Comprar pilhas" not in page, "encanador in Casa, pilhas went to the shopping list")
        check(not errs, f"no page errors {errs}")
        await b.close()
    for pr in procs: pr.kill()
    time.sleep(0.5)
    procs = start({"FAKE_NO_STT": "1"})
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844})
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        check(await pg.locator("resolvia-panel").locator(".mic-top:not(.chat-top):visible").count() == 0, "without speech-to-text: no microphone")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
