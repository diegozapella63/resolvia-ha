import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, sys, os, json, time
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/fake.log","w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=f"{SP}/appdata", PORT="8099", RESOLVIA_DAY_MS="4000")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/app.log","w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = "http://127.0.0.1:8099/"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width":412,"height":892}, device_scale_factor=2, color_scheme="dark", has_touch=True)
        pg = await ctx.new_page()
        errs = []
        pg.on("console", lambda m: m.type in ("error","warning") and errs.append(f"{m.type}: {m.text}"))
        pg.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
        await pg.goto(URL); await pg.wait_for_timeout(1200)
        # ResolvIA 2.9.2: repetition is a switch in Mais › Repetições (off on a fresh install)
        await pg.evaluate("""() => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'resolvia/prefs/set_app', prefs: {repeat_on: true}})); ws.onmessage = () => { ws.close(); res(); }; })""")
        await pg.reload(); await pg.wait_for_timeout(1200)
        texts = lambda sel: pg.locator(sel).all_inner_texts()
        print("lists:", await texts(".list-card .lc-title"))
        print("groups:", await texts(".panel > .overline"))
        await pg.screenshot(path=f"{SP}/shots/30-app-home.png")
        # open Casa, set "Passar pano" to repeat every 1 'day' (4s in dev)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        await pg.locator(".items .item .it-body", has_text="Passar pano").click(); await pg.wait_for_timeout(300)
        print("repeat field:", await pg.locator(".sheet .flabel", has_text="Repetir").count())
        await pg.locator(".sheet .pick", has_text="Todo dia").click(); await pg.wait_for_timeout(150)
        await pg.screenshot(path=f"{SP}/shots/31-app-repeat-sheet.png")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(600)
        row = pg.locator(".items .item", has_text="Passar pano")
        print("chip after rule:", await row.locator(".tag").all_inner_texts())
        # complete it
        await row.locator(".check").click(); await pg.wait_for_timeout(300)
        print("toast:", await pg.locator(".toast span").inner_text())
        await pg.wait_for_timeout(1200)
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(300)
        print("done chip:", await pg.locator(".item.done", has_text="Passar pano").locator(".tag").all_inner_texts())
        await pg.screenshot(path=f"{SP}/shots/32-app-done-rule.png")
        # wait for reopen (~4s day + tick)
        await pg.wait_for_timeout(5500)
        pend = await texts(".items .item:not(.done) .it-text")
        print("reopened automatically:", any("Passar pano" in t for t in pend))
        print("due chip after reopen:", await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".tag").all_inner_texts())
        # recreate path: complete again, then clear completed, then wait
        await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1500)
        await pg.locator(".done-head .text-btn").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(800)
        print("after clear, in list:", any("Passar pano" in t for t in await texts(".items .item .it-text")))
        await pg.wait_for_timeout(5500)
        pend = await texts(".items .item:not(.done) .it-text")
        print("recreated after clear:", any("Passar pano" in t for t in pend))
        print("rule rebound chip:", await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".tag").all_inner_texts())
        # add a new item with repeat from the + sheet
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet textarea").first.fill("Trocar roupa de cama")
        await pg.locator(".sheet .pick", has_text="1 semana").click()
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(900)
        print("new item chip:", await pg.locator(".items .item", has_text="Trocar roupa").locator(".tag").all_inner_texts())
        # security: non-todo service must be rejected
        res = await pg.evaluate("""() => new Promise(r => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'call_service', domain: 'light', service: 'turn_off', target: {entity_id: 'light.sala'}})); ws.onmessage = e => { r(JSON.parse(e.data)); ws.close(); }; })""")
        print("light call rejected:", res)
        res2 = await pg.evaluate("""() => new Promise(r => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'get_states'})); ws.onmessage = e => { r(JSON.parse(e.data)); ws.close(); }; })""")
        print("get_states rejected:", res2)
        # Mais: recurring panel
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Repetições", exact=True).click(); await pg.wait_for_timeout(300)
        print("rules in Mais:", await pg.locator(".panel", has_text="Tarefas que se repetem").locator(".row .label").all_inner_texts())
        await pg.screenshot(path=f"{SP}/shots/33-app-mais.png", full_page=False)
        # embedded in an iframe: no own top bar
        await pg.set_content(f'<html><body style="margin:0"><iframe src="{URL}" style="border:0;width:412px;height:892px"></iframe></body></html>')
        await pg.wait_for_timeout(1500)
        fr = pg.frames[1]
        print("iframe topbar count:", await fr.locator(".topbar").count(), "home:", await fr.locator(".page-title").inner_text())
        # reconnect: kill fake HA and restart
        fake.kill(); await pg.wait_for_timeout(1500)
        await pg.goto(URL); await pg.wait_for_timeout(800)
        print(errs or "no console errors")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.kill()
    time.sleep(0.5)
print("---- app log"); print(open(f"{SP}/app.log").read()[-2500:])
print("---- stored"); print(open(f"{SP}/appdata/resolvia.json").read()[:900])
