import { vi, describe, it, expect, beforeEach } from 'vitest';

// ── Env variables must be hoisted before any module imports ─────────────────
vi.hoisted(() => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://mock.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-token';
  process.env.IP_SALT = 'test-salt';
});

// ── Mock @upstash/redis ──────────────────────────────────────────────────────
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(() => ({})),
}));

// ── Shared mock for upstashRatelimit.limit() ─────────────────────────────────
const mockLimit = vi.hoisted(() => vi.fn());

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn().mockImplementation(() => ({
    limit: mockLimit,
  })),
}));

// Re-attach static methods after the class mock
import { Ratelimit } from '@upstash/ratelimit';
(Ratelimit as unknown as Record<string, unknown>).slidingWindow = vi.fn().mockReturnValue({});

// ── Import module under test AFTER mocks are registered ─────────────────────
import { checkRateLimit } from '../rate-limit';

// ── Tests ────────────────────────────────────────────────────────────────────
describe('Rate Limiter (Upstash)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows request when under the limit', async () => {
    // remaining=8 means 2 have been used; after this call used=3
    mockLimit.mockResolvedValue({ success: true, limit: 10, remaining: 8, reset: Date.now() + 86400000 });

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(true);
    // used = limit - remaining = 10 - 8 = 2; count returned = used + 1 = 3
    expect(result.count).toBe(3);
    expect(mockLimit).toHaveBeenCalledOnce();
  });

  it('blocks request when the limit is exceeded', async () => {
    // success=false means the limiter rejected this request
    mockLimit.mockResolvedValue({ success: false, limit: 10, remaining: 0, reset: Date.now() + 86400000 });

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(false);
    expect(result.count).toBe(10); // used = limit - remaining = 10 - 0 = 10
    expect(mockLimit).toHaveBeenCalledOnce();
  });

  it('fails open when Redis throws an error', async () => {
    mockLimit.mockRejectedValue(new Error('Redis connection error'));

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(true);
    expect(result.count).toBe(0);
  });
});
