# FlagSense — Payment & App Analysis (Phase 1)

## 1. Current payment flow

- **Where users pay:** Single entry point — **Upgrade Modal** (`src/components/UpgradeModal.tsx`). User clicks a pricing tier (Monthly, Annual, Financial Hardship).
- **What happens:** `handlePurchase(tier)` gets the Lemon Squeezy variant ID from `PRODUCT_VARIANTS` (env: `VITE_LEMONSQUEEZY_VARIANT_*`), calls `createCheckout(variantId)` from `src/lib/payments.ts`, then `window.open(checkoutUrl)`.
- **Checkout URL:** Built entirely client-side: `https://${storeId}.lemonsqueezy.com/checkout/buy/${variantId}`. No backend; no server-side checkout session.
- **Restore purchases:** Button in Upgrade Modal calls `getSubscription()` which reads **localStorage** only (`subscription_data`). No server verification.

## 2. Current license / access checks

- **Premium determination:** Client-only. `isPremium()` and `hasPremiumFeature(feature)` in `src/lib/payments.ts` read from localStorage (`subscription_data`). No API call.
- **Where premium is used:**
  - **Chat** (`src/components/Chat.tsx`): `enhancedAI` from `getSetting('enhancedAI', false)` gates enhanced AI behavior.
  - **Settings** (`src/components/SettingsPanel.tsx`): Toggle for “enhanced AI” persisted as `enhancedAI` in storage.
  - **hybridAICounselor** (`src/lib/hybridAICounselor.ts`): Uses `getSetting('enhancedAI', false)` for Cohere usage.
- **No subdomains, marketplace, or `?app=...` URLs** in this app. Single SPA; premium = “enhanced AI” and any feature gated by `hasPremiumFeature` / `isPremium`.

## 3. Gaps

- **Payment bypass:** Primary flow uses a **direct Lemon Squeezy buy link**. No backend checkout endpoint; no Polar.
- **License bypass:** Any user can set `subscription_data` or `enhancedAI` in localStorage and get premium. No backend verify-license; no server-side check.
- **No admin bypass:** No concept of admin (e.g. by email); no backend that grants license for specific users.
- **Restore purchases:** Only reads local state; does not call a backend to verify entitlement.

## 4. Product list

| Product type | Current (Lemon Squeezy) | Polar (target) |
|--------------|--------------------------|----------------|
| Monthly | `VITE_LEMONSQUEEZY_VARIANT_MONTHLY` | Create in Polar → set `POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY` |
| Annual | `VITE_LEMONSQUEEZY_VARIANT_ANNUAL` | Create in Polar → set `POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL` |
| Reduced (Financial Hardship) | `VITE_LEMONSQUEEZY_VARIANT_REDUCED` | Create in Polar → set `POLAR_PRODUCT_ID_FLAGSENSE_REDUCED` |

No donations or institutional products in this app. All purchasable items are subscription tiers above.

## 5. Admin

- **Current:** Not defined. No admin list or `isAdmin` in the codebase.
- **Target:** Backend **verify-license** (or equivalent) will treat certain emails as premium (e.g. `ADMIN_EMAILS=pkwelagobe@gmail.com`). License API returns `hasLicense: true` for those users so they can use premium without purchase.

---

## Summary for Phase 2

- Add **backend checkout** (Supabase Edge Functions): Polar primary (product map: monthly / annual / reduced → Polar product IDs), Lemon Squeezy backup when `PRIMARY_PROVIDER=lemon_squeezy`.
- Add **verify-license** endpoint that reads from `flagsense.*` (and admin list) and returns `hasLicense`.
- **Frontend:** Supabase anonymous auth; all “Upgrade” actions call backend checkout and redirect to returned `checkoutUrl`; premium gating and “enhanced AI” driven by verify-license result (no direct LS/Polar link for primary flow; no premium from localStorage alone).
- **Shared Polar webhook:** Add FlagSense product IDs and `applyFlagSenseEntitlement` (RPC `apply_purchase_entitlement_flagsense`) so purchases write only to `flagsense.users` and `flagsense.purchases`.
