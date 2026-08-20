import { NextResponse } from "next/server";
import { validateCron } from "@/lib/cron";
import { news } from "@/data/news";
export async function GET(request:Request){const denied=validateCron(request);if(denied)return denied;const items=news.slice(0,8);return NextResponse.json({ok:true,status:"draft",title:`AI电商出海日报 · ${new Date().toISOString().slice(0,10)}`,items:items.map(i=>({title:i.title,href:`/news/${i.slug}`})),note:"Draft only. Editor approval is required before publishing."})}
