# ResolvIA

Um painel para as **listas de tarefas nativas** do Home Assistant (`todo.*`): Lista de tarefas local, Shopping list, Alexa, Google Tasks, CalDAV… Tudo em tempo real e com um visual bem mais caprichado que a tela padrão.

Nada é copiado: o ResolvIA mostra e edita as mesmas listas que o HA já tem.

## Primeiros passos

1. Depois de instalar, toque em **Iniciar**.
2. Ative **Mostrar na barra lateral** (e, se quiser, **Watchdog**).
3. Abra o **ResolvIA** pela barra lateral.

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
