"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EngagementPane } from "./EngagementPane";
import { BookingPane } from "./BookingPane";
import { BriefPane } from "./BriefPane";

type Tab = "engagement" | "book" | "brief";

export function HireFunnel() {
  const [activeTab, setActiveTab] = useState<Tab>("engagement");

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 relative z-10">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8">
        {[
          { id: "engagement", label: "Engagement Models" },
          { id: "book", label: "Book a Call" },
          { id: "brief", label: "Submit a Brief" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-6 py-3 font-orbitron uppercase text-sm tracking-widest transition-all duration-300 border ${
              activeTab === tab.id
                ? "bg-mech-cyan/10 border-mech-cyan text-mech-cyan shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                : "bg-mech-panel/50 border-mech-silver/20 text-mech-silver hover:border-mech-silver/50 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pane Content */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === "engagement" && (
            <motion.div
              key="engagement"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <EngagementPane onSelectBook={() => setActiveTab("book")} />
            </motion.div>
          )}

          {activeTab === "book" && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BookingPane />
            </motion.div>
          )}

          {activeTab === "brief" && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BriefPane />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
