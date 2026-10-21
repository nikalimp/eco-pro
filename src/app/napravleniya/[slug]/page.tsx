import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { directionBySlug, directions } from "@/content/directions";
import { industryBySlug } from "@/content/industries";
import { casesByDirection } from "@/content/cases";
import { site } from "@/content/site";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock, DirectionCard, FeatureGrid, IndustryCard } from "@/components/blocks";
import { FaqList } from "@/components/faq";
import { Button } from "@/components/ui/button";
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
    alternates: { canonical: `/napravleniya/${d.slug}/` },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: `${site.url}/napravleniya/${d.slug}/`, images: ["/og.png"] },
  };
}

export default async function DirectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = directionBySlug((await params).slug);
  if (!d) notFound();
  const path = `/napravleniya/${d.slug}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Направления", path: "/napravleniya/" }, { name: d.code, path }];
  const cs = casesByDirection(d.slug).slice(0, 6);
  const inds = d.industries.map(industryBySlug).filter((x) => x !== undefined);
  const rel = d.related.map((s) => directions.find((x) => x.slug === s)).filter((x) => x !== undefined);

  return (
    <>
      <JsonLd data={graph(directionSchema(d), breadcrumbs(crumbs), faqSchema(d.faq))} />

      <Section className="pt-10">
        <Container className="page-intro text-center">
          <Crumbs items={[crumbs[0], crumbs[1], { name: d.code }]} />
          <p className="mt-8 text-lg font-medium text-brand">{d.code}</p>
          <h1 className="mx-auto mt-2 max-w-4xl text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl">{d.h1}</h1>
          <p className="mt-4 text-xl font-medium">{d.tagline}</p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{d.answer}</p>
          {d.note && <p className="mx-auto mt-4 max-w-3xl text-[15px] text-muted-foreground">{d.note}</p>}
          <Button asChild size="lg" className="mt-8"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="что делаем" title={<>Что входит в {d.code}</>} />
          <FeatureGrid items={d.features} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="место в контуре PRO-TEST" title={d.code === "PRO-TEST" ? <>Полный контур ситуационного центра</> : <>Роль {d.code} в работе ситуационного центра</>} text={d.roleInContour} className="mb-0" />
          <ContourScheme code={d.code} active={d.contour} />
          {d.video && (
            <video data-reveal className="mx-auto mt-12 aspect-video w-full max-w-4xl rounded-md bg-black" controls muted playsInline preload="none" poster="/images/video-poster.webp" aria-label={`Видео: ${d.code} — ${d.title}`}>
              <source src={d.video} type="video/mp4" />
            </video>
          )}
          {d.extraImage && <Image data-reveal src={d.extraImage.src} alt={d.extraImage.alt} width={d.extraImage.width} height={d.extraImage.height} className="mx-auto mt-12 w-full max-w-md rounded-md" />}
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

      {d.slug === "sistemy-bezopasnosti" && (
        <Section id="dokumenty" className="border-t">
          <Container>
            <SectionHead eyebrow="лицензии и допуски" title="Работаем по лицензии МЧС и с допусками СРО" text="Проектирование, монтаж и обслуживание выполняет ООО «Император Техно» — компания экосистемы ECO-PRO." />
            <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{licenses.map((x) => <DocCard key={x.id} d={x} />)}</div>
            <p className="mt-10 text-center text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">Партнёр производителей</p>
            <p className="mx-auto mt-3 max-w-3xl text-center text-lg">{partners.map((x) => x.title.split(" — ")[0]).filter((v, i, a) => a.indexOf(v) === i).join(" · ")}</p>
            <div className="mt-8 text-center"><Link href="/dokumenty/" className="font-medium underline underline-offset-4 hover:text-brand">Все сертификаты и рекомендательные письма</Link></div>
          </Container>
          <DocLightboxes docs={licenses} />
        </Section>
      )}

      <Section>
        <Container className="max-w-4xl">
          <SectionHead title={<>Частые вопросы о {d.code}</>} />
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
            <SectionHead eyebrow="отрасли" title={<>Где {d.code} работает</>} />
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
