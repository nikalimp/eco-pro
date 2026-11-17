import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industryBySlug } from "@/content/industries";
import { directionBySlug } from "@/content/directions";
import { casesByIndustry } from "@/content/cases";
import { site } from "@/content/site";
import { Container, PageHero, Section, SectionHead } from "@/components/container";
import { CaseGrid, CtaBlock, DirectionCard } from "@/components/blocks";
import { FaqList } from "@/components/faq";
import { Button } from "@/components/ds";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph, industrySchema } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = industryBySlug((await params).slug);
  if (!i) return {};
  return {
    title: { absolute: i.metaTitle },
    description: i.metaDescription,
    alternates: { canonical: `/industries/${i.slug}/` },
    openGraph: { title: i.metaTitle, description: i.metaDescription, url: `${site.url}/industries/${i.slug}/`, images: ["/og.png"] },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = industryBySlug((await params).slug);
  if (!i) notFound();
  const path = `/industries/${i.slug}/`;
  const cs = casesByIndustry(i.slug);
  const ds = i.directions.map(directionBySlug).filter((x) => x !== undefined);

  return (
    <>
      <JsonLd data={graph(industrySchema(i), faqSchema(i.faq))} />

      <PageHero eyebrow={i.label} title={i.h1} answer={i.answer}>
        <Button asChild size="lg" className="mt-9"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </PageHero>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="задачи" title={<>Что контролируем</>} />
          <ul data-reveal className="grid gap-4 sm:grid-cols-2">
            {i.tasks.map((t) => (
              <li key={t} className="ds-tile ds-body flex gap-3 p-5 !text-[var(--c-text)]"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-[var(--c-brand)]" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="реализованные проекты" title={<>Кейсы отрасли</>} />
          <CaseGrid items={cs} />
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="конфигурация" title={<>Какие направления работают</>} />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ds.map((d) => <DirectionCard key={d.slug} d={d} />)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHead title={<>Частые вопросы</>} />
          <FaqList items={i.faq} />
        </Container>
      </Section>

      <CtaBlock />
    </>
  );
}
