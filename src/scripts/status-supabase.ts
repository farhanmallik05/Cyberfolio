const token = "sbp_09035d41a39c6a9b7af3800217d8282299f19ee2";
const projectRef = "snyvarunuobcpfadkpmc";

async function checkStatus() {
  try {
    const url = `https://api.supabase.com/v1/projects/${projectRef}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('Status:', res.status, res.statusText);
    const body = await res.json().catch(() => null) || await res.text();
    console.log('Project details:', JSON.stringify(body, null, 2));
  } catch (err: any) {
    console.error('Fetch error:', err.message);
  }
}

checkStatus();
