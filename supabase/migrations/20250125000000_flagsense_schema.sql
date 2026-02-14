-- FlagSense (Red Flags Tracker): app-scoped schema so data is separate from other apps
-- (Prayer and Fasting, Church Hurt, smartwaterup, etc.)
-- Run with: supabase db push (or apply in Dashboard SQL editor)

create schema if not exists flagsense;

-- Users: id = auth.uid(), synced/updated by webhooks
create table if not exists flagsense.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  user_type text not null default 'free' check (user_type in ('free', 'standard', 'premium')),
  is_admin boolean not null default false,
  purchases jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Purchases: one row per successful payment (Polar or Lemon Squeezy)
-- UNIQUE(payment_provider, order_id) for idempotency
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

-- RPC in public so Edge Functions / shared webhook can call it; writes only to flagsense.*
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
