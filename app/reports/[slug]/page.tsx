import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpenCheck, CalendarDays, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ReportForm } from "@/components/forms/report-form";
import { JsonLd } from "@/components/seo/json-ld";
import { getReport, reports } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return reports.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const r = getReport((await params).slug);
  return r ? pageMetadata(r.title, r.summary, `/reports/${r.slug}`) : {};
}
export default async function ReportDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const r = getReport((await params).slug);
  if (!r) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: r.title,
    description: r.summary,
    ...(r.status === "可下载" ? { datePublished: r.publishedAt } : {}),
    image: [absoluteUrl("/og-default.png")],
    url: absoluteUrl(`/reports/${r.slug}`),
    publisher: {
      "@type": "Organization",
      "@id": `${absoluteUrl()}#organization`,
      name: "AI Global",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
  };
  return (
    <>
      <JsonLd data={schema} />
      <section className="bg-[var(--ocean)] py-16 text-white">
        <div className="container-main">
          <Breadcrumbs
            light
            items={[{ label: "报告", href: "/reports" }, { label: r.title }]}
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div className="soft-grid relative mx-auto aspect-[3/4] w-full max-w-[360px] rounded-[24px] bg-[var(--orange)] p-7 text-[#2a1408] shadow-2xl">
              <span className="font-mono text-[9px] tracking-[.18em]">
                AI GLOBAL RESEARCH / {r.number}
              </span>
              <h1 className="mt-20 font-display text-4xl font-semibold leading-tight tracking-[-.035em]">
                {r.title}
              </h1>
              <p className="absolute bottom-7 left-7 right-7 border-t border-current/20 pt-4 text-[10px]">
                {r.pages ? `${r.pages} PAGES · 2026` : `COMING SOON · 2026`}
              </p>
            </div>
            <div>
              <span className="rounded-full bg-[var(--brand)] px-3 py-1.5 text-xs font-bold text-[#062118]">
                {r.status}
              </span>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">
                {r.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/58">
                {r.summary}
              </p>
              <div className="mt-8 flex gap-6 text-xs text-white/40">
                <span className="flex gap-2">
                  <CalendarDays className="size-4" />
                  {formatDate(r.publishedAt)}
                </span>
                <span className="flex gap-2">
                  <FileText className="size-4" />
                  {r.pages ? `${r.pages}页` : "页数待发布"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-[var(--paper)]">
        <div className="container-main grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <BookOpenCheck className="size-6 text-[var(--brand-dark)]" />
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.04em]">
              报告内容
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-[var(--muted)]">
              <li>01 · 行业变化与关键驱动力</li>
              <li>02 · 典型业务场景与方法框架</li>
              <li>03 · 企业与团队的能力准备</li>
              <li>04 · 实践清单、风险与下一步</li>
            </ul>
            <p className="mt-8 rounded-xl border border-[var(--line)] bg-white p-4 text-xs leading-6 text-[var(--muted)]">
              报告预约页为首期运营入口。未发布报告不展示虚构页数；正式文件和下载链接将由运营团队补充。
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 md:p-9">
            <p className="font-mono text-[10px] font-bold tracking-[.18em] text-[var(--brand-dark)]">
              GET THE REPORT
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold">
              {r.status === "可下载" ? "获取完整报告" : "预约报告首发"}
            </h2>
            <p className="mt-3 mb-7 text-sm leading-6 text-[var(--muted)]">
              提交后将安全记录报告线索；若数据服务维护中，页面会明确提示且不会假成功。
            </p>
            <ReportForm reportSlug={r.slug} status={r.status} />
          </div>
        </div>
      </section>
    </>
  );
}
