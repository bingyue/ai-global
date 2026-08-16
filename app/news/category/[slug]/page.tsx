import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/content/listing-hero";
import { NewsCard } from "@/components/content/news-card";
import { news, newsCategories } from "@/data/news";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return newsCategories.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params; const category=newsCategories.find(item=>item.slug===slug); if(!category)return {}; return pageMetadata(`${category.name}资讯`,`${category.name}领域的AI出海行业动态与编辑解读。`,`/news/category/${slug}`);}
export default async function NewsCategoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params; const category=newsCategories.find(item=>item.slug===slug); if(!category)notFound(); const items=news.filter(item=>item.categorySlug===slug); return <><ListingHero eyebrow="News Category" title={category.name} description={`关注${category.name}领域中影响全球业务决策的产品、平台和市场变化。`}/><section className="bg-[var(--paper)] py-16"><div className="container-main"><div className="border-t border-[var(--ink)]">{items.length?items.map((item,index)=><NewsCard key={item.slug} item={item} index={index}/>):<p className="py-20 text-center text-[var(--muted)]">该分类暂无已发布内容，欢迎稍后再来。</p>}</div></div></section></>}
