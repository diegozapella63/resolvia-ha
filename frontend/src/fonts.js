// Fonts are bundled (subset to Latin) so the panel looks right offline.
// @font-face does not work inside shadow roots, so it goes in document.head.
import figtree from "../fonts/figtree-var.woff2";
import barlow700 from "../fonts/barlow-700.woff2";
import barlow800 from "../fonts/barlow-800.woff2";

export const FONT_BODY = `"RV Figtree", "Figtree", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
export const FONT_DISPLAY = `"RV Barlow Condensed", "Barlow Condensed", "Roboto Condensed", "Arial Narrow", sans-serif`;

export function ensureFonts() {
  if (document.getElementById("resolvia-fonts")) return;
  const style = document.createElement("style");
  style.id = "resolvia-fonts";
  style.textContent = `
@font-face{font-family:"RV Figtree";src:url(${figtree}) format("woff2");font-weight:300 900;font-style:normal;font-display:swap}
@font-face{font-family:"RV Barlow Condensed";src:url(${barlow700}) format("woff2");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:"RV Barlow Condensed";src:url(${barlow800}) format("woff2");font-weight:800 900;font-style:normal;font-display:swap}`;
  document.head.appendChild(style);
}
