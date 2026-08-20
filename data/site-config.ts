export const siteConfig = {
  name: "AI Global",
  chineseName: "AI电商出海研究院",
  domain: "aigoglobal.net",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aigoglobal.net",
  title: "AI Global｜AI电商出海研究院",
  description:
    "聚焦AI电商出海与跨境电商，提供行业资讯、实战知识、工具、案例、社群，以及独立站、商品内容、广告增长、SEO/GEO和电商自动化服务。",
  slogan: "AI驱动，电商全球。",
  mission: "帮助中国品牌与跨境卖家，把AI真正用进商品、内容、获客、转化和客户运营。",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aigoglobal.net",
  wechat: process.env.NEXT_PUBLIC_WECHAT_ID ?? "AI Global",
  contact: {
    webmasterWechat: "YueAGI",
    officialAccount: "AI电商出海研究院",
  },
  announcement: {
    enabled: true,
    label: "NEW",
    text: "《2027 AI电商出海趋势报告》开放预约",
    href: "/reports/ai-commerce-global-trends-2027",
  },
} as const;
