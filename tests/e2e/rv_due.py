# ResolvIA Prazos: the groups (Atrasados, Hoje, Amanhã, Próximos 7 dias, Mais adiante) and the badge, completing and changing a deadline there, Voltam sozinhas (also for a cleared item), and the empty screens.
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
        badge = pg.locator("nav .tab", has_text="Prazos").locator(".badge")
        groups = lambda: pg.locator(".page .panel.items > .overline").all_text_contents()
        status = lambda: pg.locator(".brand-head .status").inner_text()
        group = lambda title: pg.locator(".page .panel.items", has=pg.locator(".overline", has_text=title))
        async def prazos():
            await pg.locator("nav .tab", has_text="Prazos").click(); await pg.wait_for_timeout(500)

        await pg.goto(URL); await pg.wait_for_timeout(1200)
        await add("Levar o carro na revisão", day(1))
        await add("Renovar o seguro", day(3))
        await add("Declarar o imposto", day(20))
        await pg.wait_for_timeout(500)
        check(await badge.inner_text() == "2", "the badge counts what is late and for today (2)")
        await prazos()
        g = await groups()
        check(g == ["Atrasados · 1", "Hoje · 1", "Amanhã · 1", "Próximos 7 dias · 1", "Mais adiante · 1"], f"the groups, soonest first ({g})")
        check(await status() == "1 atrasado · 1 para hoje", f"status ({await status()})")
        late = group("Atrasados").locator(".item")
        check(await late.locator(".it-text").inner_text() == "Pagar conta de luz" and await late.locator(".tag.late").count() == 1 and await late.locator(".tag.list").inner_text() == "Casa", "Atrasados: the item, in red, with its list")
        check("Luz do Banheiro" not in await pg.locator(".page").inner_text(), "the dates of the Problem List are not deadlines")
        await pg.screenshot(path=f"{SP}/shots/rvp2-groups.png", full_page=True)

        # complete from Prazos
        await late.locator(".check").click(); await pg.wait_for_timeout(300)
        check((await item("Pagar conta de luz"))["status"] == "completed" and (await pg.locator(".toast span").inner_text()).startswith("Resolvido: Pagar conta de luz"), "completed from Prazos")
        await pg.wait_for_timeout(1300)
        check("Atrasados · 1" not in await groups() and await badge.inner_text() == "1" and await status() == "1 para hoje", "it leaves Prazos; badge and status follow")
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
        await pg.reload(); await pg.wait_for_timeout(1300)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(400)
        await pg.locator(".items .item", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1300)
        await prazos()
        coming = group("Voltam sozinhas")
        check(await coming.count() == 1 and "Voltam sozinhas · 1" in await groups(), "Voltam sozinhas · 1")
        chips = await coming.locator(".tag").all_inner_texts()
        check(chips == ["Casa", "volta amanhã"], f"with its list and when it comes back ({chips})")
        check("1 volta sozinha" in await status(), f"status counts it ({await status()})")
        await pg.screenshot(path=f"{SP}/shots/rvp2-voltam.png", full_page=True)
        # cleared before its time: still listed, tapping opens its list
        await ws({"type": "call_service", "domain": "todo", "service": "remove_completed_items", "service_data": {}, "target": {"entity_id": CASA}})
        await pg.wait_for_timeout(700)
        row = coming.locator(".item")
        check(await row.locator(".it-text").inner_text() == "Passar pano na casa" and await row.locator(".tag.rep").inner_text() == "volta amanhã", "a cleared item that will be created again is still listed")
        await row.locator(".it-body").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".detail-head h1").inner_text() == "Casa", "tapping it opens its list")

        # empty: lists that take deadlines, none set
        await ws({"type": "resolvia/recurring/clear"})
        await ws({"type": "resolvia/prefs/set_list", "entity_id": CASA, "prefs": {"dates_info": True}})
        await pg.reload(); await pg.wait_for_timeout(1300)  # (the screen reads the preferences when it opens)
        await prazos()
        txt = await pg.locator(".page").inner_text()
        check("Nada com prazo" in txt and "Toque num item para definir um prazo" in txt and await status() == "Nada atrasado", "no deadline set: 'Nada com prazo'")
        check(await badge.count() == 0, "no badge")
        # empty: no list shown takes deadlines
        await ws({"type": "resolvia/prefs/set_list", "entity_id": CASA, "prefs": {"dates_info": None, "hidden": True}})
        await pg.reload(); await pg.wait_for_timeout(1300)
        await prazos()
        txt = await pg.locator(".page").inner_text()
        check("Sem prazos por aqui" in txt and "não aceitam datas" in txt, "no list takes dates: says which ones do")
        await pg.screenshot(path=f"{SP}/shots/rvp2-sem-prazos.png")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
