// Проектные настройки проверок ECO-PRO (переживают обновление scripts/check.mjs из стартера и deploy-kit/shared).
// Хабы короче 250 слов — вводные тексты дописываются отдельной задачей (specs/reports/update-2026-10-21.md).
export const thinOk = ["/services/", "/industries/", "/blog/"];
// Прототипы вариантов дизайна (T52–T56: /suisse/, /2/, /3/) — цвета ещё не вынесены в токены.
export const colorSkip = ["src/app/2/", "src/app/3/", "src/app/suisse/"];
