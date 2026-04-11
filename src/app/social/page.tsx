"use client";

import { MechPanel } from "@/components/ui/MechPanel";
import { motion } from "framer-motion";
import { 
    ExternalLink, 
    Share2, 
    Github, 
    Linkedin, 
    Twitter, 
    Youtube, 
    Instagram, 
    MessageSquare, 
    Heart, 
    Coffee, 
    Globe, 
    Link as LinkIcon,
    Mail,
    Codepen,
    FileText,
    Pin,
    HelpCircle,
    LayoutGrid
} from "lucide-react";
import { useEffect, useState } from "react";
import aboutData from "@/data/about.json";

interface SocialLink {
    title: string;
    url: string;
    icon: any;
    category: "primary" | "support";
}

const getIconForPlatform = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("github")) return Github;
    if (t.includes("linkedin")) return Linkedin;
    if (t.includes("twitter") || t.includes("x.com")) return Twitter;
    if (t.includes("youtube")) return Youtube;
    if (t.includes("instagram")) return Instagram;
    if (t.includes("discord")) return MessageSquare;
    if (t.includes("coffee") || t.includes("buymeacoffee")) return Coffee;
    if (t.includes("patreon") || t.includes("donate") || t.includes("ko-fi")) return Heart;
    if (t.includes("globe") || t.includes("portfolio") || t.includes("website")) return Globe;
    if (t.includes("mail") || t.includes("@")) return Mail;
    if (t.includes("behance")) return LayoutGrid;
    if (t.includes("medium")) return FileText;
    if (t.includes("pinterest")) return Pin;
    if (t.includes("quora")) return HelpCircle;
    if (t.includes("codepen")) return Codepen;
    if (t.includes("mastodon")) return Share2;
    return LinkIcon;
};

export default function SocialHub() {
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Now using centralized data from about.json
        const extractedLinks: SocialLink[] = (aboutData.socials || []).map(social => ({
            title: social.platform,
            url: social.url,
            icon: getIconForPlatform(social.platform),
            category: (social.category || "primary") as "primary" | "support"
        }));

        setLinks(extractedLinks);
        setIsLoading(false);
    }, []);

    const primaryLinks = links.filter(l => l.category === "primary");
    const supportLinks = links.filter(l => l.category === "support");

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-12 w-full"
            >
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b border-mech-cyan/30 pb-4">
                        <Share2 className="w-8 h-8 text-mech-cyan animate-pulse" />
                        <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest uppercase">
                            Network Interface <span className="text-mech-cyan">::</span> Neural Nodes
                        </h1>
                    </div>
                    <p className="font-mono text-sm text-mech-silver/60">
                        ESTABLISHING EXTERNAL UPLINKS... PROTOCOL_ALPHA_ACTIVE.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-mech-cyan/5 animate-pulse border border-mech-cyan/10 rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Primary Social Nodes */}
                        <div className="space-y-6">
                            <h2 className="font-orbitron text-xs text-mech-cyan tracking-[0.3em] uppercase opacity-50">
                                Primary Communication Nodes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {primaryLinks.map((link, idx) => (
                                    <motion.a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group"
                                        aria-label={`Connect on ${link.title}`}
                                        role="link"
                                    >
                                        <MechPanel border className="p-4 flex items-center justify-between group-hover:bg-mech-cyan/5 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-mech-base border border-mech-cyan/20 rounded group-hover:border-mech-cyan group-hover:shadow-[0_0_10px_rgba(15,211,255,0.3)] transition-all">
                                                    <link.icon className="w-5 h-5 text-mech-cyan" />
                                                </div>
                                                <span className="font-orbitron text-sm tracking-wider text-mech-white group-hover:text-mech-cyan transition-colors">
                                                    {link.title}
                                                </span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-mech-silver/30 group-hover:text-mech-cyan transition-colors" />
                                        </MechPanel>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Support Nodes (Donations) */}
                        {supportLinks.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="font-orbitron text-xs text-mech-blue tracking-[0.3em] uppercase opacity-50">
                                    Fuel Source :: Support Nodes
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {supportLinks.map((link, idx) => (
                                        <motion.a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + (idx * 0.1) }}
                                            className="group"
                                            aria-label={`Support via ${link.title}`}
                                            role="link"
                                        >
                                            <MechPanel border className="p-4 border-dashed flex items-center justify-between hover:bg-mech-blue/5 transition-all duration-300 border-mech-blue/30 group-hover:border-mech-blue">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-mech-base border border-mech-blue/20 rounded group-hover:border-mech-blue group-hover:shadow-[0_0_10px_rgba(0,174,239,0.3)] transition-all">
                                                        <link.icon className="w-5 h-5 text-mech-blue" />
                                                    </div>
                                                    <span className="font-orbitron text-sm tracking-wider text-mech-white group-hover:text-mech-blue transition-colors">
                                                        {link.title}
                                                    </span>
                                                </div>
                                                <Coffee className="w-4 h-4 text-mech-blue/30 group-hover:text-mech-blue transition-colors" />
                                            </MechPanel>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Footer Decorator */}
                <div className="pt-12 border-t border-mech-silver/10 flex justify-between items-center text-[10px] font-mono text-mech-silver/40 tracking-widest uppercase">
                    <span>Neural Link Established</span>
                    <span>© 2026 FM_OS :: SOCIAL_MOD</span>
                </div>
            </motion.div>
        </div>
    );
}
