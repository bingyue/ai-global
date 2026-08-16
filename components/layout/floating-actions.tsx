"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Check,
  Copy,
  Mail,
  MessageCircleMore,
  QrCode,
  Share2,
  UsersRound,
  X,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type Panel = "contact" | "community" | "share";

const actions: Array<{ id: Panel; label: string; icon: typeof MessageCircleMore }> = [
  { id: "contact", label: "联系", icon: MessageCircleMore },
  { id: "community", label: "社群", icon: UsersRound },
  { id: "share", label: "分享", icon: Share2 },
];

function QrPlaceholder() {
  return <div className="relative mx-auto flex aspect-square w-40 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--paper)]">
    <div className="absolute inset-3 rounded-xl opacity-45 [background-image:linear-gradient(90deg,var(--line)_1px,transparent_1px),linear-gradient(var(--line)_1px,transparent_1px)] [background-size:12px_12px]" />
    <div className="relative flex size-20 flex-col items-center justify-center rounded-2xl border border-[var(--line)] bg-white shadow-sm">
      <QrCode className="size-7 text-[var(--global-blue)]" />
      <span className="mt-1 text-[9px] font-bold text-[var(--muted)]">二维码预留</span>
    </div>
  </div>;
}

export function FloatingActions() {
  const [active, setActive] = useState<Panel | null>(null);
  const [notice, setNotice] = useState("");
  const [canScrollTop, setCanScrollTop] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setCanScrollTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!active) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        window.requestAnimationFrame(() => previousFocusRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  function toggle(panel: Panel) {
    const isClosing = active === panel;
    if (!isClosing) previousFocusRef.current = document.activeElement as HTMLElement | null;
    setNotice("");
    setActive(isClosing ? null : panel);
    if (isClosing) window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }

  function closePanel() {
    setActive(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }

  async function copyText(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setNotice(successMessage);
  }

  function shareTo(platform: "weibo" | "twitter") {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`${document.title}｜${siteConfig.slogan}`);
    const shareUrl = platform === "weibo"
      ? `https://service.weibo.com/share/share.php?url=${url}&title=${title}`
      : `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=620");
  }

  const panelTitle = active === "contact" ? "联系 AI Global" : active === "community" ? "加入 AI 出海社群" : "分享当前页面";

  return <>
    {active && <aside id="floating-action-panel" className="floating-panel fixed z-[80] overflow-hidden rounded-[26px] border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(7,21,33,.2)] backdrop-blur-xl" role="dialog" aria-modal="false" aria-label={panelTitle}>
      <div className="flex items-start justify-between border-b border-[var(--line)] px-5 py-4">
        <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[var(--brand-dark)]">AI Global Connect</p><h2 className="mt-1.5 font-display text-2xl font-semibold">{panelTitle}</h2></div>
        <button ref={closeButtonRef} onClick={closePanel} className="flex size-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]" aria-label="关闭悬浮面板"><X className="size-4" /></button>
      </div>

      <div className="max-h-[min(520px,calc(100vh-180px))] overflow-y-auto p-5">
        {active === "contact" && <div className="space-y-3">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4"><p className="text-[10px] font-bold tracking-[.12em] text-[var(--muted)]">站长微信</p><div className="mt-2 flex items-center justify-between gap-3"><strong className="font-mono text-lg text-[var(--ink)]">{siteConfig.contact.webmasterWechat}</strong><button onClick={() => copyText(siteConfig.contact.webmasterWechat, "站长微信 YueAGI 已复制")} className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold text-[var(--brand-dark)] hover:border-[var(--brand)]"><Copy className="size-3.5" />复制</button></div></div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4"><p className="text-[10px] font-bold tracking-[.12em] text-[var(--muted)]">微信公众号</p><div className="mt-2 flex items-center justify-between gap-3"><strong className="text-sm text-[var(--ink)]">{siteConfig.contact.officialAccount}</strong><button onClick={() => copyText(siteConfig.contact.officialAccount, "公众号名称已复制")} className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold text-[var(--brand-dark)] hover:border-[var(--brand)]"><Copy className="size-3.5" />复制</button></div></div>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-sm font-semibold transition hover:border-[var(--brand)] hover:bg-[var(--brand-wash)]"><Mail className="size-4 text-[var(--brand-dark)]" />{siteConfig.email}</a>
          <Link href="/contact" onClick={() => setActive(null)} className="flex h-11 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-[#061b24] transition hover:bg-[var(--brand-bright)]">提交合作需求</Link>
        </div>}

        {active === "community" && <div className="text-center">
          <QrPlaceholder />
          <h3 className="mt-5 font-semibold">社群二维码待上传</h3>
          <p className="mt-2 text-xs leading-6 text-[var(--muted)]">后续替换二维码图片即可，无需调整悬浮栏结构。当前可先通过申请页面登记。</p>
          <Link href="/community/apply" onClick={() => setActive(null)} className="mt-5 flex h-11 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-[#061b24] transition hover:bg-[var(--brand-bright)]">申请加入社群</Link>
        </div>}

        {active === "share" && <div>
          <p className="mb-4 text-xs leading-6 text-[var(--muted)]">微博与 X 将打开分享页面；微信和小红书会复制当前链接，方便粘贴分享。</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => shareTo("weibo")} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left text-sm font-bold transition hover:border-[#e54848] hover:bg-[#fff4f4]"><span className="flex size-8 items-center justify-center rounded-full bg-[#e54848] text-xs text-white">博</span>微博</button>
            <button onClick={() => copyText(window.location.href, "链接已复制，请打开微信粘贴分享")} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left text-sm font-bold transition hover:border-[#20ad5c] hover:bg-[#f0fff6]"><span className="flex size-8 items-center justify-center rounded-full bg-[#20ad5c] text-xs text-white">微</span>微信</button>
            <button onClick={() => copyText(window.location.href, "链接已复制，请打开小红书粘贴分享")} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left text-sm font-bold transition hover:border-[#ff2442] hover:bg-[#fff3f5]"><span className="flex size-8 items-center justify-center rounded-full bg-[#ff2442] text-xs text-white">书</span>小红书</button>
            <button onClick={() => shareTo("twitter")} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4 text-left text-sm font-bold transition hover:border-[var(--ink)] hover:bg-[var(--paper)]"><span className="flex size-8 items-center justify-center rounded-full bg-[var(--ink)] text-xs text-white">X</span>Twitter</button>
          </div>
        </div>}

        <div className={cn("mt-4 flex min-h-9 items-center gap-2 rounded-xl bg-[var(--brand-wash)] px-3 text-xs font-semibold text-[var(--brand-dark)] transition", notice ? "opacity-100" : "pointer-events-none opacity-0")} role="status" aria-live="polite"><Check className="size-3.5" />{notice || "操作完成"}</div>
      </div>
    </aside>}

    <nav className="floating-toolbar fixed z-[70] flex rounded-[22px] border border-white/70 bg-white/92 p-1.5 shadow-[0_16px_50px_rgba(7,21,33,.2)] backdrop-blur-xl" aria-label="快捷操作">
      {actions.map((action) => { const Icon = action.icon; return <button key={action.id} onClick={() => toggle(action.id)} className={cn("flex size-12 flex-col items-center justify-center gap-1 rounded-2xl text-[9px] font-bold text-[var(--muted)] transition hover:bg-[var(--brand-wash)] hover:text-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]", active === action.id && "bg-[var(--brand-wash)] text-[var(--brand-dark)]")} aria-expanded={active === action.id} aria-controls={active === action.id ? "floating-action-panel" : undefined} title={action.label}><Icon className="size-[18px]" />{action.label}</button> })}
      <span className="mx-1 hidden w-px bg-[var(--line)] md:block" aria-hidden />
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} disabled={!canScrollTop} className="flex size-12 flex-col items-center justify-center gap-1 rounded-2xl text-[9px] font-bold text-[var(--muted)] transition hover:bg-[var(--brand-wash)] hover:text-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] disabled:opacity-35" aria-label="回到页面顶部" title="回到顶部"><ArrowUp className="size-[18px]" />顶部</button>
    </nav>
  </>;
}
