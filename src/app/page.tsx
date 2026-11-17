import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, Equal, Plus, UserRound, BarChart3, Check, ClipboardList, Cpu, Factory, Gauge, Radar, ShieldAlert, ShoppingBag, UtensilsCrossed } from "lucide-react";
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
import { IndexTest } from "@/components/index-test";
import { JsonLd } from "@/components/json-ld";
import { CountUp } from "@/components/count-up";
import { Accent, Button, DsRoot, Heading, IconBox, Index, List, Section, SectionHeader, Tag, Text, Tile, Wrap } from "@/components/ds";
import { QuizModal, quizHref } from "@/components/quiz-modal";
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

      {/* 1. Первый экран (правки Ника 17.11, раунд 4): по центру, без чертежа, высота по содержимому; H1 — в 2 строки на десктопе */}
      <section className="flex flex-col">
        <div className="ds-wrap w-full min-w-0 py-16 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <Tag tone="gray" className="w-fit bg-white"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
            <Heading size="h1" as="h1" className="mt-7 max-w-[24ch] lg:max-w-[30ch]">{h.h1.start}<Accent>{h.h1.accent}</Accent>{h.h1.end}</Heading>
            <Text size="lead" className="mt-6 max-w-[48ch]">{h.subtitle}</Text>
            <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          </div>
        </div>
        {/* min-w-0: бегущая строка не растягивает обёртку шире экрана на телефоне */}
        <div className="ds-wrap w-full min-w-0">
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
                {/* Заголовок крупнее, без подзаголовка; при смене — «решаем» (правки Ника 17.11) */}
                <div className="v3-face-prob">
                  <Heading size="h2" as="h2">Какие <Accent>задачи</Accent> нам ставят</Heading>
                </div>
                <div className="v3-face-fix">
                  <Heading size="h2" as="p">И всё это мы <span className="v3-ok">решаем</span></Heading>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
              {home.about.problems.map((pr, i) => {
                const Icon = problemIcons[i];
                return (
                  <Tile key={pr.title} className="v3-orbit-card v3-flip-wrap p-4">
                    <div className="v3-face-prob">
                      <p className="flex items-center gap-3"><IconBox size="sm" tone="red" className="rounded-full"><Icon /></IconBox><span className="ds-h5">{pr.title}</span></p>
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

      {/* 6. Экосистема: пять направлений и Центр Правды, без чертежей (правки Ника 17.11). Смысл «Новой архитектуры власти CEO» (слайды 10, 23) — в карточке ядра */}
      <Section tone="layer" id="napravleniya" className="v3-eco">
        <Wrap>
          <SectionHeader eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.ecosystem.text} />
          <div className="v3-eco-grid mt-14">
            {directions.slice(1, 5).map((d) => (
              <Tile key={d.slug} asChild className="v3-eco-card v3-eco-side group flex flex-col">
                <Link href={`/services/${d.slug}/`}>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Tag className="w-fit">{d.code}</Tag>
                    <Heading size="h4" as="h3" className="mt-4 group-hover:text-[var(--c-brand)]">{d.title}</Heading>
                    <Text size="small" className="mt-2 flex-1">{d.short}</Text>
                    <span className="mt-6 inline-flex w-fit items-center gap-2 border border-[var(--c-border-strong)] px-4 py-2 text-[15px] font-medium transition-colors group-hover:border-[var(--c-brand)] group-hover:text-[var(--c-brand)]">Подробнее<ArrowRight className="size-4" aria-hidden="true" /></span>
                  </div>
                </Link>
              </Tile>
            ))}
            {/* Ядро: по центру на красном фоне, без чертежа и кнопки (правки Ника 17.11) */}
            <Tile asChild className="v3-eco-card v3-eco-core group !border-[var(--c-brand)] !bg-[var(--c-brand)] text-white">
              <Link href={`/services/${core.slug}/`} className="flex flex-col items-center px-6 py-10 text-center sm:py-14">
                <p className="flex items-center gap-3"><Tag tone="white">{core.code}</Tag><span className="ds-label !text-white/80">ядро экосистемы</span></p>
                <Heading size="h3" as="h3" className="mt-5 !text-white">{core.title}</Heading>
                <p className="ds-body mx-auto mt-4 max-w-[56ch] !text-white/90">{home.architecture.glasses}. {home.architecture.knowledge.split(". ")[0]}.</p>
                <span className="mt-8 inline-flex items-center gap-2 bg-white px-4 py-2 text-[15px] font-medium text-[var(--c-brand)]">Подробнее<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            </Tile>
          </div>
        </Wrap>
      </Section>

      {/* 7. Вы — ключевой элемент экосистемы (правки Сергея 30.10) + «Как работает PRO». Серый фон продолжает секцию «Экосистема» (правки Ника 17.11) */}
      <Section tone="layer" id="ekosistema" className="!pt-0">
        <Wrap>
          <SectionHeader title={home.expertise.title} text={home.expertise.text} />
          {/* Наша экспертиза + ваша экспертиза = новые знания (правки Ника 17.11) */}
          <div className="mt-12 grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4">
            {home.expertise.columns.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <span className="v3-op" aria-hidden="true">{i === 1 ? <Plus /> : <Equal />}</span>}
                <Tile className={i === 2 ? "h-full border-[var(--c-brand)] p-8" : "h-full p-8"}>
                  <p className="ds-label">{c.label}</p>
                  <Heading size="h3" as="h3" className="mt-3">{c.title}</Heading>
                  <List items={c.items} className="mt-5" />
                </Tile>
              </Fragment>
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
        </Wrap>
      </Section>

      {/* 10. Кейсы для CEO — слайды-карточки (правки Ника 17.11; слайды 11–13, 19–21) */}
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

      {/* 13. План внедрения (слайд 29): 4 этапа в 4 колонки, без чертежей; этап «Пилот за 60 дней» не дублируем — о нём заголовок (правки Ника 17.11) */}
      <Section tone="layer">
        <Wrap>
          <SectionHeader eyebrow={home.pilot.eyebrow} title={<>Пилот ситуационного центра за 60 дней <Accent>покажет, кто влияет на процессы</Accent> в вашей компании</>} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.path.steps.filter((_, i) => i !== 1).map((st, i) => (
              <li key={st.title} className="ds-tile flex flex-col p-6 sm:p-7">
                <Index n={i + 1} />
                <Heading size="h4" as="h3" className="mt-6">{st.title}</Heading>
                <Text size="small" className="mt-3">{st.text}</Text>
              </li>
            ))}
          </ol>
          {/* Заявка на пилот — не отдельной секцией, а под этапами (правки Ника, раунд 4) */}
          <div id="pilot" className="mt-4 scroll-mt-20 bg-[var(--c-brand)] p-6 text-white sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="ds-eyebrow !text-white/80">заявка на пилот</p>
              <Heading size="h2" as="h2" className="mt-4 !text-white">{home.pilot.title}</Heading>
              <p className="ds-body mx-auto mt-4 max-w-2xl !text-white/85">{home.pilot.text}</p>
            </div>
            <div className="mt-10"><LeadForm dark layout="row" source="Пилот за 60 дней (главная)" submitLabel={home.pilot.submit} buttonClassName="!bg-white !text-[var(--c-brand)] hover:!bg-white/90" /></div>
          </div>
        </Wrap>
      </Section>

      {/* 12. География (слайд 28) */}
      <Section tone="layer" className="v3-geo" id="geografiya">
        <Wrap>
          {/* Одна колонка по центру, цифры без подложки; сюда перенесены цифры экспертной экосистемы — 5 цифр в порядке Ника (правки 17.11) */}
          <SectionHeader eyebrow={home.geo.eyebrow} title={home.geo.title} text={home.geo.text} />
          <div className="mx-auto mt-10 max-w-5xl">
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
          <dl className="mx-auto mt-12 grid grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-3 lg:grid-cols-5">
            {home.geo.stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse justify-end">
                <dt className="ds-small mt-2">{st.label}</dt>
                <dd className="v3-geo-num"><CountUp value={st.value} /></dd>
              </div>
            ))}
          </dl>
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
          <div className="mt-4 flex flex-col items-start justify-between gap-4 bg-[var(--c-brand)] p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <Heading size="h5" as="h3" className="!text-white">{home.audience.client.title}</Heading>
              <Text size="small" className="mt-1 !text-white/85">{home.audience.client.text}</Text>
            </div>
            <Button asChild variant="inverse" icon={<UserRound className="size-5" />} className="shrink-0"><Link href={home.audience.client.href}>{home.audience.client.cta}</Link></Button>
          </div>
        </Wrap>
      </Section>

      {/* 15. Отрасли */}
      <Section tone="layer" id="otrasli">
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
          {/* Призыв к брифингу внизу «Отраслей» (правки Ника, раунд 4) */}
          <div className="mt-10 flex justify-center"><Button asChild><a href={quizHref}>Пройти брифинг</a></Button></div>
        </Wrap>
      </Section>

      {/* 16. Слово основателя — как на pro-nas.pro: цитата по центру, под ней аватар, имя, регалии и канал (правки Ника 17.11) */}
      <Section>
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

      <Section tone="layer">
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
      <Section>
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
        <Section tone="layer">
          <Wrap>
            <SectionHeader eyebrow="блог" title={<><Accent>Делимся экспертизой</Accent> в управляемости и контроле</>} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {posts.map((pp) => (
                <Tile key={pp.slug} asChild className="group flex flex-col p-6">
                  <Link href={`/blog/${pp.slug}/`}>
                    <Tag tone="gray" className="w-fit"><time dateTime={pp.date}>{formatDate(pp.date)}</time></Tag>
                    <Heading size="h4" as="h3" className="mt-6 group-hover:text-[var(--c-brand)]">{pp.title}</Heading>
                    <Text size="small" className="mt-3 flex-1">{pp.description}</Text>
                    <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium group-hover:text-[var(--c-brand)]">Читать статью<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
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

      <Section id="faq">
        <Wrap>
          <SectionHeader eyebrow="вопросы и ответы" title="Часто задаваемые вопросы" />
          <div className="mx-auto mt-12 max-w-4xl"><FaqList items={homeFaq} /></div>
        </Wrap>
      </Section>

      <Section tone="red" className="!py-16 sm:!py-24">
        <Wrap className="text-center">
          <SectionHeader eyebrow={home.cta.eyebrow} title={home.cta.title} text={home.cta.text} />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="inverse" size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button>
            {/* Призыв к брифингу для тех, кто пока не готов к встрече (правки Ника 17.11) */}
            <a href={quizHref} className="ds-btn min-h-14 border border-white/60 px-6 text-base text-white hover:bg-white/10">Сначала пройти брифинг</a>
          </div>
        </Wrap>
      </Section>
      <QuizModal />
    </DsRoot>
  );
}
