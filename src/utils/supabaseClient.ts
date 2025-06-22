import { createClient } from '@supabase/supabase-js'

// Ensure your environment variables are set in Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single, shared Supabase client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 