import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { QdrantClient } from 'npm:@qdrant/js-client-rest';

console.log('Sync Qdrant Edge Function initializing...');

const qdrantUrl = Deno.env.get('QDRANT_URL');
const qdrantApiKey = Deno.env.get('QDRANT_API_KEY');

const qdrant = (qdrantUrl && qdrantApiKey) ? new QdrantClient({
  url: qdrantUrl,
  apiKey: qdrantApiKey,
}) : null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
serve(async (req) => {
  try {
    if (!qdrant) {
      throw new Error('QDRANT_URL or QDRANT_API_KEY is not set in environment variables');
    }

    // Perform a health check by fetching collections
    const collections = await qdrant.getCollections();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully connected to Qdrant Vector DB',
        collections,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in sync-qdrant function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
