"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './HomeLoader.module.css';

interface HomeLoaderProps {
  children: React.ReactNode;
}

export function HomeLoader({ children }: HomeLoaderProps) {
  // Bypass the secondary loader completely to prevent it from getting stuck
  // and to avoid double-loading screens (since BootSequence already runs).
  return <>{children}</>;
}
