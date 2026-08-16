import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/types";
import { formatDate } from "@/lib/utils";

export function NewsCard({ item, index }: { item: NewsItem; index?: number }) {
  return <article className="group border-b border-[var(--line)] py-7"><Link href={`/news/${item.slug}`} className="grid gap-4 md:grid-cols-[70px_1fr_auto]">
    <span className="font-mono text-[10px] text-[#a0aca7]">{typeof index === "number" ? String(index + 1).padStart(2,"0") : formatDate(item.publishedAt)}</span>
    <div><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-bold text-[var(--brand-dark)]">{item.category}</span><span className="text-[10px] text-[#9aa5a1]">{item.source} · {formatDate(item.publishedAt)}</span></div><h2 className="mt-2 text-xl font-semibold leading-8 tracking-[-.025em] transition group-hover:text-[var(--brand-dark)] md:text-2xl">{item.title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">{item.summary}</p></div><ArrowUpRight className="size-5 text-[#9eaaa5] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--brand-dark)]" />
  </Link></article>;
}
