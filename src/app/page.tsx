import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, ClipboardList, Cpu, Factory, Gauge, Radar, ShieldAlert, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { cases } from "@/content/cases";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts, formatDate } from "@/lib/posts";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import { Quiz } from "@/components/quiz";
import { IndexTest } from "@/components/index-test";
import { JsonLd } from "@/components/json-ld";
import { CountUp } from "@/components/count-up";
import { Accent, Button, DsRoot, Heading, IconBox, Index, List, Section, SectionHeader, Tag, Text, Tile, Wrap } from "@/components/ds";
import { EcoScene, StepArt } from "@/components/home/iso";
import { HeroPlanInteractive } from "@/components/home/hero-plan";
import { CaseSlider } from "@/components/home/case-slider";
import { GeoTip } from "@/components/home/geo-tip";
import { faqSchema, graph } from "@/lib/schema";
import "@/components/home/home.css";

// Главная — бывшая /3/ (итерация v3, 16.11): облегчённый дизайн и смыслы презентации «СЦ для СЕО 3».
// Порядок блоков — specs/2026-11-16-итерация-правок-v3.md, раздел 3.4. Факты — только из src/content.
// Прежняя главная — на /1/ (noindex), /3/ → 301 на / (.htaccess).

const problemIcons = [ShieldAlert, ClipboardList, Cpu, BarChart3, Radar, Gauge];
const indIcons = [ShoppingBag, UtensilsCrossed, Factory];

export default function Home() {
  const h = home.hero;
  const posts = getPosts().slice(0, 4);
  const covered = coverMap.regions.filter((r) => r.name).length;
  const core = directions[0];
  // Слайды — все кейсы с критериями для CEO (правки Ника 17.11)
  const ceoCases = cases.filter((c) => c.ceo?.length);

  return (
    <DsRoot className="v3">
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран: чертёж без фона и интерактивный, бегущая строка логотипов внизу без подписи (правки Ника 17.11) */}
      <section className="flex flex-col lg:min-h-[calc(100svh-6.25rem)]">
        <div className="ds-wrap grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <Tag tone="gray" className="w-fit bg-white"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
            <Heading size="display" className="kt mt-8">
              <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
              <br />
              <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l ds-accent">[</span><span className="kt-mid ds-accent">{h.h1Bracket}</span><span className="kt-br kt-r ds-accent">]</span></span></span>
            </Heading>
            <Text size="lead" className="mt-7 max-w-[36ch]">{h.subtitle}</Text>
            <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          </div>
          <HeroPlanInteractive />
        </div>
        <div className="ds-wrap">
          <div className="marquee overflow-hidden border-t border-[var(--c-border)] py-6" aria-label={home.clientsTitle}>
            <div className="marquee-track flex w-max items-center gap-16">
              {[...clientLogos, ...clientLogos].map((l, i) => (
                <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="v3-logo h-9 w-auto max-w-[140px] object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Задачи → решения: закреплённая секция, задачи появляются вокруг круга и зеленеют */}
      <section className="v3-orbit-track">
        <Wrap className="v3-orbit-pin py-16 lg:py-0">
          <div className="v3-orbit">
            <div className="v3-orbit-core mb-10 lg:mb-0">
              <div className="v3-flip-wrap">
                <div className="v3-face-prob">
                  <Heading size="h3" as="h2">С какими <Accent>задачами</Accent> к нам приходят</Heading>
                  <Text className="mt-4">{home.about.text}</Text>
                </div>
                <div className="v3-face-fix">
                  <Heading size="h3" as="p">И всё это мы <span className="v3-ok">исправляем</span></Heading>
                  <Text className="mt-4">Каждую задачу закрывает своё направление экосистемы, а ситуационный центр доводит работу до результата.</Text>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
              {home.about.problems.map((pr, i) => {
                const Icon = problemIcons[i];
                return (
                  <Tile key={pr.title} className="v3-orbit-card v3-flip-wrap p-4">
                    <div className="v3-face-prob">
                      <p className="flex items-center gap-3"><IconBox size="sm" className="rounded-full"><Icon /></IconBox><span className="ds-h5">{pr.title}</span></p>
                      <Text size="small" className="mt-3">{pr.text}</Text>
                    </div>
                    <div className="v3-face-fix">
                      <p className="flex items-center gap-3"><IconBox size="sm" className="rounded-full !bg-[var(--c-success)]"><Check /></IconBox><span className="ds-h5 text-[var(--c-success)]">{pr.fix.title}</span></p>
                      <Text size="small" className="mt-3">{pr.fix.text}</Text>
                    </div>
                  </Tile>
                );
              })}
            </div>
          </div>
        </Wrap>
      </section>

      {/* 6. Экосистема: пять направлений и Центр Правды. Смыслы снятого блока «Новая архитектура власти CEO» (слайды 10, 23, 26) — в карточке ядра */}
      <Section tone="layer" id="napravleniya" className="v3-eco">
        <Wrap>
          <SectionHeader eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.ecosystem.text} />
          <div className="v3-eco-grid mt-14">
            {directions.slice(1, 5).map((d) => (
              <Tile key={d.slug} asChild className="v3-eco-card v3-eco-side group flex flex-col">
                <Link href={`/services/${d.slug}/`}>
                  <div className="flex flex-col p-5 sm:p-6">
                    <Tag className="w-fit">{d.code}</Tag>
                    <Heading size="h4" as="h3" className="mt-4 group-hover:text-[var(--c-brand)]">{d.title}</Heading>
                    <Text size="small" className="mt-2">{d.short}</Text>
                  </div>
                  <div className="iso-light mx-5 mb-5 mt-auto sm:mx-6 sm:mb-6"><EcoScene code={d.code} className="h-auto w-full" /></div>
                </Link>
              </Tile>
            ))}
            <Tile asChild className="v3-eco-card v3-eco-core group">
              <Link href={`/services/${core.slug}/`} className="grid items-center gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.6fr]">
                <div>
                  <p className="flex items-center gap-3"><Tag>{core.code}</Tag><Text size="label" as="span">ядро экосистемы</Text></p>
                  <Heading size="h3" as="h3" className="mt-5 group-hover:text-[var(--c-brand)]">{core.title}</Heading>
                  <Text className="mt-4 max-w-[52ch]">{home.architecture.glasses}. {home.architecture.knowledge.split(". ")[0]}.</Text>
                  <ol className="mt-6 grid gap-2 border-l-2 border-[var(--c-brand)] pl-4">
                    {home.architecture.steps.map((st, i) => <li key={i} className="ds-small"><span className="font-medium text-[var(--c-text)]">{st.who}</span> — {st.what.charAt(0).toLowerCase() + st.what.slice(1)}</li>)}
                  </ol>
                  <span className="ds-btn mt-8 min-h-12 w-fit bg-[var(--c-brand)] pl-5 pr-1 text-sm text-white">Подробнее<span className="ds-btn-mod size-10 bg-white text-[22px] text-[var(--c-brand)]" aria-hidden="true">+</span></span>
                </div>
                <div className="iso-light"><EcoScene code={core.code} className="h-auto w-full" /></div>
              </Link>
            </Tile>
          </div>

        </Wrap>
      </Section>

      {/* 7. Вы — ключевой элемент экосистемы (правки Сергея 30.10) + «Как работает PRO». Серый фон продолжает секцию «Экосистема» (правки Ника 17.11) */}
      <Section tone="layer" id="ekosistema" className="!pt-0">
        <Wrap>
          <SectionHeader eyebrow={home.expertise.eyebrow} title={home.expertise.title} text={home.expertise.text} />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {home.expertise.columns.map((c, i) => (
              <Tile key={c.label} className={i === 2 ? "border-[var(--c-brand)] p-8" : "p-8"}>
                <p className="ds-label">{c.label}</p>
                <Heading size="h3" as="h3" className="mt-3">{c.title}</Heading>
                <List items={c.items} className="mt-5" />
              </Tile>
            ))}
          </div>
          <Heading size="h4" as="h3" className="mt-16">{home.about.principlesTitle}</Heading>
          <ul className="mt-6 grid gap-x-10 gap-y-6 border-t border-[var(--c-border)] pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.about.principles.map((pr, i) => (
              <li key={pr.title} className="flex gap-4">
                <Index n={i + 1} />
                <div><p className="ds-h5">{pr.title}</p><p className="ds-small mt-1">{pr.text}</p></div>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* 9. Дашборд как в личном кабинете (слайд 25) */}
      <Section>
        <Wrap>
          <SectionHeader eyebrow={home.audience.client.title} title={<>Онлайн-дашборды: <Accent>индекс управляемости</Accent> вашей сети</>} text={home.architecture.dashboards} />
          <HeroDashboard className="mt-12 hidden md:block" />
          <HeroDashboard variant="compact" className="mt-10 md:hidden" />
          <div className="mt-10 flex justify-center"><Button asChild variant="secondary" icon="↗"><Link href="/account/">Демо личного кабинета</Link></Button></div>
        </Wrap>
      </Section>

      {/* 10. Кейсы для CEO — слайды во всю ширину экрана (правки Ника 17.11; слайды 11–13, 19–21) */}
      <Section tone="layer" id="keisy">
        <Wrap><SectionHeader eyebrow={home.ceoCases.eyebrow} title={home.ceoCases.title} /></Wrap>
        <div className="mt-12"><CaseSlider items={ceoCases} /></div>
        <Wrap><div className="mt-10 flex justify-center"><Button asChild variant="secondary"><Link href="/cases/">Все кейсы</Link></Button></div></Wrap>
      </Section>

      {/* 11б. Тест «Индекс управляемости CEO» — лид-магнит (идея 1) */}
      <Section id="indeks">
        <Wrap>
          <SectionHeader eyebrow={home.indexTest.eyebrow} title={home.indexTest.title} text={home.indexTest.text} />
          <div className="mt-12"><IndexTest /></div>
        </Wrap>
      </Section>

      {/* 13. План внедрения (слайд 29): пять этапов во всю ширину экрана, у каждого чертёж (правки Ника 17.11) */}
      <Section tone="layer">
        <Wrap><SectionHeader eyebrow={home.pilot.eyebrow} title={<>Пилот ситуационного центра за 60 дней <Accent>покажет, кто влияет на процессы</Accent> в вашей компании</>} /></Wrap>
        <ol className="v3-steps mt-12">
          {home.path.steps.map((st, i) => (
            <li key={st.title} className="ds-tile flex flex-col p-5">
              <div className="iso-light"><StepArt n={[0, 1, 4, 2, 3][i]} className="h-auto w-full" /></div>
              <Index n={i + 1} className="mt-6" />
              <Heading size="h4" as="h3" className="mt-3">{st.title}</Heading>
              <Text size="small" className="mt-2">{st.text}</Text>
            </li>
          ))}
        </ol>
      </Section>

      {/* 13б. Лид-магнит: заявка на пилот (слайд 30) — акцентный фон, цифры экспертной экосистемы (слайды 27–28), горизонтальная форма (правки Ника 17.11) */}
      <Section id="pilot" className="scroll-mt-20">
        <Wrap>
          <div className="bg-[var(--c-brand)] p-6 text-white sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="ds-eyebrow !text-white/80">заявка на пилот</p>
              <Heading size="h2" as="h2" className="mt-4 !text-white">{home.pilot.title}</Heading>
              <p className="ds-body mx-auto mt-4 max-w-2xl !text-white/85">{home.pilot.text}</p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px border-y border-white/25 lg:grid-cols-4">
              {home.expertEco.cards.map((c) => (
                <div key={c.label} className="flex flex-col-reverse justify-end px-2 py-6 text-center">
                  <dt className="ds-small mt-2 !text-white/85">{c.text}</dt>
                  <dd className="v3-geo-num"><CountUp value={c.value} /></dd>
                </div>
              ))}
            </dl>
            <div className="mt-10"><LeadForm dark layout="row" source="Пилот за 60 дней (главная)" submitLabel={home.pilot.submit} buttonClassName="!bg-white !text-[var(--c-brand)] hover:!bg-white/90" /></div>
          </div>
        </Wrap>
      </Section>

      {/* 12. География (слайд 28) */}
      <Section tone="layer" className="v3-geo" id="geografiya">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <SectionHeader align="left" eyebrow={home.geo.eyebrow} title={home.geo.title} text={home.geo.text} />
              <dl className="mt-10 grid grid-cols-3 gap-px border border-[var(--c-border)] bg-[var(--c-border)]">
                {home.geo.stats.map((st) => (
                  <div key={st.label} className="flex flex-col-reverse justify-end bg-white p-5">
                    <dt className="ds-small mt-2">{st.label}</dt>
                    <dd className="v3-geo-num"><CountUp value={st.value} /></dd>
                  </div>
                ))}
              </dl>
              <p className="ds-small mt-6">Федеральные округа: {home.geo.districts.join(", ")}.</p>
            </div>
            <div className="geo-map relative">
              <svg viewBox={`0 0 ${coverMap.width} ${coverMap.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered} регионов с проектами ECO-PRO`}>
                {coverMap.regions.map((r, i) =>
                  r.name ? (
                    <path key={i} d={r.d} className="geo-reg is-on" tabIndex={0} role="img" aria-label={r.cities?.length ? `${r.name}: ${r.cities.join(", ")}` : r.name} data-name={r.name} data-cities={r.cities?.join(", ") ?? ""} />
                  ) : (
                    <path key={i} d={r.d} className="geo-reg" aria-hidden="true" />
                  ),
                )}
              </svg>
              <GeoTip />
            </div>
          </div>
        </Wrap>
      </Section>

      {/* 14. Кому подходит + вход для действующих клиентов */}
      <Section>
        <Wrap>
          <SectionHeader eyebrow={home.audience.eyebrow} title={home.audience.title} text={home.audience.text} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.audience.roles.map((r) => (
              <Tile key={r.title} className="p-6 sm:p-7">
                <Heading size="h5" as="h3">{r.title}</Heading>
                <Text size="small" className="mt-2">{r.text}</Text>
              </Tile>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 border border-[var(--c-brand)] bg-[var(--c-layer)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <Heading size="h5" as="h3">{home.audience.client.title}</Heading>
              <Text size="small" className="mt-1">{home.audience.client.text}</Text>
            </div>
            <Button asChild variant="secondary" className="shrink-0"><Link href={home.audience.client.href}>{home.audience.client.cta}</Link></Button>
          </div>
        </Wrap>
      </Section>

      {/* 14б. Брифинг-квиз «Стратегия интеграции» (оставляем вместе с тестом индекса — решение 16.11) */}
      <Section tone="layer" id="brifing">
        <Wrap>
          <SectionHeader eyebrow={home.quiz.eyebrow} title={home.quiz.title} text={home.quiz.text} />
          <div className="mt-12"><Quiz /></div>
        </Wrap>
      </Section>

      {/* 15. Отрасли */}
      <Section id="otrasli">
        <Wrap>
          <SectionHeader eyebrow={home.industries.eyebrow} title={home.industries.title} text={home.industries.text} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = indIcons[i] ?? Factory;
              return (
                <Tile key={ind.slug} asChild className="group flex flex-col p-6 sm:p-8">
                  <Link href={`/industries/${ind.slug}/`}>
                    <p className="flex items-start justify-between"><IconBox className="rounded-full"><Icon /></IconBox><Index n={i + 1} /></p>
                    <Heading size="h4" as="h3" className="mt-8">{ind.title}</Heading>
                    <Text size="small" className="mt-3">{ind.short}</Text>
                    <List items={ind.tasks} className="mt-6 flex-1 border-t border-[var(--c-border)] pt-6" />
                    <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-medium group-hover:text-[var(--c-brand)]">Смотреть обзор<ArrowRight className="size-4" aria-hidden="true" /></span>
                  </Link>
                </Tile>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* 16. Слово основателя — как на pro-nas.pro: цитата по центру, под ней аватар, имя, регалии и канал (правки Ника 17.11) */}
      <Section tone="layer">
        <Wrap>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="ds-h4 space-y-6 !leading-relaxed">
              {/* Два абзаца, как на pro-nas.pro: второй начинается с «От муравейника» */}
              {home.ceo.quote.split(/\s(?=От\s)/).map((t, i, a) => <p key={i}>{i === 0 ? "«" : ""}{t}{i === a.length - 1 ? "»" : ""}</p>)}
            </blockquote>
            <figcaption className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:text-left">
              <Image src="/images/team/sergey-malyutenkov-studio.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={96} height={96} className="size-24 shrink-0 rounded-full object-cover object-top" />
              <div>
                <p className="ds-h5 !text-lg">{home.ceo.name}, {home.ceo.role.charAt(0).toLowerCase() + home.ceo.role.slice(1)}</p>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="mt-1 inline-block text-[15px] text-[var(--c-brand)] hover:underline">{home.ceo.channelLabel} ›</a>
              </div>
            </figcaption>
            <ul className="ds-small mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-1">
              {home.ceo.regalia.map((r) => <li key={r.org}>{r.org}, {r.years} — {r.role}</li>)}
            </ul>
          </figure>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <SectionHeader eyebrow={home.team.eyebrow} title={<>Люди <Accent>экосистемы</Accent></>} text={home.team.text} />
          <ul className={`mt-12 grid grid-cols-2 gap-4 ${home.team.people.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {home.team.people.map((pp) => (
              <li key={pp.name} className="ds-tile">
                <div className="v3-duo v3-duo-soft relative aspect-[4/5]">
                  <Image src={pp.photo} alt={`${pp.name}, ${pp.role.toLowerCase()}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover object-top" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="ds-h5">{pp.name}</p>
                  <p className="ds-small mt-1">{pp.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* 17. Рекомендательные письма */}
      <Section tone="layer">
        <Wrap>
          <SectionHeader eyebrow="рекомендации" title={<>Нас рекомендуют <Accent>клиенты</Accent></>} text="Письма крупных сетей и отраслевых ассоциаций. Лицензии, СРО и партнёрские сертификаты — на странице документов." />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {letters.map((dd) => (
              <li key={dd.id}>
                <Link href="/documents/" className="group block">
                  <span className="block overflow-hidden border border-[var(--c-border)] bg-white p-2">
                    <Image src={dd.image.replace(".webp", "-sm.webp")} alt={`${dd.title}: ${dd.text}`} width={339} height={480} className="aspect-[339/480] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  </span>
                  <span className="ds-h5 mt-3 block">{dd.title}</span>
                  <span className="ds-small block">{dd.issuer}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center"><Button asChild variant="secondary"><Link href="/documents/">Все документы</Link></Button></div>
        </Wrap>
      </Section>

      {/* 18. Блог, FAQ, финальный призыв */}
      {posts.length > 0 && (
        <Section>
          <Wrap>
            <SectionHeader eyebrow="блог" title={<><Accent>Делимся экспертизой</Accent> в управляемости и контроле</>} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {posts.map((pp) => (
                <Tile key={pp.slug} asChild className="group flex flex-col p-6">
                  <Link href={`/blog/${pp.slug}/`}>
                    <Tag tone="gray" className="w-fit"><time dateTime={pp.date}>{formatDate(pp.date)}</time></Tag>
                    <Heading size="h4" as="h3" className="mt-6 group-hover:text-[var(--c-brand)]">{pp.title}</Heading>
                    <Text size="small" className="mt-3">{pp.description}</Text>
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

      <Section tone="layer" id="faq">
        <Wrap>
          <SectionHeader eyebrow="вопросы и ответы" title="Часто задаваемые вопросы" />
          <div className="mx-auto mt-12 max-w-4xl"><FaqList items={homeFaq} /></div>
        </Wrap>
      </Section>

      <Section tone="red" className="!py-16 sm:!py-24">
        <Wrap className="text-center">
          <SectionHeader eyebrow={home.cta.eyebrow} title={home.cta.title} text={home.cta.text} />
          <Button asChild variant="inverse" size="lg" className="mt-9"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Wrap>
      </Section>
    </DsRoot>
  );
}
