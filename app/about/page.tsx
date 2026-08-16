import type { Metadata } from "next";
import { Globe2, Target, UsersRound } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("关于AI Global", siteConfig.mission, "/about");

const pillars = [
  { icon: Globe2, title: "行业门户", text: "追踪影响全球业务的AI、电商与平台变化。" },
  { icon: Target, title: "知识与实践", text: "把工具、方法、案例和学习路径连接起来。" },
  { icon: UsersRound, title: "商业服务", text: "由AI Global统一提供、组织或交付企业增长项目。" },
];

export default function AboutPage() {
  return <>
    <ListingHero eyebrow="About AI Global" title="连接AI能力与全球商业机会" description="AI Global｜AI出海研究院，是面向中国企业、品牌、跨境商家、AI创业者和出海从业者的垂直行业平台。" />
    <section className="section-pad bg-white"><div className="container-main grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-[10px] font-bold text-[var(--brand-dark)]">OUR MISSION</p><h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-.04em]">{siteConfig.mission}</h2></div><div className="grid gap-4 md:grid-cols-3">{pillars.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--paper)] p-6"><Icon className="size-5 text-[var(--brand-dark)]" /><h3 className="mt-7 font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p></div>; })}</div></div></section>
    <section className="section-pad bg-[var(--paper)]"><div className="container-reading prose-global"><h2>我们做什么</h2><p>AI Global同时建设资讯门户、知识库、工具导航、案例与报告、行业社区、活动课程和企业服务。内容帮助行业建立共同语言，社区连接真实实践者，企业服务把AI能力转化为可以运营的全球增长系统。</p><h2>独立品牌与交付原则</h2><p>AI Global是独立运营的品牌和业务入口。AI建站、广告投放、SEO/GEO、出海营销、企业培训和数字员工等业务均由AI Global对外统一提供、组织或交付。需要外部能力时，统一由AI Global专业交付团队与认证生态合作伙伴协同。</p><h2>编辑与研究原则</h2><ul><li>区分事实、观点、示范方案与商业合作。</li><li>保留信息来源、作者、更新时间和适用边界。</li><li>不全文搬运外部文章，不虚构评分、客户和业务数据。</li><li>对内容错误、版权与来源方诉求建立更正和删除渠道。</li></ul><h2>组织实体信息</h2><p>品牌：AI Global；中文定位：AI出海研究院；官方网站：{siteConfig.domain}；使命：{siteConfig.mission}</p><ButtonLink href="/contact">联系AI Global</ButtonLink></div></section>
  </>;
}
