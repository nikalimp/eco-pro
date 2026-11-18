import { ArrowDown, ArrowRight, Info } from "lucide-react";

// Этапы пилота в лид-магните (правки Ника 18.11): плашки в ряд, между ними стрелки, у каждой — иконка «i».
// Подробное описание всплывает при наведении и при фокусе с клавиатуры (Tab) или касании.
// Текст подсказки всегда в HTML: его читают поисковики, нейросети и экранные читалки (aria-describedby).
export function PilotSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:justify-center" aria-label="Этапы работы">
      {steps.map((st, i) => {
        const id = `pilot-step-${i + 1}`;
        return (
          <li key={st.title} className="contents">
            {i > 0 && (
              <span className="flex justify-center text-white/70" aria-hidden="true">
                <ArrowRight className="hidden size-5 lg:block" /><ArrowDown className="size-5 lg:hidden" />
              </span>
            )}
            <span className="group relative flex items-center justify-between gap-3 border border-white/40 bg-white/10 px-4 py-3 lg:justify-start">
              <span className="text-[15px] font-medium"><span className="text-white/70">{i + 1}.</span> {st.title}</span>
              <span tabIndex={0} aria-describedby={id} aria-label={`Подробнее: ${st.title}`} className="grid size-6 shrink-0 cursor-help place-items-center rounded-full text-white/80 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white">
                <Info className="size-4" aria-hidden="true" />
              </span>
              <span id={id} role="tooltip" className="pointer-events-none invisible absolute left-0 right-0 top-full z-20 mt-2 bg-white p-4 text-left text-sm leading-relaxed text-[var(--c-text)] opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 lg:left-1/2 lg:right-auto lg:w-72 lg:-translate-x-1/2">
                {st.text}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
