# ResolvIA 2.39.0: Mais › Gráficos, where the pending items are: by list (a split bar and a bar per list, the 6 with
# the most and "+2 listas"), by room and by equipment (only with Usar cômodos and Usar equipamentos on; a task with two
# equipments counts for both, and for both rooms), by deadline (only with Controlar prazos on) and Quem faz (Nós mesmos ×
# Serviço externo). A tap on a list opens it; on a room, an equipment or Serviço externo, Buscar with it; on a deadline,
# Prazos. Hidden lists and completed items out. Light and dark, 320 px to the computer, nothing past the edge.
# A real InventarIA runs beside (rooms and items).
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, json, os, subprocess, time, tempfile
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA; INV = INVENTARIA + "/inventario"
TZ = "America/Sao_Paulo"
T = tempfile.mkdtemp(prefix="rvg-", dir=SP)
DATA, SHARE, INVDATA = f"{T}/data", f"{T}/share", f"{T}/invdata"
for d in (DATA, SHARE, INVDATA): os.makedirs(d)
json.dump({"format": "inventario-casa", "schema": 1, "rev": 1, "items": [
    {"id": "sal-001", "room": "sala", "seq": 1, "zone": "Parede", "name": "Ar-condicionado", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "coz-001", "room": "cozinha", "seq": 1, "zone": "", "name": "Geladeira", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "coz-002", "room": "cozinha", "seq": 2, "zone": "", "name": "Fogão", "details": "", "cat": "eletronicos", "qty": "1", "value": None, "photos": []},
    {"id": "ban-001", "room": "banheiro", "seq": 1, "zone": "", "name": "Chuveiro", "details": "", "cat": "utilidades", "qty": "1", "value": None, "photos": []}], "rooms": [
    {"id": "cozinha", "code": "COZ", "name": "Cozinha", "order": 1, "cover": 0, "photos": []},
    {"id": "sala", "code": "SAL", "name": "Sala", "order": 2, "cover": 0, "photos": []},
    {"id": "banheiro", "code": "BAN", "name": "Banheiro", "order": 3, "cover": 0, "photos": []}]}, open(f"{INVDATA}/inventario.json", "w"))
# cômodos and equipamentos on (the tasks get their rooms, equipments and who does them below, as the item sheet saves them)
CASA = "todo.casa"
json.dump({"version": 1, "prefs": {"lists": {}, "app": {"rooms_on": True, "equips_on": True}}}, open(f"{DATA}/resolvia.json", "w"))
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
procs = []
procs.append(subprocess.Popen(["python3", f"{INV}/app/server.py"], env=dict(os.environ, INV_DATA=INVDATA, INV_SHARE=f"{SHARE}/inventario", INV_SEED=f"{INV}/seed", INV_WEB=f"{INV}/app/web", INV_PORT="8097", INV_ALLOW="10.9.9.9", INV_URL_INTERNA="http://127.0.0.1:8097"), stdout=open(f"{T}/inv.log", "w"), stderr=subprocess.STDOUT))
procs.append(subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", FAKE_HA_EXTRA="1", TZ=TZ), stdout=open(f"{T}/fake.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1)
procs.append(subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ=TZ, RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{T}/app.log", "w"), stderr=subprocess.STDOUT))
time.sleep(1.5)
URL = "http://127.0.0.1:8099/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws'); ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m })); ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""
day = lambda n: (datetime.now(ZoneInfo(TZ)) + timedelta(days=n)).strftime("%Y-%m-%d")
# what goes past the right edge of the screen
OVER = """(el) => {
  const W = window.innerWidth, bad = [];
  for (const e of el.renderRoot.querySelectorAll("main *")) {
    const r = e.getBoundingClientRect();
    if (r.width && r.right > W + 1) bad.push(e.tagName.toLowerCase() + "." + [...e.classList].join(".") + " " + Math.round(r.right));
  }
  if (document.documentElement.scrollWidth > W) bad.push("page " + document.documentElement.scrollWidth);
  return bad.slice(0, 4);
}"""
async def shot(pg, a, name):
    """The whole screen: the app scrolls inside <main>, so a viewport as tall as what it has."""
    vp = pg.viewport_size
    h = await a.evaluate("(el) => { const m = el.renderRoot.querySelector('main'); return m.scrollHeight + (window.innerHeight - m.clientHeight); }")
    await pg.set_viewport_size({"width": vp["width"], "height": max(vp["height"], h)}); await pg.wait_for_timeout(250)
    await pg.screenshot(path=f"{SP}/shots/{name}.png")
    await pg.set_viewport_size(vp); await pg.wait_for_timeout(150)
# the rows of a chart: [name, number, share, the word beside the name]
ROWS = """(el, id) => [...el.renderRoot.querySelectorAll(`#${id} .g-row`)].map((r) => [r.querySelector('.g-name b').textContent.trim(), +r.querySelector('.g-n').textContent,
  (r.querySelector('.g-pct') || {}).textContent || '', (r.querySelector('.g-name small') || {}).textContent || ''])"""
# the geometry of the rows of a chart: the left of the names, the left and right of the bars, the right of the numbers
GEO = """(el, id) => [...el.renderRoot.querySelectorAll(`#${id} .g-row`)].map((r) => { const b = r.querySelector('.g-bar').getBoundingClientRect(), n = r.querySelector('.g-name').getBoundingClientRect(), v = r.querySelector('.g-n').getBoundingClientRect();
  return [Math.round(n.left), Math.round(b.left), Math.round(b.right), Math.round(v.right), Math.round(r.querySelector('.g-bar i').getBoundingClientRect().width)]; })"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True, timezone_id=TZ)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        await pg.goto(LISTAS); await pg.wait_for_timeout(1500)
        ws = lambda m: pg.evaluate(WS, m)
        add = lambda summary, due=None: ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": summary, **({"due_date": due} if due else {})}, "target": {"entity_id": CASA}})
        for s in ("Limpar a geladeira", "Limpar o filtro do ar", "Trocar a resistência do chuveiro", "Consertar a pia", "Trocar a lâmpada da sala"):
            await add(s)
        await add("Consertar o portão", day(10))
        await add("Levar o carro na revisão", day(3))
        # rooms; equipments (the server puts their rooms: two equipments, two rooms); who does it
        for s, rooms in (("Consertar a pia", ["cozinha"]), ("Trocar a lâmpada da sala", ["sala"])):
            await ws({"type": "resolvia/rooms/set", "entity_id": CASA, "summary": s, "rooms": rooms})
        for s, eq in (("Limpar a geladeira", ["coz-001"]), ("Limpar o filtro do ar", ["sal-001", "coz-001"]), ("Trocar a resistência do chuveiro", ["ban-001"])):
            r = await ws({"type": "resolvia/equips/set", "entity_id": CASA, "summary": s, "equips": eq})
        check(r.get("map", {}).get(CASA, {}).get("limpar o filtro do ar") == ["sala", "cozinha"], f"two equipments: their two rooms ({r.get('map')})")
        for s, who in (("Trocar a resistência do chuveiro", "Eletricista"), ("Consertar a pia", "Encanador"), ("Consertar o portão", True)):
            await ws({"type": "resolvia/external/set", "entity_id": CASA, "summary": s, "value": who})
        a = pg.locator("resolvia-panel")
        await a.evaluate("(el) => Promise.all([el._loadRooms(), el._loadExternal()])")
        await pg.wait_for_timeout(1200)
        view = lambda: a.evaluate("(el) => el._view().name")
        path = lambda: pg.evaluate("() => (history.state && history.state.rvPath) || ''")
        rows = lambda id: a.evaluate(ROWS, id)
        heads = lambda: a.locator(".g-panel .mais-head h2").all_inner_texts()
        async def menu():
            await a.evaluate("(el) => el._go('/mais')"); await pg.wait_for_timeout(450)
        async def charts():
            await menu()
            await a.locator(".more-row", has_text="Gráficos").click(); await pg.wait_for_timeout(600)

        # ---- the menu: Listas, Gráficos and, last, Configurações
        await menu()
        titles = [t.strip() for t in await a.locator(".more-row b").all_inner_texts()]
        check(titles == ["Listas", "Gráficos", "Relatório de pendências", "Configurações", "Sobre"], f"the menu: Listas, Gráficos, Relatório de pendências, Configurações and, last, Sobre ({titles})")
        line = (await a.locator(".more-row", has_text="Gráficos").locator(".mb > span").inner_text()).strip()
        check(line == "Pendências por lista, cômodo, equipamento e prazo.", f"Gráficos: one line, with what is on ({line})")
        check(await a.locator(".more-row", has_text="Gráficos").locator(".mais-ic svg path").count() == 4, "Gráficos: the icon of bars")

        # ---- the screen
        await charts()
        check(await view() == "graficos" and await path() == "/graficos", f"Gráficos: its own screen ({await path()})")
        check((await a.locator(".page-title").inner_text()).strip() == "Gráficos" and (await a.locator(".brand-head .uplink").inner_text()).strip() == "Mais" and (await a.locator("nav .tab.on").inner_text()).strip() == "Mais", "title Gráficos, ‹ Mais at the top, Mais lit in the bar")
        st = (await a.locator(".brand-head .status").inner_text()).strip()
        check(st == "22 pendentes em 8 listas", f"under the title: how many and in how many lists ({st})")
        h = [x.strip() for x in await heads()]
        check(h == ["Por lista", "Por cômodo", "Por equipamento", "Por prazo", "Quem faz"], f"the charts ({h})")
        await pg.screenshot(path=f"{SP}/shots/rvg-top-dark.png")

        # ---- Por lista: the 6 with the most, "+2 listas", a split bar in the colors of the lists
        lr = await rows("g-listas")
        check(len(lr) == 6 and lr[0][:2] == ["Casa", 10] and lr[1][:2] == ["Lista de compras", 3] and [r[1] for r in lr] == sorted([r[1] for r in lr], reverse=True), f"Por lista: the most first, 6 of them ({lr})")
        more = a.locator("#g-listas .g-more")
        check((await more.locator(".g-more-t").inner_text()).strip() == "+2 listas" and (await more.locator(".g-n").inner_text()).strip() == "2", f"+2 listas, with their pending ({await more.inner_text()!r})")
        check(await a.locator("#g-listas .g-split i").count() == 7, "the split bar: the 6 lists and the rest")
        colors = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('#g-listas .g-row')].slice(0, 2).map((r) => [getComputedStyle(r.querySelector('.g-bar i')).backgroundColor, getComputedStyle(r.querySelector('.g-tile')).color])")
        seg = await a.evaluate("(el) => getComputedStyle(el.renderRoot.querySelector('#g-listas .g-split i')).backgroundColor")
        check(colors[0][0] != colors[1][0] and seg == colors[0][0], f"each list in its color, the same in the split bar ({colors}, {seg})")
        geo = await a.evaluate(GEO, "g-listas")
        check(len({g[0] for g in geo}) == 1 and len({g[1] for g in geo}) == 1 and len({g[2] for g in geo}) == 1 and len({g[3] for g in geo}) == 1, f"the names, the bars and the numbers lined up ({geo})")
        check(geo[0][4] > geo[1][4] > 0 and abs(geo[0][4] - (geo[0][2] - geo[0][1])) <= 1, f"the biggest fills its bar, the others in proportion ({[g[4] for g in geo]})")
        await more.click(); await pg.wait_for_timeout(300)
        check(len(await rows("g-listas")) == 8 and (await more.inner_text()).strip() == "Ver menos" and await more.get_attribute("aria-expanded") == "true", "+2 listas opens all 8; Ver menos")
        check(await a.locator("#g-listas .g-split i").count() == 8, "open: each list in the split bar")
        await more.click(); await pg.wait_for_timeout(300)
        check(len(await rows("g-listas")) == 6, "Ver menos: the 6 again")

        # ---- Por cômodo: from the rooms and the equipments (two equipments, two rooms); Sem cômodo below
        rr = await rows("g-rooms")
        check([r[:2] for r in rr] == [["Cozinha", 3], ["Sala", 2], ["Banheiro", 1]], f"Por cômodo: Cozinha 3 (pia, geladeira, filtro), Sala 2, Banheiro 1 ({rr})")
        foot = (await a.locator("#g-rooms .g-foot").inner_text()).strip()
        check(foot == "Sem cômodo: 17", f"Sem cômodo: the others ({foot})")
        # ---- Por equipamento: Fogão has nothing, so it is not there; the room beside the name
        er = await rows("g-equips")
        check([r[:2] for r in er] == [["Geladeira", 2], ["Ar-condicionado", 1], ["Chuveiro", 1]] and [r[3] for r in er] == ["Cozinha", "Sala", "Banheiro"], f"Por equipamento: Geladeira 2, the tie in the order of the InventarIA, the room beside ({er})")
        check((await a.locator("#g-equips .g-foot").inner_text()).strip() == "Sem equipamento: 19", "Sem equipamento: the others")
        # ---- Por prazo: the lists with deadlines (Casa and Google Tasks)
        dr = await rows("g-prazos")
        check([r[:3] for r in dr] == [["Atrasados", 1, "9%"], ["Hoje", 1, "9%"], ["Próximos 7 dias", 2, "18%"], ["Mais adiante", 1, "9%"], ["Sem prazo", 6, "55%"]], f"Por prazo: late, today, 7 days, later, none, with the share ({dr})")
        late = await a.evaluate("(el) => [getComputedStyle(el.renderRoot.querySelector('#g-prazos .g-row.k-late .g-bar i')).backgroundColor, getComputedStyle(el.renderRoot.querySelector('#g-prazos .g-row.k-today .g-bar i')).backgroundColor]")
        check(late[0] != late[1], f"late and today in their colors ({late})")
        check(await a.locator("#g-prazos div.g-row").count() == 1 and await a.locator("#g-prazos button.g-row").count() == 4, "Sem prazo is not a button (nothing to open)")
        # ---- Quem faz
        wr = await rows("g-quem")
        check([r[:3] for r in wr] == [["Nós mesmos", 19, "86%"], ["Serviço externo", 3, "14%"]] and wr[1][3] == "Eletricista +1", f"Quem faz: Nós mesmos 19, Serviço externo 3 with who ({wr})")
        ext = await a.evaluate("(el) => getComputedStyle(el.renderRoot.querySelector('#g-quem .k-ext .g-bar i')).backgroundColor")
        tag = await a.evaluate("(el) => { const d = document.createElement('span'); d.className = 'tag ext'; el.renderRoot.querySelector('main').appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; }")
        check(ext == tag, f"Serviço externo in its color (the one of its tag) ({ext} {tag})")
        await a.locator("#g-rooms").screenshot(path=f"{SP}/shots/rvg-rooms-dark.png")
        await shot(pg, a, "rvg-390-dark")

        # ---- the AI knows the screen
        tela = await a.evaluate("(el) => el._chatScreen()")
        check(tela == "Mais › Gráficos (gráficos das pendências por lista, cômodo, equipamento e prazo)", f"the Conversa is told the screen ({tela})")

        # ---- a tap: a list opens it; a room, an equipment and Serviço externo open Buscar; a deadline, Prazos
        await a.locator("#g-listas .g-row", has_text="Casa").click(); await pg.wait_for_timeout(500)
        check(await view() == "list" and await a.evaluate("(el) => el._view().id") == CASA, "Casa: the list opens")
        await pg.go_back(); await pg.wait_for_timeout(450)
        check(await view() == "graficos", "Back: Gráficos again")
        await a.locator("#g-rooms .g-row", has_text="Cozinha").click(); await pg.wait_for_timeout(600)
        found = [t.split("\n")[0].strip() for t in await a.locator(".panel.items .item .it-text").all_inner_texts()]
        check(await view() == "search" and await a.locator("input[data-q='buscar']").input_value() == "Cozinha" and {"Consertar a pia", "Limpar a geladeira", "Limpar o filtro do ar"} <= set(found), f"Cozinha: Buscar with it, the tasks of the kitchen ({found})")
        await pg.go_back(); await pg.wait_for_timeout(450)
        await a.locator("#g-equips .g-row", has_text="Geladeira").click(); await pg.wait_for_timeout(600)
        found = [t.split("\n")[0].strip() for t in await a.locator(".panel.items .item .it-text").all_inner_texts()]
        check(await a.locator("input[data-q='buscar']").input_value() == "Geladeira" and {"Limpar a geladeira", "Limpar o filtro do ar"} <= set(found), f"Geladeira: Buscar with it ({found})")
        await pg.go_back(); await pg.wait_for_timeout(450)
        await a.locator("#g-quem .g-row", has_text="Serviço externo").click(); await pg.wait_for_timeout(600)
        found = sorted(t.split("\n")[0].strip() for t in await a.locator(".panel.items .item .it-text").all_inner_texts())
        check(found == ["Consertar a pia", "Consertar o portão", "Trocar a resistência do chuveiro"], f"Serviço externo: Buscar finds the 3 ({found})")
        await pg.go_back(); await pg.wait_for_timeout(450)
        await a.locator("#g-prazos .g-row", has_text="Atrasados").click(); await pg.wait_for_timeout(500)
        check(await view() == "home", "Atrasados: Sugestões, the start (2.48.0)")
        await pg.go_back(); await pg.wait_for_timeout(450)
        check(await view() == "graficos", "and Back: Gráficos")

        # ---- completed out: the sink is fixed
        pia = next(i for i in (await ws({"type": "todo/item/list", "entity_id": CASA}))["items"] if i["summary"] == "Consertar a pia")
        await ws({"type": "call_service", "domain": "todo", "service": "update_item", "service_data": {"item": pia["uid"], "status": "completed"}, "target": {"entity_id": CASA}})
        await pg.wait_for_timeout(900)
        rr = await rows("g-rooms")
        wr = await rows("g-quem")
        check(rr[0][:2] == ["Cozinha", 2] and wr[1][:2] == ["Serviço externo", 2] and (await a.locator(".brand-head .status").inner_text()).strip() == "21 pendentes em 8 listas", f"a task completed: out of the charts ({rr[0]}, {wr[1]})")
        # ---- a hidden list: out (7 lists, no "+")
        await a.evaluate("(el) => el._saveListPrefs('todo.avisos', { hidden: true })"); await pg.wait_for_timeout(800)
        lr = await rows("g-listas")
        check(len(lr) == 7 and "Avisos do condomínio" not in [r[0] for r in lr] and await a.locator("#g-listas .g-more").count() == 0, f"a hidden list is not counted; 7 lists, all shown ({[r[0] for r in lr]})")
        check((await a.locator(".brand-head .status").inner_text()).strip() == "20 pendentes em 7 listas", "and not in the total")
        await pg.screenshot(path=f"{SP}/shots/rvg-hidden-dark.png")

        # ---- the options off: no chart of what is off (Usar cômodos, Usar equipamentos, Controlar prazos)
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(700)
        await a.locator("#comodos input[aria-label='Usar cômodos']").uncheck(); await pg.wait_for_timeout(1500)
        await charts()
        h = [x.strip() for x in await heads()]
        check(h == ["Por lista", "Por equipamento", "Por prazo", "Quem faz"], f"Usar cômodos off: no Por cômodo ({h})")
        er = await rows("g-equips")
        check([r[3] for r in er] == ["", "", ""], f"... and no room beside the equipments ({er})")
        await menu()
        line = (await a.locator(".more-row", has_text="Gráficos").locator(".mb > span").inner_text()).strip()
        check(line == "Pendências por lista, equipamento e prazo.", f"the line of the menu too ({line})")
        await a.evaluate("(el) => el._go('/config')"); await pg.wait_for_timeout(700)
        await a.locator("#comodos input[aria-label='Usar equipamentos']").uncheck(); await pg.wait_for_timeout(1500)
        await a.evaluate("(el) => el._go('/config/opcoes')"); await pg.wait_for_timeout(600)
        await a.locator("input[aria-label='Controlar prazos']").uncheck(); await pg.wait_for_timeout(800)
        await charts()
        h = [x.strip() for x in await heads()]
        check(h == ["Por lista", "Quem faz"], f"Usar equipamentos and Controlar prazos off: Por lista and Quem faz ({h})")
        await menu()
        line = (await a.locator(".more-row", has_text="Gráficos").locator(".mb > span").inner_text()).strip()
        check(line == "Pendências por lista.", f"the menu: only by list ({line})")
        await charts()
        await shot(pg, a, "rvg-off-dark")
        # all on again for the sizes below
        await a.evaluate("(el) => el._saveAppPrefs({ due_off: null, rooms_on: true, equips_on: true })"); await pg.wait_for_timeout(400)
        await a.evaluate("(el) => el._refreshRooms()"); await pg.wait_for_timeout(1200)
        await a.evaluate("(el) => el._saveListPrefs('todo.avisos', { hidden: null })"); await pg.wait_for_timeout(600)

        # ---- light and dark, from 320 px to the computer: nothing wider than the screen
        await ctx.close()
        for scheme in ("light", "dark"):
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme=scheme, has_touch=True, timezone_id=TZ)
            pg = await ctx.new_page()
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(LISTAS); await pg.wait_for_timeout(1800)
            a = pg.locator("resolvia-panel")
            await a.evaluate("(el) => el._go('/graficos')"); await pg.wait_for_timeout(700)
            check(len(await a.locator(".g-panel").all()) == 5, f"{scheme}: the five charts")
            for w in (320, 390, 1200):
                await pg.set_viewport_size({"width": w, "height": 844 if w < 1000 else 900}); await pg.wait_for_timeout(400)
                over = await a.evaluate(OVER)
                check(not over, f"{scheme} {w} px: nothing past the edge {over}")
                geo = await a.evaluate(GEO, "g-equips")
                check(len({g[1] for g in geo}) == 1 and len({g[2] for g in geo}) == 1 and len({g[3] for g in geo}) == 1, f"{scheme} {w} px: the bars and the numbers lined up ({geo})")
                # the word beside a name (the room of an equipment, who does it): whole, or not shown
                cut = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.g-name small')].filter((s) => { const n = s.parentElement.getBoundingClientRect(), r = s.getBoundingClientRect(); return r.top < n.bottom - 1 && (r.right > n.right + 1 || s.scrollWidth > s.clientWidth + 1); }).map((s) => s.textContent)")
                check(not cut, f"{scheme} {w} px: the word beside a name never cut {cut}")
                if w >= 1000:
                    boxes = {i: await a.locator(f"#{i}").bounding_box() for i in ("g-listas", "g-rooms", "g-equips", "g-prazos", "g-quem")}
                    xs = sorted({round(bx["x"]) for bx in boxes.values()})
                    check(len(xs) == 2 and len({round(bx["width"]) for bx in boxes.values()}) == 1 and boxes["g-listas"]["y"] == min(bx["y"] for bx in boxes.values()), f"{scheme} computer: two columns of the same width, Por lista first ({boxes})")
                    cur = await a.locator(".side-link[aria-current='page']").inner_text()
                    check(cur.strip() == "Mais", f"{scheme} computer: Mais lit in the sidebar")
                await shot(pg, a, f"rvg-{w}-{scheme}")
            await ctx.close()
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in procs: pr.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
