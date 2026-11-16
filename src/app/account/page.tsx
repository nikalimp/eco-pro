import type { Metadata } from "next";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { Container, PageHero, Section } from "@/components/container";
import { HeroDashboard } from "@/components/hero-dashboard";
import { Button } from "@/components/ds";

// Личный кабинет: заглушка «в разработке» + демо дашборда на демо-данных (решения Ника 16.11, идея 4).
// Экран повторяет личный кабинет клиента со слайда 25 презентации; фамилии обезличены.
export const metadata: Metadata = {
  title: "Личный кабинет клиента — демо дашборда",
  description: "Личный кабинет ECO-PRO с онлайн-дашбордами по объектам клиента — в разработке. Демо экрана: индекс управляемости CEO, исполнение регламентов, время реакции, карта нарушений.",
  alternates: { canonical: "/account/" },
  robots: { index: false, follow: true },
};

export default function Cabinet() {
  return (
    <>
      <PageHero
        eyebrow="личный кабинет · в разработке"
        title="Личный кабинет"
        answer={<>Онлайн-кабинет для клиентов на сайте — в разработке. Действующим клиентам данные по объектам предоставляет менеджер: напишите на{" "}
          <a href={`mailto:${site.contacts.email}`} className="ds-link text-[var(--c-text)]">{site.contacts.email}</a> или позвоните{" "}
          <a href={`tel:${site.contacts.phone}`} className="ds-link text-[var(--c-text)]">{site.contacts.phoneDisplay}</a>.</>}
      >
        <Button asChild size="lg" className="mt-9"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </PageHero>
      <Section className="bg-card">
        <Container>
          <p className="ds-eyebrow">демо</p>
          <h2 className="ds-h2 mt-5 max-w-4xl">Так выглядит экран: {home.dashboard.title.toLowerCase()}</h2>
          <p className="ds-body mt-5 max-w-2xl">{home.architecture.dashboards}</p>
          <HeroDashboard className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
