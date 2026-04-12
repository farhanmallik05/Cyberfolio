'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { SKILLS, Skill, SkillCategory, CATEGORY_CONFIG } from '@/data/skills';
import { SkillNode } from './SkillNode';
import { SkillConnection } from './SkillConnection';
import { SkillTooltip } from './SkillTooltip';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

export function SkillConstellation() {
  const { activeRole } = useRole();
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Deterministic Layout Calculation
  const nodes = useMemo(() => {
    const categories: SkillCategory[] = ['frontend', 'backend', 'automation', 'ai', 'design', 'devops'];
    
    // Grid Setup: 2 rows, 3 columns
    const grid = {
      frontend:   { r: 0, c: 0 },
      backend:    { r: 0, c: 1 },
      automation: { r: 0, c: 2 },
      ai:         { r: 1, c: 0 },
      design:     { r: 1, c: 1 },
      devops:     { r: 1, c: 2 },
    };

    const cellWidth = CANVAS_WIDTH / 3;
    const cellHeight = CANVAS_HEIGHT / 2;

    return SKILLS.map((skill, index) => {
      const pos = grid[skill.category];
      const centerX = pos.c * cellWidth + cellWidth / 2;
      const centerY = pos.r * cellHeight + cellHeight / 2;

      // Circle layout within cluster
      const skillsInCategory = SKILLS.filter(s => s.category === skill.category);
      const skillIndex = skillsInCategory.findIndex(s => s.id === skill.id);
      const angle = (skillIndex / skillsInCategory.length) * 2 * Math.PI;
      const clusterRadius = 60 + (index % 3) * 10; // Variable offset

      const x = centerX + Math.cos(angle) * clusterRadius;
      const y = centerY + Math.sin(angle) * clusterRadius;

      return { ...skill, x, y };
    });
  }, []);

  // Connection Mapping
  const connections = useMemo(() => {
    const pairs: { s1: (Skill & { x: number, y: number }), s2: (Skill & { x: number, y: number }), id: string }[] = [];
    nodes.forEach(s1 => {
      s1.relatedTo.forEach(relId => {
        const s2 = nodes.find(n => n.id === relId);
        if (s2 && !pairs.find(p => (p.id === `${s2.id}-${s1.id}`))) {
          pairs.push({ s1, s2, id: `${s1.id}-${s2.id}` });
        }
      });
    });
    return pairs;
  }, [nodes]);

  const hoveredSkill = nodes.find(n => n.id === hoveredSkillId);

  return (
    <div 
      className="relative w-full aspect-[10/6] min-h-[400px] mb-8" 
      ref={containerRef}
    >
      <svg 
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections Layer */}
        {isVisible && connections.map(conn => {
          const isRoleMatch = activeRole !== 'all' && (conn.s1.category === activeRole || conn.s2.category === activeRole);
          const isHighlighted = (hoveredSkillId === conn.s1.id || hoveredSkillId === conn.s2.id) || isRoleMatch;
          const isDimmed = hoveredSkillId !== null && !isHighlighted;
          const color = CATEGORY_CONFIG[conn.s1.category].color;
          
          return (
            <SkillConnection
              key={conn.id}
              x1={conn.s1.x}
              y1={conn.s1.y}
              x2={conn.s2.x}
              y2={conn.s2.y}
              color={color}
              isHighlighted={isHighlighted}
              isDimmed={isDimmed}
              isRoleMatch={isRoleMatch}
            />
          );
        })}

        {/* Nodes Layer */}
        {isVisible && nodes.map(node => {
          const isHovered = hoveredSkillId === node.id;
          const isRoleMatch = activeRole !== 'all' && node.category === activeRole;
          const isConnected = hoveredSkillId !== null && 
                             (node.relatedTo.includes(hoveredSkillId) || 
                              !!nodes.find(n => n.id === hoveredSkillId)?.relatedTo.includes(node.id));
          const isDimmed = hoveredSkillId !== null && !isHovered && !isConnected && !isRoleMatch;

          return (
            <SkillNode
              key={node.id}
              skill={node}
              cx={node.x}
              cy={node.y}
              isHovered={isHovered}
              isDimmed={isDimmed}
              isConnected={isConnected || isRoleMatch}
              isRoleMatch={isRoleMatch}
              onHover={setHoveredSkillId}
            />
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {hoveredSkill && (
          <SkillTooltip 
            skill={hoveredSkill} 
            x={hoveredSkill.x * (containerRef.current?.clientWidth || 1000) / CANVAS_WIDTH}
            y={hoveredSkill.y * (containerRef.current?.clientHeight || 600) / CANVAS_HEIGHT}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
