import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { saveSubmission, SubmissionUnavailableError } from "@/lib/submissions";
import { guardSubmission } from "@/lib/request-guard";

export async function POST(request: Request) {
  try {
    const blocked = guardSubmission(request, "lead", 4);
    if (blocked) return blocked;
    const body: unknown = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false, message: "请检查表单内容", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const { consent: _consent, ...fields } = parsed.data;
    void _consent;
    const result = await saveSubmission("service_leads", { ...fields, status: "new", utm_source: "website", utm_medium: "form", utm_campaign: "service-inquiry" });
    return NextResponse.json({ ok: true, message: "需求已收到，我们会尽快联系你。", ...result });
  } catch (error) {
    if (error instanceof SubmissionUnavailableError) return NextResponse.json({ ok: false, message: "需求提交服务正在配置，请发送邮件联系我们。" }, { status: 503 });
    console.error("Lead submission failed", error);
    return NextResponse.json({ ok: false, message: "提交暂时失败，请稍后重试。" }, { status: 500 });
  }
}
