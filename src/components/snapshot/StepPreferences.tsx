import { Preferences } from "@/types/snapshot";
import { schoolTypeOptions, priorityOptions } from "@/data/mockSchools";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ChipSelect from "./ChipSelect";

interface Props {
  data: Preferences;
  onChange: (data: Preferences) => void;
}

const StepPreferences = ({ data, onChange }: Props) => {
  const update = <K extends keyof Preferences>(field: K, value: Preferences[K]) =>
    onChange({ ...data, [field]: value });

  const toggleArray = (field: "schoolTypes" | "topPriorities", id: string) => {
    const arr = data[field];
    update(field, arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  return (
    <div className="animate-slide-up flex flex-col gap-7">
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">
          School types you're open to *
        </Label>
        <ChipSelect
          options={schoolTypeOptions}
          selected={data.schoolTypes}
          onToggle={(id) => toggleArray("schoolTypes", id)}
          grid
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">
          What matters most? <span className="text-muted-foreground font-normal">(pick up to 3)</span>
        </Label>
        <ChipSelect
          options={priorityOptions}
          selected={data.topPriorities}
          onToggle={(id) => {
            if (data.topPriorities.includes(id)) toggleArray("topPriorities", id);
            else if (data.topPriorities.length < 3) toggleArray("topPriorities", id);
          }}
          max={3}
        />
      </div>

      <div className="border-t border-border pt-6 space-y-1">
        <p className="text-sm font-semibold text-foreground mb-4">
          What would you like Snapshot to help with?
        </p>
        {[
          { key: "wantApplicationTracking" as const, label: "Track my applications & deadlines", desc: "Get reminders and progress updates" },
          { key: "wantDocumentHelp" as const, label: "Help preparing documents", desc: "Checklists, what to gather, letter templates" },
          { key: "wantTimelineBuilding" as const, label: "Build a personalised application timeline", desc: "When to apply, visit, confirm" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3.5 border-b border-border/50 last:border-0">
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
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
  );
};

export default StepPreferences;
