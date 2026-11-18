import { home } from "@/content/home";
import { cn } from "@/lib/utils";

// Дашборд «как в личном кабинете» — по скриншоту ЛК клиента (презентация «СЦ для СЕО 3», слайд 25), итерация v3 (16.11).
// Вёрстка HTML и SVG, без картинки: цифры и подписи читают поисковики и нейросети. Данные — демо (home.dashboard).
// Цвет динамики — как на экране ЛК: снижение красным, рост зелёным.
// variant="full" — весь экран ЛК; "compact" — KPI, шкала индекса и столбцы (для телефона).

const d = home.dashboard;
const pct = (v: number) => `${v}%`;

function Gauge({ value, mark }: { value: number; mark: number }) {
  // Полукруг: 0% слева, 100% справа
  const r = 80, cx = 100, cy = 96, len = Math.PI * r;
  const at = (p: number) => {
    const a = Math.PI * (1 - p / 100);
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  };
  const [mx, my] = at(mark);
  const [ix, iy] = [cx + (r - 22) * Math.cos(Math.PI * (1 - mark / 100)), cy - (r - 22) * Math.sin(Math.PI * (1 - mark / 100))];
  return (
    <svg viewBox="0 0 200 116" className="h-auto w-full max-w-[15rem]" role="img" aria-label={`${d.index.label}: ${value}%, отметка ${mark}%`}>
      <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`} fill="none" stroke="var(--c-border)" strokeWidth="22" />
      <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`} fill="none" stroke="var(--c-success)" strokeWidth="22" strokeDasharray={`${(len * value) / 100} ${len}`} />
      <line x1={ix} y1={iy} x2={mx + (mx - cx) * 0.14} y2={my + (my - cy) * 0.14} stroke="var(--c-icon-box)" strokeWidth="2.5" />
      <text x={mx + 6} y={my - 10} className="lk-svg-small">{mark}%</text>
      <text x={cx} y={cy - 8} textAnchor="middle" className="lk-svg-big">{value}%</text>
      <text x={cx - r} y={cy + 16} textAnchor="middle" className="lk-svg-small">0%</text>
      <text x={cx + r} y={cy + 16} textAnchor="middle" className="lk-svg-small">100%</text>
    </svg>
  );
}

function Columns() {
  const max = Math.max(...d.resolution.items.map((i) => i.value));
  return (
    <div className="grid grid-cols-4 items-end gap-3" role="img" aria-label={`${d.resolution.title}: ${d.resolution.items.map((i) => `${i.label} ${i.value}%`).join(", ")}`}>
      {d.resolution.items.map((i) => (
        <div key={i.label} className="flex flex-col items-center text-center">
          <span className="lk-small mb-1 text-[var(--c-text)]">{pct(i.value)}</span>
          <span className="block w-full bg-[var(--c-border-strong)]" style={{ height: `${Math.max(6, (i.value / max) * 72)}px` }} />
          <span className="lk-small mt-2 leading-tight">{i.label}</span>
        </div>
      ))}
    </div>
  );
}

function Trend() {
  const t = d.trend, W = 760, H = 220, pad = 36;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (t.fact.length - 1);
  const y = (v: number) => H - pad - (v / 100) * (H - pad * 2);
  const line = t.fact.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="h-auto w-full" role="img" aria-label={`${t.title}: ${t.months.map((m, i) => `${m} ${t.fact[i]}%`).join(", ")}`}>
      <line x1={pad} y1={y(100) + 6} x2={W - pad} y2={y(100) + 6} stroke="var(--c-border-strong)" strokeDasharray="2 4" strokeWidth="1.5" />
      <polyline points={line} fill="none" stroke="var(--c-brand)" strokeWidth="2.5" />
      {t.fact.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r="3.5" fill="var(--c-brand)" />
          <text x={x(i)} y={y(v) + 18} textAnchor="middle" className="lk-svg-trend">{v}%</text>
          <text x={x(i)} y={H + 12} textAnchor="middle" className="lk-svg-trend">{t.months[i]}</text>
        </g>
      ))}
      <g transform={`translate(${W / 2 - 60} 8)`}>
        <line x1="0" y1="0" x2="18" y2="0" stroke="var(--c-border-strong)" strokeDasharray="2 3" strokeWidth="1.5" /><text x="22" y="4" className="lk-svg-trend">Цель</text>
        <line x1="62" y1="0" x2="80" y2="0" stroke="var(--c-brand)" strokeWidth="2.5" /><text x="84" y="4" className="lk-svg-trend">Факт</text>
      </g>
    </svg>
  );
}

const Card = ({ title, className, children }: { title?: string; className?: string; children: React.ReactNode }) => (
  <div className={cn("lk-card", className)}>
    {title && <p className="lk-title">{title}</p>}
    {children}
  </div>
);

// brief — без «Топ-5 нарушений» и «Списка магазинов» (главная, правки Ника 18.11)
export function HeroDashboard({ variant = "full", brief, className }: { variant?: "full" | "compact"; brief?: boolean; className?: string }) {
  const h = d.heatmap;
  const maxHeat = Math.max(...h.rows.flatMap((r) => r.values));
  return (
    <figure className={cn("lk", className)} aria-label={`${d.title}. ${d.note}`}>
      <div className="lk-bar">
        <span className="lk-brand">{d.brand}</span>
        <span className="lk-head">{d.title}</span>
        <span className="lk-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>

      <div className="lk-grid">
        <Card className="lk-kpis">
          <dl className="grid grid-cols-3 gap-4">
            {d.kpi.map((k) => (
              <div key={k.label} className="flex flex-col">
                <dt className="lk-small mb-3 min-h-[2.6em] font-medium text-[var(--c-text)]">{k.label}</dt>
                <dd>
                  <span className="lk-kpi">{k.value}</span>
                  {k.delta && <span className="lk-small mt-1 block text-[var(--c-success)]">{k.delta}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card title={d.index.label} className="lk-gauge flex flex-col items-center"><Gauge value={d.index.value} mark={d.index.mark} /></Card>
        <Card title={d.resolution.title} className="lk-cols"><Columns /></Card>

        {variant === "full" && (
          <>
            <Card title={h.title} className="lk-heat">
              <div className="overflow-x-auto">
                <table className="lk-table">
                  <thead><tr><th scope="col">Регион</th>{h.months.map((m) => <th key={m} scope="col">{m}</th>)}<th scope="col">Всего</th></tr></thead>
                  <tbody>
                    {h.rows.map((r) => (
                      <tr key={r.region}>
                        <th scope="row">{r.region}</th>
                        {r.values.map((v, i) => <td key={i} className="lk-heat-cell" style={{ "--a": (v / maxHeat).toFixed(2) } as React.CSSProperties}>{v}</td>)}
                        <td className="font-semibold">{r.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot><tr><th scope="row">Всего</th>{h.totals.map((t, i) => <td key={i}>{t}</td>)}<td>{h.total}</td></tr></tfoot>
                </table>
              </div>
            </Card>
            <Card title={d.trend.title} className="lk-trend"><Trend /></Card>

            {!brief && (<>
            <Card title={d.top.title} className="lk-top">
              <table className="lk-table lk-table-left">
                <thead><tr><th scope="col">Нарушение</th><th scope="col">Кол-во случаев</th><th scope="col">Динамика</th></tr></thead>
                <tbody>
                  {d.top.items.map((t) => (
                    <tr key={t.name}>
                      <th scope="row">{t.name}</th>
                      <td><span className="lk-hbar"><i style={{ width: `${(t.value / d.top.items[0].value) * 100}%` }} /><b>{t.value}</b></span></td>
                      <td className={t.delta.startsWith("−") ? "text-[var(--c-brand)]" : t.delta === "0%" ? "" : "text-[var(--c-success)]"}>{t.delta}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot><tr><th scope="row">Всего</th><td>{d.top.total}</td><td>{d.top.totalDelta}</td></tr></tfoot>
              </table>
            </Card>
            <Card title={d.stores.title} className="lk-stores">
              <div className="overflow-x-auto">
                <table className="lk-table lk-table-left">
                  <thead><tr>{d.stores.head.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                  <tbody>
                    {d.stores.rows.map((r) => (
                      <tr key={r[1]}>
                        {r.map((c, i) => (
                          <td key={i} className={i === 4 ? (c.startsWith("−") ? "text-[var(--c-brand)]" : c === "0%" ? "" : "text-[var(--c-success)]") : undefined}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            </>)}
          </>
        )}
      </div>
      <figcaption className="lk-note">{d.note}</figcaption>
    </figure>
  );
}
