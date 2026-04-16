import { Role } from "@/context/RoleContext";

export const ROLE_TAG_MAP: Record<Role, string[]> = {
  all: [],
  frontend: ['react', 'nextjs', 'typescript', 'tailwind', 'framer', 'html', 'css', 'ui', 'gsap', 'figma', 'ux', 'web-development'],
  automation: ['n8n', 'python', 'zapier', 'bash', 'cron', 'webhook', 'api', 'workflow', 'selenium', 'puppeteer', 'rpa', 'operations'],
  'ai-llm': ['claude', 'openai', 'langchain', 'rag', 'supabase', 'pgvector', 'huggingface', 'pytorch', 'ollama', 'machine-learning', 'agents', 'prompt-engineering'],
  'ml-data': ['python', 'mathematics', 'data-science', 'probability', 'statistics', 'tensor-flow'],
  'backend-api': ['nodejs', 'postgresql', 'supabase', 'api', 'express', 'graphql'],
  'design-ux': ['figma', 'ux', 'web-design', 'prototyping', 'adobe-suite'],
  'devops': ['git', 'vercel', 'docker', 'ci-cd', 'cloud-computing', 'linux'],
  'content': ['writing', 'content-creation', 'seo', 'blogging'],
  'leadership': ['leadership', 'team-collab', 'communication', 'problem-solving', 'mentoring'],
  'security-ops': ['data-privacy', 'code-review', 'debugging', 'seo', 'hardening'],
  'cs-core': ['algorithms', 'operating-systems', 'networks', 'mathematics', 'cs-fundamentals'],
  'core-lang': ['cpp', 'python', 'typescript', 'nodejs', 'programming'],
};
