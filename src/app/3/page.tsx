import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ClipboardList, Cpu, Factory, Gauge, Menu, Radar, ShieldAlert, ShoppingBag, Truck, UtensilsCrossed, Users, X } from "lucide-react";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { clientLogos, home, homeFaq } from "@/content/home";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts, formatDate } from "@/lib/posts";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import { Logo } from "@/components/logo";
import { DirArt, HeroPlan } from "./iso";
import "./v3.css";

// Версия 3 главной — дизайн-система и лучшие секции brandsecurity.ru на контенте ECO-PRO (T56).
// Факты — только из src/content. Дубль «/»: canonical на главную, в sitemap и llms.txt нет.
export const metadata: Metadata = {
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description: "Версия 3 главной ECO-PRO для обсуждения дизайна.",
  alternates: { canonical: "/" },
};

const problemIcons = [ShieldAlert, ClipboardList, Cpu, BarChart3, Radar, Gauge];
const caseIcons = [Truck, Users, Radar];
const indIcons = [ShoppingBag, UtensilsCrossed, Factory];

function Head() {
  return (
    <header className="v3-head">
      <div className="v3-wrap flex h-[4.5rem] items-center gap-6">
        <Link href="/" className="shrink-0"><Logo /></Link>
        <nav aria-label="Основное меню" className="hidden flex-1 gap-1 lg:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="v3-seg">{n.label}</Link>)}
          <a href="#faq" className="v3-seg">Вопросы</a>
        </nav>
        <a href={site.cta.href} className="v3-btn v3-btn-sm ml-auto hidden sm:inline-flex">{site.cta.label}</a>
        <details className="group/m ml-auto sm:ml-0 lg:hidden">
          <summary aria-label="Открыть меню" className="grid size-10 cursor-pointer list-none place-items-center border border-[var(--line)] [&::-webkit-details-marker]:hidden">
            <Menu className="size-5 group-open/m:hidden" /><X className="hidden size-5 group-open/m:block" />
          </summary>
          <div className="fixed inset-x-0 top-[4.5rem] hidden border-b border-[var(--line)] bg-white p-4 group-open/m:block">
            <div className="grid gap-1">
              {nav.map((n) => <Link key={n.href} href={n.href} className="v3-seg h-12 text-base">{n.label}</Link>)}
              <a href={site.cta.href} className="v3-btn mt-3">{site.cta.label}</a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

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
    { v: "9", l: "часовых поясов — от Калининграда до Владивостока" },
  ];

  return (
    <div className="v3">
      <Head />

      {/* 1. Первый экран: текст слева, чертёжная изометрия справа — план объекта поднят, камеры шлют сигналы в ситуационный центр */}
      <section className="grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-82rem)/2+2rem))] lg:pr-14">
          <p className="v3-chip v3-mono w-fit text-[13px] text-[var(--txt)]"><Radar className="size-4 text-[var(--red)]" aria-hidden="true" />{h.eyebrow}</p>
          <h1 className="kt v3-h1 mt-8">
            <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
            <br />
            <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l v3-red">[</span><span className="kt-mid v3-red">{h.h1Bracket}</span><span className="kt-br kt-r v3-red">]</span></span></span>
          </h1>
          <p className="v3-body mt-7 max-w-md">{h.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href={site.cta.href} className="v3-btn">{site.cta.label}</a></div>
        </div>
        <div className="v3-dark relative grid min-h-[22rem] place-items-center overflow-hidden px-4 py-10">
          <HeroPlan className="h-auto w-full max-w-[40rem]" />
          <p className="v3-mono absolute bottom-4 left-4 text-[11px] text-white/60 sm:left-8">Схема: камеры на объекте → ситуационный центр PRO-TEST → руководитель</p>
        </div>
      </section>

      {/* 2. Задачи — закреплённая секция, шесть задач появляются вокруг круга по мере прокрутки */}
      <section className="v3-orbit-track">
        <div className="v3-orbit-pin v3-wrap py-16 lg:py-0">
          <div className="v3-orbit">
            <div className="v3-orbit-core mb-10 lg:mb-0">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight">С какими <span className="v3-red">задачами</span> к нам приходят</h2>
                <p className="v3-body mt-4">{home.about.text}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
              {home.about.problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <div key={p.title} className="v3-orbit-card border border-[var(--line)] bg-white p-4">
                    <p className="flex items-stretch"><span className="grid size-9 shrink-0 place-items-center bg-[#444] text-white"><Icon className="size-4" aria-hidden="true" /></span><span className="v3-tag flex items-center">{p.title}</span></p>
                    <p className="v3-body mt-3 text-[13px]">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Кейсы — кирпичная полоса: вкладки слева, карточка с кольцом справа */}
      <section className="v3-brick v3-cases v3-sec">
        <div className="v3-wrap grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div>
            <h2 className="v3-h2 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)]">Кейсы, которые разбираем на встрече</h2>
            <div className="mt-8 grid gap-2">
              {featuredCases.map((c, i) => {
                const Icon = caseIcons[i];
                return (
                  <div key={c.id}>
                    <input type="radio" name="v3case" id={`v3c${i}`} className="sr-only" defaultChecked={i === 0} />
                    <label htmlFor={`v3c${i}`} className="v3-tab"><span className="v3-tab-ico"><Icon className="size-4" aria-hidden="true" /></span>{c.title}</label>
                  </div>
                );
              })}
            </div>
            <Link href="/cases/" className="v3-btn v3-btn-light mt-8">Все кейсы</Link>
          </div>
          <div>
            {featuredCases.map((c, i) => (
              <article key={c.id} className={`v3-case v3-case-${i} gap-8 bg-white p-5 text-[var(--ink)] sm:p-8 md:grid-cols-[17rem_1fr]`}>
                <div className="flex flex-col items-center bg-[var(--tile)] p-6 text-center">
                  <p className="text-4xl font-bold tracking-tight v3-red">{c.value}</p>
                  <p className="v3-mono mt-1 text-xs text-[var(--txt)]">{c.valueLabel}</p>
                  <div className="v3-ring mt-6">
                    <div><p className="text-3xl font-bold tracking-tight v3-red">{c.metrics[1].value}</p><p className="v3-mono mt-1 max-w-[8rem] text-[11px] leading-tight text-[var(--txt)]">{c.metrics[1].label}</p></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="v3-tag w-fit">{c.tag}</span>
                  <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-[1.05]">{c.title}</h3>
                  <p className="v3-body mt-3">{c.scale}</p>
                  <p className="mt-6 text-sm font-bold">Что изменилось:</p>
                  <ul className="v3-body mt-2 list-disc space-y-1 pl-5 text-[13px]">{c.results.map((r) => <li key={r}>{r}</li>)}</ul>
                  <Link href={`/cases/${c.id}/`} className="v3-btn mt-8 w-fit">Читать кейс</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Цифры лесенкой */}
      <section className="v3-sec">
        <div className="v3-wrap">
          <p className="v3-eyebrow">ECO-PRO <span className="v3-red">в цифрах</span></p>
          <div className="v3-stats mt-8">
            {stats.map((s) => (
              <div key={s.l} className="v3-tile flex flex-col p-5 sm:p-7">
                <p className={`v3-stat-num ${s.red ? "v3-red" : ""}`}>{s.v}</p>
                <p className="v3-body mt-auto border-t border-[var(--line)] pt-4 text-[13px] [margin-top:2.5rem]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Тёмно-красная полоса: увидеть нарушение — недостаточно */}
      <section className="v3-deep v3-sec">
        <div className="v3-wrap">
          <p className="v3-eyebrow text-center !text-white/80">Увидеть нарушение — недостаточно. Важно <span className="text-[#ffb3ad]">добиться реакции</span></p>
          <h2 className="v3-h2 mx-auto mt-5 max-w-4xl text-center">Естественный интеллект <span className="text-[#ffb3ad]">+</span> искусственный интеллект</h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {[home.traditions.human, home.traditions.ai].map((c) => (
              <div key={c.label} className="border border-white/20 bg-white/[.06] p-7 sm:p-9">
                <p className="v3-mono text-[13px] text-white/70">{c.label}</p>
                <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
                <ul className="v3-mono mt-5 list-disc space-y-1.5 pl-5 text-[13px] text-white/90">{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="v3-mono mx-auto mt-8 max-w-2xl text-center text-[13px] text-white/80">{home.traditions.text}</p>
        </div>
      </section>

      {/* 6. Как начинаем — заголовок держится, этапы складываются */}
      <section className="bg-[var(--tile)] v3-sec">
        <div className="v3-wrap grid gap-12 lg:grid-cols-2">
          <div className="v3-sticky self-start">
            <p className="v3-eyebrow">Как мы <span className="v3-red">начинаем</span> работу</p>
            <h2 className="v3-h2 mt-5"><span className="v3-red">Встреча, пилот,</span> масштабирование и интеграция в KPI</h2>
            <p className="v3-body mt-5 max-w-md">{home.pilot.text}</p>
            <a href={site.cta.href} className="v3-btn mt-10">{site.cta.label}</a>
          </div>
          <ol className="v3-stack grid gap-4">
            {home.path.steps.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as React.CSSProperties} className="border border-[var(--line)] bg-white p-6 shadow-[0_-14px_30px_-22px_rgb(0_0_0/.3)] sm:p-8">
                <p className="flex items-baseline justify-between border-b border-[var(--line)] pb-4"><span className="text-xl font-bold">{s.title}</span><span className="v3-idx">[{String(i + 1).padStart(2, "0")}]</span></p>
                <p className="v3-body mt-5">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Направления — плитки с меткой, описанием и чертёжной иллюстрацией */}
      <section className="v3-sec">
        <div className="v3-wrap">
          <p className="v3-eyebrow text-center">Пять направлений — <span className="v3-red">один Центр Правды</span></p>
          <h2 className="v3-h2 mx-auto mt-5 max-w-3xl text-center">Экосистема <span className="v3-red">предотвращения потерь</span> и управления рисками</h2>
          <p className="v3-body mx-auto mt-5 max-w-2xl">{home.answer}</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {directions.slice(0, 5).map((d, i) => (
              <Link key={d.slug} href={`/services/${d.slug}/`} className={`v3-tile group flex flex-col transition-colors hover:border-[var(--red)] ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="v3-tag w-fit">{d.code}</span>
                  <h3 className="v3-h3 mt-6">{d.title}</h3>
                  <p className="v3-body mt-3 flex-1 text-[13px]">{d.short}</p>
                  <span className="v3-btn v3-btn-sm mt-7 w-fit">Подробнее</span>
                </div>
                <div className="v3-dark mx-6 mb-6 sm:mx-7 sm:mb-7"><DirArt code={d.code} className="h-auto w-full" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Клиенты и рекомендации — кирпичная полоса с белыми логотипами */}
      <section className="v3-brick v3-sec">
        <div className="v3-wrap text-center">
          <h2 className="v3-h2 mx-auto max-w-3xl">{home.clientsTitle}</h2>
          <p className="v3-mono mx-auto mt-5 max-w-2xl text-[13px] text-white/85">Рекомендательные письма: {letters.map((d) => d.title).join(", ")}. <Link href="/documents/" className="underline underline-offset-4">Лицензии и рекомендации →</Link></p>
        </div>
        <div className="marquee mt-12 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            {[...clientLogos, ...clientLogos].map((l, i) => (
              <Image key={i} src={l.src.replace(".svg", "-white.svg")} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-10 w-auto max-w-[150px] object-contain opacity-90" />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Вы — ключевой элемент экосистемы: три колонки с индексами */}
      <section className="v3-sec">
        <div className="v3-wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="v3-eyebrow">{home.expertise.eyebrow}</p>
            <h2 className="v3-h2 mt-5"><span className="v3-red">Вы</span> — ключевой элемент экосистемы</h2>
            <p className="v3-body mt-5">{home.expertise.text}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.expertise.columns.map((c, i) => (
              <div key={c.label} className={i === 2 ? "flex flex-col bg-[var(--red)] p-6 text-white" : "v3-tile flex flex-col p-6"}>
                <p className="flex justify-between"><span className={`v3-mono text-[13px] ${i === 2 ? "text-white/85" : "v3-txt"}`}>{c.label}</span><span className={i === 2 ? "v3-mono text-sm text-white" : "v3-idx"}>[{String(i + 1).padStart(2, "0")}]</span></p>
                <h3 className="v3-h3 mt-6">{c.title}</h3>
                <ul className={`v3-mono mt-5 list-disc space-y-1.5 pl-5 text-[13px] ${i === 2 ? "text-white/90" : "v3-txt"}`}>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Онлайн-дашборды — как блок платформ у референса: интерфейс личного кабинета */}
      <section className="v3-redgrad v3-sec relative overflow-hidden">
        <div className="v3-wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="v3-eyebrow !text-white/85">{home.audience.client.title}</p>
            <h2 className="v3-h2 mt-5">Онлайн-дашборды по вашим объектам в одном интерфейсе</h2>
            <p className="v3-mono mt-5 max-w-md text-[13px] text-white/85">{home.audience.client.text}.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.cta.href} className="v3-btn v3-btn-light">{site.cta.label}</a>
              <Link href={home.audience.client.href} className="v3-mono inline-flex items-center px-2 text-sm text-white underline underline-offset-4">{home.audience.client.cta} ↗</Link>
            </div>
          </div>
          <div className="relative"><HeroDashboard /></div>
        </div>
      </section>

      {/* 11. Отрасли */}
      <section className="v3-sec">
        <div className="v3-wrap">
          <h2 className="v3-h2 mx-auto max-w-3xl text-center">Подбираем сценарии контроля <span className="v3-red">с учётом отрасли</span></h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = indIcons[i] ?? Factory;
              return (
                <Link key={ind.slug} href={`/industries/${ind.slug}/`} className="v3-tile group flex flex-col p-6 transition-colors hover:border-[var(--red)] sm:p-8">
                  <p className="flex items-start justify-between"><span className="grid size-12 place-items-center bg-[#444] text-white"><Icon className="size-6" aria-hidden="true" /></span><span className="v3-idx">[{String(i + 1).padStart(2, "0")}]</span></p>
                  <h3 className="v3-h3 mt-8">{ind.title}</h3>
                  <p className="v3-body mt-3 flex-1 text-[13px]">{ind.short}</p>
                  <span className="v3-btn v3-btn-sm mt-7 w-fit">Смотреть обзор</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. Пилот — разворот: форма на белом слева, тёмно-красная половина с предложением справа */}
      <section id="pilot" className="grid lg:grid-cols-2">
        <div className="v3-deep order-1 flex flex-col justify-center px-4 py-16 sm:px-12 lg:order-2">
          <p className="v3-eyebrow !text-white/85">{home.pilot.eyebrow}</p>
          <h2 className="v3-h2 mt-5">Проверьте экосистему на своих объектах <span className="text-[#ffb3ad]">бесплатно</span></h2>
          <ul className="v3-mono mt-8 space-y-3 text-[13px] text-white/90">
            {home.pilot.points.map((t, i) => <li key={t} className="flex gap-3"><span className="text-[#ffb3ad]">[{String(i + 1).padStart(2, "0")}]</span>{t}</li>)}
          </ul>
        </div>
        <div className="order-2 bg-[var(--tile)] px-4 py-16 sm:px-12 lg:order-1">
          <div className="mx-auto max-w-md">
            <p className="text-2xl font-bold">Заявка на пилот</p>
            <p className="v3-body mb-6 mt-1 text-[13px]">{home.pilot.text}</p>
            <LeadForm source="Пилот за 2 недели (/3/)" submitLabel={home.pilot.submit} />
          </div>
        </div>
      </section>

      {/* 13. Основатель — фото в красном дуотоне и цитата */}
      <section className="grid lg:grid-cols-2">
        <div className="v3-duo relative min-h-[24rem]">
          <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[50%_25%]" />
        </div>
        <div className="v3-dark flex flex-col justify-center px-4 py-16 sm:px-12">
          <p className="v3-eyebrow !text-white/70">{home.ceo.eyebrow}</p>
          <blockquote className="mt-6 text-xl font-medium leading-relaxed sm:text-2xl">«{home.ceo.quote}»</blockquote>
          <p className="mt-8 font-bold">{home.ceo.name} — {home.ceo.role}</p>
          <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="v3-mono mt-2 text-sm text-[#ffb3ad] underline underline-offset-4">{home.ceo.channelLabel} ↗</a>
        </div>
      </section>

      {/* 14. Экспертиза — статьи */}
      {posts.length > 0 && (
        <section className="v3-sec">
          <div className="v3-wrap">
            <h2 className="v3-h2 text-center"><span className="v3-red">Делимся экспертизой</span> в контроле и предотвращении потерь</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="v3-tile group flex flex-col p-6 transition-colors hover:border-[var(--red)]">
                  <p className="flex gap-2"><span className="v3-mono bg-white px-2 py-1 text-xs"><time dateTime={p.date}>{formatDate(p.date)}</time></span><span className="v3-mono bg-white px-2 py-1 text-xs">БЛОГ</span></p>
                  <h3 className="mt-6 text-lg font-bold group-hover:text-[var(--red)]">{p.title}</h3>
                  <p className="v3-body mt-3 text-[13px]">{p.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/blog/" className="v3-btn">Все статьи</Link>
              <a href={site.contacts.telegram} target="_blank" rel="noopener" className="v3-seg h-12">Telegram-канал ↗</a>
              <a href={site.contacts.max} target="_blank" rel="noopener" className="v3-seg h-12">Канал в MAX ↗</a>
            </div>
          </div>
        </section>
      )}

      {/* 15. FAQ */}
      <section id="faq" className="bg-[var(--tile)] v3-sec">
        <div className="v3-wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div><p className="v3-eyebrow">Вопросы <span className="v3-red">и ответы</span></p><h2 className="v3-h2 mt-5">Часто задаваемые вопросы</h2></div>
          <FaqList items={homeFaq} />
        </div>
      </section>

      {/* 16. Финальный призыв */}
      <section className="v3-redgrad py-16 sm:py-20">
        <div className="v3-wrap grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="v3-eyebrow !text-white/85">{home.cta.eyebrow}</p>
            <h2 className="v3-h2 mt-5">{home.cta.title}</h2>
            <p className="v3-mono mt-5 max-w-2xl text-[13px] text-white/85">{home.cta.text}</p>
          </div>
          <a href={site.cta.href} className="v3-btn v3-btn-light">{site.cta.label}</a>
        </div>
      </section>
    </div>
  );
}
