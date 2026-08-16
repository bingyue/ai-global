import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = { ...pageMetadata("注册", "注册AI Global免费会员。", "/register"), robots: { index: false, follow: false } };

export default function RegisterPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const demoEnabled = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  return <section className="soft-grid bg-[var(--paper)] py-16 md:py-24"><div className="mx-auto w-[min(100%-40px,520px)]"><AuthForm mode="register" authAvailable={configured || demoEnabled} /></div></section>;
}
