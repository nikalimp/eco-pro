"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Case } from "@/content/cases";

// Кейсы для CEO — слайды-карточки шириной в контейнер, соседняя карточка видна у края (правки Ника 17.11). Прокрутка с привязкой (scroll-snap):
// листается пальцем, колесом и стрелками. Все слайды — в HTML, без JavaScript их можно прокрутить вручную.
export function CaseSlider({ items }: { items: Case[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const on = () => {
      const kids = [...el.children] as HTMLElement[];
      // В конце ленты активна последняя карточка: на десктопе видно две, и до последней прокрутка не доходит
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) return setI(kids.length - 1);
      const x = el.scrollLeft + kids[0].offsetLeft;
      setI(kids.reduce((best, c, n) => (Math.abs(c.offsetLeft - x) < Math.abs(kids[best].offsetLeft - x) ? n : best), 0));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    // Из конца ленты «вперёд» возвращает к первой карточке
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    const k = atEnd && n > i ? 0 : (n + items.length) % items.length;
    const kids = el.children as HTMLCollectionOf<HTMLElement>;
    el.scrollTo({ left: kids[k].offsetLeft - kids[0].offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className="cs" role="region" aria-roledescription="карусель" aria-label="Кейсы для CEO">
      <div ref={track} className="cs-track" tabIndex={0}>
        {items.map((c, n) => (
          <article key={c.id} className="cs-slide ds-tile" aria-roledescription="слайд" aria-label={`${n + 1} из ${items.length}: ${c.title}`}>
            <div className="flex h-full flex-col gap-10 p-6 sm:p-10">
              <div className="flex flex-col">
                <p className="ds-label">{c.tag}</p>
                <h3 className="ds-h3 mt-4">{c.title}</h3>
                <p className="ds-small mt-2">{c.scale}</p>
                <dl className="mt-auto grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2">
                  {c.metrics.slice(0, 4).map((m, k) => (
                    <div key={m.label} className="flex flex-col-reverse justify-end">
                      <dt className="ds-small mt-1">{m.label}</dt>
                      <dd className={`text-3xl font-normal tracking-tight sm:text-4xl ${k === 0 ? "ds-accent" : ""}`}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-col">
                <table className="w-full text-left">
                  <thead><tr className="ds-label border-b border-[var(--c-border)]"><th scope="col" className="pb-2 font-normal">Критерии оценки для CEO</th><th scope="col" className="pb-2 text-right font-normal">Что изменилось</th></tr></thead>
                  <tbody>
                    {c.ceo?.map((m) => (
                      <tr key={m.k} className="border-b border-[var(--c-border)] align-top">
                        <th scope="row" className="ds-h5 w-[40%] py-3 pr-4 font-medium">{m.k}</th>
                        <td className="ds-body py-3 text-right text-[var(--c-text)]">{m.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href={`/cases/${c.id}/`} className="mt-8 inline-flex w-fit items-center gap-2 text-[15px] font-medium hover:text-[var(--c-brand)]">Читать кейс<ArrowRight className="size-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="ds-wrap mt-6 flex items-center justify-between gap-6">
        <p className="ds-label tabular-nums" aria-live="polite">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
        <div className="cs-dots hidden flex-1 gap-1 sm:flex" aria-hidden="true">{items.map((c, n) => <i key={c.id} className={n === i ? "is-on" : undefined} />)}</div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(i - 1)} className="cs-btn" aria-label="Предыдущий кейс"><ArrowLeft className="size-5" /></button>
          <button type="button" onClick={() => go(i + 1)} className="cs-btn" aria-label="Следующий кейс"><ArrowRight className="size-5" /></button>
        </div>
      </div>
    </div>
  );
}
