import { BREAKPOINTS } from "./config.js";
import { closeNavigation, initNavigation } from "./navigation.js";
import { closeCallbackModal, initCallbackModal } from "./callback-modal.js";

const scrim = document.querySelector("[data-scrim]");
const desktopModalMedia = window.matchMedia(`(min-width: ${BREAKPOINTS.mobileModal + 1}px)`);

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
  if (desktopModalMedia.matches) closeCallbackModal();
  closeNavigation();
});
