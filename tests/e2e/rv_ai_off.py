# ResolvIA 2.10.0: Mais › Integrações › Usar IA.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, urllib.request, urllib.error
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rva-data", f"{SP}/rva-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rva_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rva_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def extract():
    try:
        urllib.request.urlopen(urllib.request.Request("http://127.0.0.1:8099/api/extract", data=json.dumps({"text": "leite, ovos"}).encode(), method="POST", headers={"content-type": "application/json"}))
        return 200
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}").get("code")
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
        pg = await b.new_page(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1200)
        heads = [t.strip() for t in await pg.locator(".grp-head:not(.desk-only) h2").all_inner_texts()]
        check(len(heads) >= 2, f"the group headings are there ({heads})")
        print("groups:", heads)
        check("LISTAS LOCAIS" in [h.upper() for h in heads] and not any(h.upper() == "LISTAS" for h in heads), f"the group without a name is Listas locais ({heads})")
        check("oculta" not in await pg.locator(".page").first.inner_text(), "no 'lista oculta' line on the home")
        check(await pg.locator(".mic-top:visible").count() == 1, "AI on: Falar at the top")
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".quick .imp-btn").count() == 1, "AI on: the list has the import button")
        check(await pg.locator(".mic-top:visible").count() == 1, "AI on: Falar in the list")
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(400)
        await pg.locator("input[aria-label='Usar IA']").uncheck()
        await wait_for(lambda: stored()["prefs"]["app"].get("ai_off") is True, "Usar IA off saved")
        txt = await pg.locator("#leitura-ia").inner_text()
        check("Desligado" in txt and await pg.locator("#leitura-ia select").count() == 0, "off: AI panel shows only the switch")
        await pg.screenshot(path=f"{SP}/shots/rva-off.png")
        check(extract() == (409, "ai_off"), "off: the server refuses to read with AI")
        await pg.locator(".tab", has_text="Adicionar").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".sheet .imp-tile").count() == 0 and await pg.locator(".sheet .ai-box").count() == 0, "off: Novo item without the import tiles")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        for _ in range(3):
            if await pg.locator(".list-card", has_text="Casa").count(): break
            await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(400)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".quick .imp-btn").count() == 0, "off: no import button in the list")
        check(await pg.locator(".mic-top:visible").count() == 0, "off: no Falar in the list")
        await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".mic-top:visible").count() == 0, "off: no Falar at the top")
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(400)
        await pg.locator("input[aria-label='Usar IA']").check()
        await wait_for(lambda: "ai_off" not in stored()["prefs"]["app"], "back on")
        check(extract() != (409, "ai_off"), "on: the server reads again")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
