import { readFile } from "node:fs/promises";
import type { CollectedArticle } from "../lib/news-pipeline";

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: pnpm normalize:news <input.json>");
  const raw: unknown = JSON.parse(await readFile(file, "utf8"));
  if (!Array.isArray(raw)) throw new Error("Input must be a JSON array.");
  const normalized: Partial<CollectedArticle>[] = raw.filter(isRecord).map((item) => ({
    externalId: String(item.externalId ?? item.external_id ?? ""),
    title: String(item.title ?? "").trim(),
    source: String(item.source ?? item.source_name ?? "Unknown"),
    sourceUrl: String(item.sourceUrl ?? item.source_url ?? ""),
    publishedAt: new Date(String(item.publishedAt ?? item.published_at ?? Date.now())).toISOString(),
    summary: String(item.summary ?? item.excerpt ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 360),
    category: String(item.category ?? "AI产品"),
    categorySlug: String(item.categorySlug ?? item.category_slug ?? "ai-products"),
    status: "pending" as const,
  })).filter((item) => item.title && item.sourceUrl);
  console.log(JSON.stringify(normalized, null, 2));
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
