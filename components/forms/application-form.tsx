"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";

export function ApplicationForm({ kind, typeOptions, submitLabel = "提交申请" }: { kind: "event" | "content" | "partner" | "community"; typeOptions: string[]; submitLabel?: string }) {
  const [state, setState] = useState<{ loading: boolean; message: string; ok: boolean }>({ loading: false, message: "", ok: false });
  async function submit(formData: FormData) {
    setState({ loading: true, message: "", ok: false });
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(`/api/applications/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { ok: boolean; message: string };
      setState({ loading: false, message: data.message, ok: data.ok });
    } catch { setState({ loading: false, message: "网络连接失败，请稍后再试。", ok: false }); }
  }
  if (state.ok) return <div className="flex items-center gap-3 rounded-2xl bg-[var(--brand-wash)] p-5 text-sm font-semibold text-[var(--brand-dark)]"><CheckCircle2 className="size-6" />{state.message}</div>;
  return <form action={submit} className="grid gap-4"><div className="grid gap-4 md:grid-cols-2"><Input name="name" placeholder="姓名 *" required /><Input name="email" type="email" placeholder="邮箱 *" required /></div><Input name="company" placeholder="公司 / 项目（可选）" /><Select name="type" required><option value="">请选择类型 *</option>{typeOptions.map((item) => <option key={item}>{item}</option>)}</Select><Textarea name="message" placeholder="请用至少10个字说明你的需求或背景 *" required minLength={10} />{state.message && <p className="text-sm text-red-600">{state.message}</p>}<Button type="submit" disabled={state.loading}>{state.loading ? "提交中…" : submitLabel}</Button></form>;
}
