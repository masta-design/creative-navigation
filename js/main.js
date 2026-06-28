import { closeNavigation, initNavigation } from "./navigation.js";
import { closeCallbackModal, initCallbackModal } from "./callback-modal.js";
import { isDesktopModal } from "./media.js";

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
  if (isDesktopModal()) closeCallbackModal();
  closeNavigation();
});
