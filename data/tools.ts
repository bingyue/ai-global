import type { ToolItem } from "@/types";

export const toolCategories = [
  { name: "独立站建站", slug: "ai-website" },
  { name: "商品视觉", slug: "product-images" },
  { name: "广告素材", slug: "ad-creative" },
  { name: "商品内容", slug: "content" },
  { name: "商品视频", slug: "video" },
  { name: "SEO/GEO", slug: "seo-geo" },
  { name: "海外内容", slug: "social" },
  { name: "电商分析", slug: "analytics" },
  { name: "智能客服", slug: "customer-service" },
  { name: "电商自动化", slug: "automation" },
  { name: "选品与市场", slug: "research" },
  { name: "商品本地化", slug: "translation" },
] as const;

export const tools: ToolItem[] = [
  { slug: "shopify", name: "Shopify", description: "面向全球电商的独立站与商业平台。", category: "独立站建站", categorySlug: "ai-website", scenarios: ["DTC独立站", "跨境零售"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.shopify.com", editorPick: true },
  { slug: "webflow", name: "Webflow", description: "可视化网站构建与CMS平台，可用于跨境品牌内容站和活动落地页。", category: "独立站建站", categorySlug: "ai-website", scenarios: ["品牌内容站", "营销落地页"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://webflow.com" },
  { slug: "framer", name: "Framer", description: "适合快速制作跨境新品落地页和营销页面的可视化工具。", category: "独立站建站", categorySlug: "ai-website", scenarios: ["新品落地页", "活动页面"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://www.framer.com" },
  { slug: "photoroom", name: "Photoroom", description: "用于商品图抠图、场景生成与批量编辑的视觉工具。", category: "商品视觉", categorySlug: "product-images", scenarios: ["商品主图", "批量修图"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.photoroom.com", editorPick: true },
  { slug: "adobe-firefly", name: "Adobe Firefly", description: "Adobe提供的生成式创意与图像编辑能力。", category: "广告素材", categorySlug: "ad-creative", scenarios: ["图像生成", "创意编辑"], pricing: "免费增值", chineseSupport: "支持", url: "https://firefly.adobe.com" },
  { slug: "canva", name: "Canva", description: "覆盖社媒、广告、演示与品牌资产的在线设计平台。", category: "广告素材", categorySlug: "ad-creative", scenarios: ["社媒素材", "广告版式"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.canva.com" },
  { slug: "chatgpt", name: "ChatGPT", description: "可辅助跨境市场研究、商品内容、客服知识和经营分析的通用AI助手。", category: "商品内容", categorySlug: "content", scenarios: ["商品内容", "研究辅助"], pricing: "免费增值", chineseSupport: "支持", url: "https://chatgpt.com", editorPick: true },
  { slug: "claude", name: "Claude", description: "适合分析商品资料、评论、研究文档并协作生成长内容的AI助手。", category: "商品内容", categorySlug: "content", scenarios: ["评论分析", "内容协作"], pricing: "免费增值", chineseSupport: "支持", url: "https://claude.ai" },
  { slug: "descript", name: "Descript", description: "基于文本编辑音视频，可用于商品讲解、访谈与营销视频制作。", category: "商品视频", categorySlug: "video", scenarios: ["商品讲解", "视频编辑"], pricing: "免费增值", chineseSupport: "未注明", url: "https://www.descript.com" },
  { slug: "runway", name: "Runway", description: "面向跨境创意团队的AI视频生成与编辑平台。", category: "商品视频", categorySlug: "video", scenarios: ["素材变体", "镜头编辑"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://runwayml.com" },
  { slug: "ahrefs", name: "Ahrefs", description: "用于关键词、竞争内容、外链与网站健康度研究的SEO平台。", category: "SEO/GEO", categorySlug: "seo-geo", scenarios: ["关键词研究", "外链分析"], pricing: "付费", chineseSupport: "未注明", url: "https://ahrefs.com", editorPick: true },
  { slug: "semrush", name: "Semrush", description: "覆盖SEO、内容、竞争与数字营销研究的平台。", category: "SEO/GEO", categorySlug: "seo-geo", scenarios: ["竞争分析", "SEO监测"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.semrush.com" },
  { slug: "buffer", name: "Buffer", description: "用于跨境品牌多平台内容计划、发布与基础分析的工具。", category: "海外内容", categorySlug: "social", scenarios: ["内容排期", "多平台发布"], pricing: "免费增值", chineseSupport: "未注明", url: "https://buffer.com" },
  { slug: "hootsuite", name: "Hootsuite", description: "海外社媒发布、互动、监听与团队协作平台。", category: "海外内容", categorySlug: "social", scenarios: ["社媒管理", "品牌监听"], pricing: "付费", chineseSupport: "未注明", url: "https://www.hootsuite.com" },
  { slug: "google-analytics", name: "Google Analytics", description: "用于分析跨境独立站用户行为、渠道与购买转化。", category: "电商分析", categorySlug: "analytics", scenarios: ["站点分析", "购买转化"], pricing: "免费", chineseSupport: "支持", url: "https://analytics.google.com" },
  { slug: "posthog", name: "PostHog", description: "覆盖会话回放、漏斗、实验与数据管道，可辅助独立站体验分析。", category: "电商分析", categorySlug: "analytics", scenarios: ["会话回放", "转化实验"], pricing: "免费增值", chineseSupport: "未注明", url: "https://posthog.com" },
  { slug: "intercom", name: "Intercom", description: "面向在线业务的客户支持、消息、帮助中心与AI客服平台。", category: "智能客服", categorySlug: "customer-service", scenarios: ["售前客服", "帮助中心"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.intercom.com" },
  { slug: "zapier", name: "Zapier", description: "连接店铺、表单、CRM、邮件和表格，构建跨境电商自动化工作流。", category: "电商自动化", categorySlug: "automation", scenarios: ["店铺连接", "流程自动化"], pricing: "免费增值", chineseSupport: "未注明", url: "https://zapier.com", editorPick: true },
  { slug: "similarweb", name: "Similarweb", description: "用于跨境市场、竞品网站流量与渠道结构研究的数据平台。", category: "选品与市场", categorySlug: "research", scenarios: ["市场研究", "竞品流量"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://www.similarweb.com" },
  { slug: "deepl", name: "DeepL", description: "可用于跨境商品文档、客服内容与营销文案的本地化初稿。", category: "商品本地化", categorySlug: "translation", scenarios: ["商品翻译", "本地化初稿"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.deepl.com", editorPick: true },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
