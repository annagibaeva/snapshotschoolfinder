import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    // 1. Check for applications with approaching deadlines (from mock data)
    // In production, you'd have deadline data in the DB
    
    // 2. Check for incomplete applications (started but not submitted, older than 3 days)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const { data: incompleteApps } = await supabase
      .from("applications")
      .select("*")
      .eq("status", "started")
      .lt("created_at", threeDaysAgo);

    if (incompleteApps && incompleteApps.length > 0) {
      for (const app of incompleteApps) {
        // Check if reminder already exists
        const { data: existing } = await supabase
          .from("reminders")
          .select("id")
          .eq("application_id", app.id)
          .eq("type", "incomplete_application")
          .eq("is_sent", false)
          .single();

        if (!existing) {
          await supabase.from("reminders").insert({
            user_id: app.user_id,
            application_id: app.id,
            type: "incomplete_application",
            title: `Incomplete: ${app.school_name}`,
            message: `Your application to ${app.school_name} was started but hasn't been submitted yet. Don't miss out!`,
            remind_at: now.toISOString(),
            is_sent: true,
          });
        }
      }
    }

    // 3. Auto-create deadline reminders for applications
    const { data: allApps } = await supabase
      .from("applications")
      .select("*")
      .in("status", ["saved", "started"]);

    if (allApps) {
      for (const app of allApps) {
        // Check if a deadline reminder already exists
        const { data: existingDeadline } = await supabase
          .from("reminders")
          .select("id")
          .eq("application_id", app.id)
          .eq("type", "deadline_approaching")
          .single();

        if (!existingDeadline) {
          // Create a reminder for 2 weeks from now as a generic deadline prompt
          const reminderDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
          await supabase.from("reminders").insert({
            user_id: app.user_id,
            application_id: app.id,
            type: "deadline_approaching",
            title: `Deadline reminder: ${app.school_name}`,
            message: `Check the application deadline for ${app.school_name} and make sure you're on track.`,
            remind_at: reminderDate.toISOString(),
          });
        }
      }
    }

    return new Response(JSON.stringify({ success: true, processed: (incompleteApps?.length || 0) + (allApps?.length || 0) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("check-reminders error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
