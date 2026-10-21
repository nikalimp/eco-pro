"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Появление блоков при прокрутке. Запускается на каждой странице, в том числе после перехода по ссылке без перезагрузки.
// Всё, что уже выше или внутри экрана в момент запуска, показывается сразу без анимации, поэтому при прокрутке вверх
// и при переходе по якорю пустот не остаётся.
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in", "in-now")); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          e.target.classList.add("in");
          if (e.boundingClientRect.top < 0) e.target.classList.add("in-now");
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.95) { el.classList.add("in"); if (r.bottom < 0) el.classList.add("in-now"); }
      else io.observe(el);
    }
    // Страховка: через 2,5 с показываем всё, что не успело появиться (быстрый скролл, печать, переводчик страницы)
    const t = setTimeout(() => document.querySelectorAll("[data-reveal]:not(.in)").forEach((e) => e.classList.add("in", "in-now")), 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [path]);
  return null;
}
