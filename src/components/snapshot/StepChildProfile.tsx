import { ChildProfile } from "@/types/snapshot";
import { ageOptions } from "@/data/mockSchools";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: ChildProfile;
  onChange: (data: ChildProfile) => void;
}

const StepChildProfile = ({ data, onChange }: Props) => {
  const update = <K extends keyof ChildProfile>(field: K, value: ChildProfile[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="animate-slide-up flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Child's First Name
          </Label>
          <Input
            placeholder="e.g. Olivia"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Age / Year Group *
          </Label>
          <Select value={data.age} onValueChange={(v) => update("age", v)}>
            <SelectTrigger className="h-12 bg-card">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              {ageOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Languages spoken at home
        </Label>
        <Input
          placeholder="e.g. English, French"
          value={data.languages}
          onChange={(e) => update("languages", e.target.value)}
          className="h-12 bg-card"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Any special educational needs or considerations?
        </Label>
        <Textarea
          placeholder="e.g. gifted learner, dyslexia support, EAL, physical accessibility needs..."
          value={data.specialNeeds}
          onChange={(e) => update("specialNeeds", e.target.value)}
          className="bg-card resize-none"
          rows={3}
        />
      </div>

      <div className="flex gap-3 items-start p-4 rounded-xl bg-primary/5 border border-primary/15">
        <span className="text-lg shrink-0">🔒</span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your child's information is private and only used to personalise your school matches. We never share it with schools without your permission.
        </p>
      </div>
    </div>
  );
};

export default StepChildProfile;
