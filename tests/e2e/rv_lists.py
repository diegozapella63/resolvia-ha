# ResolvIA Mais › Listas and ⋯ of a list: name, color and icon (Personalizar, Padrão), hide and show, Criar nova lista and the links to Home Assistant, a list created or removed in Home Assistant, Opções › Exibição.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, subprocess, os, json, time, shutil, urllib.request
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
TZ = "America/Sao_Paulo"
DATA, SHARE = f"{SP}/rvl-data", f"{SP}/rvl-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvl_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvl_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def fake_ha(method, path, body=None):
    req = urllib.request.Request(f"http://127.0.0.1:{HA_PORT}{path}", data=json.dumps(body).encode() if body is not None else None, method=method)
    return urllib.request.urlopen(req).status

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        async def wait_until(fn, secs=5):
            for _ in range(int(secs * 5)):
                try:
                    if fn(): return True
                except Exception: pass
                await asyncio.sleep(0.2)
            return False
        cards = lambda: pg.locator(".list-card .lc-title").all_inner_texts()
        async def tab(name):
            await pg.locator("nav .tab", has_text=name).click(); await pg.wait_for_timeout(400)
        async def home():
            await tab("Listas")
            if await pg.locator(".detail-head").count(): await tab("Listas")
        async def mais_listas():  # ResolvIA 2.37: Mais is a menu; Listas is its first row
            await tab("Mais")
            await pg.locator(".more-row", has_text="Listas").click(); await pg.wait_for_timeout(300)
        panel = pg.locator("main .page .panel.lists-panel")
        labels = lambda: panel.locator(".row:not(.inact-head) .label").all_inner_texts()

        await pg.goto(LISTAS); await pg.wait_for_timeout(1300)
        await mais_listas()
        check(sorted(await labels()) == sorted(["Shopping list", "To-do list", "Casa", "Problem List"]), f"Mais › Listas: every list ({await labels()})")
        hints = await panel.locator(".row .hint").all_inner_texts()
        check("Notas e Rotinas do Alexa" in hints and "todo.casa" in hints, f"with its device, or its id ({hints})")
        check("4 listas" in await pg.locator(".brand-head .status").inner_text(), "status: 4 listas")

        # ---- Personalizar: name, color, icon (the preview follows)
        await panel.locator(".row button.grow", has_text="Casa").click(); await pg.wait_for_timeout(350)
        check(await pg.locator(".sheet h3").inner_text() == "Personalizar", "tapping a list opens Personalizar")
        name = pg.locator(".sheet input[type=text]")
        check(await name.input_value() == "" and await name.get_attribute("placeholder") == "Casa", "the name is empty, Home Assistant's name as placeholder")
        await name.fill("Casa da Praia"); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .preview-tile .lc-title").inner_text() == "Casa da Praia", "the preview shows the new name")
        await pg.locator(".sheet .sw[aria-label='Azul']").click(); await pg.wait_for_timeout(150)
        check("on" in await pg.locator(".sheet .sw[aria-label='Azul']").get_attribute("class") and "#62B5FF" in await pg.locator(".sheet .preview-tile").get_attribute("style"), "Azul chosen, the preview in blue")
        await pg.locator(".sheet .ig[aria-label='plane']").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .ig.on").get_attribute("aria-label") == "plane", "the plane icon chosen")
        await pg.screenshot(path=f"{SP}/shots/rvl-customize.png")
        await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(600)
        check(await wait_until(lambda: stored()["prefs"]["lists"].get("todo.casa") == {"name": "Casa da Praia", "color": "azul", "icon": "plane"}), "saved: name, color and icon")
        check("Casa da Praia" in await labels(), "Mais shows the new name")
        await home()
        card = pg.locator(".list-card", has=pg.locator(".lc-title", has_text="Casa da Praia"))
        check(await card.count() == 1 and "--c:#62B5FF" in await card.get_attribute("style"), "the home card: new name, in blue")
        await card.click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".detail-head h1").inner_text() == "Casa da Praia", "and the list page")
        await pg.screenshot(path=f"{SP}/shots/rvl-casa-praia.png")
        # ⋯ › Personalizar › Padrão: back to Home Assistant's
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet input[type=text]").input_value() == "Casa da Praia", "⋯ › Personalizar opens with what was saved")
        await pg.locator(".sheet .btn", has_text="Padrão").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .preview-tile .lc-title").inner_text() == "Casa", "Padrão: Home Assistant's name in the preview")
        await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(600)
        check(await wait_until(lambda: "todo.casa" not in stored()["prefs"]["lists"]), "Padrão saved: nothing kept for the list")
        check(await pg.locator(".detail-head h1").inner_text() == "Casa", "the name is back")

        # ---- hide and show, from ⋯ of the list
        await home()
        await pg.locator(".list-card", has_text="To-do list").click(); await pg.wait_for_timeout(400)
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .menu-row", has_text="Ocultar do início").click(); await pg.wait_for_timeout(500)
        check(await wait_until(lambda: stored()["prefs"]["lists"].get("todo.notas_e_rotinas_do_alexa_to_do_list") == {"hidden": True}), "Ocultar do início saved")
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet .menu-row", has_text="Mostrar no início").count() == 1, "the menu now offers Mostrar no início")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        await home()
        check("To-do list" not in await cards(), f"hidden: not on the home ({await cards()})")
        await tab("Buscar")
        check("Em 3 listas" in await pg.locator(".brand-head .status").inner_text(), "Buscar: in the 3 lists shown")
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        check("To-do list" not in [t.strip() for t in await pg.locator(".sheet .pick.list").all_inner_texts()], "+ does not offer the hidden list")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        await mais_listas()
        check("4 listas · 1 oculta" in await pg.locator(".brand-head .status").inner_text(), "Mais: '4 listas · 1 oculta'")
        # and shown again from Personalizar (under Inativas)
        await panel.locator(".inact-head").click(); await pg.wait_for_timeout(300)
        await panel.locator(".row.inact button.grow", has_text="To-do list").click(); await pg.wait_for_timeout(300)
        sw = pg.locator(".sheet input[aria-label='Mostrar no início']")
        check(not await sw.is_checked(), "Personalizar: Mostrar no início off")
        await sw.check(); await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(600)
        check(await wait_until(lambda: "todo.notas_e_rotinas_do_alexa_to_do_list" not in stored()["prefs"]["lists"]), "shown again")
        await home()
        check("To-do list" in await cards(), "back on the home")

        # ---- a list created in Home Assistant shows up by itself; removed, it says so
        check(fake_ha("POST", "/dev/list", {"entity_id": "todo.viagem", "name": "Viagem", "features": 127, "items": ["Passaporte", "Protetor solar"]}) == 200, "(a list created in Home Assistant)")
        await pg.wait_for_timeout(1200)
        check("Viagem" in await cards(), f"the new list appears on the home without reloading ({await cards()})")
        check("2 pendentes" in await pg.locator(".list-card", has_text="Viagem").locator(".lc-meta").inner_text(), "with its items")
        await pg.screenshot(path=f"{SP}/shots/rvl-nova.png")
        await pg.locator(".list-card", has_text="Viagem").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".items .item .it-text").all_inner_texts() == ["Passaporte", "Protetor solar"], "its items")
        fake_ha("DELETE", "/dev/list/todo.viagem"); await pg.wait_for_timeout(1000)
        txt = await pg.locator(".page").inner_text()
        check("Lista não encontrada" in txt and "removida ou renomeada" in txt, "removed while open: 'Lista não encontrada'")
        await pg.screenshot(path=f"{SP}/shots/rvl-removida.png")
        await pg.locator(".page .btn", has_text="Voltar para o início").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".page-title").inner_text() == "Agora", "Voltar para o início: the start (Sugestões, 2.48.0)")
        await pg.locator("nav .tab", has_text="Listas").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".page-title").inner_text() == "Minhas listas" and "Viagem" not in await cards(), "and Listas without it")

        # ---- an older integration without item subscriptions: the items are read on each change
        fake_ha("POST", "/dev/list", {"entity_id": "todo.antiga", "name": "Lista antiga", "features": 7, "items": ["Item velho"], "no_subscribe": True})
        await pg.wait_for_timeout(1200)
        await pg.locator(".list-card", has_text="Lista antiga").click(); await pg.wait_for_timeout(600)
        check(await pg.locator(".items .item .it-text").all_inner_texts() == ["Item velho"], "a list without item subscriptions still shows its items")
        await pg.locator(".quick input").fill("Item novo"); await pg.locator(".quick input").press("Enter"); await pg.wait_for_timeout(900)
        check(await pg.locator(".items .item .it-text").all_inner_texts() == ["Item velho", "Item novo"], "and follows the changes")
        await pg.locator(".items .item", has_text="Item velho").locator(".check").click(); await pg.wait_for_timeout(1500)
        check(await pg.locator(".done-toggle").count() == 1 and "1 de 2 resolvidos" in await pg.locator(".progress").inner_text(), "completing works there too")
        await home()

        # ---- Criar nova lista and the links to Home Assistant (outside it: the page goes there)
        await mais_listas()
        rows = [t.split("\n")[0] for t in await pg.locator("main .page .panel").nth(1).locator(".row .label").all_inner_texts()]
        check(rows == ["Criar nova lista", "Abrir listas padrão do HA"], f"Criar nova lista and the standard screen ({rows})")
        await pg.locator(".row", has_text="Criar nova lista").click()
        await pg.wait_for_url("**/config/integrations/dashboard/add?domain=local_todo", timeout=5000)
        check(pg.url.endswith("/config/integrations/dashboard/add?domain=local_todo"), f"Criar nova lista: Home Assistant's Lista de tarefas local ({pg.url})")
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)
        await pg.locator(".pick", has_text="Nova lista").click()
        await pg.wait_for_url("**/add?domain=local_todo", timeout=5000)
        check(pg.url.endswith("/config/integrations/dashboard/add?domain=local_todo"), "the home's Nova lista goes there too")
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)
        await mais_listas()
        await pg.locator(".row", has_text="Abrir listas padrão do HA").click()
        await pg.wait_for_url("**/todo", timeout=5000)
        check(pg.url.endswith("/todo"), "Abrir listas padrão do HA: /todo")
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(400)
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .menu-row", has_text="Abrir na tela padrão do HA").click()
        await pg.wait_for_url("**/todo?entity_id=todo.casa", timeout=5000)
        check(pg.url.endswith("/todo?entity_id=todo.casa"), "⋯ › Abrir na tela padrão do HA: that list")
        # inside Home Assistant (an iframe of the same origin): the page around it changes, not the app
        await pg.goto(URL + "?parent"); await pg.wait_for_timeout(300)
        await pg.evaluate(f"""() => {{ document.body.innerHTML = '<iframe src="{URL}" style="border:0;width:412px;height:892px"></iframe>'; window.__moves = []; window.addEventListener('location-changed', () => window.__moves.push(location.pathname + location.search)); }}""")
        await pg.wait_for_timeout(1800)
        fr = pg.frames[1]
        await fr.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await fr.locator(".more-row", has_text="Listas").click(); await pg.wait_for_timeout(400)
        await fr.locator(".row", has_text="Criar nova lista").click(); await pg.wait_for_timeout(400)
        moves = await pg.evaluate("() => window.__moves")
        check(moves == ["/config/integrations/dashboard/add?domain=local_todo"] and pg.url.endswith("/config/integrations/dashboard/add?domain=local_todo") and len(pg.frames) == 2, f"inside Home Assistant: its own navigation, the app stays ({moves})")
        await pg.goto(LISTAS); await pg.wait_for_timeout(1200)

        # ---- Opções › Exibição
        await tab("Mais")
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(300)
        await pg.locator("input[aria-label='Agrupar por dispositivo']").uncheck(); await pg.wait_for_timeout(500)
        check(await wait_until(lambda: stored()["prefs"]["app"].get("group_by_device") is False), "Agrupar por dispositivo off: saved")
        await home()
        heads = await pg.locator(".grp-head:not(.desk-only) h2").all_text_contents()
        meta = await pg.locator(".list-card", has_text="Shopping list").locator(".lc-meta").inner_text()
        check(heads == [] and await pg.locator(".panel.grp").count() == 1 and meta.startswith("Notas e Rotinas do Alexa ·"), f"one group; the device goes on each card ({heads}, {meta})")
        await pg.screenshot(path=f"{SP}/shots/rvl-sem-grupos.png")
        await tab("Mais")
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(300)
        await pg.locator("input[aria-label='Agrupar por dispositivo']").check(); await pg.wait_for_timeout(300)
        await pg.locator("input[aria-label='Concluídos abertos']").check(); await pg.wait_for_timeout(500)
        check(await wait_until(lambda: stored()["prefs"]["app"].get("show_done") is True), "Concluídos abertos: saved")
        await home()
        heads = await pg.locator(".grp-head:not(.desk-only) h2").all_text_contents()
        check(len(heads) == 3, f"grouped again ({heads})")
        await pg.locator(".list-card", has_text="Shopping list").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".item.done", has_text="Arroz").count() == 1 and await pg.locator(".done-toggle").get_attribute("aria-expanded") == "true", "the done items show without tapping")
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(200)
        check(await pg.locator(".item.done").count() == 0, "and can still be folded")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
