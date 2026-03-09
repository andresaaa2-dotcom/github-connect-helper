import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { useCart } from "@/context/CartContext";
import { supplements } from "@/data/supplements";
import { generateRecommendations } from "@/utils/recommendations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Heart, Brain, Shield, Droplets, Moon, Flame, TrendingUp,
  ArrowRight, ShoppingCart, Dumbbell, Apple, CheckCircle2, AlertCircle, Store,
} from "lucide-react";

function getHealthScores(answers: ReturnType<typeof useQuiz>["answers"]) {
  const exercise = answers.exercise;
  const diet = answers.diet;
  const takesSupps = answers.takesSupplements;
  const age = answers.age || 25;

  const fitnessScore =
    exercise === "5+" ? 95 : exercise === "3–4" ? 80 : exercise === "1–2" ? 55 : 30;
  const nutritionScore =
    diet === "Good" ? 90 : diet === "Average" ? 60 : 35;
  const supplementScore =
    takesSupps === "Yes regularly" ? 85 : takesSupps === "Occasionally" ? 55 : 25;
  const immunityScore = Math.round(
    (nutritionScore * 0.4 + supplementScore * 0.3 + fitnessScore * 0.3) 
  );
  const overallScore = Math.round(
    (fitnessScore + nutritionScore + supplementScore + immunityScore) / 4
  );
  const energyScore = Math.round(fitnessScore * 0.5 + nutritionScore * 0.3 + (100 - Math.min(age, 60) / 60 * 40) * 0.2);
  const sleepScore = exercise === "0" ? 50 : exercise === "5+" ? 90 : 70;

  return { fitnessScore, nutritionScore, supplementScore, immunityScore, overallScore, energyScore, sleepScore };
}

const scoreColor = (score: number) => {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-accent";
  return "text-destructive";
};

const scoreBg = (score: number) => {
  if (score >= 80) return "bg-primary";
  if (score >= 60) return "bg-accent";
  return "bg-destructive";
};

const scoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { answers } = useQuiz();
  const { bundleItems, hasBundle } = useCart();

  const hasQuizData = answers.name !== "";
  const scores = getHealthScores(answers);
  const recommendations = hasQuizData ? generateRecommendations(answers) : [];
  const userName = answers.name || "Guest";

  const healthMetrics = [
    { label: "Fitness", score: scores.fitnessScore, icon: Dumbbell, color: "hsl(0, 60%, 55%)" },
    { label: "Nutrition", score: scores.nutritionScore, icon: Apple, color: "hsl(152, 44%, 38%)" },
    { label: "Energy", score: scores.energyScore, icon: Flame, color: "hsl(25, 70%, 50%)" },
    { label: "Immunity", score: scores.immunityScore, icon: Shield, color: "hsl(280, 50%, 55%)" },
    { label: "Sleep", score: scores.sleepScore, icon: Moon, color: "hsl(240, 40%, 55%)" },
    { label: "Supplements", score: scores.supplementScore, icon: Heart, color: "hsl(320, 50%, 55%)" },
  ];

  const insights = [
    scores.fitnessScore < 60 && { icon: Dumbbell, text: "Increasing exercise to 3-4x/week could boost your fitness score by 25 points.", type: "warning" as const },
    scores.nutritionScore < 60 && { icon: Apple, text: "Improving diet quality would significantly enhance your nutrition score.", type: "warning" as const },
    scores.supplementScore < 50 && { icon: Heart, text: "Starting a supplement routine can fill nutritional gaps in your diet.", type: "info" as const },
    scores.fitnessScore >= 80 && { icon: CheckCircle2, text: "Great fitness level! Keep up your exercise routine.", type: "success" as const },
    scores.nutritionScore >= 80 && { icon: CheckCircle2, text: "Your diet quality is excellent. You're fueling your body well.", type: "success" as const },
  ].filter(Boolean) as { icon: typeof Dumbbell; text: string; type: "warning" | "info" | "success" }[];

  if (!hasQuizData) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container flex items-center justify-between h-16">
            <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/marketplace")}>
              <Store className="h-4 w-4 mr-2" />
              Marketplace
            </Button>
          </div>
        </nav>
        <div className="pt-24 section-padding">
          <div className="container max-w-lg text-center">
            <Activity className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="font-heading text-3xl text-foreground mb-4">Your Health Dashboard</h1>
            <p className="text-muted-foreground mb-8">Take the quiz first to see your personalized health metrics and recommendations.</p>
            <Button size="lg" className="rounded-full" onClick={() => navigate("/quiz")}>
              Take the Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/marketplace")}>
              <Store className="h-4 w-4 mr-2" />
              Shop
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <p className="text-muted-foreground mb-1">Welcome back,</p>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">{userName}'s Health Dashboard</h1>
            <p className="text-muted-foreground">Your wellness overview based on your health profile.</p>
          </div>

          {/* Overall Score */}
          <div className="wellness-card p-8 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-36 h-36 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${scores.overallScore * 3.27} 327`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-3xl text-foreground">{scores.overallScore}</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-2xl text-foreground mb-1">Overall Wellness Score</h2>
                <Badge className={`${scoreBg(scores.overallScore)} text-primary-foreground mb-3`}>
                  {scoreLabel(scores.overallScore)}
                </Badge>
                <p className="text-muted-foreground text-sm max-w-md">
                  This score is calculated from your fitness, nutrition, supplement intake, and lifestyle factors.
                </p>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {healthMetrics.map((metric, i) => (
              <div
                key={metric.label}
                className="wellness-card p-5 animate-fade-in"
                style={{ animationDelay: `${(i + 2) * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                    <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className={`font-heading text-xl ${scoreColor(metric.score)}`}>{metric.score}</p>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{scoreLabel(metric.score)}</p>
              </div>
            ))}
          </div>

          {/* Insights */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Health Insights
            </h2>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className={`wellness-card p-4 flex items-start gap-3 border-l-4 ${
                    insight.type === "success"
                      ? "border-l-primary"
                      : insight.type === "warning"
                      ? "border-l-accent"
                      : "border-l-muted-foreground"
                  }`}
                >
                  {insight.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-foreground">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Stack */}
          <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {hasBundle ? "Your Active Stack" : "Recommended Stack"}
            </h2>

            {hasBundle ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {bundleItems.map((id) => {
                  const supp = supplements.find((s) => s.id === id);
                  if (!supp) return null;
                  return (
                    <div key={id} className="wellness-card-selected p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${supp.color}15` }}>
                        <supp.icon className="h-4.5 w-4.5" style={{ color: supp.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{supp.name}</p>
                        <p className="text-xs text-muted-foreground">{supp.benefit}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.slice(0, 4).map((rec) => {
                  const supp = supplements.find((s) => s.id === rec.supplementId);
                  if (!supp) return null;
                  return (
                    <div key={rec.supplementId} className="wellness-card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${supp.color}15` }}>
                          <supp.icon className="h-4 w-4" style={{ color: supp.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{supp.name}</p>
                          <p className="text-xs text-muted-foreground">{rec.reason}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-foreground">€{supp.price}/mo</span>
                    </div>
                  );
                })}
                <Button className="w-full rounded-full mt-4" onClick={() => navigate("/recommendation")}>
                  View Full Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Quick Profile */}
          <div className="mt-8 wellness-card p-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h3 className="font-heading text-lg text-foreground mb-4">Your Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-medium text-foreground">{answers.age}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="font-medium text-foreground">{answers.gender}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Exercise</p>
                <p className="font-medium text-foreground">{answers.exercise}x / week</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Diet Quality</p>
                <p className="font-medium text-foreground">{answers.diet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
