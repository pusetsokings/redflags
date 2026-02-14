// verify-license: returns hasLicense from Supabase flagsense schema. Admin bypass via ADMIN_EMAILS.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const ADMIN_EMAILS = (Deno.env.get("ADMIN_EMAILS") || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return new Response(
        JSON.stringify({ hasLicense: false, userType: "free", error: "Missing Authorization" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ hasLicense: false, userType: "free", error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userId = user.id;
    const email = (user.email || "").toLowerCase();

    if (ADMIN_EMAILS.length && email && ADMIN_EMAILS.includes(email)) {
      return new Response(JSON.stringify({ hasLicense: true, userType: "premium" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: row } = await supabase.schema("flagsense").from("users").select("user_type, is_admin").eq("id", userId).maybeSingle();
    if (row?.is_admin) {
      return new Response(JSON.stringify({ hasLicense: true, userType: "premium" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (row?.user_type === "premium") {
      return new Response(JSON.stringify({ hasLicense: true, userType: "premium" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: purchases } = await supabase.schema("flagsense").from("purchases").select("id").eq("user_id", userId).limit(1);
    if (purchases && purchases.length > 0) {
      return new Response(JSON.stringify({ hasLicense: true, userType: "premium" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ hasLicense: false, userType: "free" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ hasLicense: false, userType: "free", error: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
