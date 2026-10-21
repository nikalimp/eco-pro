import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CtaBlock, IndustryCard } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Решения для ритейла, HoReCa, производства и логистики",
  description:
    "Экосистема ECO-PRO для отраслей: розница и e-commerce, гостиницы и рестораны, производство и логистика. Контроль потерь, дисциплины и регламентов.",
  alternates: { canonical: "/otrasli/" },
};

export default function Industries() {
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Отрасли", path: "/otrasli/" }];
  return (
    <>
      <JsonLd data={graph(itemList("Отраслевые решения ECO-PRO", industries.map((i) => ({ name: i.title, path: `/otrasli/${i.slug}/` }))), breadcrumbs(crumbs))} />
      <Section className="pt-10">
        <Container>
          <Crumbs items={[crumbs[0], { name: "Отрасли" }]} />
          <SectionHead
            as="h1"
            className="mt-6"
            title="Решения для отраслей"
            text="Экосистема ECO-PRO адаптируется под специфику отрасли: розница и e-commerce, гостиницы и рестораны, производство и логистика. Для каждой — свои задачи контроля, кейсы и конфигурация направлений."
          />
          <div data-reveal className="grid gap-4 md:grid-cols-3">
            {industries.map((i) => <IndustryCard key={i.slug} i={i} />)}
          </div>
        </Container>
      </Section>
      <CtaBlock />
    </>
  );
}
