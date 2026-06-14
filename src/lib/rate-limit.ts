import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use Service Role to bypass RLS policies for usage logging
const supabase = (supabaseUrl && serviceKey)
  ? createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    })
  : null;

/**
 * Computes SHA-256 hash of an IP address using Web Crypto API.
 * Securely hashes IP addresses to protect privacy (GDPR compliant).
 */
async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_SALT || 'neural_architect_salt_9982';
  const msgBuffer = new TextEncoder().encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface RateLimitResult {
  allowed: boolean;
  count: number;
}

/**
 * Checks if a user has exceeded rate limits for a specific tool.
 * Logs the request if it is allowed.
 * 
 * @param ip The client's IP address.
 * @param toolName The name of the API tool (e.g. 'chat', 'portfolio-roaster').
 * @param limit The request limit (default 10).
 * @param windowHours The rolling time window in hours (default 24).
 */
export async function checkRateLimit(
  ip: string,
  toolName: string,
  limit = 10,
  windowHours = 24
): Promise<RateLimitResult> {
  if (!supabase) {
    console.warn('Supabase not configured for rate limiting. Bypassing check.');
    return { allowed: true, count: 0 };
  }

  try {
    const ipHash = await hashIp(ip);
    
    // Calculate timeframe boundary
    const timeLimit = new Date();
    timeLimit.setHours(timeLimit.getHours() - windowHours);

    // Query request logs from the database
    const { count, error } = await supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .eq('tool_name', toolName)
      .gte('created_at', timeLimit.toISOString());

    if (error) {
      console.error('Failed to query rate limits:', error);
      return { allowed: true, count: 0 }; // Fail open to not block legitimate users on db issues
    }

    const currentCount = count || 0;
    if (currentCount >= limit) {
      return { allowed: false, count: currentCount };
    }

    // Log the current API access
    const { error: insertError } = await supabase
      .from('api_usage_logs')
      .insert([
        {
          ip_hash: ipHash,
          tool_name: toolName
        }
      ]);

    if (insertError) {
      console.error('Failed to log API usage:', insertError);
    }

    return { allowed: true, count: currentCount + 1 };
  } catch (err) {
    console.error('Rate limiter exception:', err);
    return { allowed: true, count: 0 };
  }
}
