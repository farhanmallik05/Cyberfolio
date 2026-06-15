export const runtime = 'nodejs';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const xai = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
        return new Response("Prompt is required", { status: 400 });
    }
    
    const systemInstruction = `You are an expert Prompt Engineer. A user will provide a rough prompt, and you must optimize it for clarity, context, and instruction precision. Output the optimized prompt directly, without any intro text like "Here is the optimized prompt".`;
    
    const result = streamText({
        model: xai('grok-beta'),
        system: systemInstruction,
        prompt: prompt,
    });
    
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Prompt Optimizer Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
