# 1. Use Google Gemini API for LLM Inference and Embeddings

We decided to use the Google Gemini API (specifically `gemini-2.0-flash` for chat inference and `gemini-embedding-2` for generating vector embeddings) as our single canonical LLM and embedding provider.

This consolidates our AI dependencies, simplifies API key management, and aligns with the project's setup of `@google/genai` for RAG.
