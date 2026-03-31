import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { trackingNumber } = await req.json();

    if (!trackingNumber || typeof trackingNumber !== "string") {
      return new Response(
        JSON.stringify({ error: "trackingNumber is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("DHL_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "DHL API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dhlUrl = `https://api.dhl.com/track/shipments?trackingNumber=${encodeURIComponent(trackingNumber)}`;

    const dhlResponse = await fetch(dhlUrl, {
      headers: {
        "DHL-API-Key": apiKey,
      },
    });

    const data = await dhlResponse.json();

    return new Response(JSON.stringify(data), {
      status: dhlResponse.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to track shipment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
