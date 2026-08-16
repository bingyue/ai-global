import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

interface Item { title?: string; sourceUrl?: string; source_url?: string; externalId?: string; [key: string]: unknown }
async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: pnpm dedupe:news <input.json>");
  const raw: unknown = JSON.parse(await readFile(file, "utf8"));
  if (!Array.isArray(raw)) throw new Error("Input must be a JSON array.");
  const map = new Map<string, Item>();
  for (const value of raw) {
    if (typeof value !== "object" || value === null) continue;
    const item = value as Item;
    const url = item.sourceUrl ?? item.source_url ?? "";
    const key = item.externalId ?? createHash("sha256").update(`${url}|${item.title ?? ""}`).digest("hex");
    if (!map.has(key)) map.set(key, item);
  }
  console.log(JSON.stringify([...map.values()], null, 2));
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
