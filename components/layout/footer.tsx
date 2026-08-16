import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { navigation, serviceNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return <footer className="relative overflow-hidden bg-[var(--ocean)] text-white">
    <div className="absolute -right-24 top-10 size-80 rounded-full border border-[var(--brand)]/10" /><div className="absolute -right-8 top-24 size-52 rounded-full border border-[var(--violet)]/15" />
    <div className="container-main relative py-16 md:py-20">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div><Logo light /><p className="mt-6 max-w-sm text-sm leading-7 text-white/55">连接AI、电商与全球化增长的知识、工具、人才和商业服务。</p><p className="mt-5 font-display text-2xl text-[var(--brand)]">AI驱动，增长全球。</p></div>
        <div><p className="mb-4 text-xs font-bold tracking-[.15em] text-white/40">探索</p><div className="grid gap-3">{navigation.slice(1).map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/65 hover:text-white">{item.label}</Link>)}</div></div>
        <div><p className="mb-4 text-xs font-bold tracking-[.15em] text-white/40">服务</p><div className="grid gap-3">{serviceNavigation.slice(0, 6).map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/65 hover:text-white">{item.label}</Link>)}</div></div>
        <div><p className="mb-4 text-xs font-bold tracking-[.15em] text-white/40">连接</p><div className="grid gap-3">{[{label:"关于我们",href:"/about"},{label:"合作伙伴",href:"/partners"},{label:"内容投稿",href:"/submit"},{label:"联系我们",href:"/contact"},{label:"English",href:"/en"}].map((item) => <Link key={item.href} href={item.href} className="flex items-center gap-1 text-sm text-white/65 hover:text-white">{item.label}<ArrowUpRight className="size-3" /></Link>)}</div></div>
      </div>
      <div className="flex flex-col gap-4 pt-7 text-xs text-white/38 md:flex-row md:items-center md:justify-between"><p>© 2026 {siteConfig.name} · {siteConfig.chineseName}</p><div className="flex gap-5"><Link href="/privacy">隐私政策</Link><Link href="/terms">使用条款</Link><span>{siteConfig.domain}</span></div></div>
    </div>
  </footer>;
}
