// llms.txt и llms-full.txt (https://llmstxt.org) — генерируются из того же контента, что и страницы.
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { cases } from "@/content/cases";
import { docsCompany, letters, licenses } from "@/content/documents";
import { home, homeFaq } from "@/content/home";
import { getPosts } from "./posts";

// Простой текст для нейросетей: неразрывные пробелы типографа заменяем обычными
const plain = (s: string) => s.replace(/ /g, " ").replace(/⁠/g, "");
const c = site.contacts;

function contacts() {
  return [
    `- Телефон: ${c.phoneDisplay}`,
    `- Почта: ${c.email}`,
    `- Telegram: ${c.telegram}`,
    `- Адрес: ${c.address.city}, ${c.address.street}`,
    `- Юрлицо: ${site.legalName}, ИНН ${site.legal.inn}, ОГРН ${site.legal.ogrn}`,
    `- Сайт: ${site.url}`,
  ].join("\n");
}

export function llmsTxt() {
  const posts = getPosts();
  return plain(`# ${site.name}

> ${home.answer}

Другие названия: ${site.alternateName.join(", ")}. Основана в ${site.foundingYear} году. 1000+ реализованных проектов, 25+ лет в отрасли. Работаем по всей России, удалённое подключение к объектам. Главное действие — встреча: ${site.url}/#vstrecha

## Направления
${directions.map((d) => `- [${d.code} — ${d.title}](${site.url}/napravleniya/${d.slug}/): ${d.short}`).join("\n")}

## Отрасли
${industries.map((i) => `- [${i.title}](${site.url}/otrasli/${i.slug}/): ${i.short}`).join("\n")}

## Кейсы
- [Все кейсы внедрения](${site.url}/keisy/)
${cases.map((k) => `- [${k.tag}: ${k.title}](${site.url}/keisy/${k.id}/): ${k.value} — ${k.valueLabel}`).join("\n")}
${posts.length ? `\n## Статьи\n${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}/): ${p.description}`).join("\n")}\n` : ""}
## Лицензии и рекомендации
- [Лицензии, допуски СРО и рекомендательные письма](${site.url}/dokumenty/): ${docsCompany.name} (${docsCompany.role}) — ${licenses.map((d) => `${d.title}${d.meta ? ` ${d.meta}` : ""}`).join("; ")}. Рекомендации: ${letters.map((d) => d.issuer).join("; ")}.

## О компании
- [Главная: экосистема, география, команда, путь к результату, FAQ](${site.url}/)
- Подробная версия для LLM: ${site.url}/llms-full.txt

## Контакты
${contacts()}
`);
}

export function llmsFullTxt() {
  const dirBlocks = directions.map(
    (d) =>
      `## ${d.h1}\nURL: ${site.url}/napravleniya/${d.slug}/\n\n${d.answer}\n\nЧто входит:\n${d.features.map((f) => `- ${f.title}: ${f.text}`).join("\n")}\n\nМесто в контуре PRO-TEST: ${d.roleInContour}\n${d.note ? `\n${d.note}\n` : ""}\nВопросы:\n${d.faq.map((f) => `- ${f.q} ${f.a}`).join("\n")}`,
  );
  const indBlocks = industries.map(
    (i) => `## ${i.h1}\nURL: ${site.url}/otrasli/${i.slug}/\n\n${i.answer}\n\nЗадачи:\n${i.tasks.map((t) => `- ${t}`).join("\n")}\n\nВопросы:\n${i.faq.map((f) => `- ${f.q} ${f.a}`).join("\n")}`,
  );
  const caseBlock = cases.map((k) => `## ${k.tag}: ${k.title}\nURL: ${site.url}/keisy/${k.id}/\nМасштаб: ${k.scale}\n\n${k.situation.join(" ")}\n\nРезультат: ${k.results.join("; ")}.${k.economics ? `\n\nЭкономика: ${k.economics}` : ""}`).join("\n\n");
  const steps = home.path.steps.map((s, n) => `${n + 1}. ${s.title}: ${s.text}`).join("\n");
  const team = home.team.people.map((p) => `- ${p.name} — ${p.role}`).join("\n");
  const posts = getPosts().map((p) => `## ${p.title}\nURL: ${site.url}/blog/${p.slug}/\nДата: ${p.updated ?? p.date}\n\n${p.body}`);
  return plain(
    `${llmsTxt()}\n---\n\n# Частые вопросы\n\n${homeFaq.map((f) => `- ${f.q} ${f.a}`).join("\n")}\n\n---\n\n# Направления\n\n${dirBlocks.join("\n\n")}\n\n---\n\n# Отрасли\n\n${indBlocks.join("\n\n")}\n\n---\n\n# Кейсы внедрения\n\n${caseBlock}\n\n---\n\n# Как начинается работа\n\n${steps}\n\n---\n\n# Команда\n\n${team}\n${posts.length ? `\n---\n\n# Статьи\n\n${posts.join("\n\n")}\n` : ""}`,
  );
}
