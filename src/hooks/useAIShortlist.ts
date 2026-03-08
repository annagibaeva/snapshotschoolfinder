import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { School, FinderFormData } from "@/types/snapshot";

interface UseAIShortlistReturn {
  schools: School[];
  loading: boolean;
  error: string | null;
  generateShortlist: (data: FinderFormData, childId?: string) => Promise<void>;
}

export function useAIShortlist(): UseAIShortlistReturn {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateShortlist = async (data: FinderFormData, childId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke("generate-shortlist", {
        body: {
          childProfile: {
            name: data.child.name,
            age: data.child.age,
            languages: data.child.languages,
            specialNeeds: data.child.specialNeeds,
            childId: childId || null,
          },
          moveDetails: {
            country: data.move.country,
            city: data.move.city,
            moveDate: data.move.moveDate,
          },
          preferences: {
            schoolTypes: data.preferences.schoolTypes,
            topPriorities: data.preferences.topPriorities,
            wantApplicationTracking: data.preferences.wantApplicationTracking,
            wantDocumentHelp: data.preferences.wantDocumentHelp,
            wantTimelineBuilding: data.preferences.wantTimelineBuilding,
          },
        },
      });

      if (fnError) throw new Error(fnError.message || "Failed to generate shortlist");

      if (fnData?.error) {
        throw new Error(fnData.error);
      }

      setSchools(fnData.schools || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate recommendations";
      setError(msg);
      console.error("AI shortlist error:", e);
    } finally {
      setLoading(false);
    }
  };

  return { schools, loading, error, generateShortlist };
}
