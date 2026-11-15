# ResolvIA 2.66.0: every section (card with a heading) closes and opens with a tap on the heading, the arrow at
# the end; the device keeps the closed ones (they stay closed after opening the app again). And the icons: every
# label of the Novo item window, the title of Personalizar and of a confirmation, and its buttons.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
DATA, SHARE = f"{SP}/rvfd-data", f"{SP}/rvfd-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
os.makedirs(f"{SP}/shots", exist_ok=True)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvfd_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

HEADS = """(el) => [...el.renderRoot.querySelectorAll('.panel > .mais-head')].map((h) => ({
  t: h.querySelector('h2').textContent.trim(), role: h.getAttribute('role'), exp: h.getAttribute('aria-expanded'),
  arrow: getComputedStyle(h, '::after').width, dobra: h.parentElement.classList.contains('dobra') }))"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        errs = []
        for scheme in ("dark", "light"):
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1, color_scheme=scheme, has_touch=True)
            pg = await ctx.new_page()
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(1500)
            a = pg.locator("resolvia-panel")
            async def go(path):
                await a.evaluate("(el, p) => el._go(p)", path); await pg.wait_for_timeout(500)

            # ---- Configurações › Integrações: each card folds
            await go("/config")
            heads = await a.evaluate(HEADS)
            check(len(heads) >= 3 and all(h["role"] == "button" and h["exp"] == "true" and h["dobra"] and h["arrow"] == "20px" for h in heads), f"{scheme}: every section of Integrações with the arrow, open ({[h['t'] for h in heads]})")
            falar = a.locator("#falar")
            body = falar.locator(":scope > :not(.mais-head)").first
            check(await body.is_visible(), f"{scheme}: Falar open at first")
            h0 = (await falar.bounding_box())["height"]
            await falar.locator(":scope > .mais-head").click(); await pg.wait_for_timeout(300)
            h1 = (await falar.bounding_box())["height"]
            check(not await body.is_visible() and await falar.locator(":scope > .mais-head").get_attribute("aria-expanded") == "false" and h1 < h0 - 20, f"{scheme}: a tap on the heading closes Falar ({h0} → {h1})")
            pad = await falar.evaluate("(c) => { const h = c.querySelector(':scope > .mais-head').getBoundingClientRect(), r = c.getBoundingClientRect(), t = h.top + h.height / 2; return [Math.round(t - r.top), Math.round(r.bottom - t)] }")
            check(abs(pad[0] - pad[1]) <= 3, f"{scheme}: closed, the heading in the middle of the card {pad}")
            if scheme == "dark": await pg.screenshot(path=f"{SP}/shots/rvfd-fechada-{scheme}.png")
            # ---- kept on the device: open the app again
            await pg.reload(); await pg.wait_for_timeout(1500)
            await go("/config")
            check(await a.locator("#falar > .mais-head").get_attribute("aria-expanded") == "false" and not await a.locator("#falar > :not(.mais-head)").first.is_visible(), f"{scheme}: still closed after opening the app again")
            # ---- the keyboard: Enter opens
            await a.locator("#falar > .mais-head").focus(); await pg.keyboard.press("Enter"); await pg.wait_for_timeout(300)
            check(await a.locator("#falar > .mais-head").get_attribute("aria-expanded") == "true" and await a.locator("#falar > :not(.mais-head)").first.is_visible(), f"{scheme}: Enter on the heading opens it again")
            kept = await pg.evaluate("() => localStorage.getItem('resolvia-fechadas')")
            check(kept == "[]", f"{scheme}: open again, nothing kept ({kept})")
            # ---- Gráficos folds too
            await go("/graficos")
            g = await a.evaluate(HEADS)
            check(g and all(h["role"] == "button" for h in g), f"{scheme}: the charts fold too ({[h['t'] for h in g]})")

            # ---- the icons of the Novo item window
            await go("/listas"); await pg.wait_for_timeout(300)
            await a.locator("nav .tab.fab").click(); await pg.wait_for_timeout(600)
            labs = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.sheet .field > .flabel')].map((l) => [l.textContent.trim(), !!l.querySelector(':scope > svg.lbl-ic')])")
            check(labs and all(x[1] for x in labs), f"{scheme}: every label of the window with its icon ({labs})")
            ttl = await a.evaluate("(el) => !!el.renderRoot.querySelector('.sheet-head h3 > svg.sh-ic')")
            check(ttl, f"{scheme}: the title of the window with its icon")
            btns = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.sheet-actions .btn')].map((b) => [b.textContent.trim(), !!b.querySelector('svg')])")
            check(btns and all(x[1] for x in btns), f"{scheme}: the buttons of the window with their icons ({btns})")
            # ---- 2.67.0: the fields of choices fold with a tap on the title; closed, only what is chosen; kept
            prazo = a.locator(".sheet .field:has(> .flabel:text-is('Prazo'))")
            lab = prazo.locator(":scope > .flabel")
            check(await lab.get_attribute("role") == "button" and await lab.get_attribute("aria-expanded") == "true", f"{scheme}: Prazo folds, open at first")
            await prazo.locator(".pick", has_text="Amanhã").click(); await pg.wait_for_timeout(200)
            await lab.click(); await pg.wait_for_timeout(250)
            shown = [t.strip() for t in await prazo.locator(".pick:visible").all_inner_texts()]
            check(await lab.get_attribute("aria-expanded") == "false" and shown == [], f"{scheme}: 2.67.1: Prazo closed: all of it, even the date chosen ({shown})")
            trazer = a.locator(".sheet .field.imp-field")
            if await trazer.count():
                await trazer.locator(":scope > .flabel").click(); await pg.wait_for_timeout(250)
                check(not await trazer.locator(".imp-tiles").is_visible(), f"{scheme}: Trazer de mensagem ou foto closed")
            kept = await pg.evaluate("() => JSON.parse(localStorage.getItem('resolvia-campos') || '[]')")
            check("Prazo" in kept, f"{scheme}: kept on the device ({kept})")
            await a.locator(".sheet .icon-btn[aria-label=Fechar]").click(); await pg.wait_for_timeout(400)
            await a.locator("nav .tab.fab").click(); await pg.wait_for_timeout(600)
            check(await prazo.locator(":scope > .flabel").get_attribute("aria-expanded") == "false", f"{scheme}: opened again, Prazo still closed")
            await prazo.locator(":scope > .flabel").click(); await pg.wait_for_timeout(200)
            if await trazer.count():
                await trazer.locator(":scope > .flabel").click(); await pg.wait_for_timeout(200)
            check(await prazo.locator(".pick:visible").count() >= 4 and await pg.evaluate("() => localStorage.getItem('resolvia-campos')") == "[]", f"{scheme}: open again: every date")
            if await prazo.locator(".pick.on", has_text="Amanhã").count():
                await prazo.locator(".pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
            await a.locator(".sheet .icon-btn[aria-label=Fechar]").click(); await pg.wait_for_timeout(400)

            # ---- Buscar › Incluir folds, kept on the device (2.68.0); the lists of the results open again on each visit
            await go("/buscar")
            inc = a.locator("#incluir")
            check(await inc.get_attribute("aria-expanded") == "true" and await inc.locator("svg.lbl-ic").count() == 1, f"{scheme}: Incluir with its icon, open")
            await inc.click(); await pg.wait_for_timeout(250)
            vis = await a.locator(".filters .pick:visible").count()
            check(await inc.get_attribute("aria-expanded") == "false" and vis == 0, f"{scheme}: 2.67.1: Incluir closed: all of it ({vis})")
            # each list of the results folds by its name
            lst = a.locator(".search-list").first
            n0 = await lst.locator(".item, .row").count()
            await lst.locator(".fold-over").click(); await pg.wait_for_timeout(250)
            n1 = await lst.locator(".item, .row").count()
            name = (await lst.locator(".fold-over").inner_text()).strip()
            check(n0 > 0 and n1 == 0 and await lst.locator(".fold-over").get_attribute("aria-expanded") == "false" and name.endswith(f"({n0})"), f"{scheme}: a list of Buscar closes by its name, with how many ({name}, {n0} → {n1})")
            await go("/listas"); await go("/buscar")
            check(await a.locator("#incluir").get_attribute("aria-expanded") == "false" and await a.locator(".filters .pick:visible").count() == 0
                  and await a.locator(".search-list .fold-over[aria-expanded=false]").count() == 0, f"{scheme}: back to Buscar, Incluir still closed (kept), the lists open again")
            await pg.reload(); await pg.wait_for_timeout(1200); await go("/buscar")
            check(await a.locator("#incluir").get_attribute("aria-expanded") == "false" and await pg.evaluate("() => localStorage.getItem('resolvia-incluir-fechado')") == "true", f"{scheme}: after reopening the app too")
            await a.locator("#incluir").click(); await pg.wait_for_timeout(250)
            check(await a.locator("#incluir").get_attribute("aria-expanded") == "true" and await a.locator(".filters .pick:visible").count() > 0 and await pg.evaluate("() => localStorage.getItem('resolvia-incluir-fechado')") == "false", f"{scheme}: a tap opens it again, kept")
            await ctx.close()
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
