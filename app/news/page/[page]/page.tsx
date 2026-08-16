import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ListingHero } from "@/components/content/listing-hero";
import { NewsCard } from "@/components/content/news-card";
import { news } from "@/data/news";
import { pageMetadata } from "@/lib/metadata";

const PAGE_SIZE = 10;
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> { const {page} = await params; return pageMetadata(`AI出海资讯 · 第${page}页`, "AI Global行业资讯分页。", `/news/page/${page}`); }
export function generateStaticParams() { return [{ page: "2" }]; }

export default async function NewsPagination({ params }: { params: Promise<{ page: string }> }) {
  const pageNumber = Number((await params).page);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound();
  const items = news.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
  if (!items.length && pageNumber !== 1) notFound();
  return <><ListingHero eyebrow="News Archive" title={`AI出海资讯 · ${pageNumber}`} description="按时间浏览AI电商与全球增长行业动态。"/><section className="bg-[var(--paper)] py-16"><div className="container-main"><div className="border-t border-[var(--ink)]">{items.map((item,index)=><NewsCard key={item.slug} item={item} index={(pageNumber-1)*PAGE_SIZE+index}/>)}</div><div className="mt-10 flex justify-between"><Link href={pageNumber === 2 ? "/news" : `/news/page/${pageNumber-1}`} className="rounded-full border px-5 py-2 text-sm">← 上一页</Link>{pageNumber * PAGE_SIZE < news.length && <Link href={`/news/page/${pageNumber+1}`} className="rounded-full border px-5 py-2 text-sm">下一页 →</Link>}</div></div></section></>;
}
