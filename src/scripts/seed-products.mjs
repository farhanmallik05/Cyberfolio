/* eslint-disable */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function seed() {
  console.log('Checking if products exist in database...');
  const { data: existing, error: fetchError } = await supabase
    .from('products')
    .select('id')
    .limit(1);

  if (fetchError) {
    console.error('Error fetching products:', fetchError.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log('Products already exist in database. Skipping seed.');
    return;
  }

  console.log('Seeding mock product...');
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        slug: 'neural-architect-template',
        name: 'Neural Architect Template',
        description: 'A premium cinematic developer portfolio template built with Next.js 16, GSAP, and Three.js.',
        price: 4900, // $49.00
        currency: 'USD',
        file_path: 'templates/neural-architect.zip',
        is_free: false,
        type: 'Template',
        color_theme: 'text-[#00F5FF]',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      }
    ])
    .select();

  if (error) {
    console.error('Error seeding product:', error.message);
    process.exit(1);
  }

  console.log('Successfully seeded mock product:', data);
}

seed();
