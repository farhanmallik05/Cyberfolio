"use client";

import Link from "next/link";
import { Cpu, ArrowUpRight } from "lucide-react";
import aboutData from "@/data/about.json";
import { getIconForPlatform } from "@/lib/icons";

const socialLinks = (aboutData.socials || [])
    .filter(s => s.category === "primary" || ["github", "linkedin", "twitter"].some(p => s.platform.toLowerCase().includes(p)))
    .map(s => ({
        href: s.url,
        icon: getIconForPlatform(s.platform),
        label: s.platform
    }));

const navigationLinks = [
    {
        title: "Platform",
        links: [
            { href: "/about", label: "About" },
            { href: "/skills", label: "Skills" },
            { href: "/projects", label: "Projects" },
            { href: "/services", label: "Services" },
        ]
    },
    {
        title: "Current",
        links: [
            { href: "/now", label: "Now" },
            { href: "/uses", label: "Uses" },
            { href: "/social", label: "Social Hub" },
            { href: "/contact", label: "Contact" },
        ]
    }
];

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-mech-silver/10 bg-mech-base/80 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24">

                    {/* Left Side: Brand & Socials */}
                    <div className="space-y-8 max-w-sm">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-sm bg-mech-panel border border-mech-cyan/30 flex items-center justify-center">
                                        <Cpu className="w-5 h-5 text-mech-cyan" />
                                    </div>
                                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-mech-blue rounded-full shadow-[0_0_8px_rgba(0,174,239,0.8)]" />
                                </div>
                                <span className="font-orbitron font-bold text-sm tracking-[0.15em] text-mech-white/90">
                                    NEURAL<span className="text-mech-cyan">.</span>ARCH
                                </span>
                            </div>
                            <p className="font-inter text-sm text-mech-silver/60 leading-relaxed">
                                Building at the intersection of software development, design, and practical problem solving. Always learning, always improving.
                            </p>
                        </div>

                        {/* Social Links integrated here */}
                        <div className="space-y-4">
                            <h4 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-mech-silver/40">Connect</h4>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-sm bg-mech-panel border border-mech-silver/10 flex items-center justify-center text-mech-silver/60 hover:text-mech-cyan hover:border-mech-cyan/40 hover:shadow-[0_0_15px_rgba(0,174,239,0.15)] transition-all duration-300 group/icon"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-4 h-4 group-hover/icon:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Navigation Columns grouped together */}
                    <div className="flex gap-16 sm:gap-24">
                        {navigationLinks.map((column) => (
                            <div key={column.title} className="min-w-[120px]">
                                <h4 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-mech-silver/40 mb-6">{column.title}</h4>
                                <div className="flex flex-col gap-3">
                                    {column.links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="font-inter text-sm text-mech-silver/70 hover:text-mech-cyan transition-colors flex items-center gap-2 group w-fit"
                                        >
                                            <span className="w-1 h-1 bg-mech-cyan/20 rounded-full group-hover:bg-mech-cyan transition-colors" />
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-mech-silver/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-mech-silver/40">
                        &copy; {new Date().getFullYear()} Farhan Mallik. All systems reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-mech-cyan/5 border border-mech-cyan/10 rounded-sm">
                            <div className="w-1 h-1 bg-mech-blue shadow-[0_0_5px_rgba(0,174,239,0.8)] rounded-none rotate-45 animate-pulse" />
                            <span className="font-orbitron text-[9px] text-mech-cyan/60 tracking-widest uppercase">
                                v2.1.0-MECH
                            </span>
                        </div>
                        <span className="font-orbitron text-[9px] text-mech-silver/30 tracking-widest uppercase">
                            SYSTEM_ID: MALLIK_SAHAB
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
