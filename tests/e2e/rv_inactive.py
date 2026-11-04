# ResolvIA 2.25.0: Mais › Listas: the lists turned off go last, folded under Inativas; Dados: buttons of the same size.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, json, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvi-data", f"{SP}/rvi-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvi_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/"); await pg.wait_for_timeout(2000)
        a = pg.locator("resolvia-panel")
        await a.locator(".tab", has_text="Mais").click(); await pg.wait_for_timeout(300)
        await a.locator(".more-row", has_text="Listas").click(); await pg.wait_for_timeout(500)
        panel = a.locator(".panel").first
        async def labels():
            return [t.strip() for t in await panel.locator(".row:not(.inact-head) .label").all_inner_texts()]
        async def state():
            return await panel.locator(".row:not(.inact-head)").evaluate_all("(els) => els.map((e) => [e.querySelector('.label').textContent.trim(), e.querySelector('input').checked])")
        st = await state(); print("START:", st)
        off0 = [n for n, on in st if not on]
        head = panel.locator(".inact-head")
        # turn Casa off: it leaves the list, Inativas appears
        await panel.locator("input[aria-label='Mostrar Casa']").click(); await pg.wait_for_timeout(800)
        st = await state(); print("AFTER:", st)
        check(all(on for _, on in st), f"only the active ones in the list ({st})")
        check("Casa" not in [n for n, _ in st], "Casa is not among them")
        check(await head.count() == 1 and "Inativas" in await head.inner_text(), "Inativas at the end")
        n_off = len(off0) + 1
        check(await head.locator(".count").inner_text() == str(n_off), f"with how many ({await head.locator('.count').inner_text()})")
        last = await panel.evaluate("(p) => { const kids = [...p.children]; return kids[kids.length - 1].className; }")
        check("inact-head" in last, f"folded: Inativas is the last thing ({last})")
        await pg.screenshot(path=f"{SP}/shots/rvi-closed.png")
        # open it
        await head.click(); await pg.wait_for_timeout(300)
        check(await head.get_attribute("aria-expanded") == "true", "opens")
        st = await state(); print("OPEN:", st)
        tail = st[-n_off:]
        check(all(not on for _, on in tail) and any(n == "Casa" for n, _ in tail), f"the turned-off ones after Inativas ({tail})")
        idx_head = await panel.evaluate("(p) => [...p.children].findIndex((k) => k.classList.contains('inact-head'))")
        idx_casa = await panel.evaluate("(p) => [...p.children].findIndex((k) => k.querySelector && k.querySelector(\"input[aria-label='Mostrar Casa']\"))")
        check(idx_casa > idx_head, f"below the Inativas line ({idx_head} < {idx_casa})")
        await pg.screenshot(path=f"{SP}/shots/rvi-open.png")
        # turn it back on: it goes back up
        await panel.locator("input[aria-label='Mostrar Casa']").click(); await pg.wait_for_timeout(800)
        idx_head = await panel.evaluate("(p) => [...p.children].findIndex((k) => k.classList.contains('inact-head'))")
        idx_casa = await panel.evaluate("(p) => [...p.children].findIndex((k) => k.querySelector && k.querySelector(\"input[aria-label='Mostrar Casa']\"))")
        check(idx_casa >= 0 and (idx_head == -1 or idx_casa < idx_head), f"on again: back among the active ones ({idx_casa}, {idx_head})")
        # Dados: the buttons of the same size, lined up (‹ Mais › Configurações › Dados)
        await a.locator(".uplink", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await a.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(600)
        boxes = []
        for sel in ["#dados .opts .btn", "#dados .sec-actions .btn"]:
            loc = a.locator(sel)
            for i in range(await loc.count()):
                boxes.append(await loc.nth(i).bounding_box())
        ws = [round(x["width"]) for x in boxes]; xs = [round(x["x"]) for x in boxes]
        print("WIDTHS:", ws, "XS:", xs)
        check(len(boxes) >= 6 and max(ws) - min(ws) <= 1, f"all the same width ({ws})")
        check(max(xs) - min(xs) <= 1, f"all lined up ({xs})")
        await a.locator("#dados .opts").scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvi-dados.png")
        await pg.set_viewport_size({"width": 1280, "height": 900}); await pg.wait_for_timeout(600)
        bx = [await a.locator("#dados .opts .btn").nth(i).bounding_box() for i in range(3)]
        check(max(x["x"] for x in bx) - min(x["x"] for x in bx) <= 1 and max(x["width"] for x in bx) - min(x["width"] for x in bx) <= 1, f"computer: same width, on the right ({[(round(x['x']), round(x['width'])) for x in bx]})")
        await pg.screenshot(path=f"{SP}/shots/rvi-dados-desk.png")
        check(not errs, f"no page errors {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
