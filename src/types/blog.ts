export type Category = 
  | "Architecture" 
  | "Automation" 
  | "AI" 
  | "Development" 
  | "Career" 
  | "Security";

export interface BlogMeta {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: Category;
  tags: string[];
  image?: string;
  readTime?: string;
  wordCount?: number;
  featured?: boolean;
  views?: number;
  likes?: number;
}

export interface BlogPost extends BlogMeta {
  slug: string;
  content: string; // Raw MDX content
}

export interface BlogSeries {
  title: string;
  posts: string[]; // Slugs
}
