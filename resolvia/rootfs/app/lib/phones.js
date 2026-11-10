// The phones of the people of Home Assistant (identical in the CronologIA and in the ResolvIA).
// The apps look at the person, never at a device: the phones of a person are the mobile apps (the app Home
// Assistant on a phone or a watch) among the devices tracked by their person (Configurações › Pessoas).

/** As Home Assistant names things: "Relógio Davi" → "relogio_davi". */
export function slug(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * The device of each device tracker, from the registries: Map entity_id → {name, mobile} (mobile: a device of
 * the app Home Assistant), null for a tracker without a device; null when the registries can't be read.
 * Home Assistant names the service of a mobile app after the name the app registered (the device's name),
 * not after the tracker: device_tracker.meu_celular can be notify.mobile_app_pixel_8.
 */
export async function trackerDevices(ha) {
  try {
    const [ents, devs] = await Promise.all([ha.send({ type: "config/entity_registry/list_for_display" }), ha.send({ type: "config/device_registry/list" })]);
    if (!ents || !Array.isArray(ents.entities) || !Array.isArray(devs)) return null;
    const byId = new Map(devs.map((d) => [d.id, d]));
    const out = new Map();
    for (const e of ents.entities) {
      if (!/^device_tracker\./.test(e.ei || "")) continue;
      const d = e.di ? byId.get(e.di) : null;
      out.set(e.ei, d ? { name: d.name || "", mobile: (d.identifiers || []).some((i) => Array.isArray(i) && i[0] === "mobile_app") } : null);
    }
    return out;
  } catch {
    return null;
  }
}

/**
 * The phones (notify services mobile_app_*, those in notify) of these trackers: by the name of the device of the
 * app Home Assistant; a tracker of another kind (the router, a camera) is no phone. Without the registries, or a
 * tracker not in them, by the tracker's id (device_tracker.pixel_8 → mobile_app_pixel_8).
 */
export function trackerPhones(trackers, notify, devices) {
  const out = [];
  for (const t of Array.isArray(trackers) ? trackers : []) {
    const id = String(t);
    const byId = `mobile_app_${id.replace(/^device_tracker\./, "")}`;
    let cands = [byId];
    if (devices && devices.has(id)) {
      const d = devices.get(id);
      cands = d && d.mobile ? [`mobile_app_${slug(d.name)}`, byId] : [];
    }
    const hit = cands.find((c) => notify.has(c));
    if (hit && !out.includes(hit)) out.push(hit);
  }
  return out;
}

/**
 * Every alert of the family says which app sent it (on the phone they all arrive as Home Assistant): the title starts
 * with the name of the app, once ("ResolvIA · 📅 Vence hoje"; the same in the GerencIA and the InventarIA, in Python).
 */
export function appTitle(app, title) {
  const t = String(title || "").trim();
  return !t ? app : t.startsWith(`${app} · `) ? t : `${app} · ${t}`;
}
