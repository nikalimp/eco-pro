import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ClipboardList, Cpu, Factory, Gauge, Radar, ScanEye, ShieldAlert, ShoppingBag, UtensilsCrossed, Workflow } from "lucide-react";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { coverMap } from "@/content/cover-map";
import { getPosts, formatDate } from "@/lib/posts";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import "./v3.css";

// Версия 3 главной по референсу brandsecurity.ru (T54). Контент — из src/content, новых фактов нет.
// Дубль «/»: canonical на главную, в sitemap и llms.txt нет.
export const metadata: Metadata = {
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description: "Версия 3 главной ECO-PRO для обсуждения дизайна.",
  alternates: { canonical: "/" },
};

const W = ({ className = "", ...p }: React.ComponentProps<"div">) => <div className={`mx-auto w-full max-w-7xl px-4 sm:px-8 ${className}`} {...p} />;
const problemIcons = [ShieldAlert, ClipboardList, Cpu, BarChart3, Radar, Gauge];
const dirIcons: Record<string, React.ComponentType<{ className?: string }>> = { "PRO-TEST": Radar, "PRO-AI": ScanEye, "PRO-INC": ClipboardList, "PRO-DATA": BarChart3, "PRO-TECHNO": Workflow };
const indIcons = [ShoppingBag, UtensilsCrossed, Factory];

export default function V3() {
  const h = home.hero;
  const posts = getPosts().slice(0, 3);
  const covered = coverMap.regions.filter((r) => r.name).length;
  const total = geoMap.cities.length + geoMap.inset.cities.length - 1;
  const stats = [
    { v: "1000+", l: "реализованных проектов", red: true },
    { v: "25+", l: "лет в отрасли" },
    { v: "5", l: "направлений экосистемы" },
    { v: String(total), l: "городов с проектами" },
    { v: String(covered), l: "регионов присутствия", red: true },
    { v: "9", l: "часовых поясов" },
  ];

  return (
    <div className="v3">
      {/* 1. Первый экран: текст слева, тёмная панель с живым мониторингом справа */}
      <section className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
          <p className="v3-mono inline-flex w-fit items-center gap-2 border border-[var(--line)] px-3 py-2 text-xs"><Radar className="size-4 text-[var(--red)]" aria-hidden="true" />{h.eyebrow}</p>
          <h1 className="kt mt-8 text-[44px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl xl:text-7xl">
            <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
            <br />
            <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l v3-red">[</span><span className="kt-mid v3-red">{h.h1Bracket}</span><span className="kt-br kt-r v3-red">]</span></span></span>
          </h1>
          <p className="v3-mono mt-8 max-w-md text-[15px] leading-relaxed text-neutral-600">{h.subtitle}</p>
          <div className="mt-10"><a href={site.cta.href} className="v3-btn">{site.cta.label}</a></div>
        </div>
        <div className="v3-band-dark relative flex items-center overflow-hidden px-4 py-14 sm:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(255_255_255/.22)_1px,transparent_1.2px)] [background-size:22px_22px]" aria-hidden="true" />
          <div className="relative w-full"><HeroDashboard /></div>
        </div>
      </section>

      {/* 2. Задачи — круг в центре, шесть карточек вокруг (тексты блока «Задачи, с которыми к нам приходят») */}
      <section className="py-20 sm:py-28">
        <W>
          <div className="v3-orbit">
            <div className="v3-orbit-core mb-10 lg:mb-0">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight">С какими <span className="v3-red">задачами</span> к нам приходят</h2>
                <p className="v3-mono mt-4 text-sm text-neutral-600">Сети магазинов, ресторанов, складов и производств <span className="v3-red">по всей России</span></p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:block">
              {home.about.problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <div key={p.title} className="v3-orbit-card border border-[var(--line)] bg-white p-4">
                    <p className="flex items-center gap-2"><span className="grid size-8 place-items-center bg-neutral-800 text-white"><Icon className="size-4" aria-hidden="true" /></span><span className="v3-tag">{p.title}</span></p>
                    <p className="v3-mono mt-3 text-[13px] leading-relaxed text-neutral-600">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </W>
      </section>

      {/* 3. Логотипы клиентов */}
      <section aria-label={home.clientsTitle} className="marquee overflow-hidden border-y border-[var(--line)] py-7">
        <h2 className="sr-only">{home.clientsTitle}</h2>
        <div className="marquee-track flex w-max items-center gap-16">
          {[...clientLogos, ...clientLogos].map((l, i) => (
            <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-9 w-auto max-w-[140px] object-contain opacity-60 grayscale" />
          ))}
        </div>
      </section>

      {/* 4. Кейсы — красная полоса, вкладки слева, карточка с кольцом справа */}
      <section className="v3-band-red v3-cases py-20 sm:py-24">
        <W className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight">Кейсы, которые показываем на встрече</h2>
            <div className="mt-8 grid gap-2">
              {featuredCases.map((c, i) => (
                <div key={c.id}>
                  <input type="radio" name="v3case" id={`v3c${i}`} className="peer sr-only" defaultChecked={i === 0} />
                  <label htmlFor={`v3c${i}`} className="v3-tab text-[15px] font-medium">{c.title}</label>
                </div>
              ))}
            </div>
            <Link href="/cases/" className="v3-btn v3-btn-light mt-8">Все кейсы</Link>
          </div>
          <div>
            {featuredCases.map((c, i) => {
              return (
                <article key={c.id} className={`v3-case v3-case-${i} gap-8 bg-white p-6 text-black sm:p-10 md:grid-cols-[auto_1fr]`}>
                  <div className="flex flex-col items-center gap-6 bg-[var(--tile)] p-6">
                    <div className="v3-ring" style={{ "--p": 100 } as React.CSSProperties}>
                      <div><p className="text-3xl font-bold tracking-tight v3-red">{c.value}</p><p className="v3-mono mt-1 max-w-[8rem] text-[11px] leading-tight text-neutral-600">{c.valueLabel}</p></div>
                    </div>
                    <dl className="grid w-full grid-cols-2 gap-3">
                      {c.metrics.slice(1, 3).map((m) => (
                        <div key={m.label}><dd className="text-xl font-bold">{m.value}</dd><dt className="v3-mono text-[11px] text-neutral-600">{m.label}</dt></div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <span className="v3-tag">{c.tag}</span>
                    <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h3>
                    <p className="v3-mono mt-2 text-sm text-neutral-600">{c.scale}</p>
                    <p className="mt-6 text-sm font-semibold">Что изменилось:</p>
                    <ul className="v3-mono mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-neutral-700">
                      {c.results.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                    <Link href={`/cases/${c.id}/`} className="v3-btn mt-8">Читать кейс</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </W>
      </section>

      {/* 5. Цифры лесенкой */}
      <section className="py-20 sm:py-28">
        <W>
          <p className="v3-eyebrow text-neutral-600">ECO-PRO <span className="v3-red">в цифрах</span></p>
          <div className="v3-stats mt-8">
            {stats.map((s) => (
              <div key={s.l} className="v3-tile p-6 sm:p-8">
                <p className={`v3-stat-num ${s.red ? "v3-red" : ""}`}>{s.v}</p>
                <p className="v3-mono mt-8 border-t border-[var(--line)] pt-4 text-[13px] text-neutral-600">{s.l}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* 6. Тёмно-красная полоса: увидеть нарушение — недостаточно (ЕИ + ИИ) */}
      <section className="v3-band-deep py-20 sm:py-28">
        <W>
          <p className="v3-eyebrow text-center text-white/80">Увидеть нарушение — недостаточно. Важно <span className="text-[#ff8a80]">добиться реакции</span></p>
          <h2 className="v3-h2 mx-auto mt-5 max-w-4xl text-center">{home.traditions.title}</h2>
          <p className="v3-mono mx-auto mt-5 max-w-2xl text-center text-sm text-white/75">{home.traditions.text}</p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {[home.traditions.human, home.traditions.ai].map((c) => (
              <div key={c.label} className="border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
                <p className="v3-mono text-xs text-white/70">{c.label}</p>
                <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
                <ul className="v3-mono mt-5 list-disc space-y-1.5 pl-5 text-[13px] text-white/85">{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* 7. Как работаем — заголовок держится слева, карточки этапов складываются справа */}
      <section className="bg-[var(--tile)] py-20 sm:py-28">
        <W className="grid gap-12 lg:grid-cols-2">
          <div className="v3-sticky self-start">
            <p className="v3-eyebrow text-neutral-600">Как мы <span className="v3-red">начинаем</span> работу</p>
            <h2 className="v3-h2 mt-5"><span className="v3-red">От встречи</span> до результата за четыре шага</h2>
            <p className="v3-mono mt-5 max-w-md text-sm leading-relaxed text-neutral-600">{home.pilot.text}</p>
            <a href={site.cta.href} className="v3-btn mt-10">{site.cta.label}</a>
          </div>
          <ol className="v3-stack grid gap-4">
            {home.path.steps.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as React.CSSProperties} className="border border-[var(--line)] bg-white p-6 shadow-[0_-12px_30px_-20px_rgb(0_0_0/.25)] sm:p-8">
                <p className="flex items-baseline justify-between border-b border-[var(--line)] pb-4"><span className="text-xl font-bold">{s.title}</span><span className="v3-idx">[{String(i + 1).padStart(2, "0")}]</span></p>
                <p className="v3-mono mt-5 text-[13px] leading-relaxed text-neutral-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </W>
      </section>

      {/* 8. Направления — плитки с красной меткой */}
      <section className="py-20 sm:py-28">
        <W>
          <p className="v3-eyebrow text-center text-neutral-600">Пять направлений — <span className="v3-red">один Центр Правды</span></p>
          <h2 className="v3-h2 mx-auto mt-5 max-w-3xl text-center">Экосистема <span className="v3-red">предотвращения потерь</span> и управления рисками</h2>
          <p className="v3-mono mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-neutral-600">{home.answer}</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {directions.slice(0, 5).map((d, i) => {
              const Icon = dirIcons[d.code] ?? Radar;
              return (
                <Link key={d.slug} href={`/services/${d.slug}/`} className={`v3-tile group flex flex-col p-6 transition-colors hover:border-[var(--red)] sm:p-8 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                  <p className="flex items-start justify-between"><span className="v3-tag">{d.code}</span><Icon className="size-8 text-[var(--red)]" aria-hidden="true" /></p>
                  <h3 className="mt-6 text-2xl font-bold">{d.title}</h3>
                  <p className="v3-mono mt-3 flex-1 text-[13px] leading-relaxed text-neutral-600">{d.short}</p>
                  <span className="v3-btn mt-8 w-fit">Подробнее</span>
                </Link>
              );
            })}
          </div>
        </W>
      </section>

      {/* 9. Пилот — красная полоса с формой */}
      <section id="pilot" className="v3-band-red relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_100%,#7a0d10_0%,transparent_60%)]" aria-hidden="true" />
        <W className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="v3-eyebrow text-white/85">{home.pilot.eyebrow}</p>
            <h2 className="v3-h2 mt-5">{home.pilot.title}</h2>
            <ul className="v3-mono mt-8 space-y-3 text-[13px]">
              {home.pilot.points.map((t, i) => <li key={t} className="flex gap-3"><span className="text-white/70">[{String(i + 1).padStart(2, "0")}]</span>{t}</li>)}
            </ul>
          </div>
          <div className="bg-white p-6 text-black sm:p-8">
            <p className="text-2xl font-bold">Заявка на пилот</p>
            <p className="v3-mono mb-6 mt-1 text-xs text-neutral-600">Ответим в течение рабочего дня</p>
            <LeadForm source="Пилот за 2 недели (/3/)" submitLabel={home.pilot.submit} />
          </div>
        </W>
      </section>

      {/* 10. Отрасли */}
      <section className="py-20 sm:py-28">
        <W>
          <h2 className="v3-h2 mx-auto max-w-3xl text-center">Подбираем сценарии контроля <span className="v3-red">с учётом отрасли</span></h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = indIcons[i] ?? Factory;
              return (
                <Link key={ind.slug} href={`/industries/${ind.slug}/`} className="v3-tile group flex flex-col p-6 transition-colors hover:border-[var(--red)] sm:p-8">
                  <p className="flex items-start justify-between"><span className="grid size-12 place-items-center bg-neutral-800 text-white"><Icon className="size-6" aria-hidden="true" /></span><span className="v3-idx">[{String(i + 1).padStart(2, "0")}]</span></p>
                  <h3 className="mt-8 text-xl font-bold">{ind.title}</h3>
                  <p className="v3-mono mt-3 flex-1 text-[13px] leading-relaxed text-neutral-600">{ind.short}</p>
                  <p className="mt-6 text-sm font-semibold group-hover:text-[var(--red)]">Смотреть обзор →</p>
                </Link>
              );
            })}
          </div>
        </W>
      </section>

      {/* 11. Основатель — фото в красном дуотоне и цитата */}
      <section className="grid lg:grid-cols-2">
        <div className="v3-duo min-h-[22rem]">
          <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[50%_25%]" />
        </div>
        <div className="v3-band-dark flex flex-col justify-center px-4 py-16 sm:px-12">
          <p className="v3-eyebrow text-white/70">{home.ceo.eyebrow}</p>
          <blockquote className="mt-6 text-xl font-medium leading-relaxed sm:text-2xl">«{home.ceo.quote}»</blockquote>
          <p className="mt-8 font-semibold">{home.ceo.name} — {home.ceo.role}</p>
          <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="v3-mono mt-2 text-sm text-[#ff8a80] underline underline-offset-4">{home.ceo.channelLabel} ↗</a>
        </div>
      </section>

      {/* 12. Новости */}
      {posts.length > 0 && (
        <section className="py-20 sm:py-28">
          <W>
            <h2 className="v3-h2 text-center"><span className="v3-red">Делимся экспертизой</span> в контроле и предотвращении потерь</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="v3-tile group flex flex-col p-6 transition-colors hover:border-[var(--red)]">
                  <p className="v3-mono w-fit bg-white px-2 py-1 text-xs"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                  <h3 className="mt-6 text-lg font-bold group-hover:text-[var(--red)]">{p.title}</h3>
                  <p className="v3-mono mt-3 text-[13px] leading-relaxed text-neutral-600">{p.description}</p>
                </Link>
              ))}
            </div>
            <p className="v3-mono mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href={site.contacts.telegram} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--red)]">Telegram-канал ↗</a>
              <a href={site.contacts.max} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--red)]">Канал в MAX ↗</a>
              <Link href="/blog/" className="underline underline-offset-4 hover:text-[var(--red)]">Все статьи →</Link>
            </p>
          </W>
        </section>
      )}

      {/* 13. FAQ */}
      <section id="faq" className="bg-[var(--tile)] py-20 sm:py-28">
        <W className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div><p className="v3-eyebrow text-neutral-600">Вопросы <span className="v3-red">и ответы</span></p><h2 className="v3-h2 mt-5">Часто задаваемые вопросы</h2></div>
          <FaqList items={homeFaq} />
        </W>
      </section>

      {/* 14. Финальный призыв */}
      <section className="v3-band-deep py-20 sm:py-24">
        <W className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="v3-eyebrow text-white/80">{home.cta.eyebrow}</p>
            <h2 className="v3-h2 mt-5">{home.cta.title}</h2>
            <p className="v3-mono mt-5 max-w-2xl text-sm leading-relaxed text-white/80">{home.cta.text}</p>
          </div>
          <a href={site.cta.href} className="v3-btn v3-btn-light">{site.cta.label}</a>
        </W>
      </section>
    </div>
  );
}
