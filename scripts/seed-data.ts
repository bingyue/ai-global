import { createClient } from "@supabase/supabase-js";
import { news } from "../data/news";
import { knowledge } from "../data/knowledge";
import { tools } from "../data/tools";
import { cases } from "../data/cases";
import { courses, events, reports, communityTopics } from "../data/resources";
import { services } from "../data/services";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const counts = { news: news.length, knowledge: knowledge.length, tools: tools.length, cases: cases.length, reports: reports.length, events: events.length, courses: courses.length, topics: communityTopics.length, services: services.length };
  if (!url || !key) {
    console.log("Mock mode: seed data validated, no database writes performed.");
    console.log(JSON.stringify(counts, null, 2));
    return;
  }
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const operations = [
    db.from("articles").upsert(news.map((i) => ({ slug: i.slug, title: i.title, excerpt: i.summary, category: i.category, category_slug: i.categorySlug, source_name: i.source, source_url: i.sourceUrl, published_at: i.publishedAt, status: i.status })), { onConflict: "slug" }),
    db.from("knowledge_items").upsert(knowledge.map((i) => ({ slug: i.slug, title: i.title, excerpt: i.description, category: i.category, category_slug: i.categorySlug, topic: i.topic, access_level: i.access, level: i.level, updated_at: i.updatedAt })), { onConflict: "slug" }),
    db.from("tools").upsert(tools.map((i) => ({ slug: i.slug, name: i.name, description: i.description, category: i.category, category_slug: i.categorySlug, pricing_type: i.pricing, chinese_support: i.chineseSupport, website_url: i.url, editor_pick: Boolean(i.editorPick), status: "published" })), { onConflict: "slug" }),
    db.from("cases").upsert(cases.map((i) => ({ slug: i.slug, title: i.title, industry: i.industry, service_slug: i.serviceSlug, challenge: i.challenge, solution: i.solution, result: i.result, kind: i.kind, status: "published" })), { onConflict: "slug" }),
    db.from("reports").upsert(reports.map((i) => ({ slug: i.slug, title: i.title, summary: i.summary, published_at: i.publishedAt, page_count: i.pages, status: i.status === "可下载" ? "published" : "coming_soon" })), { onConflict: "slug" }),
    db.from("events").upsert(events.map((i) => ({ slug: i.slug, title: i.title, event_type: i.type, starts_at: i.date, location: i.location, speaker: i.speaker, price_label: i.price, capacity_label: i.capacity, status: i.status })), { onConflict: "slug" }),
  ];
  const results = await Promise.all(operations);
  const error = results.find((result) => result.error)?.error;
  if (error) throw error;
  console.log("Supabase seed complete.");
  console.log(JSON.stringify(counts, null, 2));
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
