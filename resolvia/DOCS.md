# ResolvIA

Um painel para as **listas de tarefas nativas** do Home Assistant (`todo.*`): Lista de tarefas local, Shopping list, Alexa, Google Tasks, CalDAV… Tudo em tempo real e com um visual bem mais caprichado que a tela padrão.

Nada é copiado: o ResolvIA mostra e edita as mesmas listas que o HA já tem.

## Primeiros passos

1. Depois de instalar, toque em **Iniciar**.
2. Ative **Mostrar na barra lateral** (e, se quiser, **Watchdog**).
3. Abra o **ResolvIA** pela barra lateral.

O **Mais** fica em abas no alto: **Listas** (nome, cor, ícone, mostrar/ocultar e criar lista), **Repetições** (ligar ou desligar a repetição e as tarefas que voltam sozinhas), **Integrações** (recompensas do CronologIA e leitura por IA), **Dados** (exportar, backup, importar, versões), **Aparência** (tema e cor) e **Opções** (como as listas aparecem: agrupar por dispositivo, concluídos abertos).

## Importar de mensagem ou foto

No botão **Adicionar** (ou no ícone ao lado do campo de adicionar de uma lista) há três quadros, no alto do formulário:

- **Colar mensagem**: cole uma mensagem do WhatsApp, e-mail ou anotação ("amor compra leite, ovos e café"). A IA separa os itens.
- **Escolher fotos**: prints ou fotos de listas da galeria. No app Android do Home Assistant é uma foto por vez (limitação da versão atual do app); use **Mais fotos** na revisão para juntar outras.
- **Digitalizar com IA**: abre a câmera dentro do ResolvIA para fotografar uma lista em papel, mesmo escrita à mão. Dá para tirar várias páginas e usar a lanterna. Na primeira vez, o celular pede permissão de câmera para o app do Home Assistant.

Você revisa os itens (dá para corrigir, desmarcar ou incluir linhas) e escolhe a lista antes de adicionar.

### Leitura por IA

**Usar IA** (em **Mais › Integrações › Leitura por IA**) liga ou desliga tudo o que usa IA. Desligada, somem o **Colar mensagem**, o **Escolher fotos** e o **Digitalizar com IA** (no Adicionar e no botão ao lado do campo de cada lista), e o app não chama a IA. Colar várias linhas no campo de adicionar continua criando um item por linha. Começa ligada.

**Uso da IA** (logo abaixo, em Mais › Integrações): cada mensagem ou foto lida é uma chamada para a IA do Home Assistant. Como o Home Assistant não informa tokens nem custo, o ResolvIA conta as chamadas e estima os tokens pelo tamanho do texto (uns 4 caracteres por token). Mostra hoje, os últimos 7 dias e o mês, um gráfico por dia (toque numa barra para ver o dia), os tipos de chamada e as últimas chamadas, com o link para o consumo exato no painel do provedor (Google, OpenAI ou Anthropic). O sensor `sensor.resolvia_ia_hoje` traz as chamadas de hoje, com erros, cota e tokens estimados, para um painel ou uma automação. Os números ficam em `/data/uso_ia.json` (120 dias).

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
3. No ResolvIA, abra **Mais > Integrações > Leitura por IA** e escolha essa IA. "Padrão do Home Assistant" usa a IA preferida definida em **Configurações > Sistema > Geral**. Toque em **Verificar de novo** para conferir se ela está pronta.

Na hora da leitura, o app copia a foto por alguns segundos para `media/resolvia/ia-temp`, chama a IA pelo Home Assistant e apaga a cópia em seguida.

Sem IA configurada, a mensagem colada é separada por linhas, vírgulas e "e"; só a leitura de fotos fica desligada.

## Tarefas que voltam sozinhas

Ligue em **Mais → Repetições → Repetir depois de concluir** (numa instalação nova começa desligado; quem já tinha repetições continua com ela ligada). Depois, abra um item e escolha **Repetir depois de concluir** (todo dia, 2 ou 3 dias, 1 ou 2 semanas, 1 mês ou outro número de dias).

Para desligar com repetições já criadas, o app avisa quantas são e que **serão excluídas**; confirmando, ele apaga todas e desliga (os itens continuam nas listas, só não voltam mais sozinhos). Repetições que ficaram "pausadas" de versões anteriores aparecem em Mais → Repetições com o botão **Excluir**. Para o que se repete com dia certo, ou N dias depois de feito com pontos, dá para usar a **Rotina da casa** do CronologIA (1.11.0 ou mais novo, frequência **Depois de feita**).

Exemplo: "Passar pano" com **3 dias**. Você marca como feito no domingo e ele volta como pendente na quarta, logo no começo do dia. Se a lista aceita datas, ele volta com prazo **Hoje**.

- Funciona mesmo se você concluir pela Alexa, pela tela padrão do HA ou por automação.
- Se os concluídos forem apagados antes da hora, o item é criado de novo.
- Desmarcar o item antes da hora cancela a volta daquela vez.
- Apagar um item pendente remove a repetição dele.
- Todas as repetições aparecem em **Mais → Repetições**, e as próximas voltas em **Prazos → Voltam sozinhas**.
- No card **Tarefas** do CronologIA (1.10.1 ou mais novo), as tarefas aparecem nessa ordem de frequência: primeiro as de todo dia, depois as de 2 dias, e assim por diante; as que não se repetem ficam por último.

## O que dá para fazer em cada lista

Depende da integração da lista. A Lista de tarefas local aceita tudo (prazo, horário, notas, reordenar). A Shopping list aceita reordenar mas não prazos. As listas da Alexa aceitam adicionar, editar e excluir. O ResolvIA mostra só o que cada lista suporta.

## Recompensas (pontos)

Com o **CronologIA** no mesmo Home Assistant e o placar dele ligado (CronologIA › Recompensas), as tarefas daqui podem valer pontos:

1. Em **Mais › Integrações › Recompensas**, ligue **Usar recompensas** (começa desligado; desligado, o card mostra só a chave e nada vai para o placar). Ligado, aparece se o placar do CronologIA foi encontrado, quem participa e para quem vão os pontos neste usuário.
2. Abra uma tarefa e escolha **Pontos para quem concluir** (+5, +10, +20, +30, +50 ou outro valor). A tarefa passa a mostrar o troféu com os pontos.
3. Ao concluir, os pontos vão para o placar: para a pessoa ligada ao seu usuário do Home Assistant, ou para quem você escolher em **Quem fez?**. O aviso de baixo tem **Foi Andressa** para trocar; desmarcar a tarefa tira os pontos do dia.

Os pontos ficam pelo nome da tarefa em cada lista, então valem também quando uma tarefa que se repete volta. A mesma tarefa no mesmo dia conta uma vez só, mesmo concluída no CronologIA. Concluir pela Alexa ou pela tela padrão do Home Assistant não dá pontos (o app não sabe quem foi).

## Levar uma lista para o CronologIA

No CronologIA 1.13.0 ou mais novo, **Mais › Integrações › Tarefas do ResolvIA › Trazer uma lista para o CronologIA** transforma as tarefas de uma lista daqui em **Rotinas da casa** de lá. As que se repetem viram "Depois de feita" com os mesmos dias, e os pontos vão junto. As tarefas levadas saem da lista daqui, e o ResolvIA tira a repetição e os pontos delas, para não voltarem sozinhas.

## Manutenções e rotinas do CronologIA

No CronologIA 1.10.0 ou mais novo, **Mais › Integrações › Tarefas do ResolvIA › Levar para o ResolvIA** coloca as manutenções e as rotinas da casa como tarefas numa lista daqui (a que você escolher lá). Cada uma aparece uma vez, com a próxima data e o troféu com os pontos dela (com **Usar recompensas** ligado; desligado, concluir aqui conta como feito lá, sem pontos).

- **Concluir** aqui vale como Feito no CronologIA: os pontos vão para quem concluiu (ou para quem você escolher em **Quem fez?**), com **Foi Andressa** para trocar. Logo depois a tarefa volta pendente com a data seguinte.
- **Desmarcar** (ou **Desfazer**) desfaz no CronologIA também.
- Tocar na tarefa mostra o nome, a data, os pontos e as notas, só para ver: o nome, a data, as notas e os pontos se mudam no CronologIA, que reescreve a tarefa. **Excluir** tira da lista até a próxima data.
- Nas notas vai uma marcação técnica, `[cr:…]`, que liga a tarefa à do CronologIA. O app a esconde.

## Prazos

Prazo é só o que você define. Algumas integrações preenchem sozinhas a data dos itens: a Problem List da Análise dos Dispositivos, por exemplo, põe ali desde quando o aparelho está fora do ar. Como essas listas não deixam você definir prazo, a data delas aparece só como informação (em cinza, com um relógio apagado): não fica vermelha, não entra em **Prazos** nem no número da aba, e o CronologIA também não a trata como tarefa com prazo.

Nas listas em que você define prazo, dá para desligar os prazos em **⋯ › Personalizar › Prazos**.

## Onde ficam os dados

- As tarefas continuam nas próprias listas do Home Assistant.
- Nome, cor e ícone de cada lista, listas ocultas e as regras de repetição ficam em `/data/resolvia.json` dentro do app (entram no backup do Home Assistant).
- O tema (automático, claro ou escuro) é escolhido por aparelho.

## Dados: exportar, backup e importar

Em **Mais > Dados**:

- **Exportar**
  - **Tudo (ZIP)**: `resolvia.json` com todas as listas e itens (prazo, notas, concluídos) e os ajustes do app, `resolvia.csv` para o Excel, uma pasta `listas` com um arquivo de texto por lista (marcado `[x]` quando concluído) e um `LEIA-ME.txt`.
  - **Planilha (CSV)**: uma linha por item, com lista, situação, prazo, notas e repetição. Separada por ponto e vírgula, abre direto no Excel.
  - **Dados (JSON)**: o mesmo conteúdo do `resolvia.json`.
- **Backup na pasta share**: grava o ZIP em `share/resolvia`, que você acessa pela rede (Samba) ou pelo File editor. Os últimos backups aparecem logo abaixo, com **Restaurar**.
- **Importar backup ou JSON**: escolha um .zip ou .json exportado pelo ResolvIA.
  - Os ajustes do app (nomes, cores, ícones, listas ocultas e tarefas que se repetem) passam a ser os do arquivo.
  - Os itens **pendentes** que não estiverem nas listas voltam, com prazo e notas, sem duplicar o que já existe (compara pelo nome). Os concluídos ficam só no arquivo.
  - Num Home Assistant novo, as listas são encontradas pelo nome. Lista que não existir aparece no aviso ("Lista não encontrada"); crie a lista e importe de novo.
  - Lista que não aceita itens novos (ou só aceita prazo sem horário) recebe o que for possível.
- **Versões anteriores**: o app guarda sozinho uma cópia dos ajustes a cada 10 minutos de uso e sempre antes de importar ou restaurar, e mantém só as 3 mais recentes. **Restaurar** volta os ajustes e as repetições; os itens das listas não mudam.

## Segurança

O app só aceita comandos de listas de tarefas (`todo.*`). Ele não lê nem controla nenhuma outra entidade da casa; a única que ele cria é o `sensor.resolvia_ia_hoje` (Uso da IA). Na pasta `share` ele só grava e lê os próprios backups, em `share/resolvia`, e o arquivo `share/resolvia/integracao.json` (nome e versão do app, as listas sem prazo, os pontos das tarefas e de quanto em quanto tempo cada uma volta, sem chave), que o CronologIA usa. Ele escuta o evento `resolvia_esquecer` do CronologIA, que avisa quais tarefas foram levadas para lá (Trazer uma lista para o CronologIA), para tirar a repetição e os pontos delas. Do CronologIA ele só lê `share/cronologia/integracao.json` (o placar e quais tarefas vêm das manutenções e rotinas). Os pontos vão para o CronologIA pelo evento `cronologia_pontos` do Home Assistant.
