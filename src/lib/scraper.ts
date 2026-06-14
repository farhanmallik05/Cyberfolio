import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
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
