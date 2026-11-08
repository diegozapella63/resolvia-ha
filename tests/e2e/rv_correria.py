# ResolvIA 2.49.0: Mais › Configurações › Integrações › CorrerIA (off by default, without needing Usar IA): on writes
# share/resolvia/correria.json and the tools answer with its key; the card says who used it last; off removes it.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, json, os, subprocess, time, shutil, urllib.request, urllib.error
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099"); HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
DATA, SHARE = f"{SP}/rvcr-data", f"{SP}/rvcr-share"
SHOTS = f"{SP}/shots"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA); os.makedirs(SHOTS, exist_ok=True)
FILE = f"{SHARE}/resolvia/correria.json"
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
def tools(method="GET", body=None, key=None):
    key = key if key is not None else json.load(open(FILE))["chave"]
    r = urllib.request.Request(f"http://127.0.0.1:{APP_PORT}/api/integracao/ferramentas", data=json.dumps(body).encode() if body else None, method=method, headers={"authorization": f"Bearer {key}", "content-type": "application/json", "x-app": "CorrerIA"})
    try:
        res = urllib.request.urlopen(r)
        return res.status, json.loads(res.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_REST_URL=f"http://127.0.0.1:{HA_PORT}/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT, RESOLVIA_URL_INTERNA=f"http://127.0.0.1:{APP_PORT}"), stdout=open(f"{SP}/rvcr_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def open_integracoes(pg):
    await pg.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
    await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
    await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(600)
async def no_overflow(pg, label):
    w = await pg.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
    check(w[0] <= w[1], f"{label}: nothing wider than the screen {w}")
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(f"http://127.0.0.1:{APP_PORT}/?aba=listas"); await pg.wait_for_timeout(2000)
        await open_integracoes(pg)
        panel = pg.locator("#correria")
        check(await panel.count() == 1, "Integrações: the CorrerIA card")
        heads = await pg.locator(".panel .mais-head h2").all_inner_texts()
        check(heads.index("CorrerIA") == heads.index("InventarIA") + 1, f"after the InventarIA {heads}")
        txt = " ".join((await panel.inner_text()).split())
        check(txt == "CorrerIA O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini. Usar com o CorrerIA Desligado.", f"off (the default): {txt}")
        check(not os.path.exists(FILE), "off: no file")
        sw = panel.locator("input[aria-label='Usar com o CorrerIA']")
        check(not await sw.is_checked(), "the switch is off")
        await sw.check()
        await wait_for(lambda: os.path.exists(FILE), "on: share/resolvia/correria.json")
        check(oct(os.stat(FILE).st_mode & 0o777) == "0o600", "only for the owner (600)")
        j = json.load(open(FILE))
        check(j["app"] == "resolvia" and j["url"] == f"http://127.0.0.1:{APP_PORT}" and j["ferramentas"] == "/api/integracao/ferramentas", f"the file of the contract {j['url']}")
        await pg.wait_for_timeout(400)
        txt = " ".join((await panel.inner_text()).split())
        check("Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas." in txt and "Nenhum uso ainda" in txt and "Conecte no app CorrerIA." in txt, f"on, never used: {txt}")
        await no_overflow(pg, "390 px dark")
        await panel.screenshot(path=f"{SHOTS}/rv_correria_ligado_escuro.png")
        st, body = tools()
        check(st == 200 and [t["nome"] for t in body["ferramentas"]][:2] == ["resumo", "tarefas"], f"the tools answer with the key ({st})")
        st, body = tools("POST", {"nome": "criar_tarefa", "argumentos": {"lista": "Casa", "texto": "Trocar a resistência do chuveiro"}, "pessoa": {"id": "person.ana", "nome": "Ana"}, "cliente": "Claude"})
        check(st == 200 and body["texto"].startswith("Criada em Casa: Trocar a resistência do chuveiro."), f"a task created by the Claude: {body}")
        check(tools(key="errada")[0] == 401, "a wrong key: 401")
        # the list on the screen shows it at once (Home Assistant tells the screen); the card, who used it
        await pg.goto(f"http://127.0.0.1:{APP_PORT}/?aba=listas"); await pg.wait_for_timeout(1500)
        await open_integracoes(pg)
        txt = " ".join((await panel.inner_text()).split())
        hm = time.strftime("%H:")
        check("Claude usou hoje às" in txt and hm in txt, f"the last use: {txt}")
        # Usar IA off: the card stays (who thinks is the AI of the CorrerIA)
        await pg.locator("input[aria-label='Usar IA']").uncheck(); await pg.wait_for_timeout(500)
        check(await panel.count() == 1 and await sw.is_checked(), "Usar IA off: the CorrerIA stays")
        await pg.locator("input[aria-label='Usar IA']").check(); await pg.wait_for_timeout(300)
        # light and computer
        await pg.emulate_media(color_scheme="light"); await pg.wait_for_timeout(300)
        await panel.screenshot(path=f"{SHOTS}/rv_correria_ligado_claro.png")
        await pg.set_viewport_size({"width": 1280, "height": 900}); await pg.wait_for_timeout(500)
        await no_overflow(pg, "computer light")
        box = await sw.locator("xpath=..").bounding_box()
        pbox = await panel.bounding_box()
        check(box and pbox and box["x"] + box["width"] <= pbox["x"] + pbox["width"], "the switch inside the card")
        await pg.screenshot(path=f"{SHOTS}/rv_correria_computador.png")
        await sw.uncheck()
        await wait_for(lambda: not os.path.exists(FILE), "off: the file goes away")
        check(tools(key=j["chave"])[0] == 401, "off: the key stops working")
        txt = " ".join((await panel.inner_text()).split())
        check(txt.endswith("Usar com o CorrerIA Desligado."), f"off again: {txt}")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.terminate(); fake.terminate()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
