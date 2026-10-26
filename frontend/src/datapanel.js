// Mais › Dados: exports (ZIP, CSV, JSON), backups in share/resolvia, imports
// and automatic versions, like the other apps. Mixed into <resolvia-panel>.
// Only in the app (hass.resolvia.data); the preview fakes it.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { plural, clip } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;

const size = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const WHY = { "antes-de-importar": "antes de importar", "antes-de-restaurar": "antes de restaurar" };

export const DataMixin = (Base) =>
  class extends Base {
    _data() {
      return (this.hass && this.hass.resolvia && this.hass.resolvia.data) || null;
    }

    _dateTime(ms) {
      const d = new Date(ms);
      const p = (n) => String(n).padStart(2, "0");
      return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} às ${p(d.getHours())}:${p(d.getMinutes())}`;
    }

    async _loadBackups() {
      const api = this._data();
      if (!api) return;
      try {
        this._backups = await api.backups();
      } catch (err) {
        this._backups = { available: false, error: err.message, backups: [] };
      }
      this.requestUpdate();
    }

    async _createBackup() {
      this._dataBusy = "backup";
      this.requestUpdate();
      try {
        const out = await this._data().createBackup();
        this._showToast(`Backup salvo em ${out.folder}/${out.name}`);
        this._haptic("success");
        await this._loadBackups();
      } catch (err) {
        this._showToast(`Não consegui criar o backup. ${err.message}`);
      }
      this._dataBusy = null;
      this.requestUpdate();
    }

    _exportData(fmt, ev) {
      const api = this._data();
      if (!api || !api.url(fmt)) {
        ev.preventDefault();
        this._showToast("Na prévia os arquivos não são baixados.");
      }
    }

    /** What came back, in one line. */
    _restoredText(n, what) {
      let t =
        n.added || n.added === 0
          ? `${what}: ${n.added ? plural(n.added, "item voltou", "itens voltaram") + " para as listas" : "nenhum item faltava nas listas"}, ${plural(n.rules, "repetição", "repetições")}`
          : `${what}: ${plural(n.rules, "repetição", "repetições")}`;
      if (n.missing && n.missing.length) t += `. ${n.missing.length === 1 ? "Lista não encontrada" : "Listas não encontradas"}: ${n.missing.join(", ")}`;
      if (n.unsupported) t += `. ${plural(n.unsupported, "item ficou", "itens ficaram")} de fora (a lista não aceita itens novos)`;
      if (n.failed) t += `. ${plural(n.failed, "item falhou", "itens falharam")}`;
      return t;
    }

    _pickDataImport() {
      const input = this.renderRoot.querySelector("#rv-data-import");
      if (!input) return;
      input.value = "";
      input.click();
    }

    _onDataImport(ev) {
      const file = ev.target.files && ev.target.files[0];
      ev.target.value = "";
      if (!file) return;
      this._openSheet("confirm", {
        title: "Importar arquivo?",
        text: `Os ajustes do app (nomes, cores e ícones das listas e as tarefas que se repetem) passam a ser os de “${clip(file.name, 40)}”, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma cópia do que existe hoje em Versões anteriores.`,
        label: "Importar",
        run: async () => {
          this._closeSheet();
          this._showToast("Importando…");
          try {
            const n = await this._data().import(file);
            await this._loadPrefs();
            this._haptic("success");
            this._showToast(this._restoredText(n, "Importado"));
          } catch (err) {
            this._showToast(`Não consegui importar. ${err.message}`);
          }
        },
      });
    }

    _confirmRestoreBackup(b) {
      this._openSheet("confirm", {
        title: "Restaurar este backup?",
        text: `Os ajustes do app voltam a ser os do backup de ${this._dateTime(b.date)}, e os itens pendentes que faltarem voltam para as listas, sem duplicar. Antes, o app guarda uma cópia do que existe hoje.`,
        label: "Restaurar",
        run: async () => {
          this._closeSheet();
          this._showToast("Restaurando…");
          try {
            const n = await this._data().restoreBackup(b.name);
            await this._loadPrefs();
            this._haptic("success");
            this._showToast(this._restoredText(n, "Backup restaurado"));
          } catch (err) {
            this._showToast(err.message);
          }
        },
      });
    }

    async _openVersions() {
      this._openSheet("versions", { list: null, error: null });
      try {
        const list = await this._data().versions();
        if (this._sheet === "versions") this._form = { ...this._form, list };
      } catch (err) {
        if (this._sheet === "versions") this._form = { ...this._form, error: err.message };
      }
    }

    _confirmRestoreVersion(v) {
      this._openSheet("confirm", {
        title: "Restaurar esta versão?",
        text: `Os ajustes do app e as tarefas que se repetem voltam a ser os de ${this._dateTime(v.when)}. Os itens das listas não mudam. Antes, o app guarda uma cópia do que existe hoje.`,
        label: "Restaurar",
        run: async () => {
          this._closeSheet();
          try {
            await this._data().restoreVersion(v.name);
            await this._loadPrefs();
            this._haptic("success");
            this._showToast("Versão restaurada");
          } catch (err) {
            this._showToast(err.message);
          }
        },
      });
    }

    _renderVersions() {
      const f = this._form;
      return html`
        <div class="sheet-head">
          <h3 class="display">Versões anteriores</h3>
          <button class="icon-btn" @click=${() => this._closeSheet()} aria-label="Fechar">${icon("x")}</button>
        </div>
        ${f.error
          ? html`<div class="imp-error">${icon("circle-alert")}<span>${f.error}</span></div>`
          : f.list == null
            ? html`<div class="imp-loading"><span class="spin">${icon("loader-circle")}</span><span>Carregando…</span></div>`
            : !f.list.length
              ? html`<p class="sheet-note top">Ainda não há versões anteriores. Elas aparecem depois das primeiras alterações.</p>`
              : html`<div class="data-list">
                  ${f.list.map(
                    (v) => html`<div class="data-item">
                      <div><b>${this._dateTime(v.when)}</b><span>${plural(v.lists, "lista personalizada", "listas personalizadas")} · ${plural(v.rules, "repetição", "repetições")} · ${WHY[v.reason] || "automática"}</span></div>
                      <button class="btn outline sm" @click=${() => this._confirmRestoreVersion(v)}>Restaurar</button>
                    </div>`,
                  )}
                </div>`}
      `;
    }

    _renderDataPanel() {
      const api = this._data();
      if (!api) return nothing;
      const b = this._backups;
      const exp = (fmt, label, ic) => html`<a class="btn outline sm" href=${api.url(fmt) || "#"} download @click=${(e) => this._exportData(fmt, e)}>${icon(ic)}${label}</a>`;
      return html`<div id="dados">
        <div class="panel">
          ${this._secHead("download", "Exportar", "Baixe para guardar ou abrir em outro programa. O ZIP tem todas as listas com os itens (prazo, notas e concluídos), uma planilha e os ajustes do app; o CSV abre no Excel.")}
          <div class="btn-row sec-actions">${exp("zip", "Tudo (ZIP)", "archive")} ${exp("csv", "Planilha (CSV)", "sheet")} ${exp("json", "Dados (JSON)", "braces")}</div>
        </div>
        <div class="panel">
          ${this._secHead("archive", "Backup na pasta share", html`Cria uma cópia completa em <code>share/resolvia</code>, que você acessa pela rede do Home Assistant. Os backups do próprio Home Assistant também incluem o ResolvIA e as listas locais.`)}
          <div class="btn-row sec-actions">
            <button class="btn primary sm" ?disabled=${this._dataBusy === "backup" || (b && b.available === false)} @click=${() => this._createBackup()}>${icon("archive")}${this._dataBusy === "backup" ? "Criando…" : "Criar backup"}</button>
          </div>
          ${b && b.available === false ? html`<p class="data-note">A pasta share não está disponível para o app.</p>` : nothing}
          ${b && b.backups && b.backups.length
            ? html`<div class="data-list">
                ${b.backups.slice(0, 8).map(
                  (x) => html`<div class="data-item">
                    <div><b>${this._dateTime(x.date)}</b><span title=${x.name}>${size(x.size)} · ${x.name}</span></div>
                    <button class="btn outline sm" @click=${() => this._confirmRestoreBackup(x)}>${icon("archive-restore")}Restaurar</button>
                  </div>`,
                )}
              </div>`
            : nothing}
        </div>
        <div class="panel">
          ${this._secHead("upload", "Importar", "Traz de volta um .zip ou .json exportado pelo ResolvIA: nomes, cores e ícones das listas, as tarefas que se repetem e os itens pendentes que estiverem faltando, sem duplicar. Antes de importar, o app guarda uma cópia do que existe hoje.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${() => this._pickDataImport()}>${icon("upload")}Escolher arquivo</button></div>
        </div>
        <div class="panel">
          ${this._secHead("archive-restore", "Versões anteriores", "O app guarda sozinho uma cópia dos ajustes e das repetições a cada 10 minutos de uso. Se algo sair errado, volte para uma versão anterior.")}
          <div class="btn-row sec-actions"><button class="btn outline sm" @click=${() => this._openVersions()}>${icon("archive-restore")}Ver versões</button></div>
        </div>
        <div class="panel">
          ${this._secHead("database", "Onde ficam os dados", html`Os itens ficam nas próprias listas do Home Assistant (locais, Google Tasks, Alexa…). O app guarda nomes, cores, ícones e as tarefas que se repetem em <code>/data/resolvia.json</code>, que entra no backup do Home Assistant.`)}
        </div>
        <input id="rv-data-import" class="sr" type="file" accept=".zip,.json,application/zip,application/json" tabindex="-1" aria-hidden="true" @change=${(e) => this._onDataImport(e)} />
      </div>`;
    }
  };
