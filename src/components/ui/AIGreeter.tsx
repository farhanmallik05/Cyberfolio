'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AIGreeter() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Hide on chat page
  if (pathname === '/chat' || !isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -top-12 right-0 bg-black border border-[var(--neon)] text-[var(--neon)] px-3 py-2 rounded-sm text-xs font-mono whitespace-nowrap shadow-[0_0_10px_rgba(0,245,255,0.2)]">
            Hey! I'm AI Farhan.
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-black border-b border-r border-[var(--neon)] transform rotate-45" />
          </div>

          <div className="flex items-center gap-2">
             <Link 
              href="/chat"
              className="bg-black border-2 border-[var(--neon)] text-[var(--neon)] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[var(--neon)] hover:text-black transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.6)]"
            >
              <MessageSquare size={20} />
            </Link>
            
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsVisible(false)}
                  className="bg-black border border-[var(--border)] text-white w-6 h-6 rounded-full flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
