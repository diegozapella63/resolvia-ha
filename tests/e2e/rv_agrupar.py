# ResolvIA 2.85.0: Buscar › Agrupar por: Lista (como sempre) ou Prazo (os grupos do Agora: Atrasados, Hoje, Amanhã,
# Próximos 7 dias, Mais adiante e Sem prazo); com os cômodos, também Cômodo (rv_rooms.py). Fica guardado no aparelho.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, os, subprocess, time, shutil
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
HA_PORT = _os.environ.get("E2E_HA_PORT", "8123")
APP_PORT = _os.environ.get("E2E_APP_PORT", "8099")
URL = f"http://127.0.0.1:{APP_PORT}/"
DATA, SHARE = f"{SP}/rvag-data", f"{SP}/rvag-share"
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
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL=f"ws://127.0.0.1:{HA_PORT}/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT=APP_PORT), stdout=open(f"{SP}/rvfd_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)


GRUPOS = "(el) => [...el.renderRoot.querySelectorAll('.search-list')].map((g) => [g.querySelector('.fold-over span').textContent.trim(), g.querySelectorAll('.item, .row').length, g.dataset.group])"

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
            async def go(path):
                await a.evaluate("(el, p) => el._go(p)", path); await pg.wait_for_timeout(500)
            await go("/buscar")
            ops = [t.strip() for t in await a.locator(".agrupar .pick").all_inner_texts()]
            check(ops == ["Lista", "Prazo"], f"{w}: Agrupar por: Lista e Prazo (sem os cômodos, sem Cômodo) ({ops})")
            check((await a.locator("#agrupar-por").inner_text()).strip() == "Agrupar por" and await a.locator("#agrupar-por svg").count() == 1 and await a.locator(".agrupar .pick svg").count() == 2, f"{w}: o título e os botões com ícone")
            check(await a.locator(".agrupar .pick[aria-checked=true]").inner_text() == "Lista", f"{w}: começa por Lista")
            # 2.94.0 (o dono: "tirar dos Filtros, deixar separado e com opção de retrair")
            fora = await a.evaluate("(el) => { const g = el.renderRoot.querySelector('#agrupar-por'); return !g.closest('.incluir') && g.parentElement.querySelector('#incluir') !== null; }")
            check(fora, f"{w}: o Agrupar por fora dos Filtros, um bloco dele")
            await a.locator("#agrupar-por").click(); await pg.wait_for_timeout(200)
            check(await a.locator(".agrupar").count() == 0 or not await a.locator(".agrupar").is_visible(), f"{w}: fecha pelo título")
            check((await a.locator("#agrupar-por").inner_text()).split() == ["Agrupar", "por", "·", "Lista"], f"{w}: fechado, o escolhido ao lado")
            check(await pg.evaluate("() => localStorage.getItem('resolvia-agrupar-fechado')") == "true", f"{w}: o aparelho lembra")
            await a.locator("#agrupar-por").click(); await pg.wait_for_timeout(200)
            check(await a.locator(".agrupar").is_visible(), f"{w}: abre de novo")
            listas = await a.evaluate(GRUPOS)
            total = sum(n for _, n, _ in listas)
            check(len(listas) > 1 and all(not g.startswith("prazo:") for _, _, g in listas), f"{w}: por lista, como sempre ({[x[0] for x in listas]})")
            cx = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.agrupar .pick')].map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.top), Math.round(r.height)]; })")
            check(cx[0] == cx[1], f"{w}: os botões do mesmo tamanho, lado a lado ({cx})")
            await a.locator(".agrupar .pick", has_text="Prazo").click(); await pg.wait_for_timeout(350)
            prazo = await a.evaluate(GRUPOS)
            nomes = [x[0] for x in prazo]
            ordem = ["Atrasados", "Hoje", "Amanhã", "Próximos 7 dias", "Mais adiante", "Sem prazo"]
            check(nomes == [n for n in ordem if n in nomes] and "Atrasados" in nomes and "Hoje" in nomes and "Sem prazo" in nomes, f"{w}: por prazo, os grupos do Agora, na ordem ({nomes})")
            check(sum(n for _, n, _ in prazo) == total, f"{w}: os mesmos itens, só em outros grupos ({total})")
            check(await a.locator('.search-list[data-group="prazo:late"] .item, .search-list[data-group="prazo:late"] .row').first.inner_text() != "", f"{w}: os atrasados com as tarefas")
            check(not await pg.evaluate("() => document.documentElement.scrollWidth > innerWidth"), f"{w}: nada passa da largura")
            await pg.screenshot(path=f"{SP}/shots/rvag-prazo-{w}.png")
            # um grupo fecha pelo nome, como as listas
            g = a.locator('.search-list[data-group="prazo:none"]')
            n0 = await g.locator(".item, .row").count()
            await g.locator(".fold-over").click(); await pg.wait_for_timeout(250)
            check(n0 > 0 and await g.locator(".item, .row").count() == 0 and (await g.locator(".fold-over").inner_text()).strip() == f"Sem prazo ({n0})".upper() or (await g.locator(".fold-over").inner_text()).strip().lower() == f"sem prazo ({n0})", f"{w}: o grupo fecha pelo nome, com a contagem")
            # Selecionar continua valendo, com todos
            await a.locator(".res-head .text-btn").click(); await pg.wait_for_timeout(300)
            await a.locator(".sel-head .text-btn").click(); await pg.wait_for_timeout(300)
            sel = (await a.locator(".sel-head .res-n").inner_text()).strip()
            check(sel.endswith("selecionados") and int(sel.split()[0]) > 1, f"{w}: Selecionar e Todos valem nos grupos por prazo ({sel})")
            await a.locator(".sel-head .icon-btn").click(); await pg.wait_for_timeout(300)
            # fica guardado no aparelho
            await pg.reload(); await pg.wait_for_timeout(1300); await go("/buscar")
            check(await a.locator(".agrupar .pick[aria-checked=true]").inner_text() == "Prazo" and await pg.evaluate("() => localStorage.getItem('resolvia-buscar-agrupar')") == '"prazo"', f"{w}: a escolha fica guardada no aparelho")
            # com os concluídos, eles vão num grupo no fim
            await a.locator(".filters .pick", has_text="Concluídos").click(); await pg.wait_for_timeout(400)
            nomes = [x[0] for x in await a.evaluate(GRUPOS)]
            check("Concluídos" not in nomes or nomes[-1] == "Concluídos", f"{w}: os concluídos, se houver, por último ({nomes})")
            await a.locator(".agrupar .pick", has_text="Lista").click(); await pg.wait_for_timeout(300)
            check(all(not g.startswith("prazo:") for _, _, g in await a.evaluate(GRUPOS)), f"{w}: de volta à Lista")
            await ctx.close()
        check(not errs, f"no page errors {errs[:3]}")
        await b.close()
try: asyncio.run(main())
finally:
    app.kill(); fake.kill()
print(f"{n_ok} checks passed" if not failed else f"{len(failed)} FAILED, {n_ok} passed")
import sys; sys.exit(1 if failed else 0)
