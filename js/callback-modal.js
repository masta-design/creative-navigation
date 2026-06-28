import { TIMINGS } from "./config.js";
import { closeNavigation } from "./navigation.js";
import { isMobileModal } from "./media.js";

const callbackModal = document.querySelector("[data-callback-modal]");
const callbackTriggers = document.querySelectorAll(".callback-button, .phone-button");
const callbackClose = document.querySelector(".callback-close");
const callbackForm = document.querySelector("[data-callback-form]");
const callbackName = document.querySelector("[data-callback-name]");
const callbackPhone = document.querySelector("[data-callback-phone]");
const callbackPrivacy = document.querySelector("[data-callback-privacy]");
const callbackMessage = document.querySelector("[data-callback-message]");
const callbackSuccess = document.querySelector("[data-callback-success]");
const callbackSuccessPhone = document.querySelector("[data-callback-success-phone]");

let callbackTransitionTimer = null;
let lastFocusedElement = null;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

// Callback modal and client-side validation.
function setCallbackMessage(text = "", type = "error") {
  callbackMessage.textContent = text;
  callbackMessage.classList.toggle("is-success", type === "success");
}

function clearCallbackErrors() {
  callbackForm.querySelectorAll(".is-error").forEach((element) => element.classList.remove("is-error"));
  callbackForm.querySelectorAll("[aria-invalid='true']").forEach((element) => element.removeAttribute("aria-invalid"));
}

function resetCallbackState() {
  callbackForm.hidden = false;
  callbackSuccess.hidden = true;
  callbackModal.classList.remove("is-success");
  callbackModal.setAttribute("aria-labelledby", "callback-title");
  callbackForm.reset();
  clearCallbackErrors();
  setCallbackMessage();
  callbackSuccessPhone.textContent = "";
}

function showCallbackSuccess(phoneValue) {
  callbackSuccessPhone.textContent = phoneValue;
  callbackForm.hidden = true;
  callbackSuccess.hidden = false;
  callbackModal.classList.add("is-success");
  callbackModal.setAttribute("aria-labelledby", "callback-success-title");
  requestAnimationFrame(() => callbackClose.focus());
}

function callbackFocusableElements() {
  return [...callbackModal.querySelectorAll(FOCUSABLE_SELECTOR)].filter((element) => {
    return !element.hidden && element.getClientRects().length > 0;
  });
}

function trapCallbackFocus(event) {
  if (event.key !== "Tab" || callbackModal.hidden) return;
  const focusableElements = callbackFocusableElements();
  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (!callbackModal.contains(activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function openCallbackModal() {
  lastFocusedElement = document.activeElement;
  closeNavigation();
  clearTimeout(callbackTransitionTimer);
  resetCallbackState();
  callbackModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    callbackModal.classList.add("is-visible");
    if (!isMobileModal()) callbackName.focus();
  });
}

export function closeCallbackModal() {
  if (callbackModal.hidden) return;
  clearTimeout(callbackTransitionTimer);
  callbackModal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");
  if (isMobileModal()) {
    callbackModal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
    return;
  }
  callbackTransitionTimer = setTimeout(() => {
    callbackModal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }, TIMINGS.callbackTransition);
}

function validateCallbackForm() {
  clearCallbackErrors();
  const nameValue = callbackName.value.trim();
  const phoneValue = callbackPhone.value.trim();

  if (!nameValue) {
    callbackName.closest(".callback-field-row").classList.add("is-error");
    callbackName.setAttribute("aria-invalid", "true");
  }

  if (!phoneValue) {
    callbackPhone.closest(".callback-field-row").classList.add("is-error");
    callbackPhone.setAttribute("aria-invalid", "true");
  }

  if (!callbackPrivacy.checked) {
    callbackPrivacy.closest(".callback-consent").classList.add("is-error");
    callbackPrivacy.setAttribute("aria-invalid", "true");
  }

  const isValid = Boolean(nameValue && phoneValue && callbackPrivacy.checked);
  if (!isValid) setCallbackMessage("Заполните обязательные поля и\u00A0подтвердите согласие.");
  return isValid;
}

export function initCallbackModal() {
  callbackTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openCallbackModal();
    });
  });

  callbackClose.addEventListener("click", closeCallbackModal);
  callbackModal.addEventListener("keydown", trapCallbackFocus);

  callbackPhone.addEventListener("input", () => {
    callbackPhone.value = callbackPhone.value.replace(/[^\d\s()+-]/g, "");
  });

  callbackForm.addEventListener("input", (event) => {
    const fieldRow = event.target.closest(".callback-field-row");
    if (fieldRow) fieldRow.classList.remove("is-error");
    if (event.target === callbackPrivacy) callbackPrivacy.closest(".callback-consent").classList.remove("is-error");
    event.target.removeAttribute("aria-invalid");
    if (!callbackMessage.classList.contains("is-success")) setCallbackMessage();
  });

  callbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCallbackForm()) return;
    const submittedPhone = callbackPhone.value.trim();
    clearCallbackErrors();
    showCallbackSuccess(submittedPhone);
  });
}
