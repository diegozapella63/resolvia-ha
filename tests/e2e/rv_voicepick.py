# ResolvIA 2.24.0: Falar › choose the speech-to-text in Mais › Integrações, without touching the voice assistant of Home Assistant.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, re
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvf-data", f"{SP}/rvf-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
def start(extra=None):
    f = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", **(extra or {})), stdout=open(f"{SP}/rvf_fake.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(0.6)
    a = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvf_app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    return [f, a]
procs = start()
def fake_log(): return open(f"{SP}/rvf_fake.log").read()
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
def prefs(): return json.load(open(f"{DATA}/resolvia.json"))["prefs"]["app"]
async def speak(pg, a, sheet):
    await a.locator(".mic-top:not(.chat-top):visible").click(); await pg.wait_for_timeout(2200)
    await sheet.locator(".btn.primary", has_text="Pronto").click()
    for _ in range(40):
        if "Revisar itens" in await sheet.inner_text(): return True
        await asyncio.sleep(0.25)
    return False
async def main():
    global procs
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, permissions=["microphone"])
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await a.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(600)
        panel = a.locator("#falar")
        check(await panel.count() == 1, "Integrações: Falar")
        txt = await panel.inner_text(); print(txt)
        check("Pronto para ouvir" in txt and "Home Assistant Cloud" in txt and "assistente de voz" in txt, "automatic: the voice assistant's (Home Assistant Cloud)")
        sel = panel.locator("select[aria-label='Fala para texto']")
        opts = await sel.locator("option").all_inner_texts(); print("OPTIONS:", opts)
        check(opts[0] == "Automático: Home Assistant Cloud" and "faster-whisper" in opts and "Home Assistant Cloud" in opts, f"the engines of Home Assistant ({opts})")
        await panel.scroll_into_view_if_needed(); await panel.screenshot(path=f"{SP}/shots/rvf-panel.png")
        # choose Whisper
        await sel.select_option("stt.faster_whisper"); await pg.wait_for_timeout(1200)
        check(prefs().get("voice_engine") == "stt.faster_whisper", f"saved ({prefs().get('voice_engine')})")
        txt = await panel.inner_text()
        check("Transcreve com faster-whisper." in txt, f"says it ({txt[:200]!r})")
        check("atualizada" in await a.locator(".toast").inner_text(), "toast")
        # Falar now goes to Whisper, in Portuguese as Whisper names it
        check(await speak(pg, a, sheet), "Falar with Whisper: the items to check")
        log = fake_log()
        check(re.search(r"stt stt\.faster_whisper \d+ .*language=pt$", log, re.M), "the audio goes to faster-whisper, language=pt")
        await sheet.locator(".icon-btn[aria-label='Fechar']").first.click(); await pg.wait_for_timeout(300)
        # back to automatic
        await sel.select_option(""); await pg.wait_for_timeout(1200)
        check(prefs().get("voice_engine") in (None, ""), f"automatic again ({prefs().get('voice_engine')})")
        n0 = len(re.findall(r"^stt stt\.home_assistant_cloud", fake_log(), re.M))
        check(await speak(pg, a, sheet), "Falar automatic: the items to check")
        check(len(re.findall(r"^stt stt\.home_assistant_cloud \d+ .*language=pt-BR$", fake_log(), re.M)) == n0 + 1, "the audio goes to Home Assistant Cloud again, pt-BR")
        await sheet.locator(".icon-btn[aria-label='Fechar']").first.click(); await pg.wait_for_timeout(300)
        # AI off: no Falar panel
        await a.locator("#leitura-ia input[aria-label='Usar IA']").uncheck(); await pg.wait_for_timeout(800)
        check(await a.locator("#falar").count() == 0, "Usar IA off: no Falar panel")
        await a.locator("#leitura-ia input[aria-label='Usar IA']").check(); await pg.wait_for_timeout(800)
        check(not errs, f"no page errors {errs}")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
