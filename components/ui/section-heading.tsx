import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, link, linkLabel = "查看全部", dark = false, className }: { eyebrow?: string; title: string; description?: string; link?: string; linkLabel?: string; dark?: boolean; className?: string }) {
  return <div className={cn("mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between", className)}>
    <div className="max-w-3xl">
      {eyebrow && <p className={cn("mb-4 font-mono text-[11px] font-bold uppercase tracking-[.2em]", dark ? "text-[var(--brand)]" : "text-[var(--brand-dark)]")}>{eyebrow}</p>}
      <h2 className={cn("text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-.035em] md:text-5xl", dark ? "text-white" : "text-[var(--ink)]")}>{title}</h2>
      {description && <p className={cn("mt-5 max-w-2xl text-base leading-7 md:text-lg", dark ? "text-[#a9b7b3]" : "text-[var(--muted)]")}>{description}</p>}
    </div>
    {link && <ButtonLink href={link} variant={dark ? "outline" : "ghost"} className={cn(dark && "border-white/20 text-white hover:bg-white/10")}>{linkLabel}<ArrowUpRight className="size-4" /></ButtonLink>}
  </div>;
}
