# ResolvIA Buscar: results across lists with the count and highlight, accents, notes, Incluir concluídos, nothing found, clearing, opening and completing an item from a result, Back.
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
DATA, SHARE = f"{SP}/rvs-data", f"{SP}/rvs-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvs_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvs_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
CASA, SHOP = "todo.casa", "todo.notas_e_rotinas_do_alexa_shopping_list"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="light", has_touch=True, is_mobile=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        ws = lambda m: pg.evaluate(WS, m)
        async def item(eid, summary):
            return next((i for i in (await ws({"type": "todo/item/list", "entity_id": eid}))["items"] if i["summary"] == summary), None)
        box = pg.locator("input[data-q='buscar']")
        sub = lambda: pg.locator(".page .page-sub").inner_text()
        groups = lambda: pg.locator(".page .panel.items .overline").all_text_contents()  # (shown in capitals by the CSS)
        hits = lambda: pg.locator(".page .panel.items .item .it-text").all_inner_texts()
        async def search(q):
            await box.fill(q); await pg.wait_for_timeout(250)

        await pg.goto(URL); await pg.wait_for_timeout(1300)
        await pg.locator(".tab", has_text="Buscar").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".page-title").inner_text() == "Buscar" and "Em 4 listas" in await pg.locator(".brand-head .status").inner_text(), "Buscar: in the 4 lists")
        check(await sub() == "Procure por qualquer palavra, em todas as listas." and await pg.locator(".page .panel.items").count() == 0, "empty: a hint, no results")

        # one word, two lists; highlighted; the list names as headings
        await search("luz")
        check(await sub() == "2 resultados", f"two results ({await sub()})")
        g = await groups()
        check(sorted(g) == sorted(["Casa", "Problem List · Análise dos Dispositivos"]), f"grouped by list, with the device ({g})")
        marks = await pg.locator(".page .panel.items mark").all_inner_texts()
        check(sorted(marks) == ["Luz", "luz"], f"the word highlighted, as written ({marks})")
        await pg.screenshot(path=f"{SP}/shots/rvs-luz.png")
        # accents and case do not matter; the highlight keeps them
        await search("CAFE")
        check(await hits() == ["Café"] and await pg.locator(".page mark").inner_text() == "Café", "'CAFE' finds 'Café'")
        # the notes count too
        await search("yesterday")
        check(await hits() == ["Luz do Banheiro: unavailable"], "a word of the notes finds the item")
        check(await pg.locator(".page .it-desc mark").inner_text() == "yesterday", "highlighted in the notes")
        # a link inside an item is searched by its text
        await search("home-assistant.io")
        check(len(await hits()) == 1 and "Ver sobre" in (await hits())[0], "the text of a link is searched too")
        # done items only when asked
        await search("arroz")
        txt = await pg.locator(".page").inner_text()
        check("Nada encontrado" in txt and "Nenhum item com “arroz”." in txt, "a done item is not found by default")
        inc = pg.locator(".filters .pick", has_text="Concluídos")
        await inc.click(); await pg.wait_for_timeout(250)
        check("on" in await inc.get_attribute("class") and await hits() == ["Arroz"] and await pg.locator(".page .item.done").count() == 1, "Incluir concluídos: found, shown as done")
        await search("a")
        rows = await pg.locator(".page .panel.items", has_text="Shopping list").locator(".item").evaluate_all("(els) => els.map((e) => e.classList.contains('done'))")
        check(rows and rows[-1] is True and not any(rows[:-1]), f"in each list the pending ones first ({rows})")
        await inc.click(); await pg.wait_for_timeout(250)
        # nothing found; the × clears
        await search("xyzzy")
        check("Nada encontrado" in await pg.locator(".page").inner_text(), "nothing found")
        await pg.screenshot(path=f"{SP}/shots/rvs-nada.png")
        await pg.locator(".search-box .icon-btn[aria-label='Limpar']").click(); await pg.wait_for_timeout(250)
        check(await box.input_value() == "" and await sub() == "Procure por qualquer palavra, em todas as listas.", "× clears the search")

        # open an item from a result and edit it
        await search("filtro")
        await pg.locator(".page .item", has_text="Trocar filtro do ar").locator(".it-body").click(); await pg.wait_for_timeout(350)
        check(await pg.locator(".sheet h3").inner_text() == "Editar item" and await pg.locator(".sheet textarea").first.input_value() == "Trocar filtro do ar", "a result opens the item")
        await pg.locator(".sheet textarea").first.fill("Trocar filtro do ar-condicionado")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        check(await item(CASA, "Trocar filtro do ar-condicionado"), "edited in Home Assistant")
        check(await hits() == ["Trocar filtro do ar-condicionado"] and await box.input_value() == "filtro", "the result follows, the search stays")
        # complete from a result
        await pg.locator(".page .item", has_text="Trocar filtro").locator(".check").click(); await pg.wait_for_timeout(500)
        check((await item(CASA, "Trocar filtro do ar-condicionado"))["status"] == "completed", "completed from the result")
        check((await pg.locator(".toast span").inner_text()).startswith("Resolvido: Trocar filtro"), "with the toast")
        await pg.wait_for_timeout(1500)
        check("Nada encontrado" in await pg.locator(".page").inner_text(), "done: it leaves the results (Incluir concluídos is off)")
        # an item changed elsewhere shows up in the results live
        await search("pilhas")
        await ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": "Comprar pilhas"}, "target": {"entity_id": SHOP}})
        await pg.wait_for_timeout(600)
        check(await hits() == ["Comprar pilhas"] and await groups() == ["Shopping list · Notas e Rotinas do Alexa"], "an item added elsewhere appears in the results")
        await pg.screenshot(path=f"{SP}/shots/rvs-live.png")
        # Back leaves Buscar
        await pg.go_back(); await pg.wait_for_timeout(500)
        check(await pg.locator(".page-title").inner_text() == "Minhas listas", "Back goes to the home")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
