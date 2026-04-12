"use client";
import React from 'react';
import { Quote } from 'lucide-react';
import { TestimonialMarquee } from '@/components/TestimonialMarquee';

export function TestimonialsStrip() {
  return (
    <section className="py-20 w-full overflow-hidden border-t border-b border-white/5 bg-black/20">
      <div className="container mx-auto px-4 mb-12 flex flex-col items-center">
        <div className="p-3 bg-neon/10 border border-neon/30 rounded-full mb-6">
          <Quote className="text-neon w-6 h-6" />
        </div>
        <h2 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter text-center">
          Neural_Network Feedback
        </h2>
        <p className="text-dim text-sm font-mono uppercase tracking-[0.2em] mt-2">
          Verified transmissions from the matrix
        </p>
      </div>

      <TestimonialMarquee />
    </section>
  );
}
