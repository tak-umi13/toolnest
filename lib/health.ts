// Shared helpers for the Health & Fitness tools. All calculators take metric
// internally; these convert imperial inputs so the formulas stay simple.
export const lbToKg = (lb: number) => lb * 0.45359237;
export const kgToLb = (kg: number) => kg / 0.45359237;
export const inToCm = (inch: number) => inch * 2.54;
export const cmToIn = (cm: number) => cm / 2.54;

export type Sex = "male" | "female";

// Activity multipliers applied to BMR to estimate total daily energy (TDEE).
export const ACTIVITY = [
  { id: "sedentary", label: "Sedentary (little/no exercise)", factor: 1.2 },
  { id: "light", label: "Light (1–3 days/week)", factor: 1.375 },
  { id: "moderate", label: "Moderate (3–5 days/week)", factor: 1.55 },
  { id: "active", label: "Active (6–7 days/week)", factor: 1.725 },
  { id: "veryactive", label: "Very active (hard daily / physical job)", factor: 1.9 },
] as const;
