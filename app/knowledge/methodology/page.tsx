import type { Metadata } from "next";
import Content from "@/content/pages/editorial-methodology.mdx";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("AI Global编辑与研究方法", "AI Global内容如何选题、核验、组织和发布。", "/knowledge/methodology");

export default function MethodologyPage() {
  return <><header className="bg-[var(--ocean)] py-16 text-white"><div className="container-reading"><Breadcrumbs light items={[{ label: "知识库", href: "/knowledge" }, { label: "编辑与研究方法" }]} /><p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[var(--brand)]">Editorial Standard</p><h1 className="mt-6 font-display text-5xl font-semibold tracking-[-.045em] md:text-6xl">AI Global编辑与研究方法</h1><p className="mt-6 text-lg leading-8 text-white/58">用透明来源、清晰边界和可执行结论建设长期可信的AI出海知识。</p></div></header><article className="container-reading prose-global py-16"><Content /></article></>;
}
