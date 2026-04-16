'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, SkillCategory, SECTOR_CONFIG } from '@/data/skills';
import styles from './SkillConstellation.module.css';

// ─── Canvas ────────────────────────────────────────────────────────────────────
const W = 1400;
const H = 920;
const DEFAULT_VB = `0 0 ${W} ${H}`;

// ─── Organic hub positions — scattered like real constellations ─────────────────
const HUB: Record<SkillCategory, { x: number; y: number }> = {
  'frontend':     { x: 540,  y: 100 },
  'ai-llm':       { x: 920,  y: 85  },
  'ml-data':      { x: 1185, y: 300 },
  'automation':   { x: 1220, y: 570 },
  'backend-api':  { x: 1000, y: 740 },
  'design-ux':    { x: 700,  y: 820 },
  'devops':       { x: 380,  y: 750 },
  'content':      { x: 160,  y: 590 },
  'leadership':   { x: 130,  y: 330 },
  'security-ops': { x: 310,  y: 135 },
  'core-lang':    { x: 470,  y: 420 },
  'cs-core':      { x: 745,  y: 460 },
};

const CATS = Object.keys(HUB) as SkillCategory[];

// ─── Seeded pseudo-random ───────────────────────────────────────────────────────
function seedHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// ─── Pre-compute every skill position with jitter ───────────────────────────────
function buildSkillPositions(): Map<string, { x: number; y: number }> {
  const map = new Map<string, { x: number; y: number }>();
  CATS.forEach(cat => {
    const hub    = HUB[cat];
    const catSks = SKILLS.filter(s => s.category === cat);
    const n      = catSks.length;
    const baseR  = n <= 3 ? 90 : n <= 5 ? 108 : n <= 7 ? 128 : 148;
    catSks.forEach((skill, i) => {
      const h         = seedHash(skill.id);
      const baseAngle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const jitterAng = ((h % 31) - 15) * 0.018;
      const rJitter   = ((h % 47) - 23) * 0.75;
      map.set(skill.id, {
        x: Math.max(40, Math.min(W - 40, hub.x + (baseR + rJitter) * Math.cos(baseAngle + jitterAng))),
        y: Math.max(40, Math.min(H - 40, hub.y + (baseR + rJitter) * Math.sin(baseAngle + jitterAng))),
      });
    });
  });
  return map;
}
const SKILL_POS = buildSkillPositions();

// ─── Connection pairs (deduplicated) ────────────────────────────────────────────
const CONNECTION_PAIRS = (() => {
  const pairs: { s1id: string; s2id: string; color: string; key: string }[] = [];
  const seen  = new Set<string>();
  SKILLS.forEach(s1 => {
    s1.relatedTo.forEach(relId => {
      const s2 = SKILLS.find(s => s.id === relId);
      if (!s2) return;
      const key = [s1.id, s2.id].sort().join('--');
      if (seen.has(key)) return;
      seen.add(key);
      pairs.push({ s1id: s1.id, s2id: s2.id, color: SECTOR_CONFIG[s1.category].color, key });
    });
  });
  return pairs;
})();

// ─── Skill category lookup (O(1) instead of O(n) finds) ────────────────────────
const SKILL_CAT = new Map(SKILLS.map(s => [s.id, s.category]));

// ─── Compute viewBox for a category cluster (with padding) ──────────────────────
function computeCatViewBox(cat: SkillCategory): string {
  const catSkills = SKILLS.filter(s => s.category === cat);
  const hub = HUB[cat];
  let minX = hub.x, maxX = hub.x, minY = hub.y, maxY = hub.y;
  catSkills.forEach(s => {
    const p = SKILL_POS.get(s.id);
    if (!p) return;
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });
  const pad = 120;
  const vbW = Math.max(maxX - minX + pad * 2, 400);
  const vbH = Math.max(maxY - minY + pad * 2, 300);
  // Expand to maintain roughly 3:2 aspect ratio
  const targetAR = 3 / 2;
  let finalW = vbW, finalH = vbH;
  if (finalW / finalH > targetAR) {
    finalH = finalW / targetAR;
  } else {
    finalW = finalH * targetAR;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return `${cx - finalW / 2} ${cy - finalH / 2} ${finalW} ${finalH}`;
}

// MobileView removed — SVG constellation is now used on all screen sizes

// ─── Flowing beam SVG animation (CSS keyframe injected once) ────────────────────
const BEAM_STYLE_ID = 'constellation-beam-keyframe';
function ensureBeamStyle() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(BEAM_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BEAM_STYLE_ID;
  style.textContent = `
    @keyframes beam-flow {
      0%   { stroke-dashoffset: 24; }
      100% { stroke-dashoffset: 0;  }
    }
    .beam-flow {
      animation: beam-flow 0.8s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

// ─── Main Constellation ────────────────────────────────────────────────────────
export function SkillConstellation() {
  const [hoveredId,   setHoveredId]   = useState<string | null>(null);
  const [lockedId,    setLockedId]    = useState<string | null>(null);
  const [focusedCat,  setFocusedCat]  = useState<SkillCategory | null>(null);
  const [isVisible,   setIsVisible]   = useState(false);
  const [cSize,       setCSize]       = useState({ w: 1000, h: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // The "active" skill is either the locked one or the hovered one
  const activeId = lockedId ?? hoveredId;

  useEffect(() => { ensureBeamStyle(); }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) =>
      setCSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.04 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Bidirectional connections for the active skill
  const connectedIds = useMemo<Set<string>>(() => {
    if (!activeId) return new Set();
    const skill = SKILLS.find(s => s.id === activeId);
    if (!skill) return new Set();
    const ids = new Set<string>([activeId, ...skill.relatedTo]);
    SKILLS.forEach(s => { if (s.relatedTo.includes(activeId)) ids.add(s.id); });
    return ids;
  }, [activeId]);

  // ViewBox computation: zoom into focused category
  const viewBox = useMemo(() => {
    if (focusedCat) return computeCatViewBox(focusedCat);
    return DEFAULT_VB;
  }, [focusedCat]);

  const activeSkill = activeId ? SKILLS.find(s => s.id === activeId) : null;

  const handleNodeClick = useCallback((skillId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLockedId(prev => prev === skillId ? null : skillId);
    setFocusedCat(null);
  }, []);

  const handleHubClick = useCallback((cat: SkillCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setLockedId(null);
    setHoveredId(null);
    setFocusedCat(prev => prev === cat ? null : cat);
  }, []);

  // Exposed as a method for the Legend to call
  const handleFocusCat = useCallback((cat: SkillCategory | null) => {
    setLockedId(null);
    setHoveredId(null);
    setFocusedCat(prev => prev === cat ? null : cat);
  }, []);

  const handleBgClick = useCallback(() => {
    setFocusedCat(null);
    setLockedId(null);
    setHoveredId(null);
  }, []);

  // Node visual state
  type NodeState = 'hovered' | 'connected' | 'focused' | 'normal' | 'dimmed';
  const nodeState = useCallback((skillId: string, skillCat: SkillCategory): NodeState => {
    if (activeId) {
      if (skillId === activeId)         return 'hovered';
      if (connectedIds.has(skillId))    return 'connected';
      return 'dimmed';
    }
    if (focusedCat) {
      if (skillCat === focusedCat)      return 'focused';
      return 'dimmed';
    }
    return 'normal';
  }, [activeId, connectedIds, focusedCat]);

  return (
    <div ref={containerRef} className="w-full">
        <div className={styles.container}>
          <motion.svg
            viewBox={viewBox}
            className="w-full h-full touch-manipulation"
            preserveAspectRatio="xMidYMid meet"
            onClick={handleBgClick}
            animate={{ viewBox }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* ── Connection lines with beam effect ───────────────────────────── */}
            {isVisible && CONNECTION_PAIRS.map(conn => {
              const p1 = SKILL_POS.get(conn.s1id);
              const p2 = SKILL_POS.get(conn.s2id);
              if (!p1 || !p2) return null;

              const s1Cat    = SKILL_CAT.get(conn.s1id);
              const s2Cat    = SKILL_CAT.get(conn.s2id);
              const isActive = activeId && (conn.s1id === activeId || conn.s2id === activeId);
              const isFoc    = focusedCat && (s1Cat === focusedCat || s2Cat === focusedCat);

              let opacity  = 0.06;
              let strokeW  = 0.45;
              let beam     = false;
              if (activeId) {
                opacity = isActive ? 0.6  : 0;
                strokeW = isActive ? 1.6  : 0.3;
                beam    = !!isActive;
              } else if (focusedCat) {
                opacity = isFoc ? 0.4  : 0.01;
                strokeW = isFoc ? 1.1  : 0.3;
                beam    = !!isFoc;
              }

              return (
                <React.Fragment key={conn.key}>
                  {/* Base line */}
                  <motion.line
                    x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                    stroke={conn.color}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity, strokeWidth: strokeW }}
                    transition={{
                      pathLength:  { duration: 1.6, ease: 'easeInOut' },
                      opacity:     { duration: 0.22 },
                      strokeWidth: { duration: 0.22 },
                    }}
                  />
                  {/* Flowing beam overlay (dashed line with animated offset) */}
                  {beam && opacity > 0.1 && (
                    <line
                      x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                      stroke={conn.color}
                      strokeWidth={strokeW * 0.7}
                      strokeDasharray="6 18"
                      strokeLinecap="round"
                      opacity={0.75}
                      className="beam-flow"
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* ── Hub markers ────────────────────────────────────────────────── */}
            {isVisible && CATS.map(cat => {
              const hub   = HUB[cat];
              const cfg   = SECTOR_CONFIG[cat];
              const isAct = cat === focusedCat;
              const isDim = (!!focusedCat && !isAct) || (!!activeId);
              const r     = isAct ? 24 : 18;

              return (
                <motion.g key={`hub-${cat}`}
                  animate={{ opacity: isDim && !isAct ? 0.18 : 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => handleHubClick(cat, e)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.12 }}
                  style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                >
                  <motion.circle cx={hub.x} cy={hub.y}
                    fill="none" stroke={cfg.color} strokeWidth="0.75"
                    animate={{
                      r:       isAct ? [r + 10, r + 24, r + 10] : [r + 8, r + 16, r + 8],
                      opacity: isAct ? [0.6, 0.12, 0.6] : [0.22, 0.04, 0.22],
                    }}
                    transition={{ duration: isAct ? 1.7 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle cx={hub.x} cy={hub.y}
                    fill={`${cfg.color}${isAct ? '28' : '10'}`}
                    stroke={cfg.color} strokeWidth={isAct ? 2.2 : 1.5}
                    animate={{ r }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className={isAct ? styles.glowShadow : ''}
                    data-sector={cat}
                  />
                  <text x={hub.x} y={hub.y + 2} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isAct ? 16 : 12} className="pointer-events-none select-none">
                    {cfg.icon}
                  </text>
                  <text x={hub.x} y={hub.y + r + 14} textAnchor="middle"
                    fill={cfg.color} fontSize={isAct ? 9.5 : 7.5}
                    fontFamily="monospace" letterSpacing="2"
                    className="pointer-events-none uppercase" opacity={0.8}>
                    {cfg.shortLabel}
                  </text>
                </motion.g>
              );
            })}

            {/* ── All 61 skill nodes ─────────────────────────────────────────── */}
            {isVisible && SKILLS.map((skill, si) => {
              const pos   = SKILL_POS.get(skill.id);
              if (!pos) return null;
              const cfg    = SECTOR_CONFIG[skill.category];
              const state  = nodeState(skill.id, skill.category);
              const nodeR  = Math.max(4.5, skill.proficiency / 13.5);
              const isHvr  = state === 'hovered';
              const isConn = state === 'connected';
              const isFoc  = state === 'focused';
              const isDim  = state === 'dimmed';
              const isLit  = isHvr || isConn || isFoc;

              const h       = seedHash(skill.id);
              const driftT  = 3.2 + (h % 4);
              const driftAx = ((h % 7) - 3) * 0.7;
              const driftAy = ((h % 5) - 2) * 0.6;
              const pDelay  = (h % 40) * 0.12;
              const pDur    = 2.5 + (h % 3);

              const opc = isDim ? 0.08 : 1;

              return (
                <motion.g key={skill.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: opc,
                    scale:   1,
                    x: [0, driftAx, -driftAx * 0.6, 0],
                    y: [0, driftAy, -driftAy * 0.4, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.28 },
                    scale:   { duration: 0.55, delay: si * 0.012, ease: 'backOut' },
                    x: { duration: driftT,       repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
                    y: { duration: driftT + 1.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
                  }}
                  className="cursor-pointer"
                  onMouseEnter={() => { if (!lockedId) setHoveredId(skill.id); }}
                  onMouseLeave={() => { if (!lockedId) setHoveredId(null); }}
                  onClick={(e) => handleNodeClick(skill.id, e)}
                >
                  {/* Ambient pulse (always, unless dimmed) */}
                  {!isDim && (
                    <motion.circle cx={pos.x} cy={pos.y}
                      fill="none" stroke={cfg.color} strokeWidth="0.5"
                      animate={{ r: [nodeR + 4, nodeR + 12, nodeR + 4], opacity: [0.18, 0.03, 0.18] }}
                      transition={{ duration: pDur, repeat: Infinity, ease: 'easeInOut', delay: pDelay }}
                    />
                  )}

                  {/* Strong glow pulse on hover / focus */}
                  {(isHvr || isFoc) && (
                    <motion.circle cx={pos.x} cy={pos.y} fill="none"
                      stroke={cfg.color} strokeWidth="0.75"
                      animate={{ r: [nodeR + 14, nodeR + 24, nodeR + 14], opacity: [0.5, 0.08, 0.5] }}
                      transition={{ duration: 1.3, repeat: Infinity }}
                    />
                  )}

                  {/* Connected glow pulse */}
                  {isConn && (
                    <motion.circle cx={pos.x} cy={pos.y} fill="none"
                      stroke={cfg.color} strokeWidth="0.6"
                      animate={{ r: [nodeR + 8, nodeR + 18, nodeR + 8], opacity: [0.35, 0.06, 0.35] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}

                  {/* Main node circle */}
                  <motion.circle cx={pos.x} cy={pos.y}
                    fill={`${cfg.color}${isHvr ? '2e' : isLit ? '22' : '12'}`}
                    stroke={cfg.color}
                    strokeWidth={isHvr ? 2.5 : isLit ? 2 : 1.25}
                    strokeOpacity={isLit ? 1 : 0.7}
                    animate={{
                      r:      isHvr ? nodeR * 1.6 : isFoc ? nodeR * 1.3 : isConn ? nodeR * 1.2 : nodeR,
                      filter: isHvr || isConn ? `drop-shadow(0 0 8px ${cfg.color})` : 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  />

                  {/* Proficiency % on hovered node */}
                  {isHvr && (
                    <text x={pos.x} y={pos.y + 3.5} textAnchor="middle"
                      fill="white" fontSize={7.5} fontFamily="monospace"
                      dominantBaseline="middle" fontWeight="bold"
                      className="pointer-events-none">
                      {skill.proficiency}%
                    </text>
                  )}

                  {/* Label — visible for hovered, connected, focused; faded for dimmed */}
                  <text x={pos.x} y={pos.y + (isHvr ? nodeR * 1.6 : isConn ? nodeR * 1.2 : nodeR) + 14}
                    textAnchor="middle"
                    fill={cfg.color}
                    fontSize={isHvr ? 9.5 : isLit ? 8.5 : 7.5}
                    fontFamily="monospace" letterSpacing="0.04em"
                    className="pointer-events-none uppercase"
                    opacity={isDim ? 0.03 : isLit ? 1 : 0.65}>
                    {skill.name.length > 13 ? skill.name.slice(0, 12) + '…' : skill.name}
                  </text>
                </motion.g>
              );
            })}
          </motion.svg>

          {/* ── Tooltip overlay ───────────────────────────────────────────────── */}
          <AnimatePresence>
            {activeSkill && (() => {
              const pos   = SKILL_POS.get(activeSkill.id)!;
              const px    = (pos.x / W) * cSize.w;
              const py    = (pos.y / H) * cSize.h;
              const xFlip = px > cSize.w * 0.62;
              const yFlip = py > cSize.h * 0.75;
              const cfg   = SECTOR_CONFIG[activeSkill.category];
              return (
                <motion.div key={activeSkill.id}
                  className={styles.tooltip}
                  data-sector={activeSkill.category}
                  /* eslint-disable-next-line react/no-inline-styles */
                  style={{
                    '--left': xFlip ? `${px - 208}px` : `${px + 18}px`,
                    '--top': yFlip ? `${py - 130}px` : `${Math.max(8, py - 52)}px`,
                  } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.88, y: 6 }}
                  animate={{ opacity: 1,  scale: 1,    y: 0 }}
                  exit={{   opacity: 0,  scale: 0.88, y: 6 }}
                  transition={{ duration: 0.12 }}
                >
                  <div className={`h-px mb-2 rounded-full ${styles.gradientBar}`} />
                  <div className={`font-orbitron text-[10px] uppercase tracking-widest mb-2 ${styles.sectorLabel}`}>
                    {activeSkill.name}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${styles.nodeFill}`}
                        /* eslint-disable-next-line @next/next/no-inline-styles */
                        style={{ '--progress': `${activeSkill.proficiency}%` } as React.CSSProperties} />
                    </div>
                    <span className="font-mono text-[9px] text-white/50">{activeSkill.proficiency}%</span>
                  </div>
                  <div className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                    {cfg.icon} {cfg.label}
                  </div>
                  {activeSkill.projectReference && (
                    <div className="font-mono text-[7px] text-white/25 mt-1">↗ {activeSkill.projectReference}</div>
                  )}
                  <div className="font-mono text-[7px] text-white/20 mt-1.5">
                    {activeSkill.relatedTo.length} neural links · {Math.max(0, connectedIds.size - 1)} nodes lit
                    {lockedId ? ' · 🔒 click to unlock' : ''}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* ── Focus status bar ──────────────────────────────────────────────── */}
          <AnimatePresence>
            {focusedCat && (() => {
              const cfg   = SECTOR_CONFIG[focusedCat];
              const count = SKILLS.filter(s => s.category === focusedCat).length;
              return (
                <motion.div key={focusedCat}
                  className={styles.statusBar}
                  data-sector={focusedCat}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}>
                  <span className="text-base select-none">{cfg.icon}</span>
                  <span className={`font-orbitron text-[10px] uppercase tracking-widest ${styles.sectorLabel}`}>
                    {cfg.label}
                  </span>
                  <span className="font-mono text-[8px] text-white/30">
                    {count} nodes · click elsewhere to dismiss
                  </span>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

      {/* ── Integrated Legend — ALL screen sizes ─────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-5 px-3 sm:gap-x-4 sm:mt-6 sm:px-4">
        {/* "All" reset button */}
          <button
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-110 ${styles.legendItem}`}
            onClick={() => handleFocusCat(null)}
            data-active={!focusedCat}
            data-sector="all"
          >
            <div className={`${styles.legendDot} ${styles.allLegendDot}`} />
            <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${!focusedCat ? styles.sectorLabel : 'text-white/40'}`}>
              ALL
            </span>
          </button>

        {/* Category buttons */}
        {CATS.map(cat => {
          const cfg = SECTOR_CONFIG[cat];
          const isAct = cat === focusedCat;
          return (
            <button key={cat}
              className={`flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 hover:scale-110 ${styles.legendItem}`}
              onClick={() => handleFocusCat(isAct ? null : cat)}
              data-active={isAct}
              data-sector={cat}
            >
              <div className={styles.legendDot} />
              <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-widest transition-colors ${isAct ? styles.sectorLabel : 'text-white/40'}`}>
                {cfg.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
