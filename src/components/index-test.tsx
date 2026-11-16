"use client";
import { useState } from "react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Button } from "./ds";

// Тест «Индекс управляемости CEO» (идея 1 документа итерации v3, одобрено 16.11). Самодиагностика, не расчёт индекса ЛК.
// Вопросы и варианты — в HTML (видны без JavaScript); счёт — в браузере, ответы никуда не отправляются.
export function IndexTest() {
  const t = home.indexTest;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length === t.questions.length;
  const max = t.questions.length * (t.scale.length - 1);
  const score = Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / max) * 100);
  const result = [...t.results].reverse().find((r) => score >= r.min)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <ol className="grid gap-3">
        {t.questions.map((q, i) => (
          <li key={q} className="ds-tile p-5">
            <fieldset>
              <legend className="ds-h5 flex gap-3"><span className="ds-index shrink-0">{String(i + 1).padStart(2, "0")}</span>{q}</legend>
              <div className="mt-4 flex flex-wrap gap-2 pl-8">
                {t.scale.map((label, v) => (
                  <label key={label} className="idx-opt">
                    <input type="radio" name={`idx-${i}`} value={v} className="sr-only" onChange={() => setAnswers((a) => ({ ...a, [i]: v }))} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="ds-tile p-7 sm:p-9">
          <p className="ds-eyebrow">ваш результат</p>
          {done ? (
            <>
              <p className="ds-num mt-6">{score}<span className="text-[0.5em]">%</span></p>
              <p className="ds-h4 mt-4">{result.title}</p>
              <p className="ds-body mt-3">{result.text}</p>
            </>
          ) : (
            <>
              <p className="ds-num mt-6 text-[var(--c-border-strong)]">{Object.keys(answers).length}/{t.questions.length}</p>
              <p className="ds-body mt-4">Ответьте на все вопросы — покажем оценку и что с ней делать.</p>
            </>
          )}
          <p className="ds-small mt-6 border-t border-[var(--c-border)] pt-5">Это самодиагностика. Индекс управляемости в личном кабинете считается по данным ситуационного центра.</p>
          <Button asChild className="mt-6"><a href={site.cta.href}>Разобрать результат на встрече</a></Button>
        </div>
      </aside>
    </div>
  );
}
