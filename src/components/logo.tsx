import { cn } from "@/lib/utils";

// Логотип: название в красных квадратных скобках, набрано капс-гротеском Science Gothic (правки Ника 22.10)
export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("display whitespace-nowrap text-[28px] leading-none", inverse ? "text-white" : "text-foreground", className)} aria-label="ECO-PRO">
      <span className="text-brand" aria-hidden="true">[</span>ECO-PRO<span className="text-brand" aria-hidden="true">]</span>
    </span>
  );
}
