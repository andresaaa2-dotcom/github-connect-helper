export type BiomarkerStatus = "optimal" | "low" | "high";

export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimalMin: number;
  optimalMax: number;
  status: BiomarkerStatus;
  category: "vitamins" | "minerals" | "hormones" | "lipids" | "metabolic";
  description: string;
  recommendation?: string;
  relatedSupplements?: string[];
}

export const mockBiomarkers: Biomarker[] = [
  {
    id: "vitamin-d",
    name: "Vitamin D",
    value: 22,
    unit: "ng/mL",
    min: 0,
    max: 100,
    optimalMin: 40,
    optimalMax: 80,
    status: "low",
    category: "vitamins",
    description: "Essential for bone health, immune function, and mood regulation.",
    recommendation: "Supplement with Vitamin D3 + K2 (5000 IU daily) and increase sun exposure.",
    relatedSupplements: ["vitamin-d"],
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    value: 520,
    unit: "pg/mL",
    min: 0,
    max: 2000,
    optimalMin: 400,
    optimalMax: 1100,
    status: "optimal",
    category: "vitamins",
    description: "Critical for energy production, neurological function, and red blood cell formation.",
  },
  {
    id: "iron",
    name: "Iron (Serum)",
    value: 65,
    unit: "µg/dL",
    min: 0,
    max: 200,
    optimalMin: 60,
    optimalMax: 170,
    status: "optimal",
    category: "minerals",
    description: "Essential for oxygen transport and energy metabolism.",
  },
  {
    id: "ferritin",
    name: "Ferritin",
    value: 35,
    unit: "ng/mL",
    min: 0,
    max: 400,
    optimalMin: 40,
    optimalMax: 200,
    status: "low",
    category: "minerals",
    description: "Indicates your body's iron storage levels. Low levels can cause fatigue.",
    recommendation: "Consider iron supplementation and increase red meat or leafy greens intake.",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    value: 1.8,
    unit: "mg/dL",
    min: 0,
    max: 4,
    optimalMin: 2.0,
    optimalMax: 2.5,
    status: "low",
    category: "minerals",
    description: "Crucial for muscle function, sleep quality, and over 300 enzymatic reactions.",
    recommendation: "Supplement with Magnesium Glycinate (400mg) before bed for improved sleep and recovery.",
    relatedSupplements: ["magnesium"],
  },
  {
    id: "testosterone",
    name: "Testosterone",
    value: 580,
    unit: "ng/dL",
    min: 0,
    max: 1200,
    optimalMin: 400,
    optimalMax: 900,
    status: "optimal",
    category: "hormones",
    description: "Key hormone for muscle mass, energy, and overall vitality.",
  },
  {
    id: "cortisol",
    name: "Cortisol",
    value: 22,
    unit: "µg/dL",
    min: 0,
    max: 30,
    optimalMin: 6,
    optimalMax: 18,
    status: "high",
    category: "hormones",
    description: "Stress hormone. Chronically elevated levels impair recovery and sleep.",
    recommendation: "Consider Ashwagandha (600mg daily) and stress management techniques.",
    relatedSupplements: ["ashwagandha"],
  },
  {
    id: "cholesterol-total",
    name: "Total Cholesterol",
    value: 195,
    unit: "mg/dL",
    min: 0,
    max: 400,
    optimalMin: 125,
    optimalMax: 200,
    status: "optimal",
    category: "lipids",
    description: "Overall cholesterol level. Balanced levels support cardiovascular health.",
  },
  {
    id: "omega-3-index",
    name: "Omega-3 Index",
    value: 4.2,
    unit: "%",
    min: 0,
    max: 15,
    optimalMin: 8,
    optimalMax: 12,
    status: "low",
    category: "lipids",
    description: "Measures EPA + DHA levels in red blood cells. Key for heart and brain health.",
    recommendation: "Supplement with high-quality Omega-3 Fish Oil (2g EPA/DHA daily).",
    relatedSupplements: ["omega-3"],
  },
  {
    id: "glucose-fasting",
    name: "Fasting Glucose",
    value: 92,
    unit: "mg/dL",
    min: 0,
    max: 200,
    optimalMin: 70,
    optimalMax: 90,
    status: "high",
    category: "metabolic",
    description: "Blood sugar level after fasting. Elevated levels indicate metabolic stress.",
    recommendation: "Consider Berberine or Chromium supplementation with dietary changes.",
  },
];

export interface WearableMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  status: BiomarkerStatus;
  history: number[];
}

export const mockWearableData: WearableMetric[] = [
  {
    id: "hrv",
    name: "HRV",
    value: 42,
    unit: "ms",
    trend: "up",
    trendPercent: 8,
    status: "optimal",
    history: [35, 38, 36, 40, 39, 42, 42],
  },
  {
    id: "rhr",
    name: "Resting HR",
    value: 58,
    unit: "bpm",
    trend: "down",
    trendPercent: 3,
    status: "optimal",
    history: [62, 60, 61, 59, 58, 58, 57],
  },
  {
    id: "sleep",
    name: "Sleep Score",
    value: 68,
    unit: "/100",
    trend: "down",
    trendPercent: 5,
    status: "low",
    history: [75, 72, 70, 65, 68, 66, 68],
  },
  {
    id: "recovery",
    name: "Recovery",
    value: 72,
    unit: "%",
    trend: "stable",
    trendPercent: 1,
    status: "optimal",
    history: [70, 68, 74, 71, 73, 70, 72],
  },
  {
    id: "strain",
    name: "Training Load",
    value: 14.2,
    unit: "AU",
    trend: "up",
    trendPercent: 12,
    status: "high",
    history: [10, 11, 12, 13, 14, 13.5, 14.2],
  },
  {
    id: "steps",
    name: "Daily Steps",
    value: 8420,
    unit: "steps",
    trend: "up",
    trendPercent: 6,
    status: "optimal",
    history: [7200, 7800, 8100, 7900, 8300, 8500, 8420],
  },
];

export const biomarkerCategories = [
  { id: "all", label: "All Biomarkers" },
  { id: "vitamins", label: "Vitamins" },
  { id: "minerals", label: "Minerals" },
  { id: "hormones", label: "Hormones" },
  { id: "lipids", label: "Lipids" },
  { id: "metabolic", label: "Metabolic" },
] as const;
