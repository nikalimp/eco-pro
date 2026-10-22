"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Кадр видоискателя камеры (дизайн-система ECO-PRO: Viewfinder): уголки, REC, плашки, таймкод, перекрестие
// и красная рамка фокуса. Рамка обходит элементы [data-focus] внутри кадра (подпись — значение атрибута)
// и следует за курсором. Без JavaScript и при reduced-motion — статичный кадр. Всё декоративное — aria-hidden.
export function Viewfinder({
  children, className, cam = "CAM 01", place, chips = ["AI", "4K"], fps = "25FPS", corner = "СЦ · 24/7", focus = true, cross = false, timecode = true,
}: {
  children: React.ReactNode; className?: string; cam?: string; place?: string; chips?: string[]; fps?: string;
  corner?: string; focus?: boolean; cross?: boolean; timecode?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [tc, setTc] = useState("00:00:20:05");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 20 * 25 + 5;
    const p = (n: number) => String(n).padStart(2, "0");
    const t = timecode ? setInterval(() => {
      frame++;
      const s = Math.floor(frame / 25);
      setTc(`00:${p(Math.floor(s / 60))}:${p(s % 60)}:${p(frame % 25)}`);
    }, 40) : undefined;

    let manual = false, i = 0;
    const box = el.querySelector<HTMLElement>(".vf-focus");
    const place = (x: number, y: number, w: number, h: number, label: string) => {
      if (!box) return;
      box.style.setProperty("--fx", `${x}px`); box.style.setProperty("--fy", `${y}px`);
      box.style.setProperty("--fw", `${w}px`); box.style.setProperty("--fh", `${h}px`);
      setTag(label);
    };
    const targets = () => Array.from(el.querySelectorAll<HTMLElement>("[data-focus]"));
    const go = () => {
      const list = targets();
      if (!list.length || manual) return;
      const tEl = list[i++ % list.length];
      const r = tEl.getBoundingClientRect(), o = el.getBoundingClientRect();
      place(r.left - o.left + r.width / 2, r.top - o.top + r.height / 2, r.width + 16, r.height + 16, tEl.dataset.focus || "");
    };
    go();
    const cycle = focus ? setInterval(go, 2400) : undefined;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      manual = true;
      const o = el.getBoundingClientRect();
      place(e.clientX - o.left, e.clientY - o.top, 140, 96, "Объект · 0,97");
    };
    const leave = () => { manual = false; go(); };
    if (focus) { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave); }
    return () => { clearInterval(t); clearInterval(cycle); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [focus, timecode]);

  return (
    <div ref={root} className={cn("vf", className)}>
      {children}
      <span className="vf-corner vf-tl" aria-hidden="true" /><span className="vf-corner vf-tr" aria-hidden="true" />
      <span className="vf-corner vf-bl" aria-hidden="true" /><span className="vf-corner vf-br" aria-hidden="true" />
      <div className="vf-hud tech left-4 top-4 sm:left-6 sm:top-5" aria-hidden="true">
        <span className="rec">REC</span>
        <span className="text-muted-foreground">{cam}{place ? ` · ${place}` : ""}</span>
      </div>
      <div className="vf-hud tech vf-hide-sm right-4 top-4 sm:right-6 sm:top-5" aria-hidden="true">
        {chips.map((c, n) => <span key={c} className={cn("chip", n === 0 && "chip-fill")}>{c}</span>)}
        <span>{fps}</span>
      </div>
      {timecode && <div className="vf-hud label vf-hide-sm bottom-4 left-1/2 -translate-x-1/2 tabular-nums sm:bottom-5" aria-hidden="true">{tc}</div>}
      <div className="vf-hud tech bottom-4 right-4 sm:bottom-5 sm:right-6" aria-hidden="true">{corner}</div>
      {cross && <span className="vf-cross left-1/2 top-1/2" aria-hidden="true" />}
      {focus && (
        <span className="vf-focus" aria-hidden="true">
          {tag && <span className="vf-focus-tag tech">{tag}</span>}
        </span>
      )}
    </div>
  );
}
