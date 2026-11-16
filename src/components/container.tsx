import { cn } from "@/lib/utils";

// Обёртки внутренних страниц на дизайн-системе ECO-PRO v3 (итерация v3, 16.11): поля и ритм — токены ds,
// заголовки — облегчённая типошкала (вес 500), выравнивание по левому краю, как на главной.

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("ds-wrap w-full", className)} {...props} />;
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("page-section scroll-mt-20", className)} {...props} />;
}

// Надзаголовок капсом с разрядкой
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("ds-eyebrow mb-5", className)} {...props}>{children}</p>;
}

// Заголовок блока: надзаголовок, h2, подводка
export function SectionHead({ eyebrow, title, text, className, as: H = "h2" }: { eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; className?: string; as?: "h1" | "h2" }) {
  return (
    <div data-reveal className={cn("mb-12 max-w-4xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H className={H === "h1" ? "ds-h1" : "ds-h2"}>{title}</H>
      {text && <p className="ds-body mt-5 max-w-2xl">{text}</p>}
    </div>
  );
}

// Код направления фирменным красным: «Центр Правды», PRO-AI…
export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-[var(--c-brand)]", className)}>{children}</span>;
}

// Первый экран внутренней страницы: крошки, надзаголовок, H1, прямой ответ (поле answer), действия
export function PageHero({ crumbs, eyebrow, title, lead, answer, children, className }: {
  crumbs?: React.ReactNode; eyebrow?: React.ReactNode; title: React.ReactNode; lead?: React.ReactNode; answer?: React.ReactNode; children?: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("page-hero border-b border-[var(--c-border)]", className)}>
      <div className="ds-wrap page-intro">
        {crumbs}
        {eyebrow && <p className="ds-eyebrow mt-8">{eyebrow}</p>}
        <h1 className="ds-h1 mt-5 max-w-5xl">{title}</h1>
        {lead && <p className="ds-h4 mt-5 max-w-3xl !font-normal text-[var(--c-text-2)]">{lead}</p>}
        {answer && <p className="ds-lead mt-6 max-w-3xl">{answer}</p>}
        {children}
      </div>
    </section>
  );
}
