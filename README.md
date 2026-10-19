# ResolvIA para Home Assistant

![ResolvIA](resolvia/logo.png)

Um App do Home Assistant que mostra suas **listas de tarefas nativas** (`todo.*`) num visual bem mais caprichado, traz **tarefas que voltam sozinhas** X dias depois de concluídas e **importa itens de mensagens e fotos** com IA.

[![Adicionar o repositório ao Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fdiegozapella63%2Fresolvia-ha)

## Instalação

1. Toque no botão acima. Se preferir, no Home Assistant abra **Configurações → Aplicativos → Loja de aplicativos**, toque no menu **⋮ → Repositórios** e cole:
   ```
   https://github.com/diegozapella63/resolvia-ha
   ```
2. Procure **ResolvIA** na loja, toque em **Instalar** e depois em **Iniciar**.
3. Ative **Mostrar na barra lateral**.

A primeira instalação leva alguns minutos, porque o app é montado no próprio Home Assistant.

## O que tem

- **Início** com um "caderno" mostrando quantos itens estão pendentes, quantos vencem hoje e quantos estão atrasados.
- **Listas agrupadas por dispositivo**: "Notas e Rotinas do Alexa To-do list" vira **To-do list** dentro do grupo *Notas e Rotinas do Alexa*.
- **Lista aberta** com campo de adicionar sempre à mão (colar várias linhas cria um item por linha), marcar como resolvido com **Desfazer**, arrastar para reordenar e concluídos recolhidos.
- **Links bonitos**: `Ver sobre: https://github.com/fulano/projeto` vira um chip `fulano/projeto`.
- **Editar item**: texto, notas, prazo, horário, **repetição** e **mover para outra lista**.
- **Tarefas recorrentes**: "Passar pano" com repetição de 3 dias volta como pendente 3 dias depois de você marcar como feito, mesmo se você concluir pela Alexa.
- **Importar itens**: cole uma mensagem do WhatsApp, escolha fotos ou digitalize com IA uma lista em papel; a IA do Home Assistant (ou o Gemini) separa os itens e você revisa antes de adicionar.
- **Prazos** de todas as listas, incluindo o que vai voltar sozinho.
- **Buscar** em todas as listas, sem se importar com acentos.
- **Personalizar cada lista** (nome, cor, ícone, ocultar), sincronizado entre aparelhos.
- **Tema claro e escuro** seguindo o Home Assistant.

Mais detalhes em [resolvia/DOCS.md](resolvia/DOCS.md).

## Estrutura

```
repository.yaml          repositório de apps
resolvia/                o app (config, Dockerfile, servidor Node.js)
frontend/                código-fonte da interface (Lit)
preview/                 prévia da interface com dados de exemplo
dev/fake-ha.mjs          Home Assistant falso para desenvolver sem o HA
```

## Desenvolvimento

```bash
cd frontend && npm install && npm run build      # gera resolvia/rootfs/app/www/resolvia.js
node dev/fake-ha.mjs                             # HA falso em :8123 (token "dev")
RESOLVIA_DEV=1 HA_WS_URL=ws://127.0.0.1:8123/api/websocket HA_TOKEN=dev DATA_DIR=./.data \
  node resolvia/rootfs/app/server.js             # abre em http://127.0.0.1:8099
```

Com `RESOLVIA_DAY_MS=4000` (só em modo dev) um "dia" de repetição dura 4 segundos, para testar. O HA falso também simula uma IA (`ai_task.google_ai_task`); use `MEDIA_DIR` igual a `FAKE_MEDIA_DIR` para testar a leitura de fotos, ou `FAKE_HA_NO_AI=1` para testar sem IA.

## Créditos

[Lit](https://lit.dev) (BSD-3-Clause), ícones [Lucide](https://lucide.dev) (ISC), fontes [Barlow](https://fonts.google.com/specimen/Barlow) e [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (SIL Open Font License).
