# ResolvIA 2.51.0: Buscar abre com todos os pendentes (como o InventarIA) e Selecionar escolhe vários, de listas diferentes
# (pelo botão ou segurando um item); Alterar N itens muda de uma vez o prazo, o cômodo, o equipamento, quem faz e a lista.
# Cada campo começa em Manter; só aparece com a opção dele ligada (Controlar prazos, Usar cômodos, Usar equipamentos,
# Serviços externos); o que uma lista não aceita fica como estava (prazo numa lista sem datas) e o aviso diz.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, json, os, subprocess, time, tempfile
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA; INV = INVENTARIA + "/inventario"
T = tempfile.mkdtemp(prefix="rvb-", dir=SP)
DATA, SHARE, INVDATA = f"{T}/data", f"{T}/share", f"{T}/invdata"
for d in (DATA, SHARE, INVDATA): os.makedirs(d)
json.dump({"format": "inventario-casa", "schema": 1, "rev": 1, "items": [
    {"id": "coz-001", "room": "cozinha", "seq": 1, "zone": "", "name": "Geladeira", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "ban-001", "room": "banheiro", "seq": 1, "zone": "", "name": "Chuveiro", "details": "", "cat": "utilidades", "qty": "1", "value": None, "photos": []}], "rooms": [
    {"id": "cozinha", "code": "COZ", "name": "Cozinha", "order": 1, "cover": 0, "photos": []},
    {"id": "banheiro", "code": "BAN", "name": "Banheiro", "order": 2, "cover": 0, "photos": []}]}, open(f"{INVDATA}/inventario.json", "w"))
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + " ".join(str(label).split()), flush=True)
    if c: n_ok += 1
    else: failed.append(label)
procs = []
procs.append(subprocess.Popen(["python3", f"{INV}/app/server.py"], env=dict(os.environ, INV_DATA=INVDATA, INV_SHARE=f"{SHARE}/inventario", INV_SEED=f"{INV}/seed", INV_WEB=f"{INV}/app/web", INV_PORT="8097", INV_ALLOW="10.9.9.9", INV_URL_INTERNA="http://127.0.0.1:8097"), stdout=open(f"{T}/inv.log", "w"), stderr=subprocess.STDOUT))
procs.append(subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo", FAKE_HA_EXTRA="1"), stdout=open(f"{T}/fake.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1)
procs.append(subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{T}/app.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1.5)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
WS = """(msgs) => new Promise((res) => { const out = []; const ws = new WebSocket(location.origin.replace('http','ws') + '/ws'); let n = 0; ws.onopen = () => msgs.forEach((m, k) => ws.send(JSON.stringify({id: k + 1, ...m}))); ws.onmessage = (e) => { const d = JSON.parse(e.data); if (d.type === 'result') { out[d.id - 1] = d.result; if (++n === msgs.length) { ws.close(); res(out); } } }; })"""
TOMORROW = (date.today() + timedelta(days=1)).isoformat()
OVER = """(el) => { const W = innerWidth, bad = [];
  for (const e of el.renderRoot.querySelectorAll('.page *, .sheet *')) { const r = e.getBoundingClientRect();
    if (r.width && (r.right > W + 1 || r.left < -1) && !e.closest('.hidden-input')) bad.push((e.className && e.className.baseVal === undefined ? e.className : e.tagName) + ' ' + Math.round(r.right)); }
  return bad.slice(0, 4); }"""
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
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True, is_mobile=True)
        pg = await ctx.new_page()
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1500)
        ws = lambda m: pg.evaluate(WS, m)
        await ws([{"type": "resolvia/prefs/set_app", "prefs": {"rooms_on": True, "equips_on": True}}])
        await pg.wait_for_timeout(1500)
        await pg.reload(); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        async def items(eid):
            return {i["summary"]: i for i in (await ws([{"type": "todo/item/list", "entity_id": eid}]))[0]["items"]}
        await a.locator("nav .tab", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        sub = (await a.locator(".res-head .page-sub").inner_text()).strip()
        groups = await a.locator(".page .panel.items .overline").all_text_contents()
        check(sub == "15 pendentes" and len(groups) == 8, f"Buscar opens with everything pending, by list ({sub}, {groups})")
        check(await a.locator(".res-head .text-btn", has_text="Selecionar").count() == 1, "Selecionar at the right of the count")
        await a.locator(".search-box input").fill("pão"); await pg.wait_for_timeout(300)
        check((await a.locator(".res-head .page-sub").inner_text()).strip() == "1 resultado", "a word narrows it")
        await a.locator(".search-box input").fill(""); await pg.wait_for_timeout(300)

        # Selecionar
        await a.locator(".res-head .text-btn", has_text="Selecionar").click(); await pg.wait_for_timeout(300)
        check((await a.locator(".res-head .res-n").inner_text()).strip() == "Selecionar" and await a.locator(".sel-bar .btn.primary").is_disabled(), "selecting: none yet, Alterar off")
        check(await a.locator(".filters .pick", has_text="Concluídos").count() == 0, "selecting: only what is pending (no Concluídos)")
        await a.locator(".res-head .text-btn", has_text="Todos").click(); await pg.wait_for_timeout(200)
        check((await a.locator(".res-head .res-n").inner_text()).strip() == "15 selecionados" and (await a.locator(".res-head .text-btn").inner_text()).strip() == "Nenhum", "Todos picks every one shown")
        await a.locator(".res-head .text-btn", has_text="Nenhum").click(); await pg.wait_for_timeout(200)
        for name in ("Passar pano na casa", "Trocar filtro do ar", "Renovar passaporte", "Pão"):
            await a.locator(".item.selecting", has_text=name).click(); await pg.wait_for_timeout(120)
        check((await a.locator(".res-head .res-n").inner_text()).strip() == "4 selecionados", "four, from three lists")
        check((await a.locator(".sel-bar .btn.primary").inner_text()).strip() == "Alterar 4 itens", "Alterar 4 itens")
        check(await a.evaluate(OVER) == [], f"selecting: nothing out of the screen {await a.evaluate(OVER)}")
        await pg.screenshot(path=f"{SP}/shots/rvb-selecionando.png")

        # Alterar: every field on Manter; Aplicar off until something changes
        await a.locator(".sel-bar .btn.primary").click(); await pg.wait_for_timeout(400)
        check((await sheet.locator("h3").inner_text()).strip() == "Alterar 4 itens", "the sheet: Alterar 4 itens")
        fields = await sheet.locator(".field").evaluate_all("(els) => els.map((e) => e.dataset.f)")
        check(fields == ["prazo", "comodo", "equipamento", "quem-faz", "lista"], f"Prazo, Cômodo, Equipamento, Quem faz and Lista ({fields})")
        keeps = await sheet.locator(".pick.keep").evaluate_all("(els) => els.map((e) => e.classList.contains('on'))")
        check(keeps == [True] * 5, f"each on Manter ({keeps})")
        check(await sheet.locator(".btn.primary", has_text="Aplicar").is_disabled(), "Aplicar off with nothing chosen")
        await sheet.locator("[data-f=prazo] .pick", has_text="Amanhã").click(); await pg.wait_for_timeout(150)
        check(await sheet.locator("[data-f=horario]").count() == 1, "a date: Horário too")
        await sheet.locator("[data-f=horario] .pick", has_text="08:00").click()
        await sheet.locator("[data-f=comodo] .pick", has_text="Cozinha").click()
        await sheet.locator("[data-f=quem-faz] .pick", has_text="Serviço externo").click(); await pg.wait_for_timeout(150)
        await sheet.locator("[data-f=quem-faz] input").fill("Eletricista")
        check(await a.evaluate(OVER) == [], f"the sheet: nothing out of the screen {await a.evaluate(OVER)}")
        await pg.screenshot(path=f"{SP}/shots/rvb-alterar.png")
        await sheet.locator(".btn.primary", has_text="Aplicar").click()
        await wait_for(lambda: stored()["ext"].get("todo.shopping_list", {}).get("pao") == "Eletricista", "applied: Quem faz on all four")
        await pg.wait_for_timeout(600)
        casa, google, shop = await items("todo.casa"), await items("todo.google_tasks"), await items("todo.shopping_list")
        local = lambda d: datetime.fromisoformat(d.replace("Z", "+00:00")).astimezone(ZoneInfo("America/Sao_Paulo")).strftime("%Y-%m-%d %H:%M") if d else None
        check(local(casa["Passar pano na casa"].get("due")) == f"{TOMORROW} 08:00" and local(casa["Trocar filtro do ar"].get("due")) == f"{TOMORROW} 08:00",
              f"Casa: tomorrow at 08:00 ({casa['Passar pano na casa'].get('due')}, {casa['Trocar filtro do ar'].get('due')})")
        check(google["Renovar passaporte"].get("due") == TOMORROW, f"Google Tasks (date only): tomorrow ({google['Renovar passaporte'].get('due')})")
        check(not shop["Pão"].get("due"), "the shopping list takes no date: as it was")
        r = stored()["rooms"]
        check(r["todo.casa"].get("passar pano na casa") == "cozinha" and r["todo.google_tasks"].get("renovar passaporte") == "cozinha" and r["todo.shopping_list"].get("pao") == "cozinha", f"Cozinha on all four ({r})")
        toast = (await a.locator(".toast").inner_text()).strip()
        check(toast.startswith("3 de 4 itens alterados"), f"the toast says one could not take everything ({toast})")
        check(await a.locator(".item.selecting").count() == 0 and await a.locator(".res-head .text-btn", has_text="Selecionar").count() == 1, "the selection ends")
        tags = await a.locator(".item", has_text="Passar pano na casa").locator(".tag").all_inner_texts()
        check(any("Cozinha" in t for t in tags) and any("Eletricista" in t for t in tags), f"the tags show it ({tags})")

        # holding an item starts selecting with it; Lista moves them (with what they have)
        await a.locator(".item", has_text="Pagar conta de luz").locator(".it-body").dispatch_event("contextmenu"); await pg.wait_for_timeout(300)
        check((await a.locator(".res-head .res-n").inner_text()).strip() == "1 selecionado" and await a.locator(".item.selecting.picked", has_text="Pagar conta de luz").count() == 1, "holding an item: selecting, with it")
        await a.locator(".item.selecting", has_text="Café").click(); await pg.wait_for_timeout(150)
        await a.locator(".sel-bar .btn.primary").click(); await pg.wait_for_timeout(400)
        await sheet.locator("[data-f=lista] .pick", has_text="Google Tasks").click(); await pg.wait_for_timeout(150)
        await sheet.locator("[data-f=comodo] .pick", has_text="Banheiro").click()
        await sheet.locator(".btn.primary", has_text="Aplicar").click()
        await pg.wait_for_timeout(2500)
        casa, google = await items("todo.casa"), await items("todo.google_tasks")
        alexa = await items("todo.notas_e_rotinas_do_alexa_shopping_list")
        check("Pagar conta de luz" not in casa and "Café" not in alexa and "Pagar conta de luz" in google and "Café" in google, "Lista: moved to Google Tasks")
        check(google["Pagar conta de luz"].get("due"), f"its deadline went along ({google['Pagar conta de luz'].get('due')})")
        r = stored()["rooms"]
        check(r.get("todo.google_tasks", {}).get("pagar conta de luz") == "banheiro" and "pagar conta de luz" not in r.get("todo.casa", {}), f"the room set and moved along ({r})")
        check((await a.locator(".toast").inner_text()).strip() == "2 itens alterados", f"2 itens alterados ({await a.locator('.toast').inner_text()})")

        # equipment: the room comes from it (locked)
        await a.locator(".res-head .text-btn", has_text="Selecionar").click(); await pg.wait_for_timeout(200)
        await a.locator(".item.selecting", has_text="Manteiga").click(); await pg.wait_for_timeout(120)
        await a.locator(".sel-bar .btn.primary").click(); await pg.wait_for_timeout(400)
        eq = sheet.locator("[data-f=equipamento]")
        await eq.locator("input").first.fill("chuv"); await pg.wait_for_timeout(250)
        await eq.locator("button", has_text="Chuveiro").first.click(); await pg.wait_for_timeout(250)
        check(await sheet.locator("[data-f=comodo] .pick.on", has_text="Banheiro").count() == 1 and await sheet.locator("[data-f=comodo] .field-hint").count() == 1, "an equipment: its room, locked")
        await sheet.locator(".btn.primary", has_text="Aplicar").click()
        await wait_for(lambda: stored()["equips"].get("todo.shopping_list", {}).get("manteiga") == "ban-001", "Equipamento: Chuveiro")
        await wait_for(lambda: stored()["rooms"].get("todo.shopping_list", {}).get("manteiga") == "banheiro", "and its room: Banheiro")

        # settings: only the fields whose option is on
        await ws([{"type": "resolvia/prefs/set_app", "prefs": {"due_off": True, "rooms_on": False, "ext_off": True}}])
        await pg.wait_for_timeout(1500)
        await pg.reload(); await pg.wait_for_timeout(1800)
        await a.locator("nav .tab", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        await a.locator(".res-head .text-btn", has_text="Selecionar").click(); await pg.wait_for_timeout(200)
        await a.locator(".item.selecting", has_text="Queijo").click(); await pg.wait_for_timeout(120)
        await a.locator(".sel-bar .btn.primary").click(); await pg.wait_for_timeout(400)
        fields = await sheet.locator(".field").evaluate_all("(els) => els.map((e) => e.dataset.f)")
        check(fields == ["equipamento", "lista"], f"Controlar prazos, cômodos and Serviços externos off: only Equipamento and Lista ({fields})")
        await sheet.locator(".icon-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        check(await a.locator(".item.selecting.picked", has_text="Queijo").count() == 1, "closing the sheet keeps the selection")
        await a.locator(".res-head .icon-btn[aria-label='Cancelar seleção']").click(); await pg.wait_for_timeout(200)
        check(await a.locator(".item.selecting").count() == 0, "X ends selecting")
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try:
    asyncio.run(main())
finally:
    for pr in procs: pr.terminate()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
