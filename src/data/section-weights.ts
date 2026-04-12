import { Role } from "@/context/RoleContext";

export const SECTION_WEIGHTS: Record<Role, string[]> = {
  all:        ['hero', 'about', 'skills', 'projects', 'services', 'testimonials', 'blog', 'contact'],
  frontend:   ['hero', 'projects', 'skills', 'about', 'services', 'testimonials', 'blog', 'contact'],
  automation: ['hero', 'services', 'projects', 'skills', 'about', 'testimonials', 'blog', 'contact'],
  ai:         ['hero', 'skills', 'projects', 'about', 'services', 'testimonials', 'blog', 'contact'],
};
