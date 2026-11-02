# ResolvIA core flow: a repeat rule, complete, it comes back by itself, cleared completed are created again, + with repeat, only to-do commands, Mais › Repetições, inside an iframe.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
DATA = f"{SP}/rve-data"
shutil.rmtree(DATA, ignore_errors=True)
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo")
def start_fake():
    return subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rve_fake.log", "a"), stderr=subprocess.STDOUT)
fake = start_fake()
time.sleep(0.6)
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=f"{SP}/rve-share", PORT=APP_PORT, RESOLVIA_DAY_MS="4000")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rve_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
stored = lambda: json.load(open(f"{DATA}/resolvia.json"))
# one command on the app's WebSocket, like the panel (the reply, or {"__error": …})
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""

async def main():
    global fake
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id="America/Sao_Paulo")
        pg = await ctx.new_page()
        errs = []
        pg.on("console", lambda m: m.type in ("error", "warning") and errs.append(f"{m.type}: {m.text}"))
        pg.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
        ws = lambda m: pg.evaluate(WS, m)
        async def casa():
            return {i["summary"]: i for i in (await ws({"type": "todo/item/list", "entity_id": "todo.casa"}))["items"]}
        async def wait_until(fn, secs=10):
            for _ in range(int(secs * 4)):
                try:
                    if await fn(): return True
                except Exception: pass
                await asyncio.sleep(0.25)
            return False
        texts = lambda sel: pg.locator(sel).all_inner_texts()
        pend = lambda: texts(".items .item:not(.done) .it-text")

        await pg.goto(URL); await pg.wait_for_timeout(1200)
        # ResolvIA 2.9.2: repetition is a switch in Mais › Repetições (off on a fresh install)
        await ws({"type": "resolvia/prefs/set_app", "prefs": {"repeat_on": True}})
        await pg.reload(); await pg.wait_for_timeout(1200)
        names = await texts(".list-card .lc-title")
        check(sorted(names) == sorted(["Shopping list", "To-do list", "Casa", "Problem List"]), f"home: the four lists of Home Assistant ({names})")
        await pg.screenshot(path=f"{SP}/shots/rve-home.png")

        # Casa › Passar pano: repeat every day (a "day" is 4 s in dev)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        await pg.locator(".items .item .it-body", has_text="Passar pano").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet .flabel", has_text="Repetir").count() == 1, "the item has the Repetir field")
        await pg.locator(".sheet .pick", has_text="Todo dia").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .pick.on", has_text="Todo dia").count() == 1 and "no dia seguinte" in await pg.locator(".sheet .field-hint").inner_text(), "Todo dia chosen, with the hint")
        await pg.screenshot(path=f"{SP}/shots/rve-repeat-sheet.png")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(600)
        row = pg.locator(".items .item", has_text="Passar pano")
        check(await row.locator(".tag").all_inner_texts() == ["todo dia"], "the row shows the rule")
        rules = list(stored()["rules"].values())
        uid0 = (await casa())["Passar pano na casa"]["uid"]
        check(len(rules) == 1 and rules[0]["days"] == 1 and rules[0]["uid"] == uid0, "rule saved, bound to the item")

        # complete it: the toast says when it comes back
        await row.locator(".check").click(); await pg.wait_for_timeout(300)
        toast = await pg.locator(".toast span").inner_text()
        check(toast == "Resolvido: Passar pano na casa · volta amanhã", f"toast ({toast})")
        await pg.wait_for_timeout(1200)
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(300)
        chips = await pg.locator(".item.done", has_text="Passar pano").locator(".tag").all_inner_texts()
        check(chips == ["volta hoje"], f"done: 'volta hoje' ({chips})")
        await pg.screenshot(path=f"{SP}/shots/rve-done-rule.png")
        # back by itself (4 s + the tick), due today
        check(await wait_until(lambda: casa_pending(pend), 9), "reopened automatically")
        chips = await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".tag").all_inner_texts()
        check(chips == ["Hoje", "todo dia"], f"back with deadline today ({chips})")
        it = (await casa())["Passar pano na casa"]
        check(it["uid"] == uid0 and it["status"] == "needs_action", "the same item was reopened (not a new one)")

        # complete again, clear the completed (confirmed): it is gone, then created again
        await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1500)
        await pg.locator(".done-head .text-btn", has_text="Limpar").click(); await pg.wait_for_timeout(300)
        check("Limpar concluídos?" in await pg.locator(".sheet h3").inner_text() and "1 item concluído vai ser apagado de “Casa”" in await pg.locator(".sheet .confirm-text").inner_text(), "Limpar asks first")
        await pg.locator(".sheet .btn.primary", has_text="Limpar").click(); await pg.wait_for_timeout(800)
        now = await casa()
        check("Passar pano na casa" not in now, f"cleared in Home Assistant ({sorted(now)})")
        on_screen = await texts(".items .item .it-text")
        check(not any("Passar pano" in t for t in on_screen) and await pg.locator(".done-head").count() == 0, f"cleared on the screen ({on_screen})")
        check(await wait_until(lambda: casa_pending(pend), 9), "created again after the clear")
        chips = await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".tag").all_inner_texts()
        check(chips == ["Hoje", "todo dia"], f"the rule follows the new item ({chips})")
        it = (await casa())["Passar pano na casa"]
        check(it["uid"] != uid0, f"a new item ({uid0} -> {it['uid']})")
        check(await wait_until(lambda: asyncio.sleep(0, list(stored()["rules"].values())[0]["uid"] == it["uid"]), 3), "the rule is bound to it (saved)")
        # and completing the new item counts: it comes back once more
        await pg.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1300)
        if await pg.locator(".items .item.done").count() == 0: await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(300)
        chips = await pg.locator(".item.done", has_text="Passar pano").locator(".tag").all_inner_texts()
        check(chips == ["volta hoje"], f"the new item, completed, is scheduled ({chips})")
        check(await wait_until(lambda: casa_pending(pend), 9), "and comes back again")

        # + (Adicionar) with a repetition
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet textarea").first.fill("Trocar roupa de cama")
        await pg.locator(".sheet .pick", has_text="1 semana").click()
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(900)
        chips = await pg.locator(".items .item", has_text="Trocar roupa").locator(".tag").all_inner_texts()
        check(chips == ["toda semana"], f"new item with its rule ({chips})")
        check(sorted(r["days"] for r in stored()["rules"].values()) == [1, 7], "two rules saved")

        # security: only to-do commands
        res = await ws({"type": "call_service", "domain": "light", "service": "turn_off", "target": {"entity_id": "light.sala"}})
        check(res.get("__error", {}).get("code") == "unauthorized", f"light call refused ({res})")
        res = await ws({"type": "get_states"})
        check(res.get("__error", {}).get("code") == "unknown_command", f"get_states refused ({res})")
        res = await ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": "x"}, "target": {"entity_id": "light.sala"}})
        check(res.get("__error", {}).get("code") == "unauthorized", "a to-do service on another entity refused")

        # Mais › Repetições
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Repetições", exact=True).click(); await pg.wait_for_timeout(300)
        labels = await pg.locator(".panel", has_text="Tarefas que se repetem").locator(".row .label").all_inner_texts()
        check(sorted(labels) == ["Passar pano na casa", "Trocar roupa de cama"], f"rules in Mais ({labels})")
        hints = await pg.locator(".panel", has_text="Tarefas que se repetem").locator(".row .hint").all_inner_texts()
        check(sorted(hints) == sorted(["Casa · todo dia", "Casa · toda semana"]), f"each with its list and frequency ({hints})")
        await pg.screenshot(path=f"{SP}/shots/rve-mais.png")

        # embedded in an iframe: no top bar of its own
        await pg.set_content(f'<html><body style="margin:0"><iframe src="{URL}" style="border:0;width:412px;height:892px"></iframe></body></html>')
        await pg.wait_for_timeout(1500)
        fr = pg.frames[1]
        check(await fr.locator(".topbar").count() == 0 and await fr.locator(".page-title").inner_text() == "Minhas listas", "in an iframe: no top bar, the home")

        # Home Assistant restarts: the page loads again
        fake.kill(); fake.wait()
        await pg.goto(URL); await pg.wait_for_timeout(500)
        fake = start_fake()
        await pg.wait_for_timeout(2500)
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        check(len(await texts(".list-card .lc-title")) == 4, "after Home Assistant restarts, the lists are back")
        check(not errs, f"no console errors {errs}")
        await b.close()

async def casa_pending(pend):
    return any("Passar pano" in t for t in await pend())

try:
    asyncio.run(main())
finally:
    app.terminate(); fake.kill()
    time.sleep(0.5)
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
