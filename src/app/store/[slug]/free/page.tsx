import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Mail, CheckCircle2 } from "lucide-react";
import { claimFreeProduct } from "../../actions";
import Link from "next/link";

export default async function FreeProductPage({ params }: { params: Promise<{ slug: string }> }) {
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
        console.error('Failed to init Supabase or fetch free product:', e);
    }

    if (!product || !product.is_free) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 max-w-2xl mx-auto relative z-10">
            <div className="mb-8">
                <Link href={`/store/${product.slug}`} className="text-mech-silver hover:text-neon-blue font-orbitron text-sm transition-colors">
                    &lt; BACK TO PRODUCT
                </Link>
            </div>
            <GlassPanel neonBorder className="p-8 md:p-12 relative overflow-hidden text-center">
                <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-current ${product.color_theme}`} />
                
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
                        Claim {product.name}
                    </h1>
                    <p className="font-inter text-foreground/80 leading-relaxed mb-8">
                        Enter your email below. We'll send you a secure, instant download link.
                    </p>
                    
                    <form action={claimFreeProduct} className="w-full max-w-sm mx-auto space-y-4">
                        <input type="hidden" name="productId" value={product.id} />
                        
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mech-silver" />
                            <input 
                                type="email" 
                                name="email" 
                                required
                                placeholder="your@email.com" 
                                className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-12 pr-4 text-white font-inter focus:outline-none focus:border-neon-blue transition-colors"
                            />
                        </div>

                        <SubmitButton 
                            type="submit" 
                            variant={product.color_theme.includes('blue') ? 'blue' : product.color_theme.includes('green') ? 'green' : product.color_theme.includes('magenta') ? 'magenta' : 'purple'}
                            className="w-full py-3 text-sm flex items-center justify-center gap-2 mt-4"
                            loadingText="GENERATING LINK..."
                        >
                            <CheckCircle2 className="w-4 h-4" /> SEND ME THE DOWNLOAD
                        </SubmitButton>
                    </form>
                    
                    <p className="text-xs text-mech-silver mt-6 font-share-tech">
                        By claiming this, you'll be subscribed to the Cyberfolio insider updates. You can unsubscribe anytime.
                    </p>
                </div>
            </GlassPanel>
        </div>
    );
}
