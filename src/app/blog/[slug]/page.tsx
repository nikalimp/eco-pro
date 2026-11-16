import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { site } from "@/content/site";
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
      <article>
        <header className="page-hero border-b border-[var(--c-border)]">
          <div className="ds-wrap max-w-4xl page-intro">
            <Crumbs items={[{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog/" }, { name: p.title }]} />
            <h1 className="ds-h1 mt-8">{p.title}</h1>
            <p className="ds-small mt-5">
              {site.name} · <time dateTime={p.date}>{formatDate(p.date)}</time>
              {p.updated && p.updated !== p.date && <> · обновлено <time dateTime={p.updated}>{formatDate(p.updated)}</time></>}
            </p>
          </div>
        </header>
        <div className="ds-wrap max-w-4xl page-section !pt-10">
          {p.image && <Image src={p.image} alt={p.imageAlt ?? p.title} width={1000} height={1500} className="mb-10 max-h-[560px] w-full object-cover" />}
          <div className="prose-site max-w-3xl">
            <Markdown remarkPlugins={[remarkGfm]}>{p.body}</Markdown>
          </div>
        </div>
      </article>
      <CtaBlock />
    </>
  );
}
