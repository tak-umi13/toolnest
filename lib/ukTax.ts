// UK income tax, National Insurance and student-loan rules for the 2025/26
// tax year (England, Wales & NI bands; Scotland has different income-tax
// bands). Shared by the UK salary, NI and student-loan calculators so the
// rules live in exactly one place — update here each April.

export const UK_TAX_YEAR = "2025/26";

export const PERSONAL_ALLOWANCE = 12570;
const PA_TAPER_START = 100000; // PA shrinks £1 per £2 of income above this
const BASIC_LIMIT = 37700; // taxable income taxed at 20% up to here
const ADDITIONAL_THRESHOLD = 125140; // taxable income taxed at 45% above here

export function personalAllowance(gross: number): number {
  if (gross <= PA_TAPER_START) return PERSONAL_ALLOWANCE;
  return Math.max(0, PERSONAL_ALLOWANCE - (gross - PA_TAPER_START) / 2);
}

/** Income tax on annual gross (rUK bands, 2025/26). */
export function incomeTax(gross: number): number {
  const taxable = Math.max(0, gross - personalAllowance(gross));
  let tax = Math.min(taxable, BASIC_LIMIT) * 0.2;
  if (taxable > BASIC_LIMIT) tax += (Math.min(taxable, ADDITIONAL_THRESHOLD) - BASIC_LIMIT) * 0.4;
  if (taxable > ADDITIONAL_THRESHOLD) tax += (taxable - ADDITIONAL_THRESHOLD) * 0.45;
  return tax;
}

// Employee Class 1 NI, 2025/26: 8% between the primary threshold and the
// upper earnings limit, 2% above (annualised thresholds).
export const NI_PRIMARY_THRESHOLD = 12570;
export const NI_UPPER_LIMIT = 50270;

export function nationalInsurance(gross: number): number {
  let ni = 0;
  if (gross > NI_PRIMARY_THRESHOLD) ni += (Math.min(gross, NI_UPPER_LIMIT) - NI_PRIMARY_THRESHOLD) * 0.08;
  if (gross > NI_UPPER_LIMIT) ni += (gross - NI_UPPER_LIMIT) * 0.02;
  return ni;
}

// Student loan plans — 2025/26 thresholds. 9% (6% postgrad) of income above
// the plan threshold.
export const STUDENT_PLANS = {
  none: { threshold: Infinity, rate: 0, label: "No student loan" },
  plan1: { threshold: 26065, rate: 0.09, label: "Plan 1 (pre-2012 England/Wales)" },
  plan2: { threshold: 28470, rate: 0.09, label: "Plan 2 (2012–2023 England/Wales)" },
  plan4: { threshold: 32745, rate: 0.09, label: "Plan 4 (Scotland)" },
  plan5: { threshold: 25000, rate: 0.09, label: "Plan 5 (England, post-2023)" },
  postgrad: { threshold: 21000, rate: 0.06, label: "Postgraduate loan" },
} as const;

export type StudentPlan = keyof typeof STUDENT_PLANS;

export function studentLoanRepayment(gross: number, plan: StudentPlan): number {
  const p = STUDENT_PLANS[plan];
  if (!isFinite(p.threshold)) return 0;
  return Math.max(0, gross - p.threshold) * p.rate;
}
