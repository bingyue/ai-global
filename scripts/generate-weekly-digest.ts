import { mkdir, writeFile } from "node:fs/promises";
import { news } from "../data/news";
import { knowledge } from "../data/knowledge";

async function main() {
  const date = new Date().toISOString().slice(0, 10);
  const selectedNews = news.filter((item) => item.featured).slice(0, 5);
  const body = [`# AI Global Weekly · ${date}`, "", "> pending / 待编辑审核", "", "## 本周最值得关注", "", ...selectedNews.map((item) => `- [${item.title}](https://aigoglobal.net/news/${item.slug}) — ${item.summary}`), "", "## 本周学习", "", ...knowledge.slice(0, 3).map((item) => `- [${item.title}](https://aigoglobal.net/knowledge/${item.slug})`), "", "---", "所有链接与来源需由编辑在发送前复核。"].join("\n");
  await mkdir("data/generated", { recursive: true });
  await writeFile(`data/generated/weekly-${date}.md`, body, "utf8");
  console.log(`Draft written to data/generated/weekly-${date}.md`);
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
