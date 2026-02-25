"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    User,
    BarChart3,
    FolderGit2,
    Briefcase,
    ShoppingCart,
    BookOpen,
    Mail,
    Menu,
    X,
    Cpu,
} from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/skills", label: "Skills", icon: BarChart3 },
    { href: "/projects", label: "Projects", icon: FolderGit2 },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/marketplace", label: "Market", icon: ShoppingCart },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? "bg-mech-base/80 backdrop-blur-xl border-b border-mech-cyan/20 shadow-[0_4px_30px_rgba(0,174,239,0.1)]"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-md bg-mech-panel border border-mech-cyan/30 flex items-center justify-center group-hover:border-mech-cyan group-hover:shadow-[0_0_15px_rgba(15,211,255,0.4)] transition-all duration-300">
                                    <Cpu className="w-5 h-5 text-mech-cyan" />
                                </div>
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-mech-blue rounded-full animate-pulse shadow-[0_0_8px_rgba(0,174,239,0.8)]" />
                            </div>
                            <span className="font-orbitron font-bold text-sm tracking-[0.15em] text-mech-white/90 group-hover:text-mech-cyan transition-colors hidden sm:block">
                                NEURAL<span className="text-mech-cyan text-glow">.</span>ARCH
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`relative px-3 py-2 rounded-md font-orbitron text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group ${isActive
                                            ? "text-mech-cyan"
                                            : "text-mech-silver/60 hover:text-mech-white"
                                            }`}
                                    >
                                        <item.icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-mech-cyan" : "text-mech-silver/40 group-hover:text-mech-silver/80"}`} />
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 rounded-md bg-mech-cyan/10 border border-mech-cyan/30 -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-md border border-white/10 hover:border-mech-cyan/40 transition-colors"
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? (
                                <X className="w-5 h-5 text-mech-cyan" />
                            ) : (
                                <Menu className="w-5 h-5 text-mech-silver" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-30 lg:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute right-0 top-0 bottom-0 w-72 bg-mech-base/95 backdrop-blur-xl border-l border-mech-cyan/20 p-6 pt-20"
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-4 px-4 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-200 ${isActive
                                                    ? "text-mech-cyan bg-mech-cyan/10 border border-mech-cyan/30"
                                                    : "text-mech-silver hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <item.icon className={`w-5 h-5 ${isActive ? "text-mech-cyan" : "text-mech-silver/50"}`} />
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Decorative bottom element */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-mech-cyan/40 to-transparent mb-4" />
                                <p className="text-center font-orbitron text-[10px] text-mech-silver/30 tracking-widest">
                                    SYS.CORE v3.0
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
