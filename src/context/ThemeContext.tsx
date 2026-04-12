'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, THEMES } from '@/data/themes';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'cyber',
  setTheme: () => {},
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('cyber');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('na-theme') as ThemeId | null;
    if (stored && THEMES.find(t => t.id === stored)) {
      setThemeState(stored);
      // For themes other than cyber, set the data-theme attribute
      if (stored !== 'cyber') {
        document.documentElement.setAttribute('data-theme', stored);
      }
    }
  }, []);

  const setTheme = (id: ThemeId) => {
    if (id === theme || isTransitioning) return;
    
    // Glitch transition sequence
    setIsTransitioning(true);
    document.documentElement.classList.add('theme-glitch');
    
    // Switch state and attribute mid-glitch
    setTimeout(() => {
      setThemeState(id);
      localStorage.setItem('na-theme', id);
      
      if (id === 'cyber') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', id);
      }
    }, 200); // glitch peak duration

    // Cleanup glitch state
    setTimeout(() => {
      document.documentElement.classList.remove('theme-glitch');
      setIsTransitioning(false);
    }, 400); // Total glitch flash duration: 400ms
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
