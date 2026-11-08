# ResolvIA 2.17.0: Buscar on the home (like the InventarIA), the cursor in Buscar on the computer, "/" opens it;
# Sugestões fills its top in the order of the list when the items are new (one list, no ages yet).
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvhs-data", f"{SP}/rvhs-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
# only Casa on the start screen, deadlines off (the Sugestões tab)
json.dump({"version": 1, "prefs": {"lists": {"todo.analise_dos_dispositivos_problem_list": {"hidden": True}, "todo.notas_e_rotinas_do_alexa_to_do_list": {"hidden": True}}, "app": {"due_off": True}}, "rules": {}, "points": {}}, open(f"{DATA}/resolvia.json", "w"))
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(1.2)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
FOCUSED = "() => { const r = document.querySelector('resolvia-panel').shadowRoot; const a = r.activeElement; return a ? (a.dataset.q || a.name || a.tagName) : null; }"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1200, "height": 800})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel")
        box = a.locator("form.home-search input")
        check(await box.count() == 1, "the home has the Buscar box")
        ph = await box.get_attribute("placeholder")
        check(ph.startswith("Buscar entre ") and "itens" in ph, f"placeholder with the number of items ({ph})")
        check(await a.locator("form.home-search kbd").is_visible(), "with the / key on the computer")
        # typing: Buscar opens with the text, and the cursor goes on there
        await box.click(); await pg.keyboard.type("Pa")
        await pg.wait_for_timeout(500)
        check(await a.locator("input[data-q='buscar']").count() == 1, "the first letter opens Buscar")
        await pg.keyboard.type("no")
        await pg.wait_for_timeout(300)
        val = await a.locator("input[data-q='buscar']").input_value()
        check(val == "Pano", f"the typing goes on in Buscar ({val!r})")
        check(await pg.evaluate(FOCUSED) == "buscar", "the cursor is in the box")
        check("Passar pano" in await a.locator(".page").inner_text(), "and it finds the item")
        # the sidebar: Buscar puts the cursor in the box (computer)
        await a.locator(".side-link", has_text="Listas").click(); await pg.wait_for_timeout(500)
        await a.locator(".side-link", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        check(await pg.evaluate(FOCUSED) == "buscar", "Buscar from the sidebar: the cursor already in the box")
        check(await a.locator(".side-link", has_text="Buscar").locator("kbd").inner_text() == "/", "the sidebar shows the / key")
        # "/" from anywhere
        await a.locator(".side-link", has_text="Mais").click(); await pg.wait_for_timeout(500)
        await a.locator(".page-title").first.click(); await pg.keyboard.press("/"); await pg.wait_for_timeout(600)
        check(await pg.evaluate(FOCUSED) == "buscar" and await a.locator("input[data-q='buscar']").input_value() in ("", "Pano"), "the / key opens Buscar with the cursor in it")
        await a.locator("input[data-q='buscar']").fill("")
        await pg.keyboard.type("/")
        await pg.wait_for_timeout(200)
        check(await a.locator("input[data-q='buscar']").input_value() == "/", "typing / in the box is just a character")
        # Sugestões with one list of new items: still a top of more than one
        await a.locator(".side-link", has_text="Sugestões").click(); await pg.wait_for_timeout(1200)
        top = a.locator(".panel.items", has_text="Comece por aqui").locator(".item")
        texts = [t.replace("\n", " / ") for t in await top.all_inner_texts()]
        print("TOP:", texts)
        check(len(texts) == 3, f"one list of 3: all 3 come (was 2) ({len(texts)})")
        check(any("Passar pano" in t for t in texts), "including the first of the list")
        await pg.screenshot(path=f"{SP}/shots/rvhs-sugestoes.png")
        # the phone: no automatic focus (the keyboard would cover the screen), no key hint
        ph2 = await b.new_page(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
        await ph2.goto("http://127.0.0.1:8099/?aba=listas"); await ph2.wait_for_timeout(1800)
        b2 = ph2.locator("resolvia-panel")
        check(not await b2.locator("form.home-search kbd").is_visible(), "phone: no / hint")
        await b2.locator("nav .tab", has_text="Buscar").tap(); await ph2.wait_for_timeout(600)
        foc = await ph2.evaluate(FOCUSED)
        check(foc != "buscar", f"phone: Buscar does not pop the keyboard by itself ({foc})")
        check(not errs, f"no page errors {errs}")
        await b.close()
try: asyncio.run(main())
finally:
    fake.kill(); app.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
