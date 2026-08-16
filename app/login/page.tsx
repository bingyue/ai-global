import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = { ...pageMetadata("登录", "登录AI Global会员账户。", "/login"), robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  const redirectTo = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/account";
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const demoEnabled = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  return <section className="soft-grid bg-[var(--paper)] py-16 md:py-24"><div className="mx-auto w-[min(100%-40px,520px)]"><AuthForm mode="login" redirectTo={redirectTo} authAvailable={configured || demoEnabled} /></div></section>;
}
