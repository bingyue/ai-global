import Link from "next/link";
import { ArrowUpRight, Bot, ChartNoAxesCombined, Globe2, Megaphone, PanelsTopLeft, Rocket, SearchCheck, Store } from "lucide-react";
import { services } from "@/data/services";

const icons = [PanelsTopLeft, Store, ChartNoAxesCombined, Globe2, SearchCheck, Megaphone, Rocket, Bot];

export function ServiceGrid() {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {services.map((service, index) => { const Icon = icons[index]; return <Link key={service.slug} href={`/services/${service.slug}`} className="group relative min-h-[310px] overflow-hidden rounded-[26px] border border-[var(--line)] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9fdbe4] hover:shadow-[0_25px_60px_rgba(18,33,43,.08)]">
      <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[.15em] text-[#a1aca8]">0{index + 1}</span>
      <span className={`flex size-12 items-center justify-center rounded-2xl ${service.accent === "orange" ? "bg-[#fff0e6] text-[#d96517]" : service.accent === "blue" ? "bg-[#eaf2ff] text-[#226ad1]" : "bg-[var(--brand-wash)] text-[var(--brand-dark)]"}`}><Icon className="size-5" /></span>
      <h3 className="mt-8 text-xl font-bold tracking-[-.025em] text-[var(--ink)]">{service.name}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">{service.tags.map((tag) => <span key={tag} className="rounded-full bg-[var(--paper)] px-2.5 py-1 text-[10px] text-[var(--muted)]">{tag}</span>)}</div>
      <span className="absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full border border-[var(--line)] transition group-hover:rotate-45 group-hover:border-[var(--brand)] group-hover:bg-[var(--brand)]"><ArrowUpRight className="size-4" /></span>
    </Link>; })}
  </div>;
}
