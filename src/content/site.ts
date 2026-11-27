// Единый источник правды о компании. Источник фактов: specs/00-brief.md (утверждён 2026-10-11) и specs/02-spec.md.

export type OrgType = "Organization" | "ProfessionalService";

export const site = {
  // Боевой домен: deploy-kit задаёт NEXT_PUBLIC_SITE_URL и SITE_URL перед сборкой
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://eco-system.pro",
  noindex: process.env.NOINDEX === "1",
  name: "ECO-PRO",
  legalName: "ООО «Про-Тест»",
  alternateName: ["Экосистема PRO", "ЭКО-ПРО", "Император Техно"], // «Про-Тест» — только юрлицо (legalName), не бренд: Сергей 16.11
  orgType: "Organization" as OrgType,
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description:
    "ECO-PRO — ситуационный центр, который возвращает CEO видение: ИИ, сбор данных и аналитика для управляемости и снижения потерь. Пилот — 60 дней.",
  tagline: "Экосистема технологий предотвращения потерь и управления рисками для бизнеса",
  lang: "ru",
  locale: "ru_RU",
  foundingYear: 2001,
  areaServed: ["RU"],

  contacts: {
    phone: "+79112801783",
    phoneDisplay: "+7 (911) 280-17-83",
    email: "assistant@pro-nas.pro",
    telegram: "https://t.me/vynosim_za",
    max: "https://max.ru/join/YURmIV6IxqYWP2Q0M7RCjMRdP1sWc6LeM3m6QgXusS4",
    ceoChannel: "https://t.me/imptechno",
    address: {
      street: "Итальянская ул., д. 12, 25-Н, офис 1",
      city: "Санкт-Петербург",
      region: "Санкт-Петербург",
      postalCode: "",
      country: "RU",
    },
  },

  // Главное целевое действие — встреча. Форма — в попапе-якоре #vstrecha на каждой странице.
  cta: { label: "Записаться на встречу", href: "#vstrecha" },

  legal: {
    inn: "7840070800",
    kpp: "784101001",
    ogrn: "1177847324511",
    privacyEmail: "assistant@pro-nas.pro",
  },

  sameAs: ["https://t.me/vynosim_za"],

  person: {
    name: "Сергей Малютенков",
    jobTitle: "Основатель и CEO",
    description: "Основатель и CEO группы компаний ECO-PRO. «Император Техно» с 2017 — управляющий партнёр; Brothers’ Engineering 2006⁠–⁠2017 — управляющий партнёр; Executive MBA ВШМ СПбГУ (2008).",
    sameAs: ["https://t.me/imptechno"],
  },

  // Обработчик заявок на хостинге (public/api/lead.php): письмо на почту + сообщение в Telegram-группу
  leadEndpoint: "/api/lead.php",
  metrikaId: 0, // TODO(Ник): номер счётчика Яндекс Метрики — до запуска
};

export const nav = [
  { href: "/services/", label: "Направления" },
  { href: "/industries/", label: "Отрасли" },
  { href: "/cases/", label: "Кейсы" },
  { href: "/blog/", label: "Блог" },
];
