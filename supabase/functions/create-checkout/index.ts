// create-checkout: Polar (primary) or Lemon Squeezy (backup). FlagSense product map: monthly, annual, reduced.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Prefer FlagSense-specific provider so we don't affect other apps in the same project.
const PRIMARY_PROVIDER = (Deno.env.get("PRIMARY_PROVIDER_FLAGSENSE") || Deno.env.get("PRIMARY_PROVIDER") || "polar").toLowerCase();
const POLAR_ACCESS_TOKEN = Deno.env.get("POLAR_ACCESS_TOKEN") || "";
const POLAR_PRODUCT_ID_MONTHLY = Deno.env.get("POLAR_PRODUCT_ID_FLAGSENSE_MONTHLY") || "";
const POLAR_PRODUCT_ID_ANNUAL = Deno.env.get("POLAR_PRODUCT_ID_FLAGSENSE_ANNUAL") || "";
const POLAR_PRODUCT_ID_REDUCED = Deno.env.get("POLAR_PRODUCT_ID_FLAGSENSE_REDUCED") || "";
// FlagSense-specific success URL (so other apps can keep their own POLAR_SUCCESS_URL)
const POLAR_SUCCESS_URL_FLAGSENSE = Deno.env.get("POLAR_SUCCESS_URL_FLAGSENSE") || "";
const POLAR_SUCCESS_URL = Deno.env.get("POLAR_SUCCESS_URL") || "";
const LEMON_SQUEEZY_STORE_ID = Deno.env.get("LEMON_SQUEEZY_STORE_ID") || "";
const LEMON_SQUEEZY_VARIANT_MONTHLY = Deno.env.get("LEMON_SQUEEZY_VARIANT_MONTHLY") || "";
const LEMON_SQUEEZY_VARIANT_ANNUAL = Deno.env.get("LEMON_SQUEEZY_VARIANT_ANNUAL") || "";
const LEMON_SQUEEZY_VARIANT_REDUCED = Deno.env.get("LEMON_SQUEEZY_VARIANT_REDUCED") || "";

function getPolarProductId(productType: string): string | null {
  switch (productType) {
    case "monthly": return POLAR_PRODUCT_ID_MONTHLY || null;
    case "annual": return POLAR_PRODUCT_ID_ANNUAL || null;
    case "reduced": return POLAR_PRODUCT_ID_REDUCED || null;
    default: return POLAR_PRODUCT_ID_MONTHLY || null;
  }
}

function getLemonSqueezyVariantId(productType: string): string | null {
  switch (productType) {
    case "monthly": return LEMON_SQUEEZY_VARIANT_MONTHLY || null;
    case "annual": return LEMON_SQUEEZY_VARIANT_ANNUAL || null;
    case "reduced": return LEMON_SQUEEZY_VARIANT_REDUCED || null;
    default: return LEMON_SQUEEZY_VARIANT_MONTHLY || null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { productType = "monthly", userId, userEmail, successUrl, cancelUrl } = body;
    const uid = userId || user.id;
    // Prefer request body, then FlagSense-specific URL, then shared fallback
    const success = successUrl || POLAR_SUCCESS_URL_FLAGSENSE || POLAR_SUCCESS_URL || "";
    const returnUrl = cancelUrl || "";

    if (PRIMARY_PROVIDER === "polar") {
      const productId = getPolarProductId(productType);
      if (!POLAR_ACCESS_TOKEN || !productId) {
        return new Response(
          JSON.stringify({ error: "Polar not configured for this product" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const res = await fetch("https://api.polar.sh/v1/checkouts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${POLAR_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: [productId],
          success_url: success,
          return_url: returnUrl,
          external_customer_id: uid,
          ...(userEmail && { customer_email: userEmail }),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return new Response(JSON.stringify({ error: data.detail || "Polar failed", raw: data }), {
          status: res.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const checkoutUrl = data.url ?? data.checkout?.url;
      if (!checkoutUrl) {
        return new Response(JSON.stringify({ error: "No checkout URL" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ checkoutUrl, provider: "polar" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (PRIMARY_PROVIDER === "lemon_squeezy") {
      const variantId = getLemonSqueezyVariantId(productType);
      if (!LEMON_SQUEEZY_STORE_ID || !variantId) {
        return new Response(JSON.stringify({ error: "Lemon Squeezy not configured for this product" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const checkoutUrl = new URL(`https://${LEMON_SQUEEZY_STORE_ID}.lemonsqueezy.com/checkout/buy/${variantId}`);
      if (userEmail) checkoutUrl.searchParams.set("email", userEmail);
      checkoutUrl.searchParams.set("embed", "1");
      checkoutUrl.searchParams.set("media", "0");
      if (success) checkoutUrl.searchParams.set("checkout[success_url]", success);
      if (returnUrl) checkoutUrl.searchParams.set("checkout[redirect_url]", returnUrl);
      return new Response(JSON.stringify({ checkoutUrl: checkoutUrl.toString(), provider: "lemonsqueezy" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown provider" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
