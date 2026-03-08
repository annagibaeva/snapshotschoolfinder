import { Preferences } from "@/types/snapshot";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ChipSelect from "./ChipSelect";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  data: Preferences;
  onChange: (data: Preferences) => void;
}

const schoolTypeOptions = [
  "Daycare", "Nursery", "Primary", "Secondary",
  "International", "Montessori", "IB", "Local Curriculum",
];

const priorityOptions = [
  "Proximity to home", "Academic reputation", "Language of instruction",
  "Tuition cost", "Extracurriculars", "Diversity & inclusion",
  "Small class sizes", "Special needs support", "After-school care",
  "Outdoor facilities",
];

const StepPreferences = ({ data, onChange }: Props) => {
  const update = <K extends keyof Preferences>(field: K, value: Preferences[K]) =>
    onChange({ ...data, [field]: value });

  const toggleSchoolType = (type: string) => {
    const types = data.schoolTypes.includes(type)
      ? data.schoolTypes.filter((t) => t !== type)
      : [...data.schoolTypes, type];
    update("schoolTypes", types);
  };

  const togglePriority = (priority: string) => {
    const priorities = data.topPriorities.includes(priority)
      ? data.topPriorities.filter((p) => p !== priority)
      : [...data.topPriorities, priority];
    update("topPriorities", priorities);
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          <SlidersHorizontal className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
          What matters most to you?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Select the school types you're considering and your top 3 priorities.
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-8">
        <div className="space-y-3">
          <Label className="text-base font-medium">School types</Label>
          <ChipSelect
            options={schoolTypeOptions}
            selected={data.schoolTypes}
            onToggle={toggleSchoolType}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">
            Top 3 priorities{" "}
            <span className="text-muted-foreground font-normal">
              ({data.topPriorities.length}/3 selected)
            </span>
          </Label>
          <ChipSelect
            options={priorityOptions}
            selected={data.topPriorities}
            onToggle={togglePriority}
            max={3}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">What help do you need?</Label>
          <div className="space-y-3">
            {[
              { key: "wantApplicationTracking" as const, label: "Track my applications", desc: "We'll keep tabs on deadlines and status for you" },
              { key: "wantDocumentHelp" as const, label: "Help with documents", desc: "Guidance on what paperwork you'll need" },
              { key: "wantTimelineBuilding" as const, label: "Build my timeline", desc: "A personalised schedule so nothing slips through" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 px-4 rounded-lg bg-card border border-border">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={data[key]}
                  onCheckedChange={(v) => update(key, v)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPreferences;
