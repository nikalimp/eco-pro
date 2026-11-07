import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ClipboardList, Cpu, Factory, Gauge, Menu, Radar, ShieldAlert, ShoppingBag, Truck, UtensilsCrossed, Users, X } from "lucide-react";
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
import { Accent, Button, DsRoot, Eyebrow, Heading, IconBox, Index, List, ProgressRing, Section, SectionHeader, Stat, Surface, Tag, Text, Tile, Wrap } from "@/components/ds";
import { DirArt, HeroPlan } from "./iso";
import "./v3.css";

// Версия 3 главной — секции brandsecurity.ru на дизайн-системе ECO-PRO v3 (src/components/ds, основа IBM Carbon), T56–T57.
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
      <Wrap className="flex h-[4.5rem] items-center gap-6">
        <Link href="/" className="shrink-0"><Logo /></Link>
        <nav aria-label="Основное меню" className="hidden flex-1 gap-1 lg:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="v3-seg">{n.label}</Link>)}
          <a href="#faq" className="v3-seg">Вопросы</a>
        </nav>
        <Button asChild size="sm" className="ml-auto hidden sm:inline-flex"><a href={site.cta.href}>{site.cta.label}</a></Button>
        <details className="group/m ml-auto sm:ml-0 lg:hidden">
          <summary aria-label="Открыть меню" className="grid size-10 cursor-pointer list-none place-items-center border border-[var(--c-border)] [&::-webkit-details-marker]:hidden">
            <Menu className="size-5 group-open/m:hidden" /><X className="hidden size-5 group-open/m:block" />
          </summary>
          <div className="fixed inset-x-0 top-[4.5rem] hidden border-b border-[var(--c-border)] bg-white p-4 group-open/m:block">
            <div className="grid gap-1">
              {nav.map((n) => <Link key={n.href} href={n.href} className="v3-seg h-12 text-base">{n.label}</Link>)}
              <Button asChild className="mt-3"><a href={site.cta.href}>{site.cta.label}</a></Button>
            </div>
          </div>
        </details>
      </Wrap>
    </header>
  );
}

export default function V3() {
  const h = home.hero;
  const posts = getPosts().slice(0, 3);
  const covered = coverMap.regions.filter((r) => r.name).length;
  const total = geoMap.cities.length + geoMap.inset.cities.length - 1;
  const stats = [
    { v: "1000+", l: "реализованных проектов", accent: true },
    { v: "25+", l: "лет в отрасли" },
    { v: "5", l: "направлений экосистемы" },
    { v: String(total), l: "городов с проектами" },
    { v: String(covered), l: "регионов присутствия", accent: true },
    { v: "9", l: "часовых поясов — от Калининграда до Владивостока" },
  ];

  return (
    <DsRoot className="v3">
      <Head />

      {/* 1. Первый экран: текст слева, чертёжная изометрия справа */}
      <section className="grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-82rem)/2+2rem))] lg:pr-14">
          <Tag tone="gray" className="w-fit bg-white font-medium [font-family:var(--f-mono)]"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
          <Heading size="display" className="kt mt-8">
            <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
            <br />
            <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l ds-accent">[</span><span className="kt-mid ds-accent">{h.h1Bracket}</span><span className="kt-br kt-r ds-accent">]</span></span></span>
          </Heading>
          <Text className="mt-7 max-w-md">{h.subtitle}</Text>
          <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
        </div>
        <Surface tone="dark" className="relative grid min-h-[22rem] place-items-center overflow-hidden px-4 py-10">
          <HeroPlan className="h-auto w-full max-w-[40rem]" />
          <Text size="label" className="absolute bottom-4 left-4 sm:left-8">Схема: камеры на объекте → ситуационный центр PRO-TEST → руководитель</Text>
        </Surface>
      </section>

      {/* 2. Задачи — закреплённая секция, задачи появляются вокруг круга */}
      <section className="v3-orbit-track">
        <Wrap className="v3-orbit-pin py-16 lg:py-0">
          <div className="v3-orbit">
            <div className="v3-orbit-core mb-10 lg:mb-0">
              <div>
                <Heading size="h3" className="!text-3xl">С какими <Accent>задачами</Accent> к нам приходят</Heading>
                <Text className="mt-4">{home.about.text}</Text>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
              {home.about.problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <Tile key={p.title} className="v3-orbit-card bg-white p-4">
                    <p className="flex items-stretch"><IconBox size="sm"><Icon /></IconBox><Tag className="flex items-center">{p.title}</Tag></p>
                    <Text size="small" className="mt-3">{p.text}</Text>
                  </Tile>
                );
              })}
            </div>
          </div>
        </Wrap>
      </section>

      {/* 3. Кейсы — вкладки на кирпичной полосе */}
      <Section tone="brick" className="v3-cases">
        <Wrap className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div>
            <Heading size="h3" as="h2" className="!text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] !leading-[1.05]">Кейсы, которые разбираем на встрече</Heading>
            <div className="mt-8 grid gap-2">
              {featuredCases.map((c, i) => {
                const Icon = caseIcons[i];
                return (
                  <div key={c.id}>
                    <input type="radio" name="v3case" id={`v3c${i}`} className="sr-only" defaultChecked={i === 0} />
                    <label htmlFor={`v3c${i}`} className="v3-tab"><IconBox size="sm" tone="white"><Icon /></IconBox>{c.title}</label>
                  </div>
                );
              })}
            </div>
            <Button asChild variant="inverse" className="mt-8"><Link href="/cases/">Все кейсы</Link></Button>
          </div>
          <div>
            {featuredCases.map((c, i) => (
              <article key={c.id} className={`v3-case v3-case-${i} ds-theme-light gap-8 p-5 sm:p-8 md:grid-cols-[17rem_1fr]`}>
                <Tile className="flex flex-col items-center border-0 p-6 text-center">
                  <p className="text-4xl font-bold tracking-tight ds-accent">{c.value}</p>
                  <Text size="label" className="mt-1">{c.valueLabel}</Text>
                  <ProgressRing className="mt-6">
                    <p className="text-3xl font-bold tracking-tight ds-accent">{c.metrics[1].value}</p>
                    <Text size="label" className="mx-auto mt-1 max-w-[8rem] leading-tight">{c.metrics[1].label}</Text>
                  </ProgressRing>
                </Tile>
                <div className="flex flex-col">
                  <Tag className="w-fit">{c.tag}</Tag>
                  <Heading size="h1" as="h3" className="mt-5 !text-3xl sm:!text-[2.5rem]">{c.title}</Heading>
                  <Text className="mt-3">{c.scale}</Text>
                  <Heading size="h5" as="p" className="mt-6">Что изменилось:</Heading>
                  <List items={c.results} className="mt-2" />
                  <Button asChild className="mt-8 w-fit"><Link href={`/cases/${c.id}/`}>Читать кейс</Link></Button>
                </div>
              </article>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 4. Цифры лесенкой */}
      <Section>
        <Wrap>
          <Eyebrow>ECO-PRO <Accent>в цифрах</Accent></Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s, i) => (
              <Stat key={s.l} value={s.v} label={s.l} accent={s.accent} className={["md:col-start-1 md:row-start-1", "md:col-start-2 md:row-start-1", "md:col-start-3 md:row-start-1", "md:col-start-2 md:row-start-2", "md:col-start-3 md:row-start-2", "md:col-start-4 md:row-start-2"][i]} />
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 5. ЕИ + ИИ на тёмно-красной полосе */}
      <Section tone="deep">
        <Wrap>
          <SectionHeader align="center" eyebrow={<>Увидеть нарушение — недостаточно. Важно <Accent>добиться реакции</Accent></>} title={<>Естественный интеллект <Accent>+</Accent> искусственный интеллект</>} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {[home.traditions.human, home.traditions.ai].map((c) => (
              <Tile key={c.label} className="p-7 sm:p-9">
                <Text size="label">{c.label}</Text>
                <Heading size="h3" className="mt-3">{c.title}</Heading>
                <List items={c.items} className="mt-5" />
              </Tile>
            ))}
          </div>
          <Text className="mx-auto mt-8 max-w-2xl sm:text-center">{home.traditions.text}</Text>
        </Wrap>
      </Section>

      {/* 6. Как начинаем — этапы стопкой */}
      <Section tone="layer">
        <Wrap className="grid gap-12 lg:grid-cols-2">
          <div className="v3-sticky self-start">
            <SectionHeader eyebrow={<>Как мы <Accent>начинаем</Accent> работу</>} title={<><Accent>Встреча, пилот,</Accent> масштабирование и интеграция в KPI</>} text={home.pilot.text} />
            <Button asChild className="mt-10"><a href={site.cta.href}>{site.cta.label}</a></Button>
          </div>
          <ol className="v3-stack grid gap-4">
            {home.path.steps.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as React.CSSProperties} className="ds-tile bg-white p-6 shadow-[0_-14px_30px_-22px_rgb(0_0_0/.3)] sm:p-8">
                <p className="flex items-baseline justify-between border-b border-[var(--c-border)] pb-4"><Heading size="h4" as="p">{s.title}</Heading><Index n={i + 1} /></p>
                <Text className="mt-5">{s.text}</Text>
              </li>
            ))}
          </ol>
        </Wrap>
      </Section>

      {/* 7. Направления — плитки с меткой и чертёжной иллюстрацией */}
      <Section>
        <Wrap>
          <SectionHeader align="center" eyebrow={<>Пять направлений — <Accent>один Центр Правды</Accent></>} title={<>Экосистема <Accent>предотвращения потерь</Accent> и управления рисками</>} />
          <Text className="mx-auto mt-5 max-w-2xl">{home.answer}</Text>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {directions.slice(0, 5).map((d, i) => (
              <Tile key={d.slug} asChild className={`group flex flex-col ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <Link href={`/services/${d.slug}/`}>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <Tag className="w-fit">{d.code}</Tag>
                    <Heading size="h4" as="h3" className="mt-6">{d.title}</Heading>
                    <Text size="small" className="mt-3 flex-1">{d.short}</Text>
                    <span className="ds-btn mt-7 min-h-9 w-fit bg-[var(--c-brand)] pl-4 pr-1 text-[13px] text-white">Подробнее<span className="ds-btn-mod size-7 bg-white text-lg text-[var(--c-brand)]" aria-hidden="true">+</span></span>
                  </div>
                  <Surface tone="dark" className="mx-6 mb-6 sm:mx-7 sm:mb-7"><DirArt code={d.code} className="h-auto w-full" /></Surface>
                </Link>
              </Tile>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 8. Клиенты и рекомендации */}
      <Section tone="brick">
        <Wrap className="text-center">
          <Heading size="h2">{home.clientsTitle}</Heading>
          <Text className="mx-auto mt-5 max-w-2xl">Рекомендательные письма: {letters.map((d) => d.title).join(", ")}. <Link href="/documents/" className="ds-link text-white">Лицензии и рекомендации →</Link></Text>
        </Wrap>
        <div className="marquee mt-12 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            {[...clientLogos, ...clientLogos].map((l, i) => (
              <Image key={i} src={l.src.replace(".svg", "-white.svg")} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-10 w-auto max-w-[150px] object-contain opacity-90" />
            ))}
          </div>
        </div>
      </Section>

      {/* 9. Вы — ключевой элемент */}
      <Section>
        <Wrap className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow={home.expertise.eyebrow} title={<><Accent>Вы</Accent> — ключевой элемент экосистемы</>} text={home.expertise.text} />
          <div className="grid gap-4 md:grid-cols-3">
            {home.expertise.columns.map((c, i) => {
              const body = (
                <>
                  <p className="flex justify-between"><Text size="label" as="span">{c.label}</Text><Index n={i + 1} /></p>
                  <Heading size="h4" as="h3" className="mt-6">{c.title}</Heading>
                  <List items={c.items} className="mt-5" />
                </>
              );
              // «Результат» — красная плитка: тема red даёт белый текст, фон — сплошной фирменный
              return i === 2
                ? <Surface key={c.label} tone="red" className="flex flex-col p-6 ![background:var(--c-brand)]">{body}</Surface>
                : <Tile key={c.label} className="flex flex-col p-6">{body}</Tile>;
            })}
          </div>
        </Wrap>
      </Section>

      {/* 10. Онлайн-дашборды */}
      <Section tone="red" className="relative overflow-hidden">
        <Wrap className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader eyebrow={home.audience.client.title} title="Онлайн-дашборды по вашим объектам в одном интерфейсе" text={`${home.audience.client.text}.`} />
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild variant="inverse"><a href={site.cta.href}>{site.cta.label}</a></Button>
              <Link href={home.audience.client.href} className="ds-link ds-small !text-white">{home.audience.client.cta} ↗</Link>
            </div>
          </div>
          <div className="relative"><HeroDashboard /></div>
        </Wrap>
      </Section>

      {/* 11. Отрасли */}
      <Section>
        <Wrap>
          <SectionHeader align="center" title={<>Подбираем сценарии контроля <Accent>с учётом отрасли</Accent></>} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = indIcons[i] ?? Factory;
              return (
                <Tile key={ind.slug} asChild className="group flex flex-col p-6 sm:p-8">
                  <Link href={`/industries/${ind.slug}/`}>
                    <p className="flex items-start justify-between"><IconBox><Icon /></IconBox><Index n={i + 1} /></p>
                    <Heading size="h4" as="h3" className="mt-8">{ind.title}</Heading>
                    <Text size="small" className="mt-3 flex-1">{ind.short}</Text>
                    <span className="ds-btn mt-7 min-h-9 w-fit bg-[var(--c-brand)] pl-4 pr-1 text-[13px] text-white">Смотреть обзор<span className="ds-btn-mod size-7 bg-white text-lg text-[var(--c-brand)]" aria-hidden="true">+</span></span>
                  </Link>
                </Tile>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* 12. Пилот — разворот: форма и предложение */}
      <section id="pilot" className="grid lg:grid-cols-2">
        <Surface tone="deep" className="order-1 flex flex-col justify-center px-4 py-16 sm:px-12 lg:order-2">
          <Eyebrow>{home.pilot.eyebrow}</Eyebrow>
          <Heading size="h2" className="mt-5">Проверьте экосистему на своих объектах <Accent>бесплатно</Accent></Heading>
          <ol className="mt-8 space-y-3">
            {home.pilot.points.map((t, i) => <li key={t} className="ds-body flex gap-3"><Index n={i + 1} />{t}</li>)}
          </ol>
        </Surface>
        <Surface tone="layer" className="order-2 px-4 py-16 sm:px-12 lg:order-1">
          <div className="mx-auto max-w-md">
            <Heading size="h3" as="p">Заявка на пилот</Heading>
            <Text size="small" className="mb-6 mt-1">{home.pilot.text}</Text>
            <LeadForm source="Пилот за 2 недели (/3/)" submitLabel={home.pilot.submit} />
          </div>
        </Surface>
      </section>

      {/* 13. Основатель */}
      <section className="grid lg:grid-cols-2">
        <div className="v3-duo relative min-h-[24rem]">
          <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[50%_25%]" />
        </div>
        <Surface tone="dark" className="flex flex-col justify-center px-4 py-16 sm:px-12">
          <Eyebrow>{home.ceo.eyebrow}</Eyebrow>
          <blockquote className="mt-6 text-xl font-medium leading-relaxed sm:text-2xl">«{home.ceo.quote}»</blockquote>
          <Heading size="h5" as="p" className="mt-8">{home.ceo.name} — {home.ceo.role}</Heading>
          <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="ds-link ds-small mt-2 w-fit !text-[var(--c-brand-soft)]">{home.ceo.channelLabel} ↗</a>
        </Surface>
      </section>

      {/* 14. Экспертиза — статьи */}
      {posts.length > 0 && (
        <Section>
          <Wrap>
            <SectionHeader align="center" title={<><Accent>Делимся экспертизой</Accent> в контроле и предотвращении потерь</>} />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <Tile key={p.slug} asChild className="group flex flex-col p-6">
                  <Link href={`/blog/${p.slug}/`}>
                    <p className="flex gap-2"><Tag tone="white"><time dateTime={p.date} className="[font-family:var(--f-mono)]">{formatDate(p.date)}</time></Tag><Tag tone="white" className="[font-family:var(--f-mono)]">БЛОГ</Tag></p>
                    <Heading size="h4" as="h3" className="mt-6 group-hover:text-[var(--c-brand)]">{p.title}</Heading>
                    <Text size="small" className="mt-3">{p.description}</Text>
                  </Link>
                </Tile>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild><Link href="/blog/">Все статьи</Link></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.telegram} target="_blank" rel="noopener">Telegram-канал</a></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.max} target="_blank" rel="noopener">Канал в MAX</a></Button>
            </div>
          </Wrap>
        </Section>
      )}

      {/* 15. FAQ */}
      <Section tone="layer" id="faq">
        <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow={<>Вопросы <Accent>и ответы</Accent></>} title="Часто задаваемые вопросы" />
          <FaqList items={homeFaq} />
        </Wrap>
      </Section>

      {/* 16. Финальный призыв */}
      <Section tone="red" className="!py-16 sm:!py-20">
        <Wrap className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeader eyebrow={home.cta.eyebrow} title={home.cta.title} text={home.cta.text} />
          <Button asChild variant="inverse" size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Wrap>
      </Section>
    </DsRoot>
  );
}
