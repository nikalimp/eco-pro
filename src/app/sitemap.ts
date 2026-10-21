import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { cases } from "@/content/cases";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

// Новая страница = новая строка здесь. Политика, согласие и личный кабинет в sitemap не нужны.
// lastmod — только честная дата изменения (стандарт §2.11): у статей — updated/date, у остальных страниц его нет.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/services/`, priority: 0.9 },
    ...directions.map((d) => ({ url: `${site.url}/services/${d.slug}/`, priority: 0.9 })),
    { url: `${site.url}/industries/`, priority: 0.8 },
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}/`, priority: 0.8 })),
    { url: `${site.url}/cases/`, priority: 0.8 },
    { url: `${site.url}/documents/`, priority: 0.6 },
    ...cases.map((c) => ({ url: `${site.url}/cases/${c.id}/`, priority: 0.7 })),
    ...(posts.length ? [{ url: `${site.url}/blog/`, lastModified: posts[0].updated ?? posts[0].date, priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.updated ?? p.date, priority: 0.7 })),
  ];
}
