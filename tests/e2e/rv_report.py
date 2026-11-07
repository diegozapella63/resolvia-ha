# ResolvIA 2.45.0: Mais › Relatório de pendências. A row of the menu opens a page of the server, in the theme and
# the color of the app: a header (the icon and the name of the app, what the report is, when, which lists), the
# counts, a section per marked list with its open tasks (late first, in red) and what is on (points, repeat); the
# list can be changed there (one list; 2.46: never a hidden one); Voltar returns to the app.
# 2.45.1: Baixar PDF in place of Imprimir (the app Home Assistant on the phone doesn't print a page): the PDF downloads.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, os, subprocess, time, shutil, re
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
DATA, SHARE = f"{SP}/rvrp-data", f"{SP}/rvrp-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
os.makedirs(f"{SP}/shots", exist_ok=True)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-ana", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvrp_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--lang=pt-BR"])
        for scheme in ("light", "dark"):
            ctx = await b.new_context(viewport={"width": 390, "height": 844}, color_scheme=scheme, locale="pt-BR", timezone_id="America/Sao_Paulo", device_scale_factor=2, accept_downloads=True)
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.wait_for_timeout(1800)
            a = pg.locator("resolvia-panel")
            if scheme == "light":
                # the points on, so the report shows them
                await a.evaluate("(el) => el._saveAppPrefs({ points_on: true })"); await pg.wait_for_timeout(600)
            await a.locator("nav .tab", has_text="Mais").click(); await pg.wait_for_timeout(500)
            row = a.locator(".more-row", has_text="Relatório de pendências")
            check(await row.count() == 1 and "Para imprimir ou salvar em PDF." in await row.inner_text(), f"{scheme}: the row in Mais")
            await row.click(); await pg.wait_for_load_state("load"); await pg.wait_for_timeout(600)
            check("/relatorio?" in pg.url and ("tema=escuro" if scheme == "dark" else "tema=claro") in pg.url and "cor=%23" in pg.url, f"{scheme}: the page, in the theme and color of the app ({pg.url})")
            head = await pg.locator("header.cab").inner_text()
            check("ResolvIA" in head.replace("\n", "") and "Relatório de pendências" in head and "O que falta fazer" in head and re.search(r"\d\d/\d\d/\d{4} às \d\d:\d\d", head), f"{scheme}: the header ({head!r})")
            check(await pg.locator("header.cab svg.ic").count() == 1, f"{scheme}: the icon of the app")
            tiles = [t.replace("\n", " ") for t in await pg.locator(".resumo div").all_inner_texts()]
            check(tiles and tiles[0].startswith("Pendentes"), f"{scheme}: the counts ({tiles})")
            secs = [s.strip() for s in await pg.locator("section h2 span").all_inner_texts()]
            check(len(secs) >= 2, f"{scheme}: a section per marked list ({secs})")
            bg = await pg.evaluate("getComputedStyle(document.body).backgroundColor")
            check(bg == ("rgb(15, 19, 24)" if scheme == "dark" else "rgb(246, 247, 249)"), f"{scheme}: the theme of the app ({bg})")
            bx = [await pg.locator(sel).bounding_box() for sel in (".barra a:not(.pdf)", ".barra a.pdf")]
            check(abs(bx[0]["width"] - bx[1]["width"]) < 1.5 and abs(bx[0]["height"] - bx[1]["height"]) < 1.5 and abs(bx[0]["y"] - bx[1]["y"]) < 1.5, f"{scheme}: Voltar and Baixar PDF side by side, the same size ({bx})")
            check(await pg.locator(".barra button").count() == 0 and (await pg.locator(".barra a.pdf").inner_text()).strip() == "Baixar PDF", f"{scheme}: Baixar PDF, no Imprimir")
            async with pg.expect_download() as dl:
                await pg.locator(".barra a.pdf").click()
            d = await dl.value
            path = await d.path()
            head = open(path, "rb").read(8)
            check(d.suggested_filename.startswith("pendencias-") and d.suggested_filename.endswith(".pdf") and head.startswith(b"%PDF-"), f"{scheme}: the PDF downloads ({d.suggested_filename}, {head})")
            # 2.47: the charts of Mais › Gráficos and, at the end, the mark of CorrerIA Code (as in Mais › Sobre)
            titles = [t.strip() for t in await pg.locator(".graficos .g h3").all_inner_texts()]
            check(titles[:2] == ["Por lista", "Por prazo"], f"{scheme}: the charts by list and by deadline ({titles})")
            bars = await pg.evaluate("[...document.querySelectorAll('.graficos .g:first-child .gl .bar i')].map(i => getComputedStyle(i).backgroundColor)")
            check(len(bars) >= 2 and len(set(bars)) == len(bars), f"{scheme}: each list in its color ({bars})")
            names = [t.strip() for t in await pg.locator(".graficos .g:first-child .gl .nm b").all_inner_texts()]
            check("Shopping list" in names and not any(n.startswith("Notas e Rotinas") for n in names), f"{scheme}: the names of the app ({names})")
            box = await pg.locator(".graficos").bounding_box()
            check(box["width"] <= 360, f"{scheme}: the charts one under the other on the phone ({box['width']:.0f} px)")
            marca = pg.locator("footer.marca")
            check(await marca.count() == 1 and " ".join((await marca.inner_text()).split()) == "CorrerIA Code DESENVOLVIMENTO DE SOFTWARES", f"{scheme}: at the end, CorrerIA Code ({await marca.inner_text()!r})")
            ia = await pg.evaluate("[getComputedStyle(document.querySelector('.marca .nome i')).color, getComputedStyle(document.querySelector('.cab .wm b')).color, getComputedStyle(document.querySelector('.raio')).transform]")
            check(ia[0] == ia[1] and ia[2] != "none", f"{scheme}: the IA in the color of the app, the lightning tilted ({ia})")
            last = await pg.evaluate("document.querySelector('main').lastElementChild.className")
            check(last == "marca", f"{scheme}: the mark is the last thing ({last})")
            app_line = " ".join((await pg.locator(".cab .app").inner_text()).split())
            check(app_line == "ResolvIA · listas de tarefas", f"{scheme}: the app and what it is, no name of the house ({app_line!r})")
            over = await pg.evaluate("document.documentElement.scrollWidth > innerWidth")
            check(not over, f"{scheme}: nothing past the edge at 390 px")
            await pg.screenshot(path=f"{SP}/shots/rvrp-{scheme}.png", full_page=True)
            # one list: the select reloads with ?lista=
            opts = await pg.locator(".barra select option").all_inner_texts()
            check(opts[0] == "Todas as listas marcadas" and len(opts) >= 3, f"{scheme}: Todas or one list ({opts})")
            await pg.locator(".barra select").select_option(index=1); await pg.wait_for_load_state("load"); await pg.wait_for_timeout(500)
            one = await pg.locator("main > section").count()
            check("lista=todo." in pg.url and one == 1 and "na lista" in await pg.locator("header.cab").inner_text(), f"{scheme}: one list ({pg.url}, {one})")
            # on paper: no buttons, the header stays, always light
            await pg.emulate_media(media="print")
            check(not await pg.locator(".barra").is_visible() and await pg.locator("header.cab").is_visible() and await pg.evaluate("getComputedStyle(document.body).backgroundColor") == "rgb(255, 255, 255)", f"{scheme}: on paper, the header without the buttons, white")
            await pg.emulate_media(media="screen")
            # Voltar: back to the app
            await pg.locator(".barra a", has_text="Voltar").click(); await pg.wait_for_timeout(600)
            if "/relatorio" in pg.url:
                await pg.locator(".barra a", has_text="Voltar").click(); await pg.wait_for_timeout(600)
            await pg.wait_for_timeout(1500)
            check("/relatorio" not in pg.url and await pg.locator("resolvia-panel").count() == 1, f"{scheme}: Voltar returns to the app ({pg.url})")
            check(not errs, f"{scheme}: no page errors {errs}")
            await ctx.close()
        await b.close()

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
