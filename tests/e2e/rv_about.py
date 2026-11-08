# ResolvIA 2.40.0: Mais › Sobre, the last row of the menu, the same page as the CronologIA (about.js is the same
# file in both): CorrerIA Code and why the name, the seven apps with a line and their GitHub (this one marked with
# its version) and Meu GitHub. 320 px to the computer, light and dark.
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
DATA, SHARE = f"{SP}/rvab-data", f"{SP}/rvab-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT=HA_PORT, TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvab_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

GH = "https://github.com/diegozapella63"
APPS = [("CronologIA", "cronologia-ha"), ("ResolvIA", "resolvia-ha"), ("GerencIA", "gerencia-ha"), ("InventarIA", "inventario-ha"), ("EconomIA", "economia-ha"), ("MemorIA", "memoria-ha"), ("CorrerIA", "correria-ha")]
import re
VERSION = re.search(r'^version:\s*"?([\d.]+)', open(f"{REPO}/resolvia/config.yaml").read(), re.M).group(1)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for scheme, w in (("dark", 390), ("light", 320), ("dark", 1280)):
            ctx = await b.new_context(viewport={"width": w, "height": 844 if w < 1000 else 900}, device_scale_factor=2, color_scheme=scheme, has_touch=w < 1000)
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(LISTAS); await pg.wait_for_timeout(1500)
            a = pg.locator("resolvia-panel")
            tag = f"{scheme} {w}px"
            await a.evaluate("(el) => el._go('/mais')"); await pg.wait_for_timeout(500)
            row = a.locator(".more-row").last
            check((await row.locator("b").inner_text()).strip() == "Sobre", f"{tag}: Sobre, the last row of Mais")
            await row.click(); await pg.wait_for_timeout(600)
            check((await a.locator(".page-title").first.inner_text()).strip() == "Sobre" and await a.locator(".uplink").count() == 1, f"{tag}: Sobre, with ‹ Mais")
            hero = " ".join((await a.locator(".about-hero").inner_text()).split())
            check(hero.startswith("CorrerIA Code") and "desenvolvimento de softwares" in hero.lower(), f"{tag}: CorrerIA Code ({hero})")
            why = " ".join((await a.locator(".about-why").inner_text()).split())
            check("programador sem tempo" in why and "IA para rodar tudo isso aqui" in why, f"{tag}: why CorrerIA")
            rows = a.locator(".about-apps .ab-row")
            hrefs = [await rows.nth(i).get_attribute("href") for i in range(await rows.count())]
            check(hrefs == [f"{GH}/{r}" for _, r in APPS], f"{tag}: the seven apps, each to its GitHub ({hrefs})")
            names = [" ".join(t.split()).split(" Este app")[0] for t in await rows.locator("b").all_inner_texts()]
            check(names == [n for n, _ in APPS], f"{tag}: the names, in one piece ({names})")
            here = a.locator(".ab-row.here")
            check(await here.count() == 1 and f"Este app · v{VERSION}" in await here.inner_text() and await here.get_attribute("href") == f"{GH}/resolvia-ha", f"{tag}: this app marked, with v{VERSION}")
            targets = await a.locator(".about a").evaluate_all("(xs) => xs.map((x) => x.target + ' ' + x.rel)")
            check(len(targets) == 8 and all(t == "_blank noopener" for t in targets), f"{tag}: links open outside ({targets})")
            gh = a.locator("a.ab-github")
            check(await gh.get_attribute("href") == GH and (await gh.inner_text()).strip() == "Meu GitHub", f"{tag}: Meu GitHub")
            wh = await a.locator(".ab-what").evaluate("(x) => [x.getBoundingClientRect().height, parseFloat(getComputedStyle(x).fontSize)]")
            check(wh[0] < wh[1] * 2, f"{tag}: desenvolvimento de softwares in one line ({wh})")
            over = await A_OVER(pg, a)
            check(not over, f"{tag}: nothing past the edge {over}")
            await pg.screenshot(path=f"{SP}/shots/rvab-{scheme}-{w}.png")
            await gh.scroll_into_view_if_needed(); await pg.wait_for_timeout(300)
            await pg.screenshot(path=f"{SP}/shots/rvab-{scheme}-{w}-fim.png")
            if w == 390:
                chat = await a.evaluate("(el) => el._chatScreen()")
                check(chat.startswith("Mais › Sobre"), f"{tag}: the Conversa knows the screen ({chat})")
                await pg.go_back(); await pg.wait_for_timeout(500)
                check(await a.evaluate("(el) => el._view().name") == "more", f"{tag}: Back goes to the menu")
            check(not errs, f"{tag}: no page errors {errs}")
            await ctx.close()
        await b.close()

async def A_OVER(pg, a):
    return await a.evaluate("""(el) => {
      const W = window.innerWidth, bad = [];
      for (const e of el.renderRoot.querySelectorAll(".about *")) {
        const r = e.getBoundingClientRect();
        if (r.width && r.right > W + 1) bad.push(e.tagName.toLowerCase() + "." + [...e.classList].join(".") + " " + Math.round(r.right));
      }
      if (document.documentElement.scrollWidth > W) bad.push("page " + document.documentElement.scrollWidth);
      return bad.slice(0, 4);
    }""")

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
