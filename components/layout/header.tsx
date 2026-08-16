import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { navigation, serviceNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ButtonLink } from "@/components/ui/button";

export function Header() {
  return <>
    {siteConfig.announcement.enabled && <Link href={siteConfig.announcement.href} className="relative z-50 block bg-[var(--brand)] px-5 py-2 text-center text-xs font-semibold text-[#052118] transition hover:bg-[var(--brand-bright)]"><span className="mr-2 rounded-full bg-[#052118] px-2 py-0.5 font-mono text-[9px] tracking-wider text-white">{siteConfig.announcement.label}</span>{siteConfig.announcement.text}<span aria-hidden className="ml-2">→</span></Link>}
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071521ee] text-white backdrop-blur-xl">
      <div className="container-wide flex h-[72px] items-center justify-between gap-6">
        <Logo light />
        <nav className="hidden items-center gap-1 xl:flex" aria-label="主导航">
          {navigation.slice(0, 6).map((item) => <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-[13px] font-medium text-white/72 transition hover:bg-white/8 hover:text-white">{item.label}</Link>)}
          <div className="group relative">
            <Link href="/services" className="flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium text-white/72 transition hover:bg-white/8 hover:text-white">企业服务<ChevronDown className="size-3.5" /></Link>
            <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#0b1c29] p-3 shadow-2xl">
                {serviceNavigation.map((item, index) => <Link key={item.href} href={item.href} className="group/item rounded-xl p-3.5 hover:bg-white/[.06]"><span className="mr-3 font-mono text-[10px] text-[var(--brand)]">0{index + 1}</span><span className="text-sm text-white/85 group-hover/item:text-white">{item.label}</span></Link>)}
              </div>
            </div>
          </div>
          {navigation.slice(6).map((item) => <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-[13px] font-medium text-white/72 transition hover:bg-white/8 hover:text-white">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/search" className="flex size-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="全站搜索"><Search className="size-[18px]" /></Link>
          <Link href="/login" className="px-3 py-2 text-[13px] font-medium text-white/72 hover:text-white">登录</Link>
          <ButtonLink href="/contact" size="sm">获取AI出海方案</ButtonLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  </>;
}
