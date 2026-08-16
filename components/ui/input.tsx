import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn("h-12 w-full rounded-xl border border-[var(--line-strong)] bg-white px-4 text-[15px] text-[var(--ink)] outline-none transition placeholder:text-[#95a19d] focus:border-[var(--brand-dark)] focus:ring-3 focus:ring-[var(--brand-wash)]", className)} {...props} />;
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn("min-h-32 w-full resize-y rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-[15px] text-[var(--ink)] outline-none transition placeholder:text-[#95a19d] focus:border-[var(--brand-dark)] focus:ring-3 focus:ring-[var(--brand-wash)]", className)} {...props} />;
});

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn("h-12 w-full appearance-none rounded-xl border border-[var(--line-strong)] bg-white px-4 text-[15px] text-[var(--ink)] outline-none transition focus:border-[var(--brand-dark)] focus:ring-3 focus:ring-[var(--brand-wash)]", className)} {...props} />;
});
