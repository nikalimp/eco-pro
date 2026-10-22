import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Check, Crown, Database, ShieldCheck, Users, X as Cross } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { getPosts, formatDate } from "@/lib/posts";
import { Container, Section, SectionHead } from "@/components/container";
import { CaseGrid, CtaBlock, IndustryCard } from "@/components/blocks";
import { EcosystemGraph } from "@/components/ecosystem-graph";
import { LeadForm } from "@/components/lead-form";
import { HeroDashboard } from "@/components/hero-dashboard";
import { Viewfinder } from "@/components/viewfinder";
import { BtnMod } from "@/components/btn-mod";
import { GeoMap } from "@/components/geo-map";
import { StatTicker } from "@/components/stat-ticker";
import { FaqList } from "@/components/faq";
import { DocCard, DocLightboxes } from "@/components/doc-gallery";
import { letters, licenses } from "@/content/documents";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph } from "@/lib/schema";

// Блоки главной — specs/02-spec.md §5 (v0.5, правки 14.10)
export default function Home() {
  const entryIcons = [Crown, ShieldCheck, Database];
  const posts = getPosts().slice(0, 3);
  const h = home.hero;
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран — кадр видоискателя камеры (редизайн 22.10): REC, таймкод, рамка фокуса обходит показатели дашборда.
             H1 капсом со скобками, подзаголовок, кнопка; на телефоне дашборд скрыт (ревью 22.10) */}
      <section className="hero relative overflow-hidden px-2 pb-10 pt-2 sm:px-4 sm:pt-4">
        <Viewfinder cam="CAM 01" place="ECO-PRO" follow={false} className="relative">
          <span className="hero-grid" aria-hidden="true" />
          <Container className="relative flex min-h-[78svh] flex-col justify-end pb-16 pt-20 sm:min-h-[calc(100svh-7rem)] sm:pb-20 sm:pt-24">
            <p className="hero-in label mb-6 flex items-center gap-2 text-muted-foreground"><span className="size-2 bg-brand-solid" aria-hidden="true" />{h.eyebrow}</p>
            <h1 className="hero-in text-[52px] leading-[0.86] sm:text-8xl lg:text-[144px]">
              {h.h1Line1}
              <br />
              <span className="font-normal text-brand">[</span>{h.h1Bracket}<span className="font-normal text-brand">]</span>
            </h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="hero-in lg:col-span-4">
                <p className="text-lg leading-snug text-balance sm:text-xl">{h.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BtnMod href={site.cta.href}>{site.cta.label}</BtnMod>
                </div>
              </div>
              <div className="relative hidden sm:block lg:col-span-8">
                <HeroDashboard />
              </div>
            </div>
          </Container>
        </Viewfinder>
      </section>

      {/* 2. Три точки входа для разных ЛПР — как на pro-nas.pro (правки Сергея 22.10); под ними — логотипы клиентов (правки Ника 22.10) */}
      <Section>
        <Container>
          <SectionHead eyebrow={home.entryPoints.title} title={home.entryPoints.heading} text={home.entryPoints.text} />
          <div data-reveal className="grid gap-4 md:grid-cols-3">
            {home.entryPoints.items.map((e, n) => {
              const Icon = entryIcons[n];
              return (
                <Link key={e.title} href={e.href} className="spot group flex flex-col border bg-background p-6 transition-colors sm:p-8">
                  <span className="flex size-12 items-center justify-center bg-brand-solid text-white"><Icon className="size-5" /></span>
                  <h3 className="mt-5 text-xl font-bold">{e.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{e.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-brand">{e.cta}<ArrowRight className="size-4" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </Container>
        <div aria-label={home.clientsTitle} role="region" className="marquee relative mt-12 overflow-hidden py-2">
          <h2 className="sr-only">{home.clientsTitle}</h2>
          <div className="marquee-track flex w-max items-center gap-14">
            {[...clientLogos, ...clientLogos].map((l, i) => (
              <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-10 w-auto max-w-[150px] object-contain" />
            ))}
          </div>
        </div>
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
                <div key={c.label} className={dark ? "spot spot-dark red p-8 sm:p-10" : "spot border bg-card p-8 sm:p-10"}>
                  <p className={dark ? "label flex items-center gap-2 text-white" : "label flex items-center gap-2 text-muted-foreground"}>
                    <Icon className={dark ? "size-4 text-white" : "size-4 text-brand"} aria-hidden="true" />{c.label}
                  </p>
                  <h3 className="display mt-3 text-3xl leading-[0.95] sm:text-5xl">{c.title}</h3>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {c.items.map((it) => (
                      <li key={it} className={dark ? "flex gap-2 text-white" : "flex gap-2 text-foreground/80"}>
                        <Check className={dark ? "mt-1 size-4 shrink-0 text-white" : "mt-1 size-4 shrink-0 text-brand"} aria-hidden="true" />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. О нас: переключатель «до / после» — на CSS, работает без JavaScript */}
      <Section id="o-nas" className="border-y bg-card">
        <Container>
          <SectionHead eyebrow={home.about.eyebrow} title={home.about.title} text={home.about.text} />
          <div className="ba" data-reveal>
            <input type="radio" name="ba" id="ba-before" className="sr-only" defaultChecked />
            <input type="radio" name="ba" id="ba-after" className="sr-only" />
            <div className="ba-tabs relative mb-8 grid w-fit grid-cols-2 border border-input p-1 text-sm font-medium">
              <span className="ba-pill" aria-hidden="true" />
              <label htmlFor="ba-before" className="relative z-10 cursor-pointer px-6 py-3 text-center sm:px-10">{home.about.problemsTitle}</label>
              <label htmlFor="ba-after" className="relative z-10 cursor-pointer px-6 py-3 text-center sm:px-10">{home.about.principlesTitle}</label>
            </div>
            <div className="ba-before">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.about.problems.map((p) => (
                  <div key={p.title} className="border border-brand-solid/40 bg-bad p-6">
                    <p className="flex items-center gap-2 font-bold"><Cross className="size-4 text-brand" aria-hidden="true" />{p.title}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ba-after">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.about.principles.map((p) => (
                  <div key={p.title} className="border border-positive/30 bg-good p-6">
                    <p className="flex items-center gap-2 font-bold"><Check className="size-4 text-positive" aria-hidden="true" />{p.title}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.text}</p>
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
                <div key={c.label} className={dark ? "spot bg-foreground p-8 text-background" : "spot border bg-card p-8"}>
                  <p className={dark ? "label text-background" : "label text-muted-foreground"}><span className={dark ? "text-[#c4111a]" : "idx"}>[{String(i + 1).padStart(2, "0")}]</span> {c.label}</p>
                  <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
                  <ul className="mt-5 space-y-2">
                    {c.items.map((it) => <li key={it} className={dark ? "text-background" : "text-muted-foreground"}>— {it}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Экосистема: граф с PRO-TEST в центре. Подводка — прямой ответ «что такое ECO-PRO» (для поиска и нейросетей) */}
      <Section id="napravleniya" className="border-y bg-card">
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

      {/* 8. Слово основателя — красная «пауза»: текст слева, цветное фото справа (правки Ника 22.10) */}
      <Section className="red">
        <Container>
          <figure data-reveal className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="label mb-6 text-white">{home.ceo.eyebrow}</p>
              <blockquote className="text-2xl font-medium leading-snug text-white sm:text-3xl">«{home.ceo.quote}»</blockquote>
              <figcaption className="mt-6 border-t border-white/40 pt-4">
                <p className="display text-2xl">{home.ceo.name} — {home.ceo.role}</p>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="mt-2 inline-block text-sm text-white underline underline-offset-4">{home.ceo.channelLabel} ›</a>
              </figcaption>
            </div>
            <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={640} height={640} className="mx-auto aspect-square w-full max-w-sm object-cover lg:col-span-4" />
          </figure>
        </Container>
      </Section>

      {/* 9. Кейсы — тизер, полный список на /cases/ */}
      <Section id="keisy">
        <Container>
          <SectionHead eyebrow="реализованные проекты" title="Кейсы внедрения" />
          <CaseGrid items={featuredCases} />
          <div className="mt-8"><BtnMod href="/cases/" variant="outline">Все кейсы</BtnMod></div>
        </Container>
      </Section>

      {/* 9б. Доверие: рекомендации заказчиков и допуски (документы «Император Техно», PRO-TECHNO) */}
      <Section id="dokumenty" className="border-y bg-card">
        <Container>
          <SectionHead eyebrow="доверие" title="Рекомендации и допуски" text="Крупные сети рекомендуют нас как надёжного партнёра по системам безопасности. Работы выполняем по лицензии МЧС и с допусками СРО." />
          {/* Письма клиентов и лицензии — разные истории, поэтому два отдельных ряда (правки Сергея 22.10) */}
          <h3 className="mb-5 text-lg font-bold">Рекомендательные письма клиентов</h3>
          <div data-reveal className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {letters.map((d) => <DocCard key={d.id} d={d} compact />)}
          </div>
          <h3 className="mb-5 mt-14 border-t pt-10 text-lg font-bold">Лицензии и допуски</h3>
          <div data-reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {licenses.map((d) => <DocCard key={d.id} d={d} compact />)}
          </div>
          <div className="mt-10"><BtnMod href="/documents/" variant="outline">Все документы и сертификаты</BtnMod></div>
        </Container>
        <DocLightboxes docs={[...letters, ...licenses]} />
      </Section>

      {/* 9а. Лид-магнит: пилот за 2 недели */}
      <Section id="pilot" className="relative overflow-hidden">
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <p className="label mb-4 flex items-center gap-2 text-muted-foreground"><span className="size-2 bg-brand-solid" aria-hidden="true" />{home.pilot.eyebrow}</p>
            <h2 className="display text-4xl leading-[0.95] text-balance sm:text-6xl">{home.pilot.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{home.pilot.text}</p>
            <ul className="mt-6 space-y-3">
              {home.pilot.points.map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 size-2 shrink-0 bg-brand-solid" aria-hidden="true" />{t}</li>
              ))}
            </ul>
                      </div>
          <Viewfinder cam="CAM 03" place="Заявка" chips={["AI"]} fps="" corner="Ответ за 1 день" focus={false} timecode={false} className="bg-card p-6 pt-16 sm:p-10 sm:pt-16">
            <div data-reveal>
              <p className="display text-3xl">Заявка на пилот</p>
              <p className="mb-6 mt-1 text-sm text-muted-foreground">Ответим в течение рабочего дня</p>
              <LeadForm source="Пилот за 2 недели" submitLabel={home.pilot.submit} />
            </div>
          </Viewfinder>
        </Container>
      </Section>

      {/* 10. Для кого */}
      <Section>
        <Container>
          <SectionHead eyebrow={home.audience.eyebrow} title={home.audience.title} text={home.audience.text} />
          <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.audience.roles.map((r) => (
              <div key={r.title} className="spot border bg-card p-6">
                <h3 className="font-bold">{r.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
          {/* Вход для действующих клиентов — как на pro-nas.pro */}
          <div data-reveal className="mt-4 flex flex-col items-start justify-between gap-4 bg-foreground p-6 text-background sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="font-bold">{home.audience.client.title}</h3>
              <p className="mt-1 text-background/80">{home.audience.client.text}</p>
            </div>
            <BtnMod href={home.audience.client.href} icon="up" className="shrink-0">{home.audience.client.cta}</BtnMod>
          </div>
        </Container>
      </Section>

      {/* 11. Путь к результату — общий пайплайн */}
      <Section className="border-y bg-card">
        <Container>
          <SectionHead eyebrow={home.path.eyebrow} title={home.path.title} />
          <ol data-reveal className="pipeline relative grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-14">
            <span className="pipeline-line" aria-hidden="true" />
            {home.path.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="pipeline-dot" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-14 grid grid-cols-3 gap-2 border-t pt-6 sm:gap-6">
            {home.path.facts.map((f) => (
              <div key={f.label}>
                <dd className="display whitespace-nowrap text-4xl leading-none tabular-nums sm:text-7xl"><span className="font-normal text-brand">[</span><StatTicker value={f.value} /><span className="font-normal text-brand">]</span></dd>
                <dt className="label mt-3 text-muted-foreground">{f.label}</dt>
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
              <li key={p.name}>
                <Image src={p.photo} alt={`${p.name} — ${p.role}`} width={400} height={400} className="aspect-square w-full object-cover grayscale transition hover:grayscale-0" />
                <p className="display mt-4 text-2xl">{p.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <BtnMod href={site.contacts.telegram} variant="outline" icon="up" external>Telegram-канал</BtnMod>
            <BtnMod href={site.contacts.max} variant="outline" icon="up" external>Канал в MAX</BtnMod>
          </div>
        </Container>
      </Section>

      {/* 13. Отрасли */}
      <Section id="otrasli" className="border-y bg-card">
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
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="spot group border bg-card p-6 transition-colors sm:p-8">
                  <p className="label text-muted-foreground"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                  <h3 className="mt-2 text-lg font-bold group-hover:text-brand">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8"><BtnMod href="/blog/" variant="outline">Все статьи</BtnMod></div>
          </Container>
        </Section>
      )}

      {/* 16. FAQ */}
      <Section id="faq" className="border-t bg-card">
        <Container className="max-w-4xl">
          <SectionHead eyebrow="вопросы и ответы" title="Часто задаваемые вопросы" center />
          <FaqList items={homeFaq} />
        </Container>
      </Section>
    </>
  );
}
