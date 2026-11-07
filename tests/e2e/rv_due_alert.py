# ResolvIA 2.41.0: Opções › Prazos › Avisar o que vence hoje. Off by default; on, it picks the phones of the
# people (Ana and Beto), 08:00; the time and Testar side by side, the same size; Testar sends what is due today
# to the phones chosen (the simulated Home Assistant keeps it); a phone off and the time are saved; with
# Controlar prazos off, the alert goes away. 320 px to the computer, light and dark.
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
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvda_app.log", "w"), stderr=subprocess.STDOUT)
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
            await pg.goto(URL); await pg.wait_for_timeout(1500)
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
            check(await sw.is_checked(), f"{tag}: on")
            phones = prazos.locator(".pick.phone")
            names = [t.strip() for t in await phones.all_inner_texts()]
            check(names == ["Beto", "Ana"], f"{tag}: the phones, by whose they are ({names})")
            if k == 0:
                on = [t.strip() for t in await prazos.locator(".pick.phone.on").all_inner_texts()]
                check(sorted(on) == ["Ana", "Beto"], f"{tag}: turned on, every phone of a person picked ({on})")
                pr = app_prefs()
                check(pr.get("due_alert") is True and sorted(pr.get("due_alert_to") or []) == ["mobile_app_galaxy_s23", "mobile_app_pixel_8"], f"{tag}: saved ({pr})")
                check("No celular, uma vez por dia." in await row.inner_text(), f"{tag}: the line when on")
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
                check(sorted(n["service"] for n in got) == ["mobile_app_galaxy_s23", "mobile_app_pixel_8"] and all("Trocar filtro do ar" in n["message"] for n in got), f"{tag}: Testar: what is due today, to both phones ({[(n['service'], n['message']) for n in got]})")
                toast = await a.locator(".toast").inner_text() if await a.locator(".toast").count() else ""
                check("Toque nele para abrir Prazos" in toast, f"{tag}: the toast ({toast})")
                await phones.filter(has_text="Beto").click(); await pg.wait_for_timeout(600)
                check(app_prefs().get("due_alert_to") == ["mobile_app_pixel_8"], f"{tag}: a phone off, saved ({app_prefs().get('due_alert_to')})")
                await phones.filter(has_text="Ana").click(); await pg.wait_for_timeout(600)
                check(await tb.is_disabled() and "Escolha ao menos um celular." in await prazos.inner_text(), f"{tag}: no phone: Testar off, and why")
                await phones.filter(has_text="Ana").click(); await pg.wait_for_timeout(600)
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
        # ?aba=prazos (the tap on the alert): the app opens on Prazos
        ctx = await b.new_context(viewport={"width": 390, "height": 844})
        pg = await ctx.new_page()
        await pg.goto(URL + "?aba=prazos"); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        view = await a.evaluate("(el) => el._view().name")
        check(view == "due" and "aba=" not in pg.url, f"the tap on the alert opens Prazos ({view}, {pg.url})")
        await ctx.close()
        await b.close()

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
