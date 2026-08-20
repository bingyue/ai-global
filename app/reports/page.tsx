import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { reports } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata:Metadata=pageMetadata("AI电商出海报告","AI购物、跨境独立站、商品内容、广告增长、SEO/GEO与电商自动化研究报告。","/reports");
export default function ReportsPage(){const covers=["bg-[#0b2547] text-white","bg-[#dfeaff] text-[#172b57]","bg-[#254edb] text-white","bg-[#7146c7] text-white"];return <><ListingHero eyebrow="AI Global Commerce Research" title="AI电商出海研究报告" description="围绕AI购物、商品、平台、独立站、广告与经营自动化建立长期研究主题。报告区分已发布与预告，不虚构页数和研究数据。"/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-8 md:grid-cols-2 lg:grid-cols-4">{reports.map((r,index)=><Link key={r.slug} href={`/reports/${r.slug}`} className="group"><div className={`soft-grid relative aspect-[3/4] rounded-[22px] p-6 ${covers[index]}`}><span className="font-mono text-[9px] tracking-[.18em]">AI GLOBAL / {r.number}</span><h2 className="mt-16 font-display text-3xl font-semibold leading-tight tracking-[-.035em]">{r.title}</h2><div className="absolute bottom-6 left-6 right-6 border-t border-current/20 pt-4 text-[10px]">{r.pages?`${r.pages} PAGES`:"COMING SOON"}</div></div><p className="mt-4 text-sm font-semibold">{r.status} · {formatDate(r.publishedAt)}</p><p className="mt-2 text-xs leading-5 text-[var(--muted)]">{r.summary}</p><span className="mt-4 flex items-center gap-2 text-xs font-bold text-[var(--brand-dark)]">查看报告<Download className="size-3"/></span></Link>)}</div></section></>}
