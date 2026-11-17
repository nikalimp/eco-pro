"use client";
import { useState } from "react";
import { HeroPlan, type PlanZone } from "./iso";

// Интерактивный чертёж первого экрана (правки Ника 17.11): без фона-сетки и без табов.
// При наведении на зону (камеры, событие, ситуационный центр, руководитель) она подсвечивается и у курсора всплывает подсказка.
// Подписи шагов дублируются списком для экранных читалок, поисковиков и нейросетей.
const steps: { zone: PlanZone; title: string; text: string }[] = [
  { zone: "cams", title: "Камеры на объекте", text: "Подключаемся к уже установленным камерам и системам, без нового оборудования." },
  { zone: "event", title: "Отклонение", text: "ИИ или оператор замечает нарушение: например, возврат без чека на кассе." },
  { zone: "sc", title: "Центр Правды", text: "Оператор-аналитик проверяет сигнал 24/7 и запускает реакцию на месте." },
  { zone: "ceo", title: "Руководитель", text: "Видит исполнение решений в отчёте и KPI, а не в формальных отчётах с мест." },
];

export function HeroPlanInteractive() {
  const [zone, setZone] = useState<PlanZone | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, flip: false });
  const step = steps.find((s) => s.zone === zone);

  return (
    <figure className="hp relative grid w-full justify-items-center"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left;
        setPos({ x, y: e.clientY - r.top, flip: x > r.width * 0.6 });
      }}>
      <div className="iso-bare w-full max-w-[40rem]"><HeroPlan bare active={zone} onZone={setZone} className="h-auto w-full" /></div>
      {step && (
        <div className="hp-tip" role="tooltip" style={{ left: pos.x, top: pos.y, translate: pos.flip ? "calc(-100% - 16px) 16px" : "16px 16px" }}>
          <p className="text-[15px] font-medium text-[var(--c-text)]">{step.title}</p>
          <p className="ds-small mt-1">{step.text}</p>
        </div>
      )}
      <figcaption className="sr-only">
        <ol>{steps.map((s) => <li key={s.zone}>{s.title}: {s.text}</li>)}</ol>
      </figcaption>
    </figure>
  );
}
