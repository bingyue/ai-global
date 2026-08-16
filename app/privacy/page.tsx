import type { Metadata } from "next";
import { ListingHero } from "@/components/content/listing-hero";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("隐私政策","AI Global隐私政策。","/privacy");
export default function PrivacyPage(){return <><ListingHero eyebrow="Legal" title="隐私政策" description="说明AI Global如何收集、使用、保存和保护你在网站提交的信息。更新于2026年8月4日。"/><article className="container-reading prose-global py-16"><h2>我们收集的信息</h2><p>当你订阅邮件、下载报告、报名活动、注册会员或提交企业需求时，我们可能收集姓名、公司、职位、联系方式、关注方向和你主动提供的需求描述。网站还可能收集必要的访问日志与匿名分析数据。</p><h2>使用目的</h2><p>信息用于提供所请求的内容或服务、审核社区内容、回复业务需求、改进网站体验和发送你已同意接收的行业更新。我们不会出售个人联系信息。</p><h2>第三方服务</h2><p>网站可选使用Supabase、Vercel、邮件与分析服务。只有在配置相应环境变量后才启用。第三方将根据其条款处理必要数据。</p><h2>你的权利</h2><p>你可以申请访问、更正或删除个人资料，也可以随时取消邮件订阅。请通过联系我们页面提交请求。</p><h2>安全与保留</h2><p>我们采用合理的访问控制和最小化原则。仅在实现上述目的或满足法律义务所需期间保留信息。请勿通过公开表单提交密码、支付信息或高度敏感资料。</p></article></>}
