import Link from "next/link";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { Container } from "./container";
import { Logo } from "./logo";

export function Footer() {
  const c = site.contacts;
  return (
    <footer className="bg-ink py-14 text-sm text-white/70">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_0.8fr_1.2fr]">
        <div>
          <Link href="/"><Logo inverse /></Link>
          <p className="mt-4 max-w-xs">{site.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a href={c.telegram} target="_blank" rel="noopener" aria-label="Telegram-канал ECO-PRO" className="rounded-full border border-white/25 px-4 py-2 text-white hover:border-white">Telegram</a>
            <a href={c.max} target="_blank" rel="noopener" aria-label="Канал ECO-PRO в MAX" className="rounded-full border border-white/25 px-4 py-2 text-white hover:border-white">MAX</a>
          </div>
        </div>
        <div>
          <p className="mb-3 font-medium text-white"><Link href="/services/" className="hover:text-brand">Направления</Link></p>
          <ul className="space-y-2">
            {directions.map((d) => (
              <li key={d.slug}><Link href={`/services/${d.slug}/`} className="hover:text-white">{d.code} — {d.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="contents">
          <div>
            <p className="mb-3 font-medium text-white"><Link href="/industries/" className="hover:text-brand">Отрасли</Link></p>
            <ul className="space-y-2">
              {industries.map((i) => (
                <li key={i.slug}><Link href={`/industries/${i.slug}/`} className="hover:text-white">{i.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium text-white">Компания</p>
            <ul className="space-y-2">
              {nav.filter((n) => !["/services/", "/industries/"].includes(n.href)).map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
              <li><Link href="/#faq" className="hover:text-white">Вопросы и ответы</Link></li>
              <li><Link href="/documents/" className="hover:text-white">Лицензии и рекомендации</Link></li>
              <li><Link href="/account/" className="hover:text-white">Личный кабинет</Link></li>
            </ul>
          </div>
        </div>
        <address className="not-italic">
          <p className="mb-3 font-medium text-white">Контакты</p>
          <ul className="space-y-2">
            <li><a href={`tel:${c.phone}`} className="text-white hover:text-brand">{c.phoneDisplay}</a></li>
            <li><a href={`mailto:${c.email}`} className="text-white hover:text-brand">{c.email}</a></li>
            <li>{c.address.city}, {c.address.street}</li>
          </ul>
        </address>
      </Container>
      <Container className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/55 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <span>©{new Date().getFullYear()} {site.legalName} · ИНН {site.legal.inn} · КПП {site.legal.kpp} · ОГРН {site.legal.ogrn}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy-policy/" className="hover:text-white">Политика конфиденциальности</Link>
          <Link href="/consent/" className="hover:text-white">Согласие на обработку персональных данных</Link>
          <a href="https://nikalimp.ru/" target="_blank" rel="noopener" className="hover:text-white">Разработка сайта</a>
        </span>
      </Container>
    </footer>
  );
}
