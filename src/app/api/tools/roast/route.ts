export const runtime = 'edge';
import { GoogleGenAI } from '@google/genai';
import { scrapeUrl } from '@/lib/scraper';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
    
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: `Here is the text content of my portfolio. Roast it:\n\n${contentToRoast}`,
        config: {
            systemInstruction: systemInstruction,
            // safety settings might need to be adjusted for 'harsh' language if blocked
        }
    });
    
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
          }
        }
        controller.close();
      }
    });
    
    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' }});
  } catch (error: any) {
    console.error("Portfolio Roaster Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
