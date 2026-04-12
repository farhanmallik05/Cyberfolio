'use client';

import React from 'react';
import { CATEGORY_CONFIG, SkillCategory } from '@/data/skills';
import styles from './ConstellationLegend.module.css';

export function ConstellationLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-12 p-6 bg-glass border border-border rounded-lg backdrop-blur-md">
      {(Object.entries(CATEGORY_CONFIG) as [SkillCategory, typeof CATEGORY_CONFIG.frontend][]).map(([key, config]) => (
        <div key={key} className={`flex items-center gap-2 group ${styles.categoryGroup}`}>
          <div 
            className={styles.categoryDot} 
            data-category={key} 
          />
          <span className={styles.categoryLabel}>
            {config.label}
          </span>
        </div>
      ))}
    </div>
  );
}
