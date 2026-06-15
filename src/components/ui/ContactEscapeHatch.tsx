"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, PhoneCall } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/917988009083?text=Hi%20Farhan%2C%20I%20came%20from%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.";
const EMAIL_URL = "mailto:mallikfarhan10@gmail.com?subject=Project%20Inquiry%20from%20Portfolio";
const SESSION_KEY = "contact-hatch-dismissed";

export function ContactEscapeHatch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Show after 8 seconds
    timerRef.current = setTimeout(() => setIsVisible(true), 8000);

    // Also show on scroll-back-up (exit-intent proxy)
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current - 80 && currentY > 200) {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setIsVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-5 z-[9999] flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#0D1425] border border-[#00F5FF]/30 shadow-[0_0_30px_rgba(0,245,255,0.12)] w-64 rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="font-orbitron text-[11px] tracking-[0.15em] text-[#00F5FF] uppercase">
                Direct Contact
              </span>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss contact popup"
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-[12px] text-white/50 font-inter leading-relaxed">
                Skip the form. Reach me directly — I respond within a few hours.
              </p>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-200 group"
              >
                {/* WhatsApp icon via SVG — no external dep */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#25D366] flex-shrink-0"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="text-white text-[12px] font-orbitron font-semibold group-hover:text-[#25D366] transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-white/40 text-[10px] font-share-tech">+91 79880 09083</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={EMAIL_URL}
                className="flex items-center gap-3 w-full px-4 py-3 bg-[#00F5FF]/5 border border-[#00F5FF]/20 hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/50 transition-all duration-200 group"
              >
                <Mail className="w-5 h-5 text-[#00F5FF] flex-shrink-0" />
                <div>
                  <p className="text-white text-[12px] font-orbitron font-semibold group-hover:text-[#00F5FF] transition-colors">
                    Email
                  </p>
                  <p className="text-white/40 text-[10px] font-share-tech truncate">mallikfarhan10@gmail.com</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "backOut" }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open direct contact options"
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border ${
          isOpen
            ? "bg-[#00F5FF] border-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.5)]"
            : "bg-[#0D1425] border-[#00F5FF]/40 hover:border-[#00F5FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-black" />
            </motion.span>
          ) : (
            <motion.span
              key="phone"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <PhoneCall className="w-5 h-5 text-[#00F5FF]" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring — shown when panel is closed to draw attention */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-[#00F5FF]/40 animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
