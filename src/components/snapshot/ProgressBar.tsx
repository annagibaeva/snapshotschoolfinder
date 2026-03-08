import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = ["Your Move", "Child Profile", "Preferences", "Your Matches"];

interface ProgressBarProps {
  currentStep: number;
  variant?: "light" | "dark";
}

const ProgressBar = ({ currentStep, variant = "light" }: ProgressBarProps) => {
  const isDark = variant === "dark";

  return (
    <div className="w-full mb-6">
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  i < currentStep && "bg-primary text-primary-foreground",
                  i === currentStep && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  i > currentStep && (isDark ? "bg-foreground/10 text-foreground/40" : "bg-muted text-muted-foreground")
                )}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium uppercase tracking-wider whitespace-nowrap hidden sm:block",
                  i === currentStep
                    ? (isDark ? "text-primary-foreground" : "text-primary")
                    : (isDark ? "text-foreground/50" : "text-muted-foreground")
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 sm:mx-3 mb-5 sm:mb-0 transition-colors duration-300",
                  i < currentStep ? "bg-primary" : (isDark ? "bg-foreground/10" : "bg-border")
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
