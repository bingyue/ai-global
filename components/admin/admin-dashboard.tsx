"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  Database,
  FileText,
  LayoutDashboard,
  Mail,
  MessageSquareWarning,
  Newspaper,
  SearchCheck,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { news } from "@/data/news";
import { knowledge } from "@/data/knowledge";
import { tools } from "@/data/tools";
import { cases } from "@/data/cases";

const modules = [
  { label: "数据概览", icon: LayoutDashboard },
  { label: "资讯审核", icon: Newspaper },
  { label: "知识库管理", icon: BookOpen },
  { label: "工具管理", icon: Wrench },
  { label: "案例与报告", icon: FileText },
  { label: "社区审核", icon: MessageSquareWarning },
  { label: "会员管理", icon: Users },
  { label: "企业线索", icon: ChartNoAxesCombined },
  { label: "邮件订阅", icon: Mail },
  { label: "内容源配置", icon: Database },
  { label: "首页与公告", icon: Bell },
  { label: "SEO配置", icon: SearchCheck },
  { label: "系统设置", icon: Settings },
];
export function AdminDashboard() {
  const [active, setActive] = useState("数据概览");
  const [announcement, setAnnouncement] = useState(true);
  return (
    <div className="grid min-h-[760px] lg:grid-cols-[260px_1fr]">
      <aside className="bg-[var(--ocean)] p-5 text-white">
        <p className="font-display text-2xl font-semibold">
          AI Global <span className="text-[var(--brand)]">Studio</span>
        </p>
        <p className="mt-1 text-[10px] text-white/35">
          CONTENT & GROWTH OPERATIONS
        </p>
        <nav className="mt-8 space-y-1">
          {modules.map((i) => {
            const Icon = i.icon;
            return (
              <button
                key={i.label}
                onClick={() => setActive(i.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active === i.label ? "bg-[var(--brand)] font-bold text-[#062118]" : "text-white/55 hover:bg-white/[.06] hover:text-white"}`}
              >
                <Icon className="size-4" />
                {i.label}
              </button>
            );
          })}
        </nav>
        <p className="mt-8 rounded-xl border border-white/10 p-3 text-[10px] leading-5 text-white/38">
          已启用服务端身份与角色校验。后台数据操作由 Supabase 持久化。
        </p>
      </aside>
      <main className="bg-[#eef2f8] p-5 md:p-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-xs text-[var(--muted)]">管理后台 / {active}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">
              {active}
            </h1>
          </div>
          <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs text-[var(--muted)]">
            管理员 · Secure Mode
          </span>
        </div>
        {active === "数据概览" ? (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "已发布资讯", value: news.length, change: "待审核 0" },
                {
                  label: "知识条目",
                  value: knowledge.length,
                  change: "会员内容 7",
                },
                { label: "工具收录", value: tools.length, change: "待审核 0" },
                { label: "案例", value: cases.length, change: "示范/匿名" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5"
                >
                  <p className="text-xs text-[var(--muted)]">{i.label}</p>
                  <strong className="mt-4 block font-display text-4xl">
                    {i.value}
                  </strong>
                  <p className="mt-2 text-[10px] text-[var(--brand-dark)]">
                    {i.change}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-[22px] border border-[var(--line)] bg-white p-6">
                <div className="flex justify-between">
                  <h2 className="font-bold">最近内容</h2>
                  <button className="text-xs text-[var(--brand-dark)]">
                    查看全部
                  </button>
                </div>
                <div className="mt-5 divide-y divide-[var(--line)]">
                  {news.slice(0, 5).map((n) => (
                    <div
                      key={n.slug}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{n.title}</p>
                        <p className="mt-1 text-[10px] text-[var(--muted)]">
                          {n.category} · {n.publishedAt}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--brand-wash)] px-2 py-1 text-[9px] text-[var(--brand-dark)]">
                        已发布
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[22px] border border-[var(--line)] bg-white p-6">
                <h2 className="font-bold">运营检查</h2>
                <div className="mt-5 space-y-3">
                  {[
                    "示例内容已集中管理",
                    "Cron接口启用密钥校验",
                    "社区默认基础审核",
                    "生产表单禁止内存降级",
                    "SEO路由与RSS已启用",
                  ].map((x) => (
                    <p
                      key={x}
                      className="flex items-center gap-2 text-sm text-[var(--muted)]"
                    >
                      <Check className="size-4 text-[var(--brand-dark)]" />
                      {x}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : active === "首页与公告" ? (
          <div className="mt-8 max-w-3xl rounded-[22px] border border-[var(--line)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">首页公告栏</h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  控制公告显示状态；正式环境写入site_settings。
                </p>
              </div>
              <button
                onClick={() => setAnnouncement((v) => !v)}
                className={`relative h-7 w-12 rounded-full ${announcement ? "bg-[var(--brand)]" : "bg-[#c6ceca]"}`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-white transition ${announcement ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
            <div className="mt-6 rounded-xl border border-[var(--line)] p-4">
              <p className="text-xs text-[var(--muted)]">当前公告</p>
              <p className="mt-2 text-sm font-semibold">
                《2027 AI电商出海趋势报告》开放预约
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[22px] border border-[var(--line)] bg-white">
            <div className="border-b border-[var(--line)] p-6">
              <h2 className="font-bold">{active}</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                模块已就绪，数据由 Supabase 权限策略读取与持久化。
              </p>
            </div>
            {["全部记录", "待处理", "已处理", "配置与导出"].map((x) => (
              <button
                key={x}
                className="flex w-full items-center justify-between border-b border-[var(--line)] px-6 py-4 text-left text-sm last:border-0 hover:bg-[var(--brand-wash)]"
              >
                <span>{x}</span>
                <ChevronRight className="size-4 text-[var(--muted)]" />
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
