import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations.
 * Handles fallbacks for static generation (SSG) where cookies() is unavailable.
 */
export async function createClient(useServiceRole = false) {
  let cookieStore: Awaited<ReturnType<typeof cookies>> | undefined;
  try {
    cookieStore = await cookies()
  } catch {
    // cookieStore remains undefined during static generation (builld time)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = useServiceRole 
    ? process.env.SUPABASE_SERVICE_ROLE_KEY 
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `Supabase environment variables are missing. Creating restricted client.`
      )
    }
    return createServerClient(
      supabaseUrl || 'https://missing.supabase.co',
      supabaseKey || 'missing-key',
      {
        cookies: {
          getAll() { return [] },
          setAll() {},
        },
      }
    )
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore ? cookieStore.getAll() : []
      },
      setAll(cookiesToSet) {
        if (!cookieStore) return
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Handle cases where cookies cannot be set (e.g., during render)
        }
      },
    },
  })
}
