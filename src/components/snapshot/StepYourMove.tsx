import { MoveDetails } from "@/types/snapshot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  data: MoveDetails;
  onChange: (data: MoveDetails) => void;
}

const StepYourMove = ({ data, onChange }: Props) => {
  const update = (field: keyof MoveDetails, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="animate-slide-up flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Destination City *
          </Label>
          <Input
            placeholder="e.g. Amsterdam"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Country *
          </Label>
          <Input
            placeholder="e.g. Netherlands"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            className="h-12 bg-card"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Planned Move Date
        </Label>
        <Input
          type="month"
          value={data.moveDate}
          onChange={(e) => update("moveDate", e.target.value)}
          className="h-12 bg-card"
        />
        <p className="text-xs text-muted-foreground">
          This helps us flag which application windows are still open
        </p>
      </div>

      <div className="flex gap-3 items-start p-4 rounded-xl bg-primary/5 border border-primary/15">
        <span className="text-lg shrink-0">💡</span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We currently cover <strong className="text-foreground">42 countries</strong> and <strong className="text-foreground">500+ schools</strong>, with a focus on expat-heavy destinations in Europe, Asia, and the Middle East.
        </p>
      </div>
    </div>
  );
};

export default StepYourMove;
