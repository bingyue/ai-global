import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/services/independent-site-growth", destination: "/services/ai-website", permanent: true },
      { source: "/services/global-marketing", destination: "/services/cross-border-strategy", permanent: true },
      { source: "/services/overseas-social-media", destination: "/services/seo-geo", permanent: true },
      { source: "/services/ai-product-global-launch", destination: "/services", permanent: true },
      { source: "/services/enterprise-ai", destination: "/services/commerce-automation", permanent: true },
      { source: "/en/services/independent-site-growth", destination: "/en/services/ai-website", permanent: true },
      { source: "/en/services/global-marketing", destination: "/en/services/cross-border-strategy", permanent: true },
      { source: "/en/services/overseas-social-media", destination: "/en/services/seo-geo", permanent: true },
      { source: "/en/services/ai-product-global-launch", destination: "/en", permanent: true },
      { source: "/en/services/enterprise-ai", destination: "/en/services/commerce-automation", permanent: true },
      { source: "/news/category/ai-products", destination: "/news/category/ai-commerce", permanent: true },
      { source: "/news/category/global-brands", destination: "/news/category/commerce-brands", permanent: true },
      { source: "/news/category/social-media", destination: "/news/category/overseas-content", permanent: true },
      { source: "/news/category/policy-market", destination: "/news/category/compliance", permanent: true },
      { source: "/knowledge/category/ai-websites", destination: "/knowledge/category/independent-sites", permanent: true },
      { source: "/knowledge/path/ai-websites", destination: "/knowledge/path/independent-sites", permanent: true },
      { source: "/knowledge/category/social-media", destination: "/knowledge/category/seo-geo", permanent: true },
      { source: "/knowledge/path/social-media", destination: "/knowledge/path/seo-geo", permanent: true },
      { source: "/knowledge/category/ai-product-global", destination: "/knowledge/category/ai-commerce", permanent: true },
      { source: "/knowledge/path/ai-product-global", destination: "/knowledge/path/ai-commerce", permanent: true },
      { source: "/knowledge/category/global-brand", destination: "/knowledge/category/product-growth", permanent: true },
      { source: "/knowledge/path/global-brand", destination: "/knowledge/path/product-growth", permanent: true },
      { source: "/knowledge/category/enterprise-ai", destination: "/knowledge/category/commerce-automation", permanent: true },
      { source: "/knowledge/path/enterprise-ai", destination: "/knowledge/path/commerce-automation", permanent: true },
      { source: "/knowledge/ai-product-positioning", destination: "/knowledge/global-market-product-validation", permanent: true },
      { source: "/knowledge/product-hunt-launch", destination: "/knowledge/cross-border-channel-mix", permanent: true },
      { source: "/knowledge/saas-global-pricing", destination: "/knowledge/global-market-product-validation", permanent: true },
      { source: "/knowledge/developer-community-cold-start", destination: "/knowledge/overseas-content-system", permanent: true },
      { source: "/knowledge/global-brand-positioning", destination: "/knowledge/global-market-product-validation", permanent: true },
      { source: "/knowledge/localization-quality-framework", destination: "/knowledge/multilingual-product-content", permanent: true },
      { source: "/knowledge/founder-global-ip", destination: "/knowledge/overseas-content-system", permanent: true },
      { source: "/knowledge/enterprise-ai-opportunity-map", destination: "/knowledge/commerce-automation-opportunity-map", permanent: true },
      { source: "/knowledge/enterprise-knowledge-base", destination: "/knowledge/product-knowledge-base", permanent: true },
      { source: "/cases/saas-launch-playbook", destination: "/cases/tiktok-shop-launch-playbook", permanent: true },
      { source: "/cases/b2b-geo-foundation", destination: "/cases/consumer-electronics-seo-foundation", permanent: true },
      { source: "/cases/founder-linkedin-system", destination: "/cases/dtc-founder-content-system", permanent: true },
      { source: "/cases/service/independent-site-growth", destination: "/cases/service/ai-website", permanent: true },
      { source: "/cases/service/ai-product-global-launch", destination: "/cases/service/product-content", permanent: true },
      { source: "/cases/service/overseas-social-media", destination: "/cases/service/seo-geo", permanent: true },
      { source: "/cases/service/global-marketing", destination: "/cases/service/product-content", permanent: true },
      { source: "/cases/service/enterprise-ai", destination: "/cases/service/commerce-automation", permanent: true },
      { source: "/courses/ai-product-global-launch", destination: "/courses/cross-border-product-launch", permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:asset(icon.svg|og-default.png)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/:private(admin|account|login|register)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["lucide-react"],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
