import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/content/listing-hero";
import { cases } from "@/data/cases";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [...new Set(cases.map((item) => item.industrySlug))].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((entry) => entry.industrySlug === slug);
  return item ? pageMetadata(`${item.industry}案例`, `AI Global在${item.industry}领域的匿名案例与示范方案。`, `/cases/industry/${slug}`) : {};
}

export default async function IndustryCases({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = cases.filter((item) => item.industrySlug === slug);
  if (!items.length) notFound();
  return <><ListingHero eyebrow="Cases by Industry" title={`${items[0].industry}案例`} description={`AI Global在${items[0].industry}领域的匿名案例与示范方案。`} /><section className="bg-[var(--paper)] py-16"><div className="container-main grid gap-4 md:grid-cols-2">{items.map((item) => <Link key={item.slug} href={`/cases/${item.slug}`} className="rounded-2xl border border-[var(--line)] bg-white p-6"><span className="text-xs text-[var(--brand-dark)]">{item.kind}</span><h2 className="mt-3 text-xl font-semibold">{item.title}</h2><p className="mt-3 text-sm text-[var(--muted)]">{item.challenge}</p></Link>)}</div></section></>;
}
