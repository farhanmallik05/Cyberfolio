"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchDuration?: number;
  interval?: number;
}

export function GlitchText({ text, className, glitchDuration = 200, interval = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  const chars = '!<>-_\\\\/[]{}—=+*^?#________';

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      let iterations = 0;
      const maxIterations = 5;
      
      const scrambleInterval = setInterval(() => {
        setGlitchText(prev => 
          prev.split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iterations += 1;
        
        if (iterations >= maxIterations) {
          clearInterval(scrambleInterval);
          setGlitchText(text);
          setIsGlitching(false);
        }
      }, glitchDuration / maxIterations);
      
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [text, glitchDuration, interval]);

  return (
    <motion.span
      className={cn("inline-block relative", className)}
      animate={isGlitching ? { x: [-2, 2, -1, 1, 0], opacity: [1, 0.8, 1, 0.9, 1] } : {}}
      transition={{ duration: glitchDuration / 1000 }}
    >
      {glitchText}
      {isGlitching && (
        <span className="absolute top-0 left-0 -ml-1 text-neon-blue opacity-50 select-none mix-blend-screen" style={{ clipPath: 'inset(10% 0 40% 0)' }}>
          {glitchText}
        </span>
      )}
      {isGlitching && (
        <span className="absolute top-0 left-0 ml-1 text-neon-magenta opacity-50 select-none mix-blend-screen" style={{ clipPath: 'inset(60% 0 10% 0)' }}>
          {glitchText}
        </span>
      )}
    </motion.span>
  );
}
