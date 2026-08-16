export const siteConfig = {
  name: "AI Global",
  chineseName: "AI出海研究院",
  domain: "aigoglobal.net",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aigoglobal.net",
  title: "AI Global｜AI出海研究院",
  description:
    "聚合AI电商与品牌出海资讯、工具、知识和案例，提供AI建站、广告投放、SEO、GEO、海外社媒和AI出海营销服务。",
  slogan: "AI驱动，增长全球。",
  mission: "帮助更多中国企业、品牌和创造者，借助AI更高效地进入全球市场。",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aigoglobal.net",
  wechat: process.env.NEXT_PUBLIC_WECHAT_ID ?? "AI Global",
  announcement: {
    enabled: true,
    label: "NEW",
    text: "《2027 AI电商与品牌出海趋势报告》开放预约",
    href: "/reports/ai-commerce-global-trends-2027",
  },
} as const;
