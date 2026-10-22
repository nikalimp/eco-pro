"use client";
import { useEffect, useState } from "react";

const plural = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "город" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "города" : "городов");

// Панель рядом с картой: регион или город под курсором или фокусом. Без JS — текст по умолчанию.
export function GeoPanel({ defaultTitle, defaultText }: { defaultTitle: string; defaultText: string }) {
  const [cur, setCur] = useState<{ name: string; cities: string; kind?: string } | null>(null);
  useEffect(() => {
    const root = document.querySelector(".geo-map");
    if (!root) return;
    const on = (e: Event) => {
      const t = (e.target as Element).closest?.("[data-name]") as HTMLElement | null;
      if (t) setCur({ name: t.dataset.name!, cities: t.dataset.cities ?? "", kind: t.dataset.kind });
    };
    const off = (e: Event) => {
      if ((e.target as Element).closest?.("[data-name]")) setCur(null);
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
  const n = cur?.cities ? cur.cities.split(", ").length : 0;
  const label = !cur ? "Охват" : cur.kind === "город" ? "Город проекта" : n ? `${n} ${plural(n)} проектов` : "Регион присутствия";
  return (
    <div className="flex flex-col border bg-background p-5 sm:p-6" aria-live="polite">
      <p className="label flex items-center gap-2 text-muted-foreground"><span className="size-2 bg-brand-solid" aria-hidden="true" />{label}</p>
      <p className="display mt-4 text-3xl leading-[0.95]">{cur ? cur.name : defaultTitle}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{cur ? cur.cities : defaultText}</p>
    </div>
  );
}
