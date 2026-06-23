# Cyberfolio Domain

The interactive portfolio and AI assistant platform showcasing projects, blog posts, services, and live availability.

## Language

**RAG Pipeline**:
A Retrieval-Augmented Generation system that fetches relevant information from the portfolio database to answer user queries accurately.
_Avoid_: Search engine, database query

**LLM Provider**:
The artificial intelligence platform that generates conversational responses for the chat interface.
_Avoid_: AI engine, chat model

**Knowledge Base**:
The collection of indexed portfolio content including projects, blog posts, services, and about info.
_Avoid_: Data pool, content source

**Vector Database**:
The storage service containing high-dimensional embeddings of knowledge base content to enable semantic search.
_Avoid_: SQL store, index

**Rate Limiter**:
The component that restricts the frequency of incoming API requests per client identifier to manage costs and prevent abuse, prioritizing Upstash Redis with a fallback to the database.
_Avoid_: Request filter, request blocker

## Chat Boundaries & Rules

- **Strict Scope Guard**: The AI Assistant must only answer questions directly related to Farhan Mallik, his projects, skills, services, bio, uses/tools, and certificates. Any general-purpose or off-topic requests (e.g., writing unrelated code, answering general trivia) must be politely declined, redirecting the user back to Farhan's services or portfolio.

