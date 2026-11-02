# The menu of a list (⋯): Personalizar (name, color, icon, Padrão), Ocultar do início and back,
# Limpar concluídos with its confirmation; and the Desfazer of completing and of deleting an item.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE, MEDIA = f"{SP}/rvm-data", f"{SP}/rvm-share", f"{SP}/rvm-media"
for d in (DATA, SHARE, MEDIA): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", FAKE_MEDIA_DIR=MEDIA, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, MEDIA_DIR=MEDIA, PORT="8099"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(1.2)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="light")
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        cards = lambda: a.locator(".list-card .lc-title").all_inner_texts()
        sheet = a.locator(".sheet")
        async def go(path):  # the panel's own navigation (outside the Home Assistant it lives in history.state)
            await a.evaluate("(el, p) => el._go(p)", path); await pg.wait_for_timeout(600)
        check("Casa" in await cards(), f"Casa is on the start screen ({await cards()})")

        # ---- the menu
        await a.locator(".list-card", has_text="Casa").first.click(); await pg.wait_for_timeout(500)
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(350)
        rows = [t.split("\n")[0].strip() for t in await sheet.locator(".menu-row").all_inner_texts()]
        check(rows[:2] == ["Personalizar", "Ocultar do início"], f"the menu: Personalizar and Ocultar do início ({rows})")
        check(not any("Limpar concluídos" in r for r in rows), "nothing done yet: no Limpar concluídos")
        await sheet.screenshot(path=f"{SP}/shots/rvm-menu.png")

        # ---- Personalizar: name, color and icon, with the preview
        await sheet.locator(".menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(350)
        await sheet.locator(".field input[type=text]").fill("Casa da praia")
        await sheet.get_by_label("Azul", exact=True).click()
        await sheet.locator(".icon-grid .ig").nth(3).click(); await pg.wait_for_timeout(200)
        check(await sheet.locator(".preview-tile .lc-title").inner_text() == "Casa da praia", "the preview follows the name")
        check(await sheet.locator(".sw.on").get_attribute("aria-label") == "Azul", "the chosen color is checked")
        await sheet.screenshot(path=f"{SP}/shots/rvm-customize.png")
        await sheet.locator(".btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(600)
        check((await a.locator(".page h1").first.inner_text()).strip() == "Casa da praia", "the list page shows the new name")
        await pg.reload(); await pg.wait_for_timeout(1500)
        check("Casa da praia" in await cards() and "Casa" not in await cards(), f"kept after reloading ({await cards()})")
        style = await a.locator(".list-card", has_text="Casa da praia").first.get_attribute("style")
        check("#2" in (style or "") or "--c:" in (style or ""), f"the card has its color ({(style or '')[:40]})")

        # ---- Padrão: back to the name of the Home Assistant
        await a.locator(".list-card", has_text="Casa da praia").first.click(); await pg.wait_for_timeout(500)
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(300)
        await sheet.locator(".menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        await sheet.locator(".btn", has_text="Padrão").click(); await pg.wait_for_timeout(150)
        check(await sheet.locator(".field input[type=text]").input_value() == "", "Padrão clears the name")
        await sheet.locator(".btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(600)
        check((await a.locator(".page h1").first.inner_text()).strip() == "Casa", "back to Casa")

        # ---- Ocultar do início, and Mostrar no início
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(300)
        await sheet.locator(".menu-row", has_text="Ocultar do início").click(); await pg.wait_for_timeout(500)
        await go("")
        got = await cards()
        check("Casa" not in got and "Shopping list" in got, f"hidden from the start screen, the others still there ({got})")
        await go("/mais")
        mais = await a.locator(".page").first.inner_text()
        check("1 oculta" in mais, "Mais › Listas counts it as hidden")
        await go("/lista/todo.casa")
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(300)
        check(await sheet.locator(".menu-row", has_text="Mostrar no início").count() == 1, "the menu now offers Mostrar no início")
        await sheet.locator(".menu-row", has_text="Mostrar no início").click(); await pg.wait_for_timeout(500)
        await go("")
        check("Casa" in await cards(), "back on the start screen")

        # ---- completing, with Desfazer
        await a.locator(".list-card", has_text="Casa").first.click(); await pg.wait_for_timeout(500)
        row = a.locator(".items .item:not(.done)", has_text="Passar pano")
        await row.locator(".check").click(); await pg.wait_for_timeout(500)
        toast = await a.locator(".toast").inner_text()
        check("Resolvido: Passar pano" in toast and "Desfazer" in toast, f"the toast says it, with Desfazer ({toast!r})")
        await a.locator(".toast button", has_text="Desfazer").click(); await pg.wait_for_timeout(900)
        check(await a.locator(".items .item:not(.done)", has_text="Passar pano").count() == 1, "Desfazer brings it back")

        # ---- Limpar concluídos asks first
        await a.locator(".items .item:not(.done)", has_text="Passar pano").locator(".check").click(); await pg.wait_for_timeout(1400)
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(300)
        lim = sheet.locator(".menu-row", has_text="Limpar concluídos")
        check(await lim.count() == 1 and "1" in await lim.inner_text(), "with one done: Limpar concluídos (1)")
        await lim.click(); await pg.wait_for_timeout(300)
        conf = await sheet.inner_text()
        check("Limpar concluídos?" in conf and "1 item concluído vai ser apagado de “Casa”." in conf, f"asks first ({conf[:90]!r})")
        await sheet.screenshot(path=f"{SP}/shots/rvm-confirm.png")
        await sheet.locator(".btn", has_text="Cancelar").click(); await pg.wait_for_timeout(300)
        check(await a.locator(".item.done").count() + await a.locator(".done-toggle").count() >= 1, "Cancelar keeps it")
        await a.get_by_label("Opções da lista").click(); await pg.wait_for_timeout(300)
        await sheet.locator(".menu-row", has_text="Limpar concluídos").click(); await pg.wait_for_timeout(300)
        await sheet.locator(".btn.primary", has_text="Limpar").click(); await pg.wait_for_timeout(900)
        check("Concluídos apagados" in await a.locator(".toast").inner_text(), "Concluídos apagados")
        check(await a.locator(".done-toggle").count() == 0, "no done section any more")

        # ---- deleting an item, with Desfazer
        await a.locator(".items .item", has_text="Trocar filtro").locator(".it-body").click(); await pg.wait_for_timeout(400)
        await sheet.get_by_label("Excluir").click(); await pg.wait_for_timeout(700)
        check(await a.locator(".items .item", has_text="Trocar filtro").count() == 0, "deleted")
        check("Item excluído" in await a.locator(".toast").inner_text(), "Item excluído, with Desfazer")
        await a.locator(".toast button", has_text="Desfazer").click(); await pg.wait_for_timeout(1200)
        back = a.locator(".items .item", has_text="Trocar filtro")
        check(await back.count() == 1, "Desfazer adds it again")
        check("Hoje" in await back.inner_text(), f"with its date ({(await back.inner_text())[:60]!r})")
        await pg.screenshot(path=f"{SP}/shots/rvm-after.png")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
