import { useState } from "react";
import { FinderFormData } from "@/types/snapshot";
import ProgressBar from "@/components/snapshot/ProgressBar";
import StepYourMove from "@/components/snapshot/StepYourMove";
import StepChildProfile from "@/components/snapshot/StepChildProfile";
import StepPreferences from "@/components/snapshot/StepPreferences";
import StepMatches from "@/components/snapshot/StepMatches";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const initialData: FinderFormData = {
  move: { country: "", city: "", moveDate: "" },
  child: { name: "", age: "", yearGroup: "", languages: [], hasSpecialNeeds: false, specialNeedsDetails: "" },
  preferences: { schoolTypes: [], topPriorities: [], wantApplicationTracking: true, wantDocumentHelp: true, wantTimelineBuilding: false },
};

const Finder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FinderFormData>(initialData);

  const canProceed = () => {
    switch (step) {
      case 0: return data.move.country.trim() !== "" && data.move.city.trim() !== "";
      case 1: return data.child.age.trim() !== "";
      case 2: return data.preferences.schoolTypes.length > 0;
      default: return true;
    }
  };

  const next = () => step < 3 && canProceed() && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-semibold text-foreground tracking-tight">
            Snapshot
          </a>
          <span className="text-xs text-muted-foreground">Step {step + 1} of 4</span>
        </div>
      </header>

      <main className="container max-w-4xl py-8 md:py-12 px-4">
        <ProgressBar currentStep={step} />

        <div key={step} className="min-h-[400px]">
          {step === 0 && (
            <StepYourMove data={data.move} onChange={(move) => setData({ ...data, move })} />
          )}
          {step === 1 && (
            <StepChildProfile data={data.child} onChange={(child) => setData({ ...data, child })} />
          )}
          {step === 2 && (
            <StepPreferences data={data.preferences} onChange={(preferences) => setData({ ...data, preferences })} />
          )}
          {step === 3 && <StepMatches data={data} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 max-w-md mx-auto">
          {step > 0 ? (
            <Button variant="ghost" onClick={prev} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}
          {step < 3 && (
            <Button
              onClick={next}
              disabled={!canProceed()}
              className="gap-2 rounded-full px-6"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Finder;
