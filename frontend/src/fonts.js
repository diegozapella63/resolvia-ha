// Same typography as InventarIA: Barlow for text, Barlow Condensed for titles,
// numbers and values. Font files ship inside the app (no Google Fonts at runtime).
// @font-face does not work inside shadow roots, so it goes in document.head.
import barlow400 from "../fonts/barlow-400.woff2";
import barlow500 from "../fonts/barlow-500.woff2";
import barlow600 from "../fonts/barlow-600.woff2";
import cond500 from "../fonts/barlow-condensed-500.woff2";
import cond600 from "../fonts/barlow-condensed-600.woff2";
import cond700 from "../fonts/barlow-condensed-700.woff2";

const FALLBACK = `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
export const FONT_BODY = `"RV Barlow", ${FALLBACK}`;
export const FONT_DISPLAY = `"RV Barlow Condensed", ${FALLBACK}`;

export function ensureFonts() {
  if (document.getElementById("resolvia-fonts")) return;
  const face = (family, src, weight) =>
    `@font-face{font-family:"${family}";src:url(${JSON.stringify(src)}) format("woff2");font-weight:${weight};font-style:normal;font-display:swap}`;
  const style = document.createElement("style");
  style.id = "resolvia-fonts";
  style.textContent = [
    face("RV Barlow", barlow400, 400),
    face("RV Barlow", barlow500, 500),
    face("RV Barlow", barlow600, "600 900"),
    face("RV Barlow Condensed", cond500, 500),
    face("RV Barlow Condensed", cond600, 600),
    face("RV Barlow Condensed", cond700, "700 900"),
  ].join("\n");
  document.head.appendChild(style);
}
