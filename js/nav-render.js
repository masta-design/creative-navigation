import { escapeHTML } from "./utils.js";

function hasDropdown(item) {
  return Boolean(item.children?.length || item.modules?.length || item.layout === "about");
}

// Desktop dropdown rendering.
function renderDesktopMenu(menu, items) {
  menu.innerHTML = items
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
            ([image, title]) => `
              <a class="module-item" href="#">
                <img class="module-thumb" src="${escapeHTML(image)}" alt="" />
                <span class="module-content">
                  <span class="module-title">${escapeHTML(title)}</span>
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

function renderMobileAccordion(items) {
  return items
    .map((item) => {
      if (!hasDropdown(item)) {
        return `<a class="mobile-root-link" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.label)}</a>`;
      }

      const contentId = `mobile-section-${escapeHTML(item.id)}`;
      return `
        <section class="mobile-accordion" data-mobile-accordion>
          <button
            class="mobile-accordion-trigger"
            type="button"
            aria-expanded="false"
            aria-controls="${contentId}"
          >
            <span>${escapeHTML(item.label)}</span>
          </button>
          <div class="mobile-accordion-content" id="${contentId}" hidden>
            ${renderDropdown(item)}
          </div>
        </section>
      `;
    })
    .join("");
}

export { hasDropdown, renderDesktopMenu, renderDropdown, renderMobileAccordion };
