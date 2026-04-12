"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';

export default function GSAPRegistrar() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, Flip);
      
      // Global GSAP defaults
      gsap.config({
        nullTargetWarn: false,
      });
    }
  }, []);

  return null;
}
