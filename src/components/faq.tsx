import type { Faq } from "@/content/directions";

// FAQ на <details>: ответ есть в HTML и виден ботам, раскрытие работает без JavaScript.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-[var(--c-border)] border-y border-[var(--c-border)]">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <h3 className="ds-h5 !text-lg">{f.q}</h3>
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--c-border)] text-xl leading-none text-[var(--c-brand)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="ds-body mt-3 max-w-3xl">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
