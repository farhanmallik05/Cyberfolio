# 2. Use Qdrant Vector Database for RAG Storage

We decided to lock in Qdrant Vector Database as the sole vector database for storing and querying portfolio content embeddings.

This decision respects the implementation work completed in Phase 15.5.1, avoiding code churn and maintaining separation between our relational Postgres storage (Supabase) and our semantic search engine (Qdrant). The plan to use Supabase pgvector has been deprecated.
