# Instruções para quem for mexer neste repositório (pessoas ou IAs)

ResolvIA é um app (add-on) do Home Assistant: as listas de tarefas (to-do) do HA com prazos, pontos, repetição, cômodos e equipamentos, sugestões e leitura por IA. Faz parte de uma família de apps do mesmo dono, que conversam entre si pelo Home Assistant:

| App | Repositório | O que é |
|---|---|---|
| ResolvIA | `diegozapella63/resolvia-ha` (este) | listas de tarefas, pontos, repetição |
| CronologIA | `diegozapella63/cronologia-ha` | calendário, rotinas, remédios, placar |
| InventarIA | `diegozapella63/inventario-ha` | inventário da casa: cômodos e itens (equipamentos) |
| GerencIA | `diegozapella63/gerencia-ha` | finanças: contas a pagar |

O Home Assistant instala direto do GitHub (`repository.yaml` + `resolvia/config.yaml`), a partir da branch `main`. Por isso o JavaScript gerado da interface fica no repositório: o que está em `main` é o que os usuários recebem.

## Estrutura

```
resolvia/config.yaml            versão e opções do app
resolvia/CHANGELOG.md           o que mudou em cada versão (o HA mostra ao atualizar)
resolvia/DOCS.md                manual do usuário (aba Documentação no HA)
resolvia/rootfs/app/server.js   servidor (Node 22, sem dependências: só módulos do Node)
resolvia/rootfs/app/lib/        regras: store.js (dados por tarefa), ai.js, recurring.js, inventario.js, data.js/restore.js...
resolvia/rootfs/app/www/        interface já gerada (não editar à mão)
frontend/src/                   código da interface (Lit): resolvia-panel.js e os mixins rooms.js, suggest.js, points.js...
preview/resolvia-preview.html   prévia gerada pelo build, abre sem servidor
dev/fake-ha.mjs                 Home Assistant simulado para desenvolver e testar
tests/                          testes (ver tests/README.md)
tools/prints_readme.py          refaz as telas do README (docs/*.png), com uma casa inventada
```

Os dados de cada tarefa (pontos, cômodo, equipamento) ficam no app, pela chave `taskKey` (nome sem acentos, minúsculo, espaços únicos), não no HA.

## Checklist de toda mudança

1. Implementar. Servidor: só módulos nativos do Node (o WebSocket é o `lib/ws.js` próprio). Interface: Lit, em `frontend/src`.
2. Gerar a interface: `cd frontend && npm install && npm run build`. Faça commit também de `resolvia/rootfs/app/www/resolvia.js` e `preview/resolvia-preview.html`.
3. Testar: `npm test` (unitários e integração, uns 20 s) e os visuais ligados à mudança: `tests/e2e/run.sh rv_xxx ...` (ver tests/README.md). Toda mudança ou bug corrigido vem com o teste dele.
4. Subir a versão nos três lugares (iguais): `resolvia/config.yaml` (`version:`), `resolvia/rootfs/app/server.js` (`const VERSION`) e `frontend/src/resolvia-panel.js` (`const VERSION`). Correção = patch (2.30.1 → 2.30.2); novidade = minor (2.30.x → 2.31.0).
5. `resolvia/CHANGELOG.md`: nova seção no topo, em português, do ponto de vista de quem usa (o que mudou na tela, não no código).
6. `resolvia/DOCS.md` quando muda o comportamento ou aparece algo novo.
7. Commit em `main` com mensagem em português ("ResolvIA 2.31.0: ..."), `git pull --rebase` e push. O GitHub roda todos os testes a cada push (aba Actions).

## Testes

- `npm test`: unitários (`tests/*.test.mjs`) e de integração (`tests/integration/`), com `node:test`, sem instalar nada. Cada arquivo de integração sobe o HA simulado e o servidor em portas livres (o InventarIA é simulado por um servidor HTTP no próprio teste).
- `tests/e2e/run.sh`: testes visuais em Python + Playwright (`pip install playwright && playwright install chromium`). Precisam dos outros apps ao lado deste repositório (`../cronologia-ha`, `../inventario-ha`, `../gerencia-ha`) ou nas variáveis `E2E_*`. Usam as portas fixas 8099/8123/8097: não rode duas baterias ao mesmo tempo.
- Nos unitários, nunca dependa do relógio real (passe a data ou use `mock.timers`). A versão esperada nos testes vem do `config.yaml`.

## Arquivos idênticos na CronologIA

Estes arquivos têm cópia igual no `cronologia-ha`. Ao mudar um, mude o outro (e rode os testes dos dois):

- `frontend/src/equip-picker.js`, `frontend/src/chat.js` (a janela da Conversa), `frontend/src/voice.js`, `frontend/src/look.js`, `frontend/src/swipe.js`, `frontend/src/about.js` (Mais › Sobre)
- `resolvia/rootfs/app/lib/voice.js`, `ws.js`, `zip.js`, `ha.js`, `usage.js`, `phones.js` (os celulares de cada pessoa) (na CronologIA, em `cronologia/rootfs/app/lib/`)

## Como os apps conversam

Pela pasta `/share` do Home Assistant e por eventos do HA. Mudar um formato aqui exige mudar o outro app junto.

- **ResolvIA → CronologIA**: este app grava `share/resolvia/integracao.json` (`prazos`, `sem_prazo`, `pontos`, `repete`, `comodos {lista, tarefas}`, `equipamentos {lista [{id, nome, comodo}], tarefas}`, `donos {lista: nome da pessoa}`). Em `tarefas`, o valor é um id ou, com vários equipamentos (e por isso vários cômodos), uma lista de ids; a CronologIA lê (função `publishPresence` no `server.js`).
- **CronologIA → ResolvIA**: `share/cronologia/integracao.json` (o placar e `donos_listas`, o De quem é antigo de lá, adotado uma vez), lido em `lib/placar.js`. O aviso de prazos vai para os celulares ligados a cada pessoa no Home Assistant: os apps olham para a pessoa, nunca para um aparelho escolhido neles.
- **Eventos**: `resolvia_comodo` (a CronologIA define o cômodo/equipamento de uma tarefa: `{entity_id, tarefa, comodo?, equipamento?, origem}`, onde comodo e equipamento são um id ou uma lista de ids), `resolvia_esquecer` (a CronologIA assume tarefas daqui: saem repetição, pontos, cômodo e equipamento), `cronologia_pontos` (este app soma, desfaz ou troca pontos no placar da CronologIA).
- **InventarIA**: `share/inventario/integracao.json` (`url`, `ip_url`, `chave`) e as rotas `/api/integracao/comodos` e `/api/integracao/itens` com `Authorization: Bearer <chave>` (`lib/inventario.js`). Cômodos e equipamentos são opcionais (**Mais › Integrações › InventarIA**), desligados por padrão.

## Como o dono gosta (interface)

- Tudo em português do Brasil, sem palavras em inglês na tela.
- **Menos é mais**: textos curtos, sem explicar o porquê quando ele já está logo abaixo, sem avisos repetidos ("Escolhidos pela IA." basta).
- Botões lado a lado com o mesmo tamanho e alinhados; nada torto.
- O que depende da IA respeita o interruptor **Usar IA**. O que depende de uma integração (cômodos, equipamentos, CronologIA) só aparece com ela ligada: filtros e opções de cômodos e equipamentos somem quando **Usar cômodos**/**Usar equipamentos** está desligado (o dono pediu: não faz sentido aparecer); um botão de ação que precisa de algo desligado fica inativo, com o porquê.
- Em http (sem https) não há câmera, microfone nem área de transferência: explicar em vez de abrir a galeria ou mostrar um botão que não funciona.
- Listas desmarcadas (inativas) ficam por último, recolhidas.
- Celular primeiro (390 px); com 1000 px ou mais, barra lateral. Tema claro e escuro.

## Conversa com o dono

Respostas curtas, em português. Ao terminar uma mudança: o que mudou, a versão e se está publicado.
