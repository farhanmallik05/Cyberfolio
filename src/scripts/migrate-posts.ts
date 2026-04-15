import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BLOG_PATH = path.join(process.cwd(), 'content/blog_archive');

async function migrate() {
  if (!fs.existsSync(BLOG_PATH)) {
    console.log('No blog content found at', BLOG_PATH);
    return;
  }

  const files = fs.readdirSync(BLOG_PATH).filter((f) => /\.mdx?$/.test(f));
  console.log(`Found ${files.length} posts to migrate.`);

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const fullPath = path.join(BLOG_PATH, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    console.log(`Migrating: ${slug}...`);

    const { error } = await supabase
      .from('blog_posts')
      .upsert({
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content, // raw MDX
        author: data.author || 'Farhan Mallik',
        category: data.category || 'Development',
        tags: data.tags || [],
        image: data.image || '',
        featured: data.featured || false,
        is_published: true, // migrating existing posts as published
        created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      }, { onConflict: 'slug' });

    if (error) {
      console.error(`Error migrating ${slug}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${slug}`);
    }
  }

  console.log('Migration complete.');
}

migrate();
