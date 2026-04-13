export function debugSupabaseEnv() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ LOADED' : '❌ MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ LOADED' : '❌ MISSING',
    SUPABASE_URL: process.env.SUPABASE_URL ? '✅ LOADED' : '❌ MISSING',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? '✅ LOADED' : '❌ MISSING',
  }

  console.table(envVars)

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('CRITICAL: Supabase client will fail to initialize correctly.')
  }
}
