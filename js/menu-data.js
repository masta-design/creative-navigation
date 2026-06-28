import { ASSETS } from "./config.js";

// Single source of truth for desktop and mobile navigation data.
export const navTree = [
  {
    id: "development",
    label: "Разработка",
    layout: "two-col",
    note: "Запускаем сайты на\u00A0основе современных типовых решений и\u00A0разрабатываем проекты с\u00A0нуля",
    awards: [
      [ASSETS.awards.rating, "2\u00A0место – Рейтинг Рунета 2025\u00A0г.", "В\u00A0номинации «Разработка и\u00A0продвижение сайтов»"],
      [ASSETS.awards.bitrix, "Золотой сертифицированный партнер 1С-Битрикс", ""],
    ],
    children: [
      { label: "Сайт под\u00A0ключ", href: "#" },
      { label: "Интернет-магазин", href: "#" },
      { label: "Сайт для\u00A0агентств недвижимости", href: "#" },
      { label: "Одностраничный сайт", href: "#" },
      { label: "Внедрение CRM Битрикс24", href: "#" },
    ],
  },
  {
    id: "advertising",
    label: "Реклама",
    layout: "advertising",
    note: "Приводим клиентов из\u00A0интернета с\u00A0гарантией результата уже более 10\u00A0лет",
    awards: [
      [ASSETS.awards.rating, "2\u00A0место – Рейтинг Рунета 2025\u00A0г.", "В\u00A0номинации «Разработка и\u00A0продвижение сайтов / Челябинск»"],
      [ASSETS.awards.rating, "2\u00A0место – Рейтинг Рунета 2025\u00A0г.", "В\u00A0номинации «Контекстная реклама / Челябинск»"],
      [ASSETS.awards.yandex, "Сертифицированное агентство Яндекс", ""],
    ],
    children: [
      { label: "Digital стратегия", href: "#" },
      { label: "Маркетинг на\u00A0аутсорсинге", href: "#" },
      { label: "Контекстная реклама", href: "#" },
      {
        label: "Реклама на\u00A0Яндекс Картах",
        children: [
          { label: "Реклама в\u00A0Яндекс Бизнес", href: "#" },
          { label: "Геомедийная реклама", href: "#" },
        ],
      },
      {
        label: "Поисковое продвижение",
        children: [
          { label: "Продвижение интернет-магазинов", href: "#" },
          { label: "Продвижение корпоративных сайтов", href: "#" },
          { label: "SEO-продвижение сайтов по\u00A0трафику", href: "#" },
          { label: "SEO продвижение по\u00A0позициям", href: "#" },
          { label: "Оптимизация сайтов", href: "#" },
        ],
      },
      {
        label: "Продвижение в\u00A0соц. сетях",
        children: [
          { label: "Таргетированная реклама", href: "#" },
          { label: "Ведение групп (SMM)", href: "#" },
          { label: "SMM для B2B-сегмента", href: "#" },
          { label: "Реклама в\u00A0Telegram Ads", href: "#" },
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
      [ASSETS.modules.autoprokat, "Автопрокат — сайт для\u00A0компаний по\u00A0аренде и\u00A0прокату автомобилей"],
      [ASSETS.modules.autoprokatCrm, "Интеграция с CRM WS. Автопрокат"],
      [ASSETS.modules.hotel, "Отель 2.0 с\u00A0бронированием — сайт отеля, гостиницы, базы отдыха"],
      [ASSETS.modules.blocks, "Замена блоков для\u00A0Сайты24"],
      [ASSETS.modules.number, "Замена номера 2.0"],
      [ASSETS.modules.intrum, "Интеграция с CRM INTRUM Realty"],
      [ASSETS.modules.pvhPro, "ПВХ Калькулятор Pro"],
      [ASSETS.modules.pvh, "Оконный калькулятор 2.0"],
      [ASSETS.modules.cleaning, "Клининговый калькулятор 2.0"],
    ],
  },
  { id: "cases", label: "Кейсы", href: "#" },
  { id: "blog", label: "Блог", href: "#" },
  {
    id: "about",
    label: "О нас",
    layout: "about",
    note: "CREATIVE - студия разработки и\u00A0продвижения сайтов в\u00A0Челябинске и\u00A0по\u00A0России",
    address: "г.\u00A0Челябинск, проспект Ленина, д.\u00A035, этаж 1, офис 101а",
    mapUrl: "https://yandex.ru/maps/-/CTEb7EYI",
    hours: "Пн-Пт 09:00-17:30 (МСК\u00A0+2)",
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
      { label: "Пресса о\u00A0нас", href: "#" },
      { label: "Документы", href: "#" },
    ],
  },
];
