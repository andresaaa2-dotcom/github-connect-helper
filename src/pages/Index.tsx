import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, FlaskConical, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVitamins from "@/assets/hero-vitamins.jpg";
import lifestyleExercise from "@/assets/lifestyle-exercise.jpg";
import healthyFood from "@/assets/healthy-food.jpg";

const trustIndicators = [
  { icon: Shield, label: "Doctor Approved", desc: "Formulated by health professionals" },
  { icon: FlaskConical, label: "Science Based", desc: "Backed by clinical research" },
  { icon: Users, label: "10,000+ Users", desc: "Trusted by thousands" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground">vitastack</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/marketplace")}>Shop</Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button size="sm" onClick={() => navigate("/quiz")}>Take the Quiz</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full bg-sage text-sage-foreground text-sm font-medium mb-6">
                Personalized Nutrition
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Find Your Personalized Vitamin Stack in 60 Seconds
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Answer a few questions and get a science-based supplement plan tailored to your lifestyle. Delivered monthly to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full" onClick={() => navigate("/quiz")}>
                  Take the Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full" onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={heroVitamins}
                alt="Personalized vitamin supplement packs"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border border-border">
                <p className="text-sm font-medium text-foreground">Starting at</p>
                <p className="text-2xl font-heading text-primary">€39<span className="text-sm text-muted-foreground font-body">/month</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-sage/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {trustIndicators.map((item, i) => (
              <div key={item.label} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Three simple steps to your personalized daily vitamin pack.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Take the Quiz", desc: "Answer quick questions about your lifestyle, diet, and health goals." },
              { step: "02", title: "Get Your Stack", desc: "Our algorithm builds a personalized supplement recommendation just for you." },
              { step: "03", title: "Monthly Delivery", desc: "Receive 30 daily vitamin packs delivered fresh to your door every month." },
            ].map((item, i) => (
              <div key={item.step} className="wellness-card p-8 text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="inline-block text-5xl font-heading text-primary/20 mb-4">{item.step}</span>
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Nutrition That Fits Your Life
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you're an athlete, a busy professional, or just starting your wellness journey — we build a stack that's uniquely yours.
              </p>
              <Button size="lg" className="rounded-full" onClick={() => navigate("/quiz")}>
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={lifestyleExercise} alt="Active lifestyle" className="rounded-2xl object-cover w-full aspect-square" />
              <img src={healthyFood} alt="Healthy nutrition" className="rounded-2xl object-cover w-full aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding border-t border-border">
        <div className="container text-center">
          <p className="font-heading text-xl text-foreground mb-2">vitastack</p>
          <p className="text-sm text-muted-foreground">Personalized nutrition, delivered monthly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
