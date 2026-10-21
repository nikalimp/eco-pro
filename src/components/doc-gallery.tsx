import Image from "next/image";
import { X } from "lucide-react";
import type { Doc } from "@/content/documents";
import { cn } from "@/lib/utils";

// Карточки документов с превью. Клик открывает скан крупно — окно на CSS :target, работает без JavaScript.
export function DocCard({ d, compact }: { d: Doc; compact?: boolean }) {
  return (
    <a href={`#doc-${d.id}`} className="spot group flex flex-col border bg-background transition-colors hover:border-foreground">
      <span className="relative block overflow-hidden border-b bg-card p-4">
        <Image src={d.image.replace(".webp", "-sm.webp")} alt={`${d.title} — скан документа`} width={480} height={480} className="mx-auto h-44 w-auto rounded-sm object-contain shadow-sm transition-transform duration-500 group-hover:scale-[1.03] sm:h-52" />
      </span>
      <span className={cn("flex flex-1 flex-col p-5", compact && "p-4")}>
        <span className="font-bold">{d.title}</span>
        <span className="mt-1 text-xs text-muted-foreground">{d.issuer}{d.meta ? ` · ${d.meta}` : ""}</span>
        {!compact && <span className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{d.text}</span>}
      </span>
    </a>
  );
}

export function DocLightboxes({ docs }: { docs: Doc[] }) {
  return (
    <>
      {docs.map((d) => (
        <div key={d.id} id={`doc-${d.id}`} role="dialog" aria-modal="true" aria-label={d.title} className="invisible fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 opacity-0 transition-opacity target:visible target:opacity-100">
          <a href="#dokumenty" aria-label="Закрыть" className="absolute inset-0" tabIndex={-1} />
          <figure className="relative max-h-full max-w-3xl overflow-auto bg-background p-3 sm:p-4">
            <a href="#dokumenty" aria-label="Закрыть" className="absolute right-2 top-2 z-10 inline-flex size-10 items-center justify-center rounded-full bg-background/90 hover:bg-card"><X className="size-5" /></a>
            <Image src={d.image} alt={`${d.title}: ${d.text}`} width={990} height={1400} className="h-auto max-h-[80vh] w-auto" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted-foreground"><span className="font-medium text-foreground">{d.title}.</span> {d.issuer}{d.meta ? `, ${d.meta}` : ""}</figcaption>
          </figure>
        </div>
      ))}
    </>
  );
}
