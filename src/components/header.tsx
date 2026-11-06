import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./ui/button";

const submenus: Record<string, { href: string; label: string; code?: string }[]> = {
  "/services/": directions.map((d) => ({ href: `/services/${d.slug}/`, label: d.title, code: d.code })),
  "/industries/": industries.map((i) => ({ href: `/industries/${i.slug}/`, label: i.title })),
};

// Выпадающее меню на CSS (:hover и :focus-within) — работает без JavaScript
function DesktopItem({ href, label }: { href: string; label: string }) {
  const sub = submenus[href];
  if (!sub) return <Link href={href} className="py-2 hover:text-brand">{label}</Link>;
  return (
    <div className="group relative">
      <Link href={href} className="flex items-center gap-1 py-2 hover:text-brand">
        {label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {/* Код направления — отдельной колонкой, названия в одну строку и по одному краю (правки Сергея 22.10) */}
        <ul className="border bg-background p-2 shadow-lg">
          {sub.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className={s.code ? "grid grid-cols-[6.5rem_auto] items-baseline whitespace-nowrap px-4 py-2.5 hover:bg-card" : "block whitespace-nowrap px-4 py-2.5 hover:bg-card"}>
                {s.code && <span className="text-xs font-medium text-brand">{s.code}</span>}
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <details className="group/m lg:hidden">
      <summary aria-label="Открыть меню" className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-brand [&::-webkit-details-marker]:hidden">
        <Menu className="size-6 group-open/m:hidden" />
        <X className="hidden size-6 group-open/m:block" />
      </summary>
      <div className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b bg-background px-4 pb-6 pt-2 shadow-lg">
        <ul className="divide-y">
          {nav.map((n) => (
            <li key={n.href} className="py-1">
              <a href={n.href} className="block py-2.5 text-base font-medium">{n.label}</a>
              {submenus[n.href] && (
                <ul className="mb-2 ml-3 border-l pl-3">
                  {submenus[n.href].map((s) => (
                    <li key={s.href}><a href={s.href} className="block py-1.5 text-[15px] text-muted-foreground">{s.code ? `${s.code} — ` : ""}{s.label}</a></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-5 w-full"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      {/* Три колонки: логотип слева, меню строго по центру, действия справа */}
      <Container className="grid h-16 grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="shrink-0 justify-self-start"><Logo /></Link>
        <nav aria-label="Основное меню" className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          {nav.map((n) => <DesktopItem key={n.href} {...n} />)}
        </nav>
        <div className="flex items-center justify-self-end gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href={site.cta.href}>{site.cta.label}</a></Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
