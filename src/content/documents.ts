// Лицензии, допуски, сертификаты и рекомендации. Все документы выданы ООО «Император Техно» —
// юрлицу направления PRO-TECHNO (ИНН 7841066130, ОГРН 1177847324643). Источник: материалы клиента от 17.10.2026
// (materials/documents/). Факты — только из текста документов; сроки действия указываем как в документе.

export const docsCompany = {
  name: "ООО «Император Техно»",
  role: "компания экосистемы, направление PRO-TECHNO",
  inn: "7841066130",
  ogrn: "1177847324643",
};

export type Doc = {
  id: string;
  kind: "license" | "sro" | "membership" | "letter" | "partner";
  title: string; // коротко
  issuer: string;
  text: string; // что подтверждает — своими словами по тексту документа
  meta?: string; // номер и дата
  image: string; // /images/dokumenty/<id>.webp, превью — <id>-sm.webp
};

const img = (id: string) => `/images/dokumenty/${id}.webp`;

export const licenses: Doc[] = [
  {
    id: "licenziya-mchs",
    kind: "license",
    title: "Лицензия МЧС России",
    issuer: "МЧС России",
    meta: "№ 78-Б/02067 от 20.12.2017",
    text: "Монтаж, техническое обслуживание и ремонт средств обеспечения пожарной безопасности зданий и сооружений: пожарная и охранно-пожарная сигнализация, пожаротушение, дымоудаление, системы оповещения и управления эвакуацией.",
    image: img("licenziya-mchs"),
  },
  {
    id: "sro-stroitelstvo",
    kind: "sro",
    title: "Членство в СРО строителей",
    issuer: "Ассоциация СРО «МОСК» (СРО-С-180-20012010), реестр НОСТРОЙ",
    meta: "Рег. № 3510, с 04.02.2026",
    text: "Право выполнять строительство, реконструкцию и капитальный ремонт объектов капитального строительства. Уровень ответственности — до 90 млн ₽, ответственность застрахована.",
    image: img("sro-stroitelstvo"),
  },
  {
    id: "sro-proektirovanie",
    kind: "sro",
    title: "Членство в СРО проектировщиков",
    issuer: "Ассоциация СРО «Межрегионпроект» (СРО-П-161-09092010), реестр НОПРИЗ",
    meta: "Рег. № П-161-00784, с 20.08.2019",
    text: "Право готовить проектную документацию для объектов капитального строительства.",
    image: img("sro-proektirovanie"),
  },
  {
    id: "fb-safety-association",
    kind: "membership",
    title: "Член Международной ассоциации пищевой безопасности",
    issuer: "International F&B Safety Association",
    meta: "Рег. № 284 от 11.09.2026",
    text: "Официальное членство в Международной ассоциации пищевой безопасности — для проектов в HoReCa и на пищевых производствах.",
    image: img("fb-safety-association"),
  },
];

export const letters: Doc[] = [
  {
    id: "pismo-magnit",
    kind: "letter",
    title: "Магнит",
    issuer: "АО «Тандер», торговая сеть «Магнит»",
    text: "Благодарность за высокий профессионализм, качество работ и оборудования при ремонте систем дистанционного контроля в магазинах сети «Магнит».",
    image: img("pismo-magnit"),
  },
  {
    id: "pismo-stockmann",
    kind: "letter",
    title: "Stockmann",
    issuer: "АО «СТОКМАНН», служба безопасности",
    text: "Монтаж систем безопасности, текущее техническое обслуживание и ремонт оборудования на объектах компании. Работы выполнены качественно и в срок, компания рекомендована как надёжный партнёр.",
    image: img("pismo-stockmann"),
  },
  {
    id: "pismo-domovoy",
    kind: "letter",
    title: "«Домовой» и «Старт»",
    issuer: "АО «УК «СТАРТ», сети гипермаркетов «СТАРТ» и «Домовой»",
    meta: "13.02.2024",
    text: "Монтаж и пусконаладка слаботочных систем — видеонаблюдение, охранная сигнализация, контроль доступа, контроль кассовых операций — в магазинах в разных регионах России.",
    image: img("pismo-domovoy"),
  },
  {
    id: "pismo-coca-cola-hbc",
    kind: "letter",
    title: "Coca-Cola HBC",
    issuer: "ООО «Кока-Кола ЭйчБиСи Евразия»",
    text: "Победа в тендере на техническое обслуживание, ремонт и модернизацию комплексной системы безопасности филиала в Санкт-Петербурге.",
    image: img("pismo-coca-cola-hbc"),
  },
  {
    id: "pismo-green",
    kind: "letter",
    title: "Green",
    issuer: "ООО «Оптимальный», торговая сеть «Грин»",
    meta: "23.12.2020",
    text: "Монтаж периметральной охранной сигнализации и видеонаблюдения в Санкт-Петербурге в полном соответствии с договором. Рекомендация как надёжного партнёра по слаботочным системам любой сложности.",
    image: img("pismo-green"),
  },
  {
    id: "gramota-acis",
    kind: "letter",
    title: "Грамота ACIS",
    issuer: "ООО «Ацис Технология» (сеть АЗС Shell)",
    text: "«Лучший риск-ориентированный L3-подрядчик» — за ответственный подход к HSSE и активное предотвращение потенциальных опасностей.",
    image: img("gramota-acis"),
  },
];

export const partners: Doc[] = [
  { id: "sert-dssl-platinum", kind: "partner", title: "DSSL — Platinum-партнёр", issuer: "DSSL", text: "Статус официального партнёра производителя систем видеонаблюдения TRASSIR.", image: img("sert-dssl-platinum") },
  { id: "sert-trassir", kind: "partner", title: "TRASSIR — партнёр", issuer: "ООО «ДССЛ-Нева»", meta: "от 11.11.2022", text: "Право на поставку и установку оборудования TRASSIR с гарантией и сервисом производителя.", image: img("sert-trassir") },
  { id: "sert-trassir-obuchenie", kind: "partner", title: "TRASSIR — обучение", issuer: "Центр обучения TRASSIR", text: "Сотрудники сдали сертификационный экзамен по основной программе обучения видеонаблюдению TRASSIR.", image: img("sert-trassir-obuchenie") },
  { id: "sert-parsec", kind: "partner", title: "Parsec — установщик СКУД", issuer: "Parsec", meta: "№ СИ-330 от 07.12.2022", text: "Сертифицированный установщик СКУД ParsecNET: монтаж, пусконаладка и обслуживание.", image: img("sert-parsec") },
  { id: "sert-smartec", kind: "partner", title: "Smartec — дилер", issuer: "ООО «АРМО-Системы»", text: "Авторизованный партнёр-дилер оборудования Smartec.", image: img("sert-smartec") },
  { id: "sert-itk", kind: "partner", title: "ITK — ИТ-партнёр", issuer: "IEK GROUP", meta: "от 28.09.2022", text: "Официальный ИТ-партнёр по продукции торговой марки ITK в России и странах СНГ.", image: img("sert-itk") },
  { id: "sert-luis", kind: "partner", title: "LTV и LPA — партнёр", issuer: "ООО «ЛУИС+»", text: "Одобренный контрагент с правом продавать оборудование брендов LTV и LPA с гарантией завода-изготовителя.", image: img("sert-luis") },
];

export const allDocs = [...licenses, ...letters, ...partners];
