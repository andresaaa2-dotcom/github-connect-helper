import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Upload, Watch, Shield, FlaskConical, Users, TrendingUp, Brain, Heart, Zap } from "lucide-react";
import { SecurityFooter, TrustBadges } from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import bloodTestHero from "@/assets/blood-test-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Activity className="h-4 w-4" />
                Data-Driven Health Optimization
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] font-bold mb-6 tracking-tight">
                Stop guessing your supplements. Start using your data.
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Turn your blood tests and wearable data into a personalized health strategy — so you feel better, perform better, and make smarter decisions about your body.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="text-base px-8 py-6 rounded-xl font-medium" onClick={() => navigate("/blood-test")}>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Blood Test
                </Button>
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl font-medium" onClick={() => navigate("/dashboard")}>
                  <Activity className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-accent" /> HIPAA Compliant</span>
                <span className="flex items-center gap-1.5"><FlaskConical className="h-4 w-4 text-accent" /> Evidence-Based</span>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={dashboardPreview}
                alt="Health optimization dashboard showing biomarker data"
                className="rounded-2xl shadow-2xl w-full object-cover border border-border"
              />
              <div className="absolute -bottom-4 -left-4 glass-card p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Optimization Score</p>
                    <p className="font-heading text-xl font-bold text-foreground">78<span className="text-sm text-muted-foreground font-body">/100</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, label: "Clinically Validated", desc: "All recommendations based on peer-reviewed research" },
              { icon: FlaskConical, label: "Biomarker-Driven", desc: "Personalized to your unique biochemistry" },
              { icon: Users, label: "12,000+ Users", desc: "Trusted by athletes and health optimizers" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4 tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">From raw data to actionable supplement recommendations in minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Upload Your Data", desc: "Upload blood tests or connect wearables like WHOOP, Oura, or Apple Health.", icon: Upload },
              { step: "02", title: "AI Analysis", desc: "Our engine analyzes biomarkers, sleep, training load, and recovery patterns.", icon: Brain },
              { step: "03", title: "Get Your Protocol", desc: "Receive evidence-based supplement recommendations linked to your biomarkers.", icon: Zap },
            ].map((item, i) => (
              <div key={item.step} className="wellness-card p-8 text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="inline-block text-xs font-heading font-bold text-primary/40 mb-3 tracking-widest">STEP {item.step}</span>
                <h3 className="font-heading text-xl text-foreground font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Test CTA */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-6 tracking-tight">
                Your blood tells the story.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Upload your blood test results and instantly see which biomarkers need attention. Our system maps deficiencies to specific supplements with dosage guidance.
              </p>
              <ul className="space-y-3 mb-8">
                {["Vitamin D, B12, Iron, Ferritin", "Testosterone, Cortisol, Thyroid", "Cholesterol, Omega-3 Index", "Fasting Glucose, HbA1c"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-xl" onClick={() => navigate("/blood-test")}>
                Upload Blood Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <img src={bloodTestHero} alt="Blood test analysis" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Wearable Integrations */}
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4 tracking-tight">Connect Your Wearables</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-12">
            Sync data from your favorite health devices for a complete optimization picture.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {["Apple Health", "WHOOP", "Oura Ring", "Garmin", "Strava"].map((name, i) => (
              <div key={name} className="wellness-card p-6 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <Watch className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-xs text-accent font-medium">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground font-bold mb-4 tracking-tight">
            Start optimizing today.
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-md mx-auto mb-8">
            Take the health quiz or upload your blood test to get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="rounded-xl text-base px-8 py-6" onClick={() => navigate("/quiz")}>
              Take the Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl text-base px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/marketplace")}>
              Browse Supplements
            </Button>
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <SecurityFooter />
    </div>
  );
};

export default Index;
