# ResolvIA 2.9.2: repetition switch (Mais › Repetições), InventarIA-like import tiles, Buscar without autofocus.
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
DATA, SHARE = f"{SP}/rvu-data", f"{SP}/rvu-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rvu_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rvu_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def presence(): return json.load(open(f"{SHARE}/resolvia/integracao.json"))
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if (await fn()) if asyncio.iscoroutinefunction(fn) else fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def open_casa(pg):
    for _ in range(3):
        if await pg.locator(".items .item").count() and "Casa" in await pg.locator(".page").first.inner_text():
            return
        if await pg.locator(".list-card", has_text="Casa").count():
            await pg.locator(".list-card", has_text="Casa").click(); await pg.wait_for_timeout(600)
            return
        await pg.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(400)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, is_mobile=True)
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1200)
        # Buscar: no keyboard popping up
        await pg.locator(".tab", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        focused = await pg.evaluate("() => { const r = document.querySelector('resolvia-panel') || document.querySelector('*'); const deep = (d) => d.activeElement && d.activeElement.shadowRoot ? deep(d.activeElement.shadowRoot) : d.activeElement; const a = deep(document); return a ? a.tagName + ':' + (a.type || '') : ''; }")
        check("search" not in focused.lower(), f"Buscar opens without focusing the search box ({focused})")
        # Mais › Repetições: off by default without rules
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Repetições").click(); await pg.wait_for_timeout(400)
        sw = pg.locator("input[aria-label='Repetir depois de concluir']")
        check(not await sw.is_checked(), "no rules yet: repetition starts off")
        await pg.screenshot(path=f"{SP}/shots/rvu-rules-off.png")
        # item sheet: no repeat field
        await open_casa(pg)
        row = pg.locator(".items .item", has_text="Passar pano")
        await row.locator(".it-body").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet .flabel", has_text="Repetir depois de concluir").count() == 0, "off: the item has no repeat field")
        await pg.locator(".sheet .icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # on
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Repetições").click(); await pg.wait_for_timeout(300)
        await sw.check(); await pg.wait_for_timeout(500)
        await wait_for(lambda: stored()["prefs"]["app"].get("repeat_on") is True, "switch saved on")
        await open_casa(pg)
        await row.locator(".it-body").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".sheet .flabel", has_text="Repetir depois de concluir").count() == 1, "on: the field is back")
        await pg.locator(".sheet .pick", has_text="2 dias").click()
        await pg.locator(".sheet .btn.primary").click(); await pg.wait_for_timeout(800)
        await wait_for(lambda: any(r["days"] == 2 for r in stored()["rules"].values()), "rule saved")
        await wait_for(lambda: list(presence()["repete"].get("todo.casa", {}).values()) == [2], "the CronologIA learns it")
        check(await row.locator(".tag.rep").count() == 1, "row shows the repetition")
        # off again: with repetitions, it asks and deletes them (ResolvIA 2.13.0)
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Repetições").click(); await pg.wait_for_timeout(300)
        await sw.click(); await pg.wait_for_timeout(500)
        sheet = await pg.locator(".sheet").inner_text()
        check("Desligar a repetição?" in sheet and "1 tarefa se repete" in sheet and "excluídas" in sheet, "turning off warns that the repetitions will be deleted")
        check(await sw.is_checked(), "the switch stays on until confirmed")
        await pg.screenshot(path=f"{SP}/shots/rvu-confirm-off.png")
        await pg.locator(".sheet .btn", has_text="Cancelar").click(); await pg.wait_for_timeout(400)
        check(len(stored()["rules"]) == 1 and stored()["prefs"]["app"].get("repeat_on") is True, "Cancelar keeps everything")
        await sw.click(); await pg.wait_for_timeout(500)
        await pg.locator(".sheet .btn.primary", has_text="Excluir e desligar").click()
        await wait_for(lambda: stored()["prefs"]["app"].get("repeat_on") is False and not stored()["rules"], "confirmed: repetitions deleted and switch off")
        await wait_for(lambda: presence()["repete"] == {}, "the CronologIA sees nothing repeating")
        txt = await pg.locator("main .page").inner_text()
        check("pausada" not in txt.lower() and "Tarefas que se repetem" not in txt, "nothing left 'paused'")
        await open_casa(pg)
        check(await row.locator(".tag.rep").count() == 0, "off: no repetition chip on the row")
        # leftovers from 2.9–2.12 (switched off with rules): a button deletes them
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.locator(".more-row", has_text="Repetições").click(); await pg.wait_for_timeout(300)
        await sw.check(); await pg.wait_for_timeout(500)
        # Novo item: InventarIA-like tiles
        await pg.locator(".tab", has_text="Adicionar").click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".sheet .imp-tile").count() == 3 and await pg.locator(".sheet .ai-box").count() == 0, "Novo item: three dashed tiles (no AI box when the AI is ready)")
        labels = [t.replace(" ", " ").strip() for t in await pg.locator(".sheet .imp-tile").all_inner_texts()]
        check(labels == ["Colar mensagem", "Escolher fotos", "Digitalizar com IA"], f"tiles ({labels})")
        await pg.screenshot(path=f"{SP}/shots/rvu-novo.png")
        await pg.locator(".sheet .imp-tile", has_text="Colar mensagem").click(); await pg.wait_for_timeout(400)
        check("Colar mensagem" in await pg.locator(".sheet h3").inner_text(), "Colar mensagem opens the paste step")
        await pg.locator(".sheet .icon-btn.back").click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".sheet .imp-tile").count() == 3, "the import sheet uses the same tiles")
        await pg.screenshot(path=f"{SP}/shots/rvu-import.png")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
