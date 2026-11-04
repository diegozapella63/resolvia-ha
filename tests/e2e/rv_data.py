import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import asyncio, subprocess, sys, os, json, time, shutil, zipfile, io, urllib.request
from playwright.async_api import async_playwright

SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA = f"{SP}/rvdata"
SHARE = f"{SP}/rvshare"
for d in (DATA, SHARE):
    if os.path.isdir(d):
        shutil.rmtree(d)
os.makedirs(f"{SP}/shots", exist_ok=True)

env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rv_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rv_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.0)
URL = "http://127.0.0.1:8099/"

passed = 0
failed = []


def check(cond, label):
    global passed
    if cond:
        passed += 1
        print("PASS", label)
    else:
        failed.append(label)
        print("FAIL", label)


def get(path):
    with urllib.request.urlopen(URL + path) as r:
        return r.read(), r.headers


def post(path, body, name):
    req = urllib.request.Request(URL + path, data=body, method="POST", headers={"content-type": "application/octet-stream", "x-file-name": name})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


WS = """(msg) => new Promise((res, rej) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws');
  ws.onopen = () => ws.send(JSON.stringify({ id: 1, ...msg }));
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id !== 1 || m.type !== 'result') return; ws.close(); m.success ? res(m.result) : res({ __error: m.error }); }; })"""
RULES = """() => new Promise((res) => { const ws = new WebSocket(location.origin.replace('http','ws') + '/ws');
  ws.onopen = () => ws.send(JSON.stringify({ id: 1, type: 'resolvia/recurring/subscribe' }));
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.type === 'event') { ws.close(); res(m.event.rules); } }; })"""


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 412, "height": 892}, device_scale_factor=2, color_scheme="dark", has_touch=True, accept_downloads=True)
        pg = await ctx.new_page()
        errs = []
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        pg.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
        await pg.goto(URL)
        await pg.wait_for_timeout(1200)
        ws = lambda msg: pg.evaluate(WS, msg)
        items = lambda eid: pg.evaluate(WS, {"type": "todo/item/list", "entity_id": eid})

        # Some app data: a custom name/color and a repeating task.
        await ws({"type": "resolvia/prefs/set_list", "entity_id": "todo.casa", "prefs": {"name": "Casa da família", "color": "verde"}})
        casa = (await items("todo.casa"))["items"]
        pano = next(i for i in casa if i["summary"] == "Passar pano na casa")
        await ws({"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": pano["uid"], "summary": pano["summary"], "days": 3})
        await ws({"type": "call_service", "domain": "todo", "service": "add_item", "service_data": {"item": "Consulta", "due_datetime": "2026-11-03 14:30:00", "description": "Levar exames"}, "target": {"entity_id": "todo.casa"}})
        await pg.wait_for_timeout(600)

        # ---- exports
        body, h = get("api/export/json")
        snap = json.loads(body)
        check(snap["app_name"] == "ResolvIA" and snap["app_version"] == __import__("re").search(r'version: "([^"]+)"', open(RESOLVIA + "/resolvia/config.yaml").read()).group(1), "JSON export names the app and version")
        check(len(snap["lists"]) == 4, "JSON export has the 4 lists")
        lc = next(l for l in snap["lists"] if l["entity_id"] == "todo.casa")
        check(lc["name"] == "Casa da família" and lc.get("ha_name") == "Casa", "list keeps the custom name and the HA name")
        cons = next(i for i in lc["items"] if i["summary"] == "Consulta")
        check(cons.get("description") == "Levar exames" and "T" in cons.get("due", ""), "items keep notes and due time")
        check(any(i["status"] == "completed" for l in snap["lists"] for i in l["items"]), "completed items are exported too")
        check(len(snap["rules"]) == 1 and snap["prefs"]["lists"]["todo.casa"]["color"] == "verde", "rules and prefs exported")
        check("attachment" in h.get("Content-Disposition", "") and "resolvia-" in h.get("Content-Disposition", ""), "download header with file name")
        open(f"{SP}/rv_export.json", "wb").write(body)

        body, _ = get("api/export/csv")
        text = body.decode("utf-8")
        check(text.startswith("﻿Lista;Item;Situação;Prazo;Notas;Repete"), "CSV has BOM and the header")
        check("Casa da família;Passar pano na casa;pendente;;;3 dias depois de concluir" in text, "CSV row with the repeat rule")
        check("Consulta;pendente;03/11/2026 14:30;Levar exames" in text, "CSV due date in local time")

        body, _ = get("api/export/zip")
        z = zipfile.ZipFile(io.BytesIO(body))
        names = z.namelist()
        check({"resolvia.json", "resolvia.csv", "LEIA-ME.txt"} <= set(names) and "listas/Casa da família.md" in names, "ZIP has json, csv, read-me and one file per list")
        md = z.read("listas/Casa da família.md").decode()
        check("- [ ] Pagar conta de luz (prazo" in md and "      Levar exames" in md, "list file is a checklist with due and notes")
        open(f"{SP}/rv_export.zip", "wb").write(body)

        # ---- UI: Mais is a menu (ResolvIA 2.37); Dados is a tab of Configurações
        await pg.locator(".tab", has_text="Mais").click()
        await pg.wait_for_timeout(600)
        rows = [t.strip() for t in await pg.locator(".more-row b").all_inner_texts()]
        check(rows == ["Listas", "Repetições", "Configurações"], f"Mais is a menu ({rows})")
        check(await pg.locator(".more-tabs").count() == 0 and await pg.locator("#dados").count() == 0, "the menu has no tabs and no panels")
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        tabs = [t.strip() for t in await pg.locator(".more-tabs button").all_inner_texts()]
        check(tabs == ["Integrações", "Dados", "Aparência", "Opções"], f"Configurações in tabs ({tabs})")
        check(await pg.locator(".more-tabs button.on").inner_text() == "Integrações" and await pg.locator("#dados").count() == 0, "Configurações opens on Integrações, only its panels")
        await pg.get_by_role("tab", name="Opções", exact=True).click(); await pg.wait_for_timeout(300)
        check(await pg.locator(".panel .mais-head", has_text="Exibição").count() == 1, "Opções has Exibição")
        await pg.go_back(); await pg.wait_for_timeout(400)
        check(await pg.locator(".more-tabs").count() == 0 and await pg.locator(".more-row").count() == 3, "Back goes to the menu instead of walking the tabs")
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(600)
        panel = pg.locator("#dados")
        check(await panel.count() == 1, "Dados panel in Mais")
        check(await panel.locator(".btn", has_text="Baixar ZIP").get_attribute("href") == URL + "api/export/zip", "ZIP button points to the export")
        async with pg.expect_download() as dl:
            await panel.locator(".btn", has_text="Baixar CSV").click()
        d = await dl.value
        check(d.suggested_filename.startswith("resolvia-") and d.suggested_filename.endswith(".csv"), "CSV download from the button")
        await panel.locator(".btn", has_text="Criar backup").click()
        await pg.wait_for_timeout(900)
        check("share/resolvia/resolvia-" in await pg.locator(".toast span").inner_text(), "backup toast names the folder")
        check(await panel.locator(".data-item").count() == 1, "backup listed")
        files = [f for f in os.listdir(f"{SHARE}/resolvia") if f.endswith(".zip")]
        check(len(files) == 1 and files[0].endswith(".zip"), "backup file in share/resolvia")
        await panel.scroll_into_view_if_needed()
        await pg.screenshot(path=f"{SP}/shots/rv-dados.png", full_page=False)

        # ---- lose things, then import the JSON back
        casa = (await items("todo.casa"))["items"]
        gone = [i["uid"] for i in casa if i["summary"] in ("Passar pano na casa", "Pagar conta de luz")]
        await ws({"type": "call_service", "domain": "todo", "service": "remove_item", "service_data": {"item": gone}, "target": {"entity_id": "todo.casa"}})
        await ws({"type": "resolvia/prefs/set_list", "entity_id": "todo.casa", "prefs": {"name": "Outro nome"}})
        await pg.wait_for_timeout(700)
        check(len(await pg.evaluate(RULES)) == 0, "rule dropped when its item was deleted")

        await pg.locator("#rv-data-import").set_input_files(f"{SP}/rv_export.json")
        await pg.wait_for_timeout(300)
        check("Importar arquivo?" in await pg.locator(".sheet h3").inner_text(), "import asks first")
        await pg.screenshot(path=f"{SP}/shots/rv-import-confirm.png")
        await pg.locator(".sheet .btn.primary", has_text="Importar").click()
        await pg.wait_for_timeout(1500)
        toast = await pg.locator(".toast span").inner_text()
        check("2 itens voltaram para as listas" in toast and "1 repetição" in toast, f"import toast ({toast})")
        casa = (await items("todo.casa"))["items"]
        summ = [i["summary"] for i in casa]
        check(summ.count("Passar pano na casa") == 1 and summ.count("Pagar conta de luz") == 1, "missing items are back, once")
        luz = next(i for i in casa if i["summary"] == "Pagar conta de luz")
        check(luz.get("due") == next(i for i in lc["items"] if i["summary"] == "Pagar conta de luz")["due"], "due date restored")
        rules = await pg.evaluate(RULES)
        pano2 = next(i for i in casa if i["summary"] == "Passar pano na casa")
        check(len(rules) == 1 and rules[0]["uid"] == pano2["uid"] and rules[0]["days"] == 3, "repeat rule back and bound to the new item")
        prefs = await ws({"type": "resolvia/prefs/get"})
        check(prefs["lists"]["todo.casa"]["name"] == "Casa da família", "custom name restored")
        await pg.locator(".uplink", has_text="Mais").click(); await pg.wait_for_timeout(400)
        await pg.locator(".more-row", has_text="Listas").click(); await pg.wait_for_timeout(400)
        check(await pg.locator(".panel .row .label", has_text="Casa da família").count() >= 1, "screen shows the restored name")
        await pg.go_back(); await pg.wait_for_timeout(400)
        await pg.locator(".more-row", has_text="Configurações").click(); await pg.wait_for_timeout(400)
        await pg.get_by_role("tab", name="Dados", exact=True).click(); await pg.wait_for_timeout(500)

        # again: nothing duplicated
        st, out = post("api/import", open(f"{SP}/rv_export.json", "rb").read(), "rv_export.json")
        check(st == 200 and out["added"] == 0, "second import adds nothing")
        summ = [i["summary"] for i in (await items("todo.casa"))["items"]]
        check(summ.count("Passar pano na casa") == 1 and len(summ) == len(set(summ)), "no duplicates")

        # ZIP import works the same
        st, out = post("api/import", open(f"{SP}/rv_export.zip", "rb").read(), "rv_export.zip")
        check(st == 200 and out["rules"] == 1, "ZIP import")

        # ---- versions
        await pg.locator("#dados .btn", has_text="Ver versões").click()
        await pg.wait_for_timeout(700)
        vers = pg.locator(".sheet .data-item")
        check(await vers.count() >= 1 and "antes de importar" in await vers.first.inner_text(), "versions listed with the reason")
        await pg.screenshot(path=f"{SP}/shots/rv-versions.png")
        await ws({"type": "resolvia/prefs/set_list", "entity_id": "todo.casa", "prefs": {"name": "Nome errado"}})
        await vers.first.locator(".btn").click()
        await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.primary", has_text="Restaurar").click()
        await pg.wait_for_timeout(900)
        check("Versão restaurada" in await pg.locator(".toast span").inner_text(), "version restored")
        prefs = await ws({"type": "resolvia/prefs/get"})
        check(prefs["lists"]["todo.casa"]["name"] != "Nome errado", "restored prefs replace the wrong name")

        # ---- backup restore from the list
        await pg.locator("#dados .data-item .btn", has_text="Restaurar").first.click()
        await pg.wait_for_timeout(300)
        await pg.locator(".sheet .btn.primary", has_text="Restaurar").click()
        await pg.wait_for_timeout(1200)
        check("Backup restaurado" in await pg.locator(".toast span").inner_text(), "backup restored")

        # ---- a backup from another Home Assistant: lists found by name
        other = {
            "app_name": "ResolvIA",
            "prefs": {"lists": {"todo.outra_casa": {"name": "Casa importada", "icon": "house"}}, "app": {"accent": "azul", "list_order": ["todo.outra_casa"]}},
            "rules": {"x1": {"entity_id": "todo.outra_casa", "uid": "zz", "summary": "Regar plantas", "days": 2}},
            "lists": [
                {"entity_id": "todo.outra_casa", "name": "Casa importada", "ha_name": "Casa", "items": [{"uid": "zz", "summary": "Regar plantas", "status": "needs_action"}, {"uid": "y", "summary": "Médico", "status": "needs_action", "due": "2026-11-05T09:00:00-03:00"}, {"uid": "w", "summary": "Feito antes", "status": "completed"}]},
                {"entity_id": "todo.mercado", "name": "Mercado", "items": [{"uid": "m", "summary": "Pão", "status": "needs_action"}]},
            ],
        }
        st, out = post("api/import", json.dumps(other).encode(), "outro.json")
        check(st == 200 and out["moved"] == 1 and out["added"] == 2 and out["missing"] == ["Mercado"], f"other HA: mapped by name ({out})")
        casa = (await items("todo.casa"))["items"]
        med = next((i for i in casa if i["summary"] == "Médico"), None)
        check(med and med.get("due", "").startswith("2026-11-05T12:00:00"), "datetime due restored as the same moment")
        check(not any(i["summary"] == "Feito antes" for i in casa), "completed items are not re-added")
        prefs = await ws({"type": "resolvia/prefs/get"})
        check(prefs["lists"].get("todo.casa", {}).get("name") == "Casa importada" and prefs["app"]["list_order"] == ["todo.casa"], "prefs moved to the local list")
        await pg.wait_for_timeout(500)
        rules = await pg.evaluate(RULES)
        regar = next(i for i in casa if i["summary"] == "Regar plantas")
        check(len(rules) == 1 and rules[0]["entity_id"] == "todo.casa" and rules[0]["uid"] == regar["uid"], "rule moved and bound")

        # ---- bad files
        st, out = post("api/import", b'{"foo": 1}', "x.json")
        check(st == 400 and "não é do ResolvIA" in out["error"], "foreign JSON refused")
        st, out = post("api/import", b"not json", "x.txt")
        check(st == 400, "garbage refused")
        r = await ws({"type": "resolvia/backups/restore", "name": "../../etc/passwd"})
        check("__error" in r, "backup name is validated")
        r = await ws({"type": "resolvia/versions/restore", "name": "../resolvia.json"})
        check("__error" in r, "version name is validated")

        check(not errs, f"no console errors {errs}")
        await b.close()


try:
    asyncio.run(main())
finally:
    app.terminate()
    fake.terminate()
print("errors:", ", ".join(failed) or "none")
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
