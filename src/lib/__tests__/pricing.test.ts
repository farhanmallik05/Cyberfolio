import { calculatePrice } from '../pricing';
import { describe, it, expect } from 'vitest';

describe('Pricing Calculator', () => {
  it('calculates baseline web-dev landing page correctly', () => {
    // Web-dev base: 6999, landing multiplier: 1.0, standard: 1.0 -> center = 6999
    // raw min: 6999 * 0.85 = 5949.15 -> round to nearest 100 = 5900
    // raw max: 6999 * 1.15 = 8048.85 -> round to nearest 100 = 8000
    // min USD: 5900 / 83 = 71.08 -> round to nearest 5 = 70
    // max USD: 8000 / 83 = 96.38 -> round to nearest 5 = 95
    const result = calculatePrice({
      basePrice: 6999,
      complexityMultiplier: 1.0,
      timeline: 'standard'
    });

    expect(result.minINR).toBe(5900);
    expect(result.maxINR).toBe(8000);
    expect(result.minUSD).toBe(70);
    expect(result.maxUSD).toBe(95);
  });

  it('calculates ai-automation ai-platform rush correctly', () => {
    // AI-automation base: 4999, ai-platform multiplier: 5.0, rush: 1.4 -> center = 34993
    // min: 34993 * 0.85 = 29744.05 -> 29700
    // max: 34993 * 1.15 = 40241.95 -> 40200
    // USD min: 29700 / 83 = 357.83 -> 360
    // USD max: 40200 / 83 = 484.33 -> 485
    const result = calculatePrice({
      basePrice: 4999,
      complexityMultiplier: 5.0,
      timeline: 'rush'
    });

    expect(result.minINR).toBe(29700);
    expect(result.maxINR).toBe(40200);
    expect(result.minUSD).toBe(360);
    expect(result.maxUSD).toBe(485);
  });

  it('calculates uiux design-system flexible correctly (discount)', () => {
    // UI/UX base: 2999, design-system multiplier: 2.5, flexible: 0.9 -> center = 6747.75
    // min: 6747.75 * 0.85 = 5735.5875 -> 5700
    // max: 6747.75 * 1.15 = 7759.9125 -> 7800
    // USD min: 5700 / 83 = 68.67 -> 70
    // USD max: 7800 / 83 = 93.97 -> 95
    const result = calculatePrice({
      basePrice: 2999,
      complexityMultiplier: 2.5,
      timeline: 'flexible'
    });

    expect(result.minINR).toBe(5700);
    expect(result.maxINR).toBe(7800);
    expect(result.minUSD).toBe(70);
    expect(result.maxUSD).toBe(95);
  });

  it('calculates graphic-design brand-identity standard correctly', () => {
    // Graphic base: 1999, brand-identity multiplier: 2.0, standard: 1.0 -> center = 3998
    // min: 3998 * 0.85 = 3398.3 -> 3400
    // max: 3998 * 1.15 = 4597.7 -> 4600
    // USD min: 3400 / 83 = 40.96 -> 40
    // USD max: 4600 / 83 = 55.42 -> 55
    const result = calculatePrice({
      basePrice: 1999,
      complexityMultiplier: 2.0,
      timeline: 'standard'
    });

    expect(result.minINR).toBe(3400);
    expect(result.maxINR).toBe(4600);
    expect(result.minUSD).toBe(40);
    expect(result.maxUSD).toBe(55);
  });
});
