# ResolvIA 2.34.0: Serviço externo. In the item (Quem faz): Nós mesmos or Serviço externo, with who
# when said; the tag on the task, found by Buscar; back to Nós mesmos takes it out.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvx-data", f"{SP}/rvx-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA); os.makedirs(f"{SP}/shots", exist_ok=True)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=open(f"{SP}/rvx_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, MEDIA_DIR=f"{SP}/rvx-media", PORT="8099"), stdout=open(f"{SP}/rvx_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            got = fn()
            if asyncio.iscoroutine(got): got = await got
            if got: return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(800)
        row = a.locator(".page .item", has_text="Passar pano na casa").first
        await row.locator(".it-body").click(); await pg.wait_for_timeout(500)
        field = sheet.locator(".field:has(.flabel:text-is('Quem faz'))")
        chips = [t.strip() for t in await field.locator(".pick").all_inner_texts()]
        check(chips == ["Nós mesmos", "Serviço externo"], f"the item: Quem faz ({chips})")
        check("on" in (await field.locator(".pick", has_text="Nós mesmos").get_attribute("class")), "Nós mesmos by default")
        await field.locator(".pick", has_text="Serviço externo").click(); await pg.wait_for_timeout(200)
        who = field.locator("input[aria-label='Quem vai fazer']")
        check(await who.count() == 1, "Serviço externo asks who (optional)")
        await who.fill("Diarista")
        await field.screenshot(path=f"{SP}/shots/rvx-field.png")
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1200)
        await wait_for(lambda: stored().get("ext", {}).get("todo.casa", {}).get("passar pano na casa") == "Diarista", "saved: Diarista")
        tag = a.locator(".page .item", has_text="Passar pano na casa").first.locator(".tag.ext")
        check(await tag.count() == 1 and (await tag.inner_text()).strip() == "Diarista", "the task shows who does it")
        await pg.screenshot(path=f"{SP}/shots/rvx-list.png")
        # a new task, from outside without a name
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(400)
        await sheet.locator("textarea").first.fill("Consertar o portão")
        await sheet.locator(".field:has(.flabel:text-is('Quem faz')) .pick", has_text="Serviço externo").click()
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1500)
        await wait_for(lambda: stored().get("ext", {}).get("todo.casa", {}).get("consertar o portao") is True, "a new task: Serviço externo, no name")
        tag = a.locator(".page .item", has_text="Consertar o portão").first.locator(".tag.ext")
        await wait_for(lambda: tag.count(), "its tag")
        check((await tag.inner_text()).strip() == "Serviço externo", "the tag says Serviço externo")
        # Buscar by who
        await a.evaluate("(el) => el._go('/buscar')"); await pg.wait_for_timeout(500)
        await a.locator("input[data-q='buscar']").fill("diarista"); await pg.wait_for_timeout(300)
        found = [t.split("\n")[0] for t in await a.locator(".panel.items .item").all_inner_texts()]
        check(any("Passar pano na casa" in t for t in found), f"Buscar finds it by who ({found})")
        # back to Nós mesmos
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        await a.locator(".page .item", has_text="Passar pano na casa").first.locator(".it-body").click(); await pg.wait_for_timeout(500)
        field = sheet.locator(".field:has(.flabel:text-is('Quem faz'))")
        check(await field.locator("input[aria-label='Quem vai fazer']").input_value() == "Diarista", "editing: who comes back")
        await field.locator(".pick", has_text="Nós mesmos").click()
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1200)
        await wait_for(lambda: "passar pano na casa" not in stored().get("ext", {}).get("todo.casa", {}), "Nós mesmos: it goes")
        check(await a.locator(".page .item", has_text="Passar pano na casa").first.locator(".tag.ext").count() == 0, "no tag")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
