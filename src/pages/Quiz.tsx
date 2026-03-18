import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Loader2, User, ClipboardList } from "lucide-react";
import Navbar from "@/components/Navbar";

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
  const { answers, setAnswer, setIsComplete } = useQuiz();
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const toggleSupplement = (name: string) => {
    const current = answers.currentSupplements;
    if (current.includes(name)) {
      setAnswer("currentSupplements", current.filter((s) => s !== name));
    } else {
      setAnswer("currentSupplements", [...current, name]);
    }
  };

  const canSubmit =
    answers.name.trim().length > 0 &&
    answers.age !== null &&
    answers.age > 0 &&
    answers.gender !== "" &&
    answers.exercise !== "" &&
    answers.diet !== "" &&
    answers.takesSupplements !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    setShowAnalyzing(true);
    setTimeout(() => {
      setIsComplete(true);
      navigate("/recommendation");
    }, 2500);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold tracking-tight">
                Health Profile Quiz
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Tell us about yourself so we can personalize your recommendations.
            </p>
          </div>

          <div className="space-y-10 animate-fade-in">
            {/* Name */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">What's your name?</h2>
              <p className="text-sm text-muted-foreground mb-3">Let's personalize your experience.</p>
              <Input
                placeholder="Enter your name"
                value={answers.name}
                onChange={(e) => setAnswer("name", e.target.value)}
                className="text-base py-5 rounded-xl max-w-md"
                maxLength={50}
              />
            </section>

            {/* Age */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">How old are you?</h2>
              <p className="text-sm text-muted-foreground mb-3">Age helps us refine your recommendations.</p>
              <Input
                type="number"
                placeholder="Enter your age"
                value={answers.age || ""}
                onChange={(e) => setAnswer("age", parseInt(e.target.value) || null)}
                className="text-base py-5 rounded-xl max-w-md"
                min={12}
                max={120}
              />
            </section>

            {/* Gender */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">What's your gender?</h2>
              <p className="text-sm text-muted-foreground mb-3">This helps tailor nutrient recommendations.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
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
            </section>

            {/* Exercise */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">How often do you exercise?</h2>
              <p className="text-sm text-muted-foreground mb-3">Per week on average.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
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
            </section>

            {/* Diet */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">How would you rate your diet?</h2>
              <p className="text-sm text-muted-foreground mb-3">Be honest — it helps us help you.</p>
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
            </section>

            {/* Takes Supplements */}
            <section>
              <h2 className="font-heading text-lg text-foreground font-semibold mb-1">Do you currently take supplements?</h2>
              <p className="text-sm text-muted-foreground mb-3">We'll factor this into your recommendations.</p>
              <div className="grid gap-3 max-w-md">
                {["Yes regularly", "Occasionally", "No"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer("takesSupplements", opt)}
                    className={answers.takesSupplements === opt ? "wellness-card-selected p-4 text-left cursor-pointer" : "wellness-card p-4 text-left cursor-pointer hover:border-primary/50"}
                  >
                    <span className="font-medium text-foreground">{opt}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Current Supplements */}
            {answers.takesSupplements && answers.takesSupplements !== "No" && (
              <section className="animate-fade-in">
                <h2 className="font-heading text-lg text-foreground font-semibold mb-1">Which supplements do you take?</h2>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply.</p>
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
              </section>
            )}

            {/* Submit */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="lg"
                className="w-full rounded-full text-lg py-6"
              >
                See My Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
