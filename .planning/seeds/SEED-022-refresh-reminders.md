# SEED-022: Content Refresh Reminders (monthly staleness check)

### Context
- **Target Phase**: Phase 13.5 (Minimal Admin Panel)
- **Goal**: Prevent the "Now" page and availability status from becoming outdated (Digital Decay).

### Implementation
- **Logic**:
    1. Every page update (Now, Availability, Bio) has a `last_updated_at` timestamp in Supabase.
    2. Phase 13.5 Admin dashboard highlights any item not touched in >30 days with a "Stale" indicator.
- **Automation**: Trigger a Telegram/Discord notification to the admin if availability hasn't been re-confirmed in 4 weeks.

### Technical Notes
- Implement a simple cron-style edge function to run every Monday and check timestamps.
- Add a "Confirm Current" button in the admin to refresh timestamps without needing a data edit.
