// Conversa in the ResolvIA: the button beside the microphone, the chat sheet, what goes to the AI
// (the screen and the lists) and what its cards do (add or complete items, after a tap).
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { renderChat } from "./chat.js";
import { Recorder, micError, VOICE_RATE, VOICE_MAX_S } from "./voice.js";
import { F, has, fold, parseDue, dueInfo, clip } from "./util.js";

const icon = (name, cls = "") =>
  html`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${unsafeSVG(ICONS[name] || ICONS["list-checks"])}</svg>`;
const isDone = (item) => item.status === "completed";
const SAVE_KEY = "resolvia-conversa";

export const ChatMixin = (Base) =>
  class extends Base {
    /** {messages, draft, busy, error}: kept while the app is open (and in this tab, across reloads). */
    _chatState() {
      if (!this._chat) {
        let messages = [];
        try {
          messages = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "[]");
        } catch (e) {
          /* private mode */
        }
        this._chat = { messages: Array.isArray(messages) ? messages : [], draft: "", busy: false, error: "", rec: null };
      }
      return this._chat;
    }

    _setChat(changes) {
      this._chat = { ...this._chatState(), ...changes };
      if ("messages" in changes) {
        try {
          sessionStorage.setItem(SAVE_KEY, JSON.stringify(this._chat.messages.slice(-30)));
        } catch (e) {
          /* private mode */
        }
      }
      this.requestUpdate();
    }

    /** Beside the microphone (with Usar IA on). */
    _renderChatBtn() {
      if (!this._aiOn() || !this.hass.resolvia) return nothing;
      return html`<button class="mic-top chat-top" aria-label="Conversar com a IA" title="Conversar com a IA" @click=${() => this._openChat()}>${icon("message-circle")}</button>`;
    }

    _openChat() {
      this._openSheet("chat", {});
      this._chatScroll = true;
      this.updateComplete.then(() => {
        const ta = this.renderRoot.querySelector(".chat-input textarea");
        if (ta && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) ta.focus();
      });
    }

    _renderChatSheet() {
      const c = this._chatState();
      const v = this._voice || {};
      return renderChat({
        lit: { html, nothing },
        icon,
        messages: c.messages,
        draft: c.draft,
        busy: c.busy,
        error: c.error,
        voice: { ready: !!v.ready && this._micOk(), on: c.rec === "on", starting: c.rec === "starting" },
        examples: this._chatExamples(),
        onDraft: (t) => this._setChat({ draft: t }),
        onSend: (t) => this._chatSend(t),
        onMic: () => this._chatMic(),
        onAction: (k, j) => this._chatDo(k, j),
        onAll: (k) => this._chatDoAll(k),
        onClear: () => this._setChat({ messages: [], error: "" }),
        onClose: () => this._closeSheet(),
      });
    }

    /** Microphone available (https or the app; not plain http). */
    _micOk() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    _chatExamples() {
      const v = this._view();
      if (v.name === "list") {
        const l = this._list(v.id);
        return l ? [`O que é mais urgente em ${clip(l.name, 24)}?`, "Por onde eu começo hoje?"] : [];
      }
      return ["O que está atrasado?", "Por onde eu começo hoje?", "Adiciona leite na lista de compras"];
    }

    /** Where the person is, in words for the AI. */
    _chatScreen() {
      const v = this._view();
      if (v.name === "list") {
        const l = this._list(v.id);
        return l ? `a lista "${l.name}"` : "uma lista";
      }
      if (v.name === "search") return this._query ? `Buscar, procurando "${this._query}"` : "Buscar";
      if (v.name === "due") return "Prazos (o que vence e o que está atrasado)";
      if (v.name === "suggest") return "Sugestões (por onde começar)";
      if (v.name === "more") return "Mais (configurações do app)";
      return "o início, com todas as listas";
    }

    /** The lists for the AI: the visible ones (the open one first), their pending items with date, points, room and equipment. */
    _chatContext() {
      const v = this._view();
      const lists = this._visible().slice();
      const open = v.name === "list" ? this._list(v.id) : null;
      if (open && !lists.includes(open)) lists.unshift(open);
      lists.sort((a, b) => Number(b === open) - Number(a === open));
      const now = new Date();
      return {
        tela: this._chatScreen(),
        listas: lists.map((l) => {
          const pending = (l.items || []).filter((i) => !isDone(i));
          return {
            id: l.id,
            nome: l.name,
            adicionar: has(l.features, F.CREATE) && !l.unavailable,
            prazos: !l.noDue && has(l.features, F.DUE_DATE),
            pendentes: pending.length,
            itens: pending.slice(0, l === open ? 120 : 40).map((i) => {
              const p = parseDue(i.due);
              const d = p ? dueInfo(i.due, now) : null;
              return {
                texto: i.summary || "",
                prazo: p && !l.noDue ? p.date : null,
                atrasado: !!(d && d.tone === "late" && !l.noDue),
                pontos: this._pointsOf ? this._pointsOf(l.id, i.summary, i.uid) || 0 : 0,
                comodo: this._roomIdsOf(l.id, i.summary).map((id) => this._roomName(id)).filter(Boolean).join(", "),
                equipamento: this._equipIdsOf(l.id, i.summary).map((id) => (this._equipOf(id) || {}).nome).filter(Boolean).join(", "),
                externo: ((e) => (e === true ? "sim" : e || ""))(this._externalOf(l.id, i.summary)),
              };
            }),
          };
        }),
      };
    }

    async _chatSend(text) {
      const c = this._chatState();
      if (c.busy) return;
      const messages = [...c.messages, { role: "user", text }];
      this._setChat({ messages, draft: "", busy: true, error: "" });
      this._chatScroll = true;
      try {
        const out = await this.hass.callWS({
          type: "resolvia/ai/chat",
          messages: messages.map((m) => ({ role: m.role, text: m.text || (m.actions || []).map((a) => a.label).join("; ") })),
          context: this._chatContext(),
        });
        const actions = (out.actions || []).map((a) => ({ ...a, label: this._chatLabel(a), icon: a.tipo === "concluir" ? "check" : "plus", state: "todo" }));
        this._setChat({ messages: [...this._chatState().messages, { role: "ia", text: out.reply || "", actions }], busy: false });
      } catch (err) {
        this._setChat({ busy: false, error: err.message || "A IA não respondeu. Tente de novo." });
      }
      this._chatScroll = true;
    }

    _chatLabel(a) {
      if (a.tipo === "concluir") return `Concluir "${clip(a.item, 60)}" em ${clip(a.nome, 30)}`;
      return `Adicionar "${clip(a.item, 60)}" em ${clip(a.nome, 30)}${a.prazo ? ` · prazo ${a.prazo.slice(8, 10)}/${a.prazo.slice(5, 7)}` : ""}`;
    }

    _setAction(k, j, changes) {
      const messages = this._chatState().messages.map((m, n) => (n === k ? { ...m, actions: m.actions.map((a, i) => (i === j ? { ...a, ...changes } : a)) } : m));
      this._setChat({ messages });
    }

    /** One card's button: adds the item (with its date) or completes it, as the screen would. */
    async _chatDo(k, j) {
      const a = ((this._chatState().messages[k] || {}).actions || [])[j];
      if (!a || a.state === "done" || a.state === "doing") return;
      this._setAction(k, j, { state: "doing", note: "" });
      const l = this._list(a.lista);
      let ok = false;
      let note = "";
      if (!l) note = "Lista não encontrada.";
      else if (a.tipo === "adicionar") {
        ok = await this._addFull(l, { summary: a.item, description: "", date: a.prazo || null, time: null });
      } else {
        const item = (l.items || []).find((i) => !isDone(i) && fold(i.summary) === fold(a.item));
        if (!item) note = "Esse item não está mais pendente.";
        else {
          await this._toggle(l, item);
          ok = true;
        }
      }
      this._setAction(k, j, { state: ok ? "done" : "failed", note: ok ? "" : note || "Não deu certo." });
    }

    async _chatDoAll(k) {
      const acts = (this._chatState().messages[k] || {}).actions || [];
      for (let j = 0; j < acts.length; j++) if (acts[j].state !== "done") await this._chatDo(k, j);
    }

    /** The microphone of the chat: talk, then what was understood is sent. */
    async _chatMic() {
      const c = this._chatState();
      if (c.rec === "on") {
        const rec = this._chatRec;
        this._chatRec = null;
        clearTimeout(this._chatRecTimer);
        if (!rec) return this._setChat({ rec: null });
        const pcm = rec.stop();
        this._setChat({ rec: null });
        if (pcm.length < VOICE_RATE * 0.4) return this._setChat({ error: "Não ouvi nada. Toque no microfone e fale." });
        this._setChat({ busy: true, error: "" });
        try {
          const r = await this.hass.resolvia.voiceText(pcm);
          this._setChat({ busy: false });
          if (r && r.text) this._chatSend(r.text);
        } catch (err) {
          this._setChat({ busy: false, error: err.message || "Não consegui transcrever." });
        }
        return;
      }
      if (c.rec) return;
      const rec = new Recorder(() => {});
      this._chatRec = rec;
      this._setChat({ rec: "starting", error: "" });
      try {
        await rec.start();
      } catch (err) {
        rec.cancel();
        this._chatRec = null;
        return this._setChat({ rec: null, error: micError(err) });
      }
      if (this._chatRec !== rec) return rec.cancel();
      this._setChat({ rec: "on" });
      this._chatRecTimer = setTimeout(() => this._chatState().rec === "on" && this._chatMic(), VOICE_MAX_S * 1000);
    }

    /** Leaving the chat stops the microphone. */
    _chatStop() {
      clearTimeout(this._chatRecTimer);
      if (this._chatRec) this._chatRec.cancel();
      this._chatRec = null;
      if (this._chat && this._chat.rec) this._chat = { ...this._chat, rec: null };
    }

    /** After each render: the chat scrolls to the newest message. */
    _chatAfterRender() {
      if (!this._chatScroll || this._sheet !== "chat") return;
      this._chatScroll = false;
      const log = this.renderRoot.querySelector(".chat-log");
      if (log) log.scrollTop = log.scrollHeight;
    }
  };
