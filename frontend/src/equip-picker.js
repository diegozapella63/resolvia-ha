// Equipamento: the picker of an item of the InventarIA, with search (ResolvIA and
// CronologIA keep the same copy of this file). The items of the chosen room come
// first; a search looks at the name, the zone and the room, without accents, and
// shows what it found in other rooms apart. The chosen one becomes a card with ×.
//
// items: [{id, nome, zona, roomId, roomName}]

const MARKS = /[̀-ͯ]/g;
const foldChar = (c) => c.normalize("NFD").replace(MARKS, "").toLowerCase() || c.toLowerCase();
const fold = (s) => [...String(s || "")].map(foldChar).join("");

/** {inRoom, others}: the items of the room and, with a search, the ones found elsewhere. */
export function searchEquips(items, { room = null, query = "" } = {}) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  const hay = (i) => fold(`${i.nome} ${i.zona || ""} ${i.roomName || ""}`);
  const hit = (i) => terms.every((t) => hay(i).includes(t));
  // the name starting with the search first, then the name having it, then the zone or the room
  const rank = (i) => {
    if (!terms.length) return 0;
    const n = fold(i.nome);
    return n.startsWith(terms[0]) ? 0 : n.includes(terms[0]) ? 1 : 2;
  };
  const found = items.filter(hit).sort((a, b) => rank(a) - rank(b) || a.nome.localeCompare(b.nome, "pt-BR"));
  if (room) return { inRoom: found.filter((i) => i.roomId === room), others: terms.length ? found.filter((i) => i.roomId !== room) : [] };
  return { inRoom: [], others: terms.length ? found : [] };
}

/** The name with the first search word in bold (accents and case ignored). */
function marked(html, text, query) {
  const t = fold(query).split(/\s+/).filter(Boolean)[0];
  if (!t) return text;
  const at = fold(text).indexOf(t);
  if (at < 0) return text;
  const chars = [...text];
  return html`${chars.slice(0, at).join("")}<mark>${chars.slice(at, at + t.length).join("")}</mark>${chars.slice(at + t.length).join("")}`;
}

/**
 * The picker. lit: {html, nothing}; icon(name); room/roomName: the room chosen in the form (or null);
 * value: the chosen item id; query, more: the search and "Mostrar mais"; onQuery, onPick(id|null), onMore.
 */
export function renderEquipPicker({ lit, icon, items, room = null, roomName = "", value = null, query = "", more = false, onQuery, onPick, onMore, autofocus = false }) {
  const { html, nothing } = lit;
  const sel = value ? items.find((i) => i.id === value) : null;
  if (sel) {
    return html`<div class="eq-sel">
      <span class="eq-ic">${icon("package")}</span>
      <span class="eq-tx"><b>${sel.nome}</b><small>${[sel.zona, sel.roomName].filter(Boolean).join(" · ") || "Sem cômodo"}</small></span>
      <button type="button" class="icon-btn mini" aria-label="Tirar o equipamento" @click=${() => onPick(null)}>${icon("x")}</button>
    </div>`;
  }
  const { inRoom, others } = searchEquips(items, { room, query });
  const limit = more ? 40 : 6;
  const row = (i, showRoom) => html`<button type="button" class="eq-row" @click=${() => onPick(i.id)}>
    <span class="eq-ic">${icon("package")}</span>
    <span class="eq-tx"><b>${marked(html, i.nome, query)}</b>${[i.zona, showRoom ? i.roomName : ""].filter(Boolean).length ? html`<small>${[i.zona, showRoom ? i.roomName : ""].filter(Boolean).join(" · ")}</small>` : nothing}</span>
  </button>`;
  const shownIn = inRoom.slice(0, limit);
  const shownOut = others.slice(0, Math.max(0, limit - shownIn.length));
  const hidden = inRoom.length + others.length - shownIn.length - shownOut.length;
  let hint = nothing;
  if (!query && !room) hint = html`<p class="eq-hint">Escolha o cômodo ou busque entre ${items.length} ${items.length === 1 ? "equipamento" : "equipamentos"}.</p>`;
  else if (!query && room && !inRoom.length) hint = html`<p class="eq-hint">Nenhum equipamento em ${roomName}. Busque nos outros cômodos.</p>`;
  else if (query && !inRoom.length && !others.length) hint = html`<p class="eq-hint">Nada com “${query}”.</p>`;
  return html`<div class="eq-pick">
    <label class="eq-search">${icon("search")}<input type="search" .value=${query} placeholder=${room ? `Buscar em ${roomName}…` : "Buscar equipamento…"} aria-label="Buscar equipamento" ?autofocus=${autofocus} @input=${(e) => onQuery(e.target.value)} /></label>
    ${shownIn.length ? html`<div class="eq-list">${shownIn.map((i) => row(i, false))}</div>` : nothing}
    ${shownOut.length ? html`${room ? html`<div class="eq-head">Em outros cômodos</div>` : nothing}<div class="eq-list">${shownOut.map((i) => row(i, true))}</div>` : nothing}
    ${hidden > 0 ? html`<button type="button" class="eq-more" @click=${() => onMore()}>Mostrar mais ${hidden}</button>` : nothing}
    ${hint}
  </div>`;
}

export const equipPickerStyles = `
  .eq-pick { display: grid; gap: 8px; }
  .eq-search { display: flex; align-items: center; gap: 10px; padding: 0 14px; min-height: 48px; border-radius: 14px; border: 1.5px solid var(--rv-line-strong, var(--rv-line)); background: var(--rv-input-bg, transparent); color: var(--rv-muted); }
  .eq-search:focus-within { border-color: var(--rv-accent); color: var(--rv-accent-ink); }
  .eq-search .i { width: 18px; height: 18px; flex: none; }
  .eq-search input { flex: 1; min-width: 0; border: 0 !important; outline: 0; background: none !important; padding: 12px 0 !important; font: inherit; font-size: 16px; color: var(--rv-text); box-shadow: none !important; }
  .eq-search input::-webkit-search-cancel-button { filter: grayscale(1); }
  .eq-list { display: grid; border: 1px solid var(--rv-line); border-radius: 14px; overflow: hidden; }
  .eq-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 12px; text-align: left; border-top: 1px solid var(--rv-line); background: none; color: var(--rv-text); }
  .eq-row:first-child { border-top: 0; }
  .eq-row:active, .eq-row:hover { background: var(--rv-accent-soft); }
  .eq-ic { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; flex: none; background: color-mix(in srgb, var(--rv-muted) 14%, transparent); color: var(--rv-text-2, var(--rv-muted)); }
  .eq-ic .i { width: 18px; height: 18px; }
  .eq-tx { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  .eq-tx b { font-weight: 600; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eq-tx small { font-size: 12.5px; color: var(--rv-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eq-tx mark { background: none; color: var(--rv-accent-ink); font-weight: 700; }
  .eq-head { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rv-muted); padding: 4px 2px 0; }
  .eq-more { justify-self: start; padding: 4px 2px; font-weight: 600; font-size: 14px; color: var(--rv-accent-ink); background: none; }
  .eq-hint { margin: 0; padding: 2px; font-size: 13px; color: var(--rv-muted); }
  .eq-sel { display: flex; align-items: center; gap: 12px; padding: 10px 6px 10px 12px; border-radius: 14px; border: 1.5px solid var(--rv-accent); background: var(--rv-accent-soft); }
  .eq-sel .eq-ic { background: var(--rv-accent); color: var(--rv-on-accent, #fff); }
`;
