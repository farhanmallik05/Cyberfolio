"use client";
import React, { useRef, useEffect } from 'react';
import styles from './ThemeHUD.module.css';

interface ThemeSwatchProps {
  bgColor: string;
  accentColor: string;
}

export function ThemeSwatch({ bgColor, accentColor }: ThemeSwatchProps) {
  const swatchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swatchRef.current) {
      swatchRef.current.style.setProperty('--swatch-bg', bgColor);
      swatchRef.current.style.setProperty('--swatch-accent', accentColor);
    }
  }, [bgColor, accentColor]);

  return (
    <div ref={swatchRef} className={styles.swatchContainer}>
      <div className={styles.swatchBg} />
      <div className={styles.swatchAccent} />
    </div>
  );
}
