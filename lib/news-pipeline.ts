import { createHash } from "node:crypto";
import { XMLParser } from "fast-xml-parser";
import { createClient } from "@supabase/supabase-js";
import { articleSources, type ArticleSourceConfig } from "@/data/sources";

export interface CollectedArticle {
  externalId: string;
  title: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  summary: string;
  category: string;
  categorySlug: string;
  status: "pending";
}

type XmlEntry = { title?: unknown; link?: unknown; pubDate?: unknown; published?: unknown; updated?: unknown; description?: unknown; summary?: unknown; guid?: unknown };
const asArray = <T>(value: T | T[] | undefined): T[] => value === undefined ? [] : Array.isArray(value) ? value : [value];
const textValue = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return textValue(object["#text"] ?? object["@_href"] ?? "");
  }
  return "";
};
const clean = (value: unknown) => textValue(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const linkValue = (value: unknown) => {
  const links = asArray(value);
  const preferred = links.find((link) => typeof link === "object" && link !== null && (link as Record<string, unknown>)["@_rel"] === "alternate") ?? links[0];
  return textValue(preferred);
};

export async function collectSource(source: ArticleSourceConfig): Promise<CollectedArticle[]> {
  const response = await fetch(source.url, { headers: { "User-Agent": "AI-Global-Research-Bot/1.0 (+https://aigoglobal.net/about)" }, signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error(`${source.name}: HTTP ${response.status}`);
  const xml = await response.text();
  const parsed = new XMLParser({ ignoreAttributes: false, processEntities: false }).parse(xml) as Record<string, unknown>;
  const rss = parsed.rss as { channel?: { item?: XmlEntry | XmlEntry[] } } | undefined;
  const feed = parsed.feed as { entry?: XmlEntry | XmlEntry[] } | undefined;
  const entries = rss?.channel?.item ? asArray(rss.channel.item) : asArray(feed?.entry);
  return entries.slice(0, 25).map((entry) => {
    const title = clean(entry.title);
    const sourceUrl = linkValue(entry.link);
    const rawDate = clean(entry.pubDate ?? entry.published ?? entry.updated);
    const date = rawDate && !Number.isNaN(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : new Date().toISOString();
    const summary = clean(entry.description ?? entry.summary).slice(0, 360);
    return { externalId: createHash("sha256").update(`${source.name}|${sourceUrl || title}`).digest("hex"), title, source: source.name, sourceUrl, publishedAt: date, summary, category: source.defaultCategory, categorySlug: source.categorySlug, status: "pending" as const };
  }).filter((item) => item.title && item.sourceUrl);
}

export function deduplicateArticles(items: CollectedArticle[]) {
  return [...new Map(items.map((item) => [item.externalId, item])).values()];
}

export async function fetchNewsPipeline() {
  const results = await Promise.allSettled(articleSources.filter((source) => source.enabled).map(collectSource));
  const articles = deduplicateArticles(results.flatMap((result) => result.status === "fulfilled" ? result.value : []));
  const errors = results.flatMap((result, index) => result.status === "rejected" ? [`${articleSources.filter(s=>s.enabled)[index]?.name}: ${String(result.reason)}`] : []);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key && articles.length) {
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await client.from("articles").upsert(articles.map((item) => ({ external_id: item.externalId, title: item.title, excerpt: item.summary, category: item.category, category_slug: item.categorySlug, source_name: item.source, source_url: item.sourceUrl, published_at: item.publishedAt, status: "pending" })), { onConflict: "external_id", ignoreDuplicates: true });
    if (error) throw new Error(error.message);
    return { mode: "supabase" as const, collected: articles.length, errors };
  }
  return { mode: "mock" as const, collected: articles.length, errors, preview: articles.slice(0, 3) };
}
