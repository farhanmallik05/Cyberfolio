export const runtime = 'nodejs';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { scrapeUrl } from '@/lib/scraper';

const xai = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(req: Request) {
  try {
    const { url, manualContent } = await req.json();
    
    let contentToRoast = manualContent;
    
    if (url && !manualContent) {
        const scraped = await scrapeUrl(url);
        if (!scraped) {
             return new Response(JSON.stringify({ error: "scraper_failed" }), { 
                status: 422,
                headers: { 'Content-Type': 'application/json' }
             });
        }
        contentToRoast = scraped;
    }
    
    if (!contentToRoast) {
        return new Response("Content is required", { status: 400 });
    }
    
    const systemInstruction = `You are an aggressively honest but highly experienced design and code critic. Your job is to 'roast' the user's portfolio. You should point out cliches, bad UX patterns, poor copywriting, and generic design choices. Be harsh, but make sure the feedback is actually constructive so they know how to fix it. Keep your roast under 300 words.`;
    
    const result = streamText({
        model: xai('grok-beta'),
        system: systemInstruction,
        prompt: `Here is the text content of my portfolio. Roast it:\n\n${contentToRoast}`,
    });
    
    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("Portfolio Roaster Error:", error);
    return new Response(error instanceof Error ? error.message : "Unknown error", { status: 500 });
  }
}
