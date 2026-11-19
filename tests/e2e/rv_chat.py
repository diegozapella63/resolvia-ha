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
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", FAKE_MEDIA_DIR=f"{SP}/rvh-media"), stdout=open(f"{SP}/rvh_fake.log", "w"), stderr=subprocess.STDOUT)
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
        # the Back of the phone closes the Conversa (a rule of every app), and the screen stays
        await pg.go_back(); await pg.wait_for_timeout(400)
        check(await chat.count() == 0 and await a.locator(".page-title", has_text="Minhas listas").count() == 1, "Back closes the Conversa, on the same screen")
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
        # 2.70.0: Perguntas prontas at any moment: the sparkles button by the box; a tap asks and closes
        qb = chat.locator(".chat-qbtn")
        check(await qb.count() == 1 and await qb.get_attribute("aria-label") == "Perguntas prontas" and await chat.locator(".chat-quick").count() == 0, "with messages: the button of the Perguntas prontas")
        await qb.click(); await pg.wait_for_timeout(250)
        qk = [t.strip() for t in await chat.locator(".chat-quick .chat-ex .pick").all_inner_texts()]
        check(len(qk) >= 2 and await qb.get_attribute("aria-expanded") == "true", f"it shows the questions over the box ({qk})")
        await chat.locator(".chat-quick .chat-ex .pick").first.click()
        await wait_for(lambda: answered(6), "a question of the panel is asked")
        check(await chat.locator(".chat-quick").count() == 0, "and the panel closes")
        # Editar perguntas: take one out, add one, Pronto; kept on the device; Padrão brings the app's back
        await qb.click(); await pg.wait_for_timeout(250)
        await chat.locator(".chat-quick .chat-ed-open").click(); await pg.wait_for_timeout(250)
        rows = await chat.locator(".chat-ed > .chat-ed-row:not(.chat-ed-modelo) > span").all_inner_texts()
        check(rows == qk, f"Editar: the questions as a list ({rows})")
        mods = [t.strip() for t in await chat.locator(".chat-ed-modelo").all_inner_texts()]
        check(len(mods) == 20 and not set(mods) & set(qk), f"2.75.0: Editar: 20 more models beyond the 6 ({len(mods)})")
        await chat.locator(".chat-ed-row .icon-btn").first.click(); await pg.wait_for_timeout(150)
        await chat.locator(".chat-ed-new input").fill("Quanto falta na lista Casa?")
        await chat.locator(".chat-ed-new .btn", has_text="Adicionar").click(); await pg.wait_for_timeout(150)
        check(await chat.locator(".chat-ed-new input").input_value() == "" and (await chat.locator(".chat-ed > .chat-ed-row:not(.chat-ed-modelo) > span").all_inner_texts())[-1] == "Quanto falta na lista Casa?", "Adicionar: in the list, the box empty again")
        await pg.screenshot(path=f"{SP}/shots/rvh-perguntas.png")
        await chat.locator(".chat-ed-acts .btn", has_text="Pronto").click(); await pg.wait_for_timeout(250)
        saved = json.loads(await pg.evaluate("() => localStorage.getItem('resolvia-perguntas')"))
        check(saved == qk[1:] + ["Quanto falta na lista Casa?"], f"Pronto: kept on the device ({saved})")
        now = [t.strip() for t in await chat.locator(".chat-quick .chat-ex .pick").all_inner_texts()]
        check(now == saved, f"and the panel shows them ({now})")
        await chat.locator(".chat-quick .chat-ed-open").click(); await pg.wait_for_timeout(200)
        await chat.locator(".chat-ed-acts .btn", has_text="Padrão").click(); await pg.wait_for_timeout(150)
        await chat.locator(".chat-ed-acts .btn", has_text="Pronto").click(); await pg.wait_for_timeout(200)
        check(await pg.evaluate("() => localStorage.getItem('resolvia-perguntas')") is None and [t.strip() for t in await chat.locator(".chat-quick .chat-ex .pick").all_inner_texts()] == qk, "Padrão: the app's questions again (they follow the screen)")
        await qb.click(); await pg.wait_for_timeout(150)
        # 2.71.0: the round button: with the box empty, the microphone; writing, Enviar
        check(await chat.locator(".chat-mic").count() == 1 and await chat.locator(".chat-send").count() == 0, "empty box: the microphone, no Enviar beside it")
        await box.fill("oi")
        check(await chat.locator(".chat-send").count() == 1 and await chat.locator(".chat-mic").count() == 0, "writing: Enviar in the place of the microphone")
        await box.fill("")
        # 2.71.0: the clip: Tirar foto, Escolher fotos and Escolher arquivo; the file goes with the message
        clipb = chat.locator(".chat-clip")
        check(await clipb.count() == 1 and await clipb.get_attribute("aria-label") == "Anexar", "the clip beside the box")
        await clipb.click(); await pg.wait_for_timeout(200)
        ops = [t.strip() for t in await chat.locator(".chat-menu .chat-op").all_inner_texts()]
        check(ops == ["Tirar foto", "Escolher fotos", "Escolher arquivo"] and await chat.locator(".chat-menu .chat-op svg").count() == 3, f"the menu of the clip, each with its icon ({ops})")
        await pg.screenshot(path=f"{SP}/shots/rvh-clip.png")
        async with pg.expect_file_chooser() as fc:
            await chat.locator(".chat-op", has_text="Escolher fotos").click()
        chooser = await fc.value
        check(chooser.is_multiple(), "the gallery takes several")
        png = bytes.fromhex("89504e470d0a1a0a0000000d4948445200000001000000010802000000907753de0000000c49444154789c63f8cfc0000003010100c9fe92ef0000000049454e44ae426082")
        await chooser.set_files(files=[{"name": "nota.png", "mimeType": "image/png", "buffer": png}])
        await wait_for(lambda: chat.locator(".chat-file").count(), "the photo chosen, before sending")
        check(await chat.locator(".chat-menu").count() == 0 and await chat.locator(".chat-send").count() == 1, "the menu closes; with a file, Enviar")
        await box.fill("o que diz?"); await box.press("Enter")
        await wait_for(lambda: answered(7), "the photo goes with the question")
        ia = await chat.locator(".chat-msg.ia .chat-bubble").last.inner_text()
        check(ia == "Li o arquivo (image/jpeg).", f"the AI got the photo, as JPG ({ia!r})")
        arq = [t.strip() for t in await chat.locator(".chat-msg.me .chat-arq").all_inner_texts()]
        check(arq == ["nota.png"] and await chat.locator(".chat-file").count() == 0, f"its name in the question; the box clean ({arq})")
        check(not os.listdir(f"{SP}/rvh-media/resolvia/ia-temp"), "the file is removed after the AI reads")
        # Escolher arquivo: a PDF, alone; ✕ takes it out
        await clipb.click(); await pg.wait_for_timeout(200)
        async with pg.expect_file_chooser() as fc:
            await chat.locator(".chat-op", has_text="Escolher arquivo").click()
        chooser = await fc.value
        check(not chooser.is_multiple(), "a file at a time")
        await chooser.set_files(files=[{"name": "manual.pdf", "mimeType": "application/pdf", "buffer": b"%PDF-1.4 manual"}])
        await wait_for(lambda: chat.locator(".chat-file .chat-pdf").count(), "the PDF chosen")
        check((await chat.locator(".chat-file-n").inner_text()).strip() == "manual.pdf", "with its name")
        await pg.screenshot(path=f"{SP}/shots/rvh-pdf.png")
        await chat.locator(".chat-file .icon-btn").click(); await pg.wait_for_timeout(200)
        check(await chat.locator(".chat-file").count() == 0 and await chat.locator(".chat-mic").count() == 1, "✕ takes it out (the microphone again)")
        # Tirar foto: the camera of the app, titled Tirar foto; Pronto puts the photo in the Conversa
        await clipb.click(); await pg.wait_for_timeout(200)
        await chat.locator(".chat-op", has_text="Tirar foto").click(); await pg.wait_for_timeout(1500)
        cam = a.locator(".cam")
        check(await cam.count() == 1 and (await cam.locator(".cam-title").inner_text()).strip() == "Tirar foto", "the camera of the app, titled Tirar foto")
        await cam.locator(".cam-shutter").click(); await pg.wait_for_timeout(700)
        await cam.locator(".cam-done").click(); await pg.wait_for_timeout(700)
        check(await a.locator(".cam").count() == 0 and await chat.locator(".chat-file img").count() == 1, "Pronto: the photo in the Conversa, ready to send")
        await chat.locator(".chat-file .icon-btn").click(); await pg.wait_for_timeout(150)
        # Nova conversa: a clean conversation (the same words in every app)
        check((await chat.locator(".chat-head .text-btn").inner_text()).strip() == "Nova conversa", "Nova conversa")
        HEAD = """(el) => { const h = el.renderRoot.querySelector('.chat-head'); const r = h.getBoundingClientRect();
          return [...h.children].map((x) => { const b = x.getBoundingClientRect(); return [Math.round(b.height), b.left >= r.left - 1 && b.right <= r.right + 1]; }); }"""
        for w in (390, 320):
            await pg.set_viewport_size({"width": w, "height": 844}); await pg.wait_for_timeout(250)
            kids = await a.evaluate(HEAD)
            check(all(ok for _, ok in kids) and kids[1][0] <= 44, f"{w}px: the head in one line, Nova conversa not broken ({kids})")
        check((await chat.locator(".chat-head .text-btn").inner_text()).strip() == "" and await chat.locator(".chat-head .text-btn").get_attribute("aria-label") == "Nova conversa", "320px: only the + (named Nova conversa)")
        await pg.screenshot(path=f"{SP}/shots/rvh-nova-320.png")
        await pg.set_viewport_size({"width": 390, "height": 844}); await pg.wait_for_timeout(250)
        await chat.locator(".chat-head .text-btn", has_text="Nova conversa").click(); await pg.wait_for_timeout(300)
        check(await chat.locator(".chat-msg").count() == 0, "Nova clears the conversation")
        await sheet.locator(".chat-head .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # Uso da IA counts it
        check(fake_log().count("fake AI chat") >= 7, "each turn is one call to the AI")
        # Controlar prazos off: nothing is late, so no example about it (2.44.0)
        await pg.evaluate(WS, [{"type": "resolvia/prefs/set_app", "prefs": {"due_off": True}}])
        await pg.reload(); await pg.wait_for_timeout(1800)
        await a.locator(".chat-top").first.click(); await pg.wait_for_timeout(400)
        if await chat.locator(".chat-head .text-btn", has_text="Nova conversa").count(): await chat.locator(".chat-head .text-btn", has_text="Nova conversa").click(); await pg.wait_for_timeout(300)
        ex = [t.strip() for t in await chat.locator(".chat-ex .pick").all_inner_texts()]
        check(len(ex) == 6 and not [t for t in ex if "atrasado" in t or "vence" in t], f"Controlar prazos off: 6 questions, none about late or due ({ex})")
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
