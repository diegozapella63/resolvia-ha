# ResolvIA 2.60.0: Sugestões is now Agora (the tab, the side bar and the title); each card of what is due has its icon
# (Atrasados in red); Ordem dos cards at the end of Agora, like the CronologIA: each person their order, Subir and
# Descer, kept after a reload, Voltar à ordem de sempre; the Back of the phone closes the sheet. Also: Verificar de
# novo at the width of the card on the phone (250 px on the computer) and the text fields that keep the size the
# person left them (textareas.js, the same file in every app), but not the box of the Conversa.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, subprocess, os, time, shutil
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
TZ = "America/Sao_Paulo"
DATA, SHARE = f"{SP}/rvag-data", f"{SP}/rvag-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(f"{SP}/shots", exist_ok=True)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ=TZ), stdout=open(f"{SP}/rvag_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvag_app.log", "w"), stderr=subprocess.STDOUT)
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
# the cards of Agora, from the top: the id of each one
CARDS = """() => [...document.querySelector('resolvia-panel').shadowRoot.querySelectorAll('.page > .panel')].map((p) => p.dataset.card || (p.classList.contains('start') ? 'start' : '?'))"""
WIDTHS = """(s) => [...document.querySelector('resolvia-panel').shadowRoot.querySelectorAll(s)].map((b) => { const p = b.closest('.panel'), cs = getComputedStyle(p); return [Math.round(b.getBoundingClientRect().width), Math.round(p.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))]; })"""


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        ws = lambda m: pg.evaluate(WS, m)
        a = pg.locator("resolvia-panel")
        await pg.goto(URL); await pg.wait_for_timeout(1200)
        for summary, due in (("Pagar a conta de água", day(-1)), ("Levar o carro na revisão", day(1)), ("Renovar o seguro", day(3))):
            await ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": summary, "due_date": due}, "target": {"entity_id": CASA}})
        await pg.reload(); await pg.wait_for_timeout(1300)

        # Agora: the tab, the title and the icon
        tabs = [t.strip().split("\n")[0] for t in await a.locator("nav .tab").all_inner_texts()]
        check(tabs == ["Agora", "Buscar", "Adicionar", "Listas", "Mais"], f"the first tab is Agora ({tabs})")
        check(await a.locator(".page-title").inner_text() == "Agora", "the app opens on Agora")
        check(await a.locator("nav .tab").first.locator("svg path").count() > 0, "Agora with its icon")
        # each card of what is due with its icon; Atrasados in red
        heads = await pg.evaluate("""() => [...document.querySelector('resolvia-panel').shadowRoot.querySelectorAll('.page .due-group > .due-head')].map((h) => [h.querySelector('h2').textContent, !!h.querySelector('.mais-ic svg'), h.querySelector('.mais-ic').classList.contains('late')])""")
        names = [h[0] for h in heads]
        check(names[:1] == ["Atrasados"] and "Amanhã" in names and "Próximos 7 dias" in names, f"the cards of what is due ({names})")
        check(all(h[1] for h in heads), "each card with its icon")
        check([h[0] for h in heads if h[2]] == ["Atrasados"], "Atrasados with the icon in red")
        late = await a.locator(".due-group[data-card=late] .mais-ic").evaluate("(e) => getComputedStyle(e).color")
        check(late != await a.locator(".due-group[data-card=tomorrow] .mais-ic").evaluate("(e) => getComputedStyle(e).color"), "the red is not the color of the others")
        before = await pg.evaluate(CARDS)
        check(before.index("late") < before.index("start") < before.index("tomorrow") < before.index("week"), f"the order of always: late, Comece por aqui, then the later ones ({before})")
        await pg.screenshot(path=f"{SP}/shots/rvag-agora-390.png", full_page=True)

        # Ordem dos cards
        btn = a.locator(".now-order")
        check(await btn.inner_text() == "Ordem dos cards", "Ordem dos cards at the end of Agora")
        await btn.click(); await pg.wait_for_timeout(400)
        sheet = a.locator(".sheet")
        rows = [" ".join(t.split()) for t in await sheet.locator(".nc-row").all_inner_texts()]
        check(rows[0] == "Atrasados" and rows[2] == "Comece por aqui" and len(rows) == 8, f"every card in the sheet ({rows})")
        check("Sem nada agora" in " ".join(rows), "the ones with nothing now say so")
        check(await sheet.get_by_role("button", name="Subir Atrasados").is_disabled() and await sheet.get_by_role("button", name="Descer Compras").is_disabled(), "the first can't go up, the last can't go down")
        await pg.screenshot(path=f"{SP}/shots/rvag-ordem-390.png")
        await sheet.get_by_role("button", name="Subir Comece por aqui").click(); await pg.wait_for_timeout(300)
        await sheet.get_by_role("button", name="Subir Comece por aqui").click(); await pg.wait_for_timeout(300)
        rows = [" ".join(t.split()).split(" Sem")[0] for t in await sheet.locator(".nc-row").all_inner_texts()]
        check(rows[:3] == ["Comece por aqui", "Atrasados", "Hoje"], f"Comece por aqui went to the top ({rows[:3]})")
        check(await sheet.locator(".now-reset").count() == 1, "Voltar à ordem de sempre appears")
        prefs = (await ws({"type": "resolvia/prefs/get"}))["app"].get("now_order") or {}
        check(len(prefs) == 1 and list(prefs.values())[0][:2] == ["start", "late"], f"kept in the app, for this person ({prefs})")
        # the Back of the phone closes the sheet
        await pg.go_back(); await pg.wait_for_timeout(400)
        check(await sheet.count() == 0 and await a.locator(".page-title").inner_text() == "Agora", "Back closes the sheet and stays on Agora")
        after = await pg.evaluate(CARDS)
        check(after[0] == "start" and after.index("start") < after.index("late"), f"Agora in the new order ({after})")
        await pg.reload(); await pg.wait_for_timeout(1300)
        check((await pg.evaluate(CARDS))[0] == "start", "the order stays after a reload")
        await a.locator(".now-order").click(); await pg.wait_for_timeout(300)
        await a.locator(".sheet .now-reset").click(); await pg.wait_for_timeout(400)
        check(await a.locator(".sheet .now-reset").count() == 0 and "now_order" not in (await ws({"type": "resolvia/prefs/get"}))["app"], "Voltar à ordem de sempre: the order of always")
        await a.locator(".sheet .icon-btn[aria-label=Fechar]").click(); await pg.wait_for_timeout(400)
        check((await pg.evaluate(CARDS))[0] == "late", "Agora back in the order of always")

        # Verificar de novo at the width of the card on the phone
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(900)
        w = await pg.evaluate(WIDTHS, ".ai-actions .btn")
        check(w and all(abs(x - y) <= 4 for x, y in w), f"390 px: Verificar de novo at the width of the card ({w})")
        await a.locator(".ai-actions .btn").first.scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvag-verificar-390.png")

        # the text fields keep the size the person left them; the box of the Conversa grows by itself
        await a.evaluate("(el) => el._go('')"); await pg.wait_for_timeout(500)
        await a.locator("nav .tab", has_text="Adicionar").click(); await pg.wait_for_timeout(500)
        notes = a.locator(".sheet textarea[placeholder='O que precisa ser resolvido?']")
        check(await notes.evaluate("(e) => getComputedStyle(e).resize") == "vertical", "Item: can be enlarged")
        await notes.evaluate("(e) => { e.style.height = '220px'; }"); await pg.wait_for_timeout(700)
        await pg.go_back(); await pg.wait_for_timeout(400)
        await a.locator("nav .tab", has_text="Adicionar").click(); await pg.wait_for_timeout(500)
        h = await a.locator(".sheet textarea[placeholder='O que precisa ser resolvido?']").evaluate("(e) => Math.round(parseFloat(e.style.height))")
        check(h == 220, f"opened again, the size it was left ({h})")
        stored = await pg.evaluate("Object.keys(localStorage).filter((k) => k.startsWith('textareas:'))")
        check(stored == ["textareas:ResolvIA:O que precisa ser resolvido?"], f"kept in the device, with the name of the app ({stored})")
        await pg.go_back(); await pg.wait_for_timeout(400)
        # the box of the Conversa grows by itself: not resized by hand
        await a.evaluate("(el) => el._openChat()"); await pg.wait_for_timeout(400)
        box = a.locator(".chat-input textarea")
        if await box.count():
            check(await box.evaluate("(e) => getComputedStyle(e).resize") == "none", "the Conversa box stays out")
        await ctx.close()

        # the computer: Verificar de novo with 250 px, Agora in the side bar
        ctx = await b.new_context(viewport={"width": 1280, "height": 900}, color_scheme="light", timezone_id=TZ)
        pg = await ctx.new_page()
        pg.on("pageerror", lambda e: errs.append(str(e)))
        a = pg.locator("resolvia-panel")
        await pg.goto(URL); await pg.wait_for_timeout(1300)
        links = [t.strip().split("\n")[0] for t in await a.locator(".side-link").all_inner_texts()][:4]
        check(links == ["Agora", "Buscar", "Listas", "Mais"], f"the side bar: Agora first ({links})")
        await pg.screenshot(path=f"{SP}/shots/rvag-agora-pc.png")
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(900)
        w = await pg.evaluate(WIDTHS, ".ai-actions .btn")
        check(w and all(x == 250 for x, _ in w), f"computer: Verificar de novo with 250 px ({w})")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
