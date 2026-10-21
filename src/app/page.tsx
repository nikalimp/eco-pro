import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Check, Crown, Database, ShieldCheck, X as Cross } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { getPosts, formatDate } from "@/lib/posts";
import { Container, Section, SectionHead } from "@/components/container";
import { Button } from "@/components/ui/button";
import { CaseGrid, CtaBlock, IndustryCard } from "@/components/blocks";
import { EcosystemGraph } from "@/components/ecosystem-graph";
import { IllPilot } from "@/components/illustrations";
import { LeadForm } from "@/components/lead-form";
import { HeroDashboard } from "@/components/hero-dashboard";
import { GeoMap } from "@/components/geo-map";
import { StatTicker } from "@/components/stat-ticker";
import { FaqList } from "@/components/faq";
import { DocCard, DocLightboxes } from "@/components/doc-gallery";
import { letters, licenses } from "@/content/documents";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph } from "@/lib/schema";

// Блоки главной — specs/02-spec.md §5 (v0.5, правки 14.10)
export default function Home() {
  const effectIcons = [Database, ShieldCheck, Crown, BrainCircuit];
  const posts = getPosts().slice(0, 4);
  const h = home.hero;
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран: надзаголовок, H1 со скобками как в логотипе, подзаголовок, одна кнопка, дашборд и логотипы клиентов */}
      <Section className="hero relative overflow-hidden pb-10 pt-14 sm:pt-20">
        <span className="hero-grid" aria-hidden="true" />
        <Container className="relative text-center">
          <p className="hero-in mb-6 text-xs font-light uppercase tracking-[0.2em] text-muted-foreground">{h.eyebrow}</p>
          <h1 className="hero-in text-[44px] font-black leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            {h.h1Line1}
            <br />
            <span className="text-brand">[</span>{h.h1Bracket}<span className="text-brand">]</span>
          </h1>
          <p className="hero-in mx-auto mt-8 max-w-2xl text-lg font-medium leading-snug text-balance sm:text-2xl">{h.subtitle}</p>
          <div className="hero-in mt-8 flex justify-center">
            <Button asChild size="lg" className="btn-shine"><a href={site.cta.href}>{site.cta.label}</a></Button>
          </div>
        </Container>
        <Container className="relative mt-14">
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

      {/* 2. Тезис крупным текстом + эффект для руководителя (иконки вместо номеров) */}
      <Section className="border-t">
        <Container>
          <h2 data-reveal className="mx-auto max-w-4xl text-center text-2xl font-bold leading-snug tracking-tight text-balance sm:text-4xl">{home.statement}</h2>
          <div data-reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.effects.map((e, n) => {
              const Icon = effectIcons[n];
              return (
                <div key={e.title} className="spot border bg-background p-6">
                  <span className="flex size-11 items-center justify-center bg-brand-bg text-brand"><Icon className="size-5" /></span>
                  <h3 className="mt-5 text-lg font-bold">{e.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. О нас: переключатель «до / после» — на CSS, работает без JavaScript */}
      <Section id="o-nas" className="bg-card">
        <Container>
          <SectionHead eyebrow={home.about.eyebrow} title={home.about.title} text={home.about.text} />
          <div className="ba" data-reveal>
            <input type="radio" name="ba" id="ba-before" className="sr-only" defaultChecked />
            <input type="radio" name="ba" id="ba-after" className="sr-only" />
            <div className="ba-tabs relative mx-auto mb-8 grid w-fit grid-cols-2 rounded-full border p-1 text-sm font-medium">
              <span className="ba-pill" aria-hidden="true" />
              <label htmlFor="ba-before" className="relative z-10 cursor-pointer rounded-full px-6 py-2.5 text-center sm:px-10">До</label>
              <label htmlFor="ba-after" className="relative z-10 cursor-pointer rounded-full px-6 py-2.5 text-center sm:px-10">После</label>
            </div>
            <div className="ba-before">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.about.problems.map((p) => (
                  <div key={p.title} className="border border-brand/25 bg-bad p-6">
                    <p className="flex items-center gap-2 font-bold"><Cross className="size-4 text-brand" aria-hidden="true" />{p.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ba-after">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.about.principles.map((p) => (
                  <div key={p.title} className="border border-positive/30 bg-good p-6">
                    <p className="flex items-center gap-2 font-bold"><Check className="size-4 text-positive" aria-hidden="true" />{p.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Вы — ключевой элемент экосистемы */}
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

      {/* 5. Экосистема: граф с PRO-TEST в центре. Подводка — прямой ответ «что такое ECO-PRO» (для поиска и нейросетей) */}
      <Section id="napravleniya" className="bg-card">
        <Container>
          <SectionHead eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.answer} />
          <EcosystemGraph />
        </Container>
      </Section>

      {/* 7. География */}
      <Section id="geografiya">
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

      {/* 8. Слово основателя */}
      <Section className="bg-card">
        <Container>
          <figure data-reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
            <Image src="/images/team/sergey-malyutenkov-studio.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={200} height={200} className="size-40 shrink-0 rounded-md object-cover" />
            <div>
              <blockquote className="text-lg leading-relaxed">«{home.ceo.quote}»</blockquote>
              <figcaption className="mt-4">
                <p className="font-bold">{home.ceo.name} — {home.ceo.role}</p>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="mt-1 inline-block text-sm text-brand underline underline-offset-4">{home.ceo.channelLabel} ›</a>
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

      {/* 9б. Доверие: рекомендации заказчиков и допуски (документы «Император Техно», PRO-TECHNO) */}
      <Section id="dokumenty" className="bg-card">
        <Container>
          <SectionHead eyebrow="доверие" title="Рекомендации и допуски" text="Крупные сети рекомендуют нас как надёжного партнёра по системам безопасности. Работы выполняем по лицензии МЧС и с допусками СРО." />
          <div data-reveal className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {letters.map((d) => <DocCard key={d.id} d={d} compact />)}
          </div>
          <ul data-reveal className="mt-8 flex flex-wrap justify-center gap-2">
            {licenses.slice(0, 3).map((d) => (
              <li key={d.id}><a href={`#doc-${d.id}`} className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium hover:border-foreground"><Check className="size-4 text-positive" aria-hidden="true" />{d.title}{d.meta ? <span className="text-muted-foreground">· {d.meta}</span> : null}</a></li>
            ))}
          </ul>
          <div className="mt-8 text-center"><Button asChild variant="outline"><Link href="/documents/">Все документы и сертификаты</Link></Button></div>
        </Container>
        <DocLightboxes docs={[...letters, ...licenses.slice(0, 3)]} />
      </Section>

      {/* 9а. Лид-магнит: пилот за 2 недели */}
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
            <IllPilot className="mt-8 hidden h-auto w-full max-w-md text-white/70 sm:block" />
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
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11. Путь к результату — общий пайплайн */}
      <Section className="bg-card">
        <Container>
          <SectionHead eyebrow={home.path.eyebrow} title={home.path.title} />
          <ol data-reveal className="pipeline relative grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-14">
            <span className="pipeline-line" aria-hidden="true" />
            {home.path.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="pipeline-dot" aria-hidden="true">{i + 1}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-12 grid grid-cols-3 gap-2 text-center sm:gap-4">
            {home.path.facts.map((f) => (
              <div key={f.label}>
                <dd className="text-3xl font-black tracking-tight tabular-nums sm:text-5xl"><StatTicker value={f.value} /></dd>
                <dt className="mt-1 text-[11px] uppercase leading-tight tracking-[0.06em] text-muted-foreground sm:text-sm sm:tracking-[0.08em]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 12. Команда */}
      <Section id="komanda">
        <Container>
          <SectionHead eyebrow={home.team.eyebrow} title={home.team.title} text={home.team.text} />
          <ul data-reveal className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {home.team.people.map((p) => (
              <li key={p.name} className="text-center">
                <Image src={p.photo} alt={`${p.name} — ${p.role}`} width={400} height={400} className="aspect-square w-full rounded-md object-cover" />
                <p className="mt-4 font-bold">{p.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline"><a href={site.contacts.telegram} target="_blank" rel="noopener">Telegram-канал</a></Button>
            <Button asChild variant="outline"><a href={site.contacts.max} target="_blank" rel="noopener">Канал в MAX</a></Button>
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
            <div data-reveal className="grid gap-4 md:grid-cols-2">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="spot group border bg-background p-6 transition-colors hover:border-black sm:p-8">
                  <p className="text-sm text-muted-foreground"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                  <h3 className="mt-2 text-lg font-bold group-hover:text-brand">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center"><Button asChild variant="outline"><Link href="/blog/">Все статьи</Link></Button></div>
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
