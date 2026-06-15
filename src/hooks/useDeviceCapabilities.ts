import { useState, useEffect } from 'react';

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    prefersReducedMotion: false,
    isLowEnd: false,
  });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Very basic heuristic for low-end device
    const isLowEnd = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      // @ts-expect-error - deviceMemory is not standard across all browsers
      (navigator.deviceMemory && navigator.deviceMemory <= 4);

    setCapabilities({
      isMobile,
      prefersReducedMotion,
      isLowEnd: !!isLowEnd,
    });

    // Handle resize to update mobile status
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setCapabilities(prev => ({ ...prev, isMobile: e.matches }));
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return capabilities;
}
