// JSON-LD по стандарту AI-Ready сайта, §5. Один @graph на страницу, сущности связаны через @id.
import { site } from "@/content/site";
import type { Direction, Faq } from "@/content/directions";
import type { Industry } from "@/content/industries";

export const orgId = `${site.url}/#org`;
export const websiteId = `${site.url}/#website`;
export const personId = `${site.url}/#person`;

const c = site.contacts;

export const orgSchema: Record<string, unknown> = {
  "@type": site.orgType,
  "@id": orgId,
  name: site.name,
  legalName: site.legalName,
  alternateName: site.alternateName,
  taxID: site.legal.inn,
  identifier: [{ "@type": "PropertyValue", propertyID: "ОГРН", value: site.legal.ogrn }],
  logo: `${site.url}/og.png`,
  url: site.url,
  description: site.description,
  foundingDate: String(site.foundingYear),
  areaServed: site.areaServed,
  ...(site.sameAs.length && { sameAs: site.sameAs }),
  ...(c.phone && { telephone: c.phone }),
  ...(c.email && { email: c.email }),
  ...(c.address.street && {
    address: { "@type": "PostalAddress", streetAddress: c.address.street, addressLocality: c.address.city, addressRegion: c.address.region, postalCode: c.address.postalCode, addressCountry: c.address.country },
  }),
  ...(site.person && { founder: { "@id": personId } }),
};

export const personSchema: Record<string, unknown> | null = site.person && {
  "@type": "Person",
  "@id": personId,
  name: site.person.name,
  jobTitle: site.person.jobTitle,
  description: site.person.description,
  worksFor: { "@id": orgId },
  url: `${site.url}/#komanda`,
  ...(site.person.sameAs.length && { sameAs: site.person.sameAs }),
};

export const websiteSchema = { "@type": "WebSite", "@id": websiteId, url: site.url, name: site.name, inLanguage: "ru-RU", publisher: { "@id": orgId } };

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(x: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@type": "Service",
    name: x.name,
    serviceType: x.serviceType,
    description: x.description,
    url: `${site.url}${x.path}`,
    provider: { "@id": orgId },
    areaServed: site.areaServed,
  };
}

export const directionSchema = (d: Direction) => serviceSchema({ name: `${d.code} — ${d.title}`, serviceType: d.h1, description: d.answer, path: `/services/${d.slug}/` });
export const industrySchema = (i: Industry) => serviceSchema({ name: `ECO-PRO для отрасли «${i.title}»`, serviceType: i.h1, description: i.answer, path: `/industries/${i.slug}/` });

export function itemList(name: string, items: { name: string; path: string }[]) {
  return { "@type": "ItemList", name, itemListElement: items.map((it, n) => ({ "@type": "ListItem", position: n + 1, name: it.name, url: `${site.url}${it.path}` })) };
}

export function articleSchema(p: { slug: string; title: string; description: string; date: string; updated?: string; image?: string }) {
  return {
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${site.url}/blog/${p.slug}/`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: "ru-RU",
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
    ...(p.image && { image: `${site.url}${p.image}` }),
  };
}

// Кейс — как статья о проекте от имени организации
export function caseSchema(c: { id: string; title: string; text: string; tag: string }) {
  return {
    "@type": "Article",
    headline: `${c.title} — кейс ECO-PRO`,
    description: c.text,
    about: c.tag,
    url: `${site.url}/cases/${c.id}/`,
    inLanguage: "ru-RU",
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: `${site.url}/cases/${c.id}/`,
  };
}

export function graph(...nodes: (Record<string, unknown> | null | false | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
