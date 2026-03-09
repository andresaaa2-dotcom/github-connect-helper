import { Sun, Droplets, Fish, Pill, Shield, Sparkles, Zap, Dumbbell, Heart, Leaf, Brain, Eye, Moon, Flame, Apple } from "lucide-react";

export interface Supplement {
  id: string;
  name: string;
  benefit: string;
  description: string;
  price: number;
  icon: typeof Sun;
  category: "essential" | "performance" | "wellness" | "beauty" | "cognitive";
  color: string;
  rating: number;
  reviews: number;
  servings: number;
  tags: string[];
  featured?: boolean;
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
    rating: 4.9,
    reviews: 2341,
    servings: 30,
    tags: ["bestseller", "immunity"],
    featured: true,
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
    rating: 4.8,
    reviews: 1876,
    servings: 30,
    tags: ["sleep", "recovery"],
    featured: true,
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
    rating: 4.7,
    reviews: 1543,
    servings: 30,
    tags: ["heart", "brain"],
    featured: true,
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
    rating: 4.6,
    reviews: 3102,
    servings: 30,
    tags: ["daily", "foundation"],
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
    rating: 4.7,
    reviews: 987,
    servings: 30,
    tags: ["immunity", "skin"],
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
    rating: 4.8,
    reviews: 2210,
    servings: 30,
    tags: ["gut", "digestion"],
    featured: true,
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
    rating: 4.9,
    reviews: 1654,
    servings: 30,
    tags: ["muscle", "strength"],
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
    rating: 4.6,
    reviews: 1120,
    servings: 30,
    tags: ["hydration", "recovery"],
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
    rating: 4.7,
    reviews: 2430,
    servings: 30,
    tags: ["muscle", "recovery"],
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    benefit: "Stress & adaptogen",
    description: "An ancient adaptogen that helps your body manage stress, supports energy levels, and promotes mental clarity.",
    price: 11,
    icon: Leaf,
    category: "wellness",
    color: "hsl(130, 40%, 45%)",
    rating: 4.8,
    reviews: 1890,
    servings: 30,
    tags: ["stress", "adaptogen"],
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    benefit: "Focus & memory",
    description: "A medicinal mushroom that supports cognitive function, nerve growth, and mental clarity.",
    price: 13,
    icon: Brain,
    category: "cognitive",
    color: "hsl(35, 60%, 55%)",
    rating: 4.7,
    reviews: 1320,
    servings: 30,
    tags: ["focus", "brain"],
  },
  {
    id: "lutein",
    name: "Lutein",
    benefit: "Eye health",
    description: "Supports eye health and protects against blue light damage from screens.",
    price: 9,
    icon: Eye,
    category: "wellness",
    color: "hsl(40, 80%, 50%)",
    rating: 4.5,
    reviews: 756,
    servings: 30,
    tags: ["eyes", "screen protection"],
  },
  {
    id: "melatonin",
    name: "Melatonin",
    benefit: "Sleep support",
    description: "Natural sleep hormone support for better sleep quality and healthy circadian rhythm.",
    price: 7,
    icon: Moon,
    category: "wellness",
    color: "hsl(240, 40%, 55%)",
    rating: 4.6,
    reviews: 2100,
    servings: 30,
    tags: ["sleep", "relaxation"],
  },
  {
    id: "coq10",
    name: "CoQ10",
    benefit: "Energy & heart",
    description: "Coenzyme Q10 supports cellular energy production and cardiovascular health.",
    price: 15,
    icon: Flame,
    category: "performance",
    color: "hsl(15, 75%, 55%)",
    rating: 4.8,
    reviews: 980,
    servings: 30,
    tags: ["energy", "heart"],
  },
  {
    id: "fiber",
    name: "Fiber Complex",
    benefit: "Digestive health",
    description: "A blend of soluble and insoluble fiber to support healthy digestion and regularity.",
    price: 8,
    icon: Apple,
    category: "wellness",
    color: "hsl(100, 50%, 45%)",
    rating: 4.5,
    reviews: 640,
    servings: 30,
    tags: ["digestion", "gut"],
  },
];

export const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "essential", label: "Essentials", icon: Pill },
  { id: "performance", label: "Performance", icon: Dumbbell },
  { id: "wellness", label: "Wellness", icon: Heart },
  { id: "cognitive", label: "Cognitive", icon: Brain },
] as const;

export const BUNDLE_BASE_PRICE = 39;
export const BUNDLE_DISCOUNT = 0.2;

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
