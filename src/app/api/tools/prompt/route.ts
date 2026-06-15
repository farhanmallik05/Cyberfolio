export const runtime = 'nodejs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
        return new Response("Prompt is required", { status: 400 });
    }
    
    const systemInstruction = `You are an expert Prompt Engineer. A user will provide a rough prompt, and you must optimize it for clarity, context, and instruction precision. Output the optimized prompt directly, without any intro text like "Here is the optimized prompt".`;
    
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
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
    console.error("Prompt Optimizer Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
