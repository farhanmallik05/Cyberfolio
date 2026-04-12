# SEED-014: Podcast Version of Blog Posts

## Concept
Every blog post gets an auto-generated audio version using text-to-speech AI. "Listen to this post" button at top of each blog post. Linked in newsletter emails. Builds accessibility and a new content format.

## Target Milestone: M6 (Phase 21)
## Trigger: When blog has 5+ published posts

## Implementation
- ElevenLabs or OpenAI TTS API
- Audio files stored in Supabase Storage
- Generated on post publish (webhook or admin button)
- Player: minimal HTML5 audio with neon styling
- Also delivered as podcast RSS feed at /podcast.xml for Spotify/Apple Podcasts

## Theme Notes
Audio player uses existing neon glass style. Play button uses --neon color. Progress bar matches existing skill bar style.
