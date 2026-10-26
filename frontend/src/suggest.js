// Sugestões: the tab in place of Prazos when Mais › Opções › Controlar prazos is
// off. What to resolve now, from the lists: what has been there longest, what
// closes a list, what is worth points, what came back (repeats), what the
// CronologIA dated for today. Shopping lists go apart (you resolve them at the
// store). With Usar IA on, the AI can pick too (only when asked).
// Mixed into <resolvia-panel>.
import { html, nothing, repeat, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { F, has, plural, parseDue, dayDiff, dueInfo, colorVars } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

const DAY = 86400000;
const TOP = 5;
const PER_LIST = 2; // a long list doesn't take the whole top

/** 4 dias · 2 semanas · 3 meses */
export function ageText(days) {
  if (days < 14) return plural(days, "dia", "dias");
  if (days < 60) return plural(Math.floor(days / 7), "semana", "semanas");
  if (days < 730) return plural(Math.floor(days / 30), "mês", "meses");
  return plural(Math.floor(days / 365), "ano", "anos");
}

function agoText(ms, now = Date.now()) {
  const min = Math.max(0, Math.round((now - ms) / 60000));
  if (min < 1) return "agora há pouco";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${plural(Math.floor(h / 24), "dia", "dias")}`;
}

const isShopping = (l) => l.icon === "shopping-cart";

export const SuggestMixin = (Base) =>
  class extends Base {
    /** Ages of the items (the server notes when it first saw each one) and the last AI pick. */
    async _loadSuggest() {
      this._suggestAt = Date.now();
      if (!this.hass || !this.hass.resolvia) return;
      try {
        const res = await this.hass.callWS({ type: "resolvia/suggest/get" });
        this._ages = res.ages || {};
        if (res.ai && (!this._aiPick || res.ai.at > this._aiPick.at)) this._aiPick = res.ai;
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

    /** {top: [{l, i, why}], shopping: [{l, n, oldest}], pending, lists} */
    _suggestions() {
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
          if (score <= 0) return;
          if (!why.length) why.push(pts ? "Vale pontos" : "Primeiro da lista");
          rows.push({ l, i, score, why: why.join(" · ") });
        });
      }
      rows.sort((a, b) => b.score - a.score);
      const top = [];
      const per = new Map();
      for (const r of rows) {
        const n = per.get(r.l.id) || 0;
        if (n >= PER_LIST) continue;
        per.set(r.l.id, n + 1);
        top.push(r);
        if (top.length >= TOP) break;
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
          });
        }
      }
      if (!items.length) return;
      this._aiBusy = true;
      this._aiErr = null;
      this.requestUpdate();
      try {
        this._aiPick = await this.hass.callWS({ type: "resolvia/ai/suggest", items: items.slice(0, 150) });
        this._haptic("light");
      } catch (err) {
        this._aiErr = (err && err.message) || "Não consegui falar com a IA.";
      }
      this._aiBusy = false;
      this.requestUpdate();
    }

    _renderAiSuggest() {
      if (!this._aiOn() || !this.hass.resolvia) return nothing;
      const ai = this._aiInfo();
      const pick = this._aiPick;
      const rows = [];
      if (pick) {
        for (const p of pick.picks || []) {
          const [id, uid] = [p.key.slice(0, p.key.indexOf("|")), p.key.slice(p.key.indexOf("|") + 1)];
          const l = this._list(id);
          const i = l && l.items && l.items.find((x) => x.uid === uid);
          if (l && i && (i.status !== "completed" || this._recent.has(i.uid))) rows.push({ l, i, why: p.motivo });
        }
      }
      const busy = this._aiBusy;
      const button = html`<button class="btn ${pick ? "outline" : "primary"} ai-ask" ?disabled=${busy || !ai.ready} @click=${() => this._askAi()}>
        ${icon(busy ? "loader-circle" : "sparkles", busy ? "ai-spin" : "")}${busy ? "Pensando…" : pick ? "Sugerir de novo" : "Sugerir com IA"}
      </button>`;
      return html`<div class="panel items suggest-ai">
        ${this._secHead("sparkles", "Pedir à IA", "A IA do Home Assistant olha as listas e escolhe o que resolver agora, com o porquê. Só roda quando você toca e entra no Uso da IA.")}
        ${rows.length
          ? repeat(rows, (r) => r.l.id + r.i.uid, (r) => this._renderItem(r.l, r.i, { showList: true, why: r.why, whyIcon: "sparkles" }))
          : pick
            ? html`<p class="ai-note">Tudo o que a IA sugeriu já foi resolvido.</p>`
            : nothing}
        ${pick ? html`<p class="ai-note">Sugerido ${agoText(pick.at)}${pick.provider ? ` por ${pick.provider}` : ""}.</p>` : nothing}
        ${!ai.ready && ai.reason ? html`<p class="ai-note">${ai.reason}</p>` : nothing}
        ${this._aiErr ? html`<p class="ai-note err">${this._aiErr}</p>` : nothing}
        <div class="ai-actions">${button}</div>
      </div>`;
    }

    _renderSuggest() {
      const s = this._suggestions();
      return html`
        <section class="page">
          ${this._renderPageHead("Sugestões", {
            text: s.pending ? `${plural(s.pending, "pendente", "pendentes")} em ${plural(s.lists, "lista", "listas")}` : "Nada pendente",
          })}
          ${s.pending
            ? html`
                ${s.top.length
                  ? html`<div class="panel items">
                      <div class="overline">Comece por aqui · ${s.top.length}</div>
                      ${repeat(s.top, (r) => r.l.id + (r.i.uid || r.i.summary), (r) => this._renderItem(r.l, r.i, { showList: true, why: r.why }))}
                    </div>`
                  : nothing}
                ${s.shopping.length
                  ? html`<div class="panel">
                      <div class="overline">Compras</div>
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
                  : nothing}
                ${this._renderAiSuggest()}
                <p class="suggest-foot">${icon("info")}<span>As sugestões olham há quanto tempo cada item está na lista, o que fecha uma lista, os pontos, as repetições e as datas do CronologIA. Mude em Mais › Opções › Prazos.</span></p>
              `
            : html`<div class="panel">
                <div class="empty">
                  <div class="em-icon">${icon("lightbulb")}</div>
                  <h3>Nada para sugerir</h3>
                  <p>Todas as listas estão em dia. Quando aparecer algo pendente, as sugestões aparecem aqui.</p>
                </div>
              </div>`}
        </section>
      `;
    }
  };
