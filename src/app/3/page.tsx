import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, ChevronDown, ClipboardList, Cpu, Crown, Database, Factory, Gauge, Menu, Radar, ShieldAlert, ShieldCheck, ShoppingBag, Truck, UtensilsCrossed, Users, X } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { nav, site } from "@/content/site";
import { directions } from "@/content/directions";
import { EcosystemGraph } from "@/components/ecosystem-graph";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { GeoPanel } from "@/components/geo-panel";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts, formatDate } from "@/lib/posts";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import { Logo } from "@/components/logo";
import { Accent, Button, DsRoot, Eyebrow, Heading, IconBox, Index, List, ProgressRing, Section, SectionHeader, Surface, Tag, Text, Tile, Wrap } from "@/components/ds";
import { HeroPlan } from "./iso";
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
const entryIcons = [Crown, ShieldCheck, Database];

// Шапка из /2 (T60): HUD-строка «REC», пункты-ячейки с номером [01] и выпадающими списками на CSS, «Кабинет», кнопка во всю высоту
const submenus: Record<string, { href: string; label: string; code?: string }[]> = {
  "/services/": directions.map((d) => ({ href: `/services/${d.slug}/`, label: d.title, code: d.code })),
  "/industries/": industries.map((i) => ({ href: `/industries/${i.slug}/`, label: i.title })),
};
const num = (n: number) => `[${String(n + 1).padStart(2, "0")}]`;

function NavItem({ href, label, n }: { href: string; label: string; n: number }) {
  const sub = submenus[href];
  const cell = "v3-cell flex h-16 items-center gap-2 border-l border-[var(--c-border)] px-4 2xl:px-6";
  if (!sub) return <Link href={href} className={cell}><span className="ds-accent">{num(n)}</span>{label}</Link>;
  return (
    <div className="group relative">
      <Link href={href} className={cell}><span className="ds-accent">{num(n)}</span>{label}<ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" /></Link>
      <div className="invisible absolute left-0 top-full z-50 w-max opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="border border-[var(--c-border)] bg-white p-2 shadow-[0_16px_40px_rgb(0_0_0/.18)]">
          {sub.map((x) => (
            <li key={x.href}>
              <Link href={x.href} className="flex items-baseline gap-5 whitespace-nowrap px-4 py-2.5 text-[15px] hover:bg-[var(--c-layer)] hover:text-[var(--c-brand)]">
                {x.code && <span className="ds-label w-28 shrink-0 !text-[var(--c-brand)]">{x.code}</span>}{x.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Head() {
  const c = site.contacts;
  return (
    <header className="v3-head">
      <div className="hidden h-8 items-center justify-between border-b border-[var(--c-border)] px-[var(--sp-gutter)] md:flex">
        <span className="v3-rec ds-label !text-[var(--c-text)]">REC · Ситуационный центр 24/7</span>
        <a href={`tel:${c.phone}`} className="ds-label hover:!text-[var(--c-text)]">{c.phoneDisplay}</a>
      </div>
      <div className="flex h-16 items-stretch">
        <Link href="/" className="flex shrink-0 items-center pl-[var(--sp-gutter)] pr-6 xl:pr-8"><Logo /></Link>
        <nav aria-label="Основное меню" className="hidden flex-1 items-stretch border-r border-[var(--c-border)] xl:flex">
          {nav.map((n, i) => <NavItem key={n.href} {...n} n={i} />)}
        </nav>
        <div className="ml-auto flex items-stretch">
          <Link href="/account/" className="hidden items-center border-l border-[var(--c-border)] px-6 text-[15px] font-medium hover:text-[var(--c-brand)] 2xl:flex">Кабинет</Link>
          <Button asChild icon="→" className="!h-16 hidden !gap-10 !pl-7 sm:inline-flex [&_.ds-btn-mod]:!h-16 [&_.ds-btn-mod]:!w-16 [&_.ds-btn-mod]:!bg-[var(--c-brand-hover)] [&_.ds-btn-mod]:!text-white !pr-0"><a href={site.cta.href}>{site.cta.label}</a></Button>
          <details className="group/m xl:hidden">
            <summary aria-label="Открыть меню" className="grid h-16 w-16 cursor-pointer list-none place-items-center border-l border-[var(--c-border)] [&::-webkit-details-marker]:hidden">
              <Menu className="size-6 group-open/m:hidden" /><X className="hidden size-6 group-open/m:block" />
            </summary>
            <div className="fixed inset-x-0 top-16 hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--c-border)] bg-white px-4 pb-6 pt-2 group-open/m:block md:top-24">
              <ul className="divide-y divide-[var(--c-border)]">
                {nav.map((n, i) => (
                  <li key={n.href} className="py-1">
                    <a href={n.href} className="ds-h3 flex items-baseline gap-3 py-3"><span className="ds-label !text-[var(--c-brand)]">{num(i)}</span>{n.label}</a>
                    {submenus[n.href] && (
                      <ul className="mb-2 ml-3 border-l border-[var(--c-border)] pl-3">
                        {submenus[n.href].map((x) => <li key={x.href}><a href={x.href} className="ds-small block py-1.5">{x.code ? `${x.code} — ` : ""}{x.label}</a></li>)}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="py-1"><a href="/account/" className="ds-h3 flex items-baseline gap-3 py-3"><span className="ds-label !text-[var(--c-brand)]">{num(nav.length)}</span>Кабинет</a></li>
              </ul>
              <Button asChild className="mt-5 w-full"><a href={site.cta.href}>{site.cta.label}</a></Button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export default function V3() {
  const h = home.hero;
  const posts = getPosts().slice(0, 4);
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
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:py-16 lg:pl-[var(--sp-gutter)] lg:pr-14">
          <Tag tone="gray" className="w-fit lg:mt-auto bg-white font-medium [font-family:var(--f-mono)]"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
          <Heading size="display" className="kt mt-8">
            <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
            <br />
            <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l ds-accent">[</span><span className="kt-mid ds-accent">{h.h1Bracket}</span><span className="kt-br kt-r ds-accent">]</span></span></span>
          </Heading>
          <Text size="lead" className="mt-7 max-w-[34ch]">{h.subtitle}</Text>
          <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          {/* Доказательства на первом экране — те же цифры, что в блоке «География» */}
          <dl className="mt-12 grid max-w-[44rem] grid-cols-3 border-t border-[var(--c-border)] pt-6 lg:mt-auto">
            {stats.slice(0, 3).map((s) => (
              <div key={s.l} className="flex flex-col-reverse justify-end pr-4">
                <dt className="ds-small mt-1">{s.l}</dt>
                <dd className="v3-hero-num">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Surface tone="dark" className="relative grid min-h-[22rem] place-items-center overflow-hidden px-4 py-10">
          <HeroPlan className="h-auto w-full max-w-[52rem]" />
          <Text size="label" className="absolute bottom-4 left-4 sm:left-8">Схема: камеры на объекте → ситуационный центр PRO-TEST → руководитель</Text>
        </Surface>
      </section>

      {/* 1б. Что получает руководитель — три точки входа (из /2) */}
      <Section tone="layer">
        <Wrap fluid>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeader eyebrow={home.entryPoints.title} title={home.entryPoints.heading} />
            <Text size="lead" className="max-w-[52ch]">{home.entryPoints.text}</Text>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {home.entryPoints.items.map((e, i) => {
              const Icon = entryIcons[i];
              return (
                <Tile key={e.title} asChild className="group flex flex-col bg-white p-7 sm:p-9">
                  <Link href={e.href}>
                    <IconBox tone="red"><Icon /></IconBox>
                    <Heading size="h4" as="h3" className="mt-8">{e.title}</Heading>
                    <Text className="mt-3 flex-1">{e.text}</Text>
                    <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold group-hover:text-[var(--c-brand)]">{e.cta}<ArrowRight className="size-4" aria-hidden="true" /></span>
                  </Link>
                </Tile>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* 2. Задачи — закреплённая секция, задачи появляются вокруг круга */}
      <section className="v3-orbit-track">
        <Wrap fluid className="v3-orbit-pin py-16 lg:py-0">
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
        <Wrap fluid className="grid gap-10 lg:grid-cols-[minmax(20rem,0.3fr)_1fr]">
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
              <article key={c.id} className={`v3-case v3-case-${i} ds-theme-light gap-8 p-5 sm:p-8 md:grid-cols-[17rem_1fr] 2xl:grid-cols-[19rem_1fr_minmax(16rem,0.5fr)] 2xl:p-12`}>
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
                <dl className="hidden content-start divide-y divide-[var(--c-border)] border-y border-[var(--c-border)] 2xl:grid">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse bg-white py-4 pl-5">
                      <dt className="ds-small">{m.label}</dt>
                      <dd className="text-2xl font-bold tracking-tight">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 4. География: карта регионов + цифры (широкий экран — главный визуал) */}
      <Section tone="dark" className="v3-geo">
        <Wrap fluid className="grid items-center gap-10 xl:grid-cols-[1.7fr_1fr]">
          <div className="geo-map order-2 xl:order-1">
            <svg viewBox={`0 0 ${coverMap.width} ${coverMap.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered} регионов присутствия ECO-PRO`}>
              {coverMap.regions.map((r, i) =>
                r.name ? (
                  <path key={i} d={r.d} className="geo-reg is-on" tabIndex={0} role="img" aria-label={r.cities?.length ? `${r.name}: ${r.cities.join(", ")}` : r.name} data-name={r.name} data-cities={r.cities?.join(", ") ?? ""} />
                ) : (
                  <path key={i} d={r.d} className="geo-reg" aria-hidden="true" />
                ),
              )}
            </svg>
          </div>
          <div className="order-1 xl:order-2">
            <SectionHeader eyebrow={home.geo.eyebrow} title={<>{home.geo.title.split(" ").slice(0, -2).join(" ")} <Accent>{home.geo.title.split(" ").slice(-2).join(" ")}</Accent></>} text={home.geo.text} />
            <div className="mt-10 grid grid-cols-2 gap-px bg-[var(--c-border)]">
              {stats.map((s) => (
                <div key={s.l} className="flex flex-col-reverse bg-[var(--c-ink-fixed)] p-5">
                  <p className="ds-small mt-2">{s.l}</p>
                  <p className={`v3-geo-num ${s.accent ? "ds-accent" : ""}`}>{s.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden xl:block"><GeoPanel defaultTitle={`${covered} регионов`} defaultText={`Наведите на регион, чтобы увидеть города. Всего ${total} городов с проектами.`} /></div>
          </div>
        </Wrap>
      </Section>

      {/* 5. ЕИ + ИИ — заголовок слева, две колонки справа */}
      <Section>
        <Wrap fluid className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionHeader eyebrow={<>Увидеть нарушение — недостаточно. Важно <Accent>добиться реакции</Accent></>} title={<>Естественный интеллект <Accent>+</Accent> искусственный интеллект</>} />
            <Text className="mt-6 max-w-[48ch]">{home.traditions.text}</Text>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[home.traditions.human, home.traditions.ai].map((c, i) => (
              <Tile key={c.label} className={`flex flex-col p-7 sm:p-9 ${i === 1 ? "ds-theme-dark ![background:var(--c-ink-fixed)]" : ""}`}>
                <p className="flex justify-between"><Text size="label" as="span">{c.label}</Text><Index n={i + 1} /></p>
                <Heading size="h3" className="mt-10">{c.title}</Heading>
                <List items={c.items} className="mt-5" />
              </Tile>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 6. Как начинаем — этапы стопкой */}
      <Section tone="layer">
        <Wrap fluid className="grid gap-12 lg:grid-cols-2">
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

      {/* 7. Экосистема — граф из /2: PRO-TEST в центре, четыре направления вокруг */}
      <Section className="v3-eco">
        <Wrap fluid>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeader eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} />
            <Text className="max-w-[68ch]">{home.answer}</Text>
          </div>
          <div className="mt-14"><EcosystemGraph /></div>
        </Wrap>
      </Section>

      {/* 8. Рекомендательные письма — сканы, а не строка текста */}
      <Section tone="brick">
        <Wrap fluid>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="рекомендации" title={<>Нас рекомендуют <Accent>клиенты</Accent></>} text="Письма крупных сетей и отраслевых ассоциаций. Лицензии, СРО и партнёрские сертификаты — на странице документов." />
            <Button asChild variant="inverse"><Link href="/documents/">Все документы</Link></Button>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {letters.map((d) => (
              <li key={d.id}>
                <Link href="/documents/" className="group block">
                  <span className="block overflow-hidden bg-white p-2">
                    <Image src={d.image.replace(".webp", "-sm.webp")} alt={`${d.title}: ${d.text}`} width={339} height={480} className="aspect-[339/480] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  </span>
                  <span className="ds-h5 mt-3 block">{d.title}</span>
                  <span className="ds-small block">{d.issuer}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* 9. Вы — ключевой элемент */}
      <Section>
        <Wrap fluid className="grid gap-12 lg:grid-cols-[1fr_2fr]">
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
        <Wrap fluid className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
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
        <Wrap fluid>
          <SectionHeader eyebrow="отрасли" title={<>Подбираем сценарии контроля <Accent>с учётом отрасли</Accent></>} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = indIcons[i] ?? Factory;
              return (
                <Tile key={ind.slug} asChild className="group flex flex-col p-6 sm:p-8">
                  <Link href={`/industries/${ind.slug}/`}>
                    <p className="flex items-start justify-between"><IconBox><Icon /></IconBox><Index n={i + 1} /></p>
                    <Heading size="h4" as="h3" className="mt-8">{ind.title}</Heading>
                    <Text size="small" className="mt-3">{ind.short}</Text>
                    <List items={ind.tasks} className="mt-6 flex-1 border-t border-[var(--c-border)] pt-6" />
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
          <div className="mx-auto max-w-md 2xl:max-w-xl">
            <Heading size="h3" as="p">Заявка на пилот</Heading>
            <Text size="small" className="mb-6 mt-1">{home.pilot.text}</Text>
            <LeadForm source="Пилот за 2 недели (/3/)" submitLabel={home.pilot.submit} />
          </div>
        </Surface>
      </section>

      {/* 13. Основатель — красная «пауза»: текст слева, цветное фото справа (из /2) */}
      <Section tone="red" className="![background:var(--c-brand)]">
        <Wrap fluid>
          <figure className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow className="!text-white">{home.ceo.eyebrow}</Eyebrow>
              <blockquote className="mt-6 max-w-[52ch] text-xl font-medium leading-relaxed sm:text-2xl 2xl:text-[1.75rem]">«{home.ceo.quote}»</blockquote>
              <figcaption className="mt-8 border-t border-white/40 pt-5">
                <Heading size="h3" as="p">{home.ceo.name} — {home.ceo.role}</Heading>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="ds-link ds-small mt-2 inline-block !text-white">{home.ceo.channelLabel} ↗</a>
              </figcaption>
            </div>
            <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={640} height={640} className="mx-auto aspect-square w-full max-w-sm object-cover lg:col-span-4 lg:ml-auto lg:mr-0 2xl:max-w-md" />
          </figure>
        </Wrap>
      </Section>

      {/* 13а. Команда */}
      <Section tone="layer">
        <Wrap fluid>
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
            <SectionHeader eyebrow={home.team.eyebrow} title={<>Люди <Accent>экосистемы</Accent></>} />
            <Text className="max-w-[60ch]">{home.team.text}</Text>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {home.team.people.map((p) => (
              <li key={p.name} className="ds-tile bg-white">
                <div className="v3-duo v3-duo-soft relative aspect-[4/5]">
                  <Image src={p.photo} alt={`${p.name}, ${p.role.toLowerCase()}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover object-top" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="ds-h4">{p.name}</p>
                  <p className="ds-small mt-1">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* 13б. Логотипы клиентов — под командой (решение Ника 07.11) */}
      <section aria-labelledby="v3-trust" className="border-y border-[var(--c-border)]">
        <div className="flex items-center gap-8 py-6 pl-[var(--sp-gutter)]">
          <Eyebrow id="v3-trust" className="hidden shrink-0 md:block">{home.clientsTitle}</Eyebrow>
          <div className="marquee min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-16">
              {[...clientLogos, ...clientLogos].map((l, i) => (
                <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="v3-logo h-9 w-auto max-w-[140px] object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Экспертиза — статьи */}
      {posts.length > 0 && (
        <Section>
          <Wrap fluid>
            <SectionHeader eyebrow="блог" title={<><Accent>Делимся экспертизой</Accent> в контроле и предотвращении потерь</>} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link href="/blog/">Все статьи</Link></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.telegram} target="_blank" rel="noopener">Telegram-канал</a></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.max} target="_blank" rel="noopener">Канал в MAX</a></Button>
            </div>
          </Wrap>
        </Section>
      )}

      {/* 15. FAQ */}
      <Section tone="layer" id="faq">
        <Wrap fluid className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow={<>Вопросы <Accent>и ответы</Accent></>} title="Часто задаваемые вопросы" />
          <FaqList items={homeFaq} />
        </Wrap>
      </Section>

      {/* 16. Финальный призыв */}
      <Section tone="red" className="!py-16 sm:!py-20">
        <Wrap fluid className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeader eyebrow={home.cta.eyebrow} title={home.cta.title} text={home.cta.text} />
          <Button asChild variant="inverse" size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Wrap>
      </Section>
    </DsRoot>
  );
}
