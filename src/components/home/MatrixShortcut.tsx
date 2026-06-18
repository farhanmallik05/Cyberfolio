"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MatrixRain = dynamic(() => import('@/components/home/MatrixRain').then(mod => mod.MatrixRain), { ssr: false });

export function MatrixShortcut() {
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key to toggle Matrix Rain: Shift + M
      if (e.shiftKey && e.key === 'M') {
        setShowMatrix(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showMatrix) return null;

  return <MatrixRain />;
}
