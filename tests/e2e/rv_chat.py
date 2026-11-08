# ResolvIA 2.33.0: Conversa, the chat with the AI beside the microphone: the screen, the lists, actions after a tap, the microphone, Usar IA off.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvh-data", f"{SP}/rvh-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=open(f"{SP}/rvh_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, MEDIA_DIR=f"{SP}/rvh-media", PORT="8099"), stdout=open(f"{SP}/rvh_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
def fake_log(): return open(f"{SP}/rvh_fake.log").read()
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
WS = """(msgs) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); let n = 0; ws.onopen = () => msgs.forEach((m, k) => ws.send(JSON.stringify({id: k + 1, ...m}))); ws.onmessage = (e) => { if (JSON.parse(e.data).type === 'result' && ++n === msgs.length) { ws.close(); res(); } }; })"""
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            got = fn()
            if asyncio.iscoroutine(got): got = await got
            if got: return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(2000)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        # the button beside the microphone (home and a list)
        btn = a.locator(".chat-top").first
        check(await btn.count() == 1 and await btn.get_attribute("aria-label") == "Conversar com a IA", "home: Conversar com a IA beside the microphone")
        await btn.click(); await pg.wait_for_timeout(400)
        chat = sheet.locator(".chat")
        ex = [t.strip() for t in await chat.locator(".chat-ex .pick").all_inner_texts()]
        check(await chat.count() == 1 and "O que está atrasado?" in ex, f"the chat opens empty, with examples ({ex})")
        await pg.screenshot(path=f"{SP}/shots/rvh-empty.png")
        # an example: what is late (the AI gets the lists)
        await chat.locator(".chat-ex .pick", has_text="O que está atrasado?").click()
        async def answered(n): return await chat.locator(".chat-msg.ia .chat-bubble:not(.typing)").count() >= n
        await wait_for(lambda: answered(1), "the AI answers")
        ia = await chat.locator(".chat-msg.ia .chat-bubble").last.inner_text()
        check("Pagar conta de luz" in ia, f"about the lists: what is late ({ia!r})")
        check(await chat.locator(".chat-msg.me", has_text="O que está atrasado?").count() == 1, "the question shows as the person's")
        await sheet.locator(".chat-head .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # in a list: the screen goes along, the conversation is kept
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        await a.locator(".detail-head .chat-top").click(); await pg.wait_for_timeout(400)
        check(await chat.locator(".chat-msg").count() >= 2, "the conversation is kept when it opens again")
        box = chat.locator("textarea")
        await box.fill("oi"); await box.press("Enter")
        await wait_for(lambda: answered(2), "Enter sends")
        ia = await chat.locator(".chat-msg.ia .chat-bubble").last.inner_text()
        check('tela: a lista "Casa"' in ia, f"the AI knows the screen ({ia!r})")
        # adicionar: cards, nothing done before the tap; Fazer todas
        await box.fill("adiciona pilhas e lâmpada na lista Casa"); await chat.locator(".chat-send").click()
        await wait_for(lambda: answered(3), "the AI proposes")
        acts = [t.split("\n")[0] for t in await chat.locator(".chat-act .chat-act-tx").all_inner_texts()]
        check(acts == ['Adicionar "Pilhas" em Casa', 'Adicionar "Lâmpada" em Casa'], f"two cards ({acts})")
        items = [t.strip() for t in await a.locator(".page .item .it-text").all_inner_texts()]
        check("Pilhas" not in items, "nothing added before the tap")
        await pg.screenshot(path=f"{SP}/shots/rvh-acts.png")
        await chat.locator(".chat-all", has_text="Fazer todas (2)").click(); await pg.wait_for_timeout(1500)
        check(await chat.locator(".chat-act.done").count() == 2, "Fazer todas: both done")
        await sheet.locator(".chat-head .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(500)
        items = [t.strip() for t in await a.locator(".page .item .it-text").all_inner_texts()]
        check("Pilhas" in items and "Lâmpada" in items, f"added to Casa ({items})")
        # concluir: one card, Fazer
        await a.locator(".detail-head .chat-top").click(); await pg.wait_for_timeout(400)
        await box.fill("conclui Passar pano na casa em Casa"); await box.press("Enter")
        await wait_for(lambda: answered(4), "the AI proposes to complete")
        card = chat.locator(".chat-act").last
        check('Concluir "Passar pano na casa" em Casa' in await card.inner_text(), "a card to complete")
        await card.locator("button", has_text="Fazer").click(); await pg.wait_for_timeout(1500)
        check(await card.get_attribute("class") and "done" in await card.get_attribute("class"), "done after the tap")
        # the microphone: what is heard is sent
        await chat.locator(".chat-mic").click(); await pg.wait_for_timeout(1800)
        check("on" in (await chat.locator(".chat-mic").get_attribute("class")), "the microphone listens")
        await chat.locator(".chat-mic").click()
        await wait_for(lambda: answered(5), "what was heard goes to the AI")
        me = await chat.locator(".chat-msg.me .chat-bubble").last.inner_text()
        check("Comprar pilhas" in me, f"the words heard as the person's message ({me!r})")
        # Nova: a clean conversation
        await chat.locator(".chat-head .text-btn", has_text="Nova").click(); await pg.wait_for_timeout(300)
        check(await chat.locator(".chat-msg").count() == 0, "Nova clears the conversation")
        await sheet.locator(".chat-head .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # Uso da IA counts it
        check(fake_log().count("fake AI chat") >= 5, "each turn is one call to the AI")
        # Controlar prazos off: nothing is late, so no example about it (2.44.0)
        await pg.evaluate(WS, [{"type": "resolvia/prefs/set_app", "prefs": {"due_off": True}}])
        await pg.reload(); await pg.wait_for_timeout(1800)
        await a.locator(".chat-top").first.click(); await pg.wait_for_timeout(400)
        if await chat.locator(".chat-head .text-btn", has_text="Nova").count(): await chat.locator(".chat-head .text-btn", has_text="Nova").click(); await pg.wait_for_timeout(300)
        ex = [t.strip() for t in await chat.locator(".chat-ex .pick").all_inner_texts()]
        check(ex == ["Por onde eu começo hoje?", "Adiciona leite na lista de compras"], f"Controlar prazos off: no 'O que está atrasado?' ({ex})")
        await sheet.locator(".chat-head .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        await pg.evaluate(WS, [{"type": "resolvia/prefs/set_app", "prefs": {"due_off": None}}])
        # Usar IA off: no button
        await pg.evaluate(WS, [{"type": "resolvia/prefs/set_app", "prefs": {"ai_off": True}}])
        await pg.reload(); await pg.wait_for_timeout(1800)
        check(await a.locator(".chat-top").count() == 0, "Usar IA off: no Conversa")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
