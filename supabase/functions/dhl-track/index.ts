import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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

    const username = Deno.env.get("DHL_USERNAME");
    const password = Deno.env.get("DHL_PASSWORD");

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "DHL credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const credentials = btoa(`${username}:${password}`);

    const response = await fetch(
      `https://express.api.dhl.com/mydhlapi/test/tracking?shipmentTrackingNumber=${encodeURIComponent(trackingNumber)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to track shipment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
