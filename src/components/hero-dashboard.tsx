"use client";
import { useEffect, useState } from "react";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

// Макет окна ситуационного центра на первом экране. Цифры и события — иллюстрация интерфейса.
// Без JavaScript показывается статичный экран с итоговыми значениями; с JavaScript — «живой» дашборд:
// счётчики, обновляющийся график и бегущая лента событий.

const parse = (v: string) => {
  const m = v.match(/^([\d.,]+)(.*)$/);
  return m ? { n: parseFloat(m[1].replace(",", ".")), dec: (m[1].split(/[.,]/)[1] || "").length, sep: m[1].includes(",") ? "," : ".", rest: m[2] } : null;
};

function Counter({ value, run }: { value: string; run: boolean }) {
  const p = parse(value);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!p || !run) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setShown((p.n * e).toFixed(p.dec).replace(".", p.sep) + p.rest);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);
  return <>{shown}</>;
}

// Детерминированная «живая» последовательность для графика
const nextBar = (i: number) => 26 + ((i * 37 + (i % 3) * 19) % 64);

export function HeroDashboard() {
  const d = home.dashboard;
  const [live, setLive] = useState(false);
  const [bars, setBars] = useState(d.bars);
  const [alert, setAlert] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = setTimeout(() => setLive(true), 350);
    let step = d.bars.length;
    const b = setInterval(() => setBars((prev) => [...prev.slice(1), nextBar(step++)]), 2200);
    const a = setInterval(() => setAlert((x) => (x + 1) % d.alerts.length), 3600);
    return () => { clearTimeout(start); clearInterval(b); clearInterval(a); };
  }, [d.alerts.length, d.bars.length]);

  return (
    <div className="hero-dash-stage">
      <div className="hero-dash dash-beam">
        <figure className="relative overflow-hidden border border-input bg-card text-left" aria-label="Пример экрана ситуационного центра PRO-TEST">
          <div className="tech flex h-10 items-center justify-between border-b bg-secondary px-4 text-[10px] text-white">
            <span className="flex gap-1.5" aria-hidden="true"><i className="size-2 bg-white/30" /><i className="size-2 bg-white/30" /><i className="size-2 bg-white/30" /></span>
            <span>{d.title}</span>
            <span className="flex items-center gap-1.5"><i className="live-dot size-1.5 rounded-full bg-positive" aria-hidden="true" />{d.status}</span>
          </div>
          <div className="space-y-3 p-3 sm:p-5">
            <dl className="grid grid-cols-2 gap-px overflow-hidden bg-border sm:grid-cols-5">
              {d.metrics.map((m, i) => (
                <div key={m.label} data-focus={m.label} className="dash-cell bg-background p-3 last:col-span-2 sm:p-4 sm:last:col-span-1" style={{ "--i": i } as React.CSSProperties}>
                  <dd className="flex flex-wrap items-baseline gap-x-1.5 text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
                    <Counter value={m.value} run={live} />
                    <span className={cn("text-base sm:text-lg", m.good ? "text-positive" : "text-brand")}>{m.delta}</span>
                  </dd>
                  <dt className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>
            <div className="relative overflow-hidden border bg-background p-3">
              <p className="mb-2 flex justify-between text-[11px] text-muted-foreground"><span>{d.chartLabel}</span><span className="text-brand">● LIVE</span></p>
              <div className="dash-bars flex h-16 items-end gap-1.5" aria-hidden="true">
                {bars.map((h, i) => (
                  <span key={i} className="dash-bar flex-1 bg-foreground" style={{ height: `${h}%`, opacity: 0.2 + h / 140, "--i": i } as React.CSSProperties} />
                ))}
              </div>
              <span className="dash-scan" aria-hidden="true" />
            </div>
            <div data-focus="Событие · реакция" className="relative h-11 overflow-hidden border border-foreground bg-background" aria-live="off">
              {d.alerts.map((a, i) => (
                <p key={a} className={cn("dash-alert absolute inset-0 flex items-center gap-2.5 px-3 text-xs font-medium", i === alert ? "is-on" : i === (alert + d.alerts.length - 1) % d.alerts.length ? "is-out" : "")} aria-hidden={i !== alert}>
                  <i className="live-dot size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />{a}
                </p>
              ))}
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}
