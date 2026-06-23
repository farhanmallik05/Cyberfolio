# 4. Upstash Redis Rate Limiting with Supabase DB Fallback

We decided to implement IP-based rate limiting on the `/api/chat` route using Upstash sliding-window Redis rate limiting (`@upstash/ratelimit`) as the primary mechanism. 

If Upstash environment variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) are not defined, the system will fall back to our persistent Supabase database-backed table (`api_usage_logs`) using the hashed IP addresses to record and check usage.

This ensures high performance, sliding-window accuracy, and minimal database connection overhead in production, while maintaining local-development usability and fault tolerance without requiring a local Redis setup.
