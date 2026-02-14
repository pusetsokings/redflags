# FlagSense — Payment & Webhooks Status

**Polar is primary (required); Lemon Squeezy is backup only.**

## What’s implemented

- **Backend (Supabase Edge Functions)**
  - **create-checkout:** Reads `PRIMARY_PROVIDER` (default `polar`). If Polar: calls Polar Checkouts API with product IDs for monthly/annual/reduced; returns `checkoutUrl`. If Lemon Squeezy: builds checkout URL from env variant IDs. Requires Supabase auth (Bearer token).
  - **verify-license:** Reads from `flagsense.users` and `flagsense.purchases`; returns `hasLicense`, `userType`. Admin bypass via `ADMIN_EMAILS` (comma-separated emails get premium without purchase).
- **Database:** Schema `flagsense` with `flagsense.users` and `flagsense.purchases`. RPC `apply_purchase_entitlement_flagsense` for webhook writes (service_role only).
- **Shared Polar webhook:** Same URL as other Kings-Arms-Org apps. Handler must route FlagSense product IDs to `apply_purchase_entitlement_flagsense` (see `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`).
- **Frontend**
  - When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set: anonymous auth, all “Upgrade” actions call create-checkout and redirect to returned `checkoutUrl` (no direct Polar/LS link). Premium and “Enhanced AI” gated on verify-license result. Restore purchases calls verify-license.
  - When Supabase env is not set: existing behavior (direct Lemon Squeezy link and localStorage) remains.

**Required:** In Supabase Dashboard → Authentication → Providers → **Anonymous**, enable **anonymous sign-ins** (otherwise checkout/license calls will fail).

## Env vars

| Where | Variable | Description |
|-------|----------|-------------|
| Supabase Edge Functions | `PRIMARY_PROVIDER` | `polar` (default) or `lemon_squeezy` |
| | `POLAR_ACCESS_TOKEN` | Polar API token |
| | `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` | Polar product UUID (monthly) |
| | `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL` | Polar product UUID (annual) |
| | `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED` | Polar product UUID (reduced) |
| | `POLAR_SUCCESS_URL_FLAGSENSE` | FlagSense-only success URL (e.g. `https://your-flagsense-app.vercel.app?payment=success`); other apps use `POLAR_SUCCESS_URL` |
| | `POLAR_SUCCESS_URL` | Fallback if `POLAR_SUCCESS_URL_FLAGSENSE` not set; frontend can also send successUrl in body |
| | `LEMON_SQUEEZY_STORE_ID` | Backup only |
| | `LEMON_SQUEEZY_VARIANT_MONTHLY` | Backup only |
| | `LEMON_SQUEEZY_VARIANT_ANNUAL` | Backup only |
| | `LEMON_SQUEEZY_VARIANT_REDUCED` | Backup only |
| | `ADMIN_EMAILS` | Comma-separated emails that get premium (e.g. `pkwelagobe@gmail.com`) |
| Frontend (Vercel / build) | `VITE_SUPABASE_URL` | e.g. `https://yfghvxjnpwmewpxdorki.supabase.co` |
| | `VITE_SUPABASE_ANON_KEY` | Anon key for same project |

## Polar dashboard

- **Webhook URL:** Same as other apps (shared):  
  `https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/server/make-server-bb2098ba/billing/polar/webhook`
- **Events:** `order.created`, `order.paid`
- **Secret:** Set in dashboard and same value in the server that handles the webhook as `POLAR_WEBHOOK_SECRET` (or equivalent)

## Lemon Squeezy

- Backup only when `PRIMARY_PROVIDER=lemon_squeezy`. No separate webhook needed for FlagSense if using Polar primary; LS checkout URL is built in create-checkout from variant env vars.

## Finish and deploy checklist

1. Create monthly, annual, and reduced products in Polar; copy product UUIDs into Supabase Edge Function secrets.
2. Run the FlagSense migration (`supabase/migrations/20250125000000_flagsense_schema.sql`) on project `yfghvxjnpwmewpxdorki` (Dashboard SQL Editor or `supabase db push`).
3. Add FlagSense product ID branch and `applyFlagSenseEntitlement` in the shared Polar webhook handler (see `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`).
4. Deploy Edge Functions: `create-checkout`, `verify-license` (see `DEPLOY_FINISH.md`).
5. Set frontend env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
6. Deploy frontend (e.g. Vercel); test one checkout (Polar) and Restore purchases.
