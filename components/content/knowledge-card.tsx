import Link from "next/link";
import { Bookmark, LockKeyhole, MoveUpRight } from "lucide-react";
import type { KnowledgeItem } from "@/types";

export function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  return <Link href={`/knowledge/${item.slug}`} className="group flex min-h-64 flex-col rounded-[22px] border border-[var(--line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#abd4c5] hover:shadow-[0_20px_45px_rgba(16,32,27,.06)]"><div className="flex items-center justify-between"><span className="text-[10px] font-bold text-[var(--brand-dark)]">{item.category} · {item.level}</span>{item.access !== "public" ? <span className="flex items-center gap-1 rounded-full bg-[#fff0e6] px-2.5 py-1 text-[9px] font-bold text-[#b84b08]"><LockKeyhole className="size-3"/>{item.access === "member" ? "会员" : "付费会员"}</span> : <Bookmark className="size-4 text-[#a2ada9]"/>}</div><h2 className="mt-6 text-xl font-semibold leading-7 tracking-[-.025em] group-hover:text-[var(--brand-dark)]">{item.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p><div className="mt-auto flex items-end justify-between pt-6 text-[10px] text-[#899590]"><span>{item.readingTime}分钟 · 更新于 {item.updatedAt}</span><MoveUpRight className="size-4 transition group-hover:text-[var(--brand-dark)]"/></div></Link>;
}
