# ResolvIA 2.14.0: Mais › Opções › Controlar prazos; off: no Prazos tab, no deadline field, Sugestões instead.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvs-data", f"{SP}/rvs-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA); os.makedirs(f"{SP}/shots", exist_ok=True)
DAY = 86400000
now = int(time.time() * 1000)
# the app noted these items days ago (the fake HA's uids: u1 Café, u4 Configurar modo…, u8 Passar pano)
json.dump({"versao": 1, "itens": {
    "todo.casa": {"u8": now - 20 * DAY},
    "todo.notas_e_rotinas_do_alexa_to_do_list": {"u4": now - 10 * DAY},
    "todo.notas_e_rotinas_do_alexa_shopping_list": {"u1": now - 12 * DAY},
}}, open(f"{DATA}/idades.json", "w"))
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=open(f"{SP}/rvs_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvs_app.log", "w"), stderr=subprocess.STDOUT)
def restart_app():
    global app
    app.kill(); time.sleep(0.5)
    app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvs_app.log", "w"), stderr=subprocess.STDOUT)
    time.sleep(1.5)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
WS1 = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({id: 1, ...m})); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.type === 'result') { ws.close(); res(r); } }; })"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="light")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1400)
        nav = lambda: pg.locator("nav .tab").all_inner_texts()
        check("Prazos" in " ".join(await nav()) and "Sugestões" not in " ".join(await nav()), "deadlines on by default: Prazos tab")
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".item .tag.late", has_text="Ontem").count() == 1, "on: yesterday's bill is late")
        await pg.locator(".item .it-text", has_text="Pagar conta de luz").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet .flabel", has_text="Prazo").count() == 1, "on: the item has a deadline field")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)

        # Mais › Opções › Controlar prazos off
        await pg.locator("nav .tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(400)
        sw = pg.locator("input[aria-label='Controlar prazos']")
        check(await sw.is_checked(), "Opções › Prazos: Controlar prazos on")
        await sw.uncheck(); await pg.wait_for_timeout(600)
        check(stored()["prefs"]["app"].get("due_off") is True, "off is saved (due_off)")
        check("vira Sugestões" in await pg.locator(".panel", has_text="Controlar prazos").inner_text(), "the hint says Prazos becomes Sugestões")
        await pg.screenshot(path=f"{SP}/shots/rvs-opcoes.png")
        t = " ".join(await nav())
        check("Sugestões" in t and "Prazos" not in t, f"off: Sugestões in place of Prazos ({t})")
        check(await pg.locator("nav .tab .badge").count() == 0, "no late badge")

        # home and list: dates are information only
        for _ in range(3):
            if await pg.locator(".hero").count(): break
            await pg.locator("nav .tab", has_text="Listas").click(); await pg.wait_for_timeout(400)
        check("atrasado" not in await pg.locator(".hero").inner_text() and await pg.locator(".list-card .tag.late").count() == 0, "home: nothing late")
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".item .tag.late").count() == 0 and await pg.locator(".item .tag.info", has_text="Ontem").count() == 1, "list: the date is grey information")
        await pg.locator(".item .it-text", has_text="Pagar conta de luz").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet .flabel", has_text="Prazo").count() == 0, "off: no deadline field")
        await pg.locator(".sheet textarea").first.fill("Pagar conta de luz já"); await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(700)
        check(await pg.locator(".item .tag.info", has_text="Ontem").count() == 1, "saving keeps the date the item had")
        await pg.locator("[aria-label='Opções da lista']").click(); await pg.wait_for_timeout(300)
        row = await pg.locator(".sheet .menu-row", has_text="Personalizar").inner_text()
        check("prazos" not in row, "Personalizar no longer mentions deadlines")
        await pg.locator(".sheet .menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet input[aria-label='Prazos']").count() == 0, "Personalizar: no Prazos switch")
        await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(500)
        check(not stored()["prefs"]["lists"].get("todo.casa", {}).get("dates_info"), "saving Personalizar doesn't turn the list's deadlines off")

        # Sugestões
        await pg.locator("nav .tab", has_text="Sugestões").click(); await pg.wait_for_timeout(900)
        page = await pg.locator(".page").inner_text()
        top = pg.locator(".panel.items", has_text="Comece por aqui").locator(".item")
        n = await top.count()
        texts = [await top.nth(k).inner_text() for k in range(n)]
        print("TOP:", [t.replace("\n", " / ") for t in texts])
        check("Sugestões" in page and "pendentes em" in page, "Sugestões page with the count")
        check(n == 5, f"Comece por aqui: 5 ({n})")
        check(texts and "TV da Sala" in texts[0] and "Assim há 2 meses" in texts[0], "first: the device problem of 2 months")
        cfg = [t for t in texts if "Configurar modo claro" in t]
        check(cfg and "Na lista há 10 dias · Faltam 2 para zerar a lista" in cfg[0], "an item 10 days on the list that closes it")
        pano = [t for t in texts if "Passar pano" in t]
        check(pano and "Na lista há 2 semanas" in pano[0], "Passar pano: 2 semanas")
        check(any("A data já passou" in t for t in texts), "a dated item whose date passed")
        check(sum("Casa" in t for t in texts) <= 2, "at most 2 from the same list")
        shop = pg.locator(".panel", has_text="Compras").locator(".list-card")
        check(await shop.count() == 1 and "há 12 dias" in await shop.inner_text() and "Café" not in page, "Compras apart, with the oldest age")
        heads = [t.strip() for t in await pg.locator(".page .mais-head h2").all_inner_texts()]
        check(heads[:2] == ["Comece por aqui", "Compras"] and await pg.locator(".panel.items", has_text="Comece por aqui").locator(".mais-head .mais-ic").count() == 1, f"Comece por aqui and Compras with their icon ({heads})")
        await pg.locator(".panel.items").first.screenshot(path=f"{SP}/shots/rvs-comece.png")
        await pg.screenshot(path=f"{SP}/shots/rvs-sugestoes.png", full_page=True)

        # Sugerir com IA: in Comece por aqui (no Pedir à IA panel)
        start = pg.locator(".panel.start")
        check(await pg.locator(".suggest-ai").count() == 0 and "Pedir à IA" not in await pg.locator(".page").inner_text(), "no Pedir à IA panel any more")
        check(await start.locator(".btn", has_text="Sugerir com IA").count() == 1, "Sugerir com IA in Comece por aqui")
        await start.locator(".btn", has_text="Sugerir com IA").click()
        await start.locator(".it-why", has_text="Motivo de teste 1").wait_for(timeout=8000)
        txt = await start.inner_text()
        check(await start.locator(".item").count() == 3 and "Escolhidos pela IA." in txt and "Google AI Task" not in txt and "o porquê" not in txt, f"Comece por aqui now has the AI picks, with who and why ({txt[:160]!r})")
        check("Na lista há" not in txt, "the automatic reasons gave way to the AI's")
        check(await start.locator(".btn", has_text="Sugerir de novo").count() == 1 and await start.locator(".btn", has_text="Voltar ao automático").count() == 1, "then: Sugerir de novo and Voltar ao automático")
        uso = json.load(open(f"{DATA}/uso_ia.json"))
        check(any(c.get("tipo") == "sugestao" for c in uso.get("ultimas", uso.get("last", []))) or "sugestao" in json.dumps(uso), "counted in Uso da IA as sugestão")
        await start.screenshot(path=f"{SP}/shots/rvs-ia.png")
        # the pick survives a restart of the app (an update): kept on disk
        check(os.path.exists(f"{DATA}/sugestao_ia.json"), "saved in sugestao_ia.json")
        restart_app()
        await pg.reload(); await pg.wait_for_timeout(1800)
        await pg.locator("nav .tab", has_text="Sugestões").click(); await pg.wait_for_timeout(1200)
        check(await pg.locator(".panel.start .it-why", has_text="Motivo de teste").count() == 3, "after restarting the app, the AI pick is still there")
        # resolve one from Sugestões
        first = pg.locator(".panel.items", has_text="Comece por aqui").locator(".item").first
        name = (await first.locator(".it-text").inner_text()).strip()
        await first.locator(".check").click(); await pg.wait_for_timeout(1500)
        check(name not in await pg.locator(".panel.items", has_text="Comece por aqui").inner_text(), f"resolving one takes it out ({name})")

        # Voltar ao automático
        await pg.locator(".panel.start .btn", has_text="Voltar ao automático").click(); await pg.wait_for_timeout(800)
        txt = await pg.locator(".panel.start").inner_text()
        check("Motivo de teste" not in txt and "Escolhidos por" not in txt and await pg.locator(".panel.start .btn", has_text="Sugerir com IA").count() == 1, "Voltar ao automático: the automatic ones again")
        check(not os.path.exists(f"{DATA}/sugestao_ia.json"), "and the pick is forgotten")
        # Usar IA off: no AI panel, the server refuses
        await pg.evaluate(WS1, {"type": "resolvia/prefs/set_app", "prefs": {"ai_off": True}})
        await pg.reload(); await pg.wait_for_timeout(1400)
        await pg.locator("nav .tab", has_text="Sugestões").click(); await pg.wait_for_timeout(900)
        check(await pg.locator(".panel.start .btn", has_text="Sugerir com IA").count() == 0 and await pg.locator(".panel.start .item").count() >= 1, "Usar IA off: Comece por aqui without Sugerir com IA")
        r = await pg.evaluate(WS1, {"type": "resolvia/ai/suggest", "items": [{"key": "todo.casa|u8", "lista": "Casa", "texto": "x"}]})
        check(not r["success"] and r["error"]["code"] == "ai_off", "server refuses with ai_off")

        # back on: Prazos returns
        await pg.locator("nav .tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(300)
        await pg.locator("input[aria-label='Controlar prazos']").check(); await pg.wait_for_timeout(600)
        t = " ".join(await nav())
        check("Prazos" in t and "Sugestões" not in t and "due_off" not in stored()["prefs"]["app"], "back on: Prazos tab again")
        await pg.locator("nav .tab", has_text="Prazos").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".overline", has_text="Atrasados").count() == 1, "Prazos lists the late ones again")

        # narrow phone, dark
        await pg.set_viewport_size({"width": 360, "height": 780}); await pg.emulate_media(color_scheme="dark")
        await pg.evaluate(WS1, {"type": "resolvia/prefs/set_app", "prefs": {"due_off": True, "ai_off": None}})
        await pg.reload(); await pg.wait_for_timeout(1400)
        await pg.locator("nav .tab", has_text="Sugestões").click(); await pg.wait_for_timeout(900)
        await pg.screenshot(path=f"{SP}/shots/rvs-dark.png", full_page=True)
        w = await pg.evaluate("() => document.documentElement.scrollWidth")
        check(w <= 360, f"no sideways scroll at 360px ({w})")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" + (f", FAILED: {failed}" if failed else ""))
