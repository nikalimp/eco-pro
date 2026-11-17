import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Container, Section, SectionHead } from "@/components/container";

export const metadata: Metadata = {
  title: "Блог о ситуационных центрах и предотвращении потерь",
  description: "Статьи ECO-PRO о ситуационных центрах, видеоаналитике, контроле регламентов и управлении рисками — с примерами из практики экосистемы PRO.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  const posts = getPosts();
  // Шапка без отдельной полосы, карточки сразу под ней — как на странице кейсов; у карточек обложки (правки Ника 18.11)
  return (
    <>
      <Section className="pt-10 pb-8 sm:pb-10">
        <Container>
          <SectionHead
            as="h1"
            className="mb-0 mt-6"
            eyebrow="блог"
            title="Блог ECO-PRO"
            text={<>Статьи о власти и видении CEO, управляемости, ситуационных центрах и предотвращении потерь — с примерами из практики экосистемы PRO. Термины, которые мы используем, — в <Link href="/glossary/" className="ds-link">глоссарии</Link>.</>}
          />
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <div data-reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.length === 0 && <p className="ds-body py-6">Статьи скоро появятся.</p>}
            {posts.map((p) => <PostCard key={p.slug} p={p} as="h2" />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
