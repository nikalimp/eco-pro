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

// ── Первый экран: облегчённый чертёж магазина (правки Ника 17.11) ─────────────────────────────
// Меньше объектов и никаких наложений: план без основания и размеров, два ряда стеллажей, склад, две кассы,
// две камеры. Событие у кассы → сигнал в ситуационный центр → отчёт руководителю. Подписи не заходят на план.
const walls: [number, number][] = [[0, 0], [12, 0], [12, 9], [0, 9]];
const shelves = [2, 4.4].map((y) => ({ x: 1.6, y, w: 5, d: 0.8, h: 1 }));
const racks = [{ x: 8.8, y: 1.1, w: 2.6, d: 0.7, h: 1.6 }];
const tills = [{ x: 8.4, y: 6.6, w: 1.2, d: 0.7, h: 0.6 }, { x: 10.2, y: 6.6, w: 1.2, d: 0.7, h: 0.6 }];
const cams: { at: [number, number]; cone: [number, number][]; label: string }[] = [
  { at: [0.3, 0.3], cone: [[0.3, 0.3], [7, 2.2], [2.4, 7.4]], label: "CAM 01 · ЗАЛ" },
  { at: [11.7, 4.6], cone: [[11.7, 4.6], [7.8, 5.4], [11.2, 8.7]], label: "CAM 02 · КАССЫ" },
];

export function HeroPlan({ className = "" }: { className?: string }) {
  const f = proj({ x: 300, y: 214, s: 23 });
  const pt = (x: number, y: number, z: number) => f([x, y, z]);
  const ev = pt(9, 6.95, 0.6);          // событие у кассы
  const sc = { x: 470, y: 52 };          // ситуационный центр (левый верхний угол карточки)
  const ceo = { x: 40, y: 52 };          // руководитель
  return (
    <svg viewBox="0 0 720 490" className={className} role="img" aria-label="Чертёж магазина: две камеры видят зал и кассы. У кассы событие — сигнал уходит в ситуационный центр, оттуда отчёт руководителю">
      <defs>
        <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#ff8a80" /></marker>
        <radialGradient id="bp-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ff3b30" stopOpacity=".55" /><stop offset="1" stopColor="#ff3b30" stopOpacity="0" /></radialGradient>
      </defs>

      <g className="iso-float">
        {/* пол и две задние стены */}
        <polygon points={pts(f, walls.map(([x, y]) => [x, y, 0]))} fill="#ff3b30" fillOpacity=".05" stroke="#ff8a80" strokeWidth="1.4" />
        <polygon points={pts(f, [[0, 0, 0], [12, 0, 0], [12, 0, 0.6], [0, 0, 0.6]])} fill="#ff6b62" fillOpacity=".12" stroke="#ff8a80" strokeWidth="1" />
        <polygon points={pts(f, [[0, 0, 0], [0, 9, 0], [0, 9, 0.6], [0, 0, 0.6]])} fill="#ff6b62" fillOpacity=".2" stroke="#ff8a80" strokeWidth="1" />
        {/* перегородка склада */}
        <polyline points={pts(f, [[8, 0, 0], [8, 3.4, 0], [12, 3.4, 0]])} fill="none" stroke="#ff8a80" strokeWidth="1.2" />
        {/* зоны обзора камер — под мебелью */}
        {cams.map((c, i) => <polygon key={c.label} points={pts(f, c.cone.map(([x, y]) => [x, y, 0]))} fill="#ff3b30" fillOpacity=".12" stroke="#ff6b62" strokeOpacity=".5" strokeWidth=".8" className="iso-cone" style={{ animationDelay: `${i * 1.2}s` }} />)}
        {[...shelves, ...racks, ...tills].map((b, i) => <Box key={i} f={f} {...b} fill="#ff6b62" cls="iso-edge" />)}
        {/* камеры и подписи снаружи плана */}
        {cams.map((c, i) => {
          const p = pt(c.at[0], c.at[1], 0.6);
          const left = i === 0;
          const lx = left ? p[0] - 70 : p[0] + 100;
          return (
            <g key={c.label}>
              <circle cx={p[0]} cy={p[1]} r="4.5" fill="#ff3b30" className="iso-pulse" style={{ animationDelay: `${i * 1.2}s` }} />
              <circle cx={p[0]} cy={p[1]} r="2" fill="#fff" />
              <line x1={p[0]} y1={p[1]} x2={lx} y2={p[1] - 18} stroke="#ff8a80" strokeWidth=".7" />
              <text x={left ? lx - 4 : lx + 4} y={p[1] - 15} textAnchor={left ? "end" : "start"} className="iso-label">{c.label}</text>
            </g>
          );
        })}
        {/* событие у кассы */}
        <circle cx={ev[0]} cy={ev[1]} r="18" fill="url(#bp-glow)" />
        <circle cx={ev[0]} cy={ev[1]} r="7" fill="none" stroke="#fff" strokeWidth="1.4" className="iso-pulse" />
        <circle cx={ev[0]} cy={ev[1]} r="2.5" fill="#fff" />
        <line x1={ev[0] - 6} y1={ev[1] + 6} x2={ev[0] - 40} y2={ev[1] + 52} stroke="#ff3b30" strokeWidth=".8" />
        <g transform={`translate(${ev[0] - 200} ${ev[1] + 52})`}>
          <rect width="160" height="34" fill="#1a0505" stroke="#ff3b30" />
          <rect width="4" height="34" fill="#ff3b30" />
          <text x="12" y="14" className="iso-label">СОБЫТИЕ · КАССА 1</text>
          <text x="12" y="27" className="iso-label iso-label-strong !text-[11px]">ВОЗВРАТ БЕЗ ЧЕКА</text>
        </g>
      </g>

      {/* сигнал: событие → ситуационный центр → руководитель */}
      <path d={`M${ev[0] + 6},${ev[1] - 10} C${ev[0] + 90},${ev[1] - 90} ${sc.x + 160},${sc.y + 150} ${sc.x + 125},${sc.y + 70}`} fill="none" stroke="#ff8a80" strokeWidth="1.4" strokeDasharray="5 6" className="iso-flow" markerEnd="url(#bp-arrow)" />
      <g transform={`translate(${sc.x} ${sc.y})`}>
        <rect width="236" height="64" fill="#1a0505" stroke="#ff8a80" strokeWidth="1.4" />
        <rect width="236" height="16" fill="#ff3b30" fillOpacity=".25" />
        <text x="8" y="12" className="iso-label">СИТУАЦИОННЫЙ ЦЕНТР</text>
        <text x="8" y="36" className="iso-label iso-label-strong">ЦЕНТР ПРАВДЫ · 24/7</text>
        <text x="8" y="53" className="iso-label">ОПЕРАТОР ПРОВЕРИЛ → РЕАКЦИЯ</text>
      </g>
      <line x1={sc.x - 6} y1={sc.y + 32} x2={ceo.x + 172} y2={ceo.y + 32} stroke="#ff8a80" strokeWidth="1.2" strokeDasharray="5 6" className="iso-flow" markerEnd="url(#bp-arrow)" />
      <g transform={`translate(${ceo.x} ${ceo.y + 10})`}>
        <rect width="164" height="44" fill="none" stroke="#ff8a80" strokeOpacity=".7" />
        <text x="8" y="17" className="iso-label">РУКОВОДИТЕЛЬ</text>
        <text x="8" y="33" className="iso-label iso-label-strong">ОТЧЁТ И KPI</text>
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
  const core = code === "Центр Правды";
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
        <Lbl x={110} y={212}>60 ДНЕЙ ПИЛОТА</Lbl>
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
  } else if (n === 4) {
    // Автоматизация с ИИ (правки Ника 17.11): камера → ИИ берёт рутину, сложные случаи уходят оператору ситуационного центра
    const f = proj({ x: 96, y: 96, s: 14 });
    const chip = f([4.6, 2.6, 0]);
    body = (
      <>
        <polygon points={pts(f, [[0, 0, 0], [7, 0, 0], [7, 5, 0], [0, 5, 0]])} fill="none" stroke={RED} strokeOpacity=".45" strokeDasharray="3 4" />
        <Box f={f} x={0.6} y={0.6} w={0.3} d={0.3} h={3} fill={RED} cls="iso-edge" />
        <Box f={f} x={0.4} y={0.4} w={1.4} d={0.6} h={0.6} z={3} fill={RED} cls="iso-edge" />
        <polygon points={pts(f, [[1.8, 0.8, 3.2], [6.4, 0.4, 0], [6.4, 4.6, 0], [3, 4.6, 0]])} fill="#ff3b30" fillOpacity=".12" stroke={RED} strokeOpacity=".5" className="iso-cone" />
        <Box f={f} x={4} y={2} w={1.2} d={1.2} h={0.5} fill="#ff3b30" cls="iso-edge" />
        {[0.25, 0.55, 0.85].map((k) => <line key={k} {...(() => { const a = f([4 + k * 1.2, 2, 0.5]), b = f([4 + k * 1.2, 1.6, 0.5]); return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }; })()} stroke={RED} />)}
        <Lbl x={chip[0]} y={chip[1] + 30} anchor="middle">ИИ-АГЕНТ</Lbl>
        <Chip x={232} y={26} title="РУТИНА · 24/7" />
        <Chip x={222} y={168} title="СЛОЖНОЕ → СЦ" hot />
        <Flow d={`M${chip[0] + 14},${chip[1] - 16} C${chip[0] + 50},${chip[1] - 60} 210,40 228,38`} />
        <Flow d={`M${chip[0] + 16},${chip[1] + 6} C${chip[0] + 60},${chip[1] + 30} 200,180 218,180`} />
        <Lbl x={20} y={30}>CAM · ВИДЕОПОТОК</Lbl>
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
