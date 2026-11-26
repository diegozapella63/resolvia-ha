# ResolvIA 2.81.0: fotos numa tarefa. No Novo item e no Editar item, Tirar foto e Escolher fotos; a foto aparece no
# quadro, fica guardada com a tarefa (pelo nome dela), a tarefa mostra quantas tem na lista, um toque abre a foto grande
# e tirar a foto apaga o arquivo.
import os as _os
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
import asyncio, json, os, struct, subprocess, time, shutil, zlib
from playwright.async_api import async_playwright
SP = _os.environ["E2E_TMP"]; REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvf-data", f"{SP}/rvf-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE); os.makedirs(DATA)
FOTO1, FOTO2 = f"{SP}/rvf-foto1.png", f"{SP}/rvf-foto2.png"
def png(arq, w, h, cor):
    """Um PNG de uma cor só (sem o PIL, que o GitHub não tem)."""
    linha = b"\x00" + bytes(cor) * w
    def parte(tipo, dados): return struct.pack(">I", len(dados)) + tipo + dados + struct.pack(">I", zlib.crc32(tipo + dados))
    open(arq, "wb").write(b"\x89PNG\r\n\x1a\n" + parte(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + parte(b"IDAT", zlib.compress(linha * h, 9)) + parte(b"IEND", b""))
def tamanho_jpg(arq):
    """(largura, altura) de um JPEG, pelo marcador SOF."""
    d = open(arq, "rb").read(); i = 2
    while i < len(d):
        m, n = d[i + 1], struct.unpack(">H", d[i + 2:i + 4])[0]
        if 0xC0 <= m <= 0xCF and m not in (0xC4, 0xC8, 0xCC): return struct.unpack(">HH", d[i + 5:i + 9])[::-1]
        i += 2 + n
    return None
png(FOTO1, 2400, 1200, (200, 80, 60))
png(FOTO2, 600, 900, (40, 120, 200))
n_ok, failed = 0, []
def check(c, label):
    global n_ok
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: n_ok += 1
    else: failed.append(label)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo"), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_REST_URL="http://127.0.0.1:8123/api", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvf_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
def arquivos(): return sorted(os.listdir(f"{DATA}/fotos")) if os.path.isdir(f"{DATA}/fotos") else []
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark")
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://127.0.0.1:8099/?aba=listas"); await pg.wait_for_timeout(1800)
        a = pg.locator("resolvia-panel"); sheet = a.locator(".sheet")
        await a.evaluate("(el) => el._openAdd('todo.casa')"); await pg.wait_for_timeout(500)
        # 2.83.0: no Novo item, as fotos ficam no bloco de cima (Fotos e mensagens): ler com a IA numa linha, anexar na outra
        campo = sheet.locator(".field.imp-field")
        check(await sheet.locator(".photos-field").count() == 0 and (await campo.locator(":scope > .flabel").inner_text()).strip() == "Fotos e mensagens", "Novo item: um bloco só em cima, Fotos e mensagens (sem outro campo Fotos embaixo)")
        subs = [t.strip() for t in await campo.locator(".imp-sub").all_inner_texts()]
        check([x.upper() for x in subs] == ["LER COM A IA", "ANEXAR NA TAREFA"], f"as duas linhas com o nome do que cada uma faz ({subs})")
        ordem = await sheet.evaluate("(s) => [...s.querySelectorAll(':scope .field > .flabel, :scope label.field > .flabel')].map((l) => l.textContent.trim())")
        check(ordem[:2] == ["Fotos e mensagens", "Item"], f"em cima, antes do Item ({ordem[:3]})")
        bts = campo.locator(".photo-tiles .imp-tile")
        check([t.strip() for t in await bts.all_inner_texts()] == ["Tirar foto", "Escolher fotos"], "Tirar foto e Escolher fotos")
        cx = await bts.evaluate_all("(bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), Math.round(r.top), !!b.querySelector('svg'), b.scrollWidth > b.clientWidth + 1]; })")
        check(abs(cx[0][0] - cx[1][0]) <= 1 and cx[0][1] == cx[1][1] and cx[0][2] == cx[1][2] and all(c[3] for c in cx) and not any(c[4] for c in cx), f"os dois do mesmo tamanho, lado a lado, com ícone ({cx})")
        ia = await campo.locator(".imp-tiles").first.locator(".imp-tile").evaluate_all("(bs) => bs.map((b) => Math.round(b.getBoundingClientRect().height))")
        check(cx[0][1] < min(ia), f"os de anexar mais baixos que os de ler com a IA ({cx[0][1]} < {ia})")
        # 2.94.0: Tirar foto abre a câmera do app (a do Digitalizar com IA): o app do Home Assistant no Android ignora o capture
        await bts.nth(0).click(); await pg.wait_for_timeout(500)
        check(await a.locator(".cam .cam-title").inner_text() == "Tirar foto", "Tirar foto: a câmera do app, com o título dela")
        await a.locator(".cam .cam-btn[aria-label='Fechar']").click(); await pg.wait_for_timeout(300)
        check(await a.locator(".cam").count() == 0 and await sheet.count() == 1, "fechar a câmera volta para a janela")
        await sheet.locator("textarea").first.fill("Arrumar o piso do banheiro")
        # Escolher fotos: o seletor feito na hora no documento, com várias (no app do Android, uma de cada vez)
        async with pg.expect_file_chooser() as fc:
            await bts.nth(1).click()
        ch = await fc.value
        check(ch.is_multiple(), "Escolher fotos aceita várias (fora do app do Android)")
        await ch.set_files([FOTO1, FOTO2]); await pg.wait_for_timeout(1500)
        check(await campo.locator(".photo img").count() == 2 and (await campo.locator(".photos-sub").inner_text()).upper().split() == ["ANEXAR", "NA", "TAREFA", "(2)"], "as duas fotos no bloco de cima, e a contagem na linha")
        ok = await campo.locator(".photo img").evaluate_all("(is) => is.map((i) => i.complete && i.naturalWidth > 0)")
        check(ok == [True, True], f"as fotos carregam do servidor ({ok})")
        fs = arquivos()
        check(len(fs) == 2 and all(os.path.getsize(f"{DATA}/fotos/{f}") < 400_000 for f in fs), f"guardadas em /data/fotos, já pequenas ({[(f, os.path.getsize(DATA + '/fotos/' + f)) for f in fs]})")
        dims = sorted(tamanho_jpg(f"{DATA}/fotos/{f}") for f in fs)
        check(dims == [(600, 900), (1600, 800)], f"a grande diminuída para 1600 px; a pequena como veio ({dims})")
        await campo.scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvf-novo.png")
        over = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.sheet .imp-field *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).length")
        check(over == 0, "nada passa da largura")
        await sheet.locator(".sheet-actions .btn.primary, .btn.primary").last.click(); await pg.wait_for_timeout(1500)
        ph = stored().get("photos", {})
        check(list(ph.get("todo.casa", {}).keys()) == ["arrumar o piso do banheiro"] and sorted(ph["todo.casa"]["arrumar o piso do banheiro"]) == fs, f"guardadas com a tarefa, pelo nome dela ({ph})")
        await a.evaluate("(el) => el._go('/lista/todo.casa')"); await pg.wait_for_timeout(700)
        linha = a.locator(".item", has_text="Arrumar o piso do banheiro")
        check((await linha.locator(".tag.fotos").inner_text()).strip() == "2" and await linha.locator(".tag.fotos svg").count() == 1, "na lista, a tarefa mostra quantas fotos tem")
        await linha.screenshot(path=f"{SP}/shots/rvf-linha.png")
        # ---- Editar: as fotos estão lá; um toque abre grande; tirar uma apaga o arquivo; renomear leva as fotos junto
        await linha.locator(".it-text").click(); await pg.wait_for_timeout(600)
        check(await sheet.locator(".photos-field .photo img").count() == 2, "Editar item: as fotos da tarefa")
        ordem = await sheet.evaluate("(s) => [...s.querySelectorAll(':scope .field > .flabel, :scope label.field > .flabel')].map((l) => l.textContent.trim().replace(/\\s*\\(.*/, ''))")
        check(ordem[:2] == ["Item", "Fotos"] and await sheet.locator(".imp-field").count() == 0, f"Editar item: as Fotos logo abaixo do Item, em cima ({ordem[:3]})")
        await sheet.locator(".photo-open").first.click(); await pg.wait_for_timeout(300)
        big = a.locator(".photo-view img")
        check(await big.count() == 1 and await big.evaluate("(i) => i.complete && i.naturalWidth > 0 && i.getBoundingClientRect().width <= innerWidth"), "um toque abre a foto grande, dentro da tela")
        await pg.screenshot(path=f"{SP}/shots/rvf-grande.png")
        await a.locator(".photo-view .photo-close").click(); await pg.wait_for_timeout(200)
        check(await a.locator(".photo-view").count() == 0 and await sheet.locator(".photos-field").count() == 1, "Fechar volta para a janela")
        await sheet.locator(".photo-x").first.click(); await pg.wait_for_timeout(200)
        await sheet.locator("textarea").first.fill("Arrumar o piso do banheiro das visitas")
        await sheet.locator(".sheet-actions .btn.primary, .btn.primary").last.click(); await pg.wait_for_timeout(1800)
        ph = stored().get("photos", {}).get("todo.casa", {})
        check(list(ph.keys()) == ["arrumar o piso do banheiro das visitas"] and len(ph["arrumar o piso do banheiro das visitas"]) == 1, f"tirada uma e renomeada: a outra foi junto ({ph})")
        check(arquivos() == ph["arrumar o piso do banheiro das visitas"], f"o arquivo da foto tirada foi apagado ({arquivos()})")
        check((await a.locator(".item", has_text="banheiro das visitas").locator(".tag.fotos").inner_text()).strip() == "1", "a lista mostra 1")
        # claro, 320 px
        await pg.emulate_media(color_scheme="light"); await pg.set_viewport_size({"width": 320, "height": 700}); await pg.wait_for_timeout(400)
        await a.locator(".item", has_text="banheiro das visitas").locator(".it-text").click(); await pg.wait_for_timeout(600)
        over = await a.evaluate("(el) => [...el.renderRoot.querySelectorAll('.sheet .photos-field *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).length")
        check(over == 0, "320 px: nada passa da largura")
        await sheet.locator(".photos-field").scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rvf-editar-320-claro.png")
        check(not errs, f"sem erros na página {errs[:2]}")
        await b.close()
try: asyncio.run(main())
finally:
    for pr in (app, fake): pr.terminate()
print(f"\n{n_ok} checks passed" + (f", {len(failed)} FAILED: {failed}" if failed else ""))
raise SystemExit(1 if failed else 0)
