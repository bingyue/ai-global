"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import type { z } from "zod";
import { leadSchema } from "@/lib/validation";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Values = z.infer<typeof leadSchema>;

export function LeadForm({ defaultService = "", dark = false }: { defaultService?: string; dark?: boolean }) {
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Values>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", company: "", position: "", phone: "", wechat: "", email: "", website: "", service_type: defaultService, budget_range: "", start_time: "", target_market: "", description: "", consent: false },
  });
  async function onSubmit(values: Values) {
    setResult(null);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await response.json() as { ok: boolean; message: string };
      setResult(data);
      if (data.ok) reset();
    } catch { setResult({ ok: false, message: "网络连接失败，请稍后重试。" }); }
  }
  const fieldError = (name: keyof Values) => errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]?.message}</p> : null;
  if (result?.ok) return <div className={cn("rounded-2xl border p-8 text-center", dark ? "border-white/10 bg-white/[.04] text-white" : "border-[var(--line)] bg-white")}><CheckCircle2 className="mx-auto size-10 text-[var(--brand)]" /><h3 className="mt-4 text-xl font-semibold">提交成功</h3><p className={cn("mt-2 text-sm", dark ? "text-white/60" : "text-[var(--muted)]")}>{result.message}</p><Button className="mt-6" variant="outline" onClick={() => setResult(null)}>提交另一项需求</Button></div>;
  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
    <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">姓名 *<Input className="mt-2" placeholder="如何称呼你" aria-invalid={Boolean(errors.name)} {...register("name")} />{fieldError("name")}</label><label className="text-sm font-semibold">公司 / 项目 *<Input className="mt-2" placeholder="公司或项目名称" aria-invalid={Boolean(errors.company)} {...register("company")} />{fieldError("company")}</label></div>
    <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">工作邮箱 *<Input className="mt-2" type="email" placeholder="name@company.com" aria-invalid={Boolean(errors.email)} {...register("email")} />{fieldError("email")}</label><label className="text-sm font-semibold">微信或手机号<Input className="mt-2" placeholder="便于快速沟通" {...register("wechat")} /></label></div>
    <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">服务方向 *<Select className="mt-2" aria-invalid={Boolean(errors.service_type)} {...register("service_type")}><option value="">请选择</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}<option value="other">其他 / 尚未确定</option></Select>{fieldError("service_type")}</label><label className="text-sm font-semibold">目标市场 *<Input className="mt-2" placeholder="如：北美、欧洲、全球" aria-invalid={Boolean(errors.target_market)} {...register("target_market")} />{fieldError("target_market")}</label></div>
    <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">项目预算<Select className="mt-2" {...register("budget_range")}><option value="">尚未确定</option><option>5万以内</option><option>5—15万</option><option>15—30万</option><option>30万以上</option></Select></label><label className="text-sm font-semibold">计划启动时间<Select className="mt-2" {...register("start_time")}><option value="">尚未确定</option><option>2周内</option><option>1个月内</option><option>1—3个月</option><option>3个月后</option></Select></label></div>
    <label className="text-sm font-semibold">需求描述 *<Textarea className="mt-2" placeholder="请简单说明现状、目标和希望解决的问题…" aria-invalid={Boolean(errors.description)} {...register("description")} />{fieldError("description")}</label>
    <label className={cn("flex items-start gap-3 text-xs leading-5", dark ? "text-white/55" : "text-[var(--muted)]")}><input type="checkbox" className="mt-1 accent-[var(--brand)]" {...register("consent")} /><span>我同意 AI Global 根据隐私政策处理以上信息，并就本次需求与我联系。</span></label>{fieldError("consent")}
    {result && !result.ok && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{result.message}</p>}
    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-fit">{isSubmitting ? "提交中…" : "提交企业需求"}<Send className="size-4" /></Button>
  </form>;
}
