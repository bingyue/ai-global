import type { KnowledgeItem } from "@/types";

export const knowledgeCategories = [
  { name: "AI电商", slug: "ai-commerce", count: 58, updated: "本周", path: "AI电商入门路径", topics: ["AI选品", "商品内容", "智能客服", "营销自动化"] },
  { name: "AI建站与独立站", slug: "ai-websites", count: 46, updated: "3天前", path: "独立站增长路径", topics: ["Shopify", "品牌官网", "转化率", "邮件营销"] },
  { name: "AI广告投放", slug: "ai-advertising", count: 39, updated: "今天", path: "AI广告实战路径", topics: ["Google Ads", "Meta Ads", "素材测试", "归因"] },
  { name: "SEO与GEO", slug: "seo-geo", count: 51, updated: "昨天", path: "搜索增长路径", topics: ["技术SEO", "内容集群", "AI搜索", "品牌引用"] },
  { name: "海外社媒", slug: "social-media", count: 44, updated: "本周", path: "海外内容路径", topics: ["LinkedIn", "X", "YouTube", "Reddit"] },
  { name: "AI产品出海", slug: "ai-product-global", count: 37, updated: "2天前", path: "全球发布路径", topics: ["产品定位", "英文官网", "Product Hunt", "海外支付"] },
  { name: "品牌全球化", slug: "global-brand", count: 32, updated: "本周", path: "全球品牌路径", topics: ["品牌定位", "本地化", "海外达人", "创始人IP"] },
  { name: "企业AI落地", slug: "enterprise-ai", count: 29, updated: "4天前", path: "企业AI落地路径", topics: ["数字员工", "企业知识库", "工作流", "团队培训"] },
] as const;

type Seed = [string, string, string, string, string, string, string, KnowledgeItem["level"], ContentAccessSeed?];
type ContentAccessSeed = KnowledgeItem["access"];

const seeds: Seed[] = [
  ["ai-commerce-foundations", "AI电商是什么：能力边界与落地地图", "理解AI在商品、内容、营销、客服和经营决策中的真实作用。", "AI电商", "ai-commerce", "基础概念", "foundations", "入门"],
  ["ai-product-research-workflow", "AI辅助选品：从信号收集到人工判断", "建立可追溯的选品信号与决策清单，避免把生成结果当作市场事实。", "AI电商", "ai-commerce", "AI选品", "product-research", "实战"],
  ["product-content-system", "多市场商品内容系统搭建指南", "统一商品事实、市场表达和渠道格式，降低内容生产成本。", "AI电商", "ai-commerce", "商品内容", "product-content", "进阶"],
  ["ai-customer-service-playbook", "跨境智能客服落地清单", "从知识边界、转人工与质量监控开始设计安全可用的智能客服。", "AI电商", "ai-commerce", "智能客服", "customer-service", "实战", "member"],
  ["global-website-information-architecture", "全球官网信息架构：让不同访客快速找到答案", "按用户任务组织页面、证据与行动入口。", "AI建站与独立站", "ai-websites", "品牌官网", "website-ia", "进阶"],
  ["shopify-ai-operations", "Shopify商家可落地的AI运营场景", "梳理商品、客服、邮件和分析场景中的可行自动化。", "AI建站与独立站", "ai-websites", "Shopify", "shopify", "入门"],
  ["landing-page-conversion-checklist", "海外广告落地页转化检查清单", "从信息匹配、证据、表单到移动端速度逐项检查。", "AI建站与独立站", "ai-websites", "转化率", "cro", "实战"],
  ["global-payment-basics", "独立站海外支付的基础决策框架", "理解市场覆盖、拒付、税务和结算对支付方案的影响。", "AI建站与独立站", "ai-websites", "支付", "payments", "入门", "member"],
  ["ai-ad-creative-testing", "AI广告素材测试：变量、标签与复盘", "用明确假设组织素材变体，而不是无目的批量生成。", "AI广告投放", "ai-advertising", "素材测试", "creative-testing", "实战"],
  ["google-ads-account-audit", "Google Ads账户诊断框架", "检查转化、结构、搜索词、预算和落地页的系统方法。", "AI广告投放", "ai-advertising", "Google Ads", "google-ads", "进阶", "member"],
  ["meta-ads-creative-system", "Meta Ads创意生产与学习系统", "建立从洞察、脚本、变体到疲劳监测的创意循环。", "AI广告投放", "ai-advertising", "Meta Ads", "meta-ads", "实战"],
  ["attribution-data-quality", "广告归因前的数据质量检查", "识别事件重复、窗口差异与渠道命名问题。", "AI广告投放", "ai-advertising", "归因分析", "attribution", "入门"],
  ["technical-seo-global-sites", "多语言网站技术SEO基础", "正确处理语言版本、Canonical、站点地图与抓取边界。", "SEO与GEO", "seo-geo", "技术SEO", "technical-seo", "进阶"],
  ["geo-foundations", "GEO基础：如何让品牌进入AI答案", "从实体、内容、证据和外部信号理解AI搜索可见度。", "SEO与GEO", "seo-geo", "AI搜索优化", "geo", "入门"],
  ["content-cluster-playbook", "支柱页与内容集群实战方法", "围绕一组用户问题建设可以持续扩展的搜索资产。", "SEO与GEO", "seo-geo", "内容集群", "content-clusters", "实战"],
  ["brand-citation-audit", "品牌引用与第三方提及审计", "评估品牌在行业媒体、目录、社区和知识来源中的可信信号。", "SEO与GEO", "seo-geo", "品牌引用", "citations", "进阶", "paid_member"],
  ["linkedin-b2b-playbook", "LinkedIn B2B内容运营手册", "用专家观点、客户问题和产品证据建立稳定栏目。", "海外社媒", "social-media", "LinkedIn", "linkedin", "实战"],
  ["reddit-entry-guide", "品牌参与Reddit的入门指南", "理解社区规则、贡献节奏与商业表达边界。", "海外社媒", "social-media", "Reddit", "reddit", "入门"],
  ["youtube-content-engine", "YouTube内容引擎：从主题到复用", "以长期问题库组织视频，并分发为多种内容资产。", "海外社媒", "social-media", "YouTube", "youtube", "进阶"],
  ["global-social-calendar", "海外社媒内容日历模板", "把市场事件、内容支柱和生产资源放进一个可执行节奏。", "海外社媒", "social-media", "内容日历", "calendar", "实战", "member"],
  ["ai-product-positioning", "AI产品英文定位的五个关键问题", "从目标任务、替代方案、差异与证据形成可验证定位。", "AI产品出海", "ai-product-global", "产品定位", "positioning", "入门"],
  ["product-hunt-launch", "Product Hunt发布全流程", "从预热资产、发布日节奏到用户承接的完整清单。", "AI产品出海", "ai-product-global", "Product Hunt", "product-hunt", "实战", "member"],
  ["saas-global-pricing", "SaaS全球定价研究方法", "结合价值指标、竞争参照、支付意愿和采购流程。", "AI产品出海", "ai-product-global", "海外定价", "pricing", "进阶"],
  ["developer-community-cold-start", "开发者社区冷启动方法", "通过真实用例、开放反馈与种子关系获得第一批用户。", "AI产品出海", "ai-product-global", "社区冷启动", "community", "实战"],
  ["global-brand-positioning", "中国品牌全球定位工作坊指南", "把企业优势翻译成目标市场能够理解和验证的价值。", "品牌全球化", "global-brand", "品牌定位", "brand-positioning", "进阶"],
  ["localization-quality-framework", "多语言内容本地化质量框架", "从事实准确、语境自然、品牌一致和合规四个层面审校。", "品牌全球化", "global-brand", "本地化", "localization", "实战"],
  ["founder-global-ip", "创始人海外IP的内容支柱设计", "建立专业、可信且可长期生产的观点体系。", "品牌全球化", "global-brand", "创始人IP", "founder-ip", "进阶"],
  ["enterprise-ai-opportunity-map", "企业AI机会地图：如何选择第一个项目", "用价值、可行性、风险和数据条件筛选试点场景。", "企业AI落地", "enterprise-ai", "AI规划", "ai-planning", "入门"],
  ["digital-worker-governance", "营销数字员工的治理与人工审核", "明确输入、权限、质量标准、异常处理和责任边界。", "企业AI落地", "enterprise-ai", "数字员工", "digital-worker", "进阶", "paid_member"],
  ["enterprise-knowledge-base", "企业知识库从文档整理到可用问答", "建立来源、版本、权限和反馈闭环，提升知识可信度。", "企业AI落地", "enterprise-ai", "企业知识库", "knowledge-base", "实战", "member"],
];

export const knowledge: KnowledgeItem[] = seeds.map(([slug, title, description, category, categorySlug, topic, topicSlug, level, access = "public"], index) => ({
  slug, title, description, category, categorySlug, topic, topicSlug, level, access,
  updatedAt: new Date(Date.UTC(2026, 7, Math.max(1, 4 - (index % 12)))).toISOString().slice(0, 10),
  readingTime: 6 + (index % 8),
  audience: category.includes("企业") ? ["企业管理者", "业务负责人", "AI项目团队"] : ["出海负责人", "增长与内容团队", "创业者"],
  takeaways: [
    `用清晰边界理解${topic}，避免从工具出发。`,
    "以可验证的问题、数据和业务结果确定优先级。",
    "建立可复用流程，并保留人工判断与持续复盘。",
  ],
}));

export const getKnowledgeItem = (slug: string) => knowledge.find((item) => item.slug === slug);
