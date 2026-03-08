import { MoveDetails } from "@/types/snapshot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar } from "lucide-react";

interface Props {
  data: MoveDetails;
  onChange: (data: MoveDetails) => void;
}

const StepYourMove = ({ data, onChange }: Props) => {
  const update = (field: keyof MoveDetails, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
          Where are you moving?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Tell us about your destination so we can find the best schools in your new area.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-5">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <Input
            id="country"
            placeholder="e.g. Netherlands"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City or area
          </Label>
          <Input
            id="city"
            placeholder="e.g. Amsterdam"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="moveDate" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Planned move date
          </Label>
          <Input
            id="moveDate"
            type="month"
            value={data.moveDate}
            onChange={(e) => update("moveDate", e.target.value)}
            className="h-12 bg-card"
          />
        </div>
      </div>
    </div>
  );
};

export default StepYourMove;
