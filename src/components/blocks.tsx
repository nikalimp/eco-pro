import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import type { Case } from "@/content/cases";
import type { Direction } from "@/content/directions";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/utils";
import { Button } from "./ds";
import { CornerArrow } from "./corner-arrow";

// Карточки внутренних страниц на дизайн-системе v3 (итерация 16.11): белая плитка, тонкая рамка, без скруглений (правки 14.10),
// при наведении — красная рамка и лёгкая тень. Появление при прокрутке задаётся на сетке целиком (data-reveal у родителя).
const card = "ds-tile ds-tile-click group relative flex flex-col p-6 sm:p-8";
const more = "mt-6 flex items-center gap-1.5 text-[15px] font-medium group-hover:text-[var(--c-brand)]";

export function CaseCard({ c }: { c: Case }) {
  return (
    // Без надзаголовка и кнопки снизу: стрелка ↗ у заголовка, красная обводка (правки Ника 18.11)
    <Link href={`/cases/${c.id}/`} className={cn(card, "!border-[var(--c-brand)]")}>
      <span className="flex items-start justify-between gap-4">
        <h3 className="ds-h4 group-hover:text-[var(--c-brand)]">{c.title}</h3>
        <CornerArrow className="mt-0.5" />
      </span>
      <p className="mt-6 whitespace-nowrap text-4xl font-normal tracking-tight"><span className="text-[var(--c-brand)]">[</span>{c.value}<span className="text-[var(--c-brand)]">]</span></p>
      <p className="ds-small mt-2">{c.valueLabel}</p>
      <p className="ds-small mt-5 flex-1">{c.text}</p>
    </Link>
  );
}

export function CaseGrid({ items }: { items: Case[] }) {
  return (
    <div data-reveal className={cn("grid gap-4", items.length > 1 && "md:grid-cols-2", items.length > 2 && "lg:grid-cols-3")}>
      {items.map((c) => <CaseCard key={c.id} c={c} />)}
    </div>
  );
}

export function DirectionCard({ d }: { d: Direction }) {
  return (
    <Link href={`/services/${d.slug}/`} className={card}>
      <span className="ds-tag w-fit bg-[var(--c-brand)] text-white">{d.code}</span>
      <h3 className="ds-h4 mt-4">{d.title}</h3>
      <p className="ds-small mt-3 flex-1">{d.short}</p>
      <p className={more}>Узнать подробнее <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></p>
    </Link>
  );
}

export function IndustryCard({ i }: { i: Industry }) {
  return (
    <Link href={`/industries/${i.slug}/`} className={card}>
      <span className="ds-label">{i.label}</span>
      <h3 className="ds-h4 mt-2">{i.title}</h3>
      <span className="ds-small mt-3 flex-1">{i.short}</span>
      <span className={more}>Смотреть обзор <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}

export function CtaBlock({ eyebrow = home.cta.eyebrow, title = home.cta.title, text = home.cta.text }: { eyebrow?: string; title?: string; text?: string }) {
  return (
    // Единственный крупный красный акцент на странице (правки Сергея 30.10: «Первый шаг — это встреча» на красном — «нравится»)
    <section className="ds-theme-red py-16 sm:py-24">
      {/* По центру, как на главной (правки Ника 18.11) */}
      <div data-reveal className="ds-wrap flex flex-col items-center text-center">
        <p className="ds-eyebrow">{eyebrow}</p>
        <h2 className="ds-h2 mt-5">{title}</h2>
        <p className="ds-body mx-auto mt-5 max-w-2xl">{text}</p>
        <Button asChild variant="inverse" size="lg" className="mt-9"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </div>
    </section>
  );
}

// Нумерованные карточки «что делаем» для страниц направлений
export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div data-reveal className="grid gap-4 sm:grid-cols-2">
      {items.map((f, n) => (
        <div key={f.title} className="ds-tile p-6 sm:p-8">
          <p className="ds-index">{String(n + 1).padStart(2, "0")}</p>
          <h3 className="ds-h4 mt-4">{f.title}</h3>
          <p className="ds-small mt-2">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
