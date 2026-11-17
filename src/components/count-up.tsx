"use client";
import { useEffect, useRef, useState } from "react";

// Цифра растёт от нуля, когда блок попадает в экран (правки Ника 17.11).
// В HTML — итоговое значение: его видят поисковики, нейросети и пользователи без JavaScript.
// Если блок уже на экране или включено «уменьшение движения» — анимации нет.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d(?:[\d\s ]*\d)?)(.*)$/);
  const target = m ? parseInt(m[2].replace(/[\s ]/g, ""), 10) : NaN;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || Number.isNaN(target) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return; // уже видно — не дёргаем
    const fmt = (n: number) => `${m[1]}${n}${m[3]}`;
    setShown(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setShown(fmt(Math.round(target * (1 - Math.pow(1 - k, 3)))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>{shown}</span>;
}
