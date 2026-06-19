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
    Share2,
    Activity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Zap,
    Award,
    FileText,
    ChevronDown
} from "lucide-react";

type NavItem = {
    href?: string;
    label: string;
    icon: any;
    children?: { href: string; label: string; icon: any; }[];
};

const navItems: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { 
        label: "About", 
        icon: User,
        children: [
            { href: "/about", label: "About Me", icon: User },
            { href: "/skills", label: "Skills", icon: BarChart3 },
            { href: "/resume", label: "Resume", icon: FileText },
            { href: "/certificates", label: "Certificates", icon: Award },
            { href: "/now", label: "Now", icon: Activity },
        ]
    },
    { 
        label: "Work", 
        icon: Briefcase,
        children: [
            { href: "/projects", label: "Projects", icon: FolderGit2 },
            { href: "/services", label: "Services", icon: Briefcase },
            { href: "/marketplace", label: "Market", icon: ShoppingCart },
        ]
    },
    { 
        label: "Connect", 
        icon: Share2,
        children: [
            { href: "/social", label: "Social", icon: Share2 },
            { href: "/blog", label: "Blog", icon: BookOpen },
            { href: "/contact", label: "Contact", icon: Mail },
        ]
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setExpandedItem(null);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? "bg-[var(--bg2)]/90 backdrop-blur-xl border-b border-[color-mix(in_srgb,var(--neon)_20%,transparent)] shadow-[0_4px_30px_var(--glass)] py-2"
                    : "bg-transparent py-4 md:py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between transition-all duration-300">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-md bg-[var(--bg2)] border border-[color-mix(in_srgb,var(--neon)_30%,transparent)] flex items-center justify-center group-hover:border-[var(--neon)] group-hover:shadow-[0_0_15px_var(--glass)] transition-all duration-300">
                                    <Cpu className="w-5 h-5 text-[var(--neon)]" />
                                </div>
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--neon2)] rounded-full animate-pulse shadow-[0_0_8px_var(--neon)]" />
                            </div>
                            <span className="font-orbitron font-bold text-sm tracking-[0.15em] text-[var(--text)] group-hover:text-[var(--neon)] transition-colors hidden sm:block">
                                NEURAL<span className="text-[var(--neon)] text-glow">.</span>ARCH
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex flex-wrap items-center gap-1 lg:gap-2 overflow-x-visible">
                            {navItems.map((item) => {
                                const isActive = item.href ? pathname === item.href : item.children?.some(child => pathname === child.href);
                                return (
                                    <div key={item.label} className="relative group">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className={`relative px-2 lg:px-3 py-2 rounded-md font-orbitron text-[10px] lg:text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${isActive
                                                    ? "text-[var(--neon)]"
                                                    : "text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-white"
                                                    }`}
                                            >
                                                <item.icon className={`w-3 h-3 lg:w-4 lg:h-4 transition-colors ${isActive ? "text-[var(--neon)]" : "opacity-40 group-hover:opacity-80 text-[var(--text)]"}`} />
                                                {item.label}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="nav-indicator"
                                                        className="absolute inset-0 rounded-md bg-[color-mix(in_srgb,var(--neon)_10%,transparent)] border border-[color-mix(in_srgb,var(--neon)_30%,transparent)] -z-10"
                                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </Link>
                                        ) : (
                                            <button
                                                className={`relative px-2 lg:px-3 py-2 rounded-md font-orbitron text-[10px] lg:text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-default ${isActive
                                                    ? "text-[var(--neon)]"
                                                    : "text-[color-mix(in_srgb,var(--text)_60%,transparent)] hover:text-white"
                                                    }`}
                                            >
                                                <item.icon className={`w-3 h-3 lg:w-4 lg:h-4 transition-colors ${isActive ? "text-[var(--neon)]" : "opacity-40 group-hover:opacity-80 text-[var(--text)]"}`} />
                                                {item.label}
                                                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="nav-indicator"
                                                        className="absolute inset-0 rounded-md bg-[color-mix(in_srgb,var(--neon)_10%,transparent)] border border-[color-mix(in_srgb,var(--neon)_30%,transparent)] -z-10"
                                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </button>
                                        )}

                                        {/* Dropdown Menu */}
                                        {item.children && (
                                            <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                                                <div className="bg-[var(--bg)]/95 backdrop-blur-xl border border-[color-mix(in_srgb,var(--neon)_20%,transparent)] rounded-lg shadow-[0_4px_30px_var(--glass)] p-2 min-w-[160px] flex flex-col gap-1">
                                                    {item.children.map(child => {
                                                        const isChildActive = pathname === child.href;
                                                        return (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                className={`px-3 py-2 rounded-md font-orbitron text-[10px] tracking-wider uppercase transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${isChildActive
                                                                    ? "text-[var(--neon)] bg-[color-mix(in_srgb,var(--neon)_10%,transparent)]"
                                                                    : "text-[color-mix(in_srgb,var(--text)_70%,transparent)] hover:text-white hover:bg-white/5"
                                                                }`}
                                                            >
                                                                <child.icon className={`w-3 h-3 ${isChildActive ? "text-[var(--neon)]" : "opacity-50 text-[var(--text)]"}`} />
                                                                {child.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-md border border-[var(--border)] hover:border-[var(--neon)] transition-colors"
                            aria-label="Toggle navigation"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? (
                                <X className="w-5 h-5 text-[var(--neon)]" />
                            ) : (
                                <Menu className="w-5 h-5 text-[var(--text)]" />
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
                            className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--bg2)]/95 backdrop-blur-xl border-l border-[color-mix(in_srgb,var(--neon)_20%,transparent)] p-6 pt-20"
                        >
                            <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar pb-10">
                                {navItems.map((item, idx) => {
                                    const isActive = item.href ? pathname === item.href : item.children?.some(child => pathname === child.href);
                                    const isExpanded = expandedItem === item.label;

                                    return (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex flex-col"
                                        >
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-200 ${isActive
                                                        ? "text-[var(--neon)] bg-[color-mix(in_srgb,var(--neon)_10%,transparent)] border border-[color-mix(in_srgb,var(--neon)_30%,transparent)]"
                                                        : "text-[var(--text)] hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    <item.icon className={`w-5 h-5 ${isActive ? "text-[var(--neon)]" : "opacity-50"}`} />
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-200 ${isActive || isExpanded
                                                        ? "text-[var(--neon)] bg-[color-mix(in_srgb,var(--neon)_5%,transparent)] border border-[color-mix(in_srgb,var(--neon)_20%,transparent)]"
                                                        : "text-[var(--text)] hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <item.icon className={`w-5 h-5 ${isActive || isExpanded ? "text-[var(--neon)]" : "opacity-50"}`} />
                                                        {item.label}
                                                    </div>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180 text-[var(--neon)]" : "opacity-50"}`} />
                                                </button>
                                            )}

                                            {/* Mobile Dropdown Children */}
                                            {item.children && (
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="flex flex-col gap-1 pl-12 pr-4 py-2">
                                                                {item.children.map(child => {
                                                                    const isChildActive = pathname === child.href;
                                                                    return (
                                                                        <Link
                                                                            key={child.href}
                                                                            href={child.href}
                                                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-orbitron text-xs tracking-wider transition-all duration-200 ${isChildActive
                                                                                ? "text-[var(--neon)] bg-[color-mix(in_srgb,var(--neon)_10%,transparent)]"
                                                                                : "text-[color-mix(in_srgb,var(--text)_70%,transparent)] hover:text-white hover:bg-white/5"
                                                                            }`}
                                                                        >
                                                                            <child.icon className={`w-4 h-4 ${isChildActive ? "text-[var(--neon)]" : "opacity-50"}`} />
                                                                            {child.label}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Decorative bottom element */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--neon)_40%,transparent)] to-transparent mb-4" />
                                <p className="text-center font-orbitron text-[10px] text-[color-mix(in_srgb,var(--text)_30%,transparent)] tracking-widest">
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
