// Recompensas: tasks worth points in the CronologIA scoreboard. Turned on in
// Mais › Integrações; each task's points are set in its sheet; completing a task
// here gives them to whoever did it (asks when this user isn't in the scoreboard).
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { plural, clip, taskKey } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

export const POINT_PICKS = [5, 10, 20, 30, 50];
const PERIOD = { semana: "toda semana", quinzena: "a cada 15 dias", mes: "todo mês" };

export const PointsMixin = (Base) =>
  class extends Base {
    async _loadPoints() {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._pts = await this.hass.callWS({ type: "resolvia/points/get" });
      } catch (e) {
        this._pts = null;
      }
      this.requestUpdate();
    }

    /** Points on and the scoreboard reachable: tasks show and give points. */
    _ptsActive() {
      const p = this._pts;
      return !!(p && p.on && p.placar && p.placar.ativo);
    }

    /** What a task is set to be worth (even with the scoreboard off). */
    _rawPoints(listId, summary) {
      const map = this._pts && this._pts.points && this._pts.points[listId];
      return (map && map[taskKey(summary)]) || 0;
    }

    /** What a task gives right now (0 when points are off). */
    _pointsOf(listId, summary) {
      return this._ptsActive() ? this._rawPoints(listId, summary) : 0;
    }

    async _setTaskPoints(listId, summary, points, previous = null) {
      try {
        this._pts = await this.hass.callWS({ type: "resolvia/points/set", entity_id: listId, summary, points: points || 0, ...(previous != null ? { previous_summary: previous } : {}) });
        this.requestUpdate();
      } catch (err) {
        this._showToast(`Não consegui salvar os pontos: ${err.message}`);
      }
    }

    async _setPointsOn(on) {
      await this._saveAppPrefs({ points_on: on ? true : null });
      await this._loadPoints();
      this._haptic("light");
    }

    /**
     * After completing a task: its points go to whoever did it. `text` is the
     * usual "Resolvido: …" line and `undo` its Desfazer.
     */
    async _givePoints(list, item, text, undo, quem = null) {
      let r;
      try {
        r = await this.hass.callWS({ type: "resolvia/points/done", entity_id: list.id, uid: item.uid, summary: item.summary, done: true, ...(quem ? { quem } : {}) });
      } catch (err) {
        this._showToast(`${text} · os pontos não foram: ${err.message}`, undo);
        return;
      }
      if (r && r.ask) {
        this._openSheet("who", {
          title: item.summary,
          points: r.points,
          participantes: r.participantes,
          run: (who) => {
            this._closeSheet(true);
            if (who) this._givePoints(list, item, text, undo, who);
            else this._showToast(text, undo);
          },
        });
        return;
      }
      if (!r || !r.points) {
        this._showToast(text, undo);
        return;
      }
      const msg = `Resolvido por ${r.who} · +${r.points}`;
      const others = (r.participantes || []).filter((p) => p !== r.who);
      if (others.length === 1) {
        const other = others[0];
        this._showToast(msg, {
          label: `Foi ${other}`,
          run: () =>
            this.hass
              .callWS({ type: "resolvia/points/reassign", key: r.key, quem: other })
              .then(() => this._showToast(`Pontos para ${other}`))
              .catch((err) => this._showToast(err.message)),
        });
      } else this._showToast(msg, undo);
    }

    /** A task reopened (or the completion undone): the points of today come off. */
    _takePoints(list, item) {
      if (!this._rawPoints(list.id, item.summary) || !(this._pts && this._pts.on)) return;
      this.hass.callWS({ type: "resolvia/points/done", entity_id: list.id, uid: item.uid, summary: item.summary, done: false }).catch(() => {});
    }

    // ---------------------------------------------------------------- render

    _renderPointsTag(listId, item) {
      const n = this._pointsOf(listId, item.summary);
      return n ? html`<span class="tag pts" title="${n} pontos para quem concluir">${icon("trophy")}+${n}</span>` : nothing;
    }

    /** Item sheet: Pontos para quem concluir (when the points are on). */
    _renderPointsField(f) {
      if (!(this._pts && this._pts.on)) return nothing;
      const pl = this._pts.placar;
      const n = f.points || 0;
      const custom = f.pointsCustom || (n > 0 && !POINT_PICKS.includes(n));
      return html`<div class="field">
        <span class="flabel">Pontos para quem concluir</span>
        <div class="chip-row">
          <button class="pick ${!n && !custom ? "on" : ""}" @click=${() => this._setForm({ points: 0, pointsCustom: false })}>Sem pontos</button>
          ${POINT_PICKS.map((v) => html`<button class="pick ${n === v && !custom ? "on" : ""}" @click=${() => this._setForm({ points: v, pointsCustom: false })}>+${v}</button>`)}
          <button class="pick ${custom ? "on" : ""}" @click=${() => this._setForm({ pointsCustom: true, points: n || 15 })}>${icon("trophy")}<span>Outro</span></button>
        </div>
        ${custom
          ? html`<div class="time-row">
              <input type="number" inputmode="numeric" min="1" max="1000" class="num" .value=${String(n || "")} @input=${(e) => this._setForm({ points: Math.max(0, Math.min(1000, parseInt(e.target.value, 10) || 0)) })} />
              <span class="tl">pontos</span>
            </div>`
          : nothing}
        ${n
          ? html`<div class="field-hint">${icon("trophy")}<span>${pl && pl.ativo
              ? `Quem concluir ganha ${n} pontos no placar do CronologIA (${pl.participantes.join(" × ")}).`
              : "O placar do CronologIA está desligado: os pontos valem quando ele for ligado."}</span></div>`
          : nothing}
      </div>`;
    }

    /** Quem fez? when this Home Assistant user isn't in the scoreboard. */
    _renderWhoSheet() {
      const f = this._form;
      return html`
        <div class="sheet-head">
          <h3 class="display">Quem fez?</h3>
          <button class="icon-btn" @click=${() => f.run("")} aria-label="Fechar">${icon("x")}</button>
        </div>
        <p class="sheet-note top">${clip(f.title || "", 40)} · <b>+${f.points} pontos</b></p>
        <div class="who-grid">
          ${(f.participantes || []).map((p) => html`<button class="who-btn" @click=${() => f.run(p)}><span class="who-av">${(p || "?").trim().charAt(0).toUpperCase()}</span><b>${p}</b></button>`)}
        </div>
        <button class="btn outline" style="width:100%;margin-top:12px" @click=${() => f.run("")}>Ninguém do placar (sem pontos)</button>
      `;
    }

    /** Mais › Integrações › Recompensas. */
    _renderRewardsPanel() {
      const p = this._pts;
      if (!p) return nothing;
      const pl = p.placar;
      const n = Object.values(p.points || {}).reduce((a, m) => a + Object.keys(m).length, 0);
      const state = !pl
        ? { tone: "off", title: "CronologIA não encontrado", text: "Com o CronologIA no mesmo Home Assistant, as tarefas daqui podem valer pontos no placar das Recompensas." }
        : !pl.ativo
          ? { tone: "warn", title: `Placar desligado no CronologIA ${pl.versao}`.trim(), text: "Ligue o placar em CronologIA › Recompensas para as tarefas daqui valerem pontos." }
          : {
              tone: "ok",
              title: `Conectado ao placar do CronologIA ${pl.versao}`.trim(),
              text: `${pl.participantes.join(" × ")} · fecha ${PERIOD[pl.periodo] || "toda semana"}. ${pl.eu ? `Neste usuário, os pontos vão para ${pl.eu}.` : "Este usuário do Home Assistant não está no placar: ao concluir, o app pergunta quem fez."}`,
            };
      const on = !!p.on;
      return html`<div class="panel" id="recompensas">
        <div class="overline">Recompensas</div>
        <div class="ai-state ${state.tone}"><span class="dot"></span><div><b>${state.title}</b><span>${state.text}</span></div></div>
        <div class="row switch-row">
          <div class="grow">
            <div class="label">Pontos nas tarefas</div>
            <div class="hint" style="white-space:normal">${on
              ? n
                ? `${plural(n, "tarefa vale", "tarefas valem")} pontos. Para mudar, abra o item e escolha “Pontos para quem concluir”.`
                : "Abra um item e escolha “Pontos para quem concluir”. Quem concluir ganha os pontos no placar."
              : "Desligado: as tarefas não valem pontos."}</div>
          </div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${on} ?disabled=${!pl && !on} @change=${(e) => this._setPointsOn(e.target.checked)} aria-label="Pontos nas tarefas" /><span class="track"></span></label>
        </div>
      </div>`;
    }
  };
