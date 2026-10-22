import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Блог о ситуационных центрах и предотвращении потерь",
  description: "Статьи ECO-PRO о ситуационных центрах, видеоаналитике, контроле регламентов и управлении рисками — с примерами из практики экосистемы PRO.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={graph(breadcrumbs([{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog/" }]))} />
      <Section className="pt-12">
        <Container className="max-w-5xl">
          <Crumbs items={[{ name: "Главная", path: "/" }, { name: "Блог" }]} />
          <h1 className="text-center text-5xl leading-[0.92] sm:text-7xl">Блог ECO-PRO</h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">Статьи о предотвращении потерь, ситуационных центрах и управлении рисками — с примерами из практики экосистемы PRO.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {posts.length === 0 && <p className="py-6 text-muted-foreground">Статьи скоро появятся.</p>}
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="spot group block border p-6 transition-colors hover:border-foreground sm:p-8">
                <p className="text-sm text-muted-foreground"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                <h2 className="mt-2 text-xl font-semibold group-hover:text-brand">{p.title}</h2>
                <p className="mt-2 text-muted-foreground">{p.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
