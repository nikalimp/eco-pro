import type { Metadata } from "next";
import Link from "next/link";
import { glossary } from "@/content/glossary";
import { site } from "@/content/site";
import { Container, PageHero, Section } from "@/components/container";
import { CtaBlock } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { graph } from "@/lib/schema";

// Глоссарий (идея 5 документа итерации v3, 16.11): термины ECO-PRO с одним значением. JSON-LD — DefinedTermSet из тех же данных.
export const metadata: Metadata = {
  title: "Глоссарий ECO-PRO: воровство власти, Центр Правды",
  description: "Термины ECO-PRO: ситуационный центр, Центр Правды, воровство власти, управляемость, индекс управляемости CEO, эффект наблюдателя и ROI.",
  alternates: { canonical: "/glossary/" },
};

export default function Glossary() {
  const termSet = {
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glossary/#terms`,
    name: glossary.h1,
    url: `${site.url}/glossary/`,
    hasDefinedTerm: glossary.terms.map((t) => ({ "@type": "DefinedTerm", "@id": `${site.url}/glossary/${t.id}/#term`, name: t.term, description: t.definition, url: `${site.url}/glossary/${t.id}/`, inDefinedTermSet: `${site.url}/glossary/#terms` })),
  };
  return (
    <>
      <JsonLd data={graph(termSet)} />
      <PageHero eyebrow="термины" title={glossary.h1} answer={glossary.answer}>
        <nav aria-label="Термины" className="mt-9 flex flex-wrap gap-2">
          {glossary.terms.map((t) => <Link key={t.id} href={`/glossary/${t.id}/`} className="rounded-full border border-[var(--c-border-strong)] px-4 py-2 text-sm font-medium hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]">{t.term}</Link>)}
        </nav>
      </PageHero>
      <Section>
        <Container>
          <dl className="divide-y divide-[var(--c-border)] border-y border-[var(--c-border)]">
            {glossary.terms.map((t) => (
              <div key={t.id} id={t.id} className="grid scroll-mt-24 gap-3 py-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
                <dt className="ds-h3"><Link href={`/glossary/${t.id}/`} className="hover:text-[var(--c-brand)]">{t.term}</Link></dt>
                <dd>
                  <p className="ds-lead !text-[var(--c-text)]">{t.definition}</p>
                  <p className="ds-small mt-3">Источник: {t.source} · <Link href={`/glossary/${t.id}/`} className="ds-link">Подробнее о термине</Link></p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      <CtaBlock />
    </>
  );
}
