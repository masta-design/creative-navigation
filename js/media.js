import { BREAKPOINTS } from "./config.js";

function matchesMedia(query) {
  return window.matchMedia(query).matches;
}

export function isMobileNavigation() {
  return matchesMedia(`(max-width: ${BREAKPOINTS.mobile}px)`);
}

export function isMobileModal() {
  return matchesMedia(`(max-width: ${BREAKPOINTS.mobileModal}px)`);
}

export function isDesktopModal() {
  return matchesMedia(`(min-width: ${BREAKPOINTS.mobileModal + 1}px)`);
}
