import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg" | "icon";

const styles: Record<Variant, string> = {
  primary: "bg-[var(--brand)] text-[#061b24] hover:bg-[var(--brand-bright)] shadow-[0_10px_28px_rgba(39,211,226,.2)]",
  secondary: "bg-[var(--orange)] text-[#211006] hover:bg-[#ff9f62] shadow-[0_10px_28px_rgba(255,138,61,.18)]",
  outline: "border border-[var(--line)] bg-transparent text-current hover:border-[var(--brand)] hover:bg-[var(--brand-wash)]",
  ghost: "bg-transparent text-current hover:bg-black/[.05]",
  dark: "bg-[var(--ink)] text-white hover:bg-[#1c3444]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[15px]",
  icon: "size-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return <button className={cn("inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] disabled:pointer-events-none disabled:opacity-45", styles[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({ href, children, className, variant = "primary", size = "md", ...props }: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link href={href} className={cn("inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]", styles[variant], sizes[size], className)} {...props}>{children}</Link>;
}
