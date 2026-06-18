import { vi, describe, it, expect, beforeEach } from 'vitest';

// Set up env variables before module imports
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://mock.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-key';
  process.env.IP_SALT = 'test-salt';
});

// Setup mock functions using vi.hoisted so they are available inside vi.mock
const { mockGte, mockEq1, mockEq2, mockSelect, mockInsert } = vi.hoisted(() => {
  const mockGte = vi.fn();
  const mockEq2 = vi.fn();
  const mockEq1 = vi.fn();
  const mockSelect = vi.fn();
  const mockInsert = vi.fn();
  return { mockGte, mockEq1, mockEq2, mockSelect, mockInsert };
});

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: vi.fn(() => ({
      from: vi.fn(() => ({
        select: mockSelect,
        insert: mockInsert,
      })),
    })),
  };
});

// Import the module under test after env variables and mocks are hoisted
import { checkRateLimit } from '../rate-limit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default chaining mocks for: supabase.from().select().eq().eq().gte()
    mockSelect.mockReturnValue({
      eq: mockEq1.mockReturnValue({
        eq: mockEq2.mockReturnValue({
          gte: mockGte,
        }),
      }),
    });
  });

  it('allows request when count is below limit', async () => {
    mockGte.mockResolvedValue({ count: 2, error: null });
    mockInsert.mockResolvedValue({ error: null });

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(true);
    expect(result.count).toBe(3); // count (2) + 1
    expect(mockInsert).toHaveBeenCalled();
  });

  it('blocks request when count matches or exceeds limit', async () => {
    mockGte.mockResolvedValue({ count: 10, error: null });

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(false);
    expect(result.count).toBe(10);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('fails open (allows request) when database query errors', async () => {
    mockGte.mockResolvedValue({ count: null, error: new Error('DB Query Error') });

    const result = await checkRateLimit('127.0.0.1', 'test-tool', 10, 24);

    expect(result.allowed).toBe(true);
    expect(result.count).toBe(0);
  });
});
