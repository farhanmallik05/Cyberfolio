'use client';

import { motion } from 'framer-motion';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function FilterBar({ categories, activeCategory, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-start md:justify-center">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-4 py-2 font-orbitron text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${
              isActive ? 'text-mech-cyan' : 'text-mech-silver hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-mech-cyan/10 border border-mech-cyan/30 rounded-sm pointer-events-none"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
