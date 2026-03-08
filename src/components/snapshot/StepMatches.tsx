import { useNavigate } from "react-router-dom";
import { FinderFormData } from "@/types/snapshot";
import { getMatchedSchools } from "@/data/mockSchools";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import SchoolCard from "./SchoolCard";
import { toast } from "@/hooks/use-toast";

interface Props {
  data: FinderFormData;
}

const StepMatches = ({ data }: Props) => {
  const schools = getMatchedSchools(data.preferences.schoolTypes, data.move.city);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartApplication = async (schoolId: string, schoolName: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const { error } = await supabase.from("applications").insert({
      user_id: user.id,
      school_id: schoolId,
      school_name: schoolName,
      status: "started",
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application started!", description: `Tracking ${schoolName} in your dashboard.` });
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Success banner */}
      <div className="flex gap-3 items-center p-4 rounded-xl bg-secondary/10 border border-secondary/30 mb-6">
        <span className="text-xl shrink-0">✅</span>
        <div>
          <p className="text-sm font-semibold text-secondary">
            We found {schools.length} schools matching your profile in {data.move.city || "your city"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sorted by match score · {data.child.age || "your child"}'s age group · {
              data.preferences.schoolTypes.length > 0
                ? data.preferences.schoolTypes.join(", ")
                : "all types"
            }
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {schools.map((school, i) => (
          <SchoolCard
            key={school.id}
            school={school}
            index={i}
            onStartApplication={() => handleStartApplication(school.id, school.name)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-7 p-6 bg-primary/5 border border-primary/15 rounded-2xl text-center">
        <div className="text-xl mb-2">📬</div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
          Want us to manage your applications?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md mx-auto">
          Snapshot can track deadlines, remind you of next steps, help you prepare documents, and liaise with schools on your behalf.
        </p>
        <button
          onClick={() => user ? navigate("/dashboard") : navigate("/auth")}
          className="px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm tracking-wide shadow-md hover:opacity-90 transition-opacity"
        >
          {user ? "Go to Dashboard →" : "Create Free Account & Start Tracking →"}
        </button>
      </div>
    </div>
  );
};

export default StepMatches;
