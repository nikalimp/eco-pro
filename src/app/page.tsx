import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, ClipboardList, Cpu, Crown, Database, Factory, Gauge, Radar, ShieldAlert, ShieldCheck, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { caseById } from "@/content/cases";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts, formatDate } from "@/lib/posts";
import { HeroDashboard } from "@/components/hero-dashboard";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import { Quiz } from "@/components/quiz";
import { IndexTest } from "@/components/index-test";
import { JsonLd } from "@/components/json-ld";
import { Accent, Button, DsRoot, Heading, IconBox, Index, List, Section, SectionHeader, Tag, Text, Tile, Wrap } from "@/components/ds";
import { EcoScene, HeroPlan, StepArt } from "@/components/home/iso";
import { GeoTip } from "@/components/home/geo-tip";
import { faqSchema, graph } from "@/lib/schema";
import "@/components/home/home.css";

// Главная — бывшая /3/ (итерация v3, 16.11): облегчённый дизайн и смыслы презентации «СЦ для СЕО 3».
// Порядок блоков — specs/2026-11-16-итерация-правок-v3.md, раздел 3.4. Факты — только из src/content.
// Прежняя главная — на /1/ (noindex), /3/ → 301 на / (.htaccess).

const problemIcons = [ShieldAlert, ClipboardList, Cpu, BarChart3, Radar, Gauge];
const indIcons = [ShoppingBag, UtensilsCrossed, Factory];
const entryIcons = [Crown, ShieldCheck, Database];

export default function Home() {
  const h = home.hero;
  const p = home.power;
  const posts = getPosts().slice(0, 4);
  const covered = coverMap.regions.filter((r) => r.name).length;
  const core = directions[0];
  const ceoCases = home.ceoCases.ids.map((id) => caseById(id)!).filter(Boolean);

  return (
    <DsRoot className="v3">
      <JsonLd data={graph(faqSchema(homeFaq))} />

      {/* 1. Первый экран: H1 как есть (решение 16.11), три цифры презентации, лёгкий чертёж на белом */}
      <section className="grid lg:min-h-[calc(100svh-6.25rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-[var(--sp-gutter)] py-14 lg:py-16 lg:pr-14">
          <Tag tone="gray" className="w-fit bg-white lg:mt-auto"><Radar className="size-4 text-[var(--c-brand)]" aria-hidden="true" />{h.eyebrow}</Tag>
          <Heading size="display" className="kt mt-8">
            <span className="kt-line"><span className="kt-w">{h.h1Line1}</span></span>
            <br />
            <span className="kt-line kt-line-2"><span className="kt-w"><span className="kt-br kt-l ds-accent">[</span><span className="kt-mid ds-accent">{h.h1Bracket}</span><span className="kt-br kt-r ds-accent">]</span></span></span>
          </Heading>
          <Text size="lead" className="mt-7 max-w-[36ch]">{h.subtitle}</Text>
          <div className="mt-9"><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          <dl className="mt-12 grid max-w-[44rem] grid-cols-3 border-t border-[var(--c-border)] pt-6 lg:mt-auto">
            {home.path.facts.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end pr-4">
                <dt className="ds-small mt-1">{s.label}</dt>
                <dd className="v3-hero-num">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative grid place-items-center bg-[var(--c-layer)] px-4 py-10 lg:px-10">
          <div className="iso-light w-full max-w-[46rem]"><HeroPlan className="h-auto w-full" /></div>
          <Text size="label" className="mt-4">Схема: камеры на объекте → ситуационный центр → руководитель</Text>
        </div>
      </section>

      {/* 2. Что получает руководитель — три точки входа */}
      <Section tone="layer">
        <Wrap fluid>
          <SectionHeader eyebrow={home.entryPoints.title} title={home.entryPoints.heading} text={home.entryPoints.text} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {home.entryPoints.items.map((e, i) => {
              const Icon = entryIcons[i];
              return (
                <Tile key={e.title} asChild className="group flex flex-col p-7 sm:p-9">
                  <Link href={e.href}>
                    <IconBox tone="red" className="rounded-full"><Icon /></IconBox>
                    <Heading size="h4" as="h3" className="mt-8">{e.title}</Heading>
                    <Text className="mt-3 flex-1">{e.text}</Text>
                    <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium group-hover:text-[var(--c-brand)]">{e.cta}<ArrowRight className="size-4" aria-hidden="true" /></span>
                  </Link>
                </Tile>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* 3. Воровство власти — слайды 3–9 презентации */}
      <Section id="vorovstvo-vlasti">
        <Wrap fluid className="grid gap-14 xl:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader eyebrow={p.eyebrow} title={<>{p.definition.split(/\s—\s/)[0]} — <Accent>{p.definition.split(/\s—\s/)[1]}</Accent></>} text={p.hierarchy} />
            <p className="ds-h4 mt-10 max-w-[30ch]">«{p.question}»</p>
            <div className="mt-10 grid gap-px border border-[var(--c-border)] bg-[var(--c-border)] sm:grid-cols-2">
              {p.compare.map((c, i) => (
                <div key={c.title} className="bg-white p-6">
                  <p className={i === 1 ? "ds-h5 ds-accent" : "ds-h5"}>{c.title} →</p>
                  <p className="ds-body mt-2">{c.text}</p>
                </div>
              ))}
            </div>
            <p className="ds-h4 mt-8 max-w-[34ch]">{p.punch}</p>
          </div>
          <div>
            <div className="flex items-end justify-between gap-6 border-b border-[var(--c-border)] pb-6">
              <p className="ds-num ds-accent">{p.loss.value}</p>
              <p className="ds-small max-w-[16rem] text-right">{p.loss.label}</p>
            </div>
            <Heading size="h4" as="h3" className="mt-10">{p.ladderTitle}</Heading>
            <ol className="ladder mt-6">
              {p.ladder.map((l) => (
                <li key={l.level}>
                  <span className="ds-h5">{l.title}</span>
                  <span className="ds-small text-right">{l.level}</span>
                </li>
              ))}
            </ol>
            <figure className="mt-10 border-l-2 border-[var(--c-brand)] pl-6">
              <blockquote className="ds-h4">«{p.illusion}»</blockquote>
              <figcaption className="ds-small mt-3">Сергей Малютенков, основатель и CEO</figcaption>
            </figure>
          </div>
        </Wrap>
      </Section>

      {/* 4. Задачи → решения: закреплённая секция, задачи появляются вокруг круга и зеленеют */}
      <section className="v3-orbit-track bg-[var(--c-layer)]">
        <Wrap fluid className="v3-orbit-pin py-16 lg:py-0">
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

      {/* 5. Эффект наблюдателя — слайд 16; это и есть «лёгкость» по смыслу */}
      <Section>
        <Wrap fluid className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeader eyebrow={home.observer.eyebrow} title={home.observer.title} text={home.observer.text} />
            <p className="ds-small mt-8 max-w-[44ch]">{p.defect}.</p>
          </div>
          <div className="border-t border-[var(--c-border)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="ds-num ds-accent">{home.observer.value}</p>
            <p className="ds-lead mt-4">{home.observer.label}</p>
          </div>
        </Wrap>
      </Section>

      {/* 6. Экосистема: пять направлений и Центр Правды + новая архитектура власти CEO (слайды 10, 23, 26) */}
      <Section tone="layer" id="napravleniya" className="v3-eco">
        <Wrap fluid>
          <SectionHeader eyebrow={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.answer} />
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
                  <Text className="mt-4 max-w-[52ch]">{core.answer}</Text>
                  <span className="ds-btn mt-8 min-h-12 w-fit bg-[var(--c-brand)] pl-5 pr-1 text-sm text-white">Подробнее<span className="ds-btn-mod size-10 bg-white text-[22px] text-[var(--c-brand)]" aria-hidden="true">+</span></span>
                </div>
                <div className="iso-light"><EcoScene code={core.code} className="h-auto w-full" /></div>
              </Link>
            </Tile>
          </div>

          <div className="mt-24">
            <SectionHeader eyebrow={home.architecture.eyebrow} title={home.architecture.title} text={home.architecture.glasses + "."} />
            <ol className="arch mt-10">
              {home.architecture.steps.map((s) => (
                <li key={s.what} className={s.who === "Центр Правды" ? "is-core" : undefined}>
                  <p className={s.who === "Центр Правды" ? "ds-h4 ds-accent" : "ds-h4"}>{s.who}</p>
                  <p className="ds-body mt-2">{s.what}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <p className="ds-body border-l-2 border-[var(--c-brand)] pl-5 text-[var(--c-text)]">{home.architecture.knowledge}</p>
              <p className="ds-body border-l-2 border-[var(--c-border-strong)] pl-5">{home.architecture.dashboards}</p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* 7. Вы — ключевой элемент экосистемы (правки Сергея 30.10) + «Как работает PRO» */}
      <Section id="ekosistema">
        <Wrap fluid>
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

      {/* 8. Технологии: естественный интеллект + платформа + ИИ + аналитика (слайды 17–18) */}
      <Section tone="layer">
        <Wrap fluid>
          <SectionHeader eyebrow={home.tech.eyebrow} title={<>Естественный интеллект <Accent>+</Accent> искусственный интеллект</>} text={home.traditions.text} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {home.tech.items.map((t, i) => (
              <Tile key={t.title} className="flex flex-col p-7">
                <Index n={i + 1} />
                <Heading size="h4" as="h3" className="mt-8">{t.title}</Heading>
                <Text size="small" className="mt-3">{t.text}</Text>
              </Tile>
            ))}
          </div>
          <p className="ds-h4 mt-10 max-w-[48ch]"><Accent>→</Accent> {home.tech.thesis}</p>
        </Wrap>
      </Section>

      {/* 9. Дашборд как в личном кабинете (слайд 25) */}
      <Section>
        <Wrap fluid>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow={home.audience.client.title} title={<>Онлайн-дашборды: <Accent>индекс управляемости</Accent> вашей сети</>} text={home.architecture.dashboards} />
            <Button asChild variant="secondary" icon="↗"><Link href="/account/">Демо личного кабинета</Link></Button>
          </div>
          <HeroDashboard className="mt-12 hidden md:block" />
          <HeroDashboard variant="compact" className="mt-10 md:hidden" />
        </Wrap>
      </Section>

      {/* 10. Кейсы в формате «для CEO» (слайды 11–13, 19–21) */}
      <Section tone="layer" id="keisy">
        <Wrap fluid>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow={home.ceoCases.eyebrow} title={home.ceoCases.title} />
            <Button asChild variant="secondary"><Link href="/cases/">Все кейсы</Link></Button>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {ceoCases.map((c) => (
              <article key={c.id} className="ds-tile flex flex-col p-6 sm:p-9">
                <Tag tone="gray" className="w-fit">{c.tag}</Tag>
                <Heading size="h3" as="h3" className="mt-6">{c.title}</Heading>
                <Text size="small" className="mt-2">{c.scale}</Text>
                <table className="mt-8 w-full text-left">
                  <thead><tr className="ds-label border-b border-[var(--c-border)]"><th scope="col" className="pb-2 font-normal">Критерии оценки для CEO</th><th scope="col" className="pb-2 font-normal">Что изменилось</th></tr></thead>
                  <tbody>
                    {c.ceo?.map((m) => (
                      <tr key={m.k} className="border-b border-[var(--c-border)] align-top">
                        <th scope="row" className="ds-h5 py-3 pr-4 font-medium">{m.k}</th>
                        <td className="ds-body py-3 text-[var(--c-text)]">{m.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {c.metrics.slice(0, 4).map((m, k) => (
                    <div key={m.label} className="flex flex-col-reverse justify-end">
                      <dt className="ds-small mt-1">{m.label}</dt>
                      <dd className={`text-2xl font-normal tracking-tight ${k === 0 ? "ds-accent" : ""}`}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto pt-10"><Button asChild variant="secondary" className="w-fit"><Link href={`/cases/${c.id}/`}>Читать кейс</Link></Button></div>
              </article>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* 11. ROI — «от затрат на безопасность к инвестиции во власть CEO» (слайд 22) */}
      <Section>
        <Wrap fluid className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader eyebrow={home.roi.eyebrow} title={home.roi.title} />
            <p className="ds-h3 mt-10 flex flex-wrap items-center gap-3" aria-label="ROI равен выгоде минус затраты на ситуационный центр, делённым на затраты на ситуационный центр, умножить на 100 процентов">
              <span>{home.roi.formula.left}</span>
              <span className="roi-frac ds-h4"><span>{home.roi.formula.top}</span><span>{home.roi.formula.bottom}</span></span>
              <span>{home.roi.formula.right}</span>
            </p>
          </div>
          <dl className="grid gap-px self-end border border-[var(--c-border)] bg-[var(--c-border)] sm:grid-cols-3">
            {home.roi.stats.map((s, i) => (
              <div key={s.label} className="flex flex-col-reverse justify-end bg-white p-6 sm:p-8">
                <dt className="ds-small mt-3">{s.label}</dt>
                <dd className={`v3-geo-num ${i === 0 ? "ds-accent" : ""}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </Section>

      {/* 11б. Тест «Индекс управляемости CEO» — лид-магнит (идея 1) */}
      <Section tone="layer" id="indeks">
        <Wrap fluid>
          <SectionHeader eyebrow={home.indexTest.eyebrow} title={home.indexTest.title} text={home.indexTest.text} />
          <div className="mt-12"><IndexTest /></div>
        </Wrap>
      </Section>

      {/* 12. Экспертная экосистема и география (слайды 27–28) */}
      <Section className="v3-geo" id="geografiya">
        <Wrap fluid>
          <SectionHeader eyebrow={home.expertEco.eyebrow} title={home.expertEco.title} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {home.expertEco.cards.map((c) => (
              <Tile key={c.label} className="flex flex-col p-6">
                <p className="ds-eyebrow">{c.label}</p>
                <p className="ds-h3 mt-6">{c.value}</p>
                <p className="ds-small mt-2">{c.text}</p>
              </Tile>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-10 xl:grid-cols-[1fr_1.7fr]">
            <div>
              <SectionHeader eyebrow={home.geo.eyebrow} title={home.geo.title} text={home.geo.text} />
              <dl className="mt-10 grid grid-cols-2 gap-px border border-[var(--c-border)] bg-[var(--c-border)]">
                {home.geo.stats.map((s, i) => (
                  <div key={s.label} className="flex flex-col-reverse bg-white p-5">
                    <dt className="ds-small mt-2">{s.label}</dt>
                    <dd className={`v3-geo-num ${i === 0 ? "ds-accent" : ""}`}>{s.value}</dd>
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

      {/* 13. План внедрения (слайд 29) и заявка на пилот (слайд 30) */}
      <Section tone="layer" id="pilot">
        <Wrap fluid className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={home.pilot.eyebrow} title={<>Пилот ситуационного центра за 60 дней <Accent>покажет, кто влияет на процессы</Accent> в вашей компании</>} />
            <ol className="v3-stack mt-10 grid gap-4">
              {home.path.steps.map((s, i) => {
                // Чертежи этапов: встреча, пилот, масштабирование, KPI; у шага «Автоматизация с помощью ИИ» своего чертежа нет
                const art = [0, 1, null, 2, 3][i];
                return (
                  <li key={s.title} style={{ "--i": i } as React.CSSProperties} className={`ds-tile grid gap-5 p-5 sm:p-6 ${art !== null ? "sm:grid-cols-[1fr_1fr]" : ""}`}>
                    <div className="flex flex-col justify-between gap-4">
                      <div><Index n={i + 1} /><Heading size="h4" as="p" className="mt-3">{s.title}</Heading></div>
                      <Text size="small">{s.text}</Text>
                    </div>
                    {art !== null && art !== undefined && <div className="iso-light hidden sm:grid"><StepArt n={art} className="h-auto w-full" /></div>}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="ds-tile v3-sticky self-start p-6 sm:p-10">
            <Heading size="h3" as="p">Заявка на пилот</Heading>
            <Text size="small" className="mb-6 mt-2">{home.pilot.text}</Text>
            <ul className="mb-8 grid gap-2">
              {home.pilot.points.map((t) => <li key={t} className="ds-small flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[var(--c-brand)]" aria-hidden="true" />{t}</li>)}
            </ul>
            <LeadForm source="Пилот за 60 дней (главная)" submitLabel={home.pilot.submit} />
          </div>
        </Wrap>
      </Section>

      {/* 14. Кому подходит + вход для действующих клиентов */}
      <Section>
        <Wrap fluid>
          <SectionHeader eyebrow={home.audience.eyebrow} title={home.audience.title} text={home.audience.text} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.audience.roles.map((r) => (
              <Tile key={r.title} className="p-6 sm:p-7">
                <Heading size="h5" as="h3">{r.title}</Heading>
                <Text size="small" className="mt-2">{r.text}</Text>
              </Tile>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 border border-[var(--c-brand)] bg-white p-6 sm:flex-row sm:items-center sm:p-8">
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
        <Wrap fluid>
          <SectionHeader eyebrow={home.quiz.eyebrow} title={home.quiz.title} text={home.quiz.text} />
          <div className="mt-12"><Quiz /></div>
        </Wrap>
      </Section>

      {/* 15. Отрасли */}
      <Section id="otrasli">
        <Wrap fluid>
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

      {/* 16. Основатель: цитата о власти CEO и регалии (слайд 2) + команда */}
      <Section tone="layer">
        <Wrap fluid>
          <figure className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            <Image src="/images/team/sergey-malyutenkov-studio.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={260} height={325} className="aspect-[4/5] w-48 object-cover object-top sm:w-64" />
            <div>
              <p className="ds-eyebrow">{home.ceo.eyebrow}</p>
              <blockquote className="ds-h3 mt-5 max-w-[46ch]">«{home.ceo.quote}»</blockquote>
              <figcaption className="mt-6">
                <p className="ds-h5">{home.ceo.name} — {home.ceo.role}</p>
                <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {home.ceo.regalia.map((r) => <li key={r.org} className="ds-small"><span className="text-[var(--c-text)]">{r.org}</span>, {r.years} — {r.role}</li>)}
                </ul>
                <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="ds-link ds-small mt-4 inline-block">{home.ceo.channelLabel} ↗</a>
              </figcaption>
            </div>
          </figure>

          <SectionHeader className="mt-24" eyebrow={home.team.eyebrow} title={<>Люди <Accent>экосистемы</Accent></>} text={home.team.text} />
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

      {/* 17. Рекомендательные письма и логотипы клиентов */}
      <Section>
        <Wrap fluid>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="рекомендации" title={<>Нас рекомендуют <Accent>клиенты</Accent></>} text="Письма крупных сетей и отраслевых ассоциаций. Лицензии, СРО и партнёрские сертификаты — на странице документов." />
            <Button asChild variant="secondary"><Link href="/documents/">Все документы</Link></Button>
          </div>
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
        </Wrap>
      </Section>
      <section aria-labelledby="v3-trust" className="border-y border-[var(--c-border)]">
        <div className="flex items-center gap-8 py-6 pl-[var(--sp-gutter)]">
          <p id="v3-trust" className="ds-eyebrow hidden shrink-0 md:block">{home.clientsTitle}</p>
          <div className="marquee min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-16">
              {[...clientLogos, ...clientLogos].map((l, i) => (
                <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="v3-logo h-9 w-auto max-w-[140px] object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 18. Блог, FAQ, финальный призыв */}
      {posts.length > 0 && (
        <Section>
          <Wrap fluid>
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
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link href="/blog/">Все статьи</Link></Button>
              <Button asChild variant="secondary" icon="↗"><Link href="/glossary/">Глоссарий</Link></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.telegram} target="_blank" rel="noopener">Telegram-канал</a></Button>
              <Button asChild variant="secondary" icon="↗"><a href={site.contacts.max} target="_blank" rel="noopener">Канал в MAX</a></Button>
            </div>
          </Wrap>
        </Section>
      )}

      <Section tone="layer" id="faq">
        <Wrap fluid className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow="вопросы и ответы" title="Часто задаваемые вопросы" />
          <FaqList items={homeFaq} />
        </Wrap>
      </Section>

      <Section tone="red" className="!py-16 sm:!py-24">
        <Wrap fluid className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeader eyebrow={home.cta.eyebrow} title={home.cta.title} text={home.cta.text} />
          <Button asChild variant="inverse" size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button>
        </Wrap>
      </Section>
    </DsRoot>
  );
}
