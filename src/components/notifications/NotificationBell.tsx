import { useState, useEffect } from "react";
import { Bell, Check, Clock, AlertTriangle, CalendarClock, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  remind_at: string | null;
  created_at: string;
  application_id: string | null;
}

const typeIcons: Record<string, typeof Bell> = {
  deadline_approaching: CalendarClock,
  incomplete_application: AlertTriangle,
  status_change: Check,
  custom: Clock,
};

const typeColors: Record<string, string> = {
  deadline_approaching: "text-destructive",
  incomplete_application: "text-primary",
  status_change: "text-secondary",
  custom: "text-muted-foreground",
};

const NotificationBell = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("reminders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setReminders(data as Reminder[]);
    };
    load();

    // Realtime subscription
    const channel = supabase
      .channel("reminders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "reminders", filter: `user_id=eq.${user.id}` }, () => {
        load();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const unreadCount = reminders.filter((r) => !r.is_read).length;

  const markRead = async (id: string) => {
    await supabase.from("reminders").update({ is_read: true }).eq("id", id);
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, is_read: true } : r)));
  };

  const markAllRead = async () => {
    const unreadIds = reminders.filter((r) => !r.is_read).map((r) => r.id);
    if (unreadIds.length === 0) return;
    await supabase.from("reminders").update({ is_read: true }).in("id", unreadIds);
    setReminders((prev) => prev.map((r) => ({ ...r, is_read: true })));
  };

  const deleteReminder = async (id: string) => {
    await supabase.from("reminders").delete().eq("id", id);
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-background border border-border rounded-2xl shadow-xl z-40 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-serif font-semibold text-sm text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {reminders.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                reminders.map((r) => {
                  const Icon = typeIcons[r.type] || Bell;
                  return (
                    <div
                      key={r.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 border-b border-border/50 last:border-0 transition-colors",
                        !r.is_read && "bg-primary/5"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", typeColors[r.type])} />
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm leading-snug", !r.is_read ? "font-semibold text-foreground" : "text-muted-foreground")}>
                          {r.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{r.message}</p>
                        <p className="text-[10px] text-muted-foreground/60 mt-1">
                          {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        {!r.is_read && (
                          <button onClick={() => markRead(r.id)} className="p-1 hover:bg-muted rounded" title="Mark read">
                            <Check className="w-3 h-3 text-secondary" />
                          </button>
                        )}
                        <button onClick={() => deleteReminder(r.id)} className="p-1 hover:bg-muted rounded" title="Dismiss">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
