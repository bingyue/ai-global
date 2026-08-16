import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { ListingHero } from "@/components/content/listing-hero";
import { events } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata:Metadata=pageMetadata("活动与课程","AI出海线上直播、公开课、训练营、城市Meetup与行业沙龙。","/events");
export default function EventsPage(){return <><ListingHero eyebrow="Connect & Learn" title="活动与行业连接" description="线上公开课、训练营、城市Meetup和行业沙龙。用真实交流连接知识、人才、需求与合作。"/><section className="section-pad bg-[var(--paper)]"><div className="container-main grid gap-4 md:grid-cols-2">{events.map((e,index)=><Link key={e.slug} href={`/events/${e.slug}`} className={`group rounded-[28px] p-7 ${index===0?"bg-[var(--orange)]":"border border-[var(--line)] bg-white"}`}><div className="flex justify-between"><span className="rounded-full bg-[var(--ink)] px-3 py-1 text-[10px] font-bold text-white">{e.type}</span><span className="text-xs">{e.status}</span></div><h2 className="mt-8 font-display text-3xl font-semibold tracking-[-.035em] md:text-4xl">{e.title}</h2><p className="mt-4 text-sm leading-7 opacity-65">{e.description}</p><div className="mt-8 flex flex-wrap gap-5 text-xs"><span className="flex gap-2"><CalendarDays className="size-4"/>{formatDate(e.date)}</span><span className="flex gap-2"><MapPin className="size-4"/>{e.location}</span></div></Link>)}</div></section></>}
