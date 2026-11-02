# ResolvIA 2.11.0: resolvia_esquecer (the CronologIA brought the tasks over) forgets repetition and points.
import os as _os
CRONOLOGIA = _os.environ.get("E2E_CRONOLOGIA", "")
RESOLVIA = _os.environ.get("E2E_RESOLVIA", "")
GERENCIA = _os.environ.get("E2E_GERENCIA", "")
INVENTARIA = _os.environ.get("E2E_INVENTARIA", "")
FIX = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "fixtures")
import subprocess, os, json, time, shutil, urllib.request
SP = _os.environ["E2E_TMP"]
REPO = RESOLVIA
DATA, SHARE = f"{SP}/rvf-data", f"{SP}/rvf-share"
for d in (DATA, SHARE): shutil.rmtree(d, ignore_errors=True)
os.makedirs(SHARE)
fake = subprocess.Popen(["node", f"{REPO}/dev/fake-ha.mjs"], env=dict(os.environ, FAKE_HA_TOKEN="test", FAKE_HA_PORT="8123"), stdout=open(f"{SP}/rvf_fake.log", "w"), stderr=subprocess.STDOUT)
time.sleep(0.6)
app = subprocess.Popen(["node", f"{REPO}/resolvia/rootfs/app/server.js"], env=dict(os.environ, TZ="America/Sao_Paulo", RESOLVIA_DEV="1", HA_WS_URL="ws://127.0.0.1:8123/api/websocket", HA_TOKEN="test", DATA_DIR=DATA, SHARE_DIR=SHARE, PORT="8099"), stdout=open(f"{SP}/rvf_app.log", "w"), stderr=subprocess.STDOUT)
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
def stored(): return json.load(open(f"{DATA}/resolvia.json"))
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
    items = json.loads(subprocess.check_output(["node", "-e", js]).decode())
    a, b = items[0], items[1]
    ws([{"type": "resolvia/prefs/set_app", "prefs": {"repeat_on": True, "points_on": True}},
        {"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": a["uid"], "summary": a["summary"], "days": 2},
        {"type": "resolvia/recurring/set", "entity_id": "todo.casa", "uid": b["uid"], "summary": b["summary"], "days": 7},
        {"type": "resolvia/points/set", "entity_id": "todo.casa", "summary": a["summary"], "points": 10},
        {"type": "resolvia/points/set", "entity_id": "todo.casa", "summary": b["summary"], "points": 5}])
    # a is done: its return is scheduled
    ws([{"type": "call_service", "domain": "todo", "service": "update_item", "service_data": {"item": a["uid"], "status": "completed"}, "target": {"entity_id": "todo.casa"}}])
    wait(lambda: any(r["uid"] == a["uid"] and r.get("reopen_at") for r in stored()["rules"].values()), "done task with a scheduled return")
    wait(lambda: len(presence()["repete"].get("todo.casa", {})) == 2, "two repetitions published")
    req = urllib.request.Request("http://127.0.0.1:8123/dev/fire", data=json.dumps({"event_type": "resolvia_esquecer", "data": {"entity_id": "todo.casa", "uids": [a["uid"]], "tarefas": [a["summary"]], "origem": "CronologIA"}}).encode(), method="POST")
    urllib.request.urlopen(req).read()
    wait(lambda: not any(r["uid"] == a["uid"] for r in stored()["rules"].values()), "its repetition is forgotten (it won't be created again)")
    check(any(r["uid"] == b["uid"] for r in stored()["rules"].values()), "the other task keeps its repetition")
    pts = stored()["points"].get("todo.casa", {})
    check(len(pts) == 1 and 5 in pts.values(), f"its points are gone, the other's stay ({pts})")
    wait(lambda: list(presence()["repete"].get("todo.casa", {}).keys()) == [b["uid"]], "the CronologIA sees only the other one repeating")
    check("Levadas para o CronologIA: 1 tarefas de todo.casa (1 repetições tiradas)" in open(f"{SP}/rvf_app.log").read(), "logged")
finally:
    app.terminate(); fake.terminate()
print(f"{passed} checks passed" if not failed else f"{len(failed)} FAILED, {passed} passed")
