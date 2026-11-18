import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type Post } from "@/lib/posts";

// Карточка статьи с обложкой (без увеличения обложки при наведении — правки Ника 18.11) — на главной и в блоге (правки Ника 18.11). Нет обложки — общая картинка сайта.
export function PostCard({ p, as: H = "h3" }: { p: Post; as?: "h2" | "h3" }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="ds-tile ds-tile-click group flex flex-col overflow-hidden">
      <span className="block aspect-[40/21] overflow-hidden border-b border-[var(--c-border)] bg-[var(--c-layer)]">
        <Image src={p.image ?? "/og.png"} alt={p.imageAlt ?? `Обложка статьи «${p.title}»`} width={1200} height={630} className="h-full w-full object-cover" />
      </span>
      <span className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="ds-small"><time dateTime={p.date}>{formatDate(p.date)}</time></span>
        <H className="ds-h4 mt-3 group-hover:text-[var(--c-brand)]">{p.title}</H>
        <span className="ds-small mt-3 flex-1">{p.description}</span>
        <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium group-hover:text-[var(--c-brand)]">Читать статью<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </span>
    </Link>
  );
}
