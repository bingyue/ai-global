import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { courses } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata("课程与训练营","AI出海增长、SEO/GEO与AI产品全球发布课程。","/courses");
export default function CoursesPage(){return <><ListingHero eyebrow="Learning Programs" title="课程与训练营" description="以完成真实任务为导向的公开课、训练营与企业学习项目。"/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-4 md:grid-cols-3">{courses.map(c=><Link key={c.slug} href={`/courses/${c.slug}`} className="rounded-[24px] border border-[var(--line)] bg-white p-6"><BookOpenCheck className="size-5 text-[var(--brand-dark)]"/><h2 className="mt-7 text-2xl font-semibold">{c.title}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{c.description}</p><p className="mt-7 text-xs font-bold text-[var(--brand-dark)]">{c.lessons}节 · {c.duration} · {c.status}</p></Link>)}</div></section></>}
