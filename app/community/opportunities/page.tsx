import type { Metadata } from "next";
import { ListingHero } from "@/components/content/listing-hero";
import { ButtonLink } from "@/components/ui/button";
import { communityTopics } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("企业需求与合作机会","AI Global Club企业需求、合作机会与城市活动。","/community/opportunities");
export default function OpportunitiesPage(){const items=communityTopics.filter(t=>["企业需求","合作机会","城市活动"].includes(t.category));return <><ListingHero eyebrow="Opportunities" title="企业需求与合作机会" description="连接真实需求、能力与行业活动。发布者需要披露基本背景，平台保留审核、屏蔽和删除权。"/><section className="section-pad bg-[var(--paper)]"><div className="container-reading space-y-4">{items.map(i=><div key={i.slug} className="rounded-[22px] border border-[var(--line)] bg-white p-6"><span className="text-[10px] font-bold text-[var(--brand-dark)]">{i.category}</span><h2 className="mt-3 text-xl font-semibold">{i.title}</h2><p className="mt-3 text-sm text-[var(--muted)]">{i.excerpt}</p></div>)}<ButtonLink href="/community/apply">发布需求或机会</ButtonLink></div></section></>}
