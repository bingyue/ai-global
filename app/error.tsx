"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <section className="bg-[var(--paper)] py-28 text-center"><p className="font-mono text-xs text-[#bd3f33]">TEMPORARY ERROR</p><h1 className="mt-5 font-display text-5xl font-semibold">页面暂时未能加载</h1><p className="mt-4 text-sm text-[var(--muted)]">请重试；如果问题持续，可通过联系页面告诉我们。</p><Button className="mt-7" onClick={reset}>重新加载</Button></section>}
