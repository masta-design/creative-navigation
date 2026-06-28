import { BREAKPOINTS, DROPDOWN_REVEAL_SELECTOR, TIMINGS } from "./config.js";
import { navTree } from "./menu-data.js";
import { renderDesktopMenu, renderDropdown, renderMobileAccordion } from "./nav-render.js";

const nav = document.querySelector("[data-nav]");
const menu = document.querySelector(".desktop-menu");
const dropdown = document.querySelector("[data-dropdown]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const toggle = document.querySelector(".menu-toggle");

let activeId = null;
let closeTimer = null;
const mobileAccordionTimers = new WeakMap();

function isMobile() {
  return window.matchMedia(`(max-width: ${BREAKPOINTS.mobile}px)`).matches;
}

function findNavItem(id) {
  return navTree.find((item) => item.id === id);
}

function prepareDropdownAnimation() {
  dropdown
    .querySelectorAll(DROPDOWN_REVEAL_SELECTOR)
    .forEach((element, index) => {
      element.classList.add("dropdown-reveal-item");
      element.style.setProperty("--reveal-index", index);
    });
}

function setOpen(id) {
  if (!id || isMobile()) return;
  if (activeId === id && nav.classList.contains("is-open")) return;
  const item = findNavItem(id);
  if (!item) return;
  activeId = id;
  dropdown.innerHTML = renderDropdown(item);
  prepareDropdownAnimation();
  nav.classList.add("is-open");
  document.body.classList.add("nav-open");
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.dataset.menu === id;
    link.classList.toggle("is-active", isActive);
    if (link.dataset.menu) link.setAttribute("aria-expanded", String(isActive));
  });
}

export function closeDesktop() {
  activeId = null;
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("is-active");
    if (link.dataset.menu) link.setAttribute("aria-expanded", "false");
  });
}

function setMenuHover(isHovered) {
  if (isMobile()) return;
  nav.classList.toggle("is-menu-hovered", isHovered);
}

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closeDesktop, TIMINGS.desktopCloseDelay);
}

function cancelClose() {
  clearTimeout(closeTimer);
}

function updateMobileScrollState() {
  nav.classList.toggle("is-mobile-scrolled", mobilePanel.scrollTop > 0);
}

function clearAccordionTransition(content) {
  const transition = mobileAccordionTimers.get(content);
  if (!transition) return;
  window.clearTimeout(transition.timer);
  content.removeEventListener("transitionend", transition.finish);
  mobileAccordionTimers.delete(content);
}

function afterAccordionHeightTransition(content, callback) {
  clearAccordionTransition(content);
  let completed = false;

  const finish = (event) => {
    if (event && (event.target !== content || event.propertyName !== "height")) return;
    if (completed) return;
    completed = true;
    clearAccordionTransition(content);
    callback();
  };

  content.addEventListener("transitionend", finish);
  const timer = window.setTimeout(finish, TIMINGS.mobileAccordion + 80);
  mobileAccordionTimers.set(content, { finish, timer });
}

function closeMobileAccordions(except = null) {
  mobilePanel.querySelectorAll("[data-mobile-accordion]").forEach((accordion) => {
    if (accordion === except) return;
    closeMobileAccordion(accordion);
  });
}

function openMobileAccordion(accordion) {
  if (!accordion) return;
  closeMobileAccordions(accordion);
  const content = accordion.querySelector(".mobile-accordion-content");
  if (!content || accordion.classList.contains("is-open")) return;

  clearAccordionTransition(content);
  accordion.classList.add("is-open");
  accordion.querySelector(".mobile-accordion-trigger")?.setAttribute("aria-expanded", "true");
  content.hidden = false;
  content.style.height = "0px";
  content.style.opacity = "0";

  requestAnimationFrame(() => {
    content.style.height = `${content.scrollHeight}px`;
    content.style.opacity = "1";
  });

  afterAccordionHeightTransition(content, () => {
    if (accordion.classList.contains("is-open")) content.style.height = "auto";
  });
}

function closeMobileAccordion(accordion) {
  if (!accordion || !accordion.classList.contains("is-open")) return;
  const content = accordion.querySelector(".mobile-accordion-content");
  if (!content) return;

  clearAccordionTransition(content);
  content.hidden = false;
  content.style.height = `${content.getBoundingClientRect().height}px`;
  content.style.opacity = "1";
  content.offsetHeight;

  accordion.classList.remove("is-open");
  accordion.querySelector(".mobile-accordion-trigger")?.setAttribute("aria-expanded", "false");

  requestAnimationFrame(() => {
    content.style.height = "0px";
    content.style.opacity = "0";
  });

  afterAccordionHeightTransition(content, () => {
    if (!accordion.classList.contains("is-open")) {
      content.hidden = true;
      content.style.height = "0px";
      content.style.opacity = "";
    }
  });
}

function toggleMobileAccordion(accordion) {
  if (!accordion) return;
  accordion.classList.contains("is-open") ? closeMobileAccordion(accordion) : openMobileAccordion(accordion);
}

function openMobile() {
  mobilePanel.innerHTML = renderMobileAccordion(navTree);
  updateMobileScrollState();
  nav.classList.add("is-mobile-open");
  document.body.classList.add("nav-open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Закрыть меню");
}

export function closeMobile() {
  closeMobileAccordions();
  nav.classList.remove("is-mobile-open", "is-mobile-scrolled");
  document.body.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Открыть меню");
}

export function closeNavigation() {
  closeDesktop();
  closeMobile();
}

export function initNavigation() {
  renderDesktopMenu(menu, navTree);
  document.querySelector(".phone-button")?.setAttribute("aria-label", "Связаться");

  menu.addEventListener("pointerover", (event) => {
    const trigger = event.target.closest(".nav-link");
    if (!trigger) return;
    cancelClose();
    if (trigger.dataset.menu) {
      setOpen(trigger.dataset.menu);
      return;
    }
    closeDesktop();
  });

  menu.addEventListener("pointerenter", () => setMenuHover(true));
  menu.addEventListener("pointerleave", () => setMenuHover(false));

  menu.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-menu]");
    if (!trigger) return;
    event.preventDefault();
    activeId === trigger.dataset.menu ? closeDesktop() : setOpen(trigger.dataset.menu);
  });

  nav.addEventListener("pointerenter", cancelClose);
  nav.addEventListener("pointerleave", () => {
    if (!isMobile()) scheduleClose();
  });

  dropdown.addEventListener("pointerenter", cancelClose);
  dropdown.addEventListener("pointerleave", scheduleClose);

  toggle.addEventListener("click", () => {
    closeDesktop();
    nav.classList.contains("is-mobile-open") ? closeMobile() : openMobile();
  });

  mobilePanel.addEventListener("click", (event) => {
    const trigger = event.target.closest(".mobile-accordion-trigger");
    if (!trigger) return;
    toggleMobileAccordion(trigger.closest("[data-mobile-accordion]"));
  });

  mobilePanel.addEventListener("scroll", updateMobileScrollState, { passive: true });
}
