import { useState } from "react";
import { School } from "@/types/snapshot";
import { cn } from "@/lib/utils";

interface Props {
  school: School;
  index: number;
}

const SchoolCard = ({ school, index }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="animate-slide-up bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animationFillMode: "forwards",
        borderLeft: `5px solid hsl(${school.color})`,
      }}
    >
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-primary-foreground tracking-wide"
                style={{ backgroundColor: `hsl(${school.color})` }}
              >
                {school.matchScore}% Match
              </span>
              <span className="text-xs text-muted-foreground">{school.type}</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground">{school.name}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="text-xs text-muted-foreground">👶 Ages {school.ageRange}</span>
              <span className="text-xs text-muted-foreground">🗣️ {school.lang}</span>
              <span className="text-xs text-muted-foreground">📅 Deadline: {school.deadline}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {school.highlights.map((h) => (
            <span key={h} className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-6 pb-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary py-3 hover:opacity-80 transition-opacity"
        >
          {expanded ? "▲ Hide" : "▼ Show"} Application Journey
        </button>

        {expanded && (
          <div className="pb-5 animate-fade-in">
            {/* Horizontal step timeline */}
            <div className="flex items-start mt-2 overflow-x-auto pb-2">
              {school.applicationSteps.map((step, i) => (
                <div key={i} className={cn("flex items-center", i < school.applicationSteps.length - 1 && "flex-1")}>
                  <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0"
                      style={{ backgroundColor: `hsl(${school.color})` }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight max-w-[80px]">
                      {step.title}
                    </span>
                  </div>
                  {i < school.applicationSteps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-border mx-1 mb-5" />
                  )}
                </div>
              ))}
            </div>

            {/* Tip box */}
            <div className="mt-4 p-3.5 bg-primary/5 border border-primary/15 rounded-xl">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💡 <strong className="text-foreground">Snapshot tip:</strong> {school.tip}
              </p>
            </div>

            <button
              className="mt-3.5 w-full py-3 rounded-xl text-sm font-bold text-primary-foreground tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: `hsl(${school.color})` }}
            >
              Start Application with Snapshot →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolCard;
