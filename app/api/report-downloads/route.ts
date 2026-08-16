import { NextResponse } from "next/server";
import { reportDownloadSchema } from "@/lib/validation";
import { saveSubmission, SubmissionUnavailableError } from "@/lib/submissions";
import { guardSubmission } from "@/lib/request-guard";

export async function POST(request: Request) {
  try {
    const blocked = guardSubmission(request, "report", 5);
    if (blocked) return blocked;
    const body: unknown = await request.json();
    const parsed = reportDownloadSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false, message: "请检查必填信息。", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const { consent: _consent, ...fields } = parsed.data;
    void _consent;
    const result = await saveSubmission("report_downloads", { ...fields, status: "new" });
    return NextResponse.json({ ok: true, message: "信息已提交。报告可用时，我们会发送至你的邮箱。", ...result });
  } catch (error) {
    if (error instanceof SubmissionUnavailableError) return NextResponse.json({ ok: false, message: "报告预约服务正在配置，请稍后再试。" }, { status: 503 });
    console.error("Report request failed", error);
    return NextResponse.json({ ok: false, message: "提交暂时失败，请稍后重试。" }, { status: 500 });
  }
}
