import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Dumbbell, Utensils, User, Loader2 } from "lucide-react";

const exerciseOptions = [
  { value: "0", label: "0 times", emoji: "🧘" },
  { value: "1–2", label: "1–2 times", emoji: "🚶" },
  { value: "3–4", label: "3–4 times", emoji: "🏃" },
  { value: "5+", label: "5+ times", emoji: "💪" },
];

const dietOptions = [
  { value: "Poor", label: "Poor", emoji: "🍔" },
  { value: "Average", label: "Average", emoji: "🍝" },
  { value: "Good", label: "Good", emoji: "🥗" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const supplementOptions = [
  "Vitamin D", "Magnesium", "Omega-3", "Multivitamin", "Zinc",
  "Probiotics", "Creatine", "Protein supplements", "Electrolytes", "Other",
];

const Quiz = () => {
  const navigate = useNavigate();
  const { answers, setAnswer, currentStep, setCurrentStep, totalSteps, setIsComplete } = useQuiz();
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0: return answers.name.trim().length > 0;
      case 1: return answers.age !== null && answers.age > 0;
      case 2: return answers.gender !== "";
      case 3: return answers.exercise !== "";
      case 4: return answers.diet !== "";
      case 5: return answers.takesSupplements !== "";
      case 6: return answers.currentSupplements.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 5 && answers.takesSupplements === "No") {
      finishQuiz();
      return;
    }
    if (currentStep >= totalSteps - 1) {
      finishQuiz();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate("/");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishQuiz = () => {
    setShowAnalyzing(true);
    setTimeout(() => {
      setIsComplete(true);
      navigate("/recommendation");
    }, 2500);
  };

  const toggleSupplement = (name: string) => {
    const current = answers.currentSupplements;
    if (current.includes(name)) {
      setAnswer("currentSupplements", current.filter((s) => s !== name));
    } else {
      setAnswer("currentSupplements", [...current, name]);
    }
  };

  if (showAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-6" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Analyzing your health profile…</h2>
          <p className="text-muted-foreground">Building your personalized vitamin stack</p>
          <div className="mt-8 w-64 mx-auto">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-progress-fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">What's your name?</h2>
            <p className="text-muted-foreground mb-8">Let's personalize your experience.</p>
            <Input
              placeholder="Enter your name"
              value={answers.name}
              onChange={(e) => setAnswer("name", e.target.value)}
              className="text-lg py-6 rounded-xl max-w-md"
              autoFocus
              maxLength={50}
              onKeyDown={(e) => e.key === "Enter" && canProceed() && handleNext()}
            />
          </div>
        );
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How old are you?</h2>
            <p className="text-muted-foreground mb-8">Age helps us refine your recommendations.</p>
            <Input
              type="number"
              placeholder="Enter your age"
              value={answers.age || ""}
              onChange={(e) => setAnswer("age", parseInt(e.target.value) || null)}
              className="text-lg py-6 rounded-xl max-w-md"
              min={12}
              max={120}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && canProceed() && handleNext()}
            />
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">What's your gender?</h2>
            <p className="text-muted-foreground mb-8">This helps tailor nutrient recommendations.</p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {genderOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswer("gender", opt.value)}
                  className={answers.gender === opt.value ? "wellness-card-selected p-4 text-center cursor-pointer" : "wellness-card p-4 text-center cursor-pointer hover:border-primary/50"}
                >
                  <User className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How often do you exercise?</h2>
            <p className="text-muted-foreground mb-8">Per week on average.</p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {exerciseOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswer("exercise", opt.value)}
                  className={answers.exercise === opt.value ? "wellness-card-selected p-5 text-center cursor-pointer" : "wellness-card p-5 text-center cursor-pointer hover:border-primary/50"}
                >
                  <span className="text-2xl mb-2 block">{opt.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How would you rate your diet?</h2>
            <p className="text-muted-foreground mb-8">Be honest — it helps us help you.</p>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {dietOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswer("diet", opt.value)}
                  className={answers.diet === opt.value ? "wellness-card-selected p-5 text-center cursor-pointer" : "wellness-card p-5 text-center cursor-pointer hover:border-primary/50"}
                >
                  <span className="text-2xl mb-2 block">{opt.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Do you currently take supplements?</h2>
            <p className="text-muted-foreground mb-8">We'll factor this into your recommendations.</p>
            <div className="grid gap-3 max-w-md">
              {["Yes regularly", "Occasionally", "No"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswer("takesSupplements", opt)}
                  className={answers.takesSupplements === opt ? "wellness-card-selected p-5 text-left cursor-pointer" : "wellness-card p-5 text-left cursor-pointer hover:border-primary/50"}
                >
                  <span className="font-medium text-foreground">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="animate-fade-in">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Which supplements do you take?</h2>
            <p className="text-muted-foreground mb-8">Select all that apply.</p>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              {supplementOptions.map((name) => (
                <button
                  key={name}
                  onClick={() => toggleSupplement(name)}
                  className={answers.currentSupplements.includes(name) ? "wellness-card-selected p-4 text-left cursor-pointer" : "wellness-card p-4 text-left cursor-pointer hover:border-primary/50"}
                >
                  <span className="text-sm font-medium text-foreground">{name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
            <span className="font-heading text-lg text-foreground">vitastack</span>
            <span className="text-sm text-muted-foreground">{currentStep + 1} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-28 pb-32 section-padding">
        <div className="container max-w-2xl">
          {renderStep()}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        <div className="container max-w-2xl">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
            className="w-full rounded-full text-lg py-6"
          >
            {currentStep >= totalSteps - 1 || (currentStep === 5 && answers.takesSupplements === "No")
              ? "See My Results"
              : "Continue"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
