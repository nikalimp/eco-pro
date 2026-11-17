import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, getPosts } from "@/lib/posts";
import { Container, PageHero, Section } from "@/components/container";

export const metadata: Metadata = {
  title: "Блог о ситуационных центрах и предотвращении потерь",
  description: "Статьи ECO-PRO о ситуационных центрах, видеоаналитике, контроле регламентов и управлении рисками — с примерами из практики экосистемы PRO.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        eyebrow="блог"
        title="Блог ECO-PRO"
        answer="Статьи о власти и видении CEO, управляемости, ситуационных центрах и предотвращении потерь — с примерами из практики экосистемы PRO."
      >
        <p className="ds-small mt-6">Термины, которые мы используем, — в <Link href="/glossary/" className="ds-link">глоссарии</Link>.</p>
      </PageHero>
      <Section>
        <Container>
          <div data-reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.length === 0 && <p className="ds-body py-6">Статьи скоро появятся.</p>}
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="ds-tile ds-tile-click group flex flex-col p-6 sm:p-8">
                <p className="ds-small"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                <h2 className="ds-h4 mt-3 group-hover:text-[var(--c-brand)]">{p.title}</h2>
                <p className="ds-small mt-3 flex-1">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium group-hover:text-[var(--c-brand)]">Читать статью<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
