import { Role } from "@/context/RoleContext";

export const SECTION_WEIGHTS: Record<Role, string[]> = {
  all:        ['hero', 'about', 'skills', 'projects', 'services', 'testimonials', 'blog', 'contact'],
  frontend:   ['hero', 'projects', 'skills', 'about', 'services', 'testimonials', 'blog', 'contact'],
  automation: ['hero', 'services', 'projects', 'skills', 'about', 'testimonials', 'blog', 'contact'],
  'ai-llm':       ['hero', 'skills', 'projects', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'ml-data':      ['hero', 'skills', 'projects', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'backend-api':  ['hero', 'projects', 'skills', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'design-ux':    ['hero', 'projects', 'skills', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'devops':       ['hero', 'projects', 'skills', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'content':      ['hero', 'blog', 'projects', 'skills', 'about', 'services', 'testimonials', 'contact'],
  'leadership':   ['hero', 'about', 'projects', 'skills', 'services', 'testimonials', 'blog', 'contact'],
  'security-ops': ['hero', 'skills', 'projects', 'about', 'services', 'testimonials', 'blog', 'contact'],
  'cs-core':      ['hero', 'skills', 'about', 'projects', 'services', 'testimonials', 'blog', 'contact'],
  'core-lang':    ['hero', 'skills', 'projects', 'about', 'services', 'testimonials', 'blog', 'contact'],
};
