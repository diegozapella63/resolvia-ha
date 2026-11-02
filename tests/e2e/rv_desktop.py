# ResolvIA 2.16.0: on the computer (1000 px or more), the sidebar takes the place of the bottom tabs.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, os, json, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvdk-data", f"{SP}/rvdk-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(1.2)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1200, "height": 800})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); side = a.locator("aside.side")
        check(await side.is_visible() and not await a.locator("nav .tabs").is_visible(), "1200 px: sidebar, no bottom tabs")
        links = [t.strip() for t in await side.locator(".side-link > span:not(.side-badge)").all_inner_texts()]
        check(links == ["Listas", "Buscar", "Prazos", "Mais"], f"the sections ({links})")
        badge = side.locator(".side-link", has_text="Prazos").locator(".side-badge")
        check(await badge.count() == 1 and int(await badge.inner_text()) > 0, "Prazos with the badge of late and today")
        names = [t.strip() for t in await side.locator(".side-list .sl-name").all_inner_texts()]
        home_names = [t.strip() for t in await a.locator(".list-card .lc-title").all_inner_texts()]
        check(names and sorted(names) == sorted(home_names), f"the lists, as on the home ({names})")
        nums = [t.strip() for t in await side.locator(".side-list .sl-num").all_inner_texts()]
        check(all(n.isdigit() or n == "" for n in nums), f"each with what is left ({nums})")
        check(not await a.locator(".eyebrow .brand").first.is_visible(), "the page header leaves the name to the sidebar")
        # a list
        first = side.locator(".side-list").first
        await first.click(); await pg.wait_for_timeout(700)
        check(await first.get_attribute("aria-current") == "page" and await side.locator(".side-link[aria-current='page']").count() == 0, "the list is the current one")
        check(names[0] in await a.locator(".page h1").first.inner_text(), "and it opens")
        # in a list, the box at the top adds to it
        await a.locator(".quick input").fill("Comprar lâmpada"); await a.locator(".quick input").press("Enter"); await pg.wait_for_timeout(1000)
        check("Comprar lâmpada" in await a.locator(".page").first.inner_text(), "the item goes to the list")
        # Adicionar item at the top right (like the InventarIA): a window in the middle
        check(await side.locator(".side-add").count() == 0, "no Adicionar on the sidebar: it is at the top right")
        await side.locator(".side-link", has_text="Listas").click(); await pg.wait_for_timeout(600)
        await a.locator(".top-acts .btn.primary", has_text="Adicionar item").click(); await pg.wait_for_timeout(600)
        sh = await a.locator(".sheet").bounding_box()
        check(sh and sh["y"] > 10 and abs((sh["x"] + sh["width"] / 2) - (272 + (1200 - 272) / 2)) < 4, f"Adicionar opens in the middle ({sh})")
        await a.locator(".sheet .icon-btn[aria-label='Fechar']").first.click(); await pg.wait_for_timeout(400)
        # home like the InventarIA: numbers beside the notebook, sections instead of cards, groups side by side
        check(await a.locator(".home-top .facts").is_visible() and await a.locator(".facts .fact-row").count() >= 3, "the numbers beside the notebook")
        late = await a.locator(".fact-row", has_text="Atrasados").inner_text()
        check("Pagar conta de luz" in late, f"Atrasados names the first late item ({late.splitlines()})")
        hero_box = await a.locator(".home-top .hero").bounding_box(); facts_box = await a.locator(".home-top .facts").bounding_box()
        check(facts_box["x"] > hero_box["x"] + hero_box["width"], "beside it, on the right")
        bg = await a.locator(".panel.grp").first.evaluate("e => getComputedStyle(e).backgroundColor")
        check(bg in ("rgba(0, 0, 0, 0)", "transparent"), f"sections, not cards ({bg})")
        check(await a.locator(".grp-head h2").first.evaluate("e => parseFloat(getComputedStyle(e).fontSize)") >= 24, "big section titles")
        g = await a.locator(".groups").evaluate("e => getComputedStyle(e).gridTemplateColumns")
        check(len(g.split()) == 2, f"two groups side by side ({g})")
        acts = [t.strip() for t in await a.locator(".top-acts .btn").all_inner_texts()]
        check(acts[-1] == "Adicionar item" and await a.locator(".top-acts .mic-top").count() == 1, f"top right: Falar and the actions ({acts})")
        await pg.screenshot(path=f"{SP}/shots/rvdk-home.png")
        # sections
        await side.locator(".side-link", has_text="Buscar").click(); await pg.wait_for_timeout(500)
        check("Buscar" in await side.locator(".side-link[aria-current='page']").inner_text(), "Buscar")
        await side.locator(".side-link", has_text="Mais").click(); await pg.wait_for_timeout(500)
        check("Mais" in await side.locator(".side-link[aria-current='page']").inner_text(), "Mais")
        check((await side.locator(".side-foot").inner_text()).startswith("ResolvIA 2."), "the version at the bottom")
        # the phone stays the same
        await pg.set_viewport_size({"width": 390, "height": 844}); await pg.wait_for_timeout(500)
        check(not await side.is_visible() and await a.locator("nav .tabs").is_visible(), "390 px: no sidebar, the bottom tabs")
        check((await a.locator("main").bounding_box())["x"] == 0, "390 px: the page uses the whole width")
        await a.locator(".tab", has_text="Listas").click(); await pg.wait_for_timeout(600)
        check(not await a.locator(".facts").is_visible() and not await a.locator(".top-acts").is_visible(), "390 px: no numbers beside, no top actions")
        check(await a.locator(".head-row > .mic-top").is_visible(), "390 px: Falar by the title, as before")
        bg = await a.locator(".panel").first.evaluate("e => getComputedStyle(e).backgroundColor")
        check(bg not in ("rgba(0, 0, 0, 0)", "transparent"), f"390 px: the cards, as before ({bg})")
        check(not errs, f"no page errors {errs}")
        await b.close()
try: asyncio.run(main())
finally:
    fake.kill(); app.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
