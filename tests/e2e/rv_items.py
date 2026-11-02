# ResolvIA: the items of a list: reorder, quick add (one, several pasted lines), edit (text, notes, date, time), complete and Desfazer, uncheck, delete and Desfazer, Limpar concluídos, + choosing the list, move to another list.
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
DATA, SHARE = f"{SP}/rvit-data", f"{SP}/rvit-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvit_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvit_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = f"http://127.0.0.1:{APP_PORT}/"
CASA, SHOP, TODO = "todo.casa", "todo.notas_e_rotinas_do_alexa_shopping_list", "todo.notas_e_rotinas_do_alexa_to_do_list"
passed, failed = 0, []
def check(c, label):
    global passed
    label = label.replace("\n", " ")
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""
PASTE = """(el, text) => { const dt = new DataTransfer(); dt.setData('text/plain', text); const ev = new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }); el.dispatchEvent(ev); return ev.defaultPrevented; }"""
# what is under the middle of an element (through the shadow root): to know a tap reaches it
HIT = """(el) => { const r = el.getBoundingClientRect(); const x = r.x + r.width / 2, y = r.y + r.height / 2; let h = document.elementFromPoint(x, y); while (h && h.shadowRoot) { const i = h.shadowRoot.elementFromPoint(x, y); if (!i || i === h) break; h = i; } return h === el || el.contains(h); }"""
local_now = lambda: datetime.now(ZoneInfo(TZ))
ymd = lambda d: d.strftime("%Y-%m-%d")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        ws = lambda m: pg.evaluate(WS, m)
        async def items(eid=CASA):
            return (await ws({"type": "todo/item/list", "entity_id": eid}))["items"]
        async def item(summary, eid=CASA):
            return next((i for i in await items(eid) if i["summary"] == summary), None)
        async def wait_until(fn, secs=6):
            for _ in range(int(secs * 5)):
                try:
                    if await fn(): return True
                except Exception: pass
                await asyncio.sleep(0.2)
            return False
        async def last3():
            return [i["summary"] for i in await items()][-3:] == ["Leite", "Ovos", "Pão de forma"]
        async def status_is(summary, status):
            it = await item(summary)
            return bool(it) and it["status"] == status
        row = lambda text: pg.locator(".items .item", has_text=text)
        pending_texts = lambda: pg.locator(".panel.items").first.locator(".item:not(.done) .it-text").all_inner_texts()
        sheet_title = lambda: pg.locator(".sheet h3").inner_text()
        async def open_edit(text):
            await row(text).first.locator(".it-body").click(); await pg.wait_for_timeout(300)

        await pg.goto(URL); await pg.wait_for_timeout(1300)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(600)
        check(await pg.locator(".detail-head h1").inner_text() == "Casa", "Casa opens")

        # ---- reorder: drag the grip of the last item above the first
        keys0 = await pg.locator(".panel.items .item[data-drag]").evaluate_all("(els) => els.map((e) => e.dataset.key)")
        check(len(keys0) == 3 and await pg.locator(".panel.items .item .grip").count() == 3, f"every pending item has a grip ({keys0})")
        grip = await pg.locator(f".item[data-key='{keys0[-1]}'] .grip").bounding_box()
        top = await pg.locator(f".item[data-key='{keys0[0]}']").bounding_box()
        await pg.mouse.move(grip["x"] + grip["width"] / 2, grip["y"] + grip["height"] / 2)
        await pg.mouse.down()
        await pg.mouse.move(grip["x"] + grip["width"] / 2, top["y"] + 4, steps=14)
        await pg.wait_for_timeout(150)
        await pg.screenshot(path=f"{SP}/shots/rvit-dragging.png")
        await pg.mouse.up(); await pg.wait_for_timeout(700)
        keys1 = await pg.locator(".panel.items .item[data-drag]").evaluate_all("(els) => els.map((e) => e.dataset.key)")
        check(keys1 == [keys0[-1]] + keys0[:-1], f"the screen shows the new order ({keys1})")
        ha_order = [i["uid"] for i in await items() if i["status"] == "needs_action"]
        check(ha_order == keys1, f"Home Assistant has the new order ({ha_order})")

        # ---- quick add: Enter, the + button, blank does nothing
        quick = pg.locator(".quick input")
        check(await quick.get_attribute("placeholder") == "Adicionar item…", "the quick field")
        await quick.fill("Comprar pilhas"); await quick.press("Enter")
        check(await wait_until(lambda: item("Comprar pilhas")), "Enter adds the item to Home Assistant")
        await pg.wait_for_timeout(300)
        check(await row("Comprar pilhas").count() == 1 and await quick.input_value() == "", "it shows up, the field is empty again")
        await quick.fill("Ligar para o encanador"); await pg.locator(".quick .add-btn").click()
        check(await wait_until(lambda: item("Ligar para o encanador")), "the + button adds too")
        n = len(await items())
        await quick.fill("    "); await quick.press("Enter"); await pg.wait_for_timeout(500)
        check(len(await items()) == n, "a blank line adds nothing")

        # ---- several lines pasted: one item per line
        prevented = await quick.evaluate(PASTE, "Leite\n  Ovos  \n\nPão de forma\r\n")
        check(prevented, "pasting several lines is handled by the app")
        check(await wait_until(last3), "one item per line, trimmed, in order, blank lines skipped")
        toast = await pg.locator(".toast span").inner_text()
        check(toast == "3 itens adicionados", f"toast ({toast})")
        await pg.screenshot(path=f"{SP}/shots/rvit-pasted.png")
        n = len(await items())
        prevented = await quick.evaluate(PASTE, "Uma linha só")
        await pg.wait_for_timeout(400)
        check(not prevented and len(await items()) == n, "one pasted line is left to the field (nothing added)")

        # ---- edit: text, notes, date and time
        await open_edit("Comprar pilhas")
        check(await sheet_title() == "Editar item", "tapping an item opens Editar item")
        labels = [t.strip() for t in await pg.locator(".sheet .flabel").all_inner_texts()]
        check(labels[:3] == ["Item", "Notas", "Prazo"] and "Lista (mover)" in labels, f"Casa: item, notes, deadline, move ({labels})")
        tas = pg.locator(".sheet textarea")
        check(await tas.nth(0).input_value() == "Comprar pilhas", "the text is there")
        await tas.nth(0).fill("Comprar pilhas AA")
        await tas.nth(1).fill("Duracell, 4 unidades")
        check(await pg.locator(".sheet .time-row").count() == 0, "no time before a date")
        await pg.locator(".sheet .pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .pick.on", has_text="Amanhã").count() == 1 and await pg.locator(".sheet .time-row").count() == 1, "Amanhã chosen, the time appears (the list takes times)")
        await pg.locator(".sheet .time-row input[type=time]").fill("14:30"); await pg.wait_for_timeout(150)
        await pg.screenshot(path=f"{SP}/shots/rvit-edit.png")
        await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(700)
        it = await item("Comprar pilhas AA")
        tomorrow = local_now().date() + timedelta(days=1)
        due = datetime.fromisoformat(it["due"].replace("Z", "+00:00")).astimezone(ZoneInfo(TZ)) if it and it.get("due") else None
        check(it and it.get("description") == "Duracell, 4 unidades", "renamed, with its notes, in Home Assistant")
        check(due and due.date() == tomorrow and due.strftime("%H:%M") == "14:30", f"due tomorrow at 14:30 ({it and it.get('due')})")
        r = row("Comprar pilhas AA")
        check(await r.locator(".it-desc").inner_text() == "Duracell, 4 unidades" and await r.locator(".tag").inner_text() == "Amanhã, 14:30", f"the row shows the notes and 'Amanhã, 14:30' ({await r.locator('.tag').all_inner_texts()})")
        # Dia todo: only the date
        await open_edit("Comprar pilhas AA")
        await pg.locator(".sheet .text-btn", has_text="Dia todo").click(); await pg.wait_for_timeout(150)
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        check((await item("Comprar pilhas AA")).get("due") == ymd(tomorrow), "Dia todo: a date without time")
        check(await row("Comprar pilhas AA").locator(".tag").inner_text() == "Amanhã", "chip 'Amanhã'")
        # Outra data
        later = local_now().date() + timedelta(days=12)
        await open_edit("Comprar pilhas AA")
        await pg.locator(".sheet #rv-date").evaluate("(el, v) => { el.value = v; el.dispatchEvent(new Event('change', { bubbles: true })); }", ymd(later))
        await pg.wait_for_timeout(150)
        other = await pg.locator(".sheet .pick.on").first.inner_text()
        check(other.strip().startswith(str(later.day)), f"the other date shows on its button ({other.strip()})")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        check((await item("Comprar pilhas AA")).get("due") == ymd(later), "Outra data saved")
        # Sem prazo, and the notes cleared
        await open_edit("Comprar pilhas AA")
        await pg.locator(".sheet .pick", has_text="Sem prazo").click()
        await tas.nth(1).fill("")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        it = await item("Comprar pilhas AA")
        check("due" not in it and "description" not in it, f"no deadline, no notes ({it})")
        check(await row("Comprar pilhas AA").locator(".chips").count() == 0 and await row("Comprar pilhas AA").locator(".it-desc").count() == 0, "the row is plain again")
        # Enter saves; Escape and the backdrop close without saving
        await open_edit("Comprar pilhas AA")
        await tas.nth(0).fill("Comprar pilhas AAA"); await tas.nth(0).press("Enter"); await pg.wait_for_timeout(700)
        check(await pg.locator(".sheet").count() == 0 and await item("Comprar pilhas AAA"), "Enter in the text saves")
        await open_edit("Comprar pilhas AAA")
        await tas.nth(0).fill("Não salvar isto"); await tas.nth(0).press("Escape"); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet").count() == 0 and await item("Comprar pilhas AAA"), "Escape closes without saving")
        await open_edit("Comprar pilhas AAA")
        await tas.nth(0).fill("Nem isto"); await pg.locator(".scrim").click(position={"x": 200, "y": 60}); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet").count() == 0 and await item("Comprar pilhas AAA"), "tapping outside closes without saving")

        # ---- complete, Desfazer, uncheck
        await row("Comprar pilhas AAA").locator(".check").click(); await pg.wait_for_timeout(250)
        check(await pg.locator(".toast span").inner_text() == "Resolvido: Comprar pilhas AAA" and await pg.locator(".toast button").inner_text() == "Desfazer", "toast with Desfazer")
        check(await wait_until(lambda: status_is("Comprar pilhas AAA", "completed")), "completed in Home Assistant")
        await pg.screenshot(path=f"{SP}/shots/rvit-toast.png")
        await pg.locator(".toast button", has_text="Desfazer").click()
        check(await wait_until(lambda: status_is("Comprar pilhas AAA", "needs_action")), "Desfazer: pending again")
        await pg.wait_for_timeout(1200)
        check(await pg.locator(".items .item.done").count() == 0 and await pg.locator(".done-head").count() == 0, "nothing in Concluídos")
        await row("Comprar pilhas AAA").locator(".check").click(); await pg.wait_for_timeout(1400)
        toggle = pg.locator(".done-toggle")
        check(await toggle.count() == 1 and "Concluídos · 1" in (await toggle.inner_text()).replace("\n", " ") and await toggle.get_attribute("aria-expanded") == "false", "after a moment it goes to Concluídos (closed)")
        check("Comprar pilhas AAA" not in await pending_texts(), "and leaves the pending ones")
        await toggle.click(); await pg.wait_for_timeout(300)
        done_row = pg.locator(".item.done", has_text="Comprar pilhas AAA")
        check(await done_row.count() == 1 and await done_row.locator(".check").get_attribute("aria-label") == "Marcar como pendente", "open: the done item, with its check on")
        await pg.screenshot(path=f"{SP}/shots/rvit-done.png")
        await done_row.locator(".check").click()
        check(await wait_until(lambda: status_is("Comprar pilhas AAA", "needs_action")), "unchecking makes it pending in Home Assistant")
        await pg.wait_for_timeout(400)
        check("Comprar pilhas AAA" in await pending_texts(), "back among the pending ones")

        # ---- + inside the list: the sheet is for this list, with notes and a deadline
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        check(await sheet_title() == "Novo item" and await pg.locator(".sheet .pick.list.on").inner_text() == "Casa", "Adicionar inside Casa: for Casa")
        await pg.locator(".sheet textarea").nth(0).fill("Consertar a torneira")
        await pg.locator(".sheet textarea").nth(1).fill("Vazando na cozinha")
        await pg.locator(".sheet .pick", has_text="Amanhã").click()
        await pg.locator(".sheet .btn.primary", has_text="Adicionar").click(); await pg.wait_for_timeout(800)
        it = await item("Consertar a torneira")
        check(it and it.get("description") == "Vazando na cozinha" and it.get("due") == ymd(tomorrow), f"added with notes and deadline ({it})")
        toast = await pg.locator(".toast span").all_inner_texts()
        check(not any(t.startswith("Adicionado em") for t in toast) and await row("Consertar a torneira").locator(".tag").inner_text() == "Amanhã", f"no 'Adicionado em' toast inside the list itself; the row shows it ({toast})")

        # ---- delete, and Desfazer brings it back with its notes and deadline
        await open_edit("Consertar a torneira")
        await pg.locator(".sheet .btn.danger[aria-label='Excluir']").click(); await pg.wait_for_timeout(500)
        check(await item("Consertar a torneira") is None and await row("Consertar a torneira").count() == 0, "deleted")
        check(await pg.locator(".toast span").inner_text() == "Item excluído", "toast 'Item excluído'")
        await pg.locator(".toast button", has_text="Desfazer").click(); await pg.wait_for_timeout(800)
        it = await item("Consertar a torneira")
        check(it and it.get("description") == "Vazando na cozinha" and it.get("due") == ymd(tomorrow), f"Desfazer: back with notes and deadline ({it})")

        # ---- Limpar concluídos (⋯), right after completing (the toast must not cover the sheet's buttons)
        for t in ("Leite", "Passar pano"):
            await row(t).first.locator(".check").click(); await pg.wait_for_timeout(300)
        await pg.wait_for_timeout(900)
        await pg.locator(".icon-btn[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        menu = pg.locator(".sheet .menu-row", has_text="Limpar concluídos")
        check(await menu.count() == 1 and await menu.locator(".sub").inner_text() == "2", "⋯ has Limpar concluídos, with how many")
        await menu.click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet .confirm-text").inner_text() == "2 itens concluídos vão ser apagados de “Casa”.", "it asks first, saying how many")
        await pg.locator(".sheet .btn", has_text="Cancelar").click(); await pg.wait_for_timeout(400)
        check(len([i for i in await items() if i["status"] == "completed"]) == 2, "Cancelar keeps them")
        await row("Ovos").locator(".check").click(); await pg.wait_for_timeout(1200)
        await pg.locator(".done-head .text-btn", has_text="Limpar").click(); await pg.wait_for_timeout(350)
        check(await pg.locator(".toast").count() == 1, "(a toast is showing)")
        btn = pg.locator(".sheet .btn.primary", has_text="Limpar")
        check(await btn.evaluate(HIT), "the toast does not cover the sheet's buttons")
        await pg.screenshot(path=f"{SP}/shots/rvit-clear.png")
        await btn.click(timeout=3000); await pg.wait_for_timeout(600)
        check(not [i for i in await items() if i["status"] == "completed"], "Limpar: no completed items left in Home Assistant")
        check(await pg.locator(".toast span").inner_text() == "Concluídos apagados" and await pg.locator(".done-head").count() == 0, "toast, and no Concluídos")

        # ---- move to another list
        await open_edit("Pão de forma")
        await pg.locator(".sheet .pick.list", has_text="To-do list").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".sheet .btn.primary").inner_text() == "Mover", "choosing another list turns Salvar into Mover")
        check(await pg.locator(".sheet .flabel", has_text="Notas").count() == 0 and await pg.locator(".sheet .flabel", has_text="Prazo").count() == 0, "the fields follow the list it goes to (no notes or deadline there)")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(900)
        check(await item("Pão de forma") is None and await item("Pão de forma", TODO), "moved: out of Casa, into To-do list")
        check(await pg.locator(".toast span").inner_text() == "Movido para To-do list", "toast 'Movido para To-do list'")

        # ---- + from the home: choose the list; the last one is remembered
        await pg.locator(".detail-head .icon-btn[aria-label='Voltar']").click(); await pg.wait_for_timeout(500)
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        lists = [t.strip() for t in await pg.locator(".sheet .pick.list").all_inner_texts()]
        check(sorted(lists) == sorted(["Shopping list", "To-do list", "Casa", "Problem List"]), f"the lists that take new items ({lists})")
        check(await pg.locator(".sheet .pick.list.on").inner_text() == "Casa", "the last list used comes chosen")
        await pg.locator(".sheet .pick.list", has_text="Shopping list").click(); await pg.wait_for_timeout(200)
        labels = [t.strip() for t in await pg.locator(".sheet .flabel").all_inner_texts()]
        check("Notas" not in labels and "Prazo" not in labels, f"Shopping list: no notes, no deadline ({labels})")
        await pg.locator(".sheet textarea").first.fill("Detergente")
        await pg.screenshot(path=f"{SP}/shots/rvit-add-home.png")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(800)
        check(await item("Detergente", SHOP), "added to the Shopping list")
        check(await pg.locator(".toast span").inner_text() == "Adicionado em Shopping list", "toast 'Adicionado em Shopping list'")
        await pg.locator(".tab.fab").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet .pick.list.on").inner_text() == "Shopping list", "next time, the Shopping list comes chosen")
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet").count() == 1, "Adicionar without text keeps the sheet open")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)

        # ---- the home adds up what Home Assistant has
        total = 0
        for eid in (CASA, SHOP, TODO, "todo.analise_dos_dispositivos_problem_list"):
            total += len([i for i in await items(eid) if i["status"] == "needs_action"])
        big = (await pg.locator(".hero-big").inner_text()).split("\n")[0].strip()
        check(big == str(total), f"the home counts every pending item ({big} == {total})")
        casa_n = len([i for i in await items() if i["status"] == "needs_action"])
        meta = await pg.locator(".list-card", has_text="Casa").locator(".lc-meta").inner_text()
        check(meta.startswith(f"{casa_n} pendentes"), f"the Casa card ({meta})")
        # a link in an item: a short chip that opens the page
        await pg.locator(".list-card", has_text="To-do list").click(); await pg.wait_for_timeout(500)
        lnk = row("Ver sobre").locator("a.lnk")
        check(await lnk.get_attribute("href") == "https://www.home-assistant.io/integrations/todo/" and await lnk.get_attribute("target") == "_blank" and "home-assistant.io" in await lnk.inner_text(), f"the link becomes a chip ({await lnk.inner_text()})")
        await pg.screenshot(path=f"{SP}/shots/rvit-link.png")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()

try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
