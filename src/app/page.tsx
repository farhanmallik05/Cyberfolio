import React from 'react';
import dynamic from 'next/dynamic';
import GSAPRegistrar from '@/components/home/GSAPRegistrar';
import { HomeLoader } from '@/components/home/HomeLoader';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { SkillsPreview } from '@/components/home/SkillsPreview';
import { BackgroundSystem } from '@/components/BackgroundSystem';
import { Terminal as TerminalIcon } from 'lucide-react';
import { TerminalCLI } from '@/components/ui/TerminalCLI';
import { MatrixShortcut } from '@/components/home/MatrixShortcut';
import projectsDataFallback from '@/data/projects.json';

// ISR: rebuild this page at most every 60 seconds.
// This allows Next.js to pre-render the page as a static file served from
// the edge while still reflecting Supabase updates within a minute.
export const revalidate = 3600;

// Dynamic imports - no ssr:false needed; these are safe SSR components
const ProjectsPreview   = dynamic(() => import('@/components/home/ProjectsPreview').then(m => m.ProjectsPreview), { loading: () => <div className="h-96 w-full bg-mech-base/20 animate-pulse" /> });
const ServicesPreview   = dynamic(() => import('@/components/home/ServicesPreview').then(m => m.ServicesPreview), { loading: () => <div className="h-96 w-full bg-mech-base/20 animate-pulse" /> });
const TestimonialsStrip = dynamic(() => import('@/components/home/TestimonialsStrip').then(m => m.TestimonialsStrip), { loading: () => <div className="h-64 w-full bg-mech-base/20 animate-pulse" /> });
const BlogPreview       = dynamic(() => import('@/components/home/BlogPreview').then(m => m.BlogPreview), { loading: () => <div className="h-96 w-full bg-mech-base/20 animate-pulse" /> });
const ContactSection    = dynamic(() => import('@/components/home/ContactSection').then(m => m.ContactSection), { loading: () => <div className="h-96 w-full bg-mech-base/20 animate-pulse" /> });

/**
 * Fetches public projects using the Supabase REST API directly.
 * Using raw fetch (not createClient) avoids reading cookies, which would
 * force Next.js into dynamic rendering mode for the entire page.
 */
async function fetchPublicProjects() {
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const fallback = projectsDataFallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any) => ({ ...p, techStack: p.tech }))
    .slice(0, 6);

  if (!supabaseUrl || !supabaseAnon) return fallback;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/portfolio_projects?select=*&status=eq.live&order=year.desc&limit=6`,
      {
        headers: {
          apikey:        supabaseAnon,
          Authorization: `Bearer ${supabaseAnon}`,
        },
        next: { revalidate: 3600 }, // Next.js data cache tag
      }
    );

    if (!res.ok) throw new Error(`Supabase REST error: ${res.status}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = await res.json();
    if (!data || data.length === 0) return fallback;

    return data.map(p => ({
      ...p,
      githubUrl: p.github_url,
      liveUrl:   p.live_url,
      techStack: p.tech_stack || p.tech || [],
    }));
  } catch (err) {
    console.error('[Home] Failed to fetch projects, using fallback:', err);
    return fallback;
  }
}

export default async function Home() {
  const initialProjects = await fetchPublicProjects();

  return (
    <main className="relative min-h-screen w-full">
      {/* Infrastructure */}
      <GSAPRegistrar />

      {/* Background System (Stars/Grid) */}
      <BackgroundSystem />

      {/* Secret Matrix Layer – Shift+M toggles it */}
      <MatrixShortcut />

      <HomeLoader>
        <div className="flex flex-col w-full relative z-10">

          {/* Hero */}
          <div className="relative z-[100]">
            <HeroSection />
          </div>

          {/* About */}
          <div className="relative z-[90] bg-mech-base/40 backdrop-blur-[2px]">
            <AboutPreview />
          </div>

          {/* Skills */}
          <div className="relative z-[80] bg-mech-base/40 backdrop-blur-[2px]">
            <SkillsPreview />
          </div>

          {/* Projects – data passed from server, no client fetch needed */}
          <div className="relative z-[70]">
            <ProjectsPreview initialProjects={initialProjects} />
          </div>

          {/* Services */}
          <div className="relative z-[60] bg-mech-base/40 backdrop-blur-[2px]">
            <ServicesPreview />
          </div>

          {/* Testimonials */}
          <div className="relative z-[50] bg-mech-base/40 backdrop-blur-[2px]">
            <TestimonialsStrip />
          </div>

          {/* Blog */}
          <div className="relative z-[40] bg-mech-base/40 backdrop-blur-[2px]">
            <BlogPreview />
          </div>

          {/* Contact */}
          <div id="contact" className="relative z-[30] bg-mech-base/40 backdrop-blur-[2px]">
            <ContactSection />
          </div>

          {/* Terminal CLI */}
          <div className="relative z-[20] bg-mech-base/40 backdrop-blur-[2px] py-20 border-t border-white/5">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 mb-8">
                <TerminalIcon className="text-neon w-5 h-5" />
                <h3 className="font-orbitron text-sm tracking-[0.2em] text-dim uppercase">
                  Interactive Terminal Access
                </h3>
              </div>
              <TerminalCLI />
            </div>
          </div>

        </div>
      </HomeLoader>
    </main>
  );
}
