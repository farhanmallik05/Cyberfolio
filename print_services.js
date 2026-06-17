const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data } = await supabase
    .from('admin_settings')
    .select('service_config')
    .eq('id', 'global_status')
    .single();

  console.log(JSON.stringify(data.service_config, null, 2));
}

run().catch(console.error);
