'use client';

import React from 'react';
import { SECTOR_CONFIG, SkillCategory } from '@/data/skills';
import styles from './ConstellationLegend.module.css';

export function ConstellationLegend() {
  const entries = Object.entries(SECTOR_CONFIG) as [SkillCategory, typeof SECTOR_CONFIG.frontend][];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 p-5 border border-white/5 rounded backdrop-blur-md bg-black/30">
      {entries.map(([key, cfg]) => (
        <div key={key} className={`flex items-center gap-2 group ${styles.item}`} data-sector={key}>
          <div className={styles.dot} />
          <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${styles.label}`}>
            {cfg.shortLabel}
          </span>
        </div>
      ))}
    </div>
  );
}
