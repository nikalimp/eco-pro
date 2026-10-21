// Векторные иллюстрации в фирменных цветах: линии — currentColor, акценты — красный бренда.
// Декоративные (aria-hidden), не несут информации, которой нет в тексте рядом.
type P = { className?: string };
const brand = "var(--brand)";
const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="ill-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity=".18" /></pattern>
      </defs>
      <rect width="240" height="150" fill="url(#ill-dots)" />
      {children}
    </svg>
  );
}

// Ритейл: витрина, камера, рамка распознавания над покупателем
export function IllRetail({ className }: P) {
  return (
    <Frame className={className}>
      <g {...common}>
        <path d="M40 58h160v72H40z" />
        <path d="M34 40h172l-6 18H40z" />
        <path d="M60 40l-4 18M88 40l-2 18M116 40v18M144 40l2 18M172 40l4 18" opacity=".6" />
        <path d="M58 76h48v54H58zM122 76h60v34h-60z" />
        <path d="M206 30l-14 8 4 7 14-8z" /><path d="M200 41l-6 14" opacity=".5" />
      </g>
      <g fill="none" stroke={brand} strokeWidth="2">
        <path d="M128 84v-6h8M176 78h6v6M182 102v6h-6M136 108h-8v-6" />
        <circle cx="152" cy="91" r="6" /><path d="M143 107c2-6 16-6 18 0" />
      </g>
      <circle cx="196" cy="34" r="3" fill={brand} />
    </Frame>
  );
}

// HoReCa: клош, пар, таймер обслуживания
export function IllHoreca({ className }: P) {
  return (
    <Frame className={className}>
      <g {...common}>
        <path d="M50 112h112" /><path d="M62 112c0-30 18-48 44-48s44 18 44 48" />
        <circle cx="106" cy="58" r="5" />
        <path d="M90 44c-4-6 4-10 0-16M106 40c-4-6 4-10 0-16M122 44c-4-6 4-10 0-16" opacity=".5" />
      </g>
      <g fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round">
        <circle cx="186" cy="78" r="26" /><path d="M186 62v16l10 8" /><path d="M180 46h12" />
      </g>
      <g {...common}><path d="M60 124h92" opacity=".4" /></g>
    </Frame>
  );
}

// Производство и логистика: цех, конвейер с коробками, луч камеры
export function IllFactory({ className }: P) {
  return (
    <Frame className={className}>
      <g {...common}>
        <path d="M30 120V70l30 16V70l30 16V70l30 16V44h22v76z" />
        <path d="M128 44V24h10v20" opacity=".6" />
        <path d="M150 120h66" /><circle cx="160" cy="126" r="5" /><circle cx="206" cy="126" r="5" />
        <path d="M156 104h18v16h-18zM184 98h22v22h-22z" />
      </g>
      <path d="M214 34l-16 9 4 7 16-9z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M204 48l-30 50h40z" fill={brand} opacity=".12" />
      <g fill="none" stroke={brand} strokeWidth="2"><path d="M181 95h28v28h-28z" strokeDasharray="4 3" /></g>
    </Frame>
  );
}

// Пилот за 2 недели: календарь с отмеченными днями, график и галочка результата
export function IllPilot({ className }: P) {
  const days = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true" focusable="false">
      <defs><pattern id="ill-dots-p" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity=".18" /></pattern></defs>
      <rect width="320" height="220" fill="url(#ill-dots-p)" />
      <g {...common}>
        <path d="M24 40h168v150H24z" /><path d="M24 64h168" /><path d="M56 30v18M160 30v18" />
      </g>
      {days.map((d) => {
        const x = 36 + (d % 7) * 22, y = 78 + Math.floor(d / 7) * 26;
        return <rect key={d} x={x} y={y} width="16" height="16" fill={d < 10 ? brand : "none"} stroke={d < 10 ? brand : "currentColor"} strokeWidth="1.5" opacity={d < 10 ? 0.85 : 0.5} />;
      })}
      <text x="36" y="160" fontSize="15" fontWeight="700" fill="currentColor">14 дней</text>
      <text x="36" y="178" fontSize="11" fill="currentColor" opacity=".6">пилот на ваших объектах</text>
      <g {...common}>
        <path d="M206 70h96v96h-96z" />
        <path d="M218 150l18-22 16 10 18-30 20 12" stroke={brand} strokeWidth="2.5" />
        <path d="M218 154h74" opacity=".4" />
      </g>
      <circle cx="292" cy="62" r="18" fill={brand} />
      <path d="M284 62l6 6 11-12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Личный кабинет: окно дашборда с замком
export function IllCabinet({ className }: P) {
  return (
    <Frame className={className}>
      <g {...common}>
        <path d="M40 24h160v102H40z" /><path d="M40 40h160" />
        <path d="M54 58h40v26H54zM104 58h40v26h-40z" opacity=".6" />
        <path d="M54 112l20-12 18 6 22-16 26 10" stroke={brand} />
      </g>
      <g fill="none" stroke={brand} strokeWidth="2"><path d="M168 90h30v26h-30z" /><path d="M174 90v-8a9 9 0 0118 0v8" /></g>
      <circle cx="183" cy="103" r="3" fill={brand} />
    </Frame>
  );
}

export const industryIllustration: Record<string, (p: P) => React.ReactElement> = {
  riteyl: IllRetail,
  horeca: IllHoreca,
  "proizvodstvo-i-logistika": IllFactory,
};
