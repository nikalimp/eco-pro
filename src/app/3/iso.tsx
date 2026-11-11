// Изометрическая линейная графика для /3/ (T56): чертёжный стиль, только красный на тёмном.
// Всё считается здесь же из координат плана — без картинок, текст подписей в SVG помечен aria-hidden.

type P = [number, number, number];
const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);

function proj(o: { x: number; y: number; s: number }) {
  return ([x, y, z]: P) => [o.x + (x - y) * C * o.s, o.y + (x + y) * S * o.s - z * o.s] as const;
}
const pts = (f: ReturnType<typeof proj>, ps: P[]) => ps.map((p) => f(p).map((n) => n.toFixed(1)).join(",")).join(" ");

// Коробка: видимые рёбра и грани (для графиков, экранов, стеллажей)
function Box({ f, x, y, z = 0, w, d, h, fill = "none", cls = "" }: { f: ReturnType<typeof proj>; x: number; y: number; z?: number; w: number; d: number; h: number; fill?: string; cls?: string }) {
  const top: P[] = [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]];
  const left: P[] = [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]];
  const right: P[] = [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]];
  return (
    <g className={cls}>
      <polygon points={pts(f, left)} fill={fill} fillOpacity={0.18} />
      <polygon points={pts(f, right)} fill={fill} fillOpacity={0.32} />
      <polygon points={pts(f, top)} fill={fill} fillOpacity={0.08} />
    </g>
  );
}

// ── Первый экран: чертёж магазина с «поднятым планом» (T61) ─────────────────────────────
// Слои: сетка листа → основание пунктиром с размерами → поднятый план со стенами, стеллажами, кассами, складом →
// камеры с конусами обзора → событие у касс → сигнал в ситуационный центр → отчёт руководителю. Штамп листа — справа внизу.
const walls: [number, number][] = [[0, 0], [12, 0], [12, 9], [0, 9]];
const shelves = [1.6, 3.4, 5.2].map((y) => ({ x: 1.4, y, w: 5.2, d: 0.7, h: 0.9 }));
const racks = [0.7, 2.4].map((y) => ({ x: 8.7, y, w: 2.8, d: 0.6, h: 1.5 }));
const tills = [{ x: 8.6, y: 6.6, w: 1.1, d: 0.6, h: 0.55 }, { x: 10.3, y: 6.6, w: 1.1, d: 0.6, h: 0.55 }];
const people: [number, number][] = [[3.2, 2.7], [5.4, 4.4], [2.1, 6.6], [7.6, 5.6], [10.9, 7.9]];
const cams: { at: [number, number]; cone: [number, number][]; label: string; dx: number; dy: number }[] = [
  { at: [0.3, 0.3], cone: [[0.3, 0.3], [6.8, 2.1], [2.6, 6.9]], label: "CAM 01 · ЗАЛ", dx: -96, dy: -10 },
  { at: [11.7, 4.6], cone: [[11.7, 4.6], [7.6, 3.2], [8.1, 8.6]], label: "CAM 02 · КАССЫ", dx: 14, dy: 4 },
  { at: [11.7, 0.3], cone: [[11.7, 0.3], [8.2, 1.2], [11.2, 4.1]], label: "CAM 03 · СКЛАД", dx: 14, dy: -6 },
];

export function HeroPlan({ className = "" }: { className?: string }) {
  const lift = 2.6;
  const f = proj({ x: 318, y: 214, s: 24 });
  const pt = (x: number, y: number, z: number) => f([x, y, z]);
  const line = (a: P, b: P) => { const p = f(a), q = f(b); return { x1: p[0], y1: p[1], x2: q[0], y2: q[1] }; };
  const ev = pt(9.15, 6.9, lift + 0.55); // событие у касс
  const sc = { x: 500, y: 64 };          // экран ситуационного центра
  const ceo = { x: 300, y: 64 };          // руководитель
  return (
    <svg viewBox="0 0 720 560" className={className} role="img" aria-label="Чертёж магазина: план поднят над основанием, три камеры видят зал, кассы и склад. У касс событие — сигнал уходит в ситуационный центр PRO-TEST, оттуда отчёт руководителю">
      <defs>
        <pattern id="bp-fine" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#ff6b62" strokeOpacity=".07" strokeWidth=".6" /></pattern>
        <pattern id="bp-major" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="url(#bp-fine)" /><path d="M60 0H0V60" fill="none" stroke="#ff6b62" strokeOpacity=".16" strokeWidth=".8" /></pattern>
        <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#ff8a80" /></marker>
        <radialGradient id="bp-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ff3b30" stopOpacity=".55" /><stop offset="1" stopColor="#ff3b30" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="720" height="560" fill="url(#bp-major)" />
      {/* рамка листа */}
      <rect x="12" y="12" width="696" height="536" fill="none" stroke="#ff6b62" strokeOpacity=".35" />

      {/* основание: сетка метров, контур, размеры */}
      <g stroke="#ff6b62" strokeOpacity=".14" strokeWidth=".7">
        {Array.from({ length: 13 }, (_, i) => <line key={`x${i}`} {...line([i, 0, 0], [i, 9, 0])} />)}
        {Array.from({ length: 10 }, (_, i) => <line key={`y${i}`} {...line([0, i, 0], [12, i, 0])} />)}
      </g>
      <polygon points={pts(f, walls.map(([x, y]) => [x, y, 0]))} fill="none" stroke="#ff6b62" strokeOpacity=".5" strokeDasharray="4 4" />
      <g stroke="#ff8a80" strokeOpacity=".7" strokeWidth=".8">
        <line {...line([0, 9.9, 0], [12, 9.9, 0])} />
        <line {...line([0, 9.4, 0], [0, 10.3, 0])} /><line {...line([12, 9.4, 0], [12, 10.3, 0])} />
        <line {...line([12.9, 0, 0], [12.9, 9, 0])} />
        <line {...line([12.4, 0, 0], [13.3, 0, 0])} /><line {...line([12.4, 9, 0], [13.3, 9, 0])} />
      </g>
      {(() => { const p = pt(6, 10.5, 0); return <text x={p[0]} y={p[1]} transform={`rotate(30 ${p[0]} ${p[1]})`} textAnchor="middle" className="iso-label">12 000</text>; })()}
      {(() => { const p = pt(13.5, 4.5, 0); return <text x={p[0]} y={p[1]} transform={`rotate(-30 ${p[0]} ${p[1]})`} textAnchor="middle" className="iso-label">9 000</text>; })()}
      {/* вертикали проекции */}
      <g stroke="#ff6b62" strokeOpacity=".4" strokeDasharray="2 5">
        {walls.map(([x, y], i) => <line key={i} {...line([x, y, 0], [x, y, lift])} />)}
      </g>

      <g className="iso-float">
        {/* пол и задние стены поднятого плана */}
        <polygon points={pts(f, walls.map(([x, y]) => [x, y, lift]))} fill="#ff3b30" fillOpacity=".06" stroke="#ff8a80" strokeWidth="1.4" />
        <polygon points={pts(f, [[0, 0, lift], [12, 0, lift], [12, 0, lift + 0.5], [0, 0, lift + 0.5]])} fill="#ff6b62" fillOpacity=".12" stroke="#ff8a80" strokeWidth="1" />
        <polygon points={pts(f, [[0, 0, lift], [0, 9, lift], [0, 9, lift + 0.5], [0, 0, lift + 0.5]])} fill="#ff6b62" fillOpacity=".2" stroke="#ff8a80" strokeWidth="1" />
        {/* перегородка склада и вход */}
        <polyline points={pts(f, [[8, 0, lift], [8, 3.6, lift], [12, 3.6, lift]])} fill="none" stroke="#ff8a80" strokeWidth="1.2" />
        <line {...line([3.6, 9, lift], [5.6, 9, lift])} stroke="#1a0505" strokeWidth="3" />
        {(() => { const p = pt(4.6, 9.6, lift); return <text x={p[0]} y={p[1]} transform={`rotate(30 ${p[0]} ${p[1]})`} textAnchor="middle" className="iso-label">ВХОД</text>; })()}
        {/* конусы обзора — под мебелью */}
        {cams.map((c, i) => <polygon key={c.label} points={pts(f, c.cone.map(([x, y]) => [x, y, lift]))} fill="#ff3b30" fillOpacity=".14" stroke="#ff6b62" strokeOpacity=".55" strokeWidth=".8" className="iso-cone" style={{ animationDelay: `${i * 0.8}s` }} />)}
        {[...shelves, ...racks, ...tills].map((b, i) => <Box key={i} f={f} {...b} z={lift} fill="#ff6b62" cls="iso-edge" />)}
        {/* покупатели */}
        {people.map(([x, y], i) => { const p = pt(x, y, lift); return <g key={i}><ellipse cx={p[0]} cy={p[1]} rx="5" ry="2.6" fill="#ff6b62" opacity=".35" /><circle cx={p[0]} cy={p[1] - 7} r="3.2" fill="#ffb3ad" /></g>; })}
        {/* камеры */}
        {cams.map((c, i) => { const p = pt(c.at[0], c.at[1], lift + 0.5); return (
          <g key={c.label}>
            <circle cx={p[0]} cy={p[1]} r="4.5" fill="#ff3b30" className="iso-pulse" style={{ animationDelay: `${i * 0.8}s` }} />
            <circle cx={p[0]} cy={p[1]} r="2" fill="#fff" />
            <line x1={p[0]} y1={p[1]} x2={p[0] + c.dx * 0.55} y2={p[1] + c.dy} stroke="#ff8a80" strokeWidth=".7" />
            <text x={p[0] + c.dx * 0.55 + (c.dx < 0 ? -4 : 4)} y={p[1] + c.dy + 3} textAnchor={c.dx < 0 ? "end" : "start"} className="iso-label">{c.label}</text>
          </g>
        ); })}
        {(() => { const p = pt(3.4, 7.6, lift); return <text x={p[0]} y={p[1]} className="iso-label">ТОРГОВЫЙ ЗАЛ</text>; })()}
        {(() => { const p = pt(8.9, 1.95, lift); return <text x={p[0]} y={p[1]} className="iso-label">СКЛАД</text>; })()}
        {/* событие у касс */}
        <circle cx={ev[0]} cy={ev[1]} r="16" fill="url(#bp-glow)" />
        <circle cx={ev[0]} cy={ev[1]} r="7" fill="none" stroke="#fff" strokeWidth="1.4" className="iso-pulse" />
        <circle cx={ev[0]} cy={ev[1]} r="2.5" fill="#fff" />
        <g transform={`translate(${ev[0] - 168} ${ev[1] + 22})`}>
          <rect width="160" height="34" fill="#1a0505" stroke="#ff3b30" />
          <text x="8" y="14" className="iso-label">СОБЫТИЕ · КАССА 1</text>
          <text x="8" y="27" className="iso-label iso-label-strong !text-[11px]">ВОЗВРАТ БЕЗ ЧЕКА</text>
        </g>
        <line x1={ev[0] - 12} y1={ev[1] + 22} x2={ev[0] - 3} y2={ev[1] + 6} stroke="#ff3b30" strokeWidth=".8" />
      </g>

      {/* сигнал: событие → ситуационный центр → руководитель */}
      <path d={`M${ev[0]},${ev[1] - 8} C${ev[0] + 10},${ev[1] - 120} ${sc.x + 80},${sc.y + 140} ${sc.x + 70},${sc.y + 34}`} fill="none" stroke="#ff8a80" strokeWidth="1.4" strokeDasharray="5 6" className="iso-flow" markerEnd="url(#bp-arrow)" />
      <g transform={`translate(${sc.x - 70} ${sc.y - 30})`}>
        <rect width="236" height="64" fill="#1a0505" stroke="#ff8a80" strokeWidth="1.4" />
        <rect x="0" y="0" width="236" height="16" fill="#ff3b30" fillOpacity=".25" />
        <text x="8" y="12" className="iso-label">ЛИСТ 02 · СИТУАЦИОННЫЙ ЦЕНТР</text>
        <text x="8" y="36" className="iso-label iso-label-strong">PRO-TEST · 24/7</text>
        <text x="8" y="53" className="iso-label">ОПЕРАТОР ПРОВЕРИЛ → РЕАКЦИЯ</text>
      </g>
      <line x1={sc.x - 70} y1={sc.y} x2={ceo.x + 62} y2={ceo.y} stroke="#ff8a80" strokeWidth="1.2" strokeDasharray="5 6" className="iso-flow" markerEnd="url(#bp-arrow)" />
      <g transform={`translate(${ceo.x - 102} ${ceo.y - 22})`}>
        <rect width="164" height="44" fill="none" stroke="#ff8a80" strokeOpacity=".7" />
        <text x="8" y="17" className="iso-label">РУКОВОДИТЕЛЬ</text>
        <text x="8" y="33" className="iso-label iso-label-strong">ОТЧЁТ И KPI</text>
      </g>

      {/* штамп листа */}
      <g transform="translate(468 476)" className="iso-label">
        <rect width="228" height="60" fill="#1a0505" fillOpacity=".7" stroke="#ff6b62" strokeOpacity=".6" />
        <line x1="0" y1="20" x2="228" y2="20" stroke="#ff6b62" strokeOpacity=".6" /><line x1="0" y1="40" x2="228" y2="40" stroke="#ff6b62" strokeOpacity=".6" /><line x1="140" y1="20" x2="140" y2="60" stroke="#ff6b62" strokeOpacity=".6" />
        <text x="8" y="14" className="iso-label iso-label-strong !text-[11px]">ECO-PRO · СХЕМА КОНТРОЛЯ</text>
        <text x="8" y="34">ОБЪЕКТ: МАГАЗИН</text><text x="148" y="34">ЛИСТ 01</text>
        <text x="8" y="54">ПЛАН +2 600</text><text x="148" y="54">М 1:200</text>
      </g>
    </svg>
  );
}

// ── Схемы процессов для карточек экосистемы (T61): одна манера с первым экраном, у каждой — путь сигнала ──
const RED = "#ff6b62";
function Lbl({ x, y, children, strong, anchor }: { x: number; y: number; children: React.ReactNode; strong?: boolean; anchor?: "start" | "middle" | "end" }) {
  return <text x={x} y={y} textAnchor={anchor} className={strong ? "iso-label iso-label-strong" : "iso-label"}>{children}</text>;
}
function Chip({ x, y, w, title, sub, hot }: { x: number; y: number; w?: number; title: string; sub?: string; hot?: boolean }) {
  const width = w ?? Math.max(title.length, sub?.length ?? 0) * 6.6 + 24;
  const h = sub ? 34 : 22;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height={h} fill="#1a0505" stroke={hot ? "#ff3b30" : "#ff8a80"} strokeWidth="1.2" />
      {hot && <rect width="4" height={h} fill="#ff3b30" />}
      <text x={12} y={sub ? 14 : 15} className={sub ? "iso-label" : "iso-chip"}>{title}</text>
      {sub && <text x={12} y={27} className="iso-chip">{sub}</text>}
    </g>
  );
}
const Flow = ({ d }: { d: string }) => <path d={d} fill="none" stroke="#ff8a80" strokeWidth="1.3" strokeDasharray="4 6" className="iso-flow" markerEnd="url(#eco-arrow)" />;

export function EcoScene({ code, className = "" }: { code: string; className?: string }) {
  const core = code === "PRO-TEST";
  const W = core ? 760 : 360, H = core ? 320 : 220;
  let body: React.ReactNode = null;
  if (core) {
    // Слева сигналы, в центре видеостена и пульт оператора, справа — проверка, реакция, устранение, отчёт
    const f = proj({ x: 330, y: 168, s: 21 });
    const wall = [0, 1, 2].flatMap((c) => [0, 1].map((r) => ({ c, r })));
    const op = f([4.6, 5.8, 0]);
    body = (
      <>
        <Chip x={20} y={70} w={150} title="CAM" />
        <Chip x={20} y={150} w={150} title="ИИ-ДЕТЕКЦИЯ" />
        <Chip x={20} y={230} w={150} title="ЧЕК-ЛИСТЫ" />
        <Flow d="M170,81 C220,81 230,140 262,150" />
        <Flow d="M170,161 L258,166" />
        <Flow d="M170,241 C220,241 230,190 262,182" />
        <polygon points={pts(f, [[0, 0, 0], [9, 0, 0], [9, 7, 0], [0, 7, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        {wall.map(({ c, r }) => <Box key={`${c}${r}`} f={f} x={0.6 + c * 2.7} y={0.4} z={1.1 + r * 1.9} w={2.5} d={0.2} h={1.75} fill={c === 1 && r === 0 ? "#ff3b30" : RED} cls="iso-edge" />)}
        <Box f={f} x={1} y={3.8} w={7} d={1.4} h={1} fill={RED} cls="iso-edge" />
        {[1.6, 3.9, 6.2].map((x) => <Box key={x} f={f} x={x} y={3.9} z={1} w={1.3} d={0.15} h={0.9} fill={RED} cls="iso-edge" />)}
        <ellipse cx={op[0]} cy={op[1]} rx="9" ry="4.5" fill={RED} opacity=".35" />
        <circle cx={op[0]} cy={op[1] - 13} r="6" fill="#ffb3ad" />
        <Chip x={570} y={40} w={170} title="ОПЕРАТОР" sub="ПРОВЕРКА 24/7" />
        <Chip x={570} y={118} w={170} title="РЕАКЦИЯ НА МЕСТЕ" hot />
        <Chip x={570} y={184} w={170} title="УСТРАНЕНИЕ" />
        <Chip x={570} y={250} w={170} title="ОТЧЁТ CEO" />
        <Flow d={`M${op[0] + 14},${op[1] - 14} C${op[0] + 90},${op[1] - 40} 520,60 566,58`} />
        <Flow d="M655,76 L655,114" />
        <Flow d="M655,142 L655,180" />
        <Flow d="M655,208 L655,246" />
      </>
    );
  } else if (code === "PRO-AI") {
    const f = proj({ x: 96, y: 92, s: 15 });
    const person = f([6.2, 2.6, 0]);
    body = (
      <>
        <polygon points={pts(f, [[0, 0, 0], [9, 0, 0], [9, 5.5, 0], [0, 5.5, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        <Box f={f} x={0.8} y={0.8} w={0.3} d={0.3} h={3.4} fill={RED} cls="iso-edge" />
        <Box f={f} x={0.6} y={0.6} w={1.6} d={0.7} h={0.7} z={3.4} fill={RED} cls="iso-edge" />
        <polygon points={pts(f, [[2.2, 1, 3.7], [8.4, 0.6, 0], [8.4, 5, 0], [4.6, 5.2, 0]])} fill="#ff3b30" fillOpacity=".14" stroke={RED} strokeOpacity=".55" className="iso-cone" />
        <Box f={f} x={6} y={2.4} w={0.5} d={0.5} h={1.8} fill={RED} cls="iso-edge" />
        <circle cx={person[0]} cy={person[1] - 33} r="5" fill="#ffb3ad" />
        <g stroke="#fff" strokeWidth="1.6" fill="none">
          <path d={`M${person[0] - 18},${person[1] - 34} v-10 h10 M${person[0] + 18},${person[1] - 34} v-10 h-10 M${person[0] - 18},${person[1] + 4} v10 h10 M${person[0] + 18},${person[1] + 4} v10 h-10`} />
        </g>
        <Lbl x={person[0]} y={person[1] + 30} anchor="middle">ДЕТЕКЦИЯ</Lbl>
        <Chip x={236} y={26} title="ОПОВЕЩЕНИЕ" hot />
        <Flow d={`M${person[0] + 20},${person[1] - 44} C${person[0] + 40},${person[1] - 80} 250,60 268,50`} />
        <Lbl x={20} y={30}>CAM · ВИДЕОПОТОК</Lbl>
      </>
    );
  } else if (code === "PRO-INC") {
    const f = proj({ x: 150, y: 50, s: 15 });
    const rows = [1, 2.3, 3.6, 4.9];
    const alert = f([2, 4.9 + 0.35, 0.31]);
    body = (
      <>
        <Box f={f} x={0} y={0} w={4.4} d={6.4} h={0.3} fill={RED} cls="iso-edge" />
        {rows.map((y, i) => (
          <g key={y}>
            <polygon points={pts(f, [[0.6, y, 0.31], [1.3, y, 0.31], [1.3, y + 0.7, 0.31], [0.6, y + 0.7, 0.31]])} fill={i < 3 ? RED : "none"} stroke={i < 3 ? RED : "#fff"} strokeWidth={i < 3 ? 1 : 1.6} />
            <line {...(() => { const a = f([1.8, y + 0.35, 0.31]); const b = f([3.8, y + 0.35, 0.31]); return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }; })()} stroke={RED} strokeOpacity=".7" />
          </g>
        ))}
        <circle cx={alert[0]} cy={alert[1]} r="9" fill="none" stroke="#fff" className="iso-pulse" />
        <Lbl x={36} y={40}>ЧЕК-ЛИСТ СМЕНЫ</Lbl>
        <Chip x={22} y={166} title="ФОТООТЧЁТ" />
        <Chip x={194} y={118} title="ЗАДАЧА" sub="ОТВЕТСТВЕННЫЙ · СРОК" hot />
        <Flow d={`M${alert[0] + 10},${alert[1]} C${alert[0] + 50},${alert[1] - 6} 176,132 190,134`} />
        <Flow d="M110,177 C150,177 140,124 150,116" />
      </>
    );
  } else if (code === "PRO-DATA") {
    const f = proj({ x: 150, y: 120, s: 13 });
    const dots: [number, number, boolean][] = [[0.4, 0.6, false], [1.6, 1.8, true], [0.8, 3.2, false], [2.4, 0.4, false], [2.2, 3.8, true], [3.2, 2.2, false], [0.2, 4.6, false], [3.6, 4.4, true], [1.2, 5.6, false]];
    const hub = f([5.4, 2.8, 0]);
    body = (
      <>
        <polygon points={pts(f, [[-1, 0, 0], [4.4, 0, 0], [4.4, 6.2, 0], [-1, 6.2, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        {dots.map(([x, y, hot], i) => { const p = f([x, y, 0]); return <g key={i}><line x1={p[0]} y1={p[1]} x2={hub[0]} y2={hub[1]} stroke={RED} strokeOpacity=".25" /><rect x={p[0] - 3} y={p[1] - 3} width="6" height="6" transform={`rotate(45 ${p[0]} ${p[1]})`} fill={hot ? "#ff3b30" : RED} fillOpacity={hot ? 1 : 0.6} /></g>; })}
        <circle cx={hub[0]} cy={hub[1]} r="10" fill="#1a0505" stroke="#fff" strokeWidth="1.4" />
        <circle cx={hub[0]} cy={hub[1]} r="3" fill="#fff" />
        {[2, 3, 2.6, 4.2, 5.8].map((h, i) => <Box key={i} f={f} x={7 + i * 1.4} y={-2.6} w={1} d={1} h={h} fill={i === 4 ? "#ff3b30" : RED} cls="iso-edge" />)}
        <Flow d={`M${hub[0] + 12},${hub[1] - 2} C${hub[0] + 40},${hub[1] - 10} 226,168 246,164`} />
        <Flow d="M330,96 C330,70 320,60 312,52" />
        <Lbl x={18} y={30}>СОБЫТИЯ ОБ ИНЦИДЕНТАХ</Lbl>
        <Lbl x={hub[0]} y={hub[1] + 24} anchor="middle">ЗАКОНОМЕРНОСТИ</Lbl>
        <Chip x={268} y={26} title="ЭФФЕКТ, ₽" hot />
      </>
    );
  } else {
    // PRO-TECHNO: камеры, СКУД и датчик кабелем к шкафу; обслуживание — по графику
    const f = proj({ x: 120, y: 70, s: 15 });
    const devices: [number, number, string][] = [[0.4, 0.4, "CAM"], [1.2, 4.8, "СКУД"], [3.6, 0.3, "ДАТЧИК"]];
    body = (
      <>
        <polygon points={pts(f, [[0, 0, 0], [9, 0, 0], [9, 7, 0], [0, 7, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        <Box f={f} x={6.4} y={1.6} w={1.8} d={1.6} h={4.2} fill={RED} cls="iso-edge" />
        {[1, 2, 3].map((z) => <line key={z} {...(() => { const a = f([6.4, 3.2, z]); const b = f([8.2, 3.2, z]); return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }; })()} stroke="#fff" strokeOpacity=".6" />)}
        {devices.map(([x, y, label], i) => {
          const top = f([x + 0.15, y + 0.15, i === 1 ? 1.4 : 2.6]);
          return (
            <g key={label}>
              {i === 1
                ? <><Box f={f} x={x} y={y} w={0.4} d={1.4} h={1.4} fill={RED} cls="iso-edge" /><Box f={f} x={x + 1.4} y={y} w={0.4} d={1.4} h={1.4} fill={RED} cls="iso-edge" /></>
                : <><Box f={f} x={x} y={y} w={0.3} d={0.3} h={2.6} fill={RED} cls="iso-edge" /><Box f={f} x={x - 0.3} y={y - 0.3} w={0.9} d={0.6} h={0.5} z={2.6} fill={RED} cls="iso-edge" /></>}
              <polyline points={pts(f, [[x + 0.15, y + 0.15, 0], [x + 0.15, 2.4, 0], [6.4, 2.4, 0]])} fill="none" stroke="#ff8a80" strokeDasharray="3 4" className="iso-flow" />
              <Lbl x={i === 2 ? top[0] + 10 : top[0] - 6} y={top[1] - 10} anchor={i === 2 ? "start" : "end"}>{label}</Lbl>
            </g>
          );
        })}
        <Chip x={250} y={30} title="ШКАФ · 24/7" />
        <Chip x={236} y={180} title="ТО ПО ГРАФИКУ" hot />
      </>
    );
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <pattern id={`eco-grid-${code}`} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke={RED} strokeOpacity=".08" strokeWidth=".6" /></pattern>
        <marker id="eco-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#ff8a80" /></marker>
      </defs>
      <g stroke="#ff8a80" strokeWidth="1.1" strokeLinejoin="round">{body}</g>
    </svg>
  );
}

// ── Иллюстрации этапов «Как мы начинаем работу» (T63) — та же чертёжная манера ──
export function StepArt({ n, className = "" }: { n: number; className?: string }) {
  let body: React.ReactNode = null;
  if (n === 0) {
    // Встреча: стол, NDA и общий чек-лист, две стороны
    const f = proj({ x: 170, y: 70, s: 16 });
    const a = f([1, 3, 1.4]), b = f([8, 3, 1.4]);
    body = (
      <>
        <Box f={f} x={2} y={1} w={5} d={4} h={1.2} fill={RED} cls="iso-edge" />
        <polygon points={pts(f, [[2.6, 1.4, 1.21], [4.2, 1.4, 1.21], [4.2, 3.6, 1.21], [2.6, 3.6, 1.21]])} fill="#1a0505" stroke="#fff" strokeWidth="1.2" />
        {[1.9, 2.5, 3.1].map((y) => <line key={y} {...(() => { const p = f([2.9, y, 1.21]), q = f([3.9, y, 1.21]); return { x1: p[0], y1: p[1], x2: q[0], y2: q[1] }; })()} stroke="#fff" strokeOpacity=".6" />)}
        <polygon points={pts(f, [[4.7, 1.6, 1.21], [6.4, 1.6, 1.21], [6.4, 4.4, 1.21], [4.7, 4.4, 1.21]])} fill="#1a0505" stroke={RED} strokeWidth="1.2" />
        {[2.1, 2.9, 3.7].map((y, i) => <polygon key={y} points={pts(f, [[5, y, 1.21], [5.4, y, 1.21], [5.4, y + 0.4, 1.21], [5, y + 0.4, 1.21]])} fill={i < 2 ? "#ff3b30" : "none"} stroke={RED} />)}
        {[a, b].map((p, i) => <g key={i}><ellipse cx={p[0]} cy={p[1] + 12} rx="9" ry="4.5" fill={RED} opacity=".35" /><circle cx={p[0]} cy={p[1] - 2} r="6" fill="#ffb3ad" /></g>)}
        <Chip x={18} y={20} title="NDA" />
        <Chip x={250} y={20} title="ЧЕК-ЛИСТ" />
        <Chip x={212} y={168} title="КРИТЕРИИ УСПЕХА" hot />
      </>
    );
  } else if (n === 1) {
    // Пилот: камеры на объекте → удалённое подключение → 14 дней мониторинга → отчёт
    const f = proj({ x: 110, y: 50, s: 14 });
    const cal = Array.from({ length: 14 }, (_, i) => ({ x: 2.5 + (i % 7) * 0.9, y: 5.6 + Math.floor(i / 7) * 0.9, on: i < 9 }));
    body = (
      <>
        <polygon points={pts(f, [[0, 0, 0], [5, 0, 0], [5, 4, 0], [0, 4, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        {[[0.6, 0.6], [3.8, 0.6], [0.6, 3]].map(([x, y], i) => <g key={i}><Box f={f} x={x} y={y} w={0.25} d={0.25} h={2.2} fill={RED} cls="iso-edge" /><Box f={f} x={x - 0.25} y={y - 0.25} w={0.8} d={0.5} h={0.45} z={2.2} fill={RED} cls="iso-edge" /></g>)}
        {cal.map((c, i) => <polygon key={i} points={pts(f, [[c.x, c.y, 0], [c.x + 0.75, c.y, 0], [c.x + 0.75, c.y + 0.75, 0], [c.x, c.y + 0.75, 0]])} fill={c.on ? "#ff3b30" : "none"} fillOpacity={c.on ? 0.55 : 1} stroke={RED} />)}
        <Chip x={14} y={14} title="КАМЕРЫ НА ОБЪЕКТЕ" />
        <Chip x={250} y={62} title="УДАЛЁННО" />
        <Flow d="M150,70 C190,64 220,72 246,74" />
        <Lbl x={110} y={212}>14 ДНЕЙ МОНИТОРИНГА</Lbl>
        <Chip x={268} y={168} title="ОТЧЁТ" hot />
        <Flow d="M296,86 C304,118 304,140 300,164" />
      </>
    );
  } else if (n === 2) {
    // Масштабирование: пилотный объект → сеть объектов
    const f = proj({ x: 180, y: 40, s: 13 });
    const grid = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ({ x: 6 + c * 2.2, y: 1 + r * 2.2 })));
    const src = f([1.5, 4.2, 1.6]);
    body = (
      <>
        <Box f={f} x={0.6} y={3.4} w={1.8} d={1.6} h={1.6} fill="#ff3b30" cls="iso-edge" />
        {grid.map((g, i) => { const t = f([g.x + 0.6, g.y + 0.6, 1]); return <g key={i}><path d={`M${src[0]},${src[1]} L${t[0]},${t[1]}`} stroke={RED} strokeOpacity=".3" strokeDasharray="3 4" /><Box f={f} x={g.x} y={g.y} w={1.2} d={1.2} h={1} fill={RED} cls="iso-edge" /></g>; })}
        <Chip x={18} y={22} title="ПИЛОТ" hot />
        <Chip x={236} y={170} title="ВСЯ СЕТЬ" />
      </>
    );
  } else {
    // Интеграция: дашборд CEO с KPI
    const f = proj({ x: 120, y: 150, s: 15 });
    const bars = [1.2, 2, 1.6, 2.6, 3.2];
    body = (
      <>
        <Box f={f} x={0} y={0} w={9} d={0.25} h={6} fill={RED} cls="iso-edge" />
        {bars.map((h, i) => <polygon key={i} points={pts(f, [[0.8 + i * 1.1, -0.01, 0.8], [1.6 + i * 1.1, -0.01, 0.8], [1.6 + i * 1.1, -0.01, 0.8 + h], [0.8 + i * 1.1, -0.01, 0.8 + h]])} fill={i === 4 ? "#ff3b30" : RED} fillOpacity={i === 4 ? 0.9 : 0.35} stroke={RED} />)}
        {(() => { const c = f([7.4, -0.01, 3.6]); return <g><circle cx={c[0]} cy={c[1]} r="17" fill="none" stroke={RED} strokeOpacity=".35" strokeWidth="5" /><path d={`M${c[0]},${c[1] - 17} A17 17 0 1 1 ${c[0] - 16},${c[1] + 5}`} fill="none" stroke="#ff3b30" strokeWidth="5" /></g>; })()}
        <Chip x={236} y={24} title="KPI · CEO" hot />
        <Chip x={18} y={180} title="ДАННЫЕ СЦ" />
        <Flow d="M112,186 C150,186 150,160 170,150" />
      </>
    );
  }
  return (
    <svg viewBox="0 0 360 220" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><marker id="eco-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#ff8a80" /></marker></defs>
      <g stroke="#ff8a80" strokeWidth="1.1" strokeLinejoin="round">{body}</g>
    </svg>
  );
}
