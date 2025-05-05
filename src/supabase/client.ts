
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase';

const supabaseUrl = import.meta.env.VITE_APP_URL_SUPABASE;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient<Database>(supabaseUrl,supabaseKey);