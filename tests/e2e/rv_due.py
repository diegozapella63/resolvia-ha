# ResolvIA Sugestões, the start (2.48.0; the Prazos tab up to 2.47): the groups of what is due (Atrasados and Hoje first, then
# Comece por aqui, then Amanhã, Próximos 7 dias, Mais adiante) and the badge, completing and changing a deadline there, Voltam
# sozinhas (also for a cleared item), and without deadlines.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, subprocess, os, json, time, shutil
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
TZ = "America/Sao_Paulo"
DATA, SHARE = f"{SP}/rvp2-data", f"{SP}/rvp2-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvp2_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvp2_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
CASA = "todo.casa"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""
day = lambda n: (datetime.now(ZoneInfo(TZ)) + timedelta(days=n)).strftime("%Y-%m-%d")

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
        add = lambda summary, due: ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": summary, "due_date": due}, "target": {"entity_id": CASA}})
        badge = pg.locator("nav .tab", has_text="Sugestões").locator(".badge")
        groups = lambda: pg.locator(".page .panel.items > .overline").all_text_contents()
        status = lambda: pg.locator(".brand-head .status").inner_text()
        group = lambda title: pg.locator(".page .panel.items", has=pg.locator(".overline", has_text=title))
        async def prazos():
            await pg.locator("nav .tab", has_text="Sugestões").click(); await pg.wait_for_timeout(500)

        await pg.goto(URL); await pg.wait_for_timeout(1200)
        tabs = [t.strip() for t in await pg.locator("nav .tab").all_inner_texts()]
        check([t.split("\n")[0] for t in tabs] == ["Sugestões", "Buscar", "Adicionar", "Listas", "Mais"], f"the tabs: Sugestões first, Buscar by it (2.50.0) ({tabs})")
        check(await pg.locator(".page-title").inner_text() == "Sugestões" and "on" in await pg.locator("nav .tab").first.get_attribute("class"), "the app opens on Sugestões")
        await add("Levar o carro na revisão", day(1))
        await add("Renovar o seguro", day(3))
        await add("Declarar o imposto", day(20))
        await pg.wait_for_timeout(500)
        check(await badge.inner_text() == "2", "the badge counts what is late and for today (2)")
        await prazos()
        g = await groups()
        check(g == ["Atrasados · 1", "Hoje · 1", "Amanhã · 1", "Próximos 7 dias · 1", "Mais adiante · 1"], f"the groups, soonest first ({g})")
        order = await pg.evaluate("""() => [...document.querySelector('resolvia-panel').shadowRoot.querySelectorAll('.page > .panel')].map((p) => (p.querySelector('.overline, h2') || {}).textContent || '').map((t) => t.trim().split(' ·')[0])""")
        check(order[:3] == ["Atrasados", "Hoje", "Comece por aqui"] and order.index("Amanhã") > order.index("Comece por aqui"), f"late and today first, then Comece por aqui, then the rest ({order})")
        start = await pg.locator(".panel.start").inner_text()
        check("Pagar conta de luz" not in start, "Comece por aqui doesn't repeat what is late")
        check((await status()).endswith("· 1 atrasado · 1 para hoje"), f"status ({await status()})")
        late = group("Atrasados").locator(".item")
        check(await late.locator(".it-text").inner_text() == "Pagar conta de luz" and await late.locator(".tag.late").count() == 1 and await late.locator(".tag.list").inner_text() == "Casa", "Atrasados: the item, in red, with its list")
        check("Luz do Banheiro" not in " ".join(await pg.locator(".page .panel.due-group").all_inner_texts()), "the dates of the Problem List are not deadlines")
        await pg.screenshot(path=f"{SP}/shots/rvp2-groups.png", full_page=True)

        # complete from Prazos
        await late.locator(".check").click(); await pg.wait_for_timeout(300)
        check((await item("Pagar conta de luz"))["status"] == "completed" and (await pg.locator(".toast span").inner_text()).startswith("Resolvido: Pagar conta de luz"), "completed from Prazos")
        await pg.wait_for_timeout(1300)
        check("Atrasados · 1" not in await groups() and await badge.inner_text() == "1" and (await status()).endswith("· 1 para hoje"), "it leaves Prazos; badge and status follow")
        # change a deadline from Prazos: it moves to its group
        await group("Mais adiante").locator(".it-body").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .pick", has_text="Hoje").first.click()
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        check((await item("Declarar o imposto"))["due"] == day(0), "the new deadline in Home Assistant")
        g = await groups()
        check("Hoje · 2" in g and not any(x.startswith("Mais adiante") for x in g), f"it moved to Hoje ({g})")
        check(await badge.inner_text() == "2", "badge 2")

        # a task that comes back by itself
        await ws({"type": "resolvia/prefs/set_app", "prefs": {"repeat_on": True}})
        pano = await item("Passar pano na casa")
        await ws({"type": "resolvia/recurring/set", "entity_id": CASA, "uid": pano["uid"], "summary": pano["summary"], "days": 1})
        await pg.goto(LISTAS); await pg.wait_for_timeout(1300)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(400)
        await pg.locator(".items .item", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1300)
        await prazos()
        coming = group("Voltam sozinhas")
        check(await coming.count() == 1 and "Voltam sozinhas · 1" in await groups(), "Voltam sozinhas · 1")
        chips = await coming.locator(".tag").all_inner_texts()
        check(chips == ["Casa", "volta amanhã"], f"with its list and when it comes back ({chips})")
        await pg.screenshot(path=f"{SP}/shots/rvp2-voltam.png", full_page=True)
        # cleared before its time: still listed, tapping opens its list
        await ws({"type": "call_service", "domain": "todo", "service": "remove_completed_items", "service_data": {}, "target": {"entity_id": CASA}})
        await pg.wait_for_timeout(700)
        row = coming.locator(".item")
        check(await row.locator(".it-text").inner_text() == "Passar pano na casa" and await row.locator(".tag.rep").inner_text() == "volta amanhã", "a cleared item that will be created again is still listed")
        await row.locator(".it-body").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".detail-head h1").inner_text() == "Casa", "tapping it opens its list")

        # without deadlines: the only list that takes them has them off (Personalizar › Prazos), none set, or no list takes dates
        nogroups = lambda g: not any(x.split(" ·")[0] in ("Atrasados", "Hoje", "Amanhã", "Próximos 7 dias", "Mais adiante") for x in g)
        await ws({"type": "resolvia/recurring/clear"})
        await ws({"type": "resolvia/prefs/set_list", "entity_id": CASA, "prefs": {"dates_info": True}})
        await pg.reload(); await pg.wait_for_timeout(1300)  # (the screen reads the preferences when it opens)
        g = await groups()
        check(nogroups(g) and "atrasado" not in await status() and await pg.locator(".panel.start").count() == 1, f"deadlines off in the lists: no group of what is due, Comece por aqui stays ({g})")
        check(await badge.count() == 0, "no badge")
        await pg.screenshot(path=f"{SP}/shots/rvp2-prazos-desligados.png")
        await ws({"type": "resolvia/prefs/set_list", "entity_id": CASA, "prefs": {"dates_info": None}})
        for i in (await ws({"type": "todo/item/list", "entity_id": CASA}))["items"]:
            if i.get("due"):
                await ws({"type": "call_service", "domain": "todo", "service": "update_item", "service_data": {"item": i["uid"], ("due_datetime" if "T" in i["due"] else "due_date"): None}, "target": {"entity_id": CASA}})
        await pg.reload(); await pg.wait_for_timeout(1300)
        check(nogroups(await groups()) and await badge.count() == 0, "no deadline set: no group, no badge")
        # Controlar prazos off: the tab stays Sugestões (up to 2.47 the Prazos tab became Sugestões)
        await ws({"type": "resolvia/prefs/set_app", "prefs": {"due_off": True}})
        await pg.reload(); await pg.wait_for_timeout(1300)
        tabs = [t.strip().split("\n")[0] for t in await pg.locator("nav .tab").all_inner_texts()]
        check(tabs[0] == "Sugestões" and "Prazos" not in tabs, f"Controlar prazos off: the same tabs ({tabs})")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
