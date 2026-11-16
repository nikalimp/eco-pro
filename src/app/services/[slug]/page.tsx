import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { directionBySlug, directions } from "@/content/directions";
import { industryBySlug } from "@/content/industries";
import { casesByDirection } from "@/content/cases";
import { site } from "@/content/site";
import { Container, PageHero, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock, DirectionCard, FeatureGrid, IndustryCard } from "@/components/blocks";
import { FaqList } from "@/components/faq";
import { Button } from "@/components/ds";
import { ContourScheme } from "@/components/contour-scheme";
import { DocCard, DocLightboxes } from "@/components/doc-gallery";
import { licenses, partners } from "@/content/documents";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, directionSchema, faqSchema, graph } from "@/lib/schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return directions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = directionBySlug((await params).slug);
  if (!d) return {};
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: { canonical: `/services/${d.slug}/` },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: `${site.url}/services/${d.slug}/`, images: ["/og.png"] },
  };
}

export default async function DirectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = directionBySlug((await params).slug);
  if (!d) notFound();
  const path = `/services/${d.slug}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Направления", path: "/services/" }, { name: d.code, path }];
  const cs = casesByDirection(d.slug).slice(0, 6);
  const inds = d.industries.map(industryBySlug).filter((x) => x !== undefined);
  const rel = d.related.map((s) => directions.find((x) => x.slug === s)).filter((x) => x !== undefined);

  return (
    <>
      <JsonLd data={graph(directionSchema(d), breadcrumbs(crumbs), faqSchema(d.faq))} />

      <PageHero crumbs={<Crumbs items={[crumbs[0], crumbs[1], { name: d.code }]} />} eyebrow={d.code} title={d.h1} lead={d.tagline} answer={d.answer}>
        {d.note && <p className="ds-small mt-4 max-w-3xl">{d.note}</p>}
        <Button asChild size="lg" className="mt-9"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </PageHero>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="что делаем" title={<>Что входит в {d.code}</>} />
          <FeatureGrid items={d.features} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="место в контуре ситуационного центра" title={d.slug === "situation-center" ? <>Полный контур ситуационного центра</> : <>Роль {d.code} в работе ситуационного центра</>} text={d.roleInContour} className="mb-0" />
          <ContourScheme code={d.code} active={d.contour} />
          {d.video && (
            <video data-reveal className="mt-12 aspect-video w-full max-w-4xl bg-black" controls muted playsInline preload="none" poster="/images/video-poster.webp" aria-label={`Видео: ${d.code} — ${d.title}`}>
              <source src={d.video} type="video/mp4" />
            </video>
          )}
          {d.extraImage && <Image data-reveal src={d.extraImage.src} alt={d.extraImage.alt} width={d.extraImage.width} height={d.extraImage.height} className="mt-12 w-full max-w-md" />}
        </Container>
      </Section>

      {cs.length > 0 && (
        <Section className="bg-card">
          <Container>
            <SectionHead eyebrow="реализованные проекты" title={<>Кейсы</>} />
            <CaseGrid items={cs} />
          </Container>
        </Section>
      )}

      {d.slug === "security-systems" && (
        <Section id="dokumenty" className="border-t">
          <Container>
            <SectionHead eyebrow="лицензии и допуски" title="Работаем по лицензии МЧС и с допусками СРО" text="Проектирование, монтаж и обслуживание выполняет ООО «Император Техно» — компания экосистемы ECO-PRO." />
            <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{licenses.map((x) => <DocCard key={x.id} d={x} />)}</div>
            <p className="ds-eyebrow mt-12">Партнёр производителей</p>
            <p className="ds-lead mt-3 max-w-3xl !text-[var(--c-text)]">{partners.map((x) => x.title.split(" — ")[0]).filter((v, i, a) => a.indexOf(v) === i).join(" · ")}</p>
            <div className="mt-8"><Link href="/documents/" className="ds-link font-medium">Все сертификаты и рекомендательные письма</Link></div>
          </Container>
          <DocLightboxes docs={licenses} />
        </Section>
      )}

      <Section>
        <Container className="max-w-4xl">
          <SectionHead title={<>Частые вопросы: {d.title.toLowerCase()}</>} />
          <FaqList items={d.faq} />
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="экосистема" title={<>Связанные направления</>} />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rel.map((r) => <DirectionCard key={r.slug} d={r} />)}
          </div>
        </Container>
      </Section>

      {inds.length > 0 && (
        <Section>
          <Container>
            <SectionHead eyebrow="отрасли" title={<>Отрасли, где работает направление</>} />
            <div data-reveal className="grid gap-4 md:grid-cols-3">
              {inds.map((i) => <IndustryCard key={i.slug} i={i} />)}
            </div>
          </Container>
        </Section>
      )}

      <CtaBlock />
    </>
  );
}
