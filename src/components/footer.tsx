import Link from "next/link";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";

// Общий подвал (итерация v3, 16.11): светло-серый вместо чёрного — «лёгкость и прозрачность» (раздел 4 документа итерации).
// Ширина — по контейнеру страницы (.ds-wrap), как шапка (правки Ника 17.11).
export function Footer() {
  const c = site.contacts;
  const link = "hover:text-[var(--c-brand)]";
  return (
    <footer className="ds border-t border-[var(--c-border)] !bg-[var(--c-layer)] pb-10 pt-16 text-[15px] text-[var(--c-text-2)]">
      {/* 4 колонки без логотипа и подписи; соцсети — в «Контактах» (правки Ника 18.11) */}
      <div className="ds-wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="mb-3 font-medium text-[var(--c-text)]"><Link href="/services/" className={link}>Направления</Link></p>
          <ul className="space-y-2">
            {directions.map((d) => (
              <li key={d.slug}><Link href={`/services/${d.slug}/`} className={link}>{d.code} — {d.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--c-text)]"><Link href="/industries/" className={link}>Отрасли</Link></p>
          <ul className="space-y-2">
            {industries.map((i) => (
              <li key={i.slug}><Link href={`/industries/${i.slug}/`} className={link}>{i.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--c-text)]">Компания</p>
          <ul className="space-y-2">
            {nav.filter((n) => !["/services/", "/industries/"].includes(n.href)).map((n) => (
              <li key={n.href}><Link href={n.href} className={link}>{n.label}</Link></li>
            ))}
            <li><Link href="/glossary/" className={link}>Глоссарий</Link></li>
            <li><Link href="/documents/" className={link}>Лицензии и рекомендации</Link></li>
            <li><Link href="/account/" className={link}>Личный кабинет</Link></li>
          </ul>
        </div>
        <address className="not-italic">
          <p className="mb-3 font-medium text-[var(--c-text)]">Контакты</p>
          <ul className="space-y-2">
            <li><a href={`tel:${c.phone}`} className={`text-[var(--c-text)] ${link}`}>{c.phoneDisplay}</a></li>
            <li><a href={`mailto:${c.email}`} className={`text-[var(--c-text)] ${link}`}>{c.email}</a></li>
            <li>{c.address.city}, {c.address.street}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={c.telegram} target="_blank" rel="noopener" aria-label="Telegram-канал ECO-PRO" className="rounded-full border border-[var(--c-border-strong)] px-4 py-2 text-[var(--c-text)] hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]">Telegram</a>
            <a href={c.max} target="_blank" rel="noopener" aria-label="Канал ECO-PRO в MAX" className="rounded-full border border-[var(--c-border-strong)] px-4 py-2 text-[var(--c-text)] hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]">MAX</a>
          </div>
        </address>
      </div>
      <div className="mt-12 flex flex-col gap-2 ds-wrap border-t border-[var(--c-border)] pt-6 text-[13px] text-[var(--c-text-3)] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <span>©{new Date().getFullYear()} {site.legalName} · ИНН {site.legal.inn} · КПП {site.legal.kpp} · ОГРН {site.legal.ogrn}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy-policy/" className={link}>Политика конфиденциальности</Link>
          <Link href="/consent/" className={link}>Согласие на обработку персональных данных</Link>
          <a href="https://nikalimp.ru/" target="_blank" rel="noopener" className={link}>Разработка сайта</a>
        </span>
      </div>
    </footer>
  );
}
