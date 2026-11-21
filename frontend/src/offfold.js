// Inativos no fim, recolhidos (a regra de todos os apps da família): o que está desligado sai do meio da lista e
// vai para uma seção no fim dela, fechada até tocar, com o nome e quantos são ("Inativas (2)"). A linha fina dos
// outros apps (o offFold da CronologIA): a seta antes do nome, para a direita fechada e para baixo aberta.
import { html, nothing, unsafeSVG, repeat } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";

const icon = (name) =>
  html`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name])}</svg>`;

/** The section of the off ones at the end of a list (host: the panel, for its open sections); row(l) draws each. */
export function offFold(host, key, things, row, label = "Inativas") {
  if (!things.length) return nothing;
  const open = !!(host._folds && host._folds[key]);
  return html`<button class="inact-head ${open ? "open" : ""}" data-fold=${key} aria-expanded=${open ? "true" : "false"} @click=${() => (host._folds = { ...(host._folds || {}), [key]: !open })}>
      ${icon(open ? "chevron-down" : "chevron-right")}<span class="label">${label} <span class="count">(${things.length})</span></span>
    </button>
    ${open ? repeat(things, (l) => l.id, row) : nothing}`;
}
