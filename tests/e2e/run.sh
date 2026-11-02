#!/usr/bin/env bash
# Testes visuais: cada script sobe o Home Assistant simulado (dev/fake-ha.mjs) e o app,
# abre as telas no Chromium (Playwright) e confere o que aparece, clica e grava.
# As capturas de tela ficam em $E2E_TMP/shots e as saídas em $E2E_TMP/logs.
#
#   tests/e2e/run.sh              todos
#   tests/e2e/run.sh rv_rooms ...   só esses
#
# Precisa de node, python3 e playwright (pip install playwright; playwright install chromium).
# Os outros apps da família ficam ao lado deste repositório (ou nas variáveis E2E_*);
# um teste que precisa de um app que não está lá é pulado.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
PARENT="$(dirname "$ROOT")"
export E2E_CRONOLOGIA="${E2E_CRONOLOGIA:-$PARENT/cronologia-ha}"
export E2E_RESOLVIA="${E2E_RESOLVIA:-$PARENT/resolvia-ha}"
export E2E_GERENCIA="${E2E_GERENCIA:-$PARENT/gerencia-ha}"
export E2E_INVENTARIA="${E2E_INVENTARIA:-$PARENT/inventario-ha}"
export E2E_APPS="${E2E_APPS:-resolvia}"
export E2E_TMP="${E2E_TMP:-$(mktemp -d)}"
export TZ="${TZ:-America/Sao_Paulo}"
mkdir -p "$E2E_TMP/shots" "$E2E_TMP/logs"

cleanup() {
  pkill -f "^node $E2E_CRONOLOGIA" 2>/dev/null
  pkill -f "^node $E2E_RESOLVIA" 2>/dev/null
  pkill -f "$E2E_GERENCIA/.*server.py" 2>/dev/null
  pkill -f "$E2E_INVENTARIA/.*server.py" 2>/dev/null
  sleep 0.5
}
needs() { grep -v '_os.environ.get("E2E_' "$1" | grep -q "\b$2\b"; }

if [ $# -gt 0 ]; then names=("$@"); else names=($(cd "$HERE" && ls *.py | grep -v '_lib.py$' | sed 's/\.py$//' | sort)); fi
pass=0; fail=0; skip=0; bad=()
for t in "${names[@]}"; do
  f="$HERE/$t.py"
  [ -f "$f" ] || { echo "?? $t (não existe)"; bad+=("$t"); fail=$((fail+1)); continue; }
  miss=""
  for dep in GERENCIA INVENTARIA RESOLVIA CRONOLOGIA; do
    var="E2E_$dep"
    if needs "$f" "$dep" && [ ! -d "${!var}" ]; then miss="$miss ${dep,,}"; fi
  done
  if [ -n "$miss" ]; then echo "-- $t (pulado: falta$miss)"; skip=$((skip+1)); continue; fi
  cleanup
  timeout 400 python3 -u "$f" > "$E2E_TMP/logs/$t.txt" 2>&1
  code=$?
  last=$(tail -1 "$E2E_TMP/logs/$t.txt")
  if [ $code -ne 0 ] || grep -q "^FAIL\|Traceback" "$E2E_TMP/logs/$t.txt"; then
    echo "XX $t: $last"; grep -h "^FAIL\|Error" "$E2E_TMP/logs/$t.txt" | head -3 | sed 's/^/     /'
    bad+=("$t"); fail=$((fail+1))
  else
    echo "ok $t: $last"; pass=$((pass+1))
  fi
done
cleanup
echo
echo "$pass ok, $fail com falha, $skip pulados · capturas e saídas em $E2E_TMP"
[ $fail -eq 0 ] || { echo "Falharam: ${bad[*]}"; exit 1; }
