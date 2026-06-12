// India new-regime income tax, FY 2025-26 / AY 2026-27 (post Budget 2025).
// Shared by the income-tax and in-hand-salary calculators. Pure functions —
// safe to import from client components.

export const NEW_REGIME_SLABS = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 5 },
  { upTo: 1200000, rate: 10 },
  { upTo: 1600000, rate: 15 },
  { upTo: 2000000, rate: 20 },
  { upTo: 2400000, rate: 25 },
  { upTo: Infinity, rate: 30 },
];

/** Standard deduction for salaried income under the new regime. */
export const STANDARD_DEDUCTION = 75000;

export interface TaxResult {
  slabTax: number; // tax after rebate/marginal relief, before cess
  cess: number; // 4% health & education cess
  total: number;
}

/**
 * Tax on taxable income (after deductions) for a resident individual under the
 * new regime: slab tax, §87A rebate (zero tax up to ₹12L taxable) with marginal
 * relief just above it, plus 4% cess.
 */
export function newRegimeTax(taxable: number): TaxResult {
  let tax = 0;
  let prev = 0;
  for (const s of NEW_REGIME_SLABS) {
    const amount = Math.min(taxable, s.upTo) - prev;
    if (amount > 0) tax += (amount * s.rate) / 100;
    prev = s.upTo;
    if (taxable <= s.upTo) break;
  }
  if (taxable <= 1200000) {
    tax = 0; // §87A rebate
  } else {
    tax = Math.min(tax, taxable - 1200000); // marginal relief just above ₹12L
  }
  const cess = tax * 0.04;
  return { slabTax: tax, cess, total: tax + cess };
}
