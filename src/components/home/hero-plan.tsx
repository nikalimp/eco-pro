"use client";
import { useEffect, useRef, useState } from "react";
import { HeroPlan, type PlanZone } from "./iso";

// Интерактивный чертёж первого экрана (правки Ника 17.11): без фона-сетки, зоны подсвечиваются при наведении и по клику.
// Пока посетитель не трогает чертёж, шаги переключаются сами. При «уменьшении движения» автопереключения нет.
// Подписи шагов — в HTML: их читают поисковики, нейросети и экранные читалки.
const steps: { zone: PlanZone; title: string; text: string }[] = [
  { zone: "cams", title: "Камеры на объекте", text: "Подключаемся к уже установленным камерам и системам, без нового оборудования." },
  { zone: "event", title: "Отклонение", text: "ИИ или оператор замечает нарушение: например, возврат без чека на кассе." },
  { zone: "sc", title: "Центр Правды", text: "Оператор-аналитик проверяет сигнал 24/7 и запускает реакцию на месте." },
  { zone: "ceo", title: "Руководитель", text: "Видит исполнение решений в отчёте и KPI, а не в формальных отчётах с мест." },
];

export function HeroPlanInteractive() {
  const [active, setActive] = useState<PlanZone>("cams");
  const touched = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (touched.current) return;
      setActive((z) => steps[(steps.findIndex((s) => s.zone === z) + 1) % steps.length].zone);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const pick = (z: PlanZone) => { touched.current = true; setActive(z); };

  return (
    <figure className="hp grid w-full justify-items-center" onMouseLeave={() => { touched.current = false; }}>
      <div className="iso-bare w-full max-w-[40rem]"><HeroPlan bare active={active} onZone={pick} className="h-auto w-full" /></div>
      <figcaption className="w-full max-w-[40rem]">
        <ol className="grid grid-cols-4 gap-2 border-t border-[var(--c-border)]">
          {steps.map((s, i) => (
            <li key={s.zone}>
              <button type="button" aria-pressed={active === s.zone} onClick={() => pick(s.zone)} onFocus={() => pick(s.zone)}
                className={`hp-step w-full pt-3 text-left text-[13px] font-medium leading-tight ${active === s.zone ? "is-on" : ""}`}>
                <span className="ds-label block">{String(i + 1).padStart(2, "0")}</span>{s.title}
              </button>
            </li>
          ))}
        </ol>
        {steps.map((s) => <p key={s.zone} className="ds-small mt-3 min-h-[3em]" hidden={active !== s.zone}>{s.text}</p>)}
      </figcaption>
    </figure>
  );
}
