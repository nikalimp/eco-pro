import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Combine, Library, Lightbulb, Network, ShieldCheck, UserRound, BarChart3, Check, ClipboardList, Cpu, Gauge, Radar, ShieldAlert } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { cases } from "@/content/cases";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { CameraFrame } from "@/components/home/camera-frame";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import { IndexTest } from "@/components/index-test";
import { JsonLd } from "@/components/json-ld";
import { CountUp } from "@/components/count-up";
import { Accent, Button, DsRoot, Heading, IconBox, List, Section, SectionHeader, Tag, Text, Tile, Wrap } from "@/components/ds";
import { QuizModal, quizHref } from "@/components/quiz-modal";
import { CaseSlider } from "@/components/home/case-slider";
import { CornerArrow } from "@/components/corner-arrow";
import { PilotSteps } from "@/components/home/pilot-steps";
import { GeoTip } from "@/components/home/geo-tip";
import { faqSchema, graph } from "@/lib/schema";
import "@/components/home/home.css";

// Главная — бывшая /3/ (итерация v3, 16.11): облегчённый дизайн и смыслы презентации «СЦ для СЕО 3».
// Порядок блоков — specs/2026-11-16-итерация-правок-v3.md, раздел 3.4. Факты — только из src/content.
// Прежняя главная — на /1/ (noindex), /3/ → 301 на / (.htaccess).

const problemIcons = [ShieldAlert, ClipboardList, Cpu, BarChart3, Radar, Gauge];
// Иконки принципов «Как работает PRO» вместо номеров (правки Ника 18.11)
const principleIcons = [Network, Combine, ShieldCheck, Lightbulb, BrainCircuit, Library];

export default function Home() {
  const h = home.hero;
  const posts = getPosts().slice(0, 3);
  const covered = coverMap.regions.filter((r) => r.name).length;
  // Слайды — все кейсы с критериями для CEO (правки Ника 17.11)
  const ceoCases = cases.filter((c) => c.ceo?.length);

  return (
    <DsRoot className="v3">
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран: по центру, в рамке видоискателя камеры с REC и временем (правки Ника 18.11) */}
      <section className="flex flex-col">
        <div className="ds-wrap w-full min-w-0 pt-8 lg:pt-12">
          <CameraFrame>
          <div className="flex flex-col items-center px-4 pb-10 pt-20 text-center sm:px-12 lg:pb-12 lg:pt-24">
            <Tag tone="gray" className="w-fit bg-white"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
            <Heading size="h1" as="h1" className="mt-7 max-w-[22ch] !text-[clamp(2.25rem,1.3rem+3.4vw,4.75rem)] !font-semibold !leading-[1.04]">{h.h1.start}<Accent>{h.h1.accent}</Accent>{h.h1.end}</Heading>
            <Text size="lead" className="mt-6 max-w-[52ch]">{h.subtitle}</Text>
            <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          </div>
          {/* Логотипы клиентов — внутри рамки видоискателя (правки Ника 18.11); min-w-0 — строка не шире экрана на телефоне */}
          <div className="min-w-0 px-6 pb-8 sm:px-14 lg:pb-10">
            <div className="marquee overflow-hidden py-4" aria-label={home.clientsTitle}>
              <div className="marquee-track flex w-max items-center gap-16">
                {[...clientLogos, ...clientLogos].map((l, i) => (
                  <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="v3-logo h-9 w-auto max-w-[140px] object-contain" />
                ))}
              </div>
            </div>
          </div>
          </CameraFrame>
        </div>
      </section>

      {/* 4. Задачи → решения: закреплённая секция, задачи появляются вокруг круга и зеленеют */}
      <section className="v3-orbit-track">
        <Wrap className="v3-orbit-pin py-16 lg:py-0">
          <div className="v3-orbit">
            <div className="v3-orbit-core mb-10 lg:mb-0">
              <div className="v3-flip-wrap">
                {/* Без подзаголовка; «проблемы» сменяются на «Решаются в Центре Правды» (правки Ника 18.11) */}
                <div className="v3-face-prob">
                  <Heading size="h2" as="h2">Нерешаемые <Accent>проблемы</Accent> корпораций</Heading>
                </div>
                <div className="v3-face-fix">
                  <Heading size="h2" as="p"><span className="v3-ok">Решаются</span> в Центре Правды</Heading>
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

      {/* 6. Экосистема (правки Ника 18.11): одна большая карточка Центра Правды во всю ширину, внутри — 4 направления */}
      <Section tone="layer" id="napravleniya">
        <Wrap>
          <div className="ds-tile p-6 sm:p-10 lg:p-14">
            <SectionHeader eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.ecosystem.text} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {directions.slice(1, 5).map((d) => (
                <Tile key={d.slug} asChild className="group flex flex-col !border-[var(--c-brand)] bg-white">
                  <Link href={`/services/${d.slug}/`}>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {/* Стрелка ↗ на квадратной плашке размером с метку (правки Ника 18.11) */}
                      <p className="flex items-center justify-between gap-4"><Tag className="w-fit">{d.code}</Tag><CornerArrow /></p>
                      <Heading size="h4" as="h3" className="mt-4 group-hover:text-[var(--c-brand)]">{d.title}</Heading>
                      <Text size="small" className="mt-2">{d.short}</Text>
                    </div>
                  </Link>
                </Tile>
              ))}
            </div>
            <div className="mt-10 flex justify-center"><Button asChild><Link href={`/services/${directions[0].slug}/`}>Узнать подробнее</Link></Button></div>
          </div>
        </Wrap>
      </Section>

      {/* 9. Дашборд как в личном кабинете (слайд 25) */}
      <Section>
        <Wrap>
          <SectionHeader eyebrow={home.audience.client.title} title={<>Онлайн-дашборды: <Accent>индекс управляемости</Accent> вашей сети</>} text={home.architecture.dashboards} />
          {/* Вход в ЛК — под заголовком, над дашбордом; дашборд без «Топ-5 нарушений» и «Списка магазинов» (правки Ника 18.11) */}
          <div className="mt-8 flex justify-center"><Button asChild variant="secondary" icon={<UserRound className="size-5" />}><Link href={home.audience.client.href}>{home.audience.client.cta}</Link></Button></div>
          <HeroDashboard brief className="mt-12 hidden md:block" />
          <HeroDashboard variant="compact" className="mt-10 md:hidden" />
          {/* ТОП-6 преимуществ (бывшее «Как работает PRO»): под дашбордом, 3 колонки по центру, иконки (правки Ника 18.11). Секция «Вы — ключевой элемент экосистемы» убрана */}
          <div className="mt-24"><SectionHeader title={<>{home.about.principlesTitle.replace(/\s*ECO-PRO$/, "")} <span className="whitespace-nowrap"><span className="text-[var(--c-brand)]">[</span>ECO-PRO<span className="text-[var(--c-brand)]">]</span></span></>} /></div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {home.about.principles.map((pr, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={pr.title} className="flex flex-col items-center text-center">
                  <Icon className="size-9 text-[var(--c-text)]" strokeWidth={1.5} aria-hidden="true" />
                  <p className="ds-h5 mt-4">{pr.title}</p>
                  <p className="ds-small mt-1 max-w-[34ch]">{pr.text}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex justify-center"><Button asChild><a href={quizHref}>Заполнить брифинг</a></Button></div>
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

      {/* 13. Пилот за 60 дней — целиком лид-магнит (правки Ника 18.11): белый фон, заголовок внутри красной карточки,
          4 этапа в ряд со стрелками и подсказкой «i» с подробным описанием, ниже — форма. Этап «Пилот за 60 дней» не дублируем — о нём заголовок */}
      <Section>
        <Wrap>
          <div id="pilot" className="scroll-mt-20 bg-[var(--c-brand)] p-6 text-white sm:p-10 lg:p-14">
            <div className="mx-auto max-w-4xl text-center">
              <p className="ds-eyebrow !text-white/80">{home.pilot.eyebrow}</p>
              <Heading size="h2" as="h2" className="mt-4 !text-white">Пилот ситуационного центра за 60 дней покажет, кто влияет на процессы в вашей компании</Heading>
              <p className="ds-body mx-auto mt-4 max-w-2xl !text-white/85">{home.pilot.title}. {home.pilot.text}</p>
            </div>
            <PilotSteps steps={home.path.steps.filter((_, i) => i !== 1)} />
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
            {/* Без иконки и кнопки снизу: стрелка ↗ у заголовка, красная обводка, вся карточка — ссылка (правки Ника 18.11) */}
            {industries.map((ind) => (
              <Tile key={ind.slug} asChild className="group flex flex-col !border-[var(--c-brand)] p-6 sm:p-8">
                <Link href={`/industries/${ind.slug}/`}>
                  <span className="flex items-start justify-between gap-4">
                    <Heading size="h4" as="h3" className="group-hover:text-[var(--c-brand)]">{ind.title}</Heading>
                    <CornerArrow className="mt-0.5" />
                  </span>
                  <Text size="small" className="mt-3">{ind.short}</Text>
                  <List items={ind.tasks} className="mt-6 flex-1 border-t border-[var(--c-border)] pt-6" />
                </Link>
              </Tile>
            ))}
          </div>
          {/* Призыв к брифингу внизу «Отраслей» (правки Ника, раунд 4) */}
          <div className="mt-10 flex justify-center"><Button asChild><a href={quizHref}>Заполнить брифинг</a></Button></div>
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
          {/* Слово основателя — под карточками команды, без отдельной секции (правки Ника 18.11) */}
          <figure className="mx-auto mt-20 max-w-3xl text-center">
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
            {/* 3 колонки с обложками (правки Ника 18.11) */}
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {posts.map((pp) => <PostCard key={pp.slug} p={pp} />)}
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
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="inverse" size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button>
            {/* Призыв к брифингу для тех, кто пока не готов к встрече (правки Ника 17.11) */}
            <a href={quizHref} className="ds-btn min-h-14 border border-white/60 px-6 text-base text-white hover:bg-white/10">Сначала заполнить брифинг</a>
          </div>
        </Wrap>
      </Section>
      <QuizModal />
    </DsRoot>
  );
}
