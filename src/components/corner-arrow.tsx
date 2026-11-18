import { cn } from "@/lib/utils";

// Стрелка ↗ на квадратной плашке размером с метку (27 px) — у кликабельных карточек: направления, кейсы, отрасли (правки Ника 18.11).
// Карточка-ссылка должна иметь класс group: при наведении плашка краснеет.
export function CornerArrow({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-[1.6875rem] shrink-0 place-items-center border border-[var(--c-border-strong)] bg-white text-[var(--c-text)] transition-colors group-hover:border-[var(--c-brand)] group-hover:bg-[var(--c-brand)] group-hover:text-white", className)} aria-hidden="true">
      <svg viewBox="0 0 12 12" className="size-2.5 fill-none stroke-current" strokeWidth="1.6"><path d="M1 11 11 1M3.5 1H11v7.5" /></svg>
    </span>
  );
}
