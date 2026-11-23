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

- `tests/run.sh` (ou `npm test`): unitários (`tests/*.test.mjs`) e de integração (`tests/integration/`), com `node:test`, sem instalar nada. Cada arquivo de integração sobe o HA simulado e o servidor em portas livres (o InventarIA é simulado por um servidor HTTP no próprio teste).
- `tests/e2e/run.sh`: testes visuais em Python + Playwright (`pip install playwright && playwright install chromium`). Precisam dos outros apps ao lado deste repositório (`../cronologia-ha`, `../inventario-ha`, `../gerencia-ha`) ou nas variáveis `E2E_*`. Usam as portas 8099/8123/8097 (os scripts mais novos leem `E2E_APP_PORT` e `E2E_HA_PORT`), e o `run.sh` encerra, entre um script e outro, os servidores dos apps da família: não rode duas baterias ao mesmo tempo, nem junto com a de outro app na mesma máquina.
- Cobertura: veja "Cobertura" no `tests/README.md`.
- Nos unitários, nunca dependa do relógio real (passe a data ou use `mock.timers`). A versão esperada nos testes vem do `config.yaml`.

## Arquivos iguais em todos os apps

A lista dos arquivos que são iguais nos apps da família fica em `tools/iguais.py` (ele também é igual em todos):
`python3 tools/iguais.py` confere os daqui com os dos apps ao lado (`../resolvia-ha`, ...), e o GitHub confere a cada
push (job **Arquivos iguais aos dos outros apps**, que baixa os outros apps). Mudou um arquivo da lista? Copie para os
outros apps do grupo e publique todos. Um arquivo que passa a ser igual entra em `GRUPOS`, aqui e nas cópias.

`share/<app>/integracao.json` começa igual em todos os apps: `app` (o id, como no `correria.json`), `nome`, `versao` e
`gravado_em` (ISO 8601 com o fuso), depois os campos de cada app. O ResolvIA e o CronologIA ainda gravam o nome em
`app` (as versões de antes conferem por ele) e quem lê aceita os dois; o id entra numa próxima versão.

## Arquivos idênticos na CronologIA

Estes arquivos têm cópia igual no `cronologia-ha`. Ao mudar um, mude o outro (e rode os testes dos dois):

- `frontend/src/equip-picker.js`, `frontend/src/chat.js` (a janela da Conversa), `frontend/src/voice.js`, `frontend/src/look.js`, `frontend/src/swipe.js`, `frontend/src/about.js` (Mais › Sobre), `frontend/src/selectsheet.js` (as caixas de seleção; igual também na MemorIA, GerencIA, InventarIA e EconomIA), `frontend/src/hatema.js` (o fundo e os cartões do tema do Home Assistant; igual em todos os apps)
- `resolvia/rootfs/app/lib/voice.js`, `ws.js`, `zip.js`, `ha.js`, `usage.js`, `phones.js` (os celulares de cada pessoa), `correria.js` (a ligação com o CorrerIA, igual também no MemorIA) (na CronologIA, em `cronologia/rootfs/app/lib/`); `pdf.js` é igual ao do MemorIA

## Como os apps conversam

Pela pasta `/share` do Home Assistant e por eventos do HA. Mudar um formato aqui exige mudar o outro app junto.

- **ResolvIA → CronologIA**: este app grava `share/resolvia/integracao.json` (`prazos`, `sem_prazo`, `pontos`, `repete`, `comodos {lista, tarefas}`, `equipamentos {lista [{id, nome, comodo}], tarefas}`, `donos {lista: nome da pessoa}`). Em `tarefas`, o valor é um id ou, com vários equipamentos (e por isso vários cômodos), uma lista de ids; a CronologIA lê (função `publishPresence` no `server.js`).
- **CronologIA → ResolvIA**: `share/cronologia/integracao.json` (o placar e `donos_listas`, o De quem é antigo de lá, adotado uma vez), lido em `lib/placar.js`. O aviso de prazos vai para os celulares ligados a cada pessoa no Home Assistant: os apps olham para a pessoa, nunca para um aparelho escolhido neles.
- **Eventos**: `resolvia_comodo` (a CronologIA define o cômodo/equipamento de uma tarefa: `{entity_id, tarefa, comodo?, equipamento?, origem}`, onde comodo e equipamento são um id ou uma lista de ids), `resolvia_esquecer` (a CronologIA assume tarefas daqui: saem repetição, pontos, cômodo e equipamento), `cronologia_pontos` (este app soma, desfaz ou troca pontos no placar da CronologIA).
- **CorrerIA → ResolvIA** (o contrato é o mesmo para todos os apps da família; ver o AGENTS.md do CorrerIA): com **Mais › Configurações › Integrações › CorrerIA** ligado (`correria_on`, desligado por padrão, sem depender do Usar IA), este app grava `share/resolvia/correria.json` (`app: "resolvia"`, `nome`, `assunto`, `url`, `ip_url`, `chave`, `versao`, `ferramentas`, `gravado_em`; 600, atômico; chave própria em `/data/correria.key`, 600; `RESOLVIA_URL_INTERNA` troca o endereço no desenvolvimento) e responde, fora do ingress e só com `Authorization: Bearer <chave>` (comparada em tempo constante; desligado ou chave errada: 401), em `GET /api/integracao/ferramentas` → `{versao, instrucoes, ferramentas: [{nome, titulo, descricao, entrada (JSON Schema), grava, apaga}]}` e `POST` `{nome, argumentos, pessoa: {id, nome}, cliente}` → `{texto}` (400 `{erro}` dizendo o que vale; 404 ferramenta desconhecida; 502 o Home Assistant falhou). As ferramentas (`lib/ferramentas.js`: resumo, tarefas, repeticoes, pontos, criar_tarefa, editar_tarefa, concluir_tarefa, apagar_tarefa) seguem o que está ligado no app e fazem o que a tela faz, com as mesmas funções: as ações `todo.*`, o `Recurring` e o `Store` pela `taskKey`; os ids das tarefas são `todo.lista:<uid>`. A `pessoa` (o `user_id` do `person.*` no `usuarios` do placar, ou o nome) recebe os pontos ao concluir, pelo mesmo `pointsPlan`/`pointsDone` do `resolvia/points/done`. O último uso (`cliente`) aparece no cartão (`resolvia/correria/get`).
- **InventarIA**: `share/inventario/integracao.json` (`url`, `ip_url`, `chave`) e as rotas `/api/integracao/comodos` e `/api/integracao/itens` com `Authorization: Bearer <chave>` (`lib/inventario.js`). Cômodos e equipamentos são opcionais (**Mais › Integrações › InventarIA**), desligados por padrão. **Usar bens** (2.79.0; `bens_on`, desligado de início desde a 2.80.0: só `true` liga): desligado, o `lib/inventario.js` tira a área Bens (o cômodo com `tipo: "bens"`) e os itens dela de tudo (a tela, a IA, as ferramentas e o arquivo da CronologIA); `state.bens` diz que o InventarIA tem a área (sem ela, a chave fica presa: "O InventarIA não usa bens."). No item, **Nenhum | Casa | Bens** (`_whereOf` em `rooms.js`): Nenhum é onde um item novo começa, sem Cômodo nem Equipamento.

## Como o dono gosta (interface)

- Tudo em português do Brasil, sem palavras em inglês na tela.
- **Menos é mais**: textos curtos, sem explicar o porquê quando ele já está logo abaixo, sem avisos repetidos ("Escolhidos pela IA." basta).
- Botões lado a lado com o mesmo tamanho e alinhados; nada torto.
- O que depende da IA respeita o interruptor **Usar IA**. O que depende de uma integração (cômodos, equipamentos, CronologIA) só aparece com ela ligada: filtros e opções de cômodos e equipamentos somem quando **Usar cômodos**/**Usar equipamentos** está desligado (o dono pediu: não faz sentido aparecer); um botão de ação que precisa de algo desligado fica inativo, com o porquê.
- Em http (sem https) não há câmera, microfone nem área de transferência: explicar em vez de abrir a galeria ou mostrar um botão que não funciona.
- **Agora** (Sugestões até a 2.59) é a primeira aba e a tela onde o app abre, para já saber o que fazer: atrasados e hoje no alto, depois o Comece por aqui e o resto do que vence (a aba Prazos saiu na 2.48.0); cada card com o seu ícone, na ordem de cada pessoa (**Ordem dos cards**, `now_order`, como no CronologIA).
- **De quem é** é uma opção (2.79.0; **Opções › Exibição**, `owners_on`, desligada de início; uma casa que já tinha uma lista de uma pessoa é ligada uma vez, no `server.js`): desligada, some do Buscar e do Personalizar, o servidor trata toda lista como de todos (`ownerOf`: o aviso de prazos, as ferramentas, o relatório e o `donos` da CronologIA) e o que estava escolhido fica guardado.
- **Fotos na tarefa** (2.81.0; `frontend/src/photos.js`, `PhotosMixin`; 2.83.0: no Novo item ficam no bloco de cima, **Fotos e mensagens**, `_renderImportTiles(run, {anexar})`, em duas linhas com o nome de cada uma, `.imp-sub`: Ler com a IA e Anexar na tarefa, `_renderPhotosField(f, {inline: true})`; no Editar item, o campo Fotos logo abaixo do Item): no item, **Tirar foto** (`<input capture>`: a câmera do celular, também em http) e **Escolher fotos**, até 6 (`MAX_PHOTOS`); a tela diminui para 1600 px em JPEG (`shrinkPhoto`) e manda por `POST api/photo` → `{file}`; `GET api/photo/<16 hex>.jpg` mostra. O servidor guarda os arquivos em `/data/fotos` e de qual tarefa são em `data.photos` (`{todo.x: {taskKey: [arquivo]}}`, `store.setPhotos`, comandos `resolvia/photos/get|set`); um arquivo que nenhuma tarefa tem mais é apagado (`sweepPhotos`; os enviados e não salvos, depois de uma hora, ao iniciar). As ferramentas do CorrerIA dizem quantas fotos a tarefa tem (`fotos`) e levam as fotos junto ao renomear ou mover; 2.82.0: a `anexar_foto` (`anexo: ["image/jpeg"]`; o CorrerIA 1.17.0 manda a foto da conversa em `anexo`, fora dos argumentos; o pedido da rota aceita até 8 MB) guarda a foto numa tarefa (`c.addPhoto`); tirar uma foto, só pela tela. 2.82.0: as fotos em uso vão no .zip do Exportar e do Backup (`fotos/<arquivo>`, `backupZip(snap, version, photos)`) e voltam no Importar e no Restaurar (`parseImport` devolve `fotos_do_zip`, fora dos dados; `putPhotos`); não vão para a IA. Ao iniciar, só sai um arquivo sem tarefa parado há 30 dias (uma versão anterior pode querer a foto).
- 2.80.0: **Agora › Compras** mostra os itens no cartão (`SHOP_MAX` de cada lista, `suggest.js`); **Personalizar › Opções** (`.field[data-f="opcoes"] > .opt-rows`, que fecha como os outros campos); os pontos em `.chip-row.grid.pts-row`; na alteração em lote, **Onde** (`f.where`: Manter, Nenhum, Casa, Bens; `.seg.where.four`) antes do Cômodo e do Equipamento, só com a área Bens.
- **Selecionar** acaba ao sair da tela (2.79.0; `willUpdate` zera `_bsel` e `_sel` quando o caminho muda).
- Listas desmarcadas (inativas) ficam por último, recolhidas: em **Mais › Listas** e na aba **Listas** (`_renderFold`, o mesmo para todos os casos: o `offFold` de `frontend/src/offfold.js`, a linha fina dos outros apps, com a seta antes do nome, como o **Ocultos (n)** da CronologIA; na aba Listas, 2.80.0, a linha fica no fim do cartão das listas, as de cada grupo no cartão do grupo, `.panel.grp > .inact-grp`).
- **Inativos no fim, recolhidos**: o que está inativo, cancelado, encerrado, arquivado ou ignorado de propósito (por uma opção, como Nunca considerar) fica numa seção no fim da lista, recolhida por padrão, com o nome e a contagem (ex.: **Arquivados (3)**); abre num toque. Vale para todos os apps da família.
- **Caixas de seleção no visual do app**: nenhuma janela nativa do celular. Toda caixa de seleção abre pelo selectsheet.js; sugestões de texto (no lugar do `<datalist>`) e horários (sem AM/PM) também no visual do app; a caixa fechada igual aos outros campos (altura, cantos, seta), no claro e no escuro.
- Celular primeiro (390 px); com 1000 px ou mais, barra lateral. Tema claro e escuro.
- Relatórios (a página e o PDF, iguais em todos os apps): o cabeçalho dos apps (cartão com a faixa na cor do app, o ícone, Resolv**IA** · o que é o app, o título, a contagem e quando; a hora só ali, sem o nome da casa), **Voltar** e **Baixar PDF** lado a lado, os números, os gráficos da aba Gráficos e, no fim, a marca da CorrerIA Code como no **Sobre** (o raio no quadrado inclinado na cor do app, Correr**IA** Code e DESENVOLVIMENTO DE SOFTWARES); no PDF, a marca e o número da página no pé de cada página. O app do Home Assistant no Android não imprime: o PDF é feito pelo servidor e baixado.

**Padrão da família (igual em todos os apps)**
- Barra de baixo: a primeira aba é **Agora** (onde o app abre, com o ícone do relógio; nada de Início); o botão do meio é **Adicionar** (no EconomIA, a ação principal dele), só com o ícone, sem o texto embaixo (o nome fica no `aria-label`); **Buscar**, quando houver, é a 2ª aba; **Mais** é a última, com o ícone de três pontos.
- **Ícones**: toda seção (cartão) começa com o cabeçalho, o ícone e o título; o título de cada tela, de cada grupo (como Imóveis e Veículos) e de cada janela (Novo cômodo, Nova despesa… e a lista de uma caixa de seleção) também tem o ícone; dentro de uma seção, toda linha com título (uma chave, uma escolha, um campo, um recolhido como **Últimas chamadas**) tem um ícone pequeno antes do título; e todo botão com texto tem ícone (Cancelar, Salvar, Voltar, Hoje…). Assim dá para ver onde cada parte começa. Aqui: o `lbl-ic` no `.label`/`.flabel`, `PAGE_IC` (o título das telas), o `sh-ic` no título das janelas, `quickIc` (as datas), o quadro `.sub-op > .sub-box` e as abas com `_markTabs`.
- **Seções**: cada seção principal é um cartão (o fundo, a borda e os cantos arredondados, como no GerencIA), sem linha no fim; entre as linhas de opções de uma seção não há linha (o ícone de cada uma marca onde começa); as listas de dados (as listas, as tarefas que se repetem, os itens) têm a linha fina entre as entradas, sem a do fim.
- **Sub-opções**: o que só vale com uma chave ligada (o Horário e o A cada do Conferir sozinho, o Quem recebe e o Testar do Avisar no celular, uma lista como Apps detectados) fica num quadro recuado logo abaixo dela, para ver de qual opção é.
- **Abas**: quando as abas não cabem na largura, a ponta de onde há mais some aos poucos, com uma seta.
- **Contrair e expandir**: toda seção (cartão) fecha e abre num toque no cabeçalho, com a seta no canto; o aparelho lembra as que ficaram fechadas. Aqui: `_applyFolds` (a cada render, em todo `.panel > .mais-head`) e `_toggleFold`; a chave é o id do cartão, o `data-card` ou o título, guardada em `resolvia-fechadas` no localStorage. Nas janelas, cada campo de escolhas (`.field` com `.chip-row`, `.imp-tiles` ou `.eq-pick`; 2.78.0: e as **Notas**, o `textarea[data-fold]`, logo acima de Lista, que fechadas mostram o começo do texto, `.shut-val`) fecha pelo título (`_applyFieldFolds`/`_toggleField`, `resolvia-campos`, a chave é o título); fechado, some tudo menos o título. O **Filtros** e as listas do Buscar fecham mas não ficam guardados (`_incluirShut`, `_searchShut`).
- Nada de avisos que só incham a tela: o que a própria tela já mostra, o que a pessoa confere de qualquer jeito ou um limite do app do celular ("a galeria manda uma foto por vez", "Você confere antes de criar", "a IA encontra…") fica de fora (a aba Documentação pode explicar).
- Botões de ação (Novo…, Verificar de novo, Salvar e testar…) na largura do cartão no celular, dois lado a lado dividindo a linha; no computador, com a largura fixa do app (250 ou 280 px). Campos de texto livre que podem ficar longos (o que foi, títulos, descrições, nomes de tarefas, de cômodos, de blocos, de categorias) são caixas de texto que mostram tudo e aumentam puxando o canto (`textareas.js`), nunca uma linha que corta o texto; o Enter salva quando o campo é de uma linha só.
- **Mais** é um menu: as funções do app, depois **Configurações** e por último **Sobre**. Os relatórios se chamam **Relatório de/do …**.
- **Configurações** em 4 abas, nesta ordem: **Integrações › Dados › Aparência › Opções**; abre em Integrações. Nenhuma função do app vira aba.
- **Integrações**, nesta ordem: os outros apps da família › CorrerIA › **IA** (o Usar IA e a IA de cada uso: **Para conversar**, **Para ler fotos e PDFs** e, onde há busca na web, **Para pesquisar na internet**; cada uma é uma tarefa de IA do Home Assistant, e a de fotos ou de pesquisa vazia é igual à de conversar) › Falar › Uso da IA › Sensores.
- IA: as entradas se chamam **Colar mensagem**, **Escolher fotos** (ou **Escolher fotos ou PDF**, onde PDF vale) e **Digitalizar com IA**; a conversa recomeça em **Nova conversa**; o Voltar do celular fecha a Conversa.
- Palavras: **Apagar** (nunca Excluir); **Testar no meu celular**; **Home Assistant Cloud** (não Nabu Casa); recolhidos como **Nome (n)**; o CHANGELOG começa com "# Mudanças".
- Avisos no celular (todos chegam como Home Assistant): o título começa pelo nome do app, uma vez só ("ResolvIA · 📅 Vence hoje"), e o ícone pequeno é o do app (`notification_icon`); o canal e o grupo de cada aviso ficam como estão (o canal guarda o som e a importância que a pessoa escolheu no Android).
- **Dados**: Exportar › Backup na pasta share › Importar › Versões anteriores › Onde ficam os dados › Começar do zero.
- **Aparência**: o tema vale no aparelho (começa em Sistema); o fundo e os cartões são os do tema do Home Assistant (`hatema.js`, igual em todos os apps: publica `--ha-bg-light`, `--ha-card-light`, `--ha-bg-dark` e `--ha-card-dark`, as do modo de agora lidas do Home Assistant e as do outro, do tema padrão dele; os cinzas, como linhas e campos, saem do cartão misturado com o texto, `color-mix`, nunca uma cor fixa puxada para a cor do app); a cor do app vale para a casa toda; uma paleta só, de 12 cores (Vermelho, Coral, Laranja, Ouro, Verde, Menta, Turquesa, Azul, Índigo, Lilás, Rosa, Grafite); a Cor do dia é a mesma em todos os apps (as 11 sem o Grafite, pelo número do dia).

2.84.0: **Quem faz** aparece no item de toda lista (o dono: "deve aparecer sempre"), só não com Serviços externos desligado. `frontend/src/teclado.js` (`tecladoCalmo`, chamado na entrada da tela; o mesmo código em todos os apps): com o foco num campo de texto, ou quando o teclado muda a altura da tela, as páginas em volta do app (a do Home Assistant) voltam para o começo. `SO_MATERIAL`/`soMaterial` no `lib/ai.js`: a guarda na frente de toda instrução que vai para a IA (o `tests/ai-guarda.test.mjs` confere que nenhuma chamada fica sem).

2.84.1: na Conversa, no celular (`noCelular()`: `(hover: none) and (pointer: coarse)`, o dedo como jeito principal), o Enter é uma linha nova e o botão envia (`enterkeyhint="enter"`); com teclado de verdade, o Enter envia. Vale em todos os apps da família. O foco ao abrir o Novo item vai com `preventScroll`.

2.85.0: **Buscar › Agrupar por** (`.agrupar`, dentro dos Filtros; `resolvia-buscar-agrupar` no aparelho): **Lista** (como sempre), **Prazo** (`_byDue`: os `DUE_GROUPS` do Agora, depois Sem prazo e, com os Concluídos, Concluídos; o mais próximo primeiro) e, com Usar cômodos, **Cômodo** (`_byRoom`: os cômodos na ordem do InventarIA, a tarefa de vários no primeiro, depois Sem cômodo). Cada grupo é um `.search-list` com `data-group` e fecha pelo nome; Selecionar vale igual. Testes: `tests/e2e/rv_agrupar.py` e o `rv_rooms.py`.

2.86.0: `?aba=buscar&comodo=<nome>` (o link de uma ronda do CorrerIA 1.22.0; `deeplink.js`: `TABS_OPEN.buscar` e `openRoom()`): o Buscar agrupado por Cômodo só nessa visita (`_searchGroup`, sem gravar no aparelho), com os outros grupos fechados (`_openRoom`, no render do Buscar).

2.86.1: o mesmo link também pelo resto do endereço (`/app/<slug>/buscar/comodo/<nome>`), que o painel do Home Assistant passa por mensagem (`watchHaPath` e `haLink` no `deeplink.js`, como o InventarIA): vale para a tela que já estava aberta, onde o `?aba=` não é lido de novo.

2.87.0: a ferramenta `ler_arquivo` (leitura; `anexo`: os tipos do `anexos.js`, foto ou PDF; o CorrerIA 1.24.0 manda o arquivo da conversa também às de leitura): o `ai.extract` da tela (`c.ler` no `server.js`, que respeita o Usar IA) e devolve os itens com a lista sugerida, sem criar nada; a IA do CorrerIA cria depois com `criar_tarefa`. O pedido da rota aceita 22 MB.

2.88.0: as lembranças da casa (a Memória da IA do CorrerIA 1.28.0, em `share/correria/lembrancas.json`: `{lembrancas: [frases]}`) vão na frente de toda instrução da IA daqui, logo depois da guarda, só com a opção CorrerIA ligada: `lib/lembrancas.js` (`lerLembrancas`, `lembrancasTexto`, relido uma vez por minuto; igual nos três apps em Node, em `tools/iguais.py`), o `comLembrancas` do `lib/ai.js` (dentro do `soMaterial`) e, no `server.js`, `comLembrancas(() => (correriaOn() ? lembrancasTexto() : ""))`; `LEMBRANCAS_ARQ` troca o arquivo nos testes (`tests/lembrancas.test.mjs`).

2.89.0 (o dono: "e se eu não usar o CorrerIA e só decidir usar o InventarIA e o ResolvIA?"; "memória compartilhada"; "deixa claro na observação das opções que a memória é compartilhada"): a **Memória da IA** é uma só, da casa, de todos os apps, em `share/familia/memoria_ia.json` (`{versao: 1, gravado_em, lista: [{id, texto, em, app, quem?}]}`, até 60 frases de 240 letras, 600; `MEMORIA_IA_ARQ` troca o arquivo nos testes), e não depende mais da opção CorrerIA nem do arquivo do CorrerIA (o `share/correria/lembrancas.json` acabou). `lib/memoria-ia.js` (igual nos três apps em Node, no lugar do `lib/lembrancas.js`; nos em Python, `memoria_ia.py`: `ler`, `lembrar`, `esquecer`, `memoriaTexto`, `comando`; lê de novo a cada 30 s e antes de gravar), os comandos `resolvia/memoria_ia/get|add {texto}|del {frase}` → `{lista, max}` (o `id` da mensagem é do WebSocket) e, no `server.js`, `comLembrancas(() => memoriaIa.memoriaTexto(MEMORIA_ARQ))`; na tela, o `frontend/src/memoria-ia.js` (`MemoriaIaMixin`, igual nos três: `_renderMemoriaIa()` logo depois do `_renderAiPanel()`, só com Usar IA ligado; quem usa oferece o `_memoriaIaCall`). Testes: `tests/memoria-ia.test.mjs` e `tests/integration/memoria-ia.test.mjs`. O texto do cartão é o mesmo em todos os apps: «Uma memória só, da casa, compartilhada por todos os apps: o que você escreve aqui a IA lembra em toda conversa, em qualquer um deles.» A memória não entra no Exportar nem no Começar do zero de um app.

2.89.1: o link da ronda (`_openRoom`) vale enquanto o Buscar está na tela e ninguém abre ou fecha um grupo: fechado é todo grupo que não é o cômodo do link (`only`, no render do Buscar), porque as listas e os cômodos chegam aos poucos e um conjunto de ids fechados feito num render deixava os de depois abertos (era o que o `rv_rooms` pegava no GitHub desde a 2.86.0). O primeiro toque num grupo vira o `_searchShut` de sempre; mudar o Agrupar por ou sair do Buscar acaba com ele.

2.89.2: o cartão Memória da IA lê a lista de novo quando a última leitura tem mais de meio minuto (`MEMORIA_IA_RELER_MS`, `_memIaAt` no `frontend/src/memoria-ia.js`): antes lia uma vez só por abertura do app e não mostrava o que outro app escreveu.

## Conversa com o dono

Respostas curtas, em português. Ao terminar uma mudança: o que mudou, a versão e se está publicado.
