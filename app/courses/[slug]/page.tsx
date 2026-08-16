import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationForm } from "@/components/forms/application-form";
import { JsonLd } from "@/components/seo/json-ld";
import { ListingHero } from "@/components/content/listing-hero";
import { courses, getCourse } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";
export function generateStaticParams(){return courses.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const c=getCourse((await params).slug);return c?pageMetadata(c.title,c.description,`/courses/${c.slug}`):{};}
export default async function CourseDetail({params}:{params:Promise<{slug:string}>}){const c=getCourse((await params).slug);if(!c)notFound();const schema={"@context":"https://schema.org","@type":"Course",name:c.title,description:c.description,url:absoluteUrl(`/courses/${c.slug}`),provider:{"@type":"Organization",name:"AI Global",url:absoluteUrl()}};return <><JsonLd data={schema}/><ListingHero eyebrow="Learning Program" title={c.title} description={c.description} stats={[{value:`${c.lessons}节`,label:"课程内容"},{value:c.duration,label:"学习周期"},{value:c.level,label:"难度"}]}/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="font-display text-4xl font-semibold">你将完成什么</h2><ul className="mt-7 space-y-3 text-sm text-[var(--muted)]"><li>建立一套业务问题与目标地图</li><li>完成关键页面、内容或发布资产</li><li>获得同伴反馈与实践复盘</li><li>沉淀下一阶段可执行计划</li></ul><p className="mt-7 text-xs text-[var(--muted)]">课程价格、讲师和具体日期将在正式招生时公布，不在占位阶段虚构。</p></div><div className="rounded-[26px] border border-[var(--line)] bg-white p-7"><h2 className="font-display text-3xl font-semibold">加入候补名单</h2><p className="mt-3 mb-7 text-sm text-[var(--muted)]">状态：{c.status}</p><ApplicationForm kind="event" typeOptions={[c.title,"企业内训","了解后续公开课"]} submitLabel="登记候补"/></div></div></section></>}
