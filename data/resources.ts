import type { CommunityTopic, CourseItem, EventItem, ReportItem } from "@/types";

export const reports: ReportItem[] = [
  { slug: "ai-commerce-global-trends-2027", title: "2027 AI电商出海趋势报告", summary: "从AI购物入口、商品内容、跨境平台、流量与运营自动化梳理下一阶段关键变化。", publishedAt: "2026-09-18", pages: null, status: "即将发布", number: "R01" },
  { slug: "ai-website-growth-guide", title: "AI独立站建设与增长指南", summary: "用商品、内容、体验、搜索与数据的统一框架建设跨境独立站。", publishedAt: "2026-08-01", pages: 48, status: "可下载", number: "R02" },
  { slug: "ai-ad-creative-practice", title: "AI广告素材与投放实践报告", summary: "聚焦素材变量体系、人机协作、实验设计与数据复盘。", publishedAt: "2026-07-16", pages: 56, status: "可下载", number: "R03" },
  { slug: "geo-ai-search-guide", title: "跨境电商GEO与AI搜索指南", summary: "解释商品数据、品牌实体、可引用内容、结构化数据和外部权威信号。", publishedAt: "2026-06-28", pages: 42, status: "可下载", number: "R04" },
];

export const events: EventItem[] = [
  { slug: "ai-global-open-class", title: "公开课｜AI搜索时代的跨境商品内容系统", type: "线上公开课", date: "2026-08-20T20:00:00+08:00", location: "线上直播", speaker: "AI Global研究团队", price: "免费", capacity: "300人", status: "报名中", description: "从商品数据、用户问题与品牌证据出发，理解跨境SEO与GEO的协同方法。" },
  { slug: "shanghai-ai-commerce-meetup", title: "上海Meetup｜AI电商增长实践夜", type: "城市Meetup", date: "2026-09-12T14:00:00+08:00", location: "上海 · 场地确认后通知", speaker: "跨境卖家、出海品牌与电商服务者", price: "审核制免费", capacity: "80人", status: "报名中", description: "小规模线下交流，分享商品、投放、独立站与自动化的真实工作流。" },
  { slug: "global-launch-workshop", title: "训练营｜跨境新品内容与投放四周实战", type: "线上训练营", date: "2026-10-10T10:00:00+08:00", location: "线上协作", speaker: "AI Global专业交付团队", price: "价格待公布", capacity: "30个项目", status: "即将开放", description: "围绕市场验证、商品内容、素材测试、落地页与数据复盘，完成一套可执行新品启动资产。" },
  { slug: "shenzhen-brand-global-salon", title: "深圳沙龙｜从跨境卖货到长期品牌经营", type: "行业沙龙", date: "2026-07-18T14:00:00+08:00", location: "深圳", speaker: "跨境品牌与增长负责人", price: "免费", capacity: "60人", status: "已结束", description: "围绕商品价值、本地化内容、平台与独立站协同分享一线经验。" },
];

export const communityTopics: CommunityTopic[] = [
  ["ai-tool-stack-2026", "你的AI电商工具栈里，哪三个工具真正留了下来？", "工具交流", "林舟", "比起不断收藏新工具，更想听听大家在选品、内容、投放或客服中持续使用的工作流。", "2026-08-04", 18, 42, true],
  ["shopify-localization", "Shopify多市场本地化，最容易遗漏哪一步？", "独立站", "Mia", "正在整理从域名、语言到支付与售后的上线清单。", "2026-08-04", 9, 23, false],
  ["creative-tagging", "分享一个广告素材标签体系模板", "广告投放", "周可", "按受众、卖点、场景、开场和格式五个维度组织。", "2026-08-03", 14, 37, true],
  ["geo-monitoring", "大家如何做AI搜索可见度的基础监测？", "SEO/GEO", "Yuan", "先不讨论昂贵工具，想交流可复现的人工基线方法。", "2026-08-03", 11, 31, false],
  ["linkedin-founder-content", "B2B创始人内容，怎样避免写成公司通稿？", "海外社媒", "Iris", "客户问题和一线判断似乎比抽象趋势更容易引发讨论。", "2026-08-02", 16, 45, true],
  ["product-hunt-preheat", "TikTok Shop新品启动前四周如何准备内容？", "跨境平台", "Kevin", "整理了一份按周拆解的商品页、短视频、达人素材与投放准备清单。", "2026-08-01", 12, 34, false],
  ["brand-proof", "新品牌进入陌生市场，第一批信任证据从哪里来？", "品牌增长", "苏霁", "在没有大量客户Logo时，产品证据和创始人背景如何表达？", "2026-07-31", 21, 56, true],
  ["b2b-website-research", "寻找工业B2B英文官网改版经验交流", "企业需求", "匿名企业用户", "关注复杂产品线的信息架构与询盘质量。", "2026-07-30", 7, 18, false],
  ["ai-video-partner", "寻找熟悉海外短视频的AI视觉创作者", "合作机会", "Nora", "希望合作建立可持续的产品演示与案例内容节奏。", "2026-07-29", 8, 20, false],
  ["hangzhou-meetup", "杭州AI电商与跨境从业者九月小聚意向", "城市活动", "陈屿", "先征集主题和场地建议，规模控制在30人以内。", "2026-07-28", 26, 61, false],
].map(([slug, title, category, author, excerpt, publishedAt, replies, likes, featured]) => ({ slug: String(slug), title: String(title), category: String(category), author: String(author), excerpt: String(excerpt), publishedAt: String(publishedAt), replies: Number(replies), likes: Number(likes), featured: Boolean(featured) }));

export const courses: CourseItem[] = [
  { slug: "ai-global-growth-foundations", title: "AI电商出海增长基础课", description: "从市场、商品、渠道、内容、投放到数据建立一套共同语言。", lessons: 12, duration: "4周", level: "入门", status: "开放候补" },
  { slug: "seo-geo-practice", title: "跨境SEO与GEO内容实战营", description: "完成一个品类支柱页、购买问题地图和可引用内容模板。", lessons: 8, duration: "3周", level: "进阶", status: "即将开放" },
  { slug: "cross-border-product-launch", title: "跨境新品内容与投放训练营", description: "用四周准备市场验证、商品内容、素材、落地页与测试复盘。", lessons: 10, duration: "4周", level: "实战", status: "开放候补" },
];

export const getReport = (slug: string) => reports.find((item) => item.slug === slug);
export const getEvent = (slug: string) => events.find((item) => item.slug === slug);
export const getCourse = (slug: string) => courses.find((item) => item.slug === slug);
