import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Plus, MapPin, Baby, School } from "lucide-react";

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

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildRecord[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [childRes, appRes] = await Promise.all([
        supabase.from("children").select("*").order("created_at", { ascending: false }),
        supabase.from("applications").select("*").order("created_at", { ascending: false }),
      ]);
      if (childRes.data) setChildren(childRes.data);
      if (appRes.data) setApplications(appRes.data);
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
          <p className="text-muted-foreground text-sm">Manage your child profiles and track applications.</p>
        </div>

        {/* Children */}
        <section className="mb-10">
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
                <School className="w-4 h-4" /> Find Schools
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
          <h2 className="font-serif text-lg font-semibold flex items-center gap-2 mb-4">
            <School className="w-5 h-5 text-primary" /> Applications
          </h2>

          {applications.length === 0 ? (
            <div className="p-8 rounded-2xl border border-border bg-card text-center">
              <p className="text-muted-foreground text-sm">No applications yet. Find schools and start tracking.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {applications.map((app) => (
                <div key={app.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{app.school_name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Step {(app.current_step || 0) + 1} · Added {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={statusColors[app.status] || statusColors.saved}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
