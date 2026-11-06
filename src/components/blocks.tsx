import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import type { Case } from "@/content/cases";
import type { Direction } from "@/content/directions";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Section } from "./container";
import { Button } from "./ui/button";

// Карточки — раздельные, без скруглений (правки 14.10). .spot — подсветка за курсором (скрипт в layout).
// Появление при прокрутке задаётся на сетке целиком (data-reveal у родителя), а не у каждой карточки.

export function CaseCard({ c }: { c: Case }) {
  return (
    <Link href={`/cases/${c.id}/`} className="spot group relative flex flex-col overflow-hidden border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
      <span className="card-sweep" aria-hidden="true" />
      <p className="text-xs font-light uppercase tracking-[0.12em] text-muted-foreground">{c.tag}</p>
      <h3 className="mt-3 text-lg font-bold group-hover:text-brand">{c.title}</h3>
      <p className="mt-6 whitespace-nowrap text-4xl font-black tracking-tight"><span className="font-light text-brand">[</span>{c.value}<span className="font-light text-brand">]</span></p>
      <p className="mt-2 text-sm text-muted-foreground">{c.valueLabel}</p>
      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
      <p className="mt-6 flex items-center gap-1.5 text-sm font-medium">Читать кейс <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></p>
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
    <Link href={`/services/${d.slug}/`} className="spot group relative flex flex-col overflow-hidden border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
      <span className="card-sweep" aria-hidden="true" />
      <p className="text-sm font-medium text-brand">{d.code}</p>
      <h3 className="mt-2 text-xl font-bold">{d.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{d.short}</p>
      <p className="mt-6 flex items-center gap-1.5 text-sm font-medium">Узнать подробнее <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></p>
    </Link>
  );
}

export function IndustryCard({ i }: { i: Industry }) {
  // Без иллюстраций в обложках (правки Ника 22.10)
  return (
    <Link href={`/industries/${i.slug}/`} className="spot group relative flex flex-col overflow-hidden border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
      <span className="card-sweep" aria-hidden="true" />
      <span className="relative text-sm font-medium text-brand">{i.label}</span>
      <h3 className="relative mt-2 text-xl font-bold">{i.title}</h3>
      <span className="relative mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{i.short}</span>
      <span className="relative mt-6 flex items-center gap-1.5 text-sm font-medium">Смотреть обзор <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

export function CtaBlock({ eyebrow = home.cta.eyebrow, title = home.cta.title, text = home.cta.text }: { eyebrow?: string; title?: string; text?: string }) {
  return (
    // Единственный крупный красный акцент на странице (правки Сергея 30.10: «Первый шаг — это встреча» на красном — «нравится»)
    <Section className="relative overflow-hidden bg-brand-solid text-white">
      <Container className="relative text-center" data-reveal>
        <Eyebrow className="text-white/80">{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{text}</p>
        <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-white/90"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </Container>
    </Section>
  );
}

// Нумерованные карточки «что делаем» для страниц направлений
export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div data-reveal className="grid gap-4 sm:grid-cols-2">
      {items.map((f, n) => (
        <div key={f.title} className="spot border bg-background p-6 sm:p-8">
          <p className="text-sm font-medium text-brand">{String(n + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
