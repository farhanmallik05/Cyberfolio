import { GoogleGenAI } from '@google/genai';
import { searchSimilarContent } from '@/lib/embeddings';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
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
            ragContext = searchResults.map((res: any) => res.payload?.text).join('\n\n');
        }
    } catch (e) {
        console.warn("RAG search failed, proceeding without context", e);
    }

    // 2. Build the System Prompt
    const systemInstruction = `You are Farhan Mallik's AI Assistant. You speak in the first person as Farhan, but you must be transparent that you are an AI if directly asked. 
Your goal is to answer questions about Farhan's projects, services, and availability. 
Be professional, concise, and futuristic. Use the Cyber/Matrix aesthetic in your tone.

Relevant Knowledge Base Context:
${ragContext ? ragContext : "No specific context found. Rely on general knowledge of Farhan Mallik."}`;

    // 3. Format history for Gemini
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // 4. Stream response
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents,
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
    console.error("Chat API Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
