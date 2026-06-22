const ASSETS = {
  awards: {
    rating: "assets/menu/awards/rating-runet-icon.svg",
    bitrix: "assets/menu/awards/bitrix-icon.svg",
    yandex: "assets/menu/awards/yandex.svg",
  },
  socials: {
    vk: "assets/menu/icons/vk.svg",
    max: "assets/menu/icons/max.svg",
    telegram: "assets/menu/icons/telegram.svg",
    odnoklassniki: "assets/menu/icons/odnoklassniki.svg",
    dzen: "assets/menu/icons/dzen.svg",
  },
  modules: {
    autoprokat: "assets/menu/modules/autoprokat.webp",
    autoprokatCrm: "assets/menu/modules/autoprokat-crm.webp",
    hotel: "assets/menu/modules/hotel-2.webp",
    blocks: "assets/menu/modules/zamena-blokov.webp",
    number: "assets/menu/modules/zamena-nomera.webp",
    intrum: "assets/menu/modules/intrum-realty.webp",
    pvhPro: "assets/menu/modules/pvh-calculator-2.webp",
    pvh: "assets/menu/modules/pvh-calculator.webp",
    cleaning: "assets/menu/modules/clining.webp",
  },
};

// Shared configuration.
const BREAKPOINTS = {
  mobile: 694,
  mobileModal: 479,
};

const TIMINGS = {
  desktopCloseDelay: 120,
  mobileTransition: 110,
  callbackTransition: 180,
};

const DROPDOWN_REVEAL_SELECTOR = ".dropdown-link-lg, .dropdown-link-sm, .module-item, .dropdown-note, .about-meta, .award, .social-row";
const MOBILE_REVEAL_SELECTOR = ".mobile-item, .mobile-link, .dropdown-link-lg, .module-item, .dropdown-note, .about-meta, .social-row";

// Escape dynamic data before inserting it through template strings.
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

// Single source of truth for desktop and mobile navigation.
const navTree = [
  {
    id: "development",
    label: "Разработка",
    layout: "two-col",
    note: "Запускаем сайты на основе современных типовых решений и разрабатываем проекты с нуля",
    awards: [
      [ASSETS.awards.rating, "2 место - Рейтинг Рунета 2025 г.", "В номинации «Разработка и продвижение сайтов»"],
      [ASSETS.awards.bitrix, "Золотой сертифицированный партнер 1С-Битрикс", ""],
    ],
    children: [
      { label: "Сайт под ключ", href: "#" },
      { label: "Интернет-магазин", href: "#" },
      { label: "Сайт для агентств недвижимости", href: "#" },
      { label: "Одностраничный сайт", href: "#" },
      { label: "Внедрение CRM Битрикс24", href: "#" },
    ],
  },
  {
    id: "advertising",
    label: "Реклама",
    layout: "advertising",
    note: "Приводим клиентов из интернета с гарантией результата уже более 10 лет",
    awards: [
      [ASSETS.awards.rating, "2 место - Рейтинг Рунета 2025 г.", "В номинации «Разработка и продвижение сайтов / Челябинск»"],
      [ASSETS.awards.rating, "2 место - Рейтинг Рунета 2025 г.", "В номинации «Контекстная реклама / Челябинск»"],
      [ASSETS.awards.yandex, "Сертифицированное агентство Яндекс", ""],
    ],
    children: [
      { label: "Digital стратегия", href: "#" },
      { label: "Маркетинг на аутсорсинге", href: "#" },
      { label: "Контекстная реклама", href: "#" },
      {
        label: "Реклама на Яндекс Картах",
        children: [
          { label: "Реклама в Яндекс Бизнес", href: "#" },
          { label: "Геомедийная реклама", href: "#" },
        ],
      },
      {
        label: "Поисковое продвижение",
        children: [
          { label: "Продвижение интернет-магазинов", href: "#" },
          { label: "Продвижение корпоративных сайтов", href: "#" },
          { label: "SEO-продвижение сайтов по трафику", href: "#" },
          { label: "SEO продвижение по позициям", href: "#" },
          { label: "Оптимизация сайтов", href: "#" },
        ],
      },
      {
        label: "Продвижение в соц. сетях",
        children: [
          { label: "Таргетированная реклама", href: "#" },
          { label: "Ведение групп (SMM)", href: "#" },
          { label: "SMM для B2B-сегмента", href: "#" },
          { label: "Реклама в Telegram Ads", href: "#" },
        ],
      },
    ],
  },
  { id: "support", label: "Техподдержка", href: "#" },
  {
    id: "shop",
    label: "Магазин",
    layout: "shop",
    modules: [
      [ASSETS.modules.autoprokat, "Автопрокат - сайт для компаний по аренде и прокату автомобилей", "44 900 ₽"],
      [ASSETS.modules.autoprokatCrm, "Интеграция с CRM WS. Автопрокат", "15 000 ₽"],
      [ASSETS.modules.hotel, "Отель 2.0 с бронированием - сайт отеля, гостиницы, базы отдыха", "44 900 ₽"],
      [ASSETS.modules.blocks, "Замена блоков для Сайты24", "5000 ₽"],
      [ASSETS.modules.number, "Замена номера 2.0", "5000 ₽"],
      [ASSETS.modules.intrum, "Интеграция с CRM INTRUM Realty", "50 000 ₽"],
      [ASSETS.modules.pvhPro, "ПВХ Калькулятор Pro", "14 900 ₽"],
      [ASSETS.modules.pvh, "Оконный калькулятор 2.0", "9 900 ₽"],
      [ASSETS.modules.cleaning, "Клининговый калькулятор 2.0", "5 000 ₽"],
    ],
  },
  { id: "cases", label: "Кейсы", href: "#" },
  { id: "blog", label: "Блог", href: "#" },
  {
    id: "about",
    label: "О нас",
    layout: "about",
    note: "CREATIVE - студия разработки и продвижения сайтов в Челябинске и по России",
    address: "г. Челябинск, проспект Ленина, д. 35, этаж 1, офис 101а",
    mapUrl: "https://yandex.ru/maps/-/CTEb7EYI",
    hours: "Пн-Пт 09:00-17:30 (МСК +2)",
    socials: [
      ["VK", ASSETS.socials.vk],
      ["MAX", ASSETS.socials.max],
      ["TG", ASSETS.socials.telegram],
      ["OK", ASSETS.socials.odnoklassniki],
      ["Dzen", ASSETS.socials.dzen],
    ],
    children: [
      { label: "Контакты", href: "#" },
      { label: "Карьера", href: "#" },
      { label: "Сертификаты", href: "#" },
      { label: "Отзывы", href: "#" },
      { label: "Акции", href: "#" },
      { label: "Пресса о нас", href: "#" },
      { label: "Документы", href: "#" },
    ],
  },
];

// DOM references and mutable UI state.
const nav = document.querySelector("[data-nav]");
const menu = document.querySelector(".desktop-menu");
const dropdown = document.querySelector("[data-dropdown]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const toggle = document.querySelector(".menu-toggle");
const backButton = document.querySelector(".mobile-back");
const scrim = document.querySelector("[data-scrim]");
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

let activeId = null;
let closeTimer = null;
let mobileStack = [];
let mobileTransitionTimer = null;
let callbackTransitionTimer = null;
let lastFocusedElement = null;

function isMobile() {
  return window.matchMedia(`(max-width: ${BREAKPOINTS.mobile}px)`).matches;
}

function isMobileModal() {
  return window.matchMedia(`(max-width: ${BREAKPOINTS.mobileModal}px)`).matches;
}

function hasDropdown(item) {
  return Boolean(item.children?.length || item.modules?.length || item.layout === "about");
}

function findNavItem(id) {
  return navTree.find((item) => item.id === id);
}

// Desktop dropdown rendering.
function renderDesktopMenu() {
  menu.innerHTML = navTree
    .map((item) => {
      const tag = hasDropdown(item) ? "button" : "a";
      const attrs = hasDropdown(item)
        ? `type="button" data-menu="${escapeHTML(item.id)}" aria-expanded="false"`
        : `href="${escapeHTML(item.href || "#")}"`;
      return `<${tag} class="nav-link" ${attrs}><span>${escapeHTML(item.label)}</span></${tag}>`;
    })
    .join("");
}

function linkMarkup(item, className = "dropdown-link-lg") {
  return `<a class="${escapeHTML(className)}" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.label)}</a>`;
}

function linksMarkup(items = [], className = "dropdown-link-lg") {
  return items.map((item) => linkMarkup(item, className)).join("");
}

function awardsMarkup(awards = []) {
  return `
    <div class="awards">
      ${awards
        .map(
          ([icon, title, text]) => `
            <div class="award">
              <img class="award-icon" src="${escapeHTML(icon)}" alt="" aria-hidden="true" />
              <div>
                <div class="award-title">${escapeHTML(title)}</div>
                ${text ? `<div class="award-text">${escapeHTML(text)}</div>` : ""}
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderShop(item) {
  return `
    <div class="dropdown-inner">
      <div class="dropdown-grid shop-grid">
        ${item.modules
          .map(
            ([image, title, price]) => `
              <a class="module-item" href="#">
                <img class="module-thumb" src="${escapeHTML(image)}" alt="" />
                <span class="module-content">
                  <span class="module-title">${escapeHTML(title)}</span>
                  <span class="module-price">${escapeHTML(price)}</span>
                </span>
              </a>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderAdvertising(item) {
  const columns = item.children.reduce((result, group) => {
    if (!group.children?.length) {
      if (!result[0]?.isPlainLinks) result.unshift({ isPlainLinks: true, children: [] });
      result[0].children.push(group);
      return result;
    }
    result.push(group);
    return result;
  }, []);

  return `
    <div class="dropdown-inner">
      <div class="dropdown-layout advertising">
        <div class="dropdown-grid advertising-grid">
          ${columns
            .map(
              (group) =>
                group.isPlainLinks
                  ? `
                <div class="dropdown-group">
                  ${linksMarkup(group.children)}
                </div>
              `
                  : `
                <div class="dropdown-group">
                  ${linkMarkup(group)}
                  ${linksMarkup(group.children, "dropdown-link-sm")}
                </div>
              `,
            )
            .join("")}
        </div>
        <div>
          <div class="dropdown-note">${escapeHTML(item.note)}</div>
          ${awardsMarkup(item.awards)}
        </div>
      </div>
    </div>
  `;
}

function renderAbout(item) {
  return `
    <div class="dropdown-inner">
      <div class="dropdown-layout about">
        <div class="dropdown-links">${linksMarkup(item.children)}</div>
        <div class="about-company">
          <div class="dropdown-note">${escapeHTML(item.note)}</div>
          <div class="about-meta">
            <div class="about-schedule">
              <a class="about-address" href="${item.mapUrl}" target="_blank" rel="noopener noreferrer">${item.address} 🡭</a>
              <div class="award-text">${item.hours}</div>
            </div>
          </div>
          <div class="social-row">
            ${item.socials.map(([label, image]) => `<a class="social-button" href="#" aria-label="${escapeHTML(label)}"><img src="${escapeHTML(image)}" alt="" /></a>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSimpleDropdown(item) {
  return `
    <div class="dropdown-inner">
      <div class="dropdown-layout two-col">
        <div class="dropdown-links">${linksMarkup(item.children)}</div>
        <div>
          <div class="dropdown-note">${escapeHTML(item.note)}</div>
          ${awardsMarkup(item.awards)}
        </div>
      </div>
    </div>
  `;
}

function renderDropdown(item) {
  if (!item) return "";
  if (item.layout === "shop") return renderShop(item);
  if (item.layout === "advertising") return renderAdvertising(item);
  if (item.layout === "about") return renderAbout(item);
  return renderSimpleDropdown(item);
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

function closeDesktop() {
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

// Mobile stepped navigation.
function renderMobileItems(items, isRoot = false) {
  const itemClass = isRoot ? " mobile-root-item" : "";
  mobilePanel.innerHTML = items
    .map((item, index) => {
      if (hasDropdown(item)) {
        return `<button class="mobile-item${itemClass}" type="button" data-mobile-index="${index}">${escapeHTML(item.label)}</button>`;
      }
      return `<a class="mobile-link${itemClass}" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.label)}</a>`;
    })
    .join("");
}

function prepareMobileAnimation() {
  mobilePanel
    .querySelectorAll(MOBILE_REVEAL_SELECTOR)
    .forEach((element, index) => {
      element.classList.add("mobile-reveal-item");
      element.style.setProperty("--mobile-reveal-index", index);
    });
}

function updateMobileScrollState() {
  nav.classList.toggle("is-mobile-scrolled", mobilePanel.scrollTop > 0);
}

function transitionMobileScreen(render, direction = "forward") {
  clearTimeout(mobileTransitionTimer);
  const outClass = direction === "back" ? "is-leaving-back" : "is-leaving-forward";
  const inClass = direction === "back" ? "is-entering-back" : "is-entering-forward";
  mobilePanel.classList.remove("is-leaving-forward", "is-leaving-back", "is-entering-forward", "is-entering-back");
  mobilePanel.classList.add(outClass);

  mobileTransitionTimer = setTimeout(() => {
    render();
    mobilePanel.scrollTop = 0;
    updateMobileScrollState();
    mobilePanel.classList.remove(outClass);
    mobilePanel.classList.add(inClass);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mobilePanel.classList.remove(inClass);
      });
    });
  }, TIMINGS.mobileTransition);
}

function renderMobileMain() {
  mobileStack = [];
  nav.classList.remove("is-submenu", "is-mobile-scrolled");
  renderMobileItems(navTree, true);
  prepareMobileAnimation();
}

function renderMobileSubmenu(item) {
  nav.classList.add("is-submenu");
  if (item.children?.length && item.layout !== "about") {
    renderMobileItems(item.children);
    prepareMobileAnimation();
    return;
  }
  mobilePanel.innerHTML = renderDropdown(item);
  prepareMobileAnimation();
}

function goMobileBack() {
  transitionMobileScreen(() => {
    mobileStack.pop();
    const previous = mobileStack.at(-1);
    if (!previous) {
      renderMobileMain();
      return;
    }
    renderMobileSubmenu(previous);
  }, "back");
}

function getCurrentMobileItems() {
  const current = mobileStack.at(-1);
  return current?.children || navTree;
}

function openMobile() {
  renderMobileMain();
  updateMobileScrollState();
  nav.classList.add("is-mobile-open");
  document.body.classList.add("nav-open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Закрыть меню");
}

function closeMobile() {
  clearTimeout(mobileTransitionTimer);
  mobileStack = [];
  nav.classList.remove("is-mobile-open", "is-submenu", "is-mobile-scrolled");
  mobilePanel.classList.remove("is-leaving-forward", "is-leaving-back", "is-entering-forward", "is-entering-back");
  document.body.classList.remove("nav-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Открыть меню");
}

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

function openCallbackModal() {
  lastFocusedElement = document.activeElement;
  closeDesktop();
  closeMobile();
  clearTimeout(callbackTransitionTimer);
  resetCallbackState();
  callbackModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    callbackModal.classList.add("is-visible");
    callbackName.focus();
  });
}

function closeCallbackModal() {
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
  if (!isValid) setCallbackMessage("Заполните обязательные поля и подтвердите согласие.");
  return isValid;
}

renderDesktopMenu();
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

callbackTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCallbackModal();
  });
});

callbackClose.addEventListener("click", closeCallbackModal);

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

mobilePanel.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-mobile-index]");
  if (!trigger) return;
  const item = getCurrentMobileItems()[Number(trigger.dataset.mobileIndex)];
  if (!item) return;
  transitionMobileScreen(() => {
    mobileStack.push(item);
    renderMobileSubmenu(item);
  }, "forward");
});

mobilePanel.addEventListener("scroll", updateMobileScrollState, { passive: true });
backButton.addEventListener("click", goMobileBack);
scrim.addEventListener("click", () => {
  closeCallbackModal();
  closeDesktop();
  closeMobile();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeCallbackModal();
  closeDesktop();
  closeMobile();
});

window.addEventListener("resize", () => {
  closeCallbackModal();
  closeDesktop();
  closeMobile();
});
