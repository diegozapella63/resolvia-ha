// Mais › Configurações › Integrações › CorrerIA: the app CorrerIA (the WhatsApp contact of CorrerIA Code, and the
// Claude and the Gemini connected to it) reads and changes the lists through the tools of the server
// (lib/ferramentas.js). Off by default, and it does not need Usar IA (who thinks is the AI of the CorrerIA).
// Mixed into <resolvia-panel>.
import { html, nothing } from "../vendor/lit-all.min.js";

const pad = (n) => String(n).padStart(2, "0");
const day = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

/** "Claude usou hoje às 09:41." (or ontem, or em 07/11) from the last use {cliente, em}. */
export function lastUse(u, now = new Date()) {
  const at = new Date(u && u.em);
  if (!u || Number.isNaN(at.getTime())) return "";
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const when = day(at) === day(now) ? "hoje" : day(at) === day(yesterday) ? "ontem" : `em ${pad(at.getDate())}/${pad(at.getMonth() + 1)}`;
  return `${u.cliente} usou ${when} às ${pad(at.getHours())}:${pad(at.getMinutes())}.`;
}

export const CorreriaMixin = (Base) =>
  class extends Base {
    /** {on, ultimo: {cliente, em, nome}} from the server. */
    async _loadCorreria() {
      if (!this.hass || !this.hass.resolvia) return;
      try {
        this._correria = await this.hass.callWS({ type: "resolvia/correria/get" });
      } catch (e) {
        this._correria = null;
      }
      this.requestUpdate();
    }

    async _setCorreria(on) {
      this._haptic("light");
      await this._saveAppPrefs({ correria_on: on ? true : null });
      await this._loadCorreria();
    }

    _renderCorreriaPanel() {
      if (!this.hass.resolvia) return nothing;
      const on = this._app("correria_on", false) === true;
      const used = lastUse(this._correria && this._correria.ultimo);
      return html`<div class="panel" id="correria">
        ${this._secHead("zap", "CorrerIA", "O CorrerIA junta os apps da casa no WhatsApp, no Claude e no Gemini.")}
        <div class="row switch-row">
          <div class="grow"><div class="label">Usar com o CorrerIA</div><div class="hint" style="white-space:normal">${on ? "Ligado: pelo WhatsApp, o Claude e o Gemini leem e mudam as suas listas." : "Desligado."}</div></div>
          <label class="switch"><input type="checkbox" role="switch" .checked=${on} @change=${(e) => this._setCorreria(e.target.checked)} aria-label="Usar com o CorrerIA" /><span class="track"></span></label>
        </div>
        ${on
          ? html`<div class="ai-state ${used ? "ok" : ""}" style="margin-bottom:16px"><span class="dot"></span><div>${used ? html`<b>${used}</b>` : html`<b>Nenhum uso ainda</b><span>Conecte no app CorrerIA.</span>`}</div></div>`
          : nothing}
      </div>`;
    }
  };
