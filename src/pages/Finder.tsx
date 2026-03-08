import { useState } from "react";
import { FinderFormData } from "@/types/snapshot";
import ProgressBar from "@/components/snapshot/ProgressBar";
import StepYourMove from "@/components/snapshot/StepYourMove";
import StepChildProfile from "@/components/snapshot/StepChildProfile";
import StepPreferences from "@/components/snapshot/StepPreferences";
import StepMatches from "@/components/snapshot/StepMatches";
import { cn } from "@/lib/utils";

const initialData: FinderFormData = {
  move: { country: "", city: "", moveDate: "" },
  child: { name: "", age: "", languages: "", specialNeeds: "" },
  preferences: { schoolTypes: [], topPriorities: [], wantApplicationTracking: true, wantDocumentHelp: true, wantTimelineBuilding: true },
};

const stepHeaders = [
  { title: "Where are you moving?", sub: "Let's start with your destination" },
  { title: "Tell us about your child", sub: "Help us understand your child's needs" },
  { title: "What matters most to you?", sub: "We'll use this to rank and filter schools" },
  { title: "Your personalised school matches", sub: "Based on your profile — sorted by best fit" },
];

const Finder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FinderFormData>(initialData);
  const [loading, setLoading] = useState(false);

  const canProceed = () => {
    switch (step) {
      case 0: return data.move.city.trim() !== "" && data.move.country.trim() !== "";
      case 1: return data.child.age !== "";
      case 2: return data.preferences.schoolTypes.length > 0;
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-lg">
              📸
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-foreground leading-none">Snapshot</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">School Finder</div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">For expat families</span>
            <button className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10 md:py-12">
        {/* Hero - only on step 0 */}
        {step === 0 && (
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary tracking-wide mb-5">
              ✨ School search made simple for expat families
            </span>
            <h1 className="font-serif text-3xl md:text-[42px] font-bold text-foreground leading-tight mb-4">
              Find the right school<br />in your new home
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
              Moving abroad with children? Snapshot guides you through finding the perfect school — from first search to confirmed place.
            </p>
            <div className="flex justify-center gap-6 mt-7 flex-wrap">
              {["🏫 500+ schools indexed", "📋 Step-by-step applications", "⏰ Deadline tracking"].map((t) => (
                <span key={t} className="text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-background rounded-2xl border border-border shadow-lg overflow-hidden">
          {/* Dark card header */}
          <div className="bg-gradient-to-br from-foreground to-foreground/80 px-6 md:px-8 py-6">
            <ProgressBar currentStep={step} variant="dark" />
            <h2 className="font-serif text-xl md:text-[22px] font-semibold text-primary-foreground mt-2">
              {stepHeaders[step].title}
            </h2>
            <p className="text-sm text-primary-foreground/60 mt-1">
              {stepHeaders[step].sub}
            </p>
          </div>

          {/* Card body */}
          <div className="p-6 md:p-8" key={step}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="w-10 h-10 border-3 border-muted border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium text-foreground">Finding your matches...</p>
                <p className="text-xs text-muted-foreground mt-1">Analysing schools in {data.move.city || "your city"}</p>
              </div>
            ) : (
              <>
                {step === 0 && <StepYourMove data={data.move} onChange={(move) => setData({ ...data, move })} />}
                {step === 1 && <StepChildProfile data={data.child} onChange={(child) => setData({ ...data, child })} />}
                {step === 2 && <StepPreferences data={data.preferences} onChange={(preferences) => setData({ ...data, preferences })} />}
                {step === 3 && <StepMatches data={data} />}
              </>
            )}
          </div>

          {/* Footer nav */}
          {step < 3 && !loading && (
            <div className="px-6 md:px-8 py-5 border-t border-border bg-muted/30 flex justify-between items-center">
              {step > 0 ? (
                <button
                  onClick={prev}
                  className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              ) : <div />}
              <button
                onClick={next}
                disabled={!canProceed()}
                className={cn(
                  "px-7 py-3 rounded-xl text-sm font-bold tracking-wide flex items-center gap-2 transition-all",
                  canProceed()
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {step === 2 ? "Find My Schools ✨" : "Continue →"}
              </button>
            </div>
          )}
        </div>

        {/* Trust bar - step 0 only */}
        {step === 0 && (
          <div className="flex justify-center gap-8 mt-10 animate-fade-in flex-wrap">
            {[
              { icon: "🌍", text: "42 countries" },
              { icon: "🏫", text: "500+ schools" },
              { icon: "👨‍👩‍👧", text: "Free for families" },
              { icon: "⭐", text: "4.9/5 from 800+ parents" },
            ].map((item) => (
              <div key={item.text} className="text-center">
                <div className="text-xl">{item.icon}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{item.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Finder;
