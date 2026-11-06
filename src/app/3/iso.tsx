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

// План магазина: стены, стеллажи, кассы, склад — в координатах плана (метры условные)
const walls: [number, number][] = [[0, 0], [12, 0], [12, 9], [0, 9]];
const shelves = [1.5, 3.5, 5.5].map((y) => ({ x: 1.5, y, w: 5.5, d: 0.7 }));
const tills = [{ x: 8.5, y: 6.6, w: 1.2, d: 0.6 }, { x: 10.2, y: 6.6, w: 1.2, d: 0.6 }];
const cams: { at: P; cone: [number, number][] ; label: string }[] = [
  { at: [0.2, 0.2, 0], cone: [[0.2, 0.2], [6.5, 2.2], [3, 6.5]], label: "CAM 01" },
  { at: [11.8, 0.2, 0], cone: [[11.8, 0.2], [7.5, 4.8], [11.6, 5.4]], label: "CAM 02" },
  { at: [11.8, 8.8, 0], cone: [[11.8, 8.8], [8, 6.2], [11.6, 6.1]], label: "CAM 03" },
];

export function HeroPlan({ className = "" }: { className?: string }) {
  const lift = 2.4; // высота «поднятого плана»
  const f = proj({ x: 300, y: 205, s: 22 });
  const at = (p: P) => f(p);
  const plan = (z: number, cls: string) => (
    <g className={cls}>
      <polygon points={pts(f, walls.map(([x, y]) => [x, y, z]))} />
      {/* склад за перегородкой */}
      <polyline points={pts(f, [[8, 0, z], [8, 4.2, z], [12, 4.2, z]])} />
      <line x1={at([0, 7.6, z])[0]} y1={at([0, 7.6, z])[1]} x2={at([3, 7.6, z])[0]} y2={at([3, 7.6, z])[1]} />
    </g>
  );
  const top = lift;
  const sc = f([6, 4.5, 9.2]);
  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="Изометрическая схема: план магазина поднят над основанием, камеры видят торговый зал и кассы, сигналы идут в ситуационный центр">
      <defs>
        <pattern id="iso-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#ff6b62" opacity=".25" /></pattern>
      </defs>
      <rect width="600" height="520" fill="url(#iso-dots)" />
      {/* основание — тонко, пунктиром */}
      <g fill="none" stroke="#ff6b62" strokeOpacity=".35" strokeDasharray="3 4" strokeWidth="1">{plan(0, "")}</g>
      {/* вертикали проекции от основания к поднятому плану */}
      <g stroke="#ff6b62" strokeOpacity=".35" strokeDasharray="2 5">
        {walls.map(([x, y], i) => { const a = at([x, y, 0]); const b = at([x, y, top]); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
      </g>
      <g className="iso-float">
        {/* поднятый план */}
        <g fill="none" stroke="#ff8a80" strokeWidth="1.4">{plan(top, "")}</g>
        {shelves.map((s, i) => <Box key={i} f={f} {...s} z={top} h={0.9} fill="#ff6b62" cls="iso-edge" />)}
        {tills.map((s, i) => <Box key={i} f={f} {...s} z={top} h={0.6} fill="#ff6b62" cls="iso-edge" />)}
        {/* конусы обзора камер */}
        {cams.map((c, i) => (
          <g key={c.label}>
            <polygon points={pts(f, c.cone.map(([x, y]) => [x, y, top]))} fill="#ff3b30" fillOpacity=".16" stroke="#ff6b62" strokeOpacity=".5" strokeWidth=".8" className="iso-cone" style={{ animationDelay: `${i * 0.8}s` }} />
            <circle cx={at([c.at[0], c.at[1], top])[0]} cy={at([c.at[0], c.at[1], top])[1]} r="4" fill="#ff3b30" className="iso-pulse" style={{ animationDelay: `${i * 0.8}s` }} />
            <text x={at([c.at[0], c.at[1], top])[0] + 8} y={at([c.at[0], c.at[1], top])[1] - 6} className="iso-label">{c.label}</text>
          </g>
        ))}
        <text x={at([2, 8.3, top])[0]} y={at([2, 8.3, top])[1]} className="iso-label">ТОРГОВЫЙ ЗАЛ</text>
        <text x={at([9.2, 2, top])[0]} y={at([9.2, 2, top])[1]} className="iso-label">СКЛАД</text>
        <text x={at([9.5, 7.8, top])[0]} y={at([9.5, 7.8, top])[1]} className="iso-label">КАССЫ</text>
        {/* сигналы от камер вверх, в ситуационный центр */}
        <g fill="none" stroke="#ff8a80" strokeWidth="1.2" strokeDasharray="4 6" className="iso-flow">
          {cams.map((c) => { const a = at([c.at[0], c.at[1], top]); return <path key={c.label} d={`M${a[0]},${a[1]} C${a[0]},${(a[1] + sc[1]) / 2} ${sc[0]},${sc[1] + 60} ${sc[0]},${sc[1] + 26}`} />; })}
        </g>
      </g>
      {/* ситуационный центр — экран над планом */}
      <g className="iso-sc">
        <rect x={sc[0] - 70} y={sc[1] - 26} width="140" height="52" fill="#1a0505" stroke="#ff8a80" strokeWidth="1.4" />
        <text x={sc[0]} y={sc[1] - 6} textAnchor="middle" className="iso-label iso-label-strong">PRO-TEST</text>
        <text x={sc[0]} y={sc[1] + 12} textAnchor="middle" className="iso-label">ЦЕНТР ПРАВДЫ · 24/7</text>
      </g>
    </svg>
  );
}

// Иллюстрации направлений: изометрические фигуры одной манерой
export function DirArt({ code, className = "" }: { code: string; className?: string }) {
  // Начало координат и масштаб подобраны под каждую фигуру, чтобы она стояла по центру кадра 320×200
  const o = ({ "PRO-DATA": { x: 118, y: 125, s: 15 }, "PRO-TEST": { x: 140, y: 95, s: 15 }, "PRO-AI": { x: 110, y: 85, s: 15 }, "PRO-INC": { x: 160, y: 60, s: 15 } } as Record<string, { x: number; y: number; s: number }>)[code] ?? { x: 165, y: 85, s: 15 };
  const f = proj(o);
  const red = "#ff6b62";
  let body: React.ReactNode;
  if (code === "PRO-DATA") {
    body = [2, 4, 3, 6, 5].map((h, i) => <Box key={i} f={f} x={i * 1.6} y={0} w={1.1} d={1.1} h={h} fill={red} cls="iso-edge" />);
  } else if (code === "PRO-TEST") {
    body = (
      <>
        <Box f={f} x={0} y={2} w={7} d={2.2} h={1.2} fill={red} cls="iso-edge" />
        {[0, 2.4, 4.8].map((x, i) => <Box key={i} f={f} x={x} y={0} w={2.1} d={0.25} h={3.6} z={1.2} fill={red} cls="iso-edge" />)}
      </>
    );
  } else if (code === "PRO-AI") {
    body = (
      <>
        <Box f={f} x={1} y={1} w={2.6} d={1.4} h={1.4} z={3} fill={red} cls="iso-edge" />
        <polygon points={pts(f, [[3.6, 1.7, 3.7], [8.5, -0.5, 0], [8.5, 4.5, 0]])} fill={red} fillOpacity=".14" stroke={red} strokeOpacity=".6" />
        <polyline points={pts(f, [[6.2, 0.4, 0], [7.4, 0.4, 0], [7.4, 1.6, 0]])} fill="none" stroke="#fff" strokeWidth="1.6" />
        <polyline points={pts(f, [[6.2, 3.4, 0], [7.4, 3.4, 0], [7.4, 2.2, 0]])} fill="none" stroke="#fff" strokeWidth="1.6" />
      </>
    );
  } else if (code === "PRO-INC") {
    body = (
      <>
        <Box f={f} x={1} y={0} w={4.2} d={6.4} h={0.3} fill={red} cls="iso-edge" />
        {[1, 2.4, 3.8, 5.2].map((y, i) => (
          <g key={i}>
            <polygon points={pts(f, [[1.6, y, 0.31], [2.3, y, 0.31], [2.3, y + 0.7, 0.31], [1.6, y + 0.7, 0.31]])} fill={i < 3 ? red : "none"} stroke={red} />
            <line {...(() => { const a = f([2.8, y + 0.35, 0.31]); const b = f([4.6, y + 0.35, 0.31]); return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }; })()} stroke={red} strokeOpacity=".6" />
          </g>
        ))}
      </>
    );
  } else {
    // PRO-TECHNO: камеры на стойках и кабели к шкафу
    body = (
      <>
        <Box f={f} x={5} y={1} w={1.6} d={1.6} h={4} fill={red} cls="iso-edge" />
        {[[0, 0], [0, 4], [3, 6]].map(([x, y], i) => (
          <g key={i}>
            <Box f={f} x={x} y={y} w={0.3} d={0.3} h={2.4} fill={red} cls="iso-edge" />
            <Box f={f} x={x - 0.3} y={y - 0.3} w={0.9} d={0.6} h={0.5} z={2.4} fill={red} cls="iso-edge" />
            <polyline points={pts(f, [[x + 0.15, y + 0.15, 0], [x + 0.15, 1.8, 0], [5, 1.8, 0]])} fill="none" stroke={red} strokeDasharray="3 4" strokeOpacity=".7" />
          </g>
        ))}
      </>
    );
  }
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
      <defs><pattern id={`iso-dots-${code}`} width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="#ff6b62" opacity=".25" /></pattern></defs>
      <rect width="320" height="200" fill={`url(#iso-dots-${code})`} />
      <g stroke="#ff8a80" strokeWidth="1.1" strokeLinejoin="round">{body}</g>
    </svg>
  );
}
