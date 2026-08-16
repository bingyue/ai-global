import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { ListingHero } from "@/components/content/listing-hero";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("提交内容或工具","向AI Global提交原创文章、工具、案例、活动或资讯线索。","/submit");
export default function SubmitPage(){return <><ListingHero eyebrow="Contribute" title="提交内容、工具或案例" description="欢迎原创实践、工具信息、企业案例、活动与资讯线索。提交不代表自动发布，编辑团队会审核事实、版权、商业关系与内容价值。"/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><h2 className="font-display text-3xl font-semibold">提交原则</h2><ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--muted)]"><li>内容必须原创或拥有明确授权</li><li>引用数据与观点需提供来源</li><li>商业合作、联盟关系和利益关系需披露</li><li>案例不得虚构客户、Logo或业务数据</li><li>工具价格与功能以官网为准</li></ul></div><div className="rounded-[28px] border border-[var(--line)] bg-white p-7"><ApplicationForm kind="content" typeOptions={["原创文章","资讯线索","AI工具","企业案例","行业报告","活动与课程","信息更正"]} submitLabel="提交审核"/></div></div></section></>}
