import { DROPDOWN_REVEAL_SELECTOR, TIMINGS } from "./config.js";
import { navTree } from "./menu-data.js";
import { renderDesktopMenu, renderDropdown, renderMobileAccordion } from "./nav-render.js";
import { isMobileNavigation } from "./media.js";

const nav = document.querySelector("[data-nav]");
const menu = document.querySelector(".desktop-menu");
const dropdown = document.querySelector("[data-dropdown]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const toggle = document.querySelector(".menu-toggle");

let activeId = null;
let closeTimer = null;
let openMobileAccordionId = null;
const mobileAccordionTimers = new WeakMap();

const DESKTOP_CLOSE_GRACE_DELAY = 320;
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

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
  if (!id || isMobileNavigation()) return;
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
  if (isMobileNavigation()) return;
  nav.classList.toggle("is-menu-hovered", isHovered);
}

function isPointerNearDropdownPath(event) {
  if (!event || !nav.classList.contains("is-open")) return false;
  const rect = dropdown.getBoundingClientRect();
  const horizontalBuffer = 96;
  const verticalBuffer = 140;

  return (
    event.clientX >= rect.left - horizontalBuffer &&
    event.clientX <= rect.right + horizontalBuffer &&
    event.clientY >= rect.top - verticalBuffer &&
    event.clientY <= rect.bottom + horizontalBuffer
  );
}

function scheduleClose(event) {
  clearTimeout(closeTimer);
  const delay = isPointerNearDropdownPath(event) ? DESKTOP_CLOSE_GRACE_DELAY : TIMINGS.desktopCloseDelay;
  closeTimer = setTimeout(closeDesktop, delay);
}

function cancelClose() {
  clearTimeout(closeTimer);
}

function desktopTriggers() {
  return [...menu.querySelectorAll(".nav-link")];
}

function activeDesktopTrigger() {
  return activeId ? menu.querySelector(`[data-menu="${activeId}"]`) : null;
}

function focusDesktopTrigger(currentTrigger, direction) {
  const triggers = desktopTriggers();
  const currentIndex = triggers.indexOf(currentTrigger);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
  const nextTrigger = triggers[nextIndex];
  nextTrigger.focus();

  if (nextTrigger.dataset.menu) {
    setOpen(nextTrigger.dataset.menu);
    return;
  }

  closeDesktop();
}

function focusFirstDropdownItem() {
  const firstItem = dropdown.querySelector(FOCUSABLE_SELECTOR);
  if (firstItem) firstItem.focus();
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

  openMobileAccordionId = accordion.dataset.mobileAccordionId || null;
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

  if (openMobileAccordionId === accordion.dataset.mobileAccordionId) openMobileAccordionId = null;
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
  const accordionId = accordion.dataset.mobileAccordionId;
  openMobileAccordionId === accordionId ? closeMobileAccordion(accordion) : openMobileAccordion(accordion);
}

function openMobile() {
  mobilePanel.innerHTML = renderMobileAccordion(navTree);
  nav.classList.add("is-mobile-open");
  document.body.classList.add("nav-open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Закрыть меню");
}

export function closeMobile() {
  closeMobileAccordions();
  openMobileAccordionId = null;
  nav.classList.remove("is-mobile-open");
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

  menu.addEventListener("keydown", (event) => {
    const trigger = event.target.closest(".nav-link");
    if (!trigger) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusDesktopTrigger(trigger, event.key === "ArrowRight" ? 1 : -1);
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && trigger.dataset.menu) {
      event.preventDefault();
      activeId === trigger.dataset.menu ? closeDesktop() : setOpen(trigger.dataset.menu);
      return;
    }

    if (event.key === "ArrowDown" && trigger.dataset.menu) {
      event.preventDefault();
      setOpen(trigger.dataset.menu);
      requestAnimationFrame(focusFirstDropdownItem);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDesktop();
      trigger.focus();
    }
  });

  menu.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-menu]");
    if (!trigger) return;
    event.preventDefault();
    activeId === trigger.dataset.menu ? closeDesktop() : setOpen(trigger.dataset.menu);
  });

  nav.addEventListener("pointerenter", cancelClose);
  nav.addEventListener("pointerleave", (event) => {
    if (!isMobileNavigation()) scheduleClose(event);
  });

  dropdown.addEventListener("pointerenter", cancelClose);
  dropdown.addEventListener("pointerleave", scheduleClose);

  dropdown.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    const trigger = activeDesktopTrigger();
    closeDesktop();
    trigger?.focus();
  });

  toggle.addEventListener("click", () => {
    closeDesktop();
    nav.classList.contains("is-mobile-open") ? closeMobile() : openMobile();
  });

  mobilePanel.addEventListener("click", (event) => {
    const trigger = event.target.closest(".mobile-accordion-trigger");
    if (!trigger) return;
    toggleMobileAccordion(trigger.closest("[data-mobile-accordion]"));
  });

}
