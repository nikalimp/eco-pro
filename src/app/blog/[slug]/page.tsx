import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { site } from "@/content/site";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import Image from "next/image";
import { CtaBlock } from "@/components/blocks";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbs, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  // Next.js со статическим экспортом требует хотя бы один путь — заглушка не попадает в sitemap
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return { robots: { index: false } };
  return {
    title: { absolute: p.seoTitle ?? p.title },
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", title: p.title, description: p.description, url: `${site.url}/blog/${p.slug}/`, publishedTime: p.date, modifiedTime: p.updated ?? p.date, images: [p.image ?? "/og.png"] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={graph(articleSchema(p), breadcrumbs([{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog/" }, { name: p.title, path: `/blog/${p.slug}/` }]))} />
      <Section className="pt-12">
        <Container className="max-w-3xl">
          <Crumbs items={[{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog/" }, { name: p.title }]} />
          <h1 className="text-center text-4xl leading-[0.95] text-balance sm:text-6xl">{p.title}</h1>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {site.name} · <time dateTime={p.date}>{formatDate(p.date)}</time>
            {p.updated && p.updated !== p.date && <> · обновлено <time dateTime={p.updated}>{formatDate(p.updated)}</time></>}
          </p>
          {p.image && <Image src={p.image} alt={p.title} width={1000} height={1500} className="mt-8 max-h-[560px] w-full rounded-md object-cover" />}
          <article className="prose-site mt-10">
            <Markdown remarkPlugins={[remarkGfm]}>{p.body}</Markdown>
          </article>
        </Container>
      </Section>
      <CtaBlock />
    </>
  );
}
