import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { news } from "@/data/news";
import { knowledge } from "@/data/knowledge";
import { tools } from "@/data/tools";
import { cases } from "@/data/cases";
import { communityTopics, events, reports, courses } from "@/data/resources";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata("全站搜索", "搜索AI Global资讯、知识、工具、案例、报告、活动、课程、社区和企业服务。", "/search"),
  robots: { index: false, follow: true },
};

type Result = { title: string; description: string; type: string; category: string; date?: string; href: string };

const allResults: Result[] = [
  ...news.map((item) => ({ title: item.title, description: item.summary, type: "资讯", category: item.category, date: item.publishedAt, href: `/news/${item.slug}` })),
  ...knowledge.map((item) => ({ title: item.title, description: item.description, type: "知识", category: item.category, date: item.updatedAt, href: `/knowledge/${item.slug}` })),
  ...tools.map((item) => ({ title: item.name, description: item.description, type: "工具", category: item.category, href: `/tools/${item.slug}` })),
  ...cases.map((item) => ({ title: item.title, description: item.challenge, type: "案例", category: item.service, href: `/cases/${item.slug}` })),
  ...reports.map((item) => ({ title: item.title, description: item.summary, type: "报告", category: "行业研究", date: item.publishedAt, href: `/reports/${item.slug}` })),
  ...events.map((item) => ({ title: item.title, description: item.description, type: "活动", category: item.type, date: item.date, href: `/events/${item.slug}` })),
  ...courses.map((item) => ({ title: item.title, description: item.description, type: "课程", category: item.level, href: `/courses/${item.slug}` })),
  ...communityTopics.map((item) => ({ title: item.title, description: item.excerpt, type: "社区", category: item.category, date: item.publishedAt, href: `/community/topics#${item.slug}` })),
  ...services.map((item) => ({ title: item.name, description: item.description, type: "服务", category: "企业服务", href: `/services/${item.slug}` })),
];

async function currentTimestamp() {
  return Date.now();
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return <>{text}</>;
  return <>{text.slice(0, index)}<mark className="rounded bg-[#ffe2b5] px-0.5">{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string; time?: string }> }) {
  const { q = "", type = "", time = "" } = await searchParams;
  const referenceTime = await currentTimestamp();
  const normalized = q.trim().toLowerCase();
  const days = Number(time);
  const results = allResults.filter((item) => (
    (!normalized || `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(normalized))
    && (!type || item.type === type)
    && (!time || !Number.isFinite(days) || !item.date || new Date(item.date).getTime() >= referenceTime - days * 86_400_000)
  )).slice(0, 50);

  return <>
    <ListingHero eyebrow="Site Search" title="全站搜索" description="搜索资讯、知识、工具、案例、报告、活动、课程、社区主题与企业服务。首期使用构建时本地索引，无需付费搜索服务。" />
    <section className="bg-[var(--paper)] py-14"><div className="container-main">
      <form className="grid gap-3 rounded-[24px] border border-[var(--line)] bg-white p-5 md:grid-cols-[1fr_180px_160px_auto]" action="/search">
        <Input name="q" defaultValue={q} placeholder="搜索AI电商、GEO、建站…" autoFocus />
        <Select name="type" defaultValue={type}><option value="">全部类型</option>{["资讯", "知识", "工具", "案例", "报告", "活动", "课程", "社区", "服务"].map((item) => <option key={item}>{item}</option>)}</Select>
        <Select name="time" defaultValue={time}><option value="">全部时间</option><option value="7">最近7天</option><option value="30">最近30天</option><option value="365">最近一年</option></Select>
        <Button type="submit"><Search className="size-4" />搜索</Button>
      </form>
      <div className="mt-8 flex flex-wrap gap-2 text-xs"><span className="flex items-center gap-1 text-[var(--muted)]"><Sparkles className="size-3" />热门搜索</span>{["AI建站", "GEO", "广告素材", "Product Hunt", "数字员工"].map((item) => <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5">{item}</Link>)}</div>
      <div className="mt-10"><p className="text-sm text-[var(--muted)]">{q || type ? `找到 ${results.length} 条结果` : `探索全部 ${allResults.length} 条索引内容`}</p>
        <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">{results.length ? results.map((item, index) => <Link key={`${item.type}-${item.href}-${index}`} href={item.href} className="grid gap-3 bg-white px-5 py-6 transition hover:bg-[var(--brand-wash)] md:grid-cols-[80px_1fr]"><span className="text-[10px] font-bold text-[var(--brand-dark)]">{item.type} · {item.category}</span><div><h2 className="text-lg font-semibold"><Highlight text={item.title} query={q} /></h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]"><Highlight text={item.description} query={q} /></p></div></Link>) : <div className="bg-white py-16 text-center"><h2 className="font-display text-3xl font-semibold">没有找到匹配结果</h2><p className="mt-3 text-sm text-[var(--muted)]">试试更短的关键词，或浏览知识库和企业服务。</p><div className="mt-6 flex justify-center gap-3"><Link href="/knowledge" className="rounded-full border px-4 py-2 text-sm">浏览知识库</Link><Link href="/services" className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-white">查看企业服务</Link></div></div>}</div>
      </div>
    </div></section>
  </>;
}
