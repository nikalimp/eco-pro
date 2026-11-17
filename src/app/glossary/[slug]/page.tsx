import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { glossary, glossaryDetails, termById } from "@/content/glossary";
import { site } from "@/content/site";
import { Container, PageHero, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CtaBlock } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph } from "@/lib/schema";

// Страница термина глоссария (правки Ника 17.11): у каждого термина свой адрес для индексации.
// H1 — термин, прямой ответ — определение. Крошки есть: страница вложена в глоссарий (вторая вложенность).
export const dynamicParams = false;
export function generateStaticParams() {
  return glossary.terms.map((t) => ({ slug: t.id }));
}

const short = (t: string, n = 158) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n - 1)) + "…");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = termById((await params).slug);
  if (!t) return {};
  const title = `${t.term}: что это такое${t.term.length < 20 ? " и как работает" : ""}`;
  return {
    title,
    description: short(t.definition),
    alternates: { canonical: `/glossary/${t.id}/` },
    openGraph: { title, description: short(t.definition), url: `${site.url}/glossary/${t.id}/`, images: ["/og.png"] },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = termById((await params).slug);
  if (!t) notFound();
  const path = `/glossary/${t.id}/`;
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Глоссарий", path: "/glossary/" }, { name: t.term, path }];
  const related = (t.related ?? []).map(termById).filter((x) => x !== undefined);
  const others = glossary.terms.filter((x) => x.id !== t.id && !t.related?.includes(x.id));
  const term = {
    "@type": "DefinedTerm",
    "@id": `${site.url}${path}#term`,
    name: t.term,
    description: t.definition,
    url: `${site.url}${path}`,
    inDefinedTermSet: { "@type": "DefinedTermSet", "@id": `${site.url}/glossary/#terms`, name: glossary.h1, url: `${site.url}/glossary/` },
  };

  return (
    <>
      <JsonLd data={graph(term, breadcrumbs(crumbs))} />
      <PageHero crumbs={<Crumbs items={[crumbs[0], crumbs[1], { name: t.term }]} />} eyebrow="термин глоссария" title={t.term} answer={t.definition}>
        <p className="ds-small mt-6">Источник: {t.source}</p>
        {t.link && (
          <Link href={t.link.href} className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--c-brand)] hover:underline">
            {t.link.label}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </PageHero>

      {glossaryDetails[t.id] && (
        <Section>
          <Container className="max-w-3xl">
            <h2 className="ds-h2">Как это работает</h2>
            <div className="mt-8 space-y-5">{glossaryDetails[t.id].map((x) => <p key={x} className="ds-body !text-[var(--c-text)]">{x}</p>)}</div>
            <p className="ds-small mt-8 border-t border-[var(--c-border)] pt-6">Термин «{t.term}» имеет одно значение на сайте ECO-PRO, в статьях блога и на встречах с клиентами. Источник определения: {t.source.charAt(0).toLowerCase() + t.source.slice(1)}.</p>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="bg-card">
          <Container>
            <SectionHead eyebrow="связанные термины" title="Что ещё нужно знать" />
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/glossary/${r.id}/`} className="ds-tile ds-tile-click group flex flex-col p-6 sm:p-8">
                  <h3 className="ds-h4 group-hover:text-[var(--c-brand)]">{r.term}</h3>
                  <p className="ds-small mt-3 flex-1">{r.definition}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium group-hover:text-[var(--c-brand)]">Читать определение<ArrowRight className="size-4" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="border-t border-[var(--c-border)]">
        <Container>
          <SectionHead eyebrow="глоссарий" title="Другие термины ECO-PRO" />
          <nav aria-label="Другие термины" className="flex flex-wrap justify-center gap-2">
            {others.map((x) => <Link key={x.id} href={`/glossary/${x.id}/`} className="rounded-full border border-[var(--c-border-strong)] px-4 py-2 text-sm font-medium hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]">{x.term}</Link>)}
          </nav>
          <p className="mt-8 text-center"><Link href="/glossary/" className="ds-link font-medium">Весь глоссарий</Link></p>
        </Container>
      </Section>

      <CtaBlock />
    </>
  );
}
