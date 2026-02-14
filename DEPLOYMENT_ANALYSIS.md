# FlagSense Polar integration — deployment analysis

## 1. What’s in this repo (complete)

| Area | Status | Notes |
|------|--------|--------|
| **Frontend** | Complete | LicenseProvider, `startCheckout` / `verifyLicense`, UpgradeModal uses backend when `VITE_SUPABASE_*` set; `hybridAICounselor` gates on `getCachedLicense()` when Supabase configured; no direct Polar/LS link for primary flow. |
| **Env** | Set | `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (Kings-Arms-Org). |
| **Edge Functions** | Code complete | `create-checkout` (Polar primary, product map, `POLAR_SUCCESS_URL_FLAGSENSE`), `verify-license` (flagsense schema + `ADMIN_EMAILS`). |
| **Migrations** | Complete | `20250125000000_flagsense_schema.sql` (base), `20250125100000_flagsense_admins_analytics.sql` (admins + views). |
| **Docs** | Complete | `FLAGSENSE_SCHEMA.md`, `ENV_AND_POLAR_PRODUCTS.md`, `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`, `PAYMENT_AND_WEBHOOKS_STATUS.md`, `DEPLOY_FINISH.md`. |

## 2. What’s outside this repo (you must do)

| Item | Where | Action |
|------|--------|--------|
| **Shared Polar webhook** | Repo that owns `billing/polar/webhook` (e.g. Kings-Arms-Org server) | Add FlagSense product ID set, `isFlagSenseProduct()`, branch that calls `apply_purchase_entitlement_flagsense`. See `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`. |
| **Supabase Edge Function secrets** | Supabase Dashboard → Project → Edge Functions → Secrets | Set: `PRIMARY_PROVIDER`, `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID_FLAGSENSE_*`, `POLAR_SUCCESS_URL_FLAGSENSE`, `ADMIN_EMAILS`. Do not paste tokens into AI/chat. |
| **Database** | Already done | You ran base schema + admins + analytics in SQL Editor; migrations in repo match. |
| **Frontend host** | Vercel / your host | Set env vars `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` and deploy (e.g. push to main or `vercel deploy`). |

## 3. Flow check

- **Upgrade (Polar):** User clicks tier → frontend calls `POST /functions/v1/create-checkout` with Bearer token → Edge Function uses Polar product IDs and `POLAR_SUCCESS_URL_FLAGSENSE` → returns `checkoutUrl` → frontend redirects. No direct Polar link.
- **After payment:** Polar sends webhook to shared URL → shared handler must route FlagSense product IDs to `apply_purchase_entitlement_flagsense` (not in this repo).
- **License:** Frontend calls `POST /functions/v1/verify-license` with Bearer token → reads `flagsense.users` / `flagsense.purchases` + `ADMIN_EMAILS` → returns `hasLicense`; Enhanced AI and premium gating use this (and cache).
- **Schema:** All FlagSense data in `flagsense.*` only; no mixing with other apps.

## 4. Gaps / risks

- **Shared webhook:** Until the handler in the other repo adds the FlagSense branch, Polar payments for FlagSense will not write to `flagsense.*`. Add the branch per `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`.
- **Anonymous auth:** Edge Functions use `supabase.auth.getUser(token)`. Ensure anonymous sign-ins are enabled in Supabase Dashboard → Authentication → Providers if you use anon users.
- **CORS:** `_shared/cors.ts` allows `*`; fine for public frontend. Restrict in production if you use a strict allow-list.

## 5. Deploy order

1. **Database:** Already applied (base + admins + analytics).
2. **Secrets:** Set in Supabase for the project (create-checkout and verify-license use them).
3. **Edge Functions:** Deploy from this repo: `supabase link --project-ref yfghvxjnpwmewpxdorki` then `supabase functions deploy create-checkout` and `supabase functions deploy verify-license`.
4. **Shared webhook:** Add FlagSense branch in the repo that owns the webhook URL.
5. **Frontend:** Deploy to Vercel (or host) with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set.
6. **Test:** Open app → Upgrade → choose tier → complete or cancel Polar checkout; after success, Restore and confirm premium.

## 6. Summary

All code and migrations for FlagSense Polar integration in this repo are complete. Data is isolated in `flagsense.*`; success URL is app-specific via `POLAR_SUCCESS_URL_FLAGSENSE`.

---

## 7. Deploy completed (from this repo)

- **Production build:** `npm run build` — succeeded; output in `dist/`.
- **Edge Functions (Supabase):** Deployed to project `yfghvxjnpwmewpxdorki`:
  - **create-checkout** — live at `https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/create-checkout`
  - **verify-license** — live at `https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/verify-license`
- **You still need to:**
  1. **Set Edge Function secrets** in [Supabase Dashboard](https://supabase.com/dashboard/project/yfghvxjnpwmewpxdorki/functions) for both functions: `PRIMARY_PROVIDER`, `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY`, `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL`, `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED`, `POLAR_SUCCESS_URL_FLAGSENSE`, `ADMIN_EMAILS`.
  2. **Add FlagSense branch** to the shared Polar webhook handler (in the repo that owns the webhook URL); see `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`.
  3. **Deploy frontend** (e.g. Vercel) with env `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then trigger a new deployment so the app uses the Edge Functions.
  4. **Test:** Open app → Upgrade → pick a tier → complete or cancel checkout; use Restore after a successful purchase.
