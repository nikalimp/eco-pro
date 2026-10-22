import { cn } from "@/lib/utils";

// Схема «Место в контуре PRO-TEST»: 7 шагов цикла, шаги направления — чёрные, шаг 6 — роль руководителя.
// Вёрстка кодом (SVG на десктопе, список на мобильных), анимация — CSS, при reduced-motion статична.
export const contourSteps = [
  "Сбор данных",
  "Уведомление",
  "Реакция",
  "Анализ",
  "Визуализация",
  "Принятие решения",
  "Сбор данных об исполнении",
];

const W = 1200;
const PW = 236; // ширина «таблетки»
const PH = 64;
const X = [150, 450, 750, 1050];
const Y1 = 64;
const Y2 = 236;
// Позиции шагов: верхний ряд 1→4 слева направо, нижний 5→7 справа налево
const pos: Record<number, [number, number]> = { 1: [X[0], Y1], 2: [X[1], Y1], 3: [X[2], Y1], 4: [X[3], Y1], 5: [X[3], Y2], 6: [X[2], Y2], 7: [X[1], Y2] };
const loop = `M${X[0]},${Y1} H${X[3]} C${X[3] + 150},${Y1} ${X[3] + 150},${Y2} ${X[3]},${Y2} H${X[0]} C${X[0] - 150},${Y2} ${X[0] - 150},${Y1} ${X[0]},${Y1} Z`;

function Label({ n, x, y, on, role }: { n: number; x: number; y: number; on: boolean; role: boolean }) {
  const words = contourSteps[n - 1];
  const lines = n === 7 ? ["Сбор данных", "об исполнении"] : n === 6 ? ["Принятие", "решения"] : [words];
  const fill = on ? "var(--background)" : role ? "var(--brand)" : "var(--foreground)";
  return (
    <text x={x + 14} y={y} textAnchor="middle" fontSize="19" fontWeight={on ? 600 : 500} fill={fill} dominantBaseline="middle">
      {lines.map((l, i) => (
        <tspan key={l} x={x + 14} dy={lines.length === 1 ? 0 : i === 0 ? -11 : 22}>{l}</tspan>
      ))}
    </text>
  );
}

export function ContourScheme({ code, active }: { code: string; active: number[] }) {
  const isOn = (n: number) => active.includes(n);
  return (
    <figure data-reveal className="contour mt-10" aria-label={`Схема: место ${code} в контуре PRO-TEST`}>
      {/* Десктоп */}
      <svg viewBox={`0 0 ${W} 300`} className="hidden w-full md:block" role="img" aria-label={`${code} закрывает шаги: ${active.map((n) => contourSteps[n - 1]).join(", ")}. Решение принимает руководитель.`}>
        <path d={loop} fill="none" stroke="var(--border)" strokeWidth="2" />
        <path d={loop} fill="none" className="contour-flow" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" pathLength={1000} />
        <text x="22" y={(Y1 + Y2) / 2} fontSize="13" letterSpacing="2.5" fill="var(--muted-foreground)" dominantBaseline="middle" transform={`rotate(-90 22 ${(Y1 + Y2) / 2})`} textAnchor="middle">НЕПРЕРЫВНЫЙ ЦИКЛ</text>
        <text x={pos[6][0]} y={Y2 - PH / 2 - 18} textAnchor="middle" fontSize="14" fontWeight="700" letterSpacing="2.5" fill="var(--brand)">ВАША РОЛЬ</text>
        {Object.entries(pos).map(([k, [x, y]]) => {
          const n = Number(k);
          const on = isOn(n);
          const role = n === 6;
          return (
            <g key={n} className={cn("contour-node", on && "is-on")} style={{ "--i": n } as React.CSSProperties}>
              <rect
                x={x - PW / 2}
                y={y - PH / 2}
                width={PW}
                height={PH}
                rx={0}
                fill={on ? "var(--foreground)" : "var(--background)"}
                stroke={role ? "var(--brand)" : on ? "var(--foreground)" : "var(--border)"}
                strokeWidth={role ? 2 : 1.5}
                strokeDasharray={role ? "6 5" : undefined}
                className={role ? "contour-role" : undefined}
              />
              <text x={x - PW / 2 + 30} y={y} fontSize="16" fill={on ? "color-mix(in oklch, var(--background) 55%, transparent)" : role ? "var(--brand)" : "var(--muted-foreground)"} dominantBaseline="middle">{n}</text>
              <Label n={n} x={x} y={y} on={on} role={role} />
            </g>
          );
        })}
      </svg>

      {/* Мобильные */}
      <ol className="space-y-2 md:hidden">
        {contourSteps.map((s, i) => {
          const n = i + 1;
          const on = isOn(n);
          const role = n === 6;
          return (
            <li key={s} data-reveal style={{ "--i": i } as React.CSSProperties} className={cn("relative flex items-center gap-3 border px-5 py-3 text-[15px] font-medium", on && "border-foreground bg-foreground text-background", role && "border-2 border-dashed border-brand text-brand")}>
              <span className={cn("text-sm", on ? "text-background/55" : "text-muted-foreground", role && "text-brand")}>{n}</span>
              {s}
              {role && <span className="ml-auto text-[11px] font-bold tracking-[0.12em]">ВАША РОЛЬ</span>}
            </li>
          );
        })}
        <li className="pl-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">↻ непрерывный цикл</li>
      </ol>

      <figcaption className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><i className="inline-block h-3 w-6 bg-foreground" aria-hidden="true" />Закрывает {code}</span>
        <span className="flex items-center gap-2"><i className="inline-block h-3 w-6 border border-dashed border-brand" aria-hidden="true" />Решение руководителя</span>
        <span className="flex items-center gap-2"><i className="inline-block h-3 w-6 border" aria-hidden="true" />Другие модули экосистемы</span>
      </figcaption>
    </figure>
  );
}
