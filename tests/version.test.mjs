// The version is written in one place only: resolvia/config.yaml (version:). The build (frontend/build.mjs) takes it
// to the server (resolvia/rootfs/app/lib/version.js) and to the screen (__APP_VERSION__ in the bundle and the preview).
// This test fails when someone bumped config.yaml and forgot `npm run build`, or wrote a version by hand somewhere.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT, FRONT } from "./_helpers.mjs";
import { VERSION } from "../resolvia/rootfs/app/lib/version.js";

const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), "utf8");
const CONFIG = /^version:\s*"([^"]+)"/m.exec(read("resolvia", "config.yaml"))[1];

describe("the version, written only in config.yaml", () => {
  it("config.yaml has a version x.y.z", () => assert.match(CONFIG, /^\d+\.\d+\.\d+$/));
  it("the server has the same (lib/version.js, made by the build)", () => assert.equal(VERSION, CONFIG));
  it("the screen and the preview have the same (the build put it there)", () => {
    for (const f of [["resolvia", "rootfs", "app", "www", "resolvia.js"], ["preview", "resolvia-preview.html"]]) {
      const src = read(...f);
      assert.ok(src.includes(JSON.stringify(CONFIG)), `${f.join("/")} has ${CONFIG}: run npm run build`);
      assert.ok(!src.includes("__APP_VERSION__"), `${f.join("/")}: the build replaced __APP_VERSION__`);
    }
  });
  it("nobody writes a version by hand in the server or the screen", () => {
    assert.doesNotMatch(read("resolvia", "rootfs", "app", "server.js"), /const VERSION\s*=\s*"/);
    for (const f of fs.readdirSync(FRONT).filter((x) => x.endsWith(".js"))) assert.doesNotMatch(fs.readFileSync(path.join(FRONT, f), "utf8"), /const VERSION\s*=\s*"\d/, f);
    assert.match(read("frontend", "src", "resolvia-panel.js"), /const VERSION = typeof __APP_VERSION__ === "string" \? __APP_VERSION__ : "dev";/);
  });
  it("the CHANGELOG starts with # Mudanças and has a section for this version", () => {
    const log = read("resolvia", "CHANGELOG.md");
    assert.ok(log.startsWith("# Mudanças\n"));
    assert.equal(/^## (\S+)/m.exec(log)[1], CONFIG, "the newest section is this version");
  });
});
