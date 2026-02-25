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
        <footer className="relative z-10 border-t border-mech-silver/10 bg-mech-base/80 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div className="space-y-4 flex flex-col items-start">
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
                        <p className="font-inter text-sm text-mech-silver/60 max-w-xs leading-relaxed">
                            Engineering intelligent systems and automation frameworks. Built with mechanical precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-orbitron text-xs uppercase tracking-widest text-mech-silver/40 mb-4">Navigation</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="font-inter text-sm text-mech-silver/70 hover:text-mech-cyan transition-colors flex items-center gap-1 group"
                                >
                                    {link.label}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-orbitron text-xs uppercase tracking-widest text-mech-silver/40 mb-4">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-sm bg-mech-panel border border-mech-silver/10 flex items-center justify-center text-mech-silver/60 hover:text-mech-cyan hover:border-mech-cyan/30 hover:shadow-[0_0_10px_rgba(15,211,255,0.2)] transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-mech-silver/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-mech-silver/40">
                        &copy; {new Date().getFullYear()} Farhan Mallik. All systems reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-mech-blue shadow-[0_0_5px_rgba(0,174,239,0.8)] rounded-none rotate-45 animate-pulse" />
                        <span className="font-orbitron text-[10px] text-mech-cyan/60 tracking-widest">
                            SYSTEM IDENTIFIER
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
