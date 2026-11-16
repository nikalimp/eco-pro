import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { Button } from "./ds";
import { Logo } from "./logo";

// Общая шапка всех страниц (итерация v3, 16.11): основа — шапка /3/, облегчённая по разделу 4 документа итерации.
// Полупрозрачная с размытием фона, обычный шрифт вместо моно-капса, без номеров [01], кнопка-«таблетка».
// Выпадающие списки — на CSS (:hover и :focus-within), работают без JavaScript.
const submenus: Record<string, { href: string; label: string; code?: string }[]> = {
  "/services/": directions.map((d) => ({ href: `/services/${d.slug}/`, label: d.title, code: d.code })),
  "/industries/": industries.map((i) => ({ href: `/industries/${i.slug}/`, label: i.title })),
};

function NavItem({ href, label }: { href: string; label: string }) {
  const sub = submenus[href];
  const cell = "site-nav-link flex h-16 items-center gap-1.5 px-3 2xl:px-4";
  if (!sub) return <Link href={href} className={cell}>{label}</Link>;
  return (
    <div className="group relative">
      <Link href={href} className={cell}>{label}<ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" /></Link>
      <div className="invisible absolute left-0 top-full z-50 w-max pt-1 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="border border-[var(--c-border)] bg-white p-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/.25)]">
          {sub.map((x) => (
            <li key={x.href}>
              <Link href={x.href} className="flex items-baseline gap-5 whitespace-nowrap px-4 py-2.5 text-[15px] hover:bg-[var(--c-layer)] hover:text-[var(--c-brand)]">
                {x.code && <span className="w-28 shrink-0 text-[13px] font-medium text-[var(--c-brand)]">{x.code}</span>}{x.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const c = site.contacts;
  return (
    <>
      {/* Верхняя строка прокручивается вместе со страницей, закреплён только второй ряд (решение Ника 11.11) */}
      <div className="ds hidden h-9 items-center justify-between border-b border-[var(--c-border)] px-[var(--sp-gutter)] md:flex">
        <span className="site-live text-[13px] text-[var(--c-text-2)]">Ситуационный центр работает 24/7</span>
        <span className="flex gap-6 text-[13px]">
          <a href={`tel:${c.phone}`} className="text-[var(--c-text-2)] hover:text-[var(--c-brand)]">{c.phoneDisplay}</a>
          <a href={`mailto:${c.email}`} className="text-[var(--c-text-2)] hover:text-[var(--c-brand)]">{c.email}</a>
        </span>
      </div>
      <header className="ds site-head">
        <div className="flex h-16 items-center gap-4 px-[var(--sp-gutter)]">
          <Link href="/" className="flex shrink-0 items-center pr-4"><Logo /></Link>
          <nav aria-label="Основное меню" className="hidden flex-1 items-center justify-center lg:flex">
            {nav.map((n) => <NavItem key={n.href} {...n} />)}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Link href="/account/" className="site-nav-link hidden h-16 items-center px-3 xl:flex">Кабинет</Link>
            <Button asChild size="sm" icon="→" className="hidden sm:inline-flex"><a href={site.cta.href}>{site.cta.label}</a></Button>
            <details className="group/m lg:hidden">
              <summary aria-label="Открыть меню" className="grid size-11 cursor-pointer list-none place-items-center rounded-full [&::-webkit-details-marker]:hidden">
                <Menu className="size-6 group-open/m:hidden" /><X className="hidden size-6 group-open/m:block" />
              </summary>
              <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--c-border)] bg-white px-4 pb-6 pt-2">
                <ul className="divide-y divide-[var(--c-border)]">
                  {nav.map((n) => (
                    <li key={n.href} className="py-1">
                      <a href={n.href} className="ds-h4 block py-3">{n.label}</a>
                      {submenus[n.href] && (
                        <ul className="mb-2 ml-3 border-l border-[var(--c-border)] pl-3">
                          {submenus[n.href].map((x) => <li key={x.href}><a href={x.href} className="ds-small block py-1.5">{x.code ? `${x.code} — ` : ""}{x.label}</a></li>)}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li className="py-1"><a href="/account/" className="ds-h4 block py-3">Кабинет</a></li>
                </ul>
                <Button asChild className="mt-5 w-full"><a href={site.cta.href}>{site.cta.label}</a></Button>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
