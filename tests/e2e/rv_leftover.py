# ResolvIA 2.13.0: repetitions left "paused" by 2.9–2.12 can be deleted; Exibição in Opções.
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
DATA, SHARE = f"{SP}/rvl-data", f"{SP}/rvl-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvl_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
WS = """(msgs) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); let n = 0; ws.onopen = () => msgs.forEach((m, k) => ws.send(JSON.stringify({id: k + 1, ...m}))); ws.onmessage = (e) => { if (JSON.parse(e.data).type === 'result' && ++n === msgs.length) { ws.close(); res(); } }; })"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1200)
        # like 2.12: on, two rules, then switched off (rules kept)
        await pg.evaluate(WS, [{"type": "resolvia/prefs/set_app", "prefs": {"repeat_on": True}},
                               {"type": "resolvia/recurring/set", "entity_id": "todo.casa", "summary": "Passar pano na casa", "days": 2},
                               {"type": "resolvia/recurring/set", "entity_id": "todo.casa", "summary": "Trocar roupa de cama", "days": 7},
                               {"type": "resolvia/prefs/set_app", "prefs": {"repeat_on": False}}])
        await pg.reload(); await pg.wait_for_timeout(1200)
        check(len(stored()["rules"]) == 2, "two leftover repetitions")
        await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Repetições", exact=True).click(); await pg.wait_for_timeout(500)
        txt = await pg.locator("[role=tabpanel]").inner_text()
        check("Não voltam mais sozinhas" in txt and await pg.locator(".btn.danger", has_text="Excluir 2 repetições").count() == 1, "leftovers: a button to delete them")
        await pg.screenshot(path=f"{SP}/shots/rvl-leftover.png")
        await pg.locator(".btn.danger", has_text="Excluir 2 repetições").click(); await pg.wait_for_timeout(400)
        check("Excluir as repetições?" in await pg.locator(".sheet").inner_text(), "it asks first")
        await pg.locator(".sheet .btn.primary").click()
        for _ in range(20):
            if not stored()["rules"]: break
            await asyncio.sleep(0.25)
        check(not stored()["rules"] and stored()["prefs"]["app"].get("repeat_on") is False, "deleted, still off")
        # Opções › Exibição
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(500)
        check(await pg.locator(".mais-head h2").all_inner_texts() == ["Prazos", "Exibição"], "Opções has Prazos and Exibição")
        await pg.locator("input[aria-label='Concluídos abertos']").check(); await pg.wait_for_timeout(500)
        check(stored()["prefs"]["app"].get("show_done") is True, "the switches there still work")
        await pg.get_by_role("tab", name="Aparência", exact=True).click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".mais-head h2").all_inner_texts() == ["Tema", "Cor do app"], "Aparência: Tema and Cor do app only")
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f"{SP}/shots/rvl-opcoes.png")
        check(not errs, f"no page errors {errs}")
        await b.close()
try:
    asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
