import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ClipboardList, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="container max-w-5xl py-6 flex items-center justify-between px-4">
        <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">
          Snapshot
        </span>
        <Button variant="ghost" size="sm" onClick={() => navigate("/finder")}>
          Get started
        </Button>
      </header>

      {/* Hero */}
      <section className="container max-w-3xl px-4 pt-16 md:pt-28 pb-20 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4 animate-slide-up">
          For expat families
        </p>
        <h1
          className="font-serif text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-6 animate-slide-up stagger-1"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          Find the right school
          <br />
          <span className="text-primary">wherever you move</span>
        </h1>
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-slide-up stagger-2"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          Moving abroad is hard enough. We help you navigate the school search,
          applications, and timelines — so your child gets the best start.
        </p>
        <div
          className="animate-slide-up stagger-3"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/finder")}
            className="h-14 px-8 text-base font-medium rounded-full shadow-lg gap-2"
          >
            Find your child's school <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card py-20">
        <div className="container max-w-4xl px-4">
          <h2
            className="font-serif text-2xl md:text-3xl font-semibold text-center text-foreground mb-12"
          >
            How Snapshot works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Tell us what you need",
                desc: "Share where you're moving, your child's age, and what matters most to your family.",
              },
              {
                icon: ClipboardList,
                title: "Get matched schools",
                desc: "We surface the best-fit options with clear details on curriculum, costs, and fit.",
              },
              {
                icon: TrendingUp,
                title: "Track applications",
                desc: "See every step of the journey — from documents to deadlines — in one place.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`text-center animate-slide-up stagger-${i + 2}`}
                style={{ opacity: 0, animationFillMode: "forwards" }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-16 text-center px-4">
        <p className="text-sm text-muted-foreground italic max-w-lg mx-auto">
          "We moved to Amsterdam with two kids and had no idea where to start. Snapshot
          made the whole process feel manageable — even enjoyable."
        </p>
        <p className="text-xs font-medium text-foreground mt-3">— Sarah K., relocated from London</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Snapshot. Helping families find their way.
        </p>
      </footer>
    </div>
  );
};

export default Index;
