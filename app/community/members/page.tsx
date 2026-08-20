import type { Metadata } from "next";
import { ListingHero } from "@/components/content/listing-hero";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("社区成员","AI Global Club成员角色与连接方式。","/community/members");
export default function MembersPage(){const roles=["跨境卖家","出海品牌","独立站团队","电商运营者","广告与内容团队","电商服务商","AI工具团队","供应链与平台招商"];return <><ListingHero eyebrow="Member Directory" title="社区成员" description="首期成员目录仅展示经本人同意公开的资料。当前为角色导航，不虚构成员身份与数量。"/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{roles.map((r,i)=><div key={r} className="rounded-[22px] border border-[var(--line)] bg-white p-6"><span className="font-mono text-[10px] text-[var(--brand-dark)]">ROLE 0{i+1}</span><h2 className="mt-8 text-xl font-bold">{r}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">成员完善资料并选择公开后，可在此建立专业连接。</p></div>)}</div></section></>}
