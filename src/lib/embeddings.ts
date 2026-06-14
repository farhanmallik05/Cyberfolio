import { GoogleGenAI } from '@google/genai';
import { qdrantClient } from './qdrant';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const COLLECTION_NAME = 'portfolio_content';

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: text,
    });
    return response.embeddings?.[0]?.values || [];
  } catch (error) {
    console.error("Error generating embedding:", error);
    return [];
  }
}

export async function initQdrantCollection() {
  if (!qdrantClient) return;
  try {
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.find(c => c.name === COLLECTION_NAME);
    if (!exists) {
      await qdrantClient.createCollection(COLLECTION_NAME, {
        vectors: {
          size: 768, // text-embedding-004 size
          distance: 'Cosine'
        }
      });
      console.log(`Collection ${COLLECTION_NAME} created.`);
    }
  } catch (e) {
    console.error("Qdrant init error:", e);
  }
}

export async function searchSimilarContent(query: string, limit: number = 5) {
  if (!qdrantClient) return [];
  const queryVector = await generateEmbedding(query);
  if (!queryVector.length) return [];
  
  const searchResults = await qdrantClient.search(COLLECTION_NAME, {
    vector: queryVector,
    limit,
    with_payload: true,
  });
  
  return searchResults;
}
