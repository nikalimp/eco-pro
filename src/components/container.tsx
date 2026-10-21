import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("scroll-mt-20 py-16 sm:py-24", className)} {...props} />;
}

// Надзаголовок капсом (без квадратных скобок — правки 14.10: скобки только в логотипе и H1)
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("mb-4 text-xs font-light uppercase tracking-[0.18em] text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

// Заголовок блока по центру: надзаголовок, h2, подводка
export function SectionHead({ eyebrow, title, text, className, as: H = "h2" }: { eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; className?: string; as?: "h1" | "h2" }) {
  return (
    <div data-reveal className={cn("mx-auto mb-12 max-w-3xl text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">{title}</H>
      {text && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

// Код направления фирменным красным: PRO-TEST
export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-brand", className)}>{children}</span>;
}
