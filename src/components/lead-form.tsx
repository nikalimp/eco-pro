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
      <label className={cn("flex items-start gap-3 text-sm", dark ? "text-white/70" : "text-muted-foreground")}>
        <input name="consent" type="checkbox" value="yes" required className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]" />
        <span>
          Даю <a href="/soglasie/" target="_blank" className="underline underline-offset-2">согласие на обработку персональных данных</a> в соответствии с{" "}
          <a href="/politika-konfidencialnosti/" target="_blank" className="underline underline-offset-2">политикой конфиденциальности</a>
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

export function LeadForm({ source = "Записаться на встречу", dark = false, submitLabel = "Отправить заявку" }: { source?: string; dark?: boolean; submitLabel?: string }) {
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
      className="space-y-4"
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
      <Button type="submit" size="lg" className="w-full" disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : submitLabel}</Button>
      {state === "error" && (
        <p role="alert" className="text-sm text-brand">
          Не получилось отправить. Позвоните <a href={`tel:${site.contacts.phone}`} className="underline">{site.contacts.phoneDisplay}</a> или напишите на <a href={`mailto:${site.contacts.email}`} className="underline">{site.contacts.email}</a>.
        </p>
      )}
      <p className={cn("text-xs", dark ? "text-white/50" : "text-muted-foreground")}>*обязательные поля</p>
    </form>
  );
}
