import { NextResponse } from "next/server";

export function validateCron(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "development" && request.headers.get("authorization") === "Bearer dev-cron") return null;
    return NextResponse.json({ ok: false, message: "CRON_SECRET is not configured." }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  return null;
}
