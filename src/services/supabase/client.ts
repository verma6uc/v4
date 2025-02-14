import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for normal operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Admin client for operations requiring service role
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey!, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  }
})