import * as cheerio from 'cheerio';
import { isIP } from 'net';
import { promises as dns } from 'dns';

// Helper to check if an IP is private/local
function isPrivateIP(ip: string): boolean {
  if (!isIP(ip)) return false;

  // IPv4 private/local ranges
  if (ip.startsWith('127.')) return true; // localhost
  if (ip === '0.0.0.0') return true; // Wildcard/unspecified resolving to localhost
  if (ip.startsWith('10.')) return true; // Class A private
  if (ip.startsWith('192.168.')) return true; // Class C private
  if (ip.startsWith('169.254.')) return true; // Link-local

  // Class B private (172.16.0.0 - 172.31.255.255)
  if (ip.startsWith('172.')) {
    const secondOctet = parseInt(ip.split('.')[1], 10);
    if (secondOctet >= 16 && secondOctet <= 31) return true;
  }

  // IPv6 localhost and private ranges
  if (ip === '::1' || ip === '::') return true;
  const ipLower = ip.toLowerCase();
  // Unique Local Addresses (ULA): fc00::/7 (covers fc... and fd...)
  if (ipLower.startsWith('fc') || ipLower.startsWith('fd')) return true;
  if (ipLower.startsWith('fe80:')) return true; // Link-local

  return false;
}

// Validation function that throws if invalid
async function validateUrl(targetUrl: string): Promise<URL> {
    const parsedUrl = new URL(targetUrl);

    // 1. Enforce Protocol (HTTP/HTTPS only)
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error(`Invalid protocol ${parsedUrl.protocol}`);
    }

    // 2. Block localhost and specific local hostnames
    if (['localhost', '127.0.0.1', '0.0.0.0', '[::1]', '[::]'].includes(parsedUrl.hostname.toLowerCase())) {
        throw new Error(`Local hostname ${parsedUrl.hostname}`);
    }

    // 3. Resolve DNS to ensure the hostname doesn't resolve to a private IP
    try {
        // If the hostname is already an IP address, we just check it
        let ipToCheck = parsedUrl.hostname;

        // Remove brackets for IPv6
        if (ipToCheck.startsWith('[') && ipToCheck.endsWith(']')) {
            ipToCheck = ipToCheck.slice(1, -1);
        }

        if (!isIP(ipToCheck)) {
            const lookup = await dns.lookup(parsedUrl.hostname);
            ipToCheck = lookup.address;
        }

        if (isPrivateIP(ipToCheck)) {
            throw new Error(`Hostname resolves to private IP ${ipToCheck}`);
        }
    } catch (e: any) {
        throw new Error(`DNS resolution/check failed: ${e.message}`, { cause: e });
    }

    return parsedUrl;
}

export async function scrapeUrl(url: string, redirectCount = 0): Promise<string | null> {
  if (redirectCount > 5) {
      console.warn(`Scraper blocked: Too many redirects`);
      return null;
  }

  try {
    const parsedUrl = await validateUrl(url);

    const res = await fetch(parsedUrl.href, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: AbortSignal.timeout(5000), // 5 second timeout
        redirect: 'manual'
    });

    if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
        const location = res.headers.get('location')!;
        // Handle relative redirects
        const nextUrl = new URL(location, parsedUrl.href).href;
        return scrapeUrl(nextUrl, redirectCount + 1);
    }
    
    if (!res.ok) {
      console.warn(`Scraper failed: ${res.statusText}`);
      return null;
    }
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Remove scripts and styles and non-content elements
    $('script, style, noscript, iframe, img, svg, video, audio').remove();
    
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    
    if (text.length < 50) {
      console.warn('Scraper detected SPA with insufficient content.');
      return null; // Signals client to show manual paste fallback
    }
    return text;
  } catch (e) {
    console.error('Scraper error:', e);
    return null; 
  }
}
