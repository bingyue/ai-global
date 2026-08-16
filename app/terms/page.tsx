import type { Metadata } from "next";
import { ListingHero } from "@/components/content/listing-hero";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("使用条款","AI Global网站与社区使用条款。","/terms");
export default function TermsPage(){return <><ListingHero eyebrow="Legal" title="使用条款" description="适用于AI Global网站内容、社区、报告、活动和企业需求服务。更新于2026年8月4日。"/><article className="container-reading prose-global py-16"><h2>内容与信息</h2><p>本站内容用于一般行业信息和教育目的，不构成法律、税务、投资或确定的商业结果承诺。涉及第三方平台、价格和规则时，请以官方最新信息为准。</p><h2>知识产权</h2><p>AI Global原创内容的版权归相应权利人所有。合理引用应注明来源并链接原文。第三方商标和产品名称属于各自权利人。</p><h2>社区行为</h2><p>用户不得发布违法、侵权、虚假、骚扰、恶意推广或侵犯隐私的内容。平台可对内容进行审核、屏蔽或删除，并对违规账户采取限制措施。</p><h2>企业服务</h2><p>具体服务范围、费用、里程碑、知识产权和数据责任以双方正式协议为准。网站不承诺确定排名、ROI或不合理增长结果。</p><h2>变更与联系</h2><p>条款可能随服务发展更新，重要变化将在网站说明。对条款有疑问，可通过联系我们页面联系。</p></article></>}
