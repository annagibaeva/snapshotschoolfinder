import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { School } from "@/types/snapshot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationBell from "@/components/notifications/NotificationBell";
import AddReminderDialog from "@/components/notifications/AddReminderDialog";
import SchoolCard from "@/components/snapshot/SchoolCard";
import { LogOut, Plus, MapPin, Baby, School as SchoolIcon, Sparkles, Bell, CalendarClock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChildRecord {
  id: string;
  name: string | null;
  age: string;
  move_city: string | null;
  move_country: string | null;
  school_types: string[] | null;
  created_at: string;
}

interface ApplicationRecord {
  id: string;
  school_name: string;
  status: string;
  current_step: number | null;
  child_id: string | null;
  created_at: string;
}

interface ReminderRecord {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  remind_at: string | null;
  created_at: string;
  application_id: string | null;
}

interface AIRecommendation {
  id: string;
  child_id: string;
  recommendations: School[];
  prompt_summary: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildRecord[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [reminders, setReminders] = useState<ReminderRecord[]>([]);
  const [aiRecs, setAiRecs] = useState<AIRecommendation[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [childRes, appRes, remRes, aiRes] = await Promise.all([
        supabase.from("children").select("*").order("created_at", { ascending: false }),
        supabase.from("applications").select("*").order("created_at", { ascending: false }),
        supabase.from("reminders").select("*").order("created_at", { ascending: false }).limit(20),
        supabase.from("ai_recommendations").select("*").order("created_at", { ascending: false }),
      ]);
      if (childRes.data) setChildren(childRes.data);
      if (appRes.data) setApplications(appRes.data);
      if (remRes.data) setReminders(remRes.data as ReminderRecord[]);
      if (aiRes.data) setAiRecs(aiRes.data as unknown as AIRecommendation[]);
    };
    load();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return null;

  const statusColors: Record<string, string> = {
    saved: "bg-muted text-muted-foreground",
    started: "bg-primary/10 text-primary",
    submitted: "bg-secondary/10 text-secondary",
    accepted: "bg-secondary text-secondary-foreground",
  };

  const handleStartApplication = async (schoolId: string, schoolName: string) => {
    const { error } = await supabase.from("applications").insert({
      user_id: user.id,
      school_id: schoolId,
      school_name: schoolName,
      status: "started",
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application started!", description: `Tracking ${schoolName}.` });
      // Reload applications
      const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
      if (data) setApplications(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-lg">📸</div>
            <div>
              <div className="font-serif font-bold text-lg text-foreground leading-none">Snapshot</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Dashboard</div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
            <NotificationBell />
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
              <LogOut className="w-4 h-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1">
            Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
          </h1>
          <p className="text-muted-foreground text-sm">Manage profiles, track applications, and review AI recommendations.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="gap-1.5"><SchoolIcon className="w-4 h-4" /> Overview</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1.5"><Sparkles className="w-4 h-4" /> AI Picks</TabsTrigger>
            <TabsTrigger value="reminders" className="gap-1.5"><Bell className="w-4 h-4" /> Reminders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-10">
            {/* Children */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <Baby className="w-5 h-5 text-primary" /> Child Profiles
                </h2>
                <Button size="sm" variant="outline" onClick={() => navigate("/finder")} className="gap-1.5">
                  <Plus className="w-4 h-4" /> New Search
                </Button>
              </div>

              {children.length === 0 ? (
                <div className="p-8 rounded-2xl border border-border bg-card text-center">
                  <p className="text-muted-foreground text-sm mb-3">No child profiles yet. Start a school search to create one.</p>
                  <Button onClick={() => navigate("/finder")} className="gap-1.5">
                    <SchoolIcon className="w-4 h-4" /> Find Schools
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {children.map((child) => (
                    <div key={child.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{child.name || "Unnamed child"}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">{child.age}</span>
                          {child.move_city && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {child.move_city}, {child.move_country}
                            </span>
                          )}
                        </div>
                      </div>
                      {child.school_types && child.school_types.length > 0 && (
                        <div className="flex gap-1">
                          {child.school_types.slice(0, 2).map((t) => (
                            <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Applications */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <SchoolIcon className="w-5 h-5 text-primary" /> Applications
                </h2>
                <AddReminderDialog />
              </div>

              {applications.length === 0 ? (
                <div className="p-8 rounded-2xl border border-border bg-card text-center">
                  <p className="text-muted-foreground text-sm">No applications yet. Find schools and start tracking.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{app.school_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Step {(app.current_step || 0) + 1} · Added {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <AddReminderDialog applicationId={app.id} schoolName={app.school_name} />
                        <Badge className={statusColors[app.status] || statusColors.saved}>
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          {/* AI Picks Tab */}
          <TabsContent value="ai">
            {aiRecs.length === 0 ? (
              <div className="p-12 rounded-2xl border border-border bg-card text-center">
                <Sparkles className="w-10 h-10 text-primary/40 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No AI recommendations yet</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                  Complete a school search with your child's profile and our AI will generate personalised school shortlists for you.
                </p>
                <Button onClick={() => navigate("/finder")} className="gap-1.5">
                  <Sparkles className="w-4 h-4" /> Start AI School Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {aiRecs.map((rec) => (
                  <div key={rec.id}>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h3 className="font-serif text-base font-semibold text-foreground">
                        {rec.prompt_summary || "AI Recommendations"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        · {new Date(rec.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {(rec.recommendations as School[]).map((school, i) => (
                        <SchoolCard
                          key={school.id || i}
                          school={school}
                          index={i}
                          onStartApplication={() => handleStartApplication(school.id, school.name)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-primary" /> All Reminders
              </h2>
              <AddReminderDialog />
            </div>

            {reminders.length === 0 ? (
              <div className="p-12 rounded-2xl border border-border bg-card text-center">
                <Bell className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No reminders yet</h3>
                <p className="text-sm text-muted-foreground mb-5">Reminders will appear here as you track applications and set deadlines.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {reminders.map((r) => (
                  <div key={r.id} className={`p-4 rounded-xl border bg-card flex items-start gap-3 ${!r.is_read ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <CalendarClock className={`w-4 h-4 mt-0.5 shrink-0 ${r.type === "deadline_approaching" ? "text-destructive" : r.type === "incomplete_application" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${!r.is_read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-muted-foreground/60">{new Date(r.created_at).toLocaleDateString()}</span>
                        {r.remind_at && (
                          <span className="text-[10px] text-primary font-medium">
                            📅 {new Date(r.remind_at).toLocaleDateString()}
                          </span>
                        )}
                        <Badge variant="outline" className="text-[10px]">{r.type.replace("_", " ")}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
