import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { Container, Section, SectionHead } from "@/components/container";
import { CtaBlock, IndustryCard } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Решения для ритейла, HoReCa, производства и логистики",
  description:
    "Экосистема ECO-PRO для отраслей: розница и e-commerce, гостиницы и рестораны, производство и логистика. Контроль потерь, дисциплины и регламентов.",
  alternates: { canonical: "/industries/" },
};

export default function Industries() {
  return (
    <>
      <JsonLd data={graph(itemList("Отраслевые решения ECO-PRO", industries.map((i) => ({ name: i.title, path: `/industries/${i.slug}/` }))))} />
      <Section className="pt-10">
        <Container>
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
