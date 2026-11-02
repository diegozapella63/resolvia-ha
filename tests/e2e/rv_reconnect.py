# ResolvIA without connection: the app restarts (the screen says it is reconnecting, keeps what was done meanwhile and comes back live); Home Assistant restarts (the lists stay, then follow Home Assistant again); opening while Home Assistant is down.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, subprocess, os, json, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
TZ = "America/Sao_Paulo"
DATA, SHARE = f"{SP}/rvc-data", f"{SP}/rvc-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
def start_fake():
    return subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvc_fake.log", "a"), stderr=subprocess.STDOUT)
def start_app():
    return subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvc_app.log", "a"), stderr=subprocess.STDOUT)
procs = {"fake": start_fake()}
time.sleep(0.6)
procs["app"] = start_app()
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
CASA = "todo.casa"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stop(name):
    procs[name].terminate(); procs[name].wait(5)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        ws = lambda m: pg.evaluate(WS, m)
        async def item(summary):
            return next((i for i in (await ws({"type": "todo/item/list", "entity_id": CASA}))["items"] if i["summary"] == summary), None)
        async def wait_until(fn, secs=20):
            for _ in range(int(secs * 4)):
                try:
                    if await fn(): return True
                except Exception: pass
                await asyncio.sleep(0.25)
            return False
        offline = pg.locator(".offline")
        status = lambda: pg.locator(".brand-head .status").inner_text()
        texts = lambda: pg.locator(".items .item .it-text").all_inner_texts()

        await pg.goto(URL); await pg.wait_for_timeout(1300)
        check(await offline.count() == 0 and "ao vivo com o Home Assistant" in await status(), "connected: no warning, 'ao vivo'")
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)

        # ---- the app restarts (an update, the watchdog): the screen loses its connection
        stop("app")
        check(await wait_until(lambda: offline.count(), 5), "the app is gone: a warning at the top")
        check(await offline.inner_text() == "Sem conexão com o Home Assistant. Reconectando…", f"it says it is reconnecting ({await offline.inner_text()})")
        await pg.screenshot(path=f"{SP}/shots/rvc-offline-list.png")
        # what is done meanwhile waits for the connection
        await pg.locator(".items .item", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".items .item", has_text="Passar pano").locator(".check.on").count() == 1, "completing still works on the screen")
        await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".page-title").inner_text() == "Minhas listas" and "Reconectando ao Home Assistant" in await status(), "the home says 'Reconectando…' instead of 'ao vivo'")
        check(await pg.locator(".brand-head .status .dot.off").count() == 1, "with the dot off")
        await pg.screenshot(path=f"{SP}/shots/rvc-offline-home.png")
        procs["app"] = start_app()
        check(await wait_until(lambda: offline_gone(offline)), "the app is back: the warning goes away by itself")
        check("ao vivo com o Home Assistant" in await status(), "'ao vivo' again")
        check(await wait_until(lambda: status_is(item, "Passar pano na casa", "completed"), 8), "what was completed meanwhile reached Home Assistant")
        # live again: a change made elsewhere shows up
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(400)
        await ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": "Comprado pela Alexa"}, "target": {"entity_id": CASA}})
        check(await wait_until(lambda: has_text(texts, "Comprado pela Alexa"), 5), "changes made elsewhere show up again")

        # ---- Home Assistant restarts; the app stays
        stop("fake")
        await pg.wait_for_timeout(1500)
        check(await offline.count() == 0 and len(await texts()) >= 3, "Home Assistant gone: the list stays on the screen")
        quick = pg.locator(".quick input")
        await quick.fill("Feito sem o Home Assistant"); await quick.press("Enter"); await pg.wait_for_timeout(500)
        check(await quick.input_value() == "", "an item typed meanwhile is accepted")
        await pg.screenshot(path=f"{SP}/shots/rvc-ha-down.png")
        procs["fake"] = start_fake()
        # the fake comes back with its first items: the screen follows Home Assistant again
        check(await wait_until(lambda: has_text(texts, "Feito sem o Home Assistant"), 20), "Home Assistant back: the item typed meanwhile is added")
        check(await wait_until(lambda: no_text(texts, "Comprado pela Alexa"), 5), "the list shows what Home Assistant has after its restart")
        check(not (await pg.locator(".items .item", has_text="Passar pano").locator(".check").get_attribute("class")).endswith(" on"), "(the fake started over: Passar pano is pending)")
        await pg.screenshot(path=f"{SP}/shots/rvc-ha-back.png")

        # ---- opening the app while Home Assistant is down: it waits, then opens
        stop("fake")
        await pg.wait_for_timeout(500)
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        check(await pg.locator("#boot").inner_text() == "Carregando ResolvIA…" and await pg.locator(".list-card").count() == 0, "it shows 'Carregando ResolvIA…' while Home Assistant is down")
        await pg.screenshot(path=f"{SP}/shots/rvc-loading.png")
        procs["fake"] = start_fake()
        check(await wait_until(lambda: count_is(pg.locator(".list-card"), 4), 25), "and opens with the lists when it is back")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()

async def offline_gone(loc):
    return await loc.count() == 0
async def status_is(item, summary, st):
    it = await item(summary)
    return bool(it) and it["status"] == st
async def has_text(texts, t):
    return any(t in x for x in await texts())
async def no_text(texts, t):
    return not any(t in x for x in await texts())
async def count_is(loc, n):
    return await loc.count() == n

try:
    asyncio.run(main())
finally:
    for pr in procs.values(): pr.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
