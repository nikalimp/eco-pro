"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Форма заявки. Без JavaScript — обычный POST на обработчик на хостинге (он вернёт на сайт с ?sent=1),
// с JavaScript — отправка без перезагрузки. Данные уходят на сервер в РФ: письмо + сообщение в Telegram-группу.
export function ContactFields({ dark = false }: { dark?: boolean }) {
  const input = cn(
    "h-12 w-full border px-4 text-base outline-none transition-colors focus:border-brand",
    dark ? "border-white/25 bg-white/5 text-white placeholder:text-white/40" : "border-border bg-background placeholder:text-muted-foreground/70",
  );
  return (
    <>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Ваше имя*</span>
        <input name="name" required autoComplete="name" className={input} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Номер телефона*</span>
        <input name="phone" type="tel" required autoComplete="tel" placeholder="+7" className={input} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Email*</span>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </label>
      <label className={cn("lf-consent flex items-start gap-3 text-sm", dark ? "text-white/80" : "text-muted-foreground")}>
        <input name="consent" type="checkbox" value="yes" required className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]" />
        <span>
          Даю <a href="/consent/" target="_blank" className="underline underline-offset-2">согласие на обработку персональных данных</a> в соответствии с{" "}
          <a href="/privacy-policy/" target="_blank" className="underline underline-offset-2">политикой конфиденциальности</a>
        </span>
      </label>
      {/* Ловушка для ботов: поле скрыто от людей */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    </>
  );
}

export async function sendLead(form: HTMLFormElement) {
  const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(String(res.status));
}

// layout="row" — горизонтальная форма: поля и кнопка в одну строку, согласие ниже (лид-магнит на главной, правки Ника 17.11)
export function LeadForm({ source = "Записаться на встречу", dark = false, submitLabel = "Отправить заявку", layout = "stack", buttonClassName }: { source?: string; dark?: boolean; submitLabel?: string; layout?: "stack" | "row"; buttonClassName?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Возврат с обработчика без JavaScript: /?sent=1
  useEffect(() => {
    const v = new URLSearchParams(location.search).get("sent");
    if (v === "1") setState("sent");
    else if (v === "0") setState("error");
  }, []);
  if (state === "sent")
    return (
      <div role="status" className="border border-current/20 p-6 text-center">
        <p className="text-xl font-bold">Заявка отправлена</p>
        <p className={cn("mt-2", dark ? "text-white/70" : "text-muted-foreground")}>Свяжемся в течение рабочего дня и согласуем удобное время для переговоров.</p>
      </div>
    );
  return (
    <form
      action={site.leadEndpoint}
      method="post"
      className={layout === "row" ? "grid items-end gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] [&>.lf-consent]:order-last lg:[&>.lf-consent]:col-span-4 [&>p]:order-last lg:[&>p]:col-span-4" : "space-y-4"}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        try {
          await sendLead(e.currentTarget);
          setState("sent");
          (window as unknown as { ym?: (...a: unknown[]) => void }).ym?.(site.metrikaId, "reachGoal", "lead");
        } catch {
          setState("error");
        }
      }}
    >
      <input type="hidden" name="source" value={source} />
      <ContactFields dark={dark} />
      <Button type="submit" size="lg" className={cn("w-full", layout === "row" && "lg:w-auto lg:px-8", buttonClassName)} disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : submitLabel}</Button>
      {state === "error" && (
        <p role="alert" className={cn("text-sm", dark ? "text-white" : "text-brand")}>
          Не получилось отправить. Позвоните <a href={`tel:${site.contacts.phone}`} className="underline">{site.contacts.phoneDisplay}</a> или напишите на <a href={`mailto:${site.contacts.email}`} className="underline">{site.contacts.email}</a>.
        </p>
      )}
    </form>
  );
}
