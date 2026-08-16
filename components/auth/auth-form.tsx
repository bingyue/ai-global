"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBrowserSupabase, isDemoAuthEnabled } from "@/lib/supabase/client";

export function AuthForm({
  mode,
  redirectTo = "/account",
  authAvailable = true,
}: {
  mode: "login" | "register";
  redirectTo?: string;
  authAvailable?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(data: FormData) {
    setLoading(true);
    setMessage("");
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "");
    try {
      const supabase = getBrowserSupabase();
      if (supabase) {
        const result = mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password, options: { data: { name } } });
        if (result.error) throw result.error;
      } else if (isDemoAuthEnabled) {
        localStorage.setItem("ai-global-user", JSON.stringify({ email, name: name || email.split("@")[0], role: "member", mode: "demo" }));
      } else {
        throw new Error("会员系统正在配置，请稍后再试。");
      }
      setMessage(mode === "login" ? "登录成功，正在跳转。" : "注册成功，正在跳转。");
      setTimeout(() => router.push(redirectTo), 500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "操作失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  const Icon = mode === "login" ? LogIn : UserPlus;
  const success = message.includes("成功");

  return <div className="rounded-[28px] border border-[var(--line)] bg-white p-7 shadow-[0_25px_60px_rgba(18,33,43,.06)] md:p-9">
    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--brand-wash)]"><Icon className="size-5 text-[var(--brand-dark)]" /></div>
    <h1 className="mt-6 font-display text-4xl font-semibold">{mode === "login" ? "登录AI Global" : "创建免费账户"}</h1>
    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{mode === "login" ? "访问收藏、会员知识和社区资料。" : "收藏内容、参与社区并获取会员知识入口。"}</p>
    {!authAvailable && <p role="status" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">会员系统正在配置，暂时无法登录或注册。</p>}
    <form action={submit} className="mt-7 grid gap-4">
      {mode === "register" && <Input name="name" placeholder="姓名" required disabled={!authAvailable} />}
      <Input name="email" type="email" placeholder="邮箱" required disabled={!authAvailable} />
      <Input name="password" type="password" placeholder="密码（至少8位）" minLength={8} required disabled={!authAvailable} />
      {message && <p className={`flex items-center gap-2 text-sm ${success ? "text-[var(--brand-dark)]" : "text-red-600"}`}>{success && <CheckCircle2 className="size-4" />}{message}</p>}
      <Button type="submit" disabled={loading || !authAvailable}>{loading ? "处理中…" : mode === "login" ? "登录" : "免费注册"}</Button>
    </form>
    <p className="mt-6 text-center text-xs text-[var(--muted)]">{mode === "login" ? "还没有账户？" : "已有账户？"}<Link href={mode === "login" ? "/register" : "/login"} className="ml-1 font-bold text-[var(--brand-dark)]">{mode === "login" ? "免费注册" : "立即登录"}</Link></p>
    {isDemoAuthEnabled && <p className="mt-5 border-t border-[var(--line)] pt-5 text-[10px] leading-5 text-[#8d9894]">当前为开发演示模式，登录状态仅保存在当前浏览器。</p>}
  </div>;
}
