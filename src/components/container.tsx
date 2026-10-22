import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("scroll-mt-20 py-16 sm:py-24", className)} {...props} />;
}

// Надзаголовок — моно-подпись прописными
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("label mb-4 text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

// Заголовок секции (дизайн-система: SectionHead): линейка, ■ и номер [01] по счётчику страницы, надзаголовок,
// заголовок капсом слева (7 колонок) и подводка справа. center — для узких страниц (FAQ, документы).
export function SectionHead({ eyebrow, title, text, className, as: H = "h2", center }: { eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; className?: string; as?: "h1" | "h2"; center?: boolean }) {
  return (
    <div data-reveal className={cn("sec-head mb-12 border-t-2 border-foreground pt-4", className)}>
      <p className="label flex items-center gap-2 text-muted-foreground">
        <span className="size-2 shrink-0 bg-brand-solid" aria-hidden="true" />
        <span className="sec-idx" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className={cn("mt-10 grid gap-6", !center && text && "lg:grid-cols-12 lg:items-end")}>
        <H className={cn("display text-[32px] leading-[0.98] text-balance sm:text-5xl", !center && text && "lg:col-span-7")}>{title}</H>
        {text && <p className={cn("max-w-2xl text-lg leading-relaxed text-muted-foreground", !center && "lg:col-span-5 lg:col-start-8 lg:text-[17px]")}>{text}</p>}
      </div>
    </div>
  );
}

// Код направления фирменным красным: PRO-TEST
export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-brand", className)}>{children}</span>;
}
