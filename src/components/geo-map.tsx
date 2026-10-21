"use client";
import { useRef, useState } from "react";
import { geoMap } from "@/content/geo-map";
import { home } from "@/content/home";

type Pt = { name: string; x: number; y: number };
type Tip = { name: string; left: number; top: number } | null;

// Контурная карта России с городами проектов. Название города — по наведению или фокусу (Tab).
// Без JavaScript полный список городов — под картой (details «Все города списком»).
function Dots({ pts, w, h, onTip, big, moscowNote }: { pts: Pt[]; w: number; h: number; onTip: (t: Tip) => void; big?: string; moscowNote?: string }) {
  const show = (p: Pt) => onTip({ name: p.name === big && moscowNote ? moscowNote : p.name, left: (p.x / w) * 100, top: (p.y / h) * 100 });
  const sorted = [...pts].sort((a, b) => a.x - b.x);
  return (
    <>
      {sorted.map((p, i) => {
        const isBig = p.name === big;
        return (
          <g
            key={p.name}
            className="geo-dot"
            style={{ "--i": Math.round((i / sorted.length) * 30) } as React.CSSProperties}
            tabIndex={0}
            role="img"
            aria-label={isBig && moscowNote ? moscowNote : p.name}
            onPointerEnter={() => show(p)}
            onPointerLeave={() => onTip(null)}
            onFocus={() => show(p)}
            onBlur={() => onTip(null)}
          >
            {isBig && <circle cx={p.x} cy={p.y} r="9" className="geo-pulse" />}
            <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
            <circle cx={p.x} cy={p.y} r={isBig ? 6.5 : 4.2} className="geo-core" />
          </g>
        );
      })}
    </>
  );
}

function TipBox({ tip, light }: { tip: Tip; light?: boolean }) {
  if (!tip) return null;
  return (
    <span className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap px-3 py-1.5 text-xs font-medium shadow-lg ${light ? "bg-background text-foreground" : "bg-foreground text-background"}`} style={{ left: `${tip.left}%`, top: `${tip.top}%` }}>
      {tip.name}
    </span>
  );
}

export function GeoMap() {
  const [tip, setTip] = useState<Tip>(null);
  const [tipMo, setTipMo] = useState<Tip>(null);
  const ref = useRef<HTMLDivElement>(null);
  const g = geoMap;
  const moCount = g.inset.cities.length - 1;
  const total = g.cities.length + moCount;
  const mosNote = `Москва и ещё ${moCount} городов Подмосковья`;

  return (
    <div ref={ref} data-reveal className="geo grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="relative border bg-background p-3 sm:p-6">
        <div className="relative">
        <svg viewBox={`0 0 ${g.width} ${g.height}`} className="h-auto w-full overflow-visible" aria-label="Карта России с городами, где работает ECO-PRO">
          <defs>
            <pattern id="geo-grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--border)" />
            </pattern>
          </defs>
          <path d={g.path} className="geo-land" fill="url(#geo-grid)" stroke="var(--foreground)" strokeWidth="1.1" strokeLinejoin="round" pathLength={1} />
          <Dots pts={g.cities} w={g.width} h={g.height} onTip={setTip} big="Москва" moscowNote={mosNote} />
        </svg>
        <TipBox tip={tip} />
        </div>
        <p className="mt-2 sm:pointer-events-none sm:absolute sm:bottom-6 sm:left-6 sm:mt-0">
          <span className="block text-5xl font-black tracking-tight sm:text-6xl">{total}</span>
          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">городов на карте проектов</span>
        </p>
      </div>
      <div className="relative flex flex-col border bg-background p-4 sm:p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{home.geo.insetTitle}</p>
        <div className="relative mt-3 flex-1">
          <svg viewBox={`0 0 ${g.inset.width} ${g.inset.height}`} className="geo-inset h-auto w-full overflow-visible" aria-label="Города Подмосковья на карте проектов">
            <rect x="0" y="0" width={g.inset.width} height={g.inset.height} fill="url(#geo-grid-mo)" />
            <defs>
              <pattern id="geo-grid-mo" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="var(--border)" /></pattern>
            </defs>
            <circle cx={g.inset.cities[0].x} cy={g.inset.cities[0].y} r="125" fill="none" stroke="var(--foreground)" strokeOpacity=".5" strokeDasharray="3 5" />
            <circle cx={g.inset.cities[0].x} cy={g.inset.cities[0].y} r="62" fill="none" stroke="var(--foreground)" strokeOpacity=".3" strokeDasharray="3 5" />
            <circle cx={g.inset.cities[0].x} cy={g.inset.cities[0].y} r="22" fill="none" stroke="var(--foreground)" strokeWidth="1.2" />
            <Dots pts={g.inset.cities} w={g.inset.width} h={g.inset.height} onTip={setTipMo} big="Москва" />
          </svg>
          <TipBox tip={tipMo} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Москва и {moCount} городов области</p>
      </div>
    </div>
  );
}
