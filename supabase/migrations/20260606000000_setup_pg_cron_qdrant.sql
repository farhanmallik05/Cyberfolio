CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the edge function to run every hour
-- Note: 'snyvarunuobcpfadkpmc' is the project ref from INTEGRATIONS.md
SELECT cron.schedule(
  'sync-qdrant-job', 
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://snyvarunuobcpfadkpmc.supabase.co/functions/v1/sync-qdrant',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    )
  ) as request_id;
  $$
);
