import type { Metadata } from "next";
import { cases, caseGroups, type CaseGroup } from "@/content/cases";
import { Container, Section, SectionHead } from "@/components/container";
import { CtaBlock } from "@/components/blocks";
import { CaseTabs } from "@/components/case-tabs";
import { JsonLd } from "@/components/json-ld";
import { graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Кейсы внедрения ситуационного центра и ИИ",
  description:
    "13 кейсов ECO-PRO: 28 млн ₽ экономии в логистике, исполнение стандартов с 32% до 91% в сети из 420 магазинов, кражи −40%, ожидание на кассах −47%.",
  alternates: { canonical: "/cases/" },
};

const order: CaseGroup[] = ["ai", "power", "analysis", "operator"];

export default function Cases() {
  return (
    <>
      <JsonLd data={graph(itemList("Кейсы внедрения ECO-PRO", cases.map((c) => ({ name: `${c.title}: ${c.value} — ${c.valueLabel}`, path: `/cases/${c.id}/` }))))} />
      <Section className="pt-10 pb-8 sm:pb-10">
        <Container>
          <SectionHead
            as="h1"
            className="mb-0 mt-6"
            eyebrow="реализованные проекты"
            title="Кейсы внедрения"
            text="Как ситуационный центр превращает сигналы камер и отчёты в действия и деньги. Ситуационный центр вскрыл теневую схему в логистике и сэкономил клиенту 28 млн ₽ в год, а в сети из 420 магазинов вернул исполнение стандартов с 32% до 91%."
          />
        </Container>
      </Section>
      {/* Все кейсы одной сеткой, категории — табами (правки Ника 17.11) */}
      <Section className="!pt-0">
        <Container>
          <CaseTabs items={order.flatMap((g) => cases.filter((c) => c.group === g))} groups={order.map((g) => ({ id: g, ...caseGroups[g] }))} />
        </Container>
      </Section>
      <CtaBlock />
    </>
  );
}
