// Utility script to check Supabase project status.
// Token is read from SUPABASE_SERVICE_ROLE_KEY env var — never hardcode secrets here.
const token = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = "snyvarunuobcpfadkpmc";

async function checkStatus() {
  if (!token) {
    console.error("SUPABASE_SERVICE_ROLE_KEY is not set.");
    process.exit(1);
  }
  try {
    const url = `https://api.supabase.com/v1/projects/${projectRef}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Status:", res.status, res.statusText);
    const body = (await res.json().catch(() => null)) || (await res.text());
    console.log("Project details:", JSON.stringify(body, null, 2));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Fetch error:", err.message);
  }
}

checkStatus();
