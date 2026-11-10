# Instruções para quem for mexer neste repositório (pessoas ou IAs)

ResolvIA é um app (add-on) do Home Assistant: as listas de tarefas (to-do) do HA com prazos, pontos, repetição, cômodos e equipamentos, sugestões e leitura por IA. Faz parte de uma família de apps do mesmo dono, que conversam entre si pelo Home Assistant:

| App | Repositório | O que é |
|---|---|---|
| ResolvIA | `diegozapella63/resolvia-ha` (este) | listas de tarefas, pontos, repetição |
| CronologIA | `diegozapella63/cronologia-ha` | calendário, rotinas, remédios, placar |
| InventarIA | `diegozapella63/inventario-ha` | inventário da casa: cômodos e itens (equipamentos) |
| GerencIA | `diegozapella63/gerencia-ha` | finanças: contas a pagar |
| CorrerIA | `diegozapella63/correria-ha` | o contato no WhatsApp e o servidor MCP do Claude e do Gemini: usa as ferramentas daqui |

O Home Assistant instala direto do GitHub (`repository.yaml` + `resolvia/config.yaml`), a partir da branch `main`. Por isso o JavaScript gerado da interface fica no repositório: o que está em `main` é o que os usuários recebem.

No `config.yaml`, `url` aponta para o repositório e `panel_admin: false` deixa o ResolvIA **aparecer para todos** na barra lateral, não só para administradores: as listas são da casa toda (cada pessoa vê as suas e as de todos, conclui e ganha pontos), então quem não é administrador também precisa abrir o app. O que só um administrador pode fazer (criar lista no Home Assistant, por exemplo) o próprio app esconde para os outros.

## Estrutura

```
resolvia/config.yaml            versão (o único lugar onde ela é escrita) e opções do app
resolvia/CHANGELOG.md           o que mudou em cada versão (o HA mostra ao atualizar)
resolvia/DOCS.md                manual do usuário (aba Documentação no HA)
resolvia/rootfs/app/server.js   servidor (Node 22, sem dependências: só módulos do Node)
resolvia/rootfs/app/lib/        regras: store.js (dados por tarefa), ai.js, recurring.js, inventario.js, data.js/restore.js,
                                correria.js (chave e arquivo do CorrerIA) e ferramentas.js (as ferramentas do CorrerIA)...;
                                version.js é gerado pelo build a partir do config.yaml (não editar)
resolvia/rootfs/app/www/        interface já gerada (não editar à mão)
frontend/src/                   código da interface (Lit): resolvia-panel.js e os mixins rooms.js, suggest.js, points.js...
preview/resolvia-preview.html   prévia gerada pelo build, abre sem servidor
dev/fake-ha.mjs                 Home Assistant simulado para desenvolver e testar
tests/                          testes (ver tests/README.md): tests/run.sh (unitários e integração), tests/e2e/run.sh (visuais)
tools/prints_readme.py          refaz as telas do README (docs/*.png), com uma casa inventada
```

Os dados de cada tarefa (pontos, cômodo, equipamento) ficam no app, pela chave `taskKey` (nome sem acentos, minúsculo, espaços únicos), não no HA.

## Checklist de toda mudança

1. Implementar. Servidor: só módulos nativos do Node (o WebSocket é o `lib/ws.js` próprio). Interface: Lit, em `frontend/src`.
2. Gerar a interface: `cd frontend && npm install && npm run build`. Faça commit também de `resolvia/rootfs/app/www/resolvia.js` e `preview/resolvia-preview.html`.
3. Testar: `tests/run.sh` (ou `npm test`: unitários e integração, uns 30 s) e os visuais ligados à mudança: `tests/e2e/run.sh rv_xxx ...` (ver tests/README.md). Toda mudança ou bug corrigido vem com o teste dele.
4. Subir a versão só em `resolvia/config.yaml` (`version:`) e rodar o build: ele leva a versão para o servidor (`resolvia/rootfs/app/lib/version.js`) e para a tela (`__APP_VERSION__`); `tests/version.test.mjs` confere os três e a seção do CHANGELOG. Correção = patch (2.30.1 → 2.30.2); novidade = minor (2.30.x → 2.31.0).
5. `resolvia/CHANGELOG.md` (começa com "# Mudanças"): nova seção no topo, em português, do ponto de vista de quem usa (o que mudou na tela, não no código).
6. `resolvia/DOCS.md` quando muda o comportamento ou aparece algo novo.
7. Commit em `main` com mensagem em português ("ResolvIA 2.31.0: ..."), `git pull --rebase` e push. O GitHub roda todos os testes a cada push (aba Actions).

## Testes

- `npm test`: unitários (`tests/*.test.mjs`) e de integração (`tests/integration/`), com `node:test`, sem instalar nada. Cada arquivo de integração sobe o HA simulado e o servidor em portas livres (o InventarIA é simulado por um servidor HTTP no próprio teste).
- `tests/e2e/run.sh`: testes visuais em Python + Playwright (`pip install playwright && playwright install chromium`). Precisam dos outros apps ao lado deste repositório (`../cronologia-ha`, `../inventario-ha`, `../gerencia-ha`) ou nas variáveis `E2E_*`. Usam as portas fixas 8099/8123/8097: não rode duas baterias ao mesmo tempo.
- Nos unitários, nunca dependa do relógio real (passe a data ou use `mock.timers`). A versão esperada nos testes vem do `config.yaml`.

## Arquivos idênticos na CronologIA

Estes arquivos têm cópia igual no `cronologia-ha`. Ao mudar um, mude o outro (e rode os testes dos dois):

- `frontend/src/equip-picker.js`, `frontend/src/chat.js` (a janela da Conversa), `frontend/src/voice.js`, `frontend/src/look.js`, `frontend/src/swipe.js`, `frontend/src/about.js` (Mais › Sobre), `frontend/src/selectsheet.js` (as caixas de seleção; igual também na MemorIA, GerencIA, InventarIA e EconomIA)
- `resolvia/rootfs/app/lib/voice.js`, `ws.js`, `zip.js`, `ha.js`, `usage.js`, `phones.js` (os celulares de cada pessoa) (na CronologIA, em `cronologia/rootfs/app/lib/`)

## Como os apps conversam

Pela pasta `/share` do Home Assistant e por eventos do HA. Mudar um formato aqui exige mudar o outro app junto.

- **ResolvIA → CronologIA**: este app grava `share/resolvia/integracao.json` (`prazos`, `sem_prazo`, `pontos`, `repete`, `comodos {lista, tarefas}`, `equipamentos {lista [{id, nome, comodo}], tarefas}`, `donos {lista: nome da pessoa}`). Em `tarefas`, o valor é um id ou, com vários equipamentos (e por isso vários cômodos), uma lista de ids; a CronologIA lê (função `publishPresence` no `server.js`).
- **CronologIA → ResolvIA**: `share/cronologia/integracao.json` (o placar e `donos_listas`, o De quem é antigo de lá, adotado uma vez), lido em `lib/placar.js`. O aviso de prazos vai para os celulares ligados a cada pessoa no Home Assistant: os apps olham para a pessoa, nunca para um aparelho escolhido neles.
- **Eventos**: `resolvia_comodo` (a CronologIA define o cômodo/equipamento de uma tarefa: `{entity_id, tarefa, comodo?, equipamento?, origem}`, onde comodo e equipamento são um id ou uma lista de ids), `resolvia_esquecer` (a CronologIA assume tarefas daqui: saem repetição, pontos, cômodo e equipamento), `cronologia_pontos` (este app soma, desfaz ou troca pontos no placar da CronologIA).
- **CorrerIA → ResolvIA** (o contrato é o mesmo para todos os apps da família; ver o AGENTS.md do CorrerIA): com **Mais › Configurações › Integrações › CorrerIA** ligado (`correria_on`, desligado por padrão, sem depender do Usar IA), este app grava `share/resolvia/correria.json` (`app: "resolvia"`, `nome`, `assunto`, `url`, `ip_url`, `chave`, `versao`, `ferramentas`, `gravado_em`; 600, atômico; chave própria em `/data/correria.key`, 600; `RESOLVIA_URL_INTERNA` troca o endereço no desenvolvimento) e responde, fora do ingress e só com `Authorization: Bearer <chave>` (comparada em tempo constante; desligado ou chave errada: 401), em `GET /api/integracao/ferramentas` → `{versao, instrucoes, ferramentas: [{nome, titulo, descricao, entrada (JSON Schema), grava, apaga}]}` e `POST` `{nome, argumentos, pessoa: {id, nome}, cliente}` → `{texto}` (400 `{erro}` dizendo o que vale; 404 ferramenta desconhecida; 502 o Home Assistant falhou). As ferramentas (`lib/ferramentas.js`: resumo, tarefas, repeticoes, pontos, criar_tarefa, editar_tarefa, concluir_tarefa, apagar_tarefa) seguem o que está ligado no app e fazem o que a tela faz, com as mesmas funções: as ações `todo.*`, o `Recurring` e o `Store` pela `taskKey`; os ids das tarefas são `todo.lista:<uid>`. A `pessoa` (o `user_id` do `person.*` no `usuarios` do placar, ou o nome) recebe os pontos ao concluir, pelo mesmo `pointsPlan`/`pointsDone` do `resolvia/points/done`. O último uso (`cliente`) aparece no cartão (`resolvia/correria/get`).
- **InventarIA**: `share/inventario/integracao.json` (`url`, `ip_url`, `chave`) e as rotas `/api/integracao/comodos` e `/api/integracao/itens` com `Authorization: Bearer <chave>` (`lib/inventario.js`). Cômodos e equipamentos são opcionais (**Mais › Integrações › InventarIA**), desligados por padrão.

## Como o dono gosta (interface)

- Tudo em português do Brasil, sem palavras em inglês na tela.
- **Menos é mais**: textos curtos, sem explicar o porquê quando ele já está logo abaixo, sem avisos repetidos ("Escolhidos pela IA." basta).
- Botões lado a lado com o mesmo tamanho e alinhados; nada torto.
- O que depende da IA respeita o interruptor **Usar IA**. O que depende de uma integração (cômodos, equipamentos, CronologIA) só aparece com ela ligada: filtros e opções de cômodos e equipamentos somem quando **Usar cômodos**/**Usar equipamentos** está desligado (o dono pediu: não faz sentido aparecer); um botão de ação que precisa de algo desligado fica inativo, com o porquê.
- Em http (sem https) não há câmera, microfone nem área de transferência: explicar em vez de abrir a galeria ou mostrar um botão que não funciona.
- **Sugestões** é a primeira aba e a tela onde o app abre, para já saber o que fazer: atrasados e hoje no alto, depois o Comece por aqui e o resto do que vence (a aba Prazos saiu na 2.48.0).
- Listas desmarcadas (inativas) ficam por último, recolhidas: em **Mais › Listas** e na aba **Listas** (`_renderFold`, o mesmo para todos os casos).
- **Inativos no fim, recolhidos**: o que está inativo, cancelado, encerrado, arquivado ou ignorado de propósito (por uma opção, como Nunca considerar) fica numa seção no fim da lista, recolhida por padrão, com o nome e a contagem (ex.: **Arquivados (3)**); abre num toque. Vale para todos os apps da família.
- **Caixas de seleção no visual do app**: nenhuma janela nativa do celular. Toda caixa de seleção abre pelo selectsheet.js; sugestões de texto (no lugar do `<datalist>`) e horários (sem AM/PM) também no visual do app; a caixa fechada igual aos outros campos (altura, cantos, seta), no claro e no escuro.
- Celular primeiro (390 px); com 1000 px ou mais, barra lateral. Tema claro e escuro.
- Relatórios (a página e o PDF, iguais em todos os apps): o cabeçalho dos apps (cartão com a faixa na cor do app, o ícone, Resolv**IA** · o que é o app, o título, a contagem e quando; a hora só ali, sem o nome da casa), **Voltar** e **Baixar PDF** lado a lado, os números, os gráficos da aba Gráficos e, no fim, a marca da CorrerIA Code como no **Sobre** (o raio no quadrado inclinado na cor do app, Correr**IA** Code e DESENVOLVIMENTO DE SOFTWARES); no PDF, a marca e o número da página no pé de cada página. O app do Home Assistant no Android não imprime: o PDF é feito pelo servidor e baixado.

**Padrão da família (igual em todos os apps)**
- Barra de baixo: o botão do meio é **Adicionar** (no EconomIA, a ação principal dele); **Buscar**, quando houver, é a 2ª aba; **Mais** é a última, com o ícone de três pontos.
- **Mais** é um menu: as funções do app, depois **Configurações** e por último **Sobre**. Os relatórios se chamam **Relatório de/do …**.
- **Configurações** em 4 abas, nesta ordem: **Integrações › Dados › Aparência › Opções**; abre em Integrações. Nenhuma função do app vira aba.
- **Integrações**, nesta ordem: os outros apps da família › CorrerIA › **IA do Home Assistant** (o Usar IA) › Falar › Uso da IA › Sensores.
- IA: as entradas se chamam **Colar mensagem**, **Escolher fotos** (ou **Escolher fotos ou PDF**, onde PDF vale) e **Digitalizar com IA**; a conversa recomeça em **Nova conversa**; o Voltar do celular fecha a Conversa.
- Palavras: **Apagar** (nunca Excluir); **Testar no meu celular**; **Home Assistant Cloud** (não Nabu Casa); recolhidos como **Nome (n)**; o CHANGELOG começa com "# Mudanças".
- **Dados**: Exportar › Backup na pasta share › Importar › Versões anteriores › Onde ficam os dados › Começar do zero.
- **Aparência**: o tema vale no aparelho (começa em Automático); a cor do app vale para a casa toda; uma paleta só, de 12 cores (Vermelho, Coral, Laranja, Ouro, Verde, Menta, Turquesa, Azul, Índigo, Lilás, Rosa, Grafite); a Cor do dia é a mesma em todos os apps (as 11 sem o Grafite, pelo número do dia).

## Conversa com o dono

Respostas curtas, em português. Ao terminar uma mudança: o que mudou, a versão e se está publicado.
