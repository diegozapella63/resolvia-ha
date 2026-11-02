# ResolvIA 2.9.1: share/resolvia/integracao.json tells how often each task comes back (repete).
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import subprocess, os, json, time, shutil
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvr-data", f"{SP}/rvr-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
env = dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123", TZ="America/Sao_Paulo")
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=env, stdout=open(f"{SP}/rvr_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
appenv = dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099")
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=appenv, stdout=open(f"{SP}/rvr_app.log", "w"), stderr=subprocess.STDOUT)
time.sleep(1.2)
passed, failed = 0, []
def check(c, label):
    global passed
    print(("PASS " if c else "FAIL ") + label, flush=True)
    if c: passed += 1
    else: failed.append(label)
def ws(msgs):
    js = """const msgs = JSON.parse(process.argv[1]); const ws = new WebSocket('ws://127.0.0.1:8099/ws'); const out = [];
ws.onopen = () => msgs.forEach((m, k) => ws.send(JSON.stringify({ id: k + 1, ...m })));
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.type === 'result') { out.push(m); if (out.length === msgs.length) { console.log(JSON.stringify(out)); ws.close(); } } };"""
    return json.loads(subprocess.check_output(["node", "-e", js, json.dumps(msgs)], timeout=20).decode())
def presence(): return json.load(open(f"{SHARE}/resolvia/integracao.json"))
def wait(fn, label, tries=40):
    for _ in range(tries):
        try:
            if fn(): return check(True, label)
        except Exception: pass
        time.sleep(0.25)
    check(False, label)
try:
    js = """const ws = new WebSocket('ws://127.0.0.1:8123/api/websocket'); ws.onmessage = (e) => { const m = JSON.parse(e.data);
 if (m.type === 'auth_required') ws.send(JSON.stringify({type:'auth', access_token:'test'}));
 else if (m.type === 'auth_ok') ws.send(JSON.stringify({id:1, type:'todo/item/list', entity_id:'todo.casa'}));
 else if (m.id === 1) { console.log(JSON.stringify(m.result.items)); ws.close(); } };"""
    lst = json.loads(subprocess.check_output(["node", "-e", js]).decode())
    check(len(lst) >= 2, f"read the Casa list ({len(lst)} items)")
    a, b = lst[0], lst[1]
    wait(lambda: presence().get("repete") == {}, "presence has repete (empty without rules)")
    r = ws([{"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": a["uid"], "summary": a["summary"], "days": 1},
            {"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": b["uid"], "summary": b["summary"], "days": 7}])
    check(all(x.get("success") for x in r), "two rules set (todo dia, toda semana)")
    wait(lambda: presence()["repete"] == {"todo.casa": {a["uid"]: 1, b["uid"]: 7}}, "the CronologIA learns how often each one comes back")
    ws([{"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": b["uid"], "summary": b["summary"], "days": 2}])
    wait(lambda: presence()["repete"]["todo.casa"][b["uid"]] == 2, "a changed rule is published again")
    ws([{"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": a["uid"], "summary": a["summary"], "days": 0}])
    wait(lambda: a["uid"] not in presence()["repete"].get("todo.casa", {}), "a removed rule leaves the file")
    check(presence()["versao"] == __import__("re").search(r'version: "([^"]+)"', open(RESOLVIA + "/resolvia/config.yaml").read()).group(1), "version (as in config.yaml)")
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
