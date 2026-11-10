// The phones of a person (lib/phones.js, identical in the CronologIA): the mobile apps among the devices their person
// tracks in Home Assistant, named after the device (not the tracker), as Home Assistant names the service.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { appTitle, slug, trackerDevices, trackerPhones } from "../resolvia/rootfs/app/lib/phones.js";

const NOTIFY = new Set(["mobile_app_pixel_8", "mobile_app_relogio_davi", "mobile_app_note_davi", "mobile_app_galaxy_s23"]);
const REG = {
  entities: [
    { ei: "device_tracker.meu_celular", di: "d1" },
    { ei: "device_tracker.relogio", di: "d2" },
    { ei: "device_tracker.note_davi", di: "d3" },
    { ei: "device_tracker.sem_aparelho" },
    { ei: "light.sala", di: "d1" },
  ],
  devices: [
    { id: "d1", name: "Pixel 8", name_by_user: "Celular Davi", identifiers: [["mobile_app", "x"]] },
    { id: "d2", name: "Relógio Davi", identifiers: [["mobile_app", "y"]] },
    { id: "d3", name: "note_davi", identifiers: [["mac", "02:00"]] },
  ],
};
const ha = (fail) => ({ send: async (m) => { if (fail) throw new Error("unauthorized"); return m.type === "config/device_registry/list" ? REG.devices : { entities: REG.entities }; } });

describe("phones of a person", () => {
  it("slug: as Home Assistant names a service", () => {
    assert.equal(slug("Relógio Davi"), "relogio_davi");
    assert.equal(slug("  Pixel 8 Pro! "), "pixel_8_pro");
  });
  it("by the device of the tracker: the name the app registered, not the tracker nor the name given in Home Assistant", async () => {
    const devices = await trackerDevices(ha());
    assert.deepEqual([...devices.keys()], ["device_tracker.meu_celular", "device_tracker.relogio", "device_tracker.note_davi", "device_tracker.sem_aparelho"]);
    assert.deepEqual(trackerPhones(["device_tracker.meu_celular", "device_tracker.relogio"], NOTIFY, devices), ["mobile_app_pixel_8", "mobile_app_relogio_davi"], "the phone and the watch");
  });
  it("a tracker of another kind (the router) or without a device is no phone, even with a service named like it", async () => {
    const devices = await trackerDevices(ha());
    assert.deepEqual(trackerPhones(["device_tracker.note_davi", "device_tracker.sem_aparelho"], NOTIFY, devices), []);
  });
  it("without the registries, or a tracker not in them: by the tracker's id", async () => {
    assert.equal(await trackerDevices(ha(true)), null);
    assert.deepEqual(trackerPhones(["device_tracker.galaxy_s23", "device_tracker.meu_celular"], NOTIFY, null), ["mobile_app_galaxy_s23"]);
    assert.deepEqual(trackerPhones(["device_tracker.galaxy_s23"], NOTIFY, await trackerDevices(ha())), ["mobile_app_galaxy_s23"]);
    assert.deepEqual(trackerPhones(null, NOTIFY, null), []);
  });
  it("one phone once, even tracked twice", async () => {
    assert.deepEqual(trackerPhones(["device_tracker.meu_celular", "device_tracker.pixel_8"], NOTIFY, await trackerDevices(ha())), ["mobile_app_pixel_8"]);
  });
});

describe("appTitle: the name of the app in front of every alert title", () => {
  it("once, and only the name when there is no title", () => {
    assert.equal(appTitle("ResolvIA", "📅 Vence hoje"), "ResolvIA · 📅 Vence hoje");
    assert.equal(appTitle("ResolvIA", "ResolvIA · 📅 Vence hoje"), "ResolvIA · 📅 Vence hoje");
    assert.equal(appTitle("CronologIA", "  "), "CronologIA");
  });
});
