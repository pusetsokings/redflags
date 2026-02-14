# FlagSense schema — data separate from other apps

FlagSense uses **only** the `flagsense` schema. The webhook calls **`apply_purchase_entitlement_flagsense`**, which writes only to `flagsense.*`. **verify-license** for FlagSense reads only from `flagsense.*`. No mixing with `churchhurt.*`, `prayerandfasting.*`, etc.

Deployed in two steps: (1) base schema, tables, RLS, RPC; (2) admins table, admin read-all policies, analytics views.

---

## Part 1 — Base: schema, tables, RLS, RPC, hardening

Run in the **same Supabase project** as the other apps (e.g. Kings-Arms-Org). Creates `flagsense` schema, `users`, `purchases`, indexes, RLS, and the webhook RPC.

```sql
-- FlagSense (Red Flags Tracker): app-scoped schema so data is separate from other apps
create schema if not exists flagsense;

create table if not exists flagsense.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  user_type text not null default 'free' check (user_type in ('free', 'standard', 'premium')),
  is_admin boolean not null default false,
  purchases jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists flagsense.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references flagsense.users(id) on delete cascade,
  product_id text not null,
  order_id text not null default '',
  amount integer not null default 0,
  status text not null default 'paid',
  payment_provider text not null check (payment_provider in ('polar', 'lemonsqueezy')),
  created_at timestamptz not null default now(),
  unique (payment_provider, order_id)
);

create index if not exists flagsense_purchases_user_id on flagsense.purchases(user_id);
create index if not exists flagsense_purchases_created_at on flagsense.purchases(created_at desc);

alter table flagsense.users enable row level security;
alter table flagsense.purchases enable row level security;

create policy "flagsense_users_read_own" on flagsense.users for select using ((select auth.uid()) = id);
create policy "flagsense_users_insert_own" on flagsense.users for insert with check ((select auth.uid()) = id);
create policy "flagsense_users_update_own" on flagsense.users for update using ((select auth.uid()) = id);
create policy "flagsense_purchases_read_own" on flagsense.purchases for select using ((select auth.uid()) = user_id);

create or replace function public.apply_purchase_entitlement_flagsense(
  p_user_id uuid,
  p_product_id text,
  p_order_id text,
  p_amount integer,
  p_status text,
  p_payment_provider text
) returns void language plpgsql security definer set search_path = flagsense, public as $$
begin
  insert into flagsense.users (id, user_type, purchases, updated_at)
  values (
    p_user_id,
    'premium',
    jsonb_build_array(jsonb_build_object(
      'productId', p_product_id,
      'orderId', p_order_id,
      'paymentProvider', p_payment_provider
    )),
    now()
  )
  on conflict (id) do update set
    user_type = 'premium',
    purchases = flagsense.users.purchases || jsonb_build_array(jsonb_build_object(
      'productId', p_product_id,
      'orderId', p_order_id,
      'paymentProvider', p_payment_provider
    )),
    updated_at = now();

  insert into flagsense.purchases (user_id, product_id, order_id, amount, status, payment_provider)
  values (p_user_id, p_product_id, p_order_id, p_amount, p_status, p_payment_provider)
  on conflict (payment_provider, order_id) do nothing;
end;
$$;

revoke execute on function public.apply_purchase_entitlement_flagsense(uuid, text, text, integer, text, text) from public;
grant execute on function public.apply_purchase_entitlement_flagsense(uuid, text, text, integer, text, text) to service_role;

comment on schema flagsense is 'FlagSense / Red Flags Tracker – isolated from other apps for analysis';
comment on table flagsense.users is 'FlagSense: app users and entitlement';
comment on table flagsense.purchases is 'FlagSense: payment records from Polar/LS webhooks';
```

---

## Part 2 — Admins table, admin read-all policies, analytics views

Run after Part 1. Adds `flagsense.admins`, RLS so admins can read all users and purchases, and two analytics views.

```sql
-- Admins registry
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
```

---

## Summary

| Item | Purpose |
|------|--------|
| **Schema** | `flagsense` only; no other app tables here |
| **flagsense.users** | One row per user (id = auth.uid()); `user_type` = 'premium' after purchase; `purchases` JSONB array |
| **flagsense.purchases** | One row per successful payment; unique on (payment_provider, order_id) for idempotency |
| **flagsense.admins** | Admin registry; users listed here can read all rows in `users` and `purchases` via RLS |
| **apply_purchase_entitlement_flagsense** | Called by the shared Polar webhook for FlagSense product IDs; upserts users, inserts purchases; **service_role** only |
| **verify-license** (FlagSense) | Reads only from `flagsense.users` and `flagsense.purchases`; never touches other schemas |
| **flagsense.v_premium_users_by_day** | View: day, premium_users count (for dashboards) |
| **flagsense.v_revenue_by_day** | View: day, payment_provider, total_amount_cents, orders (for revenue analytics) |

---

## Usage

**Webhook (service_role):**  
Call `public.apply_purchase_entitlement_flagsense(user_id, product_id, order_id, amount, status, payment_provider)` when a FlagSense product is paid.

**Promote an admin:**  
`INSERT INTO flagsense.admins (user_id) VALUES ('<auth_user_uuid>');`

**Query analytics (as admin or via service_role):**  
`SELECT * FROM flagsense.v_premium_users_by_day;`  
`SELECT * FROM flagsense.v_revenue_by_day;`

**Migrations in repo:**  
- `supabase/migrations/20250125000000_flagsense_schema.sql` — Part 1 (base).  
- `supabase/migrations/20250125100000_flagsense_admins_analytics.sql` — Part 2 (admins + analytics).  

For a new environment, run Part 1 then Part 2 (or `supabase db push` to apply both).
