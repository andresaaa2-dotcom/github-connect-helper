import { Sun, Droplets, Fish, Pill, Shield, Sparkles, Zap, Dumbbell, Heart, Leaf, Brain, Eye, Moon, Flame, Apple, FlaskConical } from "lucide-react";

import imgVitaminD from "@/assets/products/vitamin-d.jpg";
import imgMagnesium from "@/assets/products/magnesium.jpg";
import imgOmega3 from "@/assets/products/omega-3.jpg";
import imgCreatine from "@/assets/products/creatine.jpg";
import imgAshwagandha from "@/assets/products/ashwagandha.jpg";
import imgProbiotics from "@/assets/products/probiotics.jpg";
import imgElectrolytes from "@/assets/products/electrolytes.jpg";
import imgLionsMane from "@/assets/products/lions-mane.jpg";
import imgRhodiola from "@/assets/products/rhodiola.jpg";
import imgZinc from "@/assets/products/zinc.jpg";
import imgCoq10 from "@/assets/products/coq10.jpg";
import imgGlycine from "@/assets/products/glycine.jpg";
import imgMultivitamin from "@/assets/products/multivitamin.jpg";
import imgBerberine from "@/assets/products/berberine.jpg";

export interface PersonalizedDosage {
  status: "low" | "high" | "optimal";
  range: string;
  note: string;
}

export interface Supplement {
  id: string;
  name: string;
  benefit: string;
  description: string;
  price: number;
  icon: typeof Sun;
  image: string;
  category: "vitamins" | "minerals" | "adaptogens" | "performance" | "recovery" | "cognitive" | "longevity";
  color: string;
  rating: number;
  reviews: number;
  servings: number;
  tags: string[];
  featured?: boolean;
  evidence: string;
  dosage: string;
  personalizedDosage?: PersonalizedDosage[];
  recommendedFor?: string[];
}

export const supplements: Supplement[] = [
  {
    id: "vitamin-d",
    name: "Vitamin D3 + K2",
    benefit: "Bone health, immunity & mood",
    description: "Supports calcium absorption, immune function, and mood regulation. Essential for those with limited sun exposure. K2 directs calcium to bones, not arteries.",
    price: 14,
    icon: Sun,
    image: imgVitaminD,
    category: "vitamins",
    color: "hsl(45, 90%, 55%)",
    rating: 4.9,
    reviews: 3841,
    servings: 60,
    tags: ["bestseller", "immunity", "biomarker-linked"],
    featured: true,
    evidence: "Meta-analysis of 25 RCTs shows significant reduction in respiratory infection risk (BMJ 2017).",
    dosage: "5000 IU D3 + 100mcg K2 daily with fat-containing meal",
    personalizedDosage: [
      { status: "low", range: "5,000–10,000 IU/day", note: "Your Vitamin D is below optimal. Higher dose recommended for 8–12 weeks, then retest." },
      { status: "optimal", range: "2,000–4,000 IU/day", note: "Maintenance dose to keep your levels in the optimal range." },
      { status: "high", range: "1,000 IU/day or pause", note: "Your Vitamin D is elevated. Reduce intake and retest in 4 weeks." },
    ],
    recommendedFor: ["Low Vitamin D", "Low sun exposure", "Immune support"],
  },
  {
    id: "magnesium",
    name: "Magnesium Glycinate",
    benefit: "Sleep, recovery & stress",
    description: "Highly bioavailable form of magnesium that supports muscle recovery, sleep quality, and stress management. Critical for over 300 enzymatic reactions.",
    price: 16,
    icon: Zap,
    image: imgMagnesium,
    category: "minerals",
    color: "hsl(220, 70%, 50%)",
    rating: 4.8,
    reviews: 2876,
    servings: 60,
    tags: ["sleep", "recovery", "biomarker-linked"],
    featured: true,
    evidence: "Double-blind RCT: significant improvement in sleep quality (ISRN Nutrition 2012).",
    dosage: "400mg elemental magnesium 30 min before sleep",
    personalizedDosage: [
      { status: "low", range: "400–600mg/day", note: "Your Magnesium is low. Split dose: 200mg morning + 400mg before bed." },
      { status: "optimal", range: "200–400mg/day", note: "Maintenance dose, best taken before sleep for recovery." },
      { status: "high", range: "Pause supplementation", note: "Magnesium levels are elevated. Pause and retest in 4 weeks." },
    ],
    recommendedFor: ["Low Magnesium", "Poor sleep", "High training load"],
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    benefit: "Heart, brain & inflammation",
    description: "Ultra-pure triglyceride-form fish oil. High EPA/DHA supporting cardiovascular health, cognitive function, and inflammation control.",
    price: 22,
    icon: Fish,
    image: imgOmega3,
    category: "vitamins",
    color: "hsl(200, 70%, 50%)",
    rating: 4.7,
    reviews: 2143,
    servings: 60,
    tags: ["heart", "brain", "biomarker-linked"],
    featured: true,
    evidence: "VITAL study (NEJM 2019): 28% reduction in heart attack risk with EPA/DHA supplementation.",
    dosage: "2000mg combined EPA/DHA daily with meals",
    personalizedDosage: [
      { status: "low", range: "3,000–4,000mg EPA/DHA/day", note: "Your Omega-3 Index is low. Higher dose for 8 weeks to restore levels." },
      { status: "optimal", range: "1,000–2,000mg EPA/DHA/day", note: "Maintenance dose to sustain your Omega-3 Index." },
      { status: "high", range: "1,000mg EPA/DHA/day", note: "Good levels. Lower maintenance dose is sufficient." },
    ],
    recommendedFor: ["Low Omega-3 Index", "Cardiovascular risk", "Cognitive support"],
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    benefit: "Strength, power & cognition",
    description: "The most researched performance supplement. Enhances strength, power output, and has emerging cognitive benefits.",
    price: 18,
    icon: Dumbbell,
    image: imgCreatine,
    category: "performance",
    color: "hsl(0, 60%, 55%)",
    rating: 4.9,
    reviews: 3654,
    servings: 60,
    tags: ["muscle", "strength", "research-backed"],
    featured: true,
    evidence: "Over 700 studies. ISSN position stand: improves high-intensity exercise capacity by 10-20%.",
    dosage: "5g daily, no cycling needed",
    recommendedFor: ["Strength training", "High training load", "Cognitive performance"],
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha KSM-66",
    benefit: "Stress, cortisol & vitality",
    description: "Gold-standard ashwagandha extract. Clinically proven to reduce cortisol, improve stress resilience, and enhance testosterone.",
    price: 19,
    icon: Leaf,
    image: imgAshwagandha,
    category: "adaptogens",
    color: "hsl(130, 40%, 45%)",
    rating: 4.8,
    reviews: 2190,
    servings: 60,
    tags: ["stress", "adaptogen", "biomarker-linked"],
    evidence: "RCT showed 27.9% reduction in serum cortisol (Indian J Psych Med 2012).",
    dosage: "600mg KSM-66 daily",
    personalizedDosage: [
      { status: "high", range: "600mg/day for 8 weeks", note: "Your Cortisol is elevated. Full dose to support stress recovery, then reassess." },
      { status: "optimal", range: "300mg/day", note: "Lower maintenance dose for ongoing stress resilience." },
      { status: "low", range: "Not indicated", note: "Cortisol is already low. Ashwagandha may not be appropriate — consult a physician." },
    ],
    recommendedFor: ["High Cortisol", "Chronic stress", "Recovery optimization"],
  },
  {
    id: "probiotics",
    name: "Multi-Strain Probiotic",
    benefit: "Gut health & immunity",
    description: "25 billion CFU with 14 clinically studied strains. Supports digestive health, immune function, and nutrient absorption.",
    price: 24,
    icon: Sparkles,
    image: imgProbiotics,
    category: "longevity",
    color: "hsl(280, 50%, 55%)",
    rating: 4.7,
    reviews: 1810,
    servings: 30,
    tags: ["gut", "digestion", "immunity"],
    evidence: "Cochrane review: probiotics reduce antibiotic-associated diarrhea by 42%.",
    dosage: "1 capsule daily on empty stomach",
    recommendedFor: ["Digestive issues", "Immune support", "Antibiotic recovery"],
  },
  {
    id: "electrolytes",
    name: "Electrolyte Complex",
    benefit: "Hydration & performance",
    description: "Precise ratio of sodium, potassium, and magnesium for optimal hydration and muscle function during training.",
    price: 15,
    icon: Droplets,
    image: imgElectrolytes,
    category: "performance",
    color: "hsl(180, 60%, 45%)",
    rating: 4.6,
    reviews: 1420,
    servings: 30,
    tags: ["hydration", "recovery", "training"],
    evidence: "Sports Med review: electrolyte replacement improves endurance performance by 3-5%.",
    dosage: "1 scoop in water during/after training",
    recommendedFor: ["High training load", "Heavy sweating", "Endurance athletes"],
  },
  {
    id: "lions-mane",
    name: "Lion's Mane Extract",
    benefit: "Focus, memory & NGF",
    description: "Dual extract (fruiting body + mycelium) mushroom for nerve growth factor stimulation, cognitive clarity, and neuroprotection.",
    price: 24,
    icon: Brain,
    image: imgLionsMane,
    category: "cognitive",
    color: "hsl(35, 60%, 55%)",
    rating: 4.7,
    reviews: 1520,
    servings: 60,
    tags: ["focus", "brain", "nootropic"],
    evidence: "Clinical trial: significant improvement in cognitive function scores over 16 weeks (Phytother Res 2009).",
    dosage: "1000mg dual extract daily",
    recommendedFor: ["Cognitive fatigue", "Focus issues", "Neuroprotection"],
  },
  {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    benefit: "Mental energy & endurance",
    description: "Adaptogenic herb that enhances mental performance under stress, reduces fatigue, and supports physical endurance.",
    price: 17,
    icon: Flame,
    image: imgRhodiola,
    category: "adaptogens",
    color: "hsl(15, 75%, 55%)",
    rating: 4.6,
    reviews: 980,
    servings: 60,
    tags: ["energy", "adaptogen", "focus"],
    evidence: "Systematic review: reduces mental fatigue and improves attention under stress (Phytomedicine 2012).",
    dosage: "400mg standardized extract daily, morning",
    recommendedFor: ["Mental fatigue", "Stress", "Endurance training"],
  },
  {
    id: "zinc",
    name: "Zinc Picolinate",
    benefit: "Immune defense & hormones",
    description: "Highly absorbable zinc form supporting immune function, testosterone production, and wound healing.",
    price: 12,
    icon: Shield,
    image: imgZinc,
    category: "minerals",
    color: "hsl(220, 50%, 55%)",
    rating: 4.7,
    reviews: 1287,
    servings: 60,
    tags: ["immunity", "hormones"],
    evidence: "Meta-analysis: zinc supplementation reduces cold duration by 33% (JRSM Open 2017).",
    dosage: "30mg daily with food",
    personalizedDosage: [
      { status: "low", range: "30–50mg/day", note: "Your Zinc is below optimal. Take with food to improve absorption." },
      { status: "optimal", range: "15–30mg/day", note: "Maintenance dose to support immune function and hormone health." },
      { status: "high", range: "Pause supplementation", note: "Zinc is elevated. Excess zinc can impair copper absorption — pause and retest." },
    ],
    recommendedFor: ["Immune support", "Low Zinc", "Testosterone optimization"],
  },
  {
    id: "coq10",
    name: "CoQ10 Ubiquinol",
    benefit: "Cellular energy & heart",
    description: "Active form of CoQ10 for superior absorption. Supports mitochondrial energy production and cardiovascular health.",
    price: 28,
    icon: Heart,
    image: imgCoq10,
    category: "longevity",
    color: "hsl(0, 55%, 50%)",
    rating: 4.8,
    reviews: 1180,
    servings: 60,
    tags: ["energy", "heart", "longevity"],
    evidence: "Q-SYMBIO trial: 43% reduction in cardiovascular events (JACC Heart Fail 2014).",
    dosage: "200mg ubiquinol daily with fat-containing meal",
    recommendedFor: ["Energy production", "Cardiovascular health", "Statin users"],
  },
  {
    id: "glycine",
    name: "Glycine",
    benefit: "Deep sleep & collagen",
    description: "Amino acid that improves sleep quality, supports collagen synthesis, and acts as an inhibitory neurotransmitter.",
    price: 12,
    icon: Moon,
    image: imgGlycine,
    category: "recovery",
    color: "hsl(240, 40%, 55%)",
    rating: 4.6,
    reviews: 890,
    servings: 60,
    tags: ["sleep", "recovery", "collagen"],
    evidence: "Placebo-controlled study: 3g glycine before bed improved subjective sleep quality (Sleep Biol Rhythms 2007).",
    dosage: "3g powder 30 min before bed",
    recommendedFor: ["Poor sleep", "Recovery optimization", "Joint health"],
  },
  {
    id: "multivitamin",
    name: "Foundation Multi",
    benefit: "Comprehensive daily coverage",
    description: "Methylated B-vitamins, chelated minerals, and whole-food cofactors. Fills nutritional gaps without mega-dosing.",
    price: 20,
    icon: Pill,
    image: imgMultivitamin,
    category: "vitamins",
    color: "hsl(152, 44%, 38%)",
    rating: 4.6,
    reviews: 3402,
    servings: 30,
    tags: ["daily", "foundation"],
    evidence: "Physicians' Health Study II: multivitamin use associated with 8% cancer risk reduction (JAMA 2012).",
    dosage: "2 capsules daily with breakfast",
    recommendedFor: ["Nutritional gaps", "General wellness"],
  },
  {
    id: "berberine",
    name: "Berberine HCl",
    benefit: "Blood sugar & metabolic health",
    description: "Plant compound that rivals metformin for glucose control. Activates AMPK, the body's metabolic master switch.",
    price: 22,
    icon: FlaskConical,
    image: imgBerberine,
    category: "longevity",
    color: "hsl(50, 70%, 45%)",
    rating: 4.7,
    reviews: 760,
    servings: 60,
    tags: ["metabolic", "glucose", "longevity"],
    evidence: "Meta-analysis: similar efficacy to metformin in reducing HbA1c (J Ethnopharmacol 2015).",
    dosage: "500mg 2-3x daily with meals",
    personalizedDosage: [
      { status: "high", range: "500mg 2–3x/day", note: "Your HbA1c / fasting glucose is elevated. Full therapeutic dose recommended." },
      { status: "optimal", range: "500mg 1x/day", note: "Preventive dose for metabolic maintenance." },
      { status: "low", range: "Not indicated", note: "Blood sugar is already low. Berberine may cause hypoglycemia — not recommended." },
    ],
    recommendedFor: ["Elevated glucose", "Metabolic optimization", "Longevity"],
  },
];

export const categories = [
  { id: "all", label: "All Products", icon: Sparkles },
  { id: "vitamins", label: "Vitamins", icon: Pill },
  { id: "minerals", label: "Minerals", icon: Shield },
  { id: "adaptogens", label: "Adaptogens", icon: Leaf },
  { id: "performance", label: "Performance", icon: Dumbbell },
  { id: "recovery", label: "Recovery", icon: Moon },
  { id: "cognitive", label: "Cognitive", icon: Brain },
  { id: "longevity", label: "Longevity", icon: Heart },
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
