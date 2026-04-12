'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  isRoleMatch?: boolean;
}

export function SkillConnection({ x1, y1, x2, y2, color, isHighlighted, isDimmed, isRoleMatch }: SkillConnectionProps) {
  return (
    <g>
      {/* Background/Shadow Line */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={isHighlighted || isRoleMatch ? 2 : 1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isHighlighted || isRoleMatch ? 0.6 : (isDimmed ? 0.05 : 0.15),
          transition: { duration: 1.2, ease: "easeInOut" }
        }}
        style={{
          filter: isHighlighted || isRoleMatch ? `drop-shadow(0 0 4px ${color})` : 'none'
        }}
      />

      {/* Animated Pulse Overlay */}
      {(isHighlighted || isRoleMatch) && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color}
          strokeWidth={isRoleMatch ? 3 : 2}
          strokeDasharray="4 12"
          animate={{ 
            strokeDashoffset: [0, -32],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      )}
    </g>
  );
}
