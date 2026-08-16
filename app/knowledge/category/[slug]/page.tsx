import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/content/listing-hero";
import { KnowledgeCard } from "@/components/content/knowledge-card";
import { knowledge, knowledgeCategories } from "@/data/knowledge";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams(){return knowledgeCategories.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=knowledgeCategories.find(x=>x.slug===slug);return c?pageMetadata(`${c.name}知识库`,`${c.name}的方法、教程、工具、案例和学习路径。`,`/knowledge/category/${slug}`):{};}
export default async function KnowledgeCategory({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const category=knowledgeCategories.find(x=>x.slug===slug);if(!category)notFound();const items=knowledge.filter(item=>item.categorySlug===slug);return <><ListingHero eyebrow="Knowledge Category" title={category.name} description={`${category.path}：覆盖${category.topics.join("、")}等核心主题。`}/><section className="bg-[var(--paper)] py-16"><div className="container-main"><div className="mb-8 flex flex-wrap gap-2">{category.topics.map(topic=><span key={topic} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs">{topic}</span>)}</div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><KnowledgeCard key={item.slug} item={item}/>)}</div></div></section></>}
