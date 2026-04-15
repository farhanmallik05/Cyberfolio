export type SkillCategory =
  | 'core-lang'
  | 'frontend'
  | 'ai-llm'
  | 'ml-data'
  | 'automation'
  | 'backend-api'
  | 'design-ux'
  | 'devops'
  | 'content'
  | 'leadership'
  | 'security-ops'
  | 'cs-core';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  projectReference?: string;
  relatedTo: string[];
  x?: number;
  y?: number;
}

export interface SectorCfg {
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  glowColor: string;
  icon: string;
}

export const SECTOR_CONFIG: Record<SkillCategory, SectorCfg> = {
  'core-lang':    { label: 'Core Languages',       shortLabel: 'LANG',   description: 'Compiled & scripted foundations',   color: '#F59E0B', glowColor: '#F59E0B80', icon: '⚙' },
  'frontend':     { label: 'Frontend Stack',        shortLabel: 'UI',     description: 'Interface layer & frameworks',       color: '#00F5FF', glowColor: '#00F5FF80', icon: '◈' },
  'ai-llm':       { label: 'AI & LLMs',             shortLabel: 'AI',     description: 'Generative intelligence systems',    color: '#C084FC', glowColor: '#C084FC80', icon: '◉' },
  'ml-data':      { label: 'Machine Learning',      shortLabel: 'ML',     description: 'Statistical & neural models',        color: '#38BDF8', glowColor: '#38BDF880', icon: '∿' },
  'automation':   { label: 'Automation Systems',    shortLabel: 'RPA',    description: 'Autonomous workflow engines',        color: '#34D399', glowColor: '#34D39980', icon: '⟳' },
  'backend-api':  { label: 'Backend & APIs',        shortLabel: 'API',    description: 'Data layer & service mesh',          color: '#6EE7B7', glowColor: '#6EE7B780', icon: '◬' },
  'design-ux':    { label: 'Design & UX',           shortLabel: 'UX',     description: 'Human-computer interface craft',     color: '#F472B6', glowColor: '#F472B680', icon: '❖' },
  'devops':       { label: 'DevOps & Cloud',        shortLabel: 'OPS',    description: 'Infrastructure & deployment grid',   color: '#FBBF24', glowColor: '#FBBF2480', icon: '⬡' },
  'content':      { label: 'Content & Creative',    shortLabel: 'CRE',    description: 'Narrative & media output',           color: '#A78BFA', glowColor: '#A78BFA80', icon: '✦' },
  'leadership':   { label: 'Leadership & Comms',    shortLabel: 'LEAD',   description: 'Command, collaboration & clarity',   color: '#60A5FA', glowColor: '#60A5FA80', icon: '❋' },
  'security-ops': { label: 'Security & Ops',        shortLabel: 'SEC',    description: 'Hardening, audit & performance',     color: '#F87171', glowColor: '#F8717180', icon: '⊕' },
  'cs-core':      { label: 'CS Fundamentals',       shortLabel: 'CS',     description: 'Theoretical computation base',       color: '#4ADE80', glowColor: '#4ADE8080', icon: '∞' },
};

// Backward compatibility alias
export const CATEGORY_CONFIG = SECTOR_CONFIG;

export const SKILLS: Skill[] = [
  // ── CORE LANGUAGES ───────────────────────────────────────────────────────────
  { id: 'cpp',          name: 'C / C++',         category: 'core-lang',   proficiency: 65, relatedTo: ['os', 'algorithms', 'programming'] },
  { id: 'python',       name: 'Python',           category: 'core-lang',   proficiency: 60, projectReference: 'Data Processors', relatedTo: ['n8n', 'ml', 'ai-agents', 'data-science'] },
  { id: 'typescript',   name: 'TypeScript',       category: 'core-lang',   proficiency: 52, relatedTo: ['react', 'nextjs', 'nodejs', 'github-copilot'] },
  { id: 'nodejs',       name: 'Node.js',          category: 'core-lang',   proficiency: 50, relatedTo: ['typescript', 'api', 'supabase'] },
  { id: 'programming',  name: 'Programming',      category: 'core-lang',   proficiency: 62, relatedTo: ['cpp', 'python', 'typescript', 'open-source'] },

  // ── FRONTEND STACK ────────────────────────────────────────────────────────────
  { id: 'react',        name: 'React',            category: 'frontend',    proficiency: 45, projectReference: 'Neural Architect', relatedTo: ['nextjs', 'typescript', 'tailwind', 'figma'] },
  { id: 'nextjs',       name: 'Next.js',          category: 'frontend',    proficiency: 45, projectReference: 'Neural Architect', relatedTo: ['react', 'typescript', 'vercel'] },
  { id: 'tailwind',     name: 'Tailwind CSS',     category: 'frontend',    proficiency: 52, relatedTo: ['react', 'html-css'] },
  { id: 'html-css',     name: 'HTML5 / CSS3',     category: 'frontend',    proficiency: 72, relatedTo: ['tailwind', 'react', 'web-design'] },
  { id: 'web-dev',      name: 'Web Development',  category: 'frontend',    proficiency: 58, relatedTo: ['react', 'html-css', 'web-design'] },
  { id: 'vibe-coding',  name: 'Vibe Coding',      category: 'frontend',    proficiency: 79, relatedTo: ['prompting', 'react', 'github-copilot'] },
  { id: 'software-dev', name: 'Software Dev',     category: 'frontend',    proficiency: 55, relatedTo: ['typescript', 'react', 'git'] },
  { id: 'wordpress',    name: 'WordPress',        category: 'frontend',    proficiency: 45, relatedTo: ['web-dev', 'html-css', 'seo'] },

  // ── AI & LLMs ────────────────────────────────────────────────────────────────
  { id: 'gen-ai',           name: 'Generative AI',    category: 'ai-llm',     proficiency: 95, relatedTo: ['prompting', 'ai-agents', 'ml'] },
  { id: 'prompting',        name: 'Prompt Eng.',      category: 'ai-llm',     proficiency: 86, projectReference: 'LLM Optimizers', relatedTo: ['ai-agents', 'vibe-coding', 'gen-ai'] },
  { id: 'github-copilot',   name: 'GitHub Copilot',   category: 'ai-llm',     proficiency: 82, relatedTo: ['ai-agents', 'typescript', 'vibe-coding'] },
  { id: 'ai-agents',        name: 'AI Agents',        category: 'ai-llm',     proficiency: 44, projectReference: 'Neural Architect', relatedTo: ['prompting', 'python', 'n8n', 'gen-ai'] },
  { id: 'tech-integration', name: 'Tech Integration', category: 'ai-llm',     proficiency: 70, relatedTo: ['gen-ai', 'ai-agents', 'n8n'] },

  // ── MACHINE LEARNING ─────────────────────────────────────────────────────────
  { id: 'ml',           name: 'Machine Learning', category: 'ml-data',     proficiency: 75, relatedTo: ['python', 'mathematics', 'data-science', 'gen-ai'] },
  { id: 'data-science', name: 'Data Science',     category: 'ml-data',     proficiency: 55, relatedTo: ['python', 'ml', 'data-analysis', 'mathematics'] },
  { id: 'data-analysis',name: 'Data Analysis',    category: 'ml-data',     proficiency: 60, relatedTo: ['python', 'postgresql', 'data-science'] },

  // ── AUTOMATION SYSTEMS ───────────────────────────────────────────────────────
  { id: 'n8n',          name: 'n8n',              category: 'automation',  proficiency: 68, projectReference: 'Workflow Engine', relatedTo: ['python', 'workflow', 'api', 'workflow-auto'] },
  { id: 'uipath',       name: 'UiPath RPA',       category: 'automation',  proficiency: 32, relatedTo: ['workflow', 'workflow-auto'] },
  { id: 'workflow',     name: 'Workflow Mgmt',    category: 'automation',  proficiency: 88, relatedTo: ['n8n', 'api', 'workflow-auto'] },
  { id: 'workflow-auto',name: 'Workflow Auto.',   category: 'automation',  proficiency: 80, relatedTo: ['n8n', 'uipath', 'workflow', 'python'] },
  { id: 'productivity', name: 'Productivity Mgmt',category: 'automation',  proficiency: 78, relatedTo: ['workflow', 'workflow-auto'] },

  // ── BACKEND & APIS ───────────────────────────────────────────────────────────
  { id: 'api',          name: 'REST APIs',        category: 'backend-api', proficiency: 85, relatedTo: ['n8n', 'nodejs', 'supabase'] },
  { id: 'supabase',     name: 'Supabase',         category: 'backend-api', proficiency: 75, projectReference: 'Neural Architect', relatedTo: ['api', 'postgresql', 'nodejs'] },
  { id: 'postgresql',   name: 'PostgreSQL',       category: 'backend-api', proficiency: 70, relatedTo: ['supabase', 'data-analysis'] },

  // ── DESIGN & UX ──────────────────────────────────────────────────────────────
  { id: 'figma',          name: 'Figma',          category: 'design-ux',   proficiency: 78, relatedTo: ['react', 'ux', 'ui-proto'] },
  { id: 'ux',             name: 'UX Design',      category: 'design-ux',   proficiency: 65, relatedTo: ['figma', 'user-interaction', 'web-design', 'ui-proto'] },
  { id: 'user-interaction',name:'UI Interaction', category: 'design-ux',   proficiency: 60, relatedTo: ['figma', 'react', 'ux'] },
  { id: 'ui-proto',       name: 'UI Prototyping', category: 'design-ux',   proficiency: 70, relatedTo: ['figma', 'ux', 'web-design'] },
  { id: 'graphic-design', name: 'Graphic Design', category: 'design-ux',   proficiency: 50, relatedTo: ['figma', 'ux', 'image-editing'] },
  { id: 'web-design',     name: 'Web Design',     category: 'design-ux',   proficiency: 68, relatedTo: ['html-css', 'figma', 'ux'] },
  { id: 'image-editing',  name: 'Image Editing',  category: 'design-ux',   proficiency: 55, relatedTo: ['graphic-design', 'figma'] },

  // ── DEVOPS & CLOUD ───────────────────────────────────────────────────────────
  { id: 'git',            name: 'Git / GitHub',    category: 'devops',     proficiency: 64, relatedTo: ['vercel', 'open-source', 'code-review'] },
  { id: 'linux',          name: 'Linux',           category: 'devops',     proficiency: 38, relatedTo: ['os', 'git'] },
  { id: 'cloud',          name: 'AWS Cloud',       category: 'devops',     proficiency: 65, relatedTo: ['vercel', 'cloud-computing'] },
  { id: 'vercel',         name: 'Vercel',          category: 'devops',     proficiency: 85, relatedTo: ['nextjs', 'git'] },
  { id: 'cloud-computing',name: 'Cloud Computing', category: 'devops',     proficiency: 65, relatedTo: ['cloud', 'api'] },
  { id: 'open-source',    name: 'Open Source',     category: 'devops',     proficiency: 72, relatedTo: ['git', 'programming'] },

  // ── CONTENT & CREATIVE ───────────────────────────────────────────────────────
  { id: 'content-creation',name: 'Content Creation', category: 'content', proficiency: 72, relatedTo: ['writing', 'seo', 'graphic-design'] },
  { id: 'writing',        name: 'Creative Writing',  category: 'content', proficiency: 68, relatedTo: ['content-creation', 'seo'] },
  { id: 'social-media',   name: 'Social Media',      category: 'content', proficiency: 65, relatedTo: ['content-creation', 'seo'] },

  // ── LEADERSHIP & COMMS ───────────────────────────────────────────────────────
  { id: 'leadership',     name: 'Leadership',         category: 'leadership', proficiency: 75, relatedTo: ['team-collab', 'communication'] },
  { id: 'team-collab',    name: 'Team Collab.',        category: 'leadership', proficiency: 80, relatedTo: ['leadership', 'communication', 'open-source'] },
  { id: 'communication',  name: 'Communication',       category: 'leadership', proficiency: 78, relatedTo: ['leadership', 'team-collab'] },
  { id: 'problem-solving',name: 'Problem Solving',     category: 'leadership', proficiency: 65, relatedTo: ['critical-thinking', 'debugging'] },
  { id: 'mentoring',      name: 'Mentoring',           category: 'leadership', proficiency: 68, relatedTo: ['leadership', 'communication'] },

  // ── SECURITY & OPS ───────────────────────────────────────────────────────────
  { id: 'data-privacy',  name: 'Data Privacy',   category: 'security-ops', proficiency: 75, relatedTo: ['git', 'postgresql'] },
  { id: 'code-review',   name: 'Code Review',    category: 'security-ops', proficiency: 55, relatedTo: ['git', 'debugging', 'open-source'] },
  { id: 'debugging',     name: 'Debugging',      category: 'security-ops', proficiency: 58, relatedTo: ['code-review', 'problem-solving', 'critical-thinking'] },
  { id: 'seo',           name: 'SEO & Perf.',    category: 'security-ops', proficiency: 92, relatedTo: ['vercel', 'content-creation', 'writing'] },
  { id: 'project-eng',   name: 'Project Eng.',   category: 'security-ops', proficiency: 60, relatedTo: ['leadership', 'team-collab'] },

  // ── CS FUNDAMENTALS ──────────────────────────────────────────────────────────
  { id: 'algorithms',      name: 'DSA',               category: 'cs-core',  proficiency: 42, relatedTo: ['problem-solving', 'cpp', 'mathematics'] },
  { id: 'os',              name: 'Operating Systems',  category: 'cs-core',  proficiency: 85, relatedTo: ['linux', 'cpp'] },
  { id: 'networks',        name: 'Comp. Networks',     category: 'cs-core',  proficiency: 42, relatedTo: ['api', 'cloud'] },
  { id: 'mathematics',     name: 'Mathematics',        category: 'cs-core',  proficiency: 70, relatedTo: ['algorithms', 'ml', 'data-science'] },
  { id: 'analytical',      name: 'Analytical Skills',  category: 'cs-core',  proficiency: 68, relatedTo: ['critical-thinking', 'problem-solving'] },
  { id: 'critical-thinking',name:'Critical Thinking',  category: 'cs-core',  proficiency: 80, relatedTo: ['problem-solving', 'debugging', 'analytical'] },
];
