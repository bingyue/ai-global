import { mkdir, writeFile } from "node:fs/promises";
import { news } from "../data/news";

async function main() {
  const date = new Date().toISOString().slice(0, 10);
  const body = [`# AI出海日报 · ${date}`, "", "> pending / 待编辑审核", "", ...news.slice(0, 8).flatMap((item, index) => [`## ${index + 1}. ${item.title}`, "", item.summary, "", `分类：${item.category}｜来源：${item.source}｜[查看条目](https://aigoglobal.net/news/${item.slug})`, ""])].join("\n");
  await mkdir("data/generated", { recursive: true });
  await writeFile(`data/generated/daily-${date}.md`, body, "utf8");
  console.log(`Draft written to data/generated/daily-${date}.md`);
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
