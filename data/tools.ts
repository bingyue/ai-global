import type { ToolItem } from "@/types";

export const toolCategories = [
  { name: "AI建站", slug: "ai-website" },
  { name: "商品图片", slug: "product-images" },
  { name: "广告素材", slug: "ad-creative" },
  { name: "内容生成", slug: "content" },
  { name: "视频生成", slug: "video" },
  { name: "SEO/GEO", slug: "seo-geo" },
  { name: "社媒运营", slug: "social" },
  { name: "数据分析", slug: "analytics" },
  { name: "客服", slug: "customer-service" },
  { name: "自动化", slug: "automation" },
  { name: "市场调研", slug: "research" },
  { name: "多语言翻译", slug: "translation" },
] as const;

export const tools: ToolItem[] = [
  { slug: "shopify", name: "Shopify", description: "面向全球电商的独立站与商业平台。", category: "AI建站", categorySlug: "ai-website", scenarios: ["DTC独立站", "跨境零售"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.shopify.com", editorPick: true },
  { slug: "webflow", name: "Webflow", description: "可视化网站构建与CMS平台，适合品牌和营销网站。", category: "AI建站", categorySlug: "ai-website", scenarios: ["品牌官网", "营销站"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://webflow.com" },
  { slug: "framer", name: "Framer", description: "面向设计与营销团队的可视化网站制作工具。", category: "AI建站", categorySlug: "ai-website", scenarios: ["产品官网", "落地页"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://www.framer.com" },
  { slug: "photoroom", name: "Photoroom", description: "用于商品图抠图、场景生成与批量编辑的视觉工具。", category: "商品图片", categorySlug: "product-images", scenarios: ["商品主图", "批量修图"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.photoroom.com", editorPick: true },
  { slug: "adobe-firefly", name: "Adobe Firefly", description: "Adobe提供的生成式创意与图像编辑能力。", category: "广告素材", categorySlug: "ad-creative", scenarios: ["图像生成", "创意编辑"], pricing: "免费增值", chineseSupport: "支持", url: "https://firefly.adobe.com" },
  { slug: "canva", name: "Canva", description: "覆盖社媒、广告、演示与品牌资产的在线设计平台。", category: "广告素材", categorySlug: "ad-creative", scenarios: ["社媒素材", "广告版式"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.canva.com" },
  { slug: "chatgpt", name: "ChatGPT", description: "适合研究、内容协作、分析和工作流辅助的通用AI助手。", category: "内容生成", categorySlug: "content", scenarios: ["内容策划", "研究辅助"], pricing: "免费增值", chineseSupport: "支持", url: "https://chatgpt.com", editorPick: true },
  { slug: "claude", name: "Claude", description: "Anthropic提供的AI助手，适合长文档分析与内容协作。", category: "内容生成", categorySlug: "content", scenarios: ["文档分析", "内容协作"], pricing: "免费增值", chineseSupport: "支持", url: "https://claude.ai" },
  { slug: "descript", name: "Descript", description: "基于文本编辑音视频的内容制作平台。", category: "视频生成", categorySlug: "video", scenarios: ["播客剪辑", "视频编辑"], pricing: "免费增值", chineseSupport: "未注明", url: "https://www.descript.com" },
  { slug: "runway", name: "Runway", description: "面向创意团队的AI视频生成与编辑平台。", category: "视频生成", categorySlug: "video", scenarios: ["视频生成", "镜头编辑"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://runwayml.com" },
  { slug: "ahrefs", name: "Ahrefs", description: "用于关键词、竞争内容、外链与网站健康度研究的SEO平台。", category: "SEO/GEO", categorySlug: "seo-geo", scenarios: ["关键词研究", "外链分析"], pricing: "付费", chineseSupport: "未注明", url: "https://ahrefs.com", editorPick: true },
  { slug: "semrush", name: "Semrush", description: "覆盖SEO、内容、竞争与数字营销研究的平台。", category: "SEO/GEO", categorySlug: "seo-geo", scenarios: ["竞争分析", "SEO监测"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.semrush.com" },
  { slug: "buffer", name: "Buffer", description: "用于多平台社媒内容计划、发布与基础分析的工具。", category: "社媒运营", categorySlug: "social", scenarios: ["内容排期", "多平台发布"], pricing: "免费增值", chineseSupport: "未注明", url: "https://buffer.com" },
  { slug: "hootsuite", name: "Hootsuite", description: "社媒发布、互动、监听与团队协作平台。", category: "社媒运营", categorySlug: "social", scenarios: ["社媒管理", "品牌监听"], pricing: "付费", chineseSupport: "未注明", url: "https://www.hootsuite.com" },
  { slug: "google-analytics", name: "Google Analytics", description: "用于分析网站与应用用户行为和转化的产品。", category: "数据分析", categorySlug: "analytics", scenarios: ["网站分析", "转化监测"], pricing: "免费", chineseSupport: "支持", url: "https://analytics.google.com" },
  { slug: "posthog", name: "PostHog", description: "覆盖产品分析、会话回放、实验与数据管道的平台。", category: "数据分析", categorySlug: "analytics", scenarios: ["产品分析", "实验"], pricing: "免费增值", chineseSupport: "未注明", url: "https://posthog.com" },
  { slug: "intercom", name: "Intercom", description: "面向互联网业务的客户支持、消息与AI客服平台。", category: "客服", categorySlug: "customer-service", scenarios: ["在线客服", "帮助中心"], pricing: "付费", chineseSupport: "部分支持", url: "https://www.intercom.com" },
  { slug: "zapier", name: "Zapier", description: "连接不同SaaS工具并构建自动化工作流的平台。", category: "自动化", categorySlug: "automation", scenarios: ["应用连接", "流程自动化"], pricing: "免费增值", chineseSupport: "未注明", url: "https://zapier.com", editorPick: true },
  { slug: "similarweb", name: "Similarweb", description: "用于网站流量、渠道与市场竞争研究的数字数据平台。", category: "市场调研", categorySlug: "research", scenarios: ["市场研究", "竞品流量"], pricing: "免费增值", chineseSupport: "部分支持", url: "https://www.similarweb.com" },
  { slug: "deepl", name: "DeepL", description: "面向个人与企业的机器翻译和写作辅助工具。", category: "多语言翻译", categorySlug: "translation", scenarios: ["文档翻译", "本地化初稿"], pricing: "免费增值", chineseSupport: "支持", url: "https://www.deepl.com", editorPick: true },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
