export interface ArticleSourceConfig {
  name: string;
  url: string;
  type: "rss" | "atom";
  defaultCategory: string;
  categorySlug: string;
  enabled: boolean;
  official: boolean;
}

export const articleSources: ArticleSourceConfig[] = [
  { name: "OpenAI News", url: "https://openai.com/news/rss.xml", type: "rss", defaultCategory: "AI电商趋势", categorySlug: "ai-commerce", enabled: false, official: true },
  { name: "Shopify Blog", url: "https://www.shopify.com/blog.atom", type: "atom", defaultCategory: "跨境电商", categorySlug: "cross-border-ecommerce", enabled: true, official: true },
  { name: "Google Search Central", url: "https://feeds.feedburner.com/blogspot/amDG", type: "rss", defaultCategory: "SEO/GEO", categorySlug: "seo-geo", enabled: true, official: true },
  { name: "Product Hunt", url: "https://www.producthunt.com/feed", type: "atom", defaultCategory: "AI电商工具", categorySlug: "ai-commerce", enabled: false, official: true },
];
