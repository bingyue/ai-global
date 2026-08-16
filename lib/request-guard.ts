import { NextResponse } from "next/server";

type RateBucket = { count: number; resetAt: number };

declare global {
  var aiGlobalRateBuckets: Map<string, RateBucket> | undefined;
}

const buckets = globalThis.aiGlobalRateBuckets ?? new Map<string, RateBucket>();
if (process.env.NODE_ENV !== "production") globalThis.aiGlobalRateBuckets = buckets;

function clientAddress(request: Request) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-real-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

export function guardSubmission(request: Request, scope: string, limit = 6) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 32_768) {
    return NextResponse.json({ ok: false, message: "提交内容过大。" }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aigoglobal.net").origin;
  const isLocalOrigin = process.env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin ?? "");
  if (origin && origin !== siteOrigin && !isLocalOrigin) {
    return NextResponse.json({ ok: false, message: "请求来源无效。" }, { status: 403 });
  }

  const now = Date.now();
  const key = `${scope}:${clientAddress(request)}`;
  const current = buckets.get(key);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + 60_000 } : current;
  bucket.count += 1;
  buckets.set(key, bucket);

  if (buckets.size > 2_000) {
    for (const [bucketKey, value] of buckets) if (value.resetAt <= now) buckets.delete(bucketKey);
  }

  if (bucket.count > limit) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1_000));
    return NextResponse.json(
      { ok: false, message: "提交过于频繁，请稍后再试。" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  return null;
}
