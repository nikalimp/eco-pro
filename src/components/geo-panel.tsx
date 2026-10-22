"use client";
import { useEffect, useState } from "react";

// Панель рядом с картой: название региона и города под курсором или фокусом. Без JS — текст по умолчанию.
export function GeoPanel({ defaultTitle, defaultText }: { defaultTitle: string; defaultText: string }) {
  const [cur, setCur] = useState<{ name: string; cities: string } | null>(null);
  useEffect(() => {
    const root = document.querySelector(".geo-map");
    if (!root) return;
    const on = (e: Event) => {
      const t = (e.target as Element).closest?.("[data-name]") as HTMLElement | null;
      if (t) setCur({ name: t.dataset.name!, cities: t.dataset.cities! });
    };
    const off = (e: Event) => {
      const t = (e.target as Element).closest?.("[data-name]");
      if (t) setCur(null);
    };
    root.addEventListener("pointerover", on);
    root.addEventListener("focusin", on);
    root.addEventListener("pointerout", off);
    root.addEventListener("focusout", off);
    return () => {
      root.removeEventListener("pointerover", on); root.removeEventListener("focusin", on);
      root.removeEventListener("pointerout", off); root.removeEventListener("focusout", off);
    };
  }, []);
  const n = cur ? cur.cities.split(", ").length : 0;
  return (
    <div className="flex flex-col border bg-background p-5 sm:p-6" aria-live="polite">
      <p className="label flex items-center gap-2 text-muted-foreground"><span className="size-2 bg-brand-solid" aria-hidden="true" />{cur ? `${n} ${n === 1 ? "город" : n < 5 ? "города" : "городов"}` : "Охват"}</p>
      <p className="display mt-4 text-3xl leading-[0.95]">{cur ? cur.name : defaultTitle}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{cur ? cur.cities : defaultText}</p>
    </div>
  );
}
