import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { childProfile, moveDetails, preferences } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert international school advisor for expat families. Given a family's profile, generate a personalized shortlist of 5-8 real or realistic schools that match their needs.

For each school, return structured data using the suggest_schools tool. Consider:
- The child's age, languages, and any special needs
- The destination city and country
- School type preferences (international, local, montessori, etc.)
- Top priorities (academic excellence, wellbeing, language support, etc.)
- Move date and application deadlines
- Tuition affordability and location convenience

Provide realistic school names, accurate curriculum types, and helpful application tips. Match scores should reflect how well each school fits the family's specific profile.`;

    const userPrompt = `Family Profile:
- Moving to: ${moveDetails.city}, ${moveDetails.country}
- Move date: ${moveDetails.moveDate || "Not specified"}
- Child's name: ${childProfile.name || "Not specified"}
- Child's age: ${childProfile.age}
- Languages at home: ${childProfile.languages || "Not specified"}
- Special needs: ${childProfile.specialNeeds || "None"}
- School types wanted: ${preferences.schoolTypes.join(", ") || "Any"}
- Top priorities: ${preferences.topPriorities.join(", ") || "Not specified"}
- Wants application tracking: ${preferences.wantApplicationTracking}
- Wants document help: ${preferences.wantDocumentHelp}
- Wants timeline building: ${preferences.wantTimelineBuilding}

Generate a personalized school shortlist for this family.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_schools",
              description: "Return a shortlist of recommended schools for the family",
              parameters: {
                type: "object",
                properties: {
                  schools: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", description: "School name" },
                        type: { type: "string", description: "e.g. International · IB, Montessori · Private" },
                        curriculum: { type: "string", description: "e.g. IB, British, Montessori" },
                        location: { type: "string", description: "Specific area/district" },
                        ageRange: { type: "string", description: "e.g. 3-18" },
                        matchScore: { type: "number", description: "0-100 match percentage" },
                        highlights: { type: "array", items: { type: "string" }, description: "3-4 key highlights" },
                        tuitionRange: { type: "string", description: "Annual or monthly tuition range" },
                        lang: { type: "string", description: "Language of instruction" },
                        deadline: { type: "string", description: "Application deadline" },
                        tip: { type: "string", description: "Personalized application tip for this family" },
                        applicationSteps: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              description: { type: "string" },
                              timeline: { type: "string" },
                            },
                            required: ["title", "description", "timeline"],
                          },
                        },
                      },
                      required: ["name", "type", "curriculum", "location", "ageRange", "matchScore", "highlights", "tuitionRange", "lang", "deadline", "tip", "applicationSteps"],
                    },
                  },
                },
                required: ["schools"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_schools" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits required. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const schools = JSON.parse(toolCall.function.arguments);
    
    // Add generated IDs and colors to each school
    const hueOptions = [16, 142, 199, 85, 270, 350, 210, 28];
    const enrichedSchools = schools.schools.map((school: any, i: number) => ({
      ...school,
      id: `ai-${crypto.randomUUID().slice(0, 8)}`,
      color: `${hueOptions[i % hueOptions.length]} 50% 45%`,
    }));

    // Cache in DB
    const childId = childProfile.childId || null;
    if (childId) {
      await supabase.from("ai_recommendations").upsert({
        user_id: user.id,
        child_id: childId,
        recommendations: enrichedSchools,
        prompt_summary: `${moveDetails.city}, ${moveDetails.country} | ${childProfile.age} | ${preferences.schoolTypes.join(", ")}`,
      }, { onConflict: "child_id" });
    }

    return new Response(JSON.stringify({ schools: enrichedSchools }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-shortlist error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
