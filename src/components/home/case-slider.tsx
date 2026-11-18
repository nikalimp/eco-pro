"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Case } from "@/content/cases";
import { CornerArrow } from "@/components/corner-arrow";

// Кейсы для CEO — компактные карточки в ленте с привязкой (scroll-snap). Вся карточка — ссылка, красная обводка,
// стрелка ↗ справа от заголовка (правки Ника 18.11). Под лентой — ползунок как на nikalimp.ru: стрелки по краям,
// между ними полоса прокрутки. Все карточки — в HTML: без JavaScript ленту можно прокрутить вручную.
export function CaseSlider({ items }: { items: Case[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0); // 0…1000 — доля прокрутки

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPos(max > 0 ? Math.round((el.scrollLeft / max) * 1000) : 0);
    };
    on();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { el.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const smooth = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth") as ScrollBehavior;
  // Стрелки листают на одну карточку
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: smooth() });
  };
  // Ползунок двигает ленту напрямую
  const seek = (v: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: (v / 1000) * (el.scrollWidth - el.clientWidth), behavior: "auto" });
  };

  return (
    <div className="cs" role="region" aria-roledescription="карусель" aria-label="Кейсы для CEO">
      <div ref={track} className="cs-track" tabIndex={0}>
        {items.map((c, n) => (
          <Link key={c.id} href={`/cases/${c.id}/`} className="cs-slide ds-tile ds-tile-click group flex flex-col !border-[var(--c-brand)] p-6 sm:p-8" aria-label={`${n + 1} из ${items.length}: ${c.title}`}>
            <span className="flex items-start justify-between gap-4">
              <h3 className="ds-h4 group-hover:text-[var(--c-brand)]">{c.title}</h3>
              <CornerArrow className="mt-0.5" />
            </span>
            <span className="ds-small mt-2">{c.scale}</span>
            {c.metrics[0] && (
              <span className="mt-auto flex flex-col pt-8">
                <span className="ds-accent text-4xl font-normal tracking-tight sm:text-5xl">{c.metrics[0].value}</span>
                <span className="ds-small mt-1">{c.metrics[0].label}</span>
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="ds-wrap mt-6 flex items-center gap-4">
        <button type="button" onClick={() => step(-1)} disabled={pos <= 0} className="cs-btn" aria-label="Предыдущий кейс"><ArrowLeft className="size-5" /></button>
        <input type="range" min={0} max={1000} value={pos} onChange={(e) => seek(+e.target.value)} className="cs-range flex-1" aria-label="Прокрутка кейсов" />
        <button type="button" onClick={() => step(1)} disabled={pos >= 1000} className="cs-btn" aria-label="Следующий кейс"><ArrowRight className="size-5" /></button>
      </div>
    </div>
  );
}
