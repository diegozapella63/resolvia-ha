# ResolvIA 2.62.0: Casa ou Bens. The area Bens of the InventarIA (house, car: what is outside the house) is not a room
# of the house: the item first says where (Casa | Bens); Casa shows the rooms of the house (without a Bens chip) and its
# equipment, Bens shows the bens (Bem) and the task goes to the area Bens. With the real InventarIA (its area Bens).
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
procs.append(subprocess.Popen(["python3", f"{INV}/app/server.py"], env=dict(os.environ, INV_DATA=INVDATA, INV_SHARE=f"{SHARE}/inventario", INV_SEED=f"{INV}/seed", INV_WEB=f"{INV}/app/web", INV_PORT="8097", INV_ALLOW="10.9.9.9", INV_URL_INTERNA="http://127.0.0.1:8097"), stdout=open(f"{T}/inv.log", "w"), stderr=subprocess.STDOUT))
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
        check([t.strip() for t in await seg.all_inner_texts()] == ["Casa", "Bens"], "Casa | Bens before the rooms")
        check("on" in (await seg.first.get_attribute("class") or ""), "a new item starts in Casa")
        picks = await a.evaluate(PICKS)
        check(picks == ["Todos", "Cozinha", "Sala"], f"the rooms of the house, no Bens ({picks})")
        w = await seg.evaluate_all("(bs) => bs.map((b) => Math.round(b.getBoundingClientRect().width))")
        check(len(w) == 2 and w[0] == w[1], f"the two halves of the same size ({w})")
        await sheet.locator(".seg.where").scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvb-casa.png")
        # Bens: no rooms, the bens; saved in the area Bens
        await sheet.locator("textarea").first.fill("Revisar o carro")
        await seg.nth(1).click(); await pg.wait_for_timeout(250)
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
        check("on" in (await sheet.locator(".seg.where button").nth(1).get_attribute("class") or ""), "opened again: in Bens")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
