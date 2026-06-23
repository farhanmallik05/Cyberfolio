'use client';

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAInstaller() {
                                                       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error("Service Worker registration failed:", err);
      });
    }

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-[var(--neon)] p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,245,255,0.2)]"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-[var(--neon)] bg-[var(--neon)]/10 flex items-center justify-center rounded-sm">
            <Download size={16} className="text-[var(--neon)]" />
          </div>
          <div>
            <h3 className="text-[var(--neon)] font-heading font-bold uppercase tracking-widest text-sm">INSTALL PWA PROTOCOL</h3>
            <p className="text-[var(--text-muted)] font-mono text-xs">Offline capabilities & direct access.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowInstall(false)} className="text-[var(--text-muted)] hover:text-white font-mono text-xs px-2 uppercase">Ignore</button>
          <button 
            onClick={handleInstallClick} 
            className="bg-[var(--neon)] text-black px-4 py-2 font-heading uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center gap-2 font-bold"
          >
            Accept
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
