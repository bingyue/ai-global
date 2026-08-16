import type { Metadata } from "next";
import Link from "next/link";
import { ListingHero } from "@/components/content/listing-hero";
import { ToolCard } from "@/components/content/tool-card";
import { ButtonLink } from "@/components/ui/button";
import { toolCategories, tools } from "@/data/tools";
import { pageMetadata } from "@/lib/metadata";

export const metadata:Metadata=pageMetadata("AI电商与出海工具库","AI建站、商品图片、广告素材、内容、视频、SEO、社媒、分析、客服与自动化工具导航。","/tools");
export default function ToolsPage(){return <><ListingHero eyebrow="Curated Tool Directory" title="AI电商与出海工具库" description="按实际业务场景整理真实存在的工具。定价和功能可能变化，请以工具官网为准；本站不虚构评分或用户数量。" stats={[{value:"20",label:"首期真实工具"},{value:"12",label:"场景分类"},{value:"0",label:"虚构评分"}]}/><section className="bg-white py-9"><div className="container-main hide-scrollbar flex gap-2 overflow-x-auto">{toolCategories.map(c=><Link key={c.slug} href={`/tools/category/${c.slug}`} className="shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-xs hover:border-[var(--brand)]">{c.name}</Link>)}</div></section><section className="section-pad bg-[var(--paper)]"><div className="container-main"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.map(tool=><ToolCard key={tool.slug} tool={tool}/>)}</div><div className="mt-12 flex flex-wrap gap-3"><ButtonLink href="/submit">提交工具</ButtonLink><ButtonLink href="/partners" variant="outline">申请品牌合作</ButtonLink></div></div></section></>}
