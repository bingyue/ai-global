import { NextResponse } from "next/server";
import { validateCron } from "@/lib/cron";
import { news } from "@/data/news";
import { knowledge } from "@/data/knowledge";
export async function GET(request:Request){const denied=validateCron(request);if(denied)return denied;return NextResponse.json({ok:true,status:"draft",title:"AI Global Weekly",news:news.filter(i=>i.featured).slice(0,5).map(i=>i.title),knowledge:knowledge.slice(0,3).map(i=>i.title),note:"Draft only. Editor approval is required before sending."})}
