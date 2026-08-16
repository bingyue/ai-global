# AI Global｜AI出海研究院

面向中国企业、品牌、跨境商家、AI 创业者和出海从业者的垂直行业平台，统一承载：

- AI 出海行业资讯门户
- AI 出海与全球增长知识库
- AI 工具与服务资源导航
- 案例、研究报告、活动与课程
- AI Global Club 轻社区与会员体系
- AI 建站、广告投放、SEO/GEO、全球营销等企业服务
- 线索、投稿、合作申请、报告下载与运营后台

品牌入口为 `https://aigoglobal.net`。网站内所有企业服务均由 AI Global 对外统一提供、组织或交付。

## 当前交付状态

项目可以在无第三方环境变量的情况下安装、开发和构建。无 Supabase 时自动进入 Mock 模式；配置 Supabase 后，表单、认证、内容与后台数据可切换到持久化模式。

已内置：

- 20 条资讯、30 篇结构化知识内容、20 个真实工具
- 8 个明确标注类型的案例、4 份报告、4 场活动、10 个社区主题
- 8 个完整企业服务页面与对应英文核心页
- 228+ 个静态/动态构建页面（实际数量会随内容增加）
- 全站搜索、RSS、Sitemap、robots.txt 和主要 Schema.org 结构化数据
- 服务线索、邮件订阅、报告下载、报名、投稿和合作申请接口
- Supabase 完整迁移、RLS、角色与 Vercel Cron

## 技术栈

- Next.js 16 App Router、React 19、TypeScript 严格模式
- Tailwind CSS 4、shadcn/ui 项目约定、Lucide Icons
- React Hook Form、Zod
- Supabase PostgreSQL/Auth（可选）
- MDX + Supabase 混合内容模式
- Vercel 部署与 Cron；可迁移至 EdgeOne 或 Cloudflare
- pnpm

## 本地运行

要求 Node.js `>=20.9`、pnpm `>=11`。

```bash
cd /Users/admin/Documents/Github/ai-global
pnpm install
cp .env.example .env.local
pnpm dev
```

打开 `http://localhost:3000`。

常用检查：

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## 环境变量

复制 `.env.example`。首期所有第三方变量均可留空。

| 变量 | 用途 | 必需 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical、Sitemap、RSS、结构化数据 | 生产必需 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | 持久化模式必需 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 浏览器认证与公开查询 | 持久化模式必需 |
| `SUPABASE_SERVICE_ROLE_KEY` | 服务端写入、采集和 Seed | 持久化模式必需；仅服务端 |
| `CRON_SECRET` | Cron Bearer 密钥 | 生产 Cron 必需 |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_UMAMI_ID` | 可选分析 | 否 |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_WECHAT_ID` | 联系方式 | 否 |
| `OPENAI_API_KEY` 等 | 可选摘要/辅助编辑扩展 | 否 |
| `RESEND_API_KEY` / `NEWSLETTER_FROM_EMAIL` | 可选邮件发送 | 否 |

不要把 `SUPABASE_SERVICE_ROLE_KEY` 或 `CRON_SECRET` 暴露到 `NEXT_PUBLIC_*` 变量。

## Mock 与 Supabase 双模式

`lib/submissions.ts` 检查 Supabase 服务端配置：

- 已配置：表单写入对应 Supabase 表。
- 未配置：写入 Node 进程内的 Mock 存储并返回成功，用于本地演示与验收。

Mock 数据不会跨进程、重启或 Serverless 实例持久化。正式运营必须配置 Supabase。

登录注册同样具有降级模式：未配置 Supabase 时，测试账户保存在浏览器 `localStorage`；正式环境使用 Supabase Auth。

## Supabase 初始化与数据库迁移

1. 新建 Supabase 项目。
2. 将项目 URL、Anon Key、Service Role Key 写入 `.env.local`。
3. 使用 Supabase CLI 或 SQL Editor 应用迁移：

```bash
supabase link --project-ref <project-ref>
supabase db push
```

迁移文件：`supabase/migrations/202608040001_initial_schema.sql`。

它会创建需求中的全部核心表、`admin/editor/member/paid_member/partner` 角色、内容/线索状态、全文索引、Auth 新用户触发器与 RLS 策略。

首次 Seed：

```bash
pnpm seed
```

没有 Supabase 配置时，该命令只校验内置数据并输出数量，不执行数据库写入。

### 创建首位管理员

先通过网站注册，再在 Supabase SQL Editor 中执行：

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

管理员和编辑通过 RLS 获得审核与管理权限。`/admin` 在 Supabase 模式下执行服务端用户与角色守卫；Mock 模式下可直接预览后台界面。

## 内容管理

内容采用三层混合模式：

1. `/data`：首期示例、导航、服务与构建时索引，保证零环境变量可运行。
2. `/content`：适合 Git 版本管理、专家协作和长内容的 MDX。
3. Supabase：需要审核、权限、会员、运营配置和持续采集的数据。

示例 MDX：`content/pages/editorial-methodology.mdx`，对应 `/knowledge/methodology`。

正式运营建议逐步将高频更新数据迁入 Supabase，保留 `/data` 作为开发/故障降级数据。

### 新增资讯源

在 `data/sources.ts` 增加官方 RSS/Atom 配置：

```ts
{
  name: "Official Source",
  url: "https://example.com/feed.xml",
  type: "rss",
  defaultCategory: "AI产品",
  categorySlug: "ai-products",
  enabled: true,
  official: true,
}
```

然后执行：

```bash
pnpm fetch:news
```

生产采集统一写入 `pending`，必须经编辑审核后发布。先验证来源条款、robots.txt、RSS 授权和抓取频率。

### 新增知识文章

- 构建时内容：在 `data/knowledge.ts` 增加元数据和结构化结论。
- 长内容：在 `/content` 新增 `.mdx`，再创建对应 App Router 页面导入。
- 运营内容：写入 `knowledge_items`，设置 `access_level` 与 `status`。

知识内容应包含：本文回答的问题、核心结论、适合谁、作者、更新时间、参考资料与 FAQ。

### 新增工具

在 `data/tools.ts` 或 Supabase `tools` 表新增。只使用真实官网 URL；定价、中文支持与功能变化以官方信息为准，不添加虚构评分或用户数量。

### 新增案例

在 `data/cases.ts` 或 `cases` 表新增，并设置：

- `匿名案例`：确有项目背景，但不公开客户名称或数据。
- `示范方案`：必须显示 `Sample Playbook / 示范方案`。
- `自有案例`：仅在可证明且获授权时使用。

未获授权不得展示客户 Logo、营收或增长数据。

## 会员、社区与线索管理

- 用户与会员：`users`、`profiles`、`memberships`
- 社区：`community_topics`、`community_comments`、`saved_items`
- 企业线索：`service_leads`
- 报告下载：`report_downloads`
- 订阅、投稿、合作：对应独立表

服务线索状态：`new → contacted → qualified → proposal → won/lost`。

新用户社区内容默认 `pending`。管理员可审核、屏蔽、删除或禁言；生产环境应保留操作日志并配置告警。

首期付费会员支持兑换码、管理员手动开通和外部支付/知识库入口，不依赖复杂站内支付。

## 定时采集与摘要脚本

```bash
pnpm fetch:news
pnpm normalize:news path/to/input.json
pnpm dedupe:news path/to/input.json
pnpm digest:daily
pnpm digest:weekly
```

日报和周报脚本写入被 Git 忽略的 `data/generated/`，状态均为待编辑审核。

Cron 接口：

- `/api/cron/fetch-news`：每 2 小时
- `/api/cron/daily-digest`：每日
- `/api/cron/weekly-digest`：每周一

调用方式：

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://aigoglobal.net/api/cron/fetch-news
```

本地开发可使用 `Bearer dev-cron`；生产环境未配置 `CRON_SECRET` 时接口返回 503，而不是无保护运行。

## 部署到腾讯云首尔服务器

生产方案使用 Docker Compose 运行 Next.js standalone，容器仅监听 `127.0.0.1:3000`，由宿主机 Nginx 对外提供 HTTPS。Cloudflare Origin CA 证书路径为：

- `/etc/nginx/ssl/aigoglobal.net.pem`
- `/etc/nginx/ssl/aigoglobal.net.key`

服务器首次部署：

```bash
git clone https://github.com/bingyue/ai-global.git /opt/ai-global
cd /opt/ai-global
cp .env.example .env.production
docker compose --env-file .env.production up -d --build
```

证书就绪前可临时使用 `deploy/nginx/aigoglobal.http.conf` 检查源站；证书就绪后启用 `deploy/nginx/aigoglobal.net.conf`，并在 Cloudflare 设置 Full (strict)。每次发布前保留当前镜像标签；若健康检查、页面或接口验收失败，立即恢复上一镜像并重新启动容器。

健康检查：`GET /api/health`。生产环境未配置 Supabase 时，会员和表单明确返回不可用，不会用内存 Mock 假成功或丢失用户提交。

## 部署到 Vercel

1. 将仓库推送到 Git 平台。
2. 在 Vercel 导入项目，Framework 选择 Next.js，Install Command 保持 `pnpm install`。
3. 添加生产环境变量。
4. 部署；`vercel.json` 会注册三条 Cron。
5. 检查部署日志中的 `pnpm build`、Cron 和表单接口。

```bash
vercel
vercel --prod
```

迁移到 EdgeOne 或 Cloudflare 时，需要替换 Vercel Cron 调度入口，但页面和 API 使用标准 Next.js/Fetch 接口，没有付费 Vercel API 依赖。

## 域名绑定

1. 在部署平台添加 `aigoglobal.net` 与 `www.aigoglobal.net`。
2. 按 Vercel 提示配置 DNS。
3. 将 `NEXT_PUBLIC_SITE_URL` 设置为 `https://aigoglobal.net` 后重新部署。
4. 设置 `www` 到主域 308 重定向。
5. 验证 HTTPS、Canonical、Sitemap 与 RSS 均使用主域。

## SEO 与 GEO

内置：

- 独立 Title、Description、Canonical、Open Graph、Twitter Card
- `sitemap.xml`、`robots.txt`、`rss.xml`
- Organization、WebSite、NewsArticle、Article、Service、SoftwareApplication、Event、Course、FAQ 等 JSON-LD
- 可视面包屑、资讯分页、分类/主题/路径页面
- 作者、更新时间、核心结论、适合人群、参考与 FAQ 结构
- 统一组织实体、服务定义和品牌命名

上线后：

1. 在 Google Search Console 与 Bing Webmaster Tools 验证域名。
2. 提交 `https://aigoglobal.net/sitemap.xml`。
3. 检查关键页面 Canonical 和结构化数据。
4. 建立作者档案、真实案例、来源引用和第三方品牌提及。
5. 不将 GEO 简化为批量 AI 文章；持续建设实体、内容、站点结构和权威信号。

## 内容采集合规

- 优先 RSS、官方 API、官方博客和人工投稿。
- 遵守 robots.txt 与来源条款，不绕过登录、付费墙或技术限制。
- 只保存标题、来源、链接、时间与合理长度摘要。
- 明确展示原始来源并鼓励阅读原文。
- 不全文复制受版权保护内容。
- 建立来源方修改/删除入口；收到请求后先下线审核。
- 所有自动采集内容默认 `pending`。

## 运营与发布

详细日常、周度、月度 SOP、审核流程、会员与线索处理见 [`docs/OPERATIONS.md`](docs/OPERATIONS.md)。

## 上线前待替换/确认

- 正式联系邮箱、企业微信/微信号
- Supabase、邮件和分析环境变量
- 首位管理员与编辑账号
- 报告 PDF、正式封面、讲师与活动场地
- 获授权的客户案例、Logo、团队作者档案
- 外部会员支付、知识星球/飞书知识库链接
- 法务审阅后的隐私政策、使用条款与目标市场 Cookie 方案
- 经人工验证的 RSS 来源与抓取频率
- 域名 DNS、Search Console、邮件 SPF/DKIM/DMARC

## 后续扩展建议

1. 将构建时搜索升级为 Supabase PostgreSQL 全文搜索并保留本地索引降级。
2. 增加后台服务端角色守卫、操作日志、导入导出和批量审核。
3. 接入 Resend 等邮件服务，建立双重确认订阅和退订。
4. 扩展会员兑换码、外部支付回调与内容授权判断。
5. 为采集源增加健康监控、相似度去重、来源限速和人工摘要工作台。
6. 扩展完整英文内容、作者档案和多语言 Sitemap。

## 验证记录

当前版本已通过：

```text
pnpm install
pnpm typecheck
pnpm lint
pnpm build
```

生产构建生成 228+ 页面，无 TypeScript 或 ESLint 错误。
