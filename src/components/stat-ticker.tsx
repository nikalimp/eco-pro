"use client";
import { useEffect, useRef, useState } from "react";

// Число «набегает» от нуля, когда попадает в экран. Без JavaScript и при reduced-motion — сразу итоговое значение.
export function StatTicker({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!m || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(m[1]);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setShown(Math.round(target * (1 - Math.pow(1 - k, 3))) + m[2]);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span ref={ref}>{shown}</span>;
}
