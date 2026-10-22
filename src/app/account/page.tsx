import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Личный кабинет клиента",
  description: "Личный кабинет ECO-PRO с онлайн-дашбордами по объектам клиента — в разработке. Данные по объектам действующим клиентам предоставляет менеджер.",
  alternates: { canonical: "/account/" },
  robots: { index: false, follow: true },
};

export default function Cabinet() {
  return (
    <Section className="pt-10">
      <Container className="max-w-3xl text-center">
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-brand">в разработке</p>
        <h1 className="mt-2 text-5xl leading-[0.92] sm:text-7xl">Личный кабинет</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Личный кабинет с онлайн-дашбордами по объектам — в разработке. Действующим клиентам данные по объектам предоставляет менеджер: напишите на{" "}
          <a href={`mailto:${site.contacts.email}`} className="text-foreground underline underline-offset-4">{site.contacts.email}</a> или позвоните{" "}
          <a href={`tel:${site.contacts.phone}`} className="text-foreground underline underline-offset-4">{site.contacts.phoneDisplay}</a>.
        </p>
        <Button asChild size="lg" className="mt-8"><a href={site.cta.href}>{site.cta.label}</a></Button>
      </Container>
    </Section>
  );
}
