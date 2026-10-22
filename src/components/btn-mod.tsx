import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Квадратная кнопка с модулем-стрелкой (дизайн-система ECO-PRO: Button). Высота 64 px, sm — 48 px.
export function BtnMod({
  href, children, variant = "primary", size, icon = "right", className, external,
}: {
  href: string; children: React.ReactNode; variant?: "primary" | "outline" | "invert"; size?: "sm";
  icon?: "right" | "up"; className?: string; external?: boolean;
}) {
  const Icon = icon === "up" ? ArrowUpRight : ArrowRight;
  const cls = cn("btn-mod", `btn-mod-${variant}`, size === "sm" && "btn-mod-sm", className);
  const inner = (
    <>
      <span>{children}</span>
      <span className="mod" aria-hidden="true"><Icon strokeWidth={1.75} /></span>
    </>
  );
  if (external) return <a href={href} target="_blank" rel="noopener" className={cls}>{inner}</a>;
  if (href.startsWith("#") || href.startsWith("/#")) return <a href={href} className={cls}>{inner}</a>;
  return <Link href={href} className={cls}>{inner}</Link>;
}
