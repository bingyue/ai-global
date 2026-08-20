import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { ListingHero } from "@/components/content/listing-hero";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("申请加入社群","申请加入AI Global Club AI电商出海实践者社区。","/community/apply");
export default function ApplyPage(){return <><ListingHero eyebrow="Community Application" title="加入AI电商出海实践者社区" description="请说明你的跨境电商背景、关注方向以及希望交流或贡献的内容。新用户申请和内容默认进入基础审核。"/><section className="section-pad bg-[var(--paper)]"><div className="container-reading rounded-[28px] border border-[var(--line)] bg-white p-6 md:p-10"><ApplicationForm kind="community" typeOptions={["跨境卖家","出海品牌","独立站团队","电商与营销从业者","电商服务商","AI工具团队","供应链与平台招商"]} submitLabel="提交加入申请"/></div></section></>}
