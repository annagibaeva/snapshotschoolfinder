import { FinderFormData } from "@/types/snapshot";
import { getMatchedSchools } from "@/data/mockSchools";
import SchoolCard from "./SchoolCard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props {
  data: FinderFormData;
}

const StepMatches = ({ data }: Props) => {
  const schools = getMatchedSchools(data.preferences.schoolTypes, data.child.age);

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
          {data.child.name ? `Schools for ${data.child.name}` : "Your matched schools"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Based on your preferences, here are the best options in{" "}
          {data.move.city || "your area"}. Expand any card to see the full application journey.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {schools.map((school, i) => (
          <SchoolCard key={school.id} school={school} index={i} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Button size="lg" className="h-13 px-8 text-base font-medium rounded-full shadow-md">
          Create your free account to save & track
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          No credit card required. Save your matches and track applications.
        </p>
      </div>
    </div>
  );
};

export default StepMatches;
