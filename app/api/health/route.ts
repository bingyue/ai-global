import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ai-global",
    persistence: isSupabaseConfigured ? "supabase" : "unconfigured",
    version: process.env.APP_VERSION ?? "development",
  }, { headers: { "Cache-Control": "no-store" } });
}
