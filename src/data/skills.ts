export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'automation' 
  | 'ai' 
  | 'design' 
  | 'devops';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  projectReference?: string;
  relatedTo: string[];
  x?: number; // deterministic calculation used in component
  y?: number;
}

export const SKILLS: Skill[] = [
  // FRONTEND CLUSTER (Interface Matrix)
  { id: 'react', name: 'React', category: 'frontend', proficiency: 45, projectReference: 'Neural Architect', relatedTo: ['nextjs', 'typescript', 'tailwind', 'figma'] },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 45, projectReference: 'Neural Architect', relatedTo: ['react', 'typescript', 'vercel'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 52, relatedTo: ['react', 'nextjs', 'nodejs'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', proficiency: 45, relatedTo: ['react', 'html-css'] },
  { id: 'html-css', name: 'HTML5/CSS3', category: 'frontend', proficiency: 72, relatedTo: ['tailwind', 'react'] },
  { id: 'vibe-coding', name: 'Vibe Coding', category: 'frontend', proficiency: 79, relatedTo: ['prompting', 'react'] },

  // BACKEND & LOGIC CLUSTER (Neural Core)
  { id: 'algorithms', name: 'DSA', category: 'backend', proficiency: 42, relatedTo: ['problem-solving', 'cpp'] },
  { id: 'problem-solving', name: 'Problem Solving', category: 'backend', proficiency: 65, relatedTo: ['algorithms', 'critical-thinking'] },
  { id: 'os', name: 'Operating Systems', category: 'backend', proficiency: 85, relatedTo: ['linux', 'cpp'] },
  { id: 'cpp', name: 'C/C++', category: 'backend', proficiency: 65, relatedTo: ['os', 'algorithms'] },
  { id: 'math', name: 'Mathematics', category: 'backend', proficiency: 70, relatedTo: ['algorithms', 'ml'] },
  { id: 'critical-thinking', name: 'Critical Thinking', category: 'backend', proficiency: 80, relatedTo: ['problem-solving'] },

  // AUTOMATION CLUSTER (Agentic Systems)
  { id: 'n8n', name: 'n8n', category: 'automation', proficiency: 68, projectReference: 'Workflow Engine', relatedTo: ['python', 'workflow', 'api'] },
  { id: 'python', name: 'Python', category: 'automation', proficiency: 60, projectReference: 'Data Processors', relatedTo: ['n8n', 'ml', 'ai-agents'] },
  { id: 'workflow', name: 'Workflow Mgmt', category: 'automation', proficiency: 88, relatedTo: ['n8n', 'api'] },
  { id: 'api', name: 'REST APIs', category: 'automation', proficiency: 85, relatedTo: ['n8n', 'nodejs', 'supabase'] },
  { id: 'uipath', name: 'UiPath RPA', category: 'automation', proficiency: 32, relatedTo: ['workflow'] },

  // AI CLUSTER (Agentic Systems)
  { id: 'ai-agents', name: 'AI Agents', category: 'ai', proficiency: 44, projectReference: 'Neural Architect', relatedTo: ['prompting', 'python', 'n8n'] },
  { id: 'prompting', name: 'Prompt Eng.', category: 'ai', proficiency: 86, projectReference: 'LLM Optimizers', relatedTo: ['ai-agents', 'vibe-coding'] },
  { id: 'gen-ai', name: 'Generative AI', category: 'ai', proficiency: 95, relatedTo: ['prompting', 'ai-agents'] },
  { id: 'ml', name: 'Machine Learning', category: 'ai', proficiency: 75, relatedTo: ['python', 'math'] },

  // DESIGN CLUSTER
  { id: 'figma', name: 'Figma', category: 'design', proficiency: 78, relatedTo: ['react', 'user-interaction'] },
  { id: 'user-interaction', name: 'UX Design', category: 'design', proficiency: 60, relatedTo: ['figma', 'react'] },

  // DEVOPS CLUSTER (Operations Control)
  { id: 'git', name: 'Git/GitHub', category: 'devops', proficiency: 64, relatedTo: ['vercel', 'docker'] },
  { id: 'linux', name: 'Linux', category: 'devops', proficiency: 38, relatedTo: ['os', 'docker'] },
  { id: 'cloud', name: 'AWS Cloud', category: 'devops', proficiency: 65, relatedTo: ['vercel', 'docker'] },
  { id: 'seo', name: 'SEO', category: 'devops', proficiency: 92, relatedTo: ['vercel'] },
  { id: 'vercel', name: 'Vercel', category: 'devops', proficiency: 85, relatedTo: ['nextjs', 'git'] },
  { id: 'supabase', name: 'Supabase', category: 'backend', proficiency: 75, projectReference: 'Neural Architect', relatedTo: ['api', 'postgresql'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', proficiency: 70, relatedTo: ['supabase'] },
];

export const CATEGORY_CONFIG: Record<SkillCategory, { label: string; color: string; glowColor: string }> = {
  frontend:   { label: 'Frontend',   color: 'var(--neon)', glowColor: 'var(--glow)' },
  backend:    { label: 'Backend',    color: 'var(--neon2)', glowColor: 'var(--glow2)' },
  automation: { label: 'Automation', color: 'var(--neon)', glowColor: 'var(--glow)' },
  ai:         { label: 'AI',         color: 'var(--neon2)', glowColor: 'var(--glow2)' },
  design:     { label: 'Design',     color: 'var(--neon)', glowColor: 'var(--glow)' },
  devops:     { label: 'DevOps',     color: 'var(--neon2)', glowColor: 'var(--glow2)' },
};
