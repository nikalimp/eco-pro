import { cn } from "@/lib/utils";

// Круговая схема «Место в контуре ситуационного центра» в чертёжной манере (правки Ника 17.11): тонкие линии,
// шкала по кругу, моноширинные подписи. Стоит справа в первом экране страницы направления.
// 7 шагов цикла: шаги направления — красные, шаг 6 — роль руководителя (пунктир). На телефоне — список.
export const contourSteps = [
  "Сбор данных",
  "Уведомление",
  "Реакция",
  "Анализ",
  "Визуализация",
  "Принятие решения",
  "Сбор данных об исполнении",
];

const W = 720, H = 600, CX = 360, CY = 300, R = 196;
const lines = (n: number) => (n === 7 ? ["СБОР ДАННЫХ", "ОБ ИСПОЛНЕНИИ"] : n === 6 ? ["ПРИНЯТИЕ", "РЕШЕНИЯ"] : [contourSteps[n - 1].toUpperCase()]);

export function ContourScheme({ code, active, className }: { code: string; active: number[]; className?: string }) {
  const isOn = (n: number) => active.includes(n);
  const at = (n: number, r: number) => {
    const a = (-90 + ((n - 1) * 360) / 7) * (Math.PI / 180);
    return [CX + r * Math.cos(a), CY + r * Math.sin(a), Math.cos(a), Math.sin(a)] as const;
  };
  return (
    <figure className={cn("contour w-full", className)} aria-label={`Схема: место ${code} в контуре ситуационного центра`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full md:block" role="img" aria-label={`${code} закрывает шаги: ${active.map((n) => contourSteps[n - 1]).join(", ")}. Решение принимает руководитель.`}>
        {/* шкала по кругу, как на чертеже */}
        <g stroke="var(--c-border-strong)" strokeWidth="1">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i * 5 * Math.PI) / 180, r1 = R + 14, r2 = R + (i % 6 === 0 ? 24 : 19);
            return <line key={i} x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)} x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)} strokeOpacity={i % 6 === 0 ? 0.9 : 0.45} />;
          })}
        </g>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--c-border-strong)" strokeWidth="1.2" />
        <circle cx={CX} cy={CY} r={R - 70} fill="none" stroke="var(--c-border)" strokeDasharray="3 5" />
        <line x1={CX - R - 30} y1={CY} x2={CX + R + 30} y2={CY} stroke="var(--c-border)" strokeDasharray="2 6" />
        <line x1={CX} y1={CY - R - 30} x2={CX} y2={CY + R + 30} stroke="var(--c-border)" strokeDasharray="2 6" />
        {/* бегущая точка — сигнал идёт по циклу */}
        <g className="contour-orbit"><circle cx={CX} cy={CY - R} r="5" fill="var(--c-brand)" /></g>

        <text x={CX} y={CY - 14} textAnchor="middle" className="contour-code">{code}</text>
        <text x={CX} y={CY + 18} textAnchor="middle" className="contour-mono">НЕПРЕРЫВНЫЙ ЦИКЛ</text>
        <text x={CX} y={CY + 36} textAnchor="middle" className="contour-mono">СИТУАЦИОННОГО ЦЕНТРА</text>

        {contourSteps.map((_, i) => {
          const n = i + 1, on = isOn(n), role = n === 6;
          const [x, y] = at(n, R);
          const [lx, ly, cos, sin] = at(n, R + 46);
          const anchor = cos > 0.25 ? "start" : cos < -0.25 ? "end" : "middle";
          const ls = role ? [...lines(n), "ВАША РОЛЬ"] : lines(n);
          const y0 = ly + (sin < -0.5 ? -(ls.length - 1) * 16 : sin > 0.5 ? 10 : 4 - ((ls.length - 1) * 16) / 2);
          return (
            <g key={n}>
              <circle cx={x} cy={y} r="22" fill={on ? "var(--c-brand)" : "#fff"} stroke={role ? "var(--c-brand)" : on ? "var(--c-brand)" : "var(--c-border-strong)"} strokeWidth={role ? 1.6 : 1.2} strokeDasharray={role ? "4 4" : undefined} className={role ? "contour-role" : undefined} />
              <text x={x} y={y + 5} textAnchor="middle" className="contour-num" fill={on ? "#fff" : role ? "var(--c-brand)" : "var(--c-text-2)"}>{String(n).padStart(2, "0")}</text>
              <text x={lx} y={y0} textAnchor={anchor} className={cn("contour-label", on && "is-on", role && "is-role")}>
                {ls.map((l, k) => <tspan key={l} x={lx} dy={k === 0 ? 0 : 16} className={k === 2 ? "contour-you" : undefined}>{l}</tspan>)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Телефон */}
      <ol className="space-y-2 md:hidden">
        {contourSteps.map((s, i) => {
          const n = i + 1, on = isOn(n), role = n === 6;
          return (
            <li key={s} className={cn("flex items-center gap-3 border border-[var(--c-border)] bg-white px-4 py-3 text-[15px] font-medium", on && "border-[var(--c-brand)] bg-[var(--c-brand)] text-white", role && "border-dashed border-[var(--c-brand)] text-[var(--c-brand)]")}>
              <span className={cn("font-mono text-xs", on ? "text-white/70" : "text-[var(--c-text-2)]", role && "text-[var(--c-brand)]")}>{String(n).padStart(2, "0")}</span>
              {s}
              {role && <span className="ml-auto font-mono text-[11px] tracking-[0.12em]">ВАША РОЛЬ</span>}
            </li>
          );
        })}
      </ol>

      <figcaption className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--c-text-2)]">
        <span className="flex items-center gap-2"><i className="inline-block size-3 rounded-full bg-[var(--c-brand)]" aria-hidden="true" />Закрывает {code}</span>
        <span className="flex items-center gap-2"><i className="inline-block size-3 rounded-full border border-dashed border-[var(--c-brand)]" aria-hidden="true" />Решение руководителя</span>
        <span className="flex items-center gap-2"><i className="inline-block size-3 rounded-full border border-[var(--c-border-strong)]" aria-hidden="true" />Другие направления</span>
      </figcaption>
    </figure>
  );
}
