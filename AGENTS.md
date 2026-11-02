# ResolvIA: instruções para quem continua o projeto (pessoa ou IA)

Leia isto antes de mexer. Vale para o Codex, o Claude ou qualquer outro assistente. O dono do projeto é o Diego
(diegozapella63), escreve em português do Brasil e espera respostas, textos de tela e documentação em português
(nomes de testes e comentários de código podem seguir o inglês dos arquivos vizinhos).

## O que é

App (add-on) do Home Assistant, parte de uma família do mesmo dono com o mesmo visual e as mesmas regras:
ResolvIA (tarefas), CronologIA (agenda), GerencIA (finanças), InventarIA (cômodos e equipamentos), EconomIA (compras).

- `resolvia/rootfs/app/server.js` e `lib/*.js`: o servidor Node.js (sem dependências de npm em produção).
- `frontend/src/*.js`: a interface (Lit). **Nunca edite `resolvia/rootfs/app/www/resolvia.js` à mão**: ele é gerado por
  `cd frontend && npm install && npm run build` (esbuild), que também gera a prévia em `preview/`.
- `resolvia/config.yaml`: o add-on. `resolvia/CHANGELOG.md`: o que mudou em cada versão. `resolvia/DOCS.md`: o manual
  (aba Documentação do Home Assistant). `README.md`: estrutura e como desenvolver.
- `dev/fake-ha.mjs`: um Home Assistant falso (WebSocket e REST) para desenvolver e testar sem o HA.
- `tests/`: unitários e integração (`node:test`) e `tests/e2e/` visuais (Playwright em Python). Veja `tests/README.md`.

## Rodar e testar

```bash
npm test                 # unitários e integração (Node 22, sem instalar nada)
npm run test:coverage    # quanto do código os testes percorrem
tests/e2e/run.sh         # visuais (python3, pip install playwright, python3 -m playwright install chromium)
```

Os visuais esperam os outros apps da família ao lado deste repositório (`../resolvia-ha`, `../cronologia-ha`,
`../gerencia-ha`, `../inventario-ha`) ou nas variáveis `E2E_*`; o teste que precisa de um app ausente é pulado.
Para abrir o app no navegador sem o Home Assistant, siga a seção Desenvolvimento do `README.md` (`RESOLVIA_DEV=1`; `RESOLVIA_DAY_MS=4000` faz um dia de repetição durar 4 s).

As listas são as `todo.*` do próprio Home Assistant: o ResolvIA não copia itens, só mostra e edita. O que ele guarda
(nomes, cores, repetições, pontos, cômodos) fica em `/data/resolvia.json`; as idades dos itens, em `/data/idades.json`.

## Lançar uma versão (sempre que algo muda para quem usa)

1. Versão nova em `resolvia/config.yaml` (`version`) e na constante `VERSION` de `resolvia/rootfs/app/server.js`
   e de `frontend/src/resolvia-panel.js`.
2. `resolvia/CHANGELOG.md`: entrada nova no alto, em português, dizendo o que muda para quem usa (e o que os testes acharam).
3. `resolvia/DOCS.md` quando muda algo que o usuário vê.
4. `cd frontend && npm run build` (a interface e a prévia), depois `npm test` e os visuais, todos passando.
5. Commit com mensagem em português começando pelo nome e a versão (ex.: "ResolvIA x.y.z: …") e push no `main`.

## Regras que não mudam

- **Dados pessoais só dentro do Home Assistant** (`/data`, `share/{app}`). O GitHub tem só o código. Nunca mandar o
  e-mail do dono (ou de ninguém) para serviço externo, cabeçalho ou URL.
- **Segurança**: o app só aceita os comandos do que ele cuida e recusa o resto (há testes de segurança na integração e
  nos visuais). Nada de ler ou controlar outras entidades da casa.
- **IA só pelo Home Assistant** (`ai_task.generate_data`), sem chave de API própria; tudo que usa IA pode ser desligado
  (Usar IA) e conta no Uso da IA.
- **Integrações da família** (ResolvIA, CronologIA, GerencIA, InventarIA) vêm desligadas e se falam pela pasta `share`
  e pela rede interna dos apps, com a chave que cada um grava lá. Mudou o contrato de um arquivo de integração? Os outros
  apps leem esse arquivo: mantenha os campos antigos e teste os dois lados.
- **Toda mudança de comportamento vem com teste**; bug corrigido ganha o teste que o pegaria. Os visuais usam
  `check(cond, texto)` e falham com qualquer linha FAIL.
- Cada lista só mostra o que a integração dela permite (`supported_features`): prazo, horário, notas, reordenar.

## Jeito da interface

- Textos em português claro e curto, sem jargão; botões com verbos.
- Mesmo visual dos outros apps da família (Barlow e Barlow Condensed, cores por tokens, tema claro e escuro, abas em
  Mais). Celular primeiro (412 px); a partir de 1000 px, a barra lateral.
- Sem erros no console: os visuais conferem.
