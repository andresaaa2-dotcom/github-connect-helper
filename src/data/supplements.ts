import { Sun, Droplets, Fish, Pill, Shield, Sparkles, Zap, Dumbbell, Heart } from "lucide-react";

export interface Supplement {
  id: string;
  name: string;
  benefit: string;
  description: string;
  price: number;
  icon: typeof Sun;
  category: "essential" | "performance" | "wellness";
  color: string;
}

export const supplements: Supplement[] = [
  {
    id: "vitamin-d",
    name: "Vitamin D",
    benefit: "Bone health & immunity",
    description: "Supports calcium absorption, immune function, and mood regulation. Essential for those with limited sun exposure.",
    price: 8,
    icon: Sun,
    category: "essential",
    color: "hsl(45, 90%, 55%)",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    benefit: "Muscle & nerve function",
    description: "Helps with muscle recovery, sleep quality, and stress management. Critical for over 300 enzymatic reactions.",
    price: 9,
    icon: Zap,
    category: "essential",
    color: "hsl(200, 60%, 50%)",
  },
  {
    id: "omega-3",
    name: "Omega-3",
    benefit: "Heart & brain health",
    description: "High-quality fish oil supporting cardiovascular health, cognitive function, and joint mobility.",
    price: 12,
    icon: Fish,
    category: "essential",
    color: "hsl(210, 70%, 50%)",
  },
  {
    id: "multivitamin",
    name: "Multivitamin",
    benefit: "Complete daily nutrition",
    description: "A comprehensive blend of essential vitamins and minerals to fill nutritional gaps in your diet.",
    price: 10,
    icon: Pill,
    category: "essential",
    color: "hsl(152, 44%, 38%)",
  },
  {
    id: "zinc",
    name: "Zinc",
    benefit: "Immune support",
    description: "Boosts immune defense, supports skin health, and aids in wound healing.",
    price: 7,
    icon: Shield,
    category: "wellness",
    color: "hsl(280, 50%, 55%)",
  },
  {
    id: "probiotics",
    name: "Probiotics",
    benefit: "Gut health",
    description: "A diverse blend of beneficial bacteria to support digestive health and immune function.",
    price: 11,
    icon: Sparkles,
    category: "wellness",
    color: "hsl(320, 50%, 55%)",
  },
  {
    id: "creatine",
    name: "Creatine",
    benefit: "Strength & performance",
    description: "Enhances exercise performance, increases strength, and supports muscle recovery.",
    price: 10,
    icon: Dumbbell,
    category: "performance",
    color: "hsl(0, 60%, 55%)",
  },
  {
    id: "electrolytes",
    name: "Electrolytes",
    benefit: "Hydration & recovery",
    description: "Essential minerals for optimal hydration, muscle function, and post-workout recovery.",
    price: 8,
    icon: Droplets,
    category: "performance",
    color: "hsl(180, 60%, 45%)",
  },
  {
    id: "protein",
    name: "Protein Supplement",
    benefit: "Muscle building",
    description: "High-quality protein to support muscle growth, repair, and overall body composition.",
    price: 14,
    icon: Heart,
    category: "performance",
    color: "hsl(25, 70%, 50%)",
  },
];

export const BUNDLE_BASE_PRICE = 39;
export const BUNDLE_DISCOUNT = 0.2; // 20% off individual pricing

export function calculateBundlePrice(selectedIds: string[]): number {
  const individualTotal = selectedIds.reduce((sum, id) => {
    const supp = supplements.find((s) => s.id === id);
    return sum + (supp?.price || 0);
  }, 0);
  
  if (selectedIds.length >= 4) {
    return Math.round(individualTotal * (1 - BUNDLE_DISCOUNT));
  }
  return individualTotal;
}
