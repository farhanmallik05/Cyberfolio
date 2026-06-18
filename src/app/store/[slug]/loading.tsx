import { GlassPanel } from "@/components/ui/GlassPanel";

export default function ProductLoading() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-4xl mx-auto relative z-10">
            <div className="mb-8 w-32 h-4 bg-white/5 rounded animate-pulse" />
            
            <GlassPanel className="p-8 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div>
                        <div className="w-24 h-4 bg-white/10 rounded mb-4 animate-pulse" />
                        <div className="w-3/4 h-10 bg-white/10 rounded mb-6 animate-pulse" />
                        
                        <div className="space-y-3 mb-8">
                            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
                            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
                            <div className="w-4/5 h-4 bg-white/5 rounded animate-pulse" />
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="w-2/3 h-4 bg-white/5 rounded animate-pulse" />
                            <div className="w-1/2 h-4 bg-white/5 rounded animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center p-8 bg-black/40 border border-white/5 rounded-xl">
                        <div className="w-32 h-10 bg-white/10 rounded mb-8 animate-pulse" />
                        <div className="w-full h-14 bg-white/10 rounded animate-pulse" />
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
