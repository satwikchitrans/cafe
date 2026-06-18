import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// We only create the client if we have the credentials, otherwise we return a mock or throw an error.
if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase credentials. The admin panel will not function until they are provided in .env.local");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder-key'
);
