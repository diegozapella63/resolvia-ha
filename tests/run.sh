#!/usr/bin/env bash
# Unitários e integração (o mesmo que `npm test`): só Node 22, sem instalar nada, uns 30 segundos.
#   tests/run.sh                  todos
#   tests/run.sh tests/store.test.mjs ...   só esses arquivos
# Os visuais ficam em tests/e2e/run.sh.
set -eu
cd "$(dirname "$0")/.."
export TZ="${TZ:-America/Sao_Paulo}"
if [ $# -gt 0 ]; then exec node --test "$@"; fi
exec node --test 'tests/*.test.mjs' 'tests/integration/*.test.mjs'
