import Link from "next/link";
import { ChartNoAxesCombined, Cctv, ClipboardCheck, Radar, ScanEye } from "lucide-react";
import { directions } from "@/content/directions";
import { cn } from "@/lib/utils";

// Граф экосистемы: PRO-TEST в центре, четыре модуля по углам, от каждого к центру «течёт» сигнал.
// Описание модуля — по наведению или фокусу (Tab), на CSS. На телефоне — список с описаниями.
const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "PRO-TEST": Radar,
  "PRO-AI": ScanEye,
  "PRO-INC": ClipboardCheck,
  "PRO-DATA": ChartNoAxesCombined,
  "PRO-TECHNO": Cctv,
};
// Позиции модулей в процентах и сторона, куда раскрывается описание
const spots = [
  { x: 16, y: 20, k: "a", pop: "below" },
  { x: 84, y: 20, k: "b", pop: "below" },
  { x: 16, y: 80, k: "c", pop: "above" },
  { x: 84, y: 80, k: "d", pop: "above" },
] as const;

export function EcosystemGraph() {
  const core = directions[0];
  const mods = directions.slice(1, 5);
  const CoreIcon = icons[core.code];
  return (
    <div data-reveal>
      {/* Десктоп */}
      <div className="eco relative mx-auto hidden aspect-[2/1] max-w-5xl md:block">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
          {spots.map((s) => (
            <g key={s.k}>
              <line x1={s.x} y1={s.y / 2} x2="50" y2="25" className="eco-line" data-k={s.k} vectorEffect="non-scaling-stroke" />
              <line x1={s.x} y1={s.y / 2} x2="50" y2="25" className="eco-flow" data-k={s.k} vectorEffect="non-scaling-stroke" pathLength={100} />
            </g>
          ))}
        </svg>
        <span className="eco-ring" aria-hidden="true" />
        <span className="eco-ring eco-ring-2" aria-hidden="true" />

        <Link href={`/services/${core.slug}/`} className="eco-core group absolute left-1/2 top-1/2 z-10 flex size-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink p-6 text-center text-white">
          <CoreIcon className="size-8 text-brand" />
          <span className="mt-3 text-xl font-black">{core.code}</span>
          <span className="mt-1 text-sm text-white/70">{core.title}</span>
          <span className="eco-pop eco-pop-below w-72 text-left">{core.short}</span>
        </Link>

        {mods.map((m, i) => {
          const s = spots[i];
          const Icon = icons[m.code];
          return (
            <Link
              key={m.slug}
              href={`/services/${m.slug}/`}
              data-k={s.k}
              className="eco-node group absolute z-10 flex w-56 -translate-x-1/2 -translate-y-1/2 items-center gap-3 border bg-background p-4 text-left transition-colors hover:border-foreground focus-visible:border-foreground"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className="flex size-11 shrink-0 items-center justify-center bg-brand-bg text-brand"><Icon className="size-5" /></span>
              <span>
                <span className="block text-sm font-bold text-brand">{m.code}</span>
                <span className="block text-[15px] font-medium leading-tight">{m.title}</span>
              </span>
              <span className={cn("eco-pop w-72", s.pop === "below" ? "eco-pop-below" : "eco-pop-above")}>{m.short}</span>
            </Link>
          );
        })}
      </div>

      {/* Мобильные */}
      <ul className="space-y-3 md:hidden">
        {[core, ...mods].map((m, i) => {
          const Icon = icons[m.code];
          return (
            <li key={m.slug}>
              <Link href={`/services/${m.slug}/`} className={cn("flex gap-4 border p-5", i === 0 && "border-0 bg-ink text-white")}>
                <span className={cn("flex size-11 shrink-0 items-center justify-center", i === 0 ? "bg-white/10 text-brand" : "bg-brand-bg text-brand")}><Icon className="size-5" /></span>
                <span>
                  <span className="block text-sm font-bold text-brand">{m.code}{i === 0 && " · центр экосистемы"}</span>
                  <span className="block font-medium">{m.title}</span>
                  <span className={cn("mt-1 block text-sm leading-relaxed", i === 0 ? "text-white/70" : "text-muted-foreground")}>{m.short}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
