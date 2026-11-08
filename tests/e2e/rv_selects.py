# ResolvIA 2.46.0: the boxes of choice open a sheet in the look of the app (selectsheet.js, the same file in all the
# apps), never the window of the phone: the options in rows, the current one marked in the color of the app, light
# and dark; choosing goes into the box (the app hears change as always); the Back of the phone, the X and a tap
# outside close only the sheet. On a computer, a card in the middle; the keyboard opens and chooses. The Relatório de
# pendências too, without the hidden lists.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, os, subprocess, time, shutil, json
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
DATA, SHARE = f"{SP}/rvss-data", f"{SP}/rvss-share"
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
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-ana", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvss_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
def prefs(): return json.load(open(f"{DATA}/resolvia.json"))["prefs"]["app"]

async def tap(pg, loc):
    await loc.scroll_into_view_if_needed()
    bx = await loc.bounding_box()
    await pg.touchscreen.tap(bx["x"] + bx["width"] / 2, bx["y"] + bx["height"] / 2)
    await pg.wait_for_timeout(450)

async def to_config(pg, a):
    await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
    await a.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(500)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--lang=pt-BR"])
        hidden = ""
        for scheme in ("light", "dark"):
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, color_scheme=scheme, locale="pt-BR", timezone_id="America/Sao_Paulo", device_scale_factor=2, has_touch=True, is_mobile=True)
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(LISTAS); await pg.wait_for_timeout(1800)
            a = pg.locator("resolvia-panel")
            if scheme == "light":
                # a hidden list, for the report
                hidden = await a.evaluate("async (el) => { const l = el._L.filter((x) => !x.hidden).at(-1); await el._saveListPrefs(l.id, { hidden: true }); return l.name; }")
                await pg.wait_for_timeout(600)
            await to_config(pg, a)
            sel = a.locator("#falar select")
            check(await sel.evaluate("(s) => getComputedStyle(s).pointerEvents") == "none", f"{scheme}: the box never gets the tap (the window of the phone doesn't open)")
            opts = await sel.locator("option").all_inner_texts()
            # ---- tap: the sheet
            await tap(pg, sel)
            sheet = pg.locator(".ss-wrap.in .ss-sheet")
            check(await sheet.count() == 1, f"{scheme}: a tap opens the sheet")
            check((await sheet.locator(".ss-head b").inner_text()).strip() == "Fala para texto", f"{scheme}: its title is the name of the box")
            rows = [t.strip() for t in await sheet.locator(".ss-opt").all_inner_texts()]
            check(rows == [o.strip() for o in opts], f"{scheme}: the options in rows ({rows})")
            on = sheet.locator(".ss-opt.on")
            check(await on.count() == 1 and (await on.inner_text()).strip() == opts[0].strip(), f"{scheme}: the current one is marked")
            accent = await a.evaluate("(el) => getComputedStyle(el.shadowRoot.querySelector('#falar select')).getPropertyValue('--rv-accent').trim()")
            ck = await on.locator("svg").evaluate("(s) => getComputedStyle(s).color")
            bg = await sheet.evaluate("(s) => getComputedStyle(s).backgroundColor")
            check(bg == ("rgb(32, 24, 25)" if scheme == "dark" else "rgb(255, 255, 255)"), f"{scheme}: the colors of the app's own windows ({bg})")
            check(accent and ck != "rgb(0, 0, 0)", f"{scheme}: the mark in the color of the app ({accent}, {ck})")
            bx = await sheet.bounding_box()
            check(abs(bx["y"] + bx["height"] - 844) < 2 and bx["width"] >= 389, f"{scheme}: from the bottom, the width of the phone ({bx})")
            await pg.screenshot(path=f"{SP}/shots/rvss-{scheme}.png")
            # ---- choose: into the box, the app saves it
            await tap(pg, sheet.locator(".ss-opt", has_text="faster-whisper"))
            await pg.wait_for_timeout(900)
            check(await pg.locator(".ss-wrap").count() == 0, f"{scheme}: choosing closes the sheet")
            check(await sel.evaluate("(s) => s.value") == "stt.faster_whisper" and prefs().get("voice_engine") == "stt.faster_whisper", f"{scheme}: the choice goes into the box and the app saves it")
            check(await a.locator(".more-tabs").count() == 1, f"{scheme}: still in Configurações")
            # ---- Back: only the sheet
            await tap(pg, sel)
            check(await pg.locator(".ss-wrap.in").count() == 1, f"{scheme}: opens again")
            await pg.go_back(); await pg.wait_for_timeout(600)
            check(await pg.locator(".ss-wrap").count() == 0 and await a.locator(".more-tabs").count() == 1, f"{scheme}: Back closes only the sheet")
            check(prefs().get("voice_engine") == "stt.faster_whisper", f"{scheme}: Back changes nothing")
            # ---- something over the box (a bar stuck over a scrolled list): the tap is for it, not for the box
            await sel.scroll_into_view_if_needed()
            await pg.evaluate("""() => { const s = document.querySelector('resolvia-panel').shadowRoot.querySelector('#falar select'), r = s.getBoundingClientRect();
              const b = document.createElement('button'); b.id = 'tampa';
              b.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;z-index:50`;
              b.onclick = () => (window.__tampa = (window.__tampa || 0) + 1); document.body.appendChild(b); }""")
            await tap(pg, pg.locator("#tampa"))
            check(await pg.locator(".ss-wrap").count() == 0 and await pg.evaluate("window.__tampa") == 1, f"{scheme}: a box under something else: the tap is for what is on top")
            await pg.evaluate("document.getElementById('tampa').remove()")
            # ---- X and a tap outside
            await tap(pg, sel)
            await tap(pg, pg.locator(".ss-x"))
            check(await pg.locator(".ss-wrap").count() == 0 and await a.locator(".more-tabs").count() == 1, f"{scheme}: the X closes it")
            await tap(pg, sel)
            await pg.touchscreen.tap(195, 60); await pg.wait_for_timeout(450)
            check(await pg.locator(".ss-wrap").count() == 0 and await a.locator(".more-tabs").count() == 1, f"{scheme}: a tap outside closes it")
            # the history of the app intact: one Back is the menu
            await pg.go_back(); await pg.wait_for_timeout(600)
            check(await a.locator(".more-tabs").count() == 0 and await a.locator(".more-row").count() == 5, f"{scheme}: then Back is the menu of Mais, as always")
            # back to automatic, for the next round
            await a.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(500)
            await tap(pg, sel); await tap(pg, pg.locator(".ss-opt").first); await pg.wait_for_timeout(800)
            check(prefs().get("voice_engine") in (None, ""), f"{scheme}: automatic again")
            # ---- the report: the same sheet, no hidden lists
            await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(400)
            await a.locator(".more-row", has_text="Relatório de pendências").click(); await pg.wait_for_load_state("load"); await pg.wait_for_timeout(700)
            rsel = pg.locator(".barra select")
            names = await rsel.locator("option").all_inner_texts()
            check(hidden and hidden not in names and not any("oculta" in n for n in names), f"{scheme}: the report doesn't offer the hidden list ({hidden}: {names})")
            await tap(pg, rsel)
            sheet = pg.locator(".ss-wrap.in .ss-sheet")
            check(await sheet.count() == 1 and (await sheet.locator(".ss-head b").inner_text()).strip() == "Listas", f"{scheme}: the report opens the sheet too")
            bg = await sheet.evaluate("(s) => getComputedStyle(s).backgroundColor")
            check(bg == ("rgb(22, 28, 35)" if scheme == "dark" else "rgb(255, 255, 255)"), f"{scheme}: in the colors of the page ({bg})")
            await pg.screenshot(path=f"{SP}/shots/rvss-report-{scheme}.png")
            await tap(pg, sheet.locator(".ss-opt").nth(1)); await pg.wait_for_load_state("load"); await pg.wait_for_timeout(700)
            check("lista=todo." in pg.url and await pg.locator("main > section").count() == 1, f"{scheme}: one list ({pg.url})")
            check(not errs, f"{scheme}: no page errors {errs}")
            await ctx.close()
        # ---- a computer: a card in the middle; the mouse and the keyboard
        ctx = await b.new_context(viewport={"width": 1200, "height": 800}, locale="pt-BR")
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(LISTAS); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel")
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(600)
        sel = a.locator("#falar select")
        await sel.scroll_into_view_if_needed()
        bx = await sel.bounding_box()
        await pg.mouse.click(bx["x"] + bx["width"] / 2, bx["y"] + bx["height"] / 2); await pg.wait_for_timeout(400)
        sheet = pg.locator(".ss-wrap.in .ss-sheet")
        sb = await sheet.bounding_box() if await sheet.count() else None
        check(sb and abs(sb["x"] + sb["width"] / 2 - 600) < 2 and abs(sb["y"] + sb["height"] / 2 - 400) < 2 and sb["width"] <= 440, f"computer: a card in the middle ({sb})")
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(500)
        check(await pg.locator(".ss-wrap").count() == 0, "computer: Esc closes it")
        check(await sel.evaluate("(s) => s.getRootNode().activeElement === s"), "computer: the focus back on the box")
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(400)
        check(await pg.locator(".ss-wrap.in").count() == 1, "computer: Enter on the box opens it")
        await pg.keyboard.press("ArrowDown"); await pg.keyboard.press("Enter"); await pg.wait_for_timeout(900)
        check(await pg.locator(".ss-wrap").count() == 0 and prefs().get("voice_engine") == await sel.evaluate("(s) => s.value") and await sel.evaluate("(s) => s.selectedIndex") == 1, "computer: the arrows and Enter choose")
        check(not errs, f"computer: no page errors {errs}")
        await ctx.close()
        await b.close()

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
