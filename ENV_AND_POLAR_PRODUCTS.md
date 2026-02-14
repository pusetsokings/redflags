# FlagSense — Where to set .env and Polar product breakdown

## Shared vs app-specific (same Supabase project, same Polar org)

- **Shared:** One Polar org, one webhook URL, one `POLAR_ACCESS_TOKEN`. Other apps (Church Hurt, Prayer and Fasting, etc.) use the same token and webhook; they differ only by **product IDs** and **success URL**.
- **Per-app:** Each app has its own **product IDs** (e.g. `POLAR_PRODUCT_ID_FLAGSENSE_*`), its own **success URL** (so the purchaser is sent back to the right app), and its own **schema** in the database. For FlagSense set `POLAR_SUCCESS_URL_FLAGSENSE=https://your-flagsense.site/?payment=success`; other apps use their own env (e.g. Church Hurt its own URL). That way each app’s success URL differentiates where the buyer lands.
- **Schema keeps data separate:** FlagSense uses **only** the `flagsense` schema (`flagsense.users`, `flagsense.purchases`). The webhook writes FlagSense purchases to `flagsense.*` via `apply_purchase_entitlement_flagsense`. Verify-license for FlagSense reads only from `flagsense.*`. Church Hurt uses `churchhurt.*`, other apps their own schemas. **No mixing of data between apps.**

---

## Configured FlagSense product IDs (Polar)

Use these when setting Supabase Edge Function secrets:

| App product type | Product ID (Polar UUID) | Price |
|------------------|-------------------------|-------|
| monthly | `dceb3099-7c1d-4e4f-8e83-8b30b46098cd` | $9.99 / month |
| annual | `d7cf5001-dfb6-45bc-ad37-ba2aae026918` | $29.99 / year |
| reduced | `e26c8308-5858-4925-9a82-1c353c185a2a` | $4.99 / month |

**In Supabase Secrets the key must be exactly these names** (not "flagsense monthly"): the code reads `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` etc. The **value** is the UUID. In Polar dashboard the product *name* can be "FlagSense Monthly"; in Supabase the secret **name/key** is below.

| Secret name (key) | Value (UUID) |
|-------------------|--------------|
| `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` | `dceb3099-7c1d-4e4f-8e83-8b30b46098cd` |
| `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL` | `d7cf5001-dfb6-45bc-ad37-ba2aae026918` |
| `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED` | `e26c8308-5858-4925-9a82-1c353c185a2a` |

---

## 1. Where to set .env

### Frontend (this repo)

**Folder:** project root — the same folder as `package.json`:

```
Improve Red Flags Tracker App/
  .env          ← create this (or .env.local); do not commit secrets
  .env.example  ← reference only; safe to commit
  package.json
  src/
  ...
```

**Contents to put in `.env` (when using Supabase + Polar):**

```env
VITE_SUPABASE_URL=https://yfghvxjnpwmewpxdorki.supabase.co
VITE_SUPABASE_ANON_KEY=<paste anon key from Supabase Dashboard → Project → API>
```

Optional (only if you want the old Lemon Squeezy path when Supabase is not set):

```env
VITE_LEMONSQUEEZY_STORE_ID=your_store_id
VITE_LEMONSQUEEZY_VARIANT_MONTHLY=variant_uuid
VITE_LEMONSQUEEZY_VARIANT_ANNUAL=variant_uuid
VITE_LEMONSQUEEZY_VARIANT_REDUCED=variant_uuid
```

You can copy from `.env.example` and fill in real values.

---

### Backend (Supabase Edge Functions)

**No `.env` file in the repo** for Edge Functions. Set variables in Supabase:

- **Dashboard:** Project → Edge Functions → select function → **Secrets**
- **Or CLI:** `supabase secrets set NAME=value`

**List of secrets to set:**

| Secret | Example / description |
|--------|------------------------|
| `PRIMARY_PROVIDER` | `polar` (default) |
| `POLAR_ACCESS_TOKEN` | **Shared** – same token as other apps in the org (already set) |
| `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` | UUID for FlagSense monthly (see table above) |
| `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL` | UUID for FlagSense annual |
| `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED` | UUID for FlagSense reduced |
| `POLAR_SUCCESS_URL_FLAGSENSE` | **FlagSense-only** – e.g. `https://your-flagsense.site/?payment=success` (so the purchaser is redirected to FlagSense; other apps use their own success URL) |
| `ADMIN_EMAILS` | e.g. `pkwelagobe@gmail.com` (comma-separated; these get premium without purchase) |
| `LEMON_SQUEEZY_STORE_ID` | Only if backup: Lemon Squeezy store ID |
| `LEMON_SQUEEZY_VARIANT_*` | Only if backup |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are usually set automatically by Supabase for Edge Functions.

### Required: enable anonymous sign-ins (FlagSense auth model)

FlagSense uses **Supabase anonymous auth**. In Supabase Dashboard → **Authentication** → **Providers** → **Anonymous**:

- Enable **anonymous sign-ins**

**Do not paste your Polar token (or any secret) into Supabase AI or any chat.** Set `POLAR_ACCESS_TOKEN` yourself in Supabase Dashboard → Project → Edge Functions → Secrets (or via `supabase secrets set POLAR_ACCESS_TOKEN=...`). Exposing tokens in AI or in messages can leak them.

---

## 2. Product breakdown for Polar

Create **three products** in Polar so the app can sell monthly, annual, and reduced tiers. Use the IDs from Polar in the Edge Function secrets above.

| App product type | ID in code | Display name (suggested in Polar) | Price (suggested) | Billing |
|------------------|------------|------------------------------------|-------------------|--------|
| **monthly** | `monthly` | FlagSense Premium Monthly | $4.99 | Monthly |
| **annual** | `annual` | FlagSense Premium Annual | $29.99 | Yearly |
| **reduced** | `reduced` | FlagSense Premium (Financial Hardship) | $1.99 | Monthly |

**Steps in Polar:**

1. Create a product (e.g. “FlagSense Premium Monthly”), set price $4.99, billing monthly → copy the **product ID** (UUID) → set as `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY`.
2. Create “FlagSense Premium Annual”, $29.99, billing yearly → product ID → `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL`.
3. Create “FlagSense Premium (Financial Hardship)”, $1.99, billing monthly → product ID → `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED`.

The shared webhook maps each Polar `product_id` to one of `monthly` / `annual` / `reduced` and calls `apply_purchase_entitlement_flagsense` with that `productType` (see `SHARED_WEBHOOK_FLAGSENSE_INTEGRATION.md`).

**Summary table (copy when creating in Polar):**

| Product type | Name in Polar dashboard | Price | Supabase secret **key** (exact) |
|--------------|-------------------------|-------|----------------------------------|
| Monthly | FlagSense Monthly (or “FlagSense Premium Monthly”) | $9.99 / month | `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` |
| Annual | FlagSense Annual (or “FlagSense Yearly”) | $29.99 / year | `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL` |
| Reduced | FlagSense Reduced | $4.99 / month | `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED` |

If you created secrets with a different **name** (e.g. “flagsense monthly”), the Edge Function will not see them. Create new secrets with the **exact** keys above; the **value** is the product UUID from Polar.
