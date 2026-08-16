import { NextResponse } from "next/server";
import { simpleApplicationSchema } from "@/lib/validation";
import { saveSubmission, SubmissionUnavailableError, type SubmissionRecord, type SubmissionTable } from "@/lib/submissions";
import { guardSubmission } from "@/lib/request-guard";

const tableMap: Record<string, SubmissionTable> = { event: "event_registrations", content: "content_submissions", partner: "partner_applications", community: "community_topics" };

export async function POST(request: Request, { params }: { params: Promise<{ kind: string }> }) {
  try {
    const { kind } = await params;
    const table = tableMap[kind];
    if (!table) return NextResponse.json({ ok: false, message: "未知申请类型。" }, { status: 404 });
    const blocked = guardSubmission(request, `application:${kind}`, 5);
    if (blocked) return blocked;
    const body: unknown = await request.json();
    const parsed = simpleApplicationSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false, message: "请完整填写信息。" }, { status: 400 });
    let fields: SubmissionRecord;
    if (kind === "community") {
      fields = { author_name: parsed.data.name, email: parsed.data.email, company: parsed.data.company ?? null, title: `加入申请：${parsed.data.type}`, category: "社区申请", type: parsed.data.type, excerpt: parsed.data.message, message: parsed.data.message, status: "pending" };
    } else {
      fields = { name: parsed.data.name, email: parsed.data.email, company: parsed.data.company ?? null, type: parsed.data.type, message: parsed.data.message, status: "pending" };
    }
    const result = await saveSubmission(table, fields);
    return NextResponse.json({ ok: true, message: "提交成功，我们会尽快审核并联系你。", ...result });
  } catch (error) {
    if (error instanceof SubmissionUnavailableError) return NextResponse.json({ ok: false, message: "申请服务正在配置，请稍后再试。" }, { status: 503 });
    console.error("Application failed", error);
    return NextResponse.json({ ok: false, message: "提交暂时失败，请稍后重试。" }, { status: 500 });
  }
}
