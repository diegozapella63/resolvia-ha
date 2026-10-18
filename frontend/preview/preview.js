import "../src/resolvia-panel.js";
import { createMockHass } from "./mock-hass.js";

const el = document.createElement("resolvia-panel");
el.panel = { url_path: "resolvia", title: "ResolvIA" };
el.narrow = window.innerWidth < 870;
el.hass = createMockHass((next) => {
  el.hass = next;
});
document.getElementById("app").appendChild(el);

// Let the preview follow the device's light/dark setting in "Automático".
const mq = window.matchMedia("(prefers-color-scheme: dark)");
const sync = () => {
  el.hass = { ...el.hass, themes: { ...el.hass.themes, darkMode: mq.matches } };
  document.documentElement.dataset.dark = mq.matches ? "1" : "0";
};
mq.addEventListener("change", sync);
sync();

// Deep links for screenshots: preview.html#/lista/todo.casa
if (location.hash.length > 1) {
  const path = location.hash.slice(1);
  history.replaceState({ rvDepth: 0, rvPath: path }, "");
  el._path = path;
}
