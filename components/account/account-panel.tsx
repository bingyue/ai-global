"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookOpenCheck, LogOut, Settings, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBrowserSupabase, isDemoAuthEnabled } from "@/lib/supabase/client";

type AccountUser = { email: string; name: string; role: string; mode: string };

export function AccountPanel() {
  const [user, setUser] = useState<AccountUser | null | undefined>(undefined);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      const stored = isDemoAuthEnabled ? localStorage.getItem("ai-global-user") : null;
      if (stored) {
        try {
          setUser(JSON.parse(stored) as AccountUser);
          return;
        } catch {
          localStorage.removeItem("ai-global-user");
        }
      }
      const supabase = getBrowserSupabase();
      if (!supabase) {
        setUser(null);
        return;
      }
      const { data } = await supabase.auth.getUser();
      setUser(data.user ? {
        email: data.user.email ?? "",
        name: String(data.user.user_metadata.name ?? data.user.email?.split("@")[0] ?? "会员"),
        role: String(data.user.user_metadata.role ?? "member"),
        mode: "supabase",
      } : null);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  async function signOut() {
    localStorage.removeItem("ai-global-user");
    await getBrowserSupabase()?.auth.signOut();
    setUser(null);
  }

  if (user === undefined) return <div className="py-20 text-center text-sm text-[var(--muted)]">正在读取账户…</div>;
  if (!user) return <div className="rounded-[26px] border border-[var(--line)] bg-white p-8 text-center">
    <UserRound className="mx-auto size-8 text-[var(--brand-dark)]" />
    <h1 className="mt-5 font-display text-3xl font-semibold">还未登录</h1>
    <p className="mt-3 text-sm text-[var(--muted)]">登录后访问个人资料、收藏和会员内容。</p>
    <Link href="/login" className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white">前往登录</Link>
  </div>;

  return <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
    <aside className="rounded-[26px] bg-[var(--ocean)] p-7 text-white">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-[var(--brand)] text-xl font-black text-[#062118]">{user.name.slice(0, 1).toUpperCase()}</span>
      <h1 className="mt-5 font-display text-3xl font-semibold">{user.name}</h1>
      <p className="mt-2 text-sm text-white/45">{user.email}</p>
      <span className="mt-5 inline-block rounded-full border border-white/15 px-3 py-1 text-[10px] text-[var(--brand)]">{user.role} · {user.mode} mode</span>
      <nav className="mt-9 space-y-2">{[
        { icon: UserRound, label: "个人资料" },
        { icon: Bookmark, label: "我的收藏" },
        { icon: BookOpenCheck, label: "会员知识库" },
        { icon: Settings, label: "账户设置" },
      ].map((item) => {
        const Icon = item.icon;
        return <button key={item.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/60 hover:bg-white/[.06] hover:text-white"><Icon className="size-4" />{item.label}</button>;
      })}</nav>
      <Button variant="outline" className="mt-8 w-full border-white/15 text-white hover:bg-white/8" onClick={signOut}><LogOut className="size-4" />退出登录</Button>
    </aside>
    <div>
      <div className="grid gap-4 md:grid-cols-3">{[
        { label: "已收藏", value: "0", text: "保存的文章与工具" },
        { label: "会员等级", value: "免费", text: "可申请专业会员" },
        { label: "社区贡献", value: "0", text: "主题与评论" },
      ].map((item) => <div key={item.label} className="rounded-[22px] border border-[var(--line)] bg-white p-6"><p className="text-xs text-[var(--muted)]">{item.label}</p><strong className="mt-3 block font-display text-3xl">{item.value}</strong><p className="mt-2 text-xs text-[var(--muted)]">{item.text}</p></div>)}</div>
      <div className="mt-5 rounded-[26px] border border-[var(--line)] bg-white p-7"><h2 className="font-display text-3xl font-semibold">继续你的学习路径</h2><p className="mt-3 text-sm text-[var(--muted)]">从AI电商、全球网站与搜索增长基础开始。</p><Link href="/knowledge/path/ai-commerce" className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-bold">打开学习路径</Link></div>
    </div>
  </div>;
}
