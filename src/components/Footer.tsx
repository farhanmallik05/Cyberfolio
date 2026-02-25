"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Cpu, ArrowUpRight } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/farhanmallik", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/farhanmallik", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/farhanmallik", icon: Twitter, label: "Twitter" },
    { href: "mailto:farhan@example.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-cyber-base/80 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-cyber-panel border border-neon-blue/30 flex items-center justify-center">
                                <Cpu className="w-4 h-4 text-neon-blue" />
                            </div>
                            <span className="font-orbitron font-bold text-sm tracking-[0.15em] text-white/80">
                                NEURAL<span className="text-neon-blue">.</span>ARCH
                            </span>
                        </div>
                        <p className="font-inter text-sm text-white/40 max-w-xs leading-relaxed">
                            Engineering intelligent systems and automation frameworks. Built with precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-orbitron text-xs uppercase tracking-widest text-white/30 mb-4">Navigation</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="font-inter text-sm text-white/50 hover:text-neon-blue transition-colors flex items-center gap-1 group"
                                >
                                    {link.label}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-orbitron text-xs uppercase tracking-widest text-white/30 mb-4">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-md bg-cyber-panel border border-white/10 flex items-center justify-center text-white/40 hover:text-neon-blue hover:border-neon-blue/30 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-white/20">
                        &copy; {new Date().getFullYear()} Farhan Mallik. All systems reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                        <span className="font-orbitron text-[10px] text-white/20 tracking-widest">
                            ALL SYSTEMS OPERATIONAL
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
