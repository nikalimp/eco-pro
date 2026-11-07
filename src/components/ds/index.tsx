// Библиотека компонентов дизайн-системы ECO-PRO v3 (T57). Токены — ./tokens.css (основа IBM Carbon),
// примитивы shadcn/Radix (Slot), варианты — cva. Виджеты данных — по образцу Tremor Raw (ProgressCircle, Tracker, BarList),
// без зависимостей: на маркетинговых страницах хватает CSS и SVG, Recharts подключим в личном кабинете.
import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./tokens.css";

/* ── Раскладка ─────────────────────────────────────────────── */

type Tone = "default" | "layer" | "light" | "dark" | "red" | "brick" | "deep";
const toneClass: Record<Tone, string> = {
  default: "", layer: "ds-theme-layer", light: "ds-theme-light", dark: "ds-theme-dark", red: "ds-theme-red", brick: "ds-theme-brick", deep: "ds-theme-deep",
};

/** Корень страницы на дизайн-системе: подключает токены */
export function DsRoot({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("ds", className)} {...p} />;
}

/** Секция: вертикальный ритм spacing-section и тема полосы */
export function Section({ tone = "default", pad = true, className, ...p }: React.ComponentProps<"section"> & { tone?: Tone; pad?: boolean }) {
  return <section className={cn(pad && "ds-section", toneClass[tone], className)} {...p} />;
}

/** Контейнер 82rem с полями 16/32 px */
export function Wrap({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("ds-wrap", className)} {...p} />;
}

/** Тема без отступов секции — для половин разворотов */
export function Surface({ tone = "default", className, ...p }: React.ComponentProps<"div"> & { tone?: Tone }) {
  return <div className={cn(toneClass[tone], className)} {...p} />;
}

/* ── Типографика ───────────────────────────────────────────── */

const headingClass = { display: "ds-display", h1: "ds-h1", h2: "ds-h2", h3: "ds-h3", h4: "ds-h4", h5: "ds-h5" } as const;
type HeadingSize = keyof typeof headingClass;

export function Heading({ size = "h2", as, className, ...p }: React.ComponentProps<"h2"> & { size?: HeadingSize; as?: "h1" | "h2" | "h3" | "h4" | "p" }) {
  const Tag = as ?? (size === "display" ? "h1" : (size as "h1" | "h2" | "h3" | "h4"));
  return <Tag className={cn(headingClass[size], className)} {...p} />;
}

/** Ключевое слово заголовка — фирменным красным (на тёмном — светло-красным) */
export const Accent = ({ className, ...p }: React.ComponentProps<"span">) => <span className={cn("ds-accent", className)} {...p} />;

/** Надзаголовок в скобках: [ Как мы работаем ] */
export const Eyebrow = ({ className, ...p }: React.ComponentProps<"p">) => <p className={cn("ds-eyebrow", className)} {...p} />;

/** Индекс [01] */
export const Index = ({ n, className }: { n: number; className?: string }) => <span className={cn("ds-index", className)}>{String(n).padStart(2, "0")}</span>;

const textClass = { lead: "ds-lead", body: "ds-body", small: "ds-small", label: "ds-label" } as const;
export function Text({ size = "body", as = "p", className, ...p }: Omit<React.HTMLAttributes<HTMLElement>, "ref"> & { size?: keyof typeof textClass; as?: "p" | "span" | "div" | "li" }) {
  return React.createElement(as, { className: cn(textClass[size], className), ...p });
}

/** Список с маркерами в моно */
export function List({ items, className }: { items: string[]; className?: string }) {
  return <ul className={cn("ds-body list-disc space-y-1.5 pl-5", className)}>{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

/* ── Кнопка ────────────────────────────────────────────────── */

const buttonVariants = cva("ds-btn", {
  variants: {
    variant: {
      primary: "bg-[var(--c-brand)] text-white hover:bg-[var(--c-brand-hover)] active:bg-[var(--c-brand-active)]",
      inverse: "bg-white text-[#161616] hover:bg-[#e8e8e8]",
      secondary: "border border-[var(--c-border-strong)] bg-transparent text-[var(--c-text)] hover:border-[var(--c-brand)] hover:text-[var(--c-brand)]",
      ghost: "bg-transparent text-[var(--c-text)] underline-offset-4 hover:underline",
    },
    size: {
      sm: "min-h-9 pl-4 pr-1 text-[13px]",
      md: "min-h-12 pl-5 pr-1 text-sm",
      lg: "min-h-14 pl-6 pr-1 text-base",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
const modClass = {
  primary: "bg-white text-[var(--c-brand)]",
  inverse: "bg-[var(--c-brand)] text-white",
  secondary: "border-l border-[var(--c-border-strong)] text-[var(--c-brand)]",
  ghost: "text-[var(--c-brand)]",
} as const;
const modSize = { sm: "size-7 text-lg", md: "size-10 text-[22px]", lg: "size-12 text-2xl" } as const;

export function Button({
  variant = "primary", size = "md", icon = "+", asChild, className, children, ...p
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean; icon?: React.ReactNode | false }) {
  const Comp = asChild ? Slot.Root : "button";
  const v = variant ?? "primary"; const s = size ?? "md";
  // Модуль «+» добавляется внутрь ребёнка при asChild, чтобы ссылка оставалась одним элементом
  const mod = icon === false ? null : <span className={cn("ds-btn-mod", modClass[v], modSize[s])} aria-hidden="true">{icon}</span>;
  if (asChild && React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return <Comp className={cn(buttonVariants({ variant, size }), icon === false && "pr-5", className)} {...p}>{React.cloneElement(children, {}, <>{children.props.children}{mod}</>)}</Comp>;
  }
  return <Comp className={cn(buttonVariants({ variant, size }), icon === false && "pr-5", className)} {...p}>{children}{mod}</Comp>;
}

/* ── Метка, плитка, иконка ─────────────────────────────────── */

const tagVariants = cva("ds-tag", {
  variants: {
    tone: {
      red: "bg-[var(--c-brand)] text-white",
      gray: "bg-[var(--c-layer)] text-[var(--c-text)] border border-[var(--c-border)]",
      dark: "bg-[#393939] text-white",
      outline: "border border-[var(--c-border-strong)] text-[var(--c-text)]",
      white: "bg-white text-[#161616] font-medium",
    },
  },
  defaultVariants: { tone: "red" },
});
export const Tag = ({ tone, className, ...p }: React.ComponentProps<"span"> & VariantProps<typeof tagVariants>) => <span className={cn(tagVariants({ tone }), className)} {...p} />;

export function Tile({ asChild, clickable, className, ...p }: React.ComponentProps<"div"> & { asChild?: boolean; clickable?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("ds-tile", (clickable || asChild) && "ds-tile-click", className)} {...p} />;
}

/** Квадрат с иконкой: тёмный (по умолчанию) или красный */
export function IconBox({ children, tone = "dark", size = "md", className }: { children: React.ReactNode; tone?: "dark" | "red" | "white"; size?: "sm" | "md" | "lg"; className?: string }) {
  const t = { dark: "bg-[#393939] text-white", red: "bg-[var(--c-brand)] text-white", white: "bg-white text-[var(--c-brand)]" }[tone];
  const s = { sm: "size-9 [&_svg]:size-4", md: "size-12 [&_svg]:size-6", lg: "size-14 [&_svg]:size-7" }[size];
  return <span className={cn("grid shrink-0 place-items-center", t, s, className)} aria-hidden="true">{children}</span>;
}

/* ── Цифры и данные ────────────────────────────────────────── */

/** Плитка с крупной цифрой и подписью под линейкой */
export function Stat({ value, label, accent, className }: { value: React.ReactNode; label: React.ReactNode; accent?: boolean; className?: string }) {
  return (
    <Tile className={cn("flex flex-col p-5 sm:p-7", className)}>
      <p className={cn("ds-num", accent && "ds-accent")}>{value}</p>
      <p className="ds-small mt-10 border-t border-[var(--c-border)] pt-4 sm:mt-auto sm:[margin-top:2.5rem]">{label}</p>
    </Tile>
  );
}

/** Кольцо (Tremor ProgressCircle): value 0–100, содержимое в центре */
export function ProgressRing({ value = 100, size = "12.5rem", width = "18px", bg, children, className }: { value?: number; size?: string; width?: string; bg?: string; children?: React.ReactNode; className?: string }) {
  return <div className={cn("ds-ring", className)} style={{ "--v": value, width: size, "--ring-w": width, ...(bg ? { "--ring-bg": bg } : {}) } as React.CSSProperties}><div>{children}</div></div>;
}

/** Полоса событий (Tremor Tracker): ok / warn / bad по клеткам */
export function Tracker({ data, className, label }: { data: ("ok" | "warn" | "bad")[]; className?: string; label?: string }) {
  const c = { ok: "bg-[#5a5a5a]", warn: "bg-[#f1a1a3]", bad: "bg-[var(--c-brand)]" };
  return <div className={cn("ds-tracker", className)} role="img" aria-label={label}>{data.map((d, i) => <span key={i} className={c[d]} />)}</div>;
}

/** Список-бары (Tremor BarList) */
export function BarList({ items, className }: { items: { name: string; value: number; display?: string }[]; className?: string }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className={cn("ds-barlist", className)}>
      {items.map((i) => (
        <div key={i.name} className="ds-bar ds-small text-[var(--c-text)]"><i style={{ width: `${(i.value / max) * 100}%` }} /><span>{i.name}</span><span className="font-medium">{i.display ?? i.value}</span></div>
      ))}
    </div>
  );
}

/** Заголовок секции: надзаголовок, заголовок с акцентом, подводка; align=center — только для коротких */
export function SectionHeader({ eyebrow, title, text, align = "left", className }: { eyebrow?: React.ReactNode; title: React.ReactNode; text?: React.ReactNode; align?: "left" | "center"; className?: string }) {
  const c = align === "center";
  return (
    <div className={cn(c && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading size="h2" className={cn(eyebrow && "mt-5")}>{title}</Heading>
      {text && <Text className={cn("mt-5 max-w-2xl", c && "mx-auto text-left sm:text-center")}>{text}</Text>}
    </div>
  );
}
