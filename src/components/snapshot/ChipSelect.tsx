import { cn } from "@/lib/utils";

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  max?: number;
}

const ChipSelect = ({ options, selected, onToggle, max }: ChipSelectProps) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const isDisabled = !isSelected && max !== undefined && selected.length >= max;

        return (
          <button
            key={option}
            type="button"
            onClick={() => !isDisabled && onToggle(option)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/50",
              isDisabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default ChipSelect;
