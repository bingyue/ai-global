import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export function pageMetadata(title: string, description: string, path: string, options?: { type?: "website" | "article"; publishedTime?: string; modifiedTime?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: absoluteUrl(path), siteName: siteConfig.name, locale: "zh_CN", type: options?.type ?? "website", images: [{ url: absoluteUrl("/og-default.png"), width: 1200, height: 630, alt: title }], ...(options?.publishedTime ? { publishedTime: options.publishedTime } : {}), ...(options?.modifiedTime ? { modifiedTime: options.modifiedTime } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-default.png")] },
  };
}
