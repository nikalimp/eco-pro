"use client";
import { useEffect, useRef, useState } from "react";

// Подсказка над регионом карты (/3/, T62): название региона у курсора или над регионом в фокусе (Tab).
// Без JavaScript название остаётся в aria-label каждого региона.
export function GeoTip() {
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ name: string; x: number; y: number } | null>(null);
  useEffect(() => {
    const box = ref.current?.parentElement;
    if (!box) return;
    const at = (el: Element, x?: number, y?: number) => {
      const r = box.getBoundingClientRect();
      if (x === undefined || y === undefined) { const b = el.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2; }
      setTip({ name: (el as HTMLElement).dataset.name ?? "", x: x - r.left, y: y - r.top });
    };
    const move = (e: PointerEvent) => { const t = (e.target as Element).closest?.("[data-name]"); if (t) at(t, e.clientX, e.clientY); else setTip(null); };
    const focus = (e: FocusEvent) => { const t = (e.target as Element).closest?.("[data-name]"); if (t) at(t); };
    const hide = () => setTip(null);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", hide);
    box.addEventListener("focusin", focus);
    box.addEventListener("focusout", hide);
    return () => { box.removeEventListener("pointermove", move); box.removeEventListener("pointerleave", hide); box.removeEventListener("focusin", focus); box.removeEventListener("focusout", hide); };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="v3-geo-tip" data-on={tip ? "" : undefined} style={tip ? { left: tip.x, top: tip.y } : undefined}>
      {tip?.name}
    </div>
  );
}
