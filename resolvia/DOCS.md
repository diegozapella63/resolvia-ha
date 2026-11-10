# ResolvIA

Um painel para as **listas de tarefas nativas** do Home Assistant (`todo.*`): Lista de tarefas local, Shopping list, Alexa, Google Tasks, CalDAV… Tudo em tempo real e com um visual bem mais caprichado que a tela padrão.

Nada é copiado: o ResolvIA mostra e edita as mesmas listas que o HA já tem.

## Primeiros passos

1. Depois de instalar, toque em **Iniciar**.
2. Ative **Mostrar na barra lateral** (e, se quiser, **Watchdog**).
3. Abra o **ResolvIA** pela barra lateral.

O **Mais** (os três pontos na barra) é um menu, como no InventarIA. Cada linha abre a sua tela, com **‹ Mais** no alto para voltar (o Voltar do celular e arrastar para a direita também voltam):

- **Listas**: nome, cor, ícone, mostrar/ocultar e criar lista; as desligadas ficam por último, recolhidas em **Inativas**.
- **Gráficos**: onde estão as pendências das listas que aparecem (as ocultas e os concluídos ficam fora), em barras: **Por lista** (as 6 com mais; "+N listas" mostra as outras), **Por cômodo** e **Por equipamento** (só com **Usar cômodos** e **Usar equipamentos** ligados; uma tarefa com dois equipamentos conta nos dois e nos cômodos deles), **Por prazo** (atrasados, hoje, próximos 7 dias, mais adiante e sem prazo, nas listas com prazo e com **Controlar prazos** ligado) e **Quem faz** (nós mesmos × serviço externo, quando alguma tarefa é de fora e com **Serviços externos** ligado). Tocar numa lista abre a lista; num cômodo, num equipamento ou em Serviço externo, abre o **Buscar** com ele; num prazo, abre as **Sugestões**.
- **Relatório de pendências**: as tarefas abertas das listas marcadas, numa página para ver e baixar em PDF (**Baixar PDF**: o celular abre o arquivo, de onde dá para imprimir ou compartilhar; o app do Home Assistant não imprime uma página). No alto, um cabeçalho com o app, o que é o relatório, quando foi gerado e quais listas; depois os números (pendentes, atrasadas, para hoje, sem prazo), os gráficos da aba **Gráficos** (por lista, cada uma na sua cor; por prazo; e, quando há, por cômodo, por equipamento e quem faz) e uma parte por lista, com o dono, as atrasadas primeiro (em vermelho) e o que estiver ligado (repetição, pontos, cômodos, equipamentos, serviço externo). No fim, a marca da **CorrerIA Code**, como no **Sobre**. Dá para trocar para uma lista só (as ocultas não entram). A página abre no tema e na cor do app; o PDF sai sempre claro, com o mesmo cabeçalho, os gráficos e, no pé de cada página, a marca e o número da página.
- **Configurações**, em abas: **Integrações** (recompensas do CronologIA, InventarIA, leitura por IA, Falar, uso da IA e sensores), **Dados** (exportar, backup, importar, versões), **Aparência** (tema e cor; com **Cor do dia**, ligada no começo, a cor muda todo dia sozinha, e escolher uma cor deixa fixa nela) e **Opções** (**Prazos**: controlar prazos; **Exibição**: agrupar por dispositivo, concluídos abertos, notas; **Quem faz**: serviços externos; **Repetição**: ligar ou desligar e as tarefas que voltam sozinhas).
- **Sobre**, por último: quem faz o app (**CorrerIA Code**), os outros apps da família, cada um com uma linha e o link para o GitHub, e **Meu GitHub**.

A barra de baixo tem **Sugestões** (a primeira, onde o app abre), **Buscar**, **Adicionar**, **Listas** e **Mais**. No celular, arrastar para o lado troca de aba, na mesma ordem.

As caixas de seleção (como **Fala para texto**, o horário do aviso ou a lista de um item ao importar) abrem uma janela de baixo para cima com as opções; a atual vem marcada. O Voltar do celular, o **X** ou tocar fora fecham sem mudar nada. No computador, a janela abre no meio da tela, e dá para escolher com as setas e Enter. Nada abre a janela do próprio celular: a data (**Outra data**) abre um mês no visual do app, e os horários vêm de meia em meia hora, sem AM/PM.

### No computador

Com a tela larga (1000 pixels ou mais, como no InventarIA), as abas de baixo viram uma **barra lateral**, com as seções (Sugestões, Buscar, Listas, Mais) e as **listas**, cada uma com o que falta. No alto, à direita, ficam a **Conversa**, o **Falar**, **Ler com IA** e **Adicionar item**; no início, ao lado do caderno, **Atrasados**, **Para hoje**, **Próximo prazo** e **Mais cheia** (cada um abre o que mostra). As janelas (Novo item, editar) abrem no meio da tela. O **Buscar** já abre com o cursor no campo, e a tecla **/** abre o Buscar de qualquer tela (como no InventarIA). No celular e no tablet nada muda; lá o Buscar não abre o teclado sozinho.

## Listas e itens

- No início, as listas com mais pendências vêm primeiro, agrupadas pelo dispositivo de onde vêm ("Notas e Rotinas do Alexa To-do list" vira **To-do list** no grupo *Notas e Rotinas do Alexa*); as outras ficam em **Listas locais**. As ocultas (**Ocultar do início**) ficam no fim, recolhidas em **Inativas**, com quantas são: um toque abre, e dali dá para abrir a lista.
- Numa lista, escreva no campo do alto e toque em **+** (colar várias linhas cria um item por linha). Tocar no quadrado conclui, com **Desfazer** no aviso de baixo; a alça à direita arrasta para reordenar; os concluídos ficam recolhidos no fim, com **Limpar**.
- Tocar num item abre **Editar item**: texto, **Notas**, **Prazo** (Hoje, Amanhã, Sábado, Próx. semana ou **Outra data**, que abre o mês logo abaixo: **‹** e **›** trocam o mês e um toque no dia escolhe) e, quando a lista aceita, **Horário** (**Dia todo**, **08:00** ou **Outro horário**, de meia em meia hora), **Repetir depois de concluir**, **Cômodo** e **Equipamento** (com o InventarIA), **Quem faz** (com **Serviços externos** ligado), **Pontos para quem concluir** (com as Recompensas) e **Lista**, para mover. Só aparece o que a lista e as opções ligadas permitem.
- **Notas** pode ser desligado em **Mais › Configurações › Opções › Exibição**: o campo some do **Novo item** e do **Editar item**, a não ser num item que já tem notas (para ver ou apagar). As notas que já existem continuam aparecendo nas listas.
- Um link vira uma etiqueta curta: `Ver sobre: https://github.com/fulano/projeto` mostra `fulano/projeto`.
- O **⋯** da lista: **Selecionar itens**, **Personalizar** (nome, cor, ícone, de quem é e prazos), **Ocultar do início**, **Abrir na tela padrão do HA** e **Limpar concluídos**.
- **De quem é** (em Personalizar): **Todos** (o padrão) ou uma pessoa da casa. O aviso de prazos de uma lista com dono vai só para o celular dessa pessoa, e na CronologIA (1.53.0 ou mais novo) ela só aparece para essa pessoa. Se a CronologIA já tinha o dono de alguma lista, ele vem sozinho, uma vez.

### Mover vários itens de lista

Segure um item (ou use **⋯ › Selecionar itens**) para selecionar: toque nos outros que vão junto, ou em **Todos**, e depois em **Mover para outra lista**. Cada item vai com o prazo, a repetição, os pontos, os cômodos, os equipamentos e quem faz. O **×** sai da seleção.

### Buscar

A aba **Buscar** abre com todos os pendentes das listas que aparecem (as ocultas ficam fora), separados por lista, como no InventarIA. Digitar procura no texto e nas notas, sem ligar para acentos. Em **Incluir** ficam **Concluídos**, **Serviços externos** (acha por quem faz; só com **Serviços externos** ligado em Opções) e, com o InventarIA, **Cômodos** e **Equipamentos** (acha pelo nome ou pela zona; só aparecem com **Usar cômodos** e **Usar equipamentos** ligados).

**Selecionar** (ao lado da contagem, ou segurando um item) escolhe vários pendentes, de listas diferentes; **Todos** pega os que estão à vista (com o que foi digitado). **Alterar N itens** abre uma janela com **Prazo** (e o **Horário**), **Cômodo**, **Equipamento**, **Quem faz** e **Lista** (mover), cada um começando em **Manter**: só muda o que você escolher, e cada campo só aparece com a opção dele ligada (**Controlar prazos**, **Usar cômodos**, **Usar equipamentos**, **Serviços externos**). O que uma lista não aceita fica como estava: prazo numa lista sem datas, mover de uma lista que não apaga e, numa tarefa com equipamento, o cômodo (que vem dele). O aviso no fim diz quantos mudaram. Manutenções e rotinas do CronologIA não entram (mude por lá).

No início, logo abaixo do resumo, fica o campo **Buscar entre N itens**, como no InventarIA: a primeira letra já abre o **Buscar** com o que você digitou, e dá para continuar digitando lá.

## Falar

O **microfone** no alto da tela, à direita (no início, nas outras telas e dentro de cada lista): toque, fale os itens ("Comprar pilhas, trocar a lâmpada da sala e ligar para o encanador") e toque de novo. O Home Assistant transcreve com a **fala para texto do Assist** (Configurações › Assistentes de voz; com o Home Assistant Cloud já vem pronta, em português), e a IA separa os itens (sem IA, o app separa por vírgulas e "e"). Para usar outro motor de fala (Whisper, Google…) sem mexer no assistente de voz do Home Assistant, escolha em Mais › Configurações › Integrações › **Falar**. Você confere e adiciona: a IA sugere a lista de cada item (dentro de uma lista, na dúvida, fica nela) e dá para trocar item por item. Até 2 minutos por vez. O microfone só aparece quando o Home Assistant tem fala para texto; o navegador ou o app do celular pede permissão na primeira vez.

## Conversa com a IA

O botão de balão, ao lado do microfone, abre uma conversa com a IA. Pergunte sobre a tela em que está ("o que é mais urgente aqui?"), sobre as listas ("o que está atrasado?") ou sobre qualquer outro assunto; dá para escrever ou tocar no microfone e falar. Ela conhece as listas visíveis e os itens pendentes, com prazo, pontos, cômodo e equipamento.

Pedindo para mexer nas listas ("adiciona pilhas e lâmpada na lista Casa", "conclui passar pano"), ela mostra cada ação num cartão e só faz quando você toca em **Fazer** (ou **Fazer todas**). A conversa continua ao fechar e abrir a janela; **Nova** começa outra. Com **Usar IA** desligado, o botão não aparece. Cada mensagem conta em **Uso da IA** como Conversa.

## Importar de mensagem ou foto

No botão **Adicionar** (ou no ícone ao lado do campo de adicionar de uma lista) há três quadros, no alto do formulário:

- **Colar mensagem**: cole uma mensagem do WhatsApp, e-mail ou anotação ("amor compra leite, ovos e café"). A IA separa os itens.
- **Escolher fotos**: prints ou fotos de listas da galeria. No app Android do Home Assistant é uma foto por vez (limitação da versão atual do app); use **Mais fotos** na revisão para juntar outras.
- **Digitalizar com IA**: abre a câmera dentro do ResolvIA para fotografar uma lista em papel, mesmo escrita à mão. Dá para tirar várias páginas e usar a lanterna. Na primeira vez, o celular pede permissão de câmera para o app do Home Assistant.

Você revisa os itens (dá para corrigir, desmarcar ou incluir linhas). Embaixo de cada um fica a lista para onde ele vai, sugerida pela IA (comprar leite → a lista de compras, consertar a pia → Casa), e, com o InventarIA, o cômodo e o equipamento; toque para trocar. **Todos em** manda todos para uma lista só.

### Leitura por IA

**Usar IA** (em **Mais › Configurações › Integrações › Leitura por IA**) liga ou desliga tudo o que usa IA. Desligada, somem o **Colar mensagem**, o **Escolher fotos** e o **Digitalizar com IA** (no Adicionar e no botão ao lado do campo de cada lista), o **Falar**, a **Conversa**, o **Sugerir com IA** e o **Uso da IA**, e o app não chama a IA. Colar várias linhas no campo de adicionar continua criando um item por linha. Começa ligada.

**Uso da IA** (logo abaixo, em Mais › Configurações › Integrações): cada mensagem, foto, sugestão ou conversa é uma chamada para a IA do Home Assistant. Como o Home Assistant não informa tokens nem custo, o ResolvIA conta as chamadas e estima os tokens pelo tamanho do texto (uns 4 caracteres por token). Mostra hoje, os últimos 7 dias e o mês, um gráfico por dia (toque numa barra para ver o dia), os tipos de chamada e as últimas chamadas, com o link para o consumo exato no painel do provedor (Google, OpenAI ou Anthropic). Os números ficam em `/data/uso_ia.json` (120 dias).

**Sensores no Home Assistant** (no fim de Integrações, desligado por padrão): ligado, o app cria o `sensor.resolvia_ia_hoje`, com as chamadas de hoje, os erros, a cota e os tokens estimados, para um painel ou uma automação. Desligado, o app apaga o sensor.

O ResolvIA não tem IA própria e não guarda chave de API. Ele usa a ação `ai_task.generate_data` do Home Assistant, então funciona com a integração de IA que você configurar lá, e dá para trocar quando quiser:

| Integração | Observação |
|---|---|
| Anthropic (Claude) | Precisa de chave da API da Anthropic. Lê fotos. |
| OpenAI | Precisa de chave da API da OpenAI. Lê fotos. |
| Google Gemini | Costuma ter uma cota gratuita. Lê fotos. |
| Ollama | Roda um modelo local na sua rede, sem custo e sem mandar nada para fora. Para fotos, use um modelo que entenda imagens (por exemplo `qwen2.5vl` ou `gemma3`). |

Para configurar:

1. Em **Configurações > Dispositivos e serviços > Adicionar integração**, escolha a integração e siga os passos.
2. Na página da integração, adicione uma **tarefa de IA** (AI Task). Para ler fotos, escolha um modelo que entenda imagens.
3. No ResolvIA, abra **Mais › Configurações › Integrações › Leitura por IA** e escolha essa IA. "Padrão do Home Assistant" usa a IA preferida definida em **Configurações > Sistema > Geral**. Toque em **Verificar de novo** para conferir se ela está pronta.

Na hora da leitura, o app copia a foto por alguns segundos para `media/resolvia/ia-temp`, chama a IA pelo Home Assistant e apaga a cópia em seguida.

Sem IA configurada, a mensagem colada é separada por linhas, vírgulas e "e"; só a leitura de fotos fica desligada.

## Tarefas que voltam sozinhas

Ligue em **Mais › Configurações › Opções › Repetição › Repetir depois de concluir** (numa instalação nova começa desligado; quem já tinha repetições continua com ela ligada). Depois, abra um item e escolha **Repetir depois de concluir** (todo dia, 2 ou 3 dias, 1 ou 2 semanas, 1 mês ou outro número de dias).

Para desligar com repetições já criadas, o app avisa quantas são e que **serão excluídas**; confirmando, ele apaga todas e desliga (os itens continuam nas listas, só não voltam mais sozinhos). Repetições que ficaram "pausadas" de versões anteriores aparecem em Mais › Configurações › Opções › Repetição com o botão **Excluir**. Para o que se repete com dia certo, ou N dias depois de feito com pontos, dá para usar a **Rotina da casa** do CronologIA (1.11.0 ou mais novo, frequência **Depois de feita**).

Exemplo: "Passar pano" com **3 dias**. Você marca como feito no domingo e ele volta como pendente na quarta, logo no começo do dia. Se a lista aceita datas, ele volta com prazo **Hoje**.

- Funciona mesmo se você concluir pela Alexa, pela tela padrão do HA ou por automação.
- Se os concluídos forem apagados antes da hora, o item é criado de novo.
- Desmarcar o item antes da hora cancela a volta daquela vez.
- Apagar um item pendente remove a repetição dele.
- Todas as repetições aparecem em **Mais › Configurações › Opções**, e as próximas voltas em **Sugestões → Voltam sozinhas** (com Controlar prazos ligado).
- No card **Tarefas** do CronologIA (1.10.1 ou mais novo), as tarefas aparecem nessa ordem de frequência: primeiro as de todo dia, depois as de 2 dias, e assim por diante; as que não se repetem ficam por último.

## O que dá para fazer em cada lista

Depende da integração da lista. A Lista de tarefas local aceita tudo (prazo, horário, notas, reordenar). A Shopping list aceita reordenar mas não prazos. As listas da Alexa aceitam adicionar, editar e excluir. O ResolvIA mostra só o que cada lista suporta.

## Recompensas (pontos)

Com o **CronologIA** no mesmo Home Assistant, a integração com o ResolvIA ligada lá (CronologIA › Mais › Integrações › Tarefas do ResolvIA › Usar a integração, desligada por padrão desde a 1.16.0) e o placar ligado (CronologIA › Recompensas), as tarefas daqui podem valer pontos:

1. Em **Mais › Configurações › Integrações › Recompensas**, ligue **Usar recompensas** (começa desligado; desligado, o card mostra só a chave e nada vai para o placar). Ligado, aparece se o placar do CronologIA foi encontrado, quem participa e para quem vão os pontos neste usuário.
2. Abra uma tarefa e escolha **Pontos para quem concluir** (+5, +10, +20, +30, +50 ou outro valor). A tarefa passa a mostrar o troféu com os pontos.
3. Ao concluir, os pontos vão para o placar: para a pessoa ligada ao seu usuário do Home Assistant, ou para quem você escolher em **Quem fez?**. Com duas pessoas no placar, o aviso de baixo tem **Foi** e o nome da outra, para trocar; desmarcar a tarefa tira os pontos do dia.

Os pontos ficam pelo nome da tarefa em cada lista, então valem também quando uma tarefa que se repete volta. A mesma tarefa no mesmo dia conta uma vez só, mesmo concluída no CronologIA. Concluir pela Alexa ou pela tela padrão do Home Assistant não dá pontos (o app não sabe quem foi).

## Serviço externo

No item, **Quem faz** diz se é com vocês (**Nós mesmos**) ou um **Serviço externo**: uma pessoa ou empresa de fora vai fazer (eletricista, assistência técnica, diarista). Dá para escrever quem, ou deixar em branco. Não aparece nas listas sem prazo nem notas (como as de compras). A tarefa ganha uma etiqueta anil com o capacete e o nome; o **Buscar** acha por quem faz (ou por "serviço externo"), com **Incluir › Serviços externos** ligado (vem ligado); mover a tarefa leva junto; e o **Sugerir com IA** e a **Conversa** sabem que o que vocês fazem é chamar, marcar ou cobrar.

Para não usar, desligue **Mais › Configurações › Opções › Quem faz › Serviços externos**: somem o **Quem faz** do item, as etiquetas, o filtro do **Buscar** e o gráfico **Quem faz**, e a IA não fica sabendo quem faz. O que já estava marcado fica guardado (e acompanha a tarefa se ela mudar de nome ou de lista); religando, volta tudo.

## Cômodos e equipamentos (InventarIA)

Com o **InventarIA** (1.14.0 ou mais novo) no mesmo Home Assistant, ligue **Mais › Configurações › Integrações › InventarIA › Usar cômodos** (desligado por padrão). A partir daí:

- cada tarefa pode ter um **cômodo** (Cozinha, Sala…), escolhido no item, ou vários (passar pano na sala e na cozinha): cada cômodo liga e desliga, **Todos** marca a casa inteira (tocado de novo, desmarca) e **Nenhum** limpa. Eles aparecem como etiquetas embaixo da tarefa; com todos marcados, uma só: **Todos os cômodos**;
- ao ler com IA (mensagem, foto ou Falar), a IA sugere o cômodo de cada item na revisão, e dá para trocar (também por **Todos os cômodos**);
- o **Sugerir com IA** considera os cômodos e junta o que dá para fazer no mesmo lugar;
- o **CronologIA** mostra o cômodo das tarefas e pede o cômodo em **Novo › Tarefa**.

Com **Usar equipamentos** ligado (InventarIA 1.15.0 ou mais novo), cada tarefa pode apontar também para itens do InventarIA (equipamentos, móveis), um ou vários (**Outro equipamento**), buscados entre os do cômodo e os dos outros. Com equipamento, o cômodo fica bloqueado: é o dos equipamentos, um ou vários. Na lista, com um equipamento aparecem o cômodo e o equipamento; com vários, uma etiqueta só, **Vários equipamentos** (e, com vários cômodos, **Vários cômodos**); quais são, abrindo a tarefa. A IA sugere o equipamento na leitura e o considera no Sugerir com IA, e o CronologIA mostra e pede o equipamento no Novo › Tarefa.

No **Buscar**, digitar o cômodo ou o equipamento (o nome ou a zona) traz as tarefas ligadas a eles; em **Incluir**, os botões **Cômodos** e **Equipamentos** ligam e desligam isso (só aparecem com a opção ligada).

Os cômodos e os itens vêm do InventarIA (só leitura, pela rede interna dos apps, com a chave que ele grava em `share/inventario`). O ResolvIA guarda os cômodos e os equipamentos de cada tarefa pelo nome dela, junto com os pontos, e eles entram no exportar e no backup.

## Levar uma lista para o CronologIA

No CronologIA 1.13.0 ou mais novo, **Mais › Integrações › Tarefas do ResolvIA › Trazer uma lista para o CronologIA** transforma as tarefas de uma lista daqui em **Rotinas da casa** de lá. As que se repetem viram "Depois de feita" com os mesmos dias, e os pontos vão junto. As tarefas levadas saem da lista daqui, e o ResolvIA tira a repetição, os pontos, o cômodo e o equipamento delas, para não voltarem sozinhas.

## Manutenções e rotinas do CronologIA

No CronologIA 1.10.0 ou mais novo, **Mais › Integrações › Tarefas do ResolvIA › Levar para o ResolvIA** coloca as manutenções e as rotinas da casa como tarefas numa lista daqui (a que você escolher lá). Cada uma aparece uma vez, com a próxima data e o troféu com os pontos dela (com **Usar recompensas** ligado; desligado, concluir aqui conta como feito lá, sem pontos).

- **Concluir** aqui vale como Feito no CronologIA: os pontos vão para quem concluiu (ou para quem você escolher em **Quem fez?**), com o **Foi…** do aviso para trocar. Logo depois a tarefa volta pendente com a data seguinte.
- **Desmarcar** (ou **Desfazer**) desfaz no CronologIA também.
- Tocar na tarefa mostra o nome, a data, os pontos (quando valem: **Recompensas** e placar ligados) e as notas, só para ver: o nome, a data, as notas e os pontos se mudam no CronologIA, que reescreve a tarefa. **Excluir** tira da lista até a próxima data.
- Nas notas vai uma marcação técnica, `[cr:…]`, que liga a tarefa à do CronologIA. O app a esconde.

## CorrerIA (WhatsApp, Claude e Gemini)

O **CorrerIA** é o app da CorrerIA Code que junta os apps da casa no WhatsApp, no Claude e no Gemini. Com ele, dá para perguntar "o que está atrasado?", pedir "põe leite e café na lista de compras" ou "marca lavar o carro como feito, fui eu" sem abrir o ResolvIA.

1. Aqui, em **Mais › Configurações › Integrações › CorrerIA**, ligue **Usar com o CorrerIA** (começa desligado; não precisa do **Usar IA**, porque quem pensa é a IA do CorrerIA, o Claude ou o Gemini).
2. No app **CorrerIA**, no mesmo Home Assistant, conecte o **WhatsApp** (o número da casa) e, se quiser, o **Claude** ou o **Gemini** (cada pessoa aprova no painel do Home Assistant). O manual do CorrerIA explica cada um.

Pelo CorrerIA dá para:

- ver o resumo do dia (o que está atrasado, vence hoje e nos próximos 7 dias) e buscar tarefas por lista, texto, prazo ou cômodo;
- ver as tarefas que se repetem e quanto vale cada tarefa no placar (com **Repetir depois de concluir** e **Usar recompensas** ligados);
- criar tarefas (várias de uma vez, uma por linha) com prazo, horário, notas, repetição, pontos, cômodos, equipamentos e quem faz, conforme o que a lista aceita e o que está ligado no app;
- editar, mover para outra lista, concluir e desfazer, e apagar (apagar tira também a repetição).

Ao concluir uma tarefa que vale pontos, eles vão para quem está falando (a pessoa do Home Assistant ligada ao placar do CronologIA) ou para quem a pessoa disser; sem saber quem foi, o CorrerIA pergunta. As manutenções e rotinas do CronologIA se concluem por aqui, mas se editam lá.

O cartão mostra quem usou por último (**Claude usou hoje às 09:41**). Desligando, o arquivo de conexão some e a chave deixa de valer na hora. Nada de fotos, backups ou ajustes passa pelo CorrerIA.

## Prazos

As **Sugestões** (a tela inicial) juntam o que tem prazo nas listas que aparecem: **Atrasados** e **Hoje** no alto, depois o **Comece por aqui**, **Amanhã**, **Próximos 7 dias**, **Mais adiante** e o que vai voltar sozinho em **Voltam sozinhas**. O número na aba é o que está atrasado ou vence hoje.

Prazo é só o que você define. Algumas integrações preenchem sozinhas a data dos itens: a Problem List da Análise dos Dispositivos, por exemplo, põe ali desde quando o aparelho está fora do ar. Como essas listas não deixam você definir prazo, a data delas aparece só como informação (em cinza, com um relógio apagado): não fica vermelha, não entra nas **Sugestões** como prazo nem no número da aba, e o CronologIA também não a trata como tarefa com prazo.

Nas listas em que você define prazo, dá para desligar os prazos em **⋯ › Personalizar › Prazos**.

**Avisar o que vence hoje** (em **Mais › Configurações › Opções › Prazos**, desligado por padrão): uma vez por dia, no horário escolhido (de meia em meia hora; 08:00 de início), cada pessoa da casa recebe no celular o que vence hoje nas listas dela (**⋯ › Personalizar › De quem é**) e nas de todos: um por linha, com o horário quando tem, e quantos estão atrasados. Tocar no aviso abre o app nas **Sugestões**. O aviso vai para a pessoa, nos celulares ligados a ela no Home Assistant (o app do Home Assistant no celular, em **Configurações › Pessoas**): **Quem recebe** mostra as pessoas, e quem não tem celular ligado aparece como "sem celular". **Testar** manda o aviso de hoje para o seu celular. Se nada vence no dia para alguém, não chega aviso para essa pessoa. Valem as listas que aparecem e que têm prazo; com **Controlar prazos** desligado, não há aviso.

As tarefas com prazo também aparecem no CronologIA, na **Agora** e no calendário, quando a integração com o ResolvIA está ligada lá (as listas com prazos desligados ficam de fora). O aviso de prazos vem só daqui.

Para não usar prazo em nada (deixando as datas para o CronologIA), desligue **Mais › Configurações › Opções › Prazos › Controlar prazos**. Somem o que vence das Sugestões, o campo Prazo do item e a opção de prazos em Personalizar. As datas que os itens já têm (inclusive as que o CronologIA põe) continuam guardadas e aparecem só como informação, em cinza. No CronologIA (1.16.0 ou mais novo), o **Novo › Tarefa** também deixa de oferecer prazo; o resto continua igual por lá.

## Sugestões

A primeira aba e a tela onde o app abre, para já saber o que fazer: com **Controlar prazos** ligado, o que está atrasado e o que vence hoje no alto (e, depois do Comece por aqui, o resto do que vence; veja **Prazos**); e o que vale resolver agora, olhando as listas que aparecem.

- **Comece por aqui**: 5 itens (ou todos, se houver menos; os que já estão num grupo de prazo ficam fora), cada um com o motivo; os com motivo mais forte vêm primeiro, no máximo 2 da mesma lista enquanto outras listas têm o que sugerir. Quando falta motivo (itens novos, ou uma lista só), o resto vem na ordem da lista: "Primeiro da lista", "2º da lista"… Os motivos são: há quanto tempo está na lista, se é o último (ou faltam 2) para zerar a lista, se vale pontos, se é uma repetição que voltou, se o CronologIA pôs data para hoje ou a data já passou. Itens de integrações que guardam "desde quando" (como a Problem List) usam essa data.
- **Compras**: as listas de compras ficam à parte, com quantos itens têm e há quanto tempo o mais antigo espera.
- **Sugerir com IA** (no fim do Comece por aqui, só com **Usar IA** ligado): a IA do Home Assistant olha os itens pendentes (com cômodos, equipamentos e quem faz) e troca o Comece por aqui pelos que ela escolheu, com o porquê embaixo de cada um. Só roda quando você toca e entra no **Uso da IA**. A escolha fica guardada; **Sugerir de novo** pede outra e **Voltar ao automático** volta para a escolha do app.

O Home Assistant não guarda quando um item foi criado, então o ResolvIA anota a primeira vez que vê cada item pendente (`/data/idades.json`). Os itens que já estavam nas listas contam a partir do dia em que você atualizou para a versão 2.14.0.

## Onde ficam os dados

- As tarefas continuam nas próprias listas do Home Assistant.
- Nome, cor e ícone de cada lista, listas ocultas, os ajustes do app, as regras de repetição e, de cada tarefa, os pontos, os cômodos, os equipamentos e quem faz ficam em `/data/resolvia.json` dentro do app (entram no backup do Home Assistant).
- Desde quando cada item pendente está na lista (para as Sugestões) fica em `/data/idades.json`, o Uso da IA em `/data/uso_ia.json` e, com o CorrerIA, a chave da conexão em `/data/correria.key` (fora do exportar e dos backups da pasta share) e o último uso em `/data/correria_uso.json`.
- O tema (automático, claro ou escuro) é escolhido por aparelho; a conversa com a IA fica no aparelho, enquanto o app está aberto.

## Dados: exportar, backup e importar

Em **Mais › Configurações › Dados**:

- **Exportar**, cada um com o seu **Baixar**:
  - **Planilha (CSV)**: uma linha por item, com lista, situação, prazo, notas, repetição e pontos. Separada por ponto e vírgula, abre direto no Excel.
  - **Dados completos (JSON)**: o mesmo conteúdo do `resolvia.json` do ZIP.
  - **Tudo (ZIP)**: `resolvia.json` com todas as listas e itens (prazo, notas, concluídos) e os ajustes do app (com repetições, pontos, cômodos, equipamentos e quem faz), `resolvia.csv` para o Excel, uma pasta `listas` com um arquivo de texto por lista (marcado `[x]` quando concluído) e um `LEIA-ME.txt`.
- **Backup na pasta share**: grava o ZIP em `share/resolvia`, que você acessa pela rede (Samba) ou pelo File editor. Os últimos backups aparecem logo abaixo, com **Restaurar**.
- **Importar backup ou JSON**: escolha um .zip ou .json exportado pelo ResolvIA.
  - Os ajustes do app (nomes, cores, ícones, listas ocultas, tarefas que se repetem, pontos, cômodos, equipamentos e quem faz) passam a ser os do arquivo.
  - Os itens **pendentes** que não estiverem nas listas voltam, com prazo e notas, sem duplicar o que já existe (compara pelo nome). Os concluídos ficam só no arquivo.
  - Num Home Assistant novo, as listas são encontradas pelo nome. Lista que não existir aparece no aviso ("Lista não encontrada"); crie a lista e importe de novo.
  - Lista que não aceita itens novos (ou só aceita prazo sem horário) recebe o que for possível.
- **Versões anteriores**: uma cópia dos ajustes e das repetições a cada 10 minutos de uso e antes de importar ou restaurar. Ficam as 3 mais recentes. **Restaurar** volta os ajustes e as repetições; os itens das listas não mudam.

## Segurança

O app só aceita comandos de listas de tarefas (`todo.*`), além de chamar a IA (`ai_task.generate_data`) e a fala para texto do Home Assistant. Ele não lê nem controla nenhuma outra entidade da casa; a única que ele cria é o `sensor.resolvia_ia_hoje`, e só com **Sensores no Home Assistant** ligado. Na pasta `share` ele só grava e lê os próprios backups, em `share/resolvia`, e o arquivo `share/resolvia/integracao.json` (nome e versão do app, se controla prazos, as listas sem prazo, os pontos das tarefas, de quanto em quanto tempo cada uma volta e, com o InventarIA ligado, os cômodos e os equipamentos das tarefas, sem chave), que o CronologIA usa. Ele escuta dois eventos do CronologIA: `resolvia_comodo` (o cômodo ou o equipamento escolhido lá para uma tarefa daqui) e `resolvia_esquecer` (as tarefas levadas para lá, em Trazer uma lista para o CronologIA, perdem aqui a repetição, os pontos, o cômodo e o equipamento). Do CronologIA ele só lê `share/cronologia/integracao.json` (o placar e quais tarefas vêm das manutenções e rotinas). Os pontos vão para o CronologIA pelo evento `cronologia_pontos` do Home Assistant. Do InventarIA ele lê `share/inventario/integracao.json` e, só com **Usar cômodos** ou **Usar equipamentos** ligado, a lista de cômodos e de itens, sem mudar nada lá. Com **Usar com o CorrerIA** ligado, ele grava `share/resolvia/correria.json` (o endereço do app e uma chave própria, só para o dono do arquivo) e responde ao CorrerIA, pela rede interna dos apps e só com essa chave, em `/api/integracao/ferramentas`: as mesmas ações da tela, nas listas de tarefas. Desligado, o arquivo some e a chave não vale mais.
