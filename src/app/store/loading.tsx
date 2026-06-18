import { GlassPanel } from "@/components/ui/GlassPanel";
import { Terminal } from "lucide-react";

export default function StoreLoading() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto relative z-10 flex flex-col items-center">
            <div className="px-4 py-1 border border-neon-blue/30 bg-neon-blue/10 rounded-full mb-4 flex items-center gap-2 text-neon-blue text-xs font-orbitron tracking-widest uppercase">
                <Terminal className="w-3 h-3 animate-pulse" /> CONNECTING TO DATABANKS...
            </div>
            
            <div className="h-12 w-64 bg-neon-blue/10 rounded animate-pulse mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {[...Array(4)].map((_, i) => (
                    <GlassPanel key={i} className="h-64 flex flex-col p-6 overflow-hidden">
                        <div className="w-12 h-12 bg-white/5 rounded mb-4 animate-pulse" />
                        <div className="w-16 h-3 bg-white/5 rounded mb-2 animate-pulse" />
                        <div className="w-3/4 h-6 bg-white/10 rounded mb-4 animate-pulse" />
                        
                        <div className="space-y-2 mb-6">
                            <div className="w-full h-3 bg-white/5 rounded animate-pulse" />
                            <div className="w-5/6 h-3 bg-white/5 rounded animate-pulse" />
                        </div>

                        <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                            <div className="w-16 h-6 bg-white/10 rounded animate-pulse" />
                            <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
                        </div>
                    </GlassPanel>
                ))}
            </div>
        </div>
    );
}
