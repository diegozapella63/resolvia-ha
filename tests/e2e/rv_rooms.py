# ResolvIA 2.28.0/2.29.0: Cômodos e equipamentos do InventarIA (a real InventarIA 1.14.0+ runs beside): a room per task, suggested by the AI.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, tempfile, urllib.request
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA; INV = INVENTARIA + "/inventario"
T = tempfile.mkdtemp(prefix="rvr-", dir=SP)
DATA, SHARE, INVDATA = f"{T}/data", f"{T}/share", f"{T}/invdata"
for d in (DATA, SHARE, INVDATA): os.makedirs(d)
json.dump({"format": "inventario-casa", "schema": 1, "rev": 1, "items": [
    {"id": "sal-001", "room": "sala", "seq": 1, "zone": "Parede", "name": "Ar-condicionado", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "coz-001", "room": "cozinha", "seq": 1, "zone": "", "name": "Geladeira", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "ban-001", "room": "banheiro", "seq": 1, "zone": "", "name": "Chuveiro", "details": "", "cat": "utilidades", "qty": "1", "value": None, "photos": []}], "rooms": [
    {"id": "cozinha", "code": "COZ", "name": "Cozinha", "order": 1, "cover": 0, "photos": []},
    {"id": "sala", "code": "SAL", "name": "Sala", "order": 2, "cover": 0, "photos": []},
    {"id": "banheiro", "code": "BAN", "name": "Banheiro", "order": 3, "cover": 0, "photos": []}]}, open(f"{INVDATA}/inventario.json", "w"))
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
def fire(event_type, data):
    r = urllib.request.Request("http://127.0.0.1:8123/dev/fire", data=json.dumps({"event_type": event_type, "data": data}).encode(), method="POST", headers={"content-type": "application/json"})
    urllib.request.urlopen(r).read()
async def wait_for(fn, label, tries=40):
    for _ in range(tries):
        try:
            if fn(): return check(True, label)
        except Exception: pass
        await asyncio.sleep(0.25)
    check(False, label)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(2000)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        # off by default: no room anywhere
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(400)
        check(await sheet.locator(".flabel", has_text="Cômodo").count() == 0, "off by default: no Cômodo in the item")
        await a.evaluate("(el) => el._closeSheet()"); await pg.wait_for_timeout(300)
        await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(500)
        panel = a.locator("#comodos")
        check(await panel.count() == 1 and "InventarIA" in await panel.inner_text() and "Usar cômodos" in await panel.inner_text(), "Integrações: InventarIA (cômodos e equipamentos)")
        sw = panel.locator("input[aria-label='Usar cômodos']")
        check(not await sw.is_checked(), "off")
        await sw.check(); await pg.wait_for_timeout(1500)
        txt = await panel.inner_text(); print(txt)
        check("3 cômodos" in txt and "Cozinha, Sala, Banheiro" in txt, "on: the 3 rooms of the InventarIA")
        await panel.screenshot(path=f"{T}/panel.png")
        # an item with a room
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(400)
        check(await sheet.locator(".flabel", has_text="Cômodo").count() == 1, "the item has Cômodo")
        await sheet.locator("textarea").first.fill("Arrumar a torneira")
        await sheet.locator(".pick.room", has_text="Cozinha").click(); await pg.wait_for_timeout(150)
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1200)
        check(stored().get("rooms", {}).get("todo.casa", {}).get("arrumar a torneira") == "cozinha", f"saved: Cozinha ({stored().get('rooms')})")
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        row = a.locator(".item", has_text="Arrumar a torneira")
        check(await row.locator(".tag.room", has_text="Cozinha").count() == 1, "the task shows its room")
        # rename: the room follows
        await row.locator(".it-text").click(); await pg.wait_for_timeout(400)
        check(await sheet.locator(".pick.room.on", has_text="Cozinha").count() == 1, "the sheet shows the room")
        await sheet.locator("textarea").first.fill("Arrumar a torneira da pia")
        await sheet.locator(".pick.room", has_text="Banheiro").click(); await pg.wait_for_timeout(150)
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1200)
        rooms = stored().get("rooms", {}).get("todo.casa", {})
        check(rooms.get("arrumar a torneira da pia") == "banheiro" and "arrumar a torneira" not in rooms, f"renamed and moved to Banheiro ({rooms})")
        await pg.screenshot(path=f"{T}/list.png")
        # reading with AI: the AI says the room of each item
        await a.evaluate("(el) => el._openImport('todo.casa', 'text')"); await pg.wait_for_timeout(400)
        await sheet.locator("textarea").fill("Trocar a lâmpada da sala, consertar a pia, comprar leite")
        await sheet.locator(".btn.primary", has_text="Separar itens").click()
        for _ in range(40):
            if "Revisar itens" in await sheet.inner_text(): break
            await asyncio.sleep(0.25)
        rr = await sheet.locator(".imp-row").evaluate_all("(els) => els.map((e) => [e.querySelector('input').value, (e.querySelector('.imp-room .dname') || {}).textContent || ''])")
        print("REVIEW:", rr)
        get = lambda w: next((r for t, r in rr if w in t.lower()), None)
        check(get("lâmpada") == "Sala" and get("pia") == "Cozinha" and get("leite") == "Cômodo", f"the AI picks the room (none for the milk) ({rr})")
        await sheet.screenshot(path=f"{T}/review.png")
        k = next(i for i, (t, _) in enumerate(rr) if "leite" in t.lower())
        await sheet.locator(".imp-row").nth(k).locator(".imp-room select").select_option("cozinha"); await pg.wait_for_timeout(200)
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(2000)
        allr = stored().get("rooms", {})
        flat = {k: v for m in allr.values() for k, v in m.items()}
        check(flat.get("trocar a lampada da sala") == "sala" and flat.get("consertar a pia") == "cozinha" and flat.get("comprar leite") == "cozinha", f"the rooms saved with the items ({flat})")
        # the CronologIA sees them
        pr = presence()
        check(pr.get("comodos", {}).get("lista", [{}])[0].get("nome") == "Cozinha" and pr["comodos"]["tarefas"]["todo.casa"]["consertar a pia"] == "cozinha", "share/resolvia/integracao.json has the rooms for the CronologIA")
        # a task created in the CronologIA with a room
        fire("resolvia_comodo", {"entity_id": "todo.casa", "tarefa": "Pintar o rodapé", "comodo": "sala", "origem": "CronologIA"})
        await wait_for(lambda: stored().get("rooms", {}).get("todo.casa", {}).get("pintar o rodape") == "sala", "a room set by the CronologIA (resolvia_comodo)")
        # Usar equipamentos
        await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(400)
        await a.locator("#comodos input[aria-label='Usar equipamentos']").check(); await pg.wait_for_timeout(1500)
        txt = await a.locator("#comodos").inner_text()
        check("3 cômodos · 3 equipamentos" in txt, f"on: 3 rooms · 3 equipamentos ({txt[:160]!r})")
        await a.locator("#comodos").screenshot(path=f"{T}/panel2.png")
        # the item sheet: Equipamento, grouped by room; picking it fills the room
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(400)
        eq = sheet.locator(".field:has(.flabel:text-is('Equipamento')), .field:has(.flabel:text-is('Equipamentos'))")
        check(await eq.locator("input[aria-label='Buscar equipamento']").count() == 1 and "busque entre 3 equipamentos" in await eq.inner_text(), "Equipamento: a search, and how many there are")
        # a room chosen: only its items
        await sheet.locator(".pick.room", has_text="Cozinha").click(); await pg.wait_for_timeout(200)
        names = [t.strip() for t in await eq.locator(".eq-row b").all_inner_texts()]
        check(names == ["Geladeira"] and await eq.locator("input").get_attribute("placeholder") == "Buscar em Cozinha…", f"Cozinha: only its items ({names})")
        await eq.screenshot(path=f"{T}/picker-room.png")
        await eq.locator("input").fill("chuv"); await pg.wait_for_timeout(200)
        await eq.screenshot(path=f"{T}/picker-other.png")
        check("em outros cômodos" in (await eq.inner_text()).lower() and await eq.locator(".eq-row", has_text="Chuveiro").count() == 1 and "Banheiro" in await eq.locator(".eq-row", has_text="Chuveiro").inner_text(), "searching: what is in other rooms comes apart, with its room")
        await eq.locator("input").fill("ar co"); await pg.wait_for_timeout(200)
        check(await eq.locator(".eq-row mark").first.inner_text() == "Ar" if await eq.locator(".eq-row mark").count() else False, "the search words in bold")
        await eq.screenshot(path=f"{T}/picker.png")
        await sheet.locator("textarea").first.fill("Limpar o filtro")
        await eq.locator(".eq-row", has_text="Ar-condicionado").click(); await pg.wait_for_timeout(200)
        check(await sheet.locator(".pick.room.on", has_text="Sala").count() == 1, "the room of the equipment comes along")
        check("Ar-condicionado" in await eq.locator(".eq-sel").inner_text() and "Parede · Sala" in await eq.locator(".eq-sel").inner_text(), "the chosen one: a card with zone and room")
        # 2.31: with equipment the room is locked (it is the equipment's)
        room_field = sheet.locator(".field:has(.flabel:text-is('Cômodo')), .field:has(.flabel:text-is('Cômodos'))")
        check(await room_field.locator(".pick[disabled]").count() >= 3 and "Vem do equipamento." in await room_field.inner_text(), "the room is locked: it comes from the equipment")
        await eq.screenshot(path=f"{T}/picked.png")
        # another equipment, in another room: Outro equipamento, then both rooms
        check(await eq.locator("input").count() == 0 and await eq.locator(".eq-add", has_text="Outro equipamento").count() == 1, "with one chosen: Outro equipamento instead of the search")
        await eq.locator(".eq-add").click(); await pg.wait_for_timeout(200)
        await eq.locator("input").fill("gela"); await pg.wait_for_timeout(200)
        await eq.locator(".eq-row", has_text="Geladeira").click(); await pg.wait_for_timeout(200)
        cards = [t.split("\n")[0] for t in await eq.locator(".eq-sel .eq-tx b").all_inner_texts()]
        check(cards == ["Ar-condicionado", "Geladeira"] and await sheet.locator(".flabel", has_text="Equipamentos").count() == 1, f"two equipments ({cards})")
        on = sorted(t.strip() for t in await room_field.locator(".pick.on").all_inner_texts())
        check(on == ["Cozinha", "Sala"] and "Vem dos equipamentos." in await room_field.inner_text() and await sheet.locator(".flabel", has_text="Cômodos").count() == 1, f"both rooms, locked ({on})")
        await sheet.screenshot(path=f"{T}/two-equips.png")
        # × on one: it goes; the other stays
        await eq.locator(".eq-sel", has_text="Geladeira").locator("button").click(); await pg.wait_for_timeout(200)
        check([t.split("\n")[0] for t in await eq.locator(".eq-sel .eq-tx b").all_inner_texts()] == ["Ar-condicionado"], "× takes that one out")
        await eq.locator(".eq-add").click(); await pg.wait_for_timeout(200)
        await eq.locator("input").fill("gela"); await pg.wait_for_timeout(200)
        await eq.locator(".eq-row", has_text="Geladeira").click(); await pg.wait_for_timeout(200)
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(1200)
        st = stored()
        check(st.get("equips", {}).get("todo.casa", {}).get("limpar o filtro") == ["sal-001", "coz-001"] and st["rooms"]["todo.casa"].get("limpar o filtro") == ["sala", "cozinha"], f"saved: both equipments and their rooms ({st.get('equips')}, {st.get('rooms')})")
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        row = a.locator(".item", has_text="Limpar o filtro")
        check(await row.locator(".tag", has_text="Ar-condicionado").count() == 1 and await row.locator(".tag", has_text="Geladeira").count() == 1 and await row.locator(".tag", has_text="Sala").count() == 1 and await row.locator(".tag", has_text="Cozinha").count() == 1, "the task shows both equipments and both rooms")
        await pg.screenshot(path=f"{T}/list2.png")
        # the AI picks the equipment too
        await a.evaluate("(el) => el._openImport('todo.casa', 'text')"); await pg.wait_for_timeout(400)
        await sheet.locator("textarea").fill("Trocar a resistência do chuveiro, limpar a geladeira, comprar pão")
        await sheet.locator(".btn.primary", has_text="Separar itens").click()
        for _ in range(40):
            if "Revisar itens" in await sheet.inner_text(): break
            await asyncio.sleep(0.25)
        rr = await sheet.locator(".imp-row").evaluate_all("(els) => els.map((e) => [e.querySelector('input').value, (e.querySelector('.imp-equip .dname') || {}).textContent || ''])")
        print("REVIEW2:", rr)
        get = lambda w: next((r for t, r in rr if w in t.lower()), None)
        check(get("chuveiro") == "Chuveiro" and get("geladeira") == "Geladeira" and get("pão") == "Equipamento", f"the AI picks the equipment ({rr})")
        rooms2 = await sheet.locator(".imp-row").evaluate_all("(els) => els.map((e) => (e.querySelector('.imp-room:not(.imp-equip) .dname') || {}).textContent || '')")
        check(rooms2[0] == "Banheiro", f"the room of the equipment comes along ({rooms2})")
        await sheet.screenshot(path=f"{T}/review2.png")
        # the bread: pick an equipment by searching under its row
        k = next(i for i, (t, _) in enumerate(rr) if "pão" in t.lower())
        await sheet.locator(".imp-row").nth(k).locator(".imp-equip").click(); await pg.wait_for_timeout(300)
        pick = sheet.locator(".imp-row").nth(k).locator(".imp-eq")
        check(await pick.count() == 1, "tapping the equipment chip opens the search under the row")
        await pick.locator("input").fill("gela"); await pg.wait_for_timeout(200)
        await pick.locator(".eq-row", has_text="Geladeira").click(); await pg.wait_for_timeout(300)
        d = await sheet.locator(".imp-row").nth(k).evaluate("(e) => [(e.querySelector('.imp-equip .dname') || {}).textContent, (e.querySelector('.imp-room:not(.imp-equip) .dname') || {}).textContent, !!e.querySelector('.imp-eq')]")
        check(d == ["Geladeira", "Cozinha", False], f"picked: the equipment and its room, the search closes ({d})")
        await sheet.screenshot(path=f"{T}/review3.png")
        await sheet.locator(".btn.primary").last.click(); await pg.wait_for_timeout(2000)
        flat = {k: v for m in stored().get("equips", {}).values() for k, v in m.items()}
        check(flat.get("trocar a resistencia do chuveiro") == "ban-001" and flat.get("limpar a geladeira") == "coz-001" and flat.get("comprar pao") == "coz-001", f"saved with the items ({flat})")
        pr = presence()
        check(any(x["id"] == "coz-001" and x["comodo"] == "Cozinha" for x in pr.get("equipamentos", {}).get("lista", [])) and pr["equipamentos"]["tarefas"]["todo.casa"]["limpar a geladeira"] == "coz-001", "share/resolvia/integracao.json has the equipment for the CronologIA")
        fire("resolvia_comodo", {"entity_id": "todo.casa", "tarefa": "Revisar o ar", "equipamento": "sal-001", "origem": "CronologIA"})
        await wait_for(lambda: stored().get("equips", {}).get("todo.casa", {}).get("revisar o ar") == "sal-001", "an equipment set by the CronologIA")
        # Buscar: by the room and by the equipment, each with its own switch
        await a.evaluate("(el) => el._go('/buscar')"); await pg.wait_for_timeout(600)
        box = a.locator("input[data-q='buscar']")
        res = lambda: a.locator(".panel.items .item").all_inner_texts()
        found = lambda txts, w: any(w in t for t in txts)
        fl = [t.strip() for t in await a.locator(".filters .pick").all_inner_texts()]
        check(fl == ["Incluir concluídos", "Incluir cômodos", "Incluir equipamentos"], f"Buscar: the switches ({fl})")
        check(await a.locator(".filters .pick.on", has_text="Incluir cômodos").count() == 1 and await a.locator(".filters .pick.on", has_text="Incluir equipamentos").count() == 1, "both on by default")
        await box.fill("ar-cond"); await pg.wait_for_timeout(300)
        t = await res(); check(found(t, "Limpar o filtro"), f"'ar-cond': the tasks of the Ar-condicionado ({[x[:30] for x in t]})")
        await pg.screenshot(path=f"{T}/search-equip.png")
        await box.fill("parede"); await pg.wait_for_timeout(300)
        t = await res(); check(found(t, "Limpar o filtro"), "by the zone of the equipment (Parede)")
        await box.fill("cozinha"); await pg.wait_for_timeout(300)
        t = await res(); check(found(t, "Limpar a geladeira") and found(t, "Comprar pão"), f"'cozinha': the tasks of the room ({[x[:30] for x in t]})")
        await box.fill("sala"); await pg.wait_for_timeout(300)
        t = await res(); check(found(t, "Limpar o filtro"), "'sala': by the room")
        await a.locator(".filters .pick", has_text="Incluir cômodos").click(); await pg.wait_for_timeout(300)
        t = await res(); check(not found(t, "Limpar o filtro"), "Incluir cômodos off: not by the room")
        await box.fill("ar-cond"); await pg.wait_for_timeout(300)
        await a.locator(".filters .pick", has_text="Incluir equipamentos").click(); await pg.wait_for_timeout(300)
        t = await res(); check(not found(t, "Limpar o filtro"), "Incluir equipamentos off: not by the equipment")
        await a.locator(".filters .pick", has_text="Incluir cômodos").click(); await a.locator(".filters .pick", has_text="Incluir equipamentos").click()
        # off: no room anywhere, and nothing goes to the CronologIA
        await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await pg.get_by_role("tab", name="Integrações", exact=True).click(); await pg.wait_for_timeout(400)
        await a.locator("#comodos input[aria-label='Usar cômodos']").uncheck(); await pg.wait_for_timeout(800)
        await a.locator("#comodos input[aria-label='Usar equipamentos']").uncheck(); await pg.wait_for_timeout(1200)
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        check(await a.locator(".tag.room").count() == 0, "off: no room or equipment tags")
        check("comodos" not in presence() and "equipamentos" not in presence(), "off: nothing for the CronologIA")
        await a.evaluate("(el) => el._go('/buscar')"); await pg.wait_for_timeout(600)
        dis = await a.locator(".filters .pick").evaluate_all("(els) => els.map((e) => [e.textContent.trim(), e.disabled])")
        check(dis == [["Incluir concluídos", False], ["Incluir cômodos", True], ["Incluir equipamentos", True]], f"off: the switches are there, inactive ({dis})")
        await box.fill("cozinha"); await pg.wait_for_timeout(300)
        t = await res(); check(not found(t, "Limpar a geladeira"), "off: not by the room")
        await a.locator(".filters").screenshot(path=f"{T}/search-off.png")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
