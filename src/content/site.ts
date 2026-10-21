// Единый источник правды о компании. Источник фактов: specs/00-brief.md (утверждён 2026-10-11) и specs/02-spec.md.

export type OrgType = "Organization" | "ProfessionalService";

export const site = {
  // Тестовая выкладка: SITE_URL=https://eco-pro.nikalimp.ru NOINDEX=1 npm run build — закрыта от индексации
  url: process.env.SITE_URL || "https://pro-nas.pro",
  noindex: process.env.NOINDEX === "1",
  name: "ECO-PRO",
  legalName: "ООО «Про-Тест»",
  alternateName: ["Экосистема PRO", "ЭКО-ПРО", "Про-Тест", "Император Техно"],
  orgType: "Organization" as OrgType,
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description:
    "Группа компаний ECO-PRO: ситуационный центр PRO-TEST, ИИ, платформы сбора данных и аналитика для предотвращения потерь. Вся Россия, пилот — 2 недели.",
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
    description: "Основатель и CEO группы компаний ECO-PRO.",
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
