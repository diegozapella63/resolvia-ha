// Conversa in the ResolvIA: the button beside the microphone, the chat sheet, what goes to the AI
// (the screen and the lists) and what its cards do (add or complete items, after a tap).
// Mixed into <resolvia-panel>.
import { html, nothing, unsafeSVG } from "../vendor/lit-all.min.js";
import { ICONS } from "./icons.js";
import { renderChat, chatFiles, chatFresh } from "./chat.js";
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
        this._chat = { messages: Array.isArray(messages) ? messages : [], draft: "", busy: false, error: "", rec: null, files: [] };
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
      chatFresh();
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
        app: "resolvia", // as perguntas prontas, guardadas no aparelho
        onRedraw: () => this.requestUpdate(),
        messages: c.messages,
        draft: c.draft,
        busy: c.busy,
        error: c.error,
        voice: { ready: !!v.ready && this._micOk(), on: c.rec === "on", starting: c.rec === "starting" },
        examples: this._chatExamples(),
        models: this._chatModels(),
        onDraft: (t) => this._setChat({ draft: t }),
        onSend: (t) => this._chatSend(t),
        onMic: () => this._chatMic(),
        onMicCancel: () => this._chatMicCancel(),
        onAction: (k, j) => this._chatDo(k, j),
        onAll: (k) => this._chatDoAll(k),
        onClear: () => this._setChat({ messages: [], error: "" }),
        onClose: () => this._closeSheet(),
        // 2.71.0: the clip (Tirar foto, Escolher fotos, Escolher arquivo)
        files: c.files || [],
        onAttach: (kind) => this._chatAttach(kind),
        onFileRemove: (i) => this._setChat({ files: (c.files || []).filter((_, j) => j !== i) }),
      });
    }

    /** The clip of the Conversa: the camera of the app (Digitalizar com IA), the gallery or a file (photo or PDF). */
    _chatAttach(kind) {
      if (kind === "camera") return this._openCamera({ chat: true });
      const input = document.createElement("input");
      input.type = "file";
      input.accept = kind === "fotos" ? "image/*" : "image/*,application/pdf";
      // the Home Assistant app on Android drops selections made with multiple: one at a time there
      input.multiple = kind === "fotos" && !this._isHaAndroid();
      input.style.display = "none";
      input.addEventListener("change", () => {
        const list = Array.from(input.files || []);
        input.remove();
        if (list.length) this._chatAddFiles(list);
      });
      document.body.appendChild(input);
      input.click();
    }

    async _chatAddFiles(list) {
      const { files, error } = await chatFiles(list, this._chatState().files || []);
      this._setChat({ files, error });
      this._chatScroll = true;
    }

    /** The photos of the camera (Pronto): already JPG, ready for the AI. */
    _chatAddShots(shots) {
      const cur = (this._chatState().files || []).filter((f) => !f.pdf);
      const files = [...cur, ...shots.map((s, i) => ({ nome: `Foto ${cur.length + i + 1}.jpg`, pdf: false, mime: s.mime || "image/jpeg", data: s.data, url: s.url }))].slice(0, 4);
      this._setChat({ files, error: "" });
      if (this._sheet !== "chat") this._openChat();
    }

    /** Microphone available (https or the app; not plain http). */
    _micOk() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    /**
     * 2.75.0: the 6 ready questions (the first ones of the screen, then the app's) and, in Editar perguntas, 20 more
     * models; each one only with what it asks about on (Controlar prazos, pontos, cômodos, equipamentos, serviço externo,
     * repetição).
     */
    _chatPool() {
      const on = {
        due: !!(this._dueOn && this._dueOn()),
        points: !!(this._ptsActive && this._ptsActive()),
        rooms: !!(this._roomsOn && this._roomsOn()),
        equips: !!(this._equipsOn && this._equipsOn()),
        ext: !!(this._extOn && this._extOn()),
        repeat: !!(this._repeatOn && this._repeatOn()),
      };
      const q = (t, ok = true) => (ok ? [t] : []);
      // 2.93.1 (o dono: "tem algumas muito específicas"): só perguntas que valem em qualquer casa, sem tarefas ou itens inventados
      return {
        examples: [
          ...q("Por onde eu começo hoje?"),
          ...q("O que está atrasado?", on.due),
          ...q("O que vence esta semana?", on.due),
          ...q("Quais tarefas dão mais pontos?", on.points),
          ...q("Quais cômodos têm mais tarefas?", on.rooms),
          ...q("Quantas tarefas eu tenho?"),
          ...q("Qual lista tem mais pendências?"),
          ...q("Resume as minhas listas"),
          ...q("O que eu concluí esta semana?"),
        ],
        models: [
          ...q("O que posso fazer em 15 minutos?"),
          ...q("Quais são as tarefas mais importantes?"),
          ...q("Monta um plano para o fim de semana"),
          ...q("Me ajuda a planejar a semana"),
          ...q("Quais tarefas estão sem prazo?", on.due),
          ...q("O que está mais perto de vencer?", on.due),
          ...q("Quem tem mais pontos?", on.points),
          ...q("Quantos pontos eu tenho?", on.points),
          ...q("Separa as tarefas por cômodo", on.rooms),
          ...q("Quais tarefas são de equipamentos?", on.equips),
          ...q("Quais tarefas precisam de alguém de fora?", on.ext),
          ...q("Quais tarefas se repetem?", on.repeat),
          ...q("O que eu concluí hoje?"),
          ...q("Quais listas são minhas?"),
          ...q("O que dá para resolver fora de casa?"),
          ...q("O que fazer antes de sair de casa?"),
          ...q("Quais tarefas são rápidas?"),
          ...q("Que tarefas posso fazer à noite?"),
          ...q("Tem alguma tarefa repetida nas listas?"),
          ...q("Divide as tarefas de hoje entre as pessoas da casa"),
          ...q("O que ficou parado há mais tempo?"),
          ...q("Quais tarefas eu posso apagar?"),
          ...q("O que eu esqueci?"),
          ...q("Reorganiza as tarefas de hoje por prioridade"),
          ...q("Escolhe três tarefas para eu fazer agora"),
          ...q("O que é mais fácil de resolver hoje?"),
          ...q("Resume cada lista em uma frase"),
          ...q("Quanto falta para terminar tudo?"),
          ...q("Quais tarefas são da casa toda?"),
        ],
      };
    }

    _chatExamples() {
      const v = this._view();
      const { examples, models } = this._chatPool();
      const l = v.name === "list" ? this._list(v.id) : null;
      const first = l ? [`O que é mais urgente em ${clip(l.name, 24)}?`] : [];
      return [...new Set([...first, ...examples, ...models])].slice(0, 6);
    }

    /** The 20 models of Editar perguntas: the others of the app, beyond the 6 at hand. */
    _chatModels() {
      const { examples, models } = this._chatPool();
      return [...new Set([...examples, ...models])].filter((t) => !this._chatExamples().includes(t)).slice(0, 20);
    }

    /** Where the person is, in words for the AI. */
    _chatScreen() {
      const v = this._view();
      if (v.name === "list") {
        const l = this._list(v.id);
        return l ? `a lista "${l.name}"` : "uma lista";
      }
      if (v.name === "search") return this._query ? `Buscar, procurando "${this._query}"` : "Buscar";
      if (v.name === "lists") return "Listas (todas as listas, com o que falta em cada uma)";
      if (v.name === "more") return "Mais (o menu: Listas, Gráficos, Configurações e Sobre)";
      if (v.name === "sobre") return "Mais › Sobre (CorrerIA Code, quem faz o app, os outros apps da família e o GitHub)";
      if (v.name === "listas") return "Mais › Listas (nome, cor, ícone e quais listas aparecem)";
      if (v.name === "graficos") return `Mais › Gráficos (gráficos das ${this._chartsLine().replace(/\.$/, "").toLowerCase()})`;
      if (v.name === "config") return "Mais › Configurações (integrações, dados, aparência e opções do app: prazos, exibição, quem faz e repetição)";
      return this._dueOn() ? "Agora, o início (o que está atrasado, o que vence hoje e nos próximos dias e por onde começar)" : "Agora, o início (por onde começar)";
    }

    /** The lists for the AI: the visible ones (the open one first), their pending items with date, points, room and equipment. */
    _chatContext() {
      const v = this._view();
      const lists = this._visible().slice();
      const open = v.name === "list" ? this._list(v.id) : null;
      if (open && !lists.includes(open)) lists.unshift(open);
      lists.sort((a, b) => Number(b === open) - Number(a === open));
      const now = new Date();
      // 2.75.0: quem usa o app (a pessoa do placar ligada ao login, ou o nome do login)
      const pts = this._pts && this._pts.placar;
      const eu = (pts && pts.eu) || ((this.hass && this.hass.user && this.hass.user.name) || "").trim();
      return {
        tela: this._chatScreen(),
        eu,
        listas: lists.map((l) => {
          const pending = (l.items || []).filter((i) => !isDone(i));
          const done = (l.items || []).filter((i) => isDone(i));
          return {
            id: l.id,
            nome: l.name,
            // 2.75.0: de quem é a lista (De quem é; vazio: de todos) e as concluídas (as últimas)
            de: l.owner || "",
            concluidas: done.length,
            concluidas_itens: done.slice(-15).map((i) => i.summary || "").filter(Boolean),
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
                // 2.75.0: as notas do item e a repetição (volta N dias depois de concluída)
                notas: clip(String(i.description || "").replace(/\s+/g, " ").trim(), 200),
                repete: ((r) => (r && r.days ? `volta ${r.days} ${r.days === 1 ? "dia" : "dias"} depois de concluída` : ""))(this._ruleFor ? this._ruleFor(l.id, i) : null),
              };
            }),
          };
        }),
      };
    }

    async _chatSend(text) {
      const c = this._chatState();
      if (c.busy) return;
      const files = c.files || [];
      const mine = files.length ? { role: "user", text, anexos: files.map((f) => f.nome) } : { role: "user", text };
      const messages = [...c.messages, mine];
      this._setChat({ messages, draft: "", busy: true, error: "", files: [] });
      this._chatScroll = true;
      try {
        const payload = {
          messages: messages.map((m) => ({ role: m.role, text: m.text || (m.actions || []).map((a) => a.label).join("; "), ...(m.anexos ? { anexos: m.anexos } : {}) })),
          context: this._chatContext(),
        };
        // with files, by POST (a photo is too big for the WebSocket); the names stay in the conversation
        const out = files.length
          ? await this.hass.resolvia.chat({ ...payload, files: files.map((f) => ({ data: f.data, mime: f.mime, nome: f.nome })) })
          : await this.hass.callWS({ type: "resolvia/ai/chat", ...payload });
        for (const f of files) if (f.url) URL.revokeObjectURL(f.url);
        const actions = (out.actions || []).map((a) => ({ ...a, label: this._chatLabel(a), icon: a.tipo === "concluir" ? "check" : "plus", state: "todo" }));
        this._setChat({ messages: [...this._chatState().messages, { role: "ia", text: out.reply || "", actions }], busy: false });
      } catch (err) {
        // the files come back, to send again
        this._setChat({ busy: false, error: err.message || "A IA não respondeu. Tente de novo.", ...(files.length ? { files, messages: this._chatState().messages.filter((m) => m !== mine) } : {}) });
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

    /** Cancelar while listening: the microphone stops and nothing is transcribed or sent. */
    _chatMicCancel() {
      clearTimeout(this._chatRecTimer);
      if (this._chatRec) this._chatRec.cancel();
      this._chatRec = null;
      this._setChat({ rec: null, error: "" });
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
