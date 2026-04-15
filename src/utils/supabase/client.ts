import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    const missing = []
    if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
    if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')

    console.warn(
      `Supabase environment variables [${missing.join(', ')}] are missing. Database features will be disabled.`
    )
    // Return a proxy or a dummy client that doesn't crash on initialization
    // but will fail gracefully on method calls
    return createBrowserClient(
      supabaseUrl || 'https://missing-url.supabase.co',
      supabaseAnonKey || 'missing-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
