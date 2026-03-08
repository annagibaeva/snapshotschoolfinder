import { ChildProfile } from "@/types/snapshot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChipSelect from "./ChipSelect";
import { Baby } from "lucide-react";

interface Props {
  data: ChildProfile;
  onChange: (data: ChildProfile) => void;
}

const yearGroups = [
  "Nursery / Pre-K",
  "Reception / Kindergarten",
  "Year 1 / Grade 1",
  "Year 2 / Grade 2",
  "Year 3 / Grade 3",
  "Year 4 / Grade 4",
  "Year 5 / Grade 5",
  "Year 6 / Grade 6",
  "Year 7 / Grade 7",
  "Year 8 / Grade 8",
  "Year 9 / Grade 9",
  "Year 10 / Grade 10",
  "Year 11 / Grade 11",
  "Year 12 / Grade 12",
  "Year 13 / Grade 13",
];

const languageOptions = [
  "English", "Dutch", "French", "German", "Spanish", "Mandarin",
  "Arabic", "Portuguese", "Japanese", "Korean", "Russian", "Italian",
];

const StepChildProfile = ({ data, onChange }: Props) => {
  const update = <K extends keyof ChildProfile>(field: K, value: ChildProfile[K]) =>
    onChange({ ...data, [field]: value });

  const toggleLanguage = (lang: string) => {
    const langs = data.languages.includes(lang)
      ? data.languages.filter((l) => l !== lang)
      : [...data.languages, lang];
    update("languages", langs);
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          <Baby className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
          Tell us about your child
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This helps us find age-appropriate options and the right fit.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-5">
        <div className="space-y-2">
          <Label htmlFor="childName">Child's first name</Label>
          <Input
            id="childName"
            placeholder="e.g. Sophia"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="childAge">Age</Label>
          <Input
            id="childAge"
            type="number"
            min="0"
            max="18"
            placeholder="e.g. 6"
            value={data.age}
            onChange={(e) => update("age", e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label>Current year group</Label>
          <Select value={data.yearGroup} onValueChange={(v) => update("yearGroup", v)}>
            <SelectTrigger className="h-12 bg-card">
              <SelectValue placeholder="Select year group" />
            </SelectTrigger>
            <SelectContent>
              {yearGroups.map((yg) => (
                <SelectItem key={yg} value={yg}>{yg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Languages spoken</Label>
          <ChipSelect
            options={languageOptions}
            selected={data.languages}
            onToggle={toggleLanguage}
          />
        </div>

        <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-card border border-border">
          <Label htmlFor="specialNeeds" className="cursor-pointer">
            Any special educational needs?
          </Label>
          <Switch
            id="specialNeeds"
            checked={data.hasSpecialNeeds}
            onCheckedChange={(v) => update("hasSpecialNeeds", v)}
          />
        </div>

        {data.hasSpecialNeeds && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="senDetails">Please describe</Label>
            <Textarea
              id="senDetails"
              placeholder="e.g. Dyslexia support needed, speech therapy..."
              value={data.specialNeedsDetails}
              onChange={(e) => update("specialNeedsDetails", e.target.value)}
              className="bg-card"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StepChildProfile;
