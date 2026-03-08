import { cn } from "@/lib/utils";

const steps = ["Your Move", "Child Profile", "Preferences", "Your Matches"];

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between mb-3">
        {steps.map((step, i) => (
          <button
            key={step}
            className={cn(
              "text-xs font-medium tracking-wide uppercase transition-colors duration-300",
              i <= currentStep ? "text-primary" : "text-muted-foreground"
            )}
            disabled
          >
            <span className="hidden sm:inline">{step}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
