'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculatePrice, PricingOutput, USD_RATE_NOTE } from '@/lib/pricing';
import { MechPanel } from '@/components/ui/MechPanel';
import { ServiceConfig } from '@/types/services';

export function PricingCalculator({ serviceConfig }: { serviceConfig: ServiceConfig }) {
  // Filter services and tiers based on admin config
  const enabledServices = useMemo(() => {
    return serviceConfig
      .filter(s => s.enabled)
      .map(s => ({
        ...s,
        complexityTiers: s.complexityTiers.filter(t => t.enabled !== false)
      }));
  }, [serviceConfig]);

  const firstService = enabledServices[0] ?? {
    id: 'placeholder',
    title: 'Loading...',
    basePrice: 0,
    complexityTiers: [{ value: 'standard', label: 'Standard', multiplier: 1 }]
  };

  const [input, setInput] = useState({
    serviceId: firstService.id,
    complexityValue: firstService.complexityTiers[0].value,
    timeline: 'standard' as 'rush' | 'standard' | 'flexible'
  });

  const [output, setOutput] = useState<PricingOutput | null>(null);

  // Get current service's complexity tiers (from filtered list)
  const currentService = enabledServices.find(s => s.id === input.serviceId) ?? firstService;

  useEffect(() => {
    const tier = currentService.complexityTiers.find(t => t.value === input.complexityValue);
    setOutput(calculatePrice({
      basePrice: currentService.basePrice,
      complexityMultiplier: tier?.multiplier ?? 1.0,
      timeline: input.timeline
    }));
  }, [input, currentService]);

  // When service changes, reset complexity to first tier of new service
  const handleServiceChange = (newServiceId: string) => {
    const newService = enabledServices.find(s => s.id === newServiceId) ?? firstService;
    setInput({
      ...input,
      serviceId: newServiceId,
      complexityValue: newService.complexityTiers[0].value
    });
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-embed');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timelineSteps = [
    { value: 'flexible', label: 'Flexible', desc: '10% discount' },
    { value: 'standard', label: 'Standard', desc: 'Baseline' },
    { value: 'rush', label: 'Rush', desc: '40% premium' }
  ];

  return (
    <section className="py-16 px-6 sm:px-12 md:px-24 mx-auto max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-mech-silver mb-4">
          Service <span className="text-mech-cyan">Calculator</span>
        </h2>
        <p className="text-mech-silver/70 font-rajdhani text-lg max-w-2xl mx-auto">
          Configure your deployment parameters to generate a baseline estimate.
        </p>
      </div>

      <MechPanel glowHover={false} className="p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            {/* Service Type */}
            <div>
              <label htmlFor="service-select" className="block text-sm font-mono text-mech-cyan uppercase tracking-widest mb-3">
                Service Class
              </label>
              <select
                id="service-select"
                value={input.serviceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full bg-[#030712] border border-mech-cyan/30 text-mech-silver rounded p-3 font-rajdhani text-lg focus:outline-none focus:border-mech-cyan focus:ring-1 focus:ring-mech-cyan transition-colors cursor-pointer"
              >
                {enabledServices.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Complexity */}
            <div>
              <label htmlFor="complexity-select" className="block text-sm font-mono text-mech-cyan uppercase tracking-widest mb-3">
                Scope & Complexity
              </label>
              <select
                id="complexity-select"
                value={input.complexityValue}
                onChange={(e) => setInput({ ...input, complexityValue: e.target.value })}
                className="w-full bg-[#030712] border border-mech-cyan/30 text-mech-silver rounded p-3 font-rajdhani text-lg focus:outline-none focus:border-mech-cyan focus:ring-1 focus:ring-mech-cyan transition-colors cursor-pointer"
              >
                {currentService.complexityTiers.map(tier => (
                  <option key={tier.value} value={tier.value}>{tier.label}</option>
                ))}
              </select>
            </div>

            {/* Timeline Slider */}
            <div>
              <label className="block text-sm font-mono text-mech-cyan uppercase tracking-widest mb-6">
                Deployment Timeline
              </label>
              <div className="relative pt-2 pb-8">
                <input
                  id="timeline-range"
                  type="range"
                  aria-label="Deployment Timeline"
                  min="0"
                  max="2"
                  step="1"
                  value={timelineSteps.findIndex(s => s.value === input.timeline)}
                  onChange={(e) => setInput({ ...input, timeline: timelineSteps[parseInt(e.target.value)].value as 'rush' | 'standard' | 'flexible' })}
                  className="w-full h-2 bg-mech-cyan/20 rounded-lg appearance-none cursor-pointer accent-mech-cyan"
                />
                <div className="flex justify-between mt-4 text-xs font-mono text-mech-silver/60 px-1 absolute w-full left-0">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className={`flex flex-col items-center w-1/3 ${i === 0 ? 'items-start' : i === 2 ? 'items-end' : ''}`}>
                      <span className={input.timeline === step.value ? 'text-mech-cyan' : ''}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output Display */}
          <div className="flex flex-col justify-center items-center p-8 bg-black/40 rounded-lg border border-mech-cyan/10">
            <h3 className="text-sm font-mono text-mech-silver/50 uppercase tracking-widest mb-2">Estimated Range</h3>
            
            <div className="my-6 text-center">
              {output && (
                <motion.div
                  key={`${output.minINR}-${output.maxINR}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl md:text-5xl font-orbitron font-bold text-mech-silver tracking-wider"
                >
                  ₹{output.minINR.toLocaleString()} - ₹{output.maxINR.toLocaleString()}
                </motion.div>
              )}
            </div>

            <div className="text-center mb-8">
              {output && (
                <span className="text-lg font-mono text-mech-cyan/80">
                  ≈ ${output.minUSD.toLocaleString()} - ${output.maxUSD.toLocaleString()}
                </span>
              )}
              <p className="text-xs text-mech-silver/30 mt-2 max-w-[200px] mx-auto leading-tight">
                {USD_RATE_NOTE}
              </p>
            </div>

            <button
              onClick={scrollToBooking}
              className="w-full py-4 bg-mech-cyan text-black font-orbitron font-bold text-lg uppercase tracking-wider rounded hover:bg-mech-cyan/90 transition-colors shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
            >
              Get Custom Quote
            </button>
            <p className="text-xs text-mech-silver/50 mt-4 text-center">
              Final pricing confirmed during scoping call.
            </p>
          </div>
        </div>
      </MechPanel>
    </section>
  );
}
