'use client';

import { motion } from 'framer-motion';
import { MechPanel } from '@/components/ui/MechPanel';
import { 
    Brain, Moon, Zap, Wifi, 
    Gamepad2, Music, BookOpen, Camera, Coffee, Dumbbell 
} from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────
const WORK_STYLE = [
    { label: 'Personality', value: 'INTJ-A', icon: Brain, color: 'mech-cyan' },
    { label: 'Focus Mode', value: 'Deep Work', icon: Zap, color: 'mech-blue' },
    { label: 'Comm Pref', value: 'Async-First', icon: Wifi, color: 'mech-cyan' },
    { label: 'Peak Hours', value: 'Night Owl', icon: Moon, color: 'mech-blue' },
];

const TRAIT_STACK = [
    { trait: 'Analytical', strength: 95 },
    { trait: 'Strategic', strength: 90 },
    { trait: 'Independent', strength: 88 },
    { trait: 'Determined', strength: 92 },
    { trait: 'Innovative', strength: 85 },
];

const OUTSIDE_CODE = [
    { label: 'Gaming', icon: Gamepad2 },
    { label: 'Music', icon: Music },
    { label: 'Reading', icon: BookOpen },
    { label: 'Photography', icon: Camera },
    { label: 'Coffee', icon: Coffee },
    { label: 'Fitness', icon: Dumbbell },
];

// ─── COMPONENT ─────────────────────────────────────────
export default function PersonalityMetrics() {
    return (
        <div className="w-full space-y-10">
            {/* ── Working Style Grid ── */}
            <div className="space-y-4">
                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                    Operator_Profile
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {WORK_STYLE.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <MechPanel
                                key={idx}
                                border
                                className="p-5 bg-mech-panel/30 text-center"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Icon className={`w-5 h-5 text-${item.color} mx-auto mb-3`} />
                                <p className="font-mono text-[9px] text-mech-silver/40 uppercase tracking-[0.3em] mb-1">
                                    {item.label}
                                </p>
                                <p className={`font-orbitron text-xs text-${item.color} tracking-widest uppercase`}>
                                    {item.value}
                                </p>
                            </MechPanel>
                        );
                    })}
                </div>
            </div>

            {/* ── Trait Stack ── */}
            <div className="space-y-4">
                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                    <span className="w-8 h-[1px] bg-mech-blue/50" />
                    Trait_Matrix
                    <span className="w-8 h-[1px] bg-mech-blue/50" />
                </h3>

                <div className="space-y-3">
                    {TRAIT_STACK.map((trait, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.08 }}
                        >
                            <span className="font-mono text-[10px] text-mech-silver/60 uppercase tracking-widest w-24 text-right shrink-0">
                                {trait.trait}
                            </span>
                            <div className="flex-1 h-2 bg-mech-silver/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: `linear-gradient(90deg, rgba(15,211,255,0.6), rgba(0,174,239,0.8))`,
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trait.strength}%` }}
                                    transition={{ duration: 1.2, delay: 0.5 + idx * 0.1, ease: 'easeOut' }}
                                />
                            </div>
                            <span className="font-mono text-[10px] text-mech-cyan/60 w-8 shrink-0">
                                {trait.strength}%
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Outside of Code ── */}
            <div className="space-y-4">
                <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                    Off_Grid_Modules
                    <span className="w-8 h-[1px] bg-mech-cyan/50" />
                </h3>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {OUTSIDE_CODE.map((hobby, idx) => {
                        const Icon = hobby.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="group flex flex-col items-center gap-2 p-4 border border-mech-silver/10 rounded hover:border-mech-cyan/30 hover:bg-mech-cyan/5 transition-all cursor-default"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + idx * 0.05 }}
                                whileHover={{ y: -2 }}
                            >
                                <Icon className="w-5 h-5 text-mech-silver/40 group-hover:text-mech-cyan transition-colors" />
                                <span className="font-mono text-[8px] text-mech-silver/40 group-hover:text-mech-silver/70 uppercase tracking-widest transition-colors">
                                    {hobby.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
