import type { Metadata } from "next";
import Link from "next/link";
import { docsCompany, letters, licenses, partners, allDocs } from "@/content/documents";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CtaBlock } from "@/components/blocks";
import { DocCard, DocLightboxes } from "@/components/doc-gallery";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Лицензии, СРО и рекомендации — ECO-PRO",
  description: "Лицензия МЧС, допуски СРО на строительство и проектирование, сертификаты DSSL, TRASSIR, Parsec и рекомендательные письма Магнита, Stockmann, «Домового» и Green.",
  alternates: { canonical: "/documents/" },
};

export default function Documents() {
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Документы и рекомендации", path: "/documents/" }];
  return (
    <>
      <JsonLd data={graph(itemList("Лицензии, допуски и рекомендации ECO-PRO", allDocs.map((d) => ({ name: `${d.title}${d.meta ? ` (${d.meta})` : ""}`, path: `/documents/#doc-${d.id}` }))), breadcrumbs(crumbs))} />
      <Section id="dokumenty" className="pt-10 pb-8 sm:pb-10">
        <Container>
          <Crumbs items={[crumbs[0], { name: "Документы и рекомендации" }]} />
          <SectionHead
            as="h1"
            className="mb-0 mt-6"
            eyebrow="доверие"
            title="Лицензии, допуски и рекомендации"
            text={`Монтаж и обслуживание систем безопасности в экосистеме ECO-PRO выполняет ${docsCompany.name} — ${docsCompany.role}. У компании лицензия МЧС на работы с системами пожарной безопасности, допуски СРО на строительство и проектирование и рекомендательные письма от Магнита, Stockmann, сетей «Домовой» и Green.`}
          />
          <p className="mt-4 text-center text-sm text-muted-foreground">{docsCompany.name} · ИНН {docsCompany.inn} · ОГРН {docsCompany.ogrn}</p>
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="лицензии и допуски" title="Работаем легально и с ответственностью" text="Право выполнять работы подтверждено государственной лицензией и членством в саморегулируемых организациях." />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{licenses.map((d) => <DocCard key={d.id} d={d} />)}</div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="рекомендации" title="Что говорят заказчики" text="Благодарственные и рекомендательные письма крупных сетей. Нажмите на письмо, чтобы прочитать его целиком." />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{letters.map((d) => <DocCard key={d.id} d={d} />)}</div>
        </Container>
      </Section>

      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow="производители" title="Сертифицированный партнёр производителей" text="Статусы партнёра и сертификаты установщика ведущих производителей видеонаблюдения, СКУД и оборудования." />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{partners.map((d) => <DocCard key={d.id} d={d} compact />)}</div>
          <p className="mt-8 text-center text-muted-foreground">
            Подробнее о проектировании, монтаже и обслуживании — на странице <Link href="/services/security-systems/" className="font-medium text-foreground underline underline-offset-4 hover:text-brand">PRO-TECHNO</Link>.
          </p>
        </Container>
      </Section>

      <CtaBlock />
      <DocLightboxes docs={allDocs} />
    </>
  );
}
