import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { cases } from "@/data/cases";
import { pageMetadata } from "@/lib/metadata";

export const metadata:Metadata=pageMetadata("AI电商出海案例","跨境独立站、商品内容、广告、SEO/GEO与电商自动化的匿名案例和示范方案。","/cases");
export default function CasesPage(){return <><ListingHero eyebrow="Evidence & Practice" title="案例与实践" description="真实呈现问题、方法、AI能力与合作周期。无授权不展示客户名称和Logo，无可信数据不编造增长数字。" stats={[{value:"8",label:"首期案例"},{value:"清晰",label:"案例类型标注"},{value:"透明",label:"结果表述"}]}/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-4 md:grid-cols-2">{cases.map((item,index)=><Link key={item.slug} href={`/cases/${item.slug}`} className={`group flex min-h-[350px] flex-col rounded-[28px] border p-7 ${index%4===0?"border-transparent bg-[var(--orange)]":"border-[var(--line)] bg-white"}`}><div className="flex justify-between"><span className={`rounded-full px-3 py-1 text-[10px] font-bold ${index%4===0?"bg-[var(--ink)] text-white":"bg-[var(--brand-wash)] text-[var(--brand-dark)]"}`}>{item.kind==="示范方案"?"Sample Playbook / 示范方案":item.kind}</span><span className="font-mono text-[10px] opacity-40">C{String(index+1).padStart(2,"0")}</span></div><h2 className="mt-8 font-display text-3xl font-semibold tracking-[-.035em] md:text-4xl">{item.title}</h2><p className="mt-4 text-sm leading-7 opacity-65">{item.challenge}</p><div className="mt-auto flex items-end justify-between pt-8"><span className="text-xs font-semibold">{item.industry} · {item.service} · {item.duration}</span><ArrowUpRight className="size-5 transition group-hover:rotate-45"/></div></Link>)}</div></section></>}
