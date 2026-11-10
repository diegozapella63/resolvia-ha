# ResolvIA shows only what each list supports: all (local), reorder without dates (Lista de compras), date without time (Google Tasks), add/edit/delete (Alexa), read only, no new items, unavailable; importing into such lists and a missing list.
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
DATA, SHARE = f"{SP}/rvf-data", f"{SP}/rvf-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
# FAKE_HA_EXTRA=1: five more lists, each allowing less (dev/fake-ha.mjs)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, FAKE_HA_EXTRA="1", TZ=TZ), stdout=open(f"{SP}/rvf_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvf_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
CASA, ALEXA, COMPRAS, GOOGLE, AVISOS, CHAMADOS, CALDAV = "todo.casa", "todo.notas_e_rotinas_do_alexa_shopping_list", "todo.shopping_list", "todo.google_tasks", "todo.avisos", "todo.sem_novos", "todo.caldav"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""
tomorrow = (datetime.now(ZoneInfo(TZ)) + timedelta(days=1)).strftime("%Y-%m-%d")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        ws = lambda m: pg.evaluate(WS, m)
        async def items(eid):
            return (await ws({"type": "todo/item/list", "entity_id": eid}))["items"]
        async def item(eid, summary):
            return next((i for i in await items(eid) if i["summary"] == summary), None)
        async def home():
            await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(400)
            if await pg.locator(".detail-head").count():
                await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(400)
        async def open_list(name):
            await home()
            await pg.locator(".list-card", has=pg.locator(".lc-title", has_text=name)).click(); await pg.wait_for_timeout(500)
            return await pg.locator(".detail-head h1").inner_text()
        async def facts():
            return {
                "quick": await pg.locator(".quick input").count(),
                "grips": await pg.locator(".panel.items .grip").count(),
                "rows": await pg.locator(".panel.items").first.locator(".item").count(),
                "disabled": await pg.locator(".panel.items .item .check[disabled]").count(),
                "limpar": await pg.locator(".done-head .text-btn", has_text="Limpar").count(),
                "foot": " ".join(await pg.locator("p.foot").all_inner_texts()),
            }
        async def sheet_of(text):
            await pg.locator(".items .item", has_text=text).first.locator(".it-body").click(); await pg.wait_for_timeout(300)
            if not await pg.locator(".sheet").count(): return None
            return {"labels": [t.strip() for t in await pg.locator(".sheet .flabel").all_inner_texts()], "trash": await pg.locator(".sheet .btn.danger").count()}
        close = lambda: pg.locator(".sheet .icon-btn[aria-label='Fechar']").click()

        await pg.goto(LISTAS); await pg.wait_for_timeout(1500)
        names = await pg.locator(".list-card .lc-title").all_inner_texts()
        check(len(names) == 9 and {"Lista de compras", "Google Tasks", "Avisos do condomínio", "Chamados", "CalDAV"} <= set(names), f"nine lists on the home ({names})")
        cal = pg.locator(".list-card", has=pg.locator(".lc-title", has_text="CalDAV"))
        check("off" in await cal.get_attribute("class") and "Indisponível" in await cal.locator(".lc-meta").inner_text(), "CalDAV (not answering): 'Indisponível', dimmed")
        await pg.screenshot(path=f"{SP}/shots/rvf-home.png", full_page=True)

        # ---- the local list: everything
        await open_list("Casa")
        f = await facts()
        check(f["quick"] == 1 and f["grips"] == 3 and f["disabled"] == 0, f"Casa: add, reorder, complete ({f})")
        s = await sheet_of("Pagar conta de luz")
        check(s["labels"][:3] == ["Item", "Notas", "Prazo"] and s["trash"] == 1, f"Casa: notes, deadline, delete ({s})")
        await pg.locator(".sheet .pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .field", has=pg.locator(".flabel", has_text="Horário")).count() == 1, "Casa: a deadline can have a time")
        await close(); await pg.wait_for_timeout(300)

        # ---- Lista de compras: reorder, but no dates and no notes
        check(await open_list("Lista de compras") == "Lista de compras", "Lista de compras opens")
        f = await facts()
        check(f["quick"] == 1 and f["grips"] == 3 and f["limpar"] == 1, f"Lista de compras: add, reorder, clear done ({f})")
        s = await sheet_of("Manteiga")
        # 2.58.0: a list that takes no date gets a deadline kept by the app
        check(s["labels"] == ["Item", "Prazo", "Lista (mover)"] and s["trash"] == 1, f"Lista de compras: no notes, a deadline of the app ({s['labels']})")
        await close(); await pg.wait_for_timeout(300)
        keys0 = await pg.locator(".panel.items .item[data-drag]").evaluate_all("(els) => els.map((e) => e.dataset.key)")
        grip = await pg.locator(f".item[data-key='{keys0[-1]}'] .grip").bounding_box()
        top = await pg.locator(f".item[data-key='{keys0[0]}']").bounding_box()
        await pg.mouse.move(grip["x"] + grip["width"] / 2, grip["y"] + grip["height"] / 2); await pg.mouse.down()
        await pg.mouse.move(grip["x"] + grip["width"] / 2, top["y"] + 4, steps=14); await pg.mouse.up(); await pg.wait_for_timeout(700)
        order = [i["summary"] for i in await items(COMPRAS) if i["status"] == "needs_action"]
        check(order == ["Queijo", "Pão", "Manteiga"], f"Lista de compras: reordered in Home Assistant ({order})")
        await pg.screenshot(path=f"{SP}/shots/rvf-compras.png")

        # ---- Google Tasks: a date, but no time
        await open_list("Google Tasks")
        f = await facts()
        check(f["quick"] == 1 and f["grips"] == 1, f"Google Tasks: add, reorder ({f})")
        s = await sheet_of("Renovar passaporte")
        check(s["labels"][:3] == ["Item", "Notas", "Prazo"], f"Google Tasks: notes and deadline ({s['labels']})")
        await pg.locator(".sheet .pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .field", has=pg.locator(".flabel", has_text="Horário")).count() == 0, "Google Tasks: no time for the deadline")
        await pg.locator(".sheet textarea").nth(1).fill("Levar foto 3x4")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        it = await item(GOOGLE, "Renovar passaporte")
        check(it.get("due") == tomorrow and it.get("description") == "Levar foto 3x4", f"saved as a date, with the notes ({it})")
        await pg.locator(".tab", has_text="Sugestões").click(); await pg.wait_for_timeout(500)
        check("Renovar passaporte" in " ".join(await pg.locator(".page .panel.due-group").all_inner_texts()), "its deadline is in Sugestões")

        # ---- Alexa: add, edit, delete only
        await open_list("Shopping list")
        f = await facts()
        check(f["quick"] == 1 and f["grips"] == 0 and f["limpar"] == 1, f"Alexa: add and clear, no reorder ({f})")
        s = await sheet_of("Leite")
        check(s["labels"] == ["Item", "Prazo", "Lista (mover)"] and s["trash"] == 1, f"Alexa: no notes, a deadline of the app ({s['labels']})")
        check(await pg.locator(".sheet .app-due").count() == 0, "Alexa: no hint before a date")
        await pg.locator(".sheet .pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
        hint = await pg.locator(".sheet .app-due").inner_text() if await pg.locator(".sheet .app-due").count() else ""
        check(hint.strip() == "Guardado no ResolvIA: a lista não aceita data.", f"Alexa: the date stays in the ResolvIA ({hint})")
        check(await pg.locator(".sheet .field", has=pg.locator(".flabel", has_text="Quem faz")).count() == 0, "Alexa: no Quem faz, as before")
        await pg.screenshot(path=f"{SP}/shots/rvf-alexa-prazo.png")
        await pg.locator(".sheet textarea").first.fill("Leite desnatado")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(600)
        it = await item(ALEXA, "Leite desnatado")
        check(it and it.get("due") == tomorrow, f"Alexa: renamed, with the deadline of the app ({it})")
        saved = json.load(open(f"{DATA}/resolvia.json")).get("dues", {})
        check(saved.get(ALEXA) == {"leite desnatado": tomorrow}, f"kept by the app, by the name ({saved})")
        await home()
        await pg.locator(".tab", has_text="Sugestões").click(); await pg.wait_for_timeout(500)
        check("Leite desnatado" in " ".join(await pg.locator(".page .panel.due-group").all_inner_texts()), "Alexa: its deadline is in Sugestões")
        await open_list("Shopping list")
        await pg.locator(".items .item", has_text="Leite desnatado").locator(".it-body").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.danger").click(); await pg.wait_for_timeout(600)
        check(await item(ALEXA, "Leite desnatado") is None, "Alexa: deleted")
        check(await pg.locator(".toast span").inner_text() == "Item apagado" and await pg.locator(".toast button", has_text="Desfazer").count() == 1, "with Desfazer (the list takes it back)")
        await pg.screenshot(path=f"{SP}/shots/rvf-alexa.png")

        # ---- read only
        await open_list("Avisos do condomínio")
        f = await facts()
        check(f["quick"] == 0 and f["grips"] == 0 and f["disabled"] == f["rows"] == 1, f"read only: no field, the checks are off ({f})")
        check("Esta lista é só leitura" in f["foot"], "it says the list is read only")
        await pg.locator(".items .item", has_text="Assembleia").locator(".it-body").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet").count() == 0, "tapping an item opens nothing")
        await pg.locator(".items .item", has_text="Assembleia").locator(".check").click(force=True); await pg.wait_for_timeout(400)
        check((await item(AVISOS, "Assembleia na quinta"))["status"] == "needs_action", "and it cannot be completed")
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(200)
        check(f["limpar"] == 0 and await pg.locator(".item.done", has_text="Dedetização").count() == 1, "its done items show, without Limpar")
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        menu = [t.split("\n")[0].strip() for t in await pg.locator(".sheet .menu-row").all_inner_texts()]
        check("Limpar concluídos" not in menu and "Personalizar" in menu, f"⋯ without Limpar concluídos ({menu})")
        await pg.screenshot(path=f"{SP}/shots/rvf-readonly.png")
        await close(); await pg.wait_for_timeout(300)

        # ---- no new items: complete, edit and delete, but no field
        await open_list("Chamados")
        f = await facts()
        check(f["quick"] == 0 and f["disabled"] == 0, f"no new items: no field, but it can be completed ({f})")
        s = await sheet_of("Ligar para o síndico")
        check(s and s["trash"] == 1 and "Lista (mover)" in s["labels"], f"its items can be edited, moved and deleted ({s})")
        await close(); await pg.wait_for_timeout(300)
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        chosen = await pg.locator(".sheet .pick.list.on").inner_text()
        targets = [t.strip() for t in await pg.locator(".sheet .pick.list").all_inner_texts()]
        check(chosen != "Chamados" and "Chamados" not in targets, f"+ inside it adds to another list ({chosen})")
        check(sorted(targets) == sorted(["Shopping list", "To-do list", "Problem List", "Casa", "Lista de compras", "Google Tasks"]), f"+ offers only the lists that take new items and answer ({targets})")
        await close(); await pg.wait_for_timeout(300)
        await pg.locator(".items .item", has_text="Ligar para o síndico").locator(".check").click(); await pg.wait_for_timeout(500)
        check((await item(CHAMADOS, "Ligar para o síndico"))["status"] == "completed", "completed in Home Assistant")
        await pg.wait_for_timeout(1000)
        await pg.locator(".done-toggle").click(); await pg.wait_for_timeout(300)
        await pg.locator(".item.done", has_text="Ligar para o síndico").locator(".it-body").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.danger").click(); await pg.wait_for_timeout(700)
        check(await item(CHAMADOS, "Ligar para o síndico") is None, "deleted in Home Assistant")
        check(await pg.locator(".toast span").inner_text() == "Item apagado" and await pg.locator(".toast button").count() == 0, "no Desfazer: the list could not take it back")
        txt = await pg.locator(".page").inner_text()
        check("Lista vazia" in txt and "Esta lista não aceita itens novos por aqui." in txt, "empty: it says it takes no new items here")
        await pg.screenshot(path=f"{SP}/shots/rvf-sem-novos.png")

        # ---- not answering
        await open_list("CalDAV")
        txt = await pg.locator(".page").inner_text()
        check("Lista indisponível" in txt and await pg.locator(".quick input").count() == 0, "unavailable: says so, no field")

        # ---- no list takes new items: + says so
        creat = [CASA, ALEXA, "todo.notas_e_rotinas_do_alexa_to_do_list", "todo.analise_dos_dispositivos_problem_list", COMPRAS, GOOGLE]
        for eid in creat: await ws({"type": "resolvia/prefs/set_list", "entity_id": eid, "prefs": {"hidden": True}})
        await pg.reload(); await pg.wait_for_timeout(1300)
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet").count() == 0 and await pg.locator(".toast span").inner_text() == "Nenhuma lista aceita itens novos", "+ with no list that takes items: a toast, no sheet")
        for eid in creat: await ws({"type": "resolvia/prefs/set_list", "entity_id": eid, "prefs": {"hidden": None}})

        # ---- importing a backup from another Home Assistant into these lists
        backup = {
            "app_name": "ResolvIA",
            "prefs": {"lists": {}, "app": {}},
            "rules": {},
            "lists": [
                {"entity_id": AVISOS, "name": "Avisos do condomínio", "items": [{"uid": "a", "summary": "Pintar a garagem", "status": "needs_action"}]},
                {"entity_id": "todo.outro_google", "name": "Google Tasks", "items": [{"uid": "g", "summary": "Consulta no dentista", "status": "needs_action", "due": f"{tomorrow}T15:30:00-03:00"}]},
                {"entity_id": "todo.mercado", "name": "Mercado", "items": [{"uid": "m", "summary": "Pão", "status": "needs_action"}]},
            ],
        }
        open(f"{SP}/rvf-outro.json", "w").write(json.dumps(backup))
        await pg.reload(); await pg.wait_for_timeout(1300)
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(500)
        await pg.locator("#rv-data-import").set_input_files(f"{SP}/rvf-outro.json"); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.primary", has_text="Importar").click(); await pg.wait_for_timeout(1500)
        toast = await pg.locator(".toast span").inner_text()
        print("toast:", toast)
        check("Lista não encontrada: Mercado" in toast, "import: names the list that is not here")
        check("1 item ficou de fora (a lista não aceita itens novos)" in toast, "import: says what a list could not take")
        check("1 item voltou para as listas" in toast, "import: what came back")
        it = await item(GOOGLE, "Consulta no dentista")
        check(it and it.get("due") == tomorrow, f"a deadline with a time goes in as a date where the list takes no time ({it})")
        check(await item(AVISOS, "Pintar a garagem") is None, "nothing added to the read-only list")
        await pg.screenshot(path=f"{SP}/shots/rvf-import.png")
        open(f"{SP}/rvf-alheio.json", "w").write(json.dumps({"foo": 1}))
        await pg.locator("#rv-data-import").set_input_files(f"{SP}/rvf-alheio.json"); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.primary", has_text="Importar").click(); await pg.wait_for_timeout(1000)
        toast = await pg.locator(".toast span").inner_text()
        check(toast == "Não consegui importar. Esse .json não é do ResolvIA.", f"a file of something else: says so ({toast})")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
