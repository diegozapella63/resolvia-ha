# ResolvIA 2.6.0: a deadline is only what the user sets.
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
DATA, SHARE = f"{SP}/rvd-data", f"{SP}/rvd-share"
for d in (DATA, SHARE):
    shutil.rmtree(d, ignore_errors=True)
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rvd_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rvd_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = "http://127.0.0.1:8099/"
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
presence = lambda: json.load(open(f"{SHARE}/resolvia/integracao.json"))
PL = "todo.analise_dos_dispositivos_problem_list"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        badge = pg.locator(".tab", has_text="Prazos").locator(".badge")
        check(await badge.inner_text() == "2", f"Prazos badge counts only real deadlines ({await badge.inner_text()})")
        tabs = [t.strip().split("\n")[0] for t in await pg.locator("nav .tab").all_inner_texts()]
        check(tabs == ["Listas", "Buscar", "Adicionar", "Prazos", "Mais"], f"Buscar before Adicionar, Prazos after ({tabs})")
        await pg.screenshot(path=f"{SP}/shots/rvd-nav.png")
        await pg.locator(".list-card", has_text="Problem List").click(); await pg.wait_for_timeout(600)
        item = pg.locator(".item", has_text="Luz do Banheiro")
        check(await item.locator(".tag.info").count() == 1 and await item.locator(".tag.late").count() == 0, "integration date shown as information, not overdue")
        await pg.screenshot(path=f"{SP}/shots/rvd-problem-list.png")
        await pg.locator(".icon-btn[aria-label=\"Opções da lista\"]").click(); await pg.wait_for_timeout(300)
        check("nome, cor, ícone" in await pg.locator(".sheet .menu-row", has_text="Personalizar").inner_text() and "prazos" not in await pg.locator(".sheet .menu-row", has_text="Personalizar").inner_text(), "menu doesn't offer deadlines for this list")
        await pg.locator(".sheet .menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet .switch input[aria-label=Prazos]").count() == 0 and "não aceita prazo" in await pg.locator(".sheet .sheet-note").inner_text(), "no switch to turn integration dates into deadlines, a note instead")
        await pg.screenshot(path=f"{SP}/shots/rvd-customize-pl.png")
        await pg.locator(".sheet .icon-btn[aria-label=Fechar]").click(); await pg.wait_for_timeout(300)
        await pg.locator(".tab", has_text="Prazos").click(); await pg.wait_for_timeout(500)
        txt = await pg.locator(".page").inner_text()
        check("Luz do Banheiro" not in txt and "Pagar conta de luz" in txt, "Prazos page has only real deadlines")
        p0 = presence()
        check(PL in p0["sem_prazo"] and "todo.casa" not in p0["sem_prazo"], f"presence file lists the lists without deadlines ({p0['sem_prazo']})")
        # turn off the deadlines of Casa
        await pg.goto(URL); await pg.wait_for_timeout(1200)
        await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(500)
        await pg.locator(".icon-btn[aria-label=\"Opções da lista\"]").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        sw = pg.locator(".sheet .switch input[aria-label=Prazos]")
        check(await sw.count() == 1 and await sw.is_checked(), "Casa (accepts deadlines) has the switch, on")
        await sw.uncheck(); await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(800)
        check(await badge.count() == 0, "with deadlines off, no badge")
        check(await pg.locator(".item", has_text="Pagar conta de luz").locator(".tag.info").count() == 1, "Casa dates now information")
        prefs = json.load(open(f"{DATA}/resolvia.json"))["prefs"]["lists"]
        check(prefs.get("todo.casa", {}).get("dates_info") is True, "saved")
        check("todo.casa" in presence()["sem_prazo"], "presence file updated right away")
        # and back on
        await pg.locator(".icon-btn[aria-label=\"Opções da lista\"]").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .menu-row", has_text="Personalizar").click(); await pg.wait_for_timeout(300)
        await pg.locator(".sheet .switch input[aria-label=Prazos]").check(); await pg.locator(".sheet .btn.primary", has_text="Salvar").click(); await pg.wait_for_timeout(800)
        prefs = json.load(open(f"{DATA}/resolvia.json"))["prefs"]["lists"]
        check("dates_info" not in prefs.get("todo.casa", {}) and await badge.inner_text() == "2", "back on: pref cleared, badge back")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
