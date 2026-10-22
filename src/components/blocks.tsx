import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import type { Case } from "@/content/cases";
import type { Direction } from "@/content/directions";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Section } from "./container";
import { BtnMod } from "./btn-mod";

// Карточки — раздельные, прямые углы. .spot — рамка фокуса видоискателя при наведении (globals.css).
// Появление при прокрутке задаётся на сетке целиком (data-reveal у родителя), а не у каждой карточки.

export function CaseCard({ c }: { c: Case }) {
  return (
    <Link href={`/cases/${c.id}/`} className="spot group relative flex flex-col overflow-hidden border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
      <span className="card-sweep" aria-hidden="true" />
      <p className="label text-muted-foreground">{c.tag}</p>
      <h3 className="mt-3 text-lg font-bold group-hover:text-brand">{c.title}</h3>
      <p className="display mt-6 text-4xl leading-[0.95] tabular-nums sm:text-5xl"><span className="font-normal text-brand">[</span>{c.value}<span className="font-normal text-brand">]</span></p>
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
      <p className="tech text-[12px] text-brand">{d.code}</p>
      <h3 className="mt-2 text-xl font-bold">{d.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{d.short}</p>
      <p className="mt-6 flex items-center gap-1.5 text-sm font-medium">Узнать подробнее <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></p>
    </Link>
  );
}

export function IndustryCard({ i }: { i: Industry }) {
  return (
    <Link href={`/industries/${i.slug}/`} className="spot group relative flex flex-col overflow-hidden border bg-card text-white">
      <span className="flex flex-1 flex-col p-6 sm:p-8">
        <span className="tech relative text-[12px] text-brand">{i.label}</span>
        <h3 className="relative mt-2 text-xl font-bold">{i.title}</h3>
        <span className="relative mt-3 flex-1 text-[15px] leading-relaxed text-white/70">{i.short}</span>
        <span className="relative mt-6 flex items-center gap-1.5 text-sm font-medium">Смотреть обзор <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
      </span>
    </Link>
  );
}

export function CtaBlock({ eyebrow = home.cta.eyebrow, title = home.cta.title, text = home.cta.text }: { eyebrow?: string; title?: string; text?: string }) {
  return (
    <Section className="red relative overflow-hidden">
      <Container className="relative grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
        <div className="lg:col-span-8">
          <Eyebrow className="text-white">{eyebrow}</Eyebrow>
          <h2 className="display text-5xl leading-[0.92] text-balance sm:text-7xl lg:text-8xl">{title}</h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-xl text-lg text-white">{text}</p>
          <BtnMod href={site.cta.href} className="mt-8">{site.cta.label}</BtnMod>
        </div>
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
          <p className="label text-brand">[{String(n + 1).padStart(2, "0")}]</p>
          <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
