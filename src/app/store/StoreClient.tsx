"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import { ShoppingCart, Download, FileText, Settings, Database, Box } from "lucide-react";
import Link from "next/link";
import { GlitchText } from "@/components/ui/GlitchText";

type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    type: string;
    color_theme: string;
    is_free: boolean;
};

export default function StoreClient({ products }: { products: Product[] }) {
    
    // Fallback icon map based on type string matching
    const getIcon = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes("template") || t.includes("notion")) return FileText;
        if (t.includes("automation") || t.includes("workflow")) return Settings;
        if (t.includes("asset") || t.includes("code")) return Database;
        if (t.includes("figma") || t.includes("design")) return Download;
        return Box;
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10">

            {/* Background Matrix-like lines */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center mb-16">
                    <div className="px-4 py-1 border border-[color-mix(in_srgb,var(--neon)_30%,transparent)] bg-[color-mix(in_srgb,var(--neon)_10%,transparent)] rounded-full mb-4 flex items-center gap-2 text-[var(--neon)] text-xs font-orbitron tracking-widest uppercase shadow-[0_0_10px_var(--glass)]">
                        <ShoppingCart className="w-3 h-3" /> SECURE CHECKOUT INITIALIZED
                    </div>
                    <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-center tracking-widest uppercase">
                        Digital <GlitchText text="STORE" className="text-[var(--neon)]" interval={4000} />
                    </h1>
                    <p className="text-center font-inter text-foreground/60 mt-4 max-w-2xl">
                        Downloadable assets, architectural templates, and pre-built automation layers for immediate deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-[color-mix(in_srgb,var(--neon)_20%,transparent)] bg-[color-mix(in_srgb,var(--neon)_5%,transparent)] rounded-lg relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none" />
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="mb-4 text-[color-mix(in_srgb,var(--neon)_30%,transparent)]"
                            >
                                <Database className="w-12 h-12" />
                            </motion.div>
                            <p className="text-[var(--neon)] font-orbitron text-lg tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--neon)] animate-pulse shadow-[0_0_8px_var(--neon)]" />
                                [ NO INVENTORY DETECTED IN DATABASE ]
                            </p>
                            <p className="text-[color-mix(in_srgb,var(--text)_60%,transparent)] font-mono text-xs mt-2 max-w-sm text-center">
                                Awaiting incoming shipments from the core network. Please check back later for new modules.
                            </p>
                        </motion.div>
                    )}
                    {products.map((product, idx) => {
                        const Icon = getIcon(product.type);
                        const priceDisplay = product.is_free ? 'FREE' : `${product.currency === 'USD' ? '$' : '₹'}${(product.price / 100).toFixed(2)}`;

                        return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="group"
                        >
                            <GlassPanel neonBorder className="h-full flex flex-col p-6 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">

                                {/* Glow Effect */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-50 transition-opacity bg-current ${product.color_theme}`} />

                                <div className="flex flex-col mb-4 relative z-10">
                                    <div className={`p-3 self-start bg-cyber-base rounded-md border border-white/10 mb-4 ${product.color_theme}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-orbitron uppercase tracking-wider ${product.color_theme} mb-1`}>
                                        {product.type}
                                    </span>
                                    <h3 className="font-orbitron font-bold text-lg text-white leading-tight">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="font-inter text-sm text-foreground/60 mb-6 flex-1 relative z-10">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto relative z-10">
                                    <span className="font-orbitron font-bold text-xl text-white">
                                        {priceDisplay}
                                    </span>
                                    <Link href={`/store/${product.slug}`}>
                                        <NeonButton
                                            variant={product.color_theme.includes('blue') ? 'blue' : product.color_theme.includes('green') ? 'green' : product.color_theme.includes('magenta') ? 'magenta' : 'purple'}
                                            className="px-4 py-1 text-xs"
                                        >
                                            View
                                        </NeonButton>
                                    </Link>
                                </div>

                            </GlassPanel>
                        </motion.div>
                    )})}
                </div>
            </motion.div>
        </div>
    );
}
