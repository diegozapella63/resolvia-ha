// Sugestões: how long each pending item has been on its list. Home Assistant
// doesn't keep when an item was created, so the app notes the first time it
// sees each pending item (/data/idades.json). Items already on the lists when
// this started count from that day. A completed item leaves the file; if it
// comes back (reopened, repeated), it counts again from then.
import fs from "node:fs";
import path from "node:path";

export class Ages {
  constructor({ dir, log }) {
    this.file = path.join(dir, "idades.json");
    this.log = log;
    this.map = {}; // entity_id -> {uid: first seen (ms)}
    this.timer = null;
    try {
      const raw = JSON.parse(fs.readFileSync(this.file, "utf8"));
      if (raw && typeof raw === "object" && raw.itens && typeof raw.itens === "object") {
        for (const [id, uids] of Object.entries(raw.itens)) {
          if (!/^todo\.[a-z0-9_]+$/.test(id) || !uids || typeof uids !== "object") continue;
          const clean = {};
          for (const [uid, at] of Object.entries(uids)) if (Number.isFinite(at)) clean[uid] = at;
          this.map[id] = clean;
        }
      }
    } catch (e) {
      /* first run */
    }
  }

  /** The current items of a list (from todo/item/subscribe). */
  track(id, items, now = Date.now()) {
    const before = this.map[id] || {};
    const next = {};
    let changed = false;
    for (const i of items || []) {
      if (!i || !i.uid || i.status === "completed") continue;
      if (before[i.uid]) next[i.uid] = before[i.uid];
      else {
        next[i.uid] = now;
        changed = true;
      }
    }
    if (!changed && Object.keys(before).length !== Object.keys(next).length) changed = true;
    if (!changed) return;
    if (Object.keys(next).length) this.map[id] = next;
    else delete this.map[id];
    this._save();
  }

  all() {
    return this.map;
  }

  _save() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 2000);
  }

  flush() {
    clearTimeout(this.timer);
    this.timer = null;
    try {
      const tmp = `${this.file}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify({ versao: 1, itens: this.map }));
      fs.renameSync(tmp, this.file);
    } catch (err) {
      this.log.warn(`Não consegui gravar ${this.file}: ${err.message}`);
    }
  }
}
