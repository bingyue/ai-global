import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Link href="/" className="group flex items-center gap-3" aria-label="AI Global 首页">
    <span className="relative flex size-9 items-center justify-center rounded-[11px] bg-[var(--brand)] text-sm font-black text-[#061b24] shadow-[inset_0_0_0_1px_rgba(255,255,255,.28)]">
      AI<span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-[var(--ocean)] bg-[var(--violet)]" />
    </span>
    <span className="leading-none">
      <span className={cn("block font-display text-[21px] font-semibold tracking-[-.04em]", light ? "text-white" : "text-[var(--ink)]")}>AI Global</span>
      {!compact && <span className={cn("mt-1 block text-[9px] font-bold tracking-[.18em]", light ? "text-white/55" : "text-[var(--muted)]")}>AI出海研究院</span>}
    </span>
  </Link>;
}
