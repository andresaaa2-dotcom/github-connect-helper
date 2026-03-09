import type { QuizAnswers } from "@/context/QuizContext";

export interface RecommendationReason {
  supplementId: string;
  reason: string;
}

export function generateRecommendations(answers: QuizAnswers): RecommendationReason[] {
  const recommendations: RecommendationReason[] = [];
  const currentSupplements = answers.currentSupplements || [];
  const age = answers.age || 25;

  const alreadyTaking = (id: string) => {
    const nameMap: Record<string, string> = {
      "vitamin-d": "Vitamin D",
      magnesium: "Magnesium",
      "omega-3": "Omega-3",
      multivitamin: "Multivitamin",
      zinc: "Zinc",
      probiotics: "Probiotics",
      creatine: "Creatine",
      electrolytes: "Electrolytes",
      protein: "Protein supplements",
    };
    return currentSupplements.includes(nameMap[id] || "");
  };

  // Always recommend Vitamin D unless already taking
  if (!alreadyTaking("vitamin-d")) {
    recommendations.push({
      supplementId: "vitamin-d",
      reason: "Most people don't get enough Vitamin D. It's essential for immunity and bone health.",
    });
  }

  // Low exercise → Magnesium
  if (answers.exercise === "0" || answers.exercise === "1–2") {
    if (!alreadyTaking("magnesium")) {
      recommendations.push({
        supplementId: "magnesium",
        reason: "Magnesium supports muscle relaxation and can help with stress — ideal for less active lifestyles.",
      });
    }
  }

  // Poor diet → Multivitamin
  if (answers.diet === "Poor" || answers.diet === "Average") {
    if (!alreadyTaking("multivitamin")) {
      recommendations.push({
        supplementId: "multivitamin",
        reason: "A multivitamin helps fill nutritional gaps when your diet isn't optimal.",
      });
    }
  }

  // Age > 35 → Omega-3
  if (age > 35) {
    if (!alreadyTaking("omega-3")) {
      recommendations.push({
        supplementId: "omega-3",
        reason: "After 35, Omega-3 becomes increasingly important for heart and brain health.",
      });
    }
  }

  // Frequent exercise → Electrolytes + Creatine
  if (answers.exercise === "3–4" || answers.exercise === "5+") {
    if (!alreadyTaking("electrolytes")) {
      recommendations.push({
        supplementId: "electrolytes",
        reason: "Active lifestyles require better hydration support for performance and recovery.",
      });
    }
    if (!alreadyTaking("creatine")) {
      recommendations.push({
        supplementId: "creatine",
        reason: "Creatine enhances strength and helps with post-workout recovery.",
      });
    }
  }

  // No supplements at all → add Zinc
  if (answers.takesSupplements === "No") {
    if (!alreadyTaking("zinc")) {
      recommendations.push({
        supplementId: "zinc",
        reason: "Zinc is a fundamental immune booster — a great starting point for your supplement journey.",
      });
    }
  }

  // Add Probiotics for poor diet
  if (answers.diet === "Poor") {
    if (!alreadyTaking("probiotics")) {
      recommendations.push({
        supplementId: "probiotics",
        reason: "A poor diet can affect gut health. Probiotics help restore digestive balance.",
      });
    }
  }

  // Ensure 4–6 recommendations
  const fallbackOrder = ["omega-3", "zinc", "probiotics", "magnesium", "multivitamin", "electrolytes"];
  for (const id of fallbackOrder) {
    if (recommendations.length >= 6) break;
    if (!recommendations.find((r) => r.supplementId === id) && !alreadyTaking(id)) {
      recommendations.push({
        supplementId: id,
        reason: "Recommended based on your overall health profile.",
      });
    }
  }

  return recommendations.slice(0, 6);
}
