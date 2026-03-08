import { School } from "@/types/snapshot";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

interface Props {
  school: School;
  index: number;
}

const SchoolCard = ({ school, index }: Props) => {
  const scoreColor =
    school.matchScore >= 85 ? "text-secondary" :
    school.matchScore >= 70 ? "text-primary" :
    "text-muted-foreground";

  return (
    <div
      className={cn(
        "animate-slide-up rounded-xl border border-border bg-card p-5 md:p-6 transition-shadow hover:shadow-md",
        `stagger-${index + 1}`
      )}
      style={{ opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-xs font-medium">
              {school.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {school.curriculum}
            </Badge>
          </div>
          <h3 className="text-lg font-serif font-semibold text-foreground mt-2">
            {school.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{school.location}</p>
        </div>

        <div className="flex flex-col items-center shrink-0">
          <div className={cn("text-2xl font-bold", scoreColor)}>
            {school.matchScore}%
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            match
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-muted-foreground">Ages {school.ageRange}</span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{school.tuitionRange}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {school.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/50 text-accent-foreground"
          >
            <CheckCircle2 className="w-3 h-3 text-secondary" />
            {h}
          </span>
        ))}
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="journey" className="border-none">
          <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline py-2 px-0">
            View application journey ({school.applicationSteps.length} steps)
          </AccordionTrigger>
          <AccordionContent>
            <div className="relative pl-6 mt-2 space-y-4">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
              {school.applicationSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                  <h4 className="text-sm font-medium text-foreground">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  <p className="text-xs text-primary font-medium mt-1">⏱ {step.timeline}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SchoolCard;
