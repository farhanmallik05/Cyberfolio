"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Database, Search, Filter, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { CertificateCard } from "@/components/ui/CertificateCard";
import certificatesData from "@/data/certificates.json";

const CATEGORIES = ["ALL", "ACHIEVEMENT", "COMPETITION", "EDUCATION", "DEVELOPMENT"];

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = useMemo(() => {
    return certificatesData.filter(cert => {
      const matchesCategory = activeCategory === "ALL" || cert.category.toUpperCase() === activeCategory;
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto relative z-10 w-full">
      {/* Background purely for styling */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,174,239,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,174,239,0.05)_0%,transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12 w-full"
      >
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-mech-cyan animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-white tracking-widest uppercase">
              Mission <span className="text-mech-cyan">::</span> Credentials
            </h1>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-mech-cyan/20">
            <p className="font-inter text-mech-silver max-w-xl leading-relaxed">
                Collection of verified academic records, hackathon honors, and technical specializations. 
                Engage individual nodes to reveal cryptographic verification data and credential status.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <div className="relative group w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mech-silver/40 group-focus-within:text-mech-cyan transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search Dossier..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-mech-base border border-mech-silver/10 px-10 py-2 rounded font-mono text-xs text-white focus:outline-none focus:border-mech-cyan/40 transition-all"
                    />
               </div>
               <div className="flex items-center gap-2 px-3 py-2 bg-mech-cyan/5 border border-mech-cyan/20 rounded">
                    <Database className="w-4 h-4 text-mech-cyan" />
                    <span className="font-mono text-[10px] text-mech-cyan font-bold uppercase tracking-widest">
                        Nodes_Active: {filteredCertificates.length}
                    </span>
               </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-4 text-mech-silver/40">
                <Filter className="w-4 h-4" />
                <span className="font-orbitron text-[10px] uppercase tracking-widest">Filters ::</span>
            </div>
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 font-orbitron text-[10px] tracking-widest uppercase rounded transition-all border ${
                        activeCategory === cat 
                        ? 'bg-mech-cyan/10 border-mech-cyan text-mech-cyan shadow-[0_0_15px_rgba(15,211,255,0.2)]' 
                        : 'border-mech-silver/10 text-mech-silver hover:border-mech-cyan/40 hover:text-mech-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCertificates.map(cert => (
                        <motion.div
                            key={cert.id}
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <CertificateCard cert={cert} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-mech-silver/10 rounded-xl bg-mech-base/20">
                <Sparkles className="w-12 h-12 text-mech-silver/20 animate-pulse" />
                <div className="space-y-1">
                    <h3 className="font-orbitron text-mech-white uppercase tracking-widest">No Credentials Found</h3>
                    <p className="font-inter text-mech-silver/40 text-sm">Query yielded zero data nodes in current sector.</p>
                </div>
                <button 
                  onClick={() => {setActiveCategory("ALL"); setSearchQuery("");}}
                  className="mt-2 text-mech-cyan font-mono text-[10px] hover:underline uppercase tracking-widest"
                >
                  Clear Command Filters
                </button>
            </div>
        )}

        {/* Footer Details */}
        <div className="mt-12 pt-12 border-t border-mech-silver/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-mech-silver/40 tracking-widest uppercase">
            <div className="flex items-center gap-8 italic">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-mech-cyan/40" />
                    <span>Cryptographic_Verification_Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                    <Award className="w-3 h-3 text-mech-cyan/40" />
                    <span>System_Honor_Log_Active</span>
                </div>
            </div>
            <div className="text-right">
                LAST_SYNC: APR_2026_0112_GMT
            </div>
        </div>
      </motion.div>
    </div>
  );
}
