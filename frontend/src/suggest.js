// Agora (Sugestões up to 2.59): the first tab and the start of the app (2.48.0), to open it and know what to do. With
// Controlar prazos on, what is late and for today first (then Comece por aqui, then tomorrow, the next
// 7 days, later on and what comes back by itself: what the Prazos tab had up to 2.47). Comece por aqui
// is what to resolve now, from the lists: what has been there longest, what closes a list, what is
// worth points, what came back (repeats), what the CronologIA dated for today (without the ones
// already in a group of what is due). Shopping lists go apart (you resolve them at the store). With
// Usar IA on, Sugerir com IA lets the AI pick the Comece por aqui instead, each with why (only when
// asked; kept until asked again or Voltar ao automático). Ordem dos cards (2.60.0, like the CronologIA): each
// person puts the cards in their order.
// Mixed into <resolvia-panel>.
import { html, nothing, repeat, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { F, has, plural, parseDue, dayDiff, dueInfo, colorVars } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

const DAY = 86400000;
const TOP = 5;
const PER_LIST = 2; // a long list doesn't take the whole top (while other lists have something to show)

/** 4 dias · 2 semanas · 3 meses */
export function ageText(days) {
  if (days < 14) return plural(days, "dia", "dias");
  if (days < 60) return plural(Math.floor(days / 7), "semana", "semanas");
  if (days < 730) return plural(Math.floor(days / 30), "mês", "meses");
  return plural(Math.floor(days / 365), "ano", "anos");
}

const isShopping = (l) => l.icon === "shopping-cart";

/** The groups of what is due, each a card of Agora with its icon (the first one that fits takes the task). */
export const DUE_GROUPS = [
  { id: "late", title: "Atrasados", icon: "triangle-alert", test: (d) => d.overdue },
  { id: "today", title: "Hoje", icon: "calendar", test: (d) => d.diff === 0 },
  { id: "tomorrow", title: "Amanhã", icon: "sunrise", test: (d) => d.diff === 1 },
  { id: "week", title: "Próximos 7 dias", icon: "calendar-days", test: (d) => d.diff > 1 && d.diff < 7 },
  { id: "later", title: "Mais adiante", icon: "hourglass", test: () => true },
];

// Agora › Ordem dos cards (2.60.0): the cards of Agora, in the order they come by default. Each person chooses theirs
// (app.now_order: {user of Home Assistant or "": [ids]}); every card is in it, also the ones with nothing now or with
// Controlar prazos off. One missing from a saved order (new in a later version) goes after the one before it by default.
export const NOW_CARDS = ["late", "today", "start", "tomorrow", "week", "later", "coming", "shopping"];
export function nowOrder(saved) {
  const ids = (Array.isArray(saved) ? saved : []).filter((x, i, a) => NOW_CARDS.includes(x) && a.indexOf(x) === i);
  for (const id of NOW_CARDS) {
    if (ids.includes(id)) continue;
    const prev = NOW_CARDS.slice(0, NOW_CARDS.indexOf(id)).reverse().find((x) => ids.includes(x));
    ids.splice(prev ? ids.indexOf(prev) + 1 : 0, 0, id);
  }
  return ids;
}
const CARD_INFO = {
  late: ["triangle-alert", "Atrasados"],
  today: ["calendar", "Hoje"],
  start: ["flag", "Comece por aqui"],
  tomorrow: ["sunrise", "Amanhã"],
  week: ["calendar-days", "Próximos 7 dias"],
  later: ["hourglass", "Mais adiante"],
  coming: ["repeat", "Voltam sozinhas"],
  shopping: ["shopping-cart", "Compras"],
};

export const SuggestMixin = (Base) =>
  class extends Base {
    /** Ages of the items (the server notes when it first saw each one) and the last AI pick. */
    async _loadSuggest() {
      this._suggestAt = Date.now();
      if (!this.hass || !this.hass.resolvia) return;
      try {
        const res = await this.hass.callWS({ type: "resolvia/suggest/get" });
        this._ages = res.ages || {};
        // the server keeps the pick (also after a restart); null = back to the automatic one
        if (!this._aiAsking) this._aiPick = res.ai || null;
        // asked on another screen (or before leaving this one): still thinking
        this._aiBusy = !!res.busy || !!this._aiAsking;
        clearTimeout(this._aiPoll);
        if (res.busy && !this._aiAsking) this._aiPoll = setTimeout(() => this._loadSuggest(), 3000);
      } catch (e) {
        this._ages = this._ages || {};
      }
      this.requestUpdate();
    }

    /** Whole days an item has been on its list (null = unknown). */
    _ageOf(l, item, now = new Date()) {
      if (this._sinceDate(l, item)) return Math.max(0, -dayDiff(parseDue(item.due).date, now));
      const at = this._ages && this._ages[l.id] && item.uid ? this._ages[l.id][item.uid] : null;
      return at ? Math.max(0, Math.floor((now.getTime() - at) / DAY)) : null;
    }

    /** A list that doesn't take deadlines: the date of an item is "since when" (ex.: unavailable since). */
    _sinceDate(l, item) {
      return !l.canDue && !!item.due && !!parseDue(item.due);
    }

    _suggestLists() {
      return this._visible().filter((l) => !l.unavailable && l.items && has(l.features, F.UPDATE));
    }

    /** {top: [{l, i, why}], shopping: [{l, n, oldest}], pending, lists}; `skip`: the items already shown (what is due). */
    _suggestions(skip = new Set()) {
      const now = new Date();
      const rows = [];
      const shopping = [];
      let pending = 0;
      let lists = 0;
      for (const l of this._suggestLists()) {
        const pend = l.items.filter((i) => i.status !== "completed");
        if (!pend.length) continue;
        pending += pend.length;
        lists++;
        if (isShopping(l)) {
          const ages = pend.map((i) => this._ageOf(l, i, now)).filter((n) => n != null);
          shopping.push({ l, n: pend.length, oldest: ages.length ? Math.max(...ages) : null });
          continue;
        }
        pend.forEach((i, idx) => {
          if (skip.has(i)) return;
          const why = [];
          let score = 0;
          const age = this._ageOf(l, i, now);
          if (age != null && age >= 3) {
            score += Math.min(age, 60) / 3;
            why.push(this._sinceDate(l, i) ? `Assim há ${ageText(age)}` : `Na lista há ${ageText(age)}`);
          }
          if (pend.length === 1) {
            score += 8;
            why.push("É o último da lista");
          } else if (pend.length === 2) {
            score += 4;
            why.push("Faltam 2 para zerar a lista");
          }
          const pts = this._pointsOf(l.id, i.summary, i.uid);
          if (pts) score += 3 + Math.min(pts, 50) / 10;
          if (this._ruleFor(l.id, i)) {
            score += 4;
            why.push("Voltou para fazer");
          }
          // a date someone set (the CronologIA, or before the deadlines were turned off)
          const d = l.canDue && i.due ? dueInfo(i.due, now) : null;
          if (d && d.diff <= 0) {
            score += d.diff < 0 ? 6 : 5;
            const m = this._mirrored(l.id, i.uid);
            why.push(m ? `${m.tipo === "rotina" ? "Rotina" : "Manutenção"} do CronologIA ${d.diff < 0 ? "atrasada" : "para hoje"}` : d.diff < 0 ? "A data já passou" : "Tem data para hoje");
          }
          if (idx === 0) score += 1.5; // the top of a list is what the family put first
          if (!why.length) why.push(pts ? "Vale pontos" : idx === 0 ? "Primeiro da lista" : `${idx + 1}º da lista`);
          rows.push({ l, i, idx, score, why: why.join(" · ") });
        });
      }
      // the strongest reasons first; without one, the order of the list (what was put first)
      rows.sort((a, b) => b.score - a.score || a.idx - b.idx);
      const top = [];
      const per = new Map();
      for (const r of rows) {
        if (r.score <= 0) continue;
        const n = per.get(r.l.id) || 0;
        if (n >= PER_LIST) continue;
        per.set(r.l.id, n + 1);
        top.push(r);
        if (top.length >= TOP) break;
      }
      // new items (no age yet) or a single long list: complete the top in the order of the lists
      for (const r of rows) {
        if (top.length >= TOP) break;
        if (!top.includes(r)) top.push(r);
      }
      shopping.sort((a, b) => b.n - a.n);
      return { top, shopping, pending, lists };
    }

    /** Sugestões › Pedir à IA: the pending items (of the lists on the start screen) go to the AI. */
    async _askAi() {
      if (this._aiBusy) return;
      const now = new Date();
      const items = [];
      for (const l of this._suggestLists()) {
        for (const i of l.items) {
          if (i.status === "completed" || !i.uid) continue;
          const rule = this._ruleFor(l.id, i);
          items.push({
            key: `${l.id}|${i.uid}`,
            lista: l.name,
            texto: i.summary || "",
            dias: this._ageOf(l, i, now),
            pontos: this._pointsOf(l.id, i.summary, i.uid) || 0,
            repete: rule ? rule.days : 0,
            compras: isShopping(l),
            comodo: this._roomIdsOf(l.id, i.summary).map((id) => this._roomName(id)).filter(Boolean).join(", "),
            equipamento: this._equipIdsOf(l.id, i.summary).map((id) => (this._equipOf(id) || {}).nome).filter(Boolean).join(", "),
            externo: ((e) => (e === true ? "sim" : e || ""))(this._externalOf(l.id, i.summary)),
          });
        }
      }
      if (!items.length) return;
      this._aiBusy = true;
      this._aiAsking = true;
      this._aiErr = null;
      this.requestUpdate();
      try {
        this._aiPick = await this.hass.callWS({ type: "resolvia/ai/suggest", items: items.slice(0, 150) });
        this._haptic("light");
      } catch (err) {
        this._aiErr = (err && err.message) || "Não consegui falar com a IA.";
      }
      this._aiAsking = false;
      this._aiBusy = false;
      this.requestUpdate();
    }

    /** Comece por aqui › Voltar ao automático: forget the pick of the AI. */
    async _clearAi() {
      this._aiPick = null;
      this._aiErr = null;
      this.requestUpdate();
      try {
        await this.hass.callWS({ type: "resolvia/ai/suggest/clear" });
      } catch (e) {
        /* it comes back on the next load */
      }
    }

    /** The items the AI picked, still there (a just-resolved one stays until the screen changes). */
    _aiRows() {
      const pick = this._aiPick;
      const rows = [];
      for (const p of (pick && pick.picks) || []) {
        const at = p.key.indexOf("|");
        const l = this._list(p.key.slice(0, at));
        const i = l && l.items && l.items.find((x) => x.uid === p.key.slice(at + 1));
        if (l && i && !l.hidden && (i.status !== "completed" || this._recent.has(i.uid))) rows.push({ l, i, why: p.motivo || "Escolhido pela IA", ai: true });
      }
      return rows;
    }

    /** Comece por aqui: the automatic pick, or the one of the AI with why; Sugerir com IA at the bottom. */
    _renderStart(s) {
      const aiOn = this._aiOn() && !!this.hass.resolvia;
      const ai = aiOn ? this._aiInfo() : null;
      const pick = aiOn ? this._aiPick : null;
      const aiRows = pick ? this._aiRows() : [];
      const byAi = aiRows.length > 0;
      const rows = byAi ? aiRows : s.top;
      if (!rows.length && !aiOn) return nothing;
      const busy = !!this._aiBusy;
      return html`<div class="panel items start ${byAi ? "by-ai" : ""}">
        <div class="mais-head"><span class="mais-ic" aria-hidden="true">${icon(byAi ? "sparkles" : "flag")}</span><h2>Comece por aqui</h2><small class="mh-count">${rows.length}</small></div>
        ${byAi
          ? html`<p class="start-by">${icon("sparkles")}<span>Escolhidos pela IA.</span></p>`
          : nothing}
        ${repeat(rows, (r) => r.l.id + (r.i.uid || r.i.summary), (r) => this._renderItem(r.l, r.i, { showList: true, why: r.why, whyIcon: r.ai ? "sparkles" : null }))}
        ${pick && !byAi ? html`<p class="ai-note">Tudo o que a IA sugeriu foi resolvido.</p>` : nothing}
        ${aiOn && !ai.ready && ai.reason ? html`<p class="ai-note">${ai.reason}</p>` : nothing}
        ${this._aiErr ? html`<p class="ai-note err">${this._aiErr}</p>` : nothing}
        ${aiOn
          ? html`<div class="ai-actions start-acts">
              <button class="btn ${byAi ? "outline" : "primary"} sm ai-ask" ?disabled=${busy || !ai.ready} @click=${() => this._askAi()}>
                ${icon(busy ? "loader-circle" : "sparkles", busy ? "ai-spin" : "")}${busy ? "Pensando…" : byAi ? "Sugerir de novo" : "Sugerir com IA"}
              </button>
              ${pick && !busy ? html`<button class="btn outline sm" @click=${() => this._clearAi()}>${icon("rotate-ccw")}Voltar ao automático</button>` : nothing}
            </div>`
          : nothing}
      </div>`;
    }

    // ------------------------------------------------------------ Agora › Ordem dos cards (2.60.0)
    // Each person their own order (app.now_order, by the user of Home Assistant; without one: "").
    _nowKey() {
      const u = this.hass && this.hass.user;
      return (u && (u.id || u.name)) || "";
    }
    _nowOrder() {
      return nowOrder((this._app("now_order", null) || {})[this._nowKey()]);
    }
    _saveNowOrder(ids) {
      const all = { ...(this._app("now_order", null) || {}) };
      if (ids && ids.join() !== NOW_CARDS.join()) all[this._nowKey()] = ids;
      else delete all[this._nowKey()];
      this._saveAppPrefs({ now_order: Object.keys(all).length ? all : null });
    }
    _moveNowCard(id, by) {
      const ids = this._nowOrder();
      const i = ids.indexOf(id);
      const j = i + by;
      if (i < 0 || j < 0 || j >= ids.length) return;
      [ids[i], ids[j]] = [ids[j], ids[i]];
      this._saveNowOrder(ids);
    }
    _renderCardsSheet() {
      const ids = this._nowOrder();
      const shown = this._nowShown || {};
      const dueOff = !this._dueOn();
      const why = (id) => {
        if (dueOff && (id === "coming" || DUE_GROUPS.some((g) => g.id === id))) return "Controlar prazos desligado";
        if (id === "coming" && this._repeatOn && !this._repeatOn()) return "Repetição desligada";
        return shown[id] ? "" : "Sem nada agora";
      };
      const custom = ids.join() !== NOW_CARDS.join();
      return html`
        <div class="sheet-head">
          <h3 class="display">Ordem dos cards</h3>
          <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
        </div>
        <p class="sheet-note top">A ordem da Agora, só para você.</p>
        <ol class="now-cards">
          ${ids.map((id, k) => {
            const [ic, name] = CARD_INFO[id];
            const sub = why(id);
            return html`<li class="row nc-row ${sub ? "off" : ""}" data-card=${id}>
              <span class="mais-ic ${id === "late" ? "late" : ""}" aria-hidden="true">${icon(ic)}</span>
              <div class="grow"><div class="label">${name}</div>${sub ? html`<div class="hint">${sub}</div>` : nothing}</div>
              <button class="icon-btn" ?disabled=${k === 0} @click=${() => this._moveNowCard(id, -1)} aria-label="Subir ${name}">${icon("chevron-up")}</button>
              <button class="icon-btn" ?disabled=${k === ids.length - 1} @click=${() => this._moveNowCard(id, 1)} aria-label="Descer ${name}">${icon("chevron-down")}</button>
            </li>`;
          })}
        </ol>
        ${custom ? html`<button class="btn outline now-reset" @click=${() => this._saveNowOrder(null)}>${icon("rotate-ccw")}Voltar à ordem de sempre</button>` : nothing}
      `;
    }

    _renderSuggest() {
      const due = this._dueSections();
      const s = this._suggestions(new Set(due.rows.map((r) => r.i)));
      const bits = [];
      if (s.pending) bits.push(`${plural(s.pending, "pendente", "pendentes")} em ${plural(s.lists, "lista", "listas")}`);
      if (due.late) bits.push(plural(due.late, "atrasado", "atrasados"));
      if (due.today) bits.push(`${due.today} para hoje`);
      const any = s.pending || due.comingN;
      const cards = due.cards || {};
      const parts = {
        ...cards,
        start: s.pending ? this._renderStart(s) : nothing,
        coming: due.coming || nothing,
        shopping: s.shopping.length
          ? html`<div class="panel" data-card="shopping">
              <div class="mais-head"><span class="mais-ic" aria-hidden="true">${icon("shopping-cart")}</span><h2>Compras</h2><small class="mh-count">${s.shopping.length}</small></div>
              ${s.shopping.map(
                (x) => html`<button class="list-card" style=${colorVars(x.l.color, this._dark)} @click=${() => this._go(`/lista/${x.l.id}`)}>
                  <span class="tile">${icon(x.l.icon)}</span>
                  <span class="lc-main">
                    <span class="lc-title">${x.l.name}</span>
                    <span class="lc-meta"><span>${x.oldest != null && x.oldest >= 3 ? `O mais antigo está há ${ageText(x.oldest)}` : plural(x.n, "item para comprar", "itens para comprar")}</span></span>
                  </span>
                  <span class="lc-num">${x.n}</span>
                </button>`,
              )}
            </div>`
          : nothing,
      };
      // for Ordem dos cards: which have something now
      this._nowShown = Object.fromEntries(NOW_CARDS.map((id) => [id, !!parts[id] && parts[id] !== nothing]));
      return html`
        <section class="page">
          ${this._renderPageHead("Agora", { text: bits.length ? bits.join(" · ") : "Nada pendente", tone: due.late ? "late" : "" })}
          ${any
            ? html`${this._nowOrder().map((id) => parts[id] || nothing)}
                <button class="add-line now-order" @click=${() => this._openSheet("cards")}>${icon("sliders-horizontal")}Ordem dos cards</button>`
            : html`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${icon("circle-check")}</div>
                  <h3>Tudo em dia</h3>
                </div>
              </div>`}
        </section>
      `;
    }
  };
