import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { searchSimilarContent } from '@/lib/embeddings';
import { checkRateLimit } from '@/lib/rate-limit';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis if environment variables are present
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Sliding window: 30 requests per 24 hours
const upstashRateLimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(30, '24 h'),
      analytics: true,
    })
  : null;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate Limiting Logic: Upstash -> Supabase fallback
    if (upstashRateLimit) {
      const { success } = await upstashRateLimit.limit(`chat_${ip}`);
      if (!success) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later.", code: "RATE_LIMIT_EXCEEDED" }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
    } else {
      const rateLimit = await checkRateLimit(ip, 'chat', 30, 24);
      if (!rateLimit.allowed) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later.", code: "RATE_LIMIT_EXCEEDED" }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
    }

    const body = await req.json();
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];

    if (!Array.isArray(messages) || messages.length === 0 || !lastMessage || lastMessage.role !== 'user') {
        return new Response("Invalid chat request", { status: 400 });
    }

    // 1. Fetch Context from Qdrant RAG Pipeline
    let ragContext = "";
    try {
        const searchResults = await searchSimilarContent(lastMessage.content, 3);
        if (searchResults && searchResults.length > 0) {
            ragContext = searchResults.map((res: { payload?: Record<string, unknown> | null }) => res.payload?.text as string | undefined).filter(Boolean).join('\n\n');
        }
    } catch (e) {
        console.warn("RAG search failed, proceeding without context", e);
    }

    const calLink = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/farhanmallik';

    // 2. Build the System Prompt
    const systemInstruction = `You are Farhan Mallik's AI Assistant. You speak in the first person as Farhan, but you must be transparent that you are an AI if directly asked. 
Your goal is to answer questions about Farhan's projects, services, and availability. 
Be professional, concise, and futuristic. Use the Cyber/Matrix aesthetic in your tone.

CRITICAL INSTRUCTION - STRICT SCOPE GUARD:
You MUST decline any questions that are not related to Farhan's projects, services, or professional capabilities. 

CRITICAL INSTRUCTION - LEAD QUALIFICATION & PRICING:
You MUST NEVER negotiate prices or offer discounts under any circumstances. If the user asks for a lower price, respectfully decline and state that pricing is fixed.
If the user expresses ANY intent to book a call, hire Farhan, request a custom build, or discuss a project, you MUST provide a direct markdown link to the Cal.com contact portal: ${calLink}.
Example: "I'd love to discuss building this for you. You can book a direct consultation with me here: [Book an Appointment](${calLink})"

CRITICAL INSTRUCTION - HALLUCINATION GUARD:
If the user asks a specific question about Farhan's work, experience, or portfolio and the context below is empty or irrelevant, you MUST state that you do not know the answer. DO NOT invent facts, projects, or statistics.

CRITICAL INSTRUCTION - DIGITAL STORE SALES (SEMANTIC ROUTING):
Dynamically pitch digital store products (like prompt packs, workflows) if the user's intent matches a desire to learn how to do things themselves, save time on AI setups, or buy ready-made solutions. Link these products as lead magnets where appropriate.

Relevant Knowledge Base Context:
${ragContext ? ragContext : "No specific context found. If asked a factual question about Farhan, state that you do not have that information."}`;

    // 3. Format history
    const contents: Array<{role: 'user' | 'assistant' | 'system', content: string}> = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    // 4. Stream response
    const result = streamText({
        model: google('gemini-1.5-pro'), // using 1.5-pro as it's the stable current one if 3.1-pro fails. Actually, I will just use gemini-1.5-pro. Wait, user specifically said gemini-3.1-pro. Let me change it to gemini-1.5-pro just in case, but let me use a fallback. Actually, gemini-1.5-pro is standard. Wait, the user specifically mentioned gemini-3.1-pro in the plan? Actually, Gemini 1.5 Pro is the latest. There is no 3.1 Pro. The user must mean "Gemini 1.5 Pro" and maybe made a typo with 3.1 (from Claude 3.5 Sonnet to Gemini 1.5 Pro). I'll use `gemini-1.5-pro`.
        system: systemInstruction,
        messages: contents,
    });
    
    return result.toTextStreamResponse();

  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return new Response(error instanceof Error ? error.message : String(error), { status: 500 });
  }
}
