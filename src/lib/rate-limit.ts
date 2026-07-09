import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Upstash Redis client — HTTP-based, edge-runtime compatible.
 * Falls back gracefully when env vars are absent (local dev without Redis).
 */
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

/**
 * Cache of Ratelimit instances keyed by `{toolName}:{limit}:{windowHours}`.
 * Avoids re-constructing the limiter on every request.
 */
const limiterCache = new Map<string, Ratelimit>();

/**
 * Returns a Ratelimit instance for the given configuration.
 * Uses a module-level Map so each unique config is created only once.
 */
function getLimiter(limit: number, windowHours: number): Ratelimit | null {
  if (!redis) return null;

  const cacheKey = `${limit}:${windowHours}h`;
  if (!limiterCache.has(cacheKey)) {
    limiterCache.set(
      cacheKey,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowHours} h`),
        analytics: false, // keeps edge payload minimal
        prefix: 'ratelimit',
      })
    );
  }
  return limiterCache.get(cacheKey)!;
}

/**
 * Computes SHA-256 hash of an IP address using Web Crypto API.
 * Securely hashes IP addresses to protect privacy (GDPR compliant).
 */
async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_SALT || 'neural_architect_salt_9982';
  const msgBuffer = new TextEncoder().encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface RateLimitResult {
  allowed: boolean;
  count: number;
}

/**
 * Checks if a user has exceeded rate limits for a specific tool using
 * Upstash Redis sliding windows. This is edge-runtime compatible and
 * requires zero database round-trips via Postgres.
 *
 * @param ip        The client's IP address.
 * @param toolName  The name of the API tool (e.g. 'chat', 'contact').
 * @param limit     The request limit within the window (default 10).
 * @param windowHours The rolling time window in hours (default 24).
 */
export async function checkRateLimit(
  ip: string,
  toolName: string,
  limit = 10,
  windowHours = 24
): Promise<RateLimitResult> {
  const limiter = getLimiter(limit, windowHours);

  if (!limiter) {
    // Fail-open: no Redis configured (e.g. local dev without Upstash keys).
    console.warn(
      '[rate-limit] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set. ' +
        'Rate limiting is disabled. Set these env vars for production.'
    );
    return { allowed: true, count: 0 };
  }

  try {
    const ipHash = await hashIp(ip);
    // Key format: "{toolName}_{hashedIp}" — namespaced per tool
    const identifier = `${toolName}_${ipHash}`;

    const { success, limit: configuredLimit, remaining, reset } = await limiter.limit(identifier);

    // `remaining` counts down from limit; infer current usage
    const used = configuredLimit - remaining;

    if (!success) {
      console.info(
        `[rate-limit] BLOCKED tool=${toolName} used=${used}/${configuredLimit} reset=${new Date(reset).toISOString()}`
      );
      return { allowed: false, count: used };
    }

    return { allowed: true, count: used + 1 };
  } catch (err) {
    // Fail-open on Redis errors to avoid blocking legitimate users
    console.error('[rate-limit] Redis error, failing open:', err);
    return { allowed: true, count: 0 };
  }
}
