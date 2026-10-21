import { X } from "lucide-react";
import { LeadForm } from "./lead-form";

// Окно «Онлайн-встреча» на CSS :target — открывается ссылкой #vstrecha на любой странице, работает без JavaScript
export function MeetingModal() {
  return (
    <div id="vstrecha" role="dialog" aria-modal="true" aria-labelledby="vstrecha-title" className="invisible fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 opacity-0 transition-opacity target:visible target:opacity-100 sm:items-center">
      <a href="#" aria-label="Закрыть" className="absolute inset-0" tabIndex={-1} />
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl sm:p-8">
        <a href="#" aria-label="Закрыть окно" className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full hover:bg-card"><X className="size-5" /></a>
        <p id="vstrecha-title" className="text-2xl font-bold">Онлайн-встреча</p>
        <p className="mb-6 mt-2 text-muted-foreground">Свяжемся в течение рабочего дня и согласуем удобное время для переговоров</p>
        <LeadForm source="Окно «Онлайн-встреча»" />
      </div>
    </div>
  );
}
