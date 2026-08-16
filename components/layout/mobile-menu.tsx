"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { navigation, serviceNavigation } from "@/data/navigation";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <>
    <button onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden" aria-label="打开菜单"><Menu className="size-5" /></button>
    {open && <div className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--ocean)] p-5 text-white">
      <div className="flex items-center justify-between"><Logo light /><button onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-full border border-white/15" aria-label="关闭菜单"><X className="size-5" /></button></div>
      <nav className="mt-12 grid grid-cols-2 gap-x-5 gap-y-1" aria-label="移动端导航">
        {[...navigation, { label: "企业服务", href: "/services" as const }, { label: "关于我们", href: "/about" as const }].map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-lg">{item.label}</Link>)}
      </nav>
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[.2em] text-[var(--brand)]">Services</p>
      <div className="mt-3 grid gap-1">{serviceNavigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2.5 text-sm text-white/70">{item.label}</Link>)}</div>
      <div className="mt-10 flex gap-3"><ButtonLink href="/search" variant="outline" className="border-white/15 text-white"><Search className="size-4" />搜索</ButtonLink><ButtonLink href="/contact" onClick={() => setOpen(false)}>获取方案</ButtonLink></div>
    </div>}
  </>;
}
