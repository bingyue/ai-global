import type { KnowledgeItem } from "@/types";

export const knowledgeCategories = [
  { name: "AI电商趋势与战略", slug: "ai-commerce", count: 42, updated: "本周", path: "AI电商决策路径", topics: ["AI购物", "市场验证", "渠道策略", "增长诊断"] },
  { name: "AI选品与商品内容", slug: "product-growth", count: 48, updated: "今天", path: "商品增长路径", topics: ["AI选品", "Listing", "商品图片", "本地化"] },
  { name: "独立站与转化", slug: "independent-sites", count: 46, updated: "3天前", path: "独立站增长路径", topics: ["Shopify", "商品页", "CRO", "支付"] },
  { name: "AI广告与创意", slug: "ai-advertising", count: 39, updated: "今天", path: "广告增长路径", topics: ["Google Ads", "Meta Ads", "TikTok Ads", "素材测试"] },
  { name: "海外内容与SEO/GEO", slug: "seo-geo", count: 51, updated: "昨天", path: "搜索内容路径", topics: ["技术SEO", "内容集群", "AI搜索", "海外内容"] },
  { name: "智能客服与自动化", slug: "commerce-automation", count: 35, updated: "本周", path: "电商自动化路径", topics: ["智能客服", "商品知识库", "邮件自动化", "经营分析"] },
] as const;

type ContentAccessSeed = KnowledgeItem["access"];
type Seed = [string, string, string, string, string, string, string, KnowledgeItem["level"], ContentAccessSeed?];

const seeds: Seed[] = [
  ["ai-commerce-foundations", "AI电商是什么：从工具清单到经营能力地图", "理解AI在选品、商品、内容、投放、客服和经营决策中的真实边界。", "AI电商趋势与战略", "ai-commerce", "基础概念", "foundations", "入门"],
  ["ai-shopping-agents-commerce", "AI购物助手如何改变商品发现与比较", "分析对话式购物入口对商品数据、品牌证据和内容结构的新要求。", "AI电商趋势与战略", "ai-commerce", "AI购物", "shopping-agents", "进阶"],
  ["global-market-product-validation", "跨境新品进入市场前的验证框架", "用需求、竞争、渠道、价格和履约条件筛选值得测试的市场。", "AI电商趋势与战略", "ai-commerce", "市场验证", "market-validation", "实战", "member"],
  ["cross-border-channel-mix", "Amazon、TikTok Shop与独立站如何分工", "根据商品、团队和增长阶段设计平台与自有渠道组合。", "AI电商趋势与战略", "ai-commerce", "渠道策略", "channel-strategy", "进阶"],
  ["ai-product-research-workflow", "AI辅助选品：从信号收集到人工判断", "建立可追溯的选品信号与决策清单，避免把生成结果当作市场事实。", "AI选品与商品内容", "product-growth", "AI选品", "product-research", "实战"],
  ["product-content-system", "多市场商品内容系统搭建指南", "统一商品事实、市场表达和渠道格式，降低内容生产与审校成本。", "AI选品与商品内容", "product-growth", "商品内容", "product-content", "进阶"],
  ["multilingual-product-content", "跨境商品内容本地化质量框架", "从事实准确、语境自然、平台规范和合规四个层面审校。", "AI选品与商品内容", "product-growth", "多语言", "localization", "实战"],
  ["product-creative-workflow", "AI商品图与短视频的可控生产流程", "从卖点、场景、素材来源到人工抽检建立视觉内容工作流。", "AI选品与商品内容", "product-growth", "商品视觉", "product-creative", "实战", "member"],
  ["global-website-information-architecture", "跨境独立站信息架构：让访客快速找到答案", "按购物任务组织品类、商品、证据、服务和行动入口。", "独立站与转化", "independent-sites", "站点架构", "website-ia", "进阶"],
  ["shopify-ai-operations", "Shopify商家可落地的AI运营场景", "梳理商品、客服、邮件和分析场景中的可行自动化。", "独立站与转化", "independent-sites", "Shopify", "shopify", "入门"],
  ["landing-page-conversion-checklist", "跨境广告落地页转化检查清单", "从信息匹配、商品证据、配送、表单到移动端速度逐项检查。", "独立站与转化", "independent-sites", "转化率", "cro", "实战"],
  ["global-payment-basics", "独立站海外支付的基础决策框架", "理解市场覆盖、拒付、税务和结算对支付方案的影响。", "独立站与转化", "independent-sites", "支付", "payments", "入门", "member"],
  ["ai-ad-creative-testing", "AI广告素材测试：变量、标签与复盘", "用明确假设组织素材变体，而不是无目的批量生成。", "AI广告与创意", "ai-advertising", "素材测试", "creative-testing", "实战"],
  ["google-ads-account-audit", "跨境电商Google Ads账户诊断框架", "检查转化、结构、搜索词、预算、购物广告和落地页。", "AI广告与创意", "ai-advertising", "Google Ads", "google-ads", "进阶", "member"],
  ["meta-ads-creative-system", "Meta Ads电商创意生产与学习系统", "建立从洞察、脚本、变体到素材疲劳监测的循环。", "AI广告与创意", "ai-advertising", "Meta Ads", "meta-ads", "实战"],
  ["attribution-data-quality", "广告归因优化前的数据质量检查", "识别像素、事件重复、窗口差异与渠道命名问题。", "AI广告与创意", "ai-advertising", "归因分析", "attribution", "入门"],
  ["technical-seo-global-sites", "跨境多语言网站技术SEO基础", "正确处理语言版本、Canonical、站点地图与抓取边界。", "海外内容与SEO/GEO", "seo-geo", "技术SEO", "technical-seo", "进阶"],
  ["geo-foundations", "跨境电商GEO基础：让商品进入AI答案", "从商品数据、品牌实体、内容证据和外部信号理解AI搜索可见度。", "海外内容与SEO/GEO", "seo-geo", "AI搜索", "geo", "入门"],
  ["content-cluster-playbook", "跨境品类页与内容集群实战方法", "围绕购买问题建设可以持续扩展的搜索内容资产。", "海外内容与SEO/GEO", "seo-geo", "内容集群", "content-clusters", "实战"],
  ["overseas-content-system", "跨境品牌海外内容支柱设计", "围绕商品场景、用户问题、证据和品牌观点建立稳定栏目。", "海外内容与SEO/GEO", "seo-geo", "海外内容", "overseas-content", "进阶", "paid_member"],
  ["commerce-automation-opportunity-map", "AI电商自动化机会地图：如何选择第一个流程", "用价值、频率、可行性、风险和数据条件筛选试点场景。", "智能客服与自动化", "commerce-automation", "自动化规划", "automation-planning", "入门"],
  ["digital-worker-governance", "电商数字员工的治理与人工审核", "明确输入、权限、质量标准、异常处理和责任边界。", "智能客服与自动化", "commerce-automation", "流程治理", "workflow-governance", "进阶", "paid_member"],
  ["product-knowledge-base", "商品知识库：从分散资料到可用客服答案", "建立商品事实、版本、来源、权限和反馈闭环。", "智能客服与自动化", "commerce-automation", "商品知识库", "product-knowledge", "实战", "member"],
  ["lifecycle-marketing-automation", "跨境电商邮件与用户生命周期自动化", "围绕欢迎、弃购、购后、复购和召回设计可衡量流程。", "智能客服与自动化", "commerce-automation", "营销自动化", "lifecycle-marketing", "实战"],
];

export const knowledge: KnowledgeItem[] = seeds.map(([slug, title, description, category, categorySlug, topic, topicSlug, level, access = "public"], index) => ({
  slug,
  title,
  description,
  category,
  categorySlug,
  topic,
  topicSlug,
  level,
  access,
  updatedAt: new Date(Date.UTC(2026, 7, Math.max(1, 20 - (index % 12)))).toISOString().slice(0, 10),
  readingTime: 6 + (index % 8),
  audience: ["跨境卖家", "出海品牌", "电商运营与增长团队"],
  takeaways: [
    `用清晰边界理解${topic}，避免从工具出发。`,
    "以可验证的问题、数据和经营结果确定优先级。",
    "建立可复用流程，并保留人工判断与持续复盘。",
  ],
}));

export const getKnowledgeItem = (slug: string) => knowledge.find((item) => item.slug === slug);
