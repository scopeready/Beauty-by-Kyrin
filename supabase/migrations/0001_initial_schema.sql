-- Beauty by Kyrin — initial schema.
--
-- LOCAL ONLY. This file has not been applied to any remote Supabase project.
-- Applying it is a step in docs/DEPLOYMENT-PLAN.md, after APPROVE DEPLOYMENT.
--
-- The site works with no Supabase project at all: api/book.mjs treats
-- persistence as optional and delivers the lead by email regardless. Supabase
-- adds a durable copy and a place to track a request through to a booking.

create table if not exists public.appointment_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text not null default '',
  preferred_contact text,
  client_type text,                -- new | returning
  service_interest text,
  hair_description text,
  desired_result text,
  preferred_date date,
  alternate_date date,
  preferred_time text,
  notes text,
  referral_source text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  photo_paths text[],              -- private bucket paths only, never public URLs
  status text not null default 'new'
    check (status in ('new','contacted','consultation','booked','completed','closed'))
);

create index if not exists appointment_inquiries_created_at_idx
  on public.appointment_inquiries (created_at desc);
create index if not exists appointment_inquiries_status_idx
  on public.appointment_inquiries (status);

create table if not exists public.services (
  slug text primary key,
  name text not null,
  short_description text,
  long_description text,
  starting_price numeric,
  duration_minutes int,
  display_order int default 0,
  -- Stays false until the owner confirms she performs the service AND supplies
  -- a real starting price. Never publish a page for a service she does not do.
  published boolean not null default false
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  alt_text text not null,
  category text,
  service_slug text references public.services(slug),
  featured boolean default false,
  display_order int default 0,
  -- Ties to the photo release. No client photo is published without it.
  has_client_release boolean not null default false
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_first_name text not null,
  quote text not null,
  service_slug text references public.services(slug),
  source text,                     -- google | instagram | direct
  -- Fabricated reviews violate FTC rules and can get a Google Business Profile
  -- suspended. Nothing renders until a real one is approved here.
  approved boolean not null default false,
  created_at timestamptz default now()
);

alter table public.appointment_inquiries enable row level security;
alter table public.services            enable row level security;
alter table public.gallery_items       enable row level security;
alter table public.testimonials        enable row level security;

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services
  for select using (published = true);

drop policy if exists "public read gallery" on public.gallery_items;
create policy "public read gallery" on public.gallery_items
  for select using (has_client_release = true);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials
  for select using (approved = true);

-- appointment_inquiries deliberately has NO policy of any kind.
-- With RLS enabled and no policy, the anon and authenticated roles can neither
-- read nor write it. Inserts happen only from api/book.mjs using the service
-- role key, which bypasses RLS. Guest contact details are never client-readable.
