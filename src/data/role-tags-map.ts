import { Role } from "@/context/RoleContext";

export const ROLE_TAG_MAP: Record<Role, string[]> = {
  all: [],
  frontend: ['react', 'nextjs', 'typescript', 'tailwind', 'framer', 'html', 'css', 'ui', 'gsap', 'figma', 'ux', 'web-development'],
  automation: ['n8n', 'python', 'zapier', 'bash', 'cron', 'webhook', 'api', 'workflow', 'selenium', 'puppeteer', 'rpa', 'operations'],
  ai: ['claude', 'openai', 'langchain', 'rag', 'supabase', 'pgvector', 'huggingface', 'pytorch', 'ollama', 'machine-learning', 'agents', 'prompt-engineering'],
};
