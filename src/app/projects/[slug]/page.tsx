import React from "react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ProcessTimeline } from "@/components/projects/ProcessTimeline";
import { ScreenshotCarousel } from "@/components/projects/ScreenshotCarousel";
import { Github, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import styles from "./CaseStudy.module.css";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    
    return {
        title: `${project.title} | Case Study`,
        description: project.tagline,
    };
}

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((p) => ({
        slug: p.slug,
    }));
}

export default async function ProjectCaseStudy({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) notFound();

    return (
        <div className="min-h-screen bg-mech-base w-full">
            {/* Minimal Header/Nav Back */}
            <div className="fixed top-24 left-8 z-50">
                <Link href="/projects" className="flex items-center gap-2 text-mech-silver/60 hover:text-mech-cyan transition-colors group">
                    <div className="p-2 border border-mech-silver/20 bg-mech-base group-hover:border-mech-cyan">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-orbitron text-[10px] tracking-widest uppercase hidden md:inline">Back to Mission Control</span>
                </Link>
            </div>

            {/* Cinematic Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.meta}>
                        <span className={styles.year}>{project.year}</span>
                        <div className={styles.line} />
                        <span className={styles.category}>{project.category.toUpperCase()}</span>
                    </div>

                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.tagline}>{project.tagline}</p>

                    <div className={styles.actions}>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
                                <ExternalLink className="w-4 h-4" />
                                EXECUTE LIVE DEMO
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
                                <Github className="w-4 h-4" />
                                ACCESS REPOSITORY
                            </a>
                        )}
                    </div>
                </div>

                {/* Status Float */}
                <div className={styles.statusFloat}>
                    <span className="text-[10px] font-mono opacity-40 mb-1">DEPLOYMENT_STATUS</span>
                    <span className={styles.statusValue}>{project.status.toUpperCase()}</span>
                </div>
            </section>

            {/* Overview Section */}
            {project.overview && (
                <section className={styles.section}>
                    <div className={styles.grid}>
                        <div className={styles.overviewText}>
                            <h2 className={styles.sectionTitle}>The Objective</h2>
                            <p className={styles.description}>{project.overview.problem}</p>
                            
                            <div className={styles.roleBox}>
                                <span className="text-[10px] font-orbitron text-mech-cyan mb-2 block">CODENAME_ROLE</span>
                                <p className="font-orbitron text-xl uppercase font-black">{project.overview.role}</p>
                            </div>
                        </div>

                        <div className={styles.outcomes}>
                            <h2 className={styles.sectionTitle}>Key Outcomes</h2>
                            <ul className={styles.outcomeList}>
                                {project.overview.outcomes.map((o, idx) => (
                                    <li key={idx} className={styles.outcomeItem}>
                                        <ChevronRight className="w-4 h-4 text-mech-cyan" />
                                        <span>{o}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Tech Stack Horizontal Scroll/Grid */}
            <section className={`${styles.section} ${styles.techSection}`}>
               <h2 className={styles.sectionTitleCenter}>Integrated Systems</h2>
               <div className={styles.techGrid}>
                   {project.tech.map(t => (
                       <div key={t} className={styles.techCard}>
                           <span className={styles.techName}>{t}</span>
                       </div>
                   ))}
               </div>
            </section>

            {/* Process Timeline */}
            {project.process && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitleCenter}>The Process Matrix</h2>
                    <ProcessTimeline steps={project.process} />
                </section>
            )}

            {/* Screenshot Visuals (Optional) */}
            <section className={styles.section}>
                 <h2 className={styles.sectionTitleCenter}>Visual Intelligence</h2>
                 <ScreenshotCarousel images={project.thumbnail ? [project.thumbnail] : []} />
            </section>

            {/* Bottom CTA */}
            <section className={styles.footerCTA}>
                <div className={styles.ctaCard}>
                    <h3 className={styles.ctaTitle}>HAVE A SIMILAR MISSION?</h3>
                    <p className={styles.ctaDesc}>Initiate a direct link for collaboration on next-gen neural architectures.</p>
                    <Link href="/hire" className={styles.primaryBtnLarge}>
                        ENGAGE COLLABORATION
                    </Link>
                </div>
            </section>
        </div>
    );
}
