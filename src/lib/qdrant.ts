import { QdrantClient } from '@qdrant/js-client-rest';

const url = process.env.QDRANT_URL;
const apiKey = process.env.QDRANT_API_KEY;

export const qdrantClient = (url && apiKey) ? new QdrantClient({ url, apiKey }) : null;

// Ensure it's available only if env vars are present to avoid build errors.
if (!url || !apiKey) {
  console.warn('Qdrant environment variables are not set. Vector features will be disabled.');
}
