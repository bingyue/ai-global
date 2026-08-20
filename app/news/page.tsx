import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ListingHero } from "@/components/content/listing-hero";
import { NewsCard } from "@/components/content/news-card";
import { news, newsCategories } from "@/data/news";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("AI电商出海资讯", "AI购物、跨境电商、独立站、商品内容、广告、SEO/GEO、平台与政策的每日动态和编辑解读。", "/news");

export default function NewsPage() {
  return <><ListingHero eyebrow="AI Commerce Intelligence" title="AI电商出海资讯" description="追踪真正影响跨境电商的AI购物、平台、商品、内容、广告、独立站和政策变化。保留来源，提供合理摘要，不复制受版权保护的全文。" stats={[{value:"每日",label:"编辑更新"},{value:"10",label:"行业分类"},{value:"来源透明",label:"内容原则"}]} />
    <section className="bg-white py-10"><div className="container-main"><div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1"><Link href="/news" className="shrink-0 rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold text-white">全部</Link>{newsCategories.map((category)=><Link key={category.slug} href={`/news/category/${category.slug}`} className="shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-xs text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand-dark)]">{category.name}</Link>)}</div></div></section>
    <section className="bg-[var(--paper)] pb-24"><div className="container-main grid gap-10 pt-4 lg:grid-cols-[1fr_320px]"><div className="border-t border-[var(--ink)]">{news.slice(0,12).map((item,index)=><NewsCard key={item.slug} item={item} index={index}/>)}</div><aside><div className="sticky top-28 rounded-[24px] border border-[var(--line)] bg-white p-6"><p className="font-mono text-[10px] font-bold tracking-[.18em] text-[var(--brand-dark)]">DAILY BRIEF</p><h2 className="mt-4 font-display text-2xl font-semibold">订阅AI电商出海快讯</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">每日精选跨境电商重要变化，没有泛AI噪音。</p><div className="mt-5"><NewsletterForm compact /></div><div className="mt-7 border-t border-[var(--line)] pt-5"><p className="text-xs font-bold">内容采集原则</p><ul className="mt-3 space-y-2 text-xs leading-5 text-[var(--muted)]"><li>只收录与跨境电商直接相关的信息</li><li>优先官方RSS、API与博客</li><li>保留来源与原文入口</li><li>默认待审核后发布</li></ul></div></div></aside></div><div className="container-main mt-10 flex justify-center"><Link href="/news/page/2" className="rounded-full border border-[var(--line-strong)] bg-white px-6 py-3 text-sm font-semibold hover:border-[var(--brand)]">下一页 →</Link></div></section></>;
}
