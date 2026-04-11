import { Role } from "@/context/RoleContext";
import { ROLE_TAG_MAP } from "@/data/role-tags-map";

/**
 * Calculates a relevance score for a project based on its tags/topics and the active role.
 * @param topics Array of technology tags (usually from GitHub)
 * @param role The currently active professional role
 * @returns A number representing the match score
 */
export function getProjectRoleScore(topics: string[], role: Role): number {
  if (role === 'all' || !topics) return 0;
  
  const roleTags = ROLE_TAG_MAP[role];
  if (!roleTags) return 0;

  // Count how many project topics match the role's required tags
  return topics.filter(t => 
    roleTags.some(tag => t.toLowerCase().includes(tag.toLowerCase()))
  ).length;
}
