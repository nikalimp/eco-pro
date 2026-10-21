import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industryBySlug } from "@/content/industries";
import { directionBySlug } from "@/content/directions";
import { casesByIndustry } from "@/content/cases";
import { site } from "@/content/site";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock, DirectionCard } from "@/components/blocks";
import { FaqList } from "@/components/faq";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, faqSchema, graph, industrySchema } from "@/lib/schema";

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
    alternates: { canonical: `/otrasli/${i.slug}/` },
    openGraph: { title: i.metaTitle, description: i.metaDescription, url: `${site.url}/otrasli/${i.slug}/`, images: ["/og.png"] },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = industryBySlug((await params).slug);
  if (!i) notFound();
  const path = `/otrasli/${i.slug}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Отрасли", path: "/otrasli/" }, { name: i.title, path }];
  const cs = casesByIndustry(i.slug);
  const ds = i.directions.map(directionBySlug).filter((x) => x !== undefined);

  return (
    <>
      <JsonLd data={graph(industrySchema(i), breadcrumbs(crumbs), faqSchema(i.faq))} />

      <Section className="pt-10">
        <Container className="page-intro text-center">
          <Crumbs items={[crumbs[0], crumbs[1], { name: i.title }]} />
          <p className="mt-8 text-lg font-medium text-brand">{i.label}</p>
          <h1 className="mx-auto mt-2 max-w-4xl text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl">{i.h1}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{i.answer}</p>
          <Button asChild size="lg" className="mt-8"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="задачи" title={<>Что контролируем</>} />
          <ul data-reveal className="grid gap-4 sm:grid-cols-2">
            {i.tasks.map((t) => (
              <li key={t} className="spot flex gap-3 border bg-background p-5 text-lg"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />{t}</li>
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
