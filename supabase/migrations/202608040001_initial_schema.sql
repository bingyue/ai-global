-- AI Global initial Supabase schema
-- Apply with: supabase db push (CLI) or paste into the Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'editor', 'member', 'paid_member', 'partner');
create type public.content_status as enum ('draft', 'pending', 'published', 'archived');
create type public.access_level as enum ('public', 'member', 'paid_member');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references public.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  company text,
  position text,
  city text,
  interests text[] not null default '{}',
  role public.app_role not null default 'member',
  is_public boolean not null default false,
  is_muted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  redemption_code text,
  external_reference text,
  created_at timestamptz not null default now()
);

create table public.article_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  feed_url text unique not null,
  source_type text not null default 'rss',
  default_category text,
  enabled boolean not null default true,
  official boolean not null default false,
  last_fetched_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  slug text unique,
  title text not null,
  excerpt text,
  content text,
  category text not null,
  category_slug text not null,
  source_name text,
  source_url text,
  author_id uuid references public.profiles(id),
  status public.content_status not null default 'pending',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_search_idx on public.articles using gin(to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(excerpt, '')));

create table public.knowledge_paths (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  item_slugs text[] not null default '{}',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.knowledge_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text not null,
  category_slug text not null,
  topic text,
  topic_slug text,
  level text,
  access_level public.access_level not null default 'public',
  author_id uuid references public.profiles(id),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index knowledge_search_idx on public.knowledge_items using gin(to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, '')));

create table public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  category text not null,
  category_slug text not null,
  website_url text not null,
  pricing_type text,
  chinese_support text,
  editor_pick boolean not null default false,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tool_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website_url text,
  contact_name text,
  email text,
  description text,
  disclosure text,
  status public.content_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  industry text,
  service_slug text,
  company_type text,
  challenge text,
  solution text,
  capabilities text[] not null default '{}',
  result text,
  duration text,
  kind text not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  cover_url text,
  file_url text,
  page_count integer,
  status text not null default 'coming_soon',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.report_downloads (
  id uuid primary key default gen_random_uuid(),
  report_slug text not null,
  name text not null,
  company text not null,
  position text,
  phone_or_wechat text not null,
  email text not null,
  interest text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  event_type text,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  speaker text,
  price_label text,
  capacity_label text,
  status text not null default 'upcoming',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  name text not null,
  email text not null,
  company text,
  type text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  lesson_count integer,
  duration_label text,
  level text,
  access_level public.access_level not null default 'member',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.community_topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text,
  email text,
  company text,
  title text not null,
  excerpt text,
  content text,
  category text not null,
  type text,
  message text,
  status public.content_status not null default 'pending',
  is_featured boolean not null default false,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.community_comments (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.community_topics(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  content text not null,
  status public.content_status not null default 'pending',
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  item_type text not null,
  item_id text not null,
  created_at timestamptz not null default now(),
  unique(user_id, item_type, item_id)
);

create table public.service_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  position text,
  phone text,
  wechat text,
  email text not null,
  website text,
  service_type text not null,
  budget_range text,
  start_time text,
  target_market text,
  description text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status public.lead_status not null default 'new',
  created_at timestamptz not null default now()
);

create index service_leads_status_created_idx on public.service_leads(status, created_at desc);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  interest text,
  source text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  type text not null,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.content_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  type text not null,
  message text,
  source_url text,
  disclosure text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.content_tags (
  id uuid primary key default gen_random_uuid(),
  tag_id uuid not null references public.tags(id) on delete cascade,
  content_type text not null,
  content_id uuid not null,
  unique(tag_id, content_type, content_id)
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  description text,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email) values (new.id, new.email);
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  insert into public.memberships (user_id, plan) values (new.id, 'free');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'));
$$;

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.article_sources enable row level security;
alter table public.articles enable row level security;
alter table public.knowledge_paths enable row level security;
alter table public.knowledge_items enable row level security;
alter table public.tools enable row level security;
alter table public.tool_submissions enable row level security;
alter table public.cases enable row level security;
alter table public.reports enable row level security;
alter table public.report_downloads enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.courses enable row level security;
alter table public.community_topics enable row level security;
alter table public.community_comments enable row level security;
alter table public.saved_items enable row level security;
alter table public.service_leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.partner_applications enable row level security;
alter table public.content_submissions enable row level security;
alter table public.tags enable row level security;
alter table public.content_tags enable row level security;
alter table public.site_settings enable row level security;

create policy "own user row" on public.users for select using (id = auth.uid() or public.is_staff());
create policy "public profiles" on public.profiles for select using (is_public or id = auth.uid() or public.is_staff());
create policy "update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "own memberships" on public.memberships for select using (user_id = auth.uid() or public.is_staff());

create policy "published articles" on public.articles for select using (status = 'published' or public.is_staff());
create policy "published knowledge paths" on public.knowledge_paths for select using (status = 'published' or public.is_staff());
create policy "accessible knowledge" on public.knowledge_items for select using (status = 'published' and (access_level = 'public' or auth.uid() is not null) or public.is_staff());
create policy "published tools" on public.tools for select using (status = 'published' or public.is_staff());
create policy "published cases" on public.cases for select using (status = 'published' or public.is_staff());
create policy "public reports" on public.reports for select using (status in ('published', 'coming_soon') or public.is_staff());
create policy "public events" on public.events for select using (true);
create policy "published courses" on public.courses for select using (status = 'published' or public.is_staff());
create policy "published topics" on public.community_topics for select using (status = 'published' or author_id = auth.uid() or public.is_staff());
create policy "published comments" on public.community_comments for select using (status = 'published' or author_id = auth.uid() or public.is_staff());
create policy "public tags" on public.tags for select using (true);
create policy "public content tags" on public.content_tags for select using (true);
create policy "public settings" on public.site_settings for select using (key like 'public.%' or public.is_staff());

create policy "create topic" on public.community_topics for insert with check (auth.uid() is not null or author_id is null);
create policy "create comment" on public.community_comments for insert with check (auth.uid() is not null and author_id = auth.uid());
create policy "own saved items" on public.saved_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "submit tool" on public.tool_submissions for insert with check (true);
create policy "submit report lead" on public.report_downloads for insert with check (true);
create policy "submit event registration" on public.event_registrations for insert with check (true);
create policy "submit service lead" on public.service_leads for insert with check (true);
create policy "subscribe newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "submit partner application" on public.partner_applications for insert with check (true);
create policy "submit content" on public.content_submissions for insert with check (true);

create policy "staff manage article sources" on public.article_sources for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage articles" on public.articles for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage paths" on public.knowledge_paths for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage knowledge" on public.knowledge_items for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage tools" on public.tools for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage cases" on public.cases for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage reports" on public.reports for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage events" on public.events for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage courses" on public.courses for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage topics" on public.community_topics for all using (public.is_staff()) with check (public.is_staff());
create policy "staff manage comments" on public.community_comments for all using (public.is_staff()) with check (public.is_staff());
create policy "staff read leads" on public.service_leads for select using (public.is_staff());
create policy "staff update leads" on public.service_leads for update using (public.is_staff());
create policy "staff read report downloads" on public.report_downloads for select using (public.is_staff());
create policy "staff read registrations" on public.event_registrations for select using (public.is_staff());
create policy "staff read subscribers" on public.newsletter_subscribers for select using (public.is_staff());
create policy "staff read applications" on public.partner_applications for select using (public.is_staff());
create policy "staff read submissions" on public.content_submissions for select using (public.is_staff());
create policy "staff settings" on public.site_settings for all using (public.is_staff()) with check (public.is_staff());

insert into public.site_settings(key, value, description) values
  ('public.announcement', '{"enabled":true,"text":"《2027 AI电商与品牌出海趋势报告》开放预约","href":"/reports/ai-commerce-global-trends-2027"}', 'Homepage announcement'),
  ('public.seo', '{"title":"AI Global｜AI电商出海研究院","description":"聚合AI电商与品牌出海资讯、工具、知识和案例。"}', 'Default SEO settings')
on conflict (key) do nothing;
