// Entry point of the UI served by the ResolvIA app.
import "./resolvia-panel.js";
import { createAppHass, appEnv } from "./app-hass.js";

const root = document.getElementById("app");
const el = document.createElement("resolvia-panel");
el.env = appEnv();
el.narrow = window.innerWidth < 870;
window.addEventListener("resize", () => (el.narrow = window.innerWidth < 870));

createAppHass((hass) => {
  el.hass = hass;
})
  .then((hass) => {
    el.hass = hass;
    root.replaceChildren(el);
  })
  .catch((err) => {
    root.innerHTML = "";
    const box = document.createElement("div");
    box.id = "boot";
    box.textContent = `Não consegui iniciar o ResolvIA: ${err.message}. Recarregue a página.`;
    root.appendChild(box);
  });
