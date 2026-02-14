# FlagSense (Red Flags Tracker) — Shared Polar Webhook Integration

**Same Polar org, same Supabase project (Kings-Arms-Org).** Use the **existing** Prayer and Fasting webhook URL; extend the handler to route FlagSense product IDs to FlagSense storage.

---

## 1. Webhook URL (no change)

**Polar Dashboard → Webhooks** — keep using:

```
https://yfghvxjnpwmewpxdorki.supabase.co/functions/v1/server/make-server-bb2098ba/billing/polar/webhook
```

Do **not** register a second webhook for FlagSense. The same URL will handle both apps by routing on `product_id`.

---

## 2. FlagSense product IDs (Polar)

| App | Product type | Product ID (Polar) | Price |
|-----|--------------|--------------------|-------|
| FlagSense | monthly | `dceb3099-7c1d-4e4f-8e83-8b30b46098cd` | $9.99 / month |
| FlagSense | annual | `d7cf5001-dfb6-45bc-ad37-ba2aae026918` | $29.99 / year |
| FlagSense | reduced | `e26c8308-5858-4925-9a82-1c353c185a2a` | $4.99 / month |

Set these UUIDs in the shared webhook handler env (or in the handler’s product-ID set) so the webhook can route FlagSense purchases to `apply_purchase_entitlement_flagsense`.

---

## 3. What to add in the shared webhook handler

In the **server** Edge Function that handles `billing/polar/webhook` (e.g. in `supabase/functions/server/index.ts` or wherever the Polar webhook is handled):

### 3.1 Product ID set for FlagSense

```ts
// FlagSense / Red Flags Tracker (same Polar org, same Supabase project)
const FLAGSENSE_POLAR_PRODUCT_IDS = new Set([
  process.env.POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY || "",
  process.env.POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL || "",
  process.env.POLAR_PRODUCT_ID_FLAGSENSE_REDUCED || "",
].filter(Boolean));

function isFlagSenseProduct(productId: string | undefined): boolean {
  return !!productId && FLAGSENSE_POLAR_PRODUCT_IDS.has(productId);
}
```

### 3.2 Map Polar product_id → app product type

```ts
function flagsensePolarProductToType(productId: string): string {
  if (productId === process.env.POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL) return "annual";
  if (productId === process.env.POLAR_PRODUCT_ID_FLAGSENSE_REDUCED) return "reduced";
  return "monthly"; // default
}
```

### 3.3 After you parse the Polar payload and have `userId`, `productId`, `orderId`, `amount`:

Add a branch **before** or **after** your existing Prayer and Fasting (and other apps) routing:

```ts
// In your existing Polar webhook handler, after Svix verify and you have:
// - userId = data.customer?.external_id ?? data.customer_id
// - productId = data.product_id ?? data.product?.id
// - orderId = data.id
// - amount = data.total_amount ?? 0

if (isFlagSenseProduct(productId)) {
  const productType = flagsensePolarProductToType(productId);
  await applyFlagSenseEntitlement(userId, orderId, amount, productType);
  return new Response("ok", { status: 200 });
}

// ... existing routing for Prayer and Fasting, Church Hurt, etc.
```

### 3.4 Implement `applyFlagSenseEntitlement`

FlagSense data is stored **in its own schema** `flagsense` so it stays separate from other apps. Use the RPC **`apply_purchase_entitlement_flagsense`** (writes only to `flagsense.users` and `flagsense.purchases`):

```ts
async function applyFlagSenseEntitlement(
  userId: string,
  orderId: string,
  amountCents: number,
  productType: string
): Promise<void> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { error } = await supabase.rpc("apply_purchase_entitlement_flagsense", {
    p_user_id: userId,
    p_product_id: productType,
    p_order_id: String(orderId),
    p_amount: amountCents,
    p_status: "paid",
    p_payment_provider: "polar",
  });
  if (error) throw error;
}
```

**Important:** `userId` must be the **Supabase user ID** (same as `external_customer_id` passed when creating the FlagSense checkout). The FlagSense app uses anonymous auth and passes that ID to Polar checkout, so the webhook receives it in `data.customer.external_id`.

---

## 4. Database (same Supabase project, app-scoped schema)

FlagSense uses schema **`flagsense`** so data is separate from other apps. Ensure the **Kings-Arms-Org** project has the FlagSense schema and RPC:

- Either run: `supabase link --project-ref yfghvxjnpwmewpxdorki` then `supabase db push` from this repo,
- Or paste and run the contents of **`supabase/migrations/YYYYMMDD_flagsense_schema.sql`** in **Supabase Dashboard → SQL Editor** for project `yfghvxjnpwmewpxdorki`.

That creates:

- **Schema:** `flagsense`
- **Tables:** `flagsense.users`, `flagsense.purchases`
- **RPC:** `public.apply_purchase_entitlement_flagsense` (writes only to `flagsense.*`)

---

## 5. FlagSense app config (this repo)

- **Polar:** Primary provider. Product IDs for monthly, annual, reduced created in Polar and set in env.
- **Create-checkout (Edge Function):** Set env in Supabase (or in the shared server if checkout lives there):
  - `PRIMARY_PROVIDER=polar`
  - `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY=<uuid>`
  - `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL=<uuid>`
  - `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED=<uuid>`
- **Verify-license (Edge Function):** Set `ADMIN_EMAILS=pkwelagobe@gmail.com` so that email gets premium without purchase.
- **Frontend (Vercel):**
  - `VITE_SUPABASE_URL=https://yfghvxjnpwmewpxdorki.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=<anon key for yfghvxjnpwmewpxdorki>`

No separate Polar webhook URL is set in the FlagSense app; Polar sends all events to the shared webhook URL above.

---

## 6. Summary

| Item | Value |
|------|--------|
| Supabase project | `yfghvxjnpwmewpxdorki` (Kings-Arms-Org) |
| Polar webhook URL | Same as Prayer and Fasting (shared) |
| FlagSense product IDs | Monthly, Annual, Reduced (create in Polar, set in env) |
| FlagSense storage | **Schema `flagsense`:** `flagsense.users`, `flagsense.purchases` (separate from other apps). RPC: `apply_purchase_entitlement_flagsense`. |
| Admin email | `pkwelagobe@gmail.com` |

Once the shared webhook handler includes the FlagSense product ID check and `applyFlagSenseEntitlement`, FlagSense purchases from Polar will be written only to `flagsense.*`. The FlagSense app’s **verify-license** reads only from `flagsense.*`, so analytics and data stay per-app.
