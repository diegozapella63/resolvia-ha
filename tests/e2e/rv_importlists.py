# ResolvIA 2.23.0: each imported item goes to its own list, suggested by the AI.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil, re
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvl-data", f"{SP}/rvl-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
def start(extra=None):
    f = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", **(extra or {})), stdout=open(f"{SP}/rvl_fake.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(0.6)
    a = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvl_app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.2)
    return [f, a]
procs = start()
def fake_log(): return open(f"{SP}/rvl_fake.log").read()
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
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.evaluate("(el) => el._openImport('todo.casa', 'text')"); await pg.wait_for_timeout(500)
        await sheet.locator("textarea").fill("Arrumar pia vazando, comprar leite e trocar a lâmpada da sala")
        await sheet.locator(".btn.primary", has_text="Separar itens").click()
        async def review(): return "Revisar itens" in await sheet.inner_text()
        await wait_for(review, "the items to check")
        await pg.wait_for_timeout(300)
        async def rows():
            return await sheet.locator(".imp-row").evaluate_all("(els) => els.map((e) => [e.querySelector('input').value, (e.querySelector('.imp-dest .dname') || {}).textContent || ''])")
        r = await rows(); print("ROWS:", r)
        check(len(r) == 3 and all(d for _, d in r), "every item shows its list")
        leite = [d for t, d in r if "leite" in t.lower()]
        others = [d for t, d in r if "leite" not in t.lower()]
        check(leite and "Shopping" in leite[0], f"the AI puts the milk in the shopping list ({leite})")
        check(others and all(d == "Casa" for d in others), f"the rest stays in Casa ({others})")
        btn = sheet.locator(".btn.primary").last
        check("em 2 listas" in await btn.inner_text(), f"button: 2 lists ({await btn.inner_text()!r})")
        st = await sheet.inner_text()
        check("Todos em" in st and "Adicionar em" not in st, "the chips set all of them (Todos em)")
        check("Cada item vai para" not in st, "no hint under the list choice (less is more)")
        await pg.screenshot(path=f"{SP}/shots/rvl-review.png")
        # all in one list
        await sheet.locator(".chip-row.grid .pick", has_text="Casa").click(); await pg.wait_for_timeout(300)
        r = await rows()
        check(all(d == "Casa" for _, d in r), f"Todos em Casa: all of them in Casa ({r})")
        check("em Casa" in await btn.inner_text(), f"button: em Casa ({await btn.inner_text()!r})")
        check(await sheet.locator(".chip-row.grid .pick.on").count() == 1, "the Casa chip is on")
        # one by one
        sel = sheet.locator(".imp-row select")
        i_leite = [k for k, (t, _) in enumerate(r) if "leite" in t.lower()][0]
        i_lamp = [k for k, (t, _) in enumerate(r) if "lâmpada" in t.lower()][0]
        await sel.nth(i_leite).select_option("todo.notas_e_rotinas_do_alexa_shopping_list"); await pg.wait_for_timeout(200)
        await sel.nth(i_lamp).select_option("todo.notas_e_rotinas_do_alexa_to_do_list"); await pg.wait_for_timeout(200)
        r = await rows(); print("ROWS:", r)
        check("Shopping" in r[i_leite][1] and "To-do" in r[i_lamp][1], f"each row its list ({r})")
        check(await sheet.locator(".chip-row.grid .pick.on").count() == 0, "no chip on when the lists differ")
        check("em 3 listas" in await btn.inner_text(), f"button: 3 lists ({await btn.inner_text()!r})")
        box = await sheet.locator(".imp-dest").first.bounding_box()
        inp = await sheet.locator(".imp-row input").first.bounding_box()
        check(box and inp and box["y"] > inp["y"] + inp["height"] - 4 and abs(box["x"] - inp["x"]) < 3, f"the list under the text ({box}, {inp})")
        await pg.screenshot(path=f"{SP}/shots/rvl-mixed.png")
        await btn.click(); await pg.wait_for_timeout(1500)
        toast = await a.locator(".toast").inner_text() if await a.locator(".toast").count() else ""
        check("3 itens adicionados em 3 listas" in toast, f"toast ({toast!r})")
        items = await a.evaluate("(el) => Object.fromEntries(['todo.casa','todo.notas_e_rotinas_do_alexa_shopping_list','todo.notas_e_rotinas_do_alexa_to_do_list'].map((id) => [id, (el._items.get(id) || []).map((i) => i.summary)]))")
        print("ITEMS:", items)
        check(any("pia" in t for t in items["todo.casa"]), "Arrumar pia in Casa")
        check(any("leite" in t.lower() for t in items["todo.notas_e_rotinas_do_alexa_shopping_list"]), "leite in the shopping list")
        check(any("lâmpada" in t for t in items["todo.notas_e_rotinas_do_alexa_to_do_list"]), "lâmpada in the to-do list")
        check(not any("leite" in t.lower() for t in items["todo.casa"]), "leite not in Casa")
        # a single writable list: no picker under the items
        await a.evaluate("(el) => el._openImport('todo.casa', 'text')"); await pg.wait_for_timeout(400)
        await sheet.locator("textarea").fill("ovos, pão")
        await sheet.locator(".btn.primary", has_text="Separar itens").click()
        await wait_for(review, "review again")
        r = await rows(); print("ROWS:", r)
        check(any("Shopping" in d for t, d in r if "ovos" in t.lower()), "ovos to the shopping list")
        check(not errs, f"no page errors {errs}")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
