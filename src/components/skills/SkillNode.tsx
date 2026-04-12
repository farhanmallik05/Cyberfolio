'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill, SkillCategory, CATEGORY_CONFIG } from '@/data/skills';

interface SkillNodeProps {
  skill: Skill;
  cx: number;
  cy: number;
  isHovered: boolean;
  isDimmed: boolean;
  isConnected: boolean;
  isRoleMatch?: boolean;
  onHover: (id: string | null) => void;
}

export function SkillNode({ 
  skill, 
  cx, 
  cy, 
  isHovered, 
  isDimmed, 
  isConnected, 
  isRoleMatch, 
  onHover 
}: SkillNodeProps) {
  const config = CATEGORY_CONFIG[skill.category];
  const radius = skill.proficiency / 10 + (isRoleMatch ? 12 : 8); 

  // Ambient Drift (seeded by ID for deterministic randomness)
  const driftSeed = skill.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const driftDuration = 3 + (driftSeed % 4);
  const driftDelay = (driftSeed % 5) * -1;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: 1,
        x: [0, 2, -2, 0],
        y: [0, -4, 2, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        x: { duration: driftDuration, repeat: Infinity, ease: "linear", delay: driftDelay },
        y: { duration: driftDuration + 1, repeat: Infinity, ease: "linear", delay: driftDelay },
      }}
      className="cursor-pointer"
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Glow Filter Definition (Inner scope for SVG) */}
      <defs>
        <filter id={`glow-${skill.id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={isRoleMatch || isHovered ? "5" : "3"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Node Circle */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={config.color}
        fillOpacity={isHovered || isRoleMatch ? 0.35 : 0.15}
        stroke={config.color}
        strokeWidth={isHovered || isRoleMatch ? 3 : 2}
        strokeOpacity={isHovered || isConnected || isRoleMatch ? 1 : 0.8}
        animate={{
          r: isHovered ? radius * 1.1 : radius,
          filter: isHovered || isRoleMatch ? `url(#glow-${skill.id})` : 'none',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Label */}
      <motion.text
        x={cx}
        y={cy + radius + 18}
        textAnchor="middle"
        fill={config.color}
        className="font-mono text-[10px] pointer-events-none tracking-tighter uppercase font-bold"
        animate={{
          opacity: isDimmed ? 0.15 : 1,
          scale: isHovered || isRoleMatch ? 1.1 : 1,
        }}
        style={{ textShadow: isHovered || isRoleMatch ? `0 0 10px ${config.glowColor}` : 'none' }}
      >
        {skill.name}
      </motion.text>
    </motion.g>
  );
}
