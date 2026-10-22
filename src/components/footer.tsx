import Link from "next/link";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { Container } from "./container";
import { Logo } from "./logo";
import { BtnMod } from "./btn-mod";

// Подвал (дизайн-система: Footer): линейка, колонки с номерами [01], реквизиты и огромный логотип-водяной знак
export function Footer() {
  const c = site.contacts;
  const head = "label mb-4 text-muted-foreground";
  return (
    <footer className="overflow-hidden border-t-2 border-foreground pt-14 text-sm text-muted-foreground">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/"><Logo /></Link>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">{site.tagline}</p>
          <BtnMod href={site.cta.href} size="sm" className="mt-6">{site.cta.label}</BtnMod>
        </div>
        <div className="lg:col-span-3">
          <p className={head}><span className="idx">[01]</span> <Link href="/services/" className="hover:text-foreground">Направления</Link></p>
          <ul className="space-y-2">
            {directions.map((d) => (
              <li key={d.slug}><Link href={`/services/${d.slug}/`} className="hover:text-foreground"><span className="tech text-[11px] text-foreground">{d.code}</span> — {d.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className={head}><span className="idx">[02]</span> <Link href="/industries/" className="hover:text-foreground">Отрасли</Link></p>
          <ul className="space-y-2">
            {industries.map((i) => (
              <li key={i.slug}><Link href={`/industries/${i.slug}/`} className="hover:text-foreground">{i.title}</Link></li>
            ))}
          </ul>
          <p className={`${head} mt-8`}><span className="idx">[03]</span> Компания</p>
          <ul className="space-y-2">
            {nav.filter((n) => !["/services/", "/industries/"].includes(n.href)).map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-foreground">{n.label}</Link></li>
            ))}
            <li><Link href="/#faq" className="hover:text-foreground">Вопросы и ответы</Link></li>
            <li><Link href="/documents/" className="hover:text-foreground">Лицензии и рекомендации</Link></li>
            <li><Link href="/account/" className="hover:text-foreground">Личный кабинет</Link></li>
          </ul>
        </div>
        <address className="not-italic lg:col-span-3">
          <p className={head}><span className="idx">[04]</span> Контакты</p>
          <ul className="space-y-2">
            <li><a href={`tel:${c.phone}`} className="text-lg text-foreground tabular-nums hover:text-brand">{c.phoneDisplay}</a></li>
            <li><a href={`mailto:${c.email}`} className="text-foreground hover:text-brand">{c.email}</a></li>
            <li>{c.address.city}, {c.address.street}</li>
          </ul>
          <div className="mt-5 flex">
            <a href={c.telegram} target="_blank" rel="noopener" aria-label="Telegram-канал ECO-PRO" className="tech border border-input px-4 py-3 text-[11px] text-foreground hover:bg-foreground hover:text-background">Telegram</a>
            <a href={c.max} target="_blank" rel="noopener" aria-label="Канал ECO-PRO в MAX" className="tech -ml-px border border-input px-4 py-3 text-[11px] text-foreground hover:bg-foreground hover:text-background">MAX</a>
          </div>
        </address>
      </Container>
      <Container className="mt-12 flex flex-col gap-2 border-t pt-6 text-xs lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <span className="label normal-case tracking-normal">©{new Date().getFullYear()} {site.legalName} · ИНН {site.legal.inn} · КПП {site.legal.kpp} · ОГРН {site.legal.ogrn}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy-policy/" className="hover:text-foreground">Политика конфиденциальности</Link>
          <Link href="/consent/" className="hover:text-foreground">Согласие на обработку персональных данных</Link>
          <a href="https://nikalimp.ru/" target="_blank" rel="noopener" className="hover:text-foreground">Разработка сайта</a>
        </span>
      </Container>
      <p className="display -mb-[0.16em] mt-8 select-none whitespace-nowrap px-2 text-center text-[20vw] leading-[0.8] text-secondary" aria-hidden="true">
        <span className="text-brand-solid">[</span>ECO-PRO<span className="text-brand-solid">]</span>
      </p>
    </footer>
  );
}
