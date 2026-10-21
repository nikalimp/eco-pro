"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ContactFields, sendLead } from "./lead-form";
import { Button } from "./ui/button";

// Квиз «Брифинг для подготовки к интеграции». В HTML — все шаги одной формой (работает без JS),
// с JavaScript — по одному шагу с прогрессом. Ответы уходят в тот же обработчик, что и заявка.
export function Quiz() {
  const q = home.quiz;
  const total = q.steps.length + 1;
  const [step, setStep] = useState(0);
  const [js, setJs] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => setJs(true), []);

  const current = step < q.steps.length ? q.steps[step] : q.final;
  const answered = () => {
    if (step >= q.steps.length) return true;
    const f = formRef.current;
    return !!f && !!f.querySelector(`[name="${q.steps[step].name}"]:checked`);
  };

  if (state === "sent")
    return (
      <div role="status" className="mx-auto max-w-2xl rounded-xl border border-black p-8 text-center">
        <p className="text-2xl font-bold">Спасибо! Заявка отправлена</p>
        <p className="mt-3 text-muted-foreground">{q.final.hint.replace("Спасибо за ответы! ", "")}</p>
      </div>
    );

  return (
    <form
      ref={formRef}
      action={site.leadEndpoint}
      method="post"
      className={cn("mx-auto max-w-4xl", js && "js")}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        try {
          await sendLead(e.currentTarget);
          setState("sent");
          (window as unknown as { ym?: (...a: unknown[]) => void }).ym?.(site.metrikaId, "reachGoal", "quiz");
        } catch {
          setState("error");
        }
      }}
    >
      <input type="hidden" name="source" value="Квиз «Брифинг для подготовки к интеграции»" />
      {js && (
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>Шаг: {step + 1}/{total}</span>
          <div className="ml-4 h-1 flex-1 rounded-full bg-border"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
        </div>
      )}
      <div className="grid gap-6 rounded-xl border border-black bg-background p-6 sm:p-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-10">
          {q.steps.map((s, i) => (
            <fieldset key={s.name} className="quiz-step" data-active={!js || i === step ? "" : undefined}>
              <legend className="text-xl font-bold leading-snug">{s.q}</legend>
              <p className="mt-2 text-sm text-muted-foreground">{s.hint}</p>
              <div className={cn("mt-5 grid gap-2", s.type === "scale" ? "grid-cols-5" : "sm:grid-cols-2")}>
                {s.options.map((o) => (
                  <label key={o} className="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[15px] transition-colors hover:border-black has-[:checked]:border-brand has-[:checked]:bg-brand-bg">
                    <input type={s.type === "checkbox" ? "checkbox" : "radio"} name={s.name} value={o} className="size-4 shrink-0 accent-[var(--brand)]" />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <fieldset className="quiz-step space-y-4" data-active={!js || step === q.steps.length ? "" : undefined}>
            <legend className="text-xl font-bold leading-snug">{q.final.q}</legend>
            <p className="text-sm text-muted-foreground">{q.final.hint}</p>
            <ContactFields />
          </fieldset>
          {state === "error" && (
            <p role="alert" className="text-sm text-brand">Не получилось отправить. Позвоните {site.contacts.phoneDisplay} или напишите на {site.contacts.email}.</p>
          )}
          <div className="flex flex-wrap gap-3">
            {js && step > 0 && <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Назад</Button>}
            {js && step < q.steps.length ? (
              <Button type="button" onClick={() => answered() && setStep(step + 1)}>Далее</Button>
            ) : (
              <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : "Узнать результат"}</Button>
            )}
          </div>
        </div>
        <aside className="flex flex-col gap-4 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="flex items-center gap-3">
            <Image src={q.host.photo} alt={q.host.name} width={56} height={56} className="size-14 rounded-full object-cover" />
            <div>
              <p className="font-medium">{q.host.name}</p>
              <p className="text-sm text-muted-foreground">{q.host.role}</p>
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{current.note}</p>
        </aside>
      </div>
    </form>
  );
}
