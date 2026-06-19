import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { GlitchText } from '@/components/ui/GlitchText';
import { ScreenshotCarousel } from '@/components/projects/ScreenshotCarousel';
import { ProcessTimeline } from '@/components/projects/ProcessTimeline';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { createClient } from '@/utils/supabase/server';
import { Project } from '@/lib/projects';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600; // Cache for 1 hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('portfolio_projects')
    .select('title, description, thumbnail')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      images: project.thumbnail ? [project.thumbnail] : [],
    }
  };
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('slug')
    .eq('case_study', true);

  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!project || !project.case_study) {
    notFound();
  }

  const { data: relatedProjects } = await supabase
    .from('portfolio_projects')
    .select('*')
    .neq('slug', project.slug)
    .or(`category.eq.${project.category},tech.cs.{${project.tech[0] || ''}}`)
    .limit(3);

  return (
    <article className="min-h-screen pt-32 pb-20 px-6 max-w-[1400px] mx-auto overflow-hidden">
      {/* Back Link */}
      <div className="mb-8 md:pl-[48px]">
        <Link href="/projects" className="inline-flex items-center gap-2 font-orbitron text-sm text-mech-silver hover:text-mech-cyan transition-colors tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4" />
          Back to Ledger
        </Link>
      </div>

      {/* Hero */}
      <header className="mb-20 md:pl-[48px] pr-4">
        <div className="flex flex-wrap items-center gap-4 mb-6">
           <span className="text-xs font-mono text-mech-cyan/60 uppercase tracking-widest px-3 py-1 border border-mech-cyan/20 bg-mech-cyan/5">
                {project.category}
           </span>
           <span className="text-xs font-mono text-mech-silver/60 uppercase tracking-widest">
                {project.year}
           </span>
           <div className={`px-2 py-0.5 text-[10px] font-orbitron font-bold border rounded-sm tracking-widest uppercase flex items-center gap-1.5 ${
                project.status === 'live' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                project.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'live' ? 'bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]' :
                    project.status === 'in-progress' ? 'bg-amber-400 animate-pulse' :
                    'bg-gray-400'
                }`} />
                {project.status.replace('-', ' ')}
            </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 relative z-10 text-white">
            <GlitchText text={project.title} />
        </h1>
        
        <p className="font-inter text-xl md:text-2xl text-mech-silver max-w-3xl leading-relaxed mb-10">
            {project.tagline}
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-mech-cyan text-mech-base font-orbitron font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_var(--neon)] transition-all">
                    <ExternalLink className="w-4 h-4" />
                    Live Deployment
                </a>
            )}
            {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-mech-cyan/50 text-mech-cyan font-orbitron font-bold uppercase tracking-widest hover:bg-mech-cyan/10 transition-all">
                    <Github className="w-4 h-4" />
                    Source Code
                </a>
            )}
        </div>

        <div className="flex flex-wrap gap-2 pt-8 border-t border-mech-silver/10">
            {project.tech.map((tech: string) => (
                <span key={tech} className="text-[11px] font-orbitron tracking-wider px-3 py-1 bg-mech-base border border-mech-silver/20 text-mech-silver">
                    {tech}
                </span>
            ))}
        </div>
      </header>

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 md:pl-[48px] pr-4">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-24">
            
            {/* Overview */}
            {project.overview && (
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="text-xs font-orbitron text-mech-cyan tracking-[0.2em] uppercase">▸▸ 01 — Overview</div>
                      <div className="h-px flex-1 bg-gradient-to-r from-mech-cyan/20 to-transparent" />
                  </div>
                  
                  <div className="space-y-8 font-inter text-mech-silver/90 leading-relaxed text-lg">
                      {project.overview.problem && (
                          <div>
                              <h3 className="font-orbitron text-xl text-white uppercase tracking-wider mb-4">The Challenge</h3>
                              <p>{project.overview.problem}</p>
                          </div>
                      )}
                      {project.overview.outcomes && (
                          <div>
                              <h3 className="font-orbitron text-xl text-white uppercase tracking-wider mb-4">Key Outcomes</h3>
                              <ul className="list-disc list-inside space-y-2 text-mech-silver">
                                  {project.overview.outcomes.map((outcome: string, i: number) => <li key={i}>{outcome}</li>)}
                              </ul>
                          </div>
                      )}
                  </div>
              </section>
            )}

            {/* Visuals */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <div className="text-xs font-orbitron text-mech-cyan tracking-[0.2em] uppercase">▸▸ 02 — Visuals</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-mech-cyan/20 to-transparent" />
                </div>
                
                <ScreenshotCarousel images={project.screenshots && project.screenshots.length > 0 ? project.screenshots : (project.thumbnail ? [{url: project.thumbnail, caption: 'Primary View'}] : [])} />
            </section>

            {/* Process Timeline */}
            {project.process && project.process.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="text-xs font-orbitron text-mech-cyan tracking-[0.2em] uppercase">▸▸ 03 — Process</div>
                        <div className="h-px flex-1 bg-gradient-to-r from-mech-cyan/20 to-transparent" />
                    </div>
                    
                    <ProcessTimeline phases={project.process} />
                </section>
            )}

            {/* Tech Details & Results */}
            {(project.techDetails || project.results) && (
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="text-xs font-orbitron text-mech-cyan tracking-[0.2em] uppercase">▸▸ 04 — Engineering</div>
                      <div className="h-px flex-1 bg-gradient-to-r from-mech-cyan/20 to-transparent" />
                  </div>
                  
                  <div className="space-y-8 font-inter text-mech-silver/90 leading-relaxed text-lg">
                      {project.techDetails && (
                          <div>
                              <h3 className="font-orbitron text-xl text-white uppercase tracking-wider mb-4">Technical Decisions</h3>
                              <p>{project.techDetails}</p>
                          </div>
                      )}
                      {project.results && (
                          <div>
                              <h3 className="font-orbitron text-xl text-white uppercase tracking-wider mb-4">Impact</h3>
                              <p>{project.results}</p>
                          </div>
                      )}
                  </div>
              </section>
            )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
            <div className="sticky top-32">
                <div className="p-8 border border-mech-silver/10 bg-mech-base/50 mb-12">
                    <h3 className="font-orbitron text-lg text-white uppercase tracking-wider mb-6">Execution Role</h3>
                    <p className="font-mono text-sm text-mech-cyan opacity-80 leading-relaxed">
                        {project.overview?.role || "Lead Architect"}
                    </p>
                </div>

                <div className="border border-mech-cyan/20 bg-mech-cyan/5 p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(15,211,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,211,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                    
                    <h3 className="font-orbitron text-xl text-white uppercase tracking-wider mb-4 relative z-10">
                        Initiate a Protocol
                    </h3>
                    <p className="font-inter text-mech-silver text-sm mb-6 relative z-10">
                        Have a similar architectural challenge or engaging UI boundary to push? Let's engineer a solution.
                    </p>
                    <Link href="/hire" className="inline-block w-full text-center py-3 bg-mech-cyan text-mech-base font-orbitron font-bold uppercase tracking-widest hover:bg-white transition-colors relative z-10 shadow-[0_0_15px_var(--glass)]">
                        Establish Link
                    </Link>
                </div>
            </div>
        </aside>
      </div>

      {/* Related Projects */}
      <RelatedProjects projects={relatedProjects as Project[]} />

    </article>
  );
}
