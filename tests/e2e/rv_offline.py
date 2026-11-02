# The app server goes away (an update, a restart of the Home Assistant): the panel says it is reconnecting,
# keeps what it shows, and when the server is back it reconnects alone, reloads the lists and works again.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE, MEDIA = f"{SP}/rvo-data", f"{SP}/rvo-share", f"{SP}/rvo-media"
for d in (DATA, SHARE, MEDIA): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", FAKE_MEDIA_DIR=MEDIA, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
def start_app():
    return subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, MEDIA_DIR=MEDIA, PORT="8099"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
app = start_app()
time.sleep(1.2)

async def main():
    global app
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        cards = lambda: a.locator(".list-card .lc-title").all_inner_texts()
        before = await cards()
        check(len(before) == 4 and await a.locator(".offline").count() == 0, f"online: 4 lists, no warning ({before})")

        # the server goes away
        app.terminate(); app.wait(5)
        await pg.wait_for_timeout(1200)
        off = a.locator(".offline")
        check(await off.count() == 1 and "Reconectando" in await off.inner_text(), "says it is reconnecting")
        check(await cards() == before, "keeps showing the lists")
        await pg.screenshot(path=f"{SP}/shots/rvo-offline.png")

        # and comes back: the panel reconnects alone (it tries again after 1 s, 2 s, 4 s…)
        app = start_app()
        for _ in range(60):
            await pg.wait_for_timeout(250)
            if await off.count() == 0: break
        check(await off.count() == 0, "back: the warning goes away by itself")
        check(await cards() == before, "the lists are there")

        # and works: complete an item, the list counts it
        await a.locator(".list-card", has_text="Casa").first.click(); await pg.wait_for_timeout(500)
        await a.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(900)
        check("Resolvido: Passar pano" in await a.locator(".toast").inner_text(), "an action after reconnecting works")
        st = await pg.evaluate("""() => new Promise(r => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, type: 'resolvia/bootstrap'})); ws.onmessage = e => { r(JSON.parse(e.data).result.states['todo.casa'].state); ws.close(); }; })""")
        check(st == "2", f"and reaches the Home Assistant (Casa now has {st} pending)")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
