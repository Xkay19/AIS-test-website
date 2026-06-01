-- ============================================================
-- Floilan DPP Platform — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- 1. Organizations (companies using Floilan)
-- ────────────────────────────────────────────────────────────
create table public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  plan        text not null default 'starter' check (plan in ('starter','professional','enterprise')),
  logo_url    text,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- 2. Profiles (extends auth.users)
-- ────────────────────────────────────────────────────────────
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  org_id          uuid references public.organizations(id),
  full_name       text,
  role            text not null default 'member' check (role in ('owner','admin','member')),
  avatar_url      text,
  created_at      timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 3. Digital Product Passports
-- ────────────────────────────────────────────────────────────
create table public.digital_passports (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  created_by      uuid references public.profiles(id),
  name            text not null,
  product_id      text,                        -- e.g. SB-355-2024-001
  category        text not null,               -- Steel | Concrete | Battery | Timber ...
  manufacturer    text,
  region          text,
  stage           text default 'Design',       -- Design | Construction | Operation | End-of-Life
  espr_score      int check (espr_score between 0 and 100),
  espr_grade      text,                        -- Excellent | Good | Fair | Poor
  carbon_kg       numeric(12,2),               -- kg CO₂e
  image_url       text,
  qr_code_url     text,
  issued_at       date not null default current_date,
  valid_until     date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- 4. Materials
-- ────────────────────────────────────────────────────────────
create table public.materials (
  id                  uuid primary key default gen_random_uuid(),
  passport_id         uuid not null references public.digital_passports(id) on delete cascade,
  name                text not null,
  qty                 numeric(12,3),
  unit                text,                    -- t | m³ | m² | kg ...
  recycled_pct        numeric(5,2),
  certifications      text[],                  -- ['EPD','ISO 14001','FSC']
  created_at          timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- 5. Compliance Records
-- ────────────────────────────────────────────────────────────
create table public.compliance_records (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  passport_id     uuid references public.digital_passports(id) on delete set null,
  check_name      text not null,               -- 'Durability' | 'Reusability' ...
  regulation      text,                        -- 'EU ESPR 2024' | 'EN 15804' ...
  status          text not null default 'pending' check (status in ('compliant','in_progress','non_compliant','pending')),
  notes           text,
  verified_at     timestamptz,
  created_at      timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- 6. Carbon Metrics (time-series for charts)
-- ────────────────────────────────────────────────────────────
create table public.carbon_metrics (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.organizations(id) on delete cascade,
  recorded_on date not null default current_date,
  total_kg    numeric(14,2) not null,          -- total embodied carbon that day
  material_breakdown jsonb,                    -- {"Concrete":120450,"Steel":85300,...}
  created_at  timestamptz not null default now(),
  unique (org_id, recorded_on)
);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────
alter table public.organizations      enable row level security;
alter table public.profiles           enable row level security;
alter table public.digital_passports  enable row level security;
alter table public.materials          enable row level security;
alter table public.compliance_records enable row level security;
alter table public.carbon_metrics     enable row level security;

-- Profiles: users see their own
create policy "profiles: own record" on public.profiles
  for all using (auth.uid() = id);

-- Org-scoped: users only see their org's data
create or replace function public.my_org_id()
returns uuid language sql security definer stable as $$
  select org_id from public.profiles where id = auth.uid()
$$;

create policy "org passports" on public.digital_passports
  for all using (org_id = public.my_org_id());

create policy "org materials" on public.materials
  for all using (
    passport_id in (select id from public.digital_passports where org_id = public.my_org_id())
  );

create policy "org compliance" on public.compliance_records
  for all using (org_id = public.my_org_id());

create policy "org carbon" on public.carbon_metrics
  for all using (org_id = public.my_org_id());

create policy "org record" on public.organizations
  for select using (id = public.my_org_id());

-- ────────────────────────────────────────────────────────────
-- Seed: demo org + sample data (optional)
-- ────────────────────────────────────────────────────────────
-- Uncomment to seed demo data after auth user is created:
/*
insert into public.organizations (id, name, plan) values
  ('11111111-0000-0000-0000-000000000001', 'Acme Construction', 'enterprise');

insert into public.digital_passports (org_id, name, product_id, category, manufacturer, region, espr_score, espr_grade, carbon_kg, stage) values
  ('11111111-0000-0000-0000-000000000001', 'Steel Beam – S355',        'SB-355-2024-001',       'Steel',    'Acme Steel Works',    'Europe', 95, 'Excellent', 18450,  'Construction'),
  ('11111111-0000-0000-0000-000000000001', 'Concrete – C30/37',        'CON-C3037-2024-045',    'Concrete', 'BuildRight Materials', 'Europe', 90, 'Excellent', 12750,  'Construction'),
  ('11111111-0000-0000-0000-000000000001', 'EV Battery Cell – NMC 811','BATT-NMC811-2024-009',  'Battery',  'VoltTech Energy',     'Asia',   88, 'Good',      8230,   'Design');
*/
