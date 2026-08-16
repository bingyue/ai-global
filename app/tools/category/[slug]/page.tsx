import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/content/listing-hero";
import { ToolCard } from "@/components/content/tool-card";
import { toolCategories, tools } from "@/data/tools";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams(){return toolCategories.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=toolCategories.find(x=>x.slug===slug);return c?pageMetadata(`${c.name}工具`,`${c.name}相关AI电商与出海工具。`,`/tools/category/${slug}`):{};}
export default async function ToolCategory({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const category=toolCategories.find(x=>x.slug===slug);if(!category)notFound();const items=tools.filter(t=>t.categorySlug===slug);return <><ListingHero eyebrow="Tool Category" title={`${category.name}工具`} description={`适用于${category.name}场景的工具信息与使用边界。`}/><section className="bg-[var(--paper)] py-16"><div className="container-main"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(tool=><ToolCard key={tool.slug} tool={tool}/>)}</div></div></section></>}
