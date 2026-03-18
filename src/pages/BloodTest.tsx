import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mockBiomarkers, type Biomarker } from "@/data/biomarkers";
import { supplements } from "@/data/supplements";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import {
  Upload, FileText, CheckCircle2, AlertCircle, ArrowRight,
  Zap, Activity, X, Loader2,
} from "lucide-react";

type UploadState = "idle" | "uploading" | "analyzing" | "done";

const BloodTest = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  const simulateUpload = useCallback((name: string) => {
    setFileName(name);
    setState("uploading");
    setProgress(0);

    const uploadInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(uploadInterval);
          setState("analyzing");
          // Simulate analysis
          setTimeout(() => setState("done"), 2500);
          return 100;
        }
        return p + 8;
      });
    }, 100);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) simulateUpload(file.name);
    },
    [simulateUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) simulateUpload(file.name);
    },
    [simulateUpload]
  );

  const reset = () => {
    setState("idle");
    setFileName("");
    setProgress(0);
  };

  const deficientMarkers = mockBiomarkers.filter((b) => b.status !== "optimal");
  const optimalMarkers = mockBiomarkers.filter((b) => b.status === "optimal");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-4xl">
          <div className="mb-10 animate-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold tracking-tight mb-2">
              Blood Test Analysis
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your blood test report and get instant biomarker analysis with personalized supplement recommendations.
            </p>
          </div>

          {state === "idle" && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="wellness-card p-12 text-center border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer animate-fade-in"
            >
              <Upload className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="font-heading text-xl text-foreground font-semibold mb-2">
                Upload Blood Test Report
              </h2>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Drag and drop your PDF or image file here, or click to browse.
              </p>
              <label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileInput}
                />
                <Button asChild className="rounded-xl cursor-pointer">
                  <span>
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">Supported: PDF, JPG, PNG · Max 20 MB</p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground font-medium">Or try with sample data</p>
                <Button variant="outline" size="sm" className="rounded-lg" onClick={() => simulateUpload("sample-blood-test.pdf")}>
                  Use Sample Report
                </Button>
              </div>
            </div>
          )}

          {state === "uploading" && (
            <div className="wellness-card p-12 text-center animate-fade-in">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-xl text-foreground font-semibold mb-2">Uploading...</h2>
              <p className="text-sm text-muted-foreground mb-4">{fileName}</p>
              <Progress value={progress} className="h-2 max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
            </div>
          )}

          {state === "analyzing" && (
            <div className="wellness-card p-12 text-center animate-fade-in">
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <h2 className="font-heading text-xl text-foreground font-semibold mb-2">
                Analyzing Your Biomarkers...
              </h2>
              <p className="text-sm text-muted-foreground">
                Extracting data and comparing against optimal ranges.
              </p>
            </div>
          )}

          {state === "done" && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary */}
              <div className="wellness-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg text-foreground font-semibold">Analysis Complete</h2>
                    <p className="text-sm text-muted-foreground">{fileName} · {mockBiomarkers.length} biomarkers extracted</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={reset}>
                  <X className="h-4 w-4 mr-1" /> Reset
                </Button>
              </div>

              {/* Score */}
              <div className="grid grid-cols-3 gap-4">
                <div className="wellness-card p-5 text-center">
                  <span className="font-heading text-3xl font-bold text-accent">{optimalMarkers.length}</span>
                  <p className="text-xs text-muted-foreground mt-1">Optimal</p>
                </div>
                <div className="wellness-card p-5 text-center">
                  <span className="font-heading text-3xl font-bold text-warning">{deficientMarkers.filter(b => b.status === "low").length}</span>
                  <p className="text-xs text-muted-foreground mt-1">Below Range</p>
                </div>
                <div className="wellness-card p-5 text-center">
                  <span className="font-heading text-3xl font-bold text-destructive">{deficientMarkers.filter(b => b.status === "high").length}</span>
                  <p className="text-xs text-muted-foreground mt-1">Elevated</p>
                </div>
              </div>

              {/* Deficient Biomarkers */}
              {deficientMarkers.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg text-foreground font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Needs Attention ({deficientMarkers.length})
                  </h3>
                  <div className="grid gap-3">
                    {deficientMarkers.map((bm) => (
                      <BiomarkerResultCard key={bm.id} biomarker={bm} />
                    ))}
                  </div>
                </div>
              )}

              {/* Optimal */}
              <div>
                <h3 className="font-heading text-lg text-foreground font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  In Optimal Range ({optimalMarkers.length})
                </h3>
                <div className="grid gap-3">
                  {optimalMarkers.map((bm) => (
                    <BiomarkerResultCard key={bm.id} biomarker={bm} />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="rounded-xl flex-1" onClick={() => navigate("/dashboard")}>
                  View Full Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-xl flex-1" onClick={() => navigate("/marketplace")}>
                  Shop Recommended Supplements
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BiomarkerResultCard = ({ biomarker }: { biomarker: Biomarker }) => {
  const statusClass = biomarker.status === "optimal" ? "biomarker-optimal" : biomarker.status === "low" ? "biomarker-low" : "biomarker-high";
  const statusLabel = biomarker.status === "optimal" ? "Optimal" : biomarker.status === "low" ? "Low" : "High";

  return (
    <div className="wellness-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-heading font-semibold text-foreground text-sm">{biomarker.name}</h4>
          <Badge className={`${statusClass} text-xs border`}>{statusLabel}</Badge>
        </div>
        <span className="font-heading font-bold text-foreground">
          {biomarker.value} <span className="text-xs text-muted-foreground font-body">{biomarker.unit}</span>
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Optimal range: {biomarker.optimalMin}–{biomarker.optimalMax} {biomarker.unit}
      </p>
      {biomarker.recommendation && (
        <p className="text-xs text-foreground mt-2 flex items-start gap-1.5">
          <Zap className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
          {biomarker.recommendation}
        </p>
      )}
    </div>
  );
};

export default BloodTest;
