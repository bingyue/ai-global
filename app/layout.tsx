import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s｜AI Global" },
  description: siteConfig.description,
  alternates: { canonical: "/", languages: { "zh-CN": "/", "en": "/en" }, types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", locale: "zh_CN", url: siteConfig.url, siteName: siteConfig.name, title: siteConfig.title, description: siteConfig.description, images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "AI Global｜AI出海研究院" }] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/og-default.png"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071521" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, alternateName: siteConfig.chineseName, url: siteConfig.url, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") }, description: siteConfig.description, email: siteConfig.email };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, alternateName: siteConfig.chineseName, url: siteConfig.url, potentialAction: { "@type": "SearchAction", target: `${absoluteUrl("/search")}?q={search_term_string}`, "query-input": "required name=search_term_string" } };
  return <html lang="zh-CN"><body><JsonLd data={[organization, website]} /><Header /><main>{children}</main><Footer /><FloatingActions /></body></html>;
}
