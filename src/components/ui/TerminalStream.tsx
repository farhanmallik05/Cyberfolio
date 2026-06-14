'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalStreamProps {
  content: string;
  isStreaming?: boolean;
}

export function TerminalStream({ content, isStreaming }: TerminalStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[400px] bg-black border border-[var(--neon)] rounded-sm p-4 overflow-hidden font-mono text-[var(--neon)] text-sm shadow-[0_0_15px_rgba(0,245,255,0.2)]"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--neon)] opacity-50" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--neon)] m-1" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--neon)] m-1" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--neon)] m-1" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--neon)] m-1" />
      
      <div 
        ref={scrollRef}
        className="h-full w-full overflow-y-auto whitespace-pre-wrap pb-4 scrollbar-thin scrollbar-thumb-[var(--neon)] scrollbar-track-transparent"
      >
        <span className="opacity-50 select-none mr-2">&gt;</span>
        {content}
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-[var(--neon)] ml-1 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}
