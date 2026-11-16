import Link from "next/link";

// Видимые хлебные крошки. JSON-LD BreadcrumbList — через breadcrumbs() из lib/schema.
export function Crumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="ds-small">
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && <span className="mx-2 text-[var(--c-border-strong)]">/</span>}
          {it.path ? <Link href={it.path} className="hover:text-[var(--c-brand)]">{it.name}</Link> : <span className="text-[var(--c-text)]">{it.name}</span>}
        </span>
      ))}
    </nav>
  );
}
