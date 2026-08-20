import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { news, newsCategories } from "@/data/news";
import { knowledge, knowledgeCategories } from "@/data/knowledge";
import { toolCategories, tools } from "@/data/tools";
import { cases } from "@/data/cases";
import { courses, events, reports } from "@/data/resources";
import { services } from "@/data/services";

const siteUpdatedAt = "2026-08-20";
const staticPaths = [
  "", "/news", "/knowledge", "/tools", "/cases", "/reports", "/community",
  "/community/membership", "/community/topics", "/community/members", "/community/opportunities",
  "/community/apply", "/events", "/courses", "/services", "/submit", "/partners", "/about",
  "/contact", "/privacy", "/terms", "/en",
];

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(path: string, lastModified = siteUpdatedAt): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path.startsWith("/news") ? "daily" : path.startsWith("/knowledge") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.9 : 0.7,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [
    ...staticPaths.map((path) => entry(path)),
    ...news.map((item) => entry(`/news/${item.slug}`, item.publishedAt)),
    ...newsCategories.map((item) => entry(`/news/category/${item.slug}`)),
    ...knowledge.map((item) => entry(`/knowledge/${item.slug}`, item.updatedAt)),
    ...knowledgeCategories.flatMap((item) => [entry(`/knowledge/category/${item.slug}`), entry(`/knowledge/path/${item.slug}`)]),
    ...[...new Set(knowledge.map((item) => item.topicSlug))].map((slug) => entry(`/knowledge/topic/${slug}`)),
    ...tools.map((item) => entry(`/tools/${item.slug}`)),
    ...toolCategories.map((item) => entry(`/tools/category/${item.slug}`)),
    ...cases.flatMap((item) => [entry(`/cases/${item.slug}`), entry(`/cases/industry/${item.industrySlug}`), entry(`/cases/service/${item.serviceSlug}`)]),
    ...reports.map((item) => entry(`/reports/${item.slug}`, item.publishedAt > siteUpdatedAt ? siteUpdatedAt : item.publishedAt)),
    ...events.map((item) => entry(`/events/${item.slug}`)),
    ...courses.map((item) => entry(`/courses/${item.slug}`)),
    ...services.flatMap((item) => [entry(`/services/${item.slug}`), entry(`/en/services/${item.slug}`)]),
  ];

  return [...new Map(entries.map((item) => [item.url, item])).values()];
}
