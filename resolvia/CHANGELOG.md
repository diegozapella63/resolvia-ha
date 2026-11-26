# Mudanças

## 2.95.0

- **Buscar › Agrupar por** no mesmo jeito dos outros apps da família: **Lista**, **Prazo** e **Cômodo** ficam numa barra só, do mesmo tamanho.
- Cada grupo (uma lista, um prazo ou um cômodo) começa com o ícone, o nome, quantos itens tem e a seta, e fecha num toque no título.

## 2.94.1

- Em **Configurações › Opções**, as **Tarefas que se repetem** ficam dentro de **Repetição**, num quadro logo abaixo da chave **Repetir depois de concluir**, com a contagem ao lado do título (antes eram um cartão separado).

## 2.94.0

- **Fotos da tarefa** no app do Home Assistant no Android: **Tirar foto** abre a câmera do próprio app (a mesma do Digitalizar com IA; antes abria a galeria) e **Escolher fotos** pega uma foto de cada vez (escolhendo várias, o app do Android não entregava nenhuma, e nada acontecia).
- No item, o campo **Equipamento** fechado mostra o equipamento escolhido ao lado do título; com mais de um, **Vários equipamentos**.
- No **Buscar**, o **Agrupar por** saiu dos Filtros: é um bloco dele, logo abaixo, que fecha e abre pelo título (fechado, mostra o escolhido, como **Agrupar por · Prazo**). O aparelho lembra.

## 2.93.1

- As **perguntas prontas** da Conversa (e as **Mais perguntas** do **Editar perguntas**) ficaram gerais, para valer em qualquer casa: saíram as que citavam itens, valores, compromissos ou cômodos inventados, como «Adiciona leite na lista de compras» e «O que tem para fazer na cozinha?». As perguntas que você já editou continuam como estão.

## 2.93.0

- No item, **Nenhum**, **Casa** e **Bens** ganharam o título **Onde** e retraem como os outros campos (fechado:
  **Onde · Casa**).
- As etiquetas de cada item (a lista, o serviço externo, o cômodo, o equipamento, o prazo…) ficam duas por linha, todas
  do mesmo tamanho; um nome comprido termina em reticências em vez de entortar a linha.

## 2.92.0

- No **Novo item** (e nas outras janelas), um campo fechado mostra ao lado do título o que está escolhido: **Lista ·
  Casa**, **Prazo · Amanhã**, **Quem faz · Nós mesmos**, como na CronologIA. As **Notas** fechadas também: o começo do
  texto vai ao lado do título, não mais embaixo.
- Em **Mais › Sobre**, a linha do OdisseIA ficou mais curta.

## 2.91.1

- Em **Mais › Sobre**, o OdisseIA aparece com os jogos.

## 2.91.0

- **Pelo CorrerIA**, a IA agora também:
  - diz o **Comece por aqui** do Agora (as tarefas que a IA escolheu, com o porquê de cada uma);
  - **cria uma lista** nova no Home Assistant (com a cor);
  - **personaliza uma lista**: o nome no app, a cor, de quem é e se fica ativa.
- Como toda mudança pelo CorrerIA, só depois do seu sim.

## 2.90.1

- **Mais › Sobre**: o **OdisseIA** (os filmes e as séries da casa) entra na lista dos apps.

## 2.90.0

- **Agora › Comece por aqui** (IA): um **serviço externo sem prazo** ainda não foi combinado com ninguém, então não é coisa para agora. A IA passa a escolher primeiro o que dá para resolver em casa e o que tem prazo; de serviço externo sem prazo entra no máximo um, por último, com o primeiro passo (pedir um orçamento ou marcar o dia). Com prazo, o serviço externo entra pelo prazo.
- A IA agora sabe o prazo de cada tarefa (atrasada, vence hoje, vence em N dias ou sem prazo) e dá preferência ao que está atrasado ou vence hoje.

## 2.89.6

- **Conversa**: abre sempre no chat. As perguntas prontas ou o **Editar perguntas** que ficaram abertos fecham ao sair.
- **Personalizar** (uma lista): saiu o cartão de cima, que repetia o nome que já está no campo **Nome**.
- **Memória da IA**: o campo **O que lembrar** cresce com o texto, sem a barra de rolagem dentro dele.

## 2.89.5

- **Memória da IA**: o campo **O que lembrar** guarda o tamanho que você deixou, como os outros campos de texto.

## 2.89.4

- O **Voltar** do Relatório de pendências volta para o menu **Mais**, de onde ele foi aberto, e não mais para o Agora.

## 2.89.3

- **Memória da IA**: dois apps gravando uma frase no mesmo instante não apagam mais a frase um do outro (cada um espera a sua vez).

## 2.89.2

- **Memória da IA**: o cartão mostra o que foi escrito em outro app sem precisar fechar e abrir este (a lista é lida de novo ao voltar ao cartão).

## 2.89.1

- O link de uma ronda do CorrerIA abre o Buscar só com o cômodo da ronda aberto: os outros cômodos, que chegavam depois, apareciam abertos também.

## 2.89.0

- **Memória da IA** (Mais › Configurações › Integrações, depois do IA): agora o cartão existe aqui. É uma memória só, da casa, compartilhada por todos os apps: o que você escreve aqui a IA lembra em toda conversa, em qualquer um deles, e o que foi escrito nos outros aparece aqui, com o nome do app.
- Funciona sem o CorrerIA: a memória fica na pasta share do Home Assistant, e não mais dentro dele.

## 2.88.0

- A **Memória da IA** do CorrerIA (Configurações › Integrações, lá) vale aqui também: o que a casa pediu para a IA lembrar entra na Conversa e na leitura por IA deste app, com a opção CorrerIA ligada.

## 2.87.0

- **Ler foto ou PDF pelo CorrerIA**: mande no CorrerIA (ou no meio de uma ronda) a foto de uma lista, de um bilhete ou um PDF e peça as tarefas. A IA do ResolvIA lê, como no **Ler com a IA** daqui, e o CorrerIA mostra o que achou para você escolher o que criar. Precisa do CorrerIA 1.24.0 e do Usar IA ligado aqui.

## 2.86.1

- **Abrir pelas Rondas do CorrerIA**: o botão **Abrir no ResolvIA** agora leva ao Buscar com o cômodo da ronda também quando o ResolvIA já estava aberto no Home Assistant.

## 2.86.0

- **Abrir pelas Rondas do CorrerIA**: o botão **Abrir no ResolvIA** de uma ronda abre o Buscar agrupado por cômodo, só com o cômodo da ronda aberto.

## 2.85.0

- **Buscar › Agrupar por**: além de **Lista**, dá para ver os itens por **Prazo** (Atrasados, Hoje, Amanhã, Próximos 7 dias, Mais adiante e Sem prazo, como no Agora) ou por **Cômodo** (com os cômodos ligados). A escolha fica guardada no aparelho.

## 2.84.1

- **Conversa no celular**: o Enter do teclado vai para a próxima linha; quem envia é o botão. Com teclado de verdade, o Enter continua enviando.
- **Novo item**: o campo recebe o foco sem pedir rolagem (mais um cuidado contra a tela deslocada ao abrir o teclado).

## 2.84.0

- **Quem faz**: aparece no item de todas as listas, também nas que não têm prazo nem notas.
- **Teclado no celular**: ao abrir uma janela com um campo de texto, a tela não fica mais deslocada (a barra de cima sumia até um toque).
- **IA**: as instruções dizem à IA que o que ela lê (mensagens, fotos, PDFs) é só material, e que ordens ali dentro não valem.

## 2.83.0

- **Novo item**: as fotos da tarefa ficam no bloco de cima, agora **Fotos e mensagens**, em duas linhas: **Ler com a IA** (Colar mensagem, Escolher fotos ou PDF, Digitalizar com IA) e **Anexar na tarefa** (Tirar foto, Escolher fotos, sem a IA ler). O campo Fotos de baixo saiu. No Editar item, as Fotos ficam logo abaixo do Item.

## 2.82.1

- **Integrações › IA**: o texto de cima igual ao dos outros apps.

## 2.82.0

- **Fotos no Exportar e no Backup**: o arquivo .zip agora leva as fotos das tarefas (na pasta fotos), e o Importar e o Restaurar trazem elas de volta.
- **Foto pelo CorrerIA**: com o CorrerIA 1.17.0, uma foto mandada no WhatsApp ou na Conversa dele com um pedido como "põe na tarefa do piso" fica guardada na tarefa.

## 2.81.0

- **Fotos na tarefa**: no Novo item e no Editar item, **Tirar foto** e **Escolher fotos**, até 6 por tarefa. A tarefa mostra na lista quantas fotos tem; um toque na foto abre ela grande. As fotos acompanham a tarefa ao renomear ou mover de lista.

## 2.80.0

- **Agora › Compras**: os itens aparecem direto no cartão, para marcar dali mesmo (até 8 de cada lista; o resto, em **Ver os N**).
- **Listas**: as **Inativas (n)** ficam no mesmo cartão das listas, no fim dele.
- **Personalizar**: **Mostrar no início** e **Prazos** dentro de **Opções**, que fecha e abre como a Cor e o Ícone, com a mesma letra.
- **Pontos para quem concluir**: os botões do mesmo tamanho, alinhados.
- **Alterar vários itens**: com os bens em uso, **Onde** (Manter, Nenhum, Casa ou Bens) vem antes do cômodo e do equipamento, como no item.
- **Usar bens** começa desligado (Mais › Configurações › Integrações › InventarIA).

## 2.79.1

- **Conversa**: a IA sabe quais são os outros apps da casa e, quando a pergunta é de outro app, diz em qual deles está.

## 2.79.0

- **Novo item › Nenhum, Casa ou Bens**: a escolha ganhou o **Nenhum**, que vem primeiro e é onde um item novo começa. O **Cômodo** e o **Equipamento** só aparecem depois de escolher **Casa** ou **Bens**.
- **InventarIA › Usar bens**: uma chave nova em **Integrações › InventarIA**. Desligada, a área Bens fica de fora (sem o Nenhum, Casa ou Bens). Se o InventarIA não usa bens, a chave fica presa e diz por quê.
- **De quem é** virou uma opção, em **Opções › Exibição**. Desligada, o De quem é some do **Buscar** e do **Personalizar** da lista, e todas as listas valem para todos (o que estava escolhido fica guardado). Quem já tinha uma lista de uma pessoa continua com ela ligada.
- **Selecionar**: sair da tela com itens selecionados desfaz a seleção.
- **Falar › Como configurar**: o **Home Assistant Cloud** abre o site num toque.
- **Dados**: os textos de cima no mesmo jeito dos outros apps.

## 2.78.0

- **Novo item / Editar item**: as **Notas** ficam logo acima de **Lista** e fecham e abrem num toque no título, como os outros campos (o aparelho lembra). Fechadas, mostram o começo do que está escrito.
- **Listas › Inativas (n)**: a linha de recolher fica direto na página, sem um cartão em volta; aberta, as listas inativas aparecem no cartão delas, logo abaixo.
- **Conversa**: as perguntas prontas ficam no meio da tela, uma por linha, como no CorrerIA.
- **Buscar**: o título dos filtros se chama **Filtros** (antes, Incluir), como nos outros apps.

## 2.77.1

- **Inativas (n)** (em **Mais › Listas** e na aba **Listas**): a linha de recolher ficou igual à dos outros apps, fina, com a seta antes do nome (para a direita fechada, para baixo aberta).

## 2.77.0

- **Conversa › Falar**: ouvindo, o clipe dá lugar ao **Cancelar**: o microfone para e nada é enviado. Antes só dava para mandar.
- **Uso da IA**: o rodapé mostra onde ver o consumo e o saldo de **cada IA em uso** (antes, só de uma). O do Gemini agora leva ao Google AI Studio, onde o consumo e os créditos ficam de verdade; o do Claude, ao Claude Console e ao saldo dos créditos.

## 2.76.0

- **Conversa › Editar perguntas**: toque numa pergunta para mudar o texto dela. **Perguntas prontas** e **Mais perguntas** fecham e abrem num toque no título, com a seta no canto, e o aparelho lembra.
- **Personalizar** (de uma lista): **Cor** e **Ícone** fecham e abrem num toque no título, como os outros campos de escolha. O aparelho lembra.

## 2.75.0

- **Conversa**: 6 perguntas prontas, as que fazem sentido com o que está ligado (prazos, pontos, cômodos, equipamentos). Em **Editar perguntas**, embaixo, ficam **Mais perguntas (20)**: um toque põe a pergunta na sua lista.
- **Conversa**: a IA sabe quem está usando o app e de quem é cada lista ("você" é só o que é seu ou de todos), e vê também as notas de cada tarefa, quando ela volta depois de concluída e as concluídas.

## 2.74.0

- **O fundo e os cartões seguem o tema do Home Assistant**, no claro e no escuro: o mesmo fundo do Home Assistant e dos outros apps da família (antes, cada app tinha o seu, o do ResolvIA meio rosado). Com um tema seu no Home Assistant, o app usa as cores dele; ao trocar o tema ou o modo no Home Assistant, o app muda junto. O mesmo vale para a página do Relatório.
- **Conversa**: a IA responde com todos os acentos (algumas IAs escreviam "voce" e "Alimentacao").

## 2.73.0

- **Integrações › IA** (antes "IA do Home Assistant"): agora dá para escolher uma IA **Para conversar** (a Conversa, o Falar, as mensagens coladas e as sugestões) e outra **Para ler fotos e PDFs** (o Escolher fotos ou PDF, o Digitalizar com IA e a Conversa com uma foto ou um PDF). Assim uma IA mais barata responde as perguntas e uma mais caprichada lê as fotos. A de fotos começa **Igual à de conversar**, então nada muda até você escolher.

## 2.72.2

- **Equipamento** escolhido numa tarefa: um nome comprido não passa mais da borda da direita. Ele termina em "…" dentro do cartão.

## 2.72.1

- **Conversa**: o **Nova conversa** não quebra mais em duas linhas; num celular bem estreito, fica só o **+**.

## 2.72.0

- **Buscar › Incluir › De quem é**: abre sempre em quem está usando o app, com as listas dessa pessoa e as de todos. Escolher **Todos** ou outra pessoa vale até fechar o app.

## 2.71.0

- **Conversa › Clipe**: manda junto uma foto ou um PDF: **Tirar foto**, **Escolher fotos** (a galeria) ou **Escolher arquivo**. A IA olha o arquivo para responder e pode propor adicionar os itens que vê.
- **Conversa**: o microfone e o Enviar dividem o mesmo botão, como no WhatsApp: com a caixa vazia, o microfone; escrevendo, o Enviar.
- **Ler com IA › Escolher fotos ou PDF**: um PDF também vira itens (uma lista, um orçamento).

## 2.70.0

- **Conversa › Perguntas prontas**: as perguntas de exemplo viram suas. **Editar perguntas** tira (✕) e acrescenta as que você quiser; **Padrão** volta às de antes. Ficam guardadas no aparelho.
- **Conversa**: o botão ✨ ao lado da caixa abre as perguntas prontas a qualquer momento, não só na conversa vazia.
- **Personalizar**: **Sem cor** e **Sem ícone** são a primeira escolha de cada um. A lista fica nas cores do tema, sem o quadrinho do ícone.
- **Personalizar**: **Mostrar no início** e **Prazos** ganharam o ícone, como as outras opções.

## 2.69.0

- **Editar item › Lista**: vem marcada a lista onde o item está (também a do Alexa, que não aceita item novo daqui); tocar em outra move o item. Saiu o "(mover)" do título.
- **Buscar › Incluir › De quem é** começa em quem está usando o app (a pessoa do usuário do Home Assistant, quando tem lista sua). Escolher **Todos** ou outra pessoa fica guardado no aparelho, como antes.

## 2.68.0

- **Buscar › Incluir › De quem é**: quando alguma lista é de uma pessoa (Personalizar › De quem é), dá para ver só as tarefas de uma pessoa: as listas dela, junto com as de todos, sem as das outras pessoas. **Todos** volta a mostrar tudo. A escolha fica no aparelho.
- **Buscar › Incluir** fechado continua fechado ao voltar ao Buscar e ao abrir o app de novo. As listas dos resultados continuam abrindo toda vez.

## 2.67.1

- **Campos das janelas** (Prazo, Cômodo, Lista…): fechados, escondem tudo, também o que está escolhido.
- **Novo item e Editar item**: a escolha **Casa** ou **Bens** vem antes do Prazo.
- **Buscar**: **Incluir** fechado esconde todos os botões, não só os desligados. Cada lista dos resultados também fecha e abre num toque no nome dela (fechada, mostra quantos itens tem). Tudo volta aberto quando você abre o Buscar de novo.
- **Colar mensagem**: o **Separar itens** com ícone também sem IA.

## 2.67.0

- **Janelas mais curtas**: no Novo item, no Editar item e no Alterar em lote, cada campo de escolhas (Trazer de mensagem ou foto, Prazo, Horário, Cômodo, Equipamento, Quem faz, Pontos, Repetir, Lista…) fecha e abre num toque no título, com a seta no canto. Fechado, mostra só o que está escolhido. O aparelho lembra os que ficaram fechados.
- **Buscar › Incluir** fecha e abre num toque (fechado, só os ligados) e volta aberto toda vez que você abre o Buscar. Ganhou o ícone.

## 2.66.1

- **Sensores no Home Assistant**: sem a linha acima do primeiro sensor no quadro embaixo de **Criar sensores**.

## 2.66.0

- **Contrair e expandir**: toda seção (Configurações, Gráficos, os cards da Agora…) fecha e abre num toque no cabeçalho, com a seta no canto. O aparelho lembra as que ficaram fechadas.
- **Mais ícones**: em cada campo das janelas (Item, Notas, Prazo, Horário, Lista, Cômodo, Equipamento, Quem faz, Pontos, Nome, Cor, Ícone, De quem é…), no título de **Personalizar**, **Ordem dos cards**, **Quem fez?**, **Versões anteriores** e das confirmações, e nos botões que faltavam (Salvar, Adicionar, Cancelar, Aplicar, Fechar, Restaurar, Desfazer, Fazer…).
- **Últimas chamadas** (Uso da IA) com o ícone e quantas são.
- **Relatório de pendências**: cada gráfico e cada lista com o seu ícone (a lista na cor dela), e **Voltar** e **Baixar PDF** com os deles.

## 2.65.0

- **Ícones em tudo**, como nos outros apps: cada opção tem um ícone antes do título (Controlar prazos, Usar IA, Cor do dia, Horário, Quem recebe…), e o título de cada tela e de cada janela também (Agora, Configurações, Novo item…). As escolhas ganharam ícone: Hoje, Amanhã, os dias, Próx. semana, Não, Todo dia, Sem pontos, +5, Manter, Nenhum, e os botões Limpar, Todos e Nova conversa.
- **Sem linhas entre as opções** de uma seção: o ícone de cada uma marca onde ela começa. As listas (as suas listas, as tarefas que se repetem) continuam com a linha.
- **Sub-opções num quadro**: o que depende de uma chave fica num quadro embaixo dela: o estado e a escolha da IA embaixo de **Usar IA**; o Horário, o Quem recebe e o Testar embaixo de **Avisar o que vence hoje**; o estado do placar embaixo de **Usar recompensas**; o estado do InventarIA embaixo de **Usar cômodos** e **Usar equipamentos**; o último uso embaixo de **Usar com o CorrerIA**; e os sensores embaixo de **Criar sensores**.
- **Configurações**: quando as abas não cabem, a ponta de onde há mais some aos poucos, com uma seta. As caixas de seleção abrem com o ícone no título.
- **Conversa**: sem o texto de explicação; ficam as sugestões de pergunta, com ícone.
- O nome de uma lista aumenta puxando o canto, como os outros campos de texto.

## 2.64.0

- **Sensores novos no Home Assistant** (com **Sensores no Home Assistant** ligado): `sensor.resolvia_atrasados` e `sensor.resolvia_vence_hoje` (quantas tarefas, com cada uma nos atributos) e `binary_sensor.resolvia_compras` (ligado quando a lista de compras tem algo para comprar, com os itens). Servem para painéis e automações: a Alexa avisar os atrasados quando você chega, ou a lista de compras no celular ao chegar no mercado.

## 2.63.0

- **Revisar itens mostra o texto todo**: na leitura por IA (mensagem, foto ou Falar), o texto de cada item cresce com ele, sem ficar cortado.

## 2.62.0

- **Casa ou Bens**: no item, antes dos cômodos, escolha **Casa** ou **Bens**. Na Casa aparecem os cômodos da casa (o **Bens** do InventarIA não é mais um cômodo da lista) e os equipamentos dela; em **Bens**, os bens do InventarIA (carro, casa…) e a tarefa fica na área Bens. A tarefa de um bem abre em Bens.

## 2.61.0

- **Adicionar só com o +**: o botão do meio da barra de baixo fica só com o ícone, sem o texto embaixo, como em todos os apps da família.
- **Menos avisos na tela**: saiu "No app do Home Assistant, a galeria manda uma foto por vez" do Trazer de mensagem ou foto.

## 2.60.0

- **Sugestões agora se chama Agora** (a aba, a barra lateral e o título), como no CronologIA.
- **Cada card da Agora com o seu ícone**: Atrasados (em vermelho), Hoje, Amanhã, Próximos 7 dias, Mais adiante e Voltam sozinhas, como o Comece por aqui e as Compras.
- **Ordem dos cards**, no fim da Agora, como no CronologIA: Subir e Descer põem os cards na ordem que você quiser. Cada pessoa tem a sua; **Voltar à ordem de sempre** desfaz.
- **Verificar de novo** (IA, Falar e InventarIA) na largura do cartão no celular, como os outros botões das Configurações.
- **Campos de texto que aumentam**: o item, as Notas e o Colar mensagem aumentam puxando o canto, e o tamanho fica guardado no aparelho, como nos outros apps da família.

## 2.59.0

- **Prazo nas listas sem data**: o **Adicionar › Tarefa** do CronologIA (1.73.0) e a **Nova tarefa** do InventarIA (1.49.0) também põem prazo nessas listas (as da Alexa, a Shopping list); ele fica guardado aqui, como o que você põe no ResolvIA.

## 2.58.0

- **Prazo nas listas sem data** (as da Alexa, a Shopping list): agora dá para pôr prazo e horário. Como a integração não aceita data, o prazo fica guardado no próprio ResolvIA ("Guardado no ResolvIA: a lista não aceita data."). Ele fica vermelho quando atrasa e entra nas Sugestões, no aviso Vence hoje, no Relatório, na repetição e no CorrerIA. Não aparece no app da Alexa. Concluída ou apagada, a tarefa perde o prazo.

## 2.57.0

- **Atalho no celular**, em **Mais › Configurações › Opções**: o caminho do ResolvIA no Home Assistant, com **Copiar**, e como criar um ícone na tela inicial do celular que abre o app direto (no app do Home Assistant: Configurações › Aplicativo complementar › Gerenciar atalhos). O mesmo vale em todos os apps da família.
- **InventarIA**: o **Nova tarefa** da ficha do item mostra as listas como aqui (os mesmos nomes e cores, sem as desmarcadas) e só pede prazo com **Controlar prazos** ligado.

## 2.56.2

- **Avisos no celular**: o título começa com **ResolvIA** ("ResolvIA · 📅 Vence hoje") e o ícone pequeno é o do app. Como todos os apps chegam como Home Assistant, agora dá para ver de qual app é cada aviso. Vale para todos os apps da família.

## 2.56.1

- **Tema**: **Automático** agora se chama **Sistema** (segue o claro ou escuro do Home Assistant, como antes). O nome cabe ao lado do ícone e é o mesmo em todos os apps da família.

## 2.56.0

- **Uma altura só**: botões, campos, caixas de seleção, botões de escolha (as abas de Configurações, o Tema, os filtros) e as escolhas do Prazo têm a mesma altura, a mesma de todos os apps da família. O **Restaurar** das versões e o **Adicionar item…** da lista também. O Tema ficou com o ícone ao lado do nome.
- **Outra data**: tocar no nome do mês mostra os meses do ano, para ir longe sem passar mês a mês.

## 2.55.0

- **Mais › Configurações › Dados**: os botões no padrão dos outros apps da família: na largura do cartão no celular, da mesma altura. **Apagar tudo** fica vermelho.
- O CorrerIA e o Relatório em PDF usam o mesmo código do CronologIA e do MemorIA (nada muda na tela).

## 2.54.2

- **Documentação** revista: a aba **Listas** (o caderno, o Buscar e as listas, com as ocultas em **Inativas**), o que fica em cada aba de **Configurações** e as telas do README, com a barra de baixo de agora.

## 2.54.1

- Nada muda na tela: a versão do app fica escrita num lugar só, e o Sobre, o rodapé e o servidor mostram sempre a mesma.

## 2.54.0

- **Avisar o que vence hoje** (Mais › Configurações › Opções › Prazos) fica igual ao aviso dos outros apps da família: o **Horário** na metade da linha, um botão para cada pessoa em **Quem recebe** (lado a lado, do mesmo tamanho) e **Testar no meu celular** com a largura toda, embaixo.
- **Quem recebe** agora escolhe: toque numa pessoa para tirar ou pôr de volta. De início, todos recebem (como antes); sem ninguém escolhido, o app pede para escolher.

## 2.53.0

O mesmo jeito em todos os apps da família:

- **Mais › Configurações › Dados** ganha **Começar do zero**, por último: **Apagar tudo** apaga as repetições, os pontos, os cômodos, os equipamentos e quem faz de cada tarefa. Os itens das listas e os ajustes continuam, e uma cópia fica em **Versões anteriores**.
- **Aparência**: a paleta dos apps, com 12 cores (Vermelho, Coral, Laranja, Ouro, Verde, Menta, Turquesa, Azul, Índigo, Lilás, Rosa e Grafite), para a cor do app e a das listas. Uma cor escolhida antes que saiu (Framboesa) vira a mais próxima (Rosa). A **Cor do dia** é a mesma em todos os apps no mesmo dia.
- **Excluir** virou **Apagar** em todo lugar (item, repetições).
- **Avisar o que vence hoje**: o botão é **Testar no meu celular**, embaixo de **Quem recebe**.
- **Integrações**: o cartão da IA se chama **IA do Home Assistant**.
- **Conversa**: **Nova** virou **Nova conversa**.
- As partes recolhidas mostram a contagem entre parênteses: **Inativas (2)**, **Concluídos (3)**.

## 2.52.0

- **Listas**: as listas ocultas (**Ocultar do início**) não somem mais da aba: ficam no fim, recolhidas em **Inativas**, com quantas são. Um toque abre, e dali dá para abrir a lista. É o mesmo jeito de **Mais › Listas**.
- **Outra data** (no **Novo item**, no **Editar item** e no **Alterar** do Buscar) abre um mês no visual do app, logo abaixo, em vez do calendário do celular: **‹** e **›** trocam o mês, hoje vem com um círculo e um toque no dia escolhe.
- **Outro horário** e o horário do **Avisar o que vence hoje** viram uma caixa de seleção do app, de meia em meia hora, sem AM/PM e sem o relógio do celular. Um horário escolhido antes fora da meia hora (07:15, por exemplo) continua lá.
- As caixas de seleção fechadas ficam iguais aos outros campos (altura, cantos e seta), também no **Relatório de pendências**; um nome comprido termina em "…" antes da seta, em vez de ser cortado.

## 2.51.1

- **Cômodos e equipamentos** nas tarefas: com mais de um, uma etiqueta só, **Vários cômodos** ou **Vários equipamentos**, em vez de uma etiqueta para cada. Quais são, abrindo a tarefa. Um só continua com o nome, e todos, **Todos os cômodos**.

## 2.51.0

- **Buscar** abre com todos os pendentes, separados por lista, como no InventarIA. Digitar continua filtrando.
- **Selecionar** (ao lado da contagem, ou segurando um item) escolhe vários pendentes de uma vez, de listas diferentes, com **Todos** e **Nenhum**.
- **Alterar N itens** muda todos juntos: **Prazo** (e o horário), **Cômodo**, **Equipamento**, **Quem faz** e **Lista**. Cada campo começa em **Manter** e só aparece com a opção dele ligada.
- O que uma lista não aceita fica como estava (prazo numa lista sem datas, por exemplo), e o aviso no fim diz quantos mudaram.

## 2.50.1

- **Mais › Sobre**: a linha da CorrerIA fica mais curta: "Pergunte e peça a qualquer app, no chat ou no WhatsApp."

## 2.50.0

- **Barra de baixo**: o **Buscar** fica ao lado das **Sugestões**, e as **Listas** vão para o lugar dele: Sugestões · Buscar · Adicionar · Listas · Mais. Arrastar para o lado e a barra lateral do computador seguem a mesma ordem.
- **Mais › Sobre**: a CorrerIA agora é descrita como o chat com todos os apps (pergunte e peça, também pelo WhatsApp).

## 2.49.1

- **Mais › Sobre**: a **CorrerIA** (o contato no WhatsApp) entra na lista dos apps.

## 2.49.0

- **CorrerIA**: novo cartão em **Mais › Configurações › Integrações**. Ligado (começa desligado e não depende do **Usar IA**), o app **CorrerIA** passa a ler e mudar as suas listas pelo **WhatsApp**, pelo **Claude** e pelo **Gemini**: ver o que está atrasado e o que vence, buscar tarefas, criar (com prazo, horário, notas, repetição, pontos, cômodos e quem faz; várias de uma vez, uma por linha), editar, mover de lista, concluir (os pontos vão para quem fez) e apagar.
- O cartão mostra quem usou por último (ex.: **Claude usou hoje às 09:41**). Desligado, o CorrerIA deixa de ter acesso na hora.
- Só aparece o que está ligado no app: sem recompensas, nada de pontos; sem cômodos, nada de cômodos.

## 2.48.0

- **Sugestões** é a primeira aba e a tela onde o app abre: no alto, o que está **atrasado** e o que vence **hoje**; depois o **Comece por aqui** (sem repetir esses), **Amanhã**, **Próximos 7 dias**, **Mais adiante**, **Voltam sozinhas** e **Compras**. O número da aba é o que está atrasado ou vence hoje.
- A aba **Prazos** sai: o que ela mostrava está nas Sugestões. **Controlar prazos** desligado não troca mais de aba; só tira os prazos das Sugestões.
- A barra de baixo fica **Sugestões**, **Listas**, **Adicionar**, **Buscar** e **Mais**.
- **Editar item › Horário**: **Dia todo**, **08:00** ou **Outro horário**, lado a lado, no lugar da caixa de horário vazia.

## 2.47.1

- **Relatório de pendências › Baixar PDF** funciona no app do Home Assistant no celular: o PDF vai para a pasta Downloads (aparece nas notificações), e o botão diz **Baixando…**.

## 2.47.0

- **Relatório de pendências** com os gráficos da aba **Gráficos**: por lista (cada uma na sua cor), por prazo e, quando há, por cômodo, por equipamento e quem faz. Na página e no PDF.
- No fim, a marca da **CorrerIA Code** (desenvolvimento de softwares), como no **Mais › Sobre**. A hora aparece só no cabeçalho, e o nome da casa saiu (nada repetido).
- As listas aparecem com o mesmo nome do app (sem o nome do aparelho na frente, como "Shopping list").

## 2.46.1

- **Caixas de seleção**: tocar num botão que fica por cima de uma caixa (como a barra no fim de uma janela, com a lista rolada por baixo) aciona o botão, e não abre a caixa escondida.

## 2.46.0

- **Caixas de seleção** (Fala para texto, IA usada pelo app, a lista e o cômodo de cada item ao importar, a lista do Relatório de pendências) abrem uma janela no visual do app, de baixo para cima, com as opções em linhas e a atual marcada na cor do app, no tema claro ou escuro, e não mais a janela padrão do celular. O Voltar do celular, o X ou tocar fora fecham só ela.
- **Relatório de pendências**: as listas ocultas não aparecem mais na escolha de lista.

## 2.45.1

- **Relatório de pendências**: o botão agora é **Baixar PDF**. O app do Home Assistant no celular não imprimia a página; o PDF baixa e abre no celular, de onde dá para imprimir ou compartilhar. O PDF tem o mesmo cabeçalho (o app, a casa, o que é, quando e quais listas), os números e uma parte por lista, com o número de cada página.

## 2.45.0

- **Mais › Relatório de pendências**: as tarefas abertas de todas as listas marcadas, pronto para imprimir ou salvar em PDF, com um cabeçalho (o app, a casa, o que é, quando e quais listas), os números e uma parte por lista (atrasadas primeiro, em vermelho). Dá para trocar para uma lista só.

## 2.44.2

- **Avisar o que vence hoje** acha o celular de cada pessoa pelo aparelho do app Home Assistant ligado a ela, mesmo quando o rastreador tem outro nome (como "Celular Davi" sendo `meu_celular`). Um rastreador do roteador não conta como celular.

## 2.44.1

- **Avisar o que vence hoje** vai para a pessoa, nos celulares ligados a ela no Home Assistant (**Configurações › Pessoas**), e não mais para um celular escolhido nos **Avisos** da CronologIA. **Quem recebe** mostra só as pessoas; quem não tem celular ligado aparece como "sem celular".

## 2.44.0

- **Serviços externos** pode ser desligado, em **Mais › Configurações › Opções › Quem faz**: somem o **Quem faz** do item, a etiqueta nas tarefas, o filtro do **Buscar** e o gráfico **Quem faz**, e a IA não fica sabendo quem faz. O que já estava marcado fica guardado e volta ao religar.
- **Notas** pode ser desligado, em **Mais › Configurações › Opções › Exibição**: o campo some do **Novo item** e do **Editar item** (num item que já tem notas, ele fica). As notas que já existem continuam nas listas.
- Os textos só dizem o que vai acontecer:
  - **Integrações › InventarIA**: "a IA sugere qual" só com **Usar IA** ligado.
  - Tarefa do CronologIA: só fala em pontos quando eles valem (**Recompensas** e placar ligados).
  - **Avisar o que vence hoje**: sem CronologIA, não manda escolher o celular nos Avisos dela.
  - **Prazos** vazio com os prazos desligados nas listas: diz isso, em vez de "toque num item para definir um prazo".
  - **Conversa**: com **Controlar prazos** desligado, não sugere "O que está atrasado?".
  - **Recompensas**: o caminho para ligar a integração no CronologIA agora inclui **Configurações**.

## 2.43.2

- **Personalizar › De quem é** só fala do aviso de prazos quando **Avisar o que vence hoje** está ligado.

## 2.43.1

- **Buscar › Incluir**: **Cômodos** e **Equipamentos** só aparecem com **Usar cômodos** e **Usar equipamentos** ligados (antes ficavam lá, apagados).

## 2.43.0

- **Avisar o que vence hoje** sem escolher celular: cada pessoa recebe o que vence nas listas dela (**De quem é**) e nas de todos. **Quem recebe** mostra cada pessoa e o celular dela, o mesmo de **Avisos** da CronologIA (ou, sem ela, o celular ligado à pessoa no Home Assistant). **Testar** manda para o seu celular.

## 2.42.1

- Tocar no aviso do que vence hoje volta a abrir o ResolvIA. No Home Assistant 2026.2 ou mais novo, ele abria o painel inicial.

## 2.42.0

- **De quem é** cada lista, em **⋯ › Personalizar**: **Todos** ou uma pessoa da casa. O aviso do que vence hoje de uma lista com dono vai só para o celular dessa pessoa, e na CronologIA (1.53.0 ou mais novo) a lista só aparece para ela. Se a CronologIA já tinha o dono de alguma lista, ele vem sozinho para cá.

## 2.41.0

- **Avisar o que vence hoje**, em **Mais › Configurações › Opções › Prazos** (desligado por padrão): uma vez por dia, no horário que você escolher, o celular recebe o que vence hoje (e quantos estão atrasados). Tocar no aviso abre **Prazos**. Escolha os celulares (já vêm marcados os das pessoas) e use **Testar** para ver como chega.

## 2.40.0

- **Mais › Sobre**, a última linha do menu: quem faz o app (**CorrerIA Code**, desenvolvimento de softwares, e por que esse nome), os apps da família (CronologIA, ResolvIA, GerencIA, InventarIA, EconomIA e MemorIA), cada um com uma linha e o link para o GitHub, e o botão **Meu GitHub**.
- **Todos** nos cômodos: no **Editar item**, o botão **Todos** (ao lado de **Nenhum**) marca a casa inteira; tocar de novo desmarca. Na revisão da leitura por IA, o cômodo de cada item também pode ser **Todos os cômodos**. A etiqueta vira uma só, **Todos os cômodos**, e a busca de equipamento procura na casa toda.

## 2.39.2

- **Vários cômodos numa tarefa**: sem equipamento, o campo **Cômodo** deixa marcar mais de um (cada cômodo liga e desliga; **Nenhum** limpa). Com equipamentos, os cômodos continuam vindo deles. As tarefas que vêm do CronologIA (manutenção e Novo › Tarefa) também chegam com todos os cômodos.

## 2.39.1

- **Etiquetas de equipamento** na lista: com vários equipamentos, aparece só o primeiro e "+N", sem os cômodos, numa linha só. Com um equipamento, continuam o cômodo e o equipamento. O Buscar continua achando por todos.

## 2.39.0

- **Mais › Gráficos**: onde estão as pendências, em barras. **Por lista** (as 6 com mais e "+N listas" para ver as outras), **Por cômodo** e **Por equipamento** (só com **Usar cômodos** e **Usar equipamentos** ligados; uma tarefa com dois equipamentos conta nos dois), **Por prazo** (atrasados, hoje, próximos 7 dias, mais adiante e sem prazo, com **Controlar prazos** ligado) e **Quem faz** (nós mesmos × serviço externo). Tocar numa lista abre a lista; num cômodo, equipamento ou serviço externo, abre o Buscar com ele; num prazo, abre Prazos.

## 2.38.1

- A etiqueta de **Serviço externo** ganha uma cor própria (anil), para se destacar do cômodo e dos equipamentos, sem confundir com atrasado, hoje ou pontos.

## 2.38.0

- **Repetição** sai do menu Mais e fica em **Mais › Configurações › Opções**, junto com **Prazos** e **Exibição**: o interruptor Repetir depois de concluir e as tarefas que se repetem. O Mais fica com **Listas** e **Configurações**.

## 2.37.0

- **Mais vira um menu**, como no InventarIA: **Listas**, **Repetições** e, por último, **Configurações**. Cada um abre a sua tela, com **‹ Mais** no alto para voltar; o Voltar do celular e arrastar para a direita também voltam ao menu.
- **Configurações** reúne as abas **Integrações**, **Dados**, **Aparência** e **Opções**.
- O **Mais** da barra tem o ícone de três pontos.
- **Versões anteriores**: o texto diz como funciona: uma cópia dos ajustes e das repetições a cada 10 minutos de uso e antes de importar ou restaurar; ficam as 3 mais recentes.

## 2.36.0

- **Buscar › Incluir › Serviços externos**: ligado, o Buscar acha as tarefas por quem faz ("eletricista") ou por "serviço externo"; desligado, não. Vem ligado.
- Os botões do Buscar ficam sob **Incluir**, dois por linha, todos do mesmo tamanho: **Concluídos**, **Serviços externos**, **Cômodos** e **Equipamentos**.

## 2.35.0

- **Cor do dia**: a cor do app muda todo dia, sozinha (a mesma em todos os aparelhos, e troca à meia-noite mesmo com o app aberto). Vem ligada; em Mais › Aparência, desligue em **Cor do dia** ou escolha uma cor para ficar sempre nela. As listas com cor própria continuam com a delas.
- **Quem faz** não aparece mais nas listas de compras (sem prazo nem notas), a não ser que o item já tenha um serviço externo.

## 2.34.0

- **Serviço externo**: no item, **Quem faz** marca quando uma pessoa ou empresa de fora vai fazer (eletricista, assistência técnica…), com o nome se quiser. A tarefa mostra a etiqueta com quem faz, o Buscar acha por ela, mover a tarefa leva junto e a IA (Sugerir e Conversa) sabe disso. Vai também nos backups.

## 2.33.1

- Conversa: um prazo que não existe no calendário (como 30/02) não vai mais para o item; ele é adicionado sem prazo.

## 2.33.0

- **Conversa com a IA**: ao lado do microfone, um botão abre uma conversa. Pergunte sobre a tela, as listas ou qualquer outro assunto, escrevendo ou falando. Pedindo para adicionar ou concluir itens, a IA mostra cada ação num cartão e só faz quando você toca em **Fazer**. A conversa continua ao fechar e abrir; **Nova** começa outra. Conta em Uso da IA como Conversa.

## 2.32.0

- **Mover vários itens de lista**: segure um item, ou use **⋯ › Selecionar itens**, para selecionar vários (ou **Todos**) e tocar em **Mover para outra lista**. Cada um vai com o prazo, a repetição, os pontos, o cômodo e os equipamentos.

## 2.31.0

- **Vários equipamentos**: uma tarefa pode ter mais de um equipamento. Depois do primeiro, **Outro equipamento** abre a busca de novo; cada um vira um cartão com × para tirar. A tarefa mostra todos (dois e "+N").
- **Cômodo bloqueado com equipamento**: com equipamento escolhido, o cômodo vem dele e fica bloqueado ("Vem do equipamento."); com equipamentos de cômodos diferentes, a tarefa fica nos vários cômodos. Tirando o último equipamento, o cômodo volta a poder ser escolhido.
- A CronologIA (1.39.0 ou mais nova) mostra e pede os vários equipamentos também.

## 2.30.3

- **O aviso de baixo não cobre mais os botões de uma janela aberta.** No celular, por uns 4 segundos depois de concluir um item, o aviso ficava bem em cima dos botões da janela. Tocar em **Limpar**, em Limpar concluídos, acertava o **Desfazer** do aviso. Com uma janela aberta, o aviso agora sobe para o alto da tela.
- **Tarefa criada de novo continua se repetindo.** Os concluídos apagados antes da hora fazem a tarefa ser criada de novo. Essa cópia não voltava mais sozinha depois de concluída, porque o Home Assistant manda o item novo antes de responder.
- **Volta a se conectar depois de um reinício do Home Assistant.** Se o Home Assistant demorava mais de um segundo para voltar, o app parava de tentar: o Node avisa a conexão recusada sem fechá-la.
- **Sem Desfazer** depois de excluir um item numa lista que não aceita itens novos, porque desfazer seria criar o item de novo, e a lista recusa.
- **Mais testes**: 704 unitários e de integração e 6 roteiros visuais novos, com 216 conferências. O teste visual principal (repetir, concluir, voltar sozinha, limpar concluídos) agora confere de verdade: antes ele só mostrava os resultados. Os roteiros novos cobrem:
  - os itens: adicionar, colar várias linhas, editar, concluir, Desfazer, excluir, reordenar, mover e limpar concluídos;
  - o que cada tipo de lista permite;
  - o Buscar;
  - Mais › Listas;
  - a queda de conexão;
  - os Prazos.

## 2.30.2

- A conexão da tela ignora o que ainda chega depois de fechada (achado pelos testes da CronologIA, que usa o mesmo código). Mais testes: o aviso de arquivo ou fala grande demais e a conexão fechada.

## 2.30.1

- **Testes**: o ResolvIA agora tem 543 testes unitários e de integração (`npm test`) e os testes visuais no Chromium (`tests/e2e/run.sh`), rodando no GitHub a cada mudança. Eles acharam e esta versão corrige:
- Colar ou ler uma lista com quantidades: "1.5 kg de carne" virava "5 kg de carne", "1.000 folhas" virava "000 folhas" e "2-3 tomates" virava "3 tomates". Agora só o número da lista ("1.", "2)") sai.
- Buscar com emoji no nome: o destaque caía nas letras erradas (na busca e no Equipamento).
- Duas cópias de segurança no mesmo segundo (um Restaurar tocado duas vezes) ficavam numa só, e a cópia do que havia antes era perdida. Agora o nome vai até o milésimo e a ordem é pela hora.
- Um arquivo grande demais (importar, ler com IA) ou uma fala longa demais às vezes davam "conexão perdida" em vez do aviso.
- Quando a CronologIA assume tarefas, o cômodo e o equipamento delas também saem daqui (os pontos e a repetição já saíam).
- Listas com "tapete" ou "repetições" no nome ganhavam o ícone de cachorro.

## 2.30.0

- **Buscar por cômodo e equipamento**: em **Buscar**, digitar o cômodo ("cozinha") ou o equipamento ("ar-condicionado", ou a zona dele) traz as tarefas ligadas a eles. Ao lado de **Incluir concluídos** ficam **Incluir cômodos** e **Incluir equipamentos**, ligados por padrão; com **Usar cômodos** ou **Usar equipamentos** desligado em Mais › Integrações, o botão fica inativo.

## 2.29.1

- **Equipamento com busca**: no lugar da lista padrão, uma busca. Com um cômodo escolhido, aparecem os equipamentos dele; ao buscar (pelo nome, pela zona ou pelo cômodo, sem ligar para acentos), o que está em outros cômodos aparece separado, com o cômodo. O trecho buscado fica destacado, e o escolhido vira um cartão com zona e cômodo (× para tirar). Escolher um equipamento de outro cômodo troca o cômodo; trocar o cômodo tira um equipamento que não é dele.
- Na revisão da leitura por IA, tocar no equipamento de um item abre a mesma busca embaixo dele.

## 2.29.0

- **Equipamentos do InventarIA**: o painel de Mais › Integrações virou **InventarIA**, com **Usar cômodos** e **Usar equipamentos** (os dois desligados por padrão). Com os equipamentos ligados, cada tarefa pode apontar para um item do InventarIA (1.15.0 ou mais novo), escolhido no item numa lista separada por cômodo; escolher o equipamento já preenche o cômodo dele. A tarefa mostra o equipamento como etiqueta.
- **A IA entende os equipamentos**: na leitura por IA ela sugere o equipamento de cada item (trocar a resistência do chuveiro → Chuveiro), com o cômodo dele, e no **Sugerir com IA** ela sabe de que equipamento é cada tarefa.
- Na revisão da leitura, lista, cômodo e equipamento ficam juntos embaixo de cada item.
- O **CronologIA** (1.34.0 ou mais novo) mostra o equipamento das tarefas e pede o equipamento em Novo › Tarefa.

## 2.28.0

- **Cômodos do InventarIA**: em Mais › Integrações, **Usar cômodos** (desligado por padrão) liga cada tarefa a um cômodo da casa, com os cômodos do InventarIA (1.14.0 ou mais novo). O cômodo é escolhido no item e aparece como etiqueta embaixo da tarefa.
- **A IA entende os cômodos**: na leitura por IA (mensagem, foto ou Falar), ela sugere o cômodo de cada item na revisão (trocável, ao lado da lista); no **Sugerir com IA**, ela junta o que dá para fazer no mesmo cômodo.
- O **CronologIA** (1.33.0 ou mais novo) mostra o cômodo das tarefas e pede o cômodo em Novo › Tarefa; o ResolvIA guarda a escolha. Os cômodos entram no exportar e no backup.

## 2.27.0

- **Menos explicação, mais tela**: os textos de ajuda ficaram curtos ou saíram onde só repetiam o que a tela já mostra. Os mais visíveis: Exportar sem frase de abertura; Backup, Importar, Versões e Onde ficam os dados em uma linha; os interruptores dizem só Ligado/Desligado (com uma frase curta quando precisa); Leitura por IA e Falar sem a lista de integrações e sem a nota do "Automático"; no Falar e no Colar mensagem saiu a nota de quem transcreve e quem separa; na revisão, só a quantidade de itens; saiu a dica embaixo da escolha de lista; Sugestões sem o rodapé que explicava o automático; Uso da IA com uma linha só para o consumo exato.
- **Comece por aqui escolhido pela IA**: a linha de cima diz só **Escolhidos pela IA.**

## 2.26.3

- **Comece por aqui escolhido pela IA**: a linha de cima diz só quem escolheu e quando (o "Embaixo de cada um, o porquê" saiu: o porquê já está embaixo de cada item). A IA também é orientada a escrever o motivo todo em português, sem palavras em inglês.

## 2.26.2

- **Colar mensagem**: o botão **Colar** só aparece quando consegue ler o que foi copiado. Com o Home Assistant aberto por http ele não funciona (o navegador não deixa), então some, e o campo continua aceitando colar do jeito normal (tocar e segurar). Se o aparelho recusar uma vez, o botão também some.

## 2.26.1

- **Home Assistant aberto por http**: o **Digitalizar com IA** já avisa no próprio botão (**Precisa de https**), com uma linha explicando que neste endereço a câmera não abre aqui dentro (tire a foto com a câmera do celular e use Escolher fotos). O **Falar** explica que o microfone também precisa do endereço seguro, mesmo pelo app do Home Assistant.

## 2.26.0

- **Sugerir com IA dentro do Comece por aqui**: saiu o quadro separado **Pedir à IA**. O botão fica no fim do **Comece por aqui**, e a IA troca os itens dele pelos que ela escolheu, com o porquê embaixo de cada um (e quem escolheu, e quando). **Sugerir de novo** pede outra escolha; **Voltar ao automático** volta para a escolha do app.
- A escolha da IA **fica guardada** (antes sumia quando o app reiniciava ou atualizava). Se você sair da tela enquanto ela pensa, ao voltar aparece **Pensando…** e depois o resultado.
- **Digitalizar com IA** sem acesso à câmera (Home Assistant aberto por http): em vez de abrir a galeria como se fosse a câmera, explica que a câmera aqui dentro precisa do endereço seguro (https) e oferece **Escolher foto**.

## 2.25.0

- **Mais › Listas: as desligadas vão para o fim**, recolhidas em **Inativas** (com a quantidade). Tocar abre; ligar uma lista de novo a traz de volta para cima.
- **Dados: botões do mesmo tamanho** (Baixar CSV, JSON, ZIP, Criar backup, Escolher arquivo, Ver versões). No celular cada um fica embaixo do seu texto, todos alinhados; no computador, à direita.
- **Uso da IA** não fala mais do sensor `sensor.resolvia_ia_hoje` (nem para mandar ligar). Ele aparece explicado só em **Sensores no Home Assistant**, com os sensores ligados.

## 2.24.0

- **Falar: escolha quem transcreve**, como na leitura por IA. Em Mais › Integrações › **Falar** aparece a lista dos motores de fala para texto do Home Assistant (Home Assistant Cloud, Whisper, Google…). **Automático** continua usando o assistente de voz preferido do Home Assistant; escolher outro aqui não mexe nele. O app descobre o idioma que cada motor usa para o português (pt-BR, pt…). Com **Usar IA** desligado, o painel some junto com o Falar.

## 2.23.0

- **Ler com IA, Colar e Falar: cada item na sua lista.** Na revisão, embaixo de cada item aparece a lista para onde ele vai; toque nela para trocar. A IA já sugere a lista de cada item (comprar leite → lista de compras, consertar a pia → Casa). Os botões **Todos em** (antes "Adicionar em") mandam todos para uma lista só. O botão final diz quantas listas recebem itens.

## 2.22.1

- **Sugestões**: **Comece por aqui** e **Compras** ganharam o cabeçalho com ícone, como o **Pedir à IA**, com a quantidade à direita.

## 2.22.0

- **Listas com mais pendências primeiro**, na tela inicial (e o grupo com mais pendências primeiro) e na barra lateral do computador. Empates seguem a ordem de Mais › Listas.
- **Buscar** só nas listas ligadas em Mais › Listas: o "Em N listas", o "Buscar entre N itens" e os resultados não contam mais as listas ocultas.

## 2.21.0

- **Arrastar para o lado** troca de aba no celular: Listas ⇄ Buscar ⇄ Prazos (ou Sugestões) ⇄ Mais. Dentro de uma lista, arrastar para a direita volta para as listas. Não vale começando na borda da tela (é o Voltar do celular), num campo, na alça de reordenar ou numa fileira que rola para o lado.
- O **ícone do app** ao lado do nome, no alto e na barra lateral, na cor escolhida em Aparência.

## 2.20.1

- **Adicionar e Editar item**: as escolhas de **Prazo**, **Repetir** e **Lista** viraram botões do mesmo tamanho, em colunas, como no EconomIA (também na revisão da leitura por IA).

## 2.20.0

- **Sensores no Home Assistant desligados por padrão**: o sensor `sensor.resolvia_ia_hoje` só é criado se você ligar em **Mais › Integrações › Sensores no Home Assistant**. Desligado, o app apaga o que tinha criado.

## 2.19.0

- **No computador, com cara de InventarIA**: tela mais larga; seções direto na página em vez de cartões, com título grande, ícone e linhas entre as listas; dois grupos de listas lado a lado; ao lado do caderno, os números do dia (**Atrasados**, **Para hoje**, **Próximo prazo**, **Mais cheia**, cada um abre o que mostra); no alto à direita, **Falar**, **Ler com IA** e **Adicionar item** (saiu o botão da barra lateral). No celular nada muda.

## 2.18.3

- **Mais › Dados › Exportar** como no InventarIA: uma linha por arquivo (Planilha CSV, Dados completos JSON, Tudo ZIP), cada uma com a explicação do que tem e o botão **Baixar**, com uma linha separando.

## 2.18.2

- **Falar** some quando **Usar IA** está desligado (Mais › Integrações).
- **Listas**: o grupo sem nome agora se chama **Listas locais**, e saiu a linha "N listas ocultas · ver em Mais" (as ocultas continuam em Mais › Listas).

## 2.18.1

- **Falar**: corrigido o erro "Missing X-Speech-Content header". O Home Assistant só recebia o áudio sem a descrição do formato: o proxy do Supervisor só repassa esse cabeçalho escrito exatamente assim, e ele ia em minúsculas.

## 2.18.0

- **Falar**: o microfone no alto da tela, à direita (e dentro de cada lista). Fale os itens; o Home Assistant transcreve (fala para texto do Assist, como o Home Assistant Cloud) e a IA separa os itens, para você conferir e adicionar.

## 2.17.0

- **Buscar no início**, como no InventarIA: o campo **Buscar entre N itens** logo abaixo do resumo. A primeira letra já abre o Buscar com o que foi digitado.
- **No computador**, o Buscar já abre com o cursor no campo, e a tecla **/** abre o Buscar de qualquer tela. No celular o teclado não abre sozinho.
- **Sugestões** sempre traz 5 (ou todos, se houver menos). Antes, com itens novos ou uma lista só, podia trazer só 1: o resto agora vem na ordem da lista.

## 2.16.0

- **No computador** (tela de 1000 pixels ou mais), como no InventarIA: uma **barra lateral** no lugar das abas de baixo, com o **Adicionar item**, as seções e as listas com o que falta em cada uma. As janelas abrem no meio da tela. No celular nada muda.

## 2.15.0

- **Recompensas** mostra quando a integração com o ResolvIA está desligada no CronologIA (1.16.0 ou mais novo): nesse caso as tarefas não dão pontos e nada do CronologIA fica marcado aqui.
- **Controlar prazos** desligado também tira o prazo do **Novo › Tarefa** do CronologIA.

## 2.14.0

- **Mais › Opções › Prazos › Controlar prazos** (ligado por padrão). Desligado, somem a aba Prazos, o campo Prazo do item e a opção de prazos em Personalizar; as datas que já existem aparecem só como informação.
- **Sugestões** no lugar da aba Prazos quando ela está desligada: **Comece por aqui** (até 5 itens com o motivo: há quanto tempo está na lista, fecha a lista, vale pontos, voltou, data do CronologIA), **Compras** à parte e **Pedir à IA** (com Usar IA ligado, só quando você toca; entra no Uso da IA).
- O app passa a anotar desde quando cada item pendente está na lista (`/data/idades.json`).

## 2.13.0

- **Recompensas** com a chave **Usar recompensas**, desligada por padrão. Desligada, o card mostra só a chave e nada vai para o placar do CronologIA, nem os pontos das tarefas que vêm de lá: concluir conta como feito, sem pontos.
- **Desligar a repetição** com repetições criadas avisa quantas são e que serão excluídas. Confirmando, o app apaga todas e desliga. As que ficaram "pausadas" das versões anteriores ganham o botão **Excluir**.
- Nova aba **Mais › Opções**, com a **Exibição** (agrupar por dispositivo, concluídos abertos), que saiu da Aparência.
- A barra de abas do Mais rola para o lado em telas estreitas e mostra a aba escolhida.

## 2.12.0

- **Mais › Integrações › Uso da IA**, como no EconomIA: o app conta cada leitura por IA (mensagem ou foto) e estima os tokens pelo tamanho do texto.
  - Mostra hoje, 7 dias e o mês, um gráfico por dia (toque numa barra), os tipos de chamada e as últimas chamadas, com o link para o consumo exato no provedor.
  - Novo sensor `sensor.resolvia_ia_hoje`.
  - Some junto com a chave **Usar IA**.
- **Buscar**: saiu a nota "acentos não importam" (a busca continua ignorando acentos).
- **Mais › Aparência** como no InventarIA: **Tema** em três botões grandes (Automático, Claro, Escuro) e **Cor do app** em etiquetas com o nome de cada cor.

## 2.11.0

- Quando o CronologIA 1.13.0 traz tarefas de uma lista daqui para virarem Rotinas da casa (Trazer uma lista para o CronologIA), o ResolvIA esquece a repetição e os pontos delas (evento `resolvia_esquecer`). Assim, uma tarefa repetida que já estava concluída não é recriada no dia de voltar.

## 2.10.1

- **Versões anteriores**: o app mantém só as 3 cópias mais recentes (antes eram até 60). As que sobram são apagadas quando o app inicia.

## 2.10.0

- **Mais › Integrações › Usar IA**: desligada, somem o Colar mensagem, o Escolher fotos e o Digitalizar com IA (no Adicionar e ao lado do campo de cada lista), e o app não chama a IA. Colar várias linhas no campo de adicionar continua criando um item por linha. Começa ligada.

## 2.9.3

- **Mais** com cabeçalhos como os do InventarIA: cada seção tem o ícone num quadrado e o título grande (Listas, Repetição automática, Recompensas, Leitura por IA, Aparência, Exibição).
- **Mais › Dados** separado em seções: Exportar, Backup na pasta share, Importar, Versões anteriores e Onde ficam os dados.

## 2.9.2

- **Mais › Repetições › Repetir depois de concluir**: liga ou desliga a repetição automática. Desligada, o campo some dos itens e as repetições ficam pausadas (nada volta sozinho; o CronologIA também não as vê). Numa instalação nova começa desligada; quem já tinha repetições continua com ela ligada.
- **Colar mensagem, Escolher fotos e Digitalizar com IA** viraram quadros tracejados, como no InventarIA, com uma nota do que a IA faz. O mesmo vale para a tela Importar itens.
- **Buscar** não abre mais o teclado sozinho.

## 2.9.1

- O arquivo `share/resolvia/integracao.json` passa a dizer de quanto em quanto tempo cada tarefa volta (as **Tarefas que voltam sozinhas**). O CronologIA 1.10.1 usa isso para mostrar primeiro as tarefas de todo dia, depois as de a cada 2 dias, e assim por diante, com a frequência escrita em cada uma.

## 2.9.0

- **Manutenções e rotinas do CronologIA**: com o CronologIA 1.10.0 levando as manutenções e rotinas para uma lista daqui, elas aparecem com a próxima data e o troféu com os pontos.
  - Concluir aqui vale como **Feito** no CronologIA e dá os pontos para quem concluiu (com **Quem fez?** e **Foi Aurora**); desmarcar desfaz lá também. A tarefa volta sozinha com a data seguinte.
  - Tocar numa delas abre um resumo só para ver (nome, data, pontos e notas), porque quem manda nelas é o CronologIA. Excluir tira da lista até a próxima data.
  - A marcação técnica `[cr:…]` que vai nas notas fica escondida.

## 2.8.1

- Abas de baixo na nova ordem: **Listas · Buscar · Adicionar · Prazos · Mais**.

## 2.8.0

- **Recompensas**: as tarefas podem valer pontos no placar do CronologIA. Ligue em **Mais › Integrações › Recompensas** (começa desligado), e em cada tarefa escolha **Pontos para quem concluir** (+5, +10, +20, +30, +50 ou outro valor).
  - A tarefa mostra o troféu com os pontos. Ao concluir, os pontos vão para quem está usando o app (o usuário do Home Assistant de cada um vira a pessoa do placar); se o app não souber, pergunta **Quem fez?**. O aviso de baixo tem **Foi Aurora** para trocar; desmarcar tira os pontos.
  - A mesma tarefa no mesmo dia conta uma vez só, também se for concluída no CronologIA.
  - Os pontos de cada tarefa entram no backup (Dados) e na planilha.
- A aba **IA** do Mais virou **Integrações**: Recompensas e Leitura por IA.

## 2.7.0

- **Mais em abas** no alto da tela, como no CronologIA: **Listas** (personalizar, mostrar/ocultar, criar lista), **Repetições**, **IA**, **Dados** e **Aparência** (tema, cor e exibição). As abas ficam presas no topo ao rolar, e Voltar sai do Mais (não passa de aba em aba).

## 2.6.0

- **Prazo é só o que você define.** Listas que não deixam definir prazo (como a Problem List da Análise dos Dispositivos) recebem a data da própria integração, por exemplo desde quando um aparelho está fora do ar. Essas datas agora aparecem só como informação, em cinza com um relógio apagado: não ficam vermelhas, não entram em **Prazos** nem no número da aba.
- Nas listas em que você define prazo, **Personalizar** ganhou a chave **Prazos**, para desligar se quiser.
- O CronologIA segue a mesma regra (o `share/resolvia/integracao.json` diz quais listas não têm prazo).

## 2.5.1

- O CronologIA passa a mostrar "Conectado ao ResolvIA" com a versão (o app grava `share/resolvia/integracao.json` a cada 15 minutos).

## 2.5.0

- Novo em **Mais > Dados**, igual ao do InventarIA, do MemorIA e do CronologIA:
  - **Exportar** tudo em ZIP (todas as listas com os itens, prazos, notas e concluídos, uma planilha, um arquivo de texto por lista e os ajustes do app), a planilha em CSV ou os dados em JSON.
  - **Backup na pasta share** (`share/resolvia`), com a lista dos backups e **Restaurar**.
  - **Importar** um .zip ou .json: os ajustes (nomes, cores, ícones e as tarefas que se repetem) passam a ser os do arquivo e os itens pendentes que faltarem voltam para as listas, sem duplicar. Um backup de outro Home Assistant encontra as listas pelo nome.
  - **Versões anteriores**: o app guarda sozinho uma cópia dos ajustes a cada 10 minutos de uso, e antes de cada importação ou restauração.
- O app passa a usar a pasta `share` (para os backups).

## 2.4.0

- Leitura por IA igual à do InventarIA, do GerencIA e do EconomIA: usa só a IA configurada no Home Assistant (tarefa de IA) e não guarda chave de API. Saiu a opção da chave do Gemini.
- Novo em **Mais > Leitura por IA**: escolher qual IA usar ("Padrão do Home Assistant" ou uma da lista, com as que só leem texto marcadas), ver se está pronta para ler fotos, **Verificar de novo** e o passo a passo para configurar.
- As fotos ficam em `media/resolvia/ia-temp` só durante a leitura.

## 2.3.0

- Corrigido: "Escolher fotos" não fazia nada no app Android do Home Assistant. A versão atual do app descarta seleções de várias fotos, então lá a escolha é de uma foto por vez (como na InventarIA), com "Mais fotos" na revisão para juntar outras.
- "Digitalizar com IA" agora abre uma câmera dentro do próprio ResolvIA, com moldura, lanterna e várias páginas seguidas. Se a câmera não estiver liberada, oferece escolher uma foto.
- Topo das páginas no mesmo padrão do EconomIA: "ResolvIA · Olá, Davi", título grande e linha de status.
- Corrigido o número cortado no selo da aba Prazos.

## 2.2.1

- Botões renomeados: "Escolher fotos" e "Digitalizar com IA".

## 2.2.0

- Mesma tipografia da InventarIA: Barlow no texto (400/500/600) e Barlow Condensed em títulos, números e valores (500/600/700), com números tabulares.
- As fontes vêm dentro do app (funcionam sem internet).

## 2.1.0

- Novo: **Importar itens** de uma mensagem colada (WhatsApp, e-mail), de fotos da galeria ou digitalizando uma lista em papel com a câmera. A IA separa os itens e você revisa antes de adicionar.
- Usa a IA já configurada no Home Assistant (AI Task); opcionalmente uma chave do Gemini nas opções do app.
- Sem IA, a mensagem colada é separada por linhas, vírgulas e "e".
- Letras e espaçamentos menores, na mesma escala dos outros apps.

## 2.0.0

- ResolvIA agora é um **App** do Home Assistant (instala pela loja de aplicativos), no lugar da integração do HACS.
- Novo: **Repetir depois de concluir**. A tarefa volta sozinha como pendente X dias depois de feita.
- Nova seção "Voltam sozinhas" em Prazos e "Tarefas que se repetem" em Mais.
- Aviso quando a conexão com o Home Assistant cai.

## 1.0.0

- Primeira versão (integração do HACS).
