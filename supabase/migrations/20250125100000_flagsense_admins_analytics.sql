-- FlagSense: admins table, admin read-all RLS policies, and analytics views.
-- Run after 20250125000000_flagsense_schema.sql (or apply in Supabase SQL Editor if base already deployed).

-- Admins registry (user_id = auth.users.id)
create table if not exists flagsense.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists flagsense_admins_user_id on flagsense.admins(user_id);

-- Admin read-all policy on users (idempotent)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'flagsense' and tablename = 'users' and policyname = 'flagsense_users_admin_read_all'
  ) then
    create policy "flagsense_users_admin_read_all"
      on flagsense.users
      for select
      to authenticated
      using (exists (select 1 from flagsense.admins a where a.user_id = (select auth.uid())));
  end if;
end$$;

-- Admin read-all policy on purchases (idempotent)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'flagsense' and tablename = 'purchases' and policyname = 'flagsense_purchases_admin_read_all'
  ) then
    create policy "flagsense_purchases_admin_read_all"
      on flagsense.purchases
      for select
      to authenticated
      using (exists (select 1 from flagsense.admins a where a.user_id = (select auth.uid())));
  end if;
end$$;

-- Analytics views
create or replace view flagsense.v_premium_users_by_day as
select
  date_trunc('day', u.updated_at) as day,
  count(*) filter (where u.user_type = 'premium') as premium_users
from flagsense.users u
group by 1
order by 1 desc;

create or replace view flagsense.v_revenue_by_day as
select
  date_trunc('day', p.created_at) as day,
  p.payment_provider,
  sum(p.amount) as total_amount_cents,
  count(*) as orders
from flagsense.purchases p
group by 1, 2
order by 1 desc, 2;

comment on table flagsense.admins is 'FlagSense: admin users who can read all users and purchases';
comment on view flagsense.v_premium_users_by_day is 'FlagSense: daily premium user count by updated_at day';
comment on view flagsense.v_revenue_by_day is 'FlagSense: daily revenue (cents) and order count by provider';
