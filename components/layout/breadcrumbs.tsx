import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/utils";

export function Breadcrumbs({ items, light = false }: { items: { label: string; href?: string }[]; light?: boolean }) {
  const schemaItems = [{ label: "首页", href: "/" }, ...items].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: absoluteUrl(item.href) } : {}),
  }));

  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: schemaItems }} />
    <nav aria-label="面包屑" className={`flex flex-wrap items-center gap-1.5 text-xs ${light ? "text-white/48" : "text-[var(--muted)]"}`}>
      <Link href="/" className="hover:underline">首页</Link><ChevronRight className="size-3" />
      {items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">{item.href ? <Link href={item.href} className="hover:underline">{item.label}</Link> : <span aria-current="page">{item.label}</span>}{index < items.length - 1 && <ChevronRight className="size-3" />}</span>)}
    </nav>
  </>;
}
