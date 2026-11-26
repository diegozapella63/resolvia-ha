# ResolvIA 2.96.0 (o dono, na tela de uma lista: "aqui também ter o agrupamento"): dentro da lista, o Agrupar por do Buscar:
# Nenhum (a ordem da lista, como sempre), Prazo, Cômodo (com Usar cômodos) e Quem faz (com Serviços externos); cada grupo
# com o ícone, o nome e quantos, que fecha pelo título; o título Agrupar por fecha o bloco; o aparelho lembra. A casa do HA
# simulado (dev/fake-ha.mjs), inventada.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
DATA, SHARE = f"{SP}/rvla-data", f"{SP}/rvla-share"
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
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvla_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)

GRUPOS = "(el) => [...el.renderRoot.querySelectorAll('.list-grp')].map((g) => [g.querySelector('.grp-h b').textContent.trim(), g.querySelectorAll('.item').length, g.dataset.group])"
PRAZOS = ["Atrasados", "Hoje", "Amanhã", "Próximos 7 dias", "Mais adiante", "Sem prazo"]


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        errs = []
        for w, scheme in ((390, "dark"), (320, "light")):
            ctx = await b.new_context(viewport={"width": w, "height": 844}, device_scale_factor=1, color_scheme=scheme, has_touch=True)
            pg = await ctx.new_page()
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.wait_for_timeout(1500)
            a = pg.locator("resolvia-panel")
            # a lista com mais itens pendentes
            lid = await a.evaluate("(el) => el._visible().filter((l) => l.items).map((l) => [l.id, l.items.filter((i) => i.status !== 'completed').length]).sort((x, y) => y[1] - x[1])[0][0]")
            await a.evaluate("(el, p) => el._go(p)", "/lista/" + lid); await pg.wait_for_timeout(600)
            pend = await a.locator(".panel.items .item").count()
            ops = [t.strip() for t in await a.locator(".agrupar-seg button").all_inner_texts()]
            check(ops[:2] == ["Nenhum", "Prazo"] and ops[-1] == "Quem faz", f"{w}: Nenhum, Prazo… e Quem faz ({ops})")
            check(await a.locator(".agrupar-seg button[aria-checked=true]").inner_text() == "Nenhum" and await a.locator(".list-grp").count() == 0, f"{w}: Nenhum: a lista como sempre")
            cx = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.agrupar-seg button')].map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.top)]; })")
            check(len({c[0] for c in cx}) == 1 and len({c[1] for c in cx}) == 1, f"{w}: numa linha, do mesmo tamanho ({cx})")
            # Prazo
            await a.locator(".agrupar-seg button", has_text="Prazo").click(); await pg.wait_for_timeout(350)
            gs = await a.evaluate(GRUPOS)
            nomes = [g[0] for g in gs]
            check(gs and all(n in PRAZOS for n in nomes) and nomes == sorted(nomes, key=PRAZOS.index), f"{w}: Prazo: na ordem do Agora ({nomes})")
            check(sum(g[1] for g in gs) == pend, f"{w}: os mesmos {pend} itens, nos grupos")
            nums = [t.strip() for t in await a.locator(".list-grp .grp-h .grp-n").all_inner_texts()]
            check(nums == [f"{g[1]} itens" if g[1] != 1 else "1 item" for g in gs], f"{w}: quantos no título ({nums})")
            check(not await pg.evaluate("() => document.documentElement.scrollWidth > innerWidth"), f"{w}: nada passa da largura")
            await pg.screenshot(path=f"{SP}/shots/rvla-prazo-{w}.png")
            # um grupo fecha pelo título
            g0 = a.locator(".list-grp").first
            await g0.locator(".grp-h").click(); await pg.wait_for_timeout(250)
            check(await g0.locator(".item").count() == 0 and await g0.locator(".grp-h").get_attribute("aria-expanded") == "false", f"{w}: o grupo fecha pelo título")
            # Quem faz
            await a.locator(".agrupar-seg button", has_text="Quem faz").click(); await pg.wait_for_timeout(350)
            qs = await a.evaluate(GRUPOS)
            check(qs and qs[0][0] == "Nós mesmos" and sum(g[1] for g in qs) == pend, f"{w}: Quem faz: Nós mesmos primeiro ({[g[0] for g in qs]})")
            # o bloco fecha pelo título, com o escolhido ao lado; o aparelho lembra
            await a.locator("#lista-agrupar").click(); await pg.wait_for_timeout(200)
            check((await a.locator("#lista-agrupar").inner_text()).split() == ["Agrupar", "por", "·", "Quem", "faz"], f"{w}: fechado, o escolhido ao lado")
            await pg.evaluate("() => history.replaceState(null, '')")
            await pg.reload(); await pg.wait_for_timeout(1500)
            await a.evaluate("(el, p) => el._go(p)", "/lista/" + lid); await pg.wait_for_timeout(600)
            check(await a.locator(".list-grp").count() > 0 and (await a.locator("#lista-agrupar").get_attribute("aria-expanded")) == "false", f"{w}: o aparelho lembra a escolha e o bloco fechado")
            await a.locator("#lista-agrupar").click(); await pg.wait_for_timeout(200)
            await a.locator(".agrupar-seg button", has_text="Prazo").click(); await pg.wait_for_timeout(300)
            check(await a.locator(".list-grp[data-group] .grp-h[aria-expanded=false]").count() == 1, f"{w}: o grupo fechado continua fechado")
            await a.locator(".agrupar-seg button", has_text="Nenhum").click(); await pg.wait_for_timeout(300)
            check(await a.locator(".list-grp").count() == 0 and await a.locator(".panel.items .item").count() == pend, f"{w}: de volta ao Nenhum")
            await ctx.close()
        check(not errs, f"sem erros na tela ({errs[:2]})")
        await b.close()

try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" + (f", FAILED: {failed}" if failed else ""))
