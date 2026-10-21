import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { directions } from "@/content/directions";
import { industries } from "@/content/industries";
import { cases } from "@/content/cases";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

// Новая страница = новая строка здесь. Политика, согласие и личный кабинет в sitemap не нужны.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().slice(0, 10);
  const posts = getPosts();
  return [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    { url: `${site.url}/napravleniya/`, lastModified: now, priority: 0.9 },
    ...directions.map((d) => ({ url: `${site.url}/napravleniya/${d.slug}/`, lastModified: now, priority: 0.9 })),
    { url: `${site.url}/otrasli/`, lastModified: now, priority: 0.8 },
    ...industries.map((i) => ({ url: `${site.url}/otrasli/${i.slug}/`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/keisy/`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/dokumenty/`, lastModified: now, priority: 0.6 },
    ...cases.map((c) => ({ url: `${site.url}/keisy/${c.id}/`, lastModified: now, priority: 0.7 })),
    ...(posts.length ? [{ url: `${site.url}/blog/`, lastModified: posts[0].updated ?? posts[0].date, priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.updated ?? p.date, priority: 0.7 })),
  ];
}
