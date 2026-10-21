import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X as Cross } from "lucide-react";
import { caseById, caseGroups, cases } from "@/content/cases";
import { directionBySlug } from "@/content/directions";
import { industryBySlug } from "@/content/industries";
import { site } from "@/content/site";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock } from "@/components/blocks";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, caseSchema, graph } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseById((await params).slug);
  if (!c) return {};
  const title = `${c.title} — кейс ECO-PRO`;
  return {
    title: { absolute: title.length > 65 ? `${c.title} — кейс` : title },
    description: c.text,
    alternates: { canonical: `/keisy/${c.id}/` },
    openGraph: { type: "article", title, description: c.text, url: `${site.url}/keisy/${c.id}/`, images: ["/og.png"] },
  };
}

function Criteria({ title, items }: { title: string; items: { k: string; v: string }[] }) {
  return (
    <div className="border bg-background p-6 sm:p-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <dl className="mt-5 divide-y">
        {items.map((it) => (
          <div key={it.k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="text-sm text-muted-foreground">{it.k}</dt>
            <dd className="font-medium">{it.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseById((await params).slug);
  if (!c) notFound();
  const path = `/keisy/${c.id}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/keisy/" }, { name: c.title, path }];
  const ind = c.industry ? industryBySlug(c.industry) : undefined;
  const dirs = c.directions.map(directionBySlug).filter((x) => x !== undefined);
  const more = cases.filter((x) => x.id !== c.id && (x.industry === c.industry || x.group === c.group)).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(caseSchema(c), breadcrumbs(crumbs))} />

      {/* Шапка кейса */}
      <Section className="pt-10">
        <Container className="page-intro text-center">
          <Crumbs items={[crumbs[0], crumbs[1], { name: c.title }]} />
          <p className="mt-8 text-xs font-light uppercase tracking-[0.16em] text-muted-foreground">{c.tag}</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl">{c.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{c.scale}</p>
          <dl className={`mx-auto mt-10 grid max-w-5xl gap-4 ${c.metrics.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
            {c.metrics.map((m) => (
              <div key={m.label} className="border bg-background p-5">
                <dd className="text-2xl font-black tracking-tight sm:text-3xl">{m.value}</dd>
                <dt className="mt-1 text-sm text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Ситуация */}
      <Section className="bg-card">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="ситуация" title="Что происходило" />
          <div data-reveal className="space-y-4 text-lg leading-relaxed">
            {c.situation.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}
          </div>
        </Container>
      </Section>

      {/* Ошибки → изменения */}
      <Section>
        <Container>
          <SectionHead eyebrow="разбор" title="Что было не так и что изменили" />
          <div data-reveal className="grid gap-4 lg:grid-cols-2">
            <div className="border border-brand/25 bg-bad p-6 sm:p-8">
              <h3 className="text-xl font-bold">Какие ошибки выявили</h3>
              <ul className="mt-5 space-y-3">
                {c.errors.map((t) => <li key={t} className="flex gap-3"><Cross className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
            <div className="border border-positive/30 bg-good p-6 sm:p-8">
              <h3 className="text-xl font-bold">Что изменили</h3>
              <ul className="mt-5 space-y-3">
                {c.changes.map((t) => <li key={t} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-positive" aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Результат и экономика */}
      <Section className="bg-ink text-white">
        <Container className="max-w-4xl">
          <p className="mb-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white/60">результат</p>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Что получил бизнес</h2>
          <ul data-reveal className="mx-auto mt-10 max-w-3xl space-y-4">
            {c.results.map((t) => <li key={t} className="flex gap-3 text-lg"><Check className="mt-1.5 size-5 shrink-0 text-brand" aria-hidden="true" />{t}</li>)}
          </ul>
          {c.economics && (
            <div data-reveal className="mx-auto mt-10 max-w-3xl border border-white/15 p-6 sm:p-8">
              <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white/60">Экономика</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/85">{c.economics}</p>
            </div>
          )}
          {c.comment && <blockquote data-reveal className="mx-auto mt-10 max-w-3xl border-l-2 border-brand pl-5 text-xl font-medium leading-relaxed">{c.comment}</blockquote>}
        </Container>
      </Section>

      {/* Критерии для CEO и СБ */}
      {(c.ceo || c.sb) && (
        <Section className="bg-card">
          <Container>
            <SectionHead eyebrow="критерии оценки" title="Что важно CEO и службе безопасности" />
            <div data-reveal className="grid gap-4 lg:grid-cols-2">
              {c.ceo && <Criteria title="Для CEO" items={c.ceo} />}
              {c.sb && <Criteria title="Для службы безопасности" items={c.sb} />}
            </div>
          </Container>
        </Section>
      )}

      {/* Что использовали — ссылки на отрасль и направления (списком, без смешивания карточек) */}
      <Section>
        <Container className="text-center">
          <SectionHead eyebrow="решение" title="Какие направления работали" />
          <div className="flex flex-wrap justify-center gap-2">
            {dirs.map((d) => (
              <Link key={d.slug} href={`/napravleniya/${d.slug}/`} className="rounded-full border px-4 py-2 text-sm font-medium hover:border-foreground">
                <span className="text-brand">{d.code}</span> · {d.title}
              </Link>
            ))}
          </div>
          {ind && (
            <p className="mt-6 text-muted-foreground">Отрасль: <Link href={`/otrasli/${ind.slug}/`} className="font-medium text-foreground underline underline-offset-4 hover:text-brand">{ind.title}</Link></p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">Группа: {caseGroups[c.group].title}</p>
          <Button asChild size="lg" className="btn-shine mt-10"><a href="/#pilot">Запустить такой пилот за 2 недели</a></Button>
        </Container>
      </Section>

      {more.length > 0 && (
        <Section className="bg-card">
          <Container>
            <SectionHead eyebrow="ещё кейсы" title="Похожие проекты" />
            <CaseGrid items={more} />
            <div className="mt-8 text-center"><Button asChild variant="outline"><Link href="/keisy/">Все кейсы</Link></Button></div>
          </Container>
        </Section>
      )}

      <CtaBlock />
    </>
  );
}
