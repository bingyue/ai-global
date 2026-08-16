"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState({ loading: false, ok: false, message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      interest: String(formData.get("interest") ?? "").trim(),
    };
    setState({ loading: true, ok: false, message: "" });
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { ok: boolean; message: string };
      setState({ loading: false, ...data });
      if (data.ok) form.reset();
    } catch {
      setState({ loading: false, ok: false, message: "网络连接失败，请稍后重试。" });
    }
  }

  if (state.ok) return <div className="flex min-h-12 items-center gap-2 text-sm font-semibold text-[var(--brand-dark)]"><CheckCircle2 className="size-5" />{state.message}</div>;

  return <form onSubmit={onSubmit} className={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-3 md:grid-cols-[1fr_1fr_1.2fr_auto]"}>
    {!compact && <Input name="name" placeholder="姓名（可选）" aria-label="姓名" maxLength={500} />}
    {!compact && <Select name="interest" aria-label="关注领域"><option value="">关注领域（可选）</option><option>AI电商</option><option>AI产品出海</option><option>品牌全球化</option><option>SEO与GEO</option><option>企业AI</option></Select>}
    <div><Input name="email" type="email" placeholder="你的工作邮箱" aria-label="邮箱" required />{state.message && !state.ok && <p role="alert" className="mt-1 text-xs text-red-600">{state.message}</p>}</div>
    <Button type="submit" disabled={state.loading}>{state.loading ? "订阅中…" : "订阅精选"}<ArrowRight className="size-4" /></Button>
  </form>;
}
