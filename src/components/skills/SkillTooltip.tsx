'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill, SECTOR_CONFIG } from '@/data/skills';
import styles from './SkillTooltip.module.css';

interface SkillTooltipProps {
  skill: Skill;
  x: number;
  y: number;
}

export function SkillTooltip({ skill, x, y }: SkillTooltipProps) {
  const config = SECTOR_CONFIG[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        left: x + 20,
        top: y - 50
      }}
      className={styles.tooltipWrapper}
    >
      <div 
        className={styles.tooltipContainer}
        data-category={skill.category}
      >
        <div className={styles.skillHeader}>
          <span className={styles.skillName}>{skill.name}</span>
          <span className={styles.proficiency}>[{skill.proficiency}%]</span>
        </div>
        
        <div className={styles.divider} />
        
        <div className="space-y-2">
          <div className={styles.detailItem}>
            <span className={styles.categoryLabel}>Category:</span>
            <span className={styles.categoryValue}>{config.label}</span>
          </div>
          
          {skill.projectReference && (
            <div className="flex flex-col gap-1 text-[10px] uppercase tracking-tighter">
              <span className={styles.referenceLabel}>Reference:</span>
              <span className={styles.referenceValue}>{skill.projectReference}</span>
            </div>
          )}
        </div>

        {/* Decorative Corner */}
        <div className={styles.cornerDeco} />
      </div>
    </motion.div>
  );
}
