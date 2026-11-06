import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clientLogos, home, homeFaq } from "@/content/home";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { featuredCases } from "@/content/cases";
import { geoMap } from "@/content/geo-map";
import { coverMap } from "@/content/cover-map";
import { letters } from "@/content/documents";
import { getPosts, formatDate } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { HeroDashboard } from "@/components/hero-dashboard";
import { GeoPanel } from "@/components/geo-panel";
import { LeadForm } from "@/components/lead-form";
import { FaqList } from "@/components/faq";
import "./suisse.css";

// Швейцарская версия главной для показа команде клиента (T52). Тот же контент, что на «/» (src/content/*),
// другая вёрстка: сетка 12 колонок, левый край, ряды вместо карточек, линейки вместо фонов.
// Дублирует главную, поэтому canonical — на «/», в sitemap и llms.txt страницы нет.
export const metadata: Metadata = {
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description: "Швейцарская версия главной ECO-PRO для обсуждения дизайна.",
  alternates: { canonical: "/" },
};

const Br = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="sw-br">[</span>
    {children}
    <span className="sw-br">]</span>
  </>
);

function Head({ label, title, text }: { label: string; title: React.ReactNode; text?: React.ReactNode }) {
  return (
    <div className="sw-grid sw-head">
      <p className="sw-label c-1-4">{label}</p>
      <div className="c-5-12">
        <h2 className="sw-h2">{title}</h2>
        {text && <p className="sw-body mt-6 text-[var(--grey)]">{text}</p>}
      </div>
    </div>
  );
}

export default function Suisse() {
  const h = home.hero;
  const posts = getPosts().slice(0, 3);
  const covered = coverMap.regions.filter((r) => r.name);
  const total = geoMap.cities.length + geoMap.inset.cities.length - 1;
  const [core, ...mods] = directions.slice(0, 5);

  return (
    <div className="sw">
      {/* 1. Первый экран: подписи по краям, акциденция во всю ширину, внизу — подзаголовок слева и живой мониторинг справа */}
      <section className="sw-wrap pt-10 sm:pt-16">
        <div className="sw-grid sw-in border-b border-black pb-4">
          <p className="sw-label c-1-6">{h.eyebrow}</p>
          <p className="sw-label sw-label-grey c-9-12 lg:text-right">Работаем по всей России · с 2001 года</p>
        </div>
        <h1 className="sw-display sw-in mt-10 sm:mt-16">
          <span className="block">{h.h1Line1}</span>
          <span className="block"><Br>{h.h1Bracket}</Br></span>
        </h1>
        <div className="sw-grid mt-12 gap-y-12 sm:mt-20">
          <div className="c-1-4 flex flex-col gap-8">
            <p className="sw-lead">{h.subtitle}</p>
            <div><Button asChild size="lg"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          </div>
          <div className="c-5-12"><HeroDashboard /></div>
        </div>
        {/* Цифры одной строкой — факты из specs/00-brief.md */}
        <dl className="sw-grid mt-16 border-t border-black pt-4 sm:mt-24">
          {home.path.facts.map((f) => (
            <div key={f.label} className="col-span-6 mb-6 lg:col-span-3 lg:mb-0">
              <dd className="sw-num sw-num-s">{f.value}</dd>
              <dt className="sw-label sw-label-grey mt-3">{f.label}</dt>
            </div>
          ))}
          <div className="col-span-6 lg:col-span-3">
            <dd className="sw-num sw-num-s">{covered.length}</dd>
            <dt className="sw-label sw-label-grey mt-3">регионов присутствия</dt>
          </div>
        </dl>
      </section>

      {/* 2. Клиенты — полоса между линейками */}
      <section aria-label={home.clientsTitle} className="sw-logos marquee mt-16 overflow-hidden py-6 sm:mt-24">
        <h2 className="sr-only">{home.clientsTitle}</h2>
        <div className="marquee-track flex w-max items-center gap-16">
          {[...clientLogos, ...clientLogos].map((l, i) => (
            <Image key={i} src={l.src} alt={i < clientLogos.length ? l.alt : ""} aria-hidden={i >= clientLogos.length || undefined} width={140} height={48} className="h-9 w-auto max-w-[140px] object-contain" />
          ))}
        </div>
      </section>

      {/* 3. Фраза на весь экран (приём из гайдлайна) и три точки входа колонками */}
      <section className="sw-sec sw-wrap">
        <p className="sw-label sw-label-grey">{home.entryPoints.title}</p>
        <h2 className="sw-statement mt-6 max-w-[14ch]">{home.entryPoints.heading}</h2>
        <div className="sw-grid mt-10">
          <p className="sw-body c-5-12 text-[var(--grey)]">{home.entryPoints.text}</p>
        </div>
        <div className="sw-cols sw-cols-v mt-16 sm:mt-24">
          {home.entryPoints.items.map((e, i) => (
            <Link key={e.title} href={e.href} className="sw-col group block">
              <p className="sw-label sw-red">{String(i + 1)}</p>
              <h3 className="sw-h3 mt-6">{e.title}</h3>
              <p className="sw-body mt-3 text-[var(--grey)]">{e.text}</p>
              <p className="mt-6 text-sm font-medium">{e.cta} <span className="sw-arrow" aria-hidden="true">→</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Естественный + искусственный интеллект: две колонки, знак «+» на оси */}
      <section className="sw-sec sw-wrap">
        <Head label={home.traditions.eyebrow} title={home.traditions.title} text={home.traditions.text} />
        <div className="sw-grid mt-16 gap-y-12">
          {[home.traditions.human, home.traditions.ai].map((c, i) => (
            <div key={c.label} className={i === 0 ? "c-1-5" : "c-7-12"}>
              <p className={i === 0 ? "sw-label sw-label-grey" : "sw-label sw-red"}>{c.label}</p>
              <h3 className="sw-h2 mt-4">{c.title}</h3>
              <ul className="sw-list mt-8">{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Направления — таблица: код · название · описание · стрелка */}
      <section id="napravleniya" className="sw-sec sw-wrap">
        <Head label={home.ecosystem.eyebrow} title={home.ecosystem.title} text={home.answer} />
        <div className="sw-rows mt-16">
          {[core, ...mods].map((d, i) => (
            <Link key={d.slug} href={`/services/${d.slug}/`} className="sw-row">
              <p className="r-code sw-label"><span className="sw-red">{d.code}</span>{i === 0 && <span className="sw-label-grey"> · центр</span>}</p>
              <h3 className={i === 0 ? "r-title sw-h3 lg:text-[2rem] lg:leading-[2.25rem]" : "r-title sw-h3"}>{d.title}</h3>
              <p className="r-text sw-body text-[var(--grey)]">{d.short}</p>
              <span className="r-go sw-arrow hidden text-2xl lg:inline-block" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Вы — ключевой элемент: три колонки, «Результат» — красным */}
      <section className="sw-sec sw-wrap">
        <Head label={home.expertise.eyebrow} title={home.expertise.title} text={home.expertise.text} />
        <div className="sw-cols mt-16">
          {home.expertise.columns.map((c, i) => (
            <div key={c.label} className="sw-col" style={i === 2 ? { borderTopColor: "var(--red)", borderTopWidth: 3 } : undefined}>
              <p className={i === 2 ? "sw-label sw-red" : "sw-label sw-label-grey"}>{c.label}</p>
              <h3 className="sw-h3 mt-4">{c.title}</h3>
              <ul className="sw-list mt-6">{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* 7. География: точечный фон из гайдлайна, цифры слева, карта справа */}
      <section className="sw-dots mt-[var(--sec)] py-[var(--sec)]">
        <div className="sw-wrap">
          <Head label={home.geo.eyebrow} title={home.geo.title} text={home.geo.text} />
          <div className="sw-grid geo-map mt-16 gap-y-10">
            <div className="c-1-4 flex flex-col gap-8">
              <div><p className="sw-num">{total}</p><p className="sw-label sw-label-grey mt-3">городов с проектами</p></div>
              <div><p className="sw-num">{covered.length}</p><p className="sw-label sw-label-grey mt-3">регионов присутствия</p></div>
              <div className="sw-geo-panel"><GeoPanel defaultTitle="Наведите на регион" defaultText="Здесь появятся города проектов в выбранном регионе." /></div>
            </div>
            <div className="c-5-12">
              <svg viewBox={`0 0 ${coverMap.width} ${coverMap.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered.length} регионов присутствия ECO-PRO`}>
                {coverMap.regions.map((r, i) =>
                  r.name ? (
                    <path key={i} d={r.d} className="geo-reg is-on" tabIndex={0} role="img" aria-label={r.cities?.length ? `${r.name}: ${r.cities.join(", ")}` : r.name} data-name={r.name} data-cities={r.cities?.join(", ") ?? ""} />
                  ) : (
                    <path key={i} d={r.d} className="geo-reg" aria-hidden="true" />
                  ),
                )}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Основатель: цитата крупно на 8 колонках, фото жёстким кадром справа */}
      <section className="sw-sec sw-wrap">
        <figure className="sw-grid sw-head gap-y-10">
          <p className="sw-label c-1-4">{home.ceo.eyebrow}</p>
          <div className="c-1-8 lg:row-start-2">
            <blockquote className="text-[clamp(1.375rem,1rem+1.3vw,2.25rem)] font-medium leading-[1.2] tracking-[-0.02em]">«{home.ceo.quote}»</blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold">{home.ceo.name} — {home.ceo.role}</p>
              <a href={site.contacts.ceoChannel} target="_blank" rel="noopener" className="mt-1 inline-block text-sm underline underline-offset-4 hover:text-[var(--red)]">{home.ceo.channelLabel} →</a>
            </figcaption>
          </div>
          <div className="c-9-12 lg:row-span-2 lg:row-start-1">
            <Image src="/images/team/sergey-malyutenkov-color.webp" alt="Сергей Малютенков, основатель и CEO ECO-PRO" width={640} height={800} className="sw-photo" />
          </div>
        </figure>
      </section>

      {/* 9. Кейсы — ряды: цифра · история · ссылка */}
      <section className="sw-sec sw-wrap">
        <Head label="реализованные проекты" title="Кейсы внедрения" />
        <div className="sw-rows mt-16">
          {featuredCases.map((c) => (
            <Link key={c.id} href={`/cases/${c.id}/`} className="sw-row">
              <div className="r-num">
                <p className="sw-num sw-num-s whitespace-nowrap"><Br>{c.value}</Br></p>
                <p className="sw-small mt-2">{c.valueLabel}</p>
              </div>
              <div className="r-case">
                <p className="sw-label sw-label-grey">{c.tag}</p>
                <h3 className="sw-h3 mt-2">{c.title}</h3>
                <p className="sw-body mt-3 text-[var(--grey)]">{c.text}</p>
              </div>
              <p className="r-link text-sm font-medium">Читать кейс <span className="sw-arrow" aria-hidden="true">→</span></p>
            </Link>
          ))}
        </div>
        <div className="sw-grid mt-8"><div className="c-5-12"><Button asChild variant="outline"><Link href="/cases/">Все кейсы</Link></Button></div></div>
      </section>

      {/* 10. Доверие — одна строка: кто рекомендует, ссылка на сканы */}
      <section className="sw-sec sw-wrap">
        <div className="sw-grid sw-head">
          <p className="sw-label c-1-4">рекомендации и допуски</p>
          <div className="c-5-12">
            <p className="sw-h3">Рекомендательные письма: {letters.map((d) => d.title).join(", ")}.</p>
            <p className="sw-body mt-4 text-[var(--grey)]">Лицензия МЧС России, членство в СРО строителей и проектировщиков, International F&amp;B Safety Association и сертификаты производителей.</p>
            <p className="mt-6"><Link href="/documents/" className="text-sm font-medium underline underline-offset-4 hover:text-[var(--red)]">Все лицензии и рекомендации →</Link></p>
          </div>
        </div>
      </section>

      {/* 11. Пилот: шаги 1–4 из гайдлайна слева, форма справа */}
      <section id="pilot" className="sw-sec sw-wrap">
        <Head label={home.pilot.eyebrow} title={home.pilot.title} text={home.pilot.text} />
        <div className="sw-grid mt-16 gap-y-12">
          <ol className="c-1-6">
            {home.pilot.points.map((t, i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] border-b border-[var(--hair)] py-4 first:border-t first:border-t-black">
                <span className="sw-label sw-red pt-1">{i + 1}</span>
                <span className="sw-body">{t}</span>
              </li>
            ))}
          </ol>
          <div className="c-8-12">
            <p className="sw-h3">Заявка на пилот</p>
            <p className="sw-small mb-6 mt-1">Ответим в течение рабочего дня</p>
            <LeadForm source="Пилот за 2 недели (/suisse/)" submitLabel={home.pilot.submit} />
          </div>
        </div>
      </section>

      {/* 12. Кому подходит — определения: роль · что получает */}
      <section className="sw-sec sw-wrap">
        <Head label={home.audience.eyebrow} title={home.audience.title} text={home.audience.text} />
        <dl className="sw-rows mt-16">
          {home.audience.roles.map((r) => (
            <div key={r.title} className="sw-row">
              <dt className="r-k sw-h3">{r.title}</dt>
              <dd className="r-v sw-body text-[var(--grey)]">{r.text}</dd>
            </div>
          ))}
          <div className="sw-row">
            <dt className="r-k sw-h3 sw-red">{home.audience.client.title}</dt>
            <dd className="r-v sw-body">{home.audience.client.text}. <Link href={home.audience.client.href} className="font-medium underline underline-offset-4 hover:text-[var(--red)]">{home.audience.client.cta} →</Link></dd>
          </div>
        </dl>
      </section>

      {/* 13. Отрасли — три колонки по линейкам */}
      <section className="sw-sec sw-wrap">
        <Head label={home.industries.eyebrow} title={home.industries.title} text={home.industries.text} />
        <div className="sw-cols mt-16">
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}/`} className="sw-col group block">
              <p className="sw-label sw-red">{i.label}</p>
              <h3 className="sw-h3 mt-4">{i.title}</h3>
              <p className="sw-body mt-3 text-[var(--grey)]">{i.short}</p>
              <p className="mt-6 text-sm font-medium">Смотреть обзор <span className="sw-arrow" aria-hidden="true">→</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* 14. Призыв — красная полоса во всю ширину, текст по левой оси */}
      <section className="sw-band-red mt-[var(--sec)] py-[var(--sec)]">
        <div className="sw-wrap">
          <p className="sw-label sw-label-grey">{home.cta.eyebrow}</p>
          <h2 className="sw-statement mt-6">{home.cta.title}</h2>
          <div className="sw-grid mt-10 gap-y-8">
            <p className="sw-body c-5-12 text-white/90">{home.cta.text}</p>
            <div className="c-5-12"><Button asChild size="lg" className="bg-white text-black hover:bg-white/90"><a href={site.cta.href}>{site.cta.label}</a></Button></div>
          </div>
        </div>
      </section>

      {/* 15. Новости — три колонки, каналы строкой */}
      {posts.length > 0 && (
        <section className="sw-sec sw-wrap">
          <Head label="активность экосистемы" title="Новости и статьи" />
          <div className="sw-cols mt-16">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="sw-col group block">
                <p className="sw-label sw-label-grey"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                <h3 className="sw-h3 mt-4 group-hover:text-[var(--red)]">{p.title}</h3>
                <p className="sw-body mt-3 text-[var(--grey)]">{p.description}</p>
              </Link>
            ))}
          </div>
          <div className="sw-grid mt-12 gap-y-4 border-t border-black pt-4">
            <p className="sw-label c-1-4">каналы ECO-PRO</p>
            <p className="c-5-12 flex flex-wrap gap-x-8 gap-y-2 text-lg font-medium">
              <a href={site.contacts.telegram} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--red)]">Telegram →</a>
              <a href={site.contacts.max} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--red)]">MAX →</a>
              <Link href="/blog/" className="underline underline-offset-4 hover:text-[var(--red)]">Все статьи →</Link>
            </p>
          </div>
        </section>
      )}

      {/* 16. FAQ — заголовок слева, вопросы справа */}
      <section id="faq" className="sw-sec sw-wrap">
        <div className="sw-grid sw-head gap-y-8">
          <div className="c-1-4"><p className="sw-label">вопросы и ответы</p><h2 className="sw-h2 mt-6">Часто задаваемые вопросы</h2></div>
          <div className="sw-faq c-5-12"><FaqList items={homeFaq} /></div>
        </div>
      </section>
    </div>
  );
}
