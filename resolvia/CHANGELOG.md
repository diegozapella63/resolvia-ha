# Changelog

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
