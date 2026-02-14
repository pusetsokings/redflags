# FlagSense — Deploy Finish Checklist

Use this after backend and frontend code are in place. Same Supabase project as Church Hurt / Prayer and Fasting: **Kings-Arms-Org** (`yfghvxjnpwmewpxdorki`).

## 1. Database

Apply the FlagSense schema and RPC on project `yfghvxjnpwmewpxdorki`:

**Option A – Supabase Dashboard**

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → project **yfghvxjnpwmewpxdorki**.
2. Go to **SQL Editor**.
3. Paste and run the contents of `supabase/migrations/20250125000000_flagsense_schema.sql`.

**Option B – CLI**

```bash
cd "/Users/imac/Documents/Improve Red Flags Tracker App"
supabase link --project-ref yfghvxjnpwmewpxdorki
supabase db push
```

## 2. Polar products and webhook

1. In **Polar Dashboard** create three products (e.g. FlagSense Monthly, Annual, Reduced) and copy their **product UUIDs**.
2. In the **server** that handles the shared Polar webhook (e.g. `billing/polar/webhook`), add:
   - FlagSense product ID set and `isFlagSenseProduct(productId)`.
   - Branch: when `isFlagSenseProduct(productId)`, call `applyFlagSenseEntitlement(userId, orderId, amount, productType)` (RPC `apply_purchase_entitlement_flagsense`).
3. **Webhook URL** (no change):  
   `https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/server/make-server-bb2098ba/billing/polar/webhook`  
   Ensure events **order.created** and **order.paid** are subscribed; set the webhook secret in the server env.

## 3. Supabase Edge Functions (this app)

Set secrets for the FlagSense Edge Functions (Dashboard → Project → Edge Functions → select function → Secrets, or CLI):

```bash
supabase secrets set PRIMARY_PROVIDER=polar
supabase secrets set POLAR_ACCESS_TOKEN=<your-polar-access-token>
supabase secrets set POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY=<uuid>
supabase secrets set POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL=<uuid>
supabase secrets set POLAR_PRODUCT_ID_FLAGSENSE_REDUCED=<uuid>
supabase secrets set POLAR_SUCCESS_URL_FLAGSENSE=https://your-flagsense-app-domain.com?payment=success
supabase secrets set ADMIN_EMAILS=pkwelagobe@gmail.com
# Optional backup (Lemon Squeezy):
# supabase secrets set LEMON_SQUEEZY_STORE_ID=...
# supabase secrets set LEMON_SQUEEZY_VARIANT_MONTHLY=...
```

Deploy the functions:

```bash
cd "/Users/imac/Documents/Improve Red Flags Tracker App"
supabase functions deploy create-checkout --project-ref yfghvxjnpwmewpxdorki
supabase functions deploy verify-license --project-ref yfghvxjnpwmewpxdorki
```

**Status:** Both functions are deployed. Set secrets in Dashboard → Edge Functions → each function → Secrets.

(If the project uses a single “server” function that routes to create-checkout and verify-license, deploy that instead and ensure the routes and env are set accordingly.)

## 3.5 Enable anonymous sign-ins (required)

FlagSense uses **Supabase anonymous auth** (so users can buy without creating an account). If this is disabled, checkout/license calls will fail.

In Supabase Dashboard → **Authentication** → **Providers** → **Anonymous**:

- Turn on **Enable anonymous sign-ins**

## 4. Frontend env (Vercel or host)

In your hosting dashboard (e.g. Vercel → Project → Settings → Environment Variables), add:

- `VITE_SUPABASE_URL` = `https://yfghvxjnpwmewpxdorki.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (anon key from Supabase project **API** settings)

Redeploy the frontend so the build picks up these values.

## 5. Test

1. Open the app, go to Upgrade / Premium.
2. Choose a tier (e.g. Monthly); you should be redirected to Polar checkout (not a direct Lemon Squeezy link).
3. Complete or cancel; if success, you should land back with `?payment=success` and the app should refresh license.
4. Use **Restore Previous Purchase** and confirm the app shows premium active after a successful purchase.

## Polar webhook URL (reference)

| Item | Value |
|------|--------|
| Webhook URL | `https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/server/make-server-bb2098ba/billing/polar/webhook` |
| Events | `order.created`, `order.paid` |

Do **not** register a separate webhook for FlagSense; the same URL handles all apps by routing on `product_id`.
