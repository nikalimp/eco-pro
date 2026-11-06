import { cn } from "@/lib/utils";

// Логотип по гайдлайну: название в красных квадратных скобках, текст чёрный (на тёмном — белый)
export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("whitespace-nowrap text-[22px] font-bold leading-none tracking-tight", inverse ? "text-white" : "text-foreground", className)} aria-label="ECO-PRO">
      <span className="text-brand" aria-hidden="true">[</span>ECO-PRO<span className="text-brand" aria-hidden="true">]</span>
    </span>
  );
}
