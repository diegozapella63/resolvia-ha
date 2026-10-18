// Build: node build.mjs  (needs esbuild on PATH or in node_modules)
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const common = {
  bundle: true,
  minify: true,
  legalComments: "none",
  loader: { ".woff2": "dataurl" },
  target: ["chrome100", "safari15", "firefox100"],
  logLevel: "warning",
  // Lit prints a "loaded from a bundle" notice unless this is set first.
  banner: { js: "window.litDisableBundleWarning=true;" },
};

// 1) The panel module served by the integration.
await build({
  ...common,
  entryPoints: [resolve(here, "src/resolvia-panel.js")],
  format: "esm",
  outfile: resolve(root, "custom_components/resolvia/frontend/resolvia-panel.js"),
  banner: {
    js: "/* ResolvIA panel · Lit (BSD-3), Lucide icons (ISC), Barlow Condensed & Figtree (OFL) */\nwindow.litDisableBundleWarning=true;",
  },
});

// 2) A self-contained preview page with fake data.
const out = await build({
  ...common,
  entryPoints: [resolve(here, "preview/preview.js")],
  format: "iife",
  write: false,
});
const js = out.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const shell = readFileSync(resolve(here, "preview/preview.template.html"), "utf8");
mkdirSync(resolve(root, "preview"), { recursive: true });
writeFileSync(resolve(root, "preview/resolvia-preview.html"), shell.replace("/*BUNDLE*/", () => js));
console.log("built");
