import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log("--- SUPABASE CONNECTION TEST ---")
console.log("URL:", supabaseUrl ? "Loaded ✅" : "MISSING ❌")
console.log("Key:", supabaseAnonKey ? "Loaded ✅" : "MISSING ❌")

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL ERROR: Supabase keys are missing. Check your .env file location.')
  alert('CRITICAL ERROR: Database connection failed. API Keys are missing.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)