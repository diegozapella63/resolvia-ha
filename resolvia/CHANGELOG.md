# Changelog

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
  - Concluir aqui vale como **Feito** no CronologIA e dá os pontos para quem concluiu (com **Quem fez?** e **Foi Andressa**); desmarcar desfaz lá também. A tarefa volta sozinha com a data seguinte.
  - Tocar numa delas abre um resumo só para ver (nome, data, pontos e notas), porque quem manda nelas é o CronologIA. Excluir tira da lista até a próxima data.
  - A marcação técnica `[cr:…]` que vai nas notas fica escondida.

## 2.8.1

- Abas de baixo na nova ordem: **Listas · Buscar · Adicionar · Prazos · Mais**.

## 2.8.0

- **Recompensas**: as tarefas podem valer pontos no placar do CronologIA. Ligue em **Mais › Integrações › Recompensas** (começa desligado), e em cada tarefa escolha **Pontos para quem concluir** (+5, +10, +20, +30, +50 ou outro valor).
  - A tarefa mostra o troféu com os pontos. Ao concluir, os pontos vão para quem está usando o app (o usuário do Home Assistant de cada um vira a pessoa do placar); se o app não souber, pergunta **Quem fez?**. O aviso de baixo tem **Foi Andressa** para trocar; desmarcar tira os pontos.
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
- Topo das páginas no mesmo padrão do EconomIA: "ResolvIA · Olá, Diego", título grande e linha de status.
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
