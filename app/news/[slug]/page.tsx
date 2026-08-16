import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, ExternalLink, Share2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { getNewsItem, news } from "@/data/news";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getNewsItem((await params).slug);
  return item ? pageMetadata(item.title, item.summary, `/news/${item.slug}`, { type: "article", publishedTime: item.publishedAt, modifiedTime: item.publishedAt }) : {};
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getNewsItem((await params).slug);
  if (!item) notFound();
  const related = news.filter((entry) => entry.slug !== item.slug && entry.categorySlug === item.categorySlug).slice(0, 3);
  const hasExternalSource = !item.sourceUrl.startsWith(absoluteUrl());
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    image: [absoluteUrl("/og-default.png")],
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    mainEntityOfPage: absoluteUrl(`/news/${item.slug}`),
    author: { "@type": "Organization", name: item.source, url: absoluteUrl("/about") },
    publisher: { "@type": "Organization", "@id": `${absoluteUrl()}#organization`, name: "AI Global", logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
    ...(hasExternalSource ? { isBasedOn: item.sourceUrl } : {}),
  };

  return <>
    <JsonLd data={schema} />
    <article>
      <header className="bg-[var(--ocean)] py-14 text-white md:py-20"><div className="container-reading">
        <Breadcrumbs light items={[{ label: "资讯", href: "/news" }, { label: item.category, href: `/news/category/${item.categorySlug}` }, { label: item.title }]} />
        <span className="mt-10 inline-block rounded-full bg-[var(--brand)] px-3 py-1.5 text-xs font-bold text-[#062118]">{item.category}</span>
        <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-[-.04em] md:text-6xl">{item.title}</h1>
        <p className="mt-6 text-lg leading-8 text-white/62">{item.summary}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/42"><span>{item.source}</span><span>{formatDate(item.publishedAt)}</span><span className="flex items-center gap-1"><Clock3 className="size-3" />4分钟阅读</span></div>
      </div></header>
      <div className="container-reading py-14 md:py-20">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><p className="text-xs font-bold text-[var(--brand-dark)]">编辑说明</p><p className="mt-2 text-sm leading-7 text-[var(--muted)]">本文为 AI Global 基于行业公开信息整理的原创观察，内容用于帮助团队形成可验证的业务判断；涉及第三方平台时，请以其最新官方说明为准。</p></div>
        <div className="prose-global"><h2>这项变化意味着什么</h2><p>{item.summary}</p><p>对出海团队而言，关键不是追逐单一工具或平台信号，而是判断它是否改变用户发现、理解、比较或购买产品的方式。将变化映射到自己的目标市场、内容资产和数据基础，才会形成可执行决策。</p><blockquote>AI Global观察：先建立可验证的业务假设，再决定是否投入新的内容、渠道或技术项目。</blockquote><h2>建议团队检查的三个方面</h2><ul><li>目标用户的决策路径是否已经发生变化，证据来自哪里。</li><li>网站、商品数据和内容是否清晰、一致且便于用户和机器理解。</li><li>是否具备小规模验证的指标、责任人和复盘节奏。</li></ul><h2>来源与版权说明</h2><p>作者与来源：{item.source}。本站保留内容更正与更新记录；涉及外部资料时仅引用必要信息并鼓励读者核验原始来源。</p></div>
        <div className="mt-10 flex flex-wrap gap-3">{hasExternalSource && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white">阅读原始来源<ExternalLink className="size-4" /></a>}<ButtonLink href="/submit" variant="outline"><Share2 className="size-4" />提交线索或更正</ButtonLink></div>
      </div>
    </article>
    <section className="bg-white py-16"><div className="container-main"><h2 className="font-display text-3xl font-semibold">同类资讯</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{related.map((entry) => <Link key={entry.slug} href={`/news/${entry.slug}`} className="rounded-2xl border border-[var(--line)] p-5 hover:border-[var(--brand)]"><span className="text-[10px] font-bold text-[var(--brand-dark)]">{entry.category}</span><h3 className="mt-3 font-semibold leading-6">{entry.title}</h3><span className="mt-5 flex items-center gap-1 text-xs text-[var(--muted)]">继续阅读<ArrowUpRight className="size-3" /></span></Link>)}</div></div></section>
  </>;
}
