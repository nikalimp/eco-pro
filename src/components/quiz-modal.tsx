import { X } from "lucide-react";
import { home } from "@/content/home";
import { Quiz } from "./quiz";

// Брифинг «Стратегия интеграции» в попапе (правки Ника 17.11). Окно на CSS :target, как «Онлайн-встреча»:
// открывается ссылкой #brifing, работает без JavaScript. Вопросы квиза остаются в HTML страницы.
export const quizHref = "#brifing";

export function QuizModal() {
  const q = home.quiz;
  return (
    <div id="brifing" role="dialog" aria-modal="true" aria-labelledby="brifing-title" className="invisible fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 opacity-0 transition-opacity target:visible target:opacity-100 sm:items-center">
      <a href="#" aria-label="Закрыть" className="absolute inset-0" tabIndex={-1} />
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto bg-[var(--c-layer)] p-5 shadow-2xl sm:p-10">
        <a href="#" aria-label="Закрыть окно" className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full hover:bg-white"><X className="size-5" /></a>
        <p className="ds-eyebrow">{q.eyebrow}</p>
        <p id="brifing-title" className="ds-h3 mt-3 max-w-3xl pr-10">{q.title}</p>
        <p className="ds-body mt-3 max-w-2xl">{q.text}</p>
        <div className="mt-8"><Quiz /></div>
      </div>
    </div>
  );
}
