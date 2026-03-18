import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockBiomarkers, biomarkerCategories, type BiomarkerStatus } from "@/data/biomarkers";
import { supplements } from "@/data/supplements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import {
  Activity, TrendingUp, TrendingDown, Minus, ArrowRight, ShoppingCart,
  AlertCircle, CheckCircle2, Upload, Heart, Brain, Shield, Zap, Moon,
} from "lucide-react";
import { SecurityFooter } from "@/components/TrustBadges";

const statusConfig: Record<BiomarkerStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  optimal: { label: "Optimal", className: "biomarker-optimal", icon: CheckCircle2 },
  low: { label: "Low", className: "biomarker-low", icon: AlertCircle },
  high: { label: "High", className: "biomarker-high", icon: AlertCircle },
};

const trendIcon = (trend: "up" | "down" | "stable") => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-accent" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const MiniChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="mt-2">
      <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [biomarkerFilter, setBiomarkerFilter] = useState("all");

  const filteredBiomarkers = biomarkerFilter === "all"
    ? mockBiomarkers
    : mockBiomarkers.filter((b) => b.category === biomarkerFilter);

  const optimalCount = mockBiomarkers.filter((b) => b.status === "optimal").length;
  const lowCount = mockBiomarkers.filter((b) => b.status === "low").length;
  const highCount = mockBiomarkers.filter((b) => b.status === "high").length;
  const overallScore = Math.round((optimalCount / mockBiomarkers.length) * 100);

  const recommendedSupps = mockBiomarkers
    .filter((b) => b.status !== "optimal" && b.relatedSupplements)
    .flatMap((b) => b.relatedSupplements!.map((sid) => ({ biomarker: b.name, status: b.status, supplementId: sid })))
    .filter((r, i, arr) => arr.findIndex((a) => a.supplementId === r.supplementId) === i);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 animate-fade-in">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold tracking-tight mb-1">Your Health Strategy</h1>
              <p className="text-muted-foreground">See what your body needs to perform, recover, and feel its best.</p>
            </div>
            <Button className="mt-4 md:mt-0 rounded-xl" onClick={() => navigate("/blood-test")}>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Test
            </Button>
          </div>

          {/* Score + Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="wellness-card p-6 animate-fade-in">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Overall Score</p>
              <div className="flex items-end gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">{overallScore}</span>
                <span className="text-muted-foreground text-sm mb-1">/100</span>
              </div>
              <Progress value={overallScore} className="h-2 mt-3" />
            </div>
            <div className="wellness-card p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Optimal</p>
              <span className="font-heading text-4xl font-bold text-accent">{optimalCount}</span>
              <p className="text-xs text-muted-foreground mt-1">biomarkers in range</p>
            </div>
            <div className="wellness-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Needs Attention</p>
              <span className="font-heading text-4xl font-bold text-warning">{lowCount}</span>
              <p className="text-xs text-muted-foreground mt-1">below optimal range</p>
            </div>
            <div className="wellness-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Elevated</p>
              <span className="font-heading text-4xl font-bold text-destructive">{highCount}</span>
              <p className="text-xs text-muted-foreground mt-1">above optimal range</p>
            </div>
          </div>

          {/* Wearable Metrics */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-xl text-foreground font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Wearable Metrics
              <Badge variant="secondary" className="text-xs ml-2">7-day avg</Badge>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {mockWearableData.map((metric, i) => (
                <div key={metric.id} className="wellness-card p-4 animate-fade-in" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground font-medium">{metric.name}</p>
                    {trendIcon(metric.trend)}
                  </div>
                  <p className="font-heading text-2xl font-bold text-foreground">
                    {metric.value.toLocaleString()}
                    <span className="text-xs text-muted-foreground font-body ml-1">{metric.unit}</span>
                  </p>
                  <MiniChart data={metric.history} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.trend === "up" ? "+" : metric.trend === "down" ? "-" : "±"}{metric.trendPercent}% vs last week
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Biomarker Panel */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-heading text-xl text-foreground font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Blood Biomarkers
            </h2>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {biomarkerCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBiomarkerFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    biomarkerFilter === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="grid gap-3">
              {filteredBiomarkers.map((bm) => {
                const config = statusConfig[bm.status];
                const percent = Math.min(100, Math.max(0, ((bm.value - bm.min) / (bm.max - bm.min)) * 100));
                const optimalStart = ((bm.optimalMin - bm.min) / (bm.max - bm.min)) * 100;
                const optimalEnd = ((bm.optimalMax - bm.min) / (bm.max - bm.min)) * 100;
                return (
                  <div key={bm.id} className="wellness-card p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-foreground">{bm.name}</h3>
                          <Badge className={`${config.className} text-xs border`}>
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{bm.description}</p>
                        {/* Range bar */}
                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-accent/20 rounded-full"
                            style={{ left: `${optimalStart}%`, width: `${optimalEnd - optimalStart}%` }}
                          />
                          <div
                            className={`absolute w-3 h-3 rounded-full top-0 border-2 border-background ${
                              bm.status === "optimal" ? "bg-accent" : bm.status === "low" ? "bg-warning" : "bg-destructive"
                            }`}
                            style={{ left: `${Math.min(97, Math.max(0, percent))}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{bm.min} {bm.unit}</span>
                          <span className="text-accent">Optimal: {bm.optimalMin}–{bm.optimalMax}</span>
                          <span>{bm.max} {bm.unit}</span>
                        </div>
                      </div>
                      <div className="text-right md:text-center flex-shrink-0 md:w-24">
                        <p className="font-heading text-3xl font-bold text-foreground">{bm.value}</p>
                        <p className="text-xs text-muted-foreground">{bm.unit}</p>
                      </div>
                    </div>
                    {bm.recommendation && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-sm text-foreground flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {bm.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supplement Recommendations */}
          {recommendedSupps.length > 0 && (
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-heading text-xl text-foreground font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Recommended Based on Your Biomarkers
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedSupps.map((rec) => {
                  const supp = supplements.find((s) => s.id === rec.supplementId);
                  if (!supp) return null;
                  return (
                    <div key={rec.supplementId} className="wellness-card p-5 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${supp.color}15` }}>
                        <supp.icon className="h-6 w-6" style={{ color: supp.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-foreground">{supp.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {rec.status === "low" ? "Low" : "High"} {rec.biomarker}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{supp.benefit}</p>
                        <p className="text-xs text-muted-foreground">{supp.dosage}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-heading font-bold text-foreground">€{supp.price}</p>
                        <Button size="sm" variant="outline" className="mt-2 rounded-lg text-xs" onClick={() => navigate("/marketplace")}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <SecurityFooter />
    </div>
  );
};

export default Dashboard;
