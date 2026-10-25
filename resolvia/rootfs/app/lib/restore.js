// Brings a backup back: the app data (list names, colors, repeating tasks) is
// replaced, and the pending items that are missing from the lists are added
// again, without duplicating what is already there. A backup taken on another
// Home Assistant finds its lists by name when the entity ids differ.
const F = { CREATE: 1, DUE_DATE: 16, DUE_DATETIME: 32, DESCRIPTION: 64 };
const has = (features, flag) => ((features || 0) & flag) === flag;
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const pad = (n) => String(n).padStart(2, "0");
const fold = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const friendly = (st, id) => (st && st.attributes && st.attributes.friendly_name) || id;

/** Due fields for todo.add_item, as far as the list supports them. */
function dueFields(features, due) {
  if (typeof due !== "string" || !due) return {};
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return has(features, F.DUE_DATE) ? { due_date: due } : {};
  const t = new Date(due);
  if (Number.isNaN(t.getTime())) return {};
  const day = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  if (has(features, F.DUE_DATETIME)) return { due_datetime: `${day} ${pad(t.getHours())}:${pad(t.getMinutes())}:00` };
  return has(features, F.DUE_DATE) ? { due_date: day } : {};
}

export class Restore {
  constructor({ ha, store, recurring, states, log }) {
    this.ha = ha;
    this.store = store;
    this.recurring = recurring;
    this.states = states;
    this.log = log;
  }

  async itemsOf(id) {
    const live = this.recurring.items.get(id);
    if (live) return live;
    try {
      const r = await this.ha.send({ type: "todo/item/list", entity_id: id });
      return (r && r.items) || [];
    } catch (e) {
      return [];
    }
  }

  /** Every list here with its items (for the exports). */
  async lists() {
    const out = [];
    for (const [id, st] of this.states) {
      const custom = this.store.prefs.lists[id] && this.store.prefs.lists[id].name;
      out.push({ entity_id: id, name: custom || friendly(st, id), ha_name: friendly(st, id), items: await this.itemsOf(id) });
    }
    return out.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { numeric: true }));
  }

  /** Which list here receives each list of the file: same entity id, else same name. */
  mapLists(fileLists, filePrefs) {
    const map = new Map();
    const missing = [];
    const used = new Set();
    const names = new Map(); // folded name -> [entity ids]
    const addName = (name, id) => {
      const k = fold(name);
      if (!k) return;
      if (!names.has(k)) names.set(k, []);
      if (!names.get(k).includes(id)) names.get(k).push(id);
    };
    for (const [id, st] of this.states) {
      addName(friendly(st, id), id);
      const custom = this.store.prefs.lists[id] && this.store.prefs.lists[id].name;
      if (custom) addName(custom, id);
    }
    for (const l of fileLists) {
      if (this.states.has(l.entity_id)) {
        map.set(l.entity_id, l.entity_id);
        used.add(l.entity_id);
      }
    }
    for (const l of fileLists) {
      if (map.has(l.entity_id)) continue;
      const custom = filePrefs.lists && filePrefs.lists[l.entity_id] && filePrefs.lists[l.entity_id].name;
      const candidates = [l.name, l.ha_name, custom].flatMap((n) => names.get(fold(n)) || []);
      const target = candidates.find((id) => !used.has(id)) || candidates[0];
      if (target) {
        map.set(l.entity_id, target);
        used.add(target);
      } else missing.push(l.name || l.ha_name || l.entity_id);
    }
    return { map, missing };
  }

  /**
   * raw: the parsed file. items=false for the automatic versions, which only
   * hold the app data. Returns what changed, for the message on screen.
   */
  async run(raw, reason, { items = true } = {}) {
    const fileLists = Array.isArray(raw.lists) ? raw.lists.filter((l) => isObj(l) && typeof l.entity_id === "string") : [];
    const prefs = isObj(raw.prefs) ? raw.prefs : {};
    const { map, missing } = this.mapLists(fileLists, prefs);
    const to = (id) => map.get(id) || id;

    // The app data, moved to the lists found here.
    const lists = {};
    for (const [id, p] of Object.entries(isObj(prefs.lists) ? prefs.lists : {})) {
      const t = to(id);
      if (!lists[t] || id === t) lists[t] = p;
    }
    const app = isObj(prefs.app) ? { ...prefs.app } : {};
    if (Array.isArray(app.list_order)) app.list_order = [...new Set(app.list_order.map((id) => (typeof id === "string" ? to(id) : id)))];
    const rulesIn = Array.isArray(raw.rules) ? raw.rules : isObj(raw.rules) ? Object.values(raw.rules) : [];
    const rules = rulesIn.filter(isObj).map((r) => ({ ...r, entity_id: to(r.entity_id) }));
    this.store.replaceAll({ prefs: { lists, app }, rules }, reason);

    // Repeating tasks whose item isn't here (yet) bind again by name.
    for (const r of Object.values(this.store.rules)) {
      if (r.completed_at || !r.uid) continue;
      const here = await this.itemsOf(r.entity_id);
      if (!here.some((i) => i.uid === r.uid)) {
        r.uid = null;
        r.match = r.summary;
      }
    }

    // Pending items that are missing.
    let added = 0;
    let unsupported = 0;
    const failed = [];
    if (items) {
      for (const l of fileLists) {
        const id = map.get(l.entity_id);
        if (!id) continue;
        const st = this.states.get(id);
        const features = Number((st && st.attributes && st.attributes.supported_features) || 0);
        const here = await this.itemsOf(id);
        const known = new Set(here.map((i) => fold(i.summary)));
        const uids = new Set(here.map((i) => i.uid));
        const wanted = (Array.isArray(l.items) ? l.items : []).filter((i) => isObj(i) && typeof i.summary === "string" && i.summary.trim() && i.status !== "completed");
        for (const i of wanted) {
          if (uids.has(i.uid) || known.has(fold(i.summary))) continue;
          if (!has(features, F.CREATE) || (st && st.state === "unavailable")) {
            unsupported++;
            continue;
          }
          const data = { item: i.summary.trim().slice(0, 255), ...dueFields(features, i.due) };
          if (typeof i.description === "string" && i.description.trim() && has(features, F.DESCRIPTION)) data.description = i.description.slice(0, 4000);
          try {
            await this.ha.send({ type: "call_service", domain: "todo", service: "add_item", service_data: data, target: { entity_id: id } });
            known.add(fold(i.summary));
            added++;
          } catch (err) {
            failed.push(i.summary);
            this.log.warn(`Não consegui repor "${i.summary}" em ${id}: ${err.message}`);
          }
        }
      }
    }

    this.store.save();
    this.recurring.emit("change");
    for (const [id, list] of this.recurring.items) this.recurring.process(id, list);
    const out = {
      lists: Object.keys(this.store.prefs.lists).length,
      rules: Object.keys(this.store.rules).length,
      added,
      unsupported,
      failed: failed.length,
      missing,
      moved: [...map].filter(([a, b]) => a !== b).length,
    };
    this.log.info(`Dados restaurados (${reason}): ${out.rules} repetições, ${added} itens repostos${missing.length ? `, listas não encontradas: ${missing.join(", ")}` : ""}`);
    return out;
  }
}
