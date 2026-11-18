import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X as Cross } from "lucide-react";
import { caseById, caseGroups, cases } from "@/content/cases";
import { directionBySlug } from "@/content/directions";
import { industryBySlug } from "@/content/industries";
import { site } from "@/content/site";
import { Container, PageHero, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock } from "@/components/blocks";
import { Button } from "@/components/ds";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, caseSchema, graph } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseById((await params).slug);
  if (!c) return {};
  const title = `${c.title} — кейс ECO-PRO, ситуационный центр`;
  return {
    title: { absolute: title.length > 65 ? `${c.title} — кейс` : title },
    // Описание для поиска — до 160 знаков (стандарт): текст кейса, обрезанный по слову
    description: c.text.length > 160 ? c.text.slice(0, 157).replace(/\s+\S*$/, "") + "…" : c.text,
    alternates: { canonical: `/cases/${c.id}/` },
    openGraph: { type: "article", title, description: c.text, url: `${site.url}/cases/${c.id}/`, images: ["/og.png"] },
  };
}

function Criteria({ title, items }: { title: string; items: { k: string; v: string }[] }) {
  return (
    <div className="ds-tile p-6 sm:p-8">
      <h3 className="ds-h4">{title}</h3>
      <dl className="mt-5 divide-y divide-[var(--c-border)]">
        {items.map((it) => (
          <div key={it.k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="ds-small">{it.k}</dt>
            <dd className="ds-body !text-[var(--c-text)]">{it.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseById((await params).slug);
  if (!c) notFound();
  const path = `/cases/${c.id}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/cases/" }, { name: c.title, path }];
  const ind = c.industry ? industryBySlug(c.industry) : undefined;
  const dirs = c.directions.map(directionBySlug).filter((x) => x !== undefined);
  // Фоны секций чередуются: белый — серый — белый, без двух одинаковых подряд (правки Ника 18.11)
  let k = 0;
  const tone = () => (k++ % 2 === 0 ? "bg-card" : "");
  const more = cases.filter((x) => x.id !== c.id && (x.industry === c.industry || x.group === c.group)).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(caseSchema(c), breadcrumbs(crumbs))} />

      {/* Шапка кейса; сразу под ней — формат «Критерии оценки для CEO → Что изменилось» (презентация, слайды 13 и 21) */}
      <PageHero center crumbs={<Crumbs items={[crumbs[0], crumbs[1], { name: c.title }]} />} eyebrow={c.tag} title={c.title} answer={c.scale}>
        <dl className={`mt-10 grid w-full gap-px border border-[var(--c-border)] bg-[var(--c-border)] ${c.metrics.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end bg-white p-5 text-center">
              <dt className="ds-small mt-1">{m.label}</dt>
              <dd className="text-3xl font-normal tracking-tight"><span className="text-[var(--c-brand)]">[</span>{m.value}<span className="text-[var(--c-brand)]">]</span></dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Критерии для CEO и СБ */}
      {(c.ceo || c.sb) && (
        <Section className={tone()}>
          <Container>
            <SectionHead eyebrow="критерии оценки для CEO" title="Что изменилось для CEO и службы безопасности" />
            <div data-reveal className="grid gap-4 lg:grid-cols-2">
              {c.ceo && <Criteria title="Для CEO" items={c.ceo} />}
              {c.sb && <Criteria title="Для службы безопасности" items={c.sb} />}
            </div>
          </Container>
        </Section>
      )}

      {/* Ситуация */}
      <Section className={tone()}>
        <Container className="max-w-3xl">
          <SectionHead eyebrow="ситуация" title="Что происходило" />
          <div data-reveal className="ds-lead space-y-4 !text-[var(--c-text)]">
            {c.situation.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}
          </div>
        </Container>
      </Section>

      {/* Ошибки → изменения */}
      <Section className={tone()}>
        <Container>
          <SectionHead eyebrow="разбор" title="Что было не так и что изменили" />
          <div data-reveal className="grid gap-4 lg:grid-cols-2">
            <div className="ds-tile border-[var(--c-brand)] p-6 sm:p-8">
              <h3 className="ds-h4">Какие ошибки выявили</h3>
              <ul className="mt-5 space-y-3">
                {c.errors.map((t) => <li key={t} className="ds-body flex gap-3 !text-[var(--c-text)]"><Cross className="mt-1 size-4 shrink-0 text-[var(--c-brand)]" aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
            <div className="ds-tile border-[var(--c-success)] p-6 sm:p-8">
              <h3 className="ds-h4">Что изменили</h3>
              <ul className="mt-5 space-y-3">
                {c.changes.map((t) => <li key={t} className="ds-body flex gap-3 !text-[var(--c-text)]"><Check className="mt-1 size-4 shrink-0 text-[var(--c-success)]" aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Результат и экономика */}
      <Section className={tone()}>
        <Container>
          <SectionHead eyebrow="результат" title="Что получил бизнес" />
          <ul data-reveal className="mx-auto max-w-3xl space-y-4">
            {c.results.map((t) => <li key={t} className="ds-lead flex gap-3 !text-[var(--c-text)]"><Check className="mt-1.5 size-5 shrink-0 text-[var(--c-brand)]" aria-hidden="true" />{t}</li>)}
          </ul>
          {c.economics && (
            <div data-reveal className="ds-tile mx-auto mt-10 max-w-3xl p-6 text-center sm:p-8">
              <h3 className="ds-eyebrow">Экономика</h3>
              <p className="ds-body mt-3">{c.economics}</p>
            </div>
          )}
          {c.comment && <blockquote data-reveal className="ds-h4 mx-auto mt-10 max-w-3xl border-t-2 border-[var(--c-brand)] pt-6 text-center">{c.comment}</blockquote>}
        </Container>
      </Section>

      {/* Что использовали — ссылки на отрасль и направления (списком, без смешивания карточек) */}
      <Section className={tone()}>
        <Container className="text-center">
          <SectionHead eyebrow="решение" title="Какие направления работали" />
          <div className="flex flex-wrap justify-center gap-2">
            {dirs.map((d) => (
              <Link key={d.slug} href={`/services/${d.slug}/`} className="rounded-full border border-[var(--c-border-strong)] px-4 py-2 text-sm font-medium hover:border-[var(--c-brand)]">
                <span className="text-[var(--c-brand)]">{d.code}</span> · {d.title}
              </Link>
            ))}
          </div>
          {ind && (
            <p className="ds-body mt-6">Отрасль: <Link href={`/industries/${ind.slug}/`} className="ds-link font-medium text-[var(--c-text)]">{ind.title}</Link></p>
          )}
          <p className="ds-small mt-2">Группа: {caseGroups[c.group].title}</p>
          <Button asChild size="lg" className="mt-10"><a href="/#pilot">Обсудить пилот на 60 дней</a></Button>
        </Container>
      </Section>

      {more.length > 0 && (
        <Section className={tone()}>
          <Container>
            <SectionHead eyebrow="ещё кейсы" title="Похожие проекты" />
            <CaseGrid items={more} />
            <div className="mt-8 flex justify-center"><Button asChild variant="secondary"><Link href="/cases/">Все кейсы</Link></Button></div>
          </Container>
        </Section>
      )}

      <CtaBlock />
    </>
  );
}
