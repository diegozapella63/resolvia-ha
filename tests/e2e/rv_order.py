# ResolvIA 2.22.0: lists with more pending first; Buscar only in the lists that are on.
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
DATA, SHARE = f"{SP}/rvo-data", f"{SP}/rvo-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rvo_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvo_app.log", "w"), stderr=subprocess.STDOUT)
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
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
        # To-do list gets 3 more: 5 pending, more than Casa (3)
        await pg.locator(".list-card", has_text="To-do list").click(); await pg.wait_for_timeout(600)
        for t in ("Item A", "Item B", "Item C"):
            await pg.locator(".quick input").fill(t); await pg.locator(".quick input").press("Enter"); await pg.wait_for_timeout(500)
        await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(800)
        names = [t.strip() for t in await pg.locator(".list-card .lc-title").all_inner_texts()]
        pend = [int(t) if t.strip().isdigit() else 0 for t in await pg.locator(".list-card .lc-num").all_inner_texts()]
        print(list(zip(names, pend)))
        check(names[0] == "To-do list", f"the list with more pending first ({names})")
        heads = [t.strip() for t in await pg.locator(".grp-head:not(.desk-only) h2").all_inner_texts()]
        check(heads and heads[0].upper().startswith("NOTAS"), f"its group first too ({heads})")
        for g in range(await pg.locator(".panel.grp").count()):
            ps = [int(t) if t.strip().isdigit() else 0 for t in await pg.locator(".panel.grp").nth(g).locator(".lc-num").all_inner_texts()]
            check(ps == sorted(ps, reverse=True), f"group {g}: more pending first ({ps})")
        # Buscar: hide Problem List in Mais › Listas
        total_before = await pg.locator(".home-search input").get_attribute("placeholder")
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await pg.locator("input[aria-label='Mostrar Problem List']").click(); await pg.wait_for_timeout(800)
        await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(600)
        total_after = await pg.locator(".home-search input").get_attribute("placeholder")
        check(total_before != total_after, f"Buscar entre N itens: without the hidden list ({total_before} -> {total_after})")
        await pg.locator(".tab", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        st = await pg.locator(".brand-head .status").inner_text()
        check("Em 3 listas" in st, f"Buscar: only the lists that are on ({st.strip()})")
        hidden_item = await pg.evaluate("() => { const l = document.querySelector('resolvia-panel')._L.find(x => x.name === 'Problem List'); return l && l.items && l.items[0] ? l.items[0].summary : ''; }")
        await pg.locator(".search-box input").first.fill(hidden_item[:8]); await pg.wait_for_timeout(500)
        txt = await pg.locator(".page").first.inner_text()
        check(hidden_item and hidden_item not in txt, f"an item of the hidden list is not found ({hidden_item})")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
