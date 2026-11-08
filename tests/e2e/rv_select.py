# ResolvIA 2.32.0: Selecionar itens (menu or holding one) and Mover para outra lista, with their date, points, rooms and equipment.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvs-data", f"{SP}/rvs-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", FAKE_HA_EXTRA="1"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvs_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
WS = """(msgs) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); let n = 0; ws.onopen = () => msgs.forEach((m, k) => ws.send(JSON.stringify({id: k + 1, ...m}))); ws.onmessage = (e) => { if (JSON.parse(e.data).type === 'result' && ++n === msgs.length) { ws.close(); res(); } }; })"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(2000)
        await pg.evaluate(WS, [{"type": "resolvia/points/set", "entity_id": "todo.casa", "summary": "Pagar conta de luz", "points": 10}])
        await pg.reload(); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(800)
        # the menu: Selecionar itens
        await a.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        check(await sheet.locator(".menu-row", has_text="Selecionar itens").count() == 1, "the list menu has Selecionar itens")
        await sheet.locator(".menu-row", has_text="Selecionar itens").click(); await pg.wait_for_timeout(400)
        head = (await a.locator(".sel-head h1").inner_text()).strip()
        rows = a.locator(".item.selecting")
        check(head == "Selecionar" and await rows.count() == 3 and await a.locator(".quick").count() == 0, f"selecting: the pending items, no Adicionar ({head}, {await rows.count()})")
        mover = a.locator(".sel-bar .btn")
        check(await mover.is_disabled(), "Mover off with nothing selected")
        await rows.filter(has_text="Pagar conta de luz").click(); await pg.wait_for_timeout(150)
        await rows.filter(has_text="Trocar filtro do ar").locator(".check").click(); await pg.wait_for_timeout(150)
        check((await a.locator(".sel-head h1").inner_text()).strip() == "2 selecionados" and await a.locator(".item.selecting.picked").count() == 2 and await mover.is_enabled(), "two picked (row or circle): 2 selecionados, Mover on")
        await pg.screenshot(path=f"{SP}/shots/rvs-select.png")
        # Todos / Nenhum
        await a.locator(".sel-head .text-btn", has_text="Todos").click(); await pg.wait_for_timeout(150)
        check(await a.locator(".item.selecting.picked").count() == 3 and await a.locator(".sel-head .text-btn", has_text="Nenhum").count() == 1, "Todos picks all, then says Nenhum")
        await a.locator(".sel-head .text-btn", has_text="Nenhum").click(); await pg.wait_for_timeout(150)
        check(await a.locator(".item.selecting.picked").count() == 0, "Nenhum unpicks all")
        # × cancels
        await a.locator(".sel-head .icon-btn[aria-label='Cancelar seleção']").click(); await pg.wait_for_timeout(300)
        check(await a.locator(".item.selecting").count() == 0 and await a.locator(".quick").count() == 1, "× leaves the selection")
        # holding an item (long press / right click) starts with it picked
        await a.locator(".item", has_text="Pagar conta de luz").locator(".it-body").click(button="right"); await pg.wait_for_timeout(300)
        check(await a.locator(".item.selecting.picked", has_text="Pagar conta de luz").count() == 1 and (await a.locator(".sel-head h1").inner_text()).strip() == "1 selecionado", "holding an item starts selecting with it")
        await a.locator(".item.selecting", has_text="Trocar filtro do ar").click(); await pg.wait_for_timeout(150)
        await mover.click(); await pg.wait_for_timeout(300)
        title = (await sheet.locator(".sheet-head h3").inner_text()).strip()
        names = [t.strip() for t in await sheet.locator(".pick.list").all_inner_texts()]
        check(title == "Mover 2 itens para" and "Casa" not in names and "Google Tasks" in names and "Avisos do condomínio" not in names and "Chamados" not in names, f"Mover: the other lists that take items ({title}; {names})")
        await sheet.screenshot(path=f"{SP}/shots/rvs-move.png")
        await sheet.locator(".pick.list", has_text="Google Tasks").click(); await pg.wait_for_timeout(2500)
        toast = await a.locator(".toast").inner_text() if await a.locator(".toast").count() else ""
        check("2 itens movidos para Google Tasks" in toast, f"toast ({toast!r})")
        left = [t.strip() for t in await a.locator(".item .it-text").all_inner_texts()]
        check("Pagar conta de luz" not in left and "Trocar filtro do ar" not in left and "Passar pano na casa" in left and await a.locator(".item.selecting").count() == 0, f"out of Casa, selection over ({left})")
        await a.evaluate("(el) => el._go('/lista/todo.google_tasks')"); await pg.wait_for_timeout(900)
        there = await a.locator(".item").evaluate_all("(els) => els.map((e) => [e.querySelector('.it-text').textContent.trim(), !!e.querySelector('.tag.late, .tag.today')])")
        print("GOOGLE:", there)
        got = {n: d for n, d in there}
        check(got.get("Pagar conta de luz") is True and got.get("Trocar filtro do ar") is True, "in Google Tasks, with their dates")
        pts = stored().get("points", {})
        check(pts.get("todo.google_tasks", {}).get("pagar conta de luz") == 10 and "pagar conta de luz" not in pts.get("todo.casa", {}), f"the points went along ({pts})")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
