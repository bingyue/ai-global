import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Info, Languages, WalletCards } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { getTool, tools } from "@/data/tools";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return tools.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getTool((await params).slug);
  return tool ? pageMetadata(`${tool.name}工具介绍`, tool.description, `/tools/${tool.slug}`) : {};
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    url: tool.url,
    mainEntityOfPage: absoluteUrl(`/tools/${tool.slug}`),
  };
  const facts = [
    { icon: WalletCards, label: "定价类型", value: tool.pricing },
    { icon: Languages, label: "中文支持", value: tool.chineseSupport },
    { icon: Info, label: "适用场景", value: tool.scenarios.join(" / ") },
  ];

  return <>
    <JsonLd data={schema} />
    <section className="bg-[var(--ocean)] py-16 text-white"><div className="container-reading">
      <Breadcrumbs light items={[{ label: "工具", href: "/tools" }, { label: tool.category, href: `/tools/category/${tool.categorySlug}` }, { label: tool.name }]} />
      <div className="mt-12 flex items-center gap-5"><span className="flex size-20 items-center justify-center rounded-[22px] bg-white text-xl font-black text-[var(--ink)]">{tool.name.slice(0, 2)}</span><div><span className="text-xs font-bold text-[var(--brand)]">{tool.category}</span><h1 className="mt-2 font-display text-5xl font-semibold tracking-[-.04em]">{tool.name}</h1></div></div>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">{tool.description}</p>
      <a href={tool.url} target="_blank" rel="noreferrer nofollow" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-bold text-[#062118]">访问官方网站<ExternalLink className="size-4" /></a>
    </div></section>
    <section className="section-pad bg-[var(--paper)]"><div className="container-reading">
      <div className="grid gap-4 md:grid-cols-3">{facts.map((item) => {
        const Icon = item.icon;
        return <div key={item.label} className="rounded-2xl border border-[var(--line)] bg-white p-5"><Icon className="size-5 text-[var(--brand-dark)]" /><p className="mt-5 text-xs text-[var(--muted)]">{item.label}</p><p className="mt-1 text-sm font-semibold">{item.value}</p></div>;
      })}</div>
      <div className="prose-global mt-10"><h2>工具概览</h2><p>{tool.description} AI Global将它归入“{tool.category}”场景。工具的具体功能、定价、地区可用性和数据政策可能变化，请在采购或导入业务数据前阅读官方说明。</p><h2>适用场景</h2><ul>{tool.scenarios.map((scenario) => <li key={scenario}>{scenario}</li>)}</ul><h2>采用前检查</h2><ul><li>是否解决一个明确、高频的业务问题。</li><li>生成或分析结果是否有人工复核与质量标准。</li><li>数据存储、隐私、权限与目标市场合规是否清晰。</li><li>是否能导出关键数据，避免不可逆的平台锁定。</li></ul></div>
      <div className="mt-10 rounded-2xl border border-[#f1d6c3] bg-[#fff6ef] p-5 text-sm leading-7 text-[#74411f]">本站展示的是编辑整理信息，不构成购买或投资建议。未标注合作的工具不代表商业合作；如存在赞助内容，将明确披露。</div>
      <div className="mt-8"><ButtonLink href="/submit" variant="outline">提交信息更正</ButtonLink></div>
    </div></section>
  </>;
}
