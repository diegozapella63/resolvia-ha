# ResolvIA

Um painel para as **listas de tarefas nativas** do Home Assistant (`todo.*`): Lista de tarefas local, Shopping list, Alexa, Google Tasks, CalDAV… Tudo em tempo real e com um visual bem mais caprichado que a tela padrão.

Nada é copiado: o ResolvIA mostra e edita as mesmas listas que o HA já tem.

## Primeiros passos

1. Depois de instalar, toque em **Iniciar**.
2. Ative **Mostrar na barra lateral** (e, se quiser, **Watchdog**).
3. Abra o **ResolvIA** pela barra lateral.

## Importar de mensagem ou foto

No botão **Adicionar** (ou no ícone ao lado do campo de adicionar de uma lista) há três caminhos:

- **Colar mensagem**: cole uma mensagem do WhatsApp, e-mail ou anotação ("amor compra leite, ovos e café"). A IA separa os itens.
- **Escolher fotos**: prints ou fotos de listas da galeria. No app Android do Home Assistant é uma foto por vez (limitação da versão atual do app); use **Mais fotos** na revisão para juntar outras.
- **Digitalizar com IA**: abre a câmera dentro do ResolvIA para fotografar uma lista em papel, mesmo escrita à mão. Dá para tirar várias páginas e usar a lanterna. Na primeira vez, o celular pede permissão de câmera para o app do Home Assistant.

Você revisa os itens (dá para corrigir, desmarcar ou incluir linhas) e escolhe a lista antes de adicionar.

### Leitura por IA

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
3. No ResolvIA, abra **Mais > Leitura por IA** e escolha essa IA. "Padrão do Home Assistant" usa a IA preferida definida em **Configurações > Sistema > Geral**. Toque em **Verificar de novo** para conferir se ela está pronta.

Na hora da leitura, o app copia a foto por alguns segundos para `media/resolvia/ia-temp`, chama a IA pelo Home Assistant e apaga a cópia em seguida.

Sem IA configurada, a mensagem colada é separada por linhas, vírgulas e "e"; só a leitura de fotos fica desligada.

## Tarefas que voltam sozinhas

Abra um item e escolha **Repetir depois de concluir** (todo dia, 2 ou 3 dias, 1 ou 2 semanas, 1 mês ou outro número de dias).

Exemplo: "Passar pano" com **3 dias**. Você marca como feito no domingo e ele volta como pendente na quarta, logo no começo do dia. Se a lista aceita datas, ele volta com prazo **Hoje**.

- Funciona mesmo se você concluir pela Alexa, pela tela padrão do HA ou por automação.
- Se os concluídos forem apagados antes da hora, o item é criado de novo.
- Desmarcar o item antes da hora cancela a volta daquela vez.
- Apagar um item pendente remove a repetição dele.
- Todas as repetições aparecem em **Mais → Tarefas que se repetem**, e as próximas voltas em **Prazos → Voltam sozinhas**.

## O que dá para fazer em cada lista

Depende da integração da lista. A Lista de tarefas local aceita tudo (prazo, horário, notas, reordenar). A Shopping list aceita reordenar mas não prazos. As listas da Alexa aceitam adicionar, editar e excluir. O ResolvIA mostra só o que cada lista suporta.

## Onde ficam os dados

- As tarefas continuam nas próprias listas do Home Assistant.
- Nome, cor e ícone de cada lista, listas ocultas e as regras de repetição ficam em `/data/resolvia.json` dentro do app (entram no backup do Home Assistant).
- O tema (automático, claro ou escuro) é escolhido por aparelho.

## Segurança

O app só aceita comandos de listas de tarefas (`todo.*`). Ele não lê nem controla nenhuma outra entidade da casa.
