import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/content/listing-hero";
import { KnowledgeCard } from "@/components/content/knowledge-card";
import { knowledge } from "@/data/knowledge";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams(){return [...new Set(knowledge.map(i=>i.topicSlug))].map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=knowledge.find(i=>i.topicSlug===slug);return item?pageMetadata(`${item.topic}专题`,`${item.topic}相关知识、方法与实战内容。`,`/knowledge/topic/${slug}`):{};}
export default async function TopicPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const items=knowledge.filter(i=>i.topicSlug===slug);if(!items.length)notFound();return <><ListingHero eyebrow="Knowledge Topic" title={items[0].topic} description={`围绕“${items[0].topic}”整理的知识、方法、案例与实践清单。`}/><section className="bg-[var(--paper)] py-16"><div className="container-main grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><KnowledgeCard key={item.slug} item={item}/>)}</div></section></>}
