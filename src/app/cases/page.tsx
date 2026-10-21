import type { Metadata } from "next";
import { cases, caseGroups, type CaseGroup } from "@/content/cases";
import { Container, Section, SectionHead } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { CaseGrid, CtaBlock } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Кейсы внедрения ситуационного центра и ИИ",
  description:
    "13 кейсов ECO-PRO: 28 млн ₽ экономии в логистике, исполнение стандартов с 32% до 91% в сети из 420 магазинов, кражи −40%, ожидание на кассах −47%.",
  alternates: { canonical: "/cases/" },
};

const order: CaseGroup[] = ["ai", "power", "analysis", "operator"];

export default function Cases() {
  const crumbs = [{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/cases/" }];
  return (
    <>
      <JsonLd data={graph(itemList("Кейсы внедрения ECO-PRO", cases.map((c) => ({ name: `${c.title}: ${c.value} — ${c.valueLabel}`, path: `/cases/${c.id}/` }))), breadcrumbs(crumbs))} />
      <Section className="pt-10 pb-8 sm:pb-10">
        <Container>
          <Crumbs items={[crumbs[0], { name: "Кейсы" }]} />
          <SectionHead
            as="h1"
            className="mb-0 mt-6"
            eyebrow="реализованные проекты"
            title="Кейсы внедрения"
            text="Как ситуационный центр превращает сигналы камер и отчёты в действия и деньги. Ситуационный центр вскрыл теневую схему в логистике и сэкономил клиенту 28 млн ₽ в год, а в сети из 420 магазинов вернул исполнение стандартов с 32% до 91%."
          />
          <nav aria-label="Группы кейсов" className="mt-8 flex flex-wrap justify-center gap-2">
            {order.map((g) => (
              <a key={g} href={`#${g}`} className="rounded-full border px-4 py-2 text-sm font-medium hover:border-foreground">{caseGroups[g].title}</a>
            ))}
          </nav>
        </Container>
      </Section>
      {order.map((g, n) => (
        <Section key={g} id={g} className={n % 2 === 0 ? "bg-card" : undefined}>
          <Container>
            <SectionHead title={caseGroups[g].title} text={caseGroups[g].text} />
            <CaseGrid items={cases.filter((c) => c.group === g)} />
          </Container>
        </Section>
      ))}
      <CtaBlock />
    </>
  );
}
