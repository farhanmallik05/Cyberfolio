"use client";
import React from 'react';
import { AVAILABILITY } from '@/data/availability';

export function AvailabilityBadge() {
  if (!AVAILABILITY.available) return null;

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-neon/30 bg-neon/5 rounded-full">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
      </div>
      <span className="text-[10px] font-orbitron font-bold text-neon tracking-widest uppercase">
        {AVAILABILITY.message}
      </span>
    </div>
  );
}
