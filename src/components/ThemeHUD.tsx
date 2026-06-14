'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/context/AudioContext';
import { THEMES } from '@/data/themes';
import { X, Palette, Volume2, VolumeX } from 'lucide-react';
import styles from './ThemeHUD.module.css';
import { ThemeSwatch } from './ThemeSwatch';

export function ThemeHUD() {
  const { theme, setTheme, isTransitioning } = useTheme();
  const { isPlaying, toggleAudio } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentThemeData = THEMES.find((t) => t.id === theme) || THEMES[0];

  // Close on Escape or Outside click
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999]" 
      ref={containerRef}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* COLLAPSED STATE */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className={`group ${styles.collapsedButton}`}
          >
            {/* Corner Deco */}
            <div className={styles.cornerDeco} />
            
            {/* Status Dot */}
            <div className={styles.statusDot} />
            
            {/* Label */}
            <span className={styles.label}>THEME</span>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ) : (
          /* EXPANDED STATE */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={styles.expandedPanel}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Palette size={14} className="text-neon" />
                <span className="font-orbitron text-[10px] font-bold tracking-[0.2em] text-text uppercase">System Aesthetics</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleAudio}
                  className="text-dim hover:text-neon transition-colors"
                  aria-label="Toggle Audio"
                >
                  {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-dim hover:text-neon transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Theme List */}
            <div className={styles.themeList}>
              {THEMES.map((t) => {
                const isActive = t.id === theme;
                
                return (
                  <button
                    key={t.id}
                    disabled={isActive || isTransitioning}
                    onClick={() => {
                      setTheme(t.id);
                      setTimeout(() => setIsExpanded(false), 500);
                    }}
                    className={`w-full group relative flex items-center gap-4 px-4 py-3 rounded transition-all ${
                      isActive 
                      ? styles.activeThemeItem 
                      : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Premium Swatch Container (Refactored to avoid inline styles) */}
                    <ThemeSwatch 
                      bgColor={t.bgColor} 
                      accentColor={t.accentColor} 
                    />

                    {/* Info */}
                    <div className="flex flex-col items-start leading-tight">
                      <span className={`${styles.themeName} ${isActive ? 'text-neon' : 'text-text'}`}>
                        {t.name}
                      </span>
                      <span className="text-[10px] text-dim font-medium mt-0.5">
                        {t.description}
                      </span>
                    </div>

                    {/* Active Status Indicator */}
                    {isActive && (
                      <div className="ml-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_var(--neon)]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer / Status */}
            <div className="bg-black/40 px-4 py-2 flex justify-between items-center border-t border-border">
              <span className="font-mono text-[8px] text-dim uppercase tracking-widest">
                Active Protocol: {currentThemeData.id}
              </span>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-neon/40" />
                <div className="w-1 h-3 bg-neon2/40" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
