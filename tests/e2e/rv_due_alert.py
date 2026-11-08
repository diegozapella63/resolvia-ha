# ResolvIA 2.41.0: Opções › Prazos › Avisar o que vence hoje. Off by default; on: 08:00, the time and Testar
# side by side, the same size; Testar sends what is due today to my phone (the simulated Home Assistant keeps
# it); the time is saved; with Controlar prazos off, the alert goes away. 320 px to the computer, light and dark.
# 2.42.0: Personalizar › De quem é (Todos or a person): the alert of that list goes only to that person's phone.
# 2.43.0: no phones to pick: Quem recebe shows each person and their phone (only shown).
# 2.44.1: the app looks at the person, never at a device: Quem recebe shows only the people (no device names),
# "sem celular" for one with no phone tied to them in Home Assistant, and never the Avisos of the CronologIA.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
DATA, SHARE = f"{SP}/rvda-data", f"{SP}/rvda-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-ana", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvda_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

import json, urllib.request
def notes():
    return json.loads(urllib.request.urlopen(f"http://127.0.0.1:{HA_PORT}/dev/notifications").read())
def app_prefs():
    try: return json.load(open(f"{DATA}/resolvia.json"))["prefs"]["app"]
    except Exception: return {}

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for k, (scheme, w) in enumerate((("dark", 390), ("light", 320), ("dark", 1280))):
            ctx = await b.new_context(viewport={"width": w, "height": 844 if w < 1000 else 900}, device_scale_factor=2, color_scheme=scheme, has_touch=w < 1000)
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(LISTAS); await pg.wait_for_timeout(1500)
            a = pg.locator("resolvia-panel")
            tag = f"{scheme} {w}px"
            await a.evaluate("(el) => el._go('/config/opcoes')"); await pg.wait_for_timeout(600)
            prazos = a.locator(".panel").filter(has_text="Controlar prazos")
            row = prazos.locator(".row", has_text="Avisar o que vence hoje")
            sw = row.locator("input[role=switch]")
            if k == 0:
                check(await row.count() == 1 and not await sw.is_checked(), f"{tag}: Avisar o que vence hoje, off by default")
                check("Desligado." in await row.inner_text(), f"{tag}: Desligado.")
                await sw.evaluate("(x) => x.click()"); await pg.wait_for_timeout(900)
                check(app_prefs().get("due_alert") is True, f"{tag}: saved")
                check("Cada pessoa recebe as listas dela e as de todos." in await row.inner_text(), f"{tag}: the line when on")
            check(await sw.is_checked(), f"{tag}: on")
            check(await prazos.locator(".pick.phone").count() == 0, f"{tag}: no phones to pick")
            who = [" ".join(t.split()) for t in await prazos.locator(".due-who .dw").all_inner_texts()]
            check(who == ["Ana", "Beto"], f"{tag}: Quem recebe, each person, no device names ({who})")
            t = prazos.locator("input.remind-time"); tb = prazos.locator(".remind-test")
            check(await t.input_value() == ("08:00" if k == 0 else "07:30"), f"{tag}: the time ({await t.input_value()})")
            bt, bb = await t.bounding_box(), await tb.bounding_box()
            check(abs(bt["height"] - bb["height"]) <= 1 and abs(bt["width"] - bb["width"]) <= 1 and abs(bt["y"] - bb["y"]) <= 1, f"{tag}: the time and Testar side by side, the same size ({bt['width']:.0f}x{bt['height']:.0f} / {bb['width']:.0f}x{bb['height']:.0f})")
            if k == 0:
                await t.fill("07:30"); await t.dispatch_event("change"); await pg.wait_for_timeout(600)
                check(app_prefs().get("due_alert_time") == "07:30", f"{tag}: the time saved")
                n0 = len(notes())
                await tb.click(); await pg.wait_for_timeout(900)
                got = notes()[n0:]
                check([n["service"] for n in got] == ["mobile_app_pixel_8"] and "Trocar filtro do ar" in got[0]["message"], f"{tag}: Testar: what is due today, on my phone ({[(n['service'], n['message']) for n in got]})")
                toast = await a.locator(".toast").inner_text() if await a.locator(".toast").count() else ""
                check(toast.startswith("Aviso enviado para o seu celular.") and "Toque nele para abrir Sugestões" in toast and "Pixel" not in toast, f"{tag}: the toast, no device name ({toast})")
                # someone without a phone: "sem celular", and where to tie one (Home Assistant), even with the CronologIA
                await a.evaluate("(el) => { el._alertPeople = [...el._alertPeople, { name: 'Cida', phone: false, me: false }]; el._pts = { ...(el._pts || {}), placar: { versao: '1.53.5', ativo: true, participantes: ['Ana'] } }; el.requestUpdate(); }"); await pg.wait_for_timeout(300)
                who = [" ".join(t.split()) for t in await prazos.locator(".due-who .dw").all_inner_texts()]
                check(who == ["Ana", "Beto", "Cida sem celular"] and await prazos.locator(".due-who .dw.off").count() == 1, f"{tag}: no phone: sem celular ({who})")
                hint = (await prazos.locator(".due-alert .field-hint").inner_text()).strip()
                check(hint == "Sem celular para Cida: ligue o celular à pessoa no Home Assistant.", f"{tag}: only Home Assistant, never the Avisos of the CronologIA ({hint})")
                await a.evaluate("(el) => { el._alertPeople = el._alertPeople.filter((p) => p.name !== 'Cida'); el._pts = { ...el._pts, placar: null }; el.requestUpdate(); }"); await pg.wait_for_timeout(300)
            over = await a.evaluate("""(el) => { const W = window.innerWidth; const bad = []; for (const e of el.renderRoot.querySelectorAll('.due-alert, .due-alert *')) { const r = e.getBoundingClientRect(); if (r.width && r.right > W + 1) bad.push(e.className + ' ' + Math.round(r.right)); } if (document.documentElement.scrollWidth > W) bad.push('page'); return bad.slice(0, 3); }""")
            check(not over, f"{tag}: nothing past the edge {over}")
            await prazos.scroll_into_view_if_needed()
            await pg.screenshot(path=f"{SP}/shots/rvda-{scheme}-{w}.png")
            if k == 2:
                # Controlar prazos off: no alert (and nothing goes)
                await prazos.locator(".row", has_text="Controlar prazos").locator("input[role=switch]").evaluate("(x) => x.click()"); await pg.wait_for_timeout(700)
                check(await prazos.locator(".row", has_text="Avisar o que vence hoje").count() == 0, f"{tag}: Controlar prazos off: the alert goes away")
                await prazos.locator(".row", has_text="Controlar prazos").locator("input[role=switch]").evaluate("(x) => x.click()"); await pg.wait_for_timeout(700)
                check(await prazos.locator(".row", has_text="Avisar o que vence hoje").locator("input[role=switch]").is_checked(), f"{tag}: back on: the alert as it was")
            check(not errs, f"{tag}: no page errors {errs}")
            await ctx.close()
        # De quem é: the list Casa is Beto's; my Testar (Ana) no longer has it
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(LISTAS); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        await a.evaluate("(el) => el._openCustomize(el._list('todo.casa'))"); await pg.wait_for_timeout(900)
        sheet = a.locator(".sheet")
        picks = [t.strip() for t in await sheet.locator(".owner-pick .pick").all_inner_texts()]
        check(picks == ["Todos", "Ana", "Beto"], f"Personalizar: De quem é, Todos and the people ({picks})")
        check(await sheet.locator(".owner-pick .pick.on").inner_text() == "Todos", "a list is everyone's by default")
        await sheet.locator(".owner-pick .pick", has_text="Beto").click(); await pg.wait_for_timeout(200)
        hint = await sheet.locator(".field:has(.owner-pick) .field-hint").inner_text()
        check("só para o celular de Beto" in hint, f"the hint ({hint})")
        bb = [await x.bounding_box() for x in await sheet.locator(".owner-pick .pick").all()]
        check(len({round(x["width"]) for x in bb}) == 1 and len({round(x["height"]) for x in bb}) == 1, f"the choices the same size ({[(round(x['width']), round(x['height'])) for x in bb]})")
        await pg.screenshot(path=f"{SP}/shots/rvda-owner.png")
        await sheet.locator(".btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(900)
        lp = json.load(open(f"{DATA}/resolvia.json"))["prefs"]["lists"].get("todo.casa", {})
        check(lp.get("owner") == "Beto", f"saved: the list is Beto's ({lp})")
        pres = json.load(open(f"{SHARE}/resolvia/integracao.json"))
        check(pres.get("donos") == {"todo.casa": "Beto"}, f"the CronologIA gets it ({pres.get('donos')})")
        await a.evaluate("(el) => el._go('/config/opcoes')"); await pg.wait_for_timeout(700)
        prazos = a.locator(".panel").filter(has_text="Controlar prazos")
        n0 = len(notes())
        await prazos.locator(".remind-test").click(); await pg.wait_for_timeout(900)
        got = notes()[n0:]
        check(len(got) == 1 and got[0]["service"] == "mobile_app_pixel_8" and "Nada vence hoje" in got[0]["message"], f"Testar (Ana): the list of Beto isn't hers ({[(n['service'], n['message']) for n in got]})")
        # the alert off: nothing said about it (it won't come)
        await a.evaluate("(el) => el._saveAppPrefs({ due_alert: null })"); await pg.wait_for_timeout(600)
        await a.evaluate("(el) => el._openCustomize(el._list('todo.casa'))"); await pg.wait_for_timeout(600)
        check(await a.locator(".sheet .owner-pick .pick.on").inner_text() == "Beto" and await a.locator(".sheet .field:has(.owner-pick) .field-hint").count() == 0, "the alert off: De quem é says nothing about an alert")
        await a.locator(".sheet .owner-pick .pick", has_text="Todos").click()
        await a.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(900)
        check("owner" not in json.load(open(f"{DATA}/resolvia.json"))["prefs"]["lists"].get("todo.casa", {}), "Todos: everyone's again")
        check(not errs, f"De quem é: no page errors {errs}")
        await ctx.close()
        # ?aba=prazos (the tap on the alert): the app opens on Sugestões (2.48.0; Prazos before), with what is due
        ctx = await b.new_context(viewport={"width": 390, "height": 844})
        pg = await ctx.new_page()
        await pg.goto(URL + "?aba=prazos"); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        view = await a.evaluate("(el) => el._view().name")
        path = await pg.evaluate("() => (history.state && history.state.rvPath) || ''")
        check(view == "home" and path == "" and "aba=" not in pg.url and await a.locator(".overline", has_text="Atrasados").count() == 1, f"the tap on the alert opens Sugestões ({view}, {path!r}, {pg.url})")
        await ctx.close()
        await b.close()

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
