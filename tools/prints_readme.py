#!/usr/bin/env python3
"""Refaz as imagens do README (docs/*.png) com uma casa inventada.

Uso: python3 tools/prints_readme.py [pasta]      (padrão: docs/; precisa de node e do playwright)

Sobe o Home Assistant simulado (dev/fake-ha.mjs), um InventarIA de mentira e o servidor do app, em portas
livres (pode rodar junto com os testes visuais), e põe listas, prazos, repetições, pontos, cômodos,
equipamentos e serviços externos de exemplo. Celular 390x844 em 2x (PNG 780x1688), tema escuro, a cor
vermelha fixa (sem a Cor do dia), usuária "Ana", relógio parado às 10h de hoje.

Telas: inicio.png (Minhas listas), lista.png (a lista Casa), item.png (Editar item) e importar.png
(a revisão de uma mensagem lida pela IA). Com --todas, também graficos.png e conversa.png.
"""
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time
import urllib.request
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from zoneinfo import ZoneInfo

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
OUT = os.path.abspath(ARGS[0]) if ARGS else os.path.join(ROOT, "docs")
ALL = "--todas" in sys.argv
TZ = "America/Sao_Paulo"
NOW = datetime.now(ZoneInfo(TZ))
CLOCK = NOW.replace(hour=10, minute=0, second=0, microsecond=0)
TOKEN = "prints"
KEY = "chave-de-exemplo"


def day(n):
    return (CLOCK + timedelta(days=n)).strftime("%Y-%m-%d")


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


# ---------------------------------------------------------------- a casa inventada

ROOMS = [("sala", "Sala"), ("cozinha", "Cozinha"), ("quarto", "Quarto"), ("banheiro", "Banheiro"), ("varanda", "Varanda")]
EQUIPS = [("ar-quarto", "Ar-condicionado", "quarto", "Parede"), ("chuveiro", "Chuveiro", "banheiro", "Box"),
          ("geladeira", "Geladeira", "cozinha", ""), ("fogao", "Fogão", "cozinha", ""), ("tv", "TV", "sala", "Rack")]

CASA = "todo.casa"
MERCADO = "todo.mercado"
VIAGEM = "todo.viagem_de_julho"
PETS = "todo.pets"
ALEXA_COMPRAS = "todo.notas_e_rotinas_do_alexa_shopping_list"
ALEXA_TAREFAS = "todo.notas_e_rotinas_do_alexa_to_do_list"
F_SHOP = 1 | 2 | 4 | 8  # adicionar, apagar, editar e reordenar, sem prazo nem notas (como a Shopping list)

# Casa: [item, {prazo, horário, notas}] na ordem da lista
CASA_ITEMS = [
    ("Trocar a resistência do chuveiro", {"due_date": day(0)}),
    ("Limpar o filtro do ar-condicionado", {"due_date": day(-2)}),
    ("Passar pano na casa", {}),
    ("Regar as plantas da varanda", {}),
    ("Consertar a torneira do banheiro", {"due_date": day(4), "description": "Comprar o reparo de 1/2\""}),
    ("Levar o carro na revisão", {"due_datetime": f"{day(3)} 09:00:00", "description": "Revisão dos 40 mil km"}),
    ("Trocar a roupa de cama", {}),
    ("Tirar o lixo", {}),
    ("Limpar a geladeira", {}),
]
CASA_DONE = ["Tirar o lixo", "Limpar a geladeira"]
REPEAT = {"Passar pano na casa": 3, "Regar as plantas da varanda": 2, "Trocar a roupa de cama": 7, "Limpar o filtro do ar-condicionado": 30}
POINTS = {"Passar pano na casa": 10, "Regar as plantas da varanda": 5, "Trocar a roupa de cama": 20}
ROOMS_OF = {"Passar pano na casa": ["sala", "cozinha"], "Regar as plantas da varanda": ["varanda"],
            "Consertar a torneira do banheiro": ["banheiro"], "Trocar a roupa de cama": ["quarto"]}
EQUIPS_OF = {"Trocar a resistência do chuveiro": ["chuveiro"], "Limpar o filtro do ar-condicionado": ["ar-quarto"]}
EXTERNAL = {"Trocar a resistência do chuveiro": "Eletricista"}

OTHER_LISTS = [
    {"entity_id": MERCADO, "name": "Mercado", "features": F_SHOP, "items": ["Leite", "Ovos", "Café", "Pão de forma", "Bananas", "Detergente", "Arroz"]},
    {"entity_id": VIAGEM, "name": "Viagem de julho", "features": 127, "items": ["Renovar o passaporte", "Reservar o hotel", "Comprar adaptador de tomada", "Pedir as férias"]},
    {"entity_id": PETS, "name": "Pets", "features": 127, "items": ["Vacina da Pipoca", "Comprar ração", "Banho e tosa"]},
]
DONE_ELSEWHERE = [(MERCADO, "Arroz"), (VIAGEM, "Pedir as férias")]
DUE_ELSEWHERE = [(VIAGEM, "Renovar o passaporte", day(12)), (PETS, "Vacina da Pipoca", day(5))]
ALEXA = {ALEXA_COMPRAS: ["Pilhas AA", "Filtro de café"],
         ALEXA_TAREFAS: ["Ligar para o dentista", "Ver sobre: https://www.home-assistant.io/integrations/todo/"]}
COLORS = {CASA: "vermelho", MERCADO: "menta", VIAGEM: "azul", PETS: "laranja", ALEXA_COMPRAS: "ouro", ALEXA_TAREFAS: "lilas"}
# a tarefa aberta em item.png
ITEM = "Limpar o filtro do ar-condicionado"
# o que a pessoa cola em Adicionar › Colar mensagem
MESSAGE = "Leite\nCafé\nTrocar a lâmpada da sala\nVer o barulho da geladeira\nLimpar o ralo do banheiro"


class Inventaria(BaseHTTPRequestHandler):
    """Só o que o ResolvIA lê do InventarIA: /api/integracao/comodos e /api/integracao/itens."""

    def do_GET(self):
        if self.headers.get("authorization") != f"Bearer {KEY}":
            return self.answer(401, {"error": "chave"})
        if self.path == "/api/integracao/comodos":
            return self.answer(200, {"versao": "1.20.0", "comodos": [{"id": i, "nome": n, "codigo": n[:3].upper(), "itens": sum(1 for e in EQUIPS if e[2] == i)} for i, n in ROOMS]})
        if self.path == "/api/integracao/itens":
            return self.answer(200, {"versao": "1.20.0", "itens": [{"id": i, "nome": n, "comodo": c, "zona": z} for i, n, c, z in EQUIPS], "categorias": {}})
        self.answer(404, {})

    def answer(self, code, body):
        data = json.dumps(body).encode()
        self.send_response(code)
        self.send_header("content-type", "application/json")
        self.send_header("content-length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass


def write(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False)


def http(method, url, body=None):
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None)
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read()


def wait_port(port, what, timeout=20):
    until = time.time() + timeout
    while time.time() < until:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.5):
                return
        except OSError:
            time.sleep(0.1)
    raise SystemExit(f"{what} não subiu na porta {port}")


def wait_line(path, text, timeout=20):
    until = time.time() + timeout
    while time.time() < until:
        if os.path.exists(path) and text in open(path, encoding="utf-8", errors="replace").read():
            return
        time.sleep(0.1)
    raise SystemExit(f"sem '{text}' em {path}:\n" + open(path, encoding="utf-8", errors="replace").read()[-2000:])


# a página em volta do app, como a do Home Assistant (mesma origem): o app lê dela o nome da pessoa e o tema
FRAME = """<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>html, body { margin: 0; height: 100%; background: #111; } iframe { display: block; border: 0; width: 100%; height: 100%; }</style></head>
<body><home-assistant></home-assistant><script>document.querySelector("home-assistant").hass = { user: { name: "Ana", is_admin: true }, themes: { darkMode: true } };</script>
<iframe src="./?aba=listas"></iframe></body></html>"""


# a mesma conexão que a tela usa, para preparar os dados (como nos testes visuais)
WS = """(m) => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http', 'ws') + '/ws');
  ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...m }));
  ws.onmessage = (e) => { const r = JSON.parse(e.data); if (r.id !== 1 || r.type !== 'result') return; ws.close(); res(r.success ? r.result : { __error: r.error }); }; })"""


def main():
    os.makedirs(OUT, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="resolvia-prints-")
    data, share, media = (os.path.join(tmp, d) for d in ("data", "share", "media"))
    for d in (data, share, media):
        os.makedirs(d)
    ha_port, app_port, inv_port = free_port(), free_port(), free_port()
    procs = []
    inv = ThreadingHTTPServer(("127.0.0.1", inv_port), Inventaria)
    threading.Thread(target=inv.serve_forever, daemon=True).start()
    try:
        # os outros apps: o InventarIA (cômodos e equipamentos) e o placar do CronologIA (pontos)
        write(f"{share}/inventario/integracao.json", {"url": f"http://127.0.0.1:{inv_port}", "chave": KEY})
        write(f"{share}/cronologia/integracao.json", {"app": "CronologIA", "versao": "1.40.0", "gravado_em": datetime.now(ZoneInfo("UTC")).isoformat(),
                                                      "placar": {"ativo": True, "periodo": "semana", "participantes": ["Ana", "Beto", "Clara"], "usuarios": {"u-ana": "Ana"}}})
        write(f"{data}/resolvia.json", {"version": 1, "prefs": {
            "lists": {k: {"color": c} for k, c in COLORS.items()},
            "app": {"rooms_on": True, "equips_on": True, "points_on": True, "repeat_on": True, "accent_daily": False}}})

        env = {k: v for k, v in os.environ.items() if not k.startswith(("FAKE_", "RESOLVIA_", "HA_", "SUPERVISOR"))}
        env["TZ"] = TZ
        procs.append(subprocess.Popen(["node", os.path.join(ROOT, "dev", "fake-ha.mjs")], cwd=tmp, stdout=open(f"{tmp}/ha.log", "w"), stderr=subprocess.STDOUT,
                                      env=dict(env, FAKE_HA_PORT=str(ha_port), FAKE_HA_TOKEN=TOKEN, FAKE_MEDIA_DIR=media)))
        wait_port(ha_port, "o Home Assistant simulado")
        ha = f"http://127.0.0.1:{ha_port}"
        # as listas: sai a Problem List, a Casa começa vazia, entram Mercado, Viagem e Pets (as da Alexa ficam, agrupadas)
        for lid in ("todo.analise_dos_dispositivos_problem_list", CASA):
            http("DELETE", f"{ha}/dev/list/{lid}")
        http("POST", f"{ha}/dev/list", {"entity_id": CASA, "name": "Casa", "features": 127, "items": []})
        for lst in OTHER_LISTS:
            http("POST", f"{ha}/dev/list", lst)

        procs.append(subprocess.Popen(["node", os.path.join(ROOT, "resolvia", "rootfs", "app", "server.js")], cwd=tmp, stdout=open(f"{tmp}/app.log", "w"), stderr=subprocess.STDOUT,
                                      env=dict(env, RESOLVIA_DEV="1", RESOLVIA_DEV_USER_ID="u-ana", HA_WS_URL=f"ws://127.0.0.1:{ha_port}/api/websocket", HA_REST_URL=f"{ha}/api",
                                               HA_TOKEN=TOKEN, DATA_DIR=data, SHARE_DIR=share, MEDIA_DIR=media, PORT=str(app_port))))
        wait_line(f"{tmp}/app.log", "listas de tarefas encontradas")
        url = f"http://127.0.0.1:{app_port}/"

        with sync_playwright() as p:
            b = p.chromium.launch()
            ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, color_scheme="dark", has_touch=True, locale="pt-BR", timezone_id=TZ)
            pg = ctx.new_page()
            errors = []
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.clock.set_fixed_time(CLOCK.isoformat())
            # como no Home Assistant: o app numa moldura (sem a barra de cima dele), com a usuária do Home Assistant
            pg.route(url + "moldura.html", lambda route: route.fulfill(content_type="text/html", body=FRAME))
            pg.goto(url + "moldura.html")
            pg.wait_for_timeout(1500)
            ws = lambda m: pg.evaluate(WS, m)

            def ok(r, what):
                if isinstance(r, dict) and "__error" in r:
                    raise SystemExit(f"{what}: {r['__error']}")
                return r

            service = lambda svc, lid, sd: ok(ws({"type": "call_service", "domain": "todo", "service": svc, "service_data": sd, "target": {"entity_id": lid}}), f"{svc} {sd}")
            items = lambda lid: ok(ws({"type": "todo/item/list", "entity_id": lid}), lid)["items"]
            # as da Alexa: os itens de exemplo no lugar dos do simulador
            for lid, names in ALEXA.items():
                old = [i["uid"] for i in items(lid)]
                if old:
                    service("remove_item", lid, {"item": old})
                for n in names:
                    service("add_item", lid, {"item": n})
            for summary, extra in CASA_ITEMS:
                service("add_item", CASA, {"item": summary, **extra})
            for lid, summary, due in DUE_ELSEWHERE:
                service("update_item", lid, {"item": summary, "due_date": due})
            for lid, summary in [(CASA, s) for s in CASA_DONE] + DONE_ELSEWHERE:
                service("update_item", lid, {"item": summary, "status": "completed"})
            uid = {i["summary"]: i["uid"] for i in items(CASA)}
            for summary, days in REPEAT.items():
                ok(ws({"type": "resolvia/recurring/set", "entity_id": CASA, "uid": uid[summary], "summary": summary, "days": days}), summary)
            for summary, pts in POINTS.items():
                ok(ws({"type": "resolvia/points/set", "entity_id": CASA, "summary": summary, "points": pts}), summary)
            for summary, rooms in ROOMS_OF.items():
                ok(ws({"type": "resolvia/rooms/set", "entity_id": CASA, "summary": summary, "rooms": rooms}), summary)
            for summary, eq in EQUIPS_OF.items():
                ok(ws({"type": "resolvia/equips/set", "entity_id": CASA, "summary": summary, "equips": eq}), summary)
            for summary, who in EXTERNAL.items():
                ok(ws({"type": "resolvia/external/set", "entity_id": CASA, "summary": summary, "value": who}), summary)

            pg.reload()
            pg.wait_for_timeout(2500)
            fr = pg.frame_locator("iframe")
            a = fr.locator("resolvia-panel")
            a.locator(".page-title").wait_for()
            a.evaluate("() => document.fonts.ready")
            sheet = a.locator(".sheet")

            def shot(name, wait=700):
                pg.wait_for_timeout(wait)
                pg.screenshot(path=os.path.join(OUT, name))
                print("ok", name)

            def close_sheet():
                sheet.locator(".icon-btn[aria-label='Fechar']").first.click()
                pg.wait_for_timeout(500)

            # Início
            shot("inicio.png")
            # a lista Casa
            a.locator(".list-card", has_text="Casa").first.click()
            shot("lista.png")
            # Editar item, da repetição para baixo: cômodo, equipamento, quem faz e pontos
            a.locator(".items .item .it-body", has_text=ITEM).click()
            pg.wait_for_timeout(600)
            sheet.evaluate("(s) => { const f = [...s.querySelectorAll('.field')].find((x) => /Repetir/.test(x.textContent)); s.scrollTop = f ? f.offsetTop - 6 : 0; }")
            shot("item.png")
            close_sheet()
            # Adicionar › Colar mensagem: a IA separa e põe cada item na sua lista, cômodo e equipamento
            a.locator(".tab.fab").click()
            pg.wait_for_timeout(600)
            sheet.locator(".imp-tile", has_text="Colar mensagem").click()
            pg.wait_for_timeout(500)
            sheet.locator("textarea").fill(MESSAGE)
            sheet.locator(".btn.primary", has_text="Separar itens").click()
            sheet.locator(".imp-row").first.wait_for()
            shot("importar.png", 900)
            close_sheet()

            if ALL:
                a.evaluate("(el) => el._go('/mais')")
                pg.wait_for_timeout(500)
                a.locator(".more-row", has_text="Gráficos").click()
                shot("graficos.png")
                a.evaluate("(el) => el._go('')")
                pg.wait_for_timeout(500)
                a.locator(".chat-top").first.click()
                pg.wait_for_timeout(500)
                chat = sheet.locator(".chat")
                for n, text in enumerate(("O que está atrasado?", "Adiciona pilhas e lâmpada na lista Casa"), 1):
                    chat.locator("textarea").fill(text)
                    chat.locator(".chat-send").click()
                    chat.locator(".chat-msg.ia .chat-bubble:not(.typing)").nth(n - 1).wait_for()
                shot("conversa.png", 900)
            b.close()
            if errors:
                raise SystemExit("erros na tela:\n" + "\n".join(errors))
    finally:
        for pr in procs:
            pr.terminate()
        for pr in procs:
            try:
                pr.wait(5)
            except subprocess.TimeoutExpired:
                pr.kill()
        inv.shutdown()
        shutil.rmtree(tmp, ignore_errors=True)
    print("imagens em", OUT)


if __name__ == "__main__":
    main()
