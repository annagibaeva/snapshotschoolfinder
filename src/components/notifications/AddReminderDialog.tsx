import { useState } from "react";
import { Plus, CalendarClock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  applicationId?: string;
  schoolName?: string;
}

const AddReminderDialog = ({ applicationId, schoolName }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(schoolName ? `Reminder: ${schoolName}` : "");
  const [message, setMessage] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    setSaving(true);

    const { error } = await supabase.from("reminders").insert({
      user_id: user.id,
      application_id: applicationId || null,
      type: "custom",
      title: title.trim(),
      message: message.trim() || title.trim(),
      remind_at: remindAt ? new Date(remindAt).toISOString() : null,
    });

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Reminder set!", description: "You'll be notified at the right time." });
      setOpen(false);
      setTitle("");
      setMessage("");
      setRemindAt("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <CalendarClock className="w-4 h-4" /> Set Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Add Custom Reminder</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Submit documents" className="bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Note</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any details..." className="bg-card resize-none" rows={2} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Remind me on</Label>
            <Input type="datetime-local" value={remindAt} onChange={(e) => setRemindAt(e.target.value)} className="bg-card" />
          </div>
          <Button onClick={handleSave} disabled={saving || !title.trim()} className="w-full">
            {saving ? "Saving..." : "Save Reminder"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderDialog;
