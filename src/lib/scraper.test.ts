import { describe, it, expect, vi } from 'vitest';
import { scrapeUrl } from './scraper';

// Mock console.warn to keep output clean during tests
vi.spyOn(console, 'warn').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('scrapeUrl SSRF protection', () => {
  it('should block local ip', async () => {
    const res = await scrapeUrl('http://127.0.0.1:3000');
    expect(res).toBeNull();
  });

  it('should block localhost', async () => {
    const res = await scrapeUrl('http://localhost:3000');
    expect(res).toBeNull();
  });

  it('should block non-http/https protocols', async () => {
    const res = await scrapeUrl('file:///etc/passwd');
    expect(res).toBeNull();
  });

  it('should block link-local (AWS metadata)', async () => {
    const res = await scrapeUrl('http://169.254.169.254/latest/meta-data/');
    expect(res).toBeNull();
  });

  it('should block 0.0.0.0', async () => {
    const res = await scrapeUrl('http://0.0.0.0:3000');
    expect(res).toBeNull();
  });

  it('should block IPv6 localhost', async () => {
    const res = await scrapeUrl('http://[::1]:3000');
    expect(res).toBeNull();
    const res2 = await scrapeUrl('http://[::]:3000');
    expect(res2).toBeNull();
  });

  it('should handle redirects securely', async () => {
    // We can't easily test a real malicious redirect without standing up a local server,
    // but we can mock fetch to simulate one.
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockImplementation(async (url: string | URL | Request, init?: RequestInit) => {
        const urlStr = url.toString();
        if (urlStr === 'http://malicious-redirect.com/') {
            return new Response('', {
                status: 302,
                headers: { 'Location': 'http://127.0.0.1:3000' }
            });
        }
        return originalFetch(url, init);
    });

    // We also need to mock dns.lookup for malicious-redirect.com so it passes the initial check
    const dnsMock = vi.mocked(await import('dns'));
    vi.spyOn(dnsMock.promises, 'lookup').mockImplementation(async (hostname: string) => {
        if (hostname === 'malicious-redirect.com') {
            return { address: '93.184.216.34', family: 4 } as any;
        }
        return { address: '127.0.0.1', family: 4 } as any;
    });

    const res = await scrapeUrl('http://malicious-redirect.com');
    expect(res).toBeNull(); // Should fail when resolving the redirect location

    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });
});
