export type ContentAccess = "public" | "member" | "paid_member";

export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categorySlug: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  featured?: boolean;
  status: "published" | "pending";
}

export interface KnowledgeItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  topic: string;
  topicSlug: string;
  level: "入门" | "进阶" | "实战";
  access: ContentAccess;
  updatedAt: string;
  readingTime: number;
  audience: string[];
  takeaways: string[];
}

export interface ToolItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  scenarios: string[];
  pricing: "免费" | "免费增值" | "付费" | "联系询价";
  chineseSupport: "支持" | "部分支持" | "未注明";
  url: string;
  editorPick?: boolean;
}

export interface ServiceItem {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  audiences: string[];
  deliverables: string[];
  process: string[];
  packages: { name: string; description: string }[];
  faq: { question: string; answer: string }[];
  accent: "green" | "orange" | "blue";
}

export interface CaseItem {
  slug: string;
  title: string;
  industry: string;
  industrySlug: string;
  service: string;
  serviceSlug: string;
  companyType: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  result: string;
  duration: string;
  kind: "匿名案例" | "示范方案" | "自有案例";
}

export interface ReportItem {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  pages: number | null;
  status: "可下载" | "即将发布";
  number: string;
}

export interface EventItem {
  slug: string;
  title: string;
  type: string;
  date: string;
  location: string;
  speaker: string;
  price: string;
  capacity: string;
  status: "报名中" | "即将开放" | "已结束";
  description: string;
}

export interface CommunityTopic {
  slug: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  publishedAt: string;
  replies: number;
  likes: number;
  featured?: boolean;
}

export interface CourseItem {
  slug: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  level: string;
  status: string;
}
