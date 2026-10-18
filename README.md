# ResolvIA

Um painel na barra lateral do Home Assistant para as suas **listas de tarefas nativas** (`todo.*`), com um visual bem mais caprichado que a tela padrão.

Nada é copiado nem duplicado: o ResolvIA lê e edita as mesmas listas que o HA já tem (Lista de tarefas local, Shopping list, Alexa, Google Tasks, CalDAV…), em tempo real, pela API oficial de to-do do Home Assistant.

## O que tem

- **Início** com um "caderno" mostrando quantos itens estão pendentes, quantos vencem hoje e quantos estão atrasados.
- **Listas agrupadas por dispositivo**: "Notas e Rotinas do Alexa To-do list" vira **To-do list** dentro do grupo *Notas e Rotinas do Alexa*.
- **Lista aberta** com campo de adicionar sempre à mão (colar várias linhas cria um item por linha), marcar como resolvido com animação e **Desfazer**, arrastar para reordenar, e concluídos recolhidos.
- **Links bonitos**: `Ver sobre: https://github.com/fulano/projeto` aparece como um chip `fulano/projeto` que abre o link.
- **Editar item**: texto, notas, prazo (Hoje, Amanhã, Sábado, outra data, horário) e **mover para outra lista**.
- **Prazos**: tudo que tem data, de todas as listas, em Atrasados / Hoje / Amanhã / Próximos 7 dias.
- **Buscar** em todas as listas, sem se importar com acentos.
- **Personalizar cada lista**: nome, cor e ícone, e ocultar listas da tela inicial. Fica salvo no HA e vale para todos os aparelhos.
- **Tema claro e escuro**: segue o modo do Home Assistant, ou force claro/escuro por aparelho.
- Funciona offline (fontes e ícones vão junto) e responde ao botão Voltar do Android.

O que dá para fazer em cada lista depende da integração dela. Ex.: a Lista de tarefas local aceita prazos, notas e reordenar; a Shopping list aceita reordenar mas não prazos. O ResolvIA mostra só o que a lista suporta.

## Instalação

### Pelo HACS (repositório personalizado)

1. No HA: **HACS → ⋮ → Repositórios personalizados**.
2. Cole `https://github.com/diegozapella63/resolvia-ha` e escolha o tipo **Integração**.
3. Procure **ResolvIA** no HACS, baixe e **reinicie o Home Assistant**.
4. **Configurações → Dispositivos e serviços → Adicionar integração → ResolvIA**.

### Manual

1. Copie a pasta `custom_components/resolvia` para `/config/custom_components/resolvia` (Samba, File editor ou Studio Code Server).
2. Reinicie o Home Assistant.
3. **Configurações → Dispositivos e serviços → Adicionar integração → ResolvIA**.

Depois disso aparece **ResolvIA** na barra lateral. Nas opções da integração dá para trocar o nome, o ícone e deixar visível só para administradores.

## Como funciona

- O painel se inscreve em `todo/item/subscribe` para cada lista, então tudo atualiza na hora (inclusive o que a Alexa adicionar).
- As alterações usam as ações nativas `todo.add_item`, `todo.update_item`, `todo.remove_item`, `todo.remove_completed_items` e o comando `todo/item/move`.
- As personalizações (nome, cor, ícone, listas ocultas) ficam em `.storage/resolvia.prefs`. O tema é escolhido por aparelho.
- Compatível com o Home Assistant 2025.1 em diante, incluindo as versões 2026.x.

## Desenvolvimento

O código-fonte do painel está em `frontend/src` (Lit + JavaScript puro). Para gerar o `custom_components/resolvia/frontend/resolvia-panel.js` e a prévia em `preview/`:

```bash
cd frontend
npm install
npm run build
```

`preview/resolvia-preview.html` abre no navegador com dados de exemplo, sem precisar do Home Assistant.

## Créditos

[Lit](https://lit.dev) (BSD-3-Clause), ícones [Lucide](https://lucide.dev) (ISC), fontes [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) e [Figtree](https://fonts.google.com/specimen/Figtree) (SIL Open Font License).
