export interface ComplexityTier {
  value: string;
  label: string;
  multiplier: number;
  enabled?: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;        // Lucide icon name
  description: string; // one line
  startingPrice: string;
  basePrice: number;   // canonical base for pricing engine
  enabled: boolean;
  includes: string[];  // shown on card back
  complexityTiers: ComplexityTier[];
}

export type ServiceConfig = Service[];
