// Проверка перед запуском (стандарт AI-Ready сайта, §11). Запуск: npm run check — сначала собирает сайт, потом проверяет out/.
//  1. В готовом сайте нет TODO и домена-заглушки example.ru.
//  2. geo-check: robots.txt, sitemap, llms.txt, мета-теги, JSON-LD, текст без JS. Балл ≥ 8 и ни одной проблемы P1.
//  3. Объём: каждая страница из sitemap — от 250 слов в <main> (стандарт §2 «Индексация»), кроме исключений THIN_OK.
// Тестовая выкладка: NOINDEX=1 npm run check — закрытость от индексации ожидаема, балл geo-check не оценивается.
// Отчёт geo-check сохраняется в specs/reports/geo-check-<дата>.md — история для клиента.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const MIN_SCORE = 8;
// Тестовая выкладка (NOINDEX=1): сайт закрыт от индексации намеренно — балл geo-check и P1 про noindex и robots не оцениваются.
const STAGING = process.env.NOINDEX === "1";
let failed = false;
const fail = (msg) => { failed = true; console.log(`✗ ${msg}`); };
const ok = (msg) => console.log(`✓ ${msg}`);

if (!fs.existsSync(OUT)) { console.error("Нет out/ — сначала npm run build"); process.exit(1); }

// 1. TODO и заглушки в готовом сайте
const files = (function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? (e.name === "_next" ? [] : walk(p)) : /\.(html|txt|xml)$/.test(e.name) ? [p] : [];
  });
})(OUT);
const todos = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const n = (text.match(/TODO/g) || []).length;
  if (n) todos.push(`${path.relative(OUT, f)} (${n})`);
}
if (todos.length) fail(`TODO в ${todos.length} файлах: ${todos.slice(0, 8).join(", ")}${todos.length > 8 ? " …" : ""}`);
else ok("TODO нет");

const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
const base = (robots.match(/^Host:\s*(\S+)/m) || [])[1] || "";
if (!base || base.includes("example.ru")) fail(`Домен не задан: site.url = ${base || "пусто"}`);
else ok(`Домен: ${base}`);

// 2. geo-check по локальной сборке
const date = new Date().toISOString().slice(0, 10);
const reports = path.join(ROOT, "specs", "reports");
fs.mkdirSync(reports, { recursive: true });
const json = path.join(reports, `.geo-check-${date}.json`);
let md = "";
try {
  md = execFileSync("python3", [path.join(ROOT, "scripts", "geo-check.py"), OUT, "--base", base || "https://example.ru", "--max", "200", "--json", json], { encoding: "utf8" });
} catch (e) {
  fail(`geo-check не запустился: ${e.message.split("\n")[0]} (нужен python3)`);
}
if (md) {
  fs.writeFileSync(path.join(reports, `geo-check-${date}.md`), md);
  const R = JSON.parse(fs.readFileSync(json, "utf8"));
  fs.rmSync(json, { force: true });
  const p1 = R.issues.filter(([s]) => s === "P1").map(([, m]) => m);
  const closed = (m) => /noindex|robots\.txt закрывает/.test(m);
  if (STAGING) ok(`geo-check: балл ${R.tech_score}/10 (тестовая выкладка, NOINDEX=1 — не оценивается)`);
  else if (R.tech_score < MIN_SCORE) fail(`geo-check: балл ${R.tech_score}/10, нужно ≥ ${MIN_SCORE}`);
  else ok(`geo-check: балл ${R.tech_score}/10`);
  const p1real = STAGING ? p1.filter((m) => !closed(m)) : p1;
  if (p1real.length) fail(`geo-check: проблемы P1 — ${p1real.join("; ")}`);
  const other = R.issues.filter(([s]) => s !== "P1");
  if (other.length) console.log(`  ещё ${other.length} замечаний P2/P3 — см. specs/reports/geo-check-${date}.md`);
}

// 3. Объём текста (стандарт AI-Ready, §2 «Индексация»): каждая страница из sitemap — от 250 слов в <main>
const MIN_WORDS = 250;
// Исключения — с причиной. Хабы пока короче минимума: дописать вводные тексты отдельной задачей через spec
// или оставить здесь — вопрос в specs/reports/update-2026-10-21.md.
const THIN_OK = ["/services/", "/industries/", "/blog/"];
const sitemapXml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const thin = [];
for (const [, loc] of sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const p = new URL(loc).pathname;
  const file = path.join(OUT, decodeURI(p), "index.html");
  if (!fs.existsSync(file)) { fail(`В sitemap есть ${loc}, а страницы нет`); continue; }
  const main = (fs.readFileSync(file, "utf8").match(/<main[\s\S]*?<\/main>/) || [""])[0]
    .replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  const words = main.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  if (words < MIN_WORDS && !THIN_OK.includes(p)) thin.push(`${p} (${words})`);
}
if (thin.length) fail(`Страницы короче ${MIN_WORDS} слов в <main>: ${thin.join(", ")}`);
else ok(`Объём: все страницы sitemap от ${MIN_WORDS} слов (исключения: ${THIN_OK.join(", ")})`);
if (!fs.readdirSync(path.join(ROOT, "public")).some((f) => /^[a-f0-9]{32}\.txt$/.test(f))) console.log("  ⚠ Нет ключа IndexNow — npm run indexnow:key");

console.log(failed ? "\nПроверка НЕ пройдена — к запуску рано." : "\nПроверка пройдена. Дальше — ручной чеклист specs/06-launch-checklist.md.");
process.exit(failed ? 1 : 0);
