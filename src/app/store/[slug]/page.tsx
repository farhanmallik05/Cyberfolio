import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { createCheckoutSession } from "../actions";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let product = null;
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single();

        if (!error && data) {
            product = data;
        }
    } catch (e) {
        console.error('Failed to init Supabase or fetch product details:', e);
    }

    if (!product) {
        notFound();
    }

    const priceDisplay = product.is_free ? 'FREE' : `${product.currency === 'USD' ? '$' : '₹'}${(product.price / 100).toFixed(2)}`;

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-4xl mx-auto relative z-10">
            <div className="mb-8">
                <Link href="/store" className="text-mech-silver hover:text-neon-blue font-orbitron text-sm transition-colors">
                    &lt; BACK TO STORE
                </Link>
            </div>
            <GlassPanel neonBorder className="p-8 md:p-12 relative overflow-hidden">
                <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-current ${product.color_theme}`} />
                
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div>
                        <span className={`text-xs font-orbitron uppercase tracking-widest ${product.color_theme} mb-4 block`}>
                            {product.type}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">
                            {product.name}
                        </h1>
                        <p className="font-inter text-foreground/80 leading-relaxed mb-8">
                            {product.description}
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm font-share-tech text-mech-silver">
                                <CheckCircle2 className={`w-4 h-4 ${product.color_theme}`} /> Instant secure delivery via email
                            </div>
                            <div className="flex items-center gap-3 text-sm font-share-tech text-mech-silver">
                                <CheckCircle2 className={`w-4 h-4 ${product.color_theme}`} /> Lifetime updates included
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center p-8 bg-black/40 border border-white/5 rounded-xl">
                        <div className="text-4xl font-orbitron font-bold text-white mb-6">
                            {priceDisplay}
                        </div>
                        <form action={createCheckoutSession.bind(null, product.slug)} className="w-full space-y-4">
                            <div className="w-full space-y-2 text-left">
                                <label className="font-orbitron text-[10px] text-mech-silver uppercase tracking-widest block">Delivery Destination [Email]</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-black/60 border border-white/10 p-3 rounded-sm text-white font-inter placeholder:text-white/20 focus:outline-none focus:border-mech-cyan transition-colors text-sm"
                                />
                            </div>
                            <SubmitButton 
                                type="submit" 
                                variant={product.color_theme.includes('blue') ? 'blue' : product.color_theme.includes('green') ? 'green' : product.color_theme.includes('magenta') ? 'magenta' : 'purple'}
                                className="w-full py-4 text-lg flex items-center justify-center gap-2"
                                loadingText={product.is_free ? "PREPARING..." : "INITIALIZING..."}
                            >
                                <ShoppingCart className="w-5 h-5" /> 
                                {product.is_free ? 'CLAIM NOW' : 'SECURE CHECKOUT'}
                            </SubmitButton>
                        </form>
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
