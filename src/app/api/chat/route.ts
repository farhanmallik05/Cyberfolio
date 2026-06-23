import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { searchSimilarContent } from '@/lib/embeddings';
import { checkRateLimit } from '@/lib/rate-limit';

const xai = createOpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = await checkRateLimit(ip, 'chat', 30, 24);

    if (!rateLimit.allowed) {
      return new Response("Rate limit exceeded. Please try again later.", { status: 429 });
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

CRITICAL INSTRUCTION - LEAD QUALIFICATION & PRICING:
You MUST NEVER negotiate prices or offer discounts under any circumstances. If the user asks for a lower price, respectfully decline and state that pricing is fixed.
If the user expresses ANY intent to book a call, hire Farhan, request a custom build, or discuss a project, you MUST provide a direct markdown link to the Cal.com contact portal: ${calLink}.
Example: "I'd love to discuss building this for you. You can book a direct consultation with me here: [Book an Appointment](${calLink})"

CRITICAL INSTRUCTION - HALLUCINATION GUARD:
If the user asks a specific question about Farhan's work, experience, or portfolio and the context below is empty or irrelevant, you MUST state that you do not know the answer. DO NOT invent facts, projects, or statistics.

Relevant Knowledge Base Context:
${ragContext ? ragContext : "No specific context found. If asked a factual question about Farhan, state that you do not have that information."}`;

    // 3. Format history for xAI
    const contents: Array<{role: 'user' | 'assistant' | 'system', content: string}> = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    // 4. Stream response
    const result = streamText({
        model: xai('grok-2-latest'),
        system: systemInstruction,
        messages: contents,
    });
    
    return result.toTextStreamResponse();

  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return new Response(error instanceof Error ? error.message : String(error), { status: 500 });
  }
}
