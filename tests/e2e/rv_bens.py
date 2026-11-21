# ResolvIA 2.62.0: Casa ou Bens. The area Bens of the InventarIA (house, car: what is outside the house) is not a room
# of the house: the item first says where (Casa | Bens); Casa shows the rooms of the house (without a Bens chip) and its
# equipment, Bens shows the bens (Bem) and the task goes to the area Bens. With the real InventarIA (its area Bens).
# 2.79.0: Nenhum comes first (where a new item starts: no rooms and no equipment), and Integrações › InventarIA › Usar bens
# (on while the InventarIA uses bens; off, no area here; locked, saying why, when the InventarIA does not use bens).
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, json, os, subprocess, time, tempfile
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA; INV = INVENTARIA + "/inventario"
T = tempfile.mkdtemp(prefix="rvb-", dir=SP)
DATA, SHARE, INVDATA = f"{T}/data", f"{T}/share", f"{T}/invdata"
for d in (DATA, SHARE, INVDATA): os.makedirs(d)
json.dump({"format": "inventario-casa", "schema": 1, "rev": 1, "items": [
    {"id": "coz-001", "room": "cozinha", "seq": 1, "zone": "", "name": "Geladeira", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "sal-001", "room": "sala", "seq": 1, "zone": "", "name": "Televisão", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "ben-001", "room": "bens", "seq": 1, "zone": "", "name": "Carro", "details": "", "cat": "veiculos", "qty": "1", "value": None, "photos": []}], "rooms": [
    {"id": "cozinha", "code": "COZ", "name": "Cozinha", "order": 1, "cover": 0, "photos": []},
    {"id": "sala", "code": "SAL", "name": "Sala", "order": 2, "cover": 0, "photos": []},
    {"id": "bens", "code": "BEN", "name": "Bens", "order": 99, "cover": 0, "photos": [], "kind": "bens"}]}, open(f"{INVDATA}/inventario.json", "w"))
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
procs = []
procs.append(subprocess.Popen(["python3", f"{INV}/app/server.py"], env=dict(os.environ, INV_DATA=INVDATA, INV_SHARE=f"{SHARE}/inventario", INV_SEED=f"{INV}/seed", INV_WEB=f"{INV}/app/web", INV_PORT="8097", INV_ALLOW="10.9.9.9,127.0.0.1", INV_URL_INTERNA="http://127.0.0.1:8097"), stdout=open(f"{T}/inv.log", "w"), stderr=subprocess.STDOUT))
procs.append(subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=open(f"{T}/fake.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1)
procs.append(subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{T}/app.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1.5)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def presence(): return json.load(open(f"{SHARE}/resolvia/integracao.json"))
PICKS = "(el) => [...el.shadowRoot.querySelectorAll('.sheet .pick.room')].map((b) => b.textContent.trim())"


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.evaluate("(el) => el._saveAppPrefs({ rooms_on: true, equips_on: true })"); await pg.wait_for_timeout(500)
        await a.evaluate("(el) => el._refreshRooms()"); await pg.wait_for_timeout(1500)
        check([c.get("tipo") for c in presence()["comodos"]["lista"]] == [None, None, "bens"], f"the CronologIA gets the area Bens with its tipo ({presence()['comodos']['lista']})")
        # Casa: the rooms of the house, no Bens chip
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(500)
        seg = sheet.locator(".seg.where button")
        # 2.79.0: Nenhum first, and where a new item starts: no rooms and no equipment until Casa or Bens
        check([t.strip() for t in await seg.all_inner_texts()] == ["Nenhum", "Casa", "Bens"], "Nenhum | Casa | Bens before the rooms")
        check("on" in (await seg.first.get_attribute("class") or "") and await seg.first.get_attribute("aria-pressed") == "true", "a new item starts in Nenhum")
        labels = [t.strip() for t in await sheet.locator(".flabel").all_inner_texts()]
        check(await a.evaluate(PICKS) == [] and "Cômodo" not in labels and "Equipamento" not in labels, f"Nenhum: no Cômodo and no Equipamento ({labels})")
        w = await seg.evaluate_all("(bs) => bs.map((b) => [Math.round(b.getBoundingClientRect().width), Math.round(b.getBoundingClientRect().top), b.scrollWidth > b.clientWidth + 1, !!b.querySelector('svg')])")
        check(len(w) == 3 and max(x[0] for x in w) - min(x[0] for x in w) <= 1 and len({x[1] for x in w}) == 1 and not any(x[2] for x in w) and all(x[3] for x in w), f"the three of the same size, side by side, with the icon, nothing cut ({w})")
        await sheet.locator(".seg.where").scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvb-nenhum.png")
        await seg.nth(1).click(); await pg.wait_for_timeout(250)
        labels = [t.strip() for t in await sheet.locator(".flabel").all_inner_texts()]
        picks = await a.evaluate(PICKS)
        check(picks == ["Todos", "Cozinha", "Sala"] and "Equipamento" in labels, f"Casa: the rooms of the house, no Bens, and the equipment ({picks})")
        # 320 px: the three still side by side, whole
        await pg.set_viewport_size({"width": 320, "height": 700}); await pg.wait_for_timeout(300)
        w = await seg.evaluate_all("(bs) => bs.map((b) => [Math.round(b.getBoundingClientRect().width), Math.round(b.getBoundingClientRect().top), b.scrollWidth > b.clientWidth + 1])")
        check(max(x[0] for x in w) - min(x[0] for x in w) <= 1 and len({x[1] for x in w}) == 1 and not any(x[2] for x in w) and await pg.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"320 px: the three side by side, nothing cut ({w})")
        await pg.set_viewport_size({"width": 390, "height": 844}); await pg.wait_for_timeout(300)
        await sheet.locator(".seg.where").scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvb-casa.png")
        # Bens: no rooms, the bens; saved in the area Bens
        await sheet.locator("textarea").first.fill("Revisar o carro")
        await seg.nth(2).click(); await pg.wait_for_timeout(250)
        check(await a.evaluate(PICKS) == [] and await sheet.locator(".flabel", has_text="Cômodo").count() == 0, "Bens: no rooms")
        check(await sheet.locator(".flabel", has_text="Bem").count() == 1, "Bens: the field is Bem")
        await sheet.locator(".eq-row", has_text="Carro").click(); await pg.wait_for_timeout(250)
        check(await sheet.locator(".eq-sel", has_text="Carro").count() == 1 and await sheet.locator(".eq-add", has_text="Outro bem").count() == 1, "the car picked, and Outro bem")
        await pg.screenshot(path=f"{SP}/shots/rvb-bens.png")
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1500)
        st = stored()
        check(st.get("rooms", {}).get("todo.casa", {}).get("revisar o carro") == "bens" and st.get("equips", {}).get("todo.casa", {}).get("revisar o carro") == "ben-001", f"saved in the area Bens, with the car ({st.get('rooms')}, {st.get('equips')})")
        # opened again: in Bens
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        await a.locator(".item", has_text="Revisar o carro").locator(".it-text").click(); await pg.wait_for_timeout(500)
        check("on" in (await sheet.locator(".seg.where button").nth(2).get_attribute("class") or ""), "opened again: in Bens")
        await sheet.locator(".icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # ---- 2.79.0: Mais › Configurações › Integrações › InventarIA › Usar bens (on while the InventarIA uses bens)
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(700)
        card = a.locator("#comodos")
        await card.scroll_into_view_if_needed()
        rows = [" ".join(t.split()) for t in await card.locator(".row.switch-row .grow").all_inner_texts()]
        check(len(rows) == 3 and rows[2] == "Usar bens Uma tarefa pode ser de um bem, como a casa ou o carro.", f"Usar bens after Usar equipamentos ({rows})")
        sw = card.locator("input[aria-label='Usar bens']")
        check(await sw.is_checked() and await sw.is_enabled() and await card.locator(".row.switch-row").nth(2).locator(".label svg").count() == 1, "on from the start, with the icon")
        await card.screenshot(path=f"{SP}/shots/rvb-usar-bens.png")
        await card.locator(".row.switch-row").nth(2).locator(".switch").click(); await pg.wait_for_timeout(1800)
        check(stored()["prefs"]["app"].get("bens_on") is False and [c["id"] for c in presence()["comodos"]["lista"]] == ["cozinha", "sala"]
              and [e["id"] for e in presence()["equipamentos"]["lista"]] == ["coz-001", "sal-001"], f"off: kept, and the area and its items leave the file of the CronologIA ({presence()['comodos']['lista']})")
        check(" ".join((await card.locator(".row.switch-row").nth(2).locator(".grow").inner_text()).split()) == "Usar bens Desligado." and "Bens" not in await card.locator(".ai-state").inner_text(), "off: Desligado, and Bens out of the rooms read")
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(500)
        labels = [t.strip() for t in await sheet.locator(".flabel").all_inner_texts()]
        check(await sheet.locator(".seg.where").count() == 0 and "Cômodo" in labels and "Equipamento" in labels and await a.evaluate(PICKS) == ["Todos", "Cozinha", "Sala"], f"off: no Nenhum | Casa | Bens; the rooms and the equipment as before ({labels})")
        await sheet.locator(".icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        # the InventarIA with its own Usar bens off: the switch here is locked and says why
        import urllib.request
        def inv(method, path, body=None):
            req = urllib.request.Request("http://127.0.0.1:8097" + path, method=method, data=json.dumps(body).encode() if body is not None else None, headers={"Content-Type": "application/json"})
            return urllib.request.urlopen(req, timeout=10).read()
        await card.locator(".row.switch-row").nth(2).locator(".switch").click(); await pg.wait_for_timeout(1500)
        check(stored()["prefs"]["app"].get("bens_on") is None and len(presence()["comodos"]["lista"]) == 3, "on again: Bens back")
        try:
            inv("PUT", "/api/settings", {"bens": False})
            await card.locator(".btn", has_text="Verificar de novo").click(); await pg.wait_for_timeout(2000)
            sw = card.locator("input[aria-label='Usar bens']")
            check(" ".join((await card.locator(".row.switch-row").nth(2).locator(".grow").inner_text()).split()) == "Usar bens O InventarIA não usa bens." and not await sw.is_checked() and await sw.is_disabled(),
                  "the InventarIA without bens: locked, saying why")
            await card.screenshot(path=f"{SP}/shots/rvb-sem-bens.png")
        except Exception as e:
            check(False, f"the InventarIA with Usar bens off ({e})")
        check(await pg.evaluate("document.documentElement.scrollWidth <= innerWidth"), "nothing past the edge")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
