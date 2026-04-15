'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill, SECTOR_CONFIG } from '@/data/skills';

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
  skill, cx, cy, isHovered, isDimmed, isConnected, isRoleMatch, onHover
}: SkillNodeProps) {
  const config = SECTOR_CONFIG[skill.category];
  const baseRadius = Math.max(5, skill.proficiency / 14);
  const radius = baseRadius + (isRoleMatch ? 4 : 0);
  const driftSeed = skill.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const driftDuration = 3 + (driftSeed % 4);
  const driftDelay = (driftSeed % 5) * -1;
  const labelText = skill.name.length > 12 ? skill.name.slice(0, 11) + '…' : skill.name;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: 1,
        x: [0, 1.5, -1.5, 0],
        y: [0, -3, 1.5, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        x: { duration: driftDuration, repeat: Infinity, ease: 'linear', delay: driftDelay },
        y: { duration: driftDuration + 1, repeat: Infinity, ease: 'linear', delay: driftDelay },
      }}
      className="cursor-pointer"
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
    >
      <defs>
        <filter id={`glow-${skill.id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={isRoleMatch || isHovered ? '5' : '2'} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <motion.circle
        cx={cx} cy={cy} r={radius}
        fill={config.color}
        fillOpacity={isHovered || isRoleMatch ? 0.4 : 0.15}
        stroke={config.color}
        strokeWidth={isHovered || isRoleMatch ? 2.5 : 1.5}
        strokeOpacity={isHovered || isConnected || isRoleMatch ? 1 : 0.7}
        animate={{
          r: isHovered ? radius * 1.2 : radius,
          filter: isHovered || isRoleMatch ? `url(#glow-${skill.id})` : 'none',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.text
        x={cx} y={cy + radius + 12}
        textAnchor="middle"
        fill={config.color}
        fontSize={isHovered || isRoleMatch ? 10 : 8}
        className="pointer-events-none uppercase font-mono tracking-tighter"
        animate={{ opacity: isDimmed ? 0.1 : (isHovered || isRoleMatch ? 1 : 0.75) }}
        style={{ textShadow: isHovered || isRoleMatch ? `0 0 10px ${config.glowColor}` : 'none' }}
      >
        {labelText}
      </motion.text>
    </motion.g>
  );
}
