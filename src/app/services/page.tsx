import type { Metadata } from "next";
import { directions } from "@/content/directions";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CtaBlock, DirectionCard } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Направления экосистемы PRO: СЦ, ИИ, аналитика",
  description:
    "Пять направлений экосистемы ECO-PRO: ситуационный центр PRO-TEST, ИИ PRO-AI, платформы PRO-INC, аналитика PRO-DATA и системы безопасности PRO-TECHNO.",
  alternates: { canonical: "/services/" },
};

export default function Directions() {
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Направления", path: "/services/" }];
  return (
    <>
      <JsonLd data={graph(itemList("Направления экосистемы PRO", directions.map((d) => ({ name: `${d.code} — ${d.title}`, path: `/services/${d.slug}/` }))), breadcrumbs(crumbs))} />
      <Section className="pt-10">
        <Container>
          <Crumbs items={[crumbs[0], { name: "Направления" }]} />
          <SectionHead
            as="h1"
            className="mt-6"
            title="Направления экосистемы PRO"
            text="Экосистема PRO — пять направлений: ситуационный центр PRO-TEST, ИИ PRO-AI, платформы PRO-INC, аналитика PRO-DATA и системы безопасности PRO-TECHNO. Их объединяет ситуационный центр, а конфигурацию собираем под задачу заказчика."
          />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directions.map((d) => <DirectionCard key={d.slug} d={d} />)}
          </div>
        </Container>
      </Section>
      <CtaBlock />
    </>
  );
}
