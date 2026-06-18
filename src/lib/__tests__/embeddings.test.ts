import { vi, describe, it, expect, beforeEach } from 'vitest';

// Setup mock functions using vi.hoisted so they are hoisted alongside vi.mock
const { mockEmbedContent, mockGetCollections, mockCreateCollection, mockSearch } = vi.hoisted(() => {
  return {
    mockEmbedContent: vi.fn(),
    mockGetCollections: vi.fn(),
    mockCreateCollection: vi.fn(),
    mockSearch: vi.fn(),
  };
});

// Mock GoogleGenAI SDK as a class
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        embedContent: mockEmbedContent,
      };
    },
  };
});

// Mock Qdrant Client
vi.mock('../qdrant', () => {
  return {
    qdrantClient: {
      getCollections: mockGetCollections,
      createCollection: mockCreateCollection,
      search: mockSearch,
    },
  };
});

// Import the module under test after env variables and mocks are hoisted
import { generateEmbedding, initQdrantCollection, searchSimilarContent, COLLECTION_NAME } from '../embeddings';

describe('Embeddings and Vector DB Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'mock-gemini-key';
  });

  describe('generateEmbedding', () => {
    it('returns embeddings array when API succeeds', async () => {
      mockEmbedContent.mockResolvedValue({
        embeddings: [{ values: [0.1, 0.2, 0.3] }],
      });

      const result = await generateEmbedding('hello world');

      expect(result).toEqual([0.1, 0.2, 0.3]);
      expect(mockEmbedContent).toHaveBeenCalledWith({
        model: 'gemini-embedding-2',
        contents: 'hello world',
      });
    });

    it('returns empty array when API throws error', async () => {
      mockEmbedContent.mockRejectedValue(new Error('Embedding API Error'));

      const result = await generateEmbedding('hello world');

      expect(result).toEqual([]);
    });
  });

  describe('initQdrantCollection', () => {
    it('creates collection if it does not exist', async () => {
      mockGetCollections.mockResolvedValue({
        collections: [{ name: 'some_other_collection' }],
      });

      await initQdrantCollection();

      expect(mockCreateCollection).toHaveBeenCalledWith(COLLECTION_NAME, {
        vectors: {
          size: 768,
          distance: 'Cosine',
        },
      });
    });

    it('skips creation if collection already exists', async () => {
      mockGetCollections.mockResolvedValue({
        collections: [{ name: COLLECTION_NAME }],
      });

      await initQdrantCollection();

      expect(mockCreateCollection).not.toHaveBeenCalled();
    });
  });

  describe('searchSimilarContent', () => {
    it('generates embedding and searches collection', async () => {
      // Mock embedding API
      mockEmbedContent.mockResolvedValue({
        embeddings: [{ values: [0.1, 0.2, 0.3] }],
      });

      // Mock Qdrant search
      mockSearch.mockResolvedValue([
        { id: '1', score: 0.9, payload: { text: 'mock text' } },
      ]);

      const result = await searchSimilarContent('query text', 2);

      expect(result).toEqual([
        { id: '1', score: 0.9, payload: { text: 'mock text' } },
      ]);
      expect(mockSearch).toHaveBeenCalledWith(COLLECTION_NAME, {
        vector: [0.1, 0.2, 0.3],
        limit: 2,
        with_payload: true,
      });
    });
  });
});
