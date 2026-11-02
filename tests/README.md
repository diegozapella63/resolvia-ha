# Testes do ResolvIA

Três camadas, todas rodando a cada push no GitHub (aba Actions):

| Camada | Onde | Como rodar | O que confere |
|---|---|---|---|
| Unitários | `tests/*.test.mjs` | `npm run test:unit` | cada parte do servidor (`resolvia/rootfs/app/lib`) e as partes puras da tela, sem Home Assistant |
| Integração | `tests/integration/*.test.mjs` | `npm run test:integration` | o servidor de verdade contra o Home Assistant simulado (`dev/fake-ha.mjs`), pelo WebSocket e pelo HTTP: listas, pontos, cômodos e equipamentos (com um InventarIA simulado), IA, Falar, exportar e restaurar, segurança |
| Visuais | `tests/e2e/*.py` | `tests/e2e/run.sh` | as telas no Chromium (Playwright): clica, digita, confere o que aparece e grava capturas de tela |

Os visuais cobrem: itens (adicionar, colar várias linhas, editar, prazo e horário, concluir, Desfazer, excluir, reordenar, mover, Limpar concluídos: `rv_items`), o que cada tipo de lista permite (`rv_features`), Buscar (`rv_search`), Prazos (`rv_due`), Mais › Listas (`rv_lists`), queda e volta da conexão (`rv_reconnect`), repetição (`rv_e2e`, `rv_repeat`), e cada recurso nos demais `rv_*.py` (dados, IA, Falar, pontos, cômodos, sugestões, computador, aparência). Os scripts novos leem as portas de `E2E_HA_PORT` e `E2E_APP_PORT` (padrão 8123 e 8099).

`npm test` roda as duas primeiras (só Node 22, sem instalar nada; uns 20 segundos). Os visuais precisam de `python3` e `pip install playwright && playwright install chromium`, e dos outros apps da família ao lado deste repositório (`../cronologia-ha`, `../inventario-ha`, `../gerencia-ha`) ou nas variáveis `E2E_*`; um teste que precisa de um app que não está lá é pulado. As capturas ficam em `$E2E_TMP/shots`.

`npm run test:coverage` mostra quanto do código os testes percorrem.
