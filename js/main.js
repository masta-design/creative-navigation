import { closeNavigation, initNavigation } from "./navigation.js";
import { closeCallbackModal, initCallbackModal } from "./callback-modal.js";

const scrim = document.querySelector("[data-scrim]");

initNavigation();
initCallbackModal();

scrim.addEventListener("click", () => {
  closeCallbackModal();
  closeNavigation();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeCallbackModal();
  closeNavigation();
});

window.addEventListener("resize", () => {
  closeCallbackModal();
  closeNavigation();
});
