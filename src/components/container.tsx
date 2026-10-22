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
// заголовок капсом слева и подводка под ним (правки Ника 22.10). center оставлен для совместимости.
export function SectionHead({ eyebrow, title, text, className, as: H = "h2", center }: { eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; className?: string; as?: "h1" | "h2"; center?: boolean }) {
  return (
    <div data-reveal className={cn("sec-head mb-12 border-t-2 border-foreground pt-4", className)}>
      <p className="label flex items-center gap-2 text-muted-foreground">
        <span className="size-2 shrink-0 bg-brand-solid" aria-hidden="true" />
        <span className="sec-idx" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className="mt-10">
        <H className="display max-w-5xl text-[32px] leading-[0.98] text-balance sm:text-5xl">{title}</H>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{text}</p>}
      </div>
    </div>
  );
}

// Код направления фирменным красным: PRO-TEST
export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-brand", className)}>{children}</span>;
}
