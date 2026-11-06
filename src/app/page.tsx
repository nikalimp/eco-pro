import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Check, Crown, Database, ShieldCheck, Users } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { getPosts, formatDate } from "@/lib/posts";
import { Container, Section, SectionHead } from "@/components/container";
import { Button } from "@/components/ui/button";
import { CaseGrid, CtaBlock, IndustryCard } from "@/components/blocks";
import { EcosystemList } from "@/components/ecosystem-graph";
import { LeadForm } from "@/components/lead-form";
import { HeroDashboard } from "@/components/hero-dashboard";
import { GeoMap } from "@/components/geo-map";
import { FaqList } from "@/components/faq";
import { DocCard, DocLightboxes } from "@/components/doc-gallery";
import { letters } from "@/content/documents";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph } from "@/lib/schema";

// Блоки главной — specs/02-spec.md §5; порядок и состав — по правкам команды клиента 30.10–05.11 (specs/05-tasks.md, T49):
// прежний светлый дизайн pro-nas.pro, лучшие блоки новой версии, лишнее — в FAQ
export default function Home() {
  const entryIcons = [Crown, ShieldCheck, Database];
  const posts = getPosts().slice(0, 3);
  const h = home.hero;
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран: надзаголовок, H1 со скобками как в логотипе, подзаголовок, одна кнопка, дашборд и логотипы клиентов */}
      <Section className="hero relative overflow-hidden pb-10 pt-14 sm:pt-20">
        <span className="hero-grid" aria-hidden="true" />
        <Container className="relative text-center">
          <p className="hero-in mb-6 text-xs font-light uppercase tracking-[0.2em] text-muted-foreground">{h.eyebrow}</p>
          <h1 className="hero-in text-[40px] font-extrabold leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
            {h.h1Line1}
            <br />
            <span className="text-brand">[</span>{h.h1Bracket}<span className="text-brand">]</span>
          </h1>
          <p className="hero-in mx-auto mt-7 max-w-2xl text-lg font-medium leading-snug text-balance sm:text-[22px]">{h.subtitle}</p>
          <div className="hero-in mt-8 flex justify-center">
            <Button asChild size="lg" className="btn-shine"><a href={site.cta.href}>{site.cta.label}</a></Button>
          </div>
        </Container>
        {/* Живой мониторинг — и на телефоне, в компактном виде (правки Сергея 30.10: «типа живой мониторинг») */}
        <Container className="relative mt-10 sm:mt-14">
          <HeroDashboard />
        </Container>
        <div aria-label={home.clientsTitle} role="region" className="marquee relative mt-14 overflow-hidden py-2">
          <h2 className="sr-only">{home.clientsTitle}</h2>
          <div className="marquee-track flex w-max items-center gap-14">
            {[...clientLogos, ...clientLogos].map((l, i) => (
              <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-10 w-auto max-w-[150px] object-contain opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert" />
            ))}
          </div>
        </div>
      </Section>

      {/* 2. Слоган и три точки входа «с чего начать» (правки Сергея 30.10) */}
      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow={home.entryPoints.title} title={home.entryPoints.heading} text={home.entryPoints.text} />
          <div data-reveal className="grid gap-4 md:grid-cols-3">
            {home.entryPoints.items.map((e, n) => {
              const Icon = entryIcons[n];
              return (
                <Link key={e.title} href={e.href} className="spot group flex flex-col border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
                  <span className="flex size-11 items-center justify-center bg-brand-bg text-brand"><Icon className="size-5" /></span>
                  <h3 className="mt-5 text-xl font-bold">{e.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{e.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-brand">{e.cta}<ArrowRight className="size-4" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 2б. Традиции и инновации: естественный интеллект + искусственный (правки Сергея 22.10) */}
      <Section>
        <Container>
          <SectionHead eyebrow={home.traditions.eyebrow} title={home.traditions.title} text={home.traditions.text} />
          <div data-reveal className="grid gap-4 lg:grid-cols-2">
            {[home.traditions.human, home.traditions.ai].map((c, i) => {
              const dark = i === 1;
              const Icon = dark ? BrainCircuit : Users;
              return (
                <div key={c.label} className={dark ? "spot spot-dark border border-transparent bg-ink p-8 text-white dark:border-border sm:p-10" : "spot border bg-background p-8 sm:p-10"}>
                  <p className={dark ? "flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/60" : "flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground"}>
                    <Icon className={dark ? "size-4 text-brand-on-ink" : "size-4 text-brand"} aria-hidden="true" />{c.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{c.title}</h3>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {c.items.map((it) => (
                      <li key={it} className={dark ? "flex gap-2 text-white/85" : "flex gap-2 text-foreground/80"}>
                        <Check className={dark ? "mt-1 size-4 shrink-0 text-brand-on-ink" : "mt-1 size-4 shrink-0 text-brand"} aria-hidden="true" />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Пять направлений — один Центр Правды: карточки с описаниями (правки Сергея 30.10). Подводка — прямой ответ «что такое ECO-PRO» (для поиска и нейросетей) */}
      <Section id="napravleniya" className="bg-card">
        <Container>
          <SectionHead eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.answer} />
          <EcosystemList />
        </Container>
      </Section>

      {/* 6. Вы — ключевой элемент экосистемы — после направлений (правки Сергея 30.10) */}
      <Section id="ekosistema">
        <Container>
          <SectionHead eyebrow={home.expertise.eyebrow} title={home.expertise.title} text={home.expertise.text} />
          <div data-reveal className="grid gap-4 lg:grid-cols-3">
            {home.expertise.columns.map((c, i) => {
              const dark = i === 2;
              return (
                <div key={c.label} className={dark ? "spot spot-dark border border-transparent bg-ink p-8 text-white dark:border-border" : "spot border bg-background p-8"}>
                  <p className={dark ? "text-xs uppercase tracking-[0.12em] text-white/60" : "text-xs uppercase tracking-[0.12em] text-muted-foreground"}>{c.label}</p>
                  <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
                  <ul className="mt-5 space-y-2">
                    {c.items.map((it) => <li key={it} className={dark ? "text-white/80" : "text-muted-foreground"}>— {it}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. География */}
      <Section id="geografiya" className="bg-card">
        <Container>
          <SectionHead eyebrow={home.geo.eyebrow} title={home.geo.title} text={home.geo.text} />
          <GeoMap />
          <details className="mt-6 border-t pt-4 text-sm">
            <summary className="cursor-pointer font-medium hover:text-brand">Все города списком</summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{geoMap.cities.map((c) => c.name).join(", ")}.</p>
            <p className="mt-2 leading-relaxed text-muted-foreground"><span className="text-foreground">Подмосковье:</span> {geoMap.inset.cities.slice(1).map((c) => c.name).join(", ")}.</p>
          </details>
        </Container>
      </Section>

            {/* Слово основателя — крупно на чёрном: главная идея «власть CEO» (ревью 22.10) */}
      <Section className="bg-ink text-white">
        <Container>
          <figure data-reveal className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center sm:flex-row sm:text-left">
            <Image src="/images/team/sergey-malyutenkov-studio.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={200} height={200} className="size-44 shrink-0 rounded-md object-cover" />
            <div>
              <blockquote className="text-xl font-medium leading-relaxed sm:text-2xl">«{home.ceo.quote}»</blockquote>
              <figcaption className="mt-4">
                <p className="font-bold">{home.ceo.name} — {home.ceo.role}</p>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="mt-1 inline-block text-sm text-brand-on-ink underline underline-offset-4">{home.ceo.channelLabel} ›</a>
              </figcaption>
            </div>
          </figure>
        </Container>
      </Section>

      {/* 9. Кейсы — тизер, полный список на /cases/ */}
      <Section id="keisy">
        <Container>
          <SectionHead eyebrow="реализованные проекты" title="Кейсы внедрения" />
          <CaseGrid items={featuredCases} />
          <div className="mt-8 text-center"><Button asChild variant="outline"><Link href="/cases/">Все кейсы</Link></Button></div>
        </Container>
      </Section>

      {/* 9б. Доверие — компактно: письма клиентов, допуски одной строкой, сканы — на /documents/ (правки Сергея 30.10) */}
      <Section id="dokumenty" className="bg-card">
        <Container>
          <SectionHead eyebrow="доверие" title="Рекомендации и допуски" text="Крупные сети рекомендуют нас как надёжного партнёра по системам безопасности. Работы выполняем по лицензии МЧС и с допусками СРО." />
          <div data-reveal className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {letters.map((d) => <DocCard key={d.id} d={d} compact />)}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-muted-foreground">Лицензия МЧС России, членство в СРО строителей и проектировщиков, International F&amp;B Safety Association и сертификаты производителей.</p>
            <Button asChild variant="outline"><Link href="/documents/">Все лицензии и рекомендации</Link></Button>
          </div>
        </Container>
        <DocLightboxes docs={letters} />
      </Section>

      {/* 9а. Лид-магнит: бесплатный пилот на 2 недели */}
      <Section id="pilot" className="relative overflow-hidden bg-ink text-white">
        <span className="cta-glow" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <p className="mb-4 text-xs font-light uppercase tracking-[0.18em] text-white/60">{home.pilot.eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{home.pilot.title}</h2>
            <p className="mt-4 text-lg text-white/75">{home.pilot.text}</p>
            <ul className="mt-6 space-y-3">
              {home.pilot.points.map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <div data-reveal className="border border-white/15 bg-background p-6 text-foreground sm:p-8">
            <p className="text-xl font-bold">Заявка на пилот</p>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">Ответим в течение рабочего дня</p>
            <LeadForm source="Пилот за 2 недели" submitLabel={home.pilot.submit} />
          </div>
        </Container>
      </Section>

      {/* 10. Для кого */}
      <Section>
        <Container>
          <SectionHead eyebrow={home.audience.eyebrow} title={home.audience.title} text={home.audience.text} />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.audience.roles.map((r) => (
              <div key={r.title} className="spot border bg-background p-6">
                <h3 className="font-bold">{r.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
          {/* Вход для действующих клиентов — как на pro-nas.pro */}
          <div data-reveal className="mt-4 flex flex-col items-start justify-between gap-4 border border-transparent bg-ink p-6 text-white dark:border-border sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="font-bold">{home.audience.client.title}</h3>
              <p className="mt-1 text-white/75">{home.audience.client.text}</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-white/30 bg-transparent text-white hover:bg-white hover:text-black"><Link href={home.audience.client.href}>{home.audience.client.cta}</Link></Button>
          </div>
        </Container>
      </Section>

      {/* 13. Отрасли */}
      <Section id="otrasli" className="bg-card">
        <Container>
          <SectionHead eyebrow={home.industries.eyebrow} title={home.industries.title} text={home.industries.text} />
          <div data-reveal className="grid gap-4 md:grid-cols-3">
            {industries.map((i) => <IndustryCard key={i.slug} i={i} />)}
          </div>
        </Container>
      </Section>

      {/* 14. CTA */}
      <CtaBlock />

      {/* 15. Блог */}
      {posts.length > 0 && (
        <Section id="novosti">
          <Container>
            <SectionHead eyebrow="активность экосистемы" title="Новости и статьи" />
            <div data-reveal className="grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="spot group border bg-background p-6 transition-colors hover:border-foreground sm:p-8">
                  <p className="text-sm text-muted-foreground"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                  <h3 className="mt-2 text-lg font-bold group-hover:text-brand">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
            {/* Подписка на каналы — из бывшего блока «Команда» */}
            <div className="mt-10 flex flex-col items-center gap-5 border-t pt-10 text-center">
              <div>
                <p className="text-2xl font-bold tracking-tight">Подписывайтесь на каналы <span className="whitespace-nowrap">ECO-PRO</span></p>
                <p className="mt-2 max-w-xl text-muted-foreground">Новости экосистемы, разборы кейсов и анонсы статей — в Telegram и MAX.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild><a href={site.contacts.telegram} target="_blank" rel="noopener">Telegram-канал</a></Button>
                <Button asChild variant="outline"><a href={site.contacts.max} target="_blank" rel="noopener">Канал в MAX</a></Button>
                <Button asChild variant="outline"><Link href="/blog/">Все статьи</Link></Button>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 16. FAQ */}
      <Section id="faq" className="bg-card">
        <Container className="max-w-4xl">
          <SectionHead eyebrow="вопросы и ответы" title="Часто задаваемые вопросы" />
          <FaqList items={homeFaq} />
        </Container>
      </Section>
    </>
  );
}
