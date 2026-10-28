import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { Logo } from "./logo";
import { BtnMod } from "./btn-mod";
import { ThemeToggle } from "./theme-toggle";

const submenus: Record<string, { href: string; label: string; code?: string }[]> = {
  "/services/": directions.map((d) => ({ href: `/services/${d.slug}/`, label: d.title, code: d.code })),
  "/industries/": industries.map((i) => ({ href: `/industries/${i.slug}/`, label: i.title })),
};

const num = (n: number) => `[${String(n + 1).padStart(2, "0")}]`;

// Пункт меню — ячейка с номером [01]; выпадающее меню на CSS (:hover и :focus-within) — работает без JavaScript
function DesktopItem({ href, label, n }: { href: string; label: string; n: number }) {
  const sub = submenus[href];
  const cell = "tech flex h-16 items-center gap-2 border-l px-3 text-[12px] transition-colors hover:bg-card xl:px-4 2xl:px-6";
  if (!sub) return <Link href={href} className={cell}><span className="idx">{num(n)}</span>{label}</Link>;
  return (
    <div className="group relative">
      <Link href={href} className={cell}>
        <span className="idx">{num(n)}</span>{label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 w-max opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {/* Код направления — отдельной колонкой, названия в одну строку (правки Сергея 22.10) */}
        <ul className="border bg-background p-2 shadow-[0_16px_40px_rgb(0_0_0/0.6)]">
          {sub.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className={s.code ? "flex items-baseline gap-5 whitespace-nowrap px-4 py-2.5 hover:bg-card" : "block whitespace-nowrap px-4 py-2.5 hover:bg-card"}>
                {s.code && <span className="tech w-32 shrink-0 text-[11px] text-brand">{s.code}</span>}
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
    <details className="group/m xl:hidden">
      <summary aria-label="Открыть меню" className="inline-flex size-16 cursor-pointer list-none items-center justify-center border-l [&::-webkit-details-marker]:hidden">
        <Menu className="size-6 group-open/m:hidden" />
        <X className="hidden size-6 group-open/m:block" />
      </summary>
      <div className="fixed inset-x-0 top-16 hidden max-h-[calc(100dvh-4rem)] overflow-y-auto group-open/m:block md:max-h-[calc(100dvh-6rem)] border-b bg-background px-4 pb-6 pt-2">
        <ul className="divide-y">
          {nav.map((n, i) => (
            <li key={n.href} className="py-1">
              <a href={n.href} className="display flex items-baseline gap-3 py-3 text-3xl"><span className="label idx">{num(i)}</span>{n.label}</a>
              {submenus[n.href] && (
                <ul className="mb-2 ml-3 border-l pl-3">
                  {submenus[n.href].map((s) => (
                    <li key={s.href}><a href={s.href} className="block py-1.5 text-[15px] text-muted-foreground">{s.code ? `${s.code} — ` : ""}{s.label}</a></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="py-1"><a href="/account/" className="display flex items-baseline gap-3 py-3 text-3xl"><span className="label idx">{num(nav.length)}</span>Кабинет</a></li>
        </ul>
        <BtnMod href={site.cta.href} className="mt-5 w-full justify-between">{site.cta.label}</BtnMod>
      </div>
    </details>
  );
}

export function Header() {
  const c = site.contacts;
  return (
    <header className="sticky top-0 z-40">
      {/* HUD-строка, как в видоискателе камеры */}
      <div className="hidden h-8 items-center justify-between border-b bg-background px-8 text-[11px] md:flex">
        <span className="tech rec">REC · Ситуационный центр 24/7</span>
        <a href={`tel:${c.phone}`} className="tech text-muted-foreground hover:text-foreground">{c.phoneDisplay}</a>
      </div>
      <div className="flex h-16 items-stretch border-b bg-background/90 backdrop-blur">
        <Link href="/" className="flex shrink-0 items-center px-4 sm:px-8"><Logo /></Link>
        <nav aria-label="Основное меню" className="hidden flex-1 items-stretch border-r xl:flex">
          {nav.map((n, i) => <DesktopItem key={n.href} {...n} n={i} />)}
        </nav>
        <div className="ml-auto flex items-stretch">
          <ThemeToggle />
          <Link href="/account/" className="hidden items-center border-l px-4 text-[15px] hover:bg-card 2xl:flex 2xl:px-6">Кабинет</Link>
          <BtnMod href={site.cta.href} className="hidden !h-16 sm:inline-flex">{site.cta.label}</BtnMod>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
