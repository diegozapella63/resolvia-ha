# ResolvIA 2.37.0: Mais is a menu, like the InventarIA: Listas, Gráficos (2.39) and, last, Configurações (with the tabs
# Integrações, Dados, Aparência, Opções; since 2.38 Repetição is in Opções, with Prazos and Exibição). Each row opens its screen with "‹ Mais"; ‹ Mais, the phone's Back, Mais in
# the bar and the swipe to the right go back to the menu; the bar keeps Mais lit; the addresses of the old tabs
# (/mais/dados...) land on the new place; Mais has the three dots; nothing wider than the screen, 320 px to the
# computer, light and dark.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
LISTAS = URL + "?aba=listas"  # 2.48.0: the app opens on Sugestões; these checks start on Listas
DATA, SHARE = f"{SP}/rvmn-data", f"{SP}/rvmn-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvmn_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

# what goes past the right edge of the screen (a row of tabs that scrolls sideways is fine)
OVER = """(el) => {
  const W = window.innerWidth, bad = [];
  for (const e of el.renderRoot.querySelectorAll("main *")) {
    if (e.closest(".more-tabs")) continue;
    const r = e.getBoundingClientRect();
    if (r.width && r.right > W + 1) bad.push(e.tagName.toLowerCase() + "." + [...e.classList].join(".") + " " + Math.round(r.right));
  }
  if (document.documentElement.scrollWidth > W) bad.push("page " + document.documentElement.scrollWidth);
  return bad.slice(0, 4);
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True)
        pg = await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        a = pg.locator("resolvia-panel")
        view = lambda: a.evaluate("(el) => el._view().name")
        path = lambda: pg.evaluate("() => (history.state && history.state.rvPath) || ''")
        depth = lambda: pg.evaluate("() => (history.state && history.state.rvDepth) || 0")
        lit = lambda: a.locator("nav .tab.on").inner_text()
        title = lambda: a.locator(".page-title").first.inner_text()
        rows = a.locator(".more-row")
        async def tab(name):
            await a.locator("nav .tab", has_text=name).click(); await pg.wait_for_timeout(450)
        async def go(p):
            await a.evaluate("(el, p) => el._go(p)", p); await pg.wait_for_timeout(500)

        # ---- the bar: Mais with the three dots
        check(await a.locator("nav .tab", has_text="Mais").locator("svg circle").count() == 3, "Mais in the bar: the three dots")

        # ---- the menu
        await tab("Mais")
        check(await view() == "more" and await path() == "/mais", f"Mais opens the menu ({await path()})")
        check((await title()).strip() == "Mais" and (await lit()).strip() == "Mais", "title Mais, Mais lit in the bar")
        titles = [t.strip() for t in await rows.locator("b").all_inner_texts()]
        check(titles == ["Listas", "Gráficos", "Relatório de pendências", "Configurações", "Sobre"], f"the rows: Listas, Gráficos, Relatório de pendências (2.45), Configurações and, last, Sobre ({titles})")
        lines = [t.strip() for t in await rows.locator(".mb > span").all_inner_texts()]
        check(lines == ["Nome, cor, ícone e quais aparecem.", "Pendências por lista e prazo.", "Para imprimir ou salvar em PDF.", "Integrações, dados e backup, aparência e opções.", "CorrerIA Code, os apps e o GitHub."], f"one short line each ({lines})")
        check(await rows.locator(".mais-ic svg").count() == 5 and await rows.locator("svg.chev").count() == 5, "each row: the icon in the soft square and the arrow")
        check(await a.locator(".more-tabs").count() == 0 and await a.locator(".uplink").count() == 0 and await a.locator(".mais-head").count() == 0, "the menu: no tabs, no settings, no ‹ Mais")
        xs = {round((await rows.nth(i).locator(".mb").bounding_box())["x"]) for i in range(5)}
        ws = {round((await rows.nth(i).bounding_box())["width"]) for i in range(5)}
        check(len(xs) == 1 and len(ws) == 1, f"the rows lined up, the same width ({xs}, {ws})")
        check("v2." in await a.locator(".foot").inner_text(), "the version at the bottom")
        await pg.screenshot(path=f"{SP}/shots/rvmn-menu-dark.png")

        # ---- each row opens its screen: ‹ Mais and Back return to the menu
        for i, (name, ttl, want) in [(0, ("listas", "Listas", "/listas")), (1, ("graficos", "Gráficos", "/graficos")), (3, ("config", "Configurações", "/config"))]:
            await rows.nth(i).click(); await pg.wait_for_timeout(500)
            check(await view() == name and await path() == want and (await title()).strip() == ttl, f"{ttl}: its own screen and title ({await path()})")
            up = a.locator(".brand-head .uplink")
            check(await up.count() == 1 and (await up.inner_text()).strip() == "Mais" and (await lit()).strip() == "Mais", f"{ttl}: ‹ Mais at the top, Mais still lit in the bar")
            await up.click(); await pg.wait_for_timeout(450)
            check(await view() == "more" and await depth() == 1, f"{ttl}: ‹ Mais goes back to the menu (one step back, nothing new in the history)")
            await rows.nth(i).click(); await pg.wait_for_timeout(450)
            await pg.go_back(); await pg.wait_for_timeout(450)
            check(await view() == "more", f"{ttl}: the phone's Back, the menu too")
        await pg.go_back(); await pg.wait_for_timeout(450)
        check(await view() == "home", "Back from the menu: the lists")

        # ---- Listas: what was in its tab
        await tab("Mais"); await rows.nth(0).click(); await pg.wait_for_timeout(450)
        txt = await a.locator("main .page").inner_text()
        check("Toque numa lista para personalizar." in txt and await a.locator(".lists-panel .row input[role=switch]").count() == 4, "Listas: every list with its switch")
        check("4 listas" in await a.locator(".brand-head .status").inner_text(), "Listas: '4 listas' under the title")
        await pg.screenshot(path=f"{SP}/shots/rvmn-listas-dark.png")
        await a.locator(".uplink").click(); await pg.wait_for_timeout(400)

        # ---- Configurações › Opções: Prazos, Exibição, Quem faz (2.44.0) and Repetição together
        await rows.nth(3).click(); await pg.wait_for_timeout(450)
        await a.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(400)
        heads = [h.strip() for h in await a.locator("[role=tabpanel] .mais-head h2").all_inner_texts()]
        check(heads == ["Prazos", "Exibição", "Quem faz", "Repetição"], f"Opções: Prazos, Exibição, Quem faz and Repetição ({heads})")
        check(await a.locator("input[aria-label='Notas']").count() == 1 and await a.locator("#quem-faz input[aria-label='Serviços externos']").count() == 1, "Opções: the switches Notas and Serviços externos")
        check(await a.locator("#repeticao input[aria-label='Repetir depois de concluir']").count() == 1, "Repetição: the switch")
        await pg.screenshot(path=f"{SP}/shots/rvmn-opcoes-dark.png")
        await pg.go_back(); await pg.wait_for_timeout(400)

        # ---- Configurações: the tabs that are settings
        await rows.nth(3).click(); await pg.wait_for_timeout(500)
        tabs = [t.strip() for t in await a.locator(".more-tabs button").all_inner_texts()]
        check(tabs == ["Integrações", "Dados", "Aparência", "Opções"], f"Configurações in tabs ({tabs})")
        check((await a.locator(".more-tabs button.on").inner_text()).strip() == "Integrações" and await a.locator("#leitura-ia").count() == 1, "it opens on Integrações")
        for t, want in [("Dados", "/config/dados"), ("Aparência", "/config/aparencia"), ("Opções", "/config/opcoes"), ("Integrações", "/config")]:
            await a.get_by_role("tab", name=t, exact=True).click(); await pg.wait_for_timeout(400)
            check(await path() == want and (await a.locator(".more-tabs button.on").inner_text()).strip() == t and (await lit()).strip() == "Mais", f"{t}: {want}, Mais lit")
        check(await depth() == 2, "the tabs replace each other in the history")
        await a.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(600)
        vers = await a.locator(".panel", has_text="Versões anteriores").locator(".panel-lead").inner_text()
        check(vers == "Uma cópia dos ajustes e das repetições a cada 10 minutos de uso e antes de importar, restaurar ou apagar. Ficam as 3 mais recentes.", f"Versões anteriores: like the InventarIA ({vers})")
        await pg.go_back(); await pg.wait_for_timeout(450)
        check(await view() == "more", "Back from a tab of Configurações: the menu, not the tab before")

        # ---- the bar on a screen of Mais
        await rows.nth(0).click(); await pg.wait_for_timeout(450)
        await tab("Mais")
        check(await view() == "more" and await depth() == 1, "Mais in the bar on a screen of Mais: back to the menu")
        await rows.nth(3).click(); await pg.wait_for_timeout(450)
        await tab("Agora")
        check(await view() == "home" and await depth() == 0, "Sugestões in the bar on a screen of Mais: the start, the menu goes too")
        await tab("Mais"); await rows.nth(3).click(); await pg.wait_for_timeout(450)
        await tab("Listas")
        check(await view() == "lists" and await depth() == 1, "Listas in the bar on a screen of Mais: in the place of Mais")
        await tab("Mais"); await rows.nth(3).click(); await pg.wait_for_timeout(450)
        await tab("Buscar")
        check(await view() == "search" and await depth() == 1, "Buscar in the bar on a screen of Mais: in the place of Mais")
        await pg.go_back(); await pg.wait_for_timeout(450)
        check(await view() == "home", "and Back from there: the start, not the menu")

        # ---- the addresses of the old tabs land on the new place
        for old, new, name in [("/mais/integracoes", "/config", "config"), ("/mais/ia", "/config", "config"), ("/mais/dados", "/config/dados", "config"),
                               ("/mais/aparencia", "/config/aparencia", "config"), ("/mais/opcoes", "/config/opcoes", "config"),
                               ("/mais/repeticoes", "/config/opcoes", "config"), ("/repeticoes", "/config/opcoes", "config")]:
            before = await depth()
            await go(old)
            on = (await a.locator(".more-tabs button.on").inner_text()).strip() if name == "config" else ""
            check(await path() == new and await view() == name and await depth() == before + 1, f"{old} → {new} {on}")
        await go("")

        # ---- light and dark, from 320 px to the computer: nothing wider than the screen
        await ctx.close()
        for scheme in ("light", "dark"):
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme=scheme, has_touch=True)
            pg = await ctx.new_page()
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.wait_for_timeout(1500)
            a = pg.locator("resolvia-panel")
            for w in (320, 390, 1200):
                await pg.set_viewport_size({"width": w, "height": 844 if w < 1000 else 820}); await pg.wait_for_timeout(300)
                for p in ("/mais", "/listas", "/graficos", "/config", "/config/dados", "/config/aparencia", "/config/opcoes", "/sobre"):
                    await a.evaluate("(el, p) => el._go(p)", p); await pg.wait_for_timeout(350)
                    over = await a.evaluate(OVER)
                    check(not over, f"{scheme} {w} px {p}: nothing past the edge {over}")
                    if p == "/mais":
                        check(await a.locator(".more-row:visible").count() == 5, f"{scheme} {w} px: the five rows of the menu on screen")
                    if p.startswith("/config"):
                        check(await a.locator(".more-tabs button:visible").count() == 4 and await a.locator(".uplink:visible").count() == 1, f"{scheme} {w} px {p}: ‹ Mais and the four tabs on screen")
                    if w >= 1000:
                        cur = await a.locator(".side-link[aria-current='page']").inner_text()
                        check(cur.strip() == "Mais", f"{scheme} computer {p}: Mais lit in the sidebar")
                    shot = {(390, "/mais"): "menu", (390, "/config"): "config", (390, "/listas"): "listas", (320, "/config/dados"): "dados-320", (320, "/mais"): "menu-320", (1200, "/mais"): "menu-pc", (1200, "/config"): "config-pc", (390, "/graficos"): "graficos"}.get((w, p))
                    if shot: await pg.screenshot(path=f"{SP}/shots/rvmn-{shot}-{scheme}.png")
                await a.evaluate("(el) => el._go('')")
            await ctx.close()
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
