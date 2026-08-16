import { NextResponse } from "next/server";
import { validateCron } from "@/lib/cron";
import { fetchNewsPipeline } from "@/lib/news-pipeline";
export const maxDuration=60;
export async function GET(request:Request){const denied=validateCron(request);if(denied)return denied;try{const result=await fetchNewsPipeline();return NextResponse.json({ok:true,ranAt:new Date().toISOString(),...result});}catch(error){console.error(error);return NextResponse.json({ok:false,message:error instanceof Error?error.message:"Fetch failed"},{status:500})}}
