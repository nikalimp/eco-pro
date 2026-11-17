"use client";
import { useState } from "react";
import type { Case, CaseGroup } from "@/content/cases";
import { CaseCard } from "./blocks";

// Кейсы одной сеткой, категории переключаются табами (правки Ника 17.11).
// Все карточки — в HTML: таб только скрывает лишние, поисковики и нейросети видят все кейсы.
export function CaseTabs({ items, groups }: { items: Case[]; groups: { id: CaseGroup; title: string; text: string }[] }) {
  const [g, setG] = useState<CaseGroup | "all">("all");
  const tabs = [{ id: "all" as const, title: "Все кейсы", text: "" }, ...groups];
  const current = groups.find((x) => x.id === g);
  return (
    <>
      <div role="tablist" aria-label="Категории кейсов" className="flex flex-wrap justify-center gap-2">
        {tabs.map((t) => {
          const n = t.id === "all" ? items.length : items.filter((c) => c.group === t.id).length;
          const on = g === t.id;
          return (
            <button key={t.id} type="button" role="tab" aria-selected={on} aria-controls="case-grid" onClick={() => setG(t.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-[var(--c-text)] bg-[var(--c-text)] text-white" : "border-[var(--c-border-strong)] hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]"}`}>
              {t.title} <span className={on ? "text-white/60" : "text-[var(--c-text-2)]"}>{n}</span>
            </button>
          );
        })}
      </div>
      <p className="ds-body mx-auto mt-6 min-h-[1.6em] max-w-2xl text-center" aria-live="polite">{current?.text}</p>
      <div id="case-grid" role="tabpanel" className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => <div key={c.id} hidden={g !== "all" && c.group !== g} className="grid">{<CaseCard c={c} />}</div>)}
      </div>
    </>
  );
}
