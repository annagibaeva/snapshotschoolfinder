import { cn } from "@/lib/utils";

interface ChipSelectProps {
  options: { id: string; label: string; icon: string; desc?: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  max?: number;
  grid?: boolean;
}

const ChipSelect = ({ options, selected, onToggle, max, grid }: ChipSelectProps) => {
  return (
    <div className={cn(grid ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5" : "flex flex-wrap gap-2.5")}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        const isDisabled = !isSelected && max !== undefined && selected.length >= max;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => !isDisabled && onToggle(option.id)}
            className={cn(
              "flex items-center gap-2.5 px-4 py-3 rounded-xl text-left border transition-all duration-200",
              isSelected
                ? "bg-primary/5 border-primary shadow-sm"
                : "bg-card border-border hover:border-primary/40",
              isDisabled && "opacity-40 cursor-not-allowed"
            )}
          >
            <span className="text-lg shrink-0">{option.icon}</span>
            <div className="min-w-0">
              <span className={cn(
                "text-sm font-medium block",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {option.label}
              </span>
              {option.desc && (
                <span className="text-xs text-muted-foreground block mt-0.5 truncate">
                  {option.desc}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChipSelect;
