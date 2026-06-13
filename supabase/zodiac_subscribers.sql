-- Run this in the Supabase SQL editor (same project used by the app: thqowsicgpuuftadvaya)
-- Stores newsletter signups collected via the "Conócenos" / Chinese zodiac popup
-- (e.g. from QR codes placed on restaurant tables).

create table if not exists public.zodiac_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  birth_date date not null,
  zodiac_animal text not null,
  zodiac_element text not null,
  created_at timestamptz not null default now()
);

alter table public.zodiac_subscribers enable row level security;

-- Anyone (including anonymous website visitors) can submit the form...
create policy "Allow anonymous insert" on public.zodiac_subscribers
  for insert
  to anon
  with check (true);

-- ...but only authenticated/admin users (e.g. via the Supabase dashboard) can read the list.
-- No select policy is created for "anon", so the public cannot read other people's emails.
