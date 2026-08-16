import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { saveSubmission, SubmissionUnavailableError } from "@/lib/submissions";
import { guardSubmission } from "@/lib/request-guard";

export async function POST(request: Request) {
  try {
    const blocked = guardSubmission(request, "newsletter", 5);
    if (blocked) return blocked;
    const body: unknown = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false, message: "请填写有效邮箱。" }, { status: 400 });
    const result = await saveSubmission("newsletter_subscribers", { ...parsed.data, status: "active", source: "website" });
    return NextResponse.json({ ok: true, message: "订阅成功，下一期见。", ...result });
  } catch (error) {
    if (error instanceof SubmissionUnavailableError) return NextResponse.json({ ok: false, message: "订阅服务正在配置，请稍后再试。" }, { status: 503 });
    console.error("Newsletter subscription failed", error);
    return NextResponse.json({ ok: false, message: "订阅暂时失败，请稍后重试。" }, { status: 500 });
  }
}
