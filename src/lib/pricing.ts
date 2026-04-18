export interface PricingInput {
  basePrice: number;
  complexityMultiplier: number;
  timeline: 'rush' | 'standard' | 'flexible';
}

export interface PricingOutput {
  minINR: number;
  maxINR: number;
  minUSD: number;
  maxUSD: number;
}

export const USD_RATE_NOTE = "USD rate fixed at 83 INR = 1 USD (Updated: April 2026). Final quotes given during scoping.";
const USD_RATE = 83;

/**
 * Pure pricing calculation. Accepts base price and complexity multiplier
 * directly — the caller (PricingCalculator component) resolves these
 * from the SERVICES ledger.
 */
export function calculatePrice(input: PricingInput): PricingOutput {
  const timelineMultiplier: Record<string, number> = {
    rush: 1.4,
    standard: 1.0,
    flexible: 0.9
  };

  const timeMult = timelineMultiplier[input.timeline] || 1.0;

  const center = input.basePrice * input.complexityMultiplier * timeMult;

  // Calculate range +/- 15%
  const rawMinINR = center * 0.85;
  const rawMaxINR = center * 1.15;

  // Round INR to nearest 100
  const minINR = Math.round(rawMinINR / 100) * 100;
  const maxINR = Math.round(rawMaxINR / 100) * 100;

  // Calculate USD and round to nearest 5
  const rawMinUSD = minINR / USD_RATE;
  const rawMaxUSD = maxINR / USD_RATE;

  const minUSD = Math.round(rawMinUSD / 5) * 5;
  const maxUSD = Math.round(rawMaxUSD / 5) * 5;

  return {
    minINR,
    maxINR,
    minUSD,
    maxUSD
  };
}
